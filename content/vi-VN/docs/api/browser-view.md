## Lớp: BrowserView

> Tạo và điểu khiển View.

**Ghi chú:** BrowserView API đang được thử nghiệm và có thể bị thay đổi hoặc bỏ luôn trong các phiên bản Electron kế tiếp.

Tiến trình: [Main](../glossary.md#main-process)

Một `BrowserView` được dùng để nhúng thêm nội dung web vào một `BrowserWindow`. Nó như một cửa sổ con, ngoại trừ vị trí của nó thì tương đối với cửa sổ sở hữu nó. Có thể xem nó là một sự lựa chọn khác với sử dụng tag `webview`.

## Ví dụ

```javascript
// Trong tiến trình main.
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

### Các phương thức chung

#### `BrowserView.getAllViews()`

Returns `BrowserView[]` - An array of all opened BrowserViews.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserView | null` - The BrowserView that owns the given `webContents` or `null` if the contents are not owned by a BrowserView.

#### `BrowserView.fromId(id)`

* `id` Integer

Returns `BrowserView` - The view with the given `id`.

### Các Thuộc Tính

Objects created with `new BrowserView` have the following properties:

#### `view.webContents` *Experimental*

A [`WebContents`](web-contents.md) object owned by this view.

#### `view.id` *Experimental*

A `Integer` representing the unique ID of the view.

### Các phương thức riêng

Objects created with `new BrowserView` have the following instance methods:

#### `view.setAutoResize(options)` *Experimental*

* `options` Object 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.