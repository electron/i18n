## Kelas: TouchBarColorPicker

> Buat pemetik warna di bilah sentuh untuk aplikasi macOS asli

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### `TouchBarColorPicker baru (pilihan)`_Eksperimental_

* `options` Object
  * `tersediaWarna`String[](opsional) - Array string warna hex ke muncul sebagai warna yang mungkin dipilih.
  * `selectedColor` String (opsional) - Warna hex yang dipilih di pemetik, i.e`#ABCDEF`.
  * `change` Function (optional) - Function to call when a color is selected.
    * `warna` String - Warna yang dipilih pengguna dari pemetik.

### Contoh properti

Properti berikut tersedia pada contoh `TouchBarColorPicker`:

#### `sentuhBarColorPicker.availableColors`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `sentuhBarColorPicker.selectedColor`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.
