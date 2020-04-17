# BrowserWindow

> Create and control browser windows.

Proses: [Main](../glossary.md#main-process)

```javascript
// Pada proses utama.
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

Untuk membuat jendela tanpa krom , atau jendela transparan dalam bentuk sewenang-wenang, Anda dapat menggunakan API

 Frameless Window </ 0>  .</p> 



## Menampilkan jendela dengan anggun

Ketika memuat halaman di jendela secara langsung, pengguna dapat melihat pemuatan halaman secara bertahap, yang bukan pengalaman yang baik untuk aplikasi asli. Untuk membuat tampilan jendela tanpa visual flash, ada dua solusi untuk situasi yang berbeda.



## Menggunakan kejadian `ready-to-show`

Saat memuat halaman, kejadian `ready-to-show` akan dikeluarkan saat proses perender telah memberikan halaman untuk pertama kalinya jika jendela belum ditampilkan. Menampilkan jendela setelah kejadian ini tidak memiliki flash visual:



```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```


Kejadian ini biasanya dijalankan/dikeluarkan setelah kejadian `did-finish-load`, tapi untuk halaman dengan banyak sumber daya jark jauh, itu mungkin dijalankan sebelum kejadian `did-finish-load`.

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false.  This event will never fire if you use `paintWhenInitiallyHidden: false`



## Pengaturan `backgroundColor`

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



## Jendela modal

Jendela modal adalah jendela anak yang menonaktifkan jendela orangtua, untuk menciptakan jendela modal, Anda harus menetapkan pilihan `parent` dan `modal` pilihan:



```javascript
const { BrowserWindow } = require ('electron') biarkan anak = Jendela peramban baru ( {orang tua: atas, modal: benar, tunjukkan: salah} ) anak. beban URL ('https://github.com') child.once (' siap tampil ', () = & gt; {
{ parent: top, modal: true, show: false }{parent: top, modal: true, show: false}{parent: top, modal: true, show: false}{parent: top, modal: true, show: false}
```




## Visibilitas halaman 

The [Halaman Visibilitas API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) bekerja sebagai berikut:

* Pada semua platform, keadaan visibilitas melacak apakah jendela tersembunyi/diminimalkan atau tidak.

* Selain itu, di macOS, keadaan visibilitas juga melacak keadaan oklusi jendela. Jika jendela ditutup (yaitu tertutup sepenuhnya) oleh jendela lain, keadaan visibilitas akan `hidden`. Pada platform lain, keadaan visibilitas hanya `hidden` hanya jika jendela diminimalkan atau secara eksplisit disembunyikan dengan `win.hide()`.

* Jika `BrowserWindow` dibuat dengan `show: false`, keadaan visibilitas awal akan `visible` meskipun jendela benar-benar tersembunyi.

* Jika `backgroundThrottling` dinonaktifkan, keadaan visibilitas akan tetap `visible` meskipun jendela diminimalkan, tersumbat, atau tersembunyi.

Disarankan agar Anda menghentikan sementara operasi mahal saat keadaan visibilitas `hidden` untuk meminimalkan konsumsi daya.



## Pemberitahuan platform

* Di jendela macOS modal akan ditampilkan sebagai lembaran yang menempel pada jendela induk.
* Pada macOS , jendela anak akan menjaga posisi relatif ke jendela induk saat jendela induk bergerak, sementara pada jendela anak Windows dan Linux tidak akan bergerak.

* Di Linux jenis jendela modal akan diubah menjadi `dialog`.

* Di Linux banyak lingkungan desktop tidak mendukung menyembunyikan jendela modal.



## Kelas: BrowserWindow



> Buat dan kendalikan jendela peramban.

Proses: [Main](../glossary.md#main-process)

`BrowserWindow` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Ini menciptakan `BrowserWindow` baru dengan sifat asli yang ditetapkan oleh `options`.



### `new BrowserWindow([options])`

* `options` Object (optional)
  
    * `width` Integer (optional) - Window's width in pixels. Default is `800`.
  * `height` Integer (optional) - Window's height in pixels. Default is `600`.
  * `x` Integer (optional) - (**required** if y is used) Window's left offset from screen. Default is to center the window.
  * `y` Integer (optional) - (**required** if x is used) Window's top offset from screen. Default is to center the window.
  * ` useContentSize </ 0>  Boolean (opsional) - The <code> lebar </ 0> dan <code> tinggi </ 0> akan digunakan sebagai ukuran halaman web, yang berarti ukuran jendela yang sebenarnya akan mencakup ukuran jendela frame dan menjadi sedikit lebih besar. Defaultnya adalah <code> false </ 0> .</li>
<li><code> center </ 0>  Boolean (opsional) - Tampilkan jendela di bagian tengah layar.</li>
<li><code>minWidth` Integer (optional) - Window's minimum width. Default is `0`.
  * `minHeight` Integer (optional) - Window's minimum height. Default is `0`.
  * `maxWidth` Integer (optional) - Window's maximum width. Default is no limit.
  * `maxHeight` Integer (optional) - Window's maximum height. Default is no limit.
  * `resizable` Boolean (optional) - Whether window is resizable. Defaultnya adalah `true`.
  * `movable` Boolean (optional) - Whether window is movable. This is not implemented on Linux. Defaultnya adalah `true`.
  * `minimizable` Boolean (optional) - Whether window is minimizable. This is not implemented on Linux. Defaultnya adalah `true`.
  * `maximizable` Boolean (optional) - Whether window is maximizable. This is not implemented on Linux. Defaultnya adalah `true`.
  * `closable` Boolean (optional) - Whether window is closable. This is not implemented on Linux. Defaultnya adalah `true`.
  * ` fokusable </ 0>  Boolean (opsional) - Apakah jendela dapat difokuskan. Default adalah
<code>benar`. Pada setelan Windows `fokus: false` juga menyiratkan pengaturan `skipTaskbar: benar`. Pada setting Linux `focusable: false` membuat jendela Berhenti berinteraksi dengan wm, jadi jendela akan selalu tetap di atas semua ruang kerja.
  * `alwaysOnTop` Boolean (optional) - Whether the window should always stay on top of other windows. Defaultnya adalah ` false </ 0> .</li>
<li><code>layar penuh` Boolean (opsional) - Apakah jendela harus tampil di layar penuh. Secara eksplisit set ke `false` tombol fullscreen akan disembunyikan atau dinonaktifkan di macOS. Defaultnya adalah ` false </ 0> .</li>
<li><code>fullscreenable` Boolean (optional) - Whether the window can be put into fullscreen mode. Di macOS, juga apakah tombol perbesar/zoom harus beralih penuh mode layar atau memaksimalkan jendela. Defaultnya adalah `true`.
  * `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. Defaultnya adalah ` false </ 0> .</li>
<li><code>skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. Default is `false`.
  * `kiosk` Boolean (optional) - The kiosk mode. Defaultnya adalah ` false </ 0> .</li>
<li><code>title` String (optional) - Default window title. Default is `"Electron"`. If the HTML tag `<title>` is defined in the HTML file loaded by `loadURL()`, this property will be ignored.
  * `ikon` ([NativeImage](native-image.md) | String) (opsional) - Ikon jendela. Pada Windows itu disarankan untuk menggunakan ikon `ICO` untuk mendapatkan efek visual terbaik, Anda juga bisa biarkan tidak terdefinisi sehingga ikon executable akan digunakan.
  * `show` Boolean (optional) - Whether window should be shown when created. Default adalah `benar`.
  * `paintWhenInitiallyHidden` Boolean (optional) - Whether the renderer should be active when `show` is `false` and it has just been created.  In order for `document.visibilityState` to work correctly on first load with `show: false` you should set this to `false`.  Setting this to `false` will cause the `ready-to-show` event to not fire.  Defaultnya adalah `true`.
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). Defaultnya adalah `true`.
  * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Defaultnya adalah ` false </ 0> .</li>
<li><code>acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
  * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. Defaultnya adalah ` false </ 0> .</li>
<li><code>autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. Defaultnya adalah ` false </ 0> .</li>
<li><code>enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. Only relevant for macOS, as other OSes allow larger-than-screen windows by default. Defaultnya adalah ` false </ 0> .</li>
<li><code>backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha in #AARRGGBB format is supported if `transparent` is set to `true`). Default is `#FFF` (white).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. Defaultnya adalah `true`.
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Defaultnya adalah ` false </ 0> .</li>
<li><code>transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md#transparent-window). Defaultnya adalah ` false </ 0> . On Windows, does not work unless the window is frameless.</li>
<li><code>type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Nilai yang mungkin adalah:
    
        * `default` - Hasil dalam judul Mac buram abu-abu standar.

    * `tersembunyi` - Hasil di bar judul tersembunyi dan jendela konten ukuran penuh judul bar masih memiliki kontrol jendela standar ("lampu lalu lintas") di kiri atas.

    * `hiddenInset` - Hasil di bar judul tersembunyi dengan tampilan alternatif dimana tombol lampu lalu lintas sedikit lebih tertutup dari tepi jendela.

    * `customButtonsOnHover` Boolean (optional) - Draw custom close, and minimize buttons on macOS frameless windows. These buttons will not display unless hovered over in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. **Catatan:** Pilihan ini saat ini sedang eksperimental.

  * `trafficLightPosition` [Point](structures/point.md) (optional) - Set a custom position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`

  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Defaultnya adalah ` false </ 0> .</li>
<li><code>thickFrame` Boolean (opsional) - Gunakan `WS_THICKFRAME` untuk jendela buram tanpa bingkai Windows, yang menambahkan bingkai jendela standar. Menyetelnya ke ` false </ 0> akan menghapus window shadow dan animasi jendela. Defaultnya adalah <code>true`.
  * ` getar </ 0> String (opsional) - Tambahkan jenis efek getar ke jendela, hanya di macos. Can be <code>appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`.  Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well. Also note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. Jika ` benar </ 0>, jendela akan tumbuh ke lebar yang disarankan dari halaman web saat diperbesar, <code> false </ 0> akan menyebabkannya memperbesar lebar layar. Ini juga akan mempengaruhi perilaku saat memanggil <code> maximize () </ 0> secara langsung. Defaultnya adalah <code> false </ 0> .</li>
<li><code> tabbingIdentifier </ 0> String (opsional) - Nama grup tab, memungkinkan untuk membuka
jendela sebagai tab asli di macos 10.12+. Windows dengan tabbing yang sama
Pengenal akan dikelompokkan bersama. Windows dengan tabbing yang sama
Pengenal akan dikelompokkan bersama.</li>
<li><p spaces-before="0"><code>webPreferences` Object (optional) - Settings of web page's features.</p> 
        * ` devTools </ 0> Boolean (opsional) - Baik untuk mengaktifkan DevTools.

Konteks | Permintaan Konteks. Jika diset ke <code> false </ 0>, tidak dapat menggunakan <code> BrowserWindow.webContents.openDevTools () </ 0> untuk membuka DevTools. Defaultnya adalah <code>true`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Defaultnya adalah ` false </ 0> .</p></li>
<li><p spaces-before="0"><code> nodeIntegrationInWorker` Boolean (opsional) - Apakah integrasi simpul diaktifkan pada pekerja web. Defaultnya adalah ` false </ 0> . Lebih lanjut tentang ini dapat ditemukan di <a href="../tutorial/multithreading.md">Multithreading</a>.</p></li>
<li><p spaces-before="0"><code>nodeIntegrationInSubFrames` Boolean (optional) - Experimental option for enabling Node.js support in sub-frames such as iframes and child windows. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not.

    * `preload` String (opsional) - Menentukan skrip yang akan dimuat sebelum skrip lain dijalankan di halaman. Script ini akan selalu memiliki akses ke API simpul tidak peduli apakah integrasi node dinyalakan atau dimatikan. Nilainya harus jadilah path file absolut pada script. Saat integrasi simpul dimatikan, skrip preload dapat diperkenalkan kembali Simbol global node kembali ke lingkup global. Lihat contoh [di sini](process.md#event-loaded).

    * `kotak pasir` Boolean (opsional) - Jika disetel, ini akan menampilkan kotak pasir perender terkait dengan jendela, membuatnya kompatibel dengan Chromium Kotak pasir tingkat OS dan menonaktifkan mesin Node.js. Ini tidak sama dengan opsi `nodeIntegration` dan API tersedia untuk skrip pramuat lebih terbatas. Baca lebih lanjut tentang opsi [di sini](sandbox-option.md).

    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. Defaultnya adalah `true`.

    * `session` [Session](session.md#class-session) (perintah) - sesuaikan sesi yang digunakan oleh halaman. Alih-alih melewati objek Sidang secara langsung, Anda juga bisa memilihnya gunakan opsi `partisi` sebagai gantinya, yang menerima string partisi. Kapan `Session` dan `partisi` disediakan, `Session` akan lebih disukai. Default adalah sesi default.

    * `partisi` String (opsional) - Mengatur sesi yang digunakan oleh halaman sesuai dengan string partisi. Jika `partisi` dimulai dengan `bertahan:`, halaman akan menggunakan sesi persisten yang tersedia untuk semua halaman di aplikasi dengan sama `partisi`. Jika tidak ada awalan `bertahan:`, halaman akan menggunakan a sesi dalam memori. Dengan menugaskan yang sama `partisi`, beberapa halaman dapat berbagi sesi yang sama. Default adalah sesi default.

    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`. _This property is experimental_

    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.

    * `javascript` Boolean (optional) - Enables JavaScript support. Defaultnya adalah `true`.

    * `webSecurity` Boolean (opsional) - Bila `false`, itu akan menonaktifkan Kebijakan asal yang sama (biasanya menggunakan situs pengujian oleh orang), dan tetapkan ` allowRunningInsecureContent ` ke `true` jika opsi ini belum ditetapkan oleh pengguna. Defaultnya adalah `true`.

    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Defaultnya adalah ` false </ 0> .</p></li>
<li><p spaces-before="0"><code>images` Boolean (optional) - Enables image support. Defaultnya adalah `true`.

    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.

    * `webgl` Boolean (optional) - Enables WebGL support. Defaultnya adalah `true`.

    * `plugins` Boolean (optional) - Whether plugins should be enabled. Defaultnya adalah ` false </ 0> .</li>
<li><p spaces-before="0"><code>experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Defaultnya adalah ` false </ 0> .</p></li>
<li><p spaces-before="0"><code>scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Defaultnya adalah ` false </ 0> .</p></li>
<li><p spaces-before="0"><code>enableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. Daftar lengkap fitur yang didukung string dapat ditemukan di [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) mengajukan.</p>
    * `disableBlinkFeatures` String (opsional) - Daftar string fitur yang dipisahkan oleh `,`, seperti ` CSSVariables, KeyboardEventKey` untuk menonaktifkannya. Daftar lengkap didukung string fitur dapat ditemukan di [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.

    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family.
      
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
    * `backgroundThrottling` Boolean (opsional) - Apakah akan mencekik animasi dan timer? Saat halaman menjadi background. This also affects the [Page Visibility API](#page-visibility). Default ke ` true </ 0> .</p></li>
<li><p spaces-before="0"><code> offscreen </ 0>  Boolean (opsional) - Apakah akan mengaktifkan rendering offscreen untuk jendela browser. Default ke <code> false </ 0>. Lihat
 tutorial rendering <a href="../tutorial/offscreen-rendering.md"> offscreen </ 0> untuk lebih jelasnya.</p></li>
<li><p spaces-before="0"><code> contextIsolation </ 0>  Boolean (opsional) - Apakah akan menjalankan API Elektron dan skrip <code> preload </ 0> yang ditentukan dalam konteks JavaScript yang terpisah . Default ke <code> false </ 0> . Konteks script <code> preload ` berjalan masih akan memiliki akses penuh ke jendela ` document `dan` window` namun akan menggunakan set sendiri JavaScript builtins ( `Array`, `Objek`, `JSON`, dll.) Dan akan diisolasi dari perubahan yang dilakukan pada lingkungan global oleh laman yang dimuat. The Electron  API hanya akan tersedia di ` preload </ 0> naskah dan bukan halaman dimuat. Opsi ini harus digunakan saat memuat konten remote yang berpotensi tidak tepercaya untuk memastikan konten yang dimuat tidak dapat merusak skrip <code> preload </ 0> dan setiap API Elektron yang digunakan.
Opsi ini menggunakan teknik yang sama yang digunakan oleh <a href="https://developer.chrome.com/extensions/content_scripts#execution-environment"> Chrome Content Scripts </ 0> .
Anda dapat mengakses konteks ini di alat dev dengan memilih entri ' Elektron Isolated Context' di kotak kombo di bagian atas tab Konsol.</p></li>
<li><p spaces-before="0"><code>nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Default ke ` false </ 0>. Child windows will always have node
integration disabled unless <code>nodeIntegrationInSubFrames` is true. **Note:** This option is currently experimental.

    * ` webviewTag ` Boolean (opsional) - Apakah untuk mengaktifkan[`<webview>`tag](webview-tag.md). Default ke ` false </ 0>. <strong x-id="1"> Catatan: </strong>
 <code> preload ` Script dikonfigurasi untuk `<webview>` akan memiliki simpul integrasi diaktifkan ketika dieksekusi sehingga Anda harus memastikan remote / konten yang tidak dipercaya tidak mampu menciptakan `<webview>` tag dengan mungkin ` preload ` script. Anda dapat menggunakan `akan melampirkan tampilan web` acara di [webContents](web-contents.md) untuk mengupas dengan` preload` naskah dan untuk memvalidasi atau mengubah `<webview>` 's pengaturan awal.

    * `additionalArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app.  Useful for passing small bits of data down to renderer process preload scripts.

    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Defaultnya adalah ` false </ 0> .</p></li>
<li><p spaces-before="0"><code>safeDialogsMessage` String (optional) - The message to display when consecutive dialog protection is triggered. If not defined the default message would be used, note that currently the default message is in English and not localized.

    * `disableDialogs` Boolean (optional) - Whether to disable dialogs completely. Overrides `safeDialogs`. Defaultnya adalah ` false </ 0> .</p></li>
<li><p spaces-before="0"><code>navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Defaultnya adalah ` false </ 0> .</p></li>
<li><p spaces-before="0"><code>autoplayPolicy` String (optional) - Autoplay policy to apply to content in the window, can be `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Defaults to `no-user-gesture-required`.

    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.

    * `accessibleTitle` String (optional) - An alternative title string provided only to accessibility tools such as screen readers. This string is not directly visible to users.

    * `spellcheck` Boolean (optional) - Whether to enable the builtin spellchecker. Defaultnya adalah ` false </ 0> .</p></li>
</ul></li>
</ul></li>
</ul>

<p spaces-before="0">When setting minimum or maximum window size with <code>minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, it only constrains the users. Ini tidak akan mencegah Anda melewati ukuran yang tidak mengikuti batasan ukuran pada ` setBounds `/`setSize` atau ke konstruktor `BrowserWindow`.
      
      The possible values and behaviors of the `type` option are platform dependent. Nilai yang mungkin adalah:
      
      * Di Linux, jenis yang mungkin adalah `desktop`, `dermaga`, `toolbar`, `splash`, `notifikasi`.

* On macOS, possible types are `desktop`, `textured`.
  
    * Tipe ` bertekstur </ 0> menambahkan tampilan gradien logam ( <code> NSTexturedBackgroundWindowMask </ 0> ).</li>
<li>Tipe <code> desktop </ 0> menempatkan jendela pada tingkat jendela latar belakang desktop ( <code> kCGDesktopWindowLevel - 1 </ 0> ). Perhatikan bahwa jendela desktop tidak akan menerima acara fokus, keyboard atau mouse, namun Anda dapat menggunakan <code> globalShortcut ` untuk menerima masukan secara hemat.
* Pada Windows , jenis yang mungkin adalah ` toolbar </ 0> .</li>
</ul>

<h3 spaces-before="0">Contoh peristiwa</h3>

<p spaces-before="0">Objek yang dibuat dengan <code> BrowserWindow baru </ 0> memancarkan acara berikut:</p>

<p spaces-before="0"><strong x-id="1"> Catatan: </ 0> Beberapa acara hanya tersedia pada sistem operasi tertentu dan diberi label seperti itu.</p>

<h4 spaces-before="0">Acara : 'halaman-judul-diperbarui'</h4>

<p spaces-before="0">Pengembalian:</p>

<ul>
<li><code>acara` Acara
* ` title </ 0>  String</li>
<li><code>explicitSet` Boolean
Emitted ketika dokumen tersebut mengubah namanya, memanggil ` event.preventDefault () </ 0> 
akan mencegah perubahan dari jendela asli.
<code>explicitSet` is false when title is synthesized from file URL.



#### Acara : 'dekat'

Pengembalian:

* `acara` Acara
Emitted saat jendela akan ditutup. Ini dipancarkan sebelum `` beforeunload </ 0> dan <code> membongkar </ 0>  acara DOM. Memanggil <code> event.preventDefault () </ 0> 
akan membatalkan penutupan.</p>

<p spaces-before="0">Biasanya Anda ingin menggunakan handler <code> beforeunload </ 0> untuk menentukan apakah jendela harus ditutup, yang juga akan dipanggil saat jendela dimuat ulang. Di Elektron , mengembalikan nilai selain <code> tidak terdefinisi </ 0> akan membatalkan penutupan. Sebagai contoh:</p>

<pre><code class="javascript">window.onbeforeunload = (e) = & gt; {
   console.log ('Saya tidak ingin ditutup')

   // Tidak seperti browser biasa, kotak pesan akan diminta ke pengguna, mengembalikan
   // nilai non-void diam-diam akan membatalkan penutupan.
  // Dianjurkan untuk menggunakan API dialog agar pengguna mengkonfirmasi penutupan
   // aplikasi.
  e.returnValue = false // equivalent to `return false` but not recommended
}
``</pre> 

_**Note**: There is a subtle difference between the behaviors of `window.onbeforeunload = handler` and `window.addEventListener('beforeunload', handler)`. It is recommended to always set the `event.returnValue` explicitly, instead of only returning a value, as the former works more consistently within Electron._



#### Acara : 'ditutup'

Emitted saat jendela tertutup. After you have received this event you should remove the reference to the window and avoid using it any more.



#### Event : 'session-end' _ Windows </ 0></h4> 

Emitted saat window session akan berakhir karena force shutdown atau restart mesin atau session log off.



#### Acara : 'tidak responsif'

Emitted saat halaman web menjadi tidak responsif.



#### Acara: 'responsif'

Emitted saat halaman web yang tidak responsif menjadi responsif lagi.



#### Acara: 'blur'

Emitted saat jendela kehilangan fokus.



#### Acara: 'fokus'

Emitted saat window gain fokus.



#### Acara: 'show'

Emitted saat jendela ditunjukkan.



#### Acara: 'sembunyikan'

Emitted saat jendela tersembunyi.



#### Acara: 'siap tampil'

Emitted ketika halaman web telah diberikan (sementara tidak ditampilkan) dan jendela dapat ditampilkan tanpa lampu kilat visual.

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false.  This event will never fire if you use `paintWhenInitiallyHidden: false`



#### Acara: 'maksimalkan'

Emitted saat jendela dimaksimalkan.



#### Acara : 'nonmaximize'

Emitted saat jendela keluar dari keadaan maksimal.



#### Acara : 'minimalkan'

Emitted saat jendela diminimalkan.



#### Acara : 'pulihkan'

Emitted saat jendela dipulihkan dari keadaan diminimalkan.



#### Event: 'will-resize' _macOS_ _Windows_

Pengembalian:

* `event` Acara
* `newBounds` [Rectangle](structures/rectangle.md) - Size the window is being resized to.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.



#### Acara : 'ubah ukuran'

Emitted after the window has been resized.



#### Event: 'will-move' _macOS_ _Windows_

Pengembalian:

* `acara` Acara
* `newBounds` [Rectangle](structures/rectangle.md) - Location the window is being moved to.

Emitted before the window is moved. On Windows, calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.



#### Acara : 'pindah'

Emitted saat jendela sedang dipindahkan ke posisi baru.

__Note__: On macOS this event is an alias of `moved`.



#### Acara : 'pindah' _ macOS </ 0></h4> 

Emitted sekali saat jendela dipindahkan ke posisi baru.



#### Acara : 'enter-full-screen'

Emitted saat jendela memasuki keadaan layar penuh.



#### Acara : 'tinggalkan layar penuh'

Emitted saat jendela meninggalkan keadaan layar-penuh.



#### Acara : 'enter-html-full-screen'

Emitted saat jendela memasuki status layar-penuh yang dipicu oleh HTML API.



#### Acara : 'leave-html-full-screen'

Emitted saat jendela meninggalkan status layar-penuh yang dipicu oleh HTML API.



#### Event: 'always-on-top-changed'

Pengembalian:

* `acara` Acara
* `isAlwaysOnTop` Boolean

Emitted when the window is set or unset to show always on top of other windows.



#### Event: 'app-command' _Windows_ _Linux_

Pengembalian:

* `acara` Acara
* ` perintah </ 0>  String</li>
</ul>

<p spaces-before="0">Emitted when an <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx">App Command</a>
is invoked. Ini biasanya terkait dengan kunci media keyboard atau perintah browser, serta tombol "Kembali" yang terpasang pada beberapa mouse pada Windows .</p>

<p spaces-before="0">Perintah diturunkan, underscore diganti dengan tanda hubung, dan
 awalan <code> APPCOMMAND_ </ 0> dilucuti.
misal <code> APPCOMMAND_BROWSER_BACKWARD </ 0> dipancarkan sebagai <code> browser-backward </ 0> .</p>

<pre><code class="javascript">const { BrowserWindow } = require ('electron') let win = new BrowserWindow () win.on ('app-command', (e, cmd) = & gt; {
   // Arahkan jendela kembali saat pengguna menyentuh mouse mereka kembali tombol
   jika (cmd === 'browser mundur' & amp; & amp; win.webContents.canGoBack ()) {
     win.webContents.goBack ()
   }})
`</pre> 
  The following app commands are explicitly supported on Linux:
  
  * `browser-backward`
* `browser-forward`


#### Acara : 'gulir-sentuh-mulai' _ macOS </ 0></h4> 

Emitted saat scroll wheel event phase sudah dimulai.



#### Acara : 'gulir-sentuh-akhir' _ macOS </ 0></h4> 

Emitted saat scroll wheel event phase sudah berakhir.



#### Acara : 'gulir-sentuh-tepi' _ macos </ 0></h4> 

Emitted saat menggulirkan event wheel drive yang diajukan saat mencapai tepi elemen.



#### Acara : 'gesek' _ macOS </ 0></h4> 

Pengembalian:

* `acara` Acara
* ` arah </ 0>  String</li>
</ul>

<p spaces-before="0">Emitted on 3-finger swipe. Possible directions are <code>up`, `right`, `down`, `left`.</p> 
  The method underlying this event is built to handle older macOS-style trackpad swiping, where the content on the screen doesn't move with the swipe. Most macOS trackpads are not configured to allow this kind of swiping anymore, so in order for it to emit properly the 'Swipe between pages' preference in `System Preferences > Trackpad > More Gestures` must be set to 'Swipe with two or three fingers'.
  
  

#### Event: 'rotate-gesture' _macOS_

Pengembalian:

* `acara` Acara
* `rotation` Float
Emitted on trackpad rotation gesture. Continually emitted until rotation gesture is ended. The `rotation` value on each emission is the angle in degrees rotated since the last emission. The last emitted event upon a rotation gesture will always be of value `0`. Counter-clockwise rotation values are positive, while clockwise ones are negative.



#### Acara: 'sheet-begin' _ macOS _

Emitted saat jendela membuka selembar kertas.



#### Acara : 'sheet-end' _ macOS </ 0></h4> 

Emitted ketika jendela telah ditutup lembar.



#### Event: 'new-window-for-tab' _macOS_

Emitted ketika tombol tab asli baru diklik.



### Metode Statis

Kelas ` BrowserWindow ` memiliki metode statis berikut:



#### `BrowserWindow.getAllWindows ()`

Kembali ` BrowserWindow [] ` - Sebuah array dari semua jendela browser yang terbuka.



#### `BrowserWindow.getFocusedWindow ()`

Returns `BrowserWindow | null` - The window that is focused in this application, otherwise returns `null`.



#### `BrowserWindow.fromWebContents (webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserWindow | null` - The window that owns the given `webContents` or `null` if the contents are not owned by a window.



#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.



#### `BrowserWindow.fromId (id)`

* `identitas` Integer

Kembali ` BrowserWindow ` - Jendela dengan ` id ` yang diberikan.



#### `BrowserWindow.addExtension (jalur)`

* ` path </ 0>  String</li>
</ul>

<p spaces-before="0">Menambahkan ekstensi Chrome yang terletak di <code> path `, dan mengembalikan nama ekstensi.</p> 
  Metode ini juga tidak akan kembali jika manifes ekstensi hilang atau tidak lengkap.
  
  ** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app ` dipancarkan.
  
  

#### `BrowserWindow.removeExtension(name)`

* ` nama </ 0>  String</li>
</ul>

<p spaces-before="0">Hapus ekstensi Chrome dengan nama.</p>

<p spaces-before="0"><strong x-id="1"> Catatan: </strong> API ini tidak dapat dipanggil sebelum event <code> ready ` dari modul ` app ` dipancarkan.</p> 

#### `BrowserWindow.getExtensions ()`

Returns `Record<String, ExtensionInfo>` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app ` dipancarkan.



#### `BrowserWindow.addDevToolsExtension (jalur)`

* ` path </ 0>  String</li>
</ul>

<p spaces-before="0">Menambahkan ekstensi DevTools yang terletak di <code> path`, dan mengembalikan nama ekstensi.</p> 
  Ekstensi akan diingat sehingga Anda hanya perlu memanggil API ini sekali, API ini bukan untuk penggunaan pemrograman. Jika Anda mencoba menambahkan ekstensi yang telah dimuat, metode ini tidak akan kembali dan sebaliknya log peringatan ke konsol.
  
  Metode ini juga tidak akan kembali jika manifes ekstensi hilang atau tidak lengkap.
  
  ** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app ` dipancarkan.
  
  

#### `BrowserWindow.removeDevToolsExtension (nama)`

* ` nama </ 0>  String</li>
</ul>

<p spaces-before="0">Hapus ekstensi DevTools dengan nama.</p>

<p spaces-before="0"><strong x-id="1"> Catatan: </strong> API ini tidak dapat dipanggil sebelum event <code> ready ` dari modul ` app ` dipancarkan.</p> 

#### `BrowserWindow.getDevToolsExtensions ()`

Returns `Record<string, ExtensionInfo>` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

Untuk memeriksa apakah ada ekstensi DevTools, Anda dapat menjalankan yang berikut ini:



```javascript
biarkan diinstal = { BrowserWindow }getDevToolsExtensions () hasOwnProperty ('devtron')
console.log (terpasang)
```


** Catatan: ** API ini tidak dapat dipanggil sebelum event ` ready ` dari modul ` app ` dipancarkan.



### Contoh properti

Objek yang dibuat dengan`BrowserWindow baru ` memiliki properti berikut:



```javascript
const { BrowserWindow } = membutuhkan ('elektron')
// Dalam contoh ini `win` adalah contoh kami
let win = new BrowserWindow ({ width: 800, height: 600 })
win.loadURL ('https://github.com')
```




#### `win.webContents` _Readonly_

A `WebContents` object this window owns. All web page related events and operations will be done via it.

Lihat dokumentasi[ `webContents` ](web-contents.md)untuk metodenya dan acara.



#### `win.id` _Readonly_

A `Integer` property representing the unique ID of the window.



#### `win.autoHideMenuBar`

A `Boolean` property that determines whether the window menu bar should hide itself automatically. Once set, the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, setting this property to `true` won't hide it immediately.



#### `win.minimizable`

A `Boolean` property that determines whether the window can be manually minimized by user.

On Linux the setter is a no-op, although the getter returns `true`.



#### `win.maximizable`

A `Boolean` property that determines whether the window can be manually maximized by user.

On Linux the setter is a no-op, although the getter returns `true`.



#### `win.fullScreenable`

A `Boolean` property that determines whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.



#### `win.resizable`

A `Boolean` property that determines whether the window can be manually resized by user.



#### `win.closable`

A `Boolean` property that determines whether the window can be manually closed by user.

On Linux the setter is a no-op, although the getter returns `true`.



#### `win.movable`

A `Boolean` property that determines Whether the window can be moved by user.

On Linux the setter is a no-op, although the getter returns `true`.



#### `win.excludedFromShownWindowsMenu` _macOS_

A `Boolean` property that determines whether the window is excluded from the application’s Windows menu. `false` by default.



```js
const win = new BrowserWindow({ height: 600, width: 600 })

const template = [
  {
    role: 'windowmenu'
  }
]

win.excludedFromShownWindowsMenu = true

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```




#### `win.accessibleTitle`

A `String` property that defines an alternative title provided only to accessibility tools such as screen readers. This string is not directly visible to users.



### Metode Instance

Objek yang dibuat dengan ` BrowserWindow baru </ 0> memiliki metode contoh berikut:</p>

<p spaces-before="0"><strong x-id="1">Catatan:</strong> Beberapa metode hanya tersedia pada sistem operasi tertentu dan diberi label seperti itu.</p>

<h4 spaces-before="0"><code>win.destroy()`</h4> 

Angkatan menutup jendela, ` membongkar </ 0> dan <code> beforeunload </ 0>  event tidak akan dipancarkan untuk halaman web, dan <code> dekat </ 0>  acara juga tidak akan dipancarkan untuk jendela ini, tetapi menjamin <code> ditutup </ 0>  acara akan dipancarkan.</p>

<h4 spaces-before="0"><code>win.close()`</h4> 

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).



#### `win.focus()`

Berfokus pada jendela.



#### `win.blur()`

Berfokus pada jendela.



#### `win.isFocused ()`

Mengembalikan ` Boolean </ 0> - Apakah jendela terfokus.</p>

<h4 spaces-before="0"><code>win.isDestroyed ()`</h4> 

Mengembalikan ` Boolean </ 0> - Apakah jendela rusak</p>

<h4 spaces-before="0"><code>win.show ()`</h4> 

Menunjukkan dan memberi fokus pada jendela.



#### `win.showInactive ()`

Menunjukkan jendela tapi tidak memusatkan perhatian padanya.



#### `win.hide ()`

Sembunyikan jendela.



#### `win.isVisible ()`

Mengembalikan ` Boolean </ 0> - Apakah jendela terlihat oleh pengguna.</p>

<h4 spaces-before="0"><code>win.isModal ()`</h4> 

Mengembalikan ` Boolean </ 0> - Apakah jendela saat ini adalah jendela modal.</p>

<h4 spaces-before="0"><code>win.maximize ()`</h4> 

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.



#### `win.unmaximize ()`

Unmaximizes jendela.



#### `win.isMaximized ()`

Mengembalikan ` Boolean </ 0> - Apakah jendela dimaksimalkan.</p>

<h4 spaces-before="0"><code>win.minimize ()`</h4> 

Minimizes the window. On some platforms the minimized window will be shown in the Dock.



#### `win.restore ()`

Mengembalikan jendela dari keadaan diminimalkan ke keadaan sebelumnya.



#### `win.isMinimized ()`

Mengembalikan ` Boolean </ 0> - Apakah jendela diminimalkan.</p>

<h4 spaces-before="0"><code>win.setFullScreen (bendera)`</h4> 

* `bendera` Boolean

Menetapkan apakah jendela harus dalam mode fullscreen.



#### `win.isFullScreen ()`

Mengembalikan ` Boolean </ 0> - Apakah jendela dalam mode layar penuh.</p>

<h4 spaces-before="0"><code>win.setSimpleFullScreen(flag)` Linux _macOS_</h4> 

* `bendera` Boolean

Enters or leaves simple fullscreen mode.

Simple fullscreen mode emulates the native fullscreen behavior found in versions of Mac OS X prior to Lion (10.7).



#### ` win.isSimpleFullScreen () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Returns <code>Boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.</p> 



#### `win.isNormal()`

Returns `Boolean` - Whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).



#### ` win.setAspectRatio (aspectRatio [, extraSize]) </ 0>  <em x-id="4"> macos </ 1></h4>

<ul>
<li><p spaces-before="0"><code> aspectRatio </ 0> Float - Rasio aspek untuk mempertahankan sebagian dari tampilan konten.</p></li>
<li><p spaces-before="0"><code>extraSize` [Size](structures/size.md) (optional) - The extra size not to be included while maintaining the aspect ratio.</p></li> </ul> 

Ini akan membuat jendela menjaga rasio aspek. Ukuran ekstra memungkinkan pengembang memiliki ruang, ditentukan dalam piksel, tidak termasuk dalam perhitungan rasio aspek. API ini sudah memperhitungkan perbedaan antara ukuran jendela dan ukuran isinya.

Pertimbangkan jendela normal dengan pemutar video HD dan kontrol yang terkait. Mungkin ada 15 piksel kontrol di tepi kiri, 25 piksel kontrol di tepi kanan dan 50 piksel kontrol di bawah pemutar. Untuk mempertahankan rasio aspek 16: 9 (rasio aspek standar untuk HD @ 1920x1080) di dalam pemutar itu sendiri, kami akan memanggil fungsi ini dengan argumen 16/9 dan [40, 50]. Argumen kedua tidak peduli di mana lebar dan tinggi ekstra berada dalam tampilan konten--hanya isinya. Sum any extra width and height areas you have within the overall content view.

Calling this function with a value of `0` will remove any previously set aspect ratios.



#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported if `transparent` is `true`). Default is `#FFF` (white).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).



#### ` win.previewFile (path [, displayName]) </ 0>  <em x-id="4"> macos </ 1></h4>

<ul>
<li><p spaces-before="0"><code> path </ 0>  String - Path absolut ke file untuk dipratinjau dengan QuickLook. Hal ini penting karena Quick Look menggunakan nama file dan ekstensi file pada path untuk menentukan jenis konten file yang akan dibuka.</p></li>
<li><p spaces-before="0"><code> displayName </ 0>  String (opsional) - Nama file yang akan ditampilkan pada tampilan modal Quick Look. Ini murni visual dan tidak mempengaruhi jenis konten file. Default ke <code> path </ 0> .</p></li>
</ul>

<p spaces-before="0">Menggunakan <a href="https://en.wikipedia.org/wiki/Quick_Look"> Quick Look </ 0> untuk melihat pratinjau file di jalur tertentu.</p>

<h4 spaces-before="0"><code> win.closeFilePreview () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Menutup panel <a href="https://en.wikipedia.org/wiki/Quick_Look"> Quick Look </ 0> yang sedang terbuka .</p>

<h4 spaces-before="0"><code>win.setBounds (batas [, bernyawa])`

* `bounds` Partial<[Rectangle](structures/rectangle.md)>
* `animate` Boolean (optional) _macOS_

Mengubah ukuran dan memindahkan jendela ke batas yang tersedia. Any properties that are not supplied will default to their current values.



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

Returns [`Rectangle`](structures/rectangle.md) - The `bounds` of the window as `Object`.



#### `win.setContentBounds (batas [, bernyawa])`

* `batas` [Empat persegi panjang](structures/rectangle.md)
* `animate` Boolean (optional) _macOS_

Mengubah ukuran dan memindahkan area klien jendela (misalnya halaman web) ke batas yang tersedia.



#### `win.getContentBounds ()`

Returns [`Rectangle`](structures/rectangle.md) - The `bounds` of the window's client area as `Object`.



#### `win.getNormalBounds()`

Returns [`Rectangle`](structures/rectangle.md) - Contains the window bounds of the normal state

**Note:** whatever the current state of the window : maximized, minimized or in fullscreen, this function always returns the position and size of the window in normal state. In normal state, getBounds and getNormalBounds returns the same [`Rectangle`](structures/rectangle.md).



#### `win.setEnabled(enable)`

* `enable` Boolean

Disable or enable the window.



#### `win.isEnabled()`

Returns Boolean - whether the window is enabled.



#### `win.setSize (lebar, tinggi [, bernyawa])`

* ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
<li><code>animate` Boolean (optional) _macOS_

Mengubah ukuran jendela menjadi ` width </ 0> dan <code> height </ 0> . If <code>width` or `height` are below any set minimum size constraints the window will snap to its minimum size.



#### `win.getSize ()`

Mengembalikan ` Integer [] </ 0> - Berisi lebar dan tinggi jendela.</p>

<h4 spaces-before="0"><code>win.setContentSize(width, height[, animate])`</h4> 

* ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
<li><code>animate` Boolean (optional) _macOS_

Mengubah ukuran jendela area klien (misalnya halaman web) untuk `lebar` dan `tinggi`.



#### `win.getContentSize ()`

Mengembalikan ` Integer [] </ 0> - Berisi lebar dan tinggi area jendela klien.</p>

<h4 spaces-before="0"><code>win.setMinimumSize (lebar, tinggi)`</h4> 

* ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
</ul>

<p spaces-before="0">Menetapkan ukuran minimum jendela menjadi <code> width </ 0> dan <code> height </ 0> .</p>

<h4 spaces-before="0"><code>win.getMinimumSize ()`</h4> 
  Mengembalikan`Integer [] ` - Berisi lebar minimum dan tinggi jendela.
  
  

#### `win.setMaximumSize (lebar, tinggi)`

* ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
</ul>

<p spaces-before="0">Menetapkan ukuran maksimum jendela menjadi <code>lebar ` dan`tinggi `.</p> 

#### `win.getMaximumSize ()`

Mengembalikan ` Integer [] </ 0> - Berisi lebar dan tinggi maksimum jendela.</p>

<h4 spaces-before="0"><code>win.setResizable (resizable)`</h4> 

* ` resizable </ 0>  Boolean</li>
</ul>

<p spaces-before="0">Menetapkan apakah jendela dapat diubah ukurannya secara manual oleh pengguna.</p>

<p spaces-before="0"><strong x-id="1"><a href="modernization/property-updates.md">Tidak berlaku lagi</a></strong></p>

<h4 spaces-before="0"><code>win.isResizable ()`</h4> 
  Mengembalikan ` Boolean </ 0> - Apakah jendela dapat diubah ukurannya secara manual oleh pengguna.</p>

<p spaces-before="0"><strong x-id="1"><a href="modernization/property-updates.md">Tidak berlaku lagi</a></strong></p>

<h4 spaces-before="0"><code> win.setMovable (dapat dipindahkan) </ 0>  <em x-id="4"> macOS </ 1>  <em x-id="4"> Windows </ 1></h4>

<ul>
<li><code> bergerak </ 0>  Boolean</li>
</ul>

<p spaces-before="0">Sets whether the window can be moved by user. On Linux does nothing.</p>

<p spaces-before="0"><strong x-id="1"><a href="modernization/property-updates.md">Tidak berlaku lagi</a></strong></p>

<h4 spaces-before="0"><code>win.isMovable()` _macOS_ _Windows_</h4> 
  
  Mengembalikan ` Boolean </ 0> - Apakah jendela dapat dipindahkan oleh pengguna.</p>

<p spaces-before="0">Di Linux selalu kembali <code> true </ 0> .</p>

<p spaces-before="0"><strong x-id="1"><a href="modernization/property-updates.md">Tidak berlaku lagi</a></strong></p>

<h4 spaces-before="0"><code> win.setMinimizable (minimizable) </ 0>  <em x-id="4"> macOS </ 1>  <em x-id="4"> Windows </ 1></h4>

<ul>
<li><code> diminimalkan </ 0>  Boolean</li>
</ul>

<p spaces-before="0">Sets whether the window can be manually minimized by user. On Linux does
nothing.</p>

<p spaces-before="0"><strong x-id="1"><a href="modernization/property-updates.md">Tidak berlaku lagi</a></strong></p>

<h4 spaces-before="0"><code> win.isMinimizable () </ 0>  <em x-id="4"> macos </ 1>  <em x-id="4"> Windows </ 1></h4>

<p spaces-before="0">Mengembalikan <code> Boolean </ 0> - Apakah jendela dapat diminimalkan secara manual oleh pengguna</p>

<p spaces-before="0">Di Linux selalu kembali <code> true </ 0> .</p>

<p spaces-before="0"><strong x-id="1"><a href="modernization/property-updates.md">Tidak berlaku lagi</a></strong></p>

<h4 spaces-before="0"><code>win.setMaximizable(maximizable)` _macOS_ _Windows_</h4> 
  
  * `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

**[Tidak berlaku lagi](modernization/property-updates.md)**



#### `win.isMaximizable()` _macOS_ _Windows_

Kembali `Boolean` - Apakah jendela dapat dimaksimalkan secara manual oleh pengguna.

Di Linux selalu kembali ` true </ 0> .</p>

<p spaces-before="0"><strong x-id="1"><a href="modernization/property-updates.md">Tidak berlaku lagi</a></strong></p>

<h4 spaces-before="0"><code>win.setFullScreenable (fullscreenable)`</h4> 

* ` fullscreenable </ 0>  Boolean</li>
</ul>

<p spaces-before="0">Menetapkan apakah tombol perbesar/zoom window toggles fullscreen mode atau memaksimalkan jendela.</p>

<p spaces-before="0"><strong x-id="1"><a href="modernization/property-updates.md">Tidak berlaku lagi</a></strong></p>

<h4 spaces-before="0"><code>win.isFullScreenable ()`</h4> 
  Kembali `Boolean` - Apakah tombol jendela memaksimalkan/zoom Matikan modus fullscreen atau memaksimalkan jendela.
  
  **[Tidak berlaku lagi](modernization/property-updates.md)**
  
  

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean
Sets whether the window can be manually closed by user. On Linux does nothing.

**[Tidak berlaku lagi](modernization/property-updates.md)**



#### `win.isClosable()` _macOS_ _Windows_

Kembali `Boolean` - Apakah jendela bisa ditutup secara manual oleh pengguna.

Di Linux selalu kembali ` true </ 0> .</p>

<p spaces-before="0"><strong x-id="1"><a href="modernization/property-updates.md">Tidak berlaku lagi</a></strong></p>

<h4 spaces-before="0"><code>win.setAlwaysOnTop (bendera [, tingkat] [, relativeLevel])`</h4> 

* `bendera` Boolean
* `level` String (optional) _macOS_ _Windows_ - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating` when `flag` is true. The `level` is reset to `normal` when the flag is false. Note that from `floating` to `status` included, the window is placed below the Dock on macOS and below the taskbar on Windows. From `pop-up-menu` to a higher it is shown above the Dock on macOS and above the taskbar on Windows. See the [macOS docs](https://developer.apple.com/documentation/appkit/nswindow/level) for more details.

* `relativeLevel` Bulat (opsional) _macOS_ - jumlah lapisan yang lebih tinggi untuk mengatur jendela ini relatif terhadap `tingkat`. Default adalah `0`. Perhatikan bahwa Apple menghambat pengaturan tingkat lebih tinggi dari 1 di atas `layar-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.



#### `win.isAlwaysOnTop()`

Kembali `Boolean` - Apakah jendela selalu di atas jendela lainnya.



#### `win.moveAbove(mediaSourceId)`

* `mediaSourceId` String - Window id in the format of DesktopCapturerSource's id. For example "window:1869:0".

Moves window above the source window in the sense of z-order. If the `mediaSourceId` is not of type window or if the window does not exist then this method throws an error.



#### `win.moveTop()`

Moves window to top(z-order) regardless of focus



#### `win.center()`

Memindahkan jendela ke bagian tengah layar.



#### `win.setPosition (x, y [, bernyawa])`

* `x` Integer
* `y` Integer
* `animate` Boolean (optional) _macOS_

Bergerak jendela `x` dan `y`.



#### `win.getPosition()`

Mengembalikan `Integer []` - berisi jendela posisi saat ini.



#### `win.setTitle(title)`

* ` judul </ 0> String</li>
</ul>

<p spaces-before="0">Perubahan judul jendela asli <code>judul`.</p> 

#### `win.getTitle()`

Mengembalikan `String` - judul jendela asli.

**Note:** The title of the web page can be different from the title of the native window.



#### `win.setSheetOffset (offsetY [, offsetX])` _macOS_

* `offsetY` Mengambang
* `offsetX` Mengambang (opsional)
Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. Sebagai contoh:



```javascript
const { BrowserWindow } = membutuhkan ('elektron')
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



#### `win.getMediaSourceId()`

Returns `String` - Window id in the format of DesktopCapturerSource's id. For example "window:1234:0".

More precisely the format is `window:id:other_id` where `id` is `HWND` on Windows, `CGWindowID` (`uint64_t`) on macOS and `Window` (`unsigned long`) on Linux. `other_id` is used to identify web contents (tabs) so within the same top level window.



#### `win.getNativeWindowHandle()`

Kembali `Buffer` - spesifik platform handle dari window.

Jenis pegangan yang asli adalah `HWND` pada Windows, `NSView *` pada `jendela` (`lama unsigned`) di Linux dan macOS.



#### `win.hookWindowMessage (pesan, callback)` _Windows_

* ` pesan </ 0> Integer</li>
<li><code>callback ` Fungsi
Hooks a windows message. The `callback` is called when the message is received in the WndProc.



#### ` win.isWindowMessageHooked (pesan) </ 0>  <em x-id="4"> Windows </ 1></h4>

<ul>
<li><code> pesan </ 0> Integer</li>
</ul>

<p spaces-before="0">Mengembalikan <code>Boolean` - `true` atau `false` tergantung pada apakah pesan itu ketagihan.</p> 



#### ` win.unhookWindowMessage (pesan) </ 0>  <em x-id="4"> Windows </ 1></h4>

<ul>
<li><code> pesan </ 0> Integer</li>
</ul>

<p spaces-before="0">Hapus kembali pesan jendela</p>

<h4 spaces-before="0"><code> win.unhookAllWindowMessages () </ 0>  <em x-id="4"> Windows </ 1></h4>

<p spaces-before="0">Lepaskan semua pesan di jendela.</p>

<h4 spaces-before="0"><code>win.setRepresentedFilename (filename)` _macos_

* `filename` String

Menetapkan nama path dari file yang diwakili jendela, dan ikon file akan muncul di bilah judul jendela.



#### `win.getRepresentedFilename()` _macos_

Mengembalikan ` String ` - Pathname dari file yang diwakili jendela.



#### `win.setDocumentEdited(diedit)` _macos_

* ` diedit </ 0> Boolean</li>
</ul>

<p spaces-before="0">Specifies whether the window’s document has been edited, and the icon in title
bar will become gray when set to <code>true`.</p> 

#### `win.isDocumentEdited()` _macos_

Mengembalikan `Boolean` - Apakah dokumen jendela telah diedit.



#### `win.focusOnWebView ()`



#### `win.blurWebView ()`



#### `win.capturePage([rect])`

* ` rect </ 0>  <a href="structures/rectangle.md"> Rectangle </ 1> (opsional) - Batas untuk ditangkap</li>
</ul>

<p spaces-before="0">Returns <code>Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)</p> 
  Menangkap sebuah snapshot dari halaman dalam `rect`. Omitting `rect` will capture the whole visible page.
  
  

#### `win.loadURL (url [, options])`

* `url` String
* `options` Object (optional) 
    * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer URL.
  * `userAgent` String (opsional) - agen pengguna berasal permintaan.
  * `extraHeaders` String (opsional) - header tambahan yang dipisahkan oleh "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (optional) - Base URL (with trailing path separator) for files to be loaded by the data URL. This is needed only if the specified `url` is a data URL and needs to load other files.
Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

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



#### `win.loadFile(filePath[, options])`

* `fullPath` String
* `options` Object (optional) 
    * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application.  See the `webContents` docs for more information.



#### `win.reload ()`

Sama seperti ` webContents.reload </ 0> .</p>

<h4 spaces-before="0"><code>win.setMenu(menu)` _Linux_ _Windows_</h4> 

* `menu` Menu | batal

Sets the `menu` as the window's menu bar.



#### `win.removeMenu()` _Linux_ _Windows_

Remove the window's menu bar.



#### `win.setProgressBar (kemajuan [, pilihan])`

* ` kemajuan ` Double
* `options` Object (optional) 
    * `mode` String _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Hapus bilah kemajuan saat kemajuan <0; Ubah ke mode tak tentu saat mencapai kemajuan> 1.

Pada platform Linux, hanya mendukung lingkungan desktop Unity, Anda perlu menentukan nama file ` *.desktop ` ke ` desktopName ` di ` package.json `. By default, it will assume `{app.name}.desktop`.

Pada Windows , mode bisa dilewati. Nilai yang diterima adalah `none`, `normal`, `tak tentu`, `kesalahan`, dan `dijeda`. Jika Anda memanggil `setProgressBar` tanpa a mode set (tapi dengan nilai dalam kisaran yang valid), `normal` akan diasumsikan.



#### `win.setOverlayIcon (overlay, deskripsi)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared

* `deskripsi` String - deskripsi yang akan diberikan pada Aksesibilitas pembaca layar

Mengatur 16 x 16 piksel overlay ke ikon taskbar saat ini, biasanya digunakan untuk sampaikan semacam status aplikasi atau secara pasif memberitahukan pengguna.



#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Sets whether the window should have a shadow.



#### `win.hasShadow()`

Mengembalikan `Boolean` - Apakah jendela memiliki bayangan.



#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux, does nothing. Out of bound number values are clamped to the [0, 1] range.



#### `win.getOpacity()`

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque). On Linux, always returns 1.



