## Kelas: MenuItem

> Menambahkan item ke menu aplikasi asli dan menu konteks.

Process: [Main](../glossary.md#main-process)

Melihat [`Menu`](menu.md) untuk contoh.

### `MenuItem baru (pilihan)`

* `pilihan` Benda 
  * `klik` Fungsi (opsional) - akan dipanggil dengan `klik (menuItem, jendela browser, acara )` saat item menu diklik. 
    * `menuItem` MenuItem
    * `browserWindow` BrowserWindow
    * `acara` Acara
  * `peran` String (opsional) - menentukan tindakan menu item, bila ditentukan `Klik` properti akan diabaikan. Melihat [peran](#roles).
  * `jenis` String (opsional) - dapat `normal`, `pemisah`, `submenu`, `kotak centang` atau `radio`.
  * `label` String - (opsional)
  * `sublabel` String - (opsional)
  * `Accelerator` [Accelerator](accelerator.md) (opsional)
  * `ikon` ([NativeImage](native-image.md) | String) (opsional)
  * `diaktifkan` Boolean (opsional) - jika palsu, menu item akan diklik keluar dan unclickable.
  * `terlihat` Boolean (opsional) - jika palsu, menu item akan sepenuhnya tersembunyi.
  * `memeriksa` Boolean (opsional) - harus hanya ditentukan untuk `centang` atau `radio` jenis item menu.
  * `submenu` ([MenuItemConstructorOptions] | Menu) (opsional) - harus ditentukan untuk `submenu` jenis menu item. Jika `submenu` ditetapkan, `jenis: 'submenu'` dapat diabaikan. Jika nilai tidak `Menu` maka akan secara otomatis dikonversi ke salah satu menggunakan `Menu.buildFromTemplate`.
  * `id` String (opsional) - unik dalam menu tunggal. Jika ditentukan kemudian dapat digunakan sebagai referensi untuk item ini oleh posisi atribut.
  * `posisi` String (opsional) - bidang ini memungkinkan definisi yang halus lokasi tertentu dalam menu tertentu.

### Peran

Peran memungkinkan item menu untuk memiliki standar perilaku.

Terbaik untuk menetapkan `peran` untuk setiap item menu yang sesuai peran standar, daripada berusaha untuk secara manual menerapkan perilaku dalam fungsi `Klik`. Perilaku internal `peran` akan memberikan pengalaman asli terbaik.

Nilai-nilai `label` dan `akselerator` opsional ketika menggunakan `peran` dan akan default ke nilai-nilai yang sesuai untuk setiap platform.

Properti `peran` dapat memiliki nilai-nilai berikut:

* `membatalkan`
* `mengulang`
* `memotong`
* `salinan`
* `pasta`
* `pasteandmatchstyle`
* `Pilih Semua`
* `menghapus`
* ` minimize </ 0> - Minimalkan jendela saat ini</li>
<li><code> tutup </ 0> - Tutup jendela saat ini</li>
<li><code> berhenti </ 0> - Keluar dari aplikasi</li>
<li><code> reload </ 0> - Muat ulang jendela aktif</li>
<li><code> forcereload </ 0> - Muat ulang jendela aktif yang mengabaikan cache.</li>
<li><code> toggledev alat </ 0> - Toggle alat pengembang di jendela aktif</li>
<li><code> toggle penuh layar </ 0> - Beralih mode layar penuh pada jendela aktif</li>
<li><code> reset zoom </ 0> - Reset tingkat zoom halaman terfokus ke ukuran aslinya</li>
<li><code>zoomin` - Zoom di halaman terfokus sebesar 10%
* `zoomout` - Zoom out halaman terfokus sebesar 10%
* `editMenu` - default seluruh "Edit" menu (Undo, salin, dsb.)
* `windowMenu` - default seluruh "Jendela" menu (Minimalkan, tutup, dll.)

Peran tambahan berikut tersedia pada macOS:

* `tentang` - peta tindakan `orderFrontStandardAboutPanel`
* `menyembunyikan` - peta untuk `menyembunyikan` tindakan
* `hideothers` - peta tindakan `hideOtherApplications`
* `unhide` - peta tindakan `unhideAllApplications`
* `startspeaking` - peta tindakan `startSpeaking`
* `stopspeaking` - peta tindakan `stopSpeaking`
* `depan` - peta tindakan `arrangeInFront`
* `zoom` - peta tindakan `performZoom`
* `toggletabbar` - Map to the `toggleTabBar` action
* `selectnexttab` - Map to the `selectNextTab` action
* `selectprevioustab` - Map to the `selectPreviousTab` action
* `mergeallwindows` - Map to the `mergeAllWindows` action
* `movetabtonewwindow` - Map to the `moveTabToNewWindow` action
* `jendela` - submenu adalah menu "Jendela"
* `membantu` - submenu adalah menu "Bantuan"
* `Layanan` - submenu adalah menu "Layanan"

Ketika menentukan `peran` pada macOS, `label` dan `akselerator` adalah satu-satunya pilihan yang akan mempengaruhi menu item. Semua pilihan lain akan diabaikan.

### Contoh properti

Properti berikut tersedia pada contoh-contoh dari `MenuItem`:

#### `menuItem.enabled`

`Boolean` menunjukkan apakah item diaktifkan, properti ini dapat secara dinamis berubah.

#### `menuItem.visible`

`Boolean` menunjukkan item Apakah terlihat, properti ini dapat secara dinamis berubah.

#### `menuItem.checked`

`Boolean` menunjukkan apakah item dicentang, properti ini dapat secara dinamis berubah.

Item menu `kotak centang` akan beralih `memeriksa` properti on dan off ketika dipilih.

`Radio` menu item akan menyala `memeriksa` properti ketika diklik, dan akan menonaktifkan properti itu untuk semua item yang berdekatan di menu yang sama.

Anda dapat menambahkan sebuah `klik` fungsi untuk perilaku tambahan.

#### `menuItem.label`

Sebuah `String` yang mewakili label terlihat item menu

#### `menuItem.click`

`Fungsi` yang dipecat ketika MenuItem menerima event klik