# aplikasi

> Kendalikan siklus hidup kejadian aplikasi Anda.

Proses: [Main](../glossary.md#main-process)

Contoh berikut ini menunjukkan bagaimana untuk keluar dari aplikasi ketika jendela terakhir ditutup:

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Kejadian

Objek `aplikasi` memancarkan kejadian-kejadian berikut:

### Kejadian: 'will-finish-launching'

Dipancarkan saat aplikasi telah menyelesaikan proses awal mula dasar. Pada Windows dan Linux, kejadian `will-finish-launching` sama dengan kejadian `ready`; di macOS, kejadian ini mewakili pemberitahuan `applicationWillFinishLaunching` dari `NSApplication`. Anda biasanya akan menyiapkan pendengar untuk kejadian `open-file` dan `open-url` di sini, dan memulai pelapor crash dan pemutakhir otomatis.

Kebanyakan, Anda harus menggunakan (event handler) `ready`.

### (Event) Kejadian: 'ready'

Mengembalikan:

* `launchInfo` Object _macOS_

Emitted ketika Elektron selesai menginisialisasi. Di macos , ` launchInfo </ 0> memegang <code> userInfo </ 0> dari <code> NSUserNotification </ 0> yang digunakan untuk membuka aplikasi, jika diluncurkan dari Notification Center. Anda dapat menghubungi <code> app.isReady () </ 0> untuk memeriksa apakah acara ini telah dipecat.</p>

<h3 spaces-before="0">Acara : 'window-all-closed'</h3>

<p spaces-before="0">Emitted ketika semua jendela telah ditutup.</p>

<p spaces-before="0">Jika Anda tidak berlangganan acara ini dan semua jendela ditutup, perilaku defaultnya adalah berhenti dari aplikasi; Namun, jika Anda berlangganan, Anda mengontrol apakah aplikasi berhenti atau tidak. Jika pengguna menekan <code> Cmd + Q </ 0> , atau pengembang yang disebut
 <code> app.quit () </ 0> , Elektron pertama akan mencoba untuk menutup semua jendela dan kemudian memancarkan
 <code> akan- berhenti </ 0>  event , dan dalam hal ini <code> jendela-semua-ditutup </ 0>  acara tidak akan dipancarkan.</p>

<h3 spaces-before="0">Acara : 'sebelum-berhenti'</h3>

<p spaces-before="0">Returns:</p>

<ul>
<li><code>event` Sinyal</li> </ul>

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

**Note:** If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted *after* emitting `close` event on all windows and closing them.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Acara : 'akan-berhenti'

Pengembalian:

* `peristiwa` Peristiwa

Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behaviour, which is terminating the application.

Lihat deskripsi ` jendela-semua-ditutup </ 0>  acara untuk perbedaan antara <code> akan-berhenti </ 0> dan <code> jendela-semua-ditutup </ 0> peristiwa.</p>

<p spaces-before="0"><strong x-id="1">Note:</strong> On Windows, this event will not be emitted if the app is closed due
to a shutdown/restart of the system or a user logout.</p>

<h3 spaces-before="0">Acara : 'berhenti'</h3>

<p spaces-before="0">Pengembalian:</p>

<ul>
<li><code>event</ 0> Acara</li>
<li><code> exitCode </ 0> Integer</li>
</ul>

<p spaces-before="0">Emitted saat aplikasi berhenti.</p>

<p spaces-before="0"><strong x-id="1">Note:</strong> On Windows, this event will not be emitted if the app is closed due
to a shutdown/restart of the system or a user logout.</p>

<h3 spaces-before="0">Event : 'open-file' <em x-id="4"> macos </ 0></h3>

<p spaces-before="0">Pengembalian:</p>

<ul>
<li><code>acara` Acara</li>
* ` path </ 0>  String</li>
</ul>

<p spaces-before="0">Emitted saat pengguna ingin membuka file dengan aplikasi. The <code> open-file yang </ 0> 
event biasanya dipancarkan saat aplikasi sudah terbuka dan OS ingin menggunakan kembali aplikasi untuk membuka file. <code> open-file </ 0> juga dipancarkan saat sebuah file diturunkan ke dok dan aplikasi belum berjalan. Pastikan untuk mendengarkan <code> open-file yang </ 0> acara sangat awal di startup aplikasi Anda untuk menangani kasus ini (bahkan sebelum <code> siap </ 0>  acara dipancarkan).</p>

<p spaces-before="0">Anda harus menghubungi <code> event .preventDefault () </ 0> jika Anda ingin menangani acara ini .</p>

<p spaces-before="0">Pada Windows, Anda harus mengurai <code> process.argv </ 0> (dalam proses utama) untuk mendapatkan filepath.</p>

<h3 spaces-before="0">Acara: 'buka-url' <em x-id="4"> macos </em></h3>

<p spaces-before="0">Pengembalian:</p>

<ul>
<li><code>acara` Acara
* `url` String</ul>

Emitted saat pengguna ingin membuka URL dengan aplikasi. File ` Info.plist <code> aplikasi Anda
 harus menentukan skema url di dalam kunci <code> CFBundleURLTypes `, dan set ` NSPrincipalClass ` ke <0> AtomApplication </code>.

Anda harus menghubungi ` event .preventDefault () </ 0> jika Anda ingin menangani acara ini .</p>

<h3 spaces-before="0">Acara: 'aktifkan' <em x-id="4">macOS</em></h3>

<p spaces-before="0">Pengembalian:</p>

<ul>
<li><code>event` Acara</li>
* `hasVisibleWindows` Boolean</ul>

Emitted saat aplikasi diaktifkan. Berbagai tindakan dapat memicu acara ini, seperti meluncurkan aplikasi untuk pertama kalinya, mencoba meluncurkan ulang aplikasi saat sudah berjalan, atau mengklik ikon dok atau ikon taskbar.

### Acara: 'lanjutkan aktivitas' _macOS_

Pengembalian:

* `acara` Acara
* `ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Objek - Berisi status spesifik aplikasi yang disimpan oleh aktivitas di perangkat lain.

Emitted selama [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) saat aktivitas dari perangkat lain ingin dilanjutkan. Anda harus menghubungi `event.preventDefault()` jika Anda ingin menangani acara ini.

Aktivitas pengguna hanya dapat dilanjutkan di aplikasi yang memiliki ID Tim pengembang yang sama dengan aplikasi sumber aktivitas dan yang mendukung jenis aktivitas. Jenis aktivitas yang didukung ditentukan di aplikasi `Info.plist` di bawah tombol `NSUserActivityTypes`.

### Event: 'will-continue-activity' _macOS_

Pengembalian:

* `acara` Acara
* `ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) before an activity from a different device wants to be resumed. Anda harus menghubungi `event.preventDefault()` jika Anda ingin menangani acara ini.

