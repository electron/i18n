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
          
          * `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
          * `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.
          ### `app.setJumpList(categories)` *Windows*
          
          * `categories` [JumpListCategory[]](structures/jump-list-category.md) or `null` - Array of `JumpListCategory` objects.
          
          Sets or removes a custom Jump List for the application, and returns one of the following strings:
          
          * `ok` - Nothing went wrong.
          * `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
          * `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
          * `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
          * `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.
          
          If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).
          
          ** Catatan: </ 0> Jika objek ` JumpListCategory </ 1> tidak memiliki <code> tipe </ 1> atau <code> nama </ 1> 
properti yang ditetapkan maka <code> tipe < / 1> diasumsikan <code> tugas </ 1> . If the <code>name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.</p> 
          
          **Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.
          
          Here's a very simple example of creating a custom Jump List:
          
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
            * `argv` String[] - An array of the second instance's command line arguments
            * `workingDirectory` String - The second instance's working directory
          
          Returns `Boolean`.
          
          This method makes your application a Single Instance Application - instead of allowing multiple instances of your app to run, this will ensure that only a single instance of your app is running, and other instances signal this instance and exit.
          
          `callback` will be called by the first instance with `callback(argv, workingDirectory)` when a second instance has been executed. `argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.
          
          The `callback` is guaranteed to be executed after the `ready` event of `app` gets emitted.
          
          This method returns `false` if your process is the primary instance of the application and your app should continue loading. And returns `true` if your process has sent its parameters to another instance, and you should immediately quit.
          
          On macOS the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line the system's single instance mechanism will be bypassed and you have to use this method to ensure single instance.
          
          An example of activating the window of primary instance when a second instance starts:
          
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
          
          Releases all locks that were created by `makeSingleInstance`. This will allow multiple instances of the application to once again run side by side.
          
          ### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*
          
          * `type` String - Uniquely identifies the activity. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
          * `userInfo` Object - App-specific state to store for use by another device.
          * `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.
          
          Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.
          
          ### `app.getCurrentActivityType()` *macOS*
          
          Returns `String` - The type of the currently running activity.
          
          ### `app.invalidateCurrentActivity()` *macOS*
          
          * `type` String - Uniquely identifies the activity. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
          
          Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.
          
          ### `app.updateCurrentActivity(type, userInfo)` *macOS*
          
          * `type` String - Uniquely identifies the activity. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
          * `userInfo` Object - App-specific state to store for use by another device.
          
          Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.
          
          ### `app.setAppUserModelId(id)` *Windows*
          
          * `id` String
          
          Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.
          
          ### `app.importCertificate(options, callback)` *LINUX*
          
          * `pilihan` Sasaran 
            * `certificate` String - Path for the pkcs12 file.
            * `password` String - Passphrase for the certificate.
          * `callback` Fungsi 
            * `result` Integer - Result of import.
          
          Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `` indicates success while any other value indicates failure according to chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).
          
          ### `app.disableHardwareAcceleration()`
          
          Disables hardware acceleration for current app.
          
          This method can only be called before app is ready.
          
          ### `app.disableDomainBlockingFor3DAPIs()`
          
          By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.
          
          This method can only be called before app is ready.
          
          ### `app.getAppMetrics()`
          
          Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.
          
          ### `app.getGPUFeatureStatus()`
          
          Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.
          
          ### `app.setBadgeCount(count)` *Linux* *macOS*
          
          * `count` Integer
          
          Mengembalikan `Boolean` - Apakah panggilan berhasil.
          
          Sets the counter badge for current app. Setting the count to `` will hide the badge.
          
          On macOS it shows on the dock icon. On Linux it only works for Unity launcher,
          
          **Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).
          
          ### `app.getBadgeCount()` *Linux* *macOS*
          
          Returns `Integer` - The current value displayed in the counter badge.
          
          ### `app.isUnityRunning()` *Linux*
          
          Returns `Boolean` - Whether the current desktop environment is Unity launcher.
          
          ### `app.getLoginItemSettings([options])` *macOS* *Windows*
          
          * `pilihan` Objek (pilihan) 
            * `path` String (optional) *Windows* - The executable path to compare against. Defaults to `process.execPath`.
            * `args` String[] (optional) *Windows* - The command-line arguments to compare against. Defaults to an empty array.
          
          If you provided `path` and `args` options to `app.setLoginItemSettings` then you need to pass the same arguments here for `openAtLogin` to be set correctly.
          
          Mengembalikan `Objek`:
          
          * `openAtLogin` Boolean - `true` if the app is set to open at login.
          * `openAsHidden` Boolean *macOS* - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
          * `wasOpenedAtLogin` Boolean *macOS* - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
          * `wasOpenedAsHidden` Boolean *macOS* - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
          * `restoreState` Boolean *macOS* - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
          
          ### `app.setLoginItemSettings(settings)` *macOS* *Windows*
          
          * `settings` Sasaran 
            * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
            * `openAsHidden` Boolean (optional) *macOS* - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemStatus().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
            * `path` String (optional) *Windows* - The executable to launch at login. Defaults to `process.execPath`.
            * `args` String[] (optional) *Windows* - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.
          
          Set the app's login item settings.
          
          To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. Sebagai contoh:
          
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
          
          Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.
          
          ### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*
          
          * `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering
          
          Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. https://www.chromium.org/developers/design-documents/accessibility for more details. Disabled by default.
          
          **Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.
          
          ### `app.setAboutPanelOptions(options)` *macOS*
          
          * `pilihan` Sasaran 
            * `applicationName` String (optional) - The app's name.
            * `applicationVersion` String (optional) - The app's version.
            * `copyright` String (optional) - Copyright information.
            * `credits` String (optional) - Credit information.
            * `version` String (optional) - The app's build version number.
          
          Set the about panel options. This will override the values defined in the app's `.plist` file. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details.
          
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
          
          ### `app.commandLine.appendSwitch(switch[, value])`
          
          * `switch` String - A command-line switch
          * `value` String (optional) - A value for the given switch
          
          Append a switch (with optional `value`) to Chromium's command line.
          
          **Note:** This will not affect `process.argv`, and is mainly used by developers to control some low-level Chromium behaviors.
          
          ### `app.commandLine.appendArgument(value)`
          
          * `value` String - The argument to append to the command line
          
          Append an argument to Chromium's command line. The argument will be quoted correctly.
          
          **Note:** This will not affect `process.argv`.
          
          ### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*
          
          Enables mixed sandbox mode on the app.
          
          This method can only be called before app is ready.
          
          ### `app.isInApplicationsFolder()` *macOS*
          
          Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`
          
          ### `app.moveToApplicationsFolder()` *macOS*
          
          Returns `Boolean` - Whether the move was successful. Please note that if the move is successful your application will quit and relaunch.
          
          No confirmation dialog will be presented by default, if you wish to allow the user to confirm the operation you may do so using the [`dialog`](dialog.md) API.
          
          **NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog this method returns false. If we fail to perform the copy then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong
          
          ### `app.dock.bounce([type])` *macOS*
          
          * `type` String (optional) - Can be `critical` or `informational`. The default is `informational`
          
          When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.
          
          When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.
          
          Returns `Integer` an ID representing the request.
          
          ### `app.dock.cancelBounce(id)` *macOS*
          
          * `identitas` Integer
          
          Cancel the bounce of `id`.
          
          ### `app.dock.downloadFinished(filePath)` *macOS*
          
          * `format` String
          
          Bounces the Downloads stack if the filePath is inside the Downloads folder.
          
          ### `app.dock.setBadge(text)` *macOS*
          
          * `teks` String
          
          Sets the string to be displayed in the dock’s badging area.
          
          ### `app.dock.getBadge()` *macOS*
          
          Returns `String` - The badge string of the dock.
          
          ### `app.dock.hide()` *macOS*
          
          Hides the dock icon.
          
          ### `app.dock.show()` *macOS*
          
          Shows the dock icon.
          
          ### `app.dock.isVisible()` *macOS*
          
          Returns `Boolean` - Whether the dock icon is visible. The `app.dock.show()` call is asynchronous so this method might not return true immediately after that call.
          
          ### `app.dock.setMenu(menu)` *macOS*
          
          * `menu` [Menu](menu.md)
          
          Sets the application's [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103).
          
          ### `app.dock.setIcon(image)` *macOS*
          
          * `gambar` ([NativeImage](native-image.md) | String)
          
          Sets the `image` associated with this dock icon.