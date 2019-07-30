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
* 在Linux上，模态窗口的类型将更改为 `dialog`.
* 在Linux上，许多桌面环境不支持隐藏模态窗口。

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
  * `title`String(可选) - 默认窗口标题 默认为`"Electron"`。 如果由`loadURL()`加载的HTML文件中含有标签`<title>`，此属性将被忽略。
  * `icon` ([NativeImage](native-image.md) | String) (可选) - 窗口的图标. 在 Windows 上推荐使用 `ICO` 图标来获得最佳的视觉效果, 默认使用可执行文件的图标.
  * `show` Boolean (可选) - 窗口创建的时候是否显示. 默认值为`true`.
  * `frame` Boolean (可选) - 设置为 `false` 时可以创建一个[Frameless Window](frameless-window.md). 默认值为 `true`.
  * `parent` BrowserWindow (可选) - 指定父窗口. 默认值为 `null`.
  * `modal` Boolean (可选) -是否为模态窗. 仅供子窗口使用. 默认值为`false`.
  * `acceptFirstMouse` Boolean (可选) - 是否允许单击页面来激活窗口. 默认值为 `false`.
  * `disableAutoHideCursor` Boolean (可选) - 是否在输入时隐藏鼠标. 默认值为`false`.
  * `autoHideMenuBar` Boolean (可选) - 自动隐藏菜单栏, 除非按了`Alt`键. 默认值为`false`.
  * `enableLargerThanScreen` Boolean (可选) - 是否允许改变窗口的大小时, 大于屏幕的尺寸. 默认值为`false`.
  * `backgroundColor` String(可选) - 窗口的背景颜色为十六进制值，例如`#66CD00`, `#FFF`, `#80FFFFFF` (设置`transparent`为`true`方可支持alpha属性，格式为#AARRGGBB)。 默认值为 `#FFF`（白色）。
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
    * `nodeIntegration` Boolean (可选) - 是否集成Node，默认为`false`。
    * `nodeIntegrationInWorker` Boolean (可选) - 是否在Web工作器中启用了Node集成. 默认值为 `false`. 更多内容参见 [多线程](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (optional) - Experimental option for enabling Node.js support in sub-frames such as iframes and child windows. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not.
    * `preload` String (可选) -在页面运行其他脚本之前预先加载指定的脚本 无论页面是否集成Node, 此脚本都可以访问所有Node API 脚本路径为文件的绝对路径。 当 node integration 关闭时, 预加载的脚本将从全局范围重新引入node的全局引用标志 [参考示例](process.md#event-loaded).
    * `sandbox` Boolean (可选)-如果设置该参数, 沙箱的渲染器将与窗口关联, 使它与Chromium OS-level 的沙箱兼容, 并禁用 Node. js 引擎。 它与 `nodeIntegration` 的选项不同，且预加载脚本的 API 也有限制. [更多详情](sandbox-option.md). **注意:**改选项目前是为实验性质，可能会在 Electron 未来的版本中移除。
    * `enableRemoteModule` Boolean（可选）- 是否启用 [`Remote`](remote.md) 模块。 默认值为 `true`。
    * `session` [Session](session.md#class-session) (可选) - 设置页面的 session 而不是直接忽略 Session 对象, 也可用 `partition` 选项来代替，它接受一个 partition 字符串. 同时设置了`session` 和 `partition`时, `session` 的优先级更高. 默认使用默认的 session.
    * `partition` String (optional) - 通过 session 的 partition 字符串来设置界面session. 如果 `partition` 以 `persist:`开头, 该页面将使用持续的 session，并在所有页面生效，且使用同一个`partition`. 如果没有 `persist:` 前缀, 页面将使用 in-memory session. 通过分配相同的 ` partition `, 多个页可以共享同一会话。 默认使用默认的 session.
    * `affinity` String (可选) - 当指定，具有相同`affinity` 的 web页面将在相同的渲染进程运行。 需要注意的是，由于渲染过程中会有代码重用，如 `webPreferences`的`preload`, `sandbox` 和 `nodeIntegration`等选项会在不同页面之间共用，即使你已经在不同页面中为同一选项设置过不同的值，它们仍会被共用。 因此，建议为`affinity`相同的页面，使用相同的 `webPreferences` *这一选项当前是实验性的*
    * `zoomFactor` Number (可选) - 页面的默认缩放系数, `3.0` 表示 `300%`. 默认值为 `1.0`.
    * `javascript` Boolean (可选) - 是否启用 JavaScript 支持. 默认值为 `true`.
    * `webSecurity` Boolean (可选) - 当设置为 `false`, 它将禁用同源策略 (通常用来测试网站), 如果此选项不是由开发者设置的，还会把 `allowRunningInsecureContent`设置为 `true`. 默认值为 `true`。
    * `allowRunningInsecureContent` Boolean (可选) -允许一个 https 页面运行 http url 里的资源，包括 JavaScript, CSS 或 plugins. 默认值为 `false`.
    * `images` Boolean (可选) - 启动图像支持. 默认值为 `true`.
    * `textAreasAreResizable` Boolean (可选) - 让 TextArea 元素可以调整大小. 默认值为 `true`.
    * `webgl` Boolean (可选) - 启用 WebGL 支持. 默认值为 `true`.
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
    * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. 默认值为 `false`. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. 默认值为 `false`. Child windows will always have node integration disabled unless `nodeIntegrationInSubFrames` is true. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). 默认值为 `false`. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.
    * `additionalArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Default is `false`.
    * `safeDialogsMessage` String (optional) - The message to display when consecutive dialog protection is triggered. If not defined the default message would be used, note that currently the default message is in English and not localized.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Default is `false`.
    * `autoplayPolicy` String (optional) - Autoplay policy to apply to content in the window, can be `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Defaults to `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.

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

#### 事件： 'app-command' *Windows**Linux*

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

滚轮事件阶段开始时触发

#### 事件: 'scroll-touch-end' *macOS*

滚轮事件阶段结束时触发

#### 事件: 'scroll-touch-edge' *macOS*

滚轮事件阶段到达元素边缘时触发

#### 事件: 'swipe' *macOS*

返回:

* `event` Event
* `direction` String

三指拖移时触发，可选的方向为 `up`, `right`, `down`, `left`.

#### 事件: 'sheet-begin' *macOS*

窗口打开sheet(工作表) 时触发

#### 事件: 'sheet-end' *macOS*

窗口关闭sheet(工作表) 时触发

#### 事件: 'new-window-for-tab' *macOS*

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

返回 ` BrowserWindow | null `-拥有给定 ` browserView ` 的窗口。如果给定视图未附加到任何窗口, 则返回 ` null `。

#### `BrowserWindow.fromId(id)`

* `id` Integer

返回 `BrowserWindow` -拥有给定 `id` 的窗口.

#### `BrowserWindow.addExtension(path)`

* `path` String

添加位于 `path`的扩展，并且返回扩展名

该方法如果扩展的 manifest 缺失或不完整，该方法不会返回。

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.

#### `BrowserWindow.removeExtension(name)`

* `name` String

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

* `name` String

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

窗口拥有的 `WebContents` 对象. 所有与网页相关的事件和操作都将通过它完成.

有关它的方法和事件, 请参见 [`webContents` documentation](web-contents.md)

#### `win.id`

`Integer` 窗口的唯一ID

### 实例方法

使用 `new BrowserWindow `创建的对象具有以下实例方法:

** 注意: **某些方法仅在特定的操作系统上可用, 这些方法会被标记出来。

#### `win.destroy()`

强制关闭窗口, 除了` closed `之外，`close`，`unload` 和 `beforeunload` 都不会被触发

#### `win.close()`

尝试关闭窗口。这与用户手动点击窗口的关闭按钮效果相同。但页面也可以取消关闭。请看 [close event](#event-close)

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

最大化窗口。如果窗口尚未显示, 这也将会显示 (但不会聚焦)。

#### `win.unmaximize()`

取消窗口最大化

#### `win.isMaximized()`

返回 `Boolean` - 判断窗口是否最大化

#### `win.minimize()`

窗口最小化。在某些平台上, 最小化的窗口将显示在Dock中.

#### `win.restore()`

将窗口从最小化状态恢复到以前的状态。

#### `win.isMinimized()`

返回 `Boolean` -判断窗口是否最小化

#### `win.setFullScreen(flag)`

* `flag` Boolean

设置窗口是否应处于全屏模式。

#### `win.isFullScreen()`

返回 `Boolean` - 窗口当前是否已全屏

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

进入或离开简单的全屏模式。

简单全屏模式模拟 Mac OS X prior to Lion (10.7) 版本中发现的原生全屏行为。

#### `win.isSimpleFullScreen()` *macOS*

返回 `Boolean` - 窗口是否为简单全屏模式(pre-Lion)。

#### `win.isNormal()`

返回 `Boolean` - 窗口是否处于正常状态（未最大化，未最小化，不在全屏模式下）。

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* ` aspectRatio ` Float- 为内容视图保持的宽高比.
* `extraSize` [Size](structures/size.md) - 维持高宽比值时不包含的额外大小

这将使窗口保持长宽比。 额外的大小允许开发人员有空间 (以像素为单位), 不包括在纵横比计算中。 此 API 已经考虑了窗口大小和内容大小之间的差异。

想象一个使用高清视频播放器和相关控件的普通窗口。 假假如左边缘有15px, 右边缘有25px, 在播放器下面有50px. 为了保持16:9 的长宽比 (标准的HD长宽比为1920x1080)， 我们可以调用这个api传入参数16/9 和[ 40,50 ]. 第二个参数不管网页中的额外的宽度和高度在什么位置, 只要它们存在就行. 在全部内部窗口中，加上任何额外的宽度和高度 。

使用 `0` 调用此函数，将会移除先前设置的宽高比。

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - 十六进制的窗口背景色，如 `#66CD00`、`#FFF`和`#80FFFFFF`。 (如果`transparent`是`true`的话，也支持alpha 通道。) 默认值为 `#FFF`（白色）。

设置窗体的背景颜色。详见 [Setting `backgroundColor`](#setting-backgroundcolor)。

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String -要用 QuickLook 预览的文件的绝对路径。 这一点很重要，因为Quick Look 使用了路径上的文件名和文件扩展名 来决定要打开的文件的内容类型。
* `displayName` String (可选) - 在Quick Look 模态视图中显示的文件的名称。 这完全是视觉的，不会影响文件的内容类型。 默认值为 `path`.

使用 [Quick Look](https://en.wikipedia.org/wiki/Quick_Look)来预览路径中的文件.

#### `win.closeFilePreview()` *macOS*

关闭当前打开的 [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) 面板.

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (可选) *macOS*

重新调整窗口大小并将其移动到提供的 bounds。当一些属性值没有被提供时，将不被更改。

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

调整窗口的工作区 (如网页) 的大小并将其移动到所提供的边界。

#### `win.getContentBounds()`

返回 [`Rectangle`](structures/rectangle.md)

#### `win.getNormalBounds()`

返回 [`Rectangle`](structures/rectangle.md) - 包含正常状态下的窗口大小。

**注意：**无论当前的窗口状态为：最大化、最小化或者全屏，这个方法都将得到窗口在正常显示状态下的位置信息以及大小信息。 在正常状态下，getBounds 与 getNormalBounds 得到的边界信息 [`Rectangle`](structures/rectangle.md) 是一致的。

#### `win.setEnabled(enable)`

* `enable` Boolean

禁用或者启用窗口。

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (可选) *macOS*

将窗口的大小调整为`width`和`height`. 如果`width`或`height`低于设定的最小值, 那么对应的大小将被截断至设定的最小值.

#### `win.getSize()`

返回 ` Integer [] `-包含窗口的宽度和高度。

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (可选) *macOS*

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

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

设置窗口是否可由用户移动。在 Linux 上无效。

#### `win.isMovable()` *macOS* *Windows*

返回 `Boolean` - 窗口是否可以被用户拖动

在 Linux 上总是返回 ` true `。

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

设置窗口是否可以最小化. 在 Linux 上无效.

#### `win.isMinimizable()` *macOS* *Windows*

返回 `Boolean` -窗口是否可以最小化

在 Linux 上总是返回 ` true `。

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

设置窗口是否可以最大化. 在 Linux 上无效.

#### `win.isMaximizable()` *macOS* *Windows*

返回 `Boolean` - 窗口是否可以最大化.

在 Linux 上总是返回 ` true `。

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

设置点击最大化按钮是否可以全屏或最大化窗口.

#### `win.isFullScreenable()`

返回 `Boolean` - 是否为全屏状态或窗口最大化

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

设置窗口是否可以人为关闭。在 Linux 上无效.

#### `win.isClosable()` *macOS* *Windows*

返回 `Boolean` - 窗口是否被用户关闭了.

在 Linux 上总是返回 ` true `。

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (可选) *macOS* - 可以为下面的值 `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, 和 ~~`dock`~~ (参考值). 默认值为 `floating`. 更多信息，请查阅 [macOS docs](https://developer.apple.com/documentation/appkit/nswindow/level)
* `relativeLevel` Integer (可选) *macOS* - 设置此窗口相对于给定 `级别`的层数。. 默认值为`0`. 请注意, Apple 不鼓励在 ` 屏幕保护程序 ` 之上设置高于1的级别。

设置窗口是否应始终显示在其他窗口的顶部。设置之后, 仍然是一个普通窗口, 而不是一个无法聚焦的工具箱窗口。

#### `win.isAlwaysOnTop()`

返回 `Boolean` - 当前窗口是否始终在其它窗口之前.

#### `win.moveTop()`

无论焦点如何, 将窗口移至顶端(z轴上的顺序).

#### `win.center()`

将窗口移动到屏幕中央。

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (可选) *macOS*

将窗口移动到 ` x ` 和 ` y `。

#### `win.getPosition()`

返回 `Integer[]` - 返回一个包含当前窗口位置的数组.

#### `win.setTitle(title)`

* `title` String

将原生窗口的标题更改为 ` title `。

#### `win.getTitle()`

返回 ` String `-原生窗口的标题。

**Note:** The title of the web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (可选)

更改macOS上的工作表的附件点。默认情况下, 工作表时在窗口框架下附加的，但是您可能想要将它们显示在 HTML-rendered 的工具栏。例如:

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

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Integer
* `callback` Function

挂钩窗口的消息。在 WndProc 中接收消息时调用`callback` 。

#### `win.isWindowMessageHooked(message)` *Windows*

* `message` Integer

返回 `Boolean` - `true` 或`false` ，具体取决于是否钩挂了消息.

#### `win.unhookWindowMessage(message)` *Windows*

* `message` Integer

取消窗口信息的钩子。

#### `win.unhookAllWindowMessages()` *Windows*

取消所有窗口信息的钩子。

#### `win.setRepresentedFilename(filename)` *macOS*

* `filename` String

设置窗口所代表的文件的路径名，并且将这个文件的图标放在窗口标题栏上。

#### `win.getRepresentedFilename()` *macOS*

返回 `String` - 获取窗口当前文件路径.

#### `win.setDocumentEdited(edited)` *macOS*

* `edited` Boolean

明确指出窗口文档是否可以编辑, 如果设置为`true`则将标题栏的图标变成灰色.

#### `win.isDocumentEdited()` *macOS*

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
* `options` Object (可选) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (可选) - 一个 HTTP Referrer url。
  * `userAgent` String (可选) - 发起请求的 userAgent.
  * `extraHeaders` String (可选) - 用 "\n" 分割的额外标题
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (可选)
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
* `options` Object (可选) 
  * `mode` String *Windows* - 进度条的模式. 可以为 `none`, `normal`, `indeterminate`, `error`, 或 `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `app.getName().desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) | null - 右下角任务栏的显示图标。 如果此参数是 `null`，覆盖层层会被清除。
* `description` String -提供给屏幕阅读器的描述文字

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)` *macOS*

* `hasShadow` Boolean

Sets whether the window should have a shadow. On Windows and Linux does nothing.

#### `win.hasShadow()` *macOS*

Returns `Boolean` - Whether the window has a shadow.

On Windows and Linux always returns `true`.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - 介于0.0 ( 完全透明 ) 和1.0 ( 完全不透明 ) 之间

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` *Windows* *macOS*

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque)

#### `win.setShape(rects)` *Windows* *Linux* *实验性*

* `rects` [Rectangle[]](structures/rectangle.md) - 设置窗口的形状. 传入空列表会使窗口恢复至矩形.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Object 
  * `icon` [NativeImage](native-image.md) - 在缩图工具栏上显示的图标.
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

* `region` [Rectangle](structures/rectangle.md) 窗口的区域

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` *Windows*

* `options` Object 
  * `appId` String (可选) - 窗口的 [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). 该项必须设置, 否则其他选项将没有效果.
  * `appIconPath` String (可选) -窗口的 [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (可选) - `appIconPath` 中的图标索引. 当`appIconPath` 没设置时则忽略. 默认值为`0`.
  * `relaunchCommand` String (可选) - 窗口的 [重新启动命令](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (可选) - 窗口的[重新启动显示名称](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

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
* `options` Object (可选) 
  * `visibleOnFullScreen` Boolean (可选) *macOS* - 设置是否窗口可以在全屏窗口之上显示。

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (可选) 
  * `forward` Boolean (可选) *macOS* *Windows* - 如果为 true, 传递鼠标移动消息给 Chromium，鼠标相关事件将可用，如 `mouseleave`。 仅当` ignore </ 0>为 true 时才被使用。 如果 <code>ignore` 为 false, 转发始终是禁用的，不管这个值是什么。

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

* `type` String - 可以为 `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` 或 `ultra-dark`. 更多详细信息，请查阅 [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc)

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` *macOS* *实验*

* `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**注意:** TouchBar API目前为实验性质，以后的Electron版本可能会更改或删除。

#### `win.setBrowserView(browserView)` *实验*

* `browserView` [BrowserView](browser-view.md). Attach browserView to win. If there is some other browserViews was attached they will be removed from this window.

#### `win.getBrowserView()` *实验功能*

Returns `BrowserView | null` - an BrowserView what is attached. Returns `null` if none is attached. Throw error if multiple BrowserViews is attached.

#### `win.addBrowserView(browserView)` *实验*

* `browserView` [BrowserView](browser-view.md)

Replacement API for setBrowserView supporting work with multi browser views.

#### `win.removeBrowserView(browserView)` *实验*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` *实验功能*

Returns array of `BrowserView` what was an attached with addBrowserView or setBrowserView.

**Note:** The BrowserView API is currently experimental and may change or be removed in future Electron releases.

### Properties

#### `win.excludedFromShownWindowsMenu` *macOS*

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