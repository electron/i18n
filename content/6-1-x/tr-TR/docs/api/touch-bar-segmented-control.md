## Sınıf: DokunmatikBarParçalıDenetim

> Bir butonun seçili olduğu durumda parçalı bir denetim (bir tuş grubu) oluşturun

İşlem: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSegmentedControl(options)` _Experimental_

* `options` Object
  * `segmentStyle` String (optional) - Style of the segments:
    * `automatic` - Default. The appearance of the segmented control is automatically determined based on the type of window in which the control is displayed and the position within the window.
    * `rounded` - Denetim yuvarlak biçim kullanılarak görüntülenir.
    * `textured-rounded` - Denetim dokulu yuvarlak biçim kullanılarak görüntülenir.
    * `round-rect` - Denetim yuvarlak dik biçim kullanılarak görüntülenir.
    * `textured-square` - Denetim dokulu kare biçim kullanılarak görüntülenir.
    * `capsule` - Denetim kapsül biçimi kullanılarak görüntülenir.
    * `small-square` - Denetim küçük kare biçim kullanılarak görüntülenir.
    * `separated` - Denetimdeki segmentler birbirlerine çok yakın fakat değmeden görüntülenir.
  * `mode` String (optional) - The selection mode of the control:
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item.
    * `multiple` - Bir kerede birden fazla öge seçilebilir.
    * `buttons` - Segmentlerin buton gibi davranmasını sağlar, her segment tıklanabilir ve bırakılabilir fakat hiçbir zaman aktif olarak işaretlenmez.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - Bu denetimin içine yerleştirilmiş bir dizi segment.
  * `selectedIndex` Tamsayı (opsiyonel) - Hali hazırda seçili olan segmentin dizini, kullanıcı etkileşimi ile otomatik olarak güncelleyecek. Mod çoklu olduğunda o son seçilen öge olacak.
  * `change` Function - Called when the user selects a new segment.
    * `selectedIndex` Tamsayı - Kullanıcının seçtiği segmentin dizini.
    * `isSelected` Boole - Kullanıcı seçiminin sonucu olarak segmentin seçilip seçilmediği.

### Örnek Özellikler

Aşağıdaki özellikler `TouchBarSegmentedControl` örnekleri olarak uygundur:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

Denetimdeki segmentleri temsil eden bir `SegmentedControlSegment[]` dizisi. Bu değeri değiştirmek dokunmatik bardaki denetimi hemen güncelleştirir. İçindeki derin özellkleri güncelleme array **dokunmatik barı güncellemez**.

#### `touchBarSegmentedControl.selectedIndex`

O anda seçili olan segmenti temsil eden bir `Integer`. Bu değeri değiştirmek dokunmatik bardaki denetimi hemen güncelleştirir. Dokunmatik bar ile olan kullanıcı etkileşimi bu değeri hemen güncelleştirecek.
