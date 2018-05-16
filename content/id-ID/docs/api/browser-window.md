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

<p><code>BrowserWindow` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).</p> 
  Ini menciptakan baru ` BrowserWindow </ 0> dengan sifat asli yang ditetapkan oleh <code> Pilihan </ 0> .</p>

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
    * `skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. Default is `false`.
    * `kiosk` Boolean (optional) - The kiosk mode. Default is `false`.
    * `title` String (optional) - Default window title. Default is `"Electron"`.
    * `icon` ([NativeImage](native-image.md) | String) (optional) - The window icon. On Windows it is recommended to use `ICO` icons to get best visual effects, you can also leave it undefined so the executable's icon will be used.
    * `show` Boolean (optional) - Whether window should be shown when created. Default is `true`.
    * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). Default is `true`.
    * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
    * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Default is `false`.
    * `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
    * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. Default is `false`.
    * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. Default is `false`.
    * `enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. Default is `false`.
    * `backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported). Default is `#FFF` (white).
    * `hasShadow` Boolean (optional) - Whether window should have a shadow. This is only implemented on macOS. Default is `true`.
    * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
    * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Default is `false`.
    * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md). Default is `false`.
    * `type` String (optional) - The type of window, default is normal window. See more about this below.
    * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Possible values are: 
      * `default` - Results in the standard gray opaque Mac title bar.
      * `hidden` - Results in a hidden title bar and a full size content window, yet the title bar still has the standard window controls ("traffic lights") in the top left.
      * `hiddenInset` - Results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.
      * `customButtonsOnHover` Boolean (optional) - Draw custom close, minimize, and full screen buttons on macOS frameless windows. These buttons will not display unless hovered over in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. **Note:** This option is currently experimental.
    * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
    * `thickFrame` Boolean (optional) - Use `WS_THICKFRAME` style for frameless windows on Windows, which adds standard window frame. Setting it to `false` will remove window shadow and window animations. Defaultnya adalah `true`.
    * `vibrancy` String (optional) - Add a type of vibrancy effect to the window, only on macOS. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well.
    * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. If `true`, the window will grow to the preferred width of the web page when zoomed, `false` will cause it to zoom to the width of the screen. This will also affect the behavior when calling `maximize()` directly. Defaultnya adalah ` false </ 0> .</li>
<li><code>tabbingIdentifier` String (optional) - Tab group name, allows opening the window as a native tab on macOS 10.12+. Windows with the same tabbing identifier will be grouped together. This also adds a native new tab button to your window's tab bar and allows your `app` and window to receive the `new-window-for-tab` event.
    * `webPreferences` Object (optional) - Settings of web page's features. 
      * `devTools` Boolean (optional) - Whether to enable DevTools. If it is set to `false`, can not use `BrowserWindow.webContents.openDevTools()` to open DevTools. Defaultnya adalah `true`.
      * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Default is `true`.
      * `nodeIntegrationInWorker` Boolean (optional) - Whether node integration is enabled in web workers. Defaultnya adalah ` false </ 0> . More about this can be found
in <a href="../tutorial/multithreading.md">Multithreading</a>.</li>
<li><code>preload` String (optional) - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. The value should be the absolute file path to the script. When node integration is turned off, the preload script can reintroduce Node global symbols back to the global scope. See example [here](process.md#event-loaded).
      * `sandbox` Boolean (optional) - If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium OS-level sandbox and disabling the Node.js engine. This is not the same as the `nodeIntegration` option and the APIs available to the preload script are more limited. Read more about the option [here](sandbox-option.md). **Note:** This option is currently experimental and may change or be removed in future Electron releases.
      * `session` [Session](session.md#class-session) (optional) - Sets the session used by the page. Instead of passing the Session object directly, you can also choose to use the `partition` option instead, which accepts a partition string. When both `session` and `partition` are provided, `session` will be preferred. Default is the default session.
      * `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. Dengan menugaskan yang sama `partisi`, beberapa halaman dapat berbagi sesi yang sama. Default is the default session.
      * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`.
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
      * `experimentalCanvasFeatures` Boolean (optional) - Enables Chromium's experimental canvas features. Default is `false`.
      * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Default is `false`.
      * `blinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) file.
      * `disableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to disable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) file.
      * `defaultFontFamily` Object (optional) - Sets the default font for the font-family. 
        * `standard` String (optional) - Defaults to `Times New Roman`.
        * `serif` String (optional) - Defaults to `Times New Roman`.
        * `sansSerif` String (optional) - Defaults to `Arial`.
        * `monospace` String (optional) - Defaults to `Courier New`.
        * `cursive` String (optional) - Defaults to `Script`.
        * `fantasy` String (optional) - Defaults to `Impact`.
      * `defaultFontSize` Integer (optional) - Defaults to `16`.
      * `defaultMonospaceFontSize` Integer (optional) - Defaults to `13`.
      * `minimumFontSize` Integer (optional) - Defaults to ``.
      * `defaultEncoding` String (optional) - Defaults to `ISO-8859-1`.
      * `backgroundThrottling` Boolean (optional) - Whether to throttle animations and timers when the page becomes background. This also affects the [Page Visibility API](#page-visibility). Defaults to `true`.
      * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. Defaults to `false`. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
      * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab. **Note:** This option is currently experimental and may change or be removed in future Electron releases.
      * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
      * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to the value of the `nodeIntegration` option. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.
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
  
  Emitted when the window is closed. After you have received this event you should remove the reference to the window and avoid using it any more.
  
  #### Event : 'session-end' * Windows </ 0></h4> 
  
  Emitted when window session is going to end due to force shutdown or machine restart or session log off.
  
  #### Acara : 'tidak responsif'
  
  Emitted when the web page becomes unresponsive.
  
  #### Acara: 'responsif'
  
  Emitted when the unresponsive web page becomes responsive again.
  
  #### Acara: 'blur'
  
  Emitted when the window loses focus.
  
  #### Acara: 'fokus'
  
  Emitted when the window gains focus.
  
  #### Acara : 'show'
  
  Emitted when the window is shown.
  
  #### Acara: 'sembunyikan'
  
  Emitted when the window is hidden.
  
  #### Acara: 'siap tampil'
  
  Emitted when the web page has been rendered (while not being shown) and window can be displayed without a visual flash.
  
  #### Acara: 'maksimalkan'
  
  Emitted when window is maximized.
  
  #### Acara : 'nonmaximize'
  
  Emitted when the window exits from a maximized state.
  
  #### Acara : 'minimalkan'
  
  Emitted when the window is minimized.
  
  #### Acara : 'pulihkan'
  
  Emitted when the window is restored from a minimized state.
  
  #### Acara : 'ubah ukuran'
  
  Emitted when the window is being resized.
  
  #### Acara : 'pindah'
  
  Emitted when the window is being moved to a new position.
  
  **Note**: On macOS this event is just an alias of `moved`.
  
  #### Acara : 'pindah' * macOS </ 0></h4> 
  
  Emitted once when the window is moved to a new position.
  
  #### Acara : 'enter-full-screen'
  
  Emitted when the window enters a full-screen state.
  
  #### Acara : 'tinggalkan layar penuh'
  
  Emitted when the window leaves a full-screen state.
  
  #### Acara : 'enter-html-full-screen'
  
  Emitted when the window enters a full-screen state triggered by HTML API.
  
  #### Acara : 'leave-html-full-screen'
  
  Emitted when the window leaves a full-screen state triggered by HTML API.
  
  #### Event : 'app-command' * Windows </ 0></h4> 
  
  Mengembalikan:
  
  * `acara` Acara
  * ` perintah </ 0>  String</li>
</ul>

<p>Emitted when an <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx">App Command</a>
is invoked. These are typically related to keyboard media keys or browser
commands, as well as the "Back" button built into some mice on Windows.</p>

<p>Commands are lowercased, underscores are replaced with hyphens, and the
<code>APPCOMMAND_` prefix is stripped off. e.g. `APPCOMMAND_BROWSER_BACKWARD` is emitted as `browser-backward`.</p> 
    ```javascript
    const {BrowserWindow} = require ('electron') let win = new BrowserWindow () win.on ('app-command', (e, cmd) = & gt; {
       // Arahkan jendela kembali saat pengguna menyentuh mouse mereka kembali tombol
       jika (cmd === 'browser mundur' & amp; & amp; win.webContents.canGoBack ()) {
         win.webContents.goBack ()
       }})
    ```
    
    #### Acara : 'gulir-sentuh-mulai' * macOS </ 0></h4> 
    
    Emitted when scroll wheel event phase has begun.
    
    #### Acara : 'gulir-sentuh-akhir' * macOS </ 0></h4> 
    
    Emitted when scroll wheel event phase has ended.
    
    #### Acara : 'gulir-sentuh-tepi' * macos </ 0></h4> 
    
    Emitted when scroll wheel event phase filed upon reaching the edge of element.
    
    #### Acara : 'gesek' * macOS </ 0></h4> 
    
    Mengembalikan:
    
    * `event` Acara
    * ` arah </ 0>  String</li>
</ul>

<p>Emitted on 3-finger swipe. Possible directions are <code>up`, `right`, `down`, `left`.</p> 
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
      
      Returns `BrowserWindow` - The window that is focused in this application, otherwise returns `null`.
      
      #### `BrowserWindow.fromWebContents (webContents)`
      
      * `webContents` [WebContents](web-contents.md)
      
      Returns `BrowserWindow` - The window that owns the given `webContents`.
      
      #### `BrowserWindow.fromBrowserView(browserView)`
      
      * `browserView` [BrowserView](browser-view.md)
      
      Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.
      
      #### `BrowserWindow.fromId(id)`
      
      * `identitas` Integer
      
      Returns `BrowserWindow` - The window with the given `id`.
      
      #### `BrowserWindow.addExtension(path)`
      
      * `path` String
      
      Adds Chrome extension located at `path`, and returns extension's name.
      
      The method will also not return if the extension's manifest is missing or incomplete.
      
      ** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app ` dipancarkan.
      
      #### `BrowserWindow.removeExtension(name)`
      
      * `nama` String
      
      Remove a Chrome extension by name.
      
      ** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app ` dipancarkan.
      
      #### `BrowserWindow.getExtensions()`
      
      Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.
      
      ** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app ` dipancarkan.
      
      #### `BrowserWindow.addDevToolsExtension(path)`
      
      * `path` String
      
      Adds DevTools extension located at `path`, and returns extension's name.
      
      The extension will be remembered so you only need to call this API once, this API is not for programming use. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.
      
      The method will also not return if the extension's manifest is missing or incomplete.
      
      ** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app ` dipancarkan.
      
      #### `BrowserWindow.removeDevToolsExtension(name)`
      
      * `nama` String
      
      Remove a DevTools extension by name.
      
      ** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app ` dipancarkan.
      
      #### `BrowserWindow.getDevToolsExtensions()`
      
      Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.
      
      To check if a DevTools extension is installed you can run the following:
      
      ```javascript
      biarkan diinstal = {BrowserWindow}getDevToolsExtensions () hasOwnProperty ('devtron')
      console.log (terpasang)
      ```
      
      ** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app ` dipancarkan.
      
      ### Contoh properti
      
      Objects created with `new BrowserWindow` have the following properties:
      
      ```javascript
      const {BrowserWindow} = membutuhkan ('elektron')
      // Dalam contoh ini `win` adalah contoh kami
      let win = new BrowserWindow ({width: 800, height: 600})
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
      
      #### `win.close ()`
      
      Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).
      
      #### `win.focus ()`
      
      Focuses on the window.
      
      #### `win.blur ()`
      
      Removes focus from the window.
      
      #### `win.isFocused()`
      
      Returns `Boolean` - Whether the window is focused.
      
      #### `win.isDestroyed()`
      
      Returns `Boolean` - Whether the window is destroyed.
      
      #### `win.show()`
      
      Shows and gives focus to the window.
      
      #### `win.showInactive()`
      
      Shows the window but doesn't focus on it.
      
      #### `win.hide()`
      
      Hides the window.
      
      #### `win.isVisible()`
      
      Returns `Boolean` - Whether the window is visible to the user.
      
      #### `win.isModal()`
      
      Returns `Boolean` - Whether current window is a modal window.
      
      #### `win.maximize()`
      
      Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.
      
      #### `win.unmaximize()`
      
      Unmaximizes the window.
      
      #### `win.isMaximized()`
      
      Returns `Boolean` - Whether the window is maximized.
      
      #### `win.minimize()`
      
      Minimizes the window. On some platforms the minimized window will be shown in the Dock.
      
      #### `win.restore()`
      
      Restores the window from minimized state to its previous state.
      
      #### `win.isMinimized()`
      
      Returns `Boolean` - Whether the window is minimized.
      
      #### `win.setFullScreen(flag)`
      
      * `flag` Boolean
      
      Sets whether the window should be in fullscreen mode.
      
      #### `win.isFullScreen()`
      
      Returns `Boolean` - Whether the window is in fullscreen mode.
      
      #### `win.setSimpleFullScreen(flag)` *macOS*
      
      * `flag` Boolean
      
      Enters or leaves simple fullscreen mode.
      
      Simple fullscreen mode emulates the native fullscreen behavior found in versions of Mac OS X prior to Lion (10.7).
      
      #### `win.isSimpleFullScreen()` *macOS*
      
      Returns `Boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.
      
      #### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*
      
      * `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
      * `extraSize` [Size](structures/size.md) - The extra size not to be included while maintaining the aspect ratio.
      
      This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.
      
      Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Just sum any extra width and height areas you have within the overall content view.
      
      #### `win.previewFile(path[, displayName])` *macOS*
      
      * `path` String - The absolute path to the file to preview with QuickLook. This is important as Quick Look uses the file name and file extension on the path to determine the content type of the file to open.
      * `displayName` String (optional) - The name of the file to display on the Quick Look modal view. This is purely visual and does not affect the content type of the file. Defaults to `path`.
      
      Uses [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) to preview a file at a given path.
      
      #### `win.closeFilePreview()` *macOS*
      
      Closes the currently open [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) panel.
      
      #### `win.setBounds(bounds[, animate])`
      
      * `batas` [Empat persegi panjang](structures/rectangle.md)
      * `animate` Boolean (optional) *macOS*
      
      Resizes and moves the window to the supplied bounds
      
      #### `win.getBounds()`
      
      Kembali [`Rectangle`](structures/rectangle.md)
      
      #### `win.setContentBounds(bounds[, animate])`
      
      * `batas` [Empat persegi panjang](structures/rectangle.md)
      * `animate` Boolean (optional) *macOS*
      
      Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.
      
      #### `win.getContentBounds()`
      
      Kembali [`Rectangle`](structures/rectangle.md)
      
      #### `win.setEnabled(enable)`
      
      * `enable` Boolean
      
      Disable or enable the window.
      
      #### `win.setSize(width, height[, animate])`
      
      * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
<li><code>animate` Boolean (optional) *macOS*
      
      Resizes the window to `width` and `height`.
      
      #### `win.getSize()`
      
      Returns `Integer[]` - Contains the window's width and height.
      
      #### `win.setContentSize(width, height[, animate])`
      
      * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
<li><code>animate` Boolean (optional) *macOS*
      
      Resizes the window's client area (e.g. the web page) to `width` and `height`.
      
      #### `win.getContentSize()`
      
      Returns `Integer[]` - Contains the window's client area's width and height.
      
      #### `win.setMinimumSize(width, height)`
      
      * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
</ul>

<p>Sets the minimum size of window to <code>width` and `height`.</p> 
        #### `win.getMinimumSize()`
        
        Returns `Integer[]` - Contains the window's minimum width and height.
        
        #### `win.setMaximumSize(width, height)`
        
        * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
</ul>

<p>Sets the maximum size of window to <code>width` and `height`.</p> 
          #### `win.getMaximumSize()`
          
          Returns `Integer[]` - Contains the window's maximum width and height.
          
          #### `win.setResizable(resizable)`
          
          * `resizable` Boolean
          
          Sets whether the window can be manually resized by user.
          
          #### `win.isResizable()`
          
          Returns `Boolean` - Whether the window can be manually resized by user.
          
          #### `win.setMovable(movable)` *macOS* *Windows*
          
          * `movable` Boolean
          
          Sets whether the window can be moved by user. On Linux does nothing.
          
          #### `win.isMovable()` *macOS* *Windows*
          
          Returns `Boolean` - Whether the window can be moved by user.
          
          Di Linux selalu kembali ` true </ 0> .</p>

<h4><code>win.setMinimizable(minimizable)` *macOS* *Windows*</h4> 
          
          * `minimizable` Boolean
          
          Sets whether the window can be manually minimized by user. On Linux does nothing.
          
          #### `win.isMinimizable()` *macOS* *Windows*
          
          Returns `Boolean` - Whether the window can be manually minimized by user
          
          Di Linux selalu kembali ` true </ 0> .</p>

<h4><code>win.setMaximizable(maximizable)` *macOS* *Windows*</h4> 
          
          * `maximizable` Boolean
          
          Sets whether the window can be manually maximized by user. On Linux does nothing.
          
          #### `win.isMaximizable()` *macOS* *Windows*
          
          Returns `Boolean` - Whether the window can be manually maximized by user.
          
          Di Linux selalu kembali ` true </ 0> .</p>

<h4><code>win.setFullScreenable(fullscreenable)`</h4> 
          
          * `fullscreenable` Boolean
          
          Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.
          
          #### `win.isFullScreenable()`
          
          Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.
          
          #### `win.setClosable(closable)` *macOS* *Windows*
          
          * `closable` Boolean
          
          Sets whether the window can be manually closed by user. On Linux does nothing.
          
          #### `win.isClosable()` *macOS* *Windows*
          
          Returns `Boolean` - Whether the window can be manually closed by user.
          
          Di Linux selalu kembali ` true </ 0> .</p>

<h4><code>win.setAlwaysOnTop(flag[, level][, relativeLevel])`</h4> 
          
          * `flag` Boolean
          * `level` String (optional) *macOS* - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating`. See the [macOS docs](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels) for more details.
          * `relativeLevel` Integer (optional) *macOS* - The number of layers higher to set this window relative to the given `level`. The default is ``. Note that Apple discourages setting levels higher than 1 above `screen-saver`.
          
          Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.
          
          #### `win.isAlwaysOnTop()`
          
          Returns `Boolean` - Whether the window is always on top of other windows.
          
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
          
          * ` judul</ 0>  String</li>
</ul>

<p>Changes the title of native window to <code>title`.</p> 
            #### `win.getTitle()`
            
            Returns `String` - The title of the native window.
            
            **Note:** The title of web page can be different from the title of the native window.
            
            #### `win.setSheetOffset(offsetY[, offsetX])` *macOS*
            
            * `offsetY` Float
            * `offsetX` Float (optional)
            
            Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:
            
            ```javascript
            const {BrowserWindow} = membutuhkan ('elektron')
            biarkan menang = new BrowserWindow()
            
            biarkan toolbarRect = document.getElementById ('toolbar').getBoundingClientRect()
            win.setSheetOffset(toolbarRect.height)
            ```
            
            #### `win.flashFrame(flag)`
            
            * `flag` Boolean
            
            Starts or stops flashing the window to attract user's attention.
            
            #### `win.setSkipTaskbar(skip)`
            
            * `skip` Boolean
            
            Makes the window not show in the taskbar.
            
            #### `win.setKiosk(flag)`
            
            * `flag` Boolean
            
            Enters or leaves the kiosk mode.
            
            #### `win.isKiosk()`
            
            Returns `Boolean` - Whether the window is in kiosk mode.
            
            #### `win.getNativeWindowHandle()`
            
            Returns `Buffer` - The platform-specific handle of the window.
            
            The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.
            
            #### `win.hookWindowMessage(message, callback)` *Windows*
            
            * `message` Integer
            * `callback ` Fungsi
            
            Hooks a windows message. The `callback` is called when the message is received in the WndProc.
            
            #### `win.isWindowMessageHooked(message)` *Windows*
            
            * `message` Integer
            
            Returns `Boolean` - `true` or `false` depending on whether the message is hooked.
            
            #### `win.unhookWindowMessage(message)` *Windows*
            
            * `message` Integer
            
            Unhook the window message.
            
            #### `win.unhookAllWindowMessages()` *Windows*
            
            Unhooks all of the window messages.
            
            #### `win.setRepresentedFilename(filename)` *macOS*
            
            * `filename` String
            
            Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.
            
            #### `win.getRepresentedFilename()` *macOS*
            
            Returns `String` - The pathname of the file the window represents.
            
            #### `win.setDocumentEdited(edited)` *macOS*
            
            * `edited` Boolean
            
            Specifies whether the window’s document has been edited, and the icon in title bar will become gray when set to `true`.
            
            #### `win.isDocumentEdited()` *macOS*
            
            Returns `Boolean` - Whether the window's document has been edited.
            
            #### `win.focusOnWebView()`
            
            #### `win.blurWebView()`
            
            #### `win.capturePage([rect, ]callback)`
            
            * `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture
            * `callback` Fungsi 
              * ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
</ul></li>
</ul>

<p>Same as <code>webContents.capturePage([rect, ]callback)`.</p> 
                #### `win.loadURL(url[, options])`
                
                * ` url </ 0> String</li>
<li><code>pilihan` Objek (pilihan) 
                  * ` httpReferrer </ 0>  String (opsional) - url Referrer HTTP.</li>
<li><code> userAgent </ 0>  String (opsional) - Agen pengguna yang berasal dari permintaan.</li>
<li><code> extraHeaders ` String (opsional) - Header ekstra yang dipisahkan oleh " \n "
                  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
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
                
                * `format` String
                
                Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.
                
                #### `win.reload()`
                
                Same as `webContents.reload`.
                
                #### `win.setMenu(menu)` *Linux* *Windows*
                
                * `menu` Menu | null
                
                Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.
                
                #### `win.setProgressBar(progress[, options])`
                
                * `progress` Double
                * `pilihan` Objek (pilihan) 
                  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.
                
                Sets progress value in progress bar. Valid range is [0, 1.0].
                
                Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.
                
                On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `app.getName().desktop`.
                
                On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.
                
                #### `win.setOverlayIcon(overlay, description)` *Windows*
                
                * `overlay` [NativeImage](native-image.md) - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
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
                      * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is ``.
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
                    
                    * `visible` Boolean
                    
                    Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.
                    
                    #### `win.isMenuBarVisible()`
                    
                    Returns `Boolean` - Whether the menu bar is visible.
                    
                    #### `win.setVisibleOnAllWorkspaces(visible)`
                    
                    * `visible` Boolean
                    
                    Sets whether the window should be visible on all workspaces.
                    
                    **Note:** This API does nothing on Windows.
                    
                    #### `win.isVisibleOnAllWorkspaces()`
                    
                    Returns `Boolean` - Whether the window is visible on all workspaces.
                    
                    **Note:** This API always returns false on Windows.
                    
                    #### `win.setIgnoreMouseEvents(ignore[, options])`
                    
                    * `mengabaikan` Boolean
                    * `pilihan` Objek (pilihan) 
                      * `forward` Boolean (optional) *Windows* - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.
                    
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