# aplikasi

> Kendalikan siklus hidup kejadian aplikasi Anda.

Proses: [Main](../glossary.md#main-process)

Contoh berikut ini menunjukkan bagaimana untuk keluar dari aplikasi ketika jendela terakhir ditutup:

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Kejadian

Objek `aplikasi` memancarkan kejadian-kejadian berikut:

### Kejadian: 'will-finish-launching'

Dipancarkan saat aplikasi telah menyelesaikan proses awal mula dasar. Pada Windows dan Linux, kejadian `will-finish-launching` sama dengan kejadian `ready`; di macOS, kejadian ini mewakili pemberitahuan `applicationWillFinishLaunching` dari `NSApplication`. Anda biasanya akan menyiapkan pendengar untuk kejadian `open-file` dan `open-url` di sini, dan memulai pelapor crash dan pemutakhir otomatis.

Dalam kebanyakan kasus, Anda mestinya hanya melakukan semuanya dalam pemroses kejadian `ready`.

### Kejadian: 'ready'

Mengembalikan:

* `launchInfo` Object *macOS*

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

Emitted sebelum aplikasi mulai menutup jendela-jendelanya. Memanggil ` event.preventDefault () </ 0> akan mencegah perilaku default, yang mengakhiri aplikasi.</p>

<p><strong> Catatan: </ 0> Jika aplikasi berhenti diprakarsai oleh <code> autoUpdater.quitAndInstall () </ 1> 
lalu <code> sebelum-berhenti </ 1> dipancarkan <em> setelah </ 2> memancarkan < 1> dekat </ 1>  acara pada semua jendela dan menutup mereka.</p>

<h3>Acara : 'akan-berhenti'</h3>

<p>Pengembalian:</p>

<ul>
<li><code>peristiwa` Peristiwa</li> </ul> 

Emitted ketika semua jendela telah ditutup dan aplikasi akan berhenti. Memanggil ` event.preventDefault () </ 0> akan mencegah perilaku default, yang mengakhiri aplikasi.</p>

<p>Lihat deskripsi <code> jendela-semua-ditutup </ 0>  acara untuk perbedaan antara <code> akan-berhenti </ 0> dan <code> jendela-semua-ditutup </ 0> peristiwa.</p>

<h3>Acara : 'berhenti'</h3>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara</li> 

* ` exitCode </ 0> Integer</li>
</ul>

<p>Emitted saat aplikasi berhenti.</p>

<h3>Event : 'open-file' <em> macos </ 0></h3>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara
* `path` String</ul> 

Emitted saat pengguna ingin membuka file dengan aplikasi. The ` open-file yang </ 0> 
event biasanya dipancarkan saat aplikasi sudah terbuka dan OS ingin menggunakan kembali aplikasi untuk membuka file. <code> open-file </ 0> juga dipancarkan saat sebuah file diturunkan ke dok dan aplikasi belum berjalan. Pastikan untuk mendengarkan <code> open-file yang </ 0> acara sangat awal di startup aplikasi Anda untuk menangani kasus ini (bahkan sebelum <code> siap </ 0>  acara dipancarkan).</p>

<p>Anda harus menghubungi <code>event.preventDefault()` jika Anda ingin menangani acara ini.

Pada Windows, Anda harus mengurai ` process.argv </ 0> (dalam proses utama) untuk mendapatkan filepath.</p>

<h3>Acara: 'buka-url' <em> macos </em></h3>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara</li> 

* ` url </ 0> String</li>
</ul>

<p>Emitted saat pengguna ingin membuka URL dengan aplikasi. File <code> Info.plist <code> aplikasi Anda
 harus menentukan skema url di dalam kunci <code> CFBundleURLTypes `, dan set ` NSPrincipalClass ` ke <0> AtomApplication </code>.</p> 
  Anda harus menghubungi `event.preventDefault()` jika Anda ingin menangani acara ini.
  
  ### Acara: 'aktifkan' *macOS*
  
  Pengembalian:
  
  * `acara` Acara
  * `hasVisibleWindows` Boolean
  
  Emitted saat aplikasi diaktifkan. Berbagai tindakan dapat memicu acara ini, seperti meluncurkan aplikasi untuk pertama kalinya, mencoba meluncurkan ulang aplikasi saat sudah berjalan, atau mengklik ikon dok atau ikon taskbar.
  
  ### Acara: 'lanjutkan aktivitas' *macOS*
  
  Pengembalian:
  
  * `event</ 0> Acara</li>
<li><code>ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
  * `userInfo` Objek - Berisi status spesifik aplikasi yang disimpan oleh aktivitas di perangkat lain.
  
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
  * `userInfo` Object - Contains app-specific state stored by the activity.
  
  Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) after an activity from this device was successfully resumed on another one.
  
  ### Event: 'update-activity-state' *macOS*
  
  Pengembalian:
  
  * `acara` Acara
  * `ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
  * `userInfo` Object - Contains app-specific state stored by the activity.
  
  Emitted when [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) is about to be resumed on another device. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Otherwise the operation will fail and `continue-activity-error` will be called.
  
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
    * `url` String
    * `error` String - Kode kesalahan
    * `sertifikat` [Sertifikat](structures/certificate.md)
    * `callback` Fungsi 
      * `isTrusted` Boolean - Apakah akan mempertimbangkan sertifikat sebagai terpercaya
    
    Emitted ketika gagal untuk memverifikasi `certificate` untuk `url`, untuk mempercayai sertifikat Anda harus mencegah perilaku default dengan `event.preventDefault ()` dan memanggil `callback(true)`.
    
    ```javascript