### Event: 'continue-activity-error' _macOS_

Pengembalian:

* `acara` Acara
* `ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - A string with the error's localized description.

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) when an activity from a different device fails to be resumed.

### Event: 'activity-was-continued' _macOS_

Pengembalian:

* `acara` Acara
* `ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contains app-specific state stored by the activity.

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) after an activity from this device was successfully resumed on another one.

### Event: 'update-activity-state' _macOS_

Pengembalian:

* `acara` Acara
* `ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contains app-specific state stored by the activity.

Emitted when [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) is about to be resumed on another device. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Otherwise, the operation will fail and `continue-activity-error` will be called.

### Event: 'new-window-for-tab' _macOS_

Pengembalian:

* `acara` Acara

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`

### Acara: 'browser-window-blur'

Pengembalian:

* `acara` Acara
* `window` [BrowserWindow](browser-window.md)

Emitted ketika [browserWindow](browser-window.md) menjadi kabur.

### Acara: 'browser-window-focus'

Pengembalian:

* `acara` Acara
* `window` [BrowserWindow](browser-window.md)

Emitted ketika [browserWindow](browser-window.md) terpusat.

### Acara: 'browser-window-created'

Pengembalian:

* `acara` Acara
* `window` [BrowserWindow](browser-window.md)

Emitted ketika baru [browserWindow](browser-window.md) dibuat.

### Acara: 'isi web-dibuat'

Pengembalian:

* `acara` Acara
* `webContents` [WebContents](web-contents.md)

Emitted ketika baru [webContents](web-contents.md) dibuat.

### Acara: 'sertifikat-kesalahan'

Pengembalian:

* `acara` Acara
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - Kode kesalahan
* `sertifikat` [Sertifikat](structures/certificate.md)
* `callback ` Fungsi
  * `isTrusted`  Boolean - Apakah akan mempertimbangkan sertifikat sebagai terpercaya

Emitted ketika gagal untuk memverifikasi `certificate` untuk `url`, untuk mempercayai sertifikat Anda harus mencegah perilaku default dengan `event.preventDefault ()` dan memanggil `callback(true)`.

