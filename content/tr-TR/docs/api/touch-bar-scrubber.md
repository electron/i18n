## Sınıf: TouchBarKaydırıcı

> Bir kaydırıcı oluşturma (Kaydırılabilir seçici)

Süreç: [Ana](../tutorial/quick-start.md#main-process)

### `yeni DokunmatikYüzeyKaydırıcı(seçenekler)` *Deneysel*

* `seçenekler` Nesne 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Bu kaydırıcıya yerleştirilecek bir dizi madde
  * `seç` Fonksiyon - Kullanıcı, son tıklanan öğe olmayan bir öğeyi tıklattığında çağrılır 
    * `selectedIndex` Integer - Kullanıcının seçtiği öğenin dizini
  * `vurgulamak` Fonksiyon - Kullanıcı herhangi bir öğeyi tıklattığında çağrılır 
    * `highlightedIndex` Integer - Kullanıcının dokunduğu maddenin endeksi
  * `selectedStyle` String - Seçilen öğe stili. Varsayılan değer: `null`.
  * `overlayStyle` String - Seçili yer paylaşım öğesi stili. Varsayılan değer: `null`.
  * `showArrowButtons` Boolean - Varsayılan değer `false`.
  * `mode` String - Varsayılan değer `free`.
  * `continuous` Boolean - Varsayılan değer `true`.

### Örnek özellikleri

The following properties are available on instances of `TouchBarScrubber`:

#### `touchBarScrubber.items`

A `ScrubberItem[]` array representing the items in this scrubber. Updating this value immediately updates the control in the touch bar. Updating deep properties inside this array **does not update the touch bar**.

#### `touchBarScrubber.selectedStyle`

A `String` representing the style that selected items in the scrubber should have. Updating this value immediately updates the control in the touch bar. Possible values:

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`
* `null` - Actually null, not a string, removes all styles

#### `touchBarScrubber.overlayStyle`

A `String` representing the style that selected items in the scrubber should have. This style is overlayed on top of the scrubber item instead of being placed behind it. Updating this value immediately updates the control in the touch bar. Olası değerler:

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`
* `null` - Actually null, not a string, removes all styles

#### `touchBarScrubber.showArrowButtons`

A `Boolean` representing whether to show the left / right selection arrows in this scrubber. Updating this value immediately updates the control in the touch bar.

#### `touchBarScrubber.mode`

A `String` representing the mode of this scrubber. Updating this value immediately updates the control in the touch bar. Possible values:

* `fixed` - Maps to `NSScrubberModeFixed`
* `free` - Maps to `NSScrubberModeFree`

#### `touchBarScrubber.continuous`

`Boolean` bu scrubber'ın sürekli olup olmadığını gösterir. Bu değeri güncellemek dokunmatik çubuktaki kontrolü hemen günceller.