const {app} = require ('electron') app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
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
const {app} = require('electron') app.on('select-client-certificate', (event, webContents, url, list, callback) => {
 event.preventDefault()
 callback(daftar[0]) 
})    
```

### Acara: 'login'

Pengembalian:

* `acara` Acara
* `webContents` [WebContents](web-contents.md)
* `permintaan` Obyek 
  * `method` String
  * `url` URL
  * `perujuk` URL
* `authInfo` Obyek 
  * ` isProxy </ 0>  Boolean</li>
<li><code>skema` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Fungsi 
  * `namapengguna` String
  * `katasandi` String

Emitted ketika `webContents` ingin melakukan auth dasar.

Perilaku default adalah membatalkan semua otentikasi, untuk menimpa ini Anda harus mencegah perilaku default dengan `event.preventDefault()` dan panggil `callback(nama pengguna, kata sandi)` dengan kredensial.

```javascript
const {app} = require('electron') app.on('login', (event, webContents, request, authInfo, callback) => {
 event.preventDefault()
 callback('username', 'secret')
})
```

### Acara: 'proses-gpu-jatuh'

Pengembalian:

* `acara` Acara
* `terbunuh` Boolean

Emitted saat proses gpu macet atau terbunuh.

### Event: 'aksesibilitas-support-changed' *macOS* *Windows*

Pengembalian:

* `acara` Acara
* `aksesibilitasSupportEnabled` Boolean - `true` saat dukungan aksesibilitas Chrome diaktifkan, `false` sebaliknya.

Emitted saat dukungan aksesibilitas Chrome berubah. Peristiwa ini terjadi saat teknologi bantu, seperti pembaca layar, diaktifkan atau dinonaktifkan. Lihat https://www.chromium.org/developers/design-documents/accessibility untuk lebih jelasnya.

## Metode

The `aplikasi` objek memiliki metode berikut:

**Catatan:** Beberapa metode hanya tersedia pada sistem operasi tertentu dan diberi label seperti itu.

### `app.quit()`

Cobalah untuk menutup semua jendela. The `sebelum-berhenti` acara akan dipancarkan pertama. Jika semua jendela berhasil ditutup, `akan-berhenti` acara akan dipancarkan dan secara default aplikasi akan mengakhiri.

Metode ini menjamin bahwa semua `beforeunload` dan `unload` event handlers dijalankan dengan benar. Ada kemungkinan bahwa sebuah jendela membatalkan berhenti dengan mengembalikan `false` pada pengendali event *Beforeunload</code>.</p> 

### `app.exit([exitCode])`

* `exitCode` Integer (opsional)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

Semua jendela akan ditutup segera tanpa meminta pengguna dan `sebelum-berhenti` dan `akan-berhenti` tidak akan dipancarkan.

### `app.relaunch([options])`

* `pilihan` Objek (opsional) 
  * `args` String[] (optional)
  * `execPath` String (opsional)

Luncurkan ulang aplikasi saat instance saat ini keluar.

Secara default, contoh baru akan menggunakan direktori kerja dan argumen baris perintah yang sama dengan instance saat ini. Bila `args` ditentukan, `args` akan dilewatkan sebagai argumen baris perintah. Ketika `execPath` dispesifikasikan, `execPath` akan dieksekusi untuk diluncurkan kembali alih-alih aplikasi saat ini.

Perhatikan bahwa metode ini tidak berhenti dari aplikasi saat dijalankan, Anda harus memanggil `app.quit` atau `app.exit` setelah memanggil `app.relaunch` ke buat aplikasi restart.

Saat `app.relaunch` dipanggil berkali-kali, beberapa contoh akan dimulai setelah instance saat ini keluar.

Contoh untuk me-restart instance saat ini segera dan menambahkan argumen baris perintah baru ke instance baru:

```javascript
const {app} = require ('electron') app.relaunch({args: process.argv.slice(1).concat(['-- relaunch'])}) app.exit(0)
```

### `app.isReady()`

Mengembalikan `Boolean` - `true` jika Elektron selesai menginisialisasi, `false` sebaliknya.

### `app.focus()`

Di Linux, fokus pada jendela yang pertama terlihat. Di macos, buat aplikasi yang aktif. Pada Windows, fokus pada jendela pertama aplikasi.

### `app.hide()` *macos*

Menyembunyikan semua jendela aplikasi tanpa meminimalkannya.

### `app.show()` *macos*

Menunjukkan jendela aplikasi setelah disembunyikan. Tidak secara otomatis memfokuskannya.

### `app.getAppPath()`

Mengembalikan `String` - Direktori aplikasi saat ini.

### `app.getPath(nama)`

* `nama` String

Mengembalikan `String` - Path ke direktori khusus atau file yang terkait dengan `nama`. Pada kegagalan sebuah `Error` dilempar.

Anda dapat meminta jalur berikut dengan nama:

* `home` Direktori home pengguna.
* `dataaplikasi` Direktori data aplikasi per pengguna, yang secara default menunjuk ke: 
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

* `path` String
* `pilihan` Objek (opsional) 
  * `ukuran` Deretan 
    * `kecil` - 16x16
    * `normal` - 32x32
    * `besar` - 48x48 di *Linux*, 32x32 pada *Windows*, tidak didukung di *macOS*.
* `callback` Fungsi 
  * Kesalahan `kesalahan`
  * `ikon` [NativeImage](native-image.md)

Mengambil ikon terkait jalur.

Pada *Windows*, ada 2 macam ikon:

* Ikon terkait dengan ekstensi file tertentu, seperti `.mp3`, `.png`, dll.
* Ikon di dalam file itu sendiri, seperti `.exe`, `.dll`, `.ico`.

Pada *Linux* dan *macOS*, ikon bergantung pada aplikasi yang terkait dengan jenis file mime.

### `app.setPath(nama, path)`

* ` nama </ 0>  String</li>
<li><code> path </ 0>  String</li>
</ul>