```javascript
const { app } = require ('electron') app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
   if (url === 'https://github.com') {
     // Verifikasi logika.
    event.preventDefault()
     callback(true)
   } else {
     callback (false)
   }})
```

### Acara: 'pilih-klien-sertifikat'

Pengembalian:

* `acara` Acara
* `webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [Sertifikat[]](structures/certificate.md)
* `callback ` Fungsi
  * `sertifikat` [Sertifikat](structures/certificate.md) (opsional)

Emitted ketika sertifikat klien diminta.

The ` url </ 0> sesuai dengan entri navigasi meminta sertifikat klien dan <code> callback </ 0> bisa disebut dengan entri disaring dari daftar. Menggunakan
 <code>event.preventDefault()` mencegah aplikasi menggunakan sertifikat pertama dari toko.

```javascript
const { app } = require('electron') app.on('select-client-certificate', (event, webContents, url, list, callback) => {
 event.preventDefault()
 callback(daftar[0]) 
})    
```

### Acara: 'login'

Pengembalian:

* `acara` Acara
* `webContents` [WebContents](web-contents.md)
* `request` Object
  * `method` String
  * `url` URL
  * `perujuk` URL
* `authInfo` Object
  * ` isProxy </ 0>  Boolean</li>
<li><code>skema` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback ` Fungsi
  * `namapengguna` String
  * `katasandi` String

Emitted ketika `webContents` ingin melakukan auth dasar.

The default behavior is to cancel all authentications. To override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```javascript
const { app } = require('electron') app.on('login', (event, webContents, request, authInfo, callback) => {
 event.preventDefault()
 callback('username', 'secret')
})
```

### Acara: 'proses-gpu-jatuh'

Pengembalian:

* `acara` Acara
* `terbunuh` Boolean

Emitted saat proses gpu macet atau terbunuh.

### Event: 'renderer-process-crashed'

Pengembalian:

* `acara` Acara
* `webContents` [WebContents](web-contents.md)
* `terbunuh` Boolean

Emitted when the renderer process of `webContents` crashes or is killed.

### Event: 'aksesibilitas-support-changed' _macOS_ _Windows_

Pengembalian:

* `acara` Acara
* `aksesibilitasSupportEnabled` Boolean - `true` saat dukungan aksesibilitas Chrome diaktifkan, `false` sebaliknya.

Emitted saat dukungan aksesibilitas Chrome berubah. Peristiwa ini terjadi saat teknologi bantu, seperti pembaca layar, diaktifkan atau dinonaktifkan. Lihat https://www.chromium.org/developers/design-documents/accessibility untuk lebih jelasnya.

### Event: 'session-created'

Pengembalian:

* `session` [Session](session.md)

Emitted when Electron has created a new `session`.

```javascript
const { app } = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Event: 'second-instance'

Pengembalian:

* `acara` Acara
* `argv` String[] - Sebuah array dari argumen baris perintah kedua
* `workingDirectory` String - Direktori kerja contoh kedua

This event will be emitted inside the primary instance of your application when a second instance has been executed and calls `app.requestSingleInstanceLock()`.

`argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Biasanya aplikasi merespon hal ini dengan membuat jendela utama mereka fokus dan tidak diminimalisir.

This event is guaranteed to be emitted after the `ready` event of `app` gets emitted.

**Note:** Extra command line arguments might be added by Chromium, such as `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

Pengembalian:

* `acara` Acara
* `webContents` [WebContents](web-contents.md)

Emitted when `desktopCapturer.getSources()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will make it return empty sources.

### Event: 'remote-require'

Pengembalian:

* `acara` Acara
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-global'

Pengembalian:

* `acara` Acara
* `webContents` [WebContents](web-contents.md)
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the global from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-builtin'

Pengembalian:

* `acara` Acara
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-current-window'

Pengembalian:

* `acara` Acara
* `webContents` [WebContents](web-contents.md)

Emitted when `remote.getCurrentWindow()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-current-web-contents'

Pengembalian:

* `acara` Acara
* `webContents` [WebContents](web-contents.md)

Emitted when `remote.getCurrentWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-guest-web-contents'

Pengembalian:

