## Kelas: TouchBarSegmentedControl

> Buat kontrol tersegmentasi (grup tombol) di mana satu tombol memiliki status yang dipilih

Proses: [ Utama](../tutorial/quick-start.md#main-process)

### `new TouchBarSegmentedControl(options)` *Experimental*

* `pilihan` Obyek 
  * `segmentStyle` String - (opsional) Style dari segmen: 
    * `automatic` - Default. The appearance of the segmented control is automatically determined based on the type of window in which the control is displayed and the position within the window.
    * `rounded` - The control is displayed using the rounded style.
    * `textured-rounded` - The control is displayed using the textured rounded style.
    * `round-rect` - The control is displayed using the round rect style.
    * `textured-square` - The control is displayed using the textured square style.
    * `capsule` - The control is displayed using the capsule style
    * `small-square` - The control is displayed using the small square style.
    * `separated` - The segments in the control are displayed very close to each other but not touching.
  * `mode` String - (opsional) Mode pemilihan kontrol: 
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item.
    * `multiple` - Multiple items can be selected at a time.
    * `buttons` - Make the segments act as buttons, each segment can be pressed and released but never marked as active.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - An array of segments to place in this control.
  * `selectedIndex` Integer (optional) - The index of the currently selected segment, will update automatically with user interaction. Bila mode multipel itu akan menjadi item terakhir yang dipilih.
  * `perubahan` Fungsi - Dipanggil saat pengguna memilih segmen baru 
    * `selectedIndex` Integer - The index of the segment the user selected.
    * `isSelected` Boolean - Whether as a result of user selection the segment is selected or not.

### Instance Properties

The following properties are available on instances of `TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

A `SegmentedControlSegment[]` array representing the segments in this control. Memperbarui nilai ini segera memperbarui kontrol di panel sentuh. Memperbarui properti dalam di dalam array ini ** tidak memperbarui batang sentuh </ 0> .</p> 

#### `touchBarSegmentedControl.selectedIndex`

An `Integer` representing the currently selected segment. Mengubah nilai ini segera memperbarui kontrol di bilah sentuh. Interaksi pengguna dengan panel sentuh akan memperbarui nilai ini secara otomatis.