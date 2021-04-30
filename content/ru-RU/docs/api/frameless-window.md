# Окно без рамки

> Откройте окно без панелей инструментов, границ или другого графического «chrome».

Безрамное окно - окно, в котором нет [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome) частей окна, например панели инструментов, которые не являются частью веб-страницы. Эти варианты в классе [`BrowserWindow`](browser-window.md).

## Создание безрамного окна

Для создания безрамного окна, нужно установить `frame: false` в `параметрах` [BrowserWindow](browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600, frame: false })
win.show()
```

### Альтернативы на macOS

Существует альтернативный способ указать окно chromeless. Вместо установки `frame` в `false`, которая отключает элементы заголовка и окна, вы можете скрыть строку заголовка, и ваш контент будет расширен до полного размера окна, при этом по-прежнему сохранятся элементы управления окном («светофор») для стандартных действий окна. Вы можете сделать это, указав параметр `titleBarStyle`:

#### `hidden`

В результате скроется заголовок и содержимое станет во все окно, но заголовок по-прежнему будет иметь стандартное окно контроля ("светофоры") сверху слева.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'hidden' })
win.show()
```

#### `hiddenInset`

В результате скрытый заголовок с альтернативным видом, где кнопки контролирования немного больше вставки от края окна.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'hiddenInset' })
win.show()
```

#### `customButtonsOnHover`

Использует кастомные кнопки закрыть и уменьшить, которые display при наведении на верхний левый угол окна. The fullscreen button is not available due to restrictions of frameless windows as they interface with Apple's macOS window masks. Эти кастомные кнопки предотвращают проблемы с методами мыши, случающиеся со стандартными кнопками панели инструментов. Эта опция применима только для окон без рамки.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'customButtonsOnHover', frame: false })
win.show()
```

## Прозрачное окно

Установите параметр `transparent` в значение `true`.<br>Примечание: вы можете сделать это только для безрамного окна.<br>Пример:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ transparent: true, frame: false })
win.show()
```

### Ограничения

* Вы не можете кликнуть по прозрачной области. Мы собираемся ввести API, чтобы установить форму окна для решения этой задачи, смотрите [нашу проблему](https://github.com/electron/electron/issues/1335).
* Transparent windows are not resizable. Setting `resizable` to `true` may make a transparent window stop working on some platforms.
* Фильтр `blur` применяется только к веб-странице, поэтому невозможно применить эффект размытия к содержимому под окном (т.е. другие приложения открываются в системе пользователя).
* The window will not be transparent when DevTools is opened.
* On Windows operating systems,
  * transparent windows will not work when DWM is disabled.
  * transparent windows can not be maximized using the Windows system menu or by double clicking the title bar. The reasoning behind this can be seen on [this pull request](https://github.com/electron/electron/pull/28207).
* В Linux пользователи должны поставить `--enable-transparent-visuals --disable-gpu` в командной строке, чтобы отключить GPU процессор и позволить ARGB создать прозрачное окно, это вызвано вышестоящей ошибкой, когда [альфа-канал не работает на некоторых драйверах NVidia](https://bugs.chromium.org/p/chromium/issues/detail?id=369209) на Linux.
* На Mac, тень родного окна не будет отображаться в прозрачном окне.

## Невзаимодействующее окно

Чтобы создать невзаимодействующее окно, те. которое не будет реагировать на событии мыши, необходимо вызвать функцию API:[win.setIgnoreMouseEvents(ignore)][ignore-mouse-events]<br>Пример:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### Пересылка

Игнорирование сообщений мыши заставляет веб-страницу забыть о движении мыши, что означает, что события движения мыши не будут вырабатываться. В операционных системах Windows дополнительный параметр может быть использован для передачи сообщений о перемещении мыши на веб-странице, что позволяют такие события как `mouseleave`:

```javascript
const { ipcRenderer } = require('electron')
const el = document.getElementById('clickThroughElement')
el.addEventListener('mouseenter', () => {
  ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
})
el.addEventListener('mouseleave', () => {
  ipcRenderer.send('set-ignore-mouse-events', false)
})

// Main process
const { ipcMain } = require('electron')
ipcMain.on('set-ignore-mouse-events', (event, ...args) => {
  BrowserWindow.fromWebContents(event.sender).setIgnoreMouseEvents(...args)
})
```

Это делает переход по веб-странице по окончании `el`, и возвращается к нормальному состоянию за ее пределами.

## Регион переноса (drag-and-drop)

По-умолчанию, безрамное окно невозможно перетаскивать. В коде приложения необходимо указать в стилях CSS `-webkit-app-region: drag`, чтобы за выделенную область было возможно переносить окно (как за заголовок стандартного окна), также можно использовать `-webkit-app-region: no-drag` для исключения непереносимой области внутри переносимой. Обратите внимание, что в настоящий момент поддерживается прямоугольная форма области.

Примечание: `-webkit-app-region: drag` имеет проблемы, пока инструменты разработчика открыты. Смотрите [Проблемы GitHub](https://github.com/electron/electron/issues/3647) для получения дополнительной информации, включая обход.

Чтобы сделать все окно перетаскиваемым, вы можете добавить `-webkit-app-region: drag` как стиль `body`:

```html
<body style="-webkit-app-region: drag">
</body>
```

И обратите внимание, что если вы перетащили окно целиком, вы также должны отметить кнопки как не перетаскиваемые, иначе пользователям было бы невозможно на них нажать:

```css
button {
  -webkit-app-region: no-drag;
}
```

Если вы устанавливаете перетаскиваемым только пользовательский заголовок, вам нужно все кнопки в заголовке сделать без возможности перетаскивания.

## Выделение текста

In a frameless window the dragging behavior may conflict with selecting text. Например, когда вы перетащите заголовок, вы можете случайно выбрать текст на панели заголовка. Чтобы предотвратить это, вам нужно отключить выбор текста в перетаскиваемой области, такой как:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## Контекстное меню

На некоторых платформах перетаскиваемая область будет рассматриваться как неклиентский фрейм, поэтому при щелчке правой кнопкой мыши на ней появится системное меню. Чтобы контекстное меню работало правильно на всех платформах, вы никогда не должны использовать настраиваемое контекстное меню в перетаскиваемых областях.

[ignore-mouse-events]: browser-window.md#winsetignoremouseeventsignore-options
