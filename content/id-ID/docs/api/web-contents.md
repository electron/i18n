# webContents

> Render dan kontrol halaman web.

Proses: [utama](../glossary.md#main-process)

`webContents` adalah [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ini bertanggung jawab untuk render dan mengendalikan halaman web dan properti objek [`BrowserWindow`](browser-window.md). Contoh untuk mengakses objek `webContents`:

```javascript
const {BrowserWindow} = require('electron') membiarkan memenangkan = BrowserWindow({width: 800, height: 1500}) win.loadURL ('http://github.com') Biarkan isi baru = win.webContents console.log(contents)
```

## Metode

Metode ini dapat diakses dari modul `webContents`:

```javascript
const {webContents} = require('electron') console.log(webContents)
```

### `webContents.getAllWebContents()`

`[WebContents]` - mengembalikan array dari semua contoh `WebContents`. Ini akan berisi isi web untuk semua windows, webviews, devtools dibuka, dan devtools ekstensi latar belakang halaman.

### `webContents.getFocusedWebContents()`

Kembali `WebContents` - isi web yang terfokus dalam aplikasi ini, jika tidak kembali `null`.

### `webContents.fromId(id)`

* `id` Integer

Mengembalikan `WebContents` - Contoh WebContents dengan ID yang diberikan.

## Kelas: WebKontes

> Membuat dan mengontrol isi sebuah instance BrowserWindow.

Proses: [utama](../glossary.md#main-process)

### Perihal contoh

#### Event: 'Apakah-selesai-load'

Dibunyikan apabila navigasi dilakukan, yakni pemintal tab telah berhenti berputar dan acara `onload` dikirim.

#### Event: 'Apakah-gagal-load'

Kembali:

* `peristiwa` Peristiwa
* `errorCode` Bilangan bulat
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

Acara ini seperti `Apakah-selesai-beban` tapi dipancarkan ketika beban gagal atau dibatalkan, misalnya `window.stop()` dipanggil. Daftar lengkap kode galat dan makna mereka tersedia [di sini](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

#### Event: 'Apakah-frame-selesai-load'

Pengembalian:

* `peristiwa` Peristiwa
* `isMainFrame` Boolean

Dibunyikan apabila bingkai telah melakukan navigasi.

#### Event: 'Apakah-mulai-loading'

Sesuai dengan poin pada saat pemintal tab berhenti berputar.

#### Event: 'Apakah-stop-loading'

Sesuai dengan poin pada saat pemintal tab berhenti berputar.

#### Event: 'Apakah-mendapatkan-tanggapan-rincian'

Kembali:

* `acara` Acara
* `status` Boolean
* `newURL` String
* `originalURL` String
* `httpResponseCode` Integer
* `requestMethod` String
* `pengarah` String
* `headers` Obyek
* `Jenissumberdaya` String

Emitted ketika rincian tentang sumber daya yang diminta tersedia. `status` menunjukkan koneksi soket untuk mendownload sumber daya.

#### Event: 'apakah-mendapatkan-redirect-permintaan'

Pengembalian:

* `event` Acara
* `oldURL` String
* `newURL` String
* `isMainFrame` Boolean
* `httpResponseCode` Integer
* `requestMethod` String
* `pengarah` String
* `headers` Obyek

Emitted ketika redirect diterima saat meminta resource.

#### Event: 'dom-siap'

Pengembalian:

* `event` Acara

Emitted saat dokumen dalam bingkai yang diberikan dimuat.

#### Event: 'halaman-favicon-updated '

Pengembalian:

* ` event </ 0>  Acara</li>
<li><code>FAVICONS` String [] - serangkaian URL

Dibunyikan saat halaman menerima url favicon.

#### Event: 'baru-jendela'

Pengembalian:

* ` event </ 0>  Acara</li>
<li><code> url </ 0>  String</li>
<li><code>frameName` String
* `disposisi` String - dapat `default`, `latar depan-tab`, `latar belakang-tab`, `jendela baru`, `Simpan ke disk` dan `lainnya`.
* `pilihan` Objek - pilihan yang akan digunakan untuk menciptakan baru `BrowserWindow`.
* `additionalFeatures` String [] - fitur non-standar (fitur tidak ditangani oleh Kromium atau elektron) diberikan kepada `window.open()`.

Dibunyikan apabila halaman yang permintaan untuk membuka jendela baru `url`. Itu bisa saja diminta oleh `window.open` atau link eksternal seperti `<a target='_blank'>`.

Secara default baru `BrowserWindow` akan diciptakan untuk `url`.

Memanggil `event.preventDefault()` akan mencegah elektron dari secara otomatis menciptakan baru `BrowserWindow`. Jika Anda menelepon `event.preventDefault()` dan manual membuat baru `BrowserWindow` maka Anda harus mengatur `event.newGuest` ke referensi contoh `BrowserWindow` baru, gagal untuk melakukannya dapat mengakibatkan perilaku tak terduga. Sebagai contoh:

```javascript
myBrowserWindow.webContents.on ('window baru ', (acara, url) = > {event.preventDefault() const menang = baru BrowserWindow({show: false}) win.once (' siap-untuk-menunjukkan ', () = > win.show()) win.loadURL(url) event.newGuest = menang})
```

#### Event: 'akan navigasi'

Pengembalian:

* ` event </ 0>  Acara</li>
<li><code> url </ 0>  String</li>
</ul>

<p>Emitted when a user or the page wants to start navigation. It can happen when
the <code>window.location` object is changed or a user clicks a link in the page.</p> 
  Acara ini tidak akan memancarkan saat navigasi dimulai secara pemrograman API seperti `webContents.loadURL` dan `webContents.back`.
  
  Itu juga tidak dibunyikan untuk navigations di halaman, seperti mengklik anchor link atau memperbarui `window.location.hash`. Menggunakan acara `melakukan-menavigasi-di Halaman` untuk tujuan ini.
  
  Memanggil `event.preventDefault()` akan mencegah navigasi.
  
  #### Event: 'melakukan navigasi'
  
  Pengembalian:
  
  * ` event </ 0>  Acara</li>
<li><code> url </ 0>  String</li>
</ul>

<p>Dibunyikan apabila navigasi dilakukan.</p>

<p>Acara ini tidak dibunyikan untuk navigations di halaman, seperti mengklik anchor link atau memperbarui <code>window.location.hash`. Menggunakan acara `melakukan-menavigasi-di Halaman` untuk tujuan ini.</p> 
    #### Event: 'Apakah-menavigasi-di halaman'
    
    Pengembalian:
    
    * ` event </ 0>  Acara</li>
<li><code> url </ 0>  String</li>
<li><code>isMainFrame` Boolean
    
    Dibunyikan saat navigasi dalam halaman terjadi.
    
    Saat navigasi dalam halaman terjadi, perubahan URL halaman tidak menyebabkan navigasi di luar halaman. Contoh dari hal ini adalah ketika jangkar link diklik atau saat event hash `hashchange` dipicu.
    
    #### Event: 'akan-mencegah-membongkar'
    
    Pengembalian:
    
    * ` event </ 0>  Acara</li>
</ul>

<p>Dibunyikan apabila <code>beforeunload` event handler adalah mencoba untuk membatalkan halaman membongkar.</p> 
      Memanggil `event.preventDefault()` akan mengabaikan `beforeunload` event handler dan memungkinkan halaman harus dibongkar.
      
      ```javascript
const {BrowserWindow, dialog} = require ('electron') const win = new BrowserWindow ({width: 800, height: 600}) win.webContents.on ('akan-mencegah-membongkar', (event) = > { const choice = dialog.showMessageBox (menang, {type: 'question', buttons: ['Leave', 'Stay'], title: 'Apakah Anda ingin meninggalkan situs ini?', pesan: 'Perubahan yang Anda buat mungkin tidak disimpan. ', defaultId: 0, cancelId: 1}) const leave = (pilihan === 0) if (leave) {event.preventDefault ()}})
```
  
  #### Event: 'jatuh'
  
  Pengembalian:
  
  * ` event </ 0>  Acara</li>
<li><code> terbunuh </ 0>  Boolean</li>
</ul>

<p>Emitted ketika proses renderer crash atau terbunuh.</p>

<h4>Event: 'plugin-jatuh'</h4>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code> nama </ 0>  String</li>
<li><code>Versi` String
  
  Dibunyikan ketika proses plugin telah jatuh.
  
  #### Event: 'menghancurkan'
  
  Dibunyikan apabila `webContents` dihancurkan.
  
  #### Acara: 'sebelum-masukan-event'
  
  Pengembalian:
  
  * ` event </ 0>  Acara</li>
<li><code>masukan` Obyek - Input properti 
    * `jenis` String - baik `keyUp` atau `keyDown`
    * `kunci` String - setara dengan [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
    * `kode` String - setara dengan [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
    * `isAutoRepeat` Boolean - setara dengan [KeyboardEvent.repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
    * `pergeseran` Boolean - setara dengan [KeyboardEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
    * `kontrol` Boolean - setara dengan [KeyboardEvent.controlKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
    * `Alt` Boolean - setara dengan [KeyboardEvent.altKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
    * `meta` Boolean - setara dengan [KeyboardEvent.metaKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
  
  Dipancarkan sebelum membuat acara `keydown` dan `keyup` di halaman. Memanggil `event.preventDefault` akan mencegah halaman `keydown` / `keyup` peristiwa dan menu cara pintas.
  
  Untuk hanya mencegah menu cara pintas, menggunakan [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcuts):
  
  ```javascript
const {BrowserWindow} = require ('electron') 

misalkan win = new BrowserWindow ({width: 800, height: 600}) 

win.webContents.on ('before-input-event', (event, input) => { // Sebagai contoh, aktifkan pintasan keyboard menu aplikasi saat // Ctrl/Cmd sedang down.
  win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Event: 'devtools-dibuka'

Emitted saat DevTools dibuka.

#### Event: 'devtools-ditutup'

Emitted saat DevTools ditutup.

#### Event: 'fokus devtools'

Emitted saat DevTools difokuskan / dibuka.

#### Acara : 'sertifikat-kesalahan'

Pengembalian:

* ` event </ 0>  Acara</li>
<li><code> url </ 0>  String</li>
<li><code> error </ 0>  String - Kode kesalahan</li>
<li><code> sertifikat </ 0>  <a href="structures/certificate.md"> Sertifikat </ 1></li>
<li><code>callback` Fungsi 
  * `Terpercaya` Boolean -Menunjukkan apakah sertifikat bisa dianggap terpercaya

Emitted ketika gagal untuk memverifikasi `sertifikat` untuk `url`.

Penggunaannya sama dengan [the `certificate-error` event of `app`](app.md#event-certificate-error).

#### Acara : 'pilih-klien-sertifikat'

Pengembalian:

* ` event </ 0>  Acara</li>
<li><code> url </ 0> URL</li>
<li><code> certificateList </ 0>  <a href="structures/certificate.md"> Sertifikat [] </ 1></li>
<li><code>callback` Fungsi 
  * `sertifikat` [Sertifikat](structures/certificate.md) - Harus berupa sertifikat dari daftar yang diberikan

Emitted ketika sertifikat klien diminta.

Penggunaannya sama dengan [the `pilih-sertifikat-klien` acara `app`](app.md#event-select-client-certificate).

#### Acara : 'login'

Pengembalian:

* ` event </ 0>  Acara</li>
<li><code>permintaan` Obyek 
  * ` method </ 0>  String</li>
<li><code> url </ 0> URL</li>
<li><code> perujuk </ 0> URL</li>
</ul></li>
<li><code>authInfo` Obyek 
    * ` isProxy </ 0>  Boolean</li>
<li><code> skema </ 0>  String</li>
<li><code> host </ 0>  String</li>
<li><code> port </ 0>  Integer</li>
<li><code> realm </ 0>  String</li>
</ul></li>
<li><code>callback` Fungsi 
      * ` nama pengguna </ 0>  String</li>
<li><code> kata sandi </ 0>  String</li>
</ul></li>
</ul>

<p>Emitted ketika <code> webContents </ 0> ingin melakukan auth dasar.</p>

<p>Penggunaannya sama dengan <a href="app.md#event-login">the <code>masuk` event of `app`</a>.</p> 
        #### Event: 'ditemukan-di-halaman'
        
        Pengembalian:
        
        * ` event </ 0>  Acara</li>
<li><code>hasil` Obyek 
          * `requestId` Bilangan bulat
          * `activeMatchOrdinal` Bulat - posisi pertandingan aktif.
          * `pertandingan` Bulat - jumlah pertandingan.
          * `selectionArea` Objek - koordinat pertama pertandingan wilayah.
          * `finalUpdate` Boolean
        
        Dipancarkan saat hasilnya tersedia [`webContents.findInPage`] permintaan.
        
        #### Event: 'media-mulai-bermain''
        
        Emitted saat media mulai diputar.
        
        #### Event: 'media-berhenti'
        
        Emitted saat media dijeda atau dilakukan bermain.
        
        #### Event: 'apakah-ganti-tema-warna'
        
        Emitted ketika warna tema halaman berubah. Hal ini biasanya karena bertemu sebuah meta tag:
        
        ```html
<meta name='theme-color' content='#ff0000'>
```
    
    #### Event: 'update-target-url'
    
    Pengembalian:
    
    * ` event </ 0>  Acara</li>
<li><code> url </ 0>  String</li>
</ul>

<p>Emitted saat mouse bergerak di atas sebuah link atau keyboard memindahkan fokus ke sebuah link.</p>

<h4>Event: 'kursor-berubah'</h4>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code>jenis` String
    * `gambar` NativeImage (opsional)
    * `skala` Mengambang (opsional) - skala faktor untuk kursor kustom
    * `ukuran` [Ukuran](structures/size.md) (opsional) - ukuran `gambar`
    * `hotspot` [Titik](structures/point.md) (opsional) - koordinat kursor kustom Hotspot
    
    Emitted saat tipe kursor berubah. The `type` parameter can be `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing`, `custom`.
    
    Jika `jenis` parameternya `custom`, itu `gambar` Parameter akan menahan custom gambar kursor dalam `GambarAsli`, dan `skala`, `size` and `hotspot` akan memegang informasi tambahan tentang kursor khusus.
    
    #### Event: 'menu konteks'
    
    Pengembalian:
    
    * ` event </ 0>  Acara</li>
<li><code>params` Obyek 
      * `x` koordinat Integer - x
      * ` y </ 0>  Koordinat integer</li>
<li><code> linkURL </ 0>  String - URL tautan yang membungkus node menu konteks dipanggil.</li>
<li><code> linkText </ 0>  String - Teks yang terkait dengan tautan. Mungkin berupa string kosong
 jika isi link adalah gambar.</li>
<li><code> pageURL ` String - URL halaman tingkat atas yang diikuti menu konteks.
      * `frameURL` String - URL subframe yang diikuti menu konteks.
      * `srcURL` String - URL Sumber untuk elemen yang menu konteksnya dipanggil. Elemen dengan URL sumber adalah gambar, audio dan video.
      * `mediaType` String - jenis node menu konteks dipanggil pada. Bisa `none`, ` gambar`, `audio`, `video`, `kanvas`, `file` atau `plugin`.
      * `hasImageContents` Boolean - Apakah menu konteks dipanggil pada gambar yang isinya tidak kosong.
      * `isEditable` Boolean - Apakah konteks dapat diedit.
      * `selectionText` String - Teks pilihan bahwa menu konteks dipanggil.
      * `titleText` String - Judul atau teks alt dari pilihan yang konteksnya dipanggil.
      * `salah eja` String - Kata salah eja di bawah kursor, jika ada.
      * `frameCharset` String - Pengkodean karakter dari bingkai tempat menu dipanggil.
      * `inputFieldType` String - Jika menu konteks dipanggil pada bidang masukan, jenis bidang itu. Nilai yang mungkin adalah `tidak ada` `plainText`, `sandi`, `lain`.
      * `menuSourceType` String - sumber Input yang dipanggil menu konteks. Bisa `tidak`, `mouse`, `keyboard`, `menyentuh`, `touchMenu`.
      * `mediaFlags` Objek - Bendera untuk elemen media menu konteksnya dipanggil di. 
        * `inError` Boolean - Apakah elemen media telah jatuh.
        * `isPaused` Boolean - Apakah elemen media dijeda.
        * `isMuted` Boolean - Apakah elemen media dimatikan.
        * `hasAudio` Boolean - Apakah elemen media memiliki audio.
        * `isLooping` Boolean - Apakah elemen media adalah perulangan.
        * `isControlsVisible` Boolean - Apakah kontrol elemen media terlihat.
        * `canToggleControls` Boolean - Apakah kontrol elemen media dapat dialihkan.
        * `canRotate` Boolean - Apakah elemen media dapat diputar.
      * `editFlags` Objek - Bendera ini menunjukkan apakah penyair mempercayainya mampu melakukan tindakan yang sesuai. 
        * `canUndo` Boolean - Apakah renderer percaya itu dapat membatalkan.
        * `canRedo` Boolean - Apakah renderer percaya itu dapat mengulang.
        * `canCut` Boolean - Apakah renderer percaya dapat memotong.
        * `canCopy` Boolean - Apakah renderer percaya itu dapat menyalin
        * `canPaste` Boolean - Apakah renderer percaya itu dapat menyisipkan.
        * `canDelete` Boolean - Apakah renderer percaya itu dapat menghapus.
        * `canSelectAll` Boolean - Apakah renderer percaya itu dapat memilih semua.
    
    Emitted saat ada menu konteks baru yang perlu ditangani.
    
    #### Event: 'Pilih--perangkat bluetooth'
    
    Pengembalian:
    
    * ` event </ 0>  Acara</li>
<li><code>perangkat` [[BluetoothDevice]](structures/bluetooth-device.md)
    * `callback` Fungsi 
      * `deviceId` String
    
    Dipancarkan saat perangkat bluetooth perlu dipilih saat dihubungi `navigator.bluetooth.requestDevice`. Menggunakan `navigator.bluetooth` api `webBluetooth` harus diaktifkan. Jika `event.preventDefault` tidak disebut, perangkat tersedia pertama akan dipilih. `callback` harus disebut dengan `deviceId` untuk dipilih, melewati string kosong ke `callback` akan membatalkan permintaan.
    
    ```javascript
const {app, webContents} = require('electron') app.commandLine.appendSwitch('enable-web-bluetooth') app.on ('siap', () = > {webContents.on (' perangkat pilih bluetooth', (acara, deviceList, callback) = > {event.preventDefault() membiarkan hasil = deviceList.find((device) = > {kembali device.deviceName === 'test'}) jika (! hasil) {callback('')} lain {callback(result.deviceId)}})})
```

#### Event: 'cat'

Pengembalian:

* ` event </ 0>  Acara</li>
<li><code>dirtyRect` [Persegi panjang](structures/rectangle.md)
* `gambar` [NativeImage](native-image.md) - Data gambar dari keseluruhan frame.

Emitted ketika bingkai baru dihasilkan. Hanya area kotor yang dilewati di penyangga.

```javascript
const {BrowserWindow} = require('electron') membiarkan memenangkan = BrowserWindow baru ({webPreferences: {offscreen: true}}) win.webContents.on ('cat', (acara, kotor, gambar) = > {/ / updateBitmap (kotor, image.getBitmap())}) win.loadURL ('http://github.com')
```

#### Event: 'devtools-reload-halaman'

Dibunyikan apabila jendela devtools memerintahkan webContents untuk reload

#### Event: 'akan-melampirkan-webview'

Pengembalian:

* ` event </ 0>  Acara</li>
<li><code>webPreferences` Objek - preferensi web yang akan digunakan oleh semua halaman. Objek ini dapat dimodifikasi untuk menyesuaikan preferensi untuk semua halaman.
* `params` Obyek - `<webview>`parameter lain seperti `src` URL. Objek ini dapat dimodifikasi untuk menyesuaikan parameter halaman tamu.

Dipancarkan ketika `<webview>`isi web yang melekat pada isi web ini. Memanggil `event.preventDefault()` akan menghancurkan semua halaman.

Acara ini dapat digunakan untuk mengkonfigurasi `webPreferences` untuk `webContents` dari `<webview>`sebelum dimuat, dan menyediakan kemampuan untuk mengatur pengaturan yang tidak dapat diatur melalui `<webview>`atribut.

**Catatan:** Opsi script tertentu `preload` akan muncul sebagai `preloadURL` (tidak `preload`) di objek `webPreferences` yang dipancarkan dengan acara ini.

### Metode Instance

#### `contents.loadURL (url [, opsi])`

* ` url </ 0>  String</li>
<li><code>pilihan` Objek (opsional) 
  * `httpReferrer` String (opsional) - url perujuk HTTP.
  * `userAgent` String (opsional) - agen pengguna berasal permintaan.
  * `extraHeaders` String (opsional) - header tambahan yang dipisahkan oleh "\n"
  * `postData` ([[UploadRawData]](structures/upload-raw-data.md) | [[UploadFile]](structures/upload-file.md) | [[UploadFileSystem]](structures/upload-file-system.md) | [[UploadBlob]](structures/upload-blob.md)) -(opsional)
  * `baseURLForDataURL` String (opsional) - url dasar (dengan trailing pemisah path) untuk file yang akan diambil oleh data url. Hal ini diperlukan hanya jika ditentukan `url` data url dan perlu memuat file lainnya.

Beban `url` di jendela. `Url` harus mengandung prefiks protokol, misalnya `http://` atau `file://`. Jika beban harus mem-bypass http cache kemudian menggunakan `pragma` header untuk mencapainya.

```javascript
const {webContents} = require('electron') opsi const = {extraHeaders: ' pragma: no-cache\n'} webContents.loadURL ('https://github.com', opsi)
```

#### `contents.downloadURL(url)`

* ` url </ 0>  String</li>
</ul>

<p>Memulai download dari sumber daya di <code>url` tanpa menavigasi. Acara `akan-download` `sesi` akan dipicu.</p> 
  #### `contents.getURL()`
  
  Mengembalikan `String` - URL laman web saat ini.
  
  ```javascript
const {BrowserWindow} = require('electron') membiarkan memenangkan = baru BrowserWindow({width: 800, height: 600}) win.loadURL ('http://github.com') Biarkan currentURL = win.webContents.getURL() console.log(currentURL)
```

#### `contents.getTitle()`

Mengembalikan `String` - judul halaman web sekarang.

#### `contents.isDestroyed()`

Kembali `Boolean` - Apakah halaman web dihancurkan.

#### `contents.Focus()`

Berfokus halaman web.

#### `contents.isFocused()`

Kembali `Boolean` - Apakah halaman web yang terfokus.

#### `contents.isLoading()`

Kembali `Boolean` - Apakah halaman web masih sedang loading sumber daya.

#### `contents.isLoadingMainFrame()`

Kembali `Boolean` - Apakah bingkai utama (dan bukan hanya iframes atau bingkai di dalamnya) masih sedang loading.

#### `contents.isWaitingForResponse()`

Mengembalikan `Boolean` - Apakah halaman web menunggu tanggapan pertama dari utama sumber halaman.

#### `contents.stop()`

Menghentikan navigasi yang tertunda.

#### `contents.reload()`

Muat ulang halaman web saat ini.

#### `contents.reloadIgnoringCache()`

Muat ulang halaman ini dan mengabaikan cache.

#### `contents.canGoBack()`

Mengembalikan `Boolean` - Apakah browser dapat kembali ke halaman web sebelumnya.

#### `contents.canGoForward()`

Mengembalikan `Boolean` - Apakah browser dapat maju ke halaman web berikutnya.

#### `contents.canGoToOffset(offset)`

* `offset` Integer

Mengembalikan `Boolean` - Apakah halaman web bisa masuk ke `offset`.

#### `contents.clearHistory()`

Menghapus sejarah navigasi.

#### `isi.goBack()`

Membuat browser kembali menjadi halaman web.

#### `contents.goForward()`

Membuat browser maju ke depan halaman web.

#### `contents.goToIndex(indeks)`

* `indeks` Integer

Menavigasi browser ke indeks halaman web absolut yang ditentukan.

#### `contents.goToOffset (offset)`

* `offset` Integer

Arahkan ke offset yang ditentukan dari "entri saat ini".

#### `contents.isCrashed()`

Mengembalikan `Boolean` - Apakah proses renderer telah jatuh.

#### `contents.setUserAgent (userAgent)`

* `userAgent` String

Mengganti agen pengguna untuk halaman web ini.

#### `contents.getUserAgent()`

Mengembalikan `String` - Agen pengguna untuk halaman web ini.

#### `isi.insertCSS(css)`

* `css` String

Menyuntikkan CSS ke dalam halaman web saat ini.

#### `contents.executeJavaScript(kode[, userGesture, callback])`

* ` kode </ 0> String</li>
<li><code>userGesture` Boolean (opsional) - Default adalah `false`.
* `panggilan balik` Fungsi (opsional) - Dipanggil setelah script telah dieksekusi. 
  * `result` Any

Mengembalikan `Janji` - Janji yang diselesaikan dengan hasil kode yang dijalankan atau ditolak jika hasil dari kode tersebut adalah janji yang ditolak.

Evaluasi `kode` di halaman.

Di jendela browser beberapa API HTML seperti `requestFullScreen` hanya bisa dipanggil oleh isyarat dari pengguna. Setting `userGesture` ke `true` akan dihapus keterbatasan ini.

Jika hasil dari kode yang dieksekusi adalah janji maka hasil callback akan menjadi terselesaikan nilai dari janji. Sebaiknya gunakan Janji yang dikembalikan untuk menangani kode yang menghasilkan Janji.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

#### `contents.setIgnoreMenuShortcuts (abaikan)` * Eksperimental*

* `abaikan` Boolean

Abaikan shortcut menu aplikasi sementara konten web ini difokuskan.

#### `contents.setAudioMuted(dibungkam)`

* `dibungkam` Boolean

Sesuaikan render halaman web saat ini.

#### `isi.isAudioMuted()`

Mengembalikan `Boolean` - Apakah halaman ini telah dibungkam.

#### `contents.setZoomFactor(faktor)`

* `faktor` Angka - Faktor zoom.

Mengubah faktor pembesaran ke faktor yang ditentukan. Faktor zoom adalah zoom persen dibagi dengan 100, sehingga 300% = 3,0.

#### `contents.getZoomFactor(callback)`

* `callback` Fungsi 
  * `zoomFactor` Number

Sends a request to get current zoom factor, the `callback` will be called with `callback(zoomFactor)`.

#### `contents.setZoomLevel(level)`

* `tingkat` Nomor - tingkat Zoom

Mengubah tingkat zoom ke tingkat tertentu. Ukuran aslinya adalah 0 dan masing-masing Peningkatan atas atau di bawah mewakili zoom 20% lebih besar atau lebih kecil ke default batas 300% dan 50% dari ukuran aslinya, berurutan.

#### `contents.getZoomLevel(callback)`

* `panggilan balik` Fungsi 
  * `zoomLevel` Number

Mengirimkan permintaan untuk mendapatkan tingkat pembesaran saat ini, panggilan balik ` `akan dipanggil dengan `callback(zoomLevel)`.

#### `contents.setZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

**Deprecated:** Call `setVisualZoomLevelLimits` instead to set the visual zoom level limits. This method will be removed in Electron 2.0.

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Menetapkan maksimum dan minimum tingkat mencubit-to-zoom.

#### `contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Menetapkan tingkat zoom maksimal dan minimal berbasis tata letak (yaitu bukan-visual).

#### `contents.undo()`

Executes the editing command `undo` in web page.

#### `contents.redo()`

Executes the editing command `redo` in web page.

#### `contents.cut()`

Executes the editing command `cut` in web page.

#### `contents.copy()`

Jalankan perintah pengeditan `copy` di halaman web.

#### `contents.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Salin gambar pada posisi yang diberikan ke clipboard.

#### `contents.paste()`

Jalankan perintah pengeditan `paste` di halaman web.

#### `contents.pasteAndMatchStyle()`

Executes the editing command `pasteAndMatchStyle` in web page.

#### `contents.delete()`

Executes the editing command `delete` in web page.

#### `contents.selectAll()`

Executes the editing command `selectAll` in web page.

#### `contents.unselect()`

Executes the editing command `unselect` in web page.

#### `contents.replace(text)`

* `text` String

Executes the editing command `replace` in web page.

#### `contents.replaceMisspelling(text)`

* `text` String

Executes the editing command `replaceMisspelling` in web page.

#### `contents.insertText(text)`

* `text` String

Inserts `text` to the focused element.

#### `contents.findInPage(text[, options])`

* `text` String - Content to be searched, must not be empty.
* `pilihan` Objek (opsional) 
  * `forward` Boolean - (optional) Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean - (opsional) Apakah operasi tersebut merupakan permintaan pertama atau tindak lanjut, default ke `false`.
  * `matchCase` Boolean - (opsional) Apakah pencarian harus sensitif huruf, default ke `false`.
  * `wordStart` Boolean - (opsional) Baik untuk melihat hanya pada awal kata-kata. default ke `false`.
  * `medialCapitalAsWordStart` Boolean - (opsional) Bila digabungkan dengan `wordStart`, menerima sebuah pertandingan di tengah sebuah kata jika pertandingan dimulai dengan sebuah huruf besar diikuti huruf kecil atau huruf non. Menerima beberapa kecocokan intra-kata lainnya, defaultnya adalah `false`.

Starts a request to find all matches for the `text` in the web page and returns an `Integer` representing the request id used for the request. The result of the request can be obtained by subscribing to [`found-in-page`](web-contents.md#event-found-in-page) event.

#### `contents.stopFindInPage(tindakan)`

* `tindakan` String - Menentukan tindakan yang akan dilakukan saat diakhiri [`webContents.findInPage`] request. 
  * `clearSelection` - jelas pilihan.
  * `keepSelection` - menerjemahkan pemilihan menjadi sebuah pilihan yang normal.
  * `activateSelection` - fokus dan klik seleksi simpul.

Berhenti setiap permintaan `findInPage` untuk `webContents` dengan disediakan `tindakan`.

```javascript
const {webContents} = require('electron') webContents.on (' ditemukan-di-halaman ', (acara, hasil) = > {jika webContents.stopFindInPage('clearSelection') (result.finalUpdate)}) const requestId = webContents.findInPage('api') console.log(requestId)
```

#### `contents.capturePage ([rect,] callback)`

* `rect` [Persegi panjang](structures/rectangle.md) (opsional) - daerah halaman untuk ditangkap
* `callback` Fungsi 
  * ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
</ul></li>
</ul>

<p>Menangkap sebuah snapshot dari halaman dalam <code>rect`. Setelah menyelesaikan `callback` yang akan disebut dengan `callback(image)`. `Gambar` adalah instance dari [NativeImage](native-image.md) yang menyimpan data dari snapshot. Menghilangkan `rect` akan menangkap halaman seluruh terlihat.</p> 
    #### `isi.hasServiceWorker(callback)`
    
    * `callback` Fungsi 
      * `hasWorker` Boolean
    
    Memeriksa apakah ada ServiceWorker yang terdaftar dan mengembalikan boolean sebagai respon terhadap `callback`.
    
    #### `contents.unregisterServiceWorker(callback)`
    
    * `callback` Fungsi 
      * `success` Boolean
    
    Unregisters ServiceWorker jika ada dan mengembalikan boolean sebagai respon terhadap `callback` ketika janji JS terpenuhi atau salah saat janji JS ditolak.
    
    #### `contents.getPrinters()`
    
    Get the system printer list.
    
    Returns [`PrinterInfo[]`](structures/printer-info.md)
    
    #### `contents.print([options])`
    
    * `pilihan` Objek (opsional) 
      * `diam` Boolean (opsional) - Jangan tanya pengguna untuk pengaturan cetak. Defaultnya adalah `false`.
      * `printBackground` Boolean (opsional) - Juga mencetak warna latar belakang dan gambar halaman web Defaultnya adalah `false`.
      * `deviceName` String (opsional) - Tetapkan nama perangkat printer yang akan digunakan. Defaultnya adalah `''`.
    
    Mencetak halaman web jendela. Bila `diam` diatur ke `true`, Elektron akan memilih printer default sistem jika `deviceName` kosong dan pengaturan default untuk dicetak.
    
    Calling `window.print()` in web page is equivalent to calling `webContents.print({silent: false, printBackground: false, deviceName: ''})`.
    
    Gunakan `halaman-break-before: always;` Gaya CSS untuk memaksa mencetak ke halaman baru.
    
    #### `contents.printToPDF(pilihan, callback)`
    
    * `pilihan` Obyek 
      * `marginType` Integer - (opsional) Menentukan jenis margin yang akan digunakan. Menggunakan 0 untuk margin default, 1 tanpa margin, dan 2 untuk margin minimum.
      * `pageSize` String - (opsional) Tentukan ukuran halaman PDF yang dihasilkan. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
      * `printBackground` Boolean - (opsional) Baik untuk mencetak latar belakang CSS.
      * `printSelectionOnly` Boolean - (opsional) Baik untuk mencetak pilihan saja.
      * `landscape` Boolean - (opsional) `true` untuk landscape, `false` untuk potret.
    * `callback` Fungsi 
      * ` error </ 0> Kesalahan</li>
<li><code>data` Buffer
    
    Mencetak halaman web jendela sebagai PDF dengan custom printing preview Chromium pengaturan.
    
    The `callback` akan dipanggil dengan ` callback (error, data)` saat selesai. Itu `data` adalah `Buffer` yang berisi data PDF yang dihasilkan.
    
    The `landscape` will be ignored if `@page` CSS at-rule is used in the web page.
    
    By default, an empty `options` will be regarded as:
    
    ```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false
}
```

Gunakan `halaman-break-before: always;` Gaya CSS untuk memaksa mencetak ke halaman baru.

An example of `webContents.printToPDF`:

```javascript
const {BrowserWindow} = require('electron')
const fs = require('fs')

let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}, (error, data) => {
    if (error) throw error
    fs.writeFile('/tmp/print.pdf', data, (error) => {
      if (error) throw error
      console.log('Write PDF successfully.')
    })
  })
})
```

#### `contents.addWorkSpace(path)`

* ` path </ 0>  String</li>
</ul>

<p>Adds the specified path to DevTools workspace. Must be used after DevTools
creation:</p>

<pre><code class="javascript">const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.webContents.on('devtools-opened', () => {
  win.webContents.addWorkSpace(__dirname)
})
`</pre> 
  #### `contents.removeWorkSpace(path)`
  
  * ` path </ 0>  String</li>
</ul>

<p>Menghapus jalur yang ditentukan dari ruang kerja DevTools.</p>

<h4><code>contents.openDevTools([options])`</h4> 
    * `pilihan` Objek (opsional) 
      * `mode` String - Opens the devtools with specified dock state, can be `right`, `bottom`, `undocked`, `detach`. Defaults to last used dock state. In `undocked` mode it's possible to dock back. In `detach` mode it's not.
    
    Opens the devtools.
    
    #### `contents.closeDevTools()`
    
    Closes the devtools.
    
    #### `contents.isDevToolsOpened()`
    
    Returns `Boolean` - Whether the devtools is opened.
    
    #### `contents.isDevToolsFocused()`
    
    Returns `Boolean` - Whether the devtools view is focused .
    
    #### `contents.toggleDevTools()`
    
    Toggles the developer tools.
    
    #### `contents.inspectElement (x, y)`
    
    * `x` Integer
    * `y` Integer
    
    Mulai memeriksa elemen pada posisi (`x`, `y`).
    
    #### `contents.inspectServiceWorker()`
    
    Opens the developer tools for the service worker context.
    
    #### `contents.send(channel[, arg1][, arg2][, ...])`
    
    * ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p>Kirim pesan asinkron ke proses renderer melalui <code>channel`, Anda juga bisa mengirim argumen sewenang wenang. Argumen akan diserialkan di JSON secara internal dan karenanya tidak ada fungsi atau rantai prototipe yang akan disertakan.</p> 
      The renderer process can handle the message by listening to `channel` with the `ipcRenderer` module.
      
      Contoh pengiriman pesan dari proses utama ke proses renderer:
      
      ```javascript
// Dalam proses utamanya.
const {app, BrowserWindow} = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', 'whoooooooh!')
  })
})
```
  
  ```html
<!-- index.html -->
<html>
<body>
  <script>
    require('electron').ipcRenderer.on('ping', (event, message) => {
      console.log(message)  // Prints 'whoooooooh!'
    })
  </script>
</body>
</html>
```

#### `contents.enableDeviceEmulation(parameters)`

* `parameters` Obyek 
  * `screenPosition` String - Specify the screen type to emulate (default: `Desktop`) 
    * `desktop` - Desktop screen type
    * `mobile` - Mobile screen type
  * `screenSize` [Size](structures/size.md) - Set the emulated screen size (screenPosition == mobile)
  * `viewPosition` [Point](structures/point.md) - Position the view on the screen (screenPosition == mobile) (default: `{x: 0, y: 0}`)
  * `deviceScaleFactor` Integer - Set the device scale factor (if zero defaults to original device scale factor) (default: ``)
  * `viewSize` [Size](structures/size.md) - Set the emulated view size (empty means no override)
  * `fitToView` Boolean - Whether emulated view should be scaled down if necessary to fit into available space (default: `false`)
  * `offset` [Point](structures/point.md) - Offset of the emulated view inside available space (not in fit to view mode) (default: `{x: 0, y: 0}`)
  * `scale` Float - Scale of emulated view inside available space (not in fit to view mode) (default: `1`)

Aktifkan emulasi perangkat dengan parameter yang diberikan.

#### `contents.disableDeviceEmulation()`

Disable device emulation enabled by `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(event)`

* `peristiwa` Obyek 
  * `type` String (**required**) - The type of the event, can be `mouseDown`, `mouseUp`, `mouseEnter`, `mouseLeave`, `contextMenu`, `mouseWheel`, `mouseMove`, `keyDown`, `keyUp`, `char`.
  * `modifiers` String[] - An array of modifiers of the event, can include `shift`, `control`, `alt`, `meta`, `isKeypad`, `isAutoRepeat`, `leftButtonDown`, `middleButtonDown`, `rightButtonDown`, `capsLock`, `numLock`, `left`, `right`.

Sends an input `event` to the page. **Note:** The `BrowserWindow` containing the contents needs to be focused for `sendInputEvent()` to work.

For keyboard events, the `event` object also have following properties:

* `keyCode` String (**required**) - The character that will be sent as the keyboard event. Should only use the valid key codes in [Accelerator](accelerator.md).

For mouse events, the `event` object also have following properties:

* `x` Integer (**required**)
* `y` Integer (**required**)
* `button` String - The button pressed, can be `left`, `middle`, `right`
* `globalX` Integer
* `globalY` Integer
* `movementX` Integer
* `movementY` Integer
* `clickCount` Integer

For the `mouseWheel` event, the `event` object also have following properties:

* `deltaX` Integer
* `deltaY` Integer
* `wheelTicksX` Integer
* `wheelTicksY` Integer
* `accelerationRatioX` Integer
* `accelerationRatioY` Integer
* `hasPreciseScrollingDeltas` Boolean
* `canScroll` Boolean
#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (optional) - Defaults to `false`
* `callback` Fungsi 
  * `frameBuffer` Buffer
  * `dirtyRect` [Persegi panjang](structures/rectangle.md)

Mulailah berlangganan untuk acara presentasi dan bingkai yang diambil, `callback` akan dipanggil dengan `callback(frameBuffer, dirtyRect)` bila ada acara presentasi.

The `frameBuffer` is a `Buffer` that contains raw pixel data. Pada kebanyakan mesin, data pixel secara efektif disimpan dalam format BGRA 32bit, namun sebenarnya Representasi tergantung pada endianitas prosesor (paling modern Prosesornya sedikit-endian, pada mesin dengan prosesor big-endian data ada dalam format ARGB 32bit).

The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. Jika `onlyDirty` diatur ke `true`, `frameBuffer` akan hanya berisi daerah repainted. `onlyDirty` default ke `false`.

#### `contents.endFrameSubscription()`

Akhiri berlangganan untuk presentasi peristiwa.

#### `contents.startDrag(item)`

* `item` Obyek 
  * `file` String or `files` Array - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) - The image must be non-empty on macOS.

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.

#### `contents.savePage(fullPath, saveType, callback)`

* `fullPath` String - The full file path.
* `saveType` String - Specify the save type. 
  * `HTMLOnly` - Save only the HTML of the page.
  * `HTMLComplete` - Save complete-html page.
  * `MHTML` - Save complete-html page as MHTML.
* `callback` Function - `(error) => {}`. 
  * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Returns <code>Boolean` - true if the process of saving page has been initiated successfully.</p> 
    ```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete', (error) => {
    if (!error) console.log('Save page successfully')
  })
})
```

#### `contents.showDefinitionForSelection()` *macOS*

Menampilkan kamus pop-up yang mencari kata yang dipilih pada halaman.

#### `contents.setSize(options)`

Tetapkan ukuran halaman. Ini hanya didukung untuk konten tamu `<webview>`.

* `pilihan` Obyek 
  * `normal` Objek (opsional) - Ukuran normal halaman. Ini bisa digunakan di kombinasi dengan [`disableguestresize`](web-view-tag.md#disableguestresize) atribut untuk mengubah ukuran isi guestview secara manual. 
    * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
</ul></li>
</ul></li>
</ul>

<h4><code>contents.isOffscreen()`</h4> 
      Returns `Boolean` - Indicates whether *offscreen rendering* is enabled.
      
      #### `contents.startPainting()`
      
      If *offscreen rendering* is enabled and not painting, start painting.
      
      #### `contents.stopPainting()`
      
      If *offscreen rendering* is enabled and painting, stop painting.
      
      #### `contents.isPainting()`
      
      Returns `Boolean` - If *offscreen rendering* is enabled returns whether it is currently painting.
      
      #### `contents.setFrameRate(fps)`
      
      * `fps` Integer
      
      Jika *offscreen rendering* diaktifkan, setel frame rate ke nomor yang ditentukan. Hanya nilai antara 1 dan 60 yang diterima.
      
      #### `contents.getFrameRate()`
      
      Returns `Integer` - If *offscreen rendering* is enabled returns the current frame rate.
      
      #### `contents.invalidate()`
      
      Jadwal repaint penuh dari jendela isi web ini masuk.
      
      Jika *offscreen rendering* diaktifkan akan membuat frame tidak valid dan menghasilkan yang baru satu melalui acara `'paint' `.
      
      #### `contents.getWebRTCIPHandlingPolicy()`
      
      Returns `String` - Returns the WebRTC IP Handling Policy.
      
      #### `contents.setWebRTCIPHandlingPolicy(policy)`
      
      * `policy` String - Specify the WebRTC IP Handling Policy. 
        * `default` - Exposes user's public and local IPs. This is the default behavior. When this policy is used, WebRTC has the right to enumerate all interfaces and bind them to discover public interfaces.
        * `default_public_interface_only` - Exposes user's public IP, but does not expose user's local IP. When this policy is used, WebRTC should only use the default route used by http. Ini tidak mengekspos alamat lokal apapun.
        * `default_public_and_private_interfaces` - Exposes user's public and local IPs. Saat kebijakan ini digunakan, WebRTC seharusnya hanya menggunakan rute default yang digunakan dengan http. Ini juga menunjukkan alamat pribadi default yang terkait. Default Rute adalah rute yang dipilih oleh OS pada titik akhir multi-homed.
        * `disable_non_proxied_udp` - Does not expose public or local IPs. When this policy is used, WebRTC should only use TCP to contact peers or servers unless the proxy server supports UDP.
      
      Menetapkan kebijakan penanganan IP WebRTC memungkinkan Anda mengendalikan IP mana saja terpapar melalui WebRTC. Lihat [BrowserLeaks](https://browserleaks.com/webrtc) untuk keterangan lebih lanjut.
      
      #### `contents.getOSProcessId()`
      
      Returns `Integer` - The `pid` of the associated renderer process.
      
      ### Instance Properties
      
      #### `contents.id`
      
      A `Integer` representing the unique ID of this WebContents.
      
      #### `contents.session`
      
      [`Sesi`](session.md) digunakan oleh webContents ini.
      
      #### `contents.hostWebContents`
      
      Sebuah instance [`WebContents`](web-contents.md) yang mungkin sendiri ini `WebContents`.
      
      #### `contents.devToolsWebContents`
      
      `WebContents` dari DevTools untuk ini `WebContents`.
      
      **Catatan:** Pengguna harus tidak pernah menyimpan objek ini karena hal itu mungkin menjadi `null` ketika DevTools telah ditutup.
      
      #### `contents.debugger`
      
      Contoh [Debugger](debugger.md) untuk webContents ini.