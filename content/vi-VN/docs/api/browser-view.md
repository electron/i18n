## Lớp: BrowserView

> Tạo và điểu khiển View.

**Ghi chú:** BrowserView API đang được thử nghiệm và có thể bị thay đổi hoặc bỏ luôn trong các phiên bản Electron kế tiếp.

Tiến trình: [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). Nó như một cửa sổ con, ngoại trừ vị trí của nó thì tương đối với cửa sổ sở hữu nó. Có thể xem nó là một sự lựa chọn khác với sử dụng tag `webview`.

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

Trả về `BrowserView[]` - Một array các BrowserView đã mở.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Trả về `BrowserView ` đang sở hữu `webContents` hoặc trả về `null` nếu webContent không được sở hữu bởi BrowserView.

#### `BrowserView.fromId(id)`

* `id` Số nguyên

Trả về `BrowserView` với `id` đã cho.

### Các Thuộc Tính

Object được tạo bằng `new BrowserView` có các thuộc tính sau đây:

#### `view.webContents` *Đang thử nghiệm*

[`WebContents`](web-contents.md) object sở hữu bởi view này.

#### `view.id` *Đang thử nghiệm*

Một `số thực` đại diện cho ID độc nhất của View đó.

### Các phương thức riêng

Object được tạo bằng `new BrowserView` các các phương thức riêng sau đây:

#### `view.destroy()`

Force closing the view, the `unload` and `beforeunload` events won't be emitted for the web page. After you're done with a view, call this function in order to free memory and other resources as soon as possible.

#### `view.isDestroyed()`

Returns `Boolean` - Whether the view is destroyed.

#### `view.setAutoResize(options)` *Đang thử nghiệm*

* `options` Object 
  * `width` Boolean - Nếu `true`, chiều ngang của view sẽ dài ra và ngắn lại theo chiều ngang của cửa sổ. Mặc định là `false`.
  * `height` Boolean - Nếu `true`, chiều dọc của view sẽ dài ra và ngắn lại theo chiều ngang của cửa sổ. Mặc định là `false`.

#### `view.setBounds(bounds)` *Đang thử nghiệm*

* `bounds` [Rectangle](structures/rectangle.md)

Điều chỉnh kích cỡ và di chuyển view.

#### `view.setBackgroundColor(color)` *Đang thử nghiệm*

* `color` Chuỗi - Màu dưới định dạng `#aarrggbb` hoặc `#argb`. Kênh alpha không bắt buộc.