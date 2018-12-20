## 类: BrowserView

> 创建和控制视图

线程：[主线程](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). It is like a child window, except that it is positioned relative to its owning window. It is meant to be an alternative to the `webview` tag.

## 示例

```javascript
// 在主进程中.
const { BrowserView, BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

let view = new BrowserView({
  webPreferences: {
    nodeIntegration: false
  }
})
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([可选])` *实验功能*

* `选项` Object (可选) 
  * `webPreferences` Object (可选) - 详情请看 [BrowserWindow](browser-window.md).

### 静态方法

#### `BrowserView.getAllViews()`

Returns `BrowserView[]` - An array of all opened BrowserViews.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserView | null` - The BrowserView that owns the given `webContents` or `null` if the contents are not owned by a BrowserView.

#### `BrowserView.fromId(id)`

* `id` Integer

Returns `BrowserView` - The view with the given `id`.

### 实例属性

Objects created with `new BrowserView` have the following properties:

#### `view.webContents` *实验功能*

A [`WebContents`](web-contents.md) object owned by this view.

#### `view.id` *实验功能*

A `Integer` representing the unique ID of the view.

### 实例方法

Objects created with `new BrowserView` have the following instance methods:

#### `view.destroy()`

Force closing the view, the `unload` and `beforeunload` events won't be emitted for the web page. After you're done with a view, call this function in order to free memory and other resources as soon as possible.

#### `view.isDestroyed()`

Returns `Boolean` - Whether the view is destroyed.

#### `view.setAutoResize(options)` *实验功能*

* `选项` Object 
  * `width` Boolean - 如果为`true`，视图宽度跟随窗口变化. 默认为 `false`.
  * `height` Boolean - 如果为`true`，视图高度跟随窗口变化. 默认为 `false`.

#### `view.setBounds(bounds)` *实验功能*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *实验功能*

* `color` String - 颜色值格式为 `#aarrggbb` 或 `#argb`, 透明度为可选参数.