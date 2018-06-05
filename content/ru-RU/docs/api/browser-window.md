# BrowserWindow

> Создание окон браузера и управление ими.

Процесс: [Main](../glossary.md#main-process)

```javascript
// В основном процессе.
const {BrowserWindow} = require('electron')

// Или используйте 'remote' в renderer процессе.
// const {BrowserWindow} = require('electron').remote

let win = new BrowserWindow({width: 800, height: 600})
win.on('closed', () => {
  win = null
})

// Загрузка удалённого URL'а
win.loadURL('https://github.com')

// Или загрузка локального HTML файла
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Бескаркасное окно

Для создания окна без хрома или прозрачного окна произвольной формы, можно использовать API [Бескаркасного окна](frameless-window.md).

## Изящный показ окон

Когда страница загружается в окно напрямую, пользователи могут видеть ступенчатую загрузку страницы, что является дурным тоном для нативного приложения. Для создания окна без ступенчатой загрузки существует два решения, которые можно использовать в различных ситуациях.

### Использование `ready-to-show` события

При загрузке страницы, после рендеринга страницы будет вызвано событие `ready-to-show`, которое будет вызвано первый раз если окно до этого еще не было показано. Окно, показанное после этого события, не будет иметь визуальной ступенчатой подгрузки:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({show: false})
win.once('ready-to-show', () => {
  win.show()
})
```

Событие, которое обычно вызывается после загрузки страницы - `did-finish-load`. Однако, страницы, включающие в себя удаленные ресурсы, могут продолжать подгружаться после вызова данного события.

### Настройка `backgroundColor`

Для больших приложений `ready-to-show` событие может вызываться слишком поздно, что может замедлить приложение. В этом случае рекомендуется показать окно немедленно, и использовать `backgroundColor`, рядом с фоном Вашего приложения:

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({backgroundColor: '#2e2c29'})
win.loadURL('https://github.com')
```

Обратите внимание, что даже для приложений, использующих `ready-to-show` события, по-прежнему рекомендуется установить `backgroundColor` чтобы сделать приложение более нативным.

## Родительские и дочерние окна

С помощью параметра `parent`, Вы можете создавать дочерние окна:

```javascript
const {BrowserWindow} = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({parent: top})
child.show()
top.show()
```

Окно `child` будет всегда показано поверх окна `top`.

### Модальные окна

Модальное окно - дочернее окно, которое отключает родительское окно, чтобы создать модальное окно, Вы должны установить два параметра `parent` и `modal`:

```javascript
conts {BrowserWindow} = require('electron')

let child = new BrowserWindow({parent: top, modal: true, show: false})
child.loadURL('https://github.com')
child.once('ready-to-show', () = > {
  child.show()
})
```

### Видимость страниц

[API видимости страниц](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) работает следующим образом:

* На всех платформах, состояние видимости отслеживает скрыто/уменьшено окно или нет.
* Кроме того, на macOS, состояние видимости также отслеживает состояние перекрытия окна. Если окно перекрыто (т.е. полностью покрыто) другим окном, состояние видимости будет `hidden`. На других платформах, состояние видимости будет `hidden`, только когда окно уменьшено или явно скрыто, при помощи `win.hide()`.
* Если `BrowserWindow` создано с `show: false`, первоначальное состояние видимости будет `visible`, несмотря на фактически скрытое окно.
* Если `backgroundThrottling` отключено, состояние видимости останется `visible`, даже если окно уменьшено, закрыто или скрыто.

Рекомендуется приостановить дорогостоящие операции, когда состояние видимости `hidden`, для того чтобы свести к минимуму потребление энергии.

### Платформа заметок

* На macOS модальные окна будут отображены в виде страниц, прикрепленных к родительскому окну.
* На macOS дочерние окна будут находиться относительно родительского окна, во время передвижения родительского окна, тем временем на Windows и Linux дочерние окна не будут двигаться.
* На Windows не поддерживается динамическое изменение родительского окна.
* На Linux тип модального окна будет поменян в `dialog`.
* На Linux многие среды рабочего стола не поддерживают скрытие модального окна.

## Class: BrowserWindow

> Создание окон браузера и управление ими.

Process: [Main](../glossary.md#main-process)

`BrowserWindow` это [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

Так создается новый экземпляр `BrowserWindow` с нативными свойствами, установленными в `options`.

### `new BrowserWindow([options])`

* `options` Object (необязательно) 
  * `width` Integer (необязательно) - Ширина окна в пикселях. По умолчанию - `800`.
  * `height` Integer (необязательно) - Высота окна в пикселях. По умолчанию - `600`.
  * `x` Integer (необязательно) (**обязательно** если используется y) - Отступ окна слева от экрана. Значение по умолчанию центрирует окно.
  * `y` Integer (необязательно) (**обязательно** если используется x) - Отступ окна сверху от экрана. Значение по умолчанию центрирует окно.
  * `useContentSize` Boolean (необязательно) - `width` и `height` могут использоваться как размеры веб-страницы, это значит, что актуальный размер окна будет включать размер фрейма и будет немного крупнее. По умолчанию - `false`.
  * `center` Boolean (необязательно) - Показывает окно в центре экрана.
  * `minWidth` Integer (необязательно) - Минимальная ширина окна. По умолчанию - ``.
  * `minHeight` Integer (необязательно) - Минимальная высота окна. По умолчанию - ``.
  * `maxWidth` Integer (необязательно) - Максимальная ширина окна. По умолчанию - без ограничений.
  * `maxHeight` Integer (необязательно) - Максимальная высота окна. По умолчанию - без ограничений.
  * `resizable` Boolean (необязательно) - Будет ли окно изменять размеры. По умолчанию - `true`.
  * `movable` Boolean (необязательно) - Будет ли окно перемещаться. Не реализовано на Linux. По умолчанию - `true`.
  * `minimizable` Boolean (необязательно) - Будет ли окно сворачиваться. Не реализовано на Linux. По умолчанию - `true`.
  * `maximazable` Boolean (необязательно) - Будет ли окно разворачиваться. Не реализовано на Linux. По умолчанию - `true`.
  * `closable` Boolean (необязательно) - Возможность закрывать окно. Не реализовано на Linux. По умолчанию - `true`.
  * `focusable` Boolean (необязательно) - Может ли быть окно в фокусе. По умолчанию - `true`. На Windows настройка `focusable: false` также подразумевает настройку `skipTaskbar: true`. На Linux настройка `focusable: false` прекращает взаимодействие окна с оконным менеджером, на Windows же всегда остается поверх всех рабочих областей.
  * `alwaysOnTop` Boolean (необязательно) - Будет ли окно всегда оставаться поверх других окон. По умолчанию - `false`.
  * `fullscreen` Boolean (необязательно) - Будет ли окно показываться во весь экран. Когда явно установлено `false`, на macOS кнопка полноэкранного режима будет скрыта или отключена. По умолчанию - `false`.
  * `fullscreenable` Boolean (необязательно) - Может ли окно быть в полноэкранном режиме. На macOS, также кнопка увеличить/зумировать должна переключить в полноэкранный режим или увеличить окно. По умолчанию - `true`.
  * `simpleFullscreen` Boolean (необязательно) - Использовать полноэкранный режим на macOS в представленном до версии Lion варианте реализации. По умолчанию - `false`.
  * `skipTaskbar` Boolean (необязательно) - Будет ли показано окно в таск-баре. По умолчанию - `false`.
  * `kiosk` Boolean (необязательно) - Режим киоска. По умолчанию - `false`.
  * `title` String (необязательно) - Название окна. По умолчанию - `"Electron"`.
  * `icon` ([NativeImage](native-image.md) | String) (необязательно) - Иконка окна. На Windows рекомендуется использовать иконки `ICO`, чтобы получить лучший визуальный эффект, Вы также можете оставить неопределенным, чтобы был использован значок исполняемого файла.
  * `show` Boolean (необязательно) - Будет ли показано окно, когда будет создано. По умолчанию - `true`.
  * `frame` Boolean (необязательно) - Установите `false`, чтобы создать [Бескаркасное окно](frameless-window.md). По умолчанию - `true`.
  * `parent` BrowserWindow (необязательно) - Устанавливает родительское окно. По умолчанию - `null`.
  * `modal` Boolean (необязательно) - Будет ли окно модальным. Работает только, когда окно является дочерним окном. По умолчанию - `false`.
  * `acceptFirstMouse` Boolean (необязательно) - Будет ли веб-окно принимать событие одиночного нажатия мыши, которое одновременно активирует окно. По умолчанию - `false`.
  * `disableAutoHideCursor` Boolean (необязательно) - Будет ли спрятан курсор, во время печатания. По умолчанию - `false`.
  * `autoHideMenuBar` Boolean (необязательно) - Автоматическое убирание полоски меню, пока клавиша `Alt` не будет нажата. По умолчанию - `false`.
  * `enableLargerThanScreen` Boolean (необязательно) - Позволяет окну изменять размер больше, чем экран. По умолчанию - `false`.
  * `backgroundColor` String (опционально) - фоновый цвет окна, в виде шестнадцатеричного значения, например `#66CD00` или `#FFF` или `#80FFFFFF` (альфа поддерживается). По умолчанию - `#FFF` (белый).
  * `hasShadow` Boolean (необязательно) - Будет ли окно иметь тень. Реализовано только на macOS. По умолчанию - `true`.
  * `opacity` Number (опционально) - установить начальную прозрачность окна, между 0.0 (полная прозрачность) и 1.0 (полная видимость). Это реализовано только на Windows и macOS.
  * `darkTheme` Boolean (необязательно) - Заставляет использовать темную тему для окна, работает только на некоторых GTK+3 окружениях рабочего стола. По умолчанию - `false`.
  * `transparent` Boolean (необязательно) - Делает окно [прозрачным](frameless-window.md). По умолчанию - `false`.
  * `type` String (необязательно) - Тип окна, по умолчанию - обычное окно. См. больше об этом ниже.
  * `titleBarStyle` String (необязательно) - Стиль полосы заголовка окна. По умолчанию - `default`. Возможные значения: 
    * `default` - В результате стандартный, серый, непрозрачный Mac заголовок.
    * `hidden` - В результате скрытый заголовок и содержимое во все окно, но заголовок по-прежнему имеет стандартное окно контроля ("светофоры") сверху слева.
    * `hiddenInset` - В результате скрытый заголовок с альтернативным видом, где кнопки контролирования немного больше вставки от края окна.
    * `customButtonsOnHover` Boolean (необязательно) - Отобразить настраиваемые кнопки закрыть, свернуть и во весь экран на бескаркасных окнах в macOS. Эти кнопки не будут отображаться за исключением соприкосновения над левым верхним углом окна. Эти пользовательские кнопки предотвращают проблемы с событиями мыши, которые происходят с кнопками стандартной панели инструментов. **Заметка:** Этот параметр в настоящее время экспериментален.
  * `fullscreenWindowTitle` Boolean (необязательно) - Показывает название в строке заголовка в полноэкранном режиме на macOS для всех вариантов `titleBarStyle`. По-умолчанию `false`.
  * `thickFrame` Boolenan (необязательно) - Использовать стиль `WS_THICKFRAME` на окнах с отсутствием рамок на Windows, добавляющий стандартные рамки окна. Установив значение `false` тень окна и анимация окна будут удалены. По умолчанию - `true`.
  * `vibrancy` String (опционально) - добавить тип эффекта вибрации к окну, только на macOS. Может быть `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, или `ultra-dark`. Обратите внимание, что использование `frame: false` в комбинации с меняющимся значением, требует так же указывать `titleBarStyle`.
  * `zoomToPageWidth` Boolean (необязательно) - Управляет поведением на macOS when option-clicking the green stoplight button на панели инструментов или при нажатии на Окно > Увеличивает пункт меню. Если `true`, окно будет увеличиваться до предпочтительной ширины веб-страницы при увеличении, `false` приведет к увеличению масштаба до ширины экрана. Это также повлияет на поведение при вызове `maximize()` напрямую. По умолчанию - `false`.
  * `tabbingIdentifier` String (optional) - Tab group name, allows opening the window as a native tab on macOS 10.12+. Windows with the same tabbing identifier will be grouped together. This also adds a native new tab button to your window's tab bar and allows your `app` and window to receive the `new-window-for-tab` event.
  * `webPreferences` Object (необязательно) - Настройки веб-страниц. 
    * `devTools` Boolean (optional) - Whether to enable DevTools. If it is set to `false`, can not use `BrowserWindow.webContents.openDevTools()` to open DevTools. По умолчанию - `true`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Default is `true`.
    * `nodeIntegrationInWorker` Boolean (optional) - Whether node integration is enabled in web workers. По умолчанию - `false`. More about this can be found in [Multithreading](../tutorial/multithreading.md).
    * `preload` String (optional) - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. The value should be the absolute file path to the script. When node integration is turned off, the preload script can reintroduce Node global symbols back to the global scope. See example [here](process.md#event-loaded).
    * `sandbox` Boolean (optional) - If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium OS-level sandbox and disabling the Node.js engine. This is not the same as the `nodeIntegration` option and the APIs available to the preload script are more limited. Read more about the option [here](sandbox-option.md). **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `session` [Session](session.md#class-session) (optional) - Sets the session used by the page. Instead of passing the Session object directly, you can also choose to use the `partition` option instead, which accepts a partition string. When both `session` and `partition` are provided, `session` will be preferred. Default is the default session.
    * `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. By assigning the same `partition`, multiple pages can share the same session. Default is the default session.
    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`.
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Default is `true`.
    * `webSecurity` Boolean (optional) - When `false`, it will disable the same-origin policy (usually using testing websites by people), and set `allowRunningInsecureContent` to `true` if this options has not been set by user. По умолчанию - `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Default is `false`.
    * `images` Boolean (optional) - Enables image support. Default is `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Default is `true`.
    * `webaudio` Boolean (optional) - Enables WebAudio support. Default is `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Default is `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Default is `false`.
    * `experimentalCanvasFeatures` Boolean (optional) - Enables Chromium's experimental canvas features. Default is `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Default is `false`.
    * `blinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) file.
    * `disableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to disable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) file.
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family. 
      * `standard` String (optional) - Defaults to `Times New Roman`.
      * `serif` String (optional) - Defaults to `Times New Roman`.
      * `sansSerif` String (optional) - Defaults to `Arial`.
      * `monospace` String (optional) - Defaults to `Courier New`.
      * `cursive` String (optional) - Defaults to `Script`.
      * `fantasy` String (optional) - Defaults to `Impact`.
    * `defaultFontSize` Integer (optional) - Defaults to `16`.
    * `defaultMonospaceFontSize` Integer (optional) - Defaults to `13`.
    * `minimumFontSize` Integer (optional) - Defaults to ``.
    * `defaultEncoding` String (optional) - Defaults to `ISO-8859-1`.
    * `backgroundThrottling` Boolean (optional) - Whether to throttle animations and timers when the page becomes background. This also affects the [Page Visibility API](#page-visibility). Defaults to `true`.
    * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. Defaults to `false`. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab. **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to the value of the `nodeIntegration` option. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.
    * `additionArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.

When setting minimum or maximum window size with `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, it only constrains the users. It won't prevent you from passing a size that does not follow size constraints to `setBounds`/`setSize` or to the constructor of `BrowserWindow`.

The possible values and behaviors of the `type` option are platform dependent. Possible values are:

* On Linux, possible types are `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* On macOS, possible types are `desktop`, `textured`. 
  * The `textured` type adds metal gradient appearance (`NSTexturedBackgroundWindowMask`).
  * The `desktop` type places the window at the desktop background window level (`kCGDesktopWindowLevel - 1`). Note that desktop window will not receive focus, keyboard or mouse events, but you can use `globalShortcut` to receive input sparingly.
* On Windows, possible type is `toolbar`.

### События экземпляра

Объекты созданные с помощью `new BrowserWindow` имеют следующие события:

**Примечание:** Некоторые методы доступны только в определенных операционных системах и помечены как таковые.

#### Событие: 'page-title-updated'

Возвращает:

* `event` Event
* `title` String

Emitted when the document changed its title, calling `event.preventDefault()` will prevent the native window's title from changing.

#### Событие: 'close'

Возвращает:

* `event` Event

Вызывается при закрытии окна. It's emitted before the `beforeunload` and `unload` event of the DOM. Calling `event.preventDefault()` will cancel the close.

Usually you would want to use the `beforeunload` handler to decide whether the window should be closed, which will also be called when the window is reloaded. In Electron, returning any value other than `undefined` would cancel the close. Например:

```javascript
window.onbeforeunload = (e) => {
  console.log('I do not want to be closed')

  // Unlike usual browsers that a message box will be prompted to users, returning
  // a non-void value will silently cancel the close.
  // It is recommended to use the dialog API to let the user confirm closing the
  // application.
  e.returnValue = false // equivalent to `return false` but not recommended
}
```

***Note**: There is a subtle difference between the behaviors of `window.onbeforeunload = handler` and `window.addEventListener('beforeunload', handler)`. It is recommended to always set the `event.returnValue` explicitly, instead of just returning a value, as the former works more consistently within Electron.*

#### Событие: 'closed'

Вызывается, когда окно закрыто. После того, как вы получили это событие, вы должны удалить ссылку на окно и больше не использовать его.

#### Событие: 'session-end' *Windows*

Вызывается, когда оконный сеанс заканчивается из-за выключения или перезагрузки компьютера или отключения сеанса.

#### Событие: 'unresponsive'

Вызывается, когда страница "не отвечает".

#### Событие: 'responsive'

Вызывается, когда неотвечавшая страница снова реагирует.

#### Событие: 'blur'

Вызывается, когда окно теряет фокус.

#### Событие: 'focus'

Вызывается, когда на окне фокусируются.

#### Событие: 'show'

Вызывается, когда отображается окно.

#### Событие: 'hide'

Вызывается, когда окно спрятано.

#### Событие: 'ready-to-show'

Emitted when the web page has been rendered (while not being shown) and window can be displayed without a visual flash.

#### Событие: 'maximize'

Вызывается, когда окно увеличивается до предела.

#### Событие: 'unmaximize'

Emitted when the window exits from a maximized state.

#### Событие: 'minimize'

Emitted when the window is minimized.

#### Событие: 'restore'

Emitted when the window is restored from a minimized state.

#### Событие: 'resize'

Вызывается, когда у окна меняется размер.

#### Событие: 'move'

Emitted when the window is being moved to a new position.

**Note**: На macOS это событие лишь псевдоним для `moved`.

#### Событие: 'moved' *macOS*

Вызывается единожды, когда окно перемещается в новое положение.

#### Событие: 'enter-full-screen'

Вызывается, когда окно переходит в полноэкранный режим.

#### Событие: 'leave-full-screen'

Вызывается, когда окно выходит из полноэкранного режима.

#### Событие: 'enter-html-full-screen'

Emitted when the window enters a full-screen state triggered by HTML API.

#### Событие: 'leave-html-full-screen'

Emitted when the window leaves a full-screen state triggered by HTML API.

#### Событие: 'app-command' *Windows*

Возвращает:

* `event` Event
* `command` String

Emitted when an [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) is invoked. These are typically related to keyboard media keys or browser commands, as well as the "Back" button built into some mice on Windows.

Commands are lowercased, underscores are replaced with hyphens, and the `APPCOMMAND_` prefix is stripped off. e.g. `APPCOMMAND_BROWSER_BACKWARD` is emitted as `browser-backward`.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

#### Событие: 'scroll-touch-begin' *macOS*

Emitted when scroll wheel event phase has begun.

#### Событие: 'scroll-touch-end' *macOS*

Emitted when scroll wheel event phase has ended.

#### Событие: 'scroll-touch-edge' *macOS*

Emitted when scroll wheel event phase filed upon reaching the edge of element.

#### Событие: 'swipe' *macOS*

Возвращает:

* `event` Event
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Событие: 'sheet-begin' *macOS*

Emitted when the window opens a sheet.

#### Событие: 'sheet-end' *macOS*

Emitted when the window has closed a sheet.

#### Событие: 'new-window-for-tab' *macOS*

Emitted when the native new tab button is clicked.

### Статические методы

The `BrowserWindow` class has the following static methods:

#### `BrowserWindow.getAllWindows()`

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow` - The window that is focused in this application, otherwise returns `null`.

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

Adds Chrome extension located at `path`, and returns extension's name.

The method will also not return if the extension's manifest is missing or incomplete.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.removeExtension(name)`

* `name` String

Удаляет расширение Chrome с указанным именем.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.getExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

Adds DevTools extension located at `path`, and returns extension's name.

The extension will be remembered so you only need to call this API once, this API is not for programming use. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

The method will also not return if the extension's manifest is missing or incomplete.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

Удаляет расширение DevTools с указанным именем.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.getDevToolsExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

To check if a DevTools extension is installed you can run the following:

```javascript
const {BrowserWindow} = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

### Свойства экземпляра

Objects created with `new BrowserWindow` have the following properties:

```javascript
const {BrowserWindow} = require('electron')
// In this example `win` is our instance
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

#### `win.webContents`

A `WebContents` object this window owns. All web page related events and operations will be done via it.

See the [`webContents` documentation](web-contents.md) for its methods and events.

#### `win.id`

A `Integer` representing the unique ID of the window.

### Методы экземпляра

Objects created with `new BrowserWindow` have the following instance methods:

**Примечание:** Некоторые методы доступны только в определенных операционных системах и помечены как таковые.

#### `win.destroy()`

Force closing the window, the `unload` and `beforeunload` event won't be emitted for the web page, and `close` event will also not be emitted for this window, but it guarantees the `closed` event will be emitted.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focus()`

Focuses on the window.

#### `win.blur()`

Removes focus from the window.

#### `win.isFocused()`

Returns `Boolean` - Whether the window is focused.

#### `win.isDestroyed()`

Returns `Boolean` - Whether the window is destroyed.

#### `win.show()`

Shows and gives focus to the window.

#### `win.showInactive()`

Shows the window but doesn't focus on it.

#### `win.hide()`

Скрывает окно.

#### `win.isVisible()`

Returns `Boolean` - Whether the window is visible to the user.

#### `win.isModal()`

Returns `Boolean` - Whether current window is a modal window.

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Unmaximizes the window.

#### `win.isMaximized()`

Возвращает `Boolean` - если окно развернуто.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Restores the window from minimized state to its previous state.

#### `win.isMinimized()`

Возвращает `Boolean` - если окно свернуто.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Sets whether the window should be in fullscreen mode.

#### `win.isFullScreen()`

Returns `Boolean` - Whether the window is in fullscreen mode.

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

Enters or leaves simple fullscreen mode.

Simple fullscreen mode emulates the native fullscreen behavior found in versions of Mac OS X prior to Lion (10.7).

#### `win.isSimpleFullScreen()` *macOS*

Returns `Boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
* `extraSize` [Size](structures/size.md) - The extra size not to be included while maintaining the aspect ratio.

This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.

Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Just sum any extra width and height areas you have within the overall content view.

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String - The absolute path to the file to preview with QuickLook. This is important as Quick Look uses the file name and file extension on the path to determine the content type of the file to open.
* `displayName` String (optional) - The name of the file to display on the Quick Look modal view. This is purely visual and does not affect the content type of the file. Defaults to `path`.

Uses [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) to preview a file at a given path.

#### `win.closeFilePreview()` *macOS*

Closes the currently open [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) panel.

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (необязательно) *macOS*

Resizes and moves the window to the supplied bounds

#### `win.getBounds()`

Возвращает [`Rectangle`](structures/rectangle.md)

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (необязательно) *macOS*

Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.

#### `win.getContentBounds()`

Возвращает [`Rectangle`](structures/rectangle.md)

#### `win.setEnabled(enable)`

* `enable` Boolean

Включает или выключает окно.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (необязательно) *macOS*

Resizes the window to `width` and `height`.

#### `win.getSize()`

Возвращает `Integer[]` - Содержит высоту и ширину окна.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (необязательно) *macOS*

Resizes the window's client area (e.g. the web page) to `width` and `height`.

#### `win.getContentSize()`

Returns `Integer[]` - Contains the window's client area's width and height.

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

Sets the minimum size of window to `width` and `height`.

#### `win.getMinimumSize()`

Returns `Integer[]` - Contains the window's minimum width and height.

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

Sets the maximum size of window to `width` and `height`.

#### `win.getMaximumSize()`

Returns `Integer[]` - Contains the window's maximum width and height.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Устанавливает, может ли пользователь вручную изменять размер окна.

#### `win.isResizable()`

Возвращает `Boolean` - Когда окно может быть изменено пользователем вручную.

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### `win.isMovable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be moved by user.

На Linux всегда возвращает `true`.

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually minimized by user

На Linux всегда возвращает `true`.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually maximized by user.

На Linux всегда возвращает `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.isFullScreenable()`

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

#### `win.isClosable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually closed by user.

На Linux всегда возвращает `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (необязательно) *macOS* - Значения включают `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Устарело). По-умолчанию `floating`. Смотри [Документацию macOS](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels) для подробностей.
* `relativeLevel` Integer (optional) *macOS* - The number of layers higher to set this window relative to the given `level`. The default is ``. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Returns `Boolean` - Whether the window is always on top of other windows.

