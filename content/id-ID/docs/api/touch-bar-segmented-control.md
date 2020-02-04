## Kelas: TouchBarSegmentedControl

> Membuat kontrol tersegmentasi (tombol group) dimana satu tombol memiliki keadaan yang dipilih

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### ` TouchBarLabel baru (pilihan) </ 0> <em> Eksperimental </ 1></h3>

<ul>
<li><code>pilihan` Benda 

* `segmentStyle` String (optional) - Style of the segments: 
  * `automatic` - Default. The appearance of the segmented control is automatically determined based on the type of window in which the control is displayed and the position within the window. Maps to `NSSegmentStyleAutomatic`.
  * `rounded` - The control is displayed using the rounded style. Maps to `NSSegmentStyleRounded`.
  * `textured-rounded` - The control is displayed using the textured rounded style. Maps to `NSSegmentStyleTexturedRounded`.
  * `round-rect` - The control is displayed using the round rect style. Maps to `NSSegmentStyleRoundRect`.
  * `textured-square` - The control is displayed using the textured square style. Maps to `NSSegmentStyleTexturedSquare`.
  * `capsule` - The control is displayed using the capsule style. Maps to `NSSegmentStyleCapsule`.
  * `small-square` - The control is displayed using the small square style. Maps to `NSSegmentStyleSmallSquare`.
  * `separated` - The segments in the control are displayed very close to each other but not touching. Maps to `NSSegmentStyleSeparated`.
* `modus` String (optional) - The selection mode of the control: 
  * `single` - Default. One item selected at a time, selecting one deselects the previously selected item. Maps to `NSSegmentSwitchTrackingSelectOne`.
  * `multiple` - Multiple items can be selected at a time. Maps to `NSSegmentSwitchTrackingSelectAny`.
  * `buttons` - Make the segments act as buttons, each segment can be pressed and released but never marked as active. Maps to `NSSegmentSwitchTrackingMomentary`.
* `segmen` [[SegmentedControlSegment]](structures/segmented-control-segment.md) - serangkaian segmen untuk menempatkan di kontrol ini.
* `selectedIndex` Bulat (opsional) - indeks dari segmen yang dipilih, akan diperbarui secara otomatis dengan interaksi pengguna. When the mode is `multiple` it will be the last selected item.
* `perubahan` Function (optional) - Called when the user selects a new segment. 
  * `selectedIndex` Bulat - indeks dari segmen pengguna yang dipilih.
  * `isSelected` Boolean - baik yang merupakan pengguna pilihan segmen yang dipilih atau tidak.</li> </ul> 

### Contoh properti

The following properties are available on instances of `TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

A `SegmentedControlSegment []` array representing the segments in this control. Segera memperbarui nilai ini update kontrol di bar sentuhan. Memperbarui sifat-sifat yang mendalam dalam array ini **tidak memperbarui bar sentuhan**.

#### `touchBarSegmentedControl.selectedIndex`

An `Integer` representing the currently selected segment. Mengubah nilai ini segera memperbarui kontrol di bilah sentuh. Interaksi pengguna dengan panel sentuh akan memperbarui nilai ini secara otomatis.