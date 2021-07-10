# BrowserWindow

> 创建并控制浏览器窗口。

进程：[主进程](../glossary.md#main-process)

```javascript
// 在主进程中.
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

// Load a remote URL
win.loadURL('https://github.com')

// Or load a local HTML file
win.loadURL(`file://${__dirname}/app/index.html`)
```

## 无边框窗口

如果想创建一个无边框或者任意形状的透明窗口，你可以使用[Frameless Window](frameless-window.md) 的API

## 优雅地显示窗口

当直接在窗口中加载一个页面时，用户可能会看到页面一点点加载，这对原生应用来说体验不是很好。 要使窗口显示时没有视觉闪烁，对于不同情况有两种解决方案。

## 使用`ready-to-show`事件

在加载页面时，渲染进程第一次完成绘制时，如果窗口还没有被显示，渲染进程会发出 `ready-to-show` 事件 。 在此事件后显示窗口将没有视觉闪烁：

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

这个事件通常在 `did-finish-load` 事件之后发出，但是页面有许多远程资源时，它可能会在 `did-finish-load`之前发出事件。

请注意，使用此事件意味着渲染器会被认为是"可见的"并绘制，即使 `show` 是false。  如果您使用 `paintWhenInitiallyHidden: false`，此事件将永远不会被触发。

## 设置 `backgroundColor`

对于一个复杂的应用，`ready-to-show` 可能发出的太晚，会让应用感觉缓慢。 在这种情况下，建议立刻显示窗口，并使用接近应用程序背景的 `backgroundColor`

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

请注意，即使是使用 `ready-to-show` 事件的应用程序，仍建议使用设置 `backgroundColor` 使应用程序感觉更原生。

## 父子窗口

通过使用 `parent` 选项，你可以创建子窗口：

```javascript
const { BrowserWindow } = require('electron')

const top = new BrowserWindow()
const child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

`child` 窗口将总是显示在 `top` 窗口的顶部.

## 模态窗口

模态窗口是禁用父窗口的子窗口，创建模态窗口必须设置 `parent` 和 `modal` 选项：

```javascript
const { BrowserWindow } = require('electron')

const child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

## 页面可见性

[ 页面可见性 API ][page-visibility-api] 的工作方式如下:

* 在所有平台上, 可见性状态与窗口是否隐藏/最小化相关。
* 此外, 在 macOS 上, 可见性状态还会跟踪窗口的遮挡状态。 如果窗口被另一个窗口完全遮挡了，可见性状态为`hidden`. 在其他平台上，可见性状态只有在使用 `win.hide()`使窗口最小化或者隐藏时才为 `hidden`
* 如果创建`BrowserWindow` 时带有 `show: false`的参数, 最初的可见性状态将为`visible` 尽管窗口实际上是隐藏的。
* 如果`backgroundThrottling`被禁用，可见性状态将保持为`visible` 即使窗口被最小化、遮挡或隐藏。

推荐您在可见性状态为 `hidden` 时暂停消耗资源的操作以便减少电力消耗。

## 平台相关的提示

* 在 macOS 上，modal 窗口将显示为附加到父窗口的工作表。
* 在 macOS 上，子窗口将保持与父窗口的相对位置。而在 Windows 和 Linux 中，当父窗口移动时子窗口不会移动。
* 在Linux上，模态窗口的类型将更改为 `dialog`.
* 在Linux上，许多桌面环境不支持隐藏模态窗口。

## Class: BrowserWindow

> 创建并控制浏览器窗口。

进程：[主进程](../glossary.md#main-process)

`BrowserWindow` 是一个[EventEmitter][event-emitter].

通过 `options` 可以创建一个具有原生属性的 `BrowserWindow` 。

### `new BrowserWindow([options])`

* `options` Object (可选)
  * `width` Integer (可选) - 窗口的宽度(以像素为宽度)。 默认值为 `800`
  * `height` Integer (可选) - 窗口的高度(以像素为单位)。 默认值为 `600`
  * `x` Interger (可选) - (**必选** 如果使用了y) 窗口相对于屏幕左侧的偏移量。 默认值为将窗口居中。
  * `y` Integer (可选) - (**必选** 如果使用了x) 窗口相对于屏幕顶端的偏移量。 默认值为将窗口居中。
  * `useContentSize` Boolean (可选) - `width` 和 `height` 将设置为 web 页面的尺寸(译注: 不包含边框), 这意味着窗口的实际尺寸将包括窗口边框的大小，稍微会大一点。 默认值为 `false`.
  * `center` Boolean (可选) - 窗口是否在屏幕居中.
  * 整型（可选）-窗口的最小宽度。默认为0 默认值为 `0`
  * `minHeight` Integer(可选) - 窗口的最小高度。 默认值为 `0`
  * `maxWidth `Integer(可选)-窗口的最大宽度。 默认值不限
  * `maxHeight `Integer (可选) - 窗口的最大高度。 默认值不限
  * `resizable` Boolean (可选) - 窗口大小是否可调整。 默认值为 `true`。
  * `movable` Boolean (可选) - 窗口是否可以移动. 该属性在Linux上未实现。 默认值为 `true`。
  * `minimizable` Boolean (可选) - 窗口是否可最小化。 该属性在Linux上未实现。 默认值为 `true`。
  * `maximizable` Boolean (可选) - 窗口是否可最大化。 该属性在Linux上未实现。 默认值为 `true`。
  * `closable` Boolean (可选) - 窗口是否可关闭。 该属性在Linux上未实现。 默认值为 `true`。
  * ` focusable ` Boolean (可选) - 窗口是否可以聚焦. 默认值为 `true`。 在 Windows 中设置 `focusable: false` 也意味着设置了`skipTaskbar: true`. 在 Linux 中设置 `focusable: false` 时窗口停止与 wm 交互, 并且窗口将始终置顶。
  * `alwaysOnTop` Boolean (可选) - 窗口是否永远在别的窗口的上面。 默认值为 `false`.
  * ` fullscreen ` Boolean (可选) - 窗口是否全屏. 当明确设置为 `false` 时，在 macOS 上全屏的按钮将被隐藏或禁用. 默认值为 `false`.
  * ` fullscreenable ` Boolean (可选) - 窗口是否可以进入全屏状态. 在 macOS上, 最大化/缩放按钮是否可用 默认值为 `true`。
  * `simpleFullscreen` Boolean (可选) - 在 macOS 上使用 pre-Lion 全屏。 默认值为 `false`.
  * `skipTaskbar` Boolean (可选) - 是否在任务栏中显示窗口。 默认值为 `false`。
  * `kiosk` Boolean (可选) - 窗口是否进入kiosk模式。 默认值为 `false`.
  * `title`String(可选) - 默认窗口标题 默认为`"Electron"`。 如果由`loadURL()`加载的HTML文件中含有标签`<title>`，此属性将被忽略。
  * `icon` ([NativeImage](native-image.md) | String) (可选) - 窗口的图标. 在 Windows 上推荐使用 `ICO` 图标来获得最佳的视觉效果, 默认使用可执行文件的图标.
  * `show` Boolean (可选) - 窗口是否在创建时显示。 默认值为 `true`。
  * `paintWhenInitiallyHidden`Boolean(可选) - 当`show`为`false`并且渲染器刚刚被创建时，它是否应激活。  为了让`document.visibilityState` 在`show: false`的情况下第一次加载时正确地工作，你应该把这个设置成`false`.  设置为 `false` 将会导致`ready-to-show` 事件不触发。  默认值为 `true`。
  * `frame` Boolean (可选) - 设置为 `false` 时可以创建一个[无边框窗口](frameless-window.md)。 默认值为 `true`。
  * `parent` BrowserWindow (可选) - 指定父窗口 默认值为 `null`.
  * `momodalable` Boolean (可选) - 当前是否为模态窗口。 只有当窗口是子窗口时才起作用。 默认值为 `false`.
  * `acceptFirstMouse` Boolean (可选) - 是否允许单击页面来激活窗口。 默认值为 `false`。
  * `disableAutoHideCursor` Boolean (可选) - 是否在打字时隐藏光标。 默认值为 `false`.
  * `autoHideMenuBar` Boolean (可选) - 自动隐藏菜单栏，除非按了`Alt`键。 默认值为 `false`.
  * `enableLargerThanScreen` Boolean (可选) - 是否允许改变窗口的大小使之大于屏幕的尺寸. 仅适用于 macOS，因为其它操作系统默认允许 大于屏幕的窗口。 默认值为 `false`.
  * `backgroundColor` String(可选) - 窗口的背景颜色为十六进制值，例如`#66CD00`, `#FFF`, `#80FFFFFF` (设置`transparent`为`true`方可支持alpha属性，格式为#AARRGGBB)。 默认值为 `#FFF`（白色）。
  * `hasShadow` Boolean (可选) - 窗口是否有阴影. 默认值为 `true`。
  * `opacity` Number (可选)-设置窗口初始的不透明度, 介于 0.0 (完全透明) 和 1.0 (完全不透明) 之间。 目前仅支持Windows 和 macos
  * `darkTheme` Boolean (optional) - 强制窗口使用深色主题，只在部分GTK+3桌面环境下有效。 默认值为 `false`.
  * `transparent` Boolean (可选) - 使窗口 [透明](frameless-window.md#transparent-window)。 默认值为 `false`. 在Windows上，仅在无边框窗口下起作用。
  * `type` String (可选) - 窗口的类型, 默认为普通窗口. 更多信息见下文
  * `visualEffectState` String (optional) - 指定material外观应如何反映macOS上的窗口活动状态。 必须与 `vibrancy` 属性一起使用。 可能的值有
    * `followWindow` - 当窗口处于激活状态时，后台应自动显示为激活状态，当窗口处于非激活状态时，后台应自动显示为非激活状态。 默认为该值。
    * `active` - 后台应一直显示为激活状态。
    * `inactive` - 后台应一直显示为非激活状态。
  * `titleBarStyle` String (可选) - 窗口标题栏样式。 默认值为 `default`. 可能的值有
    * `default` - 标准灰色不透明的Mac标题栏
    * `hidden` - 隐藏标题栏, 内容充满整个窗口, 但它依然在左上角, 仍然受标准窗口控制.
    * `hiddenInset` - 隐藏标题栏, 显示小的控制按钮在窗口边缘
    * `customButtonsOnHover` - Results in a hidden title bar and a full size content window, the traffic light buttons will display when being hovered over in the top left of the window.  ** 注意: **此选项目前是实验性的。
  * `trafficLightPosition` [Point](structures/point.md) (optional) - Set a custom position for the traffic light buttons in frameless windows.
  * `roundedCorners` Boolean (optional) - Whether frameless window should have rounded corners on macOS. 默认值为 `true`。
  * `fullscreenWindowTitle` Boolean (optional) _Deprecated_ - Shows the title in the title bar in full screen mode on macOS for `hiddenInset` titleBarStyle. 默认值为 `false`.
  * `thickFrame` Boolean(可选)-对 Windows 上的无框窗口使用` WS_THICKFRAME ` 样式，会增加标准窗口框架。 设置为 `false` 时将移除窗口的阴影和动画. 默认值为 `true`。
  * `vibrancy` String (可选) - 窗口是否使用 vibrancy 动态效果, 仅 macOS 中有效. 可选值为 `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window` 或 `under-page`。 Please note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` are deprecated and have been removed in macOS Catalina (10.15).
  * `zoomToPageWidth` Boolean (可选) - 控制 macOS 上，当选择性单击工具栏上的绿色stoplight按钮或单击 Window > Zoom menu item时的行为。 如果为 ` true `, 窗口将放大到网页的本身宽度, ` false ` 将使其缩放到屏幕的宽度。 这也会影响直接调用 ` maximize() ` 时的行为。 默认值为 `false`.
  * `tabbingIdentifier` String (可选) - 选项组卡的名称，在macOS 10.12+上可使窗口在原生选项卡中打开. 具有相同标识符的窗口将被组合在一起。 这还会在窗口的标签栏中添加一个原生的新选项卡按钮, 并允许 ` app ` 和窗口接收 ` new-window-for-tab` 事件。
  * `webPreferences` Object (可选) - 网页功能设置。
    * `devTools` Boolean (可选) - 是否开启 DevTools. 如果设置为 ` false `, 则无法使用 ` BrowserWindow.webContents.openDevTools () ` 打开 DevTools。 默认值为 `true`。
    * `nodeIntegration` Boolean (可选) - 是否启用Node integration. 默认值为 `false`.
    * `nodeIntegrationInWorker` Boolean (可选) - 是否在Web工作器中启用了Node集成. 默认值为 `false`. 更多内容参见 [多线程](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (可选项)(实验性)，是否允许在子页面(iframe)或子窗口(child window)中集成Node.js； 预先加载的脚本会被注入到每一个iframe，你可以用 `process.isMainFrame` 来判断当前是否处于主框架（main frame）中。
    * `preload` String (可选) -在页面运行其他脚本之前预先加载指定的脚本 无论页面是否集成Node, 此脚本都可以访问所有Node API 脚本路径为文件的绝对路径。 当 node integration 关闭时, 预加载的脚本将从全局范围重新引入node的全局引用标志 [参考示例](context-bridge.md#exposing-node-global-symbols).
    * `sandbox` Boolean (可选)-如果设置该参数, 沙箱的渲染器将与窗口关联, 使它与Chromium OS-level 的沙箱兼容, 并禁用 Node. js 引擎。 它与 `nodeIntegration` 的选项不同，且预加载脚本的 API 也有限制. [更多详情](../tutorial/sandbox.md).
    * `enableRemoteModule` Boolean (可选) - 是否启用 [`remote`](remote.md) 模块。 默认值为 `false`.
    * `session` [Session](session.md#class-session) (可选) - 设置页面的 session 而不是直接忽略 Session 对象, 也可用 `partition` 选项来代替，它接受一个 partition 字符串. 同时设置了`session` 和 `partition`时, `session` 的优先级更高. 默认使用默认的 session.
    * `partition` String (optional) - 通过 session 的 partition 字符串来设置界面session. 如果 `partition` 以 `persist:`开头, 该页面将使用持续的 session，并在所有页面生效，且使用同一个`partition`. 如果没有 `persist:` 前缀, 页面将使用 in-memory session. 通过分配相同的 ` partition `, 多个页可以共享同一会话。 默认使用默认的 session.
    * `affinity` String (可选) - 当指定，具有相同`affinity` 的 web页面将在相同的渲染进程运行。 需要注意的是，由于渲染过程中会有代码重用，如 `webPreferences`的`preload`, `sandbox` 和 `nodeIntegration`等选项会在不同页面之间共用，即使你已经在不同页面中为同一选项设置过不同的值，它们仍会被共用。 因此，建议为`affinity`相同的页面，使用相同的 `webPreferences` _已废弃_
    * `zoomFactor` Number (可选) - 页面的默认缩放系数, `3.0` 表示 `300%`。 默认值为 `1.0`.
    * `javascript` Boolean (可选) - 是否启用 JavaScript 支持。 默认值为 `true`。
    * `webSecurity` Boolean (可选) - 当设置为 `false`, 它将禁用同源策略 (通常用来测试网站), 如果此选项不是由开发者设置的，还会把 `allowRunningInsecureContent`设置为 `true`. 默认值为 `true`。
    * `allowRunningInsecureContent` Boolean (可选) - 允许一个 https 页面运行来自http url的JavaScript, CSS 或 plugins。 默认值为 `false`.
    * `images` Boolean (可选) - 允许加载图片。 默认值为 `true`。
    * `textAreasAreResizable` Boolean (可选) - 允许调整 TextArea 元素大小。 默认值为 `true`。
    * `webgl` Boolean (可选) - 启用 WebGL 支持。 默认值为 `true`。
    * `plugins` Boolean (可选) - 是否应该启用插件。 默认值为 `false`.
    * `experimentalFeatures` Boolean (可选) - 启用 Chromium 的实验功能。 默认值为 `false`.
    * `scrollBounce` Boolean (可选) - 在 macOS 启用弹力动画 (橡皮筋) 效果。 默认值为 `false`.
    * `enableBlinkFeatures`String(可选) - 以`逗号`分隔的需要启用的特性列表，譬如`CSSVariables,KeyboardEventKey` 在 [RuntimeEnabledFeatures.json5][runtime-enabled-features]文件中查看被支持的所有特性.
    * `disableBlinkFeatures` String (可选) - 以 `,`分隔的禁用特性列表, 如 `CSSVariables,KeyboardEventKey`. 在[RuntimeEnabledFeatures.json5][runtime-enabled-features] 文件中查看被支持的所有特性.
    * `defaultFontFamily` Object (可选) - 为font-family设置默认字体。
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
    * `contextIsolation` Boolean (可选) - 是否在独立 JavaScript 环境中运行 Electron API和指定的`preload` 脚本. 默认为 `true`。 `预加载`脚本所运行的上下文环境只能访问其自身专用的`文档`和全局`窗口`，其自身一系列内置的JavaScript (`Array`, `Object`, `JSON`, 等等) 也是如此，这些对于已加载的内容都是不可见的。 Electron API 将只在`预加载`脚本中可用，在已加载页面中不可用。 这个选项应被用于加载可能不被信任的远程内容时来确保加载的内容无法篡改`预加载`脚本和任何正在使用的Electron api。  该选项使用的是与[Chrome内容脚本][chrome-content-scripts]相同的技术。  你可以在开发者工具Console选项卡内顶部组合框中选择 'Electron Isolated Context'条目来访问这个上下文。
    * `worldSafeExecuteJavaScript` Boolean (可选) - 如果为true，从`webFrame.executeJavaScript` 返回的值将被特殊处理，以确保使用 `contextIsolation` 时，JS中的值安全地在两个世界之间传递。 默认值为 `true`。 _已废弃_
    * `nativeWindowOpen` Boolean (可选) - 是否使用原生的`window.open()`. 默认值为 `false`. 除了 `nodeIntegrationInSubFrames` 为true时，其它情况下node integration将永远禁用。 ** 注意: **此选项目前是实验性的。
    * `webviewTag` Boolean (可选) - 是否启用 [`<webview>` tag](webview-tag.md)标签. 默认值为 `false`. ** 注意: **为 `< webview>` 配置的 ` preload ` 脚本在执行时将启用节点集成, 因此应确保远程或不受信任的内容无法创建恶意的 ` preload ` 脚本 。 可以使用 [ webContents ](web-contents.md) 上的 ` will-attach-webview ` 事件对 ` preload ` 脚本进行剥离, 并验证或更改 `<webview>` 的初始设置。
    * `additionalArguments` String[] (可选) - 一个将被附加到当前应用程序的渲染器进程中`process.argv`的字符串列表 。  可用于将少量的数据传递到渲染器进程预加载脚本中。
    * `safeDialogs` Boolean (可选) - 是否启用浏览器样式的持续对话框保护。 默认值为 `false`.
    * `safeDialogsMessage` String (可选) - 当持续对话框保护被触发时显示的消息。 如果没有定义，那么将使用缺省的消息。注意：当前缺省消息是英文，并没有本地化。
    * `disableDialogs` Boolean (可选) - 是否完全禁用对话框。 覆盖 `safeDialogs`。 默认值为 `false`.
    * `navigateOnDragDrop` Boolean (可选) - 将文件或链接拖放到页面上时是否触发页面跳转。 默认值为 `false`.
    * `autoplayPolicy` String (可选) - 窗口中内容要使用的自动播放策略，值可以是 `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`。 默认为 `no-user-gesture-required`。
    * `disableHtmlFullscreenWindowResize` Boolean (可选) - 是否阻止窗口在进入 HTML 全屏时调整大小。 默认值为 `false`.
    * `accessibleTitle` String (可选) - 仅提供给如屏幕读取器等辅助工具的替代标题字符串。 此字符串不直接对用户可见。
    * `spellcheck` Boolean (可选) - 是否启用内置拼写检查器。 默认值为 `true`。
    * `enableWebSQL` Boolean (可选) - 是否启用 [WebSQL api](https://www.w3.org/TR/webdatabase/)。 默认值为 `true`。
    * `v8CacheOptions` String (可选) - 强制 blink 使用 v8 代码缓存策略。 可接受的值为：
      * `none` - 禁用代码缓存
      * `code` - 基于启发式代码缓存
      * `bypassHeatCheck` - 绕过启发式代码缓存，但使用懒编译。
      * `bypassHeatCheckAndEagerCompile` - 与上面相同，除了编译是及时的。 默认策略是 `code`。
    * `enablePreferredSizeMode` Boolean (可选) - 是否启用首选大小模式。 首选大小是包含文档布局所需的最小大小--无需滚动。 启用该属性将导致在首选大小发生变化时，在`WebContents` 上触发 `preferred-size-changed` 事件。 默认值为 `false`.

当使用 ` minWidth `/` maxWidth `/` minHeight `/` maxHeight ` 设置最小或最大窗口大小时, 它只限制用户。 它不会阻止您将不符合大小限制的值传递给 ` setBounds `/` setSize ` 或 ` BrowserWindow ` 的构造函数。

` type ` 选项的候选值和行为与平台相关。 可能的值有

* 在 Linux 上, 可能的类型有 ` desktop `、` dock `、` toolbar `、` splash `、` notification `。
* 在 macOS 上，可能的类型是 `desktop`, `textured`。
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

文档更改标题时触发，调用`event.preventDefault()`将阻止更改标题 当标题合成自文件 URL 中时， `explicitSet` 的值为false。

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

在窗口关闭时触发 当你接收到这个事件的时候, 你应当移除相应窗口的引用对象，避免再次使用它.

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

请注意，使用此事件意味着渲染器会被认为是"可见的"并绘制，即使 `show` 是false。  如果您使用 `paintWhenInitiallyHidden: false`，此事件将永远不会被触发。

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
* `newBounds` [Rectangle](structures/rectangle.md) - 将要调整到的窗口尺寸。

调整窗口大小前触发。 调用 `event.preventDefault()` 将阻止窗口大小调整。

请注意，该事件仅在手动调整窗口大小时触发。 通过 `setBounds`/`setSize` 调整窗口大小不会触发此事件。

#### 事件: 'resize'

调整窗口大小后触发。

#### 事件：'resized' _macOS_ _Windows_

当窗口完成调整大小后触发一次。

这通常在手动调整窗口大小后触发。 在 macOS 系统上，使用`setBounds`/`setSize`调整窗口大小并将`animate`参数设置为`true`也会在调整大小完成后触发此事件。

#### 事件: 'will-move' _macOS_ _Windows_

返回:

* `event` Event
* `newBounds` [Rectangle](structures/rectangle.md) - 窗口将要被移动到的位置。

窗口移动前触发。 在Windows上，调用 `event.preventDefault()` 将阻止窗口移动。

请注意，该事件仅在手动调整窗口大小时触发。 通过 `setBounds`/`setSize` 调整窗口大小不会触发此事件。

#### 事件: 'move'

窗口移动到新位置时触发

#### 事件: 'moved' _macOS_ _Windows_

当窗口移动到新位置时触发一次

__注意__: 在 macOS 上，此事件是` move `的别名。

#### 事件: 'enter-full-screen'

窗口进入全屏状态时触发

#### 事件: 'leave-full-screen'

窗口离开全屏状态时触发

#### 事件: 'enter-html-full-screen'

窗口进入由HTML API 触发的全屏状态时触发

#### 事件: 'leave-html-full-screen'

窗口离开由HTML API触发的全屏状态时触发

#### 事件: 'always-on-top-changed'

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
const win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

以下应用命令在 Linux 上有明确地支持：

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

三指滑动时触发。 可能的方向是 `up`, `right`, `down`, `left`。

此事件的基本方法是用来处理旧的macOS风格的触摸板滑动，屏幕内容不会随着滑动而移动。 大多数macOS触摸板都不再允许配置这样的滑动，因此为了正确地触发该事件，需将`System Preferences > Trackpad > More Gestures`中'Swipe between pages'首选项设置为'Swipe with two or three fingers'。

#### 事件: 'rotate-gesture' _macOS_

返回:

* `event` Event
* `rotation` Float

在触控板旋转手势上触发。 持续触发直到旋转手势结束。 每次触发的 `rotation` 值是自上次触发以来旋转的角度。 旋转手势最后一次触发的事件值永远是`0`。 逆时针旋转值为正值，顺时针旋转值为负值。

#### 事件: 'sheet-begin' _macOS_

窗口打开sheet(工作表) 时触发

#### 事件: 'sheet-end' _macOS_

窗口关闭sheet(工作表) 时触发

#### 事件: 'new-window-for-tab' _macOS_

当点击了系统的新标签按钮时触发

#### 事件: 'system-context-menu' _Windows_

返回:

* `event` Event
* `point` [Point](structures/point.md) - 上下文菜单触发时的屏幕坐标。

当系统上下文菜单在窗口上触发时发出， 通常只在用户右键点击你窗口的非客户端区域时触发。  非客户端区域指的是窗口标题栏或无边框窗口中被你声明为 `-webkit-app-region: drag` 的任意区域。

调用 `event.preventDefault()` 将阻止菜单显示。

### 静态方法

`BrowserWindow` 类有以下方法:

#### `BrowserWindow.getAllWindows()`

返回 `BrowserWindow[]` - 所有打开的窗口的数组

#### `BrowserWindow.getFocusedWindow()`

返回 `BrowserWindow | null` - 此应用程序中当前获得焦点的窗口，如果无就返回 `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

返回 `BrowserWindow | null` - 返回拥有给定 `webContents`的窗口，否则如果内容不属于一个窗口，返回`null`。

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

返回 `BrowserWindow | null` - 拥有给定 `browserView` 的窗口。 如果给定的视图没有附加到任何窗口，返回 `null`。

#### `BrowserWindow.fromId(id)`

* `id` Integer

返回 `BrowserWindow | null` - 带有给定 `id` 的窗口。

### 实例属性

使用 `new BrowserWindow ` 创建的对象具有以下属性:

```javascript
const { BrowserWindow } = require('electron')
// 本例中 `win` 是我们的实例
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents` _只读_

此窗口拥有的 `WebContents` 对象。 所有与网页相关的事件和操作都将通过它完成。

有关它的方法和事件, 请参见 [`webContents` documentation](web-contents.md)

#### `win.id` _只读_

一个 `Integer` 属性代表了窗口的唯一ID。 每个ID在整个Electron应用程序的所有 `BrowserWindow` 实例中都是唯一的。

#### `win.autoHideMenuBar`

一个 `Boolean` 属性决定窗口菜单栏是否自动隐藏。 一旦设置，菜单栏将只在用户单击 `Alt` 键时显示。

如果菜单栏已经可见，将该属性设置为 `true` 将不会使其立刻隐藏。

#### `win.simpleFullScreen`

一个 `Boolean` 属性，用于决定窗口是否处于简单(pre-Lion) 全屏模式。

#### `win.fullScreen`

一个 `Boolean` 属性，用于决定窗口是否处于全屏模式。

#### `win.visibleOnAllWorkspaces`

一个 `Boolean` 属性，用于决定窗口是否在所有工作区中可见。

**注意：** 在 Windows 上始终返回 false。

#### `win.shadow`

一个 `Boolean` 属性，用于决定窗口是否显示阴影。

#### `win.menuBarVisible` _Windows_ _Linux_

一个 `Boolean` 属性，用于决定菜单栏是否可见。

**注意：** 如果菜单栏自动隐藏，用户仍然可以通过单击 `Alt` 键来唤出菜单栏。

#### `win.kiosk`

一个 `Boolean` 属性，用于决定窗口是否处于kiosk模式。

#### `win.documentEdited` _macOS_

一个 `Boolean` 属性指明窗口文档是否已被编辑。

当设置为 `true` 时，标题栏的图标将变灰。

#### `win.representedFilename` _macOS_

一个 `String` 属性，用于确定窗口代表的文件的路径名，文件的图标将显示在窗口的标题栏中。

#### `win.title`

一个 `String` 属性，用于确定原生窗口的标题。

**注意：** 网页的标题可以与原生窗口的标题不同。

#### `win.minimizable`

一个 `Boolean` 属性，用于决定窗口是否可被用户手动最小化。

在 Linux 上，setter 不会进行任何操作，尽管 getter 返回的是 `true`。

#### `win.maximizable`

一个 `Boolean` 属性，用于决定窗口是否可被用户手动最大化。

在 Linux 上，setter 不会进行任何操作，尽管 getter 返回的是 `true`。

#### `win.fullScreenable`

一个 `Boolean` 属性，决定最大化/缩放窗口按钮是切换全屏模式还是最大化窗口。

#### `win.resizable`

一个 `Boolean` 属性，用于决定窗口是否可被用户手动调整大小。

#### `win.closable`

一个 `Boolean` 属性，用于决定窗口是否可被用户手动关闭。

在 Linux 上，setter 不会进行任何操作，尽管 getter 返回的是 `true`。

#### `win.movable`

一个 `Boolean` 属性，用于决定窗口是否可被用户移动。

在 Linux 上，setter 不会进行任何操作，尽管 getter 返回的是 `true`。

#### `win.excludedFromShownWindowsMenu` _macOS_

一个 `Boolean` 属性，用于决定窗口是否从应用程序的 Windows 菜单排除。 默认值为 `false`

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

#### `win.accessibleTitle`

一个 `String` 属性，定义一个仅为如屏幕阅读器等辅助工具提供的替代标题 。 此字符串不直接对用户可见。

### 实例方法

使用 `new BrowserWindow `创建的对象具有以下实例方法:

** 注意: **某些方法仅在特定的操作系统上可用, 这些方法会被标记出来。

#### `win.destroy()`

强制关闭窗口, 除了` closed `之外，`close`，`unload` 和 `beforeunload` 都不会被触发

#### `win.close()`

尝试关闭窗口。 该方法与用户手动单击窗口的关闭按钮效果相同。 但网页可能会取消这个关闭操作。 查看 [关闭事件](#event-close)。

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

最大化窗口。 如果窗口尚未显示，该方法也会将其显示 (但不会聚焦)。

#### `win.unmaximize()`

取消窗口最大化

#### `win.isMaximized()`

返回 `Boolean` - 判断窗口是否最大化

#### `win.minimize()`

最小化窗口。 在某些平台上, 最小化的窗口将显示在Dock中。

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

简单全屏模式模拟了 Lion (10.7) 之前的macOS版本中的原生全屏行为。

#### `win.isSimpleFullScreen()` _macOS_

返回 `Boolean` - 窗口是否为简单全屏模式(pre-Lion)。

#### `win.isNormal()`

返回 `Boolean` - 窗口是否处于正常状态（未最大化，未最小化，不在全屏模式下）。

#### `win.setAspectRatio(aspectRatio[, extraSize])`

* ` aspectRatio ` Float- 为内容视图保持的宽高比.
* `extraSize` [Size](structures/size.md) (可选) _macOS_ - 保持宽高比时不包括的额外大小。

这将使窗口保持长宽比。 额外的大小允许开发人员有空间 (以像素为单位), 不包括在纵横比计算中。 此 API 已经考虑了窗口大小和内容大小之间的差异。

想象一个使用高清视频播放器和相关控件的普通窗口。 假假如左边缘有15px, 右边缘有25px, 在播放器下面有50px. 为了保持播放器本身16:9 的长宽比 (标准的HD长宽比为1920x1080)， 我们可以使用 16/9 和 { width: 40, height: 50 } 的参数调用这个函数。 第二个参数不管网页中的额外的宽度和高度在什么位置, 只要它们存在就行. 在全部内部窗口中，加上任何额外的宽度和高度 。

当窗口使用类似于 `win.setSize` 这样的 API 调整窗口时，宽高比不会被采用。

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - 十六进制的窗口背景色，如 `#66CD00`、`#FFF`和`#80FFFFFF`。 (如果`transparent`是`true`的话，也支持alpha 通道。) 默认值为 `#FFF`（白色）。

设置窗口的背景颜色。 请参阅 [设置`背景颜色`](#setting-backgroundcolor)。

#### `win.previewFile(path[, displayName])` _macOS_

* `path` String -要用 QuickLook 预览的文件的绝对路径。 这一点很重要，因为Quick Look 使用了路径上的文件名和文件扩展名 来决定要打开的文件的内容类型。
* `displayName` String (可选) - 在Quick Look 模态视图中显示的文件的名称。 这完全是视觉的，不会影响文件的内容类型。 默认值为 `path`.

使用 [Quick Look][quick-look]来预览路径中的文件.

#### `win.closeFilePreview()` _macOS_

关闭当前打开的 [Quick Look][quick-look] 面板.

#### `win.setBounds(bounds[, animate])`

* `bounds` Partial<[Rectangle](structures/rectangle.md)>
* `animate` Boolean (可选) _macOS_

重置窗口，并且移动窗口到指定的位置. 任何未提供的属性将默认为其当前值。

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

返回 [`Rectangle`](structures/rectangle.md) - 窗口的 `bounds` 作为 `Object`。

#### `win.getBackgroundColor()`

返回 `String` - 获取窗口的背景颜色。 请参阅 [设置`背景颜色`](#setting-backgroundcolor)。

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (可选) _macOS_

调整窗口的工作区 (如网页) 的大小并将其移动到所提供的边界。

#### `win.getContentBounds()`

返回 [`Rectangle`](structures/rectangle.md) - 窗口客户端区域的 `bounds` `对象`。

#### `win.getNormalBounds()`

返回 [`Rectangle`](structures/rectangle.md) - 包含正常状态下的窗口大小。

**注意：**无论当前的窗口状态为：最大化、最小化或者全屏，这个方法都将得到窗口在正常显示状态下的位置信息以及大小信息。 在正常状态下，getBounds 与 getNormalBounds 得到的边界信息 [`Rectangle`](structures/rectangle.md) 是一致的。

#### `win.setEnabled(enable)`

* `enable` Boolean

禁用或者启用窗口。

#### `win.isEnabled()`

返回 `Boolean` - 窗口是否启用。

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (可选) _macOS_

调整窗口的`width`和 `height`. 如果 `width` 或 `height` 低于任何设定的最小尺寸约束，窗口将对齐到约束的最小尺寸。

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

返回 `Boolean` - 用户是否可以手动调整窗口大小。

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

设置用户是否可以移动窗口。 在Linux上不起作用。

#### `win.isMovable()` _macOS_ _Windows_

返回 `Boolean` - 窗口是否可以被用户拖动

在 Linux 上总是返回 ` true `。

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

设置用户是否可以手动将窗口最小化。 在Linux上不起作用。

#### `win.isMinimizable()` _macOS_ _Windows_

返回 `Boolean` - 用户是否可以手动最小化窗口。

在 Linux 上总是返回 ` true `。

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

设置用户是否可以手动最大化窗口。 在Linux上不起作用。

#### `win.isMaximizable()` _macOS_ _Windows_

返回 `Boolean` - 窗口是否可以最大化.

在 Linux 上总是返回 ` true `。

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

设置最大化/缩放窗口按钮是切换全屏模式还是最大化窗口。

#### `win.isFullScreenable()`

返回 `Boolean` - 最大化/缩放窗口按钮是切换全屏模式还是最大化窗口。

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

设置用户是否可以手动关闭窗口。 在Linux上不起作用。

#### `win.isClosable()` _macOS_ _Windows_

返回 `Boolean` - 窗口是否被用户关闭了.

在 Linux 上总是返回 ` true `。

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (可选) _macOS_ _Windows_ - 值包括 `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`和 ~~`dock`~~(已弃用)。 当 `flag` 属性为true时，默认值为 `floating` 。 当flag为false时，`level` 会重置为 `normal`。 请注意，包括从 `floating` 到 `status` ，窗口会被置于 macOS 上的 Dock 下方和 Windows 上的任务栏下方。 从 `pop-up-menu` 到更高级别，窗口显示在 macOS 上的Dock上方和 Windows 上的任务栏上方。 更多信息，请查阅 [macOS 文档][window-levels]。
* `relativeLevel` Integer (可选) _macOS_ - 设置此窗口相对于给定 `级别`的层数。. 默认值为`0`. 请注意, Apple 不鼓励在 ` 屏幕保护程序 ` 之上设置高于1的级别。

设置窗口是否应始终显示在其他窗口的前面。 设置后，窗口仍然是一个正常窗口，而不是一个无法获取焦点的工具框窗口。

#### `win.isAlwaysOnTop()`

返回 `Boolean` - 当前窗口是否始终在其它窗口之前.

#### `win.moveAbove(mediaSourceId)`

* `mediaSourceId` String - DesktopCapturerSource格式的窗口 id 。 例如 "window:1869:0"。

将窗口按z轴顺序移动到源窗口前面。 如果 `mediaSourceId` 不是window类型，或者如果窗口不存在，则此方法会抛出一个错误。

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

**注意：** 网页的标题可以与原生窗口的标题不同。

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

* `offsetY` Float
* `offsetX` Float (可选)

改变macOS上sheet组件的附着点。 默认情况下，sheet贴在窗口边框正下方，但你可能需要在 HTML 渲染工具栏下方显示它们。 例如：

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

const toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
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

#### `win.isTabletMode()` _Windows_

返回 `Boolean` - 无论当前窗口是否处在 Windows 10 平板模式

因为 Windows 10 用户可以 [将他们的 PC 作为平板电脑来使用](https://support.microsoft.com/en-us/help/17210/windows-10-use-your-pc-like-a-tablet)，在此模式下，应用可以选择为平板电脑的界面做出优化，如扩展标题栏和隐藏标题栏按钮。

此 API 返回 窗口是否在平板电脑模式下，并且 `调整大小` 事件可以用于监听对平板模式的更改。

#### `win.getMediaSourceId()`

返回 `String` - DesktopCapturerSource的id格式的窗口 id 。 例如 "window:1324:0"。

更确切地说，格式是 `window:id:other_id`。在Windows上 `id` 是 `HWND` 类型；在macOS上是 `CGWindowID` (`uint64_t`)；在Linux上是 `Window` (`unsigned long`)。 `other_id` 用于识别同一顶层窗口内的Web 内容 (选项卡)。

#### `win.getNativeWindowHandle()`

返回 `Buffer` - 窗口的平台特定句柄

Windows上句柄类型为 `HWND`，macOS 上为 `NSView*`，Linux 上为`Window` (`unsigned long`)

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Function
  * `wParam` any - 提供给 WndProc的 `wParam` 值。
  * `lParam` any - 提供给 WndProc的 `lParam` 值。

钩住窗口消息。 当消息到达 WndProc 时调用`callback` 。

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

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (可选) - 捕获的区域

返回 `Promise<NativeImage>` - 完成后返回一个[NativeImage](native-image.md)

在 `rect`内捕获页面的快照。 省略 `rect` 将捕获整个可见页面。 如果页面不可见， `rect` 可能是空的。

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (可选)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (可选) - HTTP 引用 url。
  * `userAgent` String (可选) - 发起请求的 userAgent.
  * `extraHeaders` String (可选) - 用 "\n" 分割的额外标题
  * `postData` ([UploadRawData](structures/upload-raw-data.md) | [UploadFile](structures/upload-file.md))[] (optional)
  * `baseURLForDataURL` String (可选) - 要由数据URL加载的文件基本URL(末尾带有路径分隔符)。 仅当指定的`url`是数据url并且需要加载其他文件时，才需要此选项。

返回 `Promise<void>` - 当页面完成加载后 promise 将会resolve (见 [`did-finish-load`](web-contents.md#event-did-finish-load))，如果页面加载失败，则 reject (见 [`did-fail-load`](web-contents.md#event-did-fail-load))。

与 [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options) 相同。

`url` 可以是远程地址 (例如 `http://`),也可以是 `file://` 协议的本地HTML文件的路径.

为了确保文件网址格式正确, 建议使用Node的 [` url.format `](https://nodejs.org/api/url.html#url_url_format_urlobject) 方法:

```javascript
const url = require('url').format({
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
* `options` Object (可选)
  * `query` Record<String, String> (可选) - 传递给 `url.format()`.
  * `search` String (可选) - 传递给 `url.format()`.
  * `hash` String (可选) - 传递给 `url.format()`.

返回 `Promise<void>` - 当页面完成加载后 promise 将会resolve (见 [`did-finish-load`](web-contents.md#event-did-finish-load))，如果页面加载失败，则 reject (见 [`did-fail-load`](web-contents.md#event-did-fail-load))。

与 `webContents.loadFile`相同， `filePath` 应该是一个与你的应用程序的根路径相关的HTML文件路径。  有关更多信息，请参阅`webContents` 文档。

#### `win.reload()`

与 `webContents.reload` 相同.

#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menu | null

将 `menu` 设置为窗口的菜单栏。

#### `win.removeMenu()` _Linux_ _Windows_

删除窗口的菜单栏。

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (可选)
  * `mode` String _Windows_ - 进度条的状态。 可以是 `none`， `normal`， `indeterminate`， `error` 或 `paused`。

设置进度条的进度值。 有效范围为 [0, 1.0]。

当进度小于0时不显示进度; 当进度大于0时显示结果不确定.

在 Linux 平台上，只支持 Unity 桌面模式, 你需要在 `package.json` 中为 `desktopName` 指定 `*.desktop` 的文件名. 默认情况下，将取 `{app.name}.desktop`。

在 Windows 上, 可以传递模式。 可以接受的值为`none`, `normal`, `indeterminate`, `error`和 `paused`. 如果没有设置模式 (但值在有效范围内) 的情况下调用 ` setProgressBar `, 默认值为` normal `。

#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - 右下角任务栏的显示图标。 如果此参数是 `null`，覆盖层层会被清除。
* `description` String -提供给屏幕阅读器的描述文字

在当前任务栏图标上设置一个 16 x 16 像素的图标, 通常用于传达某种应用程序状态或被动地通知用户。

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

设置窗口是否有阴影。

#### `win.hasShadow()`

返回 `Boolean` - 判断窗口是否有阴影.

#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacity` Number - 介于0.0 ( 完全透明 ) 和1.0 ( 完全不透明 ) 之间

设置窗口的不透明度。 在Linux上不起作用。 超出界限的数值被限制在[0, 1] 范围内。

#### `win.getOpacity()`

返回 `Number` - 介于0.0 (完全透明) 和1.0 (完全不透明) 之间。 在Linux上，始终返回1。

#### `win.setShape(rects)` _Windows_ _Linux_ _实验性_

* `rects` [Rectangle[]](structures/rectangle.md) - 在窗口上设置形状。 通过传入空列表将窗口恢复为矩形。

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
  * `flags` String[] (可选) - 控制按钮的特定状态和行为。 默认情况下，值为 `['enabled']`。

`flags` 属性是一个数组，包含以下`String`类型的值:

* `enabled` - 该按钮处于活动状态并可供用户使用.
* `disabled` - 按钮已禁用。 会以一种视觉状态表示它不会响应用户操作的形式显示。
* `dismissonclick` - 当按钮被点击时，缩略图窗口立即关闭。
* `nobackground` - 不可以画按钮边框，只能使用图片背景。
* `hidden` - 该按钮对用户不可见。
* `noninteractive` - 按钮已启用，但不交互；不绘制按钮按下的状态。 此值用于在通知中使用按钮的实例。

#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rectangle](structures/rectangle.md) 窗口的区域

将窗口的区域设置为在任务栏中悬停在窗口上方时显示的缩略图图像。 通过指定空区域：`{ x: 0, y: 0, width: 0, height: 0 }`，可以重置整个窗口的缩略图。

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

设置在任务栏中悬停在窗口缩略图上时显示的工具提示。

#### `win.setAppDetails(options)` _Windows_

* `选项` 对象
  * `appId` String (可选) - 窗口的 [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). 该项必须设置, 否则其他选项将没有效果.
  * `appIconPath` String (可选) -窗口的 [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (可选) - `appIconPath`中的图标索引。 未设置 `appIconPath` 时忽略。 默认值为 `0`
  * `relaunchCommand` String (可选) - 窗口的 [重新启动命令](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (可选) - 窗口的[重新启动显示名称](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

设置窗口任务栏按钮的属性。

**注意：**必须始终同时设置 `relaunchCommand` 和 `relaunchDisplayName`。 如果其中一个属性没有设置，那么这两个属性都不会使用。

#### `win.showDefinitionForSelection()` _macOS_

和 `webContents.showDefinitionForSelection()` 相同.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md) | String

设置窗口图标

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

设置是否窗口交通灯需要显示。

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

设置窗口菜单栏是否自动隐藏。 一旦设置，菜单栏将只在用户单击 `Alt` 键时显示。

如果菜单栏已经可见, 调用 `setAutoHideMenuBar(true)`时不会立刻隐藏。

#### `win.isMenuBarAutoHide()`

返回 `Boolean` - 判断窗口的菜单栏是否自动隐藏.

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

设置菜单栏是否可见。 如果菜单栏自动隐藏，用户仍然可以通过单击 `Alt` 键来唤出菜单栏。

#### `win.isMenuBarVisible()`

返回 `Boolean` - 判断窗口的菜单栏是否可见.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (可选)
  * `visibleOnFullScreen` Boolean (optional) _macOS_ - Sets whether the window should be visible above fullscreen windows.
  * `skipTransformProcessType` Boolean (optional) _macOS_ - Calling setVisibleOnAllWorkspaces will by default transform the process type between UIElementApplication and ForegroundApplication to ensure the correct behavior. However, this will hide the window and dock for a short time every time it is called. If your window is already of type UIElementApplication, you can bypass this transformation by passing true to skipTransformProcessType.

设置窗口是否在所有工作空间上可见

**注意:** 该 API 在 Windows 上无效.

#### `win.isVisibleOnAllWorkspaces()`

返回 `Boolean` - 判断窗口是否在所有工作空间上可见.

**注意:** 该 API 在 Windows 上始终返回 false.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (可选)
  * `forward` Boolean (可选) _macOS_ _Windows_ - 如果为 true, 传递鼠标移动消息给 Chromium，鼠标相关事件将可用，如 `mouseleave`。 仅当` ignore </ 0>为 true 时才被使用。 如果 <code>ignore` 为 false, 转发始终是禁用的，不管这个值是什么。

忽略窗口内的所有鼠标事件

在此窗口中发生的所有鼠标事件将被传递到此窗口下面的窗口, 但如果此窗口具有焦点, 它仍然会接收键盘事件

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

防止窗口内容被其他应用捕获

在 macOS 上，它将 NSWindow 的 sharingType 设置为 NSWindowSharingNone。 在 Windows 上，它以参数为 `WDA_EXCLUDEFROMCAPTURE` 调用 SetWindowDisplayAffinity 。 对于 Windows 10 2004以上版，本窗口将完全从抓取中移除，在低版本 Windows 上其行为就像是 `WDA_MONITOR` 捕捉了黑色窗口。

#### `win.setFocusable(focusable)` _macOS_ _Windows_

* `focusable` Boolean

设置窗口是否可聚焦

在 macOS 上，该方法不会从窗口中移除焦点。

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

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

* `type` String | null - 可以是 `appearance-based`，`light`，`dark`，`titlebar`，`selection`，`menu`，`popover`，`sidebar`，`medium-light`，`ultra-dark`，`header`，`sheet`，`window`，`hud`，`fullscreen-ui`，`tooltip`，`content`，`under-window` 或 `under-page`。 更多详细信息，请查阅 [macOS documentation][vibrancy-docs]

在浏览器窗口中添加一个动态特效。 传递 `null` 或空字符串将会移除窗口上的动态效果。

请注意， `appearance-based`，`light`，`dark`，`medium-light` 和 `ultra-dark` 已被弃用，并将在即将推出的 macOS 版本中被移除。

#### `win.setTrafficLightPosition(position)` _macOS_

* `position` [Point](structures/point.md)

Set a custom position for the traffic light buttons in frameless window.

#### `win.getTrafficLightPosition()` _macOS_

Returns `Point` - The custom position for the traffic light buttons in frameless window.

#### `win.setTouchBar(touchBar)` _macOS_

* `touchBar` TouchBar | null

设置窗口的触摸条布局 设置为 `null` 或`undefined`将清除触摸条. 此方法只有在macOS 10.12.1+且设备支持触摸条TouchBar时可用.

**注意:** TouchBar API目前为实验性质，以后的Electron版本可能会更改或删除。

#### `win.setBrowserView(browserView)` _实验_

* `browserView` [BrowserView](browser-view.md) | null - 将 `browserView` 附加到 `win`。 如果已经附加了其他 `BrowserView`，那么它们将会被从此窗口中移除。

#### `win.getBrowserView()` _实验功能_

返回 `BrowserView | null` - 附加到 `win` 的 `BrowserView` 。 如果未附加，则返回 `null`。 如果附加了多个 `BrowserView`，则抛出错误。

#### `win.addBrowserView(browserView)` _实验功能_

* `browserView` [BrowserView](browser-view.md)

替代 setBrowserView 的API，支持多个browserView一起使用。

#### `win.removeBrowserView(browserView)` _实验功能_

* `browserView` [BrowserView](browser-view.md)

#### `win.setTopBrowserView(browserView)` _实验功能_

* `browserView` [BrowserView](browser-view.md)

提高 `browserView` 于其它附加到 `win` 的 `BrowserView` 之上 。 如果 `browserView` 未附加到 `win`，则抛出错误。

#### `win.getBrowserViews()` _实验功能_

返回 `BrowserView[]` - 所有通过 `addBrowserView` 或 `setBrowserView` 附加的BrowserView数组。

**注意:** BrowserView 的 API目前为实验性质，可能会更改或删除。

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[page-visibility-api]: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
[quick-look]: https://en.wikipedia.org/wiki/Quick_Look
[vibrancy-docs]: https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc
[window-levels]: https://developer.apple.com/documentation/appkit/nswindow/level
[chrome-content-scripts]: https://developer.chrome.com/extensions/content_scripts#execution-environment
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