#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.



#### `win.setThumbarButtons (tombol)` _Windows_

* `tombol` [ThumbarButton[]](structures/thumbar-button.md)

Mengembalikan `Boolean` - Apakah tombol berhasil ditambahkan

Tambahkan toolbar thumbnail dengan serangkaian tombol yang ditentukan ke gambar thumbnail sebuah jendela di tata letak tombol taskbar. Mengembalikan objek `Boolean` apakah thumbnail telah berhasil ditambahkan.

Jumlah tombol di toolbar thumbnail seharusnya tidak lebih besar dari 7 karena terbatasnya ruang. Setelah Anda menyiapkan toolbar thumbnail, toolbar tidak dapat dihapus karena keterbatasan platform. Tapi Anda bisa memanggil API dengan array kosong untuk membersihkan tombol.

`Tombol` adalah array dari objek `Button`:

* `Button` Object 
    * `ikon` [NativeImage](native-image.md) - Ikon ditampilkan di thumbnail toolbar.
  * ` klik </ 0> Fungsi</li>
<li><code> tooltip </ 0>  String (opsional) - Teks tooltip tombol.</li>
<li><code>flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

The ` bendera </ 0> adalah array yang yang dapat mencakup berikut <code> String </ 0> s:</p>

<ul>
<li><code> diaktifkan </ 0> - Tombol aktif dan tersedia untuk pengguna.</li>
<li><p spaces-before="0"><code>disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.</li> 

