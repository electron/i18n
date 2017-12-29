## Kelas: MenuItem

> Menambahkan item ke menu aplikasi asli dan menu konteks.

Proses: [utama](../glossary.md#main-process)

Melihat [`Menu`](menu.md) untuk contoh.

### `MenuItem baru (pilihan)`

* `pilihan` Objek 
  * `klik` Fungsi (opsional) - akan dipanggil dengan `klik (menuItem, jendela browser, acara )` saat item menu diklik. 
    * `menuItem` MenuItem
    * `browserWindow` BrowserWindow
    * ` event </ 0>  Acara</li>
</ul></li>
<li><code> peran </ 0>  String (opsional) - Tentukan tindakan item menu, bila ditentukan properti
 <code> klik </ 0> akan diabaikan. Lihat <a href="#roles"> peran </ 1> .</li>
<li><code> ketik </ 0>  String (opsional) - Dapat <code> normal </ 0> , <code> pemisah </ 0> , <code> submenu </ 0> , <code> kotak centang </ 0> atau
 <code> radio </ 0> .</li>
<li><code> label </ 0>  String - (opsional)</li>
<li><code> sublabel </ 0>  String - (opsional)</li>
<li><code> akselerator </ 0>  <a href="accelerator.md"> Accelerator </ 1> (opsional)</li>
<li><code> ikon </ 0> ( <a href="native-image.md"> NativeImage </ 1> | String ) (opsional)</li>
<li><code> diaktifkan </ 0>  Boolean (opsional) - Jika salah, item menu akan diklik dan tidak dapat diklik.</li>
<li><code> terlihat </ 0>  Boolean (opsional) - Jika salah, item menu akan seluruhnya tersembunyi.</li>
<li><code> diperiksa </ 0>  Boolean (opsional) - Sebaiknya hanya ditentukan untuk item menu jenis <code> kotak centang </ 0> atau <code> radio </ 0> .</li>
<li><code> submenu </ 0> (MenuItemConstructorOptions [] | Menu) (opsional) - Harus ditentukan untuk <code> submenu </ 0> ketik item menu. Jika
 <code> submenu </ 0> ditentukan, tipe <code> : 'submenu' </ 0> dapat diabaikan. Jika nilainya bukan <code> Menu </ 0> maka otomatis akan dikonversi menjadi satu dengan
 <code> Menu.buildFromTemplate </ 0> .</li>
<li><code> id </ 0>  String (opsional) - Unik dalam satu menu. Jika di definisikan maka bisa dijadikan acuan untuk item ini dengan atribut posisi.</li>
<li><code> posisi </ 0>  String (opsional) - Bidang ini memungkinkan definisi lokasi yang spesifik dalam menu tertentu.</li>
</ul></li>
</ul>

<h3>Peran</h3>

<p>Peran memungkinkan item menu memiliki perilaku yang telah ditentukan.</p>

<p>Cara terbaik adalah menentukan <code> peran </ 0> untuk item menu yang sesuai dengan peran standar, daripada mencoba menerapkan perilaku secara manual pada fungsi <code> klik </ 0> .
Di bangun <code> peran </ 0> perilaku akan memberikan pengalaman terbaik asli.</p>

<p><code> label </ 0> dan <code> akselerator </ 0> nilai-nilai opsional ketika menggunakan <code> peran </ 0> dan akan default ke nilai yang sesuai untuk setiap platform.</p>

<p>Properti <code> peran </ 0> dapat memiliki nilai berikut:</p>

<ul>
<li><code>membuka`
    * `mengulangi`
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
<li><code> perbesar </ 0> - Perbesar halaman yang terfokus sebesar 10%</li>
<li><code> perkecil </ 0> - Perkecil halaman yang terfokus sebesar 10%</li>
<li><code> editMenu </ 0> - Seluruh menu "Edit" default (Undo, Copy, dll.)</li>
<li><code> jendela Menu </ 0> - Menu "Jendela" default keseluruhan (Minimalkan, Tutup, dll.)</li>
</ul>

<p>Peran tambahan berikut tersedia di macOS :</p>

<ul>
<li><code> tentang </ 0> - Peta ke <code> orderFrontStandardAboutPanel </ 0> tindakan</li>
<li><code> menyembunyikan </ 0> - Peta ke <code> menyembunyikan </ 0> tindakan</li>
<li><code> menyembunyi lain </ 0> - Peta ke <code> menyembunyikan aplikasi lain</ 0> tindakan</li>
<li><code>unhide` - peta tindakan `unhideAllApplications`
    * `startspeaking` - peta tindakan `startSpeaking`
    * `stopspeaking` - peta tindakan `stopSpeaking`
    * `depan` - Peta ke `arrangeInFront` tindakan
    * `zoom` - Peta ke `performZoom` tindakan
    * `jendela` - submenu adalah menu "Jendela"
    * `membantu` - submenu adalah menu "Bantuan"
    * `Layanan` - submenu adalah menu "Layanan"
    
    Ketika menentukan `peran` pada macOS, `label` dan `akselerator` adalah satu-satunya pilihan yang akan mempengaruhi menu item. Semua pilihan lain akan diabaikan.
    
    ### Instance Properties
    
    Properti berikut tersedia pada contoh `MenuItem`:
    
    #### `menuItem.enabled`
    
    A`Boolean` menunjukkan apakah item tersebut diaktifkan, properti ini dapat diubah secara dinamis.
    
    #### `menuItem.visible`
    
    A `Boolean` menunjukkan apakah item tersebut terlihat, properti ini dapat diubah secara dinamis.
    
    #### `menuItem.checked`
    
    `Boolean` menunjukkan apakah item dicentang, properti ini dapat secara dinamis berubah.
    
    Sebuah `centang` item menu akan beralih `diperiksa` properti dan mematikan saat dipilih.
    
    Sebuah `radio` item menu akan menyala nya `diperiksa` properti saat diklik, dan akan mematikan properti itu untuk semua item yang berdekatan di menu yang sama.
    
    Anda dapat menambahkan fungsi `klik` untuk perilaku tambahan.
    
    #### `menuItem.label`
    
    Sebuah `String` yang mewakili label terlihat item menu
    
    #### `menuItem.click`
    
    `Fungsi` yang dipecat ketika MenuItem menerima event klik