* `acara` Acara
* `webContents` [WebContents](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

## Metode

The `aplikasi` objek memiliki metode berikut:

**Catatan:** Beberapa metode hanya tersedia pada sistem operasi tertentu dan diberi label seperti itu.

### `app.quit()`

Cobalah untuk menutup semua jendela. The `sebelum-berhenti` acara akan dipancarkan pertama. Jika semua jendela berhasil ditutup, `akan-berhenti` acara akan dipancarkan dan secara default aplikasi akan mengakhiri.

Metode ini menjamin bahwa semua `beforeunload` dan `unload` event handlers dijalankan dengan benar. Ada kemungkinan bahwa sebuah jendela membatalkan berhenti dengan mengembalikan `false` pada pengendali event *Beforeunload</code>.</p>

### `app.exit([exitCode])`

* `exitCode` Integer (opsional)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

All windows will be closed immediately without asking the user, and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

* `options` Object (optional)
  * `args` String[] (optional)
  * `execPath` String (opsional)

Luncurkan ulang aplikasi saat instance saat ini keluar.

By default, the new instance will use the same working directory and command line arguments with current instance. Bila `args` ditentukan, `args` akan dilewatkan sebagai argumen baris perintah. Ketika `execPath` dispesifikasikan, `execPath` akan dieksekusi untuk diluncurkan kembali alih-alih aplikasi saat ini.

Perhatikan bahwa metode ini tidak berhenti dari aplikasi saat dijalankan, Anda harus memanggil `app.quit` atau `app.exit` setelah memanggil `app.relaunch` ke buat aplikasi restart.

Saat `app.relaunch` dipanggil berkali-kali, beberapa contoh akan dimulai setelah instance saat ini keluar.

Contoh untuk me-restart instance saat ini segera dan menambahkan argumen baris perintah baru ke instance baru:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

Mengembalikan `Boolean` - `true` jika Elektron selesai menginisialisasi, `false` sebaliknya.

### `app.whenReady()`

Returns `Promise<void>` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the `ready` event if the app is not ready yet.

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` _macos_

Menyembunyikan semua jendela aplikasi tanpa meminimalkannya.

### `app.show()` _macos_

Shows application windows after they were hidden. Does not automatically focus them.

### `app.setAppLogsPath(path)`

* `path` String (optional) - A custom path for your logs. Must be absolute.

Sets or creates a directory your app's logs which can then be manipulated with `app.getPath()` or `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `/Library/Logs/YourAppName` on _macOS_, and inside the `userData` directory on _Linux_ and _Windows_.

### `app.getAppPath()`

Mengembalikan `String` - Direktori aplikasi saat ini.

### `app.getPath(nama)`

* ` nama </ 0>  String</li>
</ul>

<p spaces-before="0">Returns <code>String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.</p>

Anda dapat meminta jalur berikut dengan nama:

* `home` Direktori home pengguna.
* `appData` Per-user application data directory, which by default points to:
  * `%APPDATA%` di Windows
  * `$XDG_CONFIG_HOME` atau `~/.config` di Linux
  * `~/Library/Application Support` di macos
* `userData` Direktori untuk menyimpan file konfigurasi aplikasi Anda, yang secara default merupakan direktori `appData` yang ditambahkan dengan nama aplikasi Anda.
* `temp` Direktori sementara.
* `exe` File eksekusi saat ini.
* `modul` The `libchromiumcontent` perpustakaan.
* `desktop` Direktori Desktop pengguna saat ini.
* `dokumen` Direktori untuk "My Documents" pengguna.
* `download` Direktori untuk download pengguna.
* `musik` Direktori untuk musik pengguna.
* `gambar` Direktori untuk gambar pengguna.
* `video` Direktori untuk video pengguna.
* `logs` Directory for your app's log folder.
* `pepperFlashSystemPlugin` Full path to the system version of the Pepper Flash plugin.

### `app.getFileIcon(path[, options], callback)`

* ` path </ 0>  String</li>
<li><code>options` Object (optional)
  * `size` String
    * `kecil` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.
* `callback ` Fungsi
  * Kesalahan `kesalahan`
  * `ikon` [NativeImage](native-image.md)

Mengambil ikon terkait jalur.

On _Windows_, there are 2 kinds of icons:

* Ikon terkait dengan ekstensi file tertentu, seperti `.mp3`, `.png`, dll.
* Ikon di dalam file itu sendiri, seperti `.exe`, `.dll`, `.ico`.

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

**[Deprecated Soon](modernization/promisification.md)**

### `app.getFileIcon(path[, options])`

* ` path </ 0>  String</li>
<li><code>options` Object (optional)
  * `size` String
    * `kecil` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.

Returns `Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](native-image.md).

Mengambil ikon terkait jalur.

Pada _Windows_, ada 2 macam ikon:

