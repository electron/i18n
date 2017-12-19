# aplikasi

> Kontrol aplikasi Anda acara siklus hidup.

Proses:  Utama </ 0></p> 

Contoh berikut menunjukkan bagaimana cara menghentikan aplikasi saat jendela terakhir ditutup:

```javascript
const {app} = require ('electron') app.on ('window-all-closed', () = & gt; {
   app.quit ()})
```

## Acara

The ` aplikasi </ 0> objek memancarkan peristiwa berikut:</p>

<h3>Acara : 'will-finish-launching'</h3>

<p>Emitted saat aplikasi sudah selesai basic startup. Pada Windows dan Linux, <code> akan-selesai-launching </ 0>  acara adalah sama dengan <code> siap </ 0>  event ; di macos , acara ini mewakili aplikasi <code> applicationWillFinishLaunching </ 0> dari
 <code> NSApplication </ 0> . Anda biasanya akan menyiapkan pendengar untuk acara <code> open-file </ 0> dan
 <code> open-url </ 0> di sini, dan memulai reporter kecelakaan dan updater otomatis.</p>

<p>Dalam kebanyakan kasus, Anda hanya harus melakukan semuanya dalam pengendali event <code> siap </ 0>  .</p>

<h3>Acara : 'siap'</h3>

<p>Pengembalian:</p>

<ul>
<li><code> launchInfo </ 0> Objek <em> macOS </ 1></li>
</ul>

<p>Emitted ketika Elektron selesai menginisialisasi. Di macos , <code> launchInfo </ 0> memegang <code> userInfo </ 0> dari <code> NSUserNotification </ 0> yang digunakan untuk membuka aplikasi, jika diluncurkan dari Notification Center. Anda dapat menghubungi <code> app.isReady () </ 0> untuk memeriksa apakah acara ini telah dipecat.</p>

<h3>Acara : 'window-all-closed'</h3>

<p>Emitted ketika semua jendela telah ditutup.</p>

<p>Jika Anda tidak berlangganan acara ini dan semua jendela ditutup, perilaku defaultnya adalah berhenti dari aplikasi; Namun, jika Anda berlangganan, Anda mengontrol apakah aplikasi berhenti atau tidak. Jika pengguna menekan <code> Cmd + Q </ 0> , atau pengembang yang disebut
 <code> app.quit () </ 0> , Elektron pertama akan mencoba untuk menutup semua jendela dan kemudian memancarkan
 <code> akan- berhenti </ 0>  event , dan dalam hal ini <code> jendela-semua-ditutup </ 0>  acara tidak akan dipancarkan.</p>

<h3>Acara : 'sebelum-berhenti'</h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
</ul>

<p>Emitted sebelum aplikasi mulai menutup jendela-jendelanya. Memanggil <code> event.preventDefault () </ 0> akan mencegah perilaku default, yang mengakhiri aplikasi.</p>

<p><strong> Catatan: </ 0> Jika aplikasi berhenti diprakarsai oleh <code> autoUpdater.quitAndInstall () </ 1> 
lalu <code> sebelum-berhenti </ 1> dipancarkan <em> setelah </ 2> memancarkan < 1> dekat </ 1>  acara pada semua jendela dan menutup mereka.</p>

<h3>Acara : 'akan-berhenti'</h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
</ul>

<p>Emitted ketika semua jendela telah ditutup dan aplikasi akan berhenti. Memanggil <code> event.preventDefault () </ 0> akan mencegah perilaku default, yang mengakhiri aplikasi.</p>

<p>Lihat deskripsi <code> jendela-semua-ditutup </ 0>  acara untuk perbedaan antara <code> akan-berhenti </ 0> dan <code> jendela-semua-ditutup </ 0> peristiwa.</p>

<h3>Acara : 'berhenti'</h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code> exitCode </ 0>  Integer</li>
</ul>

<p>Emitted saat aplikasi berhenti.</p>

<h3>Event : 'open-file' <em> macos </ 0></h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code> path </ 0>  String</li>
</ul>

<p>Emitted saat pengguna ingin membuka file dengan aplikasi. The <code> open-file yang </ 0> 
event biasanya dipancarkan saat aplikasi sudah terbuka dan OS ingin menggunakan kembali aplikasi untuk membuka file. <code> open-file </ 0> juga dipancarkan saat sebuah file diturunkan ke dok dan aplikasi belum berjalan. Pastikan untuk mendengarkan <code> open-file yang </ 0>  acara sangat awal di startup aplikasi Anda untuk menangani kasus ini (bahkan sebelum <code> siap </ 0>  acara dipancarkan).</p>

<p>Anda harus menghubungi <code> event .preventDefault () </ 0> jika Anda ingin menangani acara ini .</p>

<p>Pada Windows , Anda harus mengurai <code> process.argv </ 0> (dalam proses utama) untuk mendapatkan filepath.</p>

<h3>Acara : 'buka-url' <em> macos </ 0></h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code> url </ 0>  String</li>
</ul>

<p>Emitted saat pengguna ingin membuka URL dengan aplikasi. File <code> Info.plist <code> aplikasi Anda
 harus menentukan skema url di dalam kunci <code> CFBundleURLTypes </ 0> , dan set <code> NSPrincipalClass </ 0> ke <0> AtomApplication </ 0> .</p>

<p>Anda harus menghubungi <code> event .preventDefault () </ 0> jika Anda ingin menangani acara ini .</p>

<h3>Acara : 'aktifkan' <em> macOS </ 0></h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code> hasVisibleWindows </ 0>  Boolean</li>
</ul>

<p>Emitted saat aplikasi diaktifkan. Berbagai tindakan dapat memicu acara ini , seperti meluncurkan aplikasi untuk pertama kalinya, mencoba meluncurkan ulang aplikasi saat sudah berjalan, atau mengklik ikon dok atau ikon taskbar.</p>

<h3>Acara : 'lanjutkan aktivitas' <em> macOS </ 0></h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code> ketik </ 0> String - String yang mengidentifikasi aktivitas. Maps ke
 <a href="https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType"><code> NSUserActivity.activityType </ 0>.</li>
<li><code> userInfo </ 0> Objek - Berisi status spesifik aplikasi yang disimpan oleh aktivitas di perangkat lain.</li>
</ul>

<p>Emitted selama <a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html"> Handoff </ 0> saat aktivitas dari perangkat lain ingin dilanjutkan. Anda harus menghubungi <code> event .preventDefault () </ 0> jika Anda ingin menangani acara ini .</p>

<p>Aktivitas pengguna hanya dapat dilanjutkan di aplikasi yang memiliki ID Tim pengembang yang sama dengan aplikasi sumber aktivitas dan yang mendukung jenis aktivitas.
Jenis aktivitas yang didukung ditentukan di aplikasi <code> Info.plist </ 0> di bawah tombol
 <code> NSUserActivityTypes </ 0> .</p>

<h3>Event : 'new-window-for-tab' <em> macOS </ 0></h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
</ul>

<p>Emitted saat pengguna mengklik tombol tab baru macOS asli . Tombol tab baru hanya terlihat jika arus <code> BrowserWindow </ 0> memiliki
 <code> tabbingIdentifier </ 0></p>

<h3>Acara : 'browser-window-blur'</h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code> jendela </ 0> Jendela Peramban</li>
</ul>

<p>Emitted ketika <a href="browser-window.md"> browserWindow </ 0> menjadi kabur.</p>

<h3>Acara : 'browser-window-focus'</h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code> jendela </ 0> Jendela Peramban</li>
</ul>

<p>Emitted ketika <a href="browser-window.md"> browserWindow </ 0> terpusat.</p>

<h3>Acara : 'browser-window-created'</h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code> jendela </ 0> Jendela Peramban</li>
</ul>

<p>Emitted ketika baru <a href="browser-window.md"> browserWindow </ 0> dibuat.</p>

<h3>Acara : 'isi web-dibuat'</h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code> webContents </ 0> Konten Web</li>
</ul>

<p>Emitted ketika baru <a href="web-contents.md"> webContents </ 0> dibuat.</p>

<h3>Acara : 'sertifikat-kesalahan'</h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code> webContents </ 0>  <a href="web-contents.md"> WebContents </ 1></li>
<li><code> url </ 0>  String</li>
<li><code> error </ 0>  String - Kode kesalahan</li>
<li><code> sertifikat </ 0>  <a href="structures/certificate.md"> Sertifikat </ 1></li>
<li><code>callback` Fungsi 