#### `win.center()`

Moves window to the center of the screen.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (необязательно) *macOS*

Moves window to `x` and `y`.

#### `win.getPosition()`

Returns `Integer[]` - Contains the window's current position.

#### `win.setTitle(title)`

* `title` String

Changes the title of native window to `title`.

#### `win.getTitle()`

Returns `String` - The title of the native window.

**Note:** The title of web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Starts or stops flashing the window to attract user's attention.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Makes the window not show in the taskbar.

#### `win.setKiosk(flag)`

* `flag` Boolean

Enters or leaves the kiosk mode.

#### `win.isKiosk()`

Returns `Boolean` - Whether the window is in kiosk mode.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - The platform-specific handle of the window.

The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Integer
* `callback` Function

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` *Windows*

* `message` Integer

Returns `Boolean` - `true` or `false` depending on whether the message is hooked.

#### `win.unhookWindowMessage(message)` *Windows*

* `message` Integer

Unhook the window message.

#### `win.unhookAllWindowMessages()` *Windows*

Unhooks all of the window messages.

#### `win.setRepresentedFilename(filename)` *macOS*

* `filename` String

Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### `win.getRepresentedFilename()` *macOS*

Returns `String` - The pathname of the file the window represents.

#### `win.setDocumentEdited(edited)` *macOS*

* `edited` Boolean

Specifies whether the window’s document has been edited, and the icon in title bar will become gray when set to `true`.

#### `win.isDocumentEdited()` *macOS*

Returns `Boolean` - Whether the window's document has been edited.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture
* `callback` Function 
  * `image` [NativeImage](native-image.md)

Same as `webContents.capturePage([rect, ]callback)`.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (опционально) 
  * `httpReferrer` String (optional) - A HTTP Referrer url.
  * `userAgent` String (optional) - A user agent originating the request.
  * `extraHeaders` String (optional) - Extra headers separated by "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Same as `webContents.loadURL(url[, options])`.

The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

To ensure that file URLs are properly formatted, it is recommended to use Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) method:

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

#### `win.loadFile(filePath)`

* `filePath` String

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (опционально) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `app.getName().desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)` *macOS*

* `hasShadow` Boolean

Sets whether the window should have a shadow. On Windows and Linux does nothing.

#### `win.hasShadow()` *macOS*

Возвращает `Boolean` - был ли вызов успешным.

В Windows и Linux всегда возвращает `true`.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` *Windows* *macOS*

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque)

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Возвращает `Boolean` - успешно ли добавлены кнопки

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

