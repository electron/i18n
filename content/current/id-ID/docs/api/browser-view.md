## Kelas: lihat browser

> Buat dan kontrol tampilan.

Proses: [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). Ini seperti jendela anak, kecuali yang diposisikan relatif terhadap jendela miliknya. Hal ini dimaksudkan untuk menjadi alternatif tag `lihat web`.

### Contoh

```javascript
// Pada proses utama.
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `baru lihat browser([options])` _Eksperimental_

* `options` Object (optional)
  * `refrensi web` Objek (contoh) - Lihat [jendela Browser](browser-window.md).

### Instance Properties

Objek yang dibuat dengan `lihat Browser baru` memiliki properti berikut:

#### `baru lihat browser` _Eksperimental_

Sebuah [`isi Web`](web-contents.md) objek yang dimiliki oleh pandangan ini.

### Методы экземпляра

Objek yang dibuat dengan `lihat Browser baru` memiliki metode contoh berikut:

#### `lihat.set otomatis ubah ukuran (pilihan)` _Eksperimental_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.

#### `lihat.set batas (batas)` _Eksperimental_

* `batas` [Empat persegi panjang](structures/rectangle.md)

Mengubah ukuran dan memindahkan pandangan ke batas yang tersedia relatif terhadap jendela.

#### `view.getBounds()` _Experimental_

Kembali [`Rectangle`](structures/rectangle.md)

The `bounds` of this BrowserView instance as `Object`.

#### `lihat.set latar belakang warna(warna)` _Eksperimental_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
