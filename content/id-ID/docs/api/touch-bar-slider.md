## Kelas: TouchBarSlider

> Buat slider di panel sentuh untuk aplikasi macOS asli

Proses: [ Utama](../tutorial/quick-start.md#main-process)

### `new TouchBarSlider(options)` *Experimental*

* `pilihan` Obyek 
  * `label` String (optional) - Label text.
  * `value` Integer (optional) - Selected value.
  * `minValue` Integer (optional) - Minimum value.
  * `maxValue` Integer (optional) - Maximum value.
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