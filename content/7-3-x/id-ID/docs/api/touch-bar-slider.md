## Kelas: TouchBarSlider

> Membuat slider di bar sentuhan untuk aplikasi asli macOS

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### `baru TouchBarSlider(options)` _Experimental_

* `options` Object
  * `label` String (opsional) - Label teks.
  * `nilai` Bulat (opsional) - nilai dipilih.
  * `nilai` Bulat (opsional) - nilai dipilih.
  * `maxValue` Bulat (opsional) - nilai maksimum.
  * `change` Function (optional) - Function to call when the slider is changed.
    * `newValue` Nomor - nilai yang dipilih pengguna pada Panel geser Slider.

### Contoh properti

Properti berikut tersedia pada contoh-contoh dari `TouchBarSlider`:

#### `touchBarSlider.label`

A `String` representing the slider's current text. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.value`

A `Number` representing the slider's current value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.minValue`

A `Number` representing the slider's current minimum value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.maxValue`

A `Number` representing the slider's current maximum value. Changing this value immediately updates the slider in the touch bar.
