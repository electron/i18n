## Sınıf: TouchBarKaydırıcı

> Bir kaydırıcı oluşturma (Kaydırılabilir seçici)

İşlem: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `yeni DokunmatikYüzeyKaydırıcı(seçenekler)` _Deneysel_

* `options` Object
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Bu kaydırıcıya yerleştirilecek bir dizi madde.
  * `select` Function (optional) - Called when the user taps an item that was not the last tapped item.
    * `selectedIndex` Integer - Kullanıcının seçtiği öğenin dizini.
  * `highlight` Function (optional) - Called when the user taps any item.
    * `highlightedIndex` Integer - Kullanıcının dokunduğu maddenin endeksi.
  * `selectedStyle` String (optional) - Selected item style. Can be `background`, `outline` or `none`. Defaults to `none`.
  * `overlayStyle` String (optional) - Selected overlay item style. Can be `background`, `outline` or `none`. Defaults to `none`.
  * `showArrowButtons` Boolean (optional) - Defaults to `false`.
  * `mode` String (optional) - Can be `fixed` or `free`. The default is `free`.
  * `continuous` Boolean (optional) - Defaults to `true`.

### Örnek Özellikler

Aşağıdaki özelliklere, `TouchBarScrubber` örnekleri üzerinde erişilebilir:

#### `touchBarScrubber.items`

Bir `ScrubberItem[]` array bu kaydırıcıdaki öğeleri temsil eder. Bu değeri güncellemek dokunmatik bardaki kontrolü hemen günceller. İçindeki derin özellkleri güncelleme array **dokunmatik barı güncellemez**.

#### `touchBarScrubber.selectedStyle`

Sepet içindeki seçili öğelerin stilini temsil eden bir `String` olmalıdır. Bu değeri değiştirmek dokunmatik bardaki denetimi hemen güncelleştirir. Olası değerler:

* `background` - Haritaları `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Haritaları `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `none` - Removes all styles.

#### `touchBarScrubber.overlayStyle`

Sepet içindeki seçili öğelerin stilini temsil eden bir `String` olmalıdır. Bu stil, arkasına yerleştirilmek yerine kaydırıcı maddenin üzerine eklenir. Bu değeri güncellemek dokunmatik bardaki kontrolü hemen günceller. Olası değerler:

* `background` - Haritaları `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Haritaları `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `none` - Removes all styles.

#### `touchBarScrubber.showArrowButtons`

A `Boolean` representing whether to show the left / right selection arrows in this scrubber. Updating this value immediately updates the control in the touch bar.

#### `touchBarScrubber.mode`

A `String` representing the mode of this scrubber. Bu değeri güncellemek dokunmatik bardaki kontrolü hemen günceller. Olası değerler:

* `fixed` - Haritaları `NSScrubberModeFixed`.
* `fixed` - Haritaları `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

A `Boolean` representing whether this scrubber is continuous or not. Bu değeri güncellemek dokunmatik bardaki kontrolü hemen günceller.
