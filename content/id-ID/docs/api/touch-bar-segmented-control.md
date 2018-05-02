## Kelas: TouchBarSegmentedControl

> Membuat kontrol tersegmentasi (tombol group) dimana satu tombol memiliki keadaan yang dipilih

Proses: [ Utama](../tutorial/quick-start.md#main-process)

### ` TouchBarLabel baru (pilihan) </ 0> <em> Eksperimental </ 1></h3>

<ul>
<li><code>pilihan` Benda 

* `segmentStyle` String (optional) - Style of the segments: 
  * `otomatis` - Default. Munculnya tersegmentasi kontrol otomatis ditentukan berdasarkan jenis jendela di yang kontrol ditampilkan dan posisi dalam jendela.
  * `bulat` - kontrol ditampilkan menggunakan gaya bulat.
  * `bertekstur-bulat` - kontrol ditampilkan menggunakan gaya bulat bertekstur.
  * `putaran-rect` - kontrol ditampilkan menggunakan gaya rect bulat.
  * `bertekstur persegi` - kontrol ditampilkan menggunakan gaya persegi bertekstur.
  * `kapsul` - kontrol ditampilkan menggunakan gaya kapsul.
  * `persegi kecil` - kontrol ditampilkan menggunakan gaya persegi kecil.
  * `dipisahkan` - segmen dalam pengendalian ditampilkan sangat dekat satu sama lain tetapi tidak menyentuh.
* `modus` String (optional) - The selection mode of the control: 
  * `single` - Default. Salah satu item yang dipilih pada satu waktu, memilih salah satu untuk melepas item yang dipilih sebelumnya.
  * `beberapa` - beberapa item dapat dipilih pada satu waktu.
  * `tombol` - membuat segmen bertindak sebagai tombol, setiap segmen dapat ditekan dan dirilis tapi tidak pernah ditandai aktif.
* `segmen` [[SegmentedControlSegment]](structures/segmented-control-segment.md) - serangkaian segmen untuk menempatkan di kontrol ini.
* `selectedIndex` Bulat (opsional) - indeks dari segmen yang dipilih, akan diperbarui secara otomatis dengan interaksi pengguna. Bila beberapa itu akan terakhir item yang dipilih.
* `perubahan` Fungsi - disebut ketika pengguna memilih segmen baru. 
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