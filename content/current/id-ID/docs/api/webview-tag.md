# `<webview>`Tag

## Warning

Electron's `webview` tag is based on [Chromium's `webview`](https://developer.chrome.com/apps/tags/webview), which is undergoing dramatic architectural changes. This impacts the stability of `webviews`, including rendering, navigation, and event routing. We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, Electron's `BrowserView`, or an architecture that avoids embedded content altogether.

## Enabling

By default the `webview` tag is disabled in Electron >= 5.  You need to enable the tag by setting the `webviewTag` webPreferences option when constructing your `BrowserWindow`. For more information see the [BrowserWindow constructor docs](browser-window.md).

## Sekilas

> Menampilkan konten web eksternal dalam bingkai terisolasi dan proses.

Processo: [Renderizador](../glossary.md#renderer-process)

Gunakan tag ` webview ` untuk menyematkan 'guest' content (seperti halaman web) di aplikasi Elektron Anda. Konten tamu terdapat dalam wadah ` webview `. Halaman tertanam dalam aplikasi Anda mengontrol bagaimana konten tamu ditata dan diberikan.

Tidak seperti ` iframe `, ` webview ` berjalan dalam proses terpisah dari aplikasi Anda. Ini tidak memiliki izin yang sama seperti halaman web Anda dan semua interaksi antara aplikasi Anda dan konten tertanam Anda akan menjadi asinkron. Ini membuat aplikasi Anda tetap aman dari konten yang disematkan. **Catatan:** Sebagian besar metode yang dipanggil pada webview dari halaman host memerlukan sebuah panggilan sinkron ke proses utama.

## Contoh

Untuk menyematkan laman web di aplikasi Anda, tambahkan tag ` webview ` ke halaman penyemat aplikasi Anda (ini adalah halaman aplikasi yang akan menampilkan konten tamu). Dalam bentuknya yang paling sederhana, tag `webview` menyertakan `src` dari halaman web dan gaya css yang mengontrol tampilan kontainer ` webview `:

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

Jika Anda ingin mengontrol konten tamu dengan cara apa pun, Anda dapat menulis JavaScript yang mendengarkan untuk kejadian ` webview ` dan merespons kejadian tersebut dengan menggunakan metode ` webview `. Berikut contoh kode dengan dua pendengar kejadian: satu yang mendengarkan halaman web untuk mulai memuat, yang lainnya untuk halaman web untuk berhenti memuat, dan menampilkan pesan "memuat..." selama waktu muat:

```html
<script>onload = () = > {const webview = indikator const document.querySelector('webview') = document.querySelector('.indicator') const loadstart = () = > {indicator.innerText = 'memuat...'}      Const loadstop = () = > {indicator.innerText = ''} webview.addEventListener (' lakukan-mulai-loading', loadstart) webview.addEventListener (' lakukan-stop-loading', loadstop)}</script>
```

## Internal implementation

Under the hood `webview` is implemented with [Out-of-Process iframes (OOPIFs)](https://www.chromium.org/developers/design-documents/oop-iframes). The `webview` tag is essentially a custom element using shadow DOM to wrap an `iframe` element inside it.

So the behavior of `webview` is very similar to a cross-domain `iframe`, as examples:

* When clicking into a `webview`, the page focus will move from the embedder frame to `webview`.
* You can not add keyboard, mouse, and scroll event listeners to `webview`.
* All reactions between the embedder frame and `webview` are asynchronous.

## Catatan Styling CSS

Please note that the `webview` tag's style uses `display:flex;` internally to ensure the child `iframe` element fills the full height and width of its `webview` container when used with traditional and flexbox layouts. Please do not overwrite the default `display:flex;` CSS property, unless specifying `display:inline-flex;` for inline layout.

## Atribut tag

`Webview` tag memiliki atribut berikut:

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

A `String` representing the visible URL. Writing to this attribute initiates top-level navigation.

Menetapkan `src` nilainya akan memuat ulang halaman ini.

Atribut `src` juga dapat menerima URL data, seperti data`:teks/polos, Halo, dunia!`.

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

A `Boolean`. Ketika atribut ini menampilkan halaman tamu di `webview` akan memiliki integrasi simpul dan dapat menggunakan API simpul seperti` memerlukan ` dan `proses` untuk mengakses sumber daya sistem tingkat rendah. Node integrasi dinonaktifkan secara default pada semua halaman.

### `nodeintegrationinsubframes`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

A `Boolean` for the experimental option for enabling NodeJS support in sub-frames such as iframes inside the `webview`. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not. This option is disabled by default in the guest page.

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

A `Boolean`. When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](remote.md) module. The remote module is available by default.

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

A `Boolean`. When this attribute is present the guest page in `webview` will be able to use browser plugins. Plugins are disabled by default.

### `preload`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

A `String` that specifies a script that will be loaded before other scripts run in the guest page. Protokol script URL harus berupa `berkas:` atau `asar:`, karena itu akan dimuat oleh `memerlukan` di semua halaman di bawah tenda.

Ketika halaman tamu tidak memiliki integrasi node script ini masih akan memiliki akses ke semua Node api, tetapi benda-benda global yang disuntikkan oleh Node akan dihapus setelah script ini selesai mengeksekusi.

**Note:** This option will appear as `preloadURL` (not `preload`) in the `webPreferences` specified to the `will-attach-webview` event.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

A `String` that sets the referrer URL for the guest page.

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

A `String` that sets the user agent for the guest page before the page is navigated to. Once the page is loaded, use the `setUserAgent` method to change the user agent.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

A `Boolean`. When this attribute is present the guest page will have web security disabled. Web security is enabled by default.

### `partisi`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

A `String` that sets the session used by the page. Jika `partisi` diawali dengan `bertahan:`, halaman akan menggunakan sesi terus-menerus tersedia untuk semua halaman di app dengan `partisi` yang sama. jika tidak ada `bertahan:` awalan, halaman akan menggunakan sesi di memori. Dengan menugaskan yang sama `partisi`, beberapa halaman dapat berbagi sesi yang sama. Jika `partisi` disetel maka sesi app default akan digunakan.

This value can only be modified before the first navigation, since the session of an active renderer process cannot change. Subsequent attempts to modify the value will fail with a DOM exception.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

A `Boolean`. When this attribute is present the guest page will be allowed to open new windows. Popups are disabled by default.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

A `String` which is a comma separated list of strings which specifies the web preferences to be set on the webview. Daftar lengkap didukung preferensi string dapat ditemukan di [BrowserWindow](browser-window.md#new-browserwindowoptions).

String mengikuti format yang sama sebagai string fitur dalam `window.open`. Nama itu sendiri diberikan nilai boolean `benar`. Preferensi dapat diatur untuk nilai lain termasuk `=`, diikuti oleh nilai. Nilai-nilai khusus `ya` dan `1` ditafsirkan sebagai `benar`, sementara `tidak ada` dan `0` ditafsirkan sebagai `palsu`.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be enabled separated by `,`. Daftar lengkap didukung string fitur dapat ditemukan di [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.

### `nonaktifkanfiturblink`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be disabled separated by `,`. Daftar lengkap didukung string fitur dapat ditemukan di [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.

## Metode

Tag ` webview ` memiliki metode berikut:

**Catatan:** Elemen webview harus dimuat sebelum menggunakan metode.

**Contoh**

```javascript
const webview = document.querySelector('webview')
webview.addEventListener ('dom-ready', () => {
   webview.openDevTools()
})
```

### `<webview>.muatURL(url[, pilihan])`

* `url` URL
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (opsional) - agen pengguna berasal permintaan.
  * `extraHeaders` String (opsional) - header tambahan yang dipisahkan oleh "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (opsional) - url dasar (dengan trailing pemisah path) untuk file yang akan diambil oleh data url. Hal ini diperlukan hanya jika ditentukan `url` data url dan perlu memuat file lainnya.

Returns `Promise<void>` - The promise will resolve when the page has finished loading (see [`did-finish-load`](webview-tag.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](webview-tag.md#event-did-fail-load)).

Memuat `url` di webview, `url` harus berisi awalan protokol, misalnya file `http://` atau`://`.

### `<webview>.downloadURL(url)`

* ` url </ 0> String</li>
</ul>

<p spaces-before="0">Initiates a download of the resource at <code>url` without navigating.</p>

### `<webview>.dapatkanURL()`

Mengembalikan ` String ` - URL halaman tamu.

### `<webview>.dapatkanTitle()`

Mengembalikan `String` - Judul halaman tamu.

### `<webview>.isLoading()`

Pengembalian ` Boolean ` - Apakah halaman tamu masih memuat sumber daya.

### `<webview>.isLoadingMainFrame()`

Kembali `Boolean` - Apakah bingkai utama (dan bukan hanya iframes atau bingkai di dalamnya) masih sedang loading.

### `<webview>.isWaitingForResponse ()`

Mengembalikan ` Boolean ` - Apakah halaman tamu menunggu tanggapan pertama untuk sumber utama halaman.

### `<webview>.stop()`

Menghentikan navigasi yang tertunda.

### `<webview>.reload()`

Memuat kembali halaman web saat ini.

### `<webview>.reloadIgnoringCache()`

Muat ulang laman tamu dan mengabaikan cache.

### `<webview>.canGoBack()`

Returns `Boolean ` - Whether the guest page can go back.

### `<webview>.canGoForward()`

Returns `Boolean` - Whether the guest page can go forward.

### `<webview>.canGoToOffset(offset)`

* `offset` Integer

Mengembalikan `Boolean` - Apakah halaman tamu bisa masuk ke `offset`.

### `<webview>.clearHistory()`

Menghapus sejarah navigasi.

### `<webview>.goBack()`

Membuat halaman baru kembali.

### `<webview>.goForward()`

Membuat halaman tamu maju.

### `<webview>.goToIndex(index)`

* `indeks` Integer

Menavigasi browser ke indeks halaman web absolut yang ditentukan.

### `<webview>.goToOffset(offset)`

* `offset` Integer

Arahkan ke offset yang ditentukan dari "entri saat ini".

### `<webview>.isCrashed()`

Mengembalikan `Boolean` - Apakah proses renderer telah jatuh.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` String

Mengganti agen pengguna untuk halaman web ini.

### `<webview>.getUserAgent()`

Mengembalikan `String` - Agen pengguna untuk halaman tamu.

### `<webview>.insertCSS(css)`

* `css` String

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `<webview>.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

### `<webview>.removeInsertedCSS(key)`

* `kunci` senar

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `<webview>.insertCSS(css)`.

### `<webview>.executeJavaScript(code[, userGesture])`

* `id` String
* `userGesture` Boolean (optional) - Default `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluasi `kode` di halaman. If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen `, which requires user action, can take advantage of this option for automation.

### `<webview>.openDevTools ()`

Membuka jendela DevTools untuk halaman tamu.

### `<webview>.tutupDevTools()`

Menutup jendela tamu DevTools.

### `<webview>.isDevToolsOpened()`

Returns `Boolean` - Whether guest page has a DevTools window attached.

### `<webview>.isDevToolsFocused()`

Returns `Boolean` - Whether DevTools window of guest page is dedicated.

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Mulai memeriksa elemen pada posisi (`x`,`y`) dari halaman tamu.

### `<webview>.inspectSharedWorker()`

Opens the DevTools for the shared worker context present in the guest page.

### `<webview>.inspectServiceWorker()`

Buka DevTools untuk konteks pekerja Layanan hadir di semua halaman.

### `<webview>.setAudioMuted(muted)`

* `dibungkam` Boolean

Tetapkan halaman tamu yang dibungkam.

### `<webview>.isAudioMuted()`

Returns `Boolean` - Whether guest page has been muted.

### `<webview>.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

### `<webview>.undo()`

Jalankan perintah pengeditan `undo` di halaman.

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

Jalankan perintah pengeditan `batalkan pilihan` di halaman.

### `<webview>.replace(text)`

* `teks` String

Jalankan perintah pengeditan `ganti` di halaman.

### `<webview>.replaceMisspelling(text)`

* `teks` String

Jalankan perintah pengeditan `replaceMisspelling` di halaman.

### `<webview>.insertText(text)`

* `teks` String

Returns `Promise<void>`

Sisipan `teks` ke elemen yang terfokus.

### `<webview>.findInPage(text[, options])`

* `text` String - Konten yang akan dicari, tidak boleh kosong.
* `options` Object (optional)
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. default ke ` false </ 0>.</li>
<li><code>medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Menerima beberapa kecocokan intra-kata lainnya, defaultnya adalah `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.

### `<webview>.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`<webview>.findInPage`](#webviewfindinpagetext-options) request.
  * `clearSelection` - jelas pilihan.
  * `keepSelection` - menerjemahkan pemilihan menjadi sebuah pilihan yang normal.
  * `activateSelection` - fokus dan klik seleksi simpul.

Berhenti permintaan `findInPage` `webview` dengan disediakan `tindakan`.

### `<webview>.print([options])`

* `options` Object (optional)
  * `silent` Boolean (optional) - Don't ask user for print settings. Defaultnya adalah ` false </ 0> .</li>
<li><code>printBackground` Boolean (optional) - Also prints the background color and image of the web page. Defaultnya adalah ` false </ 0> .</li>
<li><code>deviceName` String (optional) - Set the printer device name to use. Default is `''`.

Returns `Promise<void>`

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options)`

* `options` Object
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be`A3`,`A4`,`A5`,` Legal `,`Letter`,`Tabloid` or an Object containing `height` and `width` in microns.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.

Returns `Promise<Uint8Array>` - Resolves with the generated PDF data.

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options)`.

### `<webview>.capturePage([rect])`

* `rect` [Persegi panjang](structures/rectangle.md) (opsional) - daerah halaman untuk ditangkap.

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Menangkap sebuah snapshot dari halaman dalam `rect`. Omitting `rect` will capture the whole visible page.

### `<webview>.send(channel, ...args)`

* ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p spaces-before="0">Returns <code>Promise<void>`</p>

Kirim pesan asinkron ke proses renderer melalui `channel`, Anda juga bisa mengirim argumen sewenang wenang. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

Melihat [](web-contents.md#contentssendchannel-args)Menu untuk contoh.

### `<webview>.sendInputEvent(event)`

* `event`  [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Returns `Promise<void>`

Mengirim masukan `event` ke halaman.

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventinputevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `faktor` Angka - Faktor zoom.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

### `<webview>.setZoomLevel(level)`

* `level` Angka - level zoom.

Mengubah tingkat zoom ke tingkat tertentu. Ukuran aslinya adalah 0 dan masing-masing Peningkatan atas atau di bawah mewakili zoom 20% lebih besar atau lebih kecil ke default batas 300% dan 50% dari ukuran aslinya, berurutan. The formula for this is `scale := 1.2 ^ level`.

### `<webview>.getZoomFactor()`

Returns `Number` - the current zoom factor.

### `<webview>.getZoomLevel()`

Returns `Number` - the current zoom level.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimalLevel` Nomor
* `maksimalLevel` Nomor

Returns `Promise<void>`

Menetapkan maksimum dan minimum tingkat mencubit-to-zoom.

### `<webview>.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)` _Deprecated_

* `minimalLevel` Nomor
* `maksimalLevel` Nomor

Returns `Promise<void>`

Menetapkan tingkat zoom maksimal dan minimal berbasis tata letak (yaitu bukan-visual).

**Deprecated:** This API is no longer supported by Chromium.

### `<webview>.showDefinitionForSelection()` _macOS_

Menampilkan kamus pop-up yang mencari kata yang dipilih pada halaman.

### `<webview>.getWebContents()` _Deprecated_

Mengembalikan [`WebContents`](web-contents.md) - Isi web dari halaman web ini.

It depends on the [`remote`](remote.md) module, it is therefore not available when this module is disabled.

### `<webview>.getWebContentsId()`

Returns `Number` - The WebContents ID of this `webview`.

## DOM Events

Peristiwa DOM berikut tersedia untuk tag `webview`:

### Event: 'load-commit'

Pengembalian:

* `url` String
* `adalah Bingkai Utama` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### Event: 'Apakah-selesai-load'

Dibunyikan apabila navigasi dilakukan, yakni pemintal tab telah berhenti berputar dan acara `onload` dikirim.

### Peristiwa: 'Apakah-gagal-beban'

Pengembalian:

* `kode kesalahan` Bilangan bulat
* `Deskripsi kesalahan` Tali
* `memvalidasi URL` Tali
* `adalah Bingkai Utama` Boolean

Acara ini seperti `Apakah-selesai-beban` tapi dipancarkan ketika beban gagal atau dibatalkan, misalnya `window.stop()` dipanggil.

### Peristiwa: 'Apakah-frame-selesai-beban'

Pengembalian:

* `adalah Bingkai Utama` Boolean

Dibunyikan apabila bingkai telah melakukan navigasi.

### Peristiwa: 'Apakah-mulai-pemuatan'

Sesuai dengan poin dalam waktu ketika pemintal tab mulai berputar.

### Peristiwa: 'Apakah-stop-pemuatan'

Sesuai dengan poin pada saat pemintal tab berhenti berputar.

### Peristiwa: 'lokal-siap'

Emitted saat dokumen dalam bingkai yang diberikan dimuat.

### Acara : 'halaman-judul-diperbarui'

Pengembalian:

* ` judul </ 0> String</li>
<li><code>explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

### Peristiwa: 'halaman-favicon-diperbarui '

Pengembalian:

* `FAVICONS` String [] - serangkaian URL.

Dibunyikan saat halaman menerima url favicon.

### Acara : 'enter-html-full-screen'

Dipecat saat halaman memasuki layar penuh yang dipicu oleh HTML API.

### Acara : 'leave-html-full-screen'

Dipecat saat halaman daun layar penuh dipicu oleh HTML API.

### Event: 'console-message'

Pengembalian:

* `level` Integer
* `pesan` String
* `line` Integer
* `sourceId` String

Dipecat saat jendela tamu membuka pesan konsol.

Contoh kode berikut meneruskan semua pesan log ke konsol embedder tanpa memperhatikan tingkat log atau properti lainnya.

```javascript
const webview = document.querySelector ('webview') webview.addEventListener ('console-message', (e) = > {console.log ('Halaman tamu mencatat pesan:', e.message)})
```

### Event: 'ditemukan-di-halaman'

Pengembalian:

* `result` Object
  * `requestId` Bilangan bulat
  * `activeMatchOrdinal` Bulat - posisi pertandingan aktif.
  * `pertandingan` Bulat - jumlah pertandingan.
  * `selectionArea` Rectangle - Coordinates of first match region.
  * `finalUpdate` Boolean

Dipancarkan saat hasilnya tersedia [

webContents.findInPage`] permintaan.</p>

<pre><code class="javascript">const webview = document.querySelector ('webview') webview.addEventListener ('found-in-page', (e) = > {webview.stopFindInPage ('keepSelection')}) const requestId = webview.findInPage ('test' ) console.log (requestId)
`</pre> 



### Peristiwa: 'baru-jendela'

Pengembalian:

* `url` String
* `nama bingkai` tali
* `disposisi` String - dapat `default`, `latar depan-tab`, `latar belakang-tab`, `jendela baru`, `Simpan ke disk` dan `lainnya`.

* `options` BrowserWindowConstructorOptions - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

Fired when the guest page attempts to open a new browser window.

Contoh kode berikut membuka url baru di browser default sistem.



```javascript
const { shell } = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', async (e) => {
  const protocol = require('url').parse(e.url).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    await shell.openExternal(e.url)
  }
})
```




### Peristiwa: 'akan navigasi'

Pengembalian:

* `url` String

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

Acara ini tidak akan memancarkan saat navigasi dimulai secara pemrograman API seperti `webContents.loadURL` dan `webContents.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Memanggil `event.preventDefault ()` tidak __TIDAK__ memiliki efek.



### Peristiwa: 'akan navigasi'

Pengembalian:

* `url` String

Dibunyikan apabila navigasi dilakukan.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.



### peristiwa: 'Apakah-menavigasi-di halaman'

Pengembalian:

* `adalah Bingkai Utama` Boolean
* `url` String

Dibunyikan saat navigasi dalam halaman terjadi.

Saat navigasi dalam halaman terjadi, perubahan URL halaman tidak menyebabkan navigasi di luar halaman. Contoh dari hal ini adalah ketika jangkar link diklik atau saat peristiwa hash `perubahan hash` dipicu.



### Acara : 'dekat'

Dipecat saat halaman tamu mencoba menutup diri.

The following example code navigates the `webview` to `about: blank` when the guest attempts to close itself.



```javascript
const webview = document.querySelector ('webview') webview.addEventListener ('close', () = > {webview.src = 'about: blank'})
```




### Event: 'ipc-message'

Pengembalian:

* ` saluran </ 0>  String</li>
<li><code>args` any[]

Fired when the guest page has sent an asynchronous message to the embedder page.

With `sendToHost` method and `ipc-message` event you can communicate between guest page and embedder page:



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
const { ipcRenderer } = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```




### Peristiwa: 'jatuh'

Dipecat saat proses renderer jatuh.



### Peristiwa: 'plugin-jatuh'

Pengembalian:

* ` nama </ 0>  String</li>
<li><code>Versi` String

Dibunyikan ketika proses plugin telah jatuh.



### Event: 'menghancurkan'

Dipecat saat WebContents hancur.



### Event: 'media-mulai-bermain''

Emitted saat media mulai diputar.



### Event: 'media-berhenti'

Emitted saat media dijeda atau dilakukan bermain.



### Event: 'apakah-ganti-tema-warna'

Pengembalian:

* `themeColor` String

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:



```html
<meta name='theme-color' content='#ff0000'>
```




### Event: 'update-target-url'

Pengembalian:

* `url` String

Emitted saat mouse bergerak di atas sebuah link atau keyboard memindahkan fokus ke sebuah link.



### Event: 'devtools-dibuka'

Emitted saat DevTools dibuka.



### Event: 'devtools-ditutup'

Emitted saat DevTools ditutup.



### Event: 'fokus devtools'

Emitted saat DevTools difokuskan / dibuka.
