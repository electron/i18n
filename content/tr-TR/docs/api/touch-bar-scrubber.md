## Sınıf: TouchBarKaydırıcı

> Bir kaydırıcı oluşturma (Kaydırılabilir seçici)

İşlem: [Main](../tutorial/quick-start.md#main-process)

### `yeni DokunmatikYüzeyKaydırıcı(seçenekler)` *Deneysel*

* `seçenekler` Nesnesi 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - An array of items to place in this scrubber.
  * `seç` Function - Called when the user taps an item that was not the last tapped item. 
    * `selectedIndex` Integer - The index of the item the user selected.
  * `vurgulamak` Function - Called when the user taps any item. 
    * `highlightedIndex` Integer - The index of the item the user touched.
  * `selectedStyle` String - Seçilen öğe stili. Varsayılan değer: `null`.
  * `overlayStyle` String - Seçili yer paylaşım öğesi stili. Varsayılan değer: `null`.
  * `showArrowButtons` Boolean - Varsayılan değer `false`.
  * `mode` String - Varsayılan değer `free`.
  * `continuous` Boolean - Varsayılan değer `true`.

### Örnek Özellikler

Aşağıdaki özelliklere, `TouchBarScrubber` örnekleri üzerinde erişilebilir:

#### `touchBarScrubber.items`

Bir `ScrubberItem[]` array bu kaydırıcıdaki öğeleri temsil eder. Bu değeri değiştirmek dokunmatik bardaki denetimi hemen güncelleştirir. **does not update the touch bar** bu dizideki derin özellikleri güncelleştirir.

#### `touchBarScrubber.selectedStyle`

A `String` representing the style that selected items in the scrubber should have. Updating this value immediately updates the control in the touch bar. Possible values:

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actually null, not a string, removes all styles.

#### `touchBarScrubber.overlayStyle`

Sepet içindeki seçili öğelerin stilini temsil eden bir `String` olmalıdır. Bu stil, arkasına yerleştirilmek yerine kaydırıcı maddenin üzerine eklenir. Bu değeri güncellemek dokunmatik bardaki kontrolü hemen günceller. Olası değerler:

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actually null, not a string, removes all styles.

#### `touchBarScrubber.showArrowButtons`

Bu tarayıcıda sol / sağ seçim oklarının gösterilip gösterilmeyeceğini gösteren bir `Boolean`. Bu değeri güncellemek dokunmatik bardaki kontrolü hemen günceller.

#### `touchBarScrubber.mode`

Bu kaydırıcı modunu temsil eden bir `String`. Bu değeri hemen güncelleme dokunmatik bardaki kontrolü günceller. Olası değerler:

* `fixed` - Maps to `NSScrubberModeFixed`.
* `free` - Maps to `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

`Boolean` bu scrubber'ın sürekli olup olmadığını gösterir. Bu değeri güncellemek dokunmatik çubuktaki kontrolü hemen günceller.