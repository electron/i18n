## Kelas: TouchBarLabel

> Buat label di bilah sentuh untuk aplikasi macOS asli

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### `TouchBarLabel baru (pilihan)` *Eksperimental*

* `pilihan` Benda 
  * `label` String (opsional) - Teks untuk ditampilkan.
  * `textColor` String (opsional) - Hex warna teks, i.e `#ABCDEF`.

### Contoh properti

Properti berikut tersedia pada contoh `TouchBarLabel`:

#### `sentuhBarLabel.label`

A `String` yang mewakili teks label saat ini. Mengubah nilai ini segera memperbarui label panel sentuh.

#### `sentuhBarLabel.textColor`

Kode `String` hex yang mewakili warna teks label saat ini. Mengubah nilai ini segera update label di bilah sentuh.