* Ikon terkait dengan ekstensi file tertentu, seperti `.mp3`, `.png`, dll.
* Ikon di dalam file itu sendiri, seperti `.exe`, `.dll`, `.ico`.

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

### `app.setPath(nama, path)`

* ` nama </ 0>  String</li>
<li><code> path </ 0>  String</li>
</ul>

<p spaces-before="0">Menimpa <code>path` ke direktori khusus atau file yang terkait dengan `nama`. If the path specifies a directory that does not exist, an `Error` is thrown. In that case, the directory should be created with `fs.mkdirSync` or similar.</p>

Anda hanya dapat menimpa jalur dari `nama` didefinisikan dalam `app.getPath`.

Secara default, cookie dan cache halaman web akan disimpan di bawah direktori `userData`. Jika Anda ingin mengubah lokasi ini, Anda harus mengganti path `userData` sebelum event `ready` dari modul `app` dipancarkan.

### `app.getVersion()`

Mengembalikan `String` - Versi aplikasi yang dimuat. Jika tidak ada versi yang ditemukan di file `package.json` aplikasi, versi dari paket saat ini atau yang dapat dijalankan akan dikembalikan.

### `app.getName()`

Mengembalikan `String` - Nama aplikasi saat ini, yang merupakan nama di file `package.json` aplikasi.

Biasanya `nama` bidang `package.json` adalah nama lowercased singkat, menurut npm modul spec. Anda juga harus menentukan bidang `productName`, yang merupakan nama lengkap kapitalisasi aplikasi Anda, dan mana yang lebih disukai dari `nama`oleh Elektron.

### `app.setName(nama)`

* ` nama </ 0>  String</li>
</ul>

<p spaces-before="0">Mengabaikan nama aplikasi saat ini.</p>

<h3 spaces-before="0"><code>app.getLocale()`</h3>

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

To set the locale, you'll want to use a command line switch at app startup, which may be found [here](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Catatan:** Saat mendistribusikan aplikasi yang dikemas, Anda juga harus mengirimkan map `locales`.

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.addRecentDocument(path)` _macOS_ _Windows_

* ` path </ 0>  String</li>
</ul>

<p spaces-before="0">Menambahkan <code>path` ke daftar dokumen terbaru.</p>

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` _macOS_ _Windows_

Bersihkan daftar dokumen terakhir.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Nama protokol Anda, tanpa `://`. Jika Anda ingin aplikasi Anda menangani tautan `elektron://`, hubungi metode ini dengan `elektron` sebagai parameternya.
* `path` String (opsional) _Windows_ - Default ke `process.execPath`
* `args` String[] (opsional) _Windows_ - Default ke array kosong

Mengembalikan `Boolean` - Apakah panggilan berhasil.

Metode ini menetapkan executable saat ini sebagai pengendali default untuk sebuah protokol (alias skema URI). Ini memungkinkan Anda mengintegrasikan aplikasi Anda lebih dalam ke dalam sistem operasi. Setelah terdaftar, semua link dengan `your-protocol://` akan dibuka dengan executable saat ini. Seluruh link, termasuk protokol, akan diteruskan ke aplikasi Anda sebagai parameter.

On Windows, you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Catatan:** Pada macOS, Anda hanya dapat mendaftarkan protokol yang telah ditambahkan ke aplikasi `info.plist`, yang tidak dapat diubah saat runtime. Namun Anda dapat mengubah file dengan editor teks sederhana atau skrip selama waktu pembuatan. Silahkan lihat [dokumentasi Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) untuk rincian.

**Note:** In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications.  In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

The API menggunakan Windows Registry dan LSSetDefaultHandlerForURLScheme internal.

### `app.removeAsDefaultProtocolClient(protokol[, path, args])` _macOS_ _Windows_

* `protocol` String - Nama protokol Anda, tanpa `://`.
* `path` String (opsional) _Windows_ - Default ke `process.execPath`
* `args` String[] (opsional) _Windows_ - Default ke array kosong

Mengembalikan `Boolean` - Apakah panggilan berhasil.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Nama protokol Anda, tanpa `://`.
* `path` String (opsional) _Windows_ - Default ke `process.execPath`
* `args` String[] (opsional) _Windows_ - Default ke array kosong

Mengembalikan `Boolean`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Catatan:** Pada macOS, Anda dapat menggunakan metode ini untuk memeriksa apakah aplikasi telah terdaftar sebagai pengendali protokol default untuk sebuah protokol. Anda juga dapat memverifikasi ini dengan memeriksa `~/Library/Preferences/com.apple.LaunchServices.plist` pada mesin macOS. Silahkan lihat [dokumentasi Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) untuk rincian.

