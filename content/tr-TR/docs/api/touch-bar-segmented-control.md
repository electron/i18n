## Sınıf: DokunmatikBarParçalıDenetim

> Bir butonun seçili olduğu durumda parçalı bir denetim (bir tuş grubu) oluşturun

İşlem: [Ana](../tutorial/quick-start.md#main-process)

### `new TouchBarSegmentedControl(options)` *Experimental*

* `seçenekler` Nesne 
  * `segmentStyle` Dize - (opsiyonel) Segmentlerin biçimi: 
    * `automatic` - Varsayılan. Parçalı denetimin görünümü denetimin görüntüleneceği pencerenin türüne ve penceredeki konumuna göre otomatik olarak belirlenir.
    * `rounded` - Denetim yuvarlak biçim kullanılarak görüntülenir.
    * `textured-rounded` - Denetim dokulu yuvarlak biçim kullanılarak görüntülenir.
    * `round-rect` - Denetim yuvarlak dik biçim kullanılarak görüntülenir.
    * `textured-square` - Denetim dokulu kare biçim kullanılarak görüntülenir.
    * `capsule` - Denetim kapsül biçimi kullanılarak görüntülenir
    * `small-square` - Denetim küçük kare biçim kullanılarak görüntülenir.
    * `separated` - The segments in the control are displayed very close to each other but not touching.
  * `mode` String - (optional) The selection mode of the control: 
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item.
    * `multiple` - Multiple items can be selected at a time.
    * `buttons` - Make the segments act as buttons, each segment can be pressed and released but never marked as active.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - An array of segments to place in this control.
  * `selectedIndex` Integer (optional) - The index of the currently selected segment, will update automatically with user interaction. When the mode is multiple it will be the last selected item.
  * `change` Function - Called when the user selects a new segment 
    * `selectedIndex` Integer - The index of the segment the user selected.
    * `isSelected` Boolean - Whether as a result of user selection the segment is selected or not.

### Örnek özellikleri

The following properties are available on instances of `TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

A `SegmentedControlSegment[]` array representing the segments in this control. Updating this value immediately updates the control in the touch bar. Updating deep properties inside this array **does not update the touch bar**.

#### `touchBarSegmentedControl.selectedIndex`

An `Integer` representing the currently selected segment. Changing this value immediately updates the control in the touch bar. User interaction with the touch bar will update this value automatically.