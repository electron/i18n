# BrowserWindow

> Create and control browser windows.

Proses: [Main](../glossary.md#main-process)

```javascript
// Dalam proses utamanya.
const { BrowserWindow } = require('electron')

// Atau gunakan `remote` dari proses perender.
// const { BrowserWindow } = require('electron').remote

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

// Load a remote URL
win.loadURL('https://github.com')

// Or load a local HTML file
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Jendela tanpa bingkai

Untuk membuat jendela tanpa krom , atau jendela transparan dalam bentuk sewenang-wenang, Anda dapat menggunakan API  Frameless Window </ 0> .</p> 

## Menampilkan jendela dengan anggun

Ketika memuat halaman di jendela secara langsung, pengguna dapat melihat pemuatan halaman secara bertahap, yang bukan pengalaman yang baik untuk aplikasi asli. Untuk membuat tampilan jendela tanpa visual flash, ada dua solusi untuk situasi yang berbeda.

### Menggunakan kejadian `ready-to-show`

Saat memuat halaman, kejadian `ready-to-show` akan dikeluarkan saat proses perender telah memberikan halaman untuk pertama kalinya jika jendela belum ditampilkan. Menampilkan jendela setelah kejadian ini tidak memiliki flash visual:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

Kejadian ini biasanya dijalankan/dikeluarkan setelah kejadian `did-finish-load`, tapi untuk halaman dengan banyak sumber daya jark jauh, itu mungkin dijalankan sebelum kejadian `did-finish-load`.

### Pengaturan `backgroundColor`

Untuk aplikasi yang kompleks, kejadian `ready-to-show` bisa dijalankan sangat terlambat, membuat aplikasi terasa lambat. Dalam kasus ini, sebaiknya segera tampilkan jendela, dan gunakan `backgroundColor` ke latar belakang aplikasi Anda:

```javascript
const { BrowserWindow } = membutuhkan ('elektron')

let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

Perhatikan bahwa untuk aplikasi yang menggunakan `ready-to-show`, masih disarankan untuk mengatur`backgroundColor` untuk membuat aplikasi terasa lebih asli.

## Jendela dewasa dan anak

Dengan menggunakan opsi `parent`, Anda dapat membuat jendela anak:

```javascript
const { BrowserWindow } = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

Jendela `child` akan selalu tampil di atas jendela `top`.

### Jendela modal

Jendela modal adalah jendela anak yang menonaktifkan jendela orangtua, untuk menciptakan jendela modal, Anda harus menetapkan pilihan `parent` dan `modal` pilihan:

```javascript
const { BrowserWindow } = require ('electron') biarkan anak = Jendela peramban baru ( {orang tua: atas, modal: benar, tunjukkan: salah} ) anak. beban URL ('https://github.com') child.once (' siap tampil ', () = & gt; {
{ parent: top, modal: true, show: false }{parent: top, modal: true, show: false}{parent: top, modal: true, show: false}{parent: top, modal: true, show: false}
```

### Visibilitas halaman 

The [Halaman Visibilitas API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) bekerja sebagai berikut:

* Pada semua platform, keadaan visibilitas melacak apakah jendela tersembunyi/diminimalkan atau tidak.
* Selain itu, di macOS, keadaan visibilitas juga melacak keadaan oklusi jendela. Jika jendela ditutup (yaitu tertutup sepenuhnya) oleh jendela lain, keadaan visibilitas akan `hidden`. Pada platform lain, keadaan visibilitas hanya `hidden` hanya jika jendela diminimalkan atau secara eksplisit disembunyikan dengan `win.hide()`.
* Jika `BrowserWindow` dibuat dengan `show: false`, keadaan visibilitas awal akan `visible` meskipun jendela benar-benar tersembunyi.
* Jika `backgroundThrottling` dinonaktifkan, keadaan visibilitas akan tetap `visible` meskipun jendela diminimalkan, tersumbat, atau tersembunyi.

Disarankan agar Anda menghentikan sementara operasi mahal saat keadaan visibilitas `hidden` untuk meminimalkan konsumsi daya.

### Pemberitahuan platform

* Di jendela macOS modal akan ditampilkan sebagai lembaran yang menempel pada jendela induk.
* Pada macOS , jendela anak akan menjaga posisi relatif ke jendela induk saat jendela induk bergerak, sementara pada jendela anak Windows dan Linux tidak akan bergerak.
* On Linux the type of modal windows will be changed to `dialog`.
* On Linux many desktop environments do not support hiding a modal window.

## Kelas: BrowserWindow

> Buat dan kendalikan jendela peramban.

Proses: [Main](../glossary.md#main-process)

` BrowserWindow </ 0> adalah
 <a href="https://nodejs.org/api/events.html#events_class_events_eventemitter"> EventEmitter </ 1> .</p>

<p>Ini menciptakan <code>BrowserWindow` baru dengan sifat asli yang ditetapkan oleh `options`.

### `new BrowserWindow([options])`

* `pilihan` Object (opsional) 
  * `width` Integer (opsional) - Lebar jendela dalam piksel. Defaultnya adalah `800`.
  * `height` Integer (opsional) - Tinggi jendela dalam piksel. Defaultnya adalah `600`.
  * `x` Integer (opsional) (**diperlukan** jika y digunakan) - Kisi-kisi kiri jendela dari layar. Default adalah memusatkan jendela.
  * ` y </ 0>  Integer (opsional) ( <strong> diperlukan </ 1> jika x digunakan) - offset atas jendela dari layar. Default adalah memusatkan jendela.</li>
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
  * `title` String (optional) - Default window title. Default is `"Electron"`. If the HTML tag `<title>` is defined in the HTML file loaded by `loadURL()`, this property will be ignored.
  * `ikon` ([NativeImage](native-image.md) | String) (opsional) - Ikon jendela. Pada Windows itu disarankan untuk menggunakan ikon `ICO` untuk mendapatkan efek visual terbaik, Anda juga bisa biarkan tidak terdefinisi sehingga ikon executable akan digunakan.
  * `tampilkan` Boolean (opsional) - Apakah jendela harus ditampilkan saat dibuat. Default adalah `benar`.
  * `frame` Boolean (opsional) - Tentukan ` false ` untuk membuat a [Jendela Frameless](frameless-window.md). Defaultnya adalah `Benar`.
  * `induk` BrowserWindow (opsional) - Tentukan jendela induk. Defaultnya adalah `null`.
  * `modal` Boolean (opsional) - Apakah ini adalah jendela modal. Ini hanya bekerja bila Jendela adalah jendela anak. Defaultnya adalah `palsu`.
  * `acceptFirstMouse` Boolean (opsional) - Apakah tampilan web menerima satu mouse-down event yang sekaligus mengaktifkan jendela. Default adalah `palsu`.
  * `disableAutoHideCursor` Boolean (opsional) - Apakah akan menyembunyikan kursor saat mengetik. Defaultnya adalah `palsu`.
  * `autoHideMenuBar` Boolean (opsional) - Auto menyembunyikan bilah menu kecuali `Alt` kunci ditekan Defaultnya adalah `palsu`.
  * `enableLargerThanScreen` Boolean (opsional) - Aktifkan jendela yang akan diubah ukurannya lebih besar. dari layar Defaultnya adalah `palsu`.
  * `backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha in #AARRGGBB format is supported if `transparent` is set to `true`). Default is `#FFF` (white).
  * `hasShadow` Boolean (opsional) - Apakah jendela seharusnya memiliki bayangan. Hanya ini diimplementasikan di macos Defaultnya adalah `benar`.
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `Tema gelap` Boolean (opsional) - Pasukan menggunakan tema gelap untuk jendela, hanya bekerja beberapa lingkungan desktop GTK3. Defaultnya adalah `false`.
  * `transparent` Boolean (opsional) - Membuat jendela [transparan](frameless-window.md). Defaultnya adalah `palsu`.
  * `ketik` String (opsional) - Jenis jendela, default adalah jendela normal. Lihat lebih lanjut tentang ini di bawah ini.
  * `titleBarStyle` String (opsional) - Gaya bar judul jendela. Default adalah `default`. Nilai yang mungkin adalah: 
    * `default` - Hasil dalam judul Mac buram abu-abu standar.
    * `tersembunyi` - Hasil di bar judul tersembunyi dan jendela konten ukuran penuh judul bar masih memiliki kontrol jendela standar ("lampu lalu lintas") di kiri atas.
    * `hiddenInset` - Hasil di bar judul tersembunyi dengan tampilan alternatif dimana tombol lampu lalu lintas sedikit lebih tertutup dari tepi jendela.
    * `customButtonsOnHover` Boolean (optional) - Draw custom close, and minimize buttons on macOS frameless windows. These buttons will not display unless hovered over in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. **Catatan:** Pilihan ini saat ini sedang eksperimental.
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
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Default is `false`.
    * ` nodeIntegrationInWorker` Boolean (opsional) - Apakah integrasi simpul diaktifkan pada pekerja web. Defaultnya adalah ` false </ 0> . Lebih lanjut tentang ini dapat ditemukan di <a href="../tutorial/multithreading.md">Multithreading</a>.</li>
<li><code>nodeIntegrationInSubFrames` Boolean (optional) - Experimental option for enabling NodeJS support in sub-frames such as iframes. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not.
    * `preload` String (optional) - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. The value should be the absolute file path to the script. When node integration is turned off, the preload script can reintroduce Node global symbols back to the global scope. See example [here](process.md#event-loaded).
    * `sandbox` Boolean (optional) - If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium OS-level sandbox and disabling the Node.js engine. This is not the same as the `nodeIntegration` option and the APIs available to the preload script are more limited. Read more about the option [here](sandbox-option.md). **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. Default is `true`.
    * `session` [Session](session.md#class-session) (optional) - Sets the session used by the page. Instead of passing the Session object directly, you can also choose to use the `partition` option instead, which accepts a partition string. When both `session` and `partition` are provided, `session` will be preferred. Default is the default session.
    * `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. Dengan menugaskan yang sama `partisi`, beberapa halaman dapat berbagi sesi yang sama. Default is the default session.
    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`. *This property is experimental*
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Default is `true`.
    * `webSecurity` Boolean (optional) - When `false`, it will disable the same-origin policy (usually using testing websites by people), and set `allowRunningInsecureContent` to `true` if this options has not been set by user. Defaultnya adalah `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Default is `false`.
    * `images` Boolean (optional) - Enables image support. Default is `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Default is `true`.
    * `webaudio` Boolean (optional) - Enables WebAudio support. Default is `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Default is `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Default is `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Default is `false`.
    * `enableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.
    * `disableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to disable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family. 
      * `standard` String (optional) - Defaults to `Times New Roman`.
      * `serif` String (optional) - Defaults to `Times New Roman`.
      * `sansSerif` String (optional) - Defaults to `Arial`.
      * `monospace` String (optional) - Defaults to `Courier New`.
      * `cursive` String (optional) - Defaults to `Script`.
      * `fantasy` String (optional) - Defaults to `Impact`.
    * `defaultFontSize` Integer (optional) - Defaults to `16`.
    * `defaultMonospaceFontSize` Integer (optional) - Defaults to `13`.
    * `minimumFontSize` Integer (optional) - Defaults to `0`.
    * `defaultEncoding` String (optional) - Defaults to `ISO-8859-1`.
    * `backgroundThrottling` Boolean (optional) - Whether to throttle animations and timers when the page becomes background. This also affects the [Page Visibility API](#page-visibility). Defaults to `true`.
    * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. Defaults to `false`. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. Child windows will always have node integration disabled. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to `false`. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.
    * `additionalArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Default is `false`.
    * `safeDialogsMessage` String (optional) - The message to display when consecutive dialog protection is triggered. If not defined the default message would be used, note that currently the default message is in English and not localized.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Default is `false`.
    * `autoplayPolicy` String (optional) - Autoplay policy to apply to content in the window, can be `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Defaults to `no-user-gesture-required`.

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

#### Event: 'will-resize' *macOS* *Windows*

Pengembalian:

* `acara` Acara
* `newBounds` [`Rectangle`](structures/rectangle.md) - Size the window is being resized to.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Acara : 'ubah ukuran'

Emitted after the window has been resized.

#### Event: 'will-move' *Windows*

Pengembalian:

* `event` Acara
* `newBounds` [`Rectangle`](structures/rectangle.md) - Location the window is being moved to.

Emitted before the window is moved. Calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

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

#### Event: 'always-on-top-changed' *macOS*

Pengembalian:

* `acara` Acara
* `isAlwaysOnTop` Boolean

Emitted when the window is set or unset to show always on top of other windows.

#### Event: 'app-command' *Windows* *Linux*

Pengembalian:

* `acara` Acara
* ` perintah </ 0>  String</li>
</ul>

<p>Emitted when an <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx">App Command</a>
is invoked. Ini biasanya terkait dengan kunci media keyboard atau perintah browser, serta tombol "Kembali" yang terpasang pada beberapa mouse pada Windows .</p>

<p>Perintah diturunkan, underscore diganti dengan tanda hubung, dan
 awalan <code> APPCOMMAND_ </ 0> dilucuti.
misal <code> APPCOMMAND_BROWSER_BACKWARD </ 0> dipancarkan sebagai <code> browser-backward </ 0> .</p>

<pre><code class="javascript">const { BrowserWindow } = require ('electron') let win = new BrowserWindow () win.on ('app-command', (e, cmd) = & gt; {
   // Arahkan jendela kembali saat pengguna menyentuh mouse mereka kembali tombol
   jika (cmd === 'browser mundur' & amp; & amp; win.webContents.canGoBack ()) {
     win.webContents.goBack ()
   }})
`</pre> 
  The following app commands are explictly supported on Linux:
  
  * `browser-backward`
  * `browser-forward`
  #### Acara : 'gulir-sentuh-mulai' * macOS </ 0></h4> 
  
  Emitted when scroll wheel event phase has begun.
  
  #### Acara : 'gulir-sentuh-akhir' * macOS </ 0></h4> 
  
  Emitted when scroll wheel event phase has ended.
  
  #### Acara : 'gulir-sentuh-tepi' * macos </ 0></h4> 
  
  Emitted when scroll wheel event phase filed upon reaching the edge of element.
  
  #### Acara : 'gesek' * macOS </ 0></h4> 
  
  Mengembalikan:
  
  * `event` Sinyal
  * `direction` String
  
  Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.
  
  #### Acara: 'sheet-begin' * macOS *
  
  Emitted when the window opens a sheet.
  
  #### Acara : 'sheet-end' * macOS </ 0></h4> 
  
  Emitted when the window has closed a sheet.
  
  #### Event: 'new-window-for-tab' *macOS*
  
  Emitted when the native new tab button is clicked.
  
  ### Metode Statis
  
  The `BrowserWindow` class has the following static methods:
  
  #### `BrowserWindow.getAllWindows ()`
  
  Returns `BrowserWindow[]` - An array of all opened browser windows.
  
  #### `BrowserWindow.getFocusedWindow ()`
  
  Returns `BrowserWindow | null` - The window that is focused in this application, otherwise returns `null`.
  
  #### `BrowserWindow.fromWebContents (webContents)`
  
  * `webContents` [WebContents](web-contents.md)
  
  Returns `BrowserWindow` - The window that owns the given `webContents`.
  
  #### `BrowserWindow.fromBrowserView(browserView)`
  
  * `browserView` [BrowserView](browser-view.md)
  
  Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.
  
  #### `BrowserWindow.fromId (id)`
  
  * `identitas` Integer
  
  Returns `BrowserWindow` - The window with the given `id`.
  
  #### `BrowserWindow.addExtension (jalur)`
  
  * `path` String
  
  Adds Chrome extension located at `path`, and returns extension's name.
  
  The method will also not return if the extension's manifest is missing or incomplete.
  
  **Note:** This API cannot be called before the `ready` event of the `app` module is emitted.
  
  #### `BrowserWindow.removeExtension(name)`
  
  * ` nama </ 0>  Deretan</li>
</ul>

<p>Remove a Chrome extension by name.</p>

<p><strong>Note:</strong> This API cannot be called before the <code>ready` event of the `app` module is emitted.</p> 
    #### `BrowserWindow.getExtensions ()`
    
    Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.
    
    **Note:** This API cannot be called before the `ready` event of the `app` module is emitted.
    
    #### `BrowserWindow.addDevToolsExtension (jalur)`
    
    * `path` String
    
    Adds DevTools extension located at `path`, and returns extension's name.
    
    The extension will be remembered so you only need to call this API once, this API is not for programming use. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.
    
    The method will also not return if the extension's manifest is missing or incomplete.
    
    **Note:** This API cannot be called before the `ready` event of the `app` module is emitted.
    
    #### `BrowserWindow.removeDevToolsExtension (nama)`
    
    * ` nama </ 0>  Deretan</li>
</ul>

<p>Remove a DevTools extension by name.</p>

<p><strong>Note:</strong> This API cannot be called before the <code>ready` event of the `app` module is emitted.</p> 
      #### `BrowserWindow.getDevToolsExtensions ()`
      
      Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.
      
      To check if a DevTools extension is installed you can run the following:
      
      ```javascript
      biarkan diinstal = { BrowserWindow }getDevToolsExtensions () hasOwnProperty ('devtron')
      console.log (terpasang)
      ```
      
      **Note:** This API cannot be called before the `ready` event of the `app` module is emitted.
      
      ### Contoh properti
      
      Objects created with `new BrowserWindow` have the following properties:
      
      ```javascript
      const { BrowserWindow } = membutuhkan ('elektron')
      // Dalam contoh ini `win` adalah contoh kami
      let win = new BrowserWindow ({ width: 800, height: 600 })
      win.loadURL ('https://github.com')
      ```
      
      #### `win.webContents`
      
      A `WebContents` object this window owns. All web page related events and operations will be done via it.
      
      See the [`webContents` documentation](web-contents.md) for its methods and events.
      
      #### `win.id`
      
      A `Integer` representing the unique ID of the window.
      
      ### Metode Instance
      
      Objects created with `new BrowserWindow` have the following instance methods:
      
      **Catatan:** Beberapa metode hanya tersedia pada sistem operasi tertentu dan diberi label seperti itu.
      
      #### `win.destroy()`
      
      Force closing the window, the `unload` and `beforeunload` event won't be emitted for the web page, and `close` event will also not be emitted for this window, but it guarantees the `closed` event will be emitted.
      
      #### `win.close()`
      
      Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).
      
      #### `win.focus()`
      
      Focuses on the window.
      
      #### `win.blur()`
      
      Removes focus from the window.
      
      #### `win.isFocused ()`
      
      Returns `Boolean` - Whether the window is focused.
      
      #### `win.isDestroyed ()`
      
      Returns `Boolean` - Whether the window is destroyed.
      
      #### `win.show ()`
      
      Shows and gives focus to the window.
      
      #### `win.showInactive ()`
      
      Shows the window but doesn't focus on it.
      
      #### `win.hide ()`
      
      Hides the window.
      
      #### `win.isVisible ()`
      
      Returns `Boolean` - Whether the window is visible to the user.
      
      #### `win.isModal ()`
      
      Returns `Boolean` - Whether current window is a modal window.
      
      #### `win.maximize ()`
      
      Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.
      
      #### `win.unmaximize ()`
      
      Unmaximizes the window.
      
      #### `win.isMaximized ()`
      
      Returns `Boolean` - Whether the window is maximized.
      
      #### `win.minimize ()`
      
      Minimizes the window. On some platforms the minimized window will be shown in the Dock.
      
      #### `win.restore ()`
      
      Restores the window from minimized state to its previous state.
      
      #### `win.isMinimized ()`
      
      Returns `Boolean` - Whether the window is minimized.
      
      #### `win.setFullScreen (bendera)`
      
      * `bendera` Boolean
      
      Sets whether the window should be in fullscreen mode.
      
      #### `win.isFullScreen ()`
      
      Returns `Boolean` - Whether the window is in fullscreen mode.
      
      #### `win.setSimpleFullScreen(flag)` * macos*
      
      * `bendera` Boolean
      
      Enters or leaves simple fullscreen mode.
      
      Simple fullscreen mode emulates the native fullscreen behavior found in versions of Mac OS X prior to Lion (10.7).
      
      #### ` win.isSimpleFullScreen () </ 0>  <em> macos </ 1></h4>

<p>Returns <code>Boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.</p> 
      
      #### `win.isNormal()`
      
      Returns `Boolean` - Whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).
      
      #### ` win.setAspectRatio (aspectRatio [, extraSize]) </ 0>  <em> macos </ 1></h4>

<ul>
<li><code>aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.</li> 
      
      * `extraSize` [Size](structures/size.md) - The extra size not to be included while maintaining the aspect ratio.</ul> 
      
      This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.
      
      Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Sum any extra width and height areas you have within the overall content view.
      
      Calling this function with a value of `0` will remove any previously set aspect ratios.
      
      #### `win.setBackgroundColor(backgroundColor)`
      
      * `backgroundColor` String - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported if `transparent` is `true`). Default is `#FFF` (white).
      
      Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).
      
      #### ` win.previewFile (path [, displayName]) </ 0>  <em> macos </ 1></h4>

<ul>
<li><code>path` String - The absolute path to the file to preview with QuickLook. This is important as Quick Look uses the file name and file extension on the path to determine the content type of the file to open.</li> 
      
      * `displayName` String (optional) - The name of the file to display on the Quick Look modal view. This is purely visual and does not affect the content type of the file. Defaults to `path`.</ul> 
      
      Uses [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) to preview a file at a given path.
      
      #### ` win.closeFilePreview () </ 0>  <em> macos </ 1></h4>

<p>Closes the currently open <a href="https://en.wikipedia.org/wiki/Quick_Look">Quick Look</a> panel.</p>

<h4><code>win.setBounds (batas [, bernyawa])`
      
      * `batas` [Empat persegi panjang](structures/rectangle.md)
      * `animate` Boolean (optional) *macOS*
      
      Resizes and moves the window to the supplied bounds. Any properties that are not supplied will default to their current values.
      
      ```javascript
      const { BrowserWindow } = require('electron')
      const win = new BrowserWindow()
      
      // set all bounds properties
      win.setBounds({ x: 440, y: 225, width: 800, height: 600 })
      
      // set a single bounds property
      win.setBounds({ width: 100 })
      
      // { x: 440, y: 225, width: 100, height: 600 }
      console.log(win.getBounds())
      ```
      
      #### `win.getBounds ()`
      
      Kembali [`Rectangle`](structures/rectangle.md)
      
      #### `win.setContentBounds (batas [, bernyawa])`
      
      * `batas` [Empat persegi panjang](structures/rectangle.md)
      * `animate` Boolean (optional) *macOS*
      
      Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.
      
      #### `win.getContentBounds ()`
      
      Kembali [`Rectangle`](structures/rectangle.md)
      
      #### `win.getNormalBounds()`
      
      Returns [`Rectangle`](structures/rectangle.md) - Contains the window bounds of the normal state
      
      **Note:** whatever the current state of the window : maximized, minimized or in fullscreen, this function always returns the position and size of the window in normal state. In normal state, getBounds and getNormalBounds returns the same [`Rectangle`](structures/rectangle.md).
      
      #### `win.setEnabled(enable)`
      
      * `enable` Boolean
      
      Disable or enable the window.
      
      #### `win.setSize (lebar, tinggi [, bernyawa])`
      
      * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
<li><code>animate` Boolean (optional) *macOS*
      
      Resizes the window to `width` and `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.
      
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
          
          * `resizable` Boolean
          
          Sets whether the window can be manually resized by user.
          
          #### `win.isResizable ()`
          
          Returns `Boolean` - Whether the window can be manually resized by user.
          
          #### ` win.setMovable (dapat dipindahkan) </ 0>  <em> macOS </ 1>  <em> Windows </ 1></h4>

<ul>
<li><code>movable` Boolean</li> </ul> 
          
          Sets whether the window can be moved by user. On Linux does nothing.
          
          #### `win.isMovable()` *macOS* *Windows*
          
          Returns `Boolean` - Whether the window can be moved by user.
          
          On Linux always returns `true`.
          
          #### ` win.setMinimizable (minimizable) </ 0>  <em> macOS </ 1>  <em> Windows </ 1></h4>

<ul>
<li><code>minimizable` Boolean</li> </ul> 
          
          Sets whether the window can be manually minimized by user. On Linux does nothing.
          
          #### ` win.isMinimizable () </ 0>  <em> macos </ 1>  <em> Windows </ 1></h4>

<p>Returns <code>Boolean` - Whether the window can be manually minimized by user</p> 
          
          On Linux always returns `true`.
          
          #### `win.setMaximizable(maximizable)` *macOS* *Windows*
          
          * `maximizable` Boolean
          
          Sets whether the window can be manually maximized by user. On Linux does nothing.
          
          #### `win.isMaximizable()` *macOS* *Windows*
          
          Returns `Boolean` - Whether the window can be manually maximized by user.
          
          On Linux always returns `true`.
          
          #### `win.setFullScreenable (fullscreenable)`
          
          * `fullscreenable` Boolean
          
          Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.
          
          #### `win.isFullScreenable ()`
          
          Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.
          
          #### `win.setClosable(closable)` *macOS* *Windows*
          
          * `closable` Boolean
          
          Sets whether the window can be manually closed by user. On Linux does nothing.
          
          #### `win.isClosable()` *macOS* *Windows*
          
          Returns `Boolean` - Whether the window can be manually closed by user.
          
          On Linux always returns `true`.
          
          #### `win.setAlwaysOnTop (bendera [, tingkat] [, relativeLevel])`
          
          * `bendera` Boolean
          * `level` String (optional) *macOS* - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating`. See the [macOS docs](https://developer.apple.com/documentation/appkit/nswindow/level) for more details.
          * `relativeLevel` Integer (optional) *macOS* - The number of layers higher to set this window relative to the given `level`. The default is `0`. Note that Apple discourages setting levels higher than 1 above `screen-saver`.
          
          Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.
          
          #### `win.isAlwaysOnTop()`
          
          Returns `Boolean` - Whether the window is always on top of other windows.
          
          #### ` win.moveTop () </ 0>  <em> macos </ 1>  <em> Windows </ 1></h4>

<p>Moves window to top(z-order) regardless of focus</p>

<h4><code>win.center()`
          
          Moves window to the center of the screen.
          
          #### `win.setPosition (x, y [, bernyawa])`
          
          * `x` Integer
          * `y` Integer
          * `animate` Boolean (optional) *macOS*
          
          Moves window to `x` and `y`.
          
          #### `win.getPosition()`
          
          Returns `Integer[]` - Contains the window's current position.
          
          #### `win.setTitle(title)`
          
          * ` judul</ 0>  String</li>
</ul>

<p>Changes the title of native window to <code>title`.</p> 
            #### `win.getTitle()`
            
            Returns `String` - The title of the native window.
            
            **Note:** The title of the web page can be different from the title of the native window.
            
            #### `win.setSheetOffset (offsetY [, offsetX])` *macOS*
            
            * `offsetY` Float
            * `offsetX` Float (optional)
            
            Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:
            
            ```javascript
            const { BrowserWindow } = membutuhkan ('elektron')
            biarkan menang = new BrowserWindow()
            
            biarkan toolbarRect = document.getElementById ('toolbar').getBoundingClientRect()
            win.setSheetOffset(toolbarRect.height)
            ```
            
            #### `win.flashFrame(bendera)`
            
            * `bendera` Boolean
            
            Starts or stops flashing the window to attract user's attention.
            
            #### `win.setSkipTaskbar(skip)`
            
            * `skip` Boolean
            
            Makes the window not show in the taskbar.
            
            #### `win.setKiosk(flag)`
            
            * `bendera` Boolean
            
            Enters or leaves the kiosk mode.
            
            #### `win.isKiosk()`
            
            Returns `Boolean` - Whether the window is in kiosk mode.
            
            #### `win.getNativeWindowHandle()`
            
            Returns `Buffer` - The platform-specific handle of the window.
            
            The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.
            
            #### `win.hookWindowMessage (pesan, callback)` *Windows*
            
            * ` pesan </ 0> Integer</li>
<li><code>callback ` Fungsi
            
            Hooks a windows message. The `callback` is called when the message is received in the WndProc.
            
            #### ` win.isWindowMessageHooked (pesan) </ 0>  <em> Windows </ 1></h4>

<ul>
<li><code> pesan </ 0> Integer</li>
</ul>

<p>Returns <code>Boolean` - `true` or `false` depending on whether the message is hooked.</p> 
            
            #### ` win.unhookWindowMessage (pesan) </ 0>  <em> Windows </ 1></h4>

<ul>
<li><code> pesan </ 0> Integer</li>
</ul>

<p>Unhook the window message.</p>

<h4><code> win.unhookAllWindowMessages () </ 0>  <em> Windows </ 1></h4>

<p>Unhooks all of the window messages.</p>

<h4><code>win.setRepresentedFilename (filename)` *macos*
            
            * `filename` String
            
            Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.
            
            #### `win.getRepresentedFilename()` *macos*
            
            Returns `String` - The pathname of the file the window represents.
            
            #### `win.setDocumentEdited(diedit)` *macos*
            
            * `edited` Boolean
            
            Specifies whether the window’s document has been edited, and the icon in title bar will become gray when set to `true`.
            
            #### `win.isDocumentEdited()` *macos*
            
            Returns `Boolean` - Whether the window's document has been edited.
            
            #### `win.focusOnWebView ()`
            
            #### `win.blurWebView ()`
            
            #### `win.capturePage ([rect,] callback)`
            
            * `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture
            * `callback` Fungsi 
              * ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
</ul></li>
</ul>

<p>Menangkap sebuah snapshot dari halaman dalam <code>rect`. Setelah menyelesaikan `callback` yang akan disebut dengan `callback(image)`. The `image` is an instance of [NativeImage](native-image.md) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.</p> 
                **[Deprecated Soon](promisification.md)**
                
                #### `win.capturePage([rect])`
                
                * `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture
                
                * Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)
                
                Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.
                
                #### `win.loadURL(url[, options])`
                
                * ` url </ 0> String</li>
<li><code>pilihan` Objek (pilihan) 
                  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
                  * `userAgent` String (opsional) - agen pengguna berasal permintaan.
                  * `extraHeaders` String (opsional) - header tambahan yang dipisahkan oleh "\n"
                  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
                  * `baseURLForDataURL` String (opsional) - url dasar (dengan trailing pemisah path) untuk file yang akan diambil oleh data url. Hal ini diperlukan hanya jika ditentukan `url` data url dan perlu memuat file lainnya.
                
                Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).
                
                Same as [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).
                
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
                
                #### `win.loadFile(filePath[, options])`
                
                * `fullPath` String
                * `pilihan` Objek (opsional) 
                  * `query` Object (optional) - Passed to `url.format()`.
                  * `search` String (optional) - Passed to `url.format()`.
                  * `hash` String (optional) - Passed to `url.format()`.
                
                Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).
                
                Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.
                
                #### `win.reload()`
                
                Same as `webContents.reload`.
                
                #### `win.setMenu(menu)` *Linux* *Windows*
                
                * `menu` Menu | null
                
                Sets the `menu` as the window's menu bar.
                
                #### `win.removeMenu()` *Linux* *Windows*
                
                Remove the window's menu bar.
                
                #### `win.setProgressBar(progress[, options])`
                
                * `progress` Double
                * `pilihan` Objek (pilihan) 
                  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.
                
                Sets progress value in progress bar. Valid range is [0, 1.0].
                
                Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.
                
                On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `app.getName().desktop`.
                
                On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.
                
                #### `win.setOverlayIcon(overlay, description)` *Windows*
                
                * `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
                * `description` String - a description that will be provided to Accessibility screen readers
                
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
                    
                    Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.
                    
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
                    
                    #### `win.setWindowButtonVisibility(visible)` *macOS*
                    
                    * `terlihat` Boolean
                    
                    Sets whether the window traffic light buttons should be visible.
                    
                    This cannot be called when `titleBarStyle` is set to `customButtonsOnHover`.
                    
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
                    
                    #### `win.setVisibleOnAllWorkspaces(visible[, options])`
                    
                    * `terlihat` Boolean
                    * `pilihan` Objek (pilihan) 
                      * `visibleOnFullScreen` Boolean (optional) *macOS* - Sets whether the window should be visible above fullscreen windows
                    
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
                    
                    #### `win.setParentWindow(parent)`
                    
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
                    
                    * `browserView` [BrowserView](browser-view.md). Attach browserView to win. If there is some other browserViews was attached they will be removed from this window.
                    #### `win.getBrowserView()` *Experimental*
                    
                    Returns `BrowserView | null` - an BrowserView what is attached. Returns `null` if none is attached. Throw error if multiple BrowserViews is attached.
                    
                    #### `win.addBrowserView(browserView)` *Experimental*
                    
                    * `browserView` [BrowserView](browser-view.md)
                    
                    Replacement API for setBrowserView supporting work with multi browser views.
                    
                    #### `win.removeBrowserView(browserView)` *Experimental*
                    
                    * `browserView` [BrowserView](browser-view.md)
                    #### `win.getBrowserViews()` *Experimental*
                    
                    Returns array of `BrowserView` what was an attached with addBrowserView or setBrowserView.
                    
                    **Note:** The BrowserView API is currently experimental and may change or be removed in future Electron releases.