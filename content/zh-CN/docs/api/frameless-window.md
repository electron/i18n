# 无边框窗口

> 打开一个无工具栏、边框、和其它图形化外壳的窗口。

无边框窗口是不带[外壳](https://developer.mozilla.org/en-US/docs/Glossary/Chrome)（包括窗口边框、工具栏等），只含有网页内容的窗口。 这些是 [` BrowserWindow`](browser-window.md) 类上的选项。

## 创建无边框窗口

要创建无边框窗口，只需在 [ BrowserWindow ](browser-window.md) 的 ` options ` 中将 ` frame ` 设置为 ` false `：

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600, frame: false })
win.show()
```

### macOS 上的其他方案

要实现无边框窗口还有其他的方案。 将`frame`设置为`false`会将标题栏和窗口控制按钮全部隐藏，但实际上，你可能希望隐藏标题栏并将内容区域全屏的同时，依旧保留窗口控制按钮("红绿灯")来进行标准窗口操作。 你可以通过指定 ` titleBarStyle ` 选项来完成此操作：

#### `hidden`

返回一个隐藏标题栏的全尺寸内容窗口，在左上角仍然有标准的窗口控制按钮（俗称“红绿灯”）。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'hidden' })
win.show()
```

#### `hiddenInset`

返回一个另一种隐藏了标题栏的窗口，其中控制按钮到窗口边框的距离更大。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'hiddenInset' })
win.show()
```

#### `customButtonsOnHover`

使用自定义的关闭、缩小和全屏按钮，这些按钮会在划过窗口的左上角时显示。 由于无框窗口与苹果 macOS 窗口界面的限制，全屏按钮不可用。 这些自定义的按钮能防止, 与发生于标准的窗口工具栏按钮处的鼠标事件相关的问题. 这个选项只适用于无框窗口。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'customButtonsOnHover', frame: false })
win.show()
```

## 透明窗口

通过将 ` transparent ` 选项设置为 ` true `, 还可以使无框窗口透明:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ transparent: true, frame: false })
win.show()
```

### 局限性

* 你不能点击穿透透明区域。 我们将引入一个 API 来设置窗口形状以解决此问题, 请参阅 [ our issue ](https://github.com/electron/electron/issues/1335) 以了解详细信息。
* 透明窗口不可调整大小。 在某些平台上，将 ` resizable ` 设置为 ` true ` 可能会使透明窗口停止工作。
* `blur ` 筛选器仅适用于网页, 因此无法对位于透明窗口下方的内容应用模糊效果 (例如在用户系统上打开的其他应用程序) 。
* 当打开开发者工具时，窗口将不透明。
* 在 Windows 操作系统中，
  * 当DWM禁用时，透明窗口将失效。
  * 透明窗口不能通过Windows系统菜单或双击标题栏实现最大化。 其背后的原因可以看[这个pull request](https://github.com/electron/electron/pull/28207)。
* 在 linux 上, 用户必须在命令行中设置 `--enable-transparent-visuals --disable-gpu ` 来禁用GPU, 启用 ARGB，用以实现窗体透明。 这是由一个上游的 bug 导致的, 即 [ 在Linux机上，透明度通道（alpha channel ）在一些英伟达的驱动（NVidia drivers）中无法运行](https://bugs.chromium.org/p/chromium/issues/detail?id=369209)。
* 在 Mac 上, 透明窗口无法显示原生窗口的阴影。

## 点击穿透窗口

要创建一个点击穿透窗口，也就是使窗口忽略所有鼠标事件，可以调用 [ win.setIgnoreMouseEvents(ignore) ][ignore-mouse-events] API：

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### 转发

忽略鼠标消息会使网页无视鼠标移动，这意味着鼠标移动事件不会被发出。 在 Windows 操作系统上，可以使用可选参数将鼠标移动消息转发到网页，从而允许发出诸如 `mouseleave` 之类的事件：

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

如果只将自定义标题栏设置为可拖拽，还需要使标题栏中的所有按钮都不可拖拽。

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

[ignore-mouse-events]: browser-window.md#winsetignoremouseeventsignore-options