* ` isTrusted </ 0>  Boolean - Apakah akan mempertimbangkan sertifikat sebagai terpercaya</li>
</ul></li>
</ul>

<p>Emitted ketika gagal untuk memverifikasi <code> certificate </ 0> untuk <code> url </ 0> , untuk mempercayai sertifikat Anda harus mencegah perilaku default dengan
 <code> event.preventDefault () </ 0> dan memanggil < 0> callback (true) </ 0> .</p>

<pre><code class="javascript">const {app} = require ('electron') app.on ('certificate-error', ( event , webContents, url, error, certificate, callback) = & gt; {
   if (url === 'https: // github .com ') {
     // Verifikasi logika.
    event.preventDefault ()
     callback (true)
   } else {
     callback (false)
   }})
`</pre> 
  ### Acara : 'pilih-klien-sertifikat'
  
  Pengembalian:
  
  * ` event </ 0>  Acara</li>
<li><code> webContents </ 0>  <a href="web-contents.md"> WebContents </ 1></li>
<li><code> url </ 0> URL</li>
<li><code> certificateList </ 0>  <a href="structures/certificate.md"> Sertifikat [] </ 1></li>
<li><code>callback` Fungsi 
    * ` sertifikat </ 0>  <a href="structures/certificate.md"> Sertifikat </ 1> (opsional)</li>
</ul></li>
</ul>

<p>Emitted ketika sertifikat klien diminta.</p>

<p>The <code> url </ 0> sesuai dengan entri navigasi meminta sertifikat klien dan <code> callback </ 0> bisa disebut dengan entri disaring dari daftar. Menggunakan
 <code> event.preventDefault () </ 0> mencegah aplikasi menggunakan sertifikat pertama dari toko.</p>

<pre><code class="javascript">const {app} = require ('electron') app.on ('select-client-certificate', ( event , webContents, url, list, callback) = & gt; {
 event .preventDefault ()
 callback (daftar [0] ) })    
`</pre> 
      ### Acara : 'login'
      
      Pengembalian:
      
      * ` event </ 0>  Acara</li>
<li><code> webContents </ 0>  <a href="web-contents.md"> WebContents </ 1></li>
<li><code>permintaan` Obyek 
        * ` method </ 0>  String</li>
<li><code> url </ 0> URL</li>
<li><code> perujuk </ 0> URL</li>
</ul></li>
<li><code>authInfo` Obyek 
          * ` isProxy </ 0>  Boolean</li>
<li><code> skema </ 0>  String</li>
<li><code> host </ 0>  String</li>
<li><code> port </ 0>  Integer</li>
<li><code> realm </ 0>  String</li>
</ul></li>
<li><code>callback` Fungsi 
            * ` nama pengguna </ 0>  String</li>
<li><code> kata sandi </ 0>  String</li>
</ul></li>
</ul>

<p>Emitted ketika <code> webContents </ 0> ingin melakukan auth dasar.</p>

<p>Perilaku default adalah membatalkan semua otentikasi, untuk menimpa ini Anda harus mencegah perilaku default dengan <code> event.preventDefault () </ 0> dan panggil
 <code> callback (nama pengguna, kata sandi) </ 0> dengan kredensial.</p>

<pre><code class="javascript">const {app} = require ('electron') app.on ('login', ( event , webContents, request, authInfo, callback) = & gt; {
 event .preventDefault ()
 callback ('username', 'secret')} )    
`</pre> 
              ### Acara : 'proses gpu-jatuh'
              
              Pengembalian:
              
              * ` event </ 0>  Acara</li>
<li><code> terbunuh </ 0>  Boolean</li>
</ul>

<p>Emitted saat proses gpu macet atau terbunuh.</p>

<h3>Event : 'aksesibilitas-support-changed' <em> macOS </ 0>  <em> Windows </ 0></h3>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code> aksesibilitasSupportEnabled </ 0>  Boolean - <code> true </ 0> saat dukungan aksesibilitas Chrome diaktifkan, <code> false </ 0> sebaliknya.</li>
</ul>

<p>Emitted saat dukungan aksesibilitas Chrome berubah. Peristiwa ini terjadi saat teknologi bantu, seperti pembaca layar, diaktifkan atau dinonaktifkan.
Lihat https://www.chromium.org/developers/design-documents/accessibility untuk lebih jelasnya.</p>

<h2>Metode</h2>

<p>The <code> aplikasi </ 0> objek memiliki metode berikut:</p>

<p><strong> Catatan: </ 0> Beberapa metode hanya tersedia pada sistem operasi tertentu dan diberi label seperti itu.</p>

<h3><code>app.quit ()`</h3> 
                Cobalah untuk menutup semua jendela. The ` sebelum-berhenti </ 0>  acara akan dipancarkan pertama. Jika semua jendela berhasil ditutup, <code> akan-berhenti </ 0>  acara akan dipancarkan dan secara default aplikasi akan mengakhiri.</p>

<p>Metode ini menjamin bahwa semua <code> beforeunload </ 0> dan <code> unload </ 0>  event handlers dijalankan dengan benar. Ada kemungkinan bahwa sebuah jendela membatalkan berhenti dengan mengembalikan <code> false </ 0> pada pengendali event < i > Beforeunload </ 0>  .</p>

<h3><code>app.exit ( [exitCode] )`</h3> 
                
                * ` exitCode </ 0>  Integer (opsional)</li>
</ul>

<p>Keluar segera dengan <code> exitCode </ 0> .  <code> exitCode </ 0> default ke 0.</p>

<p>Semua jendela akan ditutup segera tanpa meminta pengguna dan <code> sebelum-berhenti </ 0> 
dan <code> akan-berhenti </ 0> tidak akan dipancarkan.</p>

<h3><code>app.relaunch ( [options] )`</h3> 
                  * `pilihan` Objek (opsional) 
                    * ` args </ 0>  String [] - (opsional)</li>
<li><code> execPath </ 0>  String (opsional)</li>
</ul></li>
</ul>

<p>Luncurkan ulang aplikasi saat instance saat ini keluar.</p>

<p>Secara default, contoh baru akan menggunakan direktori kerja dan argumen baris perintah yang sama dengan instance saat ini. Bila <code> args </ 0> ditentukan, <code> args </ 0> akan dilewatkan sebagai argumen baris perintah. Ketika <code> execPath </ 0> dispesifikasikan,
 <code> execPath </ 0> akan dieksekusi untuk diluncurkan kembali alih-alih aplikasi saat ini.</p>

<p>Perhatikan bahwa metode ini tidak berhenti dari aplikasi saat dijalankan, Anda harus memanggil
 <code> app.quit </ 0> atau <code> app.exit </ 0> setelah memanggil <code> app.relaunch </ 0> ke buat aplikasi restart</p>

<p>Saat <code> app.relaunch </ 0> dipanggil berkali-kali, beberapa contoh akan dimulai setelah instance saat ini keluar.</p>

<p>Contoh untuk me-restart instance saat ini segera dan menambahkan argumen baris perintah baru ke instance baru:</p>

<pre><code class="javascript">const {app} = require ('electron') app.relaunch ({args: process.argv.slice (1) .concat (['- relaunch'])}) app.exit (0)
`</pre> 
                      ### `app.isReady ()`
                      
                      Mengembalikan ` Boolean </ 0> - <code> true </ 0> jika Elektron selesai menginisialisasi, <code> false </ 0> sebaliknya.</p>

<h3><code>app.focus ()`</h3> 
                      
                      Di Linux, fokus pada jendela yang pertama terlihat. Di macos , buat aplikasi yang aktif. Pada Windows , fokus pada jendela pertama aplikasi.
                      
                      ### ` app.hide () </ 0>  <em> macos </ 1></h3>

