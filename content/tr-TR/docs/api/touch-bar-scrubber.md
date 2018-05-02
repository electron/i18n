## Sınıf: TouchBarKaydırıcı

> Bir kaydırıcı oluşturma (Kaydırılabilir seçici)

İşlem: [Main](../tutorial/quick-start.md#main-process)

### `yeni DokunmatikYüzeyKaydırıcı(seçenekler)` *Deneysel*

* `seçenekler` Nesnesi 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Bu kaydırıcıya yerleştirilecek bir dizi madde.
  * `seç` Fonksiyon - Kullanıcı, son tıklanan öğe olmayan bir öğeyi tıklattığında çağrılır. 
    * `selectedIndex` Integer - Kullanıcının seçtiği öğenin dizini.
  * `vurgulamak` Fonksiyon - Kullanıcı herhangi bir öğeyi tıklattığında çağrılır. 
    * `highlightedIndex` Integer - Kullanıcının dokunduğu maddenin endeksi.
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

* `background` - Haritaları `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Haritaları `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Aslında boş bir dize değil, tüm stilleri kaldırır.

#### `touchBarScrubber.overlayStyle`

Sepet içindeki seçili öğelerin stilini temsil eden bir `String` olmalıdır. Bu stil, arkasına yerleştirilmek yerine kaydırıcı maddenin üzerine eklenir. Bu değeri güncellemek dokunmatik bardaki kontrolü hemen günceller. Olası değerler:

* `background` - Haritaları `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Haritaları `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Aslında boş bir dize değil, tüm stilleri kaldırır.

#### `touchBarScrubber.showArrowButtons`

Bu tarayıcıda sol / sağ seçim oklarının gösterilip gösterilmeyeceğini gösteren bir `Boolean`. Bu değeri güncellemek dokunmatik bardaki kontrolü hemen günceller.

#### `touchBarScrubber.mode`

Bu kaydırıcı modunu temsil eden bir `String`. Bu değeri hemen güncelleme dokunmatik bardaki kontrolü günceller. Olası değerler:

* `fixed` - Haritaları `NSScrubberModeFixed`.
* `fixed` - Haritaları `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

`Boolean` bu scrubber'ın sürekli olup olmadığını gösterir. Bu değeri güncellemek dokunmatik çubuktaki kontrolü hemen günceller.