# autoUpdater

> Aktifkan aplikasi untuk memperbarui dirinya secara otomatis.

Proses: [Main](../glossary.md#main-process)

**Anda dapat menemukan petunjuk lebih lanjut mengenai penerapan pembaharuan ke dalam aplikasi anda [disini.](../tutorial/updates.md).**

## Platform Notices

Saat ini, hanya di macOS dan Windows Yang masih mendukung. Tidak ada dukungan untuk pembaharuan automatis pada linux, sehingga disarankan untuk menggunakan paket distribusi manejer untuk memperbaharui aplikasi anda.

Sebagai tambahan, ada beberapa perbedaan kecil pada setiap platform:

### macOS

Di macOS, modul `autoUpdater` dibangun di atas [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), artinya Anda tidak memerlukan pengaturan khusus untuk membuatnya bekerja. Untuk server-side persyaratan, Anda dapat membaca [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). Perhatikan bahwa [App Keamanan Transportasi](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) berlaku untuk semua permintaan yang dilakukan sebagai bagian dari proses update. Aplikasi yang perlu di disable ATS bisa menambahkan `NSAllowsArbitraryLoads` kunci ke plist aplikasi mereka.

**Catatan:** Aplikasi Anda harus ditandatangani untuk update otomatis pada macOS. Ini adalah persyaratan `Squirrel.Mac`.

### Windows

Pada Windows, Anda harus menginstal aplikasi Anda ke mesin pengguna sebelum Anda bisa gunakan `autoUpdater`, jadi sebaiknya gunakan [paket pemecah elektron / winstaller](https://github.com/electron/windows-installer),  atau [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) untuk menghasilkan pemasang Windows.</p> 

Bila menggunakan [electron-winstaller](https://github.com/electron/windows-installer) atau [electron-forge](https://github.com/electron-userland/electron-forge) pastikan Anda tidak mencoba memperbarui aplikasi Anda [saat pertama kali berjalan](https://github.com/electron/windows-installer#handling-squirrel-events) (Juga lihat [masalah ini untuk info lebih lanjut](https://github.com/electron/electron/issues/7155)). Sebaiknya gunakan [elektron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) untuk mendapatkan pintasan desktop untuk aplikasi Anda.

Installer yang dihasilkan dengan Squirrel akan membuat shortcut icon dengan [ID Model Aplikasi Pengguna](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) dalam format `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, contohnya adalah `com.squirrel.slack.Slack` dan `com.squirrel.code.Code`. Anda harus menggunakan ID yang sama untuk aplikasi Anda dengan API `app.setAppUserModelId`, jika tidak Windows akan melakukannya tidak bisa pin aplikasi Anda dengan benar di task bar.

Tidak seperti Squirrel.Mac, Windows dapat menginangi update pada S3 atau host file statis lainnya. Anda bisa membaca dokumen [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) untuk mendapatkan rincian lebih lanjut tentang bagaimana Squirrel.Windows bekerja.

## Events

Objek `autoUpdater` mengirimkan sinyal berikut:

### Sinyal: 'Error'

Mengirimkan:

* Kesalahan `kesalahan`

Dikirimkan saat ada kesalahan saat mengupdate.

### Sinyal: 'check-for-update'

Dikirimkan saat memeriksa apakah update telah dimulai.

### Sinyal: 'update-available'

Dikirimkan saat ada update yang tersedia. Pembaruan diunduh secara otomatis.

### Sinyal: 'update-not-available'

Dikirimkan saat tidak ada update yang tersedia.

### Sinyal: 'update-download'

Pengembalian:

* `event` Sinyal
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Tanggal
* `updateURL` String

Emitted saat update telah didownload.

`releaseName` hanya tersedia pada Windows.

## Metode

Objek `autoUpdater` memiliki metode berikut:

### `autoUpdater.setFeedURL(options)`

* `pilihan` Objek 
  * `url` String
  * `headers` Object (optional) *macOS* - HTTP request headers.
  * `serverType` String (optional) *macOS* - Either `json` or `default`, see the [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README for more information.

Menetapkan `url` dan menginisialisasi updater otomatis.

### `autoUpdater.getFeedURL()`

Mengembalikan `String` - URL feed pembaruan saat ini.

### `autoUpdater.checkForUpdates()`

Meminta server apakah ada update. Anda harus menghubungi `setFeedURL` sebelumnya menggunakan API ini.

### `autoUpdater.quitAndInstall()`

Menjalankan ulang app dan menginstall pembaharuan setelah selesai di unduh. hanya di gunakan setelah sinyal `update-downloaded` telah di kirimkan.

Under the hood calling `autoUpdater.quitAndInstall()` will close all application windows first, and automatically call `app.quit()` after all windows have been closed.

**Note:** If the application is quit without calling this API after the `update-downloaded` event has been emitted, the application will still be replaced by the updated one on the next run.