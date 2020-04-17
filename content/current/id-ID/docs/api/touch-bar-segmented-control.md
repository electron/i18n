## Kelas: TouchBarSegmentedControl

> Membuat kontrol tersegmentasi (tombol group) dimana satu tombol memiliki keadaan yang dipilih

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### ` TouchBarLabel baru (pilihan) </ 0> <em x-id="4"> Eksperimental </ 1></h3>

<ul>
<li><p spaces-before="0"><code>options` Object</p>
  * `segmentStyle` String (optional) - Style of the segments:
    * `automatic` - Default. The appearance of the segmented control is automatically determined based on the type of window in which the control is displayed and the position within the window. Maps to `NSSegmentStyleAutomatic`.
    * `bulat` - kontrol ditampilkan menggunakan gaya bulat. Maps to `NSSegmentStyleRounded`.
    * `bertekstur-bulat` - kontrol ditampilkan menggunakan gaya bulat bertekstur. Maps to `NSSegmentStyleTexturedRounded`.
    * `putaran-rect` - kontrol ditampilkan menggunakan gaya rect bulat. Maps to `NSSegmentStyleRoundRect`.
    * `bertekstur persegi` - kontrol ditampilkan menggunakan gaya persegi bertekstur. Maps to `NSSegmentStyleTexturedSquare`.
    * `kapsul` - kontrol ditampilkan menggunakan gaya kapsul. Maps to `NSSegmentStyleCapsule`.
    * `persegi kecil` - kontrol ditampilkan menggunakan gaya persegi kecil. Maps to `NSSegmentStyleSmallSquare`.
    * `dipisahkan` - segmen dalam pengendalian ditampilkan sangat dekat satu sama lain tetapi tidak menyentuh. Maps to `NSSegmentStyleSeparated`.
  * `mode` String (optional) - The selection mode of the control:
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item. Maps to `NSSegmentSwitchTrackingSelectOne`.
    * `beberapa` - beberapa item dapat dipilih pada satu waktu. Maps to `NSSegmentSwitchTrackingSelectAny`.
    * `tombol` - membuat segmen bertindak sebagai tombol, setiap segmen dapat ditekan dan dirilis tapi tidak pernah ditandai aktif. Maps to `NSSegmentSwitchTrackingMomentary`.
  * `segmen` [[SegmentedControlSegment]](structures/segmented-control-segment.md) - serangkaian segmen untuk menempatkan di kontrol ini.
  * `selectedIndex` Bulat (opsional) - indeks dari segmen yang dipilih, akan diperbarui secara otomatis dengan interaksi pengguna. When the mode is `multiple` it will be the last selected item.
  * `change` Function (optional) - Called when the user selects a new segment.
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
