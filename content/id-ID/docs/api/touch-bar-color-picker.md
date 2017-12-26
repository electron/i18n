## Kelas: TouchBarColorPicker

> Buat pemetik warna di bilah sentuh untuk aplikasi macOS asli

Proses: [ Utama](../tutorial/quick-start.md#main-process)

### `new TouchBarColorPicker(options)` *Experimental*

* `pilihan` Obyek 
  * `availableColors` String[] (optional) - Array of hex color strings to appear as possible colors to select.
  * `selectedColor` String (optional) - The selected hex color in the picker, i.e `#ABCDEF`.
  * `perubahan` Fungsi (opsional) - Fungsi untuk memanggil saat warna dipilih. 
    * `color` String - The color that the user selected from the picker

### Instance Properties

The following properties are available on instances of `TouchBarColorPicker`:

#### `sentuhBarColorPicker.availableColors`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `sentuhBarColorPicker.selectedColor`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.