<p>Menyembunyikan semua jendela aplikasi tanpa meminimalkannya.</p>

<h3><code> app.show () </ 0>  <em> macos </ 1></h3>

<p>Menunjukkan jendela aplikasi setelah disembunyikan. Tidak secara otomatis memfokuskannya.</p>

<h3><code>app.getAppPath ()`
                      
                      Mengembalikan ` String </ 0> - Direktori aplikasi saat ini.</p>

<h3><code>app.getPath (nama)`</h3> 
                      
                      * ` nama </ 0>  String</li>
</ul>

<p>Mengembalikan <code> String </ 0> - Path ke direktori khusus atau file yang terkait dengan <code> nama </ 0> . Pada kegagalan sebuah <code> Error </ 0> dilempar.</p>

<p>Anda dapat meminta jalur berikut dengan namanya:</p>

<ul>
<li><code> home </ 0> Direktori home pengguna.</li>
<li><code>data aplikasi` Direktori data aplikasi per pengguna, yang secara default menunjuk ke: 
                        * ` % APPDATA% </ 0> di Windows</li>
<li><code> $ XDG_CONFIG_HOME </ 0> atau <code> ~ / .config </ 0> di Linux</li>
<li><code> ~ / Library / Application Support </ 0> di macos</li>
</ul></li>
<li><code> userData </ 0> Direktori untuk menyimpan file konfigurasi aplikasi Anda, yang secara default merupakan direktori <code> appData </ 0> yang ditambahkan dengan nama aplikasi Anda.</li>
<li><code>temp` Temporary directory.
                        * `exe` The current executable file.
                        * `module` The `libchromiumcontent` library.
                        * `desktop` The current user's Desktop directory.
                        * `documents` Directory for a user's "My Documents".
                        * `downloads` Directory for a user's downloads.
                        * `music` Directory for a user's music.
                        * `pictures` Directory for a user's pictures.
                        * `videos` Directory for a user's videos.
                        * `pepperFlashSystemPlugin` Full path to the system version of the Pepper Flash plugin.
                        ### `app.getFileIcon(path[, options], callback)`
                        
                        * ` path </ 0>  String</li>
