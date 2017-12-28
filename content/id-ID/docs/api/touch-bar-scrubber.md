## Kelas: TouchBarScrubber

> Buat scrubber (pemilih yang dapat digulir)

Proses: [ Utama](../tutorial/quick-start.md#main-process)

### `TouchBarScrubberbaru(pilihan) ` * Eksperimental *

* `pilihan` Obyek 
  * `item` [ScrubberItem[] ](structures/scrubber-item.md) - Kumpulan item yang akan ditempatkan di scrubber ini
  * `select` Fungsi - Disebut saat pengguna mengetuk item yang bukan item terakhir yang disadap 
    * `selectedIndex` Integer - The index of the item the user selected
  * `highlight` Fungsi - Disebut saat pengguna mengetuk item apapun 
    * `highlightedIndex` Integer - The index of the item the user touched
  * `selectedStyle` String - Selected item style. Defaults to `null`.
  * `overlayStyle`String - Gaya item overlay yang dipilih. Default ke`null`.
  * `showArrowButtons` Boolean - Defaults to `false`.
  * `mode` String - Defaults to `free`.
  * `continuous` Boolean - Defaults to `true`.

### Instance Properties

Properti berikut tersedia pada contoh ` TouchBarScrubber </ 0> :</p>

<h4><code>touchBarScrubber.items`</h4> 

A `ScrubberItem[]` array representing the items in this scrubber. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh. Memperbarui properti dalam di dalam array ini ** tidak memperbarui batang sentuh </ 0> .</p> 

#### `touchBarScrubber.selectedStyle`

A ` String </ 0> mewakili gaya yang dipilih item dalam scrubber seharusnya. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh. Nilai yang mungkin:</p>

<ul>
<li><code>background` - Maps ke `[NSScrubberSelectionStyle roundedBackgroundStyle]`</li> 

* `garis besar` - Maps ke `[NSScrubberSelectionStyle outlineOverlayStyle]`
* `null` - Actually null, not a string, removes all styles</ul> 

#### `touchBarScrubber.overlayStyle`

A ` String </ 0> mewakili gaya yang dipilih item dalam scrubber seharusnya. Gaya ini dilapisi di atas item scrubber dan bukan ditempatkan di belakangnya. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh.  Nilai yang mungkin:</p>

<ul>
<li><code>background` - Maps ke `[NSScrubberSelectionStyle roundedBackgroundStyle]`</li> 

* `garis besar` - Maps ke `[NSScrubberSelectionStyle outlineOverlayStyle]`
* `null` - Actually null, not a string, removes all styles</ul> 

#### `touchBarScrubber.showArrowButtons`

A ` Boolean </ 0> mewakili apakah akan menampilkan panah pilihan kiri / kanan di scrubber ini. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh.</p>

<h4><code>touchBarScrubber.mode`</h4> 

A ` String </ 0> mewakili mode scrubber ini. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh. Nilai yang mungkin:</p>

<ul>
<li><code>fixed` - Maps to `NSScrubberModeFixed`</li> 

* `free` - Maps to `NSScrubberModeFree`</ul> 

#### `touchBarScrubber.continuous`

A  Boolean </ 0> mewakili apakah scrubber ini kontinyu atau tidak. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh.</p>