## Kelas: TouchBarColorPicker

> Buat pemetik warna di bilah sentuh untuk aplikasi macOS asli

Proses: [utama](../tutorial/quick-start.md#main-process)

### `TouchBarColorPicker baru (pilihan)`*Eksperimental*

* `pilihan` Benda 
  * `tersediaWarna`String[](opsional) - Array string warna hex ke muncul sebagai warna yang mungkin dipilih.
  * `selectedColor` String (opsional) - Warna hex yang dipilih di pemetik, i.e`#ABCDEF`.
  * `perubahan` Fungsi (opsional) - Fungsi untuk memanggil saat warna dipilih. 
    * `color` String - The color that the user selected from the picker.

### Contoh properti

Properti berikut tersedia pada contoh `TouchBarColorPicker`:

#### `sentuhBarColorPicker.availableColors`

Array`String[]` yang mewakili warna pemetik warna yang tersedia untuk dipilih. Segera ganti nilai ini perbarui pemetik warna di bilah sentuh.

#### `sentuhBarColorPicker.selectedColor`

A `String` kode hex yang mewakili warna pemetik warna yang dipilih saat ini. Segera ganti nilai ini perbarui pemetik warna di bilah sentuh.