<li><code>pilihan` Objek (opsional) 
                          * `size` String 
                            * `small` - 16x16
                            * `normal` - 32x32
                            * `large` - 48x48 on *Linux*, 32x32 on *Windows*, unsupported on *macOS*.
                        * `callback` Fungsi 
                          * `error` Error
                          * `icon` [NativeImage](native-image.md)
                        
                        Fetches a path's associated icon.
                        
                        On *Windows*, there a 2 kinds of icons:
                        
                        * Icons associated with certain file extensions, like `.mp3`, `.png`, etc.
                        * Icons inside the file itself, like `.exe`, `.dll`, `.ico`.
                        
                        On *Linux* and *macOS*, icons depend on the application associated with file mime type.
                        
                        ### `app.setPath(name, path)`
                        
                        * ` nama </ 0>  String</li>
<li><code> path </ 0>  String</li>
</ul>

<p>Overrides the <code>path` to a special directory or file associated with `name`. If the path specifies a directory that does not exist, the directory will be created by this method. On failure an `Error` is thrown.</p> 
                          You can only override paths of a `name` defined in `app.getPath`.
                          
                          By default, web pages' cookies and caches will be stored under the `userData` directory. If you want to change this location, you have to override the `userData` path before the `ready` event of the `app` module is emitted.
                          
                          ### `app.getVersion()`
                          
                          Returns `String` - The version of the loaded application. If no version is found in the application's `package.json` file, the version of the current bundle or executable is returned.
                          
                          ### `app.getName()`
                          
                          Returns `String` - The current application's name, which is the name in the application's `package.json` file.
                          
                          Usually the `name` field of `package.json` is a short lowercased name, according to the npm modules spec. You should usually also specify a `productName` field, which is your application's full capitalized name, and which will be preferred over `name` by Electron.
                          
                          ### `app.setName(name)`
                          
                          * ` nama </ 0>  String</li>
