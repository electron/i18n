# BrowserWindow

> 创建和控制浏览器窗口。

进程：[主进程](../glossary.md#main-process)

```javascript
// 在主进程中.
const { BrowserWindow } = require('electron')

// 或者从渲染进程中使用 `remote`.
// const { BrowserWindow } = require('electron').remote

let win = new BrowserWindow({ width: 800, height: 600 })
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
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

这个事件通常在 `did-finish-load` 事件之后发出，但是页面有许多远程资源时，它可能会在 `did-finish-load`之前发出事件。

### 设置 `backgroundColor`

对于一个复杂的应用，`ready-to-show` 可能发出的太晚，会让应用感觉缓慢。 在这种情况下，建议立刻显示窗口，并使用接近应用程序背景的 `backgroundColor`

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

请注意，即使是使用 `ready-to-show` 事件的应用程序，仍建议使用设置 `backgroundColor` 使应用程序感觉更原生。

## 父子窗口

通过使用 `parent` 选项，你可以创建子窗口：

```javascript
const { BrowserWindow } = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

`child` 窗口将总是显示在 `top` 窗口的顶部.

### 模态窗口

模态窗口是禁用父窗口的子窗口，创建模态窗口必须设置 `parent` 和 `modal` 选项：

```javascript
const { BrowserWindow } = require('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
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
* On Linux the type of modal windows will be changed to `dialog`.
* On Linux many desktop environments do not support hiding a modal window.

## Class: BrowserWindow

> 创建和控制浏览器窗口。

进程：[主进程](../glossary.md#main-process)

`BrowserWindow` 是一个[EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

通过 `options` 可以创建一个具有原生属性的 `BrowserWindow` 。

### `new BrowserWindow([options])`

* `选项` Object (可选) 
  * `width` Integer (可选) - 窗口的宽度，单位为像素。默认为`800`.
  * `height` Integer(可选) - 窗口的高度，单位为像素。默认为`600`.
  * `x` Integer (可选) (如果 y 存在时**必填**) - 窗口相对于屏幕左侧的偏移位置. 默认居中.
  * `y` Integer (可选) (如果 x 存在时**必填**) - 窗口相对于屏幕顶部的偏移位置. 默认居中.
  * `useContentSize` Boolean (可选) - `width` 和 `height` 将设置为 web 页面的尺寸(译注: 不包含边框), 这意味着窗口的实际尺寸将包括窗口边框的大小，稍微会大一点。 默认值为 `false`.
  * `center` Boolean (可选) - 窗口在屏幕居中.
  * `minWidth` Integer (可选) - 窗口的最小宽度, 默认值为 `0`.
  * `minHeight` Integer (可选) - 窗口的最小高度. 默认值为 `0`.
  * `maxWidth` Integer (可选) - 窗口的最大宽度, 默认无限制.
  * `maxHeight` Integer (可选) - 窗口的最大高度, 默认无限制.
  * `resizable` Boolean (可选) - 窗口是否可以改变尺寸. 默认值为`true`.
  * `movable` Boolean (可选) - 窗口是否可以移动. 在 Linux 中无效. 默认值为 `true`.
  * ` minimizable ` Boolean (可选) - 窗口是否可以最小化. 在 Linux 中无效. 默认值为 `true`.
  * ` maximizable ` Boolean (可选) - 窗口是否可以最大化动. 在 Linux 中无效. 默认值为 `true`.
  * `closable` Boolean (可选) - 窗口是否可以关闭. 在 Linux 中无效. 默认值为 `true`.
  * ` focusable ` Boolean (可选) - 窗口是否可以聚焦. 默认值为 `true`。 在 Windows 中设置 `focusable: false` 也意味着设置了`skipTaskbar: true`. 在 Linux 中设置 `focusable: false` 时窗口停止与 wm 交互, 并且窗口将始终置顶。
  * `alwaysOnTop` Boolean (可选) -窗口是否永远在别的窗口的上面. 默认值为`false`.
  * ` fullscreen ` Boolean (可选) - 窗口是否全屏. 当明确设置为 `false` 时，在 macOS 上全屏的按钮将被隐藏或禁用. 默认值为 `false`.
  * ` fullscreenable ` Boolean (可选) - 窗口是否可以进入全屏状态. 在 macOS上, 最大化/缩放按钮是否可用 默认值为 `true`。
  * `simpleFullscreen` Boolean (可选) - 在 macOS 上使用 pre-Lion 全屏. 默认为`false`.
  * `skipTaskbar` Boolean (可选) - 是否在任务栏中显示窗口. 默认值为`false`.
  * `kiosk` Boolean (可选) - kiosk 模式. 默认值为 `false`.
  * `title` String (optional) - Default window title. Default is `"Electron"`. If the HTML tag `<title>` is defined in the HTML file loaded by `loadURL()`, this property will be ignored.
  * `icon` ([NativeImage](native-image.md) | String) (可选) - 窗口的图标. 在 Windows 上推荐使用 `ICO` 图标来获得最佳的视觉效果, 默认使用可执行文件的图标.
  * `show` Boolean (可选) - 窗口创建的时候是否显示. 默认值为`true`.
  * `frame` Boolean (可选) - 设置为 `false` 时可以创建一个[Frameless Window](frameless-window.md). 默认值为 `true`.
  * `parent` BrowserWindow (可选) - 指定父窗口. 默认值为 `null`.
  * `modal` Boolean (可选) -是否为模态窗. 仅供子窗口使用. 默认值为`false`.
  * `acceptFirstMouse` Boolean (可选) - 是否允许单击页面来激活窗口. 默认值为 `false`.
  * `disableAutoHideCursor` Boolean (可选) - 是否在输入时隐藏鼠标. 默认值为`false`.
  * `autoHideMenuBar` Boolean (可选) - 自动隐藏菜单栏, 除非按了`Alt`键. 默认值为`false`.
  * `enableLargerThanScreen` Boolean (可选) - 是否允许改变窗口的大小时, 大于屏幕的尺寸. 默认值为`false`.
  * `backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha in #AARRGGBB format is supported if `transparent` is set to `true`). 默认值为 `#FFF`（白色）。
  * `hasShadow` Boolean (可选) - 窗口是否有阴影. 仅在 macOS 上支持. 默认值为 `true`.
  * `opacity` Number (可选)-设置窗口初始的不透明度, 介于 0.0 (完全透明) 和 1.0 (完全不透明) 之间。仅支持 Windows 和 macOS 。
  * `darkTheme` Boolean (可选) - 强制窗口使用 dark 主题, 只在一些拥有 GTK+3 桌面环境上有效. 默认值为 `false`.
  * `transparent` Boolean (可选) - 使窗口 [透明](frameless-window.md). 默认值为 `false`.
  * `type` String (可选) - 窗口的类型, 默认为普通窗口. 下面可以查看更多.
  * `titleBarStyle` String (可选) - 窗口标题栏的样式. 默认值为 `default`. 可能的值有： 
    * `default` - 标准灰色不透明的Mac标题栏
    * `hidden` - 隐藏标题栏, 内容充满整个窗口, 但它依然在左上角, 仍然受标准窗口控制.
    * `hiddenInset` - 隐藏标题栏, 显示小的控制按钮在窗口边缘
    * `customButtonsOnHover` Boolean (可选) - 在macOS的无框窗口上绘制自定义的关闭与最小化按钮. 除非鼠标悬停到窗口的左上角, 否则这些按钮不会显示出来. 这些自定义的按钮能防止, 与发生于标准的窗口工具栏按钮处的鼠标事件相关的问题. ** 注意: **此选项目前是实验性的。
  * `fullscreenWindowTitle` Boolean (可选) - 在 macOS 全屏模式时，为所有带 `titleBarStyle` 选项的标题栏显示标题。默认值为 `false`。
  * `thickFrame` Boolean(可选)-对 Windows 上的无框窗口使用` WS_THICKFRAME ` 样式，会增加标准窗口框架。 设置为 `false` 时将移除窗口的阴影和动画. 默认值为 `true`。
  * `vibrancy` String (可选) - 窗口是否使用 vibrancy 动态效果, 仅 macOS 中有效. 可以为 `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` 或 `ultra-dark`. 请注意，结合一个 vibrancy 值使用 `frame: false` ，需要确保`titleBarStyle`为一个非默认值。
  * `zoomToPageWidth` Boolean (可选) - 单击工具栏上的绿色信号灯按钮或单击 窗口>缩放 菜单项时的行为, 仅macOS中有效. 如果为 ` true `, 窗口将放大到网页的本身宽度, ` false ` 将使其缩放到屏幕的宽度。 这也会影响直接调用 ` maximize() ` 时的行为。 默认值为 `false`.
  * `tabbingIdentifier` String (可选) - 选项组卡的名称，在macOS 10.12+上可使窗口在原生选项卡中打开. 具有相同标识符的窗口将被组合在一起。 这还会在窗口的标签栏中添加一个原生的新选项卡按钮, 并允许 ` app ` 和窗口接收 ` new-window-for-tab` 事件。
  * `webPreferences` Object (可选) - 网页功能的设置 
    * `devTools` Boolean (可选) - 是否开启 DevTools. 如果设置为 ` false `, 则无法使用 ` BrowserWindow.webContents.openDevTools () ` 打开 DevTools。 默认值为 `true`。
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Default is `false`.
    * `nodeIntegrationInWorker` Boolean (可选) - 是否在Web工作器中启用了Node集成. 默认值为 `false`. 更多内容参见 [多线程](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (optional) - Experimental option for enabling NodeJS support in sub-frames such as iframes. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not.
    * `preload` String (optional) - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. The value should be the absolute file path to the script. When node integration is turned off, the preload script can reintroduce Node global symbols back to the global scope. See example [here](process.md#event-loaded).
    * `sandbox` Boolean (optional) - If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium OS-level sandbox and disabling the Node.js engine. This is not the same as the `nodeIntegration` option and the APIs available to the preload script are more limited. Read more about the option [here](sandbox-option.md). **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. Default is `true`.
    * `session` [Session](session.md#class-session) (optional) - Sets the session used by the page. Instead of passing the Session object directly, you can also choose to use the `partition` option instead, which accepts a partition string. When both `session` and `partition` are provided, `session` will be preferred. Default is the default session.
    * `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. 通过分配相同的 ` partition `, 多个页可以共享同一会话。 Default is the default session.
    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`. *This property is experimental*
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
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Default is `false`.
    * `enableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.
    * `disableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to disable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family. 
      * `standard` String (optional) - Defaults to `Times New Roman`.
      * `serif` String (optional) - Defaults to `Times New Roman`.
      * `sansSerif` String (optional) - Defaults to `Arial`.
      * `monospace` String (optional) - Defaults to `Courier New`.
      * `cursive` String (optional) - Defaults to `Script`.
      * `fantasy` String (optional) - Defaults to `Impact`.
    * `defaultFontSize` Integer (optional) - Defaults to `16`.
    * `defaultMonospaceFontSize` Integer (optional) - Defaults to `13`.
    * `minimumFontSize` Integer (optional) - Defaults to `0`.
    * `defaultEncoding` String (optional) - Defaults to `ISO-8859-1`.
    * `backgroundThrottling` Boolean (optional) - Whether to throttle animations and timers when the page becomes background. This also affects the [Page Visibility API](#page-visibility). Defaults to `true`.
    * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. Defaults to `false`. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. Child windows will always have node integration disabled. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to `false`. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.
    * `additionalArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Default is `false`.
    * `safeDialogsMessage` String (optional) - The message to display when consecutive dialog protection is triggered. If not defined the default message would be used, note that currently the default message is in English and not localized.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Default is `false`.
    * `autoplayPolicy` String (optional) - Autoplay policy to apply to content in the window, can be `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Defaults to `no-user-gesture-required`.

当使用 ` minWidth `/` maxWidth `/` minHeight `/` maxHeight ` 设置最小或最大窗口大小时, 它只限制用户。 它不会阻止您将不符合大小限制的值传递给 ` setBounds `/` setSize ` 或 ` BrowserWindow ` 的构造函数。

` type ` 选项的可能值和行为与平台相关。可能的值为:

* 在 Linux 上, 可能的类型有 ` desktop `、` dock `、` toolbar `、` splash `、` notification `。
* 在 macOS, 可能的类型是 `desktop`, `textured`. 
  * `textured` 类型增加金属色泽的外观 (`NSTexturedBackgroundWindowMask`).
  * `desktop` 类型将窗口置于桌面背景级别 (`kCGDesktopWindowLevel - 1`). 注意，桌面窗口不会接收焦点、键盘或鼠标事件，但您可以使用< 0> globalShortcut < /0 >接收快捷键的消息
* 在 Windows 上, 可能的类型为 `toolbar`.

### 实例事件

使用 `new BrowserWindow ` 创建的对象具有以下属性:

** 注意: **某些事件仅在特定的操作系统上可用, 这些方法会被标记出来。

#### 事件： 'page-title-updated'

返回:

* `event` Event
* `title` String

文档更改标题时触发，调用`event.preventDefault()`将阻止更改标题

#### 事件： 'close'

返回:

* `event` Event

在窗口要关闭的时候触发。 它在DOM 的`beforeunload` 和 `unload` 事件之前触发. 调用`event.preventDefault()`将阻止这个操作。

通常你想通过 `beforeunload`处理器来决定是否关闭窗口，但是它也会在窗口重载的时候触发. 在 Electron 里，返回除 `undefined`之外的任何值都将取消关闭. 例如：

```javascript
window.onbeforeunload = (e) => {
  console.log('I do not want to be closed')

  // 与通常的浏览器不同,会提示给用户一个消息框,
  //返回非空值将默认取消关闭
  //建议使用对话框 API 让用户确认关闭应用程序.
  e.returnValue = false // 相当于 `return false` ，但是不推荐使用
}
```

***注意**: `window.onbeforeunload = handler` 和 `window.addEventListener('beforeunload', handler)` 的行为有细微的区别。 推荐总是显式地设置 `event.returnValue`, 而不是仅仅返回一个值, 因为前者在Electron中作用得更为一致.*

#### 事件： 'closed'

窗口已经关闭时触发。当你接收到这个事件的时候, 你应当删除对已经关闭的窗口的引用对象和避免再次使用它.

#### 事件: 'session-end' *Windows*

因为强制关机或机器重启或会话注销而导致窗口会话结束时触发

#### 事件: 'unresponsive'

网页变得未响应时触发

#### 事件: 'responsive'

未响应的页面变成响应时触发

#### 事件: 'blur'

当窗口失去焦点时触发

#### 事件: 'focus'

当窗口获得焦点时触发

#### 事件: 'show'

当窗口显示时触发

#### 事件: 'hide'

当窗口隐藏时触发

#### 事件: 'ready-to-show'

当页面已经渲染完成(但是还没有显示) 并且窗口可以被显示时触发

#### 事件: 'maximize'

窗口最大化时触发

#### 事件: 'unmaximize'

当窗口从最大化状态退出时触发

#### 事件: 'minimize'

窗口最小化时触发

#### 事件: 'restore'

当窗口从最小化状态恢复时触发

#### 事件: 'will-resize' *macOS* *Windows*

返回:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - 将要调整到的窗口尺寸。

在调整窗口大小之前发出。调用` event.preventDefault() `会阻止窗口大小被调整。

请注意，仅在手动调整窗口大小时才会发出此信息。使用` setBounds ` 或 ` setSize `调整窗口大小时不会发出此事件。

#### 事件: 'resize'

调整窗口大小后触发。

#### 事件: 'will-move' *Windows*

返回:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - 将要移动的新的窗口位置。

在移动窗口之前发出。调用` event.preventDefault() `会阻止窗口被移动。

请注意，仅在手动调整窗口大小时才会发出此信息。使用` setBounds ` 或 ` setSize `调整窗口大小时不会发出此事件。

#### 事件: 'move'

窗口移动到新位置时触发

**注意**: 在 macOS 上，此事件是` moved `的别名.

#### 事件: 'moved' *macOS*

当窗口移动到新位置时触发一次

#### 事件: 'enter-full-screen'

窗口进入全屏状态时触发

#### 事件: 'leave-full-screen'

窗口离开全屏状态时触发

#### 事件: 'enter-html-full-screen'

窗口进入由HTML API 触发的全屏状态时触发

#### 事件: 'leave-html-full-screen'

窗口离开由HTML API触发的全屏状态时触发

#### 事件: 'always-on-top-changed' *macOS*

返回:

* `event` Event
* `isAlwaysOnTop` Boolean

设置或取消设置窗口总是在其他窗口的顶部显示时触发。

#### Event: 'app-command' *Windows* *Linux*

返回:

* `event` Event
* `command` String

请求一个[应用程序命令](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx)时触发. 典型的是键盘上的媒体键或浏览器命令, 以及在Windows上的一些鼠标中内置的“后退”按钮。

命令是小写的，下划线替换为连字符，以及`APPCOMMAND_` 前缀将被删除。 例如 `APPCOMMAND_BROWSER_BACKWARD`将被`browser-backward`触发.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // 当用户点击鼠标返回按钮时，导航窗口会后退
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

The following app commands are explictly supported on Linux:

* `browser-backward`
* `browser-forward`

#### 事件: 'scroll-touch-begin' *macOS*

Emitted when scroll wheel event phase has begun.

#### 事件: 'scroll-touch-end' *macOS*

Emitted when scroll wheel event phase has ended.

#### 事件: 'scroll-touch-edge' *macOS*

Emitted when scroll wheel event phase filed upon reaching the edge of element.

#### 事件: 'swipe' *macOS*

返回:

* `event` Event
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### 事件: 'sheet-begin' *macOS*

Emitted when the window opens a sheet.

#### 事件: 'sheet-end' *macOS*

Emitted when the window has closed a sheet.

#### 事件: 'new-window-for-tab' *macOS*

Emitted when the native new tab button is clicked.

### 静态方法

The `BrowserWindow` class has the following static methods:

#### `BrowserWindow.getAllWindows()`

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow | null` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserWindow` - The window that owns the given `webContents`.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

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
const { BrowserWindow } = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

### 实例属性

Objects created with `new BrowserWindow` have the following properties:

```javascript
const { BrowserWindow } = require('electron')
// 在这个例子中,`win` 是我们的实例
let win = new BrowserWindow({ width: 800, height: 600 })
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

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

Enters or leaves simple fullscreen mode.

Simple fullscreen mode emulates the native fullscreen behavior found in versions of Mac OS X prior to Lion (10.7).

#### `win.isSimpleFullScreen()` *macOS*

Returns `Boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.isNormal()`

Returns `Boolean` - Whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
* `extraSize` [Size](structures/size.md) - The extra size not to be included while maintaining the aspect ratio.

This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.

Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Sum any extra width and height areas you have within the overall content view.

Calling this function with a value of `0` will remove any previously set aspect ratios.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported if `transparent` is `true`). 默认值为 `#FFF`（白色）。

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String - The absolute path to the file to preview with QuickLook. This is important as Quick Look uses the file name and file extension on the path to determine the content type of the file to open.
* `displayName` String (optional) - The name of the file to display on the Quick Look modal view. This is purely visual and does not affect the content type of the file. Defaults to `path`.

Uses [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) to preview a file at a given path.

#### `win.closeFilePreview()` *macOS*

Closes the currently open [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) panel.

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (可选) *macOS*

Resizes and moves the window to the supplied bounds. Any properties that are not supplied will default to their current values.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

// set all bounds properties
win.setBounds({ x: 440, y: 225, width: 800, height: 600 })

// set a single bounds property
win.setBounds({ width: 100 })

// { x: 440, y: 225, width: 100, height: 600 }
console.log(win.getBounds())
```

#### `win.getBounds()`

返回 [`Rectangle`](structures/rectangle.md)

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (可选) *macOS*

Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.

#### `win.getContentBounds()`

返回 [`Rectangle`](structures/rectangle.md)

#### `win.getNormalBounds()`

Returns [`Rectangle`](structures/rectangle.md) - Contains the window bounds of the normal state

**Note:** whatever the current state of the window : maximized, minimized or in fullscreen, this function always returns the position and size of the window in normal state. In normal state, getBounds and getNormalBounds returns the same [`Rectangle`](structures/rectangle.md).

#### `win.setEnabled(enable)`

* `enable` Boolean

Disable or enable the window.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (可选) *macOS*

Resizes the window to `width` and `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

Returns `Integer[]` - Contains the window's width and height.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (可选) *macOS*

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
* `level` String (optional) *macOS* - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating`. See the [macOS docs](https://developer.apple.com/documentation/appkit/nswindow/level) for more details.
* `relativeLevel` Integer (optional) *macOS* - The number of layers higher to set this window relative to the given `level`. The default is `0`. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Returns `Boolean` - Whether the window is always on top of other windows.

#### `win.moveTop()` *macOS* *Windows*

Moves window to top(z-order) regardless of focus

#### `win.center()`

Moves window to the center of the screen.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (可选) *macOS*

Moves window to `x` and `y`.

#### `win.getPosition()`

Returns `Integer[]` - Contains the window's current position.

#### `win.setTitle(title)`

* `title` String

Changes the title of native window to `title`.

#### `win.getTitle()`

Returns `String` - The title of the native window.

**Note:** The title of the web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:

```javascript
const { BrowserWindow } = require('electron')
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
* `callback` Function - 回调函数 
  * `image` [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Upon completion `callback` will be called with `callback(image)`. The `image` is an instance of [NativeImage](native-image.md) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.

**[Deprecated Soon](promisification.md)**

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture

* Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

#### `win.loadURL(url[, options])`

* `url` String
* `参数` Object (可选) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (可选) - 发起请求的 userAgent.
  * `extraHeaders` String (可选) - 用 "\n" 分割的额外标题
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (可选) - 要加载的数据文件的根 url(带有路径分隔符). 只有当指定的 `url`是一个数据 url 并需要加载其他文件时，才需要这样做。

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

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

#### `win.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (可选) 
  * `query` Object (可选) - 传递给 `url.format()`.
  * `search` String (可选) - 传递给 `url.format()`.
  * `hash` String (可选) - 传递给 `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar.

#### `win.removeMenu()` *Linux* *Windows*

Remove the window's menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `参数` Object (可选) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `app.getName().desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)` *macOS*

* `hasShadow` Boolean

Sets whether the window should have a shadow. On Windows and Linux does nothing.

#### `win.hasShadow()` *macOS*

Returns `Boolean` - Whether the window has a shadow.

On Windows and Linux always returns `true`.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` *Windows* *macOS*

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque)

#### `win.setShape(rects)` *Windows* *Linux* *Experimental*

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Object - 过滤器对象，包含过滤参数 
  * `icon` [NativeImage](native-image.md) - The icon showing in thumbnail toolbar.
  * `click` Function
  * `tooltip` String (可选) - 按钮的提示文本.
  * `flags` String[] (可选) - 控制按钮特定的状态和行为. 默认为 `['enabled']`.

`flags` 属性是一个数组，包含以下`String`类型的值:

* `enabled` - 该按钮处于活动状态并可供用户使用.
* `disabled` - 该按钮被禁用。 它存在，但有一个显示状态表明它不会响应用户操作。
* `dismissonclick` - 当按钮被点击时，缩略图窗口立即关闭。
* `nobackground` - 不可以画按钮边框，只能使用图片背景。
* `hidden` - 该按钮对用户不可见。
* `noninteractive` - 该按钮已启用，但处于未激活状态; 没有绘制按钮按下状态。 这个值用于通知功能的按钮实例。

#### `win.setThumbnailClip(region)` *Windows*

* `region` [Rectangle](structures/rectangle.md) - Region of the window

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` *Windows*

* `参数` Object - 过滤器对象，包含过滤参数 
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` *macOS*

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `icon` [NativeImage](native-image.md)

Changes window icon.

#### `win.setWindowButtonVisibility(visible)` *macOS*

* `visible` Boolean

Sets whether the window traffic light buttons should be visible.

This cannot be called when `titleBarStyle` is set to `customButtonsOnHover`.

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

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `参数` Object (可选) 
  * `visibleOnFullScreen` Boolean (optional) *macOS* - Sets whether the window should be visible above fullscreen windows

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `参数` Object (可选) 
  * `forward` Boolean (optional) *macOS* *Windows* - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *Windows*

* `focusable` Boolean

Changes whether the window can be focused.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Returns `BrowserWindow` - The parent window.

#### `win.getChildWindows()`

Returns `BrowserWindow[]` - All child windows.

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

**注意:** TouchBar API目前为实验性质，以后的Electron版本可能会更改或删除。

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md). Attach browserView to win. If there is some other browserViews was attached they will be removed from this window.

#### `win.getBrowserView()` *Experimental*

Returns `BrowserView | null` - an BrowserView what is attached. Returns `null` if none is attached. Throw error if multiple BrowserViews is attached.

#### `win.addBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

Replacement API for setBrowserView supporting work with multi browser views.

#### `win.removeBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` *Experimental*

Returns array of `BrowserView` what was an attached with addBrowserView or setBrowserView.

**Note:** The BrowserView API is currently experimental and may change or be removed in future Electron releases.