The API menggunakan Windows Registry dan LSCopyDefaultHandlerForURLScheme internal.

### `app.setUserTasks(tugas)` _Windows_

* `tugas` [ Tugas[] ](structures/task.md) - Array dari `Tugas` objek

Tambahkan `tugas` ke kategori [Tugas](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) JumpList di Windows.

`tugas` adalah berbagai dari [`Tugas`](structures/task.md) benda.

Mengembalikan `Boolean` - Apakah panggilan berhasil.

**Catatan:** Jika Anda ingin menyesuaikan Daftar Langsung gunakan lebih banyak lagi `app.setJumpList(categories)`.

### `app.getJumpListSettings()` _Windows_

Mengembalikan `Objek`:

* `minItems` Integer - The minimum jumlah item yang akan ditampilkan dalam Daftar Langsung (untuk penjelasan lebih rinci tentang nilai ini melihat [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array dari `JumpListItem` objek yang sesuai dengan item yang telah dihapus pengguna dari kategori khusus dalam Daftar Langsung. Item ini tidak boleh ditambahkan kembali ke Daftar Langsung di panggilan **berikutnya** ke `app.setJumpList()`, Windows tidak akan menampilkan kategori khusus yang berisi salah satu dari yang dihapus item.

### `app.setJumpList(kategori)` _Windows_

* `kategori` [JumpListCategory[]](structures/jump-list-category.md) atau `nol` - Array of `JumpListCategory` benda.

Mengatur atau menghapus Daftar Langsung kustom untuk aplikasi, dan mengembalikan salah satu dari string berikut:

* `ok` - Tidak ada yang salah.
* `error` - Satu atau beberapa kesalahan terjadi, aktifkan logging runtime untuk mengetahui kemungkinan penyebabnya.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - Upaya dilakukan untuk menambahkan tautan file ke Daftar Langsung untuk jenis file yang tidak terdaftar dalam aplikasi.
* `customCategoryAccessDeniedError` - Kategori khusus tidak dapat ditambahkan ke Daftar Langsung karena pengaturan kebijakan privasi atau grup pengguna.

Jika `kategori` adalah `null` daftar Jump kustom yang telah ditetapkan sebelumnya (jika ada) akan diganti oleh Daftar Langsung standar untuk aplikasi (dikelola oleh Windows).

** Catatan: </ 0> Jika objek ` JumpListCategory </ 1> tidak memiliki <code> tipe </ 1> atau <code> nama </ 1> 
properti yang ditetapkan maka <code> tipe < / 1> diasumsikan <code> tugas </ 1> . If the <code>name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.</p>

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Setiap usaha untuk menambahkan kembali item yang dihapus ke kategori khusus lebih awal dari pada itu akan mengakibatkan keseluruhan kategori khusus dihilangkan dari Daftar Langsung. Daftar item yang dihapus dapat diperoleh dengan menggunakan `app.getJumpListSettings()`.

Berikut adalah contoh sederhana untuk membuat Daftar Langsung kustom:

```javascript
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // has a name so `type` is assumed to be "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  { // has no name and no type so `type` is assumed to be "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
      }
    ]
  }
])
```

### `app.requestSingleInstanceLock()`

Mengembalikan `Boolean`

The return value of this method indicates whether or not this instance of your application successfully obtained the lock.  If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading.  It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance.

Contoh mengaktifkan jendela contoh utama saat instance kedua dimulai:

```javascript
const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

Mengembalikan `Boolean`

This method returns whether or not this instance of your app is currently holding the single instance lock.  You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `ketik` String - Unik mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Objek - Negara khusus aplikasi untuk disimpan untuk digunakan oleh perangkat lain.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Membuat `NSUserActivity` dan menetapkannya sebagai aktivitas saat ini. Aktivitas ini memenuhi syarat untuk [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) ke perangkat lain sesudahnya.

### `app.getCurrentActivityType()` _macOS_

Mengembalikan `String` - Jenis aktivitas yang sedang berjalan.

### `app.invalidateCurrentActivity()` _macOS_

