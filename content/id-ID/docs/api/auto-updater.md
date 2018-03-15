# autoUpdater

> Aktifkan aplikasi untuk memperbarui dirinya secara otomatis.

Process: [Main](../glossary.md#main-process)

**You can find a detailed guide about how to implement updates into your application [here](../tutorial/updates.md).**

## Platform Notices

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

In addition, there are some subtle differences on each platform:

### macOS

Di macOS, modul `autoUpdater` dibangun di atas [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), artinya Anda tidak memerlukan pengaturan khusus untuk membuatnya bekerja. Untuk server-side persyaratan, Anda dapat membaca [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). Perhatikan bahwa [App Keamanan Transportasi](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) berlaku untuk semua permintaan yang dilakukan sebagai bagian dari proses update. Aplikasi yang perlu di disable ATS bisa menambahkan `NSAllowsArbitraryLoads` kunci ke plist aplikasi mereka.

**Catatan:** Aplikasi Anda harus ditandatangani untuk update otomatis pada macOS. Ini adalah persyaratan `Squirrel.Mac`.

### Windows

Pada Windows, Anda harus menginstal aplikasi Anda ke mesin pengguna sebelum Anda bisa gunakan `autoUpdater`, jadi sebaiknya gunakan [paket pemecah elektron / winstaller](https://github.com/electron/windows-installer),  atau [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) untuk menghasilkan pemasang Windows.</p> 

Bila menggunakan [electron-winstaller](https://github.com/electron/windows-installer) atau [electron-forge](https://github.com/electron-userland/electron-forge) pastikan Anda tidak mencoba memperbarui aplikasi Anda [saat pertama kali berjalan](https://github.com/electron/windows-installer#handling-squirrel-events) (Juga lihat [masalah ini untuk info lebih lanjut](https://github.com/electron/electron/issues/7155)). Sebaiknya gunakan [elektron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) untuk mendapatkan pintasan desktop untuk aplikasi Anda.

Installer yang dihasilkan dengan Squirrel akan membuat shortcut icon dengan [ID Model Aplikasi Pengguna](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) dalam format `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, contohnya adalah `com.squirrel.slack.Slack` dan `com.squirrel.code.Code`. Anda harus menggunakan ID yang sama untuk aplikasi Anda dengan API `app.setAppUserModelId`, jika tidak Windows akan melakukannya tidak bisa pin aplikasi Anda dengan benar di task bar.

Tidak seperti Squirrel.Mac, Windows dapat menginangi update pada S3 atau host file statis lainnya. Anda bisa membaca dokumen [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) untuk mendapatkan rincian lebih lanjut tentang bagaimana Squirrel.Windows bekerja.

## Acara

The `autoUpdater` object emits the following events:

### Acara: 'kesalahan'

Mengembalikan:

* Kesalahan `kesalahan`

Emitted when there is an error while updating.

### Event: 'checking-for-update'

Emitted when checking if an update has started.

### Event: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### Event: 'update-not-available'

Emitted when there is no available update.

### Event: 'update-downloaded'

Mengembalikan:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Emitted when an update has been downloaded.

On Windows only `releaseName` is available.

## Metode

The `autoUpdater` object has the following methods:

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* ` url </ 0> String</li>
<li><code>requestHeaders` Object *macOS* (optional) - HTTP request headers.

Sets the `url` and initialize the auto updater.

### `autoUpdater.getFeedURL()`

Returns `String` - The current update feed URL.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

**Note:** `autoUpdater.quitAndInstall()` will close all application windows first and only emit `before-quit` event on `app` after that. This is different from the normal quit event sequence.