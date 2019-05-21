# `<webview>`Tag

## Warning

Electron's `webview` tag is based on [Chromium's `webview`](https://developer.chrome.com/apps/tags/webview), which is undergoing dramatic architectural changes. This impacts the stability of `webviews`, including rendering, navigation, and event routing. We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, Electron's `BrowserView`, or an architecture that avoids embedded content altogether.

## Enabling

By default the `webview` tag is disabled in Electron >= 5. You need to enable the tag by setting the `webviewTag` webPreferences option when constructing your `BrowserWindow`. For more information see the [BrowserWindow constructor docs](browser-window.md).

## Overview

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

### `nodeintegrationinsubframes`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

Experimental option for enabling NodeJS support in sub-frames such as iframes inside the `webview`. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not. This option is disabled by default in the guest page.

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](remote.md) module. The remote module is avaiable by default.

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
<webview src="https://github.com" partition="persist:github"></webview> <webview src="https://electronjs.org" partition="electron"></webview>
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

String mengikuti format yang sama sebagai string fitur dalam `window.open`. Nama itu sendiri diberikan nilai boolean `benar`. Preferensi dapat diatur untuk nilai lain termasuk `=`, diikuti oleh nilai. Nilai-nilai khusus `ya` dan `1` ditafsirkan sebagai `benar`, sementara `tidak ada` dan `0` ditafsirkan sebagai `palsu`.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Daftar string yang menentukan preferensi web diatur pada webview, dipisahkan oleh `,`. Daftar lengkap didukung string fitur dapat ditemukan di [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.

### `nonaktifkanfiturblink`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Daftar string yang menentukan preferensi web diatur pada webview, dipisahkan oleh `,`. Daftar lengkap didukung string fitur dapat ditemukan di [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.

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
* `pilihan` Objek (opsional) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (opsional) - agen pengguna berasal permintaan.
  * `extraHeaders` String (opsional) - header tambahan yang dipisahkan oleh "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (opsional) - url dasar (dengan trailing pemisah path) untuk file yang akan diambil oleh data url. Hal ini diperlukan hanya jika ditentukan `url` data url dan perlu memuat file lainnya.

Memuat `url` di webview, `url` harus berisi awalan protokol, misalnya file `http://` atau`://`.

### `<webview>.downloadURL(url)`

* ` url </ 0> String</li>
</ul>

<p>Initiates a download of the resource at <code>url` without navigating.</p> 
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
  
  Menyuntikkan CSS ke halaman tamu.
  
  ### `<webview>.executeJavaScript(code[, userGesture, callback])`
  
  * `id` String
  * `userGesture` Boolean (optional) - Default `false`.
  * `callback` Fungsi (opsional) - Dipanggil setelah script telah dieksekusi. 
    * `hasil` Ada
  
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
  
  Sisipan `teks` ke elemen yang terfokus.
  
  ### `<webview>.findInPage(text[, options])`
  
  * `text` String - Konten yang akan dicari, tidak boleh kosong.
  * `pilihan` Objek (opsional) 
    * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
    * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
    * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
    * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
    * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Menerima beberapa kecocokan intra-kata lainnya, defaultnya adalah `false`.
  
  Returns `Integer` - The request id used for the request.
  
  Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.
  
  ### `<webview>.stopFindInPage(action)`
  
  * `tindakan` String - Menentukan tindakan yang akan dilakukan saat diakhiri [`<webview>.findInPage`](#webviewfindinpagetext-options) permintaan. 
    * `clearSelection` - jelas pilihan.
    * `keepSelection` - menerjemahkan pemilihan menjadi sebuah pilihan yang normal.
    * `activateSelection` - fokus dan klik seleksi simpul.
  
  Berhenti permintaan `findInPage` `webview` dengan disediakan `tindakan`.
  
  ### `<webview>.print([options])`
  
  * `pilihan` Objek (opsional) 
    * `diam` Boolean (opsional) - Jangan tanya pengguna untuk pengaturan cetak. Defaultnya adalah `false`.
    * `printBackground` Boolean (opsional) - Juga mencetak warna latar belakang dan gambar halaman web Defaultnya adalah `false`.
    * `deviceName` String (opsional) - Tetapkan nama perangkat printer yang akan digunakan. Defaultnya adalah `''`.
  
  Prints `webview` 's web page. Same as `webContents.print ([options])`.
  
  ### `<webview>.printToPDF(options, callback)`
  
  * `pilihan` Obyek 
    * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
    * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be`A3`,`A4`,`A5`,` Legal `,`Letter`,`Tabloid` or an Object containing `height` and `width` in microns.
    * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
    * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
    * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
  * `callback` Fungsi 
    * Kesalahan `kesalahan`
    * `data` nomor
  
  Prints `webview` 's web page as PDF,Same as `webContents.printToPDF (options, callback)`.
  
  ### `<webview>.capturePage ([rect,] callback)`
  
  * ` rect </ 0>  <a href="structures/rectangle.md"> Rectangle </ 1> (opsional) - Batas untuk ditangkap</li>
<li><code>callback` Fungsi 
    * ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
</ul></li>
</ul>

<p>Menangkap sebuah snapshot dari halaman dalam <code>rect`. Setelah menyelesaikan `callback` yang akan disebut dengan `callback(image)`. The `image` is an instance of [NativeImage](native-image.md) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.</p> 
      **[Deprecated Soon](promisification.md)**
      
      ### `<webview>.capturePage([rect])`
      
      * `rect` [Persegi panjang](structures/rectangle.md) (opsional) - daerah halaman untuk ditangkap.
      
      * Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)
      
      Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.
      
      ### `<webview>.send (saluran [, arg1] [, arg2] [, ...])`
      
      * ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p>Kirim pesan asinkron ke proses renderer melalui <code>channel`, Anda juga bisa mengirim argumen sewenang wenang. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.</p> 
        Melihat [](web-contents.md#contentssendchannel-arg1-arg2-)Menu untuk contoh.
        
        ### `<webview>.sendInputEvent(event)`
        
        * `event` Objek
        
        Mengirim masukan `event` ke halaman.
        
        See [webContents.sendInputEvent](web-contents.md#contentssendinputeventevent) for detailed description of `event` object.
        
        ### `<webview>.setZoomFactor(factor)`
        
        * `faktor` Angka - Faktor zoom.
        
        Mengubah faktor pembesaran ke faktor yang ditentukan. Faktor zoom adalah zoom persen dibagi dengan 100, sehingga 300% = 3,0.
        
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
        
        Menetapkan maksimum dan minimum tingkat mencubit-to-zoom.
        
        ### `<webview>.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`
        
        * `minimalLevel` Nomor
        * `maksimalLevel` Nomor
        
        Menetapkan tingkat zoom maksimal dan minimal berbasis tata letak (yaitu bukan-visual).
        
        ### `<webview>.showDefinitionForSelection()` *macOS*
        
        Menampilkan kamus pop-up yang mencari kata yang dipilih pada halaman.
        
        ### `<webview>.getWebContents()`
        
        Mengembalikan [`WebContents`](web-contents.md) - Isi web dari halaman web ini.
        
        It depends on the [`remote`](remote.md) module, it is therefore not available when this module is disabled.
        
        ## DOM events
        
        Peristiwa DOM berikut tersedia untuk tag `webview`:
        
        ### Event: 'load-commit'
        
        Pengembalian:
        
        * `url` String
        * `adalah Bingkai Utama` Boolean
        
        Fired when a load has committed. This includes a document-level loads, but does not include asynchronous resource loads.
        
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
        
        Dipecat bila judul halaman diatur saat navigasi. `explicitSet` salah ketika judul disintesis dari file url.
        
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
        
        * `hasil` Obyek 
          * `requestId` Bilangan bulat
          * `activeMatchOrdinal` Bulat - posisi pertandingan aktif.
          * `pertandingan` Bulat - jumlah pertandingan.
          * `selectionArea` Objek - koordinat pertama pertandingan wilayah.
          * `finalUpdate` Boolean
        
        Dipancarkan saat hasilnya tersedia [webContents.findInPage`] permintaan.</p>

<pre><code class="javascript">const webview = document.querySelector ('webview') webview.addEventListener ('found-in-page', (e) = > {webview.stopFindInPage ('keepSelection')}) const requestId = webview.findInPage ('test' ) console.log (requestId)
`</pre> 
        
        ### Peristiwa: 'baru-jendela'
        
        Pengembalian:
        
        * `url` String
        * `nama bingkai` tali
        * `disposisi` String - dapat `default`, `latar depan-tab`, `latar belakang-tab`, `jendela baru`, `Simpan ke disk` dan `lainnya`.
        * `options` Object - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).
        
        Fired when the guest page attempts to open a new browser window.
        
        Contoh kode berikut membuka url baru di browser default sistem.
        
        ```javascript
        const { shell } = require('electron')
        const webview = document.querySelector('webview')
        
        webview.addEventListener('new-window', (e) => {
          const protocol = require('url').parse(e.url).protocol
          if (protocol === 'http:' || protocol === 'https:') {
            shell.openExternalSync(e.url)
          }
        })
        ```
        
        ### Peristiwa: 'akan navigasi'
        
        Pengembalian:
        
        * `url` String
        
        dipancarkan saat pengguna atau halaman ingin memulai navigasi. Hal itu bisa terjadi ketikaObjek ` jendela.lokasi </ 0> diubah atau pengguna mengklik link di halaman.
</p>

<p>Acara ini tidak akan memancarkan saat navigasi dimulai secara pemrograman
API seperti <code>webContents.loadURL` dan `webContents.back`.
        
        Itu juga tidak dibunyikan untuk navigations di halaman, seperti mengklik anchor link atau memperbarui `window.location.hash`. Menggunakan acara `melakukan-menavigasi-di Halaman` untuk tujuan ini.
        
        Memanggil `event.preventDefault ()` tidak **TIDAK** memiliki efek.
        
        ### Peristiwa: 'akan navigasi'
        
        Pengembalian:
        
        * `url` String
        
        Dibunyikan apabila navigasi dilakukan.
        
        Acara ini tidak dibunyikan untuk navigations di halaman, seperti mengklik anchor link atau memperbarui `window.location.hash`. Menggunakan acara `melakukan-menavigasi-di Halaman` untuk tujuan ini.
        
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
<li><code>args` Array
        
        Fired when the guest page has sent an asynchronous message to the embedder page.
        
        With `sendToHost` method and `ipc-message` event you can communicate between guest page and embedder page:
        
        ```javascript
        // In embedder page. const webview = document.querySelector ('webview') webview.addEventListener ('ipc-message', (event) = > {console.log (event.channel) // Prints "pong"}) webview.send ('ping ')
        ```
        
        ```javascript
        // In guest page. const { ipcRenderer } = require ('electron') ipcRenderer.on ('ping', () = > {ipcRenderer.sendToHost ('pong')})
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
        
        Emitted ketika warna tema halaman berubah. Hal ini biasanya karena bertemu sebuah meta tag:
        
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