`buttons` является массивом объектов `Button`:

* `Button` Object 
  * `icon` [NativeImage](native-image.md) - значок, отображаемый на панели инструментов эскизов.
  * `click` Function
  * `tooltip` String (опиционально) - текст всплывающей подсказки на кнопке.
  * `flags` String[] (опиционально) - контроль определенных состояний и поведений кнопки. По умолчанию `['enabled']`.

`flags` — это массив, который может включать следующие `String`:

* `enabled` - кнопка активна и доступна пользователю.
* `disabled` - кнопка отключена. Она присутствует, но имеет неактивное визуальное состояние и не будет реагировать на действия пользователя.
* `dismissonclick` - когда кнопка нажата, окно миниатюры закрывается немедленно.
* `nobackground` - не рисует границы кнопок, использует только изображение.
* `hidden` - кнопка не отображается пользователю.
* `noninteractive` - кнопка включена, но не интерактивна; рисуется не нажимаемое состояние кнопки. Это значение предназначено для экземпляров, где кнопка используется в уведомлении.

#### `win.setThumbnailClip(region)` *Windows*

* `region` [Rectangle](structures/rectangle.md) - Область окна

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{x: 0, y: 0, width: 0, height: 0}`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` *Windows*

* `options` Object 
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is ``.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` *macOS*

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `icon` [NativeImage](native-image.md)

Changes window icon.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible)`

