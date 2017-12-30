# `<webview>`Tag

> Menampilkan konten web eksternal dalam bingkai terisolasi dan proses.

Proses: [Renderer](../tutorial/quick-start.md#renderer-process)

Gunakan `webview` tag untuk menanamkan konten 'tamu' (seperti halaman web) di app elektron. Konten tamu terkandung dalam wadah `webview`. Halaman tertanam dalam aplikasi Anda mengontrol bagaimana konten tamu ditata dan diberikan.

Tidak seperti ` iframe `, tampilan ` webview ` berjalan dalam proses terpisah dari aplikasi Anda. Ini tidak memiliki izin yang sama seperti halaman web Anda dan semua interaksi antara aplikasi dan konten tertanam Anda akan menjadi asinkron. Ini membuat aplikasi Anda tetap aman dari konten yang disematkan. **Catatan:** Sebagian besar metode yang disebut pada webview dari halaman host memerlukan panggilan sinkron ke proses utama.

## Contoh

Untuk menyematkan laman web di aplikasi Anda, tambahkan tag ` webview ` ke halaman embedder aplikasi Anda (ini adalah halaman aplikasi yang akan menampilkan konten tamu). Dalam bentuknya yang paling sederhana, tag `webview` menyertakan `src` dari halaman web dan gaya css yang mengontrol tampilan kontainer ` webview `:

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

Jika Anda ingin mengontrol konten tamu dengan cara apa pun, Anda dapat menulis JavaScript yang mendengarkan acara ` webview ` dan merespons kejadian tersebut dengan menggunakan metode ` webview `. Berikut contoh kode dengan dua pendengar acara: yang mendengarkan halaman web untuk mulai memuat, yang lainnya untuk halaman web berhenti memuat, dan menampilkan pesan "loading..." selama waktu muat:

```html
<script>onload = () = > {const webview = indikator const document.querySelector('webview') = document.querySelector('.indicator') const loadstart = () = > {indicator.innerText = 'memuat...'}      Const loadstop = () = > {indicator.innerText = ''} webview.addEventListener (' lakukan-mulai-loading', loadstart) webview.addEventListener (' lakukan-stop-loading', loadstop)}</script>
```

## Catatan Styling CSS

Harap dicatat bahwa `webview` tag menggunakan `tampilan: flex;` internal untuk memastikan anak `objek` elemen mengisi penuh tinggi dan lebar dari wadah `webview` bila digunakan dengan tradisional dan flexbox layout (sejak v0.36.11). Tolong jangan menimpa properti default ` display: flex; ` CSS, kecuali menentukan tampilan `: inline-flex; ` untuk tata letak inline.

`WebView` memiliki masalah yang menggunakan atribut `tersembunyi` tersembunyi atau menggunakan `menampilkan: none;`. Ini dapat menyebabkan perilaku render yang tidak biasa dalam anaknya `browserplugin` objek dan halaman web reloaded ketika `webview` un tersembunyi. Pendekatan yang direkomendasikan adalah untuk menyembunyikan `webview` menggunakan `visibilitas: tersembunyi`.

```html
<style>webview {menampilkan: inline-flex;     Lebar: 640px;     tinggi: 480px;   } webview.hide {visibility: hidden;   } </style>
```

## Atribut tag

`Webview` tag memiliki atribut berikut:

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

Mengembalikan URL. yang terlihat Menulis ke atribut ini memulai navigasi tingkat atas.

Menetapkan `src` nilainya akan memuat ulang halaman ini.

Atribut `src` juga dapat menerima URL data, seperti data`:teks/polos, Halo, dunia!`.

### `autosize`

```html
<webview src="https://www.github.com/" autosize minwidth="576" minheight="432"></webview>
```

Bila atribut ini hadir, kontainer `webview` akan secara otomatis diubah ukurannya dalam batas yang ditentukan oleh atribut ` minwidth `,`minheight`,`maxwidth`, dan `maxheight`. Kendala ini tidak berdampak pada`webview`kecuali`autosize` diaktifkan. Bila `autosize` diaktifkan, ukuran wadah`webview` tidak boleh kurang dari nilai minimum atau lebih besar dari jumlah maksimum.

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

Ketika atribut ini menampilkan halaman tamu di `webview` akan memiliki integrasi simpul dan dapat menggunakan API simpul seperti` memerlukan ` dan `proses` untuk mengakses sumber daya sistem tingkat rendah. Node integrasi dinonaktifkan secara default pada semua halaman.

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

Bila atribut ini menampilkan halaman tamu di `webview` akan dapat menggunakan plugin browser. Plugin dinonaktifkan secara default.

### `preload`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

Menentukan sebuah skrip yang akan dimuat sebelum menjalankan skrip lainnya di halaman tamu. Protokol script URL harus berupa `berkas:` atau `asar:`, karena itu akan dimuat oleh `memerlukan` di semua halaman di bawah tenda.

Ketika halaman tamu tidak memiliki integrasi node script ini masih akan memiliki akses ke semua Node api, tetapi benda-benda global yang disuntikkan oleh Node akan dihapus setelah script ini selesai mengeksekusi.

**Catatan:** Opsi ini akan muncul sebagai `preloadURL` (bukan `preload`) di `webPreferences` yang ditentukan ke` akan-melampirkan-webview` event.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

Menetapkan URL pengarah untuk semua halaman.

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

Menetapkan agen pengguna untuk halaman tamu sebelum halaman dinavigasi. Setelah halaman dimuat, gunakan metode `setUserAgent` untuk mengubah agen pengguna.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

Ketika atribut ini hadir semua halaman akan memiliki web keamanan dinonaktifkan. Keamanan web diaktifkan secara default.

### `partisi`

```html
<webview src="https://github.com" partition="persist:github"></webview> <webview src="https://electron.atom.io" partition="electron"></webview>
```

Menetapkan sesi yang digunakan oleh halaman. Jika `partisi` diawali dengan `bertahan:`, halaman akan menggunakan sesi terus-menerus tersedia untuk semua halaman di app dengan `partisi` yang sama. jika tidak ada `bertahan:` awalan, halaman akan menggunakan sesi di memori. Dengan menugaskan yang sama `partisi`, beberapa halaman dapat berbagi sesi yang sama. Jika `partisi` disetel maka sesi app default akan digunakan.

Nilai ini hanya dapat diubah sebelum navigasi pertama, sejak sidang proses aktif renderer tidak mengubah. Upaya berikutnya untuk mengubah nilai akan gagal dengan pengecualian DOM.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

Ketika atribut ini hadir semua halaman akan diizinkan untuk membuka jendela baru. Popup dinonaktifkan secara default.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

Daftar string yang menentukan preferensi web diatur pada webview, dipisahkan oleh `,`. Daftar lengkap didukung preferensi string dapat ditemukan di [BrowserWindow](browser-window.md#new-browserwindowoptions).

String mengikuti format yang sama sebagai string fitur dalam `window.open`. Nama itu sendiri diberikan nilai boolean `benar`. Preferensi dapat diatur untuk nilai lain termasuk `=`, diikuti oleh nilai. Nilai-nilai khusus `ya` dan `1` ditafsirkan sebagai `benar`, sementara `tidak ada` dan `` ditafsirkan sebagai `palsu`.

### `blinkfeatures`

```html
<webview src="https://www.github.com/" blinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Daftar string yang menentukan preferensi web diatur pada webview, dipisahkan oleh `,`. Daftar lengkap didukung string fitur dapat ditemukan di [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) file.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Daftar string yang menentukan preferensi web diatur pada webview, dipisahkan oleh `,`. Daftar lengkap didukung string fitur dapat ditemukan di [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) file.

### `guestinstance`

```html
<webview src="https://www.github.com/" guestinstance="3"></webview>
```

Sebuah nilai yang menghubungkan webview ke webContents tertentu. Ketika webview pertama memuat webContents baru dibuat dan atribut ini diatur ke pengenal contoh nya. Pengaturan atribut ini pada webview baru atau yang ada menghubungkan itu ke webContents yang sudah ada yang sedang menuliskan di webview berbeda.

Webview yang tersedia akan melihat `menghancurkan` dan kemudian akan menciptakan webContents baru ketika url yang baru termuat.

### `disableguestresize`

```html
<webview src="https://www.github.com/" disableguestresize></webview>
```

Ketika atribut ini hadir isi `webview` akan dicegah dari Resize ketika elemen `webview` itu sendiri diubah ukurannya.

Ini dapat digunakan dalam kombinasi dengan [`webContents.setSize`](web-contents.md#contentssetsizeoptions) untuk secara manual mengubah ukuran isi webview sebagai reaksi terhadap perubahan ukuran jendela. Ini dapat membuat ukuran lebih cepat dibandingkan dengan mengandalkan webview elemen batas-batas untuk secara otomatis mengubah ukuran isi.

```javascript
const {webContents} = require('electron')

// We assume that `win` points to a `BrowserWindow` instance containing a
// `<webview>` with `disableguestresize`.

win.on('resize', () => {
  const [width, height] = win.getContentSize()
  for (let wc of webContents.getAllWebContents()) {
    // Check if `wc` belongs to a webview in the `win` window.
    if (wc.hostWebContents &&
        wc.hostWebContents.id === win.webContents.id) {
      wc.setSize({
        normal: {
          width: width,
          height: height
        }
      })
    }
  }
})
```

## Metode

The `webview` tag has the following methods:

**Note:** The webview element must be loaded before using the methods.

**Contoh**

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```

### `<webview>.loadURL(url[, options])`

* ` url </ 0> URL</li>
<li><code>pilihan` Objek (pilihan) 
  * `httpReferrer` String (opsional) - url perujuk HTTP.
  * `userAgent` String (opsional) - agen pengguna berasal permintaan.
  * `extraHeaders` String (opsional) - header tambahan yang dipisahkan oleh "\n"
  * `postData` ([[UploadRawData]](structures/upload-raw-data.md) | [[UploadFile]](structures/upload-file.md) | [[UploadFileSystem]](structures/upload-file-system.md) | [[UploadBlob]](structures/upload-blob.md)) -(opsional)
  * `baseURLForDataURL` String (opsional) - url dasar (dengan trailing pemisah path) untuk file yang akan diambil oleh data url. Hal ini diperlukan hanya jika ditentukan `url` data url dan perlu memuat file lainnya.

Loads the `url` in the webview, the `url` must contain the protocol prefix, e.g. the `http://` or `file://`.

### `<webview>.getURL()`

Returns `String` - The URL of guest page.

### `<webview>.getTitle()`

Returns `String` - The title of guest page.

### `<webview>.isLoading()`

Returns `Boolean` - Whether guest page is still loading resources.

### `<webview>.isWaitingForResponse()`

Returns `Boolean` - Whether the guest page is waiting for a first-response for the main resource of the page.

### `<webview>.stop()`

Menghentikan navigasi yang tertunda.

### `<webview>.reload()`

Reloads the guest page.

### `<webview>.reloadIgnoringCache()`

Muat ulang laman tamu dan mengabaikan cache.

### `<webview>.canGoBack()`

Returns `Boolean` - Whether the guest page can go back.

### `<webview>.canGoForward()`

Returns `Boolean` - Whether the guest page can go forward.

### `<webview>.canGoToOffset(offset)`

* `offset` Integer

Returns `Boolean` - Whether the guest page can go to `offset`.

### `<webview>.clearHistory()`

Menghapus sejarah navigasi.

### `<webview>.goBack()`

Makes the guest page go back.

### `<webview>.goForward()`

Membuat halaman tamu maju.

### `<webview>.goToIndex(index)`

* `index` Integer

Menavigasi browser ke indeks halaman web absolut yang ditentukan.

### `<webview>.goToOffset(offset)`

* `offset` Integer

Navigates to the specified offset from the "current entry".

### `<webview>.isCrashed()`

Returns `Boolean` - Whether the renderer process has crashed.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` String

Mengganti agen pengguna untuk halaman web ini.

### `<webview>.getUserAgent()`

Returns `String` - The user agent for guest page.

### `<webview>.insertCSS(css)`

* `css` String

Injects CSS into the guest page.

### `<webview>.executeJavaScript(code, userGesture, callback)`

* ` kode </ 0> String</li>
<li><code>userGesture` Boolean - Default `false`.
* `callback` Fungsi (opsional) - Dipanggil setelah script telah dieksekusi. 
  * `result` Any

Evaluates `code` in page. If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen`, which require user action, can take advantage of this option for automation.

### `<webview>.openDevTools()`

Membuka jendela DevTools untuk halaman tamu.

### `<webview>.closeDevTools()`

Closes the DevTools window of guest page.

### `<webview>.isDevToolsOpened()`

Returns `Boolean` - Whether guest page has a DevTools window attached.

### `<webview>.isDevToolsFocused()`

Returns `Boolean` - Whether DevTools window of guest page is focused.

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`) of guest page.

### `<webview>.inspectServiceWorker()`

Buka DevTools untuk konteks pekerja Layanan hadir di semua halaman.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Set guest page muted.

### `<webview>.isAudioMuted()`

Returns `Boolean` - Whether guest page has been muted.

### `<webview>.undo()`

Executes editing command `undo` in page.

### `<webview>.redo()`

Executes editing command `redo` in page.

### `<webview>.cut()`

Executes editing command `cut` in page.

### `<webview>.copy()`

Executes editing command `copy` in page.

### `<webview>.paste()`

Executes editing command `paste` in page.

### `<webview>.pasteAndMatchStyle()`

Executes editing command `pasteAndMatchStyle` in page.

### `<webview>.delete()`

Executes editing command `delete` in page.

### `<webview>.selectAll()`

Executes editing command `selectAll` in page.

### `<webview>.unselect()`

Executes editing command `unselect` in page.

### `<webview>.replace(text)`

* `text` String

Executes editing command `replace` in page.

### `<webview>.replaceMisspelling(text)`

* `text` String

Executes editing command `replaceMisspelling` in page.

### `<webview>.insertText(text)`

* `text` String

Inserts `text` to the focused element.

### `<webview>.findInPage(text[, options])`

* `text` String - Content to be searched, must not be empty.
* `pilihan` Objek (opsional) 
  * `forward` Boolean - (optional) Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean - (optional) Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean - (optional) Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean - (optional) Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean - (optional) When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Menerima beberapa kecocokan intra-kata lainnya, defaultnya adalah `false`.

Memulai permintaan untuk mencari semua kecocokan teks pada halaman web dan memunculkan kembali Id peminta untuk permintaan. Hasil permintaan dapat diperoleh dengan menandai halaman yang ditemukan.

### `<webview>.stopFindInPage(action)`

* `action` String - Menentukan tindakan yang akan dilakukan saat diakhiri [`<webview>.findInPage`](webview-tag.md#webviewtagfindinpage) request. 
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Berhenti permintaan `findInPage` `webview` dengan disediakan `tindakan`.

### `<webview>.print([options])`

* `pilihan` Objek (opsional) 
  * `silent` Boolean (optional) - Don't ask user for print settings. Default is `false`.
  * `printBackground` Boolean (optional) - Also prints the background color and image of the web page. Default is `false`.
  * `deviceName` String (opsional) - mengatur printer nama perangkat untuk menggunakan. Default adalah `"`.

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options, callback)`

* `pilihan` Obyek 
  * `marginsType` Integer - (optional) Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String - (optional) Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
  * `printBackground` Boolean - (optional) Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean - (optional) Whether to print selection only.
  * `landscape` Boolean - (optional) `true` for landscape, `false` for portrait.
* `callback` Fungsi 
  * ` error </ 0> Kesalahan</li>
<li><code>data` Buffer

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options, callback)`.

### `<webview>.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured
* `callback` Fungsi 
  * ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
</ul></li>
</ul>

<p>Captures a snapshot of the <code>webview`'s page. Same as `webContents.capturePage([rect, ]callback)`.</p> 
    ### `<webview>.send(channel[, arg1][, arg2][, ...])`
    
    * ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p>Kirim pesan asinkron ke proses renderer melalui <code>channel`, Anda juga bisa mengirim argumen sewenang wenang. The renderer process can handle the message by listening to the `channel` event with the `ipcRenderer` module.</p> 
      Melihat [](web-contents.md#webcontentssendchannel-args)Menu untuk contoh.
      
      ### `<webview>.sendInputEvent(event)`
      
      * `event` Object
      
      Sends an input `event` to the page.
      
      See [webContents.sendInputEvent](web-contents.md#webcontentssendinputeventevent) for detailed description of `event` object.
      
      ### `<webview>.setZoomFactor(factor)`
      
      * `factor` Number - Zoom factor.
      
      Mengubah faktor pembesaran ke faktor yang ditentukan. Faktor zoom adalah zoom persen dibagi dengan 100, sehingga 300% = 3,0.
      
      ### `<webview>.setZoomLevel(level)`
      
      * `level` Number - Zoom level
      
      Mengubah tingkat zoom ke tingkat tertentu. Ukuran aslinya adalah 0 dan masing-masing Peningkatan atas atau di bawah mewakili zoom 20% lebih besar atau lebih kecil ke default batas 300% dan 50% dari ukuran aslinya, berurutan.
      
      ### `<webview>.showDefinitionForSelection()` *macOS*
      
      Menampilkan kamus pop-up yang mencari kata yang dipilih pada halaman.
      
      ### `<webview>.getWebContents()`
      
      Mengembalikan [`WebContents`](web-contents.md) - Isi web dari halaman web ini.
      
      ## DOM events
      
      The following DOM events are available to the `webview` tag:
      
      ### Event: 'load-commit'
      
      Pengembalian:
      
      * ` url </ 0>  String</li>
<li><code>isMainFrame` Boolean
      
      Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.
      
      ### Event: 'Apakah-selesai-load'
      
      Dibunyikan apabila navigasi dilakukan, yakni pemintal tab telah berhenti berputar dan acara `onload` dikirim.
      
      ### Event: 'Apakah-gagal-load'
      
      Pengembalian:
      
      * `errorCode` Bilangan bulat
      * `errorDescription` String
      * `validatedURL` String
      * `isMainFrame` Boolean
      
      Acara ini seperti `Apakah-selesai-beban` tapi dipancarkan ketika beban gagal atau dibatalkan, misalnya `window.stop()` dipanggil.
      
      ### Event: 'Apakah-frame-selesai-load'
      
      Pengembalian:
      
      * `isMainFrame` Boolean
      
      Dibunyikan apabila bingkai telah melakukan navigasi.
      
      ### Event: 'Apakah-mulai-loading'
      
      Sesuai dengan poin dalam waktu ketika pemintal tab mulai berputar.
      
      ### Event: 'Apakah-stop-loading'
      
      Sesuai dengan poin pada saat pemintal tab berhenti berputar.
      
      ### Event: 'Apakah-mendapatkan-tanggapan-rincian'
      
      Pengembalian:
      
      * `status` Boolean
      * `newURL` String
      * `originalURL` String
      * `httpResponseCode` Integer
      * `requestMethod` String
      * `pengarah` String
      * `headers` Obyek
      * `Jenissumberdaya` String
      
      Emitted ketika rincian tentang sumber daya yang diminta tersedia. `status` menunjukkan koneksi soket untuk mendownload sumber daya.
      
      ### Event: 'apakah-mendapatkan-redirect-permintaan'
      
      Pengembalian:
      
      * `oldURL` String
      * `newURL` String
      * `isMainFrame` Boolean
      
      Emitted ketika redirect diterima saat meminta resource.
      
      ### Event: 'dom-siap'
      
      Emitted saat dokumen dalam bingkai yang diberikan dimuat.
      
      ### Acara : 'halaman-judul-diperbarui'
      
      Pengembalian:
      
      * ` title </ 0>  String</li>
<li><code>explicitSet` Boolean
      
      Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.
      
      ### Event: 'halaman-favicon-updated '
      
      Kembali
      
      * `FAVICONS` String [] - serangkaian URL.
      
      Dibunyikan saat halaman menerima url favicon.
      
      ### Acara : 'enter-html-full-screen'
      
      Fired when page enters fullscreen triggered by HTML API.
      
      ### Acara : 'leave-html-full-screen'
      
      Fired when page leaves fullscreen triggered by HTML API.
      
      ### Event: 'console-message'
      
      Pengembalian:
      
      * `level` Integer
      * ` pesan </ 0> String</li>
<li><code>line` Integer
      * `sourceId` String
      
      Fired when the guest window logs a console message.
      
      The following example code forwards all log messages to the embedder's console without regard for log level or other properties.
      
      ```javascript
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => {
  console.log('Guest page logged a message:', e.message)
})
```
  
  ### Event: 'ditemukan-di-halaman'
  
  Pengembalian:
  
  * `hasil` Obyek 
    * `Idpermintaan` IntegerId
    * `aktifSesuaiOrdinal` Integer - Posisi pertandingan aktif.
    * `cocokdengan` Integer - Jumlah yang Cocok.
    * `seleksiArea` Objek - Koordinat wilayah pertandingan pertama.
    * `finalUpdate` Boolean
  
  Dipancarkan saat hasilnya tersedia [webContents.findInPage`] permintaan.</p>

<pre><code class="javascript">const webview = document.querySelector('webview')
webview.addEventListener('found-in-page', (e) => {
  webview.stopFindInPage('keepSelection')
})

const requestId = webview.findInPage('test')
console.log(requestId)
`</pre> 
  
  ### Event: 'baru-jendela'
  
  Pengembalian:
  
  * ` url </ 0>  String</li>
<li><code>frameName` String
  * `disposisi` String - dapat `default`, `latar depan-tab`, `latar belakang-tab`, `jendela baru`, `Simpan ke disk` dan `lainnya`.
  * `options` Object - The options which should be used for creating the new `BrowserWindow`.
  
  Fired when the guest page attempts to open a new browser window.
  
  The following example code opens the new url in system's default browser.
  
  ```javascript
const {shell} = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', (e) => {
  const protocol = require('url').parse(e.url).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    shell.openExternal(e.url)
  }
})
```

### Event: 'akan navigasi'

Pengembalian:

* ` url </ 0>  String</li>
</ul>

<p>Emitted when a user or the page wants to start navigation. It can happen when
the <code>window.location` object is changed or a user clicks a link in the page.</p> 
  Acara ini tidak akan memancarkan saat navigasi dimulai secara pemrograman API seperti `webContents.loadURL` dan `webContents.back`.
  
  Itu juga tidak dibunyikan untuk navigations di halaman, seperti mengklik anchor link atau memperbarui `window.location.hash`. Menggunakan acara `melakukan-menavigasi-di Halaman` untuk tujuan ini.
  
  Calling `event.preventDefault()` does **NOT** have any effect.
  
  ### Event: 'melakukan navigasi'
  
  Pengembalian:
  
  * ` url </ 0>  String</li>
</ul>

<p>Dibunyikan apabila navigasi dilakukan.</p>

<p>Acara ini tidak dibunyikan untuk navigations di halaman, seperti mengklik anchor link atau memperbarui <code>window.location.hash`. Menggunakan acara `melakukan-menavigasi-di Halaman` untuk tujuan ini.</p> 
    ### Event: 'Apakah-menavigasi-di halaman'
    
    Pengembalian:
    
    * `isMainFrame` Boolean
    * ` url </ 0>  String</li>
</ul>

<p>Dibunyikan saat navigasi dalam halaman terjadi.</p>

<p>Saat navigasi dalam halaman terjadi, perubahan URL halaman tidak menyebabkan
navigasi di luar halaman. Contoh dari hal ini adalah ketika jangkar link
diklik atau saat event hash <code>hashchange` dipicu.</p> 
      ### Acara : 'dekat'
      
      Fired when the guest page attempts to close itself.
      
      The following example code navigates the `webview` to `about:blank` when the guest attempts to close itself.
      
      ```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```
  
  ### Event: 'ipc-message'
  
  Pengembalian:
  
  * ` saluran </ 0>  String</li>
<li><code>args` Array
  
  Fired when the guest page has sent an asynchronous message to embedder page.
  
  With `sendToHost` method and `ipc-message` event you can easily communicate between guest page and embedder page:
  
  ```javascript
// In embedder page.
const webview = document.querySelector('webview')
webview.addEventListener('ipc-message', (event) => {
  console.log(event.channel)
  // Prints "pong"
})
webview.send('ping')
```

```javascript
// In guest page.
const {ipcRenderer} = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

### Event: 'jatuh'

Fired when the renderer process is crashed.

### Event: 'jatuh'

Fired when the gpu process is crashed.

### Event: 'plugin-jatuh'

Pengembalian:

* ` nama </ 0>  String</li>
<li><code>Versi` String

Dibunyikan ketika proses plugin telah jatuh.

### Event: 'menghancurkan'

Fired when the WebContents is destroyed.

### Event: 'media-mulai-bermain''

Emitted saat media mulai diputar.

### Event: 'media-berhenti'

Emitted saat media dijeda atau dilakukan bermain.

### Event: 'apakah-ganti-tema-warna'

Pengembalian:

* `themeColor` String

Emitted ketika warna tema halaman berubah. Hal ini biasanya karena bertemu sebuah meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

### Event: 'update-target-url'

Pengembalian:

*  url </ 0>  String</li>
</ul>

<p>Emitted saat mouse bergerak di atas sebuah link atau keyboard memindahkan fokus ke sebuah link.</p>

<h3>Event: 'devtools-dibuka'</h3>

<p>Emitted saat DevTools dibuka.</p>

<h3>Event: 'devtools-ditutup'</h3>

<p>Emitted saat DevTools ditutup.</p>

<h3>Event: 'fokus devtools'</h3>

<p>Emitted saat DevTools difokuskan / dibuka.</p>