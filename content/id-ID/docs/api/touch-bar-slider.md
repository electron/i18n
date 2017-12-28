## Kelas: TouchBarSpacer

> Buat label di bilah sentuh untuk aplikasi macOS asli

Proses: [ Utama](../tutorial/quick-start.md#main-process)

### `TouchBarScrubberbaru(pilihan) ` * Eksperimental *

* `options` Benda 
  * `label` String (opsional) - Teks tombol.
  * `nilai` Bulat (opsional) - nilai dipilih.
  * `nilai` Bulat (opsional) - nilai dipilih.
  * `nilai` Bulat (opsional) - nilai dipilih.
  * `perubahan` Fungsi (opsional) - Fungsi untuk memanggil saat slider diganti. 
    * `newValue` Number - The value that the user selected on the Slider

### Instance Properties

The following properties are available on instances of `TouchBarSlider`:

#### `touchBarSlider.label`

A `String` representing the slider's current text. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.value`

A `Number` representing the slider's current value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.minValue`

A `Number` representing the slider's current minimum value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.maxValue`

A `Number` representing the slider's current maximum value. Changing this value immediately updates the slider in the touch bar.