* `visible` Boolean

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Примечание:** Данный API всегда возвращает false в Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Логическое значение
* `options` Object (опционально) 
  * `forward` Boolean (optional) *Windows* - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Включает для окна игнорирование событий от мыши.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Предотвращает захват содержимого окна другими приложениями.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *Windows*

* `focusable` Boolean

Changes whether the window can be focused.

#### `win.setParentWindow(parent)` *Linux* *macOS*

* `parent` BrowserWindow

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Возвращает `BrowserWindow` - родительское окно.

#### `win.getChildWindows()`

Возвращает `BrowserWindow[]` - все дочерние окна.

#### `win.setAutoHideCursor(autoHide)` *macOS*

* `autoHide` Boolean

Controls whether to hide cursor when typing.

#### `win.selectPreviousTab()` *macOS*

Selects the previous tab when native tabs are enabled and there are other tabs in the window.

#### `win.selectNextTab()` *macOS*

Selects the next tab when native tabs are enabled and there are other tabs in the window.

#### `win.mergeAllWindows()` *macOS*

Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.

#### `win.moveTabToNewWindow()` *macOS*

Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.

#### `win.toggleTabBar()` *macOS*

Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.

#### `win.addTabbedWindow(browserWindow)` *macOS*

* `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.

#### `win.setVibrancy(type)` *macOS*

* `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Примечание:** TouchBar API в настоящее время является экспериментальным и может быть изменен или удален в будущих версиях Electron.

#### `win.setBrowserView(browserView)` *Экспериментально*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserView()` *Экспериментально*

Returns `BrowserView | null` - an attached BrowserView. Returns `null` if none is attached.

**Примечание:** BrowserView API в настоящее время экспериментально и может измениться или быть удалено в будущих релизах Electron.