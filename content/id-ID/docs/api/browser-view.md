## Kelas: lihat browser

> Buat dan kontrol tampilan.

**Catatan:** lihat browser API masih bersifat eksperimental dan mungkin mengubah atau dihapus elektron pada masa depan.

Process: [Main](../glossary.md#main-process)

A `lihat browser` dapat digunakan untuk menyematkan konten web tambahan ke `jendela Browse`. Ini seperti jendela anak, kecuali yang diposisikan relatif terhadap jendela miliknya. Hal ini dimaksudkan untuk menjadi alternatif tag `lihat web`.

## Contoh

```javascript
// In the main process.
const {BrowserView, BrowserWindow} = require('elektron') nyalakan = baru BrowserWindow ({width: 800, height: 600}) win.on('tertutup', () => {mut = null}) = BrowserView baru ({webPreferences: {nodeIntegration: false}}) win.setBrowserView (view) view.setBounds ({x: 0, y: 0, lebar: tinggi 300,: 300 }) view.webContents.loadURL('https://electron.atom.io')
```

### `baru lihat browser([options])` *Eksperimental*

* `pilihan` Objek (pilihan) 
  * `refrensi web` Objek (contoh) - Lihat [jendela Browser](browser-window.md).

### Metode Statis

#### `Lihat Browser.fromId(id)`

* `id` Bilangan bulat

Kembali `lihat Browser` - Tampilan dengan `id` yang diberikan.

### Contoh properti

Objek yang dibuat dengan `lihat Browser baru` memiliki properti berikut:

#### `baru lihat browser` *Eksperimental*

Sebuah [`isi Web`](web-contents.md) objek yang dimiliki oleh pandangan ini.

#### `lihat.id` *Eksperimental*

A `bilangan bulat` mewakili ID unik dari tampilan.

### Metode Contoh

Objek yang dibuat dengan `lihat Browser baru` memiliki metode contoh berikut:

#### `lihat.set otomatis ubah ukuran (pilihan)` *Eksperimental*

* `pilihan` Objek 
  * `lebar` Boolean - Jika `benar`, lebar tampilan akan tumbuh dan menyusut bersamaan dengan jendela. `false` secara default.
  * `tinggi` Boolean - Jika `benar `, tinggi tampilan akan tumbuh dan menyusut bersamaan dengan jendela. `salah` secara default.

#### `lihat.set batas (batas)` *Eksperimental*

* `batas` [Empat persegi panjang](structures/rectangle.md)

Mengubah ukuran dan memindahkan pandangan ke batas yang tersedia relatif terhadap jendela.

#### `lihat.set latar belakang warna(warna)` *Eksperimental*

* `warna` tali - Warna dalam `#aarrggbb` atau `#argb`. Saluran alfa bersifat opsional.