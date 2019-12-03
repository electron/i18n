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

* `launchInfo` unknown *macOS*

Emitted ketika Elektron selesai menginisialisasi. Di macos , ` launchInfo </ 0> memegang <code> userInfo </ 0> dari <code> NSUserNotification </ 0> yang digunakan untuk membuka aplikasi, jika diluncurkan dari Notification Center. Anda dapat menghubungi <code> app.isReady () </ 0> untuk memeriksa apakah acara ini telah dipecat.</p>

<h3>Acara : 'window-all-closed'</h3>

<p>Emitted ketika semua jendela telah ditutup.</p>

<p>Jika Anda tidak berlangganan acara ini dan semua jendela ditutup, perilaku defaultnya adalah berhenti dari aplikasi; Namun, jika Anda berlangganan, Anda mengontrol apakah aplikasi berhenti atau tidak. Jika pengguna menekan <code> Cmd + Q </ 0> , atau pengembang yang disebut
 <code> app.quit () </ 0> , Elektron pertama akan mencoba untuk menutup semua jendela dan kemudian memancarkan
 <code> akan- berhenti </ 0>  event , dan dalam hal ini <code> jendela-semua-ditutup </ 0>  acara tidak akan dipancarkan.</p>

<h3>Acara : 'sebelum-berhenti'</h3>

<p>Returns:</p>

<ul>
<li><code>event` Sinyal</li> </ul> 

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

**Note:** If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted *after* emitting `close` event on all windows and closing them.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Acara : 'akan-berhenti'

Pengembalian:

* `peristiwa` Peristiwa

Emitted ketika semua jendela telah ditutup dan aplikasi akan berhenti. Memanggil ` event.preventDefault () </ 0> akan mencegah perilaku default, yang mengakhiri aplikasi.</p>

<p>Lihat deskripsi <code> jendela-semua-ditutup </ 0>  acara untuk perbedaan antara <code> akan-berhenti </ 0> dan <code> jendela-semua-ditutup </ 0> peristiwa.</p>

<p><strong>Note:</strong> On Windows, this event will not be emitted if the app is closed due
to a shutdown/restart of the system or a user logout.</p>

<h3>Acara : 'berhenti'</h3>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara</li> 

* ` exitCode </ 0> Integer</li>
</ul>

<p>Emitted saat aplikasi berhenti.</p>

<p><strong>Note:</strong> On Windows, this event will not be emitted if the app is closed due
to a shutdown/restart of the system or a user logout.</p>

<h3>Event : 'open-file' <em> macos </ 0></h3>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara
* `path` String</ul> 

Emitted saat pengguna ingin membuka file dengan aplikasi. The ` open-file yang </ 0> 
event biasanya dipancarkan saat aplikasi sudah terbuka dan OS ingin menggunakan kembali aplikasi untuk membuka file. <code> open-file </ 0> juga dipancarkan saat sebuah file diturunkan ke dok dan aplikasi belum berjalan. Pastikan untuk mendengarkan <code> open-file yang </ 0> acara sangat awal di startup aplikasi Anda untuk menangani kasus ini (bahkan sebelum <code> siap </ 0>  acara dipancarkan).</p>

<p>Anda harus menghubungi <code> event .preventDefault () </ 0> jika Anda ingin menangani acara ini .</p>

<p>Pada Windows, Anda harus mengurai <code> process.argv </ 0> (dalam proses utama) untuk mendapatkan filepath.</p>

<h3>Acara: 'buka-url' <em> macos </em></h3>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara</li> 

* ` url </ 0> String</li>
</ul>

<p>Emitted saat pengguna ingin membuka URL dengan aplikasi. Your application's
<code>Info.plist` file must define the URL scheme within the `CFBundleURLTypes` key, and set `NSPrincipalClass` to `AtomApplication`.</p> 
  Anda harus menghubungi ` event .preventDefault () </ 0> jika Anda ingin menangani acara ini .</p>