* `ketik` String - Unik mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `ketik` String - Unik mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Objek - Negara khusus aplikasi untuk disimpan untuk digunakan oleh perangkat lain.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` _Windows_

* `id` String

Ubah [User ID Model Aplikasi](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) menjadi `id`.

### `app.importCertificate(options, callback)` _LINUX_

* `options` Object
  * `sertifikat` String - Path untuk berkas pkcs12.
  * `kata sandi` String - Passphrase untuk sertifikat.
* `callback ` Fungsi
  * `hasil` Integer - Hasil impor.

Impor sertifikat dalam format pkcs12 ke toko sertifikat platform. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Nonaktifkan akselerasi perangkat keras untuk aplikasi saat ini.

Metode ini hanya bisa dipanggil sebelum aplikasi sudah siap.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

Metode ini hanya bisa dipanggil sebelum aplikasi sudah siap.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Mengembalikan [`GPUFeatureStatus`](structures/gpu-feature-status.md) - Status Fitur Gambar dari `chrome://gpu/`.

### `app.getGPUInfo(infoType)`

* `infoType` String - Values can be either `basic` for basic info or `complete` for complete info.

Returns `Promise`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`. Here's an example of basic response:
```js
{ auxAttributes:
   { amdSwitchable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegDecodeAcceleratorSupported: false,
     optimus: false,
     passthroughCmdDecoder: false,
     sandboxed: false,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0 },
gpuDevice:
   [ { active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 } ],
machineModelName: 'MacBookPro',
machineModelVersion: '11.5' }
```
Using `basic` should be preferred if only basic information like `vendorId` or `driverId` is needed.

### `app.setBadgeCount(count)` _Linux_ _macOS_

* `hitung` Integer

Mengembalikan `Boolean` - Apakah panggilan berhasil.

Menetapkan lencana penghitung untuk aplikasi saat ini. Menetapkan hitungan ke `0` akan menyembunyikan lencana.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` _Linux_ _macOS_

Mengembalikan `Integer` - Nilai saat ini ditampilkan di lencana penghitung.

### `app.isUnityRunning()` _Linux_

Mengembalikan `Boolean` - Apakah lingkungan desktop saat ini adalah Unity launcher.

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (optional)
  * `path` String (optional) _Windows_ - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Mengembalikan `Objek`:

* `openAtLogin` Aljabar Boolean - `benar` jika app diatur untuk membuka di login.
* `openAsHidden` Boolean _macOS_ - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean _macOS_ - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean _macOS_ - `true` if the app was opened as a hidden login item. Ini menunjukkan bahwa aplikasi tidak boleh membuka jendela saat startup. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean _macOS_ - `true` if the app was opened as a login item that should restore the state from the previous session. Ini menunjukkan bahwa apl harus mengembalikan jendela yang buka terakhir kali aplikasi ditutup. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Default ke ` false </ 0> .</li>
<li><code>openAsHidden` Boolean (optional) _macOS_ - `true` to open the app as hidden. Default ke `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Tetapkan setelan item masuk aplikasi.

Untuk bekerja dengan < AutoUpdater `Elektron` pada Windows, yang menggunakan [Squirrel](https://github.com/Squirrel/Squirrel.Windows), Anda ingin menyetel jalur peluncuran ke Update.exe, dan meneruskan argumen yang menentukan nama aplikasi Anda. Sebagai contoh:

``` javascript
const appFolder = path.dirname(process.execPath) const updateExe = path.resolve(appFolder, '..', 'Update.exe') const exeName = path.basename(process.execPath) app.setLoginItemSettings ({
   openAtLogin: true,
   path: updateExe,
   args: [
     '--processStart', `"${exeName}"`,
     '--process-start-args', `"--hidden"`
   ]})
```

### `app.isAccessibilitySupportEnabled()` _macOS_ _Windows_

Mengembalikan `Boolean` - `true` jika dukungan aksesibilitas Chrome diaktifkan, `salah` sebaliknya. API ini akan mengembalikan `true` jika penggunaan teknologi bantu, seperti pembaca layar, telah terdeteksi. Lihat https://www.chromium.org/developers/design-documents/accessibility untuk lebih jelasnya.

**[Deprecated Soon](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

**[Deprecated Soon](modernization/property-updates.md)**

### `app.showAboutPanel` _macOS_ _Linux_

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` _macOS_ _Linux_

* `options` Object
  * `applicationName` String (opsional) - Nama aplikasi.
  * `applicationVersion` String (opsional) - Versi aplikasi.
  * `hak cipta` String (opsional) - Informasi hak cipta.
  * `version` String (opsional) - Nomor versi pembuatan aplikasi. _macOS_
  * `kredit` String (opsional) - Informasi kredit. _macOS_
  * `website` String (optional) - The app's website. _Linux_
  * `iconPath` String (optional) - Path to the app's icon. Will be shown as 64x64 pixels while retaining aspect ratio. _Linux_

