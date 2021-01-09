# autoUpdater

> Aktifkan aplikasi untuk memperbarui dirinya secara otomatis.

Proses: [Main](../glossary.md#main-process)

**See also: [A detailed guide about how to implement updates in your application](../tutorial/updates.md).**

`autoUpdater` is an [EventEmitter][event-emitter].

## Platform Notices

Saat ini, hanya macOS dan Windows yang didukung. Tidak ada dukungan bawaan untuk auto-updater di Linux, sehingga direkomendasikan untuk menggunakan pengelola paket distribusi untuk memperbarui app anda.

Sebagai tambahan, ada beberapa perbedaan kecil pada setiap platform:

### macOS

Di macOS, modul `autoUpdater` dibangun di atas [Squirrel.Mac][squirrel-mac], artinya Anda tidak memerlukan pengaturan khusus untuk membuatnya bekerja. Untuk server-side persyaratan, Anda dapat membaca [Server Support][server-support]. Perhatikan bahwa [App Keamanan Transportasi](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) berlaku untuk semua permintaan yang dilakukan sebagai bagian dari proses update. Aplikasi yang perlu di disable ATS bisa menambahkan `NSAllowsArbitraryLoads` kunci ke plist aplikasi mereka.

**Note:** Your application must be signed for automatic updates on macOS. Ini adalah kebutuhan untuk `Squirrel.Mac`.

### Windows

On Windows, you have to install your app into a user's machine before you can use the `autoUpdater`, so it is recommended that you use the [electron-winstaller][installer-lib], [electron-forge][electron-forge-lib] or the [grunt-electron-installer][installer] package to generate a Windows installer.

When using [electron-winstaller][installer-lib] or [electron-forge][electron-forge-lib] make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). Sebaiknya gunakan [elektron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) untuk mendapatkan pintasan desktop untuk aplikasi Anda.

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID][app-user-model-id] in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. Anda harus menggunakan ID yang sama untuk aplikasi Anda dengan API `app.setAppUserModelId`, jika tidak Windows akan melakukannya tidak bisa pin aplikasi Anda dengan benar di task bar.

Tidak seperti Squirrel.Mac, Windows dapat menginangi update pada S3 atau host file statis lainnya. You can read the documents of [Squirrel.Windows][squirrel-windows] to get more details about how Squirrel.Windows works.

## Events

Objek `autoUpdater` memancarkan peristiwa berikut:

### Acara: 'kesalahan'

Mengembalikan:

* ` error </ 0> Kesalahan</li>
</ul>

<p spaces-before="0">Emitted saat ada error saat mengupdate.</p>

<h3 spaces-before="0">Sinyal: 'check-for-update'</h3>

<p spaces-before="0">Emitted saat memeriksa apakah update telah dimulai.</p>

<h3 spaces-before="0">Sinyal: 'update-available'</h3>

<p spaces-before="0">Emitted when there is an available update. Pembaruan diunduh secara otomatis.</p>

<h3 spaces-before="0">Sinyal: 'update-not-available'</h3>

<p spaces-before="0">Emitted saat tidak ada update yang tersedia.</p>

<h3 spaces-before="0">Sinyal: 'update-download'</h3>

<p spaces-before="0">Mengembalikan:</p>

<ul>
<li><code>event` Sinyal
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

## Methods

Objek `autoUpdater` memiliki metode berikut:

### `autoUpdater.setFeedURL(options)`

* `options` Object
  * ` url </ 0> String</li>
<li><code>headers` Record<String, String> (optional) _macOS_ - HTTP request headers.
  * `serverType` String (optional) _macOS_ - Either `json` or `default`, see the [Squirrel.Mac][squirrel-mac] README for more information.

Menetapkan `url` dan menginisialisasi updater otomatis.

### `autoUpdater.getFeedURL()`

Mengembalikan `String` - URL feed pembaruan saat ini.

### `autoUpdater.checkForUpdates()`

Menanyakan kepada server apa ada pembaruan. Anda harus memanggil `setFeedURL` sebelum menggunakan API ini.

### `autoUpdater.quitAndInstall()`

Memulai ulang app dan memasang pembaruan setelah selesai diunduh. It should only be called after `update-downloaded` has been emitted.

Under the hood calling `autoUpdater.quitAndInstall()` will close all application windows first, and automatically call `app.quit()` after all windows have been closed.

**Note:** It is not strictly necessary to call this function to apply an update, as a successfully downloaded update will always be applied the next time the application starts.

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac
[server-support]: https://github.com/Squirrel/Squirrel.Mac#server-support
[squirrel-windows]: https://github.com/Squirrel/Squirrel.Windows
[installer]: https://github.com/electron/grunt-electron-installer
[installer-lib]: https://github.com/electron/windows-installer
[electron-forge-lib]: https://github.com/electron-userland/electron-forge
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