</ul>

<p>Mengabaikan nama aplikasi saat ini.</p>

<h3><code>app.getLocale()`</h3> 
                            Returns `String` - The current application locale. Possible return values are documented [here](locales.md).
                            
                            **Note:** When distributing your packaged app, you have to also ship the `locales` folder.
                            
                            **Note:** On Windows you have to call it after the `ready` events gets emitted.
                            
                            ### `app.addRecentDocument(path)` *macOS* *Windows*
                            
                            * ` path </ 0>  String</li>
</ul>

<p>Adds <code>path` to the recent documents list.</p> 
                              This list is managed by the OS. On Windows you can visit the list from the task bar, and on macOS you can visit it from dock menu.
                              
                              ### `app.clearRecentDocuments()` *macOS* *Windows*
                              
                              Bersihkan daftar dokumen terakhir.
                              
                              ### `app.setAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*
                              
                              * `protocol` String - The name of your protocol, without `://`. If you want your app to handle `electron://` links, call this method with `electron` as the parameter.
                              * `path` String (optional) *Windows* - Defaults to `process.execPath`
                              * `args` String[] (optional) *Windows* - Defaults to an empty array
                              
                              Returns `Boolean` - Whether the call succeeded.
                              
                              This method sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.
                              
                              On Windows you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.
                              
                              **Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which can not be modified at runtime. You can however change the file with a simple text editor or script during build time. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.
                              
                              The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.
                              
                              ### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*
                              
                              * `protocol` String - The name of your protocol, without `://`.
                              * `path` String (optional) *Windows* - Defaults to `process.execPath`
                              * `args` String[] (optional) *Windows* - Defaults to an empty array
                              
                              Returns `Boolean` - Whether the call succeeded.
                              
                              This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.
                              
                              ### `app.isDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*
                              
                              * `protocol` String - The name of your protocol, without `://`.
                              * `path` String (optional) *Windows* - Defaults to `process.execPath`
                              * `args` String[] (optional) *Windows* - Defaults to an empty array
                              
                              Returns `Boolean`
                              
                              This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.
                              
                              **Note:** On macOS, you can use this method to check if the app has been registered as the default protocol handler for a protocol. You can also verify this by checking `~/Library/Preferences/com.apple.LaunchServices.plist` on the macOS machine. Please refer to [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) for details.
                              
                              The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.
                              
                              ### `app.setUserTasks(tasks)` *Windows*
                              
                              * `tasks` [Task[]](structures/task.md) - Array of `Task` objects
                              
                              Adds `tasks` to the [Tasks](http://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the JumpList on Windows.
                              
                              `tasks` is an array of [`Task`](structures/task.md) objects.
                              
                              Returns `Boolean` - Whether the call succeeded.
                              
                              **Note:** If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.
                              
                              ### `app.getJumpListSettings()` *Windows*
                              
                              Returns `Object`:
                              
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
                              
                              **Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.
                              
                              **Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.
                              
                              Here's a very simple example of creating a custom Jump List:
                              
                              ```javascript
const {app} = require('electron')

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
const {app} = require('electron')
let myWindow = null

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

// Create myWindow, load the rest of the app, etc...
app.on('ready', () => {
})
```
                      
                      ### `app.releaseSingleInstance()`
                      
                      Releases all locks that were created by `makeSingleInstance`. This will allow multiple instances of the application to once again run side by side.
                      
                      ### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*
                      
                      * `type` String - Uniquely identifies the activity. Maps ke ` NSUserActivity.activityType </ 0>.</li>
<li><code>userInfo` Object - App-specific state to store for use by another device.</li> 
                        
                        * `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.</ul> 
                        
                        Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.
                        
                        ### `app.getCurrentActivityType()` *macOS*
                        
                        Returns `String` - The type of the currently running activity.
                        
                        ### `app.setAppUserModelId(id)` *Windows*
                        
                        * `id` String
                        
                        Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.
                        
                        ### `app.importCertificate(options, callback)` *LINUX*
                        
                        * `pilihan` Object 
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
                        
                        ### `app.getAppMemoryInfo()` *Deprecated*
                        
                        Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app. **Note:** This method is deprecated, use `app.getAppMetrics()` instead.
                        
                        ### `app.getAppMetrics()`
                        
                        Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.
                        
                        ### `app.getGpuFeatureStatus()`
                        
                        Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.
                        
                        ### `app.setBadgeCount(count)` *Linux* *macOS*
                        
                        * `count` Integer
                        
                        Returns `Boolean` - Whether the call succeeded.
                        
                        Sets the counter badge for current app. Setting the count to `` will hide the badge.
                        
                        On macOS it shows on the dock icon. On Linux it only works for Unity launcher,
                        
                        **Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).
                        
                        ### `app.getBadgeCount()` *Linux* *macOS*
                        
                        Returns `Integer` - The current value displayed in the counter badge.
                        
                        ### `app.isUnityRunning()` *Linux*
                        
                        Returns `Boolean` - Whether the current desktop environment is Unity launcher.
                        
                        ### `app.getLoginItemSettings([options])` *macOS* *Windows*
                        
                        * `pilihan` Objek (opsional) 
                          * `path` String (optional) *Windows* - The executable path to compare against. Defaults to `process.execPath`.
                          * `args` String[] (optional) *Windows* - The command-line arguments to compare against. Defaults to an empty array.
                        
                        If you provided `path` and `args` options to `app.setLoginItemSettings` then you need to pass the same arguments here for `openAtLogin` to be set correctly.
                        
                        Returns `Object`:
                        
                        * `openAtLogin` Boolean - `true` if the app is set to open at login.
                        * `openAsHidden` Boolean - `true` if the app is set to open as hidden at login. This setting is only supported on macOS.
                        * `wasOpenedAtLogin` Boolean - `true` if the app was opened at login automatically. This setting is only supported on macOS.
                        * `wasOpenedAsHidden` Boolean - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is only supported on macOS.
                        * `restoreState` Boolean - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is only supported on macOS.
                        
                        **Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
                        
                        ### `app.setLoginItemSettings(settings)` *macOS* *Windows*
                        
                        * `settings` Object 
                          * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
                          * `openAsHidden` Boolean (optional) - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemStatus().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is only supported on macOS.
                          * `path` String (optional) *Windows* - The executable to launch at login. Defaults to `process.execPath`.
                          * `args` String[] (optional) *Windows* - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.
                        
                        Set the app's login item settings.
                        
                        To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. For example:
                        
                        ```javascript
const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  path: updateExe,
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
})
```
                    
                    **Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
                    
                    ### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*
                    
                    Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.
                    
                    ### `app.setAboutPanelOptions(options)` *macOS*
                    
                    * `pilihan` Object 
                      * `applicationName` String (optional) - The app's name.
                      * `applicationVersion` String (optional) - The app's version.
                      * `copyright` String (optional) - Copyright information.
                      * `credits` String (optional) - Credit information.
                      * `version` String (optional) - The app's build version number.
                    
                    Set the about panel options. This will override the values defined in the app's `.plist` file. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details.
                    
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
                    
                    ### `app.dock.bounce([type])` *macOS*
                    
                    * `type` String (optional) - Can be `critical` or `informational`. The default is `informational`
                    
                    When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.
                    
                    When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.
                    
                    Returns `Integer` an ID representing the request.
                    
                    ### `app.dock.cancelBounce(id)` *macOS*
                    
                    * `id` Integer
                    
                    Cancel the bounce of `id`.
                    
                    ### `app.dock.downloadFinished(filePath)` *macOS*
                    
                    * `filePath` String
                    
                    Bounces the Downloads stack if the filePath is inside the Downloads folder.
                    
                    ### `app.dock.setBadge(text)` *macOS*
                    
                    * `text` String
                    
                    Sets the string to be displayed in the dock’s badging area.
                    
                    ### `app.dock.getBadge()` *macOS*
                    
                    Returns `String` - The badge string of the dock.
                    
                    ### `app.dock.hide()` *macOS*
                    
                    Sembunyikan ikon dok.
                    
                    ### `app.dock.show()` *macOS*
                    
                    Tampilkan ikon dok.
                    
                    ### `app.dock.isVisible()` *macOS*
                    
                    Returns `Boolean` - Whether the dock icon is visible. The `app.dock.show()` call is asynchronous so this method might not return true immediately after that call.
                    
                    ### `app.dock.setMenu(menu)` *macOS*
                    
                    * `menu` [Menu](menu.md)
                    
                    Sets the application's [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103).
                    
                    ### `app.dock.setIcon(image)` *macOS*
                    
                    * `image` ([NativeImage](native-image.md) | String)
                    
                    Sets the `image` associated with this dock icon.