Tetapkan opsi tentang panel. This will override the values defined in the app's `.plist` file on MacOS. Lihat [dokumentasi Apple](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) untuk detail lebih lanjut. On Linux, values must be set in order to be shown; there are no defaults.

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. The first file found is used, and if none is found, the info area is left blank. See Apple [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) for more information.

### `app.isEmojiPanelSupported`

Returns `Boolean` - whether or not the current OS version allows for native emoji pickers.

### `app.showEmojiPanel` _macOS_ _Windows_

Show the platform's native emoji picker.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _macOS (mas)_

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Start accessing the file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 🎉

// Remember to stop accessing the file once you've finished with it.
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.commandLine.appendSwitch(beralih [, nilai])`

* `switch` String - A command-line switch, without the leading `--`
* `value` String (opsional) - Nilai untuk saklar yang diberikan

Tambahkan peralihan (dengan `nilai opsional`) ke baris perintah Chromium.

**Catatan:** Ini tidak akan mempengaruhi `process.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.appendArgument(nilai)`

* `nilai` String - argumen untuk menambahkan ke baris perintah

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

If you're appending an argument like `--switch=value`, consider using `appendSwitch('switch', 'value')` instead.

**Catatan:** Ini tidak akan mempengaruhi `process.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.hasSwitch(switch)`

* `switch` String - Sakelar baris perintah

Returns `Boolean` - Whether the command-line switch is present.

### `app.commandLine.getSwitchValue(switch)`

* `switch` String - Sakelar baris perintah

Returns `String` - The command-line switch value.

**Note:** When the switch is not present or has no value, it returns empty string.

### `app.enableSandbox()` _Experimental_

Enables full sandbox mode on the app.

Metode ini hanya bisa dipanggil sebelum aplikasi sudah siap.

### ` app.isInApplicationsFolder () </ 0>  <em x-id="4"> macos </ 1></h3>

<p spaces-before="0">Returns <code>Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`</p>

### ` app.moveToApplicationsFolder () </ 0>  <em x-id="4"> macos </ 1></h3>

<p spaces-before="0">Returns <code>Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.</p>

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce()` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Mengembalikan `Integer` ID yang mewakili permintaan.

Ketika `kritis` dilewatkan, ikon dermaga akan terpental sampai aplikasi menjadi aktif atau permintaan dibatalkan.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

### `app.dock.cancelBounce(id)` Linux _macOS_

* `identitas` Integer

Membatalkan bouncing `id`.

### `app.dock.downloadFinished(filePath)` _Windows_

* `fullPath` String

Memantapkan Download stack jika filePath ada di dalam folder Downloads.

### `app.dock.setBadge (teks)` _macOS_

* `teks` String

Menetapkan string yang akan ditampilkan di area badging dermaga.

### `app.dock.getBadge()` _macos_

Mengembalikan `String` - String badge dari dok.

### `app.dock.hide()` _macOS_

Sembunyikan ikon dok.

### `app.dock.show()` _macos_

Returns `Promise<void>` - Resolves when the dock icon is shown.

### `app.dock.isVisible()` _macos_

Returns `Boolean` - Whether the dock icon is visible.

### `app.dock.setMenu(menu)` _macos_

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### ` app.dock.getMenu () </ 0>  <em x-id="4"> macos </ 1></h3>

<p spaces-before="0">Returns <code>Menu | null` - The application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).</p>

### `app.dock.setIcon(gambar)` _macOS_

* `gambar` ([NativeImage](native-image.md) | String)

Menetapkan `gambar` yang terkait dengan ikon dermaga ini.

## properti

### `app.applicationMenu`

A `Menu` property that return [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

A `Boolean` property that's `true` if Chrome's accessibility support is enabled, `false` otherwise. This property will be `true` if the use of assistive technologies, such as screen readers, has been detected. Setting this property to `true` manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.userAgentFallback`

A `String` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level.  Useful for ensuring your entire app has the same user agent.  Set to a custom value as early as possible in your apps initialization to ensure that your overridden value is used.

### `app.isPackaged`

A `Boolean` property that returns  `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.

### `app.allowRendererProcessReuse`

A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation.  The current default value for this property is `false`.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed.  This property impacts which native modules you can use in the renderer process.  For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).