* ` dismissonclick </ 0> - Saat tombol diklik, jendela thumbnail segera ditutup.</p></li>
<li><p spaces-before="0"><code> nobackground </ 0> - Jangan menggambar batas tombol, gunakan hanya gambarnya.</p></li>
<li><code> hidden </ 0> - Tombol tidak ditunjukkan ke pengguna.</li>
<li><code>noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.</li> </ul> 
  
  

#### `win.setThumbnailClip (wilayah)` _Windows_

* `wilayah` [Rectangle](structures/rectangle.md) - Wilayah jendela

Mengatur area jendela untuk ditampilkan saat gambar thumbnail ditampilkan saat melayang di atas jendela di taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.



#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

Menetapkan toolTip yang ditampilkan saat melayang di atas thumbnail jendela di taskbar.



#### `win.setAppDetails(options)` _Windows_

* `options` Object 
    * `appId` String (opsional) - jendela [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). Itu harus diatur, jika tidak pilihan lain tidak akan berpengaruh.
  * `appId` String (opsional) - jendela [App User Model Id](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `appId` String (opsional) - jendela [App User Model Id](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `appId` String (opsional) - jendela [App User Model Id](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Mengatur properti untuk tombol taskbar jendela.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.



#### `win.showDefinitionForSelection()` _macOS_

Sama seperti `webContents.showDefinitionForSelection()`.



#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md) | String

Ubah ikon jendela.



#### `win.setWindowButtonVisibility(visible)` Linux _macOS_

* `terlihat` Boolean

Sets whether the window traffic light buttons should be visible.

This cannot be called when `titleBarStyle` is set to `customButtonsOnHover`.



#### `win.setAutoHideMenuBar(hide)`

* `Sembunyikan` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

Jika bilah menu sudah terlihat, memanggil `setAutoHideMenuBar(true)` tidak menyembunyikan itu segera.

**[Tidak berlaku lagi](modernization/property-updates.md)**



#### `win.isMenuBarAutoHide()`

Kembali `Boolean` - Apakah bilah menu secara otomatis menyembunyikan dirinya sendiri.

**[Tidak berlaku lagi](modernization/property-updates.md)**



#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `terlihat` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.



#### `win.isMenuBarVisible()`

Kembali `Boolean` - Apakah menu bar terlihat.



#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `terlihat` Boolean
* `options` Object (optional) 
    * `visibleOnFullScreen` Boolean (optional) _macOS_ - Sets whether the window should be visible above fullscreen windows _deprecated_

Menetapkan apakah jendela harus terlihat pada semua ruang kerja.

**Catatan:** API ini tidak apa-apa pada Windows.



#### `win.isVisibleOnAllWorkspaces()`

Kembali `Boolean` - Apakah jendela terlihat pada semua workspace.

**Catatan:** API ini selalu kembali palsu pada Windows.



#### `win.setIgnoreMouseEvents(ignore[, options])`

* `mengabaikan` Boolean
* `options` Object (optional) 
    * `forward` Boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Membuat jendela mengabaikan semua kejadian mouse.

Semua kejadian mouse yang terjadi di jendela ini akan diteruskan ke jendela di bawah jendela ini, namun jika jendela ini fokus, masih akan ada acara keyboard.



#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

Mencegah isi jendela ditangkap oleh aplikasi lain.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.



#### `win.setFocusable(focusable)` _macOS_ _Windows_

* `focusable` Boolean

Perubahan apakah jendela bisa difokuskan.

On macOS it does not remove the focus from the window.



#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

Set `orangtua` sebagai jendela aktif jendela induk, melewati `null` akan mengubah jendela ke jendela di tingkat atas.



#### `win.getParentWindow()`

Kembali `[BrowserWindow]` - semua jendela anak.



#### `win.getChildWindows()`

Kembali `[BrowserWindow]` - semua jendela anak.



#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` Boolean

