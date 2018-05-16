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
* On Linux users have to put `--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://code.google.com/p/chromium/issues/detail?id=369209) on Linux.
* On Mac the native window shadow will not be shown on a transparent window.

## 点击穿透 window

要创建一个点击穿透窗口, 例如：使窗口忽略所有鼠标事件, 可以调用 [ win. setIgnoreMouseEvents (ignore) ](browser-window.md#winsetignoremouseeventsignore) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

## 可拖拽区

By default, the frameless window is non-draggable. Apps need to specify `-webkit-app-region: drag` in CSS to tell Electron which regions are draggable (like the OS's standard titlebar), and apps can also use `-webkit-app-region: no-drag` to exclude the non-draggable area from the draggable region. Note that only rectangular shapes are currently supported.

Note: `-webkit-app-region: drag` is known to have problems while the developer tools are open. See this [GitHub issue](https://github.com/electron/electron/issues/3647) for more information including a workaround.

To make the whole window draggable, you can add `-webkit-app-region: drag` as `body`'s style:

```html
<body style="-webkit-app-region: drag">
</body>
```

And note that if you have made the whole window draggable, you must also mark buttons as non-draggable, otherwise it would be impossible for users to click on them:

```css
button {
  -webkit-app-region: no-drag;
}
```

If you're setting just a custom titlebar as draggable, you also need to make all buttons in titlebar non-draggable.

## 文本选择

In a frameless window the dragging behaviour may conflict with selecting text. For example, when you drag the titlebar you may accidentally select the text on the titlebar. To prevent this, you need to disable text selection within a draggable area like this:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## 右键菜单

On some platforms, the draggable area will be treated as a non-client frame, so when you right click on it a system menu will pop up. To make the context menu behave correctly on all platforms you should never use a custom context menu on draggable areas.