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

如果想创建一个无边框或者任意形状的透明窗口，你可以使用[Frameless Window](frameless-window.md) 的API

## 优雅地显示窗口

当页面在窗口中直接加载时，用户会看到未完成的页面，这不是一个好的原生应用的体验。为了让画面显示时没有视觉闪烁，有两种不同的解决方案。

### 使用`ready-to-show`事件

在加载页面时，渲染进程第一次完成绘制时，如果窗口还没有被显示，渲染进程会发出 `ready-to-show` 事件 。 在此事件后显示窗口将没有视觉闪烁：

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

* 在所有平台上, 可见性状态与窗口是否隐藏/最小化相关。
* 此外, 在 macOS 上, 可见性状态还会跟踪窗口的遮挡状态。 如果窗口被另一个窗口完全遮挡了，可见性状态为`hidden`. 在其他平台上，可见性状态只有在使用 `win.hide()`使窗口最小化或者隐藏时才为 `hidden`
* 如果创建`BrowserWindow` 时带有 `show: false`的参数, 最初的可见性状态将为`visible` 尽管窗口实际上是隐藏的。
* 如果`backgroundThrottling`被禁用，可见性状态将保持为`visible` 即使窗口被最小化、遮挡或隐藏。

推荐您在可见性状态为 `hidden` 时暂停消耗资源的操作以便减少电力消耗。

### 平台相关的提示

* 在 macOS 上，modal 窗口将显示为附加到父窗口的工作表。
* 在 macOS 上，子窗口将保持与父窗口的相对位置。而在 Windows 和 Linux 中，当父窗口移动时子窗口不会移动。
* 在Linux上，模态窗口的类型将更改为 `dialog`.
* 在Linux上，许多桌面环境不支持隐藏模态窗口。

## Class: BrowserWindow

> 创建和控制浏览器窗口。

