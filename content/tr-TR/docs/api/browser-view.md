## Sınıf: BrowserView

> Görünüm yaratın ve kontrol edin.

**Not:** BrowserView API şu an deneyseldir ve ileriki Electron sürümlerinde değişebilir veya silinebilir.

İşlem: [Ana](../glossary.md#main-process)

`BrowserView`, `BrowserWindow`'a ek ağ içeriği gömmek için kullanılır. Çocuk pencere gibidir ama sahibi pencereye göre göreceli konumlandırılır. `webview` etiketine bir alternatif olarak düşünülebilir.

## Örnek

```javascript
// Ana işlem içinde.
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

### `new BrowserView([options])` *Deneysel*

* `seçenekler` Nesne (isteğe bağlı) 
  * `webPreferences` Obje (opsiyonel) - [BrowserWindow](browser-window.md)'a bakın.

### Statik Yöntemler

#### `BrowserView.getAllViews()`

Returns `BrowserView[]` - An array of all opened BrowserViews.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [webİçerikleri](web-contents.md)

Returns `BrowserView | null` - The BrowserView that owns the given `webContents` or `null` if the contents are not owned by a BrowserView.

#### `BrowserView.fromId(id)`

* `id` tamsayı

Returns `BrowserView` - The view with the given `id`.

### Örnek özellikleri

Objects created with `new BrowserView` have the following properties:

#### `view.webContents` *Experimental*

A [`WebContents`](web-contents.md) object owned by this view.

#### `view.id` *Experimental*

A `Integer` representing the unique ID of the view.

### Örnek yöntemler

Objects created with `new BrowserView` have the following instance methods:

#### `view.setAutoResize(options)` *Experimental*

* `seçenekler` Nesne 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.