## Kelas: TouchBarScrubber

> Membuat scrubber (digulir pemilih)

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### `TouchBarScrubberbaru(pilihan) ` _ Eksperimental _

* `options` Object
  * `item` [ScrubberItem[] ](structures/scrubber-item.md) - Kumpulan item yang akan ditempatkan di scrubber ini.
  * `select` Function (optional) - Called when the user taps an item that was not the last tapped item.
    * `selectedIndex` Bulat - indeks dari item yang dipilih pengguna.
  * `highlight` Function (optional) - Called when the user taps any item.
    * `highlightedIndex` Bulat - indeks dari item pengguna menyentuh.
  * `selectedStyle` String (optional) - Selected item style. Can be `background`, `outline` or `none`. Defaults to `none`.
  * `overlayStyle` String (optional) - Selected overlay item style. Can be `background`, `outline` or `none`. Defaults to `none`.
  * `showArrowButtons` Boolean (optional) - Defaults to `false`.
  * `mode` String (optional) - Can be `fixed` or `free`. The default is `free`.
  * `continuous` Boolean (optional) - Defaults to `true`.

### Contoh properti

Properti berikut tersedia pada contoh-contoh dari `TouchBarScrubber`:

#### `touchBarScrubber.items`

`[ScrubberItem]` array yang mewakili item dalam scrubber ini. Segera memperbarui nilai ini update kontrol di bar sentuhan. Memperbarui sifat-sifat yang mendalam dalam array ini **tidak memperbarui bar sentuhan**.

#### `touchBarScrubber.selectedStyle`

A ` String </ 0> mewakili gaya yang dipilih item dalam scrubber seharusnya. Segera memperbarui nilai ini update kontrol di bar sentuhan. Nilai yang mungkin:</p>

<ul>
<li><code>latar belakang` - Maps untuk `[NSScrubberSelectionStyle roundedBackgroundStyle]`.</li>
* `latar belakang` - Maps untuk `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `none` - Removes all styles.</ul>

#### `touchBarScrubber.overlayStyle`

A ` String </ 0> mewakili gaya yang dipilih item dalam scrubber seharusnya. Gaya ini overlayed di atas item scrubber bukan ditempatkan di balik itu. Segera memperbarui nilai ini update kontrol di bar sentuhan. Nilai yang mungkin:</p>

<ul>
<li><code>latar belakang` - Maps untuk `[NSScrubberSelectionStyle roundedBackgroundStyle]`.</li>
* `latar belakang` - Maps untuk `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `none` - Removes all styles.</ul>

#### `sentuhBarScrubber.showArrowButtons`

A `Boolean` representing whether to show the left / right selection arrows in this scrubber. Updating this value immediately updates the control in the touch bar.

#### `sentuhBarScrubber.mode`

A `String` representing the mode of this scrubber. Segera memperbarui nilai ini update kontrol di bar sentuhan. Nilai yang mungkin:

* `tetap` - peta ke `NSScrubberModeFixed`.
* `gratis` - peta ke `NSScrubberModeFree`.

#### `sentuhBarScrubber.kontinu`

A `Boolean` representing whether this scrubber is continuous or not. Segera memperbarui nilai ini update kontrol di bar sentuhan.
