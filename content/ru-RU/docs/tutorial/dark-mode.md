# Темный режим

## Обзор

### Автоматическое обновление родных интерфейсов

"Родные интерфейсы" включают сборщик файлов, оконную границу, диалоги, контекстные меню и многое другое - все, где пользовательский интерфейс исходит от вашей операционной системы и не из вашего приложения. Поведение по умолчанию заключается в том, чтобы выбрать эту автоматическую с ОС.

### Автоматическое обновление собственных интерфейсов

Если ваше приложение имеет свой собственный темный режим, вы должны переключать его и выключать в синхронизации в темном режиме системы настройки. Это можно сделать с помощью [предпочтительной цветовой схемы][] медиа-запроса CSS.

### Вручную обновляйте собственные интерфейсы

Если вы хотите вручную переключаться между светлыми/темными режимами, вы можете сделать это, установив нужный режим в [themeSource](../api/native-theme.md#nativethemethemesource) свойстве `nativeTheme` модуля. Значение этого свойства будет распространяться в процесса Renderer. Любые правила CSS, связанные с `prefers-color-scheme` , обновляться соответствующим образом.

## настройки macOS

В macOS 10.14 Mojave, Apple представила новый [системный темный режим][system-wide-dark-mode] для всех компьютеров macOS. Если ваше приложение Electron имеет темный режим, вы можете сделать его следовать системе всей темной настройки режима, используя [ `nativeTheme` api](../api/native-theme.md).

В macOS 10.15 Catalina компания Apple представила новую опцию «автоматического» темного режима для всех компьютеров macOS. Для того, чтобы API `nativeTheme.shouldUseDarkColors` и `Tray` работали правильно в этом режиме на Catalina, необходимо использовать Electron `>=7.0.0`или установить от `NSRequiresAquaSystemAppearance` до `false` в файле `Info.plist` для старых версий. Оба [Electron Packager][electron-packager] и [Electron Forge][electron-forge] имеют [`darwinDarkModeSupport` возможность][packager-darwindarkmode-api] автоматизировать изменения `Info.plist` время сборки приложения.

Если вы хотите отказаться при использовании Electron &gt; 8.0.0, вы должны установить ключ `NSRequiresAquaSystemAppearance` в файле `Info.plist` для `true`. Пожалуйста, обратите внимание, что Electron 8.0.0 и выше не позволит вам отказаться этой темы, из-за использования macOS 10.14 SDK.

## Пример

Начнем с рабочего приложения с программного [руководство по быстрому](quick-start.md) постепенно добавляем функциональность.

Во-первых, давайте редактировать наш интерфейс, чтобы пользователи могли переключаться между светлыми и режимами.  Этот базовый пользовательский интерфейс содержит кнопки для изменения `nativeTheme.themeSource` и текстовый элемент, указывающий, `themeSource` выбрано значение. По умолчанию Electron следует предпочтениям темного режима системы, поэтому мы будем жестко кодировать источник темы как "Система".

Добавьте следующие строки в `index.html` файл:

```html
<! DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
    <link rel="stylesheet" type="text/css" href="./styles.css">
</head>
<body>
    <h1>Привет, мир!</h1>
    <p>источник темы: <strong id="theme-source">система</strong></p>

    <button id="toggle-dark-mode">для того чтобы переключить темный режим</button>
    <button id="reset-to-system">сбросить к проблеме темы</button>

    <script src="renderer.js"></script>
  </body>
</body>
</html>
```

Далее добавьте [слушателям](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) , которые `click` события на кнопках переключения. Поскольку модуль `nativeTheme` подвергается воздействию только в основном процессе, необходимо настроить обратный вызов каждого слушателя , чтобы использовать IPC для отправки сообщений и обработки ответов из основного процесса:

* когда кнопка "Toggle Dark Mode" нажата, мы отправляем сообщение `dark-mode:toggle` (событие), чтобы сообщить главному процессу, чтобы вызвать изменение темы , и обновить метку "Текущий источник темы" в пользовательском интерфейсе на основе ответа от основного процесса.
* когда кнопка "Перезагрузка в систему тема" нажал, мы отправляем сообщение `dark-mode:system` (событие), чтобы сказать основной процесс, чтобы использовать систему цветовая схема, и обновить "Текущий источник темы" этикетку для `System`.

Чтобы добавить слушателей и обработчиков, добавьте следующие строки в `renderer.js` файла:

```javascript
const { ipcRenderer } требуют ('электрон')

document.getElementById ('переключатель-темный-режим').addEventListener ('click', async () -> -
  const isDarkMode - ждут ipcRenderer.invoke ('dark-mode:toggle')
  document.getElementById ('theme-source').innerHTML - isDarkMode ? 'Dark': 'Light'
q)

document.getElementById ('reset-to-system').addEventListener ('click', async () -> -
  ждут ipcRenderer.invoke ('темный режим:system')
  document.getElementById ('theme-source'
).
```

Если вы запустите код в этот момент, вы увидите, что ваши кнопки не делают ничего просто еще, и ваш основной процесс приведет к ошибке, как это, когда вы нажмете на кнопки: `Error occurred in handler for 'dark-mode:toggle': No handler registered for 'dark-mode:toggle'` Это ожидается - мы на самом деле не коснулся любого `nativeTheme` код еще.

Теперь, когда мы закончили проводку IPC со стороны Renderer, следующим шагом является обновление файла `main.js` для обработки событий из процесса Renderer.

В зависимости от полученного события мы обновляем свойство [`nativeTheme.themeSource`](../api/native-theme.md#nativethemethemesource) , чтобы применить нужную тему к родным элементам пользовательского интерфейса системы (например, контекстные меню) и распространяем предпочтительную цветовую схему в процесс Renderer :

* Получив `dark-mode:toggle`, мы проверяем, активна ли тема, используя `nativeTheme.shouldUseDarkColors` , и `themeSource` на противоположную тему.
* Получив `dark-mode:system`, мы сбрасываем `themeSource` `system`.

```javascript
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate' , ()>
  если (BrowserWindow.getAllWindows ().длина No 0) -
    создатьWindow ()
  и
)
```

Заключительный шаг заключается в том, чтобы добавить немного стиля, чтобы включить темный режим для веб-частей пользовательского интерфейса за счет использования [`prefers-color-scheme`][prefer-color-scheme] CSS атрибута. Значение этого `prefers-color-scheme` будет следовать вашей `nativeTheme.themeSource` настройки.

Создайте `styles.css` файл и добавьте следующие строки:

```css fiddle='docs/fiddles/features/macos-dark-mode'
@media (предпочитает цветовую схему: темная) -
  тело - фон: #333; цвет: белый; No
-

@media (предпочитает цветовую схему: светлая) -
  тело - фон: #ddd; цвет:
черный;
```

После запуска приложения Electron можно изменить режимы или сбросить тему системы по умолчанию, нажав соответствующие кнопки:

![Темный режим](../images/dark_mode.gif)

[system-wide-dark-mode]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
[предпочтительной цветовой схемы]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
[prefer-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
