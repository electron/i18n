# 无边框窗口

> 打开一个无工具栏、边框、和其它图形化外壳的窗口。

无边框窗口是不带[外壳](https://developer.mozilla.org/en-US/docs/Glossary/Chrome)（包括窗口边框、工具栏等），只含有网页内容的窗口。 这些是 [` BrowserWindow`](browser-window.md) 类上的选项。

## 创建无边框窗口

要创建无边框窗口，只需在 [ BrowserWindow ](browser-window.md) 的 ` options ` 中将 ` frame ` 设置为 ` false `：

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600, frame: false})
win.show()
```

### macOS 上的其他方案

在 macOS 10.9 Mavericks 及更新的版本中，有另一种方式来指定无边框窗口。 通过将 ` frame ` 设置为 ` false ` 得到的窗口在隐藏标题栏的同时也隐藏了窗口控制按钮（俗称“红绿灯”），而有时我们希望保留控制按钮以便对窗口进行操作，同时使内容扩充到整个窗口。 您可以通过指定 ` titleBarStyle ` 选项来完成此操作：

#### `hidden`

返回一个隐藏标题栏的全尺寸内容窗口，在左上角仍然有标准的窗口控制按钮（俗称“红绿灯”）。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hidden'})
win.show()
```

#### `hiddenInset`

返回一个另一种隐藏了标题栏的窗口，其中控制按钮到窗口边框的距离更大。

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
* 在 linux 上, 用户必须在命令行中设置 `--enable-transparent-visuals --disable-gpu ` 来禁用GPU, 启用 ARGB，用以实现窗体透明。 这是由一个上游的 bug 导致的, 即 [ 在Linux机上，透明度通道（alpha channel ）在一些英伟达的驱动（NVidia drivers）中无法运行](https://code.google.com/p/chromium/issues/detail?id=369209)。
* 在 Mac 上, 原生窗口阴影不会在透明窗口中显示。

## 点击穿透窗口

To create a click-through window, i.e. making the window ignore all mouse events, you can call the [win.setIgnoreMouseEvents(ignore)](browser-window.md#winsetignoremouseeventsignore) API:

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

默认情况下, 无边框窗口是不可拖拽的。 应用程序需要在 CSS 中指定 `-webkit-app-region: drag` 来告诉 Electron 哪些区域是可拖拽的（如操作系统的标准标题栏），在可拖拽区域内部使用 ` -webkit-app-region: no-drag ` 则可以将其中部分区域排除。 请注意, 当前只支持矩形形状。

注意: `-webkit-app-region: drag ` 在开发人员工具打开时会出现问题。 查看更多信息 (包括变通方法), 请参见此 [ GitHub 问题 ](https://github.com/electron/electron/issues/3647)。

要使整个窗口可拖拽, 您可以添加 `-webkit-app-region: drag` 作为 ` body ` 的样式:

```html
<body style="-webkit-app-region: drag">
</body>
```

请注意，如果您使整个窗口都可拖拽，则必须将其中的按钮标记为不可拖拽，否则用户将无法点击它们：

```css
button {
  -webkit-app-region: no-drag;
}
```

If you're setting just a custom titlebar as draggable, you also need to make all buttons in titlebar non-draggable.

## 文本选择

在无框窗口中, 拖动行为可能与选择文本冲突。 例如, 当您拖动标题栏时, 您可能会意外地选择标题栏上的文本。 为防止此操作, 您需要在可区域中禁用文本选择, 如下所选:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## 右键菜单

在某些平台上，可拖拽区域不被视为窗口的实际内容，而是作为窗口边框处理，因此在右键单击时会弹出系统菜单。 要使上下文菜单在所有平台上都正确运行, 您永远也不要在可拖拽区域上使用自定义上下文菜单。