<p>Menimpa <code>path` ke direktori khusus atau file yang terkait dengan `nama`. Jika path menentukan direktori yang tidak ada, direktori akan dibuat dengan metode ini. Pada kegagalan sebuah `Error` dilempar.</p> 
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

<p>Mengabaikan nama aplikasi saat ini.</p>

<h3><code>app.getLocale()`</h3> 
    Mengembalikan `String` - Lokal aplikasi saat ini. Nilai pengembalian yang mungkin didokumentasikan [di sini](locales.md).
    
    **Catatan:** Saat mendistribusikan aplikasi yang dikemas, Anda juga harus mengirimkan map `locales`.
    
    **Catatan:** Pada Windows Anda harus meneleponnya setelah `ready` dipancarkan.
    
    ### `app.addRecentDocument(path)` *macOS* *Windows*
    
    * ` path </ 0>  String</li>
</ul>

<p>Menambahkan <code>path` ke daftar dokumen terbaru.</p> 
      Daftar ini dikelola oleh OS. Pada Windows Anda bisa mengunjungi daftar dari task bar, dan di macos Anda bisa mengunjunginya dari menu dock.
      
      ### `app.clearRecentDocuments()` *macOS* *Windows*
      
      Bersihkan daftar dokumen terakhir.
      
      ### `app.setAsDefaultProtocolClient(protocol[, path, args])`
      
      * `protocol` String - Nama protokol Anda, tanpa `://`. Jika Anda ingin aplikasi Anda menangani tautan `elektron://`, hubungi metode ini dengan `elektron` sebagai parameternya.
      * `path` String (opsional) *Windows* - Default ke `process.execPath`
      * `args` String[] (opsional) *Windows* - Default ke array kosong
      
      Mengembalikan `Boolean` - Apakah panggilan berhasil.
      
      Metode ini menetapkan executable saat ini sebagai pengendali default untuk sebuah protokol (alias skema URI). Ini memungkinkan Anda mengintegrasikan aplikasi Anda lebih dalam ke dalam sistem operasi. Setelah terdaftar, semua link dengan `your-protocol://` akan dibuka dengan executable saat ini. Seluruh link, termasuk protokol, akan diteruskan ke aplikasi Anda sebagai parameter.
      
      Pada Windows Anda dapat menyediakan jalur parameter opsional, jalur ke executable Anda, dan args, serangkaian argumen yang akan dikirimkan ke executable Anda saat diluncurkan.
      
      **Catatan:** Pada macOS, Anda hanya dapat mendaftarkan protokol yang telah ditambahkan ke aplikasi `info.plist`, yang tidak dapat diubah saat runtime. Namun Anda dapat mengubah file dengan editor teks sederhana atau skrip selama waktu pembuatan. Silahkan lihat [dokumentasi Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) untuk rincian.
      
      The API menggunakan Windows Registry dan LSSetDefaultHandlerForURLScheme internal.
      
      ### `app.removeAsDefaultProtocolClient(protokol[, path, args])` *macOS* *Windows*
      
      * `protocol` String - Nama protokol Anda, tanpa `://`.
      * `path` String (opsional) *Windows* - Default ke `process.execPath`
      * `args` String[] (opsional) *Windows* - Default ke array kosong
      
      Mengembalikan `Boolean` - Apakah panggilan berhasil.
      
      Metode ini memeriksa apakah saat ini dapat dieksekusi sebagai pengendali default untuk sebuah protokol (alias skema URI). Jika demikian, itu akan menghapus aplikasi sebagai penangan default.
      
      ### `app.isDefaultProtocolClient(protokol[, path, args])` *macOS* *Windows*
      
      * `protocol` String - Nama protokol Anda, tanpa `://`.
      * `path` String (opsional) *Windows* - Default ke `process.execPath`
      * `args` String[] (opsional) *Windows* - Default ke array kosong
      
      Mengembalikan `Boolean`
      
      Metode ini memeriksa apakah executable saat ini adalah default handler untuk sebuah protokol (alias skema URI). Jika demikian, itu akan kembali benar. Jika tidak, itu akan kembali salah.
      
      **Catatan:** Pada macOS, Anda dapat menggunakan metode ini untuk memeriksa apakah aplikasi telah terdaftar sebagai pengendali protokol default untuk sebuah protokol. Anda juga dapat memverifikasi ini dengan memeriksa `~/Library/Preferences/com.apple.LaunchServices.plist` pada mesin macOS. Silahkan lihat [dokumentasi Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) untuk rincian.
      
      The API menggunakan Windows Registry dan LSCopyDefaultHandlerForURLScheme internal.
      
      ### `app.setUserTasks(tugas)` *Windows*
      
      * `tugas` [ Tugas[] ](structures/task.md) - Array dari `Tugas` objek
      
      Tambahkan `tugas` ke kategori [Tugas](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) JumpList di Windows.
      
      `tugas` adalah berbagai dari [`Tugas`](structures/task.md) benda.
      
      Mengembalikan `Boolean` - Apakah panggilan berhasil.
      
      **Catatan:** Jika Anda ingin menyesuaikan Daftar Langsung gunakan lebih banyak lagi `app.setJumpList(categories)`.
      
      ### `app.getJumpListSettings()` *Windows*
      
      Mengembalikan `Objek`:
      
      * `minItems` Integer - The minimum jumlah item yang akan ditampilkan dalam Daftar Langsung (untuk penjelasan lebih rinci tentang nilai ini melihat [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
      * `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array dari `JumpListItem` objek yang sesuai dengan item yang telah dihapus pengguna dari kategori khusus dalam Daftar Langsung. Item ini tidak boleh ditambahkan kembali ke Daftar Langsung di panggilan **berikutnya** ke `app.setJumpList()`, Windows tidak akan menampilkan kategori khusus yang berisi salah satu dari yang dihapus item.
      ### `app.setJumpList(kategori)` *Windows*
      
      * `kategori` [JumpListCategory[]](structures/jump-list-category.md) atau `nol` - Array of `JumpListCategory` benda.
      
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
const {app} = require ('electron') app.setJumpList([
   {
     type: 'custom',
     name: 'Proyek Terbaru',
     item: [
       {type: 'file', path: 'C:\\Projects\\project1.proj '},
       {type:' file ', path: 'C:\\Projects\\project2.proj '}
     ]
   },
   { // memiliki nama jadi `type` diasumsikan sebagai nama "custom"
 : 'Tools',
     item: [
       {
         type: 'task',
         title: 'Tool A',
         program: process.execPath,
         args: '--run-tool-a',
         icon: process.execPath,
         iconIndex: 0,
         deskripsi : 'Runs Tool A'
       },
       {
         type: 'task',
        judul: 'Alat B',
         program: process.execPath,
        args: '--run-tool-b',
         icon: process.execPath,
         iconIndex: 0,
         description: 'Runs Tool B'
       }
     ]
   },
 {type: 'frequent' },
 {// tidak memiliki nama dan tipe tidak ada Jadi `tipe` diasumsikan sebagai item "tugas": [
{
 type: 'task',
 title: 'New Project',
 program: process.execPath,
 args: '--new-project',
 deskripsi: 'Buat yang baru proyek.'
},
 {type: 'separator' },
{
 type: 'task',
 title: 'Recover Project',
 program: process.execPath,
 args: '--recover-project',
 deskripsi: 'Recover Project'
}
]
}
])
```
  
  ### `app.makeSingleInstance(callback)`
  
  * `callback` Fungsi 
    * `argv` String[] - Sebuah array dari argumen baris perintah kedua
    * `workingDirectory` String - Direktori kerja contoh kedua
  
  Mengembalikan `Boolean`.
  
  Metode ini membuat aplikasi Anda menjadi Aplikasi Instan Tunggal - alih-alih membiarkan beberapa contoh aplikasi Anda berjalan, ini akan memastikan bahwa hanya satu contoh aplikasi Anda yang berjalan, dan contoh lainnya memberi isyarat contoh ini dan keluar.
  
  `callback` akan dipanggil oleh instance pertama dengan `callback(argv, workingDirectory)` ketika instance kedua telah dieksekusi. `argv` adalah argumen argumen baris kedua dari Array, dan `workingDirectory` adalah direktori kerja saat ini. Biasanya aplikasi merespon hal ini dengan membuat jendela utama mereka fokus dan tidak diminimalisir.
  
  The `callback` dijamin akan dieksekusi setelah `siap` acara dari `aplikasi` akan dipancarkan.
  
  Metode ini mengembalikan `false` jika proses Anda adalah contoh utama aplikasi dan aplikasi Anda harus terus dimuat. Dan mengembalikan `true` jika proses Anda telah mengirimkan parameternya ke instance lain, dan Anda harus segera berhenti.
  
  Pada macOS sistem memberlakukan instance tunggal secara otomatis saat pengguna mencoba membuka instance kedua aplikasi Anda di Finder, dan acara `open-file` dan `open-url` akan dipancarkan untuk bahwa. Namun saat pengguna memulai aplikasi Anda di jalur perintah mekanisme contoh tunggal sistem akan dilewati dan Anda harus menggunakan metode ini untuk memastikan satu contoh.
  
  Contoh mengaktifkan jendela contoh utama saat instance kedua dimulai:
  
  ```javascript
const {app} = require('electron') biarkan myWindow = null const isSecondInstance = app.makeSingleInstance ((commandLine, workingDirectory) => {
   // Seseorang mencoba untuk menjalankan instance kedua, kita harus memusatkan jendela kita.
  jika (myWindow) {
     if (myWindow.isMinimized()) myWindow.restore()
     myWindow.focus()
   }}) if (isSecondInstance) {
   app.quit()} // buat myWindow, muat sisa aplikasi, dll...
app.on('siap', () => {})
```

### `app.releaseSingleInstance()`

Rilis semua kunci yang diciptakan oleh `makeSingleInstance`. Ini akan memungkinkan beberapa contoh aplikasi sekali lagi berjalan berdampingan.

### `app.setUserAktivitas(ketik, userInfo[, webpageURL])` *macOS*

* `ketik` String - Unik mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Objek - Negara khusus aplikasi untuk disimpan untuk digunakan oleh perangkat lain.
* `webpageURL` String (opsional) - Halaman web dimuat di browser jika tidak ada aplikasi yang sesuai untuk dipasang pada perangkat yang dilanjutkan. Skema ini harus `http` atau `https`.

Membuat `NSUserActivity` dan menetapkannya sebagai aktivitas saat ini. Aktivitas ini memenuhi syarat untuk [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) ke perangkat lain sesudahnya.

### `app.getCurrentActivityType()` *macOS*

Mengembalikan `String` - Jenis aktivitas yang sedang berjalan.

### `app.invalidateCurrentActivity()` *macOS*

* `ketik` String - Unik mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `ketik` String - Unik mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Objek - Negara khusus aplikasi untuk disimpan untuk digunakan oleh perangkat lain.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Ubah [User ID Model Aplikasi](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) menjadi `id`.

### `app.importCertificate(opsi, callback)` *LINUX*

* `pilihan` Obyek 
  * `sertifikat` String - Path untuk berkas pkcs12.
  * `kata sandi` String - Passphrase untuk sertifikat.
* `callback` Fungsi 
  * `hasil` Integer - Hasil impor.

Impor sertifikat dalam format pkcs12 ke toko sertifikat platform. `callback` dipanggil dengan `hasil` dari operasi impor, nilai `` menunjukkan keberhasilan sementara nilai lainnya mengindikasikan kegagalan menurut kromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Nonaktifkan akselerasi perangkat keras untuk aplikasi saat ini.

Metode ini hanya bisa dipanggil sebelum aplikasi sudah siap.

### `app.disableDomainBlockingFor3DAPIs()`

Secara default, Chromium menonaktifkan API 3D (misalnya WebGL) sampai dimulai ulang per basis domain jika proses GPU mogok terlalu sering. Fungsi ini menonaktifkan perilaku itu.

Metode ini hanya bisa dipanggil sebelum aplikasi sudah siap.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Mengembalikan [`GPUFeatureStatus`](structures/gpu-feature-status.md) - Status Fitur Gambar dari `chrome://gpu/`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `hitung` Integer

Mengembalikan `Boolean` - Apakah panggilan berhasil.

Menetapkan lencana penghitung untuk aplikasi saat ini. Menetapkan hitungan ke `` akan menyembunyikan lencana.

Di macOS itu terlihat di ikon dermaga. Di Linux hanya bekerja untuk Unity launcher,

**Note:** Unity launcher mensyaratkan adanya a `.desktop` file untuk bekerja, untuk informasi lebih lanjut silahkan baca [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).

### `app.getBadgeCount()` *Linux* *macOS*

Mengembalikan `Integer` - Nilai saat ini ditampilkan di lencana penghitung.

### `app.isUnityRunning()` *Linux*

Mengembalikan `Boolean` - Apakah lingkungan desktop saat ini adalah Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `pilihan` Objek (opsional) 
  * `path` String (opsional) *Windows* - Jalur yang dapat dieksekusi untuk dibandingkan dengan. Default ke `process.execPath`.
  * `args` String[] (opsional) *Windows* - Argumen baris perintah untuk membandingkan lawan. Default ke array kosong.

Jika Anda memberikan `path` dan `args` pilihan untuk `app.setLoginItemSettings` maka Anda harus melewati argumen yang sama di sini untuk `openAtLogin` untuk diatur dengan benar.

Mengembalikan `Objek`:

* `openAtLogin` Aljabar Boolean - `benar` jika app diatur untuk membuka di login.
* `openAsHidden` Boolean *macOS* - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` if the app was opened as a hidden login item. Ini menunjukkan bahwa aplikasi tidak boleh membuka jendela saat startup. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` if the app was opened as a login item that should restore the state from the previous session. Ini menunjukkan bahwa apl harus mengembalikan jendela yang buka terakhir kali aplikasi ditutup. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(pengaturan)` *macOS* *Windows*

* `pengaturan` Obyek 
  * `openAtLogin` Boolean (opsional) - `true` untuk membuka aplikasi saat masuk, `false` untuk menghapus aplikasi sebagai item masuk. Default ke `false`.
  * `openAsHidden` Boolean (optional) *macOS* - `true` to open the app as hidden. Default ke `false`. Pengguna dapat mengedit setelan ini dari Preferensi Sistem jadi `app.getLoginItemStatus().BeenOpenedAsHidden` harus diperiksa saat aplikasi dibuka untuk mengetahui nilai saat ini. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
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

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. https://www.chromium.org/developers/design-documents/accessibility for more details. Disabled by default.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.setAboutPanelOptions(opsi)` *macOS*

* `pilihan` Obyek 
  * `applicationName` String (opsional) - Nama aplikasi.
  * `applicationVersion` String (opsional) - Versi aplikasi.
  * `hak cipta` String (opsional) - Informasi hak cipta.
  * `kredit` String (opsional) - Informasi kredit.
  * `version` String (opsional) - Nomor versi pembuatan aplikasi.

Tetapkan opsi tentang panel. Ini akan menimpa nilai yang didefinisikan di file `.plist` aplikasi. Lihat [dokumentasi Apple](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) untuk detail lebih lanjut.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *macOS (mas)*

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Start accessing the file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.commandLine.appendSwitch(beralih [, nilai])`

* `switch` String - Sakelar baris perintah
* `value` String (opsional) - Nilai untuk saklar yang diberikan

Tambahkan peralihan (dengan `nilai opsional`) ke baris perintah Chromium.

**Catatan:** Ini tidak akan mempengaruhi `process.argv`, dan terutama digunakan oleh pengembang untuk mengontrol perilaku Kromium beberapa tingkat rendah.

### `app.commandLine.appendArgument(nilai)`

* `nilai` String - argumen untuk menambahkan ke baris perintah

Tambahkan argumen ke baris perintah Chromium. Argumen akan dikutip dengan benar.

**Catatan:** Ini tidak akan mempengaruhi `process.argv`.

### `app.enableMixedSandbox()` *macOS* *Windows*

Mengaktifkan mode kotak pasir campuran di aplikasi.

Metode ini hanya bisa dipanggil sebelum aplikasi sudah siap.

### `app.isInApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful your application will quit and relaunch.

No confirmation dialog will be presented by default, if you wish to allow the user to confirm the operation you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog this method returns false. If we fail to perform the copy then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce()` *macOS*

* `jenis` String (opsional) - dapat `kritis` atau `informasi`. Default adalah `informasi`

Ketika `kritis` dilewatkan, ikon dermaga akan terpental sampai aplikasi menjadi aktif atau permintaan dibatalkan.

Ketika `informasi` dilewatkan, ikon dermaga akan bangkit untuk satu detik. Namun, permintaan tetap aktif sampai aplikasi menjadi aktif atau permintaan dibatalkan.

Mengembalikan `Integer` ID yang mewakili permintaan.

### `app.dock.cancelBounce(id)` Linux *macOS*

* `identitas` Integer

Membatalkan bouncing `id`.

### `app.dock.downloadFinished(filePath)` *Windows*

* `fullPath` String

Memantapkan Download stack jika filePath ada di dalam folder Downloads.

### `app.dock.setBadge (teks)` *macOS*

* `teks` String

Menetapkan string yang akan ditampilkan di area badging dermaga.

### `app.dock.getBadge()` *macos*

Mengembalikan `String` - String badge dari dok.

### `app.dock.hide()` *macOS*

Sembunyikan ikon dok.

### `app.dock.show()` *macos*

Tampilkan ikon dok.

### `app.dock.isVisible()` *macos*

Mengembalikan `Boolean` - Apakah ikon dermaga terlihat. Panggilan `app.dock.show()` bersifat asinkron sehingga metode ini mungkin tidak kembali benar segera setelah panggilan itu.

### `app.dock.setMenu(menu)` *macos*

* `menu` [Menu](menu.md)

Mengatur aplikasi [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103).

### `app.dock.setIcon(gambar)` *macOS*

* `gambar` ([NativeImage](native-image.md) | String)

Menetapkan `gambar` yang terkait dengan ikon dermaga ini.