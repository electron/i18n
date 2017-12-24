## Sınıf: BrowserView

> Görünüm yaratın ve kontrol edin.

**Not:** BrowserView API şu an deneyseldir ve ileriki Electron sürümlerinde değişebilir veya silinebilir.

Süreç: [Ana](../glossary.md#main-process)

`BrowserView`, `BrowserWindow`'a ek ağ içeriği gömmek için kullanılır. It is like a child window, except that it is positioned relative to its owning window. `webview` etiketine bir alternatif olarak düşünülebilir.

## Örnek

```javascript
// Ana süreçte.
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
view.webContents.loadURL('https://electron.atom.io')
```

### `new BrowserView([options])` *Deneysel*

* `options` Obje (opsiyonel) 
  * `webPreferences` Obje (opsiyonel) - [BrowserWindow](browser-window.md)'a bakın.

### Statik Metodlar

#### `BrowserView.fromId(id)`

* `id` Tamsayı

`BrowserView` döner - `id` ile birlikte girilen view.

### Örnek Özellikleri

`new BrowserView` şeklinde yaratılan objeler, aşağıdaki özelliklere sahiptir:

#### `view.webContents` *Deneysel*

Bu view tarafından sahip olunan bir [`WebContents`](web-contents.md).

#### `view.id` *Deneysel*

View'in eşsiz ID'sini temsil eden bir `Tamsayı`.

### Sınıf örneği metodları

`new BrowserView` ile yaratılan objeler aşağıdaki metodlara sahiptir:

#### `view.setAutoResize(options)` *Deneysel*

* `options` Obje 
  * `width` Boolean - `true` ise, view'in uzunluğu pencere ile birlikte büyür ve küçülür. Varsayılan değeri `false`.
  * `height` Boolean - `true` ise, view'in yüksekliği pencere ile birlikte büyür ve küçülür. Varsayılan değeri `false`.

#### `view.setBounds(bounds)` *Deneysel*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.