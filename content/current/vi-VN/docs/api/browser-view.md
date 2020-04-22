## Lớp: BrowserView

> Create and control views.

Process: [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). It is like a child window, except that it is positioned relative to its owning window. Có thể xem nó là một sự lựa chọn khác với sử dụng tag `webview`.

### Ví dụ

```javascript
// Trong tiến trình main.
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

### `new BrowserView([options])` _Đang thử nghiệm_

* `options` Object (optional)
  * `webPreferences` Object (không bắt buộc) - Xem [BrowserWindow](browser-window.md).

### Các phương thức chung

#### `BrowserView.getAllViews()`

Trả về `BrowserView[]` - Một array các BrowserView đã mở.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Trả về `BrowserView ` đang sở hữu `webContents` hoặc trả về `null` nếu webContent không được sở hữu bởi BrowserView.

#### `BrowserView.fromId(id)`

* `id` Số nguyên

Trả về `BrowserView` với `id` đã cho.

### Các Thuộc Tính

Object được tạo bằng `new BrowserView` có các thuộc tính sau đây:

#### `view.webContents` _Đang thử nghiệm_

[`WebContents`](web-contents.md) object sở hữu bởi view này.

#### `view.id` _Đang thử nghiệm_

Một `số thực` đại diện cho ID độc nhất của View đó.

### Các phương thức riêng

Object được tạo bằng `new BrowserView` các các phương thức riêng sau đây:

#### `view.destroy()`

Force closing the view, the `unload` and `beforeunload` events won't be emitted for the web page. After you're done with a view, call this function in order to free memory and other resources as soon as possible.

#### `view.isDestroyed()`

Returns `Boolean` - Whether the view is destroyed.

#### `view.setAutoResize(options)` _Đang thử nghiệm_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.

#### `view.setBounds(bounds)` _Đang thử nghiệm_

* `bounds` [Rectangle](structures/rectangle.md)

Điều chỉnh kích cỡ và di chuyển view.

#### `view.getBounds()` _Experimental_

Returns [`Rectangle`](structures/rectangle.md)

The `bounds` of this BrowserView instance as `Object`.

#### `view.setBackgroundColor(color)` _Đang thử nghiệm_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
