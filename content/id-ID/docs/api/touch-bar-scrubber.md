## Kelas: TouchBarScrubber

> Membuat scrubber (digulir pemilih)

Proses: [utama](../tutorial/quick-start.md#main-process)

### `TouchBarScrubberbaru(pilihan) ` * Eksperimental *

* `pilihan` Benda 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - An array of items to place in this scrubber.
  * `memilih` Function - Called when the user taps an item that was not the last tapped item. 
    * `selectedIndex` Integer - The index of the item the user selected.
  * `sorot` Function - Called when the user taps any item. 
    * `highlightedIndex` Integer - The index of the item the user touched.
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

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actually null, not a string, removes all styles.

#### `touchBarScrubber.overlayStyle`

A ` String </ 0> mewakili gaya yang dipilih item dalam scrubber seharusnya. Gaya ini overlayed di atas item scrubber bukan ditempatkan di balik itu. Segera memperbarui nilai ini update kontrol di bar sentuhan. Nilai yang mungkin:</p>

<ul>
<li><code>background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`.</li> 

* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actually null, not a string, removes all styles.</ul> 

#### `sentuhBarScrubber.showArrowButtons`

A ` Boolean </ 0> mewakili apakah akan menampilkan panah pilihan kiri / kanan di scrubber ini. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh.</p>

<h4><code>sentuhBarScrubber.mode`</h4> 

A ` String </ 0> mewakili mode scrubber ini. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh. Nilai yang mungkin:</p>

<ul>
<li><code>fixed` - Maps to `NSScrubberModeFixed`.</li> 

* `free` - Maps to `NSScrubberModeFree`.</ul> 

#### `sentuhBarScrubber.kontinu`

A  Boolean </ 0> mewakili apakah scrubber ini kontinyu atau tidak. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh.</p>