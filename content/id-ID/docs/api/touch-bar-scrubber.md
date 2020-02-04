## Kelas: TouchBarScrubber

> Membuat scrubber (digulir pemilih)

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### `TouchBarScrubberbaru(pilihan) ` * Eksperimental *

* `pilihan` Benda 
  * `item` [ScrubberItem[] ](structures/scrubber-item.md) - Kumpulan item yang akan ditempatkan di scrubber ini.
  * `memilih` Function (optional) - Called when the user taps an item that was not the last tapped item. 
    * `selectedIndex` Bulat - indeks dari item yang dipilih pengguna.
  * `sorot` Function (optional) - Called when the user taps any item. 
    * `highlightedIndex` Bulat - indeks dari item pengguna menyentuh.
  * `selectedStyle` String (optional) - Selected item style. Can be `background`, `outline` or `none`. Defaults to `none`.
  * `overlayStyle` String (optional) - Selected overlay item style. Can be `background`, `outline` or `none`. Defaults to `none`.
  * `showArrowButtons` Boolean (optional) - Defaults to `false`.
  * `mode` String (optional) - Can be `fixed` or `free`. The default is `free`.
  * `continuous` Boolean (optional) - Defaults to `true`.

### Instance Properties

Properti berikut tersedia pada contoh-contoh dari `TouchBarScrubber`:

#### `touchBarScrubber.items`

`[ScrubberItem]` array yang mewakili item dalam scrubber ini. Segera memperbarui nilai ini update kontrol di bar sentuhan. Memperbarui sifat-sifat yang mendalam dalam array ini **tidak memperbarui bar sentuhan**.

#### `touchBarScrubber.selectedStyle`

A `String` representing the style that selected items in the scrubber should have. Updating this value immediately updates the control in the touch bar. Possible values:

* `latar belakang` - Maps untuk `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `latar belakang` - Maps untuk `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `none` - Removes all styles.

#### `touchBarScrubber.overlayStyle`

A ` String </ 0> mewakili gaya yang dipilih item dalam scrubber seharusnya. Gaya ini overlayed di atas item scrubber bukan ditempatkan di balik itu. Segera memperbarui nilai ini update kontrol di bar sentuhan. Nilai yang mungkin:</p>

<ul>
<li><code>latar belakang` - Maps untuk `[NSScrubberSelectionStyle roundedBackgroundStyle]`.</li> 

* `latar belakang` - Maps untuk `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `none` - Removes all styles.</ul> 

#### `sentuhBarScrubber.showArrowButtons`

A ` Boolean </ 0> mewakili apakah akan menampilkan panah pilihan kiri / kanan di scrubber ini. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh.</p>

<h4><code>sentuhBarScrubber.mode`</h4> 

A ` String </ 0> mewakili mode scrubber ini. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh. Nilai yang mungkin:</p>

<ul>
<li><code>tetap` - peta ke `NSScrubberModeFixed`.</li> 

* `gratis` - peta ke `NSScrubberModeFree`.</ul> 

#### `sentuhBarScrubber.kontinu`

A  Boolean </ 0> mewakili apakah scrubber ini kontinyu atau tidak. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh.</p>