进程：[主进程](../glossary.md#main-process)

`BrowserWindow` 是一个[EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

通过 `options` 可以创建一个具有原生属性的 `BrowserWindow` 。

### `new BrowserWindow([options])`

* `options` Object (optional)
  * `width` Integer (optional) - Window's width in pixels. Default is `800`.
  * `height` Integer (optional) - Window's height in pixels. Default is `600`.
  * `x` Integer (optional) (**required** if y is used) - Window's left offset from screen. Default is to center the window.
  * `y` Integer (optional) (**required** if x is used) - Window's top offset from screen. Default is to center the window.
  * `useContentSize` Boolean (可选) - `width` 和 `height` 将设置为 web 页面的尺寸(译注: 不包含边框), 这意味着窗口的实际尺寸将包括窗口边框的大小，稍微会大一点。 默认值为 `false`.
  * `center` Boolean (可选) - 窗口在屏幕居中.
  * `minWidth` Integer (optional) - Window's minimum width. Default is `0`.
  * `minHeight` Integer (optional) - Window's minimum height. Default is `0`.
  * `maxWidth` Integer (optional) - Window's maximum width. Default is no limit.
  * `maxHeight` Integer (optional) - Window's maximum height. Default is no limit.
  * `resizable` Boolean (optional) - Whether window is resizable. 默认值为 `true`。
  * `movable` Boolean (optional) - Whether window is movable. This is not implemented on Linux. 默认值为 `true`。
  * `minimizable` Boolean (optional) - Whether window is minimizable. This is not implemented on Linux. 默认值为 `true`。
  * `maximizable` Boolean (optional) - Whether window is maximizable. This is not implemented on Linux. 默认值为 `true`。
  * `closable` Boolean (optional) - Whether window is closable. This is not implemented on Linux. 默认值为 `true`。
  * ` focusable ` Boolean (可选) - 窗口是否可以聚焦. 默认值为 `true`。 在 Windows 中设置 `focusable: false` 也意味着设置了`skipTaskbar: true`. 在 Linux 中设置 `focusable: false` 时窗口停止与 wm 交互, 并且窗口将始终置顶。
  * `alwaysOnTop` Boolean (optional) - Whether the window should always stay on top of other windows. 默认值为 `false`.
  * ` fullscreen ` Boolean (可选) - 窗口是否全屏. 当明确设置为 `false` 时，在 macOS 上全屏的按钮将被隐藏或禁用. 默认值为 `false`.
  * ` fullscreenable ` Boolean (可选) - 窗口是否可以进入全屏状态. 在 macOS上, 最大化/缩放按钮是否可用 默认值为 `true`。
  * `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. 默认值为 `false`.
  * `skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. Default is `false`.
  * `kiosk` Boolean (optional) - The kiosk mode. 默认值为 `false`.
  * `title`String(可选) - 默认窗口标题 默认为`"Electron"`。 如果由`loadURL()`加载的HTML文件中含有标签`<title>`，此属性将被忽略。
  * `icon` ([NativeImage](native-image.md) | String) (可选) - 窗口的图标. 在 Windows 上推荐使用 `ICO` 图标来获得最佳的视觉效果, 默认使用可执行文件的图标.
  * `show` Boolean (optional) - Whether window should be shown when created. 默认值为 `true`。
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). 默认值为 `true`。
  * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. 默认值为 `false`.
  * `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
  * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. 默认值为 `false`.
  * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. 默认值为 `false`.
  * `enableLargerThanScreen` Boolean (可选) - 是否允许改变窗口的大小使之大于屏幕的尺寸. 默认值为 `false`.
  * `backgroundColor` String(可选) - 窗口的背景颜色为十六进制值，例如`#66CD00`, `#FFF`, `#80FFFFFF` (设置`transparent`为`true`方可支持alpha属性，格式为#AARRGGBB)。 默认值为 `#FFF`（白色）。
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. This is only implemented on macOS. 默认值为 `true`。
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. 默认值为 `false`.
  * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md). 默认值为 `false`.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Possible values are:
    * `default` - 标准灰色不透明的Mac标题栏
    * `hidden` - 隐藏标题栏, 内容充满整个窗口, 但它依然在左上角, 仍然受标准窗口控制.
    * `hiddenInset` - 隐藏标题栏, 显示小的控制按钮在窗口边缘
    * `customButtonsOnHover` Boolean (可选) - 在macOS的无框窗口上绘制自定义的关闭与最小化按钮. 除非鼠标悬停到窗口的左上角, 否则这些按钮不会显示出来. 这些自定义的按钮能防止, 与发生于标准的窗口工具栏按钮处的鼠标事件相关的问题. ** 注意: **此选项目前是实验性的。
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. 默认值为 `false`.
  * `thickFrame` Boolean(可选)-对 Windows 上的无框窗口使用` WS_THICKFRAME ` 样式，会增加标准窗口框架。 设置为 `false` 时将移除窗口的阴影和动画. 默认值为 `true`。
  * `vibrancy` String (可选) - 窗口是否使用 vibrancy 动态效果, 仅 macOS 中有效. 可以为 `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` 或 `ultra-dark`.  请注意，结合一个 vibrancy 值使用 `frame: false` ，需要确保`titleBarStyle`为一个非默认值。
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. 如果为 ` true `, 窗口将放大到网页的本身宽度, ` false ` 将使其缩放到屏幕的宽度。 这也会影响直接调用 ` maximize() ` 时的行为。 默认值为 `false`.
  * `tabbingIdentifier` String (可选) - 选项组卡的名称，在macOS 10.12+上可使窗口在原生选项卡中打开. 具有相同标识符的窗口将被组合在一起。 这还会在窗口的标签栏中添加一个原生的新选项卡按钮, 并允许 ` app ` 和窗口接收 ` new-window-for-tab` 事件。
  * `webPreferences` Object (optional) - Settings of web page's features.
    * `devTools` Boolean (可选) - 是否开启 DevTools. 如果设置为 ` false `, 则无法使用 ` BrowserWindow.webContents.openDevTools () ` 打开 DevTools。 默认值为 `true`。
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. 默认值为 `false`.
    * `nodeIntegrationInWorker` Boolean (可选) - 是否在Web工作器中启用了Node集成. 默认值为 `false`. 更多内容参见 [多线程](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (可选项)(实验性)，是否允许在子页面(iframe)或子窗口(child window)中集成Node.js； 预先加载的脚本会被注入到每一个iframe，你可以用 `process.isMainFrame` 来判断当前是否处于主框架（main frame）中。
    * `preload` String (可选) -在页面运行其他脚本之前预先加载指定的脚本 无论页面是否集成Node, 此脚本都可以访问所有Node API 脚本路径为文件的绝对路径。 当 node integration 关闭时, 预加载的脚本将从全局范围重新引入node的全局引用标志 [参考示例](process.md#event-loaded).
    * `sandbox` Boolean (可选)-如果设置该参数, 沙箱的渲染器将与窗口关联, 使它与Chromium OS-level 的沙箱兼容, 并禁用 Node. js 引擎。 它与 `nodeIntegration` 的选项不同，且预加载脚本的 API 也有限制. [更多详情](sandbox-option.md). **注意:**改选项目前是为实验性质，可能会在 Electron 未来的版本中移除。
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. 默认值为 `true`。
    * `session` [Session](session.md#class-session) (可选) - 设置页面的 session 而不是直接忽略 Session 对象, 也可用 `partition` 选项来代替，它接受一个 partition 字符串. 同时设置了`session` 和 `partition`时, `session` 的优先级更高. 默认使用默认的 session.
    * `partition` String (optional) - 通过 session 的 partition 字符串来设置界面session. 如果 `partition` 以 `persist:`开头, 该页面将使用持续的 session，并在所有页面生效，且使用同一个`partition`. 如果没有 `persist:` 前缀, 页面将使用 in-memory session. 通过分配相同的 ` partition `, 多个页可以共享同一会话。 默认使用默认的 session.
    * `affinity` String (可选) - 当指定，具有相同`affinity` 的 web页面将在相同的渲染进程运行。 需要注意的是，由于渲染过程中会有代码重用，如 `webPreferences`的`preload`, `sandbox` 和 `nodeIntegration`等选项会在不同页面之间共用，即使你已经在不同页面中为同一选项设置过不同的值，它们仍会被共用。 因此，建议为`affinity`相同的页面，使用相同的 `webPreferences` _这一选项当前是实验性的_
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. 默认值为 `true`。
    * `webSecurity` Boolean (可选) - 当设置为 `false`, 它将禁用同源策略 (通常用来测试网站), 如果此选项不是由开发者设置的，还会把 `allowRunningInsecureContent`设置为 `true`. 默认值为 `true`。
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. 默认值为 `false`.
    * `images` Boolean (optional) - Enables image support. 默认值为 `true`。
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. 默认值为 `true`。
    * `plugins` Boolean (optional) - Whether plugins should be enabled. 默认值为 `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. 默认值为 `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. 默认值为 `false`.
    * `enableBlinkFeatures`String(可选) - 以`逗号`分隔的需要启用的特性列表，譬如`CSSVariables,KeyboardEventKey` 在 [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70)文件中查看被支持的所有特性.
    * `disableBlinkFeatures` String (可选) - 以 `,`分隔的禁用特性列表, 如 `CSSVariables,KeyboardEventKey`. 在[RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) 文件中查看被支持的所有特性.
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family.
      * `standard` String (可选) - 默认值为 `Times New Roman`.
      * `serif` String (可选) - 默认值为 `Times New Roman`.
      * ` sansSerif ` String (可选) - 默认值为 `Arial`.
      * ` monospace ` String (可选) - 默认值为 `Courier New`.
      * ` cursive ` String (可选) - 默认值为 ` Script `.
      * ` fantasy ` String (可选) - 默认值为 ` Impact `.
    * `defaultFontSize` Integer (可选) - 默认值为 `16`.
    * `defaultMonospaceFontSize` Integer (可选) - 默认值为 `13`.
    * ` minimumFontSize ` Integer (可选) - 默认值为 `0`.
    * ` defaultEncoding ` String (可选) - 默认值为 `ISO-8859-1`.
    * ` backgroundThrottling `Boolean (可选)-是否在页面成为背景时限制动画和计时器。 这也会影响到 [Page Visibility API](#page-visibility). 默认值为 `true`。
    * `offscreen` Boolean (optional) - 是否绘制和渲染可视区域外的窗口. 默认值为 `false`. 更多详情, 请参见 [ offscreen rendering tutorial ](../tutorial/offscreen-rendering.md)。
    * `contextIsolation` Boolean (可选) - 是否在独立 JavaScript 环境中运行 Electron API和指定的`preload` 脚本. 默认值为 `false`. `preload`脚本的运行环境仍然可以访问`document` 和 `window`全局变量，但它将使用自己内置的函数 (如`Array`, `Object`, `JSON`等)，并且将被加载的页面与对全局环境所做的任何更改隔离开来. Electron API 仅在 `preload` 脚本中有效，而不是加载的页面。 在加载可能不受信任的远程内容时, 应使用此选项, 以确保加载的内容不能篡改 ` preload ` 脚本和使用的 Electron APIs。 此选项使用 [ Chrome Content Scripts ](https://developer.chrome.com/extensions/content_scripts#execution-environment) 使用的相同技术。 通过在控制台选项卡顶部的组合框中选择 "Electron Isolated Context" 条目, 可以在开发工具中访问此上下文。
    * `nativeWindowOpen` Boolean (可选) - 是否使用原生的`window.open()`. 默认值为 `false`. Child windows will always have node integration disabled unless `nodeIntegrationInSubFrames` is true. ** 注意: **此选项目前是实验性的。
    * `webviewTag` Boolean (可选) - 是否启用 [`<webview>` tag](webview-tag.md)标签. 默认值为 `false`. ** 注意: **为 `< webview>` 配置的 ` preload ` 脚本在执行时将启用节点集成, 因此应确保远程或不受信任的内容无法创建恶意的 ` preload ` 脚本 。 可以使用 [ webContents ](web-contents.md) 上的 ` will-attach-webview ` 事件对 ` preload ` 脚本进行剥离, 并验证或更改 `<webview>` 的初始设置。
    * `additionalArguments` String\[] (可选) - 一系列将会被附加至此app的渲染进程的`process.argv`的字符串. 对于将少量数据向下传至渲染进程的预加载脚本而言是十分实用的.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. 默认值为 `false`.
    * `safeDialogsMessage` String (可选) - 当持续对话框保护被触发时显示的消息。 如果没有定义，那么将使用缺省的消息。注意：当前缺省消息是英文，并没有本地化。
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. 默认值为 `false`.
    * `autoplayPolicy` String (optional) - Autoplay policy to apply to content in the window, can be `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Defaults to `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.

当使用 ` minWidth `/` maxWidth `/` minHeight `/` maxHeight ` 设置最小或最大窗口大小时, 它只限制用户。 它不会阻止您将不符合大小限制的值传递给 ` setBounds `/` setSize ` 或 ` BrowserWindow ` 的构造函数。

The possible values and behaviors of the `type` option are platform dependent. Possible values are:

* 在 Linux 上, 可能的类型有 ` desktop `、` dock `、` toolbar `、` splash `、` notification `。
* On macOS, possible types are `desktop`, `textured`.
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
* `explicitSet` Boolean

文档更改标题时触发，调用`event.preventDefault()`将阻止更改标题 `explicitSet` is false when title is synthesized from file url.

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
_**注意**: `window.onbeforeunload = handler` 和 `window.addEventListener('beforeunload', handler)` 的行为有细微的区别。 推荐总是显式地设置 `event.returnValue`, 而不是仅仅返回一个值, 因为前者在Electron中作用得更为一致._

#### 事件： 'closed'

Emitted when the window is closed. After you have received this event you should remove the reference to the window and avoid using it any more.

#### 事件: 'session-end' _Windows_

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

#### 事件: 'will-resize' _macOS_ _Windows_

返回:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - 将要调整到的窗口尺寸。

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### 事件: 'resize'

调整窗口大小后触发。

#### 事件: 'will-move' _Windows_

返回:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - 将要移动的新的窗口位置。

Emitted before the window is moved. Calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### 事件: 'move'

窗口移动到新位置时触发

__注意__: 在 macOS 上，此事件是` moved `的别名.

#### 事件: 'moved' _macOS_

当窗口移动到新位置时触发一次

#### 事件: 'enter-full-screen'

窗口进入全屏状态时触发

#### 事件: 'leave-full-screen'

窗口离开全屏状态时触发

#### 事件: 'enter-html-full-screen'

窗口进入由HTML API 触发的全屏状态时触发

#### 事件: 'leave-html-full-screen'

窗口离开由HTML API触发的全屏状态时触发

#### Event: 'always-on-top-changed'

返回:

* `event` Event
* `isAlwaysOnTop` Boolean

设置或取消设置窗口总是在其他窗口的顶部显示时触发。

#### 事件： 'app-command' _Windows__Linux_

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

#### 事件: 'scroll-touch-begin' _macOS_

滚轮事件阶段开始时触发

#### 事件: 'scroll-touch-end' _macOS_

滚轮事件阶段结束时触发

#### 事件: 'scroll-touch-edge' _macOS_

滚轮事件阶段到达元素边缘时触发

#### 事件: 'swipe' _macOS_

返回:

* `event` Event
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### 事件: 'sheet-begin' _macOS_

窗口打开sheet(工作表) 时触发

#### 事件: 'sheet-end' _macOS_

窗口关闭sheet(工作表) 时触发

#### 事件: 'new-window-for-tab' _macOS_

当点击了系统的新标签按钮时触发

### 静态方法

`BrowserWindow` 类有以下方法:

#### `BrowserWindow.getAllWindows()`

返回 `BrowserWindow[]` - 所有打开的窗口的数组

#### `BrowserWindow.getFocusedWindow()`

返回 `BrowserWindow | null` - 此应用程序中当前获得焦点的窗口，如果无就返回 `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

返回 `BrowserWindow` - 拥有给定 `webContents` 的窗口.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

返回 `BrowserWindow` -拥有给定 `id` 的窗口.

#### `BrowserWindow.addExtension(path)`

* `path` String

添加位于 `path`的扩展，并且返回扩展名

该方法如果扩展的 manifest 缺失或不完整，该方法不会返回。

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.

#### `BrowserWindow.removeExtension(name)`

* `name` 字符串

根据名字删除一个 Chrome 的扩展。

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.

#### `BrowserWindow.getExtensions()`

返回 `Object` - 键是扩展名, 每个值都是一个包含 `name` 和 `version` 属性的对象.

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

添加位于 `path`的 DevTools 扩展，并且返回扩展名

扩展将被记住, 所以你只需要调用这个API一次, 这个API不是用于编程使用. 如果尝试添加已经加载的扩展, 此方法将不会返回, 而是会向控制台记录警告.

该方法如果扩展的 manifest 缺失或不完整，该方法不会返回。

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` 字符串

根据名字删除一个 DevTools 的扩展。

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.

#### `BrowserWindow.getDevToolsExtensions()`

返回 `Object` - 键是扩展名, 每个值都是一个包含 `name` 和 `version` 属性的对象.

要检查是否安装了 DevTools 扩展，您可以运行以下内容:

```javascript
const { BrowserWindow } = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.

### 实例属性

使用 `new BrowserWindow ` 创建的对象具有以下属性:

```javascript
const { BrowserWindow } = require('electron')
// 在这个例子中,`win` 是我们的实例
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents`

A `WebContents` object this window owns. All web page related events and operations will be done via it.

有关它的方法和事件, 请参见 [`webContents` documentation](web-contents.md)

#### `win.id`

`Integer` 窗口的唯一ID

### 实例方法

使用 `new BrowserWindow `创建的对象具有以下实例方法:

** 注意: **某些方法仅在特定的操作系统上可用, 这些方法会被标记出来。

#### `win.destroy()`

强制关闭窗口, 除了` closed `之外，`close`，`unload` 和 `beforeunload` 都不会被触发

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focus()`

聚焦于窗口

#### `win.blur()`

取消窗口的聚焦

#### `win.isFocused()`

返回 `Boolean` - 判断窗口是否聚焦

#### `win.isDestroyed()`

返回 `Boolean` -判断窗口是否被销毁

#### `win.show()`

显示并聚焦于窗口

#### `win.showInactive()`

显示但不聚焦于窗口

#### `win.hide()`

隐藏窗口

#### `win.isVisible()`

返回 `Boolean` - 判断窗口是否可见

#### `win.isModal()`

返回 `Boolean` - 判断是否为模态窗口

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

取消窗口最大化

#### `win.isMaximized()`

返回 `Boolean` - 判断窗口是否最大化

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

将窗口从最小化状态恢复到以前的状态。

#### `win.isMinimized()`

返回 `Boolean` -判断窗口是否最小化

#### `win.setFullScreen(flag)`

* `flag` Boolean

设置窗口是否应处于全屏模式。

#### `win.isFullScreen()`

返回 `Boolean` - 窗口当前是否已全屏

#### `win.setSimpleFullScreen(flag)` _macOS_

* `flag` Boolean

进入或离开简单的全屏模式。

简单全屏模式模拟 Mac OS X prior to Lion (10.7) 版本中发现的原生全屏行为。

#### `win.isSimpleFullScreen()` _macOS_

返回 `Boolean` - 窗口是否为简单全屏模式(pre-Lion)。

#### `win.isNormal()`

返回 `Boolean` - 窗口是否处于正常状态（未最大化，未最小化，不在全屏模式下）。

#### `win.setAspectRatio(aspectRatio[, extraSize])` _macOS_

* ` aspectRatio ` Float- 为内容视图保持的宽高比.
* `extraSize` [Size](structures/size.md) - 维持高宽比值时不包含的额外大小

这将使窗口保持长宽比。 额外的大小允许开发人员有空间 (以像素为单位), 不包括在纵横比计算中。 此 API 已经考虑了窗口大小和内容大小之间的差异。

想象一个使用高清视频播放器和相关控件的普通窗口。 假假如左边缘有15px, 右边缘有25px, 在播放器下面有50px. 为了保持16:9 的长宽比 (标准的HD长宽比为1920x1080)， 我们可以调用这个api传入参数16/9 和[ 40,50 ]. 第二个参数不管网页中的额外的宽度和高度在什么位置, 只要它们存在就行. 在全部内部窗口中，加上任何额外的宽度和高度 。

使用 `0` 调用此函数，将会移除先前设置的宽高比。

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - 十六进制的窗口背景色，如 `#66CD00`、`#FFF`和`#80FFFFFF`。 (如果`transparent`是`true`的话，也支持alpha 通道。) 默认值为 `#FFF`（白色）。

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` _macOS_

* `path` String -要用 QuickLook 预览的文件的绝对路径。 这一点很重要，因为Quick Look 使用了路径上的文件名和文件扩展名 来决定要打开的文件的内容类型。
* `displayName` String (可选) - 在Quick Look 模态视图中显示的文件的名称。 这完全是视觉的，不会影响文件的内容类型。 默认值为 `path`.

使用 [Quick Look](https://en.wikipedia.org/wiki/Quick_Look)来预览路径中的文件.

#### `win.closeFilePreview()` _macOS_

关闭当前打开的 [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) 面板.

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (可选) _macOS_

重置窗口，并且移动窗口到指定的位置. Any properties that are not supplied will default to their current values.

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

Returns [`Rectangle`](structures/rectangle.md) - The `bounds` of the window as `Object`.

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (可选) _macOS_

调整窗口的工作区 (如网页) 的大小并将其移动到所提供的边界。

#### `win.getContentBounds()`

Returns [`Rectangle`](structures/rectangle.md) - The `bounds` of the window's client area as `Object`.

#### `win.getNormalBounds()`

返回 [`Rectangle`](structures/rectangle.md) - 包含正常状态下的窗口大小。

**注意：**无论当前的窗口状态为：最大化、最小化或者全屏，这个方法都将得到窗口在正常显示状态下的位置信息以及大小信息。 在正常状态下，getBounds 与 getNormalBounds 得到的边界信息 [`Rectangle`](structures/rectangle.md) 是一致的。

#### `win.setEnabled(enable)`

* `enable` Boolean

禁用或者启用窗口。

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (可选) _macOS_

调整窗口的`width`和 `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

返回 ` Integer [] `-包含窗口的宽度和高度。

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (可选) _macOS_

将窗口的工作区 (如网页) 的大小调整为 ` width ` 和 ` height `。

#### `win.getContentSize()`

返回 ` Integer [] `-包含窗口的宽度和高度。

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

设置窗口最小化的 `width` 和`height`.

#### `win.getMinimumSize()`

返回 ` Integer [] `-包含窗口最小化的宽度和高度。

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

设置窗口最大化的 `width` 和 `height`.

#### `win.getMaximumSize()`

返回 ` Integer [] `-包含窗口最大化的宽度和高度。

#### `win.setResizable(resizable)`

* `resizable` Boolean

设置用户是否可以手动调整窗口大小。

#### `win.isResizable()`

返回 `Boolean` - 设置窗口是否可以被用户改变大小.

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### `win.isMovable()` _macOS_ _Windows_

返回 `Boolean` - 窗口是否可以被用户拖动

在 Linux 上总是返回 ` true `。

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` _macOS_ _Windows_

返回 `Boolean` -窗口是否可以最小化

在 Linux 上总是返回 ` true `。

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` _macOS_ _Windows_

返回 `Boolean` - 窗口是否可以最大化.

在 Linux 上总是返回 ` true `。

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

设置点击最大化按钮是否可以全屏或最大化窗口.

#### `win.isFullScreenable()`

返回 `Boolean` - 是否为全屏状态或窗口最大化

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

#### `win.isClosable()` _macOS_ _Windows_

返回 `Boolean` - 窗口是否可以被用户关闭.

在 Linux 上总是返回 ` true `。

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (可选) _macOS_ - 可以为下面的值 `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, 和 ~~`dock`~~ (参考值). 默认值为 `floating`. 更多信息，请查阅 [macOS docs](https://developer.apple.com/documentation/appkit/nswindow/level)
* `relativeLevel` Integer (可选) _macOS_ - 设置此窗口相对于给定 `级别`的层数。. 默认值为`0`. 请注意, Apple 不鼓励在 ` 屏幕保护程序 ` 之上设置高于1的级别。

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

返回 `Boolean` - 当前窗口是否始终在其它窗口之前.

#### `win.moveTop()`

无论焦点如何, 将窗口移至顶端(z轴上的顺序).

#### `win.center()`

将窗口移动到屏幕中央。

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (可选) _macOS_

将窗口移动到 ` x ` 和 ` y `。

#### `win.getPosition()`

返回 `Integer[]` - 返回一个包含当前窗口位置的数组.

#### `win.setTitle(title)`

* `title` String

将原生窗口的标题更改为 ` title `。

#### `win.getTitle()`

返回 ` String `-原生窗口的标题。

**Note:** The title of the web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

* `offsetY` Float
* `offsetX` Float (可选)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. 例如：

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

启动或停止闪烁窗口, 以吸引用户的注意。

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

使窗口不显示在任务栏中。

#### `win.setKiosk(flag)`

* `flag` Boolean

进入或离开 kiosk 模式。

#### `win.isKiosk()`

返回 `Boolean` - 判断窗口是否处于kiosk模式.

#### `win.getNativeWindowHandle()`

返回 `Buffer` - 窗口的平台特定句柄

Windows上句柄类型为 `HWND`，macOS 上为 `NSView*`，Linux 上为`Window` (`unsigned long`)

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Function

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

返回 `Boolean` - `true` 或`false` ，具体取决于是否钩挂了消息.

#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

取消窗口信息的钩子。

#### `win.unhookAllWindowMessages()` _Windows_

取消所有窗口信息的钩子。

#### `win.setRepresentedFilename(filename)` _macOS_

* `filename` String

设置窗口所代表的文件的路径名，并且将这个文件的图标放在窗口标题栏上。

#### `win.getRepresentedFilename()` _macOS_

返回 `String` - 获取窗口当前文件路径.

#### `win.setDocumentEdited(edited)` _macOS_

* `edited` Boolean

明确指出窗口文档是否可以编辑, 如果设置为`true`则将标题栏的图标变成灰色.

#### `win.isDocumentEdited()` _macOS_

返回 `Boolean` - 判断当前窗口文档是否可编辑.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (可选) - 捕获的区域
* `callback` Function
  * `image` [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Upon completion `callback` will be called with `callback(image)`. The `image` is an instance of [NativeImage](native-image.md) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.

**[即将弃用](modernization/promisification.md)**

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (可选) - 捕获的区域

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (可选) - 一个 HTTP Referrer url。
  * `userAgent` String (可选) - 发起请求的 userAgent.
  * `extraHeaders` String (可选) - 用 "\n" 分割的额外标题
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (可选)
  * `baseURLForDataURL` String (可选) - 要加载的数据文件的根 url(带有路径分隔符). 只有当指定的 `url`是一个数据 url 并需要加载其他文件时，才需要这样做。

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

`url` 可以是远程地址 (例如 `http://`),也可以是 `file://` 协议的本地HTML文件的路径.

为了确保文件网址格式正确, 建议使用Node的 [` url.format `](https://nodejs.org/api/url.html#url_url_format_urlobject) 方法:

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

您可以通过执行以下操作, 使用带有网址编码数据的 `POST`请求​​加载网址:

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
  * `query` Object (可选) - 传递给 `url.format()`.
  * `search` String (可选) - 传递给 `url.format()`.
  * `hash` String (可选) - 传递给 `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application.  See the `webContents` docs for more information.

#### `win.reload()`

与 `webContents.reload` 相同.

#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menu | null

Sets the `menu` as the window's menu bar.

#### `win.removeMenu()` _Linux_ _Windows_

Remove the window's menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (optional)
  * `mode` String _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

当进度小于0时不显示进度; 当进度大于0时显示结果不确定.

在 Linux 平台上，只支持 Unity 桌面模式, 你需要在 `package.json` 中为 `desktopName` 指定 `*.desktop` 的文件名. 默认值为 `app.getName().desktop`.

在 Windows 上, 可以传递模式。 可以接受的值为`none`, `normal`, `indeterminate`, `error`和 `paused`. 如果没有设置模式 (但值在有效范围内) 的情况下调用 ` setProgressBar `, 默认值为` normal `。

#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - 右下角任务栏的显示图标。 如果此参数是 `null`，覆盖层层会被清除。
* `description` String -提供给屏幕阅读器的描述文字

在当前任务栏图标上设置一个 16 x 16 像素的图标, 通常用于传达某种应用程序状态或被动地通知用户。

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Sets whether the window should have a shadow.

#### `win.hasShadow()`

返回 `Boolean` - 判断窗口是否有阴影.

#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacity` Number - 介于0.0 ( 完全透明 ) 和1.0 ( 完全不透明 ) 之间

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` _Windows_ _macOS_

返回 `Number` - 介于0.0 ( 完全透明) 和1.0 ( 完全不透明) 之间

#### `win.setShape(rects)` _Windows_ _Linux_ _实验性_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

对窗口形状的设置决定了窗口内系统允许绘制与用户交互的区域. 在给定的区域外, 没有像素会被绘制, 且没有鼠标事件会被登记. 在该区域外的鼠标事件将不会被该窗口接收, 而是落至该窗口后方的任意窗口.

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

返回 `Boolean` - 按钮是否成功添加

将指定的一组按钮添加到菜单栏的缩图工具栏上。 返回一个 `Boolean` 对象表示是否成功地添加了缩略图.

由于空间有限, 缩图工具栏中的按钮数量不要超过7个。 一旦设置了缩略图工具栏，则无法删除。 但你可以通过调用 API 传递一个空数组来清除按钮.

`buttons` 是一个 `Button` 对象的数组:

* `Button` Object
  * `icon` [NativeImage](native-image.md) - 在缩图工具栏上显示的图标.
  * `click` Function
  * `tooltip` String (可选) - 按钮的提示文本.
  * `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

`flags` 属性是一个数组，包含以下`String`类型的值:

* `enabled` - 该按钮处于活动状态并可供用户使用.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - 当按钮被点击时，缩略图窗口立即关闭。
* `nobackground` - 不可以画按钮边框，只能使用图片背景。
* `hidden` - 该按钮对用户不可见。
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rectangle](structures/rectangle.md) 窗口的区域

将窗口的区域设置为在任务栏中悬停在窗口上方时显示的缩略图图像。 通过指定空区域：`{ x: 0, y: 0, width: 0, height: 0 }`，可以重置整个窗口的缩略图。

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

设置在任务栏中悬停在窗口缩略图上时显示的工具提示。

#### `win.setAppDetails(options)` _Windows_

* `options` Object
  * `appId` String (可选) - 窗口的 [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). 该项必须设置, 否则其他选项将没有效果.
  * `appIconPath` String (可选) -窗口的 [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `relaunchCommand` String (可选) - 窗口的 [重新启动命令](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (可选) - 窗口的[重新启动显示名称](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

设置窗口任务栏按钮的属性。

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` _macOS_

和 `webContents.showDefinitionForSelection()` 相同.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md)

设置窗口图标

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

设置是否窗口交通灯需要显示。

当`titleBarStyle` 是 `customButtonsOnHover`的时候，不可调用。

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

如果菜单栏已经可见, 调用 `setAutoHideMenuBar(true)`时不会立刻隐藏.

#### `win.isMenuBarAutoHide()`

返回 `Boolean` - 判断窗口的菜单栏是否自动隐藏.

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

返回 `Boolean` - 判断窗口的菜单栏是否可见.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (optional)
  * `visibleOnFullScreen` Boolean (可选) _macOS_ - 设置是否窗口可以在全屏窗口之上显示。

设置窗口是否在所有工作空间上可见

**注意:** 该 API 在 Windows 上无效.

#### `win.isVisibleOnAllWorkspaces()`

返回 `Boolean` - 判断窗口是否在所有工作空间上可见.

**注意:** 该 API 在 Windows 上始终返回 false.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (optional)
  * `forward` Boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. 仅当` ignore </ 0>为 true 时才被使用。 如果 <code>ignore` 为 false, 转发始终是禁用的，不管这个值是什么。

忽略窗口内的所有鼠标事件

在此窗口中发生的所有鼠标事件将被传递到此窗口下面的窗口, 但如果此窗口具有焦点, 它仍然会接收键盘事件

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

防止窗口内容被其他应用捕获

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` _Windows_

* `focusable` Boolean

设置窗口是否可聚焦

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow

设置 `parent` 为当前窗口的父窗口. 为`null`时表示将当前窗口转为顶级窗口

#### `win.getParentWindow()`

返回 `BrowserWindow` - 父窗口.

#### `win.getChildWindows()`

返回 `BrowserWindow[]` - 首页的子窗口.

#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` Boolean

设置输入时是否隐藏光标

#### `win.selectPreviousTab()` _macOS_

当启用本地选项卡，并且窗口中有另一个标签时，选择上一个选项卡。

#### `win.selectNextTab()` _macOS_

当启用本地选项卡，并且窗口中有另一个标签时，选择下一个选项卡。

#### `win.mergeAllWindows()` _macOS_

当启用本地选项卡并且存在多个打开窗口时，将所有窗口合并到一个带有多个选项卡的窗口中。

#### `win.moveTabToNewWindow()` _macOS_

如果启用了本机选项卡并且当前窗口中有多个选项卡，则将当前选项卡移动到新窗口中。

#### `win.toggleTabBar()` _macOS_

如果启用了本机选项卡并且当前窗口中只有一个选项卡，则切换选项卡栏是否可见。

#### `win.addTabbedWindow(browserWindow)` _macOS_

* `browserWindow` BrowserWindow

在该窗口中添加一个窗口作为选项卡，位于窗口实例的选项卡之后。

#### `win.setVibrancy(type)` _macOS_

* `type` String - 可以为 `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` 或 `ultra-dark`. 更多详细信息，请查阅 [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc)

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` _macOS_ _实验_

* `touchBar` TouchBar

设置窗口的触摸条布局 设置为 `null` 或`undefined`将清除触摸条. 此方法只有在macOS 10.12.1+且设备支持触摸条TouchBar时可用.

**注意:** TouchBar API目前为实验性质，以后的Electron版本可能会更改或删除。

#### `win.setBrowserView(browserView)` _实验_

* `browserView` [BrowserView](browser-view.md). Attach browserView to win. If there is some other browserViews was attached they will be removed from this window.

#### `win.getBrowserView()` _实验功能_

Returns `BrowserView | null` - an BrowserView what is attached. Returns `null` if none is attached. Throw error if multiple BrowserViews is attached.

#### `win.addBrowserView(browserView)` _实验_

* `browserView` [BrowserView](browser-view.md)

Replacement API for setBrowserView supporting work with multi browser views.

#### `win.removeBrowserView(browserView)` _实验_

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` _实验功能_

Returns array of `BrowserView` what was an attached with addBrowserView or setBrowserView.

**注意:** BrowserView 的 API目前为实验性质，可能会更改或删除。

### 属性

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