Mengontrol apakah akan menyembunyikan kursor saat mengetik.



#### ` win.selectPreviousTab () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Selects the previous tab when native tabs are enabled and there are other
tabs in the window.</p>

<h4 spaces-before="0"><code> win.selectNextTab () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Selects the next tab when native tabs are enabled and there are other
tabs in the window.</p>

<h4 spaces-before="0"><code> win.mergeAllWindows () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Merges all windows into one window with multiple tabs when native tabs
are enabled and there is more than one open window.</p>

<h4 spaces-before="0"><code> win.moveTabToNewWindow () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Moves the current tab into a new window if native tabs are enabled and
there is more than one tab in the current window.</p>

<h4 spaces-before="0"><code> win.toggleTabBar () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Toggles the visibility of the tab bar if native tabs are enabled and
there is only one tab in the current window.</p>

<h4 spaces-before="0"><code>win.addTabbedWindow(browserWindow)` Linux _macOS_

* `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.



#### `win.setVibrancy(type)` _macOS_

* `type` String | null - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. Lihat [dokumentasi macOS](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) untuk rincian lebih lanjut.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

Note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.



#### `win.setTrafficLightPosition(position)` Linux _macOS_

* `position` [Point](structures/point.md)

Set a custom position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`.



#### ` win.getTrafficLightPosition () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Returns <code>Point` - The current position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`.</p> 



