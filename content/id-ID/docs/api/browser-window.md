# Jendela Browser

> Membuat dan mengendalikan jendela browser.

Proses: [Utama](../glossary.md#main-process)

```javascript
// Dalam proses utamanya.
const {Jendela Browser} = memerlukan ('electron')

// Atau gunakan `remote` dari proses renderer.
// const {jendela Browser} = memerlukan ('electron').terpencil biarkan menang=jendela baru Browser ( {lebar: 800, tinggi: 600} ) menang.di ('tutup', () = & gt; {menang = batal}) //beban sebuah remote URL win.loadURL ('https://github.com') // Atau muat file HTML lokal win.loadURL (`file: // $ {__ dirname} / app / index.html`)
```

## Jendela tanpa bingkai

Untuk membuat jendela tanpa krom , atau jendela transparan dalam bentuk sewenang-wenang, Anda dapat menggunakan API  Frameless Window </ 0> .</p> 

## Menampilkan jendela dengan anggun

Saat memuat halaman di jendela secara langsung, pengguna mungkin melihat pemuatan laman secara bertahap, yang bukan pengalaman bagus untuk aplikasi asli. Untuk membuat tampilan jendela tanpa lampu kilat visual, ada dua solusi untuk situasi yang berbeda.

### Menggunakan ` siap-show </ 0>  acara</h3>

<p>Saat memuat halaman, <code> siap-show </ 0>  acara akan dikeluarkan saat proses penyaji telah memberikan halaman untuk pertama kalinya jika jendela belum terbukti belum. Menampilkan jendela setelah acara ini tidak memiliki lampu kilat visual:</p>

<pre><code class="javascript">const {jendela Browser} = memerlukan ('electron') nyalakan = jendela baru Browser({show: false}) win.once ('siap-untuk-menunjukkan', () = & gt; {win.show ()})
`</pre> 

Acara ini biasanya dibunyikan setelah acara ` Apakah-selesai-load </ 0>, tapi untuk halaman dengan banyak sumber daya terpencil, itu mungkin dipancarkan sebelum acara <code> Apakah-selesai-load </ 0>.</p>

<h3>Pengaturan <code> warna latar belakang</ 0></h3>

<p>Untuk aplikasi yang kompleks, <code> siap-show </ 0>  acara bisa dipancarkan terlambat, membuat aplikasi merasa lambat. Dalam kasus ini, sebaiknya segera tampilkan jendela, dan gunakan latar belakang < 0> warna latar belakang </ 0> ke latar belakang aplikasi Anda:</p>

<pre><code class="javascript">const {BrowserWindow} = require ('electron') biarkan menang = new BrowserWindow ( {backgroundColor: '# 2e2c29'} ) win.loadURL ('https://github.com')

`</pre> 

Preview untuk aplikasi yang menggunakan ` siap-untuk-menunjukkan </ 0> peristiwa, masih disarankan untuk melakukan <code> backgroundColor </ 0> untuk aplikasi yang lebih asli.</p>

<h2>Jendela orang tua dan anak</h2>

<p>Dengan menggunakan opsi <code> induk </ 0>  , Anda dapat membuat jendela anak:</p>

<pre><code class="javascript">const {BrowserWindow} = require ('electron') biarkan top = new BrowserWindow () biarkan anak = new BrowserWindow ( {parent: top} ) child.show () top.show () top.show ()

`</pre> 

Jendela ` anak </ 0> akan selalu tampil di atas jendela <code> atas </ 0> .</p>

<h3>Jendela modal</h3>

<p>Jendela modal adalah jendela anak yang menonaktifkan jendela orangtua, untuk menciptakan jendela modal, Anda harus menetapkan pilihan <code>orang tua` dan `modal`pilihan:

```javascript
const {BrowserWindow} = require ('electron') biarkan anak = new BrowserWindow ( {parent: top, modal: true, show: false} ) child.loadURL ('https://github.com') child.once (' siap tampil ', () = & gt; {

```

### Visibilitas halaman 

The  Halaman Visibilitas API </ 0> bekerja sebagai berikut:</p> 

* Pada semua platform, negara visibilitas melacak apakah jendela tersembunyi / diminimalkan atau tidak.
* Selain itu, di macOS , status visibilitas juga melacak keadaan oklusi jendela. Jika jendela ditutup (yaitu tertutup sepenuhnya) oleh jendela lain, status visibilitas akan ` tersembunyi </ 0> . Pada platform lain, status visibilitas hanya <code> tersembunyi </ 0> hanya jika jendela diminimalkan atau secara eksplisit disembunyikan dengan <code> win.hide () </ 0> .</li>
<li>Jika <code> BrowserWindow </ 0> dibuat dengan <code> show: false </ 0> , status visibilitas awal akan <code> terlihat </ 0> meskipun jendela benar-benar tersembunyi.</li>
<li>Jika <code> backgroundThrottling </ 0> dinonaktifkan, status visibilitas akan tetap
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
  <p>Buat dan kendalikan jendela browser.</p>
</blockquote>

<p>Proses: <a href="../glossary.md#main-process"> Utama </ 0></p>

<p><code> BrowserWindow </ 0> adalah
 <a href="http://nodejs.org/api/events.html#events_class_events_eventemitter"> EventEmitter </ 1> .</p>

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
    * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. Default is `false`.
    * `enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. Default is `false`.
    * `backgroundColor` String (optional) - Window's background color as Hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported). Default is `#FFF` (white).
    * `hasShadow` Boolean (optional) - Whether window should have a shadow. This is only implemented on macOS. Default is `true`.
    * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Default is `false`.
    * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md). Default is `false`.
    * `type` String (optional) - The type of window, default is normal window. See more about this below.
    * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Possible values are: 
      * `default` - Results in the standard gray opaque Mac title bar.
      * `hidden` - Results in a hidden title bar and a full size content window, yet the title bar still has the standard window controls ("traffic lights") in the top left.
      * `hidden-inset` - Deprecated, use `hiddenInset` instead.
      * `hiddenInset` - Results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.
      * `customButtonsOnHover` Boolean (optional) - Draw custom close, minimize, and full screen buttons on macOS frameless windows. These buttons will not display unless hovered over in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. **Note:** This option is currently experimental.
    * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the tile bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
    * `thickFrame` Boolean (optional) - Use `WS_THICKFRAME` style for frameless windows on Windows, which adds standard window frame. Setting it to `false` will remove window shadow and window animations. Defaultnya adalah `true`.
    * `vibrancy` String (optional) - Add a type of vibrancy effect to the window, only on macOS. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`.
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
      * `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. By assigning the same `partition`, multiple pages can share the same session. Default is the default session.
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
      * `blinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) file.
      * `disableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to disable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) file.
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
      * `backgroundThrottling` Boolean (optional) - Whether to throttle animations and timers when the page becomes background. This also affects the \[Page Visibility API\]\[#page-visibility\]. Defaults to `true`.
      * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. Defaults to `false`. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
      * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab. **Note:** This option is currently experimental and may change or be removed in future Electron releases.
      * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
      * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to the value of the `nodeIntegration` option. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.
  
  When setting minimum or maximum window size with `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, it only constrains the users. It won't prevent you from passing a size that does not follow size constraints to `setBounds`/`setSize` or to the constructor of `BrowserWindow`.
  
  The possible values and behaviors of the `type` option are platform dependent. Possible values are:
  
  * On Linux, possible types are `desktop`, `dock`, `toolbar`, `splash`, `notification`.
  * On macOS, possible types are `desktop`, `textured`. 
    * The `textured` type adds metal gradient appearance (`NSTexturedBackgroundWindowMask`).
    * The `desktop` type places the window at the desktop background window level (`kCGDesktopWindowLevel - 1`). Note that desktop window will not receive focus, keyboard or mouse events, but you can use `globalShortcut` to receive input sparingly.
  * On Windows, possible type is `toolbar`.
  ### Instance Events
  
  Objects created with `new BrowserWindow` emit the following events:
  
  **Note:** Some events are only available on specific operating systems and are labeled as such.
  
  #### Event: 'page-title-updated'
  
  Pengembalian:
  
  * ` event </ 0>  Acara</li>
<li><code>title` String
  
  Emitted when the document changed its title, calling `event.preventDefault()` will prevent the native window's title from changing.
  
  #### Event: 'close'
  
  Pengembalian:
  
  * ` event </ 0>  Acara</li>
</ul>

<p>Emitted when the window is going to be closed. It's emitted before the
<code>beforeunload` and `unload` event of the DOM. Calling `event.preventDefault()` will cancel the close.</p> 
    Usually you would want to use the `beforeunload` handler to decide whether the window should be closed, which will also be called when the window is reloaded. In Electron, returning any value other than `undefined` would cancel the close. For example:
    
    ```javascript
window.onbeforeunload = (e) => {
  console.log('I do not want to be closed')

  // Unlike usual browsers that a message box will be prompted to users, returning
  // a non-void value will silently cancel the close.
  // It is recommended to use the dialog API to let the user confirm closing the
  // application.
  e.returnValue = false
}
```

#### Event: 'closed'

Emitted when the window is closed. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Event: 'session-end' *Windows*

Emitted when window session is going to end due to force shutdown or machine restart or session log off.

#### Event: 'unresponsive'

Emitted when the web page becomes unresponsive.

#### Event: 'responsive'

Emitted when the unresponsive web page becomes responsive again.

#### Event: 'blur'

Emitted when the window loses focus.

#### Event: 'focus'

Emitted when the window gains focus.

#### Event: 'show'

Emitted when the window is shown.

#### Event: 'hide'

Emitted when the window is hidden.

#### Event: 'ready-to-show'

Emitted when the web page has been rendered (while not being shown) and window can be displayed without a visual flash.

#### Event: 'maximize'

Emitted when window is maximized.

#### Event: 'unmaximize'

Emitted when the window exits from a maximized state.

#### Event: 'minimize'

Emitted when the window is minimized.

#### Event: 'restore'

Emitted when the window is restored from a minimized state.

#### Event: 'resize'

Emitted when the window is being resized.

#### Event: 'move'

Emitted when the window is being moved to a new position.

**Note**: On macOS this event is just an alias of `moved`.

#### Event: 'moved' *macOS*

Emitted once when the window is moved to a new position.

#### Event: 'enter-full-screen'

Emitted when the window enters a full-screen state.

#### Event: 'leave-full-screen'

Emitted when the window leaves a full-screen state.

#### Event: 'enter-html-full-screen'

Emitted when the window enters a full-screen state triggered by HTML API.

#### Event: 'leave-html-full-screen'

Emitted when the window leaves a full-screen state triggered by HTML API.

#### Event: 'app-command' *Windows*

Pengembalian:

* ` event </ 0>  Acara</li>
<li><code>command` String

Emitted when an [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) is invoked. These are typically related to keyboard media keys or browser commands, as well as the "Back" button built into some mice on Windows.

Commands are lowercased, underscores are replaced with hyphens, and the `APPCOMMAND_` prefix is stripped off. e.g. `APPCOMMAND_BROWSER_BACKWARD` is emitted as `browser-backward`.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

#### Event: 'scroll-touch-begin' *macOS*

Emitted when scroll wheel event phase has begun.

#### Event: 'scroll-touch-end' *macOS*

Emitted when scroll wheel event phase has ended.

#### Event: 'scroll-touch-edge' *macOS*

Emitted when scroll wheel event phase filed upon reaching the edge of element.

#### Event: 'swipe' *macOS*

Pengembalian:

* ` event </ 0>  Acara</li>
<li><code>direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Event: 'sheet-begin' *macOS*

Emitted when the window opens a sheet.

#### Event: 'sheet-end' *macOS*

Emitted when the window has closed a sheet.

#### Event : 'new-window-for-tab' * macOS </ 0></h4> 

Emitted when the native new tab button is clicked.

### Static Methods

The `BrowserWindow` class has the following static methods:

#### `BrowserWindow.getAllWindows()`

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* ` webContents </ 0>  <a href="web-contents.md"> WebContents </ 1></li>
</ul>

<p>Returns <code>BrowserWindow` - The window that owns the given `webContents`.</p> 
  #### `BrowserWindow.fromId(id)`
  
  * `id` Integer
  
  Returns `BrowserWindow` - The window with the given `id`.
  
  #### `BrowserWindow.addExtension(path)`
  
  * ` path </ 0>  String</li>
</ul>

<p>Adds Chrome extension located at <code>path`, and returns extension's name.</p> 
    The method will also not return if the extension's manifest is missing or incomplete.
    
    **Note:** This API cannot be called before the `ready` event of the `app` module is emitted.
    
    #### `BrowserWindow.removeExtension(name)`
    
    * ` nama </ 0>  String</li>
</ul>

<p>Remove a Chrome extension by name.</p>

<p><strong>Note:</strong> This API cannot be called before the <code>ready` event of the `app` module is emitted.</p> 
      #### `BrowserWindow.getExtensions()`
      
      Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.
      
      **Note:** This API cannot be called before the `ready` event of the `app` module is emitted.
      
      #### `BrowserWindow.addDevToolsExtension(path)`
      
      * ` path </ 0>  String</li>
</ul>

<p>Adds DevTools extension located at <code>path`, and returns extension's name.</p> 
        The extension will be remembered so you only need to call this API once, this API is not for programming use. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.
        
        The method will also not return if the extension's manifest is missing or incomplete.
        
        **Note:** This API cannot be called before the `ready` event of the `app` module is emitted.
        
        #### `BrowserWindow.removeDevToolsExtension(name)`
        
        * ` nama </ 0>  String</li>
</ul>

<p>Remove a DevTools extension by name.</p>

<p><strong>Note:</strong> This API cannot be called before the <code>ready` event of the `app` module is emitted.</p> 
          #### `BrowserWindow.getDevToolsExtensions()`
          
          Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.
          
          To check if a DevTools extension is installed you can run the following:
          
          ```javascript
const {BrowserWindow} = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```
      
      **Note:** This API cannot be called before the `ready` event of the `app` module is emitted.
      
      ### Instance Properties
      
      Objects created with `new BrowserWindow` have the following properties:
      
      ```javascript
const {BrowserWindow} = require('electron')
// In this example `win` is our instance
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```
  
  #### `win.webContents`
  
  A `WebContents` object this window owns. All web page related events and operations will be done via it.
  
  See the [`webContents` documentation](web-contents.md) for its methods and events.
  
  #### `win.id`
  
  A `Integer` representing the unique ID of the window.
  
  ### Metode Instance
  
  Objects created with `new BrowserWindow` have the following instance methods:
  
  ** Catatan: </ 0> Beberapa metode hanya tersedia pada sistem operasi tertentu dan diberi label seperti itu.</p> 
  
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
  
  Sembunyikan jendela.
  
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
  
  * ` batas </ 0>  <a href="structures/rectangle.md">  Empat persegi panjang </ 1></li>
<li><code>animate` Boolean (optional) *macOS*
  
  Resizes and moves the window to the supplied bounds
  
  #### `win.getBounds()`
  
  Returns [`Rectangle`](structures/rectangle.md)
  
  #### `win.setContentBounds(bounds[, animate])`
  
  * ` batas </ 0>  <a href="structures/rectangle.md">  Empat persegi panjang </ 1></li>
<li><code>animate` Boolean (optional) *macOS*
  
  Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.
  
  #### `win.getContentBounds()`
  
  Returns [`Rectangle`](structures/rectangle.md)
  
  #### `win.setSize(width, height[, animate])`
  
  * `width` Integer
  * `height` Integer
  * `animate` Boolean (optional) *macOS*
  
  Resizes the window to `width` and `height`.
  
  #### `win.getSize()`
  
  Returns `Integer[]` - Contains the window's width and height.
  
  #### `win.setContentSize(width, height[, animate])`
  
  * `width` Integer
  * `height` Integer
  * `animate` Boolean (optional) *macOS*
  
  Resizes the window's client area (e.g. the web page) to `width` and `height`.
  
  #### `win.getContentSize()`
  
  Returns `Integer[]` - Contains the window's client area's width and height.
  
  #### `win.setMinimumSize(width, height)`
  
  * `width` Integer
  * `height` Integer
  
  Sets the minimum size of window to `width` and `height`.
  
  #### `win.getMinimumSize()`
  
  Returns `Integer[]` - Contains the window's minimum width and height.
  
  #### `win.setMaximumSize(width, height)`
  
  * `width` Integer
  * `height` Integer
  
  Sets the maximum size of window to `width` and `height`.
  
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
  
  On Linux always returns `true`.
  
  #### `win.setMinimizable(minimizable)` *macOS* *Windows*
  
  * `minimizable` Boolean
  
  Sets whether the window can be manually minimized by user. On Linux does nothing.
  
  #### `win.isMinimizable()` *macOS* *Windows*
  
  Returns `Boolean` - Whether the window can be manually minimized by user
  
  On Linux always returns `true`.
  
  #### `win.setMaximizable(maximizable)` *macOS* *Windows*
  
  * `maximizable` Boolean
  
  Sets whether the window can be manually maximized by user. On Linux does nothing.
  
  #### `win.isMaximizable()` *macOS* *Windows*
  
  Returns `Boolean` - Whether the window can be manually maximized by user.
  
  On Linux always returns `true`.
  
  #### `win.setFullScreenable(fullscreenable)`
  
  * `fullscreenable` Boolean
  
  Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.
  
  #### `win.isFullScreenable()`
  
  Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.
  
  #### `win.setClosable(closable)` *macOS* *Windows*
  
  * `closable` Boolean
  
  Sets whether the window can be manually closed by user. On Linux does nothing.
  
  #### `win.isClosable()` *macOS* *Windows*
  
  Returns `Boolean` - Whether the window can be manually closed by user.
  
  On Linux always returns `true`.
  
  #### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`
  
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
  
  * `title` String
  
  Changes the title of native window to `title`.
  
  #### `win.getTitle()`
  
  Returns `String` - The title of the native window.
  
  **Note:** The title of web page can be different from the title of the native window.
  
  #### `win.setSheetOffset(offsetY[, offsetX])` *macOS*
  
  * `offsetY` Float
  * `offsetX` Float (optional)
  
  Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:
  
  ```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
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

Masuk atau keluar dari mode kiosk.

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
    
    * ` url </ 0>  String</li>
<li><code>pilihan` Objek (opsional) 
      * `httpReferrer` String (optional) - A HTTP Referrer url.
      * `userAgent` String (optional) - A user agent originating the request.
      * `extraHeaders` String (optional) - Extra headers separated by "\n"
      * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) - (optional)
      * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.
    
    Same as `webContents.loadURL(url[, options])`.
    
    The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.
    
    To ensure that file URLs are properly formatted, it is recommended to use Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) method:
    
    ```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

You can load a URL using a `POST` request with URL-encoded data by doing the following:

```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    type: 'rawData',
    bytes: Buffer.from('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `pilihan` Objek (opsional) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error`, or `paused`.

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

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Object 
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
    
    * `pilihan` Object 
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
    
    * ` ikon </ 0>  <a href="native-image.md"> NativeImage </ 1></li>
</ul>

<p>Ubah ikon jendela.</p>

<h4><code>win.setAutoHideMenuBar(hide)`</h4> 
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
      
      #### `win.setIgnoreMouseEvents(ignore)`
      
      * `ignore` Boolean
      
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
      
      #### `win.setVibrancy(type)` *macOS*
      
      * `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/reference/appkit/nsvisualeffectview?language=objc) for more details.
      
      Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.
      
      #### `win.setTouchBar(touchBar)` *macOS* *Experimental*
      
      * `touchBar` TouchBar
      
      Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.
      
      **Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.
      
      #### `win.setBrowserView(browserView)` *Experimental*
      
      * `browserView` [BrowserView](browser-view.md)
      
      ** Catatan: </ 0> lihat browser API masih bersifat eksperimental dan mungkin mengubah atau dihapus elektron pada masa depan.</p>