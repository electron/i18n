## Sınıf: TouchBarKaydırıcı

> Bir kaydırıcı oluşturma (Kaydırılabilir seçici)

İşlem: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `yeni DokunmatikYüzeyKaydırıcı(seçenekler)` _Deneysel_

* `options` Object
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Bu kaydırıcıya yerleştirilecek bir dizi madde.
  * `select` Function - Called when the user taps an item that was not the last tapped item.
    * `selectedIndex` Integer - Kullanıcının seçtiği öğenin dizini.
  * `highlight` Function - Called when the user taps any item.
    * `highlightedIndex` Integer - Kullanıcının dokunduğu maddenin endeksi.
  * `selectedStyle` String - Selected item style. Defaults to `null`.
  * `overlayStyle` String - Selected overlay item style. Defaults to `null`.
  * `showArrowButtons` Boolean - Varsayılan değer `false`.
  * `mode` String - Varsayılan değer `free`.
  * `continuous` Boolean - Varsayılan değer `true`.

### Örnek Özellikler

Aşağıdaki özelliklere, `TouchBarScrubber` örnekleri üzerinde erişilebilir:

#### `touchBarScrubber.items`

Bir `ScrubberItem[]` array bu kaydırıcıdaki öğeleri temsil eder. Bu değeri güncellemek dokunmatik bardaki kontrolü hemen günceller. İçindeki derin özellkleri güncelleme array **dokunmatik barı güncellemez**.

#### `touchBarScrubber.selectedStyle`

Sepet içindeki seçili öğelerin stilini temsil eden bir `String` olmalıdır. Bu değeri değiştirmek dokunmatik bardaki denetimi hemen güncelleştirir. Olası değerler:

* `background` - Haritaları `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Haritaları `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Aslında boş bir dize değil, tüm stilleri kaldırır.

#### `touchBarScrubber.overlayStyle`

Sepet içindeki seçili öğelerin stilini temsil eden bir `String` olmalıdır. Bu stil, arkasına yerleştirilmek yerine kaydırıcı maddenin üzerine eklenir. Bu değeri güncellemek dokunmatik bardaki kontrolü hemen günceller. Olası değerler:

* `background` - Haritaları `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Haritaları `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Aslında boş bir dize değil, tüm stilleri kaldırır.

#### `touchBarScrubber.showArrowButtons`

A `Boolean` representing whether to show the left / right selection arrows in this scrubber. Updating this value immediately updates the control in the touch bar.

#### `touchBarScrubber.mode`

A `String` representing the mode of this scrubber. Bu değeri güncellemek dokunmatik bardaki kontrolü hemen günceller. Olası değerler:

* `fixed` - Haritaları `NSScrubberModeFixed`.
* `fixed` - Haritaları `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

A `Boolean` representing whether this scrubber is continuous or not. Bu değeri güncellemek dokunmatik bardaki kontrolü hemen günceller.