#### `win.setTouchBar(touchBar)` _macOS_ _Linux_

* `touchBar` TouchBar | null

Mengatur tata letak touchBar untuk jendela aktif. Menentukan `null` atau `undefined` membersihkan bar sentuhan. Metode ini hanya memiliki efek jika mesin memiliki panel sentuh dan berjalan di macos 10.12.1+.

**Catatan:** TouchBar API saat ini masih bersifat eksperimental dan mungkin akan berubah atau dihapus saat rilis elektron di masa depan.



#### `win.setBrowserView (browserView)` _Eksperimental_

* `browserView` [BrowserView](browser-view.md) | null - Attach `browserView` to `win`. If there are other `BrowserView`s attached, they will be removed from this window.



#### `win.getBrowserView()` _Experimental_

Returns `BrowserView | null` - The `BrowserView` attached to `win`. Returns `null` if one is not attached. Throws an error if multiple `BrowserView`s are attached.



#### `win.addBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

Replacement API for setBrowserView supporting work with multi browser views.



#### `win.removeBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)



#### `win.getBrowserViews()` _Experimental_

Returns `BrowserView[]` - an array of all BrowserViews that have been attached with `addBrowserView` or `setBrowserView`.

**Catatan:** lihat browser API masih bersifat eksperimental dan mungkin mengubah atau dihapus elektron pada masa depan.
