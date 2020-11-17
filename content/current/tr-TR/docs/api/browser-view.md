## Sınıf: BrowserView

> Görünüm yaratın ve kontrol edin.

İşlem: [Ana](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). Çocuk pencere gibidir ama sahibi pencereye göre göreceli konumlandırılır. `webview` etiketine bir alternatif olarak düşünülebilir.

### Örnek

```javascript
// Ana süreçte.
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

### Örnek özellikleri

`new BrowserView` şeklinde yaratılan objeler, aşağıdaki özelliklere sahiptir:

#### `view.webContents` _Deneysel_

Bu view tarafından sahip olunan bir [`WebContents`](web-contents.md).

### Örnek yöntemleri

`new BrowserView` ile yaratılan objeler aşağıdaki metodlara sahiptir:

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
