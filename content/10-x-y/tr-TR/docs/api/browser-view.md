## Sınıf: BrowserView

> Görünüm yaratın ve kontrol edin.

Süreç: [Ana](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). Çocuk pencere gibidir ama sahibi pencereye göre göreceli konumlandırılır. `webview` etiketine bir alternatif olarak düşünülebilir.

### Örnek

```javascript
// Ana işlem içinde.
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _Deneysel_

* `options` Object (optional)
  * `webPreferences` Obje (opsiyonel) - [BrowserWindow](browser-window.md)'a bakın.

### Statik Metodlar

#### `BrowserView.getAllViews()`

`BrowserView[]` - açılan tüm BrowserViews dizisinin değerini gönderir.

#### `BrowserWiew.fromWebContents(webContents)`

* `webContents` [webİçerikleri](web-contents.md)

Dönüt `BrowserView | null`-BrowserView içeriği tarafından bir BrowserView ait sahip olmayan, verilen `webContents` veya `null` sahip.

#### `BrowserView.fromId(id)`

* `id` tamsayı

`BrowserView` döner - `id` ile birlikte girilen view.

### Örnek özellikleri

`new BrowserView` şeklinde yaratılan objeler, aşağıdaki özelliklere sahiptir:

#### `view.webContents` _Deneysel_

Bu view tarafından sahip olunan bir [`WebContents`](web-contents.md).

#### `view.id` _Deneysel_

View'in eşsiz ID'sini temsil eden bir `Tamsayı`.

### Örnek yöntemleri

`new BrowserView` ile yaratılan objeler aşağıdaki metodlara sahiptir:

#### `view.destroy()`

Force closing the view, the `unload` and `beforeunload` events won't be emitted for the web page. After you're done with a view, call this function in order to free memory and other resources as soon as possible.

#### `view.isDestroyed()`

`Boolean` Döndürür - Görünümün yok olup olmadığını.

#### `view.setAutoResize(options)` _Deneysel_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.

#### `view.setBounds(bounds)` _Deneysel_

* `bounds` [Dikdörtgen](structures/rectangle.md)

Verilen sınırlarla görünümü göreceli olarak yeniden şekillendirir ve taşır.

#### `view.getBounds()` _Experimental_

[`Rectangle`](structures/rectangle.md) döndürür

The `bounds` of this BrowserView instance as `Object`.

#### `view.setBackgroundColor(color)` _Deneysel_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
