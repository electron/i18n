## Kelas: TouchBarLabel

> Buat label di bilah sentuh untuk aplikasi macOS asli

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### `TouchBarLabel baru (pilihan)` _Eksperimental_

* `options` Object
  * `label` String (opsional) - Teks untuk ditampilkan.
  * `textColor` String (opsional) - Hex warna teks, i.e `#ABCDEF`.

### Contoh properti

Properti berikut tersedia pada contoh `TouchBarLabel`:

#### `sentuhBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `sentuhBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
