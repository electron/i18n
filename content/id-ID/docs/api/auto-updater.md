# autoUpdater

> Aktifkan aplikasi untuk memperbarui dirinya secara otomatis.

Proses: [Utama](../glossary.md#main-process)

Modul `autoUpdater` menyediakan sebuah antarmuka untuk [kerangka Squirrel](https://github.com/Squirrel).

Anda dapat dengan cepat meluncurkan server pelepasan multi platform untuk mendistribusikannya aplikasi dengan menggunakan salah satu proyek ini:

* [kacang](https://github.com/GitbookIO/nuts): * Server pelepasan cerdas untuk aplikasi Anda, menggunakan GitHub sebagai backend. Pembaruan otomatis dengan Squirrel (Mac & Windows)*
* [elektron-release-server](https://github.com/ArekSredzki/electron-release-server): * Fitur lengkap, host rilis self-host untuk aplikasi elektron, kompatibel dengan auto-updater*
* [squirrel-updates-server](https://github.com/Aluxian/squirrel-updates-server): *Server node.js sederhana untuk Squirrel.Mac dan Squirrel.Windows yang menggunakan rilis GitHub*
* [squirrel-release-server](https://github.com/Arcath/squirrel-release-server): *Aplikasi PHP sederhana untuk Squirrel.Windows yang membaca update dari sebuah folder. Mendukung pembaruan delta.*

## Pemberitahuan platform

Meskipun `autoUpdater` menyediakan API seragam untuk berbagai platform, ada Masih ada beberapa perbedaan halus pada setiap platform.

### macOS

Di macOS, modul `autoUpdater` dibangun di atas [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), artinya Anda tidak memerlukan pengaturan khusus untuk membuatnya bekerja. Untuk server-side persyaratan, Anda dapat membaca [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). Perhatikan bahwa [App Keamanan Transportasi](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) berlaku untuk semua permintaan yang dilakukan sebagai bagian dari proses update. Aplikasi yang perlu di disable ATS bisa menambahkan `NSAllowsArbitraryLoads` kunci ke plist aplikasi mereka.

**Catatan:** Aplikasi Anda harus ditandatangani untuk update otomatis pada macOS. Ini adalah persyaratan `Squirrel.Mac`.

### Windows

Pada Windows, Anda harus menginstal aplikasi Anda ke mesin pengguna sebelum Anda bisa gunakan `autoUpdater`, jadi sebaiknya gunakan [paket pemecah elektron / winstaller](https://github.com/electron/windows-installer),  atau [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) untuk menghasilkan pemasang Windows.</p> 

Bila menggunakan [electron-winstaller](https://github.com/electron/windows-installer) atau [electron-forge](https://github.com/electron-userland/electron-forge) pastikan Anda tidak mencoba memperbarui aplikasi Anda [saat pertama kali berjalan](https://github.com/electron/windows-installer#handling-squirrel-events) (Juga lihat [masalah ini untuk info lebih lanjut](https://github.com/electron/electron/issues/7155)). Sebaiknya gunakan [elektron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) untuk mendapatkan pintasan desktop untuk aplikasi Anda.

Installer yang dihasilkan dengan Squirrel akan membuat shortcut icon dengan  ID Model Aplikasi Pengguna </ 0> dalam format ` com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE </ 1>, contohnya adalah
<code> com.squirrel.slack.Slack </ 1> dan <code> com.squirrel.code.Code </ 1>. Anda harus menggunakan
ID yang sama untuk aplikasi Anda dengan API <code> app.setAppUserModelId </ 0>, jika tidak Windows akan melakukannya
tidak bisa pin aplikasi Anda dengan benar di task bar.</p>

<p>Tidak seperti Squirrel.Mac, Windows dapat menginangi update pada S3 atau host file statis lainnya.
Anda bisa membaca dokumen <a href="https://github.com/Squirrel/Squirrel.Windows"> Squirrel.Windows </ 0> untuk mendapatkan rincian lebih lanjut
tentang bagaimana Squirrel.Windows bekerja.</p>

<h3>Linux</h3>

<p>Tidak ada dukungan built-in untuk auto-updater di Linux, jadi dianjurkan untuk melakukannya
gunakan manajer paket distribusi untuk memperbarui aplikasi Anda.</p>

<h2>Acara</h2>

<p>Objek <code> autoUpdater </ 0> memancarkan peristiwa berikut:</p>

<h3>Acara: 'kesalahan'</h3>

<p>Pengembalian:</p>

<ul>
<li>Kesalahan <code> kesalahan </ 0></li>
</ul>

<p>Emitted saat ada error saat mengupdate.</p>

<h3>Acara: 'check-for-update'</h3>

<p>Emitted saat memeriksa apakah update telah dimulai.</p>

<h3>Acara: 'update-available'</h3>

<p>dibunyikan saat ada update yang tersedia. Pembaruan diunduh
secara otomatis.</p>

<h3>Acara: 'update-tidak-tersedia'</h3>

<p>Emitted saat tidak ada update yang tersedia.</p>

<h3>Acara: 'update-download'</h3>

<p>Pengembalian:</p>

<ul>
<li><code> acara </ 0> Acara</li>
<li><code> releaseNotes </ 0> String</li>
<li><code> releaseName </ 0> String</li>
<li><code> releaseDate </ 0> Tanggal</li>
<li><code> updateURL </ 0> String</li>
</ul>

<p>Emitted saat update telah didownload.</p>

<p>Di Windows saja <code> releaseName </ 0> tersedia.</p>

<h2>Metode</h2>

<p>Objek <code> autoUpdater </ 0> memiliki metode berikut:</p>

<h3><code>autoUpdater.setFeedURL (url [, requestHeaders])`</h3> 

* ` url </ 0> String</li>
<li><code> requestHeader </ 0> Objek <em> macOS </ 1> (opsional) - header permintaan HTTP.</li>
</ul>

<p>Menetapkan <code> url </ 0> dan menginisialisasi updater otomatis.</p>

<h3><code>autoUpdater.getFeedURL ()`</h3> 
    Mengembalikan ` String </ 0> - URL feed pembaruan saat ini.</p>

<h3><code>autoUpdater.checkForUpdates ()`</h3> 
    
    Meminta server apakah ada update. Anda harus menghubungi ` setFeedURL </ 0> sebelumnya
menggunakan API ini</p>

<h3><code>autoUpdater.quitAndInstall ()`</h3> 
    
    Aktifkan ulang aplikasi dan instal pembaruan setelah diunduh. Saya t seharusnya hanya dipanggil setelah  update-download </ 0> telah dipancarkan.</p>

<p><strong> Catatan: </ 0> <code> autoUpdater.quitAndInstall () </ 1> akan menutup semua jendela aplikasi
pertama dan hanya memancarkan <code> sebelum-berhenti </ 1> pada <code> aplikasi </ 1> setelah itu. Ini berbeda
dari urutan kejadian berhenti normal.</p>