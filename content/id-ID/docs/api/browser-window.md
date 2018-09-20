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
      * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`. *This property is experimental*
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
      * `enableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.
      * `disableBlinkFeatures` String (opsional) - Daftar string fitur yang dipisahkan oleh `,`, seperti ` CSSVariables, KeyboardEventKey` untuk menonaktifkannya. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.
      * `defaultFontFamily` Object (optional) - Menetapkan font default untuk font-family. 
        * `standar` String (opsional) - Default ke `Times New Roman`.
        * `serif` String (opsional) - Default ke `Times New Roman`.
        * `sansSerif` String (opsional) - Default ke `Arial`.
        * `monospace` String (opsional) - Default ke `Kurir Baru`.
        * `cursive` String (opsional) - Default ke `Script`.
        * `fantasy` String (opsional) - Default ke `Impact`.
      * `defaultFontSize` Integer (opsional) - Default ke `16`.
      * `defaultMonospaceFontSize` Integer (opsional) - Default ke `13`.
      * `minimumFontSize` Integer (opsional) - Default ke `0`.
      * `defaultEncoding` String (opsional) - Default ke `ISO-8859-1`.
      * `backgroundThrottling` Boolean (opsional) - Apakah akan mencekik animasi dan timer? Saat halaman menjadi background. This also affects the [Page Visibility API](#page-visibility). Default ke ` true </ 0> .</li>
<li><code> offscreen </ 0>  Boolean (opsional) - Apakah akan mengaktifkan rendering offscreen untuk jendela browser. Default ke <code> false </ 0> . Lihat
 tutorial rendering <a href="../tutorial/offscreen-rendering.md"> offscreen </ 0> untuk lebih jelasnya.</li>
<li><code> contextIsolation </ 0>  Boolean (opsional) - Apakah akan menjalankan API Elektron dan skrip <code> preload </ 0> yang ditentukan dalam konteks JavaScript yang terpisah . Default ke <code> false </ 0> . Konteks script <code> preload ` berjalan masih akan memiliki akses penuh ke jendela ` document `dan` window` namun akan menggunakan set sendiri JavaScript builtins ( `Array`, `Objek`, `JSON`, dll.) Dan akan diisolasi dari perubahan yang dilakukan pada lingkungan global oleh laman yang dimuat. The Electron API hanya akan tersedia di ` preload </ 0> naskah dan bukan halaman dimuat. Opsi ini harus digunakan saat memuat konten remote yang berpotensi tidak tepercaya untuk memastikan konten yang dimuat tidak dapat merusak skrip <code> preload </ 0> dan setiap API Elektron yang digunakan.
Opsi ini menggunakan teknik yang sama yang digunakan oleh <a href="https://developer.chrome.com/extensions/content_scripts#execution-environment"> Chrome Content Scripts </ 0> .
Anda dapat mengakses konteks ini di alat dev dengan memilih entri ' Elektron Isolated Context' di kotak kombo di bagian atas tab Konsol. <strong> Catatan: </ 0> Ini pilihan saat ini eksperimental dan dapat berubah atau dihapus di masa Elektron rilis.</li>
<li><code>nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
      * ` webviewTag ` Boolean (opsional) - Apakah untuk mengaktifkan[`<webview>`tag](webview-tag.md). Default untuk nilai ` nodeIntegration ` option . ** Catatan: ** ` preload ` Script dikonfigurasi untuk `<webview>` akan memiliki simpul integrasi diaktifkan ketika dieksekusi sehingga Anda harus memastikan remote / konten yang tidak dipercaya tidak mampu menciptakan `<webview>` tag dengan mungkin ` preload ` script. Anda dapat menggunakan `akan melampirkan tampilan web` acara di [webContents](web-contents.md) untuk mengupas dengan` preload` naskah dan untuk memvalidasi atau mengubah `<webview>` 's pengaturan awal.
      * `additionalArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.
      * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Default is `false`.
      * `safeDialogsMessage` String (optional) - The message to display when consecutive dialog protection is triggered. If not defined the default message would be used, note that currently the default message is in English and not localized.
      * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Default is `false`.
  
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
  
  ***Note**: There is a subtle difference between the behaviors of `window.onbeforeunload = handler` and `window.addEventListener('beforeunload', handler)`. It is recommended to always set the `event.returnValue` explicitly, instead of only returning a value, as the former works more consistently within Electron.*
  
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
  
  **Note**: On macOS this event is an alias of `moved`.
  
  #### Acara : 'pindah' * macOS </ 0></h4> 
  
  Emitted sekali saat jendela dipindahkan ke posisi baru.
  
  #### Acara : 'enter-full-screen'
  
  Emitted saat jendela memasuki keadaan layar penuh.
  
  #### Acara : 'tinggalkan layar penuh'
  
  Emitted saat jendela meninggalkan keadaan layar-penuh.
  
  #### Acara : 'enter-html-full-screen'
  
  Emitted saat jendela memasuki status layar-penuh yang dipicu oleh HTML API.
  
  #### Acara : 'leave-html-full-screen'
  
  Emitted saat jendela meninggalkan status layar-penuh yang dipicu oleh HTML API.
  
  #### Event : 'app-command' * Windows </ 0></h4> 
  
  Pengembalian:
  
  * `acara` Acara
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
      
      Returns `BrowserWindow | null` - The window that is focused in this application, otherwise returns `null`.
      
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

<h4><code>win.close()`</h4> 
              
              Cobalah untuk menutup jendela. Ini memiliki efek yang sama dengan pengguna yang secara manual mengklik tombol tutup jendela. Halaman web bisa membatalkan close sekalipun. Lihat  acara tutup </ 0> .</p> 
              
              #### `win.focus()`
              
              Berfokus pada jendela.
              
              #### `win.blur()`
              
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
Mungkin ada 15 piksel kontrol di tepi kiri, 25 piksel kontrol di tepi kanan dan 50 piksel kontrol di bawah pemutar. Untuk mempertahankan rasio aspek 16: 9 (rasio aspek standar untuk HD @ 1920x1080) di dalam pemutar itu sendiri, kami akan memanggil fungsi ini dengan argumen 16/9 dan [40, 50]. Argumen kedua tidak peduli di mana lebar dan tinggi ekstra berada dalam tampilan konten--hanya isinya. Sum any extra width and
height areas you have within the overall content view.</p>

<p>Calling this function with a value of <code>0` will remove any previously set aspect ratios.</p> 
              
              #### ` win.previewFile (path [, displayName]) </ 0>  <em> macos </ 1></h4>

<ul>
<li><code> path </ 0>  String - Path absolut ke file untuk dipratinjau dengan QuickLook. Hal ini penting karena Quick Look menggunakan nama file dan ekstensi file pada path untuk menentukan jenis konten file yang akan dibuka.</li>
<li><code> displayName </ 0>  String (opsional) - Nama file yang akan ditampilkan pada tampilan modal Quick Look. Ini murni visual dan tidak mempengaruhi jenis konten file. Default ke <code> path </ 0> .</li>
</ul>

<p>Uses <a href="https://en.wikipedia.org/wiki/Quick_Look">Quick Look</a> to preview a file at a given path.</p>

<h4><code> win.closeFilePreview () </ 0>  <em> macos </ 1></h4>

<p>Closes the currently open <a href="https://en.wikipedia.org/wiki/Quick_Look">Quick Look</a> panel.</p>

<h4><code>win.setBounds (batas [, bernyawa])`
              
              * `batas` [Empat persegi panjang](structures/rectangle.md)
              * `animate` Boolean (optional) *macOS*
              
              Resizes and moves the window to the supplied bounds
              
              #### `win.getBounds ()`
              
              Kembali [`Rectangle`](structures/rectangle.md)
              
              #### `win.setContentBounds (batas [, bernyawa])`
              
              * `batas` [Empat persegi panjang](structures/rectangle.md)
              * `animate` Boolean (optional) *macOS*
              
              Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.
              
              #### `win.getContentBounds ()`
              
              Kembali [`Rectangle`](structures/rectangle.md)
              
              #### `win.setEnabled(enable)`
              
              * `enable` Boolean
              
              Disable or enable the window.
              
              #### `win.setSize (lebar, tinggi [, bernyawa])`
              
              * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
<li><code>animate` Boolean (optional) *macOS*
              
              Resizes the window to `width` and `height`.
              
              #### `win.getSize ()`
              
              Returns `Integer[]` - Contains the window's width and height.
              
              #### `win.setContentSize(width, height[, animate])`
              
              * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
<li><code>animate` Boolean (optional) *macOS*
              
              Resizes the window's client area (e.g. the web page) to `width` and `height`.
              
              #### `win.getContentSize ()`
              
              Returns `Integer[]` - Contains the window's client area's width and height.
              
              #### `win.setMinimumSize (lebar, tinggi)`
              
              * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
</ul>

<p>Sets the minimum size of window to <code>width` and `height`.</p> 
                #### `win.getMinimumSize ()`
                
                Returns `Integer[]` - Contains the window's minimum width and height.
                
                #### `win.setMaximumSize (lebar, tinggi)`
                
                * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
</ul>

<p>Sets the maximum size of window to <code>width` and `height`.</p> 
                  #### `win.getMaximumSize ()`
                  
                  Returns `Integer[]` - Contains the window's maximum width and height.
                  
                  #### `win.setResizable (resizable)`
                  
                  * ` resizable </ 0>  Boolean</li>
</ul>

<p>Sets whether the window can be manually resized by user.</p>

<h4><code>win.isResizable ()`</h4> 
                    Returns `Boolean` - Whether the window can be manually resized by user.
                    
                    #### ` win.setMovable (dapat dipindahkan) </ 0>  <em> macOS </ 1>  <em> Windows </ 1></h4>

<ul>
<li><code> bergerak </ 0>  Boolean</li>
</ul>

<p>Sets whether the window can be moved by user. On Linux does nothing.</p>

<h4><code>win.isMovable()` *macOS* *Windows*
                    
                    Returns `Boolean` - Whether the window can be moved by user.
                    
                    On Linux always returns `true`.
                    
                    #### ` win.setMinimizable (minimizable) </ 0>  <em> macOS </ 1>  <em> Windows </ 1></h4>

<ul>
<li><code> diminimalkan </ 0>  Boolean</li>
</ul>

<p>Sets whether the window can be manually minimized by user. On Linux does
nothing.</p>

<h4><code> win.isMinimizable () </ 0>  <em> macos </ 1>  <em> Windows </ 1></h4>

<p>Returns <code>Boolean` - Whether the window can be manually minimized by user</p> 
                    
                    On Linux always returns `true`.
                    
                    #### `win.setMaximizable(maximizable)` *macOS* *Windows*
                    
                    * `maximizable` Boolean
                    
                    Sets whether the window can be manually maximized by user. On Linux does nothing.
                    
                    #### `win.isMaximizable()` *macOS* *Windows*
                    
                    Returns `Boolean` - Whether the window can be manually maximized by user.
                    
                    On Linux always returns `true`.
                    
                    #### `win.setFullScreenable (fullscreenable)`
                    
                    * ` fullscreenable </ 0>  Boolean</li>
</ul>

<p>Sets whether the maximize/zoom window button toggles fullscreen mode or
maximizes the window.</p>

<h4><code>win.isFullScreenable ()`</h4> 
                      Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.
                      
                      #### `win.setClosable(closable)` *macOS* *Windows*
                      
                      * `closable` Boolean
                      
                      Sets whether the window can be manually closed by user. On Linux does nothing.
                      
                      #### `win.isClosable()` *macOS* *Windows*
                      
                      Returns `Boolean` - Whether the window can be manually closed by user.
                      
                      On Linux always returns `true`.
                      
                      #### `win.setAlwaysOnTop (bendera [, tingkat] [, relativeLevel])`
                      
                      * `bendera` Boolean
                      * `tingkat` String (opsional) *macOS* - nilai mencakup `normal`, `mengambang`, `robek-off-menu`, `modal-panel`, `menu utama`, `status`, `pop-putus-menu`, `layar-saver`, dan ~ ~ `dermaga` ~ ~ (sudah ditinggalkan). Default adalah `mengambang`. Lihat [macOS docs](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels) untuk rincian lebih lanjut.
                      * `relativeLevel` Bulat (opsional) *macOS* - jumlah lapisan yang lebih tinggi untuk mengatur jendela ini relatif terhadap `tingkat`. Default adalah `0`. Perhatikan bahwa Apple menghambat pengaturan tingkat lebih tinggi dari 1 di atas `layar-saver`.
                      
                      Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.
                      
                      #### `win.isAlwaysOnTop()`
                      
                      Returns `Boolean` - Whether the window is always on top of other windows.
                      
                      #### `win.moveTop()` *macOS* *Windows*
                      
                      Moves window to top(z-order) regardless of focus
                      
                      #### `win.center()`
                      
                      Moves window to the center of the screen.
                      
                      #### `win.setPosition(x, y[, animate])`
                      
                      * `x` Integer
                      * `y` Integer
                      * `animate` Boolean (optional) *macOS*
                      
                      Moves window to `x` and `y`.
                      
                      #### `win.getPosition()`
                      
                      Returns `Integer[]` - Contains the window's current position.
                      
                      #### `win.setTitle(title)`
                      
                      * ` judul </ 0> String</li>
</ul>

<p>Changes the title of native window to <code>title`.</p> 
                        #### `win.getTitle()`
                        
                        Returns `String` - The title of the native window.
                        
                        **Note:** The title of web page can be different from the title of the native window.
                        
                        #### `win.setSheetOffset(offsetY[, offsetX])` *macOS*
                        
                        * `offsetY` Mengambang
                        * `offsetX` Mengambang (opsional)
                        
                        Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:
                        
                        ```javascript
                        const {BrowserWindow} = membutuhkan ('elektron')
                        biarkan menang = new BrowserWindow()
                        
                        biarkan toolbarRect = document.getElementById ('toolbar').getBoundingClientRect()
                        win.setSheetOffset(toolbarRect.height)
                        ```
                        
                        #### `win.flashFrame(flag)`
                        
                        * `bendera` Boolean
                        
                        Starts or stops flashing the window to attract user's attention.
                        
                        #### `win.setSkipTaskbar(skip)`
                        
                        * `melompat` Boolean
                        
                        Makes the window not show in the taskbar.
                        
                        #### `win.setKiosk(flag)`
                        
                        * `bendera` Boolean
                        
                        Enters or leaves the kiosk mode.
                        
                        #### `win.isKiosk()`
                        
                        Returns `Boolean` - Whether the window is in kiosk mode.
                        
                        #### `win.getNativeWindowHandle()`
                        
                        Returns `Buffer` - The platform-specific handle of the window.
                        
                        The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.
                        
                        #### `win.hookWindowMessage(message, callback)` *Windows*
                        
                        * ` pesan </ 0> Integer</li>
<li><code>callback ` Fungsi
                        
                        Hooks a windows message. The `callback` is called when the message is received in the WndProc.
                        
                        #### `win.isWindowMessageHooked(message)` *Windows*
                        
                        * ` pesan </ 0> Integer</li>
</ul>

<p>Returns <code>Boolean` - `true` or `false` depending on whether the message is hooked.</p> 
                          #### `win.unhookWindowMessage(message)` *Windows*
                          
                          * ` pesan </ 0> Integer</li>
</ul>

<p>Unhook the window message.</p>

<h4><code>win.unhookAllWindowMessages()` *Windows*</h4> 
                            Unhooks all of the window messages.
                            
                            #### `win.setRepresentedFilename(filename)` *macOS*
                            
                            * `filename` String
                            
                            Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.
                            
                            #### `win.getRepresentedFilename()` *macOS*
                            
                            Returns `String` - The pathname of the file the window represents.
                            
                            #### `win.setDocumentEdited(edited)` *macOS*
                            
                            * ` diedit </ 0> Boolean</li>
</ul>

<p>Specifies whether the window’s document has been edited, and the icon in title
bar will become gray when set to <code>true`.</p> 
                              #### `win.isDocumentEdited()` *macOS*
                              
                              Returns `Boolean` - Whether the window's document has been edited.
                              
                              #### `win.focusOnWebView()`
                              
                              #### `win.blurWebView()`
                              
                              #### `win.capturePage([rect, ]callback)`
                              
                              * ` rect </ 0>  <a href="structures/rectangle.md"> Rectangle </ 1> (opsional) - Batas untuk ditangkap</li>
<li><code>callback` Fungsi 
                                * ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
</ul></li>
</ul>

<p>Same as <code>webContents.capturePage([rect, ]callback)`.</p> 
                                  #### `win.loadURL(url[, options])`
                                  
                                  * ` url </ 0> String</li>
<li><code>pilihan` Objek (opsional) 
                                    * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
                                    * ` userAgent </ 0>  String (opsional) - Agen pengguna yang berasal dari permintaan.</li>
<li><code>extraHeaders` String (opsional) - header tambahan yang dipisahkan oleh "\n"
                                    * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
                                    * ` baseURLForDataURL </ 0>  String (opsional) - URL dasar (dengan pemisah jalur trailing) untuk file yang akan dimuat oleh url data. Hal ini diperlukan hanya jika ditentukan <code>url` data url dan perlu memuat file lainnya.
                                  
                                  Same as `webContents.loadURL(url[, options])`.
                                  
                                  The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.
                                  
                                  To ensure that file URLs are properly formatted, it is recommended to use Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) method:
                                  
                                  ```javascript
                                  biarkan url = require('url').format({
                                    protokol: 'file',
                                    garis miring: benar,
                                    pathname: require ('path'). join(__ dirname, 'index.html')
                                  })
                                  
                                  win.loadURL(url)
                                  ```
                                  
                                  You can load a URL using a `POST` request with URL-encoded data by doing the following:
                                  
                                  ```javascript
                                  win.loadURL ('http: // localhost: 8000 / post', {
                                     postData: [{
                                       type: 'rawData',
                                       bytes: Buffer.from ('hello = world')
                                     }],
                                     extraHeaders: aplikasi 'Content-Type: / x-www-form-urlencoded '})
                                  ```
                                  
                                  #### `win.loadFile(filePath)`
                                  
                                  * `fullPath` String
                                  
                                  Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.
                                  
                                  #### `win.reload()`
                                  
                                  Same as `webContents.reload`.
                                  
                                  #### `win.setMenu(menu)` *Linux* *Windows*
                                  
                                  * `menu` Menu | batal
                                  
                                  Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.
                                  
                                  #### `win.setProgressBar(progress[, options])`
                                  
                                  * ` kemajuan ` Double
                                  * `pilihan` Objek (opsional) 
                                    * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.
                                  
                                  Sets progress value in progress bar. Valid range is [0, 1.0].
                                  
                                  Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.
                                  
                                  On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `app.getName().desktop`.
                                  
                                  On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.
                                  
                                  #### `win.setOverlayIcon(overlay, description)` *Windows*
                                  
                                  * `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
                                  * `deskripsi` String - deskripsi yang akan diberikan pada Aksesibilitas pembaca layar
                                  
                                  Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.
                                  
                                  #### `win.setHasShadow(hasShadow)` *macOS*
                                  
                                  * `hasShadow` Boolean
                                  
                                  Sets whether the window should have a shadow. On Windows and Linux does nothing.
                                  
                                  #### `win.hasShadow()` *macOS*
                                  
                                  Returns `Boolean` - Whether the window has a shadow.
                                  
                                  On Windows and Linux always returns `true`.
                                  
                                  #### `win.setOpacity(opacity)` *Windows* *macOS*
                                  
                                  * `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)
                                  
                                  Sets the opacity of the window. On Linux does nothing.
                                  
                                  #### `win.getOpacity()` *Windows* *macOS*
                                  
                                  Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque)
                                  
                                  #### `win.setShape(rects)` *Windows* *Linux* *Experimental*
                                  
                                  * `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.
                                  
                                  Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.
                                  
                                  #### `win.setThumbarButtons(buttons)` *Windows*
                                  
                                  * `buttons` [ThumbarButton[]](structures/thumbar-button.md)
                                  
                                  Returns `Boolean` - Whether the buttons were added successfully
                                  
                                  Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.
                                  
                                  The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.
                                  
                                  The `buttons` is an array of `Button` objects:
                                  
                                  * `Button` Sasaran 
                                    * `icon` [NativeImage](native-image.md) - The icon showing in thumbnail toolbar.
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

<h4><code>win.setThumbnailClip(region)` *Windows*</h4> 
                                      * `region` [Rectangle](structures/rectangle.md) - Region of the window
                                      
                                      Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{x: 0, y: 0, width: 0, height: 0}`.
                                      
                                      #### `win.setThumbnailToolTip(toolTip)` *Windows*
                                      
                                      * `toolTip` String
                                      
                                      Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.
                                      
                                      #### `win.setAppDetails(options)` *Windows*
                                      
                                      * `pilihan` Sasaran 
                                        * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
                                        * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
                                        * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
                                        * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
                                        * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).
                                      
                                      Sets the properties for the window's taskbar button.
                                      
                                      **Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.
                                      
                                      #### `win.showDefinitionForSelection()` *macOS*
                                      
                                      Same as `webContents.showDefinitionForSelection()`.
                                      
                                      #### `win.setIcon(icon)` *Windows* *Linux*
                                      
                                      * `ikon` [NativeImage](native-image.md)
                                      
                                      Changes window icon.
                                      
                                      #### `win.setAutoHideMenuBar(hide)`
                                      
                                      * `hide` Boolean
                                      
                                      Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.
                                      
                                      If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.
                                      
                                      #### `win.isMenuBarAutoHide()`
                                      
                                      Returns `Boolean` - Whether menu bar automatically hides itself.
                                      
                                      #### `win.setMenuBarVisibility(visible)` *Windows* *Linux*
                                      
                                      * `terlihat` Boolean
                                      
                                      Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.
                                      
                                      #### `win.isMenuBarVisible()`
                                      
                                      Returns `Boolean` - Whether the menu bar is visible.
                                      
                                      #### `win.setVisibleOnAllWorkspaces(visible)`
                                      
                                      * `terlihat` Boolean
                                      
                                      Sets whether the window should be visible on all workspaces.
                                      
                                      **Note:** This API does nothing on Windows.
                                      
                                      #### `win.isVisibleOnAllWorkspaces()`
                                      
                                      Returns `Boolean` - Whether the window is visible on all workspaces.
                                      
                                      **Note:** This API always returns false on Windows.
                                      
                                      #### `win.setIgnoreMouseEvents(ignore[, options])`
                                      
                                      * `mengabaikan` Boolean
                                      * `pilihan` Objek (pilihan) 
                                        * `forward` Boolean (optional) *macOS* *Windows* - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.
                                      
                                      Makes the window ignore all mouse events.
                                      
                                      All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.
                                      
                                      #### `win.setContentProtection(enable)` *macOS* *Windows*
                                      
                                      * `enable` Boolean
                                      
                                      Prevents the window contents from being captured by other apps.
                                      
                                      On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.
                                      
                                      #### `win.setFocusable(focusable)` *Windows*
                                      
                                      * `focusable` Boolean
                                      
                                      Changes whether the window can be focused.
                                      
                                      #### `win.setParentWindow(parent)` *Linux* *macOS*
                                      
                                      * `parent` BrowserWindow
                                      
                                      Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.
                                      
                                      #### `win.getParentWindow()`
                                      
                                      Returns `BrowserWindow` - The parent window.
                                      
                                      #### `win.getChildWindows()`
                                      
                                      Returns `BrowserWindow[]` - All child windows.
                                      
                                      #### `win.setAutoHideCursor(autoHide)` *macOS*
                                      
                                      * `autoHide` Boolean
                                      
                                      Controls whether to hide cursor when typing.
                                      
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
                                      
                                      * `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) for more details.
                                      
                                      Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.
                                      
                                      #### `win.setTouchBar(touchBar)` *macOS* *Experimental*
                                      
                                      * `touchBar` TouchBar
                                      
                                      Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.
                                      
                                      **Catatan:** TouchBar API saat ini masih bersifat eksperimental dan mungkin akan berubah atau dihapus saat rilis elektron di masa depan.
                                      
                                      #### `win.setBrowserView(browserView)` *Experimental*
                                      
                                      * `browserView` [BrowserView](browser-view.md)
                                      #### `win.getBrowserView()` *Experimental*
                                      
                                      Returns `BrowserView | null` - an attached BrowserView. Returns `null` if none is attached.
                                      
                                      **Catatan:** lihat browser API masih bersifat eksperimental dan mungkin mengubah atau dihapus elektron pada masa depan.