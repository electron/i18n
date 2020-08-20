## 类: BrowserView

> 创建和控制视图

进程：[主进程](../glossary.md#main-process)

`BrowserView` 被用来让 [`BrowserWindow`](browser-window.md) 嵌入更多的 web 内容。 它就像一个子窗口，除了它的位置是相对于父窗口。 这意味着可以替代`webview`标签.

### 示例

```javascript
// 在主进程中.
const { BrowserView, BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

let view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([可选])` _实验功能_

* `options` Object (optional)
  * `webPreferences` Object (可选) - 详情请看 [BrowserWindow](browser-window.md).

### 静态方法

#### `BrowserView.getAllViews()`

返回 `BrowserView[]` - 所有打开的 BrowserViews 的数组。

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

返回 `BrowserView | null` - 如果内容不属于BrowserView，则它拥有返回的`webContents`或`null`。

#### `BrowserView.fromId(id)`

* `id` Integer

返回 `BrowserView` - 带有`id`的视图.

### 实例属性

使用 `new BrowserView` 创建的对象具有以下属性:

#### `view.webContents` _实验功能_

视图的[`WebContents`](web-contents.md) 对象

#### `view.id` _实验功能_

视图的唯一ID `Integer`.

### 实例方法

使用 `new BrowserView`创建的对象具有以下实例方法:

#### `view.destroy()`

强制关闭视图, 不会为网页发出 ` unload ` 和 ` beforeunload ` 事件。 完成视图后, 请调用此函数, 以便尽快释放内存和其他资源。

#### `view.isDestroyed()`

返回 `Boolean` -判断窗口是否被销毁

#### `view.setAutoResize(options)` _实验功能_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.

#### `view.setBounds(bounds)` _实验功能_

* `bounds` [Rectangle](structures/rectangle.md)

调整视图的大小，并将它移动到窗口边界

#### `view.getBounds()` _实验功能_

返回 [`Rectangle`](structures/rectangle.md)

The `bounds` of this BrowserView instance as `Object`.

#### `view.setBackgroundColor(color)` _实验功能_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
