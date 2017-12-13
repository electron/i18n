# BrowserWindow

> 创建和控制浏览器窗口。

进程：[主进程](../glossary.md#main-process)

```javascript
// 在主进程中.
const {BrowserWindow} = require('electron')

// 或者从渲染进程中使用 `remote`.
// const {BrowserWindow} = require('electron').remote

let win = new BrowserWindow({width: 800, height: 600})
win.on('closed', () => {
  win = null
})

// 加载远程URL
win.loadURL('https://github.com')

// 或加载本地HTML文件
win.loadURL(`file://${__dirname}/app/index.html`)
```

## 无边框窗口

如果想创建一个无边框或者任意形状的视图，可以使用[Frameless Window](frameless-window.md) 的API

## 优雅地显示窗口

当页面在窗口中直接加载时，用户会看到未完成的页面，这不是一个好的原生应用的体验。为了让画面准备好了再显示，这有两种不同的解决方案。

### 使用`ready-to-show`事件

在加载页面时，渲染进程第一次完成绘制时，会发出 `ready-to-show` 事件 。 在此事件后显示窗口将没有视觉闪烁：

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({show: false})
win.once('ready-to-show', () => {
  win.show()
})
```

这个事件通常在 `did-finish-load` 事件之后发出，但是页面有许多远程资源时，它可能会在 `did-finish-load`之前发出事件。

### 设置 `backgroundColor`

对于一个复杂的应用，`ready-to-show` 可能发出的太晚，会让应用感觉缓慢。 在这种情况下，建议立刻显示窗口，并使用接近应用程序背景的 `backgroundColor`

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({backgroundColor: '#2e2c29'})
win.loadURL('https://github.com')
```

请注意，即使是使用 `ready-to-show` 事件的应用程序，仍建议使用设置 `backgroundColor` 使应用程序感觉更原生。

## 父子窗口

通过使用 `parent` 选项，你可以创建子窗口：

```javascript
const {BrowserWindow} = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({parent: top})
child.show()
top.show()
```

`child` 窗口将总是显示在 `top` 窗口的顶部.

### 模态窗口

模态窗口是禁用父窗口的子窗口，创建模态窗口必须设置 `parent` 和 `modal` 选项：

```javascript
const {BrowserWindow} = require('electron')

let child = new BrowserWindow({parent: top, modal: true, show: false})
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

### 页面可见性

[ 页面可见性 API ](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) 的工作方式如下:

* 在所有平台上, 可见性状态与窗口是否隐藏/最小化与否相关。
* 此外, 在 macOS 上, 可见性状态还跟踪窗口的遮挡状态相关。 如果窗口被另一个窗口完全遮挡了，可见性状态为`hidden`. 在其他平台上，可见性状态只有在使用 `win.hide()`使窗口最小化或者隐藏时才为 `hidden`
* 如果创建`BrowserWindow` 时带有 `show: false`的参数, 最初的可见性状态将为`visible` 尽管窗口实际上是隐藏的。
* 如果`backgroundThrottling`被禁用，可见性状态将保持为`visible` 即使窗户被最小化、遮挡或隐藏。

推荐您在可见性状态为 `hidden` 时暂停消耗资源的操作以便减少电力消耗。

### 平台相关的提示

* 在 macOS 上，modal 窗口将显示为附加到父窗口的工作表。
* 在 macOS 上，子窗口将保持与父窗口的相对位置。而在 Windows 和 Linux 中，当父窗口移动时子窗口不会移动。
* 在Windows上，不支持动态更改父窗口。
* 在Linux上，模态窗口的类型将更改为 `dialog`.
* 在Linux上，许多桌面环境不支持隐藏模态窗口。

## Class: BrowserWindow

> 创建和控制浏览器窗口。

线程：[主线程](../glossary.md#main-process)

`BrowserWindow` 是一个[EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

通过 `options` 可以创建一个具有原生属性的 `BrowserWindow` 。

### `new BrowserWindow([options])`

* `options` Object (可选) 
  * `width` Integer (可选) - 窗口的宽度，单位为像素。默认为`800`.
  * `height` Integer(可选) - 窗口的高度，单位为像素。默认为`600`.
  * `x` Integer (可选) (如果 y 存在时**必填**) - 窗口相对于屏幕左侧的偏移位置. 默认居中.
  * `y` Integer (可选) (如果 x 存在时**必填**) - 窗口相对于屏幕顶部的偏移位置. 默认居中.
  * `useContentSize` Boolean (可选) - `width` 和 `height` 将使用 web 页面的尺寸, 这意味着实际窗口的尺寸应该包括窗口框架的大小，稍微会大一点。 默认值为 `false`.
  * `center` Boolean (可选) - 窗口在屏幕居中.
  * `minWidth` Integer (可选) - 窗口的最小宽度, 默认值为 ``.
  * `minHeight` Integer (可选) - 窗口的最小高度. 默认值为 ``.
  * `maxWidth` Integer (可选) - 窗口的最大宽度, 默认无限制.
  * `maxHeight` Integer (可选) - 窗口的最大高度, 默认无限制.
  * `resizable` Boolean (可选) - 窗口是否可以改变尺寸. 默认值为`true`.
  * `movable` Boolean (可选) - 窗口是否可以移动. 在 Linux 中无效. 默认值为 `true`.
  * ` minimizable ` Boolean (可选) - 窗口是否可以最小化. 在 Linux 中无效. 默认值为 `true`.
  * ` maximizable ` Boolean (可选) - 窗口是否可以最大化动. 在 Linux 中无效. 默认值为 `true`.
  * `closable` Boolean (可选) - 窗口是否可以关闭. 在 Linux 中无效. 默认值为 `true`.
  * ` focusable ` Boolean (可选) - 窗口是否可以聚焦. 默认值为 `true`。 在 Windows 中设置 `focusable: false` 也意味着设置了`skipTaskbar: true`. 在 Linux 中设置 `focusable: false` 时窗口停止与 wm 交互, 并且窗口将始终置顶。
  * `alwaysOnTop` Boolean (可选) -窗口是否永远在别的窗口的上面. 默认值为`false`.
  * ` fullscreen ` Boolean (可选) - 窗口是否可以全屏. 当设置为 `false` 时，在 macOS 上全屏的按钮将被隐藏或禁用. 默认值为 `false`.
  * ` fullscreenable ` Boolean (可选) - 窗口是否可以进入全屏状态. 在 macOS上, 最大化/缩放按钮是否可用 默认值为 `true`。
  * `skipTaskbar` Boolean (可选) - 是否在任务栏中显示窗口. 默认值为`false`.
  * `kiosk` Boolean (可选) - kiosk 模式. 默认值为 `false`.
  * `title` String (可选) - 窗口的默认标题. 默认值为 `"Electron"`.
  * `icon` ([NativeImage](native-image.md) | String) (可选) - 窗口的图标. 在 Windows 上推荐使用 `ICO` 图标来获得最佳的视觉效果, 默认使用可执行文件的图标.
  * `show` Boolean (可选) - 窗口创建的时候是否显示. 默认值为`true`.
  * `frame` Boolean (可选) - 设置为 `false` 时可以创建一个[Frameless Window](frameless-window.md). 默认值为 `true`.
  * `parent` BrowserWindow (可选) - 指定父窗口. 默认值为 `null`.
  * `modal` Boolean (可选) -是否为模态窗. 仅供子窗口使用. 默认值为`false`.
  * `acceptFirstMouse` Boolean (可选) - 是否允许单击页面来激活窗口. 默认值为 `false`.
  * `disableAutoHideCursor` Boolean (可选) - 是否在输入时隐藏鼠标. 默认值为`false`.
  * `autoHideMenuBar` Boolean (可选) - 自动隐藏菜单栏, 除非按了`Alt`键. 默认值为`false`.
  * `enableLargerThanScreen` Boolean (可选) - 是否允许改变窗口的大小时, 大于屏幕的尺寸. 默认值为`false`.
  * `backgroundColor` String (可选) - 窗口的16进制背景颜色, 例如 `#66CD00` 或 `#FFF` 或 `#80FFFFFF` (支持alpha透明度). 默认值为`#FFF` (白色).
  * `hasShadow` Boolean (可选) - 窗口是否有阴影. 仅在 macOS 上支持. 默认值为 `true`.
  * `darkTheme` Boolean (可选) - 强制窗口使用 dark 主题, 只在一些拥有 GTK+3 桌面环境上有效. 默认值为 `false`.
  * `transparent` Boolean (可选) - 使窗口 [透明](frameless-window.md). 默认值为 `false`.
  * `type` String (可选) - 窗口的类型, 默认为普通窗口. 下面可以查看更多.
  * `titleBarStyle` String (可选) - 窗口标题栏的样式. 默认值为 `default`. 可能的值有： 
    * `default` - 标准灰色不透明的Mac标题栏
    * `hidden` - 隐藏标题栏, 内容充满整个窗口, 但它依然在左上角, 仍然受标准窗口控制.
    * `hidden-inset` - 废弃, 使用 `hiddenInset` 来代替.
    * `hiddenInset` - 隐藏标题栏, 显示小的控制按钮在窗口边缘
    * `customButtonsOnHover` Boolean (可选) - 在 macOS 的无边框窗口上绘制自定义的关闭, 最小化和全屏按钮. 只有鼠标滑过窗口的左上角时这些按钮才会显示. 这些自定义按钮可以阻止工具栏窗口的鼠标事件。 ** 注意: **此选项目前是实验性的。
  * `fullscreenWindowTitle` Boolean (可选) - 在 macOS 全屏模式时, 为所有带`titleBarStyle`选项的标题栏上显示的标题。默认值为`false`.
  * `thickFrame` Boolean(可选)-对 Windows 上的无框窗口使用` WS_THICKFRAME ` 样式，会增加标准窗口框架。 设置为 `false` 时将移除窗口的阴影和动画. 默认值为 `true`。
  * `vibrancy` String (可选) - 窗口是否使用 vibrancy 动态效果, 仅 macOS 中有效. 可以为 `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` 或 `ultra-dark`.
  * `zoomToPageWidth` Boolean (可选) - 单击工具栏上的绿色信号灯按钮或单击 窗口>缩放 菜单项时的行为, 仅macOS中有效. 如果为 ` true `, 窗口将放大到网页的本身宽度, ` false ` 将使其缩放到屏幕的宽度。 这也会影响直接调用 ` maximize() ` 时的行为。 默认值为 `false`.
  * `tabbingIdentifier` String (optional) - Tab group name, allows opening the window as a native tab on macOS 10.12+. Windows with the same tabbing identifier will be grouped together. This also adds a native new tab button to your window's tab bar and allows your `app` and window to receive the `new-window-for-tab` event.
  * `webPreferences` Object (optional) - Settings of web page's features. 
    * `devTools` Boolean (optional) - Whether to enable DevTools. If it is set to `false`, can not use `BrowserWindow.webContents.openDevTools()` to open DevTools. 默认值为 `true`。
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Default is `true`.
    * `nodeIntegrationInWorker` Boolean (optional) - Whether node integration is enabled in web workers. 默认值为 `false`. More about this can be found in [Multithreading](../tutorial/multithreading.md).
    * `preload` String (optional) - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. The value should be the absolute file path to the script. When node integration is turned off, the preload script can reintroduce Node global symbols back to the global scope. See example [here](process.md#event-loaded).
    * `sandbox` Boolean (optional) - If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium OS-level sandbox and disabling the Node.js engine. This is not the same as the `nodeIntegration` option and the APIs available to the preload script are more limited. Read more about the option [here](sandbox-option.md). **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `session` [Session](session.md#class-session) (optional) - Sets the session used by the page. Instead of passing the Session object directly, you can also choose to use the `partition` option instead, which accepts a partition string. When both `session` and `partition` are provided, `session` will be preferred. Default is the default session.
    * `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. By assigning the same `partition`, multiple pages can share the same session. Default is the default session.
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Default is `true`.
    * `webSecurity` Boolean (optional) - When `false`, it will disable the same-origin policy (usually using testing websites by people), and set `allowRunningInsecureContent` to `true` if this options has not been set by user. 默认值为 `true`。
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Default is `false`.
    * `images` Boolean (optional) - Enables image support. Default is `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Default is `true`.
    * `webaudio` Boolean (optional) - Enables WebAudio support. Default is `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Default is `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Default is `false`.
    * `experimentalCanvasFeatures` Boolean (optional) - Enables Chromium's experimental canvas features. Default is `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Default is `false`.
    * `blinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) file.
    * `disableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to disable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) file.
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
    * `backgroundThrottling` Boolean (optional) - Whether to throttle animations and timers when the page becomes background. This also affects the \[Page Visibility API\]\[#page-visibility\]. Defaults to `true`.
    * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. Defaults to `false`. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab. **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to the value of the `nodeIntegration` option. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.

When setting minimum or maximum window size with `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, it only constrains the users. It won't prevent you from passing a size that does not follow size constraints to `setBounds`/`setSize` or to the constructor of `BrowserWindow`.

The possible values and behaviors of the `type` option are platform dependent. Possible values are:

* On Linux, possible types are `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* On macOS, possible types are `desktop`, `textured`. 
  * The `textured` type adds metal gradient appearance (`NSTexturedBackgroundWindowMask`).
  * The `desktop` type places the window at the desktop background window level (`kCGDesktopWindowLevel - 1`). Note that desktop window will not receive focus, keyboard or mouse events, but you can use `globalShortcut` to receive input sparingly.
* On Windows, possible type is `toolbar`.

### 事件

Objects created with `new BrowserWindow` emit the following events:

**Note:** Some events are only available on specific operating systems and are labeled as such.

#### 事件： 'page-title-updated'

返回:

* `event` Event
* `title` String

Emitted when the document changed its title, calling `event.preventDefault()` will prevent the native window's title from changing.

#### 事件：close

返回:

* `event` Event

Emitted when the window is going to be closed. It's emitted before the `beforeunload` and `unload` event of the DOM. Calling `event.preventDefault()` will cancel the close.

Usually you would want to use the `beforeunload` handler to decide whether the window should be closed, which will also be called when the window is reloaded. In Electron, returning any value other than `undefined` would cancel the close. 例如：

```javascript
window.onbeforeunload = (e) => {
  console.log('I do not want to be closed')

  // Unlike usual browsers that a message box will be prompted to users, returning
  // a non-void value will silently cancel the close.
  // It is recommended to use the dialog API to let the user confirm closing the
  // application.
  e.returnValue = false
}
```

#### Event: 'closed'

Emitted when the window is closed. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Event: 'session-end' *Windows*

Emitted when window session is going to end due to force shutdown or machine restart or session log off.

#### Event: 'unresponsive'

Emitted when the web page becomes unresponsive.

#### Event: 'responsive'

Emitted when the unresponsive web page becomes responsive again.

#### Event: 'blur'

Emitted when the window loses focus.

#### Event: 'focus'

Emitted when the window gains focus.

#### Event: 'show'

Emitted when the window is shown.

#### Event: 'hide'

Emitted when the window is hidden.

#### Event: 'ready-to-show'

Emitted when the web page has been rendered (while not being shown) and window can be displayed without a visual flash.

#### Event: 'maximize'

Emitted when window is maximized.

#### Event: 'unmaximize'

Emitted when the window exits from a maximized state.

#### Event: 'minimize'

Emitted when the window is minimized.

#### Event: 'restore'

Emitted when the window is restored from a minimized state.

#### Event: 'resize'

Emitted when the window is being resized.

#### Event: 'move'

Emitted when the window is being moved to a new position.

**Note**: On macOS this event is just an alias of `moved`.

#### Event: 'moved' *macOS*

Emitted once when the window is moved to a new position.

#### Event: 'enter-full-screen'

Emitted when the window enters a full-screen state.

#### Event: 'leave-full-screen'

Emitted when the window leaves a full-screen state.

#### Event: 'enter-html-full-screen'

Emitted when the window enters a full-screen state triggered by HTML API.

#### Event: 'leave-html-full-screen'

Emitted when the window leaves a full-screen state triggered by HTML API.

#### Event: 'app-command' *Windows*

返回:

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

#### Event: 'scroll-touch-begin' *macOS*

Emitted when scroll wheel event phase has begun.

#### Event: 'scroll-touch-end' *macOS*

Emitted when scroll wheel event phase has ended.

#### Event: 'scroll-touch-edge' *macOS*

Emitted when scroll wheel event phase filed upon reaching the edge of element.

#### Event: 'swipe' *macOS*

返回:

* `event` Event
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Event: 'sheet-begin' *macOS*

Emitted when the window opens a sheet.

#### Event: 'sheet-end' *macOS*

Emitted when the window has closed a sheet.

#### 事件: 'new-window-for-tab' *macOS*

Emitted when the native new tab button is clicked.

### 静态方法

The `BrowserWindow` class has the following static methods:

#### `BrowserWindow.getAllWindows()`

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserWindow` - The window that owns the given `webContents`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Returns `BrowserWindow` - The window with the given `id`.

#### `BrowserWindow.addExtension(path)`

* `path` String

Adds Chrome extension located at `path`, and returns extension's name.

The method will also not return if the extension's manifest is missing or incomplete.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.removeExtension(name)`

* `name` String

Remove a Chrome extension by name.

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

Remove a DevTools extension by name.

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

### Instance Properties

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

### 实例方法

Objects created with `new BrowserWindow` have the following instance methods:

** 注意: **某些方法仅在特定的操作系统上可用, 这些方法会被标记出来。

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

Hides the window.

#### `win.isVisible()`

Returns `Boolean` - Whether the window is visible to the user.

#### `win.isModal()`

Returns `Boolean` - Whether current window is a modal window.

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Unmaximizes the window.

#### `win.isMaximized()`

Returns `Boolean` - Whether the window is maximized.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Restores the window from minimized state to its previous state.

#### `win.isMinimized()`

Returns `Boolean` - Whether the window is minimized.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Sets whether the window should be in fullscreen mode.

#### `win.isFullScreen()`

Returns `Boolean` - Whether the window is in fullscreen mode.

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

* ` bounds`[ 矩形 ](structures/rectangle.md)
* `animate` Boolean (optional) *macOS*

Resizes and moves the window to the supplied bounds

#### `win.getBounds()`

Returns [`Rectangle`](structures/rectangle.md)

#### `win.setContentBounds(bounds[, animate])`

* ` bounds`[ 矩形 ](structures/rectangle.md)
* `animate` Boolean (optional) *macOS*

Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.

#### `win.getContentBounds()`

Returns [`Rectangle`](structures/rectangle.md)

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) *macOS*

Resizes the window to `width` and `height`.

#### `win.getSize()`

Returns `Integer[]` - Contains the window's width and height.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) *macOS*

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

Sets whether the window can be manually resized by user.

#### `win.isResizable()`

Returns `Boolean` - Whether the window can be manually resized by user.

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### `win.isMovable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be moved by user.

On Linux always returns `true`.

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually minimized by user

On Linux always returns `true`.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually maximized by user.

On Linux always returns `true`.

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

On Linux always returns `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) *macOS* - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating`. See the [macOS docs](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels) for more details.
* `relativeLevel` Integer (optional) *macOS* - The number of layers higher to set this window relative to the given `level`. The default is ``. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Returns `Boolean` - Whether the window is always on top of other windows.

#### `win.center()`

Moves window to the center of the screen.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (optional) *macOS*

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
* `options` Object (可选) 
  * `httpReferrer` String (optional) - A HTTP Referrer url.
  * `userAgent` String (optional) - A user agent originating the request.
  * `extraHeaders` String (optional) - Extra headers separated by "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) - (optional)
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

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (可选) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error`, or `paused`.

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

Returns `Boolean` - Whether the window has a shadow.

On Windows and Linux always returns `true`.

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Object 
  * `icon` [NativeImage](native-image.md) - The icon showing in thumbnail toolbar.
  * `click` Function
  * `tooltip` String (optional) - The text of the button's tooltip.
  * `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

The `flags` is an array that can include following `String`s:

* `enabled` - The button is active and available to the user.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - When the button is clicked, the thumbnail window closes immediately.
* `nobackground` - Do not draw a button border, use only the image.
* `hidden` - The button is not shown to the user.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

#### `win.setThumbnailClip(region)` *Windows*

* `region` [Rectangle](structures/rectangle.md) - Region of the window

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

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore)`

* `ignore` Boolean

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *Windows*

* `focusable` Boolean

Changes whether the window can be focused.

#### `win.setParentWindow(parent)` *Linux* *macOS*

* `parent` BrowserWindow

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Returns `BrowserWindow` - The parent window.

#### `win.getChildWindows()`

Returns `BrowserWindow[]` - All child windows.

#### `win.setAutoHideCursor(autoHide)` *macOS*

* `autoHide` Boolean

Controls whether to hide cursor when typing.

#### `win.setVibrancy(type)` *macOS*

* `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/reference/appkit/nsvisualeffectview?language=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

**注意:** BrowserView 的 API目前为实验性质，可能会更改或删除。