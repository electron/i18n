# 无边框窗口

> 打开一个无工具栏、边框、和其它图形化界面的"谷歌浏览器"窗口

无边框窗口它不是完整的谷歌浏览器窗口，它只是窗口的一部分，像工具栏，它不是网页的一个部分 这些是 [` BrowserWindow`](browser-window.md) 类上的选项。

## 创建无框窗口

要创建无框窗口, 需要在 [ BrowserWindow ](browser-window.md) 的 ` options ` 中将 ` frame ` 设置为 ` false `:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600, frame: false})
win.show()
```

### MacOS 上的替代方案

在 macOS 10.9 Mavericks and newer, 有另一种方式来指定无窗口。 用禁用标题栏和窗口控件来代替将 ` frame ` 设置为 ` false `, you may want to have the title bar hidden and your content extend to the full window size ，但仍保留窗口控件 ("红绿灯") 作为标准窗口操作。 您可以通过指定 ` titleBarStyle ` 选项来完成此操作:

#### `hidden`

返回一个隐藏标题栏的全尺寸内容窗口，在标题栏的左上角仍然有标准的窗口控件(“交通灯”)。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hidden'})
win.show()
```

#### `hiddenInset`

返回一个隐藏了标题栏且可以选择外观的窗口，交通灯按钮在窗口边缘的内测

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hiddenInset'})
win.show()
```

#### `customButtonsOnHover`

使用自定义的关闭、缩小和全屏按钮，这些按钮会在划过窗口的左上角时显示。 这些自定义按钮会阻止工具栏窗口上的鼠标事件。 这个选项只适用于无框架的窗口。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'customButtonsOnHover', frame: false})
win.show()
```

## 透明窗口

通过将 ` transparent ` 选项设置为 ` true `, 还可以使无框窗口透明:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({transparent: true, frame: false})
win.show()
```

### 局限性

* 你不能点击穿透透明区域。 我们将引入一个 API 来设置窗口形状以解决此问题, 请参阅 [ our issue ](https://github.com/electron/electron/issues/1335) 以了解详细信息。
* 透明窗口不可调整大小。在某些平台上，将 ` resizable ` 设置为 ` true ` 可能会使透明窗口停止工作。
* `blur ` 筛选器仅适用于网页, 因此无法对位于透明窗口下方的内容应用模糊效果 (例如在用户系统上打开的其他应用程序) 。
* 在 windows 操作系统上, 当 DWM 被禁用时, 透明窗口将无法工作。
* On Linux, users have to put `--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://code.google.com/p/chromium/issues/detail?id=369209) on Linux.
* On Mac, the native window shadow will not be shown on a transparent window.

## 点击穿透 window

要创建一个点击穿透窗口, 例如：使窗口忽略所有鼠标事件, 可以调用 [ win. setIgnoreMouseEvents (ignore) ](browser-window.md#winsetignoremouseeventsignore) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### 转发

忽略鼠标消息会使网页无视鼠标移动，这意味着鼠标移动事件不会被发出。 在 Windows 操作系统上，可以使用可选参数将鼠标移动消息转发到网页，从而允许发出诸如 `mouseleave` 之类的事件：

```javascript
let win = require('electron').remote.getCurrentWindow()
let el = document.getElementById('clickThroughElement')
el.addEventListener('mouseenter', () => {
  win.setIgnoreMouseEvents(true, {forward: true})
})
el.addEventListener('mouseleave', () => {
  win.setIgnoreMouseEvents(false)
})
```

这将使网页在 `el` 上点击时穿透，在它外面时恢复正常。

## 可拖拽区

默认情况下, 无框窗口是 non-draggable 的。 应用程序需要指定 `-webkit-app-region: drag` 在 CSS 中告诉Electron哪个区域是可拖拽的 (像 OS 的标准标题栏), 并且应用程序也可以使用 ` -webkit-app-region: no-drag ` 来排除 draggable region 中的 non-draggable 区域。 请注意, 当前只支持矩形形状。

注意: `-webkit-app-region: drag ` 在开发人员工具打开时会出现问题。 查看更多信息 (包括变通方法), 请参见此 [ GitHub 问题 ](https://github.com/electron/electron/issues/3647)。

要使整个窗口可拖拽, 您可以添加 `-webkit-app-region: drag` 作为 ` body ` 的样式:

```html
<body style="-webkit-app-region: drag">
</body>
```

请注意, 如果您已使整个窗口draggable, 则必须将按钮标记为 non-draggable, 否则用户将无法单击它们:

```css
button {
  -webkit-app-region: no-drag;
}
```

如果你设置自定义标题栏为 draggable, 你也需要标题栏中所有的按钮都设为 non-draggable。

## 文本选择

在无框窗口中, 拖动行为可能与选择文本冲突。 例如, 当您拖动标题栏时, 您可能会意外地选择标题栏上的文本。 为防止此操作, 您需要在可区域中禁用文本选择, 如下所选:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## 右键菜单

在某些平台上, 可拖拽区域将被视为non-client frame, 因此当您右键单击它时, 系统菜单将弹出。 要使上下文菜单在所有平台上都正确运行, 您永远也不要在可拖拽区域上使用自定义上下文菜单。