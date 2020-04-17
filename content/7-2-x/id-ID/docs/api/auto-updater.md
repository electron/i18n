# pembaruan otomatis

> Aktifkan aplikasi untuk memperbarui dirinya secara otomatis.

Proses: [Main](../glossary.md#main-process)

**See also: [A detailed guide about how to implement updates in your application](../tutorial/updates.md).**

`autoUpdater` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

## Platform Notices

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

Sebagai tambahan, ada beberapa perbedaan kecil pada setiap platform:

### macOS

Di macOS, modul `autoUpdater` dibangun di atas [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), artinya Anda tidak memerlukan pengaturan khusus untuk membuatnya bekerja. Untuk server-side persyaratan, Anda dapat membaca [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). Perhatikan bahwa [App Keamanan Transportasi](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) berlaku untuk semua permintaan yang dilakukan sebagai bagian dari proses update. Aplikasi yang perlu di disable ATS bisa menambahkan `NSAllowsArbitraryLoads` kunci ke plist aplikasi mereka.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

Pada Windows, Anda harus menginstal aplikasi Anda ke mesin pengguna sebelum Anda bisa gunakan `autoUpdater`, jadi sebaiknya gunakan [paket pemecah elektron / winstaller](https://github.com/electron/windows-installer),

 atau [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) untuk menghasilkan pemasang Windows.</p> 

Bila menggunakan [electron-winstaller](https://github.com/electron/windows-installer) atau [electron-forge](https://github.com/electron-userland/electron-forge) pastikan Anda tidak mencoba memperbarui aplikasi Anda [saat pertama kali berjalan](https://github.com/electron/windows-installer#handling-squirrel-events) (Juga lihat [masalah ini untuk info lebih lanjut](https://github.com/electron/electron/issues/7155)). Sebaiknya gunakan [elektron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) untuk mendapatkan pintasan desktop untuk aplikasi Anda.

Installer yang dihasilkan dengan Squirrel akan membuat shortcut icon dengan [ID Model Aplikasi Pengguna](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) dalam format `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, contohnya adalah `com.squirrel.slack.Slack` dan `com.squirrel.code.Code`. Anda harus menggunakan ID yang sama untuk aplikasi Anda dengan API `app.setAppUserModelId`, jika tidak Windows akan melakukannya tidak bisa pin aplikasi Anda dengan benar di task bar.

Tidak seperti Squirrel.Mac, Windows dapat menginangi update pada S3 atau host file statis lainnya. Anda bisa membaca dokumen [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) untuk mendapatkan rincian lebih lanjut tentang bagaimana Squirrel.Windows bekerja.



## Events

Objek `autoUpdater` memancarkan peristiwa berikut:



### Sinyal: 'Error'

Pengembalian:

* Kesalahan `kesalahan`

Emitted saat ada error saat mengupdate.



### Sinyal: 'check-for-update'

Emitted saat memeriksa apakah update telah dimulai.



### Sinyal: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.



### Sinyal: 'update-not-available'

Emitted saat tidak ada update yang tersedia.



### Sinyal: 'update-download'

Pengembalian:

* `event` Sinyal
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Tanggal
* `updateURL` String

Emitted saat update telah didownload.

Di Windows saja `releaseName` tersedia.

**Note:** It is not strictly necessary to handle this event. A successfully downloaded update will still be applied the next time the application starts.



### Event: 'before-quit-for-update'

This event is emitted after a user calls `quitAndInstall()`.

When this API is called, the `before-quit` event is not emitted before all windows are closed. As a result you should listen to this event if you wish to perform actions before the windows are closed while a process is quitting, as well as listening to `before-quit`.



## Metode

Objek `autoUpdater` memiliki metode berikut:



### `autoUpdater.setFeedURL(options)`

* `options` Object 
    * `url` String
  * `headers` Record<String, String> (optional) _macOS_ - HTTP request headers.
  * `serverType` String (optional) _macOS_ - Either `json` or `default`, see the [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README for more information.

Menetapkan `url` dan menginisialisasi updater otomatis.



### `autoUpdater.getFeedURL()`

Mengembalikan `String` - URL feed pembaruan saat ini.



### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.



### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

Under the hood calling `autoUpdater.quitAndInstall()` will close all application windows first, and automatically call `app.quit()` after all windows have been closed.

**Note:** It is not strictly necessary to call this function to apply an update, as a successfully downloaded update will always be applied the next time the application starts.
