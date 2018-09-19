## Kelas: TouchBarScrubber

> Membuat scrubber (digulir pemilih)

Proses: [utama](../tutorial/quick-start.md#main-process)

### `TouchBarScrubberbaru(pilihan) ` * Eksperimental *

* `pilihan` Benda 
  * `item` [ScrubberItem[] ](structures/scrubber-item.md) - Kumpulan item yang akan ditempatkan di scrubber ini.
  * `memilih` Fungsi - Disebut saat pengguna mengetuk item yang bukan item terakhir yang disadap. 
    * `selectedIndex` Bulat - indeks dari item yang dipilih pengguna.
  * `sorot` Fungsi - disebut ketika pengguna keran item. 
    * `highlightedIndex` Bulat - indeks dari item pengguna menyentuh.
  * `selectedStyle` String - gaya item yang dipilih. Default ke `null`.
  * `overlayStyle` String - gaya item dipilih overlay. Default ke `null`.
  * `showArrowButtons` Aljabar Boolean - default ke `false`.
  * `modus` String - default untuk `gratis`.
  * `terus-menerus` Aljabar Boolean - default ke `true`.

### Properti Instance

Properti berikut tersedia pada contoh-contoh dari `TouchBarScrubber`:

#### `touchBarScrubber.items`

`[ScrubberItem]` array yang mewakili item dalam scrubber ini. Segera memperbarui nilai ini update kontrol di bar sentuhan. Memperbarui sifat-sifat yang mendalam dalam array ini **tidak memperbarui bar sentuhan**.

#### `touchBarScrubber.selectedStyle`

A `String` representing the style that selected items in the scrubber should have. Updating this value immediately updates the control in the touch bar. Possible values:

* `latar belakang` - Maps untuk `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `latar belakang` - Maps untuk `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `null` - sebenarnya null, bukan string, menghilangkan semua gaya.

#### `touchBarScrubber.overlayStyle`

A ` String </ 0> mewakili gaya yang dipilih item dalam scrubber seharusnya. Gaya ini overlayed di atas item scrubber bukan ditempatkan di balik itu. Segera memperbarui nilai ini update kontrol di bar sentuhan. Nilai yang mungkin:</p>

<ul>
<li><code>latar belakang` - Maps untuk `[NSScrubberSelectionStyle roundedBackgroundStyle]`.</li> 

* `latar belakang` - Maps untuk `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `null` - sebenarnya null, bukan string, menghilangkan semua gaya.</ul> 

#### `sentuhBarScrubber.showArrowButtons`

A ` Boolean </ 0> mewakili apakah akan menampilkan panah pilihan kiri / kanan di scrubber ini. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh.</p>

<h4><code>sentuhBarScrubber.mode`</h4> 

A ` String </ 0> mewakili mode scrubber ini. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh. Nilai yang mungkin:</p>

<ul>
<li><code>tetap` - peta ke `NSScrubberModeFixed`.</li> 

* `gratis` - peta ke `NSScrubberModeFree`.</ul> 

#### `sentuhBarScrubber.kontinu`

A  Boolean </ 0> mewakili apakah scrubber ini kontinyu atau tidak. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh.</p>