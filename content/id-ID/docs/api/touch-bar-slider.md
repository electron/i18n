## Kelas: TouchBarSlider

> Membuat slider di bar sentuhan untuk aplikasi asli macOS

Proses: [utama](../tutorial/quick-start.md#main-process)

### `baru TouchBarSlider(options)` *Experimental*

* `pilihan` Obyek 
  * `label` String (opsional) - Label teks.
  * `nilai` Bulat (opsional) - nilai dipilih.
  * `nilai` Bulat (opsional) - nilai dipilih.
  * `maxValue` Bulat (opsional) - nilai maksimum.
  * `perubahan` Fungsi (opsional) - fungsi untuk panggilan ketika slider berubah. 
    * `newValue` Number - The value that the user selected on the Slider.

### Contoh properti

Properti berikut tersedia pada contoh-contoh dari `TouchBarSlider`:

#### `touchBarSlider.label`

`String` mewakili slider's teks saat ini. Mengubah nilai ini segera update slider di bar sentuhan.

#### `touchBarSlider.value`

`Nomor` mewakili slider's nilai saat ini. Mengubah nilai ini segera update slider di bar sentuhan.

#### `touchBarSlider.minValue`

`Nomor` mewakili slider's nilai minimal saat ini. Mengubah nilai ini segera update slider di bar sentuhan.

#### `touchBarSlider.maxValue`

`Nomor` mewakili slider's nilai maksimum saat ini. Mengubah nilai ini segera update slider di bar sentuhan.