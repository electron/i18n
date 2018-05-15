# BrowserWindow

> mengatasi dan kendalikan jendela peramban

Proses: [Main](../glossary.md#main-process)

```javascript
// Dalam proses utamanya.
Misalnya {Jendela Peramban} = memerlukan ('elektron')

// Atau gunakan`terpencil` dari proses renderer.
// Misalnya {Jendela Peramban} = memerlukan ('electron').terpencil biarkan menang=jendela baru Peramban ( {lebar: 800, tinggi: 600} ) menang.di ('tutup', () = & gt; {menang = batal}) //beban sebuah remote URL win.loadURL ('https://github.com') // Atau muat file HTML lokal win.loadURL (`file: // $ {__ dirname} / app / index.html`)
```

## Jendela tanpa bingkai

Untuk membuat jendela tanpa krom , atau jendela transparan dalam bentuk sewenang-wenang, Anda dapat menggunakan API  Frameless Window </ 0> .</p> 

## Menampilkan jendela dengan anggun

Saat memuat halaman di jendela secara langsung, pengguna mungkin melihat pemuatan laman secara bertahap, yang bukan pengalaman bagus untuk aplikasi asli. Untuk membuat tampilan jendela tanpa lampu kilat visual, ada dua solusi untuk situasi yang berbeda.

### Menggunakan ` siap-tampil</ 0>  acara</h3>

<p>Saat memuat halaman, <code> siap-show </ 0>  acara akan dikeluarkan saat proses penyaji telah memberikan halaman untuk pertama kalinya jika jendela belum terbukti belum. Menampilkan jendela setelah acara ini tidak memiliki lampu kilat visual:</p>

<pre><code class="javascript">const {jendela peramban} = memerlukan ('electron') nyalakan = jendela baru peramban({show: false}) win.once ('siap-untuk-menunjukkan', () = & gt; {win.show ()})
`</pre> 

Acara ini biasanya dibunyikan setelah acara ` Apakah-selesai-load </ 0>, tapi untuk halaman dengan banyak sumber daya terpencil, itu mungkin dipancarkan sebelum acara <code> Apakah-selesai-load </ 0>.</p>

<h3>Pengaturan <code> warna latar belakang</ 0></h3>

<p>Untuk aplikasi yang kompleks, <code> siap-show </ 0>  acara bisa dipancarkan terlambat, membuat aplikasi merasa lambat. Dalam kasus ini, sebaiknya segera tampilkan jendela, dan gunakan latar belakang < 0> warna latar belakang </ 0> ke latar belakang aplikasi Anda:</p>

<pre><code class="javascript">const {BrowserWindow} = membutuhkan ('elektron')

let win = new BrowserWindow({backgroundColor: '#2e2c29'})
win.loadURL('https://github.com')
`</pre> 

Preview untuk aplikasi yang menggunakan ` siap-untuk-menunjukkan </ 0> peristiwa, masih disarankan untuk melakukan <code> backgroundColor </ 0> untuk aplikasi yang lebih asli.</p>

<h2>Jendela dewasa dan anak</h2>

<p>Dengan menggunakan opsi <code> utama </ 0>  , Anda dapat membuat jendela anak:</p>

<pre><code class="javascript">const {Browser peramban} = require ('elektron') biarkan top = new BrowserWindow () biarkan anak = new BrowserWindow ( {parent: top} ) child.show () top.show () top.show ()

`</pre> 

Jendela ` anak </ 0> akan selalu tampil di atas jendela <code> atas </ 0> .</p>

<h3>Jendela modal</h3>

<p>Jendela modal adalah jendela anak yang menonaktifkan jendela orangtua, untuk menciptakan jendela modal, Anda harus menetapkan pilihan <code>orang tua` dan `modal`pilihan:

```javascript
const {BrowserWindow} = require ('electron') biarkan anak = Jendela peramban baru ( {orang tua: atas, modal: benar, tunjukkan: salah} ) anak. beban URL ('https://github.com') child.once (' siap tampil ', () = & gt; {
{parent: top, modal: true, show: false}{parent: top, modal: true, show: false}{parent: top, modal: true, show: false}{parent: top, modal: true, show: false}
```

### Visibilitas halaman 

The  Halaman Visibilitas API </ 0> bekerja sebagai berikut:</p> 

* Pada semua platform, negara visibilitas melacak apakah jendela tersembunyi / diminimalkan atau tidak.
* Selain itu, di macOS , status visibilitas juga melacak keadaan oklusi jendela. Jika jendela ditutup (yaitu tertutup sepenuhnya) oleh jendela lain, status visibilitas akan ` tersembunyi </ 0> . Pada platform lain, status visibilitas hanya <code> tersembunyi </ 0> hanya jika jendela diminimalkan atau secara eksplisit disembunyikan dengan <code> menyembunyikan () </ 0> .</li>
<li>Jika <code> Browser Window </ 0> dibuat dengan <code> show: false </ 0> , status visibilitas awal akan <code> terlihat </ 0> meskipun jendela benar-benar tersembunyi.</li>
<li>Jika <code> pelambatan latar belakang </ 0> dinonaktifkan, status visibilitas akan tetap
 <code> terlihat </ 0> meskipun jendela diminimalkan, tersumbat, atau tersembunyi</li>
</ul>

<p>Disarankan agar Anda menghentikan sementara operasi mahal saat status visibilitas <code> tersembunyi </ 0> untuk meminimalkan konsumsi daya.</p>

<h3>Pemberitahuan platform</h3>

<ul>
<li>Di jendela macOS modal akan ditampilkan sebagai lembaran yang menempel pada jendela induk.</li>
<li>Pada macOS , jendela anak akan menjaga posisi relatif ke jendela induk saat jendela induk bergerak, sementara pada jendela anak Windows dan Linux tidak akan bergerak.</li>
<li>Pada Windows tidak didukung untuk mengubah jendela induk secara dinamis.</li>
<li>Di Linux jenis jendela modal akan diubah menjadi <code> dialog </ 0> .</li>
<li>Di Linux banyak lingkungan desktop tidak mendukung menyembunyikan jendela modal.</li>
</ul>

<h2>Kelas: BrowserWindow</h2>

<blockquote>
  <p>mengatasi  dan kendalikan jendela peramban</p>
</blockquote>

<p>Proses: <a href="../glossary.md#main-process">Main</a></p>

<p><code> BrowserWindow </ 0> adalah
 <a href="https://nodejs.org/api/events.html#events_class_events_eventemitter"> EventEmitter </ 1> .</p>

<p>Ini menciptakan baru <code> BrowserWindow </ 0> dengan sifat asli yang ditetapkan oleh <code> Pilihan </ 0> .</p>

<h3><code>BrowserWindow baru ( [options] )`</h3> 
  * `pilihan` Objek (opsional) 
    * ` width </ 0>  Integer (opsional) - Lebar jendela dalam piksel. Defaultnya adalah <code> 800 </ 0> .</li>
<li><code> tinggi </ 0>  Integer (opsional) - Tinggi jendela dalam piksel. Defaultnya adalah <code> 600 </ 0> .</li>
<li><code> x </ 0>  Integer (opsional) ( <strong> diperlukan </ 1> jika y digunakan) - Kisi-kisi kiri jendela dari layar. Default adalah memusatkan jendela.</li>
<li><code> y </ 0>  Integer (opsional) ( <strong> diperlukan </ 1> jika x digunakan) - offset atas jendela dari layar. Default adalah memusatkan jendela.</li>
<li><code> useContentSize </ 0>  Boolean (opsional) - The <code> lebar </ 0> dan <code> tinggi </ 0> akan digunakan sebagai ukuran halaman web, yang berarti ukuran jendela yang sebenarnya akan mencakup ukuran jendela frame dan menjadi sedikit lebih besar. Defaultnya adalah <code> false </ 0> .</li>
<li><code> center </ 0>  Boolean (opsional) - Tampilkan jendela di bagian tengah layar.</li>
<li><code> minWidth </ 0>  Integer (opsional) - Lebar minimum jendela. Defaultnya adalah <code> 0 </ 0> .</li>
<li><code> minHeight </ 0>  Integer (opsional) - Tinggi minimum jendela. Defaultnya adalah <code> 0 </ 0> .</li>
<li><code> maxWidth </ 0>  Integer (opsional) - Lebar maksimum jendela. Default tidak ada batasnya.</li>
<li><code> maxHeight </ 0>  Integer (opsional) - Tinggi maksimum jendela. Default tidak ada batasnya.
</li>
<li><code> resizable </ 0>  Boolean (opsional) - Apakah jendela dapat resizable. Defaultnya adalah <code> true </ 0> .</li>
<li><code> movable </ 0>  Boolean (opsional) - Apakah jendela dapat bergerak. Ini tidak diimplementasikan di Linux. Defaultnya adalah <code> true </ 0> .</li>
<li><code> diminimalkan </ 0>  Boolean (opsional) - Apakah jendela dapat diminimalkan. Ini tidak diimplementasikan di Linux. Defaultnya adalah <code> true </ 0> .</li>
<li><code> maximizable </ 0>  Boolean (opsional) - Apakah jendela dapat dimaksimalkan. Ini tidak diimplementasikan di Linux. Defaultnya adalah <code> true </ 0> .</li>
<li><code> closable </ 0>  Boolean (opsional) - Apakah jendela dapat ditutup. Ini tidak diimplementasikan di Linux. Defaultnya adalah <code> true </ 0> .</li>
<li><code> fokusable </ 0>  Boolean (opsional) - Apakah jendela dapat difokuskan. Default adalah
<code>benar`. Pada setelan Windows `fokus: false` juga menyiratkan pengaturan `skipTaskbar: benar`. Pada setting Linux `focusable: false` membuat jendela Berhenti berinteraksi dengan wm, jadi jendela akan selalu tetap di atas semua ruang kerja.
    * `alwaysOnTop` Boolean (opsional) - Apakah jendela harus selalu berada di atas jendela lainnya Defaultnya adalah `false`.
    * `layar penuh` Boolean (opsional) - Apakah jendela harus tampil di layar penuh. Secara eksplisit set ke `false` tombol fullscreen akan disembunyikan atau dinonaktifkan di macOS. Defaultnya adalah ` false </ 0> .</li>
<li><code>fullscreenable` Boolean (optional) - Whether the window can be put into fullscreen mode. Di macOS, juga apakah tombol perbesar/zoom harus beralih penuh mode layar atau memaksimalkan jendela. Defaultnya adalah `true`.
    * `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. Default is `false`.
    * `skipTaskbar` Boolean (opsional) - Apakah akan menampilkan jendela di taskbar. Default adalah `false`.
    * `kios` Boolean (opsional) - Mode kios. Defaultnya adalah `false`.
    * `title` String (opsional) - Judul jendela default. Defaultnya adalah `"Elektron"`.
    * `ikon` ([NativeImage](native-image.md) | String) (opsional) - Ikon jendela. Pada Windows itu disarankan untuk menggunakan ikon `ICO` untuk mendapatkan efek visual terbaik, Anda juga bisa biarkan tidak terdefinisi sehingga ikon executable akan digunakan.
    * `tampilkan` Boolean (opsional) - Apakah jendela harus ditampilkan saat dibuat. Default adalah `benar`.
    * `frame` Boolean (opsional) - Tentukan ` false ` untuk membuat a [Jendela Frameless](frameless-window.md). Defaultnya adalah `Benar`.
    * `induk` BrowserWindow (opsional) - Tentukan jendela induk. Defaultnya adalah `null`.
    * `modal` Boolean (opsional) - Apakah ini adalah jendela modal. Ini hanya bekerja bila Jendela adalah jendela anak. Defaultnya adalah `palsu`.
    * `acceptFirstMouse` Boolean (opsional) - Apakah tampilan web menerima satu mouse-down event yang sekaligus mengaktifkan jendela. Default adalah `palsu`.
    * `disableAutoHideCursor` Boolean (opsional) - Apakah akan menyembunyikan kursor saat mengetik. Defaultnya adalah `palsu`.
    * `autoHideMenuBar` Boolean (opsional) - Auto menyembunyikan bilah menu kecuali `Alt` kunci ditekan Defaultnya adalah `palsu`.
    * `enableLargerThanScreen` Boolean (opsional) - Aktifkan jendela yang akan diubah ukurannya lebih besar. dari layar Defaultnya adalah `palsu`.
    * `backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported). Default adalah `#FFF` (putih).
    * `hasShadow` Boolean (opsional) - Apakah jendela seharusnya memiliki bayangan. Hanya ini diimplementasikan di macos Defaultnya adalah `benar`.
    * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
    * `Tema gelap` Boolean (opsional) - Pasukan menggunakan tema gelap untuk jendela, hanya bekerja beberapa lingkungan desktop GTK3. Defaultnya adalah `false`.
    * `transparent` Boolean (opsional) - Membuat jendela [transparan](frameless-window.md). Defaultnya adalah `palsu`.
    * `ketik` String (opsional) - Jenis jendela, default adalah jendela normal. Lihat lebih lanjut tentang ini di bawah ini.
    * `titleBarStyle` String (opsional) - Gaya bar judul jendela. Default adalah `default`. Nilai yang mungkin adalah: 
      * `default` - Hasil dalam judul Mac buram abu-abu standar.
      * `tersembunyi` - Hasil di bar judul tersembunyi dan jendela konten ukuran penuh judul bar masih memiliki kontrol jendela standar ("lampu lalu lintas") di kiri atas.
      * `hiddenInset` - Hasil di bar judul tersembunyi dengan tampilan alternatif dimana tombol lampu lalu lintas sedikit lebih tertutup dari tepi jendela.
      * `customButtonsOnHover` Boolean (opsional) - Draw custom close, minimize, dan tombol full screen pada macOS tanpa bingkai jendela. Tombol ini tidak akan layar kecuali melayang di sebelah kiri atas jendela. Kebiasaan ini Tombol mencegah masalah dengan kejadian mouse yang terjadi dengan standar tombol toolbar jendela. **Catatan:** Pilihan ini saat ini sedang eksperimental.
    * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
    * `thickFrame` Boolean (opsional) - Gunakan `WS_THICKFRAME` untuk jendela buram tanpa bingkai Windows, yang menambahkan bingkai jendela standar. Menyetelnya ke ` false </ 0> akan menghapus window shadow dan animasi jendela. Defaultnya adalah <code>true`.
    * ` getar </ 0> String (opsional) - Tambahkan jenis efek getar ke jendela, hanya di macos. Dapat <code> tampilan berbasis </ 0>, <code> cahaya </ 0>, <code> gelap </ 0>, <code> titlebar </ 0>, <code> pilihan </ 0>, < 0> menu </ 0>, <code> popover </ 0>, <code> sidebar </ 0>, <code> medium-light </ 0> atau <code> ultra-dark </ 0>.  Please note that
using <code>frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well.
    * ` zoomToPageWidth </ 0> Boolean (opsional) - Mengontrol perilaku pada macOS saat opsi-klik tombol stoplight hijau pada toolbar atau dengan mengklik item menu Window> Zoom. Jika <code> benar </ 0>, jendela akan tumbuh ke lebar yang disarankan dari halaman web saat diperbesar, <code> false </ 0> akan menyebabkannya memperbesar lebar layar. Ini juga akan mempengaruhi perilaku saat memanggil <code> maximize () </ 0> secara langsung. Defaultnya adalah <code> false </ 0> .</li>
<li><code> tabbingIdentifier </ 0> String (opsional) - Nama grup tab, memungkinkan untuk membuka
jendela sebagai tab asli di macos 10.12+. Windows dengan tabbing yang sama
Pengenal akan dikelompokkan bersama. Windows dengan tabbing yang sama
Pengenal akan dikelompokkan bersama.</li>
<li><code>webpreferences` Objek (opsional) - Pengaturan fitur halaman web. 
      * ` devTools </ 0> Boolean (opsional) - Baik untuk mengaktifkan DevTools.

Konteks | Permintaan Konteks. Jika diset ke <code> false </ 0>, tidak dapat menggunakan <code> BrowserWindow.webContents.openDevTools () </ 0> untuk membuka DevTools. Defaultnya adalah <code>true`.
      * `nodeIntegration` Boolean (opsional) - Apakah integrasi node diaktifkan Default `benar`.
      * ` nodeIntegrationInWorker` Boolean (opsional) - Apakah integrasi simpul diaktifkan pada pekerja web. Defaultnya adalah ` false </ 0> . Lebih lanjut tentang ini dapat ditemukan di <a href="../tutorial/multithreading.md">Multithreading</a>.</li>
<li><code>preload` String (opsional) - Menentukan skrip yang akan dimuat sebelum skrip lain dijalankan di halaman. Script ini akan selalu memiliki akses ke API simpul tidak peduli apakah integrasi node dinyalakan atau dimatikan. Nilainya harus jadilah path file absolut pada script. Saat integrasi simpul dimatikan, skrip preload dapat diperkenalkan kembali Simbol global node kembali ke lingkup global. Lihat contoh [di sini](process.md#event-loaded).
      * `kotak pasir` Boolean (opsional) - Jika disetel, ini akan menampilkan kotak pasir perender terkait dengan jendela, membuatnya kompatibel dengan Chromium Kotak pasir tingkat OS dan menonaktifkan mesin Node.js. Ini tidak sama dengan opsi `nodeIntegration` dan API tersedia untuk skrip pramuat lebih terbatas. Baca lebih lanjut tentang opsi [di sini](sandbox-option.md). **Catatan:** Pilihan ini saat ini eksperimental dan dapat berubah atau terjadi dihapus di rilis Elektron masa depan.
      * `session` [Session](session.md#class-session) (perintah) - sesuaikan sesi yang digunakan oleh halaman. Alih-alih melewati objek Sidang secara langsung, Anda juga bisa memilihnya gunakan opsi `partisi` sebagai gantinya, yang menerima string partisi. Kapan `Session` dan `partisi` disediakan, `Session` akan lebih disukai. Default adalah sesi default.
      * `partisi` String (opsional) - Mengatur sesi yang digunakan oleh halaman sesuai dengan string partisi. Jika `partisi` dimulai dengan `bertahan:`, halaman akan menggunakan sesi persisten yang tersedia untuk semua halaman di aplikasi dengan sama `partisi`. Jika tidak ada awalan `bertahan:`, halaman akan menggunakan a sesi dalam memori. Dengan menugaskan yang sama `partisi`, beberapa halaman dapat berbagi sesi yang sama. Default adalah sesi default.
      * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`.
      * `zoomFactor` Nomor (opsional) - Faktor pembesaran default halaman, `3.0` mewakili `300%`. Defaultnya adalah `1.0`.
      * `javascript` Boolean (opsional) - Mengaktifkan dukungan JavaScript. Defaultnya adalah `true`.
      * `webSecurity` Boolean (opsional) - Bila `false`, itu akan menonaktifkan Kebijakan asal yang sama (biasanya menggunakan situs pengujian oleh orang), dan tetapkan ` allowRunningInsecureContent ` ke `true` jika opsi ini belum ditetapkan oleh pengguna. Defaultnya adalah `true`.
      * `allowRunningInsecureContent` Boolean (opsional) - Mengizinkan sebuah halaman https untuk dijalankan JavaScript, CSS atau plugin dari URL http. Defaultnya adalah `false`.
      * `gambar` Boolean (opsional) - Mengaktifkan dukungan gambar. Defaultnya adalah `true`.
      * `textAreasAreResizable` Boolean (opsional) - Buat elemen TextArea resizable. Default `true`.
      * `webgl` Boolean (opsional) - Mengaktifkan dukungan WebGL. Defaultnya adalah `true`.
      * `webaudio` Boolean (opsional) - Mengaktifkan dukungan WebAudio. Defaultnya adalah `true`.
      * `plugin` Boolean (opsional) - Apakah plugin harus diaktifkan Defaultnya adalah `false`.
      * `experimentalFeatures` Boolean (opsional) - Mengaktifkan fitur eksperimental Chromium. Defaultnya adalah `false`.
      * `experimentalCanvasFeatures` Boolean (tangan) - Memungkinkan eksperimental Chromium fitur kanvas Defaultnya adalah `false`.
      * `scrollBounce` Boolean (opsional) - Mengaktifkan efek gulir gips (karet banding) macos Defaultnya adalah `false`.
      * `blinkFeatures` String (opsional) - Daftar string fitur yang dipisahkan oleh `,`, seperti `CSSVariables, KeyboardEventKey` untuk mengaktifkannya. Daftar lengkap fitur yang didukung string dapat ditemukan di [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) mengajukan.
      * `disableBlinkFeatures` String (opsional) - Daftar string fitur yang dipisahkan oleh `,`, seperti ` CSSVariables, KeyboardEventKey` untuk menonaktifkannya. Daftar lengkap didukung string fitur dapat ditemukan di [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) file.
      * `defaultFontFamily` Object (optional) - Menetapkan font default untuk font-family. 
        * `standar` String (opsional) - Default ke `Times New Roman`.
        * `serif` String (opsional) - Default ke `Times New Roman`.
        * `sansSerif` String (opsional) - Default ke `Arial`.
        * `monospace` String (opsional) - Default ke `Kurir Baru`.
        * `cursive` String (opsional) - Default ke `Script`.
        * `fantasy` String (opsional) - Default ke `Impact`.
      * `defaultFontSize` Integer (opsional) - Default ke `16`.
      * `defaultMonospaceFontSize` Integer (opsional) - Default ke `13`.
      * `minimumFontSize` Integer (opsional) - Default ke ``.
      * `defaultEncoding` String (opsional) - Default ke `ISO-8859-1`.
      * `backgroundThrottling` Boolean (opsional) - Apakah akan mencekik animasi dan timer? Saat halaman menjadi background. This also affects the [Page Visibility API](#page-visibility). Default ke ` true </ 0> .</li>
<li><code> offscreen </ 0>  Boolean (opsional) - Apakah akan mengaktifkan rendering offscreen untuk jendela browser. Default ke <code> false </ 0> . Lihat
 tutorial rendering <a href="../tutorial/offscreen-rendering.md"> offscreen </ 0> untuk lebih jelasnya.</li>
<li><code> contextIsolation </ 0>  Boolean (opsional) - Apakah akan menjalankan API Elektron dan skrip <code> preload </ 0> yang ditentukan dalam konteks JavaScript yang terpisah . Default ke <code> false </ 0> . Konteks script <code> preload ` berjalan masih akan memiliki akses penuh ke jendela ` document `dan` window` namun akan menggunakan set sendiri JavaScript builtins ( `Array`, `Objek`, `JSON`, dll.) Dan akan diisolasi dari perubahan yang dilakukan pada lingkungan global oleh laman yang dimuat. The Electron API hanya akan tersedia di ` preload </ 0> naskah dan bukan halaman dimuat. Opsi ini harus digunakan saat memuat konten remote yang berpotensi tidak tepercaya untuk memastikan konten yang dimuat tidak dapat merusak skrip <code> preload </ 0> dan setiap API Elektron yang digunakan.
Opsi ini menggunakan teknik yang sama yang digunakan oleh <a href="https://developer.chrome.com/extensions/content_scripts#execution-environment"> Chrome Content Scripts </ 0> .
Anda dapat mengakses konteks ini di alat dev dengan memilih entri ' Elektron Isolated Context' di kotak kombo di bagian atas tab Konsol. <strong> Catatan: </ 0> Ini pilihan saat ini eksperimental dan dapat berubah atau dihapus di masa Elektron rilis.</li>
<li><code>nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
      * ` webviewTag ` Boolean (opsional) - Apakah untuk mengaktifkan[`<webview>`tag](webview-tag.md). Default untuk nilai ` nodeIntegration ` option . ** Catatan: ** ` preload ` Script dikonfigurasi untuk `<webview>` akan memiliki simpul integrasi diaktifkan ketika dieksekusi sehingga Anda harus memastikan remote / konten yang tidak dipercaya tidak mampu menciptakan `<webview>` tag dengan mungkin ` preload ` script. Anda dapat menggunakan `akan melampirkan tampilan web` acara di [webContents](web-contents.md) untuk mengupas dengan` preload` naskah dan untuk memvalidasi atau mengubah `<webview>` 's pengaturan awal.
      * `additionArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.
  
  When setting minimum or maximum window size with `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, it only constrains the users. Ini tidak akan mencegah Anda melewati ukuran yang tidak mengikuti batasan ukuran pada ` setBounds `/`setSize` atau ke konstruktor `BrowserWindow`.
  
  Kemungkinan nilai dan perilaku dari ` jenis </ 0>  option yang tergantung platform. Nilai yang mungkin adalah:</p>

<ul>
<li>Di Linux, jenis yang mungkin adalah <code>desktop`, `dermaga`, `toolbar`, `splash`, `notifikasi`.</li> 
  
  * Di macos , jenis yang mungkin ada `Desktop`, `bertekstur`. 
    * Tipe ` bertekstur </ 0> menambahkan tampilan gradien logam ( <code> NSTexturedBackgroundWindowMask </ 0> ).</li>
<li>Tipe <code> desktop </ 0> menempatkan jendela pada tingkat jendela latar belakang desktop ( <code> kCGDesktopWindowLevel - 1 </ 0> ). Perhatikan bahwa jendela desktop tidak akan menerima acara fokus, keyboard atau mouse, namun Anda dapat menggunakan <code> globalShortcut ` untuk menerima masukan secara hemat.
  * Pada Windows , jenis yang mungkin adalah ` toolbar </ 0> .</li>
</ul>

<h3>Contoh peristiwa</h3>

<p>Objek yang dibuat dengan <code> BrowserWindow baru </ 0> memancarkan acara berikut:</p>

<p><strong> Catatan: </ 0> Beberapa acara hanya tersedia pada sistem operasi tertentu dan diberi label seperti itu.</p>

<h4>Acara : 'halaman-judul-diperbarui'</h4>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara
  * ` judul</ 0>  String</li>
</ul>

<p>Emitted ketika dokumen tersebut mengubah namanya, memanggil <code> event.preventDefault () </ 0> 
akan mencegah perubahan dari jendela asli.</p>

<h4>Acara : 'dekat'</h4>

<p>Pengembalian:</p>

<ul>
<li><code>event` Acara</ul> 
  
  Emitted saat jendela akan ditutup. Ini dipancarkan sebelum `` beforeunload </ 0> dan <code> membongkar </ 0>  acara DOM. Memanggil <code> event.preventDefault () </ 0> 
akan membatalkan penutupan.</p>

<p>Biasanya Anda ingin menggunakan handler <code> beforeunload </ 0> untuk menentukan apakah jendela harus ditutup, yang juga akan dipanggil saat jendela dimuat ulang. Di Elektron , mengembalikan nilai selain <code> tidak terdefinisi </ 0> akan membatalkan penutupan. Sebagai contoh:</p>

<pre><code class="javascript">window.onbeforeunload = (e) = & gt; {
   console.log ('Saya tidak ingin ditutup')

   // Tidak seperti browser biasa, kotak pesan akan diminta ke pengguna, mengembalikan
   // nilai non-void diam-diam akan membatalkan penutupan.
  // Dianjurkan untuk menggunakan API dialog agar pengguna mengkonfirmasi penutupan
   // aplikasi.
  e.returnValue = false // equivalent to `return false` but not recommended
}
``</pre> 
  
  ***Note**: There is a subtle difference between the behaviors of `window.onbeforeunload = handler` and `window.addEventListener('beforeunload', handler)`. It is recommended to always set the `event.returnValue` explicitly, instead of just returning a value, as the former works more consistently within Electron.*
  
  #### Acara : 'ditutup'
  
  Emitted saat jendela tertutup. Setelah menerima acara ini, Anda harus menghapus referensi ke jendela dan tidak menggunakannya lagi.
  
  #### Event : 'session-end' * Windows </ 0></h4> 
  
  Emitted saat window session akan berakhir karena force shutdown atau restart mesin atau session log off.
  
  #### Acara : 'tidak responsif'
  
  Emitted saat halaman web menjadi tidak responsif.
  
  #### Acara: 'responsif'
  
  Emitted saat halaman web yang tidak responsif menjadi responsif lagi.
  
  #### Acara: 'blur'
  
  Emitted saat jendela kehilangan fokus.
  
  #### Acara: 'fokus'
  
  Emitted saat window gain fokus.
  
  #### Acara : 'show'
  
  Emitted saat jendela ditunjukkan.
  
  #### Acara: 'sembunyikan'
  
  Emitted saat jendela tersembunyi.
  
  #### Acara: 'siap tampil'
  
  Emitted ketika halaman web telah diberikan (sementara tidak ditampilkan) dan jendela dapat ditampilkan tanpa lampu kilat visual.
  
  #### Acara: 'maksimalkan'
  
  Emitted saat jendela dimaksimalkan.
  
  #### Acara : 'nonmaximize'
  
  Emitted saat jendela keluar dari keadaan maksimal.
  
  #### Acara : 'minimalkan'
  
  Emitted saat jendela diminimalkan.
  
  #### Acara : 'pulihkan'
  
  Emitted saat jendela dipulihkan dari keadaan diminimalkan.
  
  #### Acara : 'ubah ukuran'
  
  Dipancarkan saat jendela diubah ukurannya.
  
  #### Acara : 'pindah'
  
  Emitted saat jendela sedang dipindahkan ke posisi baru.
  
  ** Catatan </ 0> : Pada macOS , acara ini hanya alias ` pindah </ 1> .</p>

<h4>Acara : 'pindah' <em> macOS </ 0></h4>

<p>Emitted sekali saat jendela dipindahkan ke posisi baru.</p>

<h4>Acara : 'enter-full-screen'</h4>

<p>Emitted saat jendela memasuki keadaan layar penuh.</p>

<h4>Acara : 'tinggalkan layar penuh'</h4>

<p>Emitted saat jendela meninggalkan keadaan layar-penuh.</p>

<h4>Acara : 'enter-html-full-screen'</h4>

<p>Emitted saat jendela memasuki status layar-penuh yang dipicu oleh HTML API.</p>

<h4>Acara : 'leave-html-full-screen'</h4>

<p>Emitted saat jendela meninggalkan status layar-penuh yang dipicu oleh HTML API.</p>

<h4>Event : 'app-command' <em> Windows </ 0></h4>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara</li> 
  
  * ` perintah </ 0>  String</li>
</ul>

<p>Emitted when an <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx">App Command</a>
is invoked. Ini biasanya terkait dengan kunci media keyboard atau perintah browser, serta tombol "Kembali" yang terpasang pada beberapa mouse pada Windows .</p>

<p>Perintah diturunkan, underscore diganti dengan tanda hubung, dan
 awalan <code> APPCOMMAND_ </ 0> dilucuti.
misal <code> APPCOMMAND_BROWSER_BACKWARD </ 0> dipancarkan sebagai <code> browser-backward </ 0> .</p>

<pre><code class="javascript">const {BrowserWindow} = require ('electron') let win = new BrowserWindow () win.on ('app-command', (e, cmd) = & gt; {
   // Arahkan jendela kembali saat pengguna menyentuh mouse mereka kembali tombol
   jika (cmd === 'browser mundur' & amp; & amp; win.webContents.canGoBack ()) {
     win.webContents.goBack ()
   }})
`</pre> 
    #### Acara : 'gulir-sentuh-mulai' * macOS </ 0></h4> 
    
    Emitted saat scroll wheel event phase sudah dimulai.
    
    #### Acara : 'gulir-sentuh-akhir' * macOS </ 0></h4> 
    
    Emitted saat scroll wheel event phase sudah berakhir.
    
    #### Acara : 'gulir-sentuh-tepi' * macos </ 0></h4> 
    
    Emitted saat menggulirkan event wheel drive yang diajukan saat mencapai tepi elemen.
    
    #### Acara : 'gesek' * macOS </ 0></h4> 
    
    Pengembalian:
    
    * `event` Acara
    * ` arah </ 0>  String</li>
</ul>

<p>Emitted on 3-finger swipe. Petunjuk yang mungkin ada <code>atas `,` kanan `, `turun `, ` kiri `.</p> 
      #### Acara: 'sheet-begin' * macOS *
      
      Emitted saat jendela membuka selembar kertas.
      
      #### Acara : 'sheet-end' * macOS </ 0></h4> 
      
      Emitted ketika jendela telah ditutup lembar.
      
      #### Event: 'new-window-for-tab' *macOS*
      
      Emitted ketika tombol tab asli baru diklik.
      
      ### Metode Statis
      
      Kelas ` BrowserWindow ` memiliki metode statis berikut:
      
      #### `BrowserWindow.getAllWindows ()`
      
      Kembali ` BrowserWindow [] ` - Sebuah array dari semua jendela browser yang terbuka.
      
      #### `BrowserWindow.getFocusedWindow ()`
      
      Mengembalikan ` BrowserWindow ` - Jendela yang difokuskan pada aplikasi ini, jika tidak mengembalikan ` null `.
      
      #### `BrowserWindow.fromWebContents (webContents)`
      
      * `webContents` [WebContents](web-contents.md)
      
      Mengembalikan`BrowserWindow` - Jendela yang memiliki`contentContents `.
      
      #### `BrowserWindow.fromBrowserView(browserView)`
      
      * `browserView` [BrowserView](browser-view.md)
      
      Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.
      
      #### `BrowserWindow.fromId (id)`
      
      * `identitas` Integer
      
      Kembali ` BrowserWindow ` - Jendela dengan ` id ` yang diberikan.
      
      #### `BrowserWindow.addExtension (jalur)`
      
      * ` path </ 0>  String</li>
</ul>

<p>Menambahkan ekstensi Chrome yang terletak di <code> path `, dan mengembalikan nama ekstensi.</p> 
        Metode ini juga tidak akan kembali jika manifes ekstensi hilang atau tidak lengkap.
        
        ** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app ` dipancarkan.
        
        #### `BrowserWindow.removeExtension(name)`
        
        * ` nama </ 0>  String</li>
</ul>

<p>Hapus ekstensi Chrome dengan nama.</p>

<p><strong> Catatan: </strong> API ini tidak dapat dipanggil sebelum event <code> ready ` dari modul ` app ` dipancarkan.</p> 
          #### `BrowserWindow.getExtensions ()`
          
          Mengembalikan`Objek ` - Kunci adalah nama ekstensi dan setiap nilai Objek yang berisi`nama ` dan ` versi `propert.
          
          ** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app ` dipancarkan.
          
          #### `BrowserWindow.addDevToolsExtension (jalur)`
          
          * ` path </ 0>  String</li>
</ul>

<p>Menambahkan ekstensi DevTools yang terletak di <code> path`, dan mengembalikan nama ekstensi.</p> 
            Ekstensi akan diingat sehingga Anda hanya perlu memanggil API ini sekali, API ini bukan untuk penggunaan pemrograman. Jika Anda mencoba menambahkan ekstensi yang telah dimuat, metode ini tidak akan kembali dan sebaliknya log peringatan ke konsol.
            
            Metode ini juga tidak akan kembali jika manifes ekstensi hilang atau tidak lengkap.
            
            ** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app ` dipancarkan.
            
            #### `BrowserWindow.removeDevToolsExtension (nama)`
            
            * ` nama </ 0>  String</li>
</ul>

<p>Hapus ekstensi DevTools dengan nama.</p>

<p><strong> Catatan: </strong> API ini tidak dapat dipanggil sebelum event <code> ready ` dari modul ` app ` dipancarkan.</p> 
              #### `BrowserWindow.getDevToolsExtensions ()`
              
              Mengembalikan`Objek ` - Kunci adalah nama ekstensi dan setiap nilai Objek yang berisi`nama ` dan ` versi `propert.
              
              Untuk memeriksa apakah ada ekstensi DevTools, Anda dapat menjalankan yang berikut ini:
              
              ```javascript
              biarkan diinstal = {BrowserWindow}getDevToolsExtensions () hasOwnProperty ('devtron')
              console.log (terpasang)
              ```
              
              ** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app ` dipancarkan.
              
              ### Contoh properti
              
              Objek yang dibuat dengan`BrowserWindow baru ` memiliki properti berikut:
              
              ```javascript
              const {BrowserWindow} = membutuhkan ('elektron')
              // Dalam contoh ini `win` adalah contoh kami
              let win = new BrowserWindow ({width: 800, height: 600})
              win.loadURL ('https://github.com')
              ```
              
              #### `win.webContents`
              
              Objek ` WebContents ` yang dimiliki jendela ini. Semua acara terkait halaman web dan operasi akan dilakukan lewat itu.
              
              Lihat dokumentasi[ `webContents` ](web-contents.md)untuk metodenya dan acara.
              
              #### `win.id`
              
              A ` Integer </ 0> mewakili ID unik jendela.</p>

<h3>Metode Instance</h3>

<p>Objek yang dibuat dengan <code> BrowserWindow baru </ 0> memiliki metode contoh berikut:</p>

<p><strong>Catatan:</strong> Beberapa metode hanya tersedia pada sistem operasi tertentu dan diberi label seperti itu.</p>

<h4><code>win.destroy()`</h4> 
              
              Angkatan menutup jendela, ` membongkar </ 0> dan <code> beforeunload </ 0>  event tidak akan dipancarkan untuk halaman web, dan <code> dekat </ 0>  acara juga tidak akan dipancarkan untuk jendela ini, tetapi menjamin <code> ditutup </ 0>  acara akan dipancarkan.</p>

<h4><code>win.close ()`</h4> 
              
              Cobalah untuk menutup jendela. Ini memiliki efek yang sama dengan pengguna yang secara manual mengklik tombol tutup jendela. Halaman web bisa membatalkan close sekalipun. Lihat  acara tutup </ 0> .</p> 
              
              #### `win.focus ()`
              
              Berfokus pada jendela.
              
              #### `win.blur ()`
              
              Berfokus pada jendela.
              
              #### `win.isFocused ()`
              
              Mengembalikan ` Boolean </ 0> - Apakah jendela terfokus.</p>

<h4><code>win.isDestroyed ()`</h4> 
              
              Mengembalikan ` Boolean </ 0> - Apakah jendela rusak</p>

<h4><code>win.show ()`</h4> 
              
              Menunjukkan dan memberi fokus pada jendela.
              
              #### `win.showInactive ()`
              
              Menunjukkan jendela tapi tidak memusatkan perhatian padanya.
              
              #### `win.hide ()`
              
              Sembunyikan jendela.
              
              #### `win.isVisible ()`
              
              Mengembalikan ` Boolean </ 0> - Apakah jendela terlihat oleh pengguna.</p>

<h4><code>win.isModal ()`</h4> 
              
              Mengembalikan ` Boolean </ 0> - Apakah jendela saat ini adalah jendela modal.</p>

<h4><code>win.maximize ()`</h4> 
              
              Memaksimalkan jendela. Ini juga akan menunjukkan (tapi tidak fokus) jendela jika belum ditampilkan.
              
              #### `win.unmaximize ()`
              
              Unmaximizes jendela.
              
              #### `win.isMaximized ()`
              
              Mengembalikan ` Boolean </ 0> - Apakah jendela dimaksimalkan.</p>

<h4><code>win.minimize ()`</h4> 
              
              Meminimalkan jendela. Pada beberapa platform jendela yang diminimalkan akan ditampilkan di Dock .
              
              #### `win.restore ()`
              
              Mengembalikan jendela dari keadaan diminimalkan ke keadaan sebelumnya.
              
              #### `win.isMinimized ()`
              
              Mengembalikan ` Boolean </ 0> - Apakah jendela diminimalkan.</p>

<h4><code>win.setFullScreen (bendera)`</h4> 
              
              * `bendera` Boolean
              
              Menetapkan apakah jendela harus dalam mode fullscreen.
              
              #### `win.isFullScreen ()`
              
              Mengembalikan ` Boolean </ 0> - Apakah jendela dalam mode layar penuh.</p>

<h4><code>win.setSimpleFullScreen(flag)` *macOS*</h4> 
              
              * `bendera` Boolean
              
              Enters or leaves simple fullscreen mode.
              
              Simple fullscreen mode emulates the native fullscreen behavior found in versions of Mac OS X prior to Lion (10.7).
              
              #### `win.isSimpleFullScreen()` *macOS*
              
              Returns `Boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.
              
              #### ` win.setAspectRatio (aspectRatio [, extraSize]) </ 0>  <em> macos </ 1></h4>

<ul>
<li><code> aspectRatio </ 0> Float - Rasio aspek untuk mempertahankan sebagian dari tampilan konten.</li>
<li><code> extraSize </ 0>  <a href="structures/size.md"> Ukuran </ 1> - Ukuran ekstra tidak disertakan dengan tetap mempertahankan rasio aspek.</li>
</ul>

<p>Ini akan membuat jendela menjaga rasio aspek. Ukuran ekstra memungkinkan pengembang memiliki ruang, ditentukan dalam piksel, tidak termasuk dalam perhitungan rasio aspek. API ini sudah memperhitungkan perbedaan antara ukuran jendela dan ukuran isinya.</p>

<p>Pertimbangkan jendela normal dengan pemutar video HD dan kontrol yang terkait.
Mungkin ada 15 piksel kontrol di tepi kiri, 25 piksel kontrol di tepi kanan dan 50 piksel kontrol di bawah pemutar. Untuk mempertahankan rasio aspek 16: 9 (rasio aspek standar untuk HD @ 1920x1080) di dalam pemutar itu sendiri, kami akan memanggil fungsi ini dengan argumen 16/9 dan [40, 50]. Argumen kedua tidak peduli di mana lebar dan tinggi ekstra berada dalam tampilan konten--hanya isinya. Tentukan area lebar dan tinggi ekstra yang Anda miliki dalam keseluruhan tampilan konten.</p>

<h4><code> win.previewFile (path [, displayName]) </ 0>  <em> macos </ 1></h4>

<ul>
<li><code> path </ 0>  String - Path absolut ke file untuk dipratinjau dengan QuickLook. Hal ini penting karena Quick Look menggunakan nama file dan ekstensi file pada path untuk menentukan jenis konten file yang akan dibuka.</li>
<li><code> displayName </ 0>  String (opsional) - Nama file yang akan ditampilkan pada tampilan modal Quick Look. Ini murni visual dan tidak mempengaruhi jenis konten file. Default ke <code> path </ 0> .</li>
</ul>

<p>Menggunakan <a href="https://en.wikipedia.org/wiki/Quick_Look"> Quick Look </ 0> untuk melihat pratinjau file di jalur tertentu.</p>

<h4><code> win.closeFilePreview () </ 0>  <em> macos </ 1></h4>

<p>Menutup panel <a href="https://en.wikipedia.org/wiki/Quick_Look"> Quick Look </ 0> yang sedang terbuka .</p>

<h4><code>win.setBounds (batas [, bernyawa])`
              
              * `batas` [Empat persegi panjang](structures/rectangle.md)
              * `animate` Boolean (optional) *macOS*
              
              Mengubah ukuran dan memindahkan jendela ke batas yang tersedia
              
              #### `win.getBounds ()`
              
              Kembali [`Rectangle`](structures/rectangle.md)
              
              #### `win.setContentBounds (batas [, bernyawa])`
              
              * `batas` [Empat persegi panjang](structures/rectangle.md)
              * `animate` Boolean (optional) *macOS*
              
              Mengubah ukuran dan memindahkan area klien jendela (misalnya halaman web) ke batas yang tersedia.
              
              #### `win.getContentBounds ()`
              
              Kembali [`Rectangle`](structures/rectangle.md)
              
              #### `win.setEnabled(enable)`
              
              * `enable` Boolean
              
              Disable or enable the window.
              
              #### `win.setSize (lebar, tinggi [, bernyawa])`
              
              * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
<li><code>animate` Boolean (optional) *macOS*
              
              Mengubah ukuran jendela menjadi ` width </ 0> dan <code> height </ 0> .</p>

<h4><code>win.getSize ()`</h4> 
              
              Mengembalikan ` Integer [] </ 0> - Berisi lebar dan tinggi jendela.</p>

<h4><code>win.setContentSize(width, height[, animate])`</h4> 
              
              * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
<li><code>animate` Boolean (optional) *macOS*
              
              Mengubah ukuran jendela area klien (misalnya halaman web) untuk `lebar` dan `tinggi`.
              
              #### `win.getContentSize ()`
              
              Mengembalikan ` Integer [] </ 0> - Berisi lebar dan tinggi area jendela klien.</p>

<h4><code>win.setMinimumSize (lebar, tinggi)`</h4> 
              
              * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
</ul>

<p>Menetapkan ukuran minimum jendela menjadi <code> width </ 0> dan <code> height </ 0> .</p>

<h4><code>win.getMinimumSize ()`</h4> 
                Mengembalikan`Integer [] ` - Berisi lebar minimum dan tinggi jendela.
                
                #### `win.setMaximumSize (lebar, tinggi)`
                
                * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
</ul>

<p>Menetapkan ukuran maksimum jendela menjadi <code>lebar ` dan`tinggi `.</p> 
                  #### `win.getMaximumSize ()`
                  
                  Mengembalikan ` Integer [] </ 0> - Berisi lebar dan tinggi maksimum jendela.</p>

<h4><code>win.setResizable (resizable)`</h4> 
                  
                  * ` resizable </ 0>  Boolean</li>
</ul>

<p>Menetapkan apakah jendela dapat diubah ukurannya secara manual oleh pengguna.</p>

<h4><code>win.isResizable ()`</h4> 
                    Mengembalikan ` Boolean </ 0> - Apakah jendela dapat diubah ukurannya secara manual oleh pengguna.</p>

<h4><code> win.setMovable (dapat dipindahkan) </ 0>  <em> macOS </ 1>  <em> Windows </ 1></h4>

<ul>
<li><code> bergerak </ 0>  Boolean</li>
</ul>

<p>Menetapkan apakah jendela dapat dipindahkan oleh pengguna. Di Linux tidak melakukan apapun.</p>

<h4><code>win.isMovable()` *macOS* *Windows*</h4> 
                    
                    Mengembalikan ` Boolean </ 0> - Apakah jendela dapat dipindahkan oleh pengguna.</p>

<p>Di Linux selalu kembali <code> true </ 0> .</p>

<h4><code> win.setMinimizable (minimizable) </ 0>  <em> macOS </ 1>  <em> Windows </ 1></h4>

<ul>
<li><code> diminimalkan </ 0>  Boolean</li>
</ul>

<p>Menetapkan apakah jendela dapat diminimalkan secara manual oleh pengguna. Di Linux tidak melakukan apapun.</p>

<h4><code> win.isMinimizable () </ 0>  <em> macos </ 1>  <em> Windows </ 1></h4>

<p>Mengembalikan <code> Boolean </ 0> - Apakah jendela dapat diminimalkan secara manual oleh pengguna</p>

<p>Di Linux selalu kembali <code> true </ 0> .</p>

<h4><code>win.setMaximizable(maximizable)` *macOS* *Windows*</h4> 
                    
                    * `maximizable` Boolean
                    
                    Menetapkan apakah jendela dapat dimaksimalkan secara manual oleh pengguna. Di Linux tidak melakukan apapun.
                    
                    #### `win.isMaximizable()` *macOS* *Windows*
                    
                    Kembali `Boolean` - Apakah jendela dapat dimaksimalkan secara manual oleh pengguna.
                    
                    Di Linux selalu kembali ` true </ 0> .</p>

<h4><code>win.setFullScreenable (fullscreenable)`</h4> 
                    
                    * ` fullscreenable </ 0>  Boolean</li>
</ul>

<p>Menetapkan apakah tombol perbesar/zoom window toggles fullscreen mode atau memaksimalkan jendela.</p>

<h4><code>win.isFullScreenable ()`</h4> 
                      Kembali `Boolean` - Apakah tombol jendela memaksimalkan/zoom Matikan modus fullscreen atau memaksimalkan jendela.
                      
                      #### `win.setClosable(closable)` *macOS* *Windows*
                      
                      * `closable` Boolean
                      
                      Menetapkan apakah jendela dapat ditutup secara manual oleh pengguna. Di Linux tidak melakukan apapun.
                      
                      #### `win.isClosable()` *macOS* *Windows*
                      
                      Kembali `Boolean` - Apakah jendela bisa ditutup secara manual oleh pengguna.
                      
                      Di Linux selalu kembali ` true </ 0> .</p>

<h4><code>win.setAlwaysOnTop (bendera [, tingkat] [, relativeLevel])`</h4> 
                      
                      * `bendera` Boolean
                      * `tingkat` String (opsional) *macOS* - nilai mencakup `normal`, `mengambang`, `robek-off-menu`, `modal-panel`, `menu utama`, `status`, `pop-putus-menu`, `layar-saver`, dan ~ ~ `dermaga` ~ ~ (sudah ditinggalkan). Default adalah `mengambang`. Lihat [macOS docs](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels) untuk rincian lebih lanjut.
                      * `relativeLevel` Bulat (opsional) *macOS* - jumlah lapisan yang lebih tinggi untuk mengatur jendela ini relatif terhadap `tingkat`. Default adalah ``. Perhatikan bahwa Apple menghambat pengaturan tingkat lebih tinggi dari 1 di atas `layar-saver`.
                      
                      Menetapkan apakah jendela harus selalu tampil di atas jendela lain. Setelah pengaturan ini, jendela masih merupakan jendela normal, bukan jendela toolbox yang tidak bisa difokuskan.
                      
                      #### `win.isAlwaysOnTop()`
                      
                      Kembali `Boolean` - Apakah jendela selalu di atas jendela lainnya.
                      
                      #### `win.center()`
                      
                      Memindahkan jendela ke bagian tengah layar.
                      
                      #### `win.setPosition (x, y [, bernyawa])`
                      
                      * `x` Integer
                      * `y` Integer
                      * `animate` Boolean (optional) *macOS*
                      
                      Bergerak jendela `x` dan `y`.
                      
                      #### `win.getPosition()`
                      
                      Mengembalikan `Integer []` - berisi jendela posisi saat ini.
                      
                      #### `win.setTitle(title)`
                      
                      * ` judul </ 0> String</li>
</ul>

<p>Perubahan judul jendela asli <code>judul`.</p> 
                        #### `win.getTitle()`
                        
                        Mengembalikan `String` - judul jendela asli.
                        
                        **Catatan:** Judul halaman web dapat berbeda dari judul jendela asli.
                        
                        #### `win.setSheetOffset (offsetY [, offsetX])` *macOS*
                        
                        * `offsetY` Mengambang
                        * `offsetX` Mengambang (opsional)
                        
                        Perubahan titik lampiran untuk lembar on macOS. Secara default, lembar yang terpasang di bawah bingkai jendela, tetapi Anda mungkin ingin menampilkan mereka di bawah toolbar HTML yang diberikan. Sebagai contoh:
                        
                        ```javascript
                        const {BrowserWindow} = membutuhkan ('elektron')
                        biarkan menang = new BrowserWindow()
                        
                        biarkan toolbarRect = document.getElementById ('toolbar').getBoundingClientRect()
                        win.setSheetOffset(toolbarRect.height)
                        ```
                        
                        #### `win.flashFrame(bendera)`
                        
                        * `bendera` Boolean
                        
                        Mulai atau berhenti berkedip kedip jendela untuk menarik perhatian pengguna.
                        
                        #### `win.setSkipTaskbar(skip)`
                        
                        * `melompat` Boolean
                        
                        Membuat jendela tidak tampil di taskbar.
                        
                        #### `win.setKiosk(flag)`
                        
                        * `bendera` Boolean
                        
                        Masuk atau keluar dari mode kiosk.
                        
                        #### `win.isKiosk()`
                        
                        Kembali `Boolean` - Apakah jendela dalam kiosk mode.
                        
                        #### `win.getNativeWindowHandle()`
                        
                        Kembali `Buffer` - spesifik platform handle dari window.
                        
                        Jenis pegangan yang asli adalah `HWND` pada Windows, `NSView *` pada `jendela` (`lama unsigned`) di Linux dan macOS.
                        
                        #### `win.hookWindowMessage (pesan, callback)` *Windows*
                        
                        * ` pesan </ 0> Integer</li>
<li><code>callback ` Fungsi
                        
                        Mengait pesan windows The ` callback </ 0> disebut ketika pesan diterima di WndProc.</p>

<h4><code> win.isWindowMessageHooked (pesan) </ 0>  <em> Windows </ 1></h4>

<ul>
<li><code> pesan </ 0> Integer</li>
</ul>

<p>Mengembalikan <code>Boolean` - `true` atau `false` tergantung pada apakah pesan itu ketagihan.
                        
                        #### ` win.unhookWindowMessage (pesan) </ 0>  <em> Windows </ 1></h4>

<ul>
<li><code> pesan </ 0> Integer</li>
</ul>

<p>Hapus kembali pesan jendela</p>

<h4><code> win.unhookAllWindowMessages () </ 0>  <em> Windows </ 1></h4>

<p>Lepaskan semua pesan di jendela.</p>

<h4><code>win.setRepresentedFilename (filename)` *macos*
                        
                        * `filename` String
                        
                        Menetapkan nama path dari file yang diwakili jendela, dan ikon file akan muncul di bilah judul jendela.
                        
                        #### `win.getRepresentedFilename()` *macos*
                        
                        Mengembalikan ` String ` - Pathname dari file yang diwakili jendela.
                        
                        #### `win.setDocumentEdited(diedit)` *macos*
                        
                        * ` diedit </ 0> Boolean</li>
</ul>

<p>Specifies whether the window’s document has been edited, and the icon in title
bar will become gray when set to <code>true`.</p> 
                          #### `win.isDocumentEdited()` *macos*
                          
                          Mengembalikan `Boolean` - Apakah dokumen jendela telah diedit.
                          
                          #### `win.focusOnWebView ()`
                          
                          #### `win.blurWebView ()`
                          
                          #### `win.capturePage ([rect,] callback)`
                          
                          * ` rect </ 0>  <a href="structures/rectangle.md"> Rectangle </ 1> (opsional) - Batas untuk ditangkap</li>
<li><code>callback` Fungsi 
                            * ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
</ul></li>
</ul>

<p>Sama seperti <code>webContents.capturePage ([rect,]callback)`.</p> 
                              #### `win.loadURL (url [, options])`
                              
                              * `url` String
                              * `pilihan` Objek (opsional) 
                                * ` httpReferrer </ 0>  String (opsional) - url Referrer HTTP.</li>
<li><code>userAgent` String (opsional) - agen pengguna berasal permintaan.
                                * ` extraHeaders ` String (opsional) - Header ekstra yang dipisahkan oleh " \n "
                                * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
                                * ` baseURLForDataURL </ 0>  String (opsional) - URL dasar (dengan pemisah jalur trailing) untuk file yang akan dimuat oleh url data. Hal ini diperlukan hanya jika ditentukan <code>url` data url dan perlu memuat file lainnya.
                              
                              Sama seperti ` webContents.loadURL (url [, options]) `.
                              
                              `url` dapat berupa alamat jauh (misalnya `http://`) atau jalur ke lokal File HTML menggunakan protokol `file://`.
                              
                              Untuk memastikan bahwa file URL diformat, dianjurkan untuk menggunakan Node ini ` url.format </ 0> 
Metode:</p>

<pre><code class="javascript">biarkan url = require('url').format({
  protokol: 'file',
  garis miring: benar,
  pathname: require ('path'). join(__ dirname, 'index.html')
})

win.loadURL(url)
`</pre> 
                              
                              Anda dapat memuat URL menggunakan permintaan ` POST </ 0> dengan data yang dikodekan URL dengan melakukan hal berikut:</p>

<pre><code class="javascript">win.loadURL ('http: // localhost: 8000 / post', {
   postData: [{
     type: 'rawData',
     bytes: Buffer.from ('hello = world')
   }],
   extraHeaders: aplikasi 'Content-Type: / x-www-form-urlencoded '})
`</pre> 
                              
                              #### `win.loadFile(filePath)`
                              
                              * `fullPath` String
                              
                              Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.
                              
                              #### `win.reload ()`
                              
                              Sama seperti ` webContents.reload </ 0> .</p>

<h4><code>win.setMenu(menu)` *Linux* *Windows*</h4> 
                              
                              * `menu` Menu | batal
                              
                              Menetapkan ` menu ` bar menu jendela, pengaturan untuk ` nol ` akan menghapus menu bar.
                              
                              #### `win.setProgressBar (kemajuan [, pilihan])`
                              
                              * ` kemajuan ` Double
                              * `pilihan` Objek (opsional) 
                                * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.
                              
                              Menetapkan nilai kemajuan di bilah kemajuan. Kisaran valid adalah [0, 1.0].
                              
                              Hapus bilah kemajuan saat kemajuan <0; Ubah ke mode tak tentu saat mencapai kemajuan> 1.
                              
                              Pada platform Linux, hanya mendukung lingkungan desktop Unity, Anda perlu menentukan nama file ` *.desktop ` ke ` desktopName ` di ` package.json `. Secara default, ini akan mengasumsikan ` app.getName (). Desktop </ 0> .</p>

<p>Pada Windows , mode bisa dilewati. Nilai yang diterima adalah <code>none`, `normal`, `tak tentu`, `kesalahan`, dan `dijeda`. Jika Anda memanggil `setProgressBar` tanpa a mode set (tapi dengan nilai dalam kisaran yang valid), `normal` akan diasumsikan.
                              
                              #### `win.setOverlayIcon (overlay, deskripsi)` *Windows*
                              
                              * `overlay` [NativeImage](native-image.md) - ikon untuk ditampilkan di bagian bawah sudut kanan ikon taskbar. Jika parameter ini `null`, hamparannya dibersihkan
                              * `deskripsi` String - deskripsi yang akan diberikan pada Aksesibilitas pembaca layar
                              
                              Mengatur 16 x 16 piksel overlay ke ikon taskbar saat ini, biasanya digunakan untuk sampaikan semacam status aplikasi atau secara pasif memberitahukan pengguna.
                              
                              #### `win.setHasShadow (hasShadow)` *macos*
                              
                              * `hasShadow` Boolean
                              
                              Menetapkan apakah jendela harus memiliki bayangan. Pada Windows dan Linux tidak melakukan apapun.
                              
                              #### `win.hasShadow()` *macos *
                              
                              Mengembalikan `Boolean` - Apakah jendela memiliki bayangan.
                              
                              Pada Windows dan Linux selalu kembali `benar`.
                              
                              #### `win.setOpacity(opacity)` *Windows* *macOS*
                              
                              * `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)
                              
                              Sets the opacity of the window. On Linux does nothing.
                              
                              #### `win.getOpacity()` *Windows* *macOS*
                              
                              Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque)
                              
                              #### `win.setThumbarButtons (tombol)` *Windows*
                              
                              * `tombol` [ThumbarButton[]](structures/thumbar-button.md)
                              
                              Mengembalikan `Boolean` - Apakah tombol berhasil ditambahkan
                              
                              Tambahkan toolbar thumbnail dengan serangkaian tombol yang ditentukan ke gambar thumbnail sebuah jendela di tata letak tombol taskbar. Mengembalikan objek `Boolean` apakah thumbnail telah berhasil ditambahkan.
                              
                              Jumlah tombol di toolbar thumbnail seharusnya tidak lebih besar dari 7 karena terbatasnya ruang. Setelah Anda menyiapkan toolbar thumbnail, toolbar tidak dapat dihapus karena keterbatasan platform. Tapi Anda bisa memanggil API dengan array kosong untuk membersihkan tombol.
                              
                              `Tombol` adalah array dari objek `Button`:
                              
                              * `Tombol` Obyek 
                                * `ikon` [NativeImage](native-image.md) - Ikon ditampilkan di thumbnail toolbar.
                                * ` klik </ 0> Fungsi</li>
<li><code> tooltip </ 0>  String (opsional) - Teks tooltip tombol.</li>
<li><code> flag </ 0>  String [] (opsional) - Mengontrol keadaan dan perilaku tombol tertentu. Secara default, itu adalah <code> ['enabled'] </ 0> .</li>
</ul></li>
</ul>

<p>The <code> bendera </ 0> adalah array yang yang dapat mencakup berikut <code> String </ 0> s:</p>

<ul>
<li><code> diaktifkan </ 0> - Tombol aktif dan tersedia untuk pengguna.</li>
<li><code> dinonaktifkan </ 0> - Tombol dinonaktifkan. Ini ada, namun memiliki keadaan visual yang mengindikasikan bahwa hal itu tidak akan merespons tindakan pengguna.</li>
<li><code> dismissonclick </ 0> - Saat tombol diklik, jendela thumbnail segera ditutup.</li>
<li><code> nobackground </ 0> - Jangan menggambar batas tombol, gunakan hanya gambarnya.</li>
<li><code> hidden </ 0> - Tombol tidak ditunjukkan ke pengguna.</li>
<li><code> noninteraktif </ 0> - Tombol diaktifkan tapi tidak interaktif; tidak ada tombol tekan yang ditarik. Nilai ini ditujukan untuk contoh di mana tombol digunakan dalam pemberitahuan.</li>
</ul>

<h4><code>win.setThumbnailClip (wilayah)` *Windows*</h4> 
                                  * `wilayah` [Rectangle](structures/rectangle.md) - Wilayah jendela
                                  
                                  Mengatur area jendela untuk ditampilkan saat gambar thumbnail ditampilkan saat melayang di atas jendela di taskbar. Anda dapat menyetel thumbnail untuk seluruh jendela dengan menentukan daerah kosong: `{x: 0, y: 0, lebar: 0, tinggi: 0}`.
                                  
                                  #### `win.setThumbnailToolTip(toolTip)` *Windows*
                                  
                                  * `toolTip` String
                                  
                                  Menetapkan toolTip yang ditampilkan saat melayang di atas thumbnail jendela di taskbar.
                                  
                                  #### `win.setAppDetails(options)` *Windows*
                                  
                                  * `pilihan` Obyek 
                                    * `appId` String (opsional) - jendela [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). Itu harus diatur, jika tidak pilihan lain tidak akan berpengaruh.
                                    * `appId` String (opsional) - jendela [App User Model Id](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
                                    * `appIconIndex` Bulat (opsional) - indeks ikon dalam `appIconPath`. Diabaikan ketika `appIconPath` tidak diatur. Default adalah ``.
                                    * `appId` String (opsional) - jendela [App User Model Id](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
                                    * `appId` String (opsional) - jendela [App User Model Id](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).
                                  
                                  Mengatur properti untuk tombol taskbar jendela.
                                  
                                  **Catatan:** `relaunchCommand` dan `relaunchDisplayName` harus selalu diatur bersama-sama. Jika salah satu properti-properti tidak diset, maka tidak akan digunakan.
                                  
                                  #### `win.showDefinitionForSelection()` *macOS*
                                  
                                  Sama seperti `webContents.showDefinitionForSelection()`.
                                  
                                  #### `win.setIcon(icon)` *Windows* *Linux*
                                  
                                  * `ikon` [NativeImage](native-image.md)
                                  
                                  Ubah ikon jendela.
                                  
                                  #### `win.setAutoHideMenuBar(hide)`
                                  
                                  * `Sembunyikan` Boolean
                                  
                                  Menetapkan apakah jendela menu bar harus menyembunyikan diri secara otomatis. Pernah mengatur menu bar hanya akan menunjukkan bila pengguna menekan tombol `Alt` tunggal.
                                  
                                  Jika bilah menu sudah terlihat, memanggil `setAutoHideMenuBar(true)` tidak menyembunyikan itu segera.
                                  
                                  #### `win.isMenuBarAutoHide()`
                                  
                                  Kembali `Boolean` - Apakah bilah menu secara otomatis menyembunyikan dirinya sendiri.
                                  
                                  #### `win.setMenuBarVisibility(visible)` *Windows* *Linux*
                                  
                                  * `terlihat` Boolean
                                  
                                  Menetapkan apakah menu bar harus terlihat. Jika auto-Sembunyikan menu bar, pengguna dapat masih memunculkan bilah menu dengan menekan tombol `Alt` tunggal.
                                  
                                  #### `win.isMenuBarVisible()`
                                  
                                  Kembali `Boolean` - Apakah menu bar terlihat.
                                  
                                  #### `win.setVisibleOnAllWorkspaces(visible)`
                                  
                                  * `terlihat` Boolean
                                  
                                  Menetapkan apakah jendela harus terlihat pada semua ruang kerja.
                                  
                                  **Catatan:** API ini tidak apa-apa pada Windows.
                                  
                                  #### `win.isVisibleOnAllWorkspaces()`
                                  
                                  Kembali `Boolean` - Apakah jendela terlihat pada semua workspace.
                                  
                                  **Catatan:** API ini selalu kembali palsu pada Windows.
                                  
                                  #### `win.setIgnoreMouseEvents(ignore[, options])`
                                  
                                  * `mengabaikan` Boolean
                                  * `pilihan` Objek (opsional) 
                                    * `forward` Boolean (optional) *Windows* - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.
                                  
                                  Membuat jendela mengabaikan semua kejadian mouse.
                                  
                                  Semua kejadian mouse yang terjadi di jendela ini akan diteruskan ke jendela di bawah jendela ini, namun jika jendela ini fokus, masih akan ada acara keyboard.
                                  
                                  #### `win.setContentProtection(enable)` *macOS* *Windows*
                                  
                                  * `enable` Boolean
                                  
                                  Mencegah isi jendela ditangkap oleh aplikasi lain.
                                  
                                  On macOS itu set NSWindow sharingType untuk NSWindowSharingNone. Pada Windows itu panggilan SetWindowDisplayAffinity dengan `WDA_MONITOR`.
                                  
                                  #### `win.setFocusable(focusable)` *Windows*
                                  
                                  * `focusable` Boolean
                                  
                                  Perubahan apakah jendela bisa difokuskan.
                                  
                                  #### `win.setParentWindow(parent)` *Linux* *macOS*
                                  
                                  * `orang tua` BrowserWindow
                                  
                                  Set `orangtua` sebagai jendela aktif jendela induk, melewati `null` akan mengubah jendela ke jendela di tingkat atas.
                                  
                                  #### `win.getParentWindow()`
                                  
                                  Kembali `[BrowserWindow]` - semua jendela anak.
                                  
                                  #### `win.getChildWindows()`
                                  
                                  Kembali `[BrowserWindow]` - semua jendela anak.
                                  
                                  #### `win.setAutoHideCursor(autoHide)` *macOS*
                                  
                                  * `autoHide` Boolean
                                  
                                  Mengontrol apakah akan menyembunyikan kursor saat mengetik.
                                  
                                  #### `win.selectPreviousTab()` *macOS*
                                  
                                  Selects the previous tab when native tabs are enabled and there are other tabs in the window.
                                  
                                  #### `win.selectNextTab()` *macOS*
                                  
                                  Selects the next tab when native tabs are enabled and there are other tabs in the window.
                                  
                                  #### `win.mergeAllWindows()` *macOS*
                                  
                                  Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.
                                  
                                  #### `win.moveTabToNewWindow()` *macOS*
                                  
                                  Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.
                                  
                                  #### `win.toggleTabBar()` *macOS*
                                  
                                  Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.
                                  
                                  #### `win.addTabbedWindow(browserWindow)` *macOS*
                                  
                                  * `browserWindow` BrowserWindow
                                  
                                  Adds a window as a tab on this window, after the tab for the window instance.
                                  
                                  #### `win.setVibrancy(type)` *macOS*
                                  
                                  * `jenis` String - dapat `berbasis penampilan`, `terang`, `gelap`, `titlebar`, `pilihan`, `menu`, `popover`, `sidebar`, `menengah-cahaya` atau `ultra gelap`. Lihat [dokumentasi macOS](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) untuk rincian lebih lanjut.
                                  
                                  Menambahkan efek semangat ke jendela browser. Melewati `null` atau string kosong akan menghapus semangat efek pada jendela.
                                  
                                  #### `win.setTouchBar(touchBar)` *macOS* *Linux*
                                  
                                  * `touchBar` TouchBar
                                  
                                  Mengatur tata letak touchBar untuk jendela aktif. Menentukan `null` atau `undefined` membersihkan bar sentuhan. Metode ini hanya memiliki efek jika mesin memiliki panel sentuh dan berjalan di macos 10.12.1+.
                                  
                                  **Catatan:** TouchBar API saat ini masih bersifat eksperimental dan mungkin akan berubah atau dihapus saat rilis elektron di masa depan.
                                  
                                  #### `win.setBrowserView (browserView)` *Eksperimental*
                                  
                                  * `browserView` [BrowserView](browser-view.md)
                                  #### `win.getBrowserView()` *Experimental*
                                  
                                  Returns `BrowserView | null` - an attached BrowserView. Returns `null` if none is attached.
                                  
                                  **Catatan:** lihat browser API masih bersifat eksperimental dan mungkin mengubah atau dihapus elektron pada masa depan.