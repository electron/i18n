## Class: BrowserView

> Tạo và điểu khiển View.

**Ghi chú:** BrowserView API đang được thử nghiệm và có thể bị thay đổi hoặc bỏ luôn trong các phiên bản Electron kế tiếp.

Tiến trình: [Main](../glossary.md#main-process)

Một `BrowserView` được dùng để nhúng thêm nội dung web vào một `BrowserWindow`. It is like a child window, except that it is positioned relative to its owning window. It is meant to be an alternative to the `webview` tag.

## Ví dụ

```javascript
// Trong main process.
const {BrowserView, BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
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

### `new BrowserView([options])` *Đang thử nghiệm*

* `options` Object (không bắt buộc) 
  * `webPreferences` Object (không bắt buộc) - Xem [BrowserWindow](browser-window.md).

### Static Methods

#### `BrowserView.getAllViews()`

Trả về `BrowserView[]` - Một array các BrowserView đã mở.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Trả về `BrowserView ` đang sở hữu `webContents` hoặc trả về `null` nếu webContent không được sở hữu bởi BrowserView.

#### `BrowserView.fromId(id)`

* `id` Số nguyên

Trả về `id` của `BrowserView`.

### Các Thuộc Tính

Object được tạo bằng `new BrowserView` có các thuộc tính sau đây:

#### `view.webContents` *Đang thử nghiệm*

A [`WebContents`](web-contents.md) object owned by this view.

#### `view.id` *Experimental*

A `Integer` representing the unique ID of the view.

### Instance Methods

Objects created with `new BrowserView` have the following instance methods:

#### `view.setAutoResize(options)` *Đang thử nghiệm*

* `options` Object 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` *Đang thử nghiệm*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Đang thử nghiệm*

* `color` Chuỗi - Màu dưới định dạng `#aarrggbb` hoặc `#argb`. Kênh alpha không bắt buộc.