# `<webview>`Tag

## Warning

Electron's `webview` tag is based on [Chromium's `webview`](https://developer.chrome.com/apps/tags/webview), which is undergoing dramatic architectural changes. This impacts the stability of `webviews`, including rendering, navigation, and event routing. We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, Electron's `BrowserView`, or an architecture that avoids embedded content altogether.

## Overview

> Menampilkan konten web eksternal dalam bingkai terisolasi dan proses.

Proses:[Renderer](../glossary.md#renderer-process)

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
* You can not add keyboard event listeners to `webview`.
* All reactions between the embedder frame and `webview` are asynchronous.

## Catatan Styling CSS

Please note that the `webview` tag's style uses `display:flex;` internally to ensure the child `iframe` element fills the full height and width of its `webview` container when used with traditional and flexbox layouts. Please do not overwrite the default `display:flex;` CSS property, unless specifying `display:inline-flex;` for inline layout.

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

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](remote.md) module. The remote module is avaiable by default.

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

When this attribute is present the guest page in `webview` will be able to use browser plugins. Plugins are disabled by default.

### `preload`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

Specifies a script that will be loaded before other scripts run in the guest page. The protocol of script's URL must be either `file:` or `asar:`, because it will be loaded by `require` in guest page under the hood.

When the guest page doesn't have node integration this script will still have access to all Node APIs, but global objects injected by Node will be deleted after this script has finished executing.

**Note:** This option will be appear as `preloadURL` (not `preload`) in the `webPreferences` specified to the `will-attach-webview` event.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

Sets the referrer URL for the guest page.

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

Sets the user agent for the guest page before the page is navigated to. Once the page is loaded, use the `setUserAgent` method to change the user agent.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

When this attribute is present the guest page will have web security disabled. Web security is enabled by default.

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

Sets the session used by the page. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. if there is no `persist:` prefix, the page will use an in-memory session. Dengan menugaskan yang sama `partisi`, beberapa halaman dapat berbagi sesi yang sama. If the `partition` is unset then default session of the app will be used.

This value can only be modified before the first navigation, since the session of an active renderer process cannot change. Subsequent attempts to modify the value will fail with a DOM exception.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

When this attribute is present the guest page will be allowed to open new windows. Popups are disabled by default.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

A list of strings which specifies the web preferences to be set on the webview, separated by `,`. The full list of supported preference strings can be found in [BrowserWindow](browser-window.md#new-browserwindowoptions).

The string follows the same format as the features string in `window.open`. A name by itself is given a `true` boolean value. A preference can be set to another value by including an `=`, followed by the value. Special values `yes` and `1` are interpreted as `true`, while `no` and `0` are interpreted as `false`.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A list of strings which specifies the blink features to be enabled separated by `,`. Daftar lengkap didukung string fitur dapat ditemukan di [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A list of strings which specifies the blink features to be disabled separated by `,`. Daftar lengkap didukung string fitur dapat ditemukan di [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.

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

* `url` URL
* `pilihan` Objek (opsional) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (opsional) - agen pengguna berasal permintaan.
  * `extraHeaders` String (opsional) - header tambahan yang dipisahkan oleh "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (opsional) - url dasar (dengan trailing pemisah path) untuk file yang akan diambil oleh data url. Hal ini diperlukan hanya jika ditentukan `url` data url dan perlu memuat file lainnya.

Loads the `url` in the webview, the `url` must contain the protocol prefix, e.g. the `http://` or `file://`.

### `<webview>.downloadURL(url)`

* ` url </ 0> String</li>
</ul>

<p>Initiates a download of the resource at <code>url` without navigating.</p> 
  ### `<webview>.getURL()`
  
  Returns `String` - The URL of guest page.
  
  ### `<webview>.getTitle()`
  
  Returns `String` - The title of guest page.
  
  ### `<webview>.isLoading()`
  
  Returns `Boolean` - Whether guest page is still loading resources.
  
  ### `<webview>.isLoadingMainFrame()`
  
  Returns `Boolean` - Whether the main frame (and not just iframes or frames within it) is still loading.
  
  ### `<webview>.isWaitingForResponse()`
  
  Returns `Boolean` - Whether the guest page is waiting for a first-response for the main resource of the page.
  
  ### `<webview>.stop()`
  
  Menghentikan navigasi yang tertunda.
  
  ### `<webview>.reload()`
  
  Reloads the guest page.
  
  ### `<webview>.reloadIgnoringCache()`
  
  Reloads the guest page and ignores cache.
  
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
  
  Makes the guest page go forward.
  
  ### `<webview>.goToIndex(index)`
  
  * `indeks` Integer
  
  Navigates to the specified absolute index.
  
  ### `<webview>.goToOffset(offset)`
  
  * `offset` Integer
  
  Arahkan ke offset yang ditentukan dari "entri saat ini".
  
  ### `<webview>.isCrashed()`
  
  Mengembalikan `Boolean` - Apakah proses renderer telah jatuh.
  
  ### `<webview>.setUserAgent(userAgent)`
  
  * `userAgent` String
  
  Overrides the user agent for the guest page.
  
  ### `<webview>.getUserAgent()`
  
  Returns `String` - The user agent for guest page.
  
  ### `<webview>.insertCSS(css)`
  
  * `css` String
  
  Injects CSS into the guest page.
  
  ### `<webview>.executeJavaScript(code[, userGesture, callback])`
  
  * `code` String
  * `userGesture` Boolean (optional) - Default `false`.
  * `callback` Fungsi (opsional) - Dipanggil setelah script telah dieksekusi. 
    * `hasil` Ada
  
  Evaluasi `kode` di halaman. If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen`, which require user action, can take advantage of this option for automation.
  
  ### `<webview>.openDevTools()`
  
  Opens a DevTools window for guest page.
  
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
  
  Opens the DevTools for the service worker context present in the guest page.
  
  ### `<webview>.setAudioMuted(muted)`
  
  * `dibungkam` Boolean
  
  Set guest page muted.
  
  ### `<webview>.isAudioMuted()`
  
  Returns `Boolean` - Whether guest page has been muted.
  
  ### `<webview>.isCurrentlyAudible()`
  
  Returns `Boolean` - Whether audio is currently playing.
  
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
  
  * `teks` String
  
  Executes editing command `replace` in page.
  
  ### `<webview>.replaceMisspelling(text)`
  
  * `teks` String
  
  Executes editing command `replaceMisspelling` in page.
  
  ### `<webview>.insertText(text)`
  
  * `teks` String
  
  Sisipan `teks` ke elemen yang terfokus.
  
  ### `<webview>.findInPage(text[, options])`
  
  * `text` String - Konten yang akan dicari, tidak boleh kosong.
  * `pilihan` Objek (pilihan) 
    * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
    * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
    * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
    * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
    * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Menerima beberapa kecocokan intra-kata lainnya, defaultnya adalah `false`.
  
  Returns `Integer` - The request id used for the request.
  
  Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.
  
  ### `<webview>.stopFindInPage(action)`
  
  * `tindakan` String - Specifies the action to take place when ending [`<webview>.findInPage`](#webviewfindinpagetext-options) request. 
    * `clearSelection` - jelas pilihan.
    * `keepSelection` - menerjemahkan pemilihan menjadi sebuah pilihan yang normal.
    * `activateSelection` - fokus dan klik seleksi simpul.
  
  Stops any `findInPage` request for the `webview` with the provided `action`.
  
  ### `<webview>.print([options])`
  
  * `pilihan` Objek (pilihan) 
    * `diam` Boolean (opsional) - Jangan tanya pengguna untuk pengaturan cetak. Defaultnya adalah `false`.
    * `printBackground` Boolean (opsional) - Juga mencetak warna latar belakang dan gambar halaman web Defaultnya adalah `false`.
    * `deviceName` String (opsional) - Tetapkan nama perangkat printer yang akan digunakan. Defaultnya adalah `''`.
  
  Prints `webview`'s web page. Same as `webContents.print([options])`.
  
  ### `<webview>.printToPDF(options, callback)`
  
  * `pilihan` Sasaran 
    * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
    * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be`A3`,`A4`,`A5`,` Legal `,`Letter`,`Tabloid` or an Object containing `height` and `width` in microns.
    * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
    * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
    * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
  * `callback` Fungsi 
    * Kesalahan `kesalahan`
    * `data` nomor
  
  Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options, callback)`.
  
  ### `<webview>.capturePage([rect, ]callback)`
  
  * `rect` [Persegi panjang](structures/rectangle.md) (opsional) - daerah halaman untuk ditangkap.
  * `callback` Fungsi 
    * ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
</ul></li>
</ul>

<p>Captures a snapshot of the <code>webview`'s page. Same as `webContents.capturePage([rect, ]callback)`.</p> 
      ### `<webview>.send(channel[, arg1][, arg2][, ...])`
      
      * `channel` String
      * ` ... args </ 0> ada []</li>
</ul>

<p>Kirim pesan asinkron ke proses renderer melalui <code>channel`, Anda juga bisa mengirim argumen sewenang wenang. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.</p> 
        See [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) for examples.
        
        ### `<webview>.sendInputEvent(event)`
        
        * `event` Object
        
        Mengirim masukan `event` ke halaman.
        
        See [webContents.sendInputEvent](web-contents.md#contentssendinputeventevent) for detailed description of `event` object.
        
        ### `<webview>.setZoomFactor(factor)`
        
        * `faktor` Angka - Faktor zoom.
        
        Mengubah faktor pembesaran ke faktor yang ditentukan. Faktor zoom adalah zoom persen dibagi dengan 100, sehingga 300% = 3,0.
        
        ### `<webview>.setZoomLevel(level)`
        
        * `level` Angka - level zoom.
        
        Mengubah tingkat zoom ke tingkat tertentu. Ukuran aslinya adalah 0 dan masing-masing Peningkatan atas atau di bawah mewakili zoom 20% lebih besar atau lebih kecil ke default batas 300% dan 50% dari ukuran aslinya, berurutan. The formula for this is `scale := 1.2 ^ level`.
        
        ### `<webview>.getZoomFactor(callback)`
        
        * `callback` Fungsi 
          * `zoomFactor` Number
        
        Sends a request to get current zoom factor, the `callback` will be called with `callback(zoomFactor)`.
        
        ### `<webview>.getZoomLevel(callback)`
        
        * `callback` Fungsi 
          * `zoomLevel` Number
        
        Sends a request to get current zoom level, the `callback` will be called with `callback(zoomLevel)`.
        
        ### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`
        
        * `minimalLevel` Nomor
        * `maksimalLevel` Nomor
        
        Menetapkan maksimum dan minimum tingkat mencubit-to-zoom.
        
        ### `<webview>.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`
        
        * `minimalLevel` Nomor
        * `maksimalLevel` Nomor
        
        Menetapkan tingkat zoom maksimal dan minimal berbasis tata letak (yaitu bukan-visual).
        
        ### `<webview>.showDefinitionForSelection()` *macOS*
        
        Menampilkan kamus pop-up yang mencari kata yang dipilih pada halaman.
        
        ### `<webview>.getWebContents()`
        
        Returns [`WebContents`](web-contents.md) - The web contents associated with this `webview`.
        
        It depends on the [`remote`](remote.md) module, it is therefore not available when this module is disabled.
        
        ## DOM events
        
        The following DOM events are available to the `webview` tag:
        
        ### Event: 'load-commit'
        
        Mengembalikan:
        
        * ` url </ 0> String</li>
<li><code>adalah Bingkai Utama` Boolean
        
        Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.
        
        ### Event: 'Apakah-selesai-load'
        
        Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.
        
        ### Peristiwa: 'Apakah-gagal-beban'
        
        Pengembalian:
        
        * `kode kesalahan` Bilangan bulat
        * `Deskripsi kesalahan` Tali
        * `memvalidasi URL` Tali
        * `adalah Bingkai Utama` Boolean
        
        This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.
        
        ### Peristiwa: 'Apakah-frame-selesai-beban'
        
        Mengembalikan:
        
        * `adalah Bingkai Utama` Boolean
        
        Fired when a frame has done navigation.
        
        ### Peristiwa: 'Apakah-mulai-pemuatan'
        
        Corresponds to the points in time when the spinner of the tab starts spinning.
        
        ### Peristiwa: 'Apakah-stop-pemuatan'
        
        Corresponds to the points in time when the spinner of the tab stops spinning.
        
        ### Peristiwa: 'lokal-siap'
        
        Fired when document in the given frame is loaded.
        
        ### Acara : 'halaman-judul-diperbarui'
        
        Pengembalian:
        
        * ` judul</ 0>  String</li>
<li><code>explicitSet` Boolean
        
        Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.
        
        ### Peristiwa: 'halaman-favicon-diperbarui '
        
        Pengembalian:
        
        * `FAVICONS` String [] - serangkaian URL.
        
        Fired when page receives favicon urls.
        
        ### Acara : 'enter-html-full-screen'
        
        Fired when page enters fullscreen triggered by HTML API.
        
        ### Acara : 'leave-html-full-screen'
        
        Fired when page leaves fullscreen triggered by HTML API.
        
        ### Event: 'console-message'
        
        Mengembalikan:
        
        * `level` Integer
        * `message` String
        * `line` Integer
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
        
        Mengembalikan:
        
        * `hasil` Sasaran 
          * `requestId` Bilangan bulat
          * `activeMatchOrdinal` Bulat - posisi pertandingan aktif.
          * `pertandingan` Bulat - jumlah pertandingan.
          * `selectionArea` Objek - koordinat pertama pertandingan wilayah.
          * `finalUpdate` Boolean
        
        Fired when a result is available for [`webview.findInPage`](#webviewfindinpagetext-options) request.
        
        ```javascript
        const webview = document.querySelector('webview')
        webview.addEventListener('found-in-page', (e) => {
          webview.stopFindInPage('keepSelection')
        })
        
        const requestId = webview.findInPage('test')
        console.log(requestId)
        ```
        
        ### Peristiwa: 'baru-jendela'
        
        Mengembalikan:
        
        * ` url </ 0> String</li>
<li><code>nama bingkai` tali
        * `disposisi` String - dapat `default`, `latar depan-tab`, `latar belakang-tab`, `jendela baru`, `Simpan ke disk` dan `lainnya`.
        * `options` Object - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).
        
        Fired when the guest page attempts to open a new browser window.
        
        The following example code opens the new url in system's default browser.
        
        ```javascript
        const { shell } = require('electron')
        const webview = document.querySelector('webview')
        
        webview.addEventListener('new-window', (e) => {
          const protocol = require('url').parse(e.url).protocol
          if (protocol === 'http:' || protocol === 'https:') {
            shell.openExternal(e.url)
          }
        })
        ```
        
        ### Peristiwa: 'akan navigasi'
        
        Mengembalikan:
        
        * ` url </ 0> String</li>
</ul>

<p>dipancarkan saat pengguna atau halaman ingin memulai navigasi. Hal itu bisa terjadi ketikaObjek <code> jendela.lokasi </ 0> diubah atau pengguna mengklik link di halaman.
</p>

<p>This event will not emit when the navigation is started programmatically with
APIs like <code><webview>.loadURL` and `<webview>.back`.</p> 
          It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.
          
          Calling `event.preventDefault()` does **NOT** have any effect.
          
          ### Peristiwa: 'akan navigasi'
          
          Mengembalikan:
          
          * `url` String
          
          Emitted when a navigation is done.
          
          Acara ini tidak dibunyikan untuk navigations di halaman, seperti mengklik anchor link atau memperbarui `window.location.hash`. Menggunakan acara `melakukan-menavigasi-di Halaman` untuk tujuan ini.
          
          ### peristiwa: 'Apakah-menavigasi-di halaman'
          
          Mengembalikan:
          
          * `adalah Bingkai Utama` Boolean
          * ` url </ 0> String</li>
</ul>

<p>Emitted when an in-page navigation happened.</p>

<p>Saat navigasi dalam halaman terjadi, perubahan URL halaman tidak menyebabkan
navigasi di luar halaman. Contoh dari hal ini adalah ketika jangkar link
diklik atau saat peristiwa hash <code>perubahan hash` dipicu.</p> 
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
            
            Mengembalikan:
            
            * `channel` String
            * `args` Array
            
            Fired when the guest page has sent an asynchronous message to embedder page.
            
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
            
            Fired when the renderer process is crashed.
            
            ### Event: 'gpu-crashed'
            
            Fired when the gpu process is crashed.
            
            ### Peristiwa: 'plugin-jatuh'
            
            Mengembalikan:
            
            * ` nama </ 0>  Deretan</li>
<li><code>Versi` String
            
            Fired when a plugin process is crashed.
            
            ### Event: 'menghancurkan'
            
            Fired when the WebContents is destroyed.
            
            ### Event: 'media-mulai-bermain''
            
            Emitted saat media mulai diputar.
            
            ### Event: 'media-berhenti'
            
            Emitted saat media dijeda atau dilakukan bermain.
            
            ### Event: 'apakah-ganti-tema-warna'
            
            Mengembalikan:
            
            * `themeColor` String
            
            Emitted when a page's theme color changes. This is usually due to encountering a meta tag:
            
            ```html
            <meta name='theme-color' content='#ff0000'>
            ```
            
            ### Event: 'update-target-url'
            
            Mengembalikan:
            
            *  url </ 0> String</li>
</ul>

<p>Emitted saat mouse bergerak di atas sebuah link atau keyboard memindahkan fokus ke sebuah link.</p>

<h3>Event: 'devtools-dibuka'</h3>

<p>Emitted saat DevTools dibuka.</p>

<h3>Event: 'devtools-ditutup'</h3>

<p>Emitted saat DevTools ditutup.</p>

<h3>Event: 'fokus devtools'</h3>

<p>Emitted saat DevTools difokuskan / dibuka.</p>