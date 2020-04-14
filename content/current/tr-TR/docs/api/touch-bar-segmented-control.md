## Sınıf: DokunmatikBarParçalıDenetim

> Bir butonun seçili olduğu durumda parçalı bir denetim (bir tuş grubu) oluşturun

İşlem: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSegmentedControl(options)` *Experimental*

* `seçenekler` Nesnesi 
  * `segmentStyle` String (optional) - Style of the segments: 
    * `automatic` - Default. The appearance of the segmented control is automatically determined based on the type of window in which the control is displayed and the position within the window. Maps to `NSSegmentStyleAutomatic`.
    * `rounded` - The control is displayed using the rounded style. Maps to `NSSegmentStyleRounded`.
    * `textured-rounded` - The control is displayed using the textured rounded style. Maps to `NSSegmentStyleTexturedRounded`.
    * `round-rect` - The control is displayed using the round rect style. Maps to `NSSegmentStyleRoundRect`.
    * `textured-square` - The control is displayed using the textured square style. Maps to `NSSegmentStyleTexturedSquare`.
    * `capsule` - The control is displayed using the capsule style. Maps to `NSSegmentStyleCapsule`.
    * `small-square` - The control is displayed using the small square style. Maps to `NSSegmentStyleSmallSquare`.
    * `separated` - The segments in the control are displayed very close to each other but not touching. Maps to `NSSegmentStyleSeparated`.
  * `mode` String (optional) - The selection mode of the control: 
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item. Maps to `NSSegmentSwitchTrackingSelectOne`.
    * `multiple` - Multiple items can be selected at a time. Maps to `NSSegmentSwitchTrackingSelectAny`.
    * `buttons` - Make the segments act as buttons, each segment can be pressed and released but never marked as active. Maps to `NSSegmentSwitchTrackingMomentary`.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - Bu denetimin içine yerleştirilmiş bir dizi segment.
  * `selectedIndex` Tamsayı (opsiyonel) - Hali hazırda seçili olan segmentin dizini, kullanıcı etkileşimi ile otomatik olarak güncelleyecek. When the mode is `multiple` it will be the last selected item.
  * `değiştir` Function (optional) - Called when the user selects a new segment. 
    * `selectedIndex` Tamsayı - Kullanıcının seçtiği segmentin dizini.
    * `isSelected` Boole - Kullanıcı seçiminin sonucu olarak segmentin seçilip seçilmediği.

### Örnek Özellikler

Aşağıdaki özellikler `TouchBarSegmentedControl` örnekleri olarak uygundur:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

Denetimdeki segmentleri temsil eden bir `SegmentedControlSegment[]` dizisi. Bu değeri güncellemek dokunmatik bardaki kontrolü hemen günceller. İçindeki derin özellkleri güncelleme array **dokunmatik barı güncellemez**.

#### `touchBarSegmentedControl.selectedIndex`

O anda seçili olan segmenti temsil eden bir `Integer`. Bu değeri değiştirmek dokunmatik bardaki denetimi hemen güncelleştirir. Dokunmatik bar ile olan kullanıcı etkileşimi bu değeri hemen güncelleştirecek.