<h3>Acara: 'aktifkan' <em>macOS</em></h3>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara</li> 
  
  * `hasVisibleWindows` Boolean</ul> 
  
  Emitted saat aplikasi diaktifkan. Berbagai tindakan dapat memicu acara ini, seperti meluncurkan aplikasi untuk pertama kalinya, mencoba meluncurkan ulang aplikasi saat sudah berjalan, atau mengklik ikon dok atau ikon taskbar.
  
  ### Acara: 'lanjutkan aktivitas' *macOS*
  
  Pengembalian:
  
  * `event</ 0> Acara</li>
<li><code>ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
  * `userInfo` unknown - Contains app-specific state stored by the activity on another device.
  
  Emitted selama [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) saat aktivitas dari perangkat lain ingin dilanjutkan. Anda harus menghubungi `event.preventDefault()` jika Anda ingin menangani acara ini.
  
  Aktivitas pengguna hanya dapat dilanjutkan di aplikasi yang memiliki ID Tim pengembang yang sama dengan aplikasi sumber aktivitas dan yang mendukung jenis aktivitas. Jenis aktivitas yang didukung ditentukan di aplikasi `Info.plist` di bawah tombol `NSUserActivityTypes`.
  
  ### Event: 'will-continue-activity' *macOS*
  
  Pengembalian:
  
  * `acara` Acara
  * `ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
  
  Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) before an activity from a different device wants to be resumed. Anda harus menghubungi `event.preventDefault()` jika Anda ingin menangani acara ini.
  
  ### Event: 'continue-activity-error' *macOS*
  
  Pengembalian:
  
  * `acara` Acara
  * `ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
  * `error` String - A string with the error's localized description.
  
  Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) when an activity from a different device fails to be resumed.
  
  ### Event: 'activity-was-continued' *macOS*
  
  Pengembalian:
  
  * `event</ 0> Acara</li>
<li><code>ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
  * `userInfo` unknown - Contains app-specific state stored by the activity.
  
  Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) after an activity from this device was successfully resumed on another one.
  
  ### Event: 'update-activity-state' *macOS*
  
  Pengembalian:
  
  * `acara` Acara
  * `ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
  * `userInfo` unknown - Contains app-specific state stored by the activity.
  
  Emitted when [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) is about to be resumed on another device. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Otherwise, the operation will fail and `continue-activity-error` will be called.
  
  ### Event: 'new-window-for-tab' *macOS*
  
  Pengembalian:
  
  * `event</ 0> Acara</li>
</ul>

<p>Emitted saat pengguna mengklik tombol tab baru macOS asli. Tombol tab baru hanya terlihat jika arus <code>BrowserWindow` memiliki `tabbingIdentifier`</p> 
    ### Acara: 'browser-window-blur'
    
    Pengembalian:
    
    * `event</ 0> Acara</li>
<li><code>window` [BrowserWindow](browser-window.md)
    
    Emitted ketika [browserWindow](browser-window.md) menjadi kabur.
    
    ### Acara: 'browser-window-focus'
    
    Pengembalian:
    
    * `event</ 0> Acara</li>
<li><code>window` [BrowserWindow](browser-window.md)
    
    Emitted ketika [browserWindow](browser-window.md) terpusat.
    
    ### Acara: 'browser-window-created'
    
    Pengembalian:
    
    * `acara` Acara
    * `window` [BrowserWindow](browser-window.md)
    
    Emitted ketika baru [browserWindow](browser-window.md) dibuat.
    
    ### Acara: 'isi web-dibuat'
    
    Pengembalian:
    
    * `event</ 0> Acara</li>
<li><code>webContents` [WebContents](web-contents.md)
    
    Emitted ketika baru [webContents](web-contents.md) dibuat.
    
    ### Acara: 'sertifikat-kesalahan'
    
    Pengembalian:
    
    * `event</ 0> Acara</li>
<li><code>webContents` [WebContents](web-contents.md)
    * ` url </ 0> String</li>
<li><code>error` String - Kode kesalahan
    * `sertifikat` [Sertifikat](structures/certificate.md)
    * `callback` Fungsi 
      * `isTrusted` Boolean - Apakah akan mempertimbangkan sertifikat sebagai terpercaya
    
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
    * `callback` Fungsi 
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
    * `authenticationResponseDetails` Obyek 
      * `url` URL
    * `authInfo` Obyek 
      * ` isProxy </ 0>  Boolean</li>
<li><code>skema` String
      * `host` String
      * `port` Integer
      * `realm` String
    * `callback` Fungsi 
      * `username` String (optional)
      * `password` String (optional)
    
    Emitted ketika `webContents` ingin melakukan auth dasar.
    
    The default behavior is to cancel all authentications. To override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.
    
    ```javascript
    const { app } = require('electron')
    
    app.on('login', (event, webContents, details, authInfo, callback) => {
      event.preventDefault()
      callback('username', 'secret')
    })
    ```
    
    If `callback` is called without a username or password, the authentication request will be cancelled and the authentication error will be returned to the page.
    
    ### Event: 'gpu-info-update'
    
    Emitted whenever there is a GPU info update.
    
    ### Acara: 'proses-gpu-jatuh'
    
    Pengembalian:
    
    * `acara` Acara
    * `terbunuh` Boolean
    
    Emitted when the GPU process crashes or is killed.
    
    ### Event: 'renderer-process-crashed'
    
    Pengembalian:
    
    * `acara` Acara
    * `webContents` [WebContents](web-contents.md)
    * `terbunuh` Boolean
    
    Emitted when the renderer process of `webContents` crashes or is killed.
    
    ### Event: 'aksesibilitas-support-changed' *macOS* *Windows*
    
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
    
    * `pilihan` Objek (opsional) 
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
    
    Di Linux, fokus pada jendela yang pertama terlihat. Di macos, buat aplikasi yang aktif. Pada Windows, fokus pada jendela pertama aplikasi.
    
    ### `app.hide()` *macos*
    
    Menyembunyikan semua jendela aplikasi tanpa meminimalkannya.
    
    ### `app.show()` *macos*
    
    Menunjukkan jendela aplikasi setelah disembunyikan. Tidak secara otomatis memfokuskannya.
    
    ### `app.setAppLogsPath([path])`
    
    * `path` String (optional) - A custom path for your logs. Must be absolute.
    
    Sets or creates a directory your app's logs which can then be manipulated with `app.getPath()` or `app.setPath(pathName, newPath)`.
    
    Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `~/Library/Logs/YourAppName` on *macOS*, and inside the `userData` directory on *Linux* and *Windows*.
    
    ### `app.getAppPath()`
    
    Mengembalikan `String` - Direktori aplikasi saat ini.
    
    ### `app.getPath(nama)`
    
    * `name` String - You can request the following paths by the name: 
      * `home` Direktori home pengguna.
      * `dataaplikasi` Direktori data aplikasi per pengguna, yang secara default menunjuk ke: 
        * `%APPDATA%` di Windows
        * `$XDG_CONFIG_HOME` atau `~/.config` di Linux
        * `~/Library/Application Support` di macos
      * `userData` Direktori untuk menyimpan file konfigurasi aplikasi Anda, yang secara default merupakan direktori `appData` yang ditambahkan dengan nama aplikasi Anda.
      * `cache`
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
    
    Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.
    
    If `app.getPath('logs')` is called without called `app.setAppLogsPath()` being called first, a default log directory will be created equivalent to calling `app.setAppLogsPath()` without a `path` parameter.
    
    ### `app.getFileIcon(path[, options])`
    
    * ` path </ 0>  String</li>
<li><code>pilihan` Objek (opsional) 
      * `ukuran` Deretan 
        * `kecil` - 16x16
        * `normal` - 32x32
        * `besar` - 48x48 di *Linux*, 32x32 pada *Windows*, tidak didukung di *macOS*.
    
    Returns `Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](native-image.md).
    
    Mengambil ikon terkait jalur.
    
    Pada *Windows*, ada 2 macam ikon:
    
    * Ikon terkait dengan ekstensi file tertentu, seperti `.mp3`, `.png`, dll.
    * Ikon di dalam file itu sendiri, seperti `.exe`, `.dll`, `.ico`.
    
    On *Linux* and *macOS*, icons depend on the application associated with file mime type.
    
    ### `app.setPath(nama, path)`
    
    * ` nama </ 0>  String</li>
<li><code> path </ 0>  String</li>
</ul>

<p>Menimpa <code>path` ke direktori khusus atau file yang terkait dengan `nama`. If the path specifies a directory that does not exist, an `Error` is thrown. In that case, the directory should be created with `fs.mkdirSync` or similar.</p> 
      Anda hanya dapat menimpa jalur dari `nama` didefinisikan dalam `app.getPath`.
      
      Secara default, cookie dan cache halaman web akan disimpan di bawah direktori `userData`. Jika Anda ingin mengubah lokasi ini, Anda harus mengganti path `userData` sebelum event `ready` dari modul `app` dipancarkan.
      
      ### `app.getVersion()`
      
      Mengembalikan `String` - Versi aplikasi yang dimuat. Jika tidak ada versi yang ditemukan di file `package.json` aplikasi, versi dari paket saat ini atau yang dapat dijalankan akan dikembalikan.
      
      ### `app.getName()`
      
      Mengembalikan `String` - Nama aplikasi saat ini, yang merupakan nama di file `package.json` aplikasi.
      
      Usually the `name` field of `package.json` is a short lowercase name, according to the npm modules spec. Anda juga harus menentukan bidang `productName`, yang merupakan nama lengkap kapitalisasi aplikasi Anda, dan mana yang lebih disukai dari `nama`oleh Elektron.
      
      **[Tidak berlaku lagi](modernization/property-updates.md)**
      
      ### `app.setName(nama)`
      
      * ` nama </ 0>  String</li>
</ul>

<p>Mengabaikan nama aplikasi saat ini.</p>

<p><strong><a href="modernization/property-updates.md">Tidak berlaku lagi</a></strong></p>

<h3><code>app.getLocale()`</h3> 
        Returns `String` - The current application locale. Possible return values are documented [here](locales.md).
        
        To set the locale, you'll want to use a command line switch at app startup, which may be found [here](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).
        
        **Catatan:** Saat mendistribusikan aplikasi yang dikemas, Anda juga harus mengirimkan map `locales`.
        
        **Note:** On Windows, you have to call it after the `ready` events gets emitted.
        
        ### `app.getLocaleCountryCode()`
        
        Returns `String` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.
        
        **Note:** When unable to detect locale country code, it returns empty string.
        
        ### `app.addRecentDocument(path)` *macOS* *Windows*
        
        * ` path </ 0>  String</li>
</ul>

<p>Menambahkan <code>path` ke daftar dokumen terbaru.</p> 
          This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.
          
          ### `app.clearRecentDocuments()` *macOS* *Windows*
          
          Bersihkan daftar dokumen terakhir.
          
          ### `app.setAsDefaultProtocolClient(protocol[, path, args])`
          
          * `protocol` String - Nama protokol Anda, tanpa `://`. Jika Anda ingin aplikasi Anda menangani tautan `elektron://`, hubungi metode ini dengan `elektron` sebagai parameternya.
          * `path` String (opsional) *Windows* - Default ke `process.execPath`
          * `args` String[] (opsional) *Windows* - Default ke array kosong
          
          Mengembalikan `Boolean` - Apakah panggilan berhasil.
          
          Metode ini menetapkan executable saat ini sebagai pengendali default untuk sebuah protokol (alias skema URI). Ini memungkinkan Anda mengintegrasikan aplikasi Anda lebih dalam ke dalam sistem operasi. Setelah terdaftar, semua link dengan `your-protocol://` akan dibuka dengan executable saat ini. Seluruh link, termasuk protokol, akan diteruskan ke aplikasi Anda sebagai parameter.
          
          On Windows, you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.
          
          **Catatan:** Pada macOS, Anda hanya dapat mendaftarkan protokol yang telah ditambahkan ke aplikasi `info.plist`, yang tidak dapat diubah saat runtime. Namun Anda dapat mengubah file dengan editor teks sederhana atau skrip selama waktu pembuatan. Silahkan lihat [dokumentasi Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) untuk rincian.
          
          **Note:** In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications. In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).
          
          The API menggunakan Windows Registry dan LSSetDefaultHandlerForURLScheme internal.
          
          ### `app.removeAsDefaultProtocolClient(protokol[, path, args])` *macOS* *Windows*
          
          * `protocol` String - Nama protokol Anda, tanpa `://`.
          * `path` String (opsional) *Windows* - Default ke `process.execPath`
          * `args` String[] (opsional) *Windows* - Default ke array kosong
          
          Mengembalikan `Boolean` - Apakah panggilan berhasil.
          
          Metode ini memeriksa apakah saat ini dapat dieksekusi sebagai pengendali default untuk sebuah protokol (alias skema URI). Jika demikian, itu akan menghapus aplikasi sebagai penangan default.
          
          ### `app.isDefaultProtocolClient(protocol[, path, args])`
          
          * `protocol` String - Nama protokol Anda, tanpa `://`.
          * `path` String (opsional) *Windows* - Default ke `process.execPath`
          * `args` String[] (opsional) *Windows* - Default ke array kosong
          
          Mengembalikan `Boolean`
          
          Metode ini memeriksa apakah executable saat ini adalah default handler untuk sebuah protokol (alias skema URI). Jika demikian, itu akan kembali benar. Jika tidak, itu akan kembali salah.
          
          **Catatan:** Pada macOS, Anda dapat menggunakan metode ini untuk memeriksa apakah aplikasi telah terdaftar sebagai pengendali protokol default untuk sebuah protokol. Anda juga dapat memverifikasi ini dengan memeriksa `~/Library/Preferences/com.apple.LaunchServices.plist` pada mesin macOS. Silahkan lihat [dokumentasi Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) untuk rincian.
          
          The API menggunakan Windows Registry dan LSCopyDefaultHandlerForURLScheme internal.
          
          ### `app.setUserTasks(tugas)` *Windows*
          
          * `tugas` [ Tugas[] ](structures/task.md) - Array dari `Tugas` objek
          
          Adds `tasks` to the [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the Jump List on Windows.
          
          `tugas` adalah berbagai dari [`Tugas`](structures/task.md) benda.
          
          Mengembalikan `Boolean` - Apakah panggilan berhasil.
          
          **Catatan:** Jika Anda ingin menyesuaikan Daftar Langsung gunakan lebih banyak lagi `app.setJumpList(categories)`.
          
          ### `app.getJumpListSettings()` *Windows*
          
          Mengembalikan `Objek`:
          
          * `minItems` Integer - The minimum jumlah item yang akan ditampilkan dalam Daftar Langsung (untuk penjelasan lebih rinci tentang nilai ini melihat [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
          * `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. Item ini tidak boleh ditambahkan kembali ke Daftar Langsung di panggilan **berikutnya** ke `app.setJumpList()`, Windows tidak akan menampilkan kategori khusus yang berisi salah satu dari yang dihapus item.
          ### `app.setJumpList(kategori)` *Windows*
          
          * `categories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - Array of `JumpListCategory` objects.
          
          Mengatur atau menghapus Daftar Langsung kustom untuk aplikasi, dan mengembalikan salah satu dari string berikut:
          
          * `ok` - Tidak ada yang salah.
          * `error` - Satu atau beberapa kesalahan terjadi, aktifkan logging runtime untuk mengetahui kemungkinan penyebabnya.
          * `invalidSeparatorError` - Upaya dilakukan untuk menambahkan pemisah ke kategori khusus dalam Daftar Langsung. Pemisah hanya diperbolehkan dalam kategori `Tugas` standar.
          * `fileTypeRegistrationError` - Upaya dilakukan untuk menambahkan tautan file ke Daftar Langsung untuk jenis file yang tidak terdaftar dalam aplikasi.
          * `customCategoryAccessDeniedError` - Kategori khusus tidak dapat ditambahkan ke Daftar Langsung karena pengaturan kebijakan privasi atau grup pengguna.
          
          Jika `kategori` adalah `null` daftar Jump kustom yang telah ditetapkan sebelumnya (jika ada) akan diganti oleh Daftar Langsung standar untuk aplikasi (dikelola oleh Windows).
          
          ** Catatan: </ 0> Jika objek ` JumpListCategory </ 1> tidak memiliki <code> tipe </ 1> atau <code> nama </ 1> 
properti yang ditetapkan maka <code> tipe < / 1> diasumsikan <code> tugas </ 1> . If the <code>name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.</p> 
          
          **Catatan:** Pengguna dapat menghapus item dari kategori khusus, dan Windows tidak mengizinkan item yang dihapus ditambahkan ke dalam kategori khusus sampai **setelah** panggilan sukses berikutnya ke `app.setJumpList(kategori)`. Setiap usaha untuk menambahkan kembali item yang dihapus ke kategori khusus lebih awal dari pada itu akan mengakibatkan keseluruhan kategori khusus dihilangkan dari Daftar Langsung. Daftar item yang dihapus dapat diperoleh dengan menggunakan `app.getJumpListSettings()`.
          
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
          
          The return value of this method indicates whether or not this instance of your application successfully obtained the lock. If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.
          
          I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading. It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.
          
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
          
          This method returns whether or not this instance of your app is currently holding the single instance lock. You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`
          
          ### `app.releaseSingleInstanceLock()`
          
          Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.
          
          ### `app.setUserAktivitas(ketik, userInfo[, webpageURL])` *macOS*
          
          * `ketik` String - Unik mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
          * `userInfo` any - App-specific state to store for use by another device.
          * `webpageURL` String (opsional) - Halaman web dimuat di browser jika tidak ada aplikasi yang sesuai untuk dipasang pada perangkat yang dilanjutkan. Skema ini harus `http` atau `https`.
          
          Membuat `NSUserActivity` dan menetapkannya sebagai aktivitas saat ini. Aktivitas ini memenuhi syarat untuk [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) ke perangkat lain sesudahnya.
          
          ### `app.getCurrentActivityType()` *macOS*
          
          Mengembalikan `String` - Jenis aktivitas yang sedang berjalan.
          
          ### ` app.invalidateCurrentActivity () </ 0>  <em> macos </ 1></h3>

<p>Invalidates the current <a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html">Handoff</a> user activity.</p>

<h3><code> app.resignCurrentActivity () </ 0>  <em> macos </ 1></h3>

<p>Marks the current <a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html">Handoff</a> user activity as inactive without invalidating it.</p>

<h3><code>app.updateCurrentActivity(type, userInfo)` *macOS*
          
          * `ketik` String - Unik mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
          * `userInfo` any - App-specific state to store for use by another device.
          
          Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.
          
          ### `app.setAppUserModelId(id)` *Windows*
          
          * `id` String
          
          Ubah [User ID Model Aplikasi](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) menjadi `id`.
          
          ### `app.importCertificate(options, callback)` *Linux*
          
          * `pilihan` Obyek 
            * `sertifikat` String - Path untuk berkas pkcs12.
            * `kata sandi` String - Passphrase untuk sertifikat.
          * `callback` Fungsi 
            * `hasil` Integer - Hasil impor.
          
          Impor sertifikat dalam format pkcs12 ke toko sertifikat platform. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).
          
          ### `app.disableHardwareAcceleration()`
          
          Nonaktifkan akselerasi perangkat keras untuk aplikasi saat ini.
          
          Metode ini hanya bisa dipanggil sebelum aplikasi sudah siap.
          
          ### `app.disableDomainBlockingFor3DAPIs()`
          
          Secara default, Chromium menonaktifkan API 3D (misalnya WebGL) sampai dimulai ulang per basis domain jika proses GPU mogok terlalu sering. Fungsi ini menonaktifkan perilaku itu.
          
          Metode ini hanya bisa dipanggil sebelum aplikasi sudah siap.
          
          ### `app.getAppMetrics()`
          
          Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and CPU usage statistics of all the processes associated with the app.
          
          ### `app.getGPUFeatureStatus()`
          
          Mengembalikan [`GPUFeatureStatus`](structures/gpu-feature-status.md) - Status Fitur Gambar dari `chrome://gpu/`.
          
          **Note:** This information is only usable after the `gpu-info-update` event is emitted.
          
          ### `app.getGPUInfo(infoType)`
          
          * `infoType` String - Can be `basic` or `complete`.
          
          Returns `Promise<unknown>`
          
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
          
          ### `app.setBadgeCount(count)` *Linux* *macOS*
          
          * `hitung` Integer
          
          Mengembalikan `Boolean` - Apakah panggilan berhasil.
          
          Menetapkan lencana penghitung untuk aplikasi saat ini. Menetapkan hitungan ke `0` akan menyembunyikan lencana.
          
          On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.
          
          **Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).
          
          **[Tidak berlaku lagi](modernization/property-updates.md)**
          
          ### `app.getBadgeCount()` *Linux* *macOS*
          
          Mengembalikan `Integer` - Nilai saat ini ditampilkan di lencana penghitung.
          
          **[Tidak berlaku lagi](modernization/property-updates.md)**
          
          ### `app.isUnityRunning()` *Linux*
          
          Mengembalikan `Boolean` - Apakah lingkungan desktop saat ini adalah Unity launcher.
          
          ### `app.getLoginItemSettings([options])` *macOS* *Windows*
          
          * `pilihan` Objek (opsional) 
            * `path` String (opsional) *Windows* - Jalur yang dapat dieksekusi untuk dibandingkan dengan. Default ke `process.execPath`.
            * `args` String[] (opsional) *Windows* - Argumen baris perintah untuk membandingkan lawan. Default ke array kosong.
          
          If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.
          
          Mengembalikan `Objek`:
          
          * `openAtLogin` Aljabar Boolean - `benar` jika app diatur untuk membuka di login.
          * `openAsHidden` Boolean *macOS* - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
          * `wasOpenedAtLogin` Boolean *macOS* - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
          * `wasOpenedAsHidden` Boolean *macOS* - `true` if the app was opened as a hidden login item. Ini menunjukkan bahwa aplikasi tidak boleh membuka jendela saat startup. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
          * `restoreState` Boolean *macOS* - `true` if the app was opened as a login item that should restore the state from the previous session. Ini menunjukkan bahwa apl harus mengembalikan jendela yang buka terakhir kali aplikasi ditutup. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
          
          ### `app.setLoginItemSettings(pengaturan)` *macOS* *Windows*
          
          * `pengaturan` Obyek 
            * `openAtLogin` Boolean (opsional) - `true` untuk membuka aplikasi saat masuk, `false` untuk menghapus aplikasi sebagai item masuk. Default ke `false`.
            * `openAsHidden` Boolean (optional) *macOS* - `true` to open the app as hidden. Default ke `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
            * `path` String (opsional) *Windows* - Eksekusi untuk diluncurkan saat login. Default ke `process.execPath`.
            * `args` String[] (opsional) *Windows* - Argumen baris perintah untuk lolos ke eksekusi. Default ke array kosong. Berhati-hatilah untuk membungkus jalan dengan tanda petik.
          
          Tetapkan setelan item masuk aplikasi.
          
          Untuk bekerja dengan < AutoUpdater `Elektron` pada Windows, yang menggunakan [Squirrel](https://github.com/Squirrel/Squirrel.Windows), Anda ingin menyetel jalur peluncuran ke Update.exe, dan meneruskan argumen yang menentukan nama aplikasi Anda. Sebagai contoh:
          
          ```javascript
          const appFolder = path.dirname(process.execPath) const updateExe = path.resolve(appFolder, '..', 'Update.exe') const exeName = path.basename(process.execPath) app.setLoginItemSettings ({
             openAtLogin: true,
             path: updateExe,
             args: [
               '--processStart', `"${exeName}"`,
               '--process-start-args', `"--hidden"`
             ]})
          ```
          
          ### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*
          
          Mengembalikan `Boolean` - `true` jika dukungan aksesibilitas Chrome diaktifkan, `salah` sebaliknya. API ini akan mengembalikan `true` jika penggunaan teknologi bantu, seperti pembaca layar, telah terdeteksi. Lihat https://www.chromium.org/developers/design-documents/accessibility untuk lebih jelasnya.
          
          **[Tidak berlaku lagi](modernization/property-updates.md)**
          
          ### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*
          
          * `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering
          
          Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.
          
          This API must be called after the `ready` event is emitted.
          
          **Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.
          
          **[Tidak berlaku lagi](modernization/property-updates.md)**
          
          ### `app.showAboutPanel()` *macOS* *Linux*
          
          Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.
          
          ### `app.setAboutPanelOptions(options)` *macOS* *Linux*
          
          * `pilihan` Obyek 
            * `applicationName` String (opsional) - Nama aplikasi.
            * `applicationVersion` String (opsional) - Versi aplikasi.
            * `hak cipta` String (opsional) - Informasi hak cipta.
            * `version` String (optional) *macOS* - The app's build version number.
            * `credits` String (optional) *macOS* - Credit information.
            * `authors` String[] (optional) *Linux* - List of app authors.
            * `website` String (optional) *Linux* - The app's website.
            * `iconPath` String (optional) *Linux* - Path to the app's icon. Will be shown as 64x64 pixels while retaining aspect ratio.
          
          Tetapkan opsi tentang panel. This will override the values defined in the app's `.plist` file on MacOS. Lihat [dokumentasi Apple](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) untuk detail lebih lanjut. On Linux, values must be set in order to be shown; there are no defaults.
          
          ### `app.isEmojiPanelSupported()`
          
          Returns `Boolean` - whether or not the current OS version allows for native emoji pickers.
          
          ### ` app.showEmojiPanel () </ 0>  <em> macos </ 1>  <em> Windows </ 1></h3>

<p>Show the platform's native emoji picker.</p>

<h3><code>app.startAccessingSecurityScopedResource(bookmarkData)` *mas*
          
          * `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.
          
          Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.
          
          ```js
          // Start accessing the file.
          const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
          // You can now access the file outside of the sandbox 
          stopAccessingSecurityScopedResource()
          ```
          
          Start accessing a security scoped resource. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.
          
          ### `app.enableSandbox()` *Experimental*
          
          Enables full sandbox mode on the app.
          
          Metode ini hanya bisa dipanggil sebelum aplikasi sudah siap.
          
          ### ` app.isInApplicationsFolder () </ 0>  <em> macos </ 1></h3>

<p>Returns <code>Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`</p> 
          
          ### `app.moveToApplicationsFolder([options])` *macOS*
          
          * `pilihan` Objek (opsional) 
            * `conflictHandler` Fungsi<boolean> (optional) - A handler for potential conflict in move failure. 
              * `conflictType` String - The type of move conflict encountered by the handler; can be `exists` or `existsAndRunning`, where `exists` means that an app of the same name is present in the Applications directory and `existsAndRunning` means both that it exists and that it's presently running.
          
          Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.
          
          No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.
          
          **NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong.
          
          By default, if an app of the same name as the one being moved exists in the Applications directory and is *not* running, the existing app will be trashed and the active app moved into its place. If it *is* running, the pre-existing running app will assume focus and the the previously active app will quit itself. This behavior can be changed by providing the optional conflict handler, where the boolean returned by the handler determines whether or not the move conflict is resolved with default behavior. i.e. returning `false` will ensure no further action is taken, returning `true` will result in the default behavior and the method continuing.
          
          Sebagai contoh:
          
          ```js
          app.moveToApplicationsFolder({
            conflictHandler: (conflictType) => {
              if (conflictType === 'exists') {
                return dialog.showMessageBoxSync({
                  type: 'question',
                  buttons: ['Halt Move', 'Continue Move'],
                  defaultId: 0,
                  message: 'An app of this name already exists'
                }) === 1
              }
            }
          })
          ```
          
          Would mean that if an app already exists in the user directory, if the user chooses to 'Continue Move' then the function would continue with its default behavior and the existing app will be trashed and the active app moved into its place.
          
          ## properti
          
          ### `app.accessibilitySupportEnabled` *macOS* *Windows*
          
          A `Boolean` property that's `true` if Chrome's accessibility support is enabled, `false` otherwise. This property will be `true` if the use of assistive technologies, such as screen readers, has been detected. Setting this property to `true` manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.
          
          See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.
          
          This API must be called after the `ready` event is emitted.
          
          **Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.
          
          ### `app.applicationMenu`
          
          A `Menu | null` property that returns [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.
          
          ### `app.badgeCount` *Linux* *macOS*
          
          An `Integer` property that returns the badge count for current app. Setting the count to `0` will hide the badge.
          
          On macOS, setting this with any nonzero integer shows on the dock icon. On Linux, this property only works for Unity launcher.
          
          **Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).
          
          ### `app.commandLine` *Readonly*
          
          A [`CommandLine`](./command-line.md) object that allows you to read and manipulate the command line arguments that Chromium uses.
          
          ### `app.dock` *macOS* *Readonly*
          
          A [`Dock`](./dock.md) object that allows you to perform actions on your app icon in the user's dock on macOS.
          
          ### `app.isPackaged` *Readonly*
          
          A `Boolean` property that returns `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.
          
          ### `app.name`
          
          A `String` property that indicates the current application's name, which is the name in the application's `package.json` file.
          
          Usually the `name` field of `package.json` is a short lowercase name, according to the npm modules spec. Anda juga harus menentukan bidang `productName`, yang merupakan nama lengkap kapitalisasi aplikasi Anda, dan mana yang lebih disukai dari `nama`oleh Elektron.
          
          ### `app.userAgentFallback`
          
          A `String` which is the user agent string Electron will use as a global fallback.
          
          This is the user agent that will be used when no user agent is set at the `webContents` or `session` level. It is useful for ensuring that your entire app has the same user agent. Set to a custom value as early as possible in your app's initialization to ensure that your overridden value is used.
          
          ### `app.allowRendererProcessReuse`
          
          A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation. The current default value for this property is `false`.
          
          The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed. This property impacts which native modules you can use in the renderer process. For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).