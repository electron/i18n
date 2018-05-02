## Sınıf: BrowserView

> Görünüm yaratın ve kontrol edin.

**Not:** BrowserView API şu an deneyseldir ve ileriki Electron sürümlerinde değişebilir veya silinebilir.

İşlem: [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). Çocuk pencere gibidir ama sahibi pencereye göre göreceli konumlandırılır. `webview` etiketine bir alternatif olarak düşünülebilir.

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

`BrowserView[]` - açılan tüm BrowserViews dizisinin değerini gönderir.

#### `BrowserWiew.fromWebContents(webContents)`

* `webContents` [webİçerikleri](web-contents.md)

Dönüt `BrowserView | null`-BrowserView içeriği tarafından bir BrowserView ait sahip olmayan, verilen `webContents` veya `null` sahip.

#### `BrowserView.fromId(id)`

* `id` tamsayı

`BrowserView` döner - `id` ile birlikte girilen view.

### Örnek özellikleri

`new BrowserView` şeklinde yaratılan objeler, aşağıdaki özelliklere sahiptir:

#### `view.webContents` *Deneysel*

Bu view tarafından sahip olunan bir [`WebContents`](web-contents.md).

#### `view.id` *Deneysel*

View'in eşsiz ID'sini temsil eden bir `Tamsayı`.

### Örnek yöntemler

`new BrowserView` ile yaratılan objeler aşağıdaki metodlara sahiptir:

#### `view.destroy()`

Force closing the view, the `unload` and `beforeunload` events won't be emitted for the web page. After you're done with a view, call this function in order to free memory and other resources as soon as possible.

#### `view.isDestroyed()`

`Boolean` Döndürür - Görünümün yok olup olmadığını.

#### `view.setAutoResize(options)` *Deneysel*

* `seçenekler` Nesne 
  * `width` Boolean - `true` ise, view'in uzunluğu pencere ile birlikte büyür ve küçülür. Varsayılan değeri `false`.
  * `height` Boolean - `true` ise, view'in yüksekliği pencere ile birlikte büyür ve küçülür. Varsayılan değeri `false`.

#### `view.setBounds(bounds)` *Deneysel*

* `bounds` [Dikdörtgen](structures/rectangle.md)

Verilen sınırlarla görünümü göreceli olarak yeniden şekillendirir ve taşır.

#### `view.setBackgroundColor(color)` *Deneysel*

* `color` Katar - `#aarrggbb` ya da `#argb` formunda renk kodu. Alfa kanalı opsiyonel.