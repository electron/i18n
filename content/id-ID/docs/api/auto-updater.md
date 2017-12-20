# autoUpdater

> Aktifkan aplikasi untuk memperbarui dirinya secara otomatis.

Proses:  Utama </ 0></p> 

Modul ` autoUpdater </ 0> menyediakan sebuah antarmuka untuk
<a href="https://github.com/Squirrel"> kerangka Squirrel </ 1>.</p>

<p>Anda dapat dengan cepat meluncurkan server pelepasan multi platform untuk mendistribusikannya
aplikasi dengan menggunakan salah satu proyek ini:</p>

<ul>
<li><a href="https://github.com/GitbookIO/nuts"> kacang </ 0>: <em> Server pelepasan cerdas untuk aplikasi Anda, menggunakan GitHub sebagai backend. Pembaruan otomatis dengan Squirrel (Mac & amp; Windows) </ 1></li>
<li><a href="https://github.com/ArekSredzki/electron-release-server"> elektron-release-server </ 0>: <em> Fitur lengkap,
host rilis self-host untuk aplikasi elektron, kompatibel dengan
auto-updater </ 1></li>
<li><a href="https://github.com/Aluxian/squirrel-updates-server"> squirrel-updates-server </ 0>: <em> Server node.js sederhana
untuk Squirrel.Mac dan Squirrel.Windows yang menggunakan rilis GitHub </ 1></li>
<li><a href="https://github.com/Arcath/squirrel-release-server"> squirrel-release-server </ 0>: <em> Aplikasi PHP sederhana untuk Squirrel.Windows yang membaca update dari sebuah folder. Mendukung pembaruan delta. </ 0></li>
</ul>

<h2>Pemberitahuan platform</h2>

<p>Meskipun <code> autoUpdater </ 0> menyediakan API seragam untuk berbagai platform, ada
Masih ada beberapa perbedaan halus pada setiap platform.</p>

<h3>macOS</h3>

<p>Di macos, modul <code> autoUpdater </ 0> dibangun di atas <a href="https://github.com/Squirrel/Squirrel.Mac"> Squirrel.Mac </ 1>,
artinya Anda tidak memerlukan pengaturan khusus untuk membuatnya bekerja. Untuk server-side
persyaratan, Anda dapat membaca <a href="https://github.com/Squirrel/Squirrel.Mac#server-support"> Server Support </ 0>. Perhatikan bahwa <a href="https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35"> App
Keamanan Transportasi </ 0> (ATS) berlaku untuk semua permintaan yang dilakukan sebagai bagian dari
proses update Aplikasi yang perlu di disable ATS bisa menambahkan
<code> NSAllowsArbitraryLoads </ 0> kunci ke plist aplikasi mereka.</p>

<p><strong> Catatan: </ 0> Aplikasi Anda harus ditandatangani untuk update otomatis pada macos.
Ini adalah persyaratan <code> Squirrel.Mac <</p>

<h3>Windows</h3>

<p>Pada Windows, Anda harus menginstal aplikasi Anda ke mesin pengguna sebelum Anda bisa
gunakan <code> autoUpdater </ 0>, jadi sebaiknya gunakan
<a href="https://github.com/electron/windows-installer"> paket pemecah elektron / winstaller </ 1>, <a href="https://github.com/electron-userland/electron-forge"> atau <a href="https://github.com/electron/grunt-electron-installer"> grunt-electron-installer </ 3> untuk menghasilkan pemasang Windows.</p>

<p>Bila menggunakan <a href="https://github.com/electron/windows-installer"> electron-winstaller </ 0> atau <a href="https://github.com/electron-userland/electron-forge"> electron-forge </ 1> pastikan Anda tidak mencoba memperbarui aplikasi Anda <a href="https://github.com/electron/windows-installer#handling-squirrel-events"> saat pertama kali berjalan </ 2> (Juga lihat <3 > masalah ini untuk info lebih lanjut </ 3>). Sebaiknya gunakan <a href="https://github.com/mongodb-js/electron-squirrel-startup"> elektron-squirrel-startup </ 0> untuk mendapatkan pintasan desktop untuk aplikasi Anda.</p>

<p>Installer yang dihasilkan dengan Squirrel akan membuat shortcut icon dengan
<a href="https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx"> ID Model Aplikasi Pengguna </ 0> dalam format
<code> com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE </ 1>, contohnya adalah
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

<h3>Event: 'error'</h3>

<p>Pengembalian:</p>

<ul>
<li><code> error </ 0> Kesalahan</li>
</ul>

<p>Emitted when there is an error while updating.</p>

<h3>Event: 'checking-for-update'</h3>

<p>Emitted when checking if an update has started.</p>

<h3>Event: 'update-available'</h3>

<p>Emitted when there is an available update. The update is downloaded
automatically.</p>

<h3>Event: 'update-not-available'</h3>

<p>Emitted when there is no available update.</p>

<h3>Event: 'update-downloaded'</h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code>releaseNotes` String</li> 

* `releaseName` String
* `releaseDate` Date
* `updateURL` String</ul> 

Emitted when an update has been downloaded.

On Windows only `releaseName` is available.

## Methods

The `autoUpdater` object has the following methods:

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* ` url </ 0>  String</li>
<li><code>requestHeaders` Object *macOS* (optional) - HTTP request headers.

Sets the `url` and initialize the auto updater.

### `autoUpdater.getFeedURL()`

Returns `String` - The current update feed URL.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

**Note:** `autoUpdater.quitAndInstall()` will close all application windows first and only emit `before-quit` event on `app` after that. This is different from the normal quit event sequence.