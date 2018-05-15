## Sınıf: DokunmatikBarParçalıDenetim

> Bir butonun seçili olduğu durumda parçalı bir denetim (bir tuş grubu) oluşturun

İşlem: [Ana](../tutorial/quick-start.md#main-process)

### `new TouchBarSegmentedControl(options)` *Experimental*

* `seçenekler` Nesne 
  * `segmentStyle` String (optional) - Style of the segments: 
    * `automatic` - Varsayılan. Parçalı denetimin görünümü denetimin görüntüleneceği pencerenin türüne ve penceredeki konumuna göre otomatik olarak belirlenir.
    * `rounded` - Denetim yuvarlak biçim kullanılarak görüntülenir.
    * `textured-rounded` - Denetim dokulu yuvarlak biçim kullanılarak görüntülenir.
    * `round-rect` - Denetim yuvarlak dik biçim kullanılarak görüntülenir.
    * `textured-square` - Denetim dokulu kare biçim kullanılarak görüntülenir.
    * `capsule` - The control is displayed using the capsule style.
    * `small-square` - Denetim küçük kare biçim kullanılarak görüntülenir.
    * `separated` - Denetimdeki segmentler birbirlerine çok yakın fakat değmeden görüntülenir.
  * `mod` String (optional) - The selection mode of the control: 
    * `single` - Varsayılan. Bir kerede bir öge seçilir, birini seçmek önceki seçilmiş ögeyi iptal eder.
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

Denetimdeki segmentleri temsil eden bir `SegmentedControlSegment[]` dizisi. Bu değeri değiştirmek dokunmatik bardaki denetimi hemen güncelleştirir. **does not update the touch bar** bu dizideki derin özellikleri güncelleştirir.

#### `touchBarSegmentedControl.selectedIndex`

O anda seçili olan segmenti temsil eden bir `Integer`. Bu değeri değiştirmek dokunmatik bardaki denetimi hemen güncelleştirir. Dokunmatik bar ile olan kullanıcı etkileşimi bu değeri hemen güncelleştirecek.