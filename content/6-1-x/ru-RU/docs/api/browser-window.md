# BrowserWindow

> Создавайте окна браузера и управляйте ими.

Процесс: [Главный](../glossary.md#main-process)

```javascript
// В основном процессе.
const { BrowserWindow } = require('electron')

// Или используйте 'remote' в графическом процессе.
// const { BrowserWindow } = require('electron').remote

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

// Загрузить удаленный URL
win.loadURL('https://github.com')

// Или загрузить локальный HTML-файл
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Окно без рамки

Для создания окна без хрома или прозрачного окна произвольной формы, можно использовать API [окна без рамки](frameless-window.md).

## Изящный показ окон

Когда страница загружается в окно напрямую, пользователи могут видеть ступенчатую загрузку страницы, что является дурным тоном для нативного приложения. Для создания окна без ступенчатой загрузки существует два решения, которые можно использовать в различных ситуациях.

### Использование `ready-to-show` события

При загрузке страницы, после отрисовки страницы будет происходить событие `ready-to-show`, которое будет происходить первый раз, если окно до этого еще не было показано. Окно, показанное после этого события, не будет иметь визуальной ступенчатой подгрузки:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

Обычно это событие происходит после события `did-finish-load`. Однако, страницы, включающие в себя удаленные ресурсы, могут продолжать подгружаться после происхождения события `did-finish-load`.

### Настройка `backgroundColor`

Для больших приложений событие `ready-to-show` может вызываться слишком поздно, что может замедлить приложение. В этом случае рекомендуется показать окно немедленно, и использовать `backgroundColor`, задающий цвет фона Вашего приложения:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

Обратите внимание, что даже для приложений, использующих `ready-to-show` события, по-прежнему рекомендуется установить `backgroundColor`, чтобы сделать приложение более нативным.

## Родительские и дочерние окна

С помощью параметра `parent`, Вы можете создавать дочерние окна:

```javascript
const { BrowserWindow } = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

Окно `child` будет всегда показано поверх окна `top`.

### Модальные окна

Модальное окно - дочернее окно, которое делает недоступным родительское окно. Чтобы создать модальное окно, Вы должны установить два параметра `parent` и `modal`:

```javascript
conts { BrowserWindow } = require('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () = > {
  child.show()
})
```

### Видимость страниц

[API видимости страниц](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) работает следующим образом:

* На всех платформах состояние видимости отслеживает скрыто/уменьшено окно или нет.
* Кроме того, на macOS, состояние видимости также отслеживает состояние перекрытия окна. Если окно перекрыто (т.е. полностью покрыто) другим окном, состояние видимости будет `hidden`. На других платформах состояние видимости будет `hidden`, только когда окно уменьшено или явно скрыто при помощи `win.hide()`.
* Если `BrowserWindow` создано с `show: false`, первоначальное состояние видимости будет `visible`, несмотря на фактически скрытое окно.
* Если `backgroundThrottling` отключено, состояние видимости останется `visible`, даже если окно уменьшено, закрыто или скрыто.

Рекомендуется приостановить дорогостоящие операции, когда состояние видимости `hidden`, для того чтобы свести к минимуму потребление энергии.

### Платформа заметок

* На macOS модальные окна будут отображены в виде страниц, прикрепленных к родительскому окну.
* На macOS дочерние окна будут находиться относительно родительского окна, во время передвижения родительского окна, тем временем на Windows и Linux дочерние окна не будут двигаться.
* На Linux тип модального окна будет поменян в `dialog`.
* На Linux многие среды рабочего стола не поддерживают скрытие модального окна.

## Класс: BrowserWindow

> Создавайте окна браузера и управляйте ими.

Процесс: [Основной](../glossary.md#main-process)

`BrowserWindow` это [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

Так создается новый экземпляр `BrowserWindow` с нативными свойствами, установленными в `options`.

### `new BrowserWindow([options])`

* `options` Object (optional)
  * `width` Integer (optional) - Window's width in pixels. Default is `800`.
  * `height` Integer (optional) - Window's height in pixels. Default is `600`.
  * `x` Integer (optional) (**required** if y is used) - Window's left offset from screen. Default is to center the window.
  * `y` Integer (optional) (**required** if x is used) - Window's top offset from screen. Default is to center the window.
  * `useContentSize` Boolean (опционально) - `width` и `height` могут использоваться как размеры веб-страницы, это значит, что актуальный размер окна будет включать размер фрейма и будет немного крупнее. По умолчанию - `false`.
  * `center` Boolean (опционально) - показывает окно в центре экрана.
  * `minWidth` Integer (optional) - Window's minimum width. Default is `0`.
  * `minHeight` Integer (optional) - Window's minimum height. Default is `0`.
  * `maxWidth` Integer (optional) - Window's maximum width. Default is no limit.
  * `maxHeight` Integer (optional) - Window's maximum height. Default is no limit.
  * `resizable` Boolean (optional) - Whether window is resizable. По умолчанию - `true`.
  * `movable` Boolean (optional) - Whether window is movable. This is not implemented on Linux. По умолчанию - `true`.
  * `minimizable` Boolean (optional) - Whether window is minimizable. This is not implemented on Linux. По умолчанию - `true`.
  * `maximizable` Boolean (optional) - Whether window is maximizable. This is not implemented on Linux. По умолчанию - `true`.
  * `closable` Boolean (optional) - Whether window is closable. This is not implemented on Linux. По умолчанию - `true`.
  * `focusable` Boolean (опционально) - может ли быть окно в фокусе. По умолчанию - `true`. На Windows настройка `focusable: false` также подразумевает настройку `skipTaskbar: true`. На Linux настройка `focusable: false` прекращает взаимодействие окна с оконным менеджером, на Windows же всегда остается поверх всех рабочих областей.
  * `alwaysOnTop` Boolean (optional) - Whether the window should always stay on top of other windows. По умолчанию - `false`.
  * `fullscreen` Boolean (опционально) - будет ли окно показываться во весь экран. Когда явно установлено `false`, на macOS кнопка полноэкранного режима будет скрыта или отключена. По умолчанию - `false`.
  * `fullscreenable` Boolean (опционально) - может ли окно быть в полноэкранном режиме. На macOS также кнопка увеличить/зумировать должна переключить в полноэкранный режим или увеличить окно. По умолчанию - `true`.
  * `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. По умолчанию - `false`.
  * `skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. Default is `false`.
  * `kiosk` Boolean (optional) - The kiosk mode. По умолчанию - `false`.
  * `title` String (опционально) - заголовок окна по умолчанию. По умолчанию `"Electron"`. Если HTML-тег `<title>` определен в HTML-файле, загруженном с помощью `loadURL()`, то это свойство будет игнорироваться.
  * `icon` ([NativeImage](native-image.md) | String) (опционально) - иконка окна. На Windows рекомендуется использовать иконки `ICO`, чтобы получить лучший визуальный эффект, Вы также можете оставить неопределенным, чтобы был использован значок исполняемого файла.
  * `show` Boolean (optional) - Whether window should be shown when created. По умолчанию - `true`.
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). По умолчанию - `true`.
  * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. По умолчанию - `false`.
  * `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
  * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. По умолчанию - `false`.
  * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. По умолчанию - `false`.
  * `enableLargerThanScreen` Boolean (опционально) - позволяет окну изменять размер больше, чем экран. По умолчанию - `false`.
  * `backgroundColor` String (опционально) - фоновый цвет окна в HEX-формате, например `#66CD00`, `#FFF` или `#80FFFFFF` (альфа в формате #AARRGGBB поддерживается, если `transparent` установлено `true`). По умолчанию `#FFF` (белый).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. This is only implemented on macOS. По умолчанию - `true`.
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. По умолчанию - `false`.
  * `transparent` Boolean (опционально) - делает окно [прозрачным](frameless-window.md). По умолчанию - `false`.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Возможные значения:
    * `default` - В результате стандартный, серый, непрозрачный Mac заголовок.
    * `hidden` - В результате скрытый заголовок и содержимое во все окно, но заголовок по-прежнему имеет стандартное окно контроля ("светофоры") сверху слева.
    * `hiddenInset` - В результате скрытый заголовок с альтернативным видом, где кнопки контролирования немного больше вставки от края окна.
    * `customButtonsOnHover` Boolean (опционально) - отобразить пользовательские кнопки закрыть и свернуть на macOS окнах без рамки. Эти кнопки будут отображены только при наведении на верхний левый угол окна. Эти пользовательские кнопки предотвращают проблемы с событиями мыши, которые случаются со стандартными кнопками панели инструментов. **Заметка:** Этот параметр в настоящее время экспериментален.
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. По умолчанию - `false`.
  * `thickFrame` Boolenan (опционально) - использовать стиль `WS_THICKFRAME` на окнах без рамок на Windows, добавляющий стандартные рамки окна. Установив значение `false`, тень окна и анимация окна будут удалены. По умолчанию - `true`.
  * `vibrancy` String (опционально) - добавить тип эффекта вибрации к окну, только на macOS. Может быть `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, или `ultra-dark`.  Обратите внимание, что использование `frame: false` в комбинации с меняющимся значением, требует так же указывать `titleBarStyle`.
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. Если `true`, окно будет увеличиваться до предпочтительной ширины веб-страницы при увеличении, `false` приведет к увеличению масштаба до ширины экрана. Это также повлияет на поведение при вызове `maximize()` напрямую. По умолчанию - `false`.
  * `tabbingIdentifier` String (опционально) - название группы вкладок, позволяет открывать окно как нативную вкладку в macOS 10.12+. Окна с одинаковым идентификатором вкладки будут сгруппированы вместе. Это также добавляет новую нативную кнопку вкладки в панель вкладок вашего окна и позволяет Вашему `приложению` и окну получать событие `new-window-for-tab`.
  * `webPreferences` Object (optional) - Settings of web page's features.
    * `devTools` Boolean (опционально) - включает инструменты разработчика. Если значение `false`, нельзя будет использовать `BrowserWindow.webContents.openDevTools()`, чтобы открыть инструменты разработчика. По умолчанию - `true`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. По умолчанию - `false`.
    * `nodeIntegrationInWorker` Boolean (опционально) - включает интеграцию NodeJS в веб-воркерах. По умолчанию - `false`. Больше об этом можно найти в [многопоточности](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (опционально) - экспериментальная опция для включения поддержки NodeJS в подфреймах, таких как iframes и дочерних окнах. Все Ваши предварительные загрузки будут загружены для каждого iframe, Вы можете использовать `process.isMainFrame`, чтобы определить в главном фрейме Вы или нет.
    * `preload` String (опционально) - определяет скрипт, который будет загружен до того, как остальные скрипты запустятся на странице. Этот скрипт будет всегда иметь доступ к API NodeJS, вне зависимости включена или выключена интеграция NodeJS. Значение должно быть абсолютным путем к файлу скрипта. Когда интеграция NodeJS отключена, предварительно загруженный скрипт может повторно ввести глобальные символы NodeJS в глобальную область. Посмотреть пример [здесь](process.md#event-loaded).
    * `sandbox` Boolean (опционально) - если установлено true, то в окне будет запущена песочница, что делает ее совместимой с песочницей Chromium на уровне операционной системы, и отключает движок NodeJS. Это не тоже самое, что параметр `nodeIntegration`, доступные API для предзагруженных скриптов более ограничены. Узнать больше об этой опции можно [здесь](sandbox-option.md). **Примечание:** Эта опция в настоящее время экспериментальная и может поменяться или быть удалена в будущих Electron релизах.
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. По умолчанию - `true`.
    * `session` [Session](session.md#class-session) (опционально) - устанавливает сессию, которая используется страницей. Вместо передачи экземпляр Session напрямую, вместо этого Вы можете также выбрать использование опции `partition`, которая принимает строку раздела. Когда оба `session` и `partition` определены, `session` будет предпочтительней. По умолчанию используется сессия по умолчанию.
    * `partition` String (опционально) - устанавливает сессию, используемую на странице в соответствии со строкой раздела сессии. Если `partition` начинается с `persist:`, страница будет использовать постоянную сессию, которая доступна всем страницам в приложении с тем же `разделом`. Если нет префикса `persist:`, страница будет использовать сессию в памяти. При присваивании одинакового `раздела`, разные страницы могут иметь одинаковую сессию. По умолчанию используется сессия по умолчанию.
    * `affinity` String (опционально) - когда определено, веб-страницы с одинаковым `родством` будут работать в том же графическом процессе. Обратите внимание, что из-за повторного использования графического процесса, некоторые параметры `webPreferences` также будут доступны между веб-страницами, даже если Вы указали для них разные значения, включая, но не ограничиваясь, `preload`, `sandbox` и `nodeIntegration`. Поэтому рекомендуется использовать те же `webPreferences` для веб-страниц с одинаковым `родством`. _Это экспериментальное свойство_
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. По умолчанию - `true`.
    * `webSecurity` Boolean (опционально) - когда `false`, отключается политика same-origin (обычно используется при тестировании веб-сайтов людьми), и устанавливается `allowRunningInsecureContent` в `true`, если параметр не был установлен пользователем. По умолчанию - `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. По умолчанию - `false`.
    * `images` Boolean (optional) - Enables image support. По умолчанию - `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. По умолчанию - `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. По умолчанию - `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. По умолчанию - `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. По умолчанию - `false`.
    * `enableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. Полный список поддерживаемых возможностей можно найти в файле [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * `disableBlinkFeatures` String (опционально) - Список функциональных возможностей для выключения, разделяются `','`, например `CSSVariables,KeyboardEventKey`. Полный список поддерживаемых возможностей можно найти в файле [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family.
      * `standard` String (опционально) - По умолчанию `Times New Roman`.
      * `serif` String (опционально) - По умолчанию `Times New Roman`.
      * `sansSerif` String (опционально) - По умолчанию `Arial`.
      * `monospace` String (опционально) - По умолчанию `Courier New`.
      * `cursive` String (optional) - Defaults to `Script`.
      * `fantasy` String (optional) - Defaults to `Impact`.
    * `defaultFontSize` Integer (optional) - Defaults to `16`.
    * `defaultMonospaceFontSize` Integer (optional) - Defaults to `13`.
    * `minimumFontSize` Integer (optional) - Defaults to `0`.
    * `defaultEncoding` String (optional) - Defaults to `ISO-8859-1`.
    * `backgroundThrottling` Boolean (optional) - Whether to throttle animations and timers when the page becomes background. This also affects the [Page Visibility API](#page-visibility). Defaults to `true`.
    * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. Defaults to `false`. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). Вы можете получить доступ к этому контексту в инструментах разработчика, при выборе пункта 'Изолированный Контекст Elctron' в списке на верхней части консольной вкладки.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. Дочерние окна всегда будут отключены для интеграции узлов, если `nodeIntegrationInSubFrames` будет true. **Примечание:** Эта опция в настоящее время экспериментальная.
    * `webviewTag` Boolean (опционально) - включает [`<webview>`-тег](webview-tag.md). Defaults to `false`. **Примечание:** Cкрипт `предварительной загрузки`, настроенный для `<webview>`, будет иметь интеграцию NodeJS, когда будет запущен, так что Вы должны убедиться, что удаленный/непроверенный контент не может создавать тег `<webview>` с возможно вредоносным скриптом `предварительной загрузки`. Вы можете использовать событие `will-attach-webview` на [webContents](web-contents.md), чтобы снять скрипт `предварительной загрузки` и проверить или изменить начальные настройки `<webview>`.
    * `additionalArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app.  Useful for passing small bits of data down to renderer process preload scripts.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. По умолчанию - `false`.
    * `safeDialogsMessage` String (optional) - The message to display when consecutive dialog protection is triggered. If not defined the default message would be used, note that currently the default message is in English and not localized.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. По умолчанию - `false`.
    * `autoplayPolicy` String (опционально) - политика автовоспроизведения для применения к содержимому в окне, может быть `no-user-gesture-required`, `user-gesture-required` или `document-user-activation-required`. По умолчанию `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.

Когда установлен минимальный или максимальный размер окна, при помощи `minWidth`/`maxWidth`/`minHeight`/`maxHeight`, это ограничивает только пользователей. Это не позволит Вам установить размер, который не будет следовать ограничениям размера, в `setBounds`/`setSize` или в конструкторе `BrowserWindow`.

The possible values and behaviors of the `type` option are platform dependent. Возможные значения:

* На Linux возможны типы `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* On macOS, possible types are `desktop`, `textured`.
  * Тип `textured` добавляет вид металлического градиента (`NSTexturedBackgroundWindowMask`).
  * Тип `desktop` размещает окно на уровень фонового окна рабочего стола (`kCGDesktopWindowLevel - 1`). Обратите внимание, что окно рабочего стола не будет получить события фокуса, клавиатуры или мыши, но Вы можете использовать `globalShortcut`, чтобы получать ввод.
* На Windows возможен тип `toolbar`.

### События экземпляра

Объекты созданные с помощью `new BrowserWindow` имеют следующие события:

**Примечание:** Некоторые методы доступны только в определенных операционных системах и помечены как таковые.

#### Событие: 'page-title-updated'

Возвращает:

* `event` Event
* `title` String
* `explicitSet` Boolean

Происходит, когда документ меняет свой заголовок, вызов `event.preventDefault()` предотвратит изменение заголовка нативного окна. `explicitSet` является false, когда заголовок синтезирован из url файла.

#### Событие: 'close'

Возвращает:

* `event` Event

Происходит при закрытии окна. Оно происходит перед событиями `beforeunload` и `unload` в DOM. Вызов `event.preventDefault()` предотвратит закрытие.

Скорее всего, Вы захотите использовать обработчик `beforeunload`, чтобы решить, когда окно должно быть закрыто, который также будет вызываться, когда окно перезагружается. В Electron возврат любого значения, отличного от `undefined`, предотвратит закрытие. Например:

```javascript
window.onbeforeunload = (e) => {
  console.log('Я не хочу быть закрыт')

  // В отличие от браузеров, пользователю будет показано окно с сообщением.
  // Возврат любого значения незаметно отменит закрытие.
  // Рекомендуется использовать dialog API, чтобы дать пользователям
  // возможность подтвердить закрытие приложения.
  e.returnValue = false // идентично `return false`, но в использовании не рекомендуется
}
```
_**Примечание**: Существует тонкая разница между поведением `window.onbeforeunload = handler` и `window.addEventListener('beforeunload', handler)`. Рекомендуется всегда устанавливать `event.returnValue` явно, вместо того, чтобы просто возвращать значение, поскольку первое работает более последовательно в Electron._

#### Событие: 'closed'

Возникает, когда окно будет закрыто. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Событие: 'session-end' _Windows_

Происходит, когда сеанс окна заканчивается из-за выключения, перезагрузки компьютера или отключения сеанса.

#### Событие: 'unresponsive'

Происходит, когда страница "не отвечает".

#### Событие: 'responsive'

Происходит, когда страница, которая "не отвечала", снова реагирует.

#### Событие: 'blur'

Происходит, когда окно теряет фокус.

#### Событие: 'focus'

Происходит, когда на окне фокусируются.

#### Событие: 'show'

Происходит, когда отображается окно.

#### Событие: 'hide'

Происходит, когда окно спрятано.

#### Событие: 'ready-to-show'

Происходит, когда веб-страница была отрисована (пока не отображена) и окно может быть отображено без визуального мерцания.

#### Событие: 'maximize'

Происходит, когда окно увеличивается до предела.

#### Событие: 'unmaximize'

Происходит, когда окно выходит из увеличенного состояния.

#### Событие: 'minimize'

Происходит, когда окно было свернуто.

#### Событие: 'restore'

Происходит, когда окно восстанавливается из свернутого состояния.

#### Событие: 'will-resize' _macOS_ _Windows_

Возвращает:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - размер окна, на который будет изменено.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Событие: 'resize'

Происходит после того, как изменился размер окна.

#### Событие: 'will-move' _Windows_

Возвращает:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - расположение, куда окно будет перемещено.

Emitted before the window is moved. Calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Событие: 'move'

Происходит, когда окно перемещено на новое место.

__Примечание__: На macOS это событие является псевдонимом `moved`.

#### Событие: 'moved' _macOS_

Происходит единожды, когда окно перемещается в новое положение.

#### Событие: 'enter-full-screen'

Происходит, когда окно переходит в полноэкранный режим.

#### Событие: 'leave-full-screen'

Происходит, когда окно выходит из полноэкранного режима.

#### Событие: 'enter-html-full-screen'

Происходит, когда окно входит в полноэкранный режим с помощью HTML API.

#### Событие: 'leave-html-full-screen'

Происходит, когда окно выходит из полноэкранного режима с помощью HTML API.

#### Событие: 'always-on-top-changed'

Возвращает:

* `event` Event
* `isAlwaysOnTop` Boolean

Происходит, когда окно переключает режим отображения поверх всех окон.

#### Событие: 'app-command' _Windows_ _Linux_

Возвращает:

* `event` Event
* `command` String

Происходит, когда вызывается [команда приложения](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx). Обычно это касается клавиатурных медиа-клавиш или команд браузера, а также кнопки "Назад", встроенной в некоторые мыши на Windows.

Команды в нижнем регистре, подчеркивание заменено на дефисы, а префикс `APPCOMMAND_` обрезан. например `APPCOMMAND_BROWSER_BACKWARD` происходит как `browser-backward`.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Возврат на предыдущий экран, когда пользователь мышкой нажимает кнопку "назад"
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

Следующие команды приложения явно поддерживаются на Linux:

* `browser-backward`
* `browser-forward`

#### Событие: 'scroll-touch-begin' _macOS_

Происходит, когда начинается прокрутка колеса.

#### Событие: 'scroll-touch-end' _macOS_

Происходит, когда заканчивается прокрутка колеса.

#### Событие: 'scroll-touch-edge' _macOS_

Происходит, когда прокрутка колеса достигает края элемента.

#### Событие: 'swipe' _macOS_

Возвращает:

* `event` Event
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Событие: 'sheet-begin' _macOS_

Происходит, когда окно открывает лист.

#### Событие: 'sheet-end' _macOS_

Происходит, когда окно закрыло лист.

#### Событие: 'new-window-for-tab' _macOS_

Происходит, когда нажимается нативная кнопка новой вкладки.

### Статические методы

Класс `BrowserWindow` имеет следующие статические методы:

#### `BrowserWindow.getAllWindows()`

Возвращает `BrowserWindow[]` - массив всех открытых окон браузера.

#### `BrowserWindow.getFocusedWindow()`

Возвращает `BrowserWindow | null` - окно, которое сфокусировано в этом приложении, иначе возвращает `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Возвращает `BrowserWindow` - окно, которое владеет указанным `webContents`.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Возвращает `BrowserWindow` - окно с указанным `id`.

#### `BrowserWindow.addExtension(path)`

* `path` String

Добавляет расширение Chrome, расположенное в `path`, и возвращает имя расширения.

Метод не возвратит имя, если манифест расширения отсутствует или неполный.

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

#### `BrowserWindow.removeExtension(name)`

* `name` String

Удаляет расширение Chrome с указанным именем.

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

#### `BrowserWindow.getExtensions()`

Возвращает `Object` - ключи это имена расширений, а каждое значение это объект, содержащий свойства `name` и `version`.

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

Добавляет расширение инструмента разработчика, размещенного в `path`, и возвращает имя расширения.

Расширение будет запоминаться, так что Вам нужно только вызвать этот метод один раз, этот метод не используется для программирования. Если Вы попытаетесь добавить расширение, которое уже было загружено, этот метод не возвратит значение и вместо этого выведет предупреждение в консоль.

Метод не возвратит значение, если манифест расширения отсутствует или неполный.

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

Удаляет расширение инструмента разработчика с указанным именем.

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

#### `BrowserWindow.getDevToolsExtensions()`

Возвращает `Object` - ключи это имена расширений, а каждое значение это объект, содержащий свойства `name` и `version`.

Чтобы проверить установлено ли расширение инструмента разработчика, Вы можете запустить следующее:

```javascript
const { BrowserWindow } = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

### Instance Properties

Объекты, созданные с помощью `new BrowserWindow`, имеют следующие свойства:

```javascript
const { BrowserWindow } = require('electron')
// В этом примере `win` это наш экземпляр
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents`

A `WebContents` object this window owns. All web page related events and operations will be done via it.

Смотрите [документацию `webContents`](web-contents.md) для его методов и событий.

#### `win.id`

`Integer`, представляющий уникальный ID окна.

### Методы экземпляра

Объекты, созданные с помощью `new BrowserWindow`, имеют следующие методы экземпляра:

**Примечание:** Некоторые методы доступны только в определенных операционных системах и помечены как таковые.

#### `win.destroy()`

Принудительно закрывает окно, события `unload` и `beforeunload` не произойдут для веб-страниц, а событие `close` также не будет происходить для этого окна, но гарантировано, что событие `closed` будет происходить.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focus()`

Фокусирует окно.

#### `win.blur()`

Убирает фокус с окна.

#### `win.isFocused()`

Возвращает `Boolean` - сфокусировано окно или нет.

#### `win.isDestroyed()`

Возвращает `Boolean` - уничтожено окно или нет.

#### `win.show()`

Показывает и фокусирует окно.

#### `win.showInactive()`

Показывает окно, но не фокусирует его.

#### `win.hide()`

Скрывает окно.

#### `win.isVisible()`

Возвращает `Boolean` - видно окно для пользователя или нет.

#### `win.isModal()`

Возвращает `Boolean` - модальное текущее окно или нет.

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Выходит из увеличенного состояния окна.

#### `win.isMaximized()`

Возвращает `Boolean` - увеличено окно до предела или нет.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Восстанавливает окно из свернутого состояния до его предыдущего состояния.

#### `win.isMinimized()`

Возвращает `Boolean` - свернуто окно или нет.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Устанавливает окно в полноэкранный режим.

#### `win.isFullScreen()`

Возвращает `Boolean` - в полноэкранном режиме окно или нет.

#### `win.setSimpleFullScreen(flag)` _macOS_

* `flag` Boolean

Входит или покидает простой полноэкранный режим.

Простой полноэкранный режим эмулирует нативное полноэкранное поведение в версиях до Mac OS X Lion (10.7).

#### `win.isSimpleFullScreen()` _macOS_

Возвращает `Boolean` - в простом полноэкранном режиме окно или нет.

#### `win.isNormal()`

Возвращает `Boolean` - в нормальном состоянии (не увеличено до предела, не свернуто, не в полноэкранном режиме) окно или нет.

#### `win.setAspectRatio(aspectRatio[, extraSize])` _macOS_

* `aspectRatio` Float - соотношение сторон для некоторой части содержимого.
* `extraSize` [Size](structures/size.md) - дополнительный размер, который не будет включен при соотношении сторон.

Это заставит окно поддерживать соотношение сторон. Дополнительный размер позволяет разработчику иметь пространство, указанное в пикселях, которое не входит в расчеты соотношения сторон. Этот метод уже учитывает разницу между размером окна и размером его содержимого.

Рассмотрим нормально окно в HD видео-плеером, и связанными с ним контроллерами. Возможно, на левом крае есть 15-ти пиксельный контроллер, 25-ти пиксельный контроллер на правом крае и 50-ти пиксельный контроллер внизу плеера. Для сохранения соотношения сторон 16:9 (стандартное соотношение сторон для HD @1920x1080) в плеере, мы можем вызвать эту функцию с аргументами 16/9 и [ 40, 50 ]. Второй аргумент не заботится о том, где дополнительная ширина и высота находятся внутри содержимого вида, в котором они существуют. Суммируйте любые области дополнительной ширины и высоты, которые у Вас есть, в общем представлении содержимого.

Вызов этой функции со значением `0` удалит любые предыдущие установки соотношения сторон.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - фоновый цвет окна в HEX-формате, например `#66CD00`, `#FFF` или `#80FFFFFF` (альфа поддерживается, если `transparent` установлено `true`). По умолчанию - `#FFF` (белый).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` _macOS_

* `path` String - абсолютный путь до файла, для предпросмотра в QuickLook. Это важно, так как QuickLook использует имя файла и расширение файла из пути, чтобы определить тип содержимого файла для открытия.
* `displayName` String (опционально) - имя файла, для отображения в модальном виде QuickLook. Это чисто визуально и не влияет на тип содержимого файла. По умолчанию `path`.

Использует [QuickLook](https://en.wikipedia.org/wiki/Quick_Look) для предпросмотра файла, по данному пути.

#### `win.closeFilePreview()` _macOS_

Закрывает текущую открытую панель [QuickLook](https://en.wikipedia.org/wiki/Quick_Look).

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (опционально) _macOS_

Resizes and moves the window to the supplied bounds. Any properties that are not supplied will default to their current values.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

// Установить все свойства границы
win.setBounds({ x: 440, y: 225, width: 800, height: 600 })

// Установить одно свойство границы
win.setBounds({ width: 100 })

// { x: 440, y: 225, width: 100, height: 600 }
console.log(win.getBounds())
```

#### `win.getBounds()`

Возвращает [`Rectangle`](structures/rectangle.md) - `границы` окна как `объект`.

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (опционально) _macOS_

Меняет размеры и перемещает клиентскую область окна (например, веб-страницу) на заданные границы.

#### `win.getContentBounds()`

Возвращает [`Rectangle`](structures/rectangle.md) - `границы` области клиентского окна как `объект`.

#### `win.getNormalBounds()`

Возвращает [`Rectangle`](structures/rectangle.md) - содержит границы окна в нормальном состоянии

**Примечание:** Независимо от текущего состояния окна: увеличено до предела, свернуто или в полноэкранном режиме, эта функция всегда возвратит позицию и размер окна в нормальном состоянии. В нормальном состоянии, getBounds и getNormalBounds возвращают тот же [`Rectangle`](structures/rectangle.md).

#### `win.setEnabled(enable)`

* `enable` Boolean

Включает или выключает окно.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (опционально) _macOS_

Resizes the window to `width` and `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

Возвращает `Integer[]` - содержит высоту и ширину окна.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (опционально) _macOS_

Меняет размер клиентской области окна (например, веб-страница) на `width` и `height`.

#### `win.getContentSize()`

Возвращает `Integer[]` - содержит ширину и высоту клиентской области окна.

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

Устанавливает минимальный размер окна на `width` и `height`.

#### `win.getMinimumSize()`

Возвращает `Integer[]` - содержит минимальную ширину и высоту окна.

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

Устанавливает максимальный размер окна на `width` и `height`.

#### `win.getMaximumSize()`

Возвращает `Integer[]` - содержит максимальную ширину и высоту окна.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Устанавливает, может ли пользователь вручную изменять размер окна.

#### `win.isResizable()`

Возвращает `Boolean` - может пользователь изменять размеры окна вручную или нет.

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### `win.isMovable()` _macOS_ _Windows_

Возвращает `Boolean` - может пользователь перемещать окно или нет.

На Linux всегда возвращает `true`.

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` _macOS_ _Windows_

Возвращает `Boolean` - может пользователь вручную сворачивать окно или нет

На Linux всегда возвращает `true`.

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` _macOS_ _Windows_

Возвращает `Boolean` - может пользователь вручную увеличивать до предела окно или нет.

На Linux всегда возвращает `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Устанавливает, может ли кнопка увеличить/зумировать окно переключать полноэкранный режим или увеличивать до предела окно.

#### `win.isFullScreenable()`

Возвращает `Boolean` - может ли кнопка увеличить/зумировать окно переключать полноэкранный режим или увеличивать до предела окно.

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

#### `win.isClosable()` _macOS_ _Windows_

Возвращает `Boolean` - может пользователь вручную закрывать окно или нет.

На Linux всегда возвращает `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (необязательно) _macOS_ - Значения включают `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Устарело). По-умолчанию `floating`. Смотрите [документацию macOS](https://developer.apple.com/documentation/appkit/nswindow/level) для подробностей.
* `relativeLevel` Integer (опционально) _macOS_ - количество слоев выше, чтобы установить окно относительно заданного `level`. По умолчанию - `0`. Обратите внимание, что Apple не рекомендует устанавливать уровни выше, чем 1 верхнего `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Возвращает `Boolean` - всегда ли окно поверх остальных окон.

#### `win.moveTop()`

Перемещает окно на верх(z-order) независимо от фокуса

#### `win.center()`

Перемещает окно в центр экрана.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (опционально) _macOS_

Перемещает окно на `x` и `y`.

#### `win.getPosition()`

Возвращает `Integer[]` - содержит текущую позицию окна.

#### `win.setTitle(title)`

* `title` String

Изменяет название нативного окна на `title`.

#### `win.getTitle()`

Возвращает `String` - название нативного окна.

**Примечание:** Название веб-страницы может отличаться от названия нативного окна.

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

* `offsetY` Float
* `offsetX` Float (опционально)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. Например:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Начинает или останавливает мерцание окна, чтобы привлечь внимание пользователя.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Не отображает окно в панели задач.

#### `win.setKiosk(flag)`

* `flag` Boolean

Входит или покидает режим киоска.

#### `win.isKiosk()`

Возвращает `Boolean` - в режиме киоска окно или нет.

#### `win.getNativeWindowHandle()`

Возвращает `Buffer` - специфичный для платформы маркер окна.

Нативный тип маркера это `HWND` на Windows, `NSView*` на macOS и `Window` (`unsigned long`) на Linux.

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Function

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

Возвращает `Boolean` - `true` или `false`, в зависимости от того, какое сообщение было перехвачено.

#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

Пропускает сообщение окна.

#### `win.unhookAllWindowMessages()` _Windows_

Пропускает все сообщения окна.

#### `win.setRepresentedFilename(filename)` _macOS_

* `filename` String

Устанавливает путь до файла, который представляет окно, и иконки файла, которая будет показываться в заголовке окна.

#### `win.getRepresentedFilename()` _macOS_

Возвращает `String` - путь до файла, который представляет окно.

#### `win.setDocumentEdited(edited)` _macOS_

* `edited` Boolean

Определяет, был ли отредактирован документ окна, иконка в заголовке станет серой, когда установлено `true`.

#### `win.isDocumentEdited()` _macOS_

Возвращает `Boolean` - был ли изменен документ окна.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture
* `callback` Function
  * `image` [NativeImage](native-image.md)

Захватывает снимок страницы в границах `rect`. По завершению, `callback` будет вызван с `callback(image)`. `image` это экземпляр объекта [NativeImage](native-image.md), который хранит данные захвата страницы. Пропустив `rect`, будет сделан захват всей видимой страницы.

**[Скоро устареет](modernization/promisification.md)**

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (опционально) - Границы захвата

Возвращает `Promise<NativeImage>` - разрешается с [NativeImage](native-image.md)

Захватывает снимок страницы в границах `rect`. Пропустив `rect`, будет сделан захват всей видимой страницы.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (опционально) - HTTP Referrer.
  * `userAgent` String (опционально) - user-agent, создающий запрос.
  * `extraHeaders` String (опционально) - дополнительные заголовки, разделенные "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (опционально)
  * `baseURLForDataURL` String (опционально) - Базовый URL (с разделителем пути), для файлов, которые будут загружены по URL данных. Это необходимо, только если указанный `url` это URL данных и необходимо загрузить другие файлы.

Возвращает `Promise<void>` - промис будет разрешен, когда страница завершит загрузку (см. [`did-finish-load`](web-contents.md#event-did-finish-load)), и отклоняет, если страница не удачно загрузилась (см. [`did-fail-load`](web-contents.md#event-did-fail-load)).

Тоже, что и [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

Для обеспечения правильного форматирования URL файла рекомендуется использовать метод NodeJS [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject):

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

You can load a URL using a `POST` request with URL-encoded data by doing the following:

```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    type: 'rawData',
    bytes: Buffer.from('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```

#### `win.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (optional)
  * `query` Object (опционально) - переданный в `url.format()`.
  * `search` String (опционально) - переданная в `url.format()`.
  * `hash` String (опционально) - переданная в `url.format()`.

Возвращает `Promise<void>` - промис будет разрешен, когда страница завершит загрузку (см. [`did-finish-load`](web-contents.md#event-did-finish-load)), и отклоняет, если страница не удачно загрузилась (см. [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application.  See the `webContents` docs for more information.

#### `win.reload()`

Тоже, что и `webContents.reload`.

#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menu | null

Устанавливает `menu` в меню окна.

#### `win.removeMenu()` _Linux_ _Windows_

Удаляет меню окна.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (optional)
  * `mode` String _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Удаляет индикатор прогресса, когда прогресс меньше 0; Изменяет в режим indeterminate, когда прогресс больше 1.

На платформе Linux поддерживается только рабочая среда Unity, Вам необходимо указать имя файла `*.desktop` в поле `desktopName` в `package.json`. По умолчанию будет предполагаться `app.getName().desktop`.

На Windows режим может быть передан. Принимаемые значения: `none`, `normal`, `indeterminate`, `error` и `paused`. Если Вы вызовете `setProgressBar` без установленного режима (но со значением в пределах допустимого диапозона), будет предполагаться `normal`.

#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - иконка, которая будет отображаться в правом краю иконки на панели задач. Если параметр `null`, оверлей будет очищен
* `description` String - описание, которое будет представлено для доступности чтения с экрана

Устанавливает 16x16 пиксельный оверлей поверх текущей иконки в панели задач, обычно используется для передачи какого-либо статуса приложения или пассивного уведомления пользователя.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Устанавливает, будет ли окно иметь тень.

#### `win.hasShadow()`

Возвращает `Boolean` - был ли вызов успешным.

#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacity` Number - между 0.0 (полная прозрачность) и 1.0 (полная видимость)

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` _Windows_ _macOS_

Возвращает `Number` - между 0.0 (полная прозрачность) и 1.0 (полная видимость)

#### `win.setShape(rects)` _Windows_ _Linux_ _Экспериментально_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Установка формы окна, которая определяет область в окне, где система разрешает отрисовку и взаимодействие пользователя. Вне данного региона ни один пиксель не отрисуется и ни одно событие мыши не будет зарегистрировано. Вне региона события мыши не будут получены этим окном, но будет передаваться чему-либо позади окна.

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Возвращает `Boolean` - успешно ли добавлены кнопки

Добавляет панель миниатюр, с определенным набором кнопок, на слой кнопок в изображении эскиза окна в панели задач. Возвращает объект `Boolean`, который указывает успешно ли добавлена панель миниатюр.

Количество кнопок в панели миниатюр не должно быть больше, чем 7, из-за ограничений. После установки панели миниатюр, панель не может быть удалена, из-за ограничений платформы. Но Вы можете вызвать метод с пустым массивом, чтобы убрать кнопки.

`buttons` является массивом объектов `Button`:

* `Button` Object
  * `icon` [NativeImage](native-image.md) - иконка, отображаемая на панели миниатюр.
  * `click` Function
  * `tooltip` String (опционально) - текст всплывающей подсказки на кнопке.
  * `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

`flags` — это массив, который может включать следующие `строки`:

* `enabled` - кнопка активна и доступна пользователю.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - когда кнопка нажата, окно миниатюры закрывается немедленно.
* `nobackground` - не рисует границы кнопок, использует только изображение.
* `hidden` - кнопка не отображается пользователю.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rectangle](structures/rectangle.md) - область окна

Устанавливает область окна, которая будет показана в панели миниатюр, при наведении мыши на окно в панели задач. Вы можете сбросить панель миниатюры, чтобы показывалось окно полностью, указав пустую область: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

Устанавливает всплывающую подсказку, которая будет отображена, при наведении мыши на панель миниатюры окна в панели задач.

#### `win.setAppDetails(options)` _Windows_

* `options` Object
  * `appId` String (опционально) - [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx) окна. Это должно быть установлено, иначе остальные параметры не будут иметь никакого эффекта.
  * `appIconPath` String (опционально) - [иконка перезапуска](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx) окна.
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `relaunchCommand` String (опционально) - [команда перезапуска](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx) окна.
  * `relaunchDisplayName` String (опционально) - [отображаемое имя перезапуска](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx) окна.

Устанавливает свойства для кнопки окна на панели задач.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` _macOS_

Тоже, что и `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md)

Меняет иконку окна.

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

Устанавливает, должны ли быть видны кнопки контроля окна.

Этот метод невозможно вызвать, когда `titleBarStyle` установлено в `customButtonsOnHover`.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

Если панель меню уже видна, вызов `setAutoHideMenuBar(true)` не спрячет ее немедленно.

#### `win.isMenuBarAutoHide()`

Возвращает `Boolean` - прячет ли меню себя автоматически.

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Возвращает `Boolean` - видна ли панель меню.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (optional)
  * `visibleOnFullScreen` Boolean (опционально) _macOS_ - устанавливает видимость панели меню в полноэкранном режиме окна

Устанавливает видимость окна на всех рабочих местах.

**Примечание:** Этот метод ничего не делает Windows.

#### `win.isVisibleOnAllWorkspaces()`

Возвращает `Boolean` - видно ли окно на всех рабочих местах.

**Примечание:** Данный API всегда возвращает false в Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Логическое значение
* `options` Object (optional)
  * `forward` Boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Используется, только когда `ignore` - true. Если `ignore` - false, перенаправление всегда будет отключено, независимо от этого значения.

Заставляет окно игнорировать все события мыши.

Все события мыши, произошедшие в этом окне, будут переданы окну позади этого окна, но, если это окно сфокусировано, оно все еще будет получать события клавиатуры.

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

Предотвращает захват содержимого окна другими приложениями.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` _Windows_

* `focusable` Boolean

Меняет, может ли окно быть сфокусировано.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow

Устанавливает `parent` как родителя текущего окна, передав `null` превратит текущее окно в окно верхнего уровня.

#### `win.getParentWindow()`

Возвращает `BrowserWindow` - родительское окно.

#### `win.getChildWindows()`

Возвращает `BrowserWindow[]` - все дочерние окна.

#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` Boolean

Контролирует скрытие курсора, во время печатания.

#### `win.selectPreviousTab()` _macOS_

Выбирает предыдущую вкладку, когда нативные вкладки включены и в окне присутствуют другие вкладки.

#### `win.selectNextTab()` _macOS_

Выбирает следующую вкладку, когда нативные вкладки включены и в окне присутствуют другие вкладки.

#### `win.mergeAllWindows()` _macOS_

Объединяет все окна в одно окно с множественными вкладками, когда нативные вкладки включены и в присутствуют открытые окна больше, чем 1.

#### `win.moveTabToNewWindow()` _macOS_

Перемещает текущую вкладку в новое окно, если нативные вкладки включены и присутствует больше, чем одна вкладка, в текущем окне.

#### `win.toggleTabBar()` _macOS_

Переключает видимость вкладки, если включены нативные вкладки и присутствует только одна вкладка в текущем окне.

#### `win.addTabbedWindow(browserWindow)` _macOS_

* `browserWindow` BrowserWindow

Добавляет окно, как вкладку, в это окно, после вкладки экземпляра окна.

#### `win.setVibrancy(type)` _macOS_

* `type` String - может быть `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` или `ultra-dark`. Смотрите [документацию macOS](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) для подробностей.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` _macOS_ _Experimental_

* `touchBar` TouchBar

Устанавливает слой сенсорной панели для текущего окна. Указав `null` или `undefined` очистит сенсорную панель. Этот метод имеет эффект только, если машина имеет сенсорную панель и запускается на macOS 10.12.1+.

**Примечание:** TouchBar API в настоящее время является экспериментальным и может быть изменен или удален в будущих версиях Electron.

#### `win.setBrowserView(browserView)` _Экспериментально_

* `browserView` [BrowserView](browser-view.md). Attach browserView to win. If there is some other browserViews was attached they will be removed from this window.

#### `win.getBrowserView()` _Экспериментально_

Returns `BrowserView | null` - an BrowserView what is attached. Returns `null` if none is attached. Throw error if multiple BrowserViews is attached.

#### `win.addBrowserView(browserView)` _Экспериментально_

* `browserView` [BrowserView](browser-view.md)

Заменяет метод setBrowserView, для поддержки работы с множественными видами браузера.

#### `win.removeBrowserView(browserView)` _Экспериментально_

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` _Experimental_

Возвращает массив объектов `BrowserView`, которые были прикреплены с помощью addBrowserView или setBrowserView.

**Примечание:** BrowserView API в настоящее время экспериментально и может измениться или быть удалено в будущих релизах Electron.

### Свойства

#### `win.excludedFromShownWindowsMenu` _macOS_

A `Boolean` property that determines whether the window is excluded from the application’s Windows menu. `false` by default.

```js
const win = new BrowserWindow({ height: 600, width: 600 })

const template = [
  {
    role: 'windowmenu'
  }
]

win.excludedFromShownWindowsMenu = true

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```
