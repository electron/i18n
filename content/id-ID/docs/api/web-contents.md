# konten web

> Membuat dan mengontrol halaman web.

Proses: [Main](../glossary.md#main-process)

`isi web` adalah [Pemancar acara](https://nodejs.org/api/events.html#events_class_eventemitter). Ini bertanggung jawab untuk kontrol dan mengendalikan halaman web dan properti objek [`Jendela Peramban`](browser-window.md). Contoh untuk mengakses objek `isi web`:

```javascript
const { BrowserWindow } = membutuhkan ('elektron')

let win = new BrowserWindow ({ width: 800, height: 1500 })
win.loadURL ('http://github.com')

biarkan isi = win.webContents
console.log (isi)
```

## Methods

Metode ini dapat diakses dari modul `isi web`:

```javascript
const { webContents } = require('electron')
console.log(webContents)
```

### `isi wab.dapatkan Semua Web()`

`[isi web]` - mengembalikan array dari semua contoh `isi web`. Ini akan berisi isi web untuk semua windows, tampilan web , devtools terbuka, dan devtools ekstensi latar belakang halaman.

### `isi web.dapatkan Fokus Web isi()`

Kembali `isi web` - isi web yang terfokus dalam aplikasi ini, jika tidak kembali `batal`.

### `isi web dari Id(id)`

* `identitas` Integer

Mengembalikan `isi web` - Contoh isi web dengan INDETITAS yang diberikan.

## Kelas: isi web

> Membuat dan mengontrol isi sebuah contoh jendela peramban.

Proses: [Main](../glossary.md#main-process)

### Perihal contoh

#### Event: 'Apakah-selesai-load'

Dibunyikan apabila navigasi dilakukan, yakni pemintal tab telah berhenti berputar dan acara `pada beban` dikirim.

#### Peristiwa: 'Apakah-gagal-beban'

Kembali:

* `event` Sinyal
* `kode kesalahan` Bilangan bulat
* `Deskripsi kesalahan` Tali
* `memvalidasi URL` Tali
* `adalah Bingkai Utama` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Acara ini seperti `Apakah-selesai-beban` tapi dipancarkan ketika beban gagal atau dibatalkan, misalnya `jendela.berhenti()` dipanggil. Daftar lengkap kode galat dan makna mereka tersedia [di sini](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

#### Peristiwa: 'Apakah-frame-selesai-beban'

Pengembalian:

* `acara` Acara
* `adalah Bingkai Utama` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Dibunyikan apabila bingkai telah melakukan navigasi.

#### Peristiwa: 'Apakah-mulai-pemuatan'

Sesuai dengan poin pada saat pemintal tab berhenti berputar.

#### Peristiwa: 'Apakah-stop-pemuatan'

Sesuai dengan poin pada saat pemintal tab berhenti berputar.

#### Peristiwa: 'lokal-siap'

Pengembalian:

* `event</ 0> Acara</li>
</ul>

<p>dipancarkan saat dokumen dalam bingkai yang diberikan dimuat.</p>

<h4>Acara : 'halaman-judul-diperbarui'</h4>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara
* ` title </ 0>  String</li>
<li><code>explicitSet` Boolean

Dipecat bila judul halaman diatur saat navigasi. `explicitSet` salah ketika judul disintesis dari file url.

#### Peristiwa: 'halaman-favicon-diperbarui '

Pengembalian:

* `event` Acara
* `FAVICONS` String [] - serangkaian URL.

Dibunyikan saat halaman menerima url favicon.

#### Peristiwa: 'baru-jendela'

Pengembalian:

* `event` Acara
* `url` String
* `nama bingkai` tali
* `disposisi` String - dapat `default`, `latar depan-tab`, `latar belakang-tab`, `jendela baru`, `Simpan ke disk` dan `lainnya`.
* `options` Object - The options which will be used for creating the new [`BrowserWindow`](browser-window.md).
* `fitur tambahan` String [] - fitur tidak-standar (fitur tidak ditangani oleh Kromium atau elektron) diberikan kepada `jendela terbuka()`.
* `referrer` [Referrer](structures/referrer.md) - The referrer that will be passed to the new window. May or may not result in the `Referer` header being sent, depending on the referrer policy.

Dibunyikan apabila halaman yang permintaan untuk membuka jendela baru `url`. Itu bisa saja diminta oleh `jendela terbuka` atau link eksternal seperti `<a target='_blank'>`.

Secara default baru `Jendela Peramban` akan diciptakan untuk `url`.

Calling `event.preventDefault()` will prevent Electron from automatically creating a new [`BrowserWindow`](browser-window.md). If you call `event.preventDefault()` and manually create a new [`BrowserWindow`](browser-window.md) then you must set `event.newGuest` to reference the new [`BrowserWindow`](browser-window.md) instance, failing to do so may result in unexpected behavior. Sebagai contoh:

```javascript
myBrowserWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
  event.preventDefault()
  const win = new BrowserWindow({
    webContents: options.webContents, // use existing webContents if provided
    show: false
  })
  win.once('ready-to-show', () => win.show())
  if (!options.webContents) {
    win.loadURL(url) // existing webContents will be navigated automatically
  }
  event.newGuest = win
})
```

#### Peristiwa: 'akan navigasi'

Pengembalian:

* `acara` Acara
* `url` String

dipancarkan saat pengguna atau halaman ingin memulai navigasi. Hal itu bisa terjadi ketikaObjek ` jendela.lokasi </ 0> diubah atau pengguna mengklik link di halaman.
</p>

<p>Peristiwa ini tidak akan memancarkan saat navigasi dimulai secara pemrograman
API seperti <code>isi web memuat URL` dan `isi web kembali`.

Itu juga tidak dibunyikan untuk navigations di halaman, seperti mengklik anchor link atau memperbarui `jendela.lokasi.hash`. Menggunakan acara `melakukan-menavigasi-di Halaman` untuk tujuan ini.

Memanggil `peristiwa.mencegah Default()` akan mencegah navigasi.

#### Event: 'did-start-navigation'

Pengembalian:

* `acara` Acara
* ` url </ 0> String</li>
<li><code>isInPlace` Boolean
* `adalah Bingkai Utama` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when any frame (including main) starts navigating. `isInplace` will be `true` for in-page navigations.

#### Event: 'will-redirect'

Pengembalian:

* `event</ 0> Acara</li>
<li><code> url </ 0> String</li>
<li><code>isInPlace` Boolean
* `adalah Bingkai Utama` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted as a server side redirect occurs during navigation. For example a 302 redirect.

This event will be emitted after `did-start-navigation` and always before the `did-redirect-navigation` event for the same navigation.

Calling `event.preventDefault()` will prevent the navigation (not just the redirect).

#### Event: 'did-redirect-navigation'

Pengembalian:

* `acara` Acara
* `url` String
* `isInPlace` Boolean
* `adalah Bingkai Utama` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted after a server side redirect occurs during navigation. For example a 302 redirect.

This event can not be prevented, if you want to prevent redirects you should checkout out the `will-redirect` event above.

#### Peristiwa: 'akan navigasi'

Pengembalian:

* `acara` Acara
* `url` String
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - empty for non HTTP navigations

Emitted when a main frame navigation is done.

Acara ini tidak dibunyikan untuk navigations di halaman, seperti mengklik anchor link atau memperbarui `window.location.hash`. Menggunakan acara `melakukan-menavigasi-di Halaman` untuk tujuan ini.

#### Event: 'did-frame-navigate'

Pengembalian:

* `acara` Acara
* `url` String
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - empty for non HTTP navigations,
* `adalah Bingkai Utama` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when any frame navigation is done.

Acara ini tidak dibunyikan untuk navigations di halaman, seperti mengklik anchor link atau memperbarui `window.location.hash`. Menggunakan acara `melakukan-menavigasi-di Halaman` untuk tujuan ini.

#### peristiwa: 'Apakah-menavigasi-di halaman'

Pengembalian:

* `event</ 0> Acara</li>
<li><code>url` String
* `adalah Bingkai Utama` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when an in-page navigation happened in any frame.

Saat navigasi dalam halaman terjadi, perubahan URL halaman tidak menyebabkan navigasi di luar halaman. Contoh dari hal ini adalah ketika jangkar link diklik atau saat peristiwa hash `perubahan hash` dipicu.

#### Peristiwa: 'akan-mencegah-membongkar'

Pengembalian:

* `acara` Acara

Dibunyikan apabila `sebelumnya` event handler adalah mencoba untuk membatalkan halaman membongkar.

Memanggil `event.preventDefault()` akan mengabaikan `beforeunload` event handler dan memungkinkan halaman harus dibongkar.

```javascript
const { BrowserWindow, dialog } = require ('electron') const win = new BrowserWindow ({ width: 800, height: 600 }) win.webContents.on ('akan-mencegah-membongkar', (event) = > { const choice = dialog.showMessageBox (menang, {type: 'question', buttons: ['Leave', 'Stay'], title: 'Apakah Anda ingin meninggalkan situs ini?', pesan: 'Perubahan yang Anda buat mungkin tidak disimpan. ', defaultId: 0, cancelId: 1}) const leave = (pilihan === 0) if (leave) {event.preventDefault ()}})
```

#### Peristiwa: 'jatuh'

Pengembalian:

* `acara` Acara
* `terbunuh` Boolean

Dipancarkan ketika proses perender penembak atau terbunuh.

#### Acara : 'tidak responsif'

Emitted saat halaman web menjadi tidak responsif.

#### Acara: 'responsif'

Emitted saat halaman web yang tidak responsif menjadi responsif lagi.

#### Peristiwa: 'plugin-jatuh'

Pengembalian:

* `acara` Acara
* ` nama </ 0>  String</li>
<li><code>Versi` String

Dibunyikan ketika proses plugin telah jatuh.

#### Event: 'menghancurkan'

Dibunyikan apabila `webContents` dihancurkan.

#### Acara: 'sebelum-masukan-event'

Pengembalian:

* `event</ 0> Acara</li>
<li><code>masukan` Obyek - Input properti. 
  * `jenis` String - baik `keyUp` atau `keyDown`.
  * `kunci` String - setara dengan [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `kode` String - setara dengan [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `isAutoRepeat` Boolean - setara dengan [KeyboardEvent.repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `pergeseran` Boolean - setara dengan [KeyboardEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `kontrol` Boolean - setara dengan [KeyboardEvent.controlKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `Alt` Boolean - setara dengan [KeyboardEvent.altKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `meta` Boolean - setara dengan [KeyboardEvent.metaKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).

Dipancarkan sebelum membuat acara `keydown` dan `keyup` di halaman. Memanggil `event.preventDefault` akan mencegah halaman `keydown` / `keyup` peristiwa dan menu cara pintas.

Untuk hanya mencegah menu cara pintas, menggunakan [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore-experimental):

```javascript
const { BrowserWindow } = require ('electron') 

misalkan win = new BrowserWindow ({ width: 800, height: 600 }) 

win.webContents.on ('before-input-event', (event, input) => { // Sebagai contoh, aktifkan pintasan keyboard menu aplikasi saat // Ctrl/Cmd sedang down.
  win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Acara : 'enter-html-full-screen'

Emitted saat jendela memasuki status layar-penuh yang dipicu oleh HTML API.

#### Acara : 'leave-html-full-screen'

Emitted saat jendela meninggalkan status layar-penuh yang dipicu oleh HTML API.

#### Event: 'devtools-dibuka'

Emitted saat DevTools dibuka.

#### Event: 'devtools-ditutup'

Emitted saat DevTools ditutup.

#### Event: 'fokus devtools'

Emitted saat DevTools difokuskan / dibuka.

#### Acara: 'sertifikat-kesalahan'

Mengembalikan:

* `event</ 0> Acara</li>
<li><code>url` String
* `error` String - Kode kesalahan.
* `sertifikat` [Sertifikat](structures/certificate.md)
* `callback` Fungsi 
  * `Terpercaya` Boolean -Menunjukkan apakah sertifikat bisa dianggap terpercaya.

Emitted when failed to verify the `certificate` for `url`.

The usage is the same with [the `certificate-error` event of `app`](app.md#event-certificate-error).

#### Acara: 'pilih-klien-sertifikat'

Mengembalikan:

* `acara` Acara
* `url` URL
* `certificateList` [Sertifikat[]](structures/certificate.md)
* `callback` Fungsi 
  * `sertifikat` [Sertifikat](structures/certificate.md) - Harus berupa sertifikat dari daftar yang diberikan.

Emitted ketika sertifikat klien diminta.

The usage is the same with [the `select-client-certificate` event of `app`](app.md#event-select-client-certificate).

#### Acara: 'login'

Mengembalikan:

* `acara` Acara
* `permintaan` Obyek 
  * `method` String
  * `url` URL
  * `perujuk` URL
* `authInfo` Obyek 
  * ` isProxy </ 0>  Boolean</li>
<li><code>skema` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Fungsi 
  * `namapengguna` String
  * `katasandi` String

Emitted ketika `webContents` ingin melakukan auth dasar.

The usage is the same with [the `login` event of `app`](app.md#event-login).

#### Event: 'ditemukan-di-halaman'

Mengembalikan:

* `acara` Acara
* `hasil` Obyek 
  * `requestId` Bilangan bulat
  * `activeMatchOrdinal` Bulat - posisi pertandingan aktif.
  * `pertandingan` Bulat - jumlah pertandingan.
  * `selectionArea` Objek - koordinat pertama pertandingan wilayah.
  * `finalUpdate` Boolean

Emitted when a result is available for [`webContents.findInPage`] request.

#### Event: 'media-mulai-bermain''

Emitted saat media mulai diputar.

#### Event: 'media-berhenti'

Emitted saat media dijeda atau dilakukan bermain.

#### Event: 'apakah-ganti-tema-warna'

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

Mengembalikan:

* `acara` Acara
* `color` (String | null) - Theme color is in format of '#rrggbb'. It is `null` when no theme color is set.

#### Event: 'update-target-url'

Pengembalian:

* `acara` Acara
* `url` String

Emitted saat mouse bergerak di atas sebuah link atau keyboard memindahkan fokus ke sebuah link.

#### Event: 'cursor-changed'

Mengembalikan:

* `event</ 0> Acara</li>
<li><code>jenis` String
* ` gambar </ 0>  <a href="native-image.md"> NativeImage </ 1> (opsional)</li>
<li><code>skala` Mengambang (opsional) - skala faktor untuk kursor kustom.
* `ukuran` [Ukuran](structures/size.md) (opsional) - ukuran `gambar`.
* `hotspot` [Titik](structures/point.md) (opsional) - koordinat kursor kustom Hotspot.

Emitted when the cursor's type changes. The `type` parameter can be `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` or `custom`.

If the `type` parameter is `custom`, the `image` parameter will hold the custom cursor image in a [`NativeImage`](native-image.md), and `scale`, `size` and `hotspot` will hold additional information about the custom cursor.

#### Event: 'context-menu'

Pengembalian:

* `acara` Acara
* `params` Obyek 
  * `x` koordinat Integer - x.
  * ` y </ 0>  Koordinat integer.</li>
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
  * `menuSourceType` String - Input source that invoked the context menu. Can be `none`, `mouse`, `keyboard`, `touch` or `touchMenu`.
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

Emitted when there is a new context menu that needs to be handled.

#### Event: 'select-bluetooth-device'

Pengembalian:

* `acara` Acara
* `perangkat` [[BluetoothDevice]](structures/bluetooth-device.md)
* `callback` Fungsi 
  * `deviceId` String

Emitted when bluetooth device needs to be selected on call to `navigator.bluetooth.requestDevice`. To use `navigator.bluetooth` api `webBluetooth` should be enabled. If `event.preventDefault` is not called, first available device will be selected. `callback` should be called with `deviceId` to be selected, passing empty string to `callback` will cancel the request.

```javascript
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    let result = deviceList.find((device) => {
      return device.deviceName === 'test'
    })
    if (!result) {
      callback('')
    } else {
      callback(result.deviceId)
    }
  })
})
```

#### Event: 'paint'

Mengembalikan:

* `acara` Acara
* `dirtyRect` [Persegi panjang](structures/rectangle.md)
* `gambar` [NativeImage](native-image.md) - Data gambar dari keseluruhan frame.

Emitted when a new frame is generated. Only the dirty area is passed in the buffer.

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ webPreferences: { offscreen: true } })
win.webContents.on('paint', (event, dirty, image) => {
  // updateBitmap(dirty, image.getBitmap())
})
win.loadURL('http://github.com')
```

#### Event: 'devtools-reload-page'

Emitted when the devtools window instructs the webContents to reload

#### Event: 'will-attach-webview'

Mengembalikan:

* `acara` Acara
* `webPreferences` Objek - preferensi web yang akan digunakan oleh semua halaman. Objek ini dapat dimodifikasi untuk menyesuaikan preferensi untuk semua halaman.
* `params` Obyek - `<webview>`parameter lain seperti `src` URL. Objek ini dapat dimodifikasi untuk menyesuaikan parameter halaman tamu.

Emitted when a `<webview>`'s web contents is being attached to this web contents. Calling `event.preventDefault()` will destroy the guest page.

This event can be used to configure `webPreferences` for the `webContents` of a `<webview>` before it's loaded, and provides the ability to set settings that can't be set via `<webview>` attributes.

**Note:** The specified `preload` script option will be appear as `preloadURL` (not `preload`) in the `webPreferences` object emitted with this event.

#### Event: 'did-attach-webview'

Pengembalian:

* `acara` Acara
* `webContents` WebContents - The guest web contents that is used by the `<webview>`.

Emitted when a `<webview>` has been attached to this web contents.

#### Event: 'console-message'

Pengembalian:

* `acara` Acara
* `level` Integer
* `pesan` String
* `line` Integer
* `sourceId` String

Emitted when the associated window logs a console message. Will not be emitted for windows with *offscreen rendering* enabled.

#### Event: 'preload-error'

Pengembalian:

* `acara` Acara
* `preloadPath` String
* Kesalahan `kesalahan`

Emitted when the preload script `preloadPath` throws an unhandled exception `error`.

#### Event: 'ipc-message'

Pengembalian:

* `acara` Acara
* ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p>Emitted when the renderer process sends an asynchronous message via <code>ipcRenderer.send()`.</p> 
  #### Event: 'ipc-message-sync'
  
  Pengembalian:
  
  * `acara` Acara
  * ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p>Emitted when the renderer process sends a synchronous message via <code>ipcRenderer.sendSync()`.</p> 
    #### Event: 'desktop-capturer-get-sources'
    
    Pengembalian:
    
    * `acara` Acara
    
    Emitted when `desktopCapturer.getSources()` is called in the renderer process. Calling `event.preventDefault()` will make it return empty sources.
    
    #### Event: 'remote-require'
    
    Pengembalian:
    
    * `acara` Acara
    * `moduleName` String
    
    Emitted when `remote.require()` is called in the renderer process. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.
    
    #### Event: 'remote-get-global'
    
    Pengembalian:
    
    * `acara` Acara
    * `globalName` String
    
    Emitted when `remote.getGlobal()` is called in the renderer process. Calling `event.preventDefault()` will prevent the global from being returned. Custom value can be returned by setting `event.returnValue`.
    
    #### Event: 'remote-get-builtin'
    
    Pengembalian:
    
    * `acara` Acara
    * `moduleName` String
    
    Emitted when `remote.getBuiltin()` is called in the renderer process. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.
    
    #### Event: 'remote-get-current-window'
    
    Pengembalian:
    
    * `acara` Acara
    
    Emitted when `remote.getCurrentWindow()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.
    
    #### Event: 'remote-get-current-web-contents'
    
    Pengembalian:
    
    * `acara` Acara
    
    Emitted when `remote.getCurrentWebContents()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.
    
    #### Event: 'remote-get-guest-web-contents'
    
    Mengembalikan:
    
    * `acara` Acara
    * `guestWebContents` [WebContents](web-contents.md)
    
    Emitted when `<webview>.getWebContents()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.
    
    ### Metode Instance
    
    #### `contents.loadURL(url[, options])`
    
    * `url` String
    * `pilihan` Objek (opsional) 
      * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
      * `userAgent` String (opsional) - agen pengguna berasal permintaan.
      * `extraHeaders` String (opsional) - header tambahan yang dipisahkan oleh "\n".
      * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
      * `baseURLForDataURL` String (opsional) - url dasar (dengan trailing pemisah path) untuk file yang akan diambil oleh data url. Hal ini diperlukan hanya jika ditentukan `url` data url dan perlu memuat file lainnya.
    
    Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).
    
    Loads the `url` in the window. The `url` must contain the protocol prefix, e.g. the `http://` or `file://`. If the load should bypass http cache then use the `pragma` header to achieve it.
    
    ```javascript
    const { webContents } = require('electron')
    const options = { extraHeaders: 'pragma: no-cache\n' }
    webContents.loadURL('https://github.com', options)
    ```
    
    #### `contents.loadFile(filePath[, options])`
    
    * `fullPath` String
    * `pilihan` Objek (opsional) 
      * `query` Object (optional) - Passed to `url.format()`.
      * `search` String (optional) - Passed to `url.format()`.
      * `hash` String (optional) - Passed to `url.format()`.
    
    Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).
    
    Loads the given file in the window, `filePath` should be a path to an HTML file relative to the root of your application. For instance an app structure like this:
    
    ```sh
    | root
    | - package.json
    | - src
    |   - main.js
    |   - index.html
    ```
    
    Would require code like this
    
    ```js
    win.loadFile('src/index.html')
    ```
    
    #### `contents.downloadURL(url)`
    
    * `url` String
    
    Initiates a download of the resource at `url` without navigating. The `will-download` event of `session` will be triggered.
    
    #### `contents.getURL()`
    
    Returns `String` - The URL of the current web page.
    
    ```javascript
    const { BrowserWindow } = require('electron') membiarkan memenangkan = baru BrowserWindow({ width: 800, height: 600 }) win.loadURL ('http://github.com') Biarkan currentURL = win.webContents.getURL() console.log(currentURL)
    ```
    
    #### `contents.getTitle()`
    
    Returns `String` - The title of the current web page.
    
    #### `contents.isDestroyed()`
    
    Returns `Boolean` - Whether the web page is destroyed.
    
    #### `contents.focus()`
    
    Focuses the web page.
    
    #### `contents.isFocused()`
    
    Returns `Boolean` - Whether the web page is focused.
    
    #### `contents.isLoading()`
    
    Returns `Boolean` - Whether web page is still loading resources.
    
    #### `contents.isLoadingMainFrame()`
    
    Kembali `Boolean` - Apakah bingkai utama (dan bukan hanya iframes atau bingkai di dalamnya) masih sedang loading.
    
    #### `contents.isWaitingForResponse()`
    
    Returns `Boolean` - Whether the web page is waiting for a first-response from the main resource of the page.
    
    #### `contents.stop()`
    
    Menghentikan navigasi yang tertunda.
    
    #### `contents.reload()`
    
    Reloads the current web page.
    
    #### `contents.reloadIgnoringCache()`
    
    Reloads current page and ignores cache.
    
    #### `contents.canGoBack()`
    
    Returns `Boolean` - Whether the browser can go back to previous web page.
    
    #### `contents.canGoForward()`
    
    Returns `Boolean` - Whether the browser can go forward to next web page.
    
    #### `contents.canGoToOffset(offset)`
    
    * `offset` Integer
    
    Returns `Boolean` - Whether the web page can go to `offset`.
    
    #### `contents.clearHistory()`
    
    Menghapus sejarah navigasi.
    
    #### `contents.goBack()`
    
    Makes the browser go back a web page.
    
    #### `contents.goForward()`
    
    Makes the browser go forward a web page.
    
    #### `contents.goToIndex(index)`
    
    * `indeks` Integer
    
    Navigates browser to the specified absolute web page index.
    
    #### `contents.goToOffset(offset)`
    
    * `offset` Integer
    
    Arahkan ke offset yang ditentukan dari "entri saat ini".
    
    #### `contents.isCrashed()`
    
    Mengembalikan `Boolean` - Apakah proses renderer telah jatuh.
    
    #### `contents.setUserAgent(userAgent)`
    
    * `userAgent` String
    
    Overrides the user agent for this web page.
    
    #### `contents.getUserAgent()`
    
    Returns `String` - The user agent for this web page.
    
    #### `contents.insertCSS(css)`
    
    * `css` String
    
    Injects CSS into the current web page.
    
    ```js
    contents.on('did-finish-load', function () {
      contents.insertCSS('html, body { background-color: #f00; }')
    })
    ```
    
    #### `contents.executeJavaScript(kode[, userGesture, callback])`
    
    * `id` String
    * `userGesture` Boolean (opsional) - Default adalah `false`.
    * `callback` Fungsi (opsional) - Dipanggil setelah script telah dieksekusi. 
      * `hasil` Ada
    
    Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.
    
    Evaluasi `kode` di halaman.
    
    Di jendela browser beberapa API HTML seperti `requestFullScreen` hanya bisa dipanggil oleh isyarat dari pengguna. Setting `userGesture` ke `true` akan dihapus keterbatasan ini.
    
    ```js
    contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
      .then((result) => {
        console.log(result) // Will be the JSON object from the fetch call
      })
    ```
    
    **[Deprecated Soon](modernization/promisification.md)**
    
    #### `contents.executeJavaScript(code[, userGesture])`
    
    * `code` String
    * `userGesture` Boolean (opsional) - Default adalah `false`.
    
    Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.
    
    Evaluasi `kode` di halaman.
    
    Di jendela browser beberapa API HTML seperti `requestFullScreen` hanya bisa dipanggil oleh isyarat dari pengguna. Setting `userGesture` ke `true` akan dihapus keterbatasan ini.
    
    ```js
    contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
      .then((result) => {
        console.log(result) // Will be the JSON object from the fetch call
      })
    ```
    
    #### `contents.setIgnoreMenuShortcuts(ignore)` *Experimental*
    
    * `mengabaikan` Boolean
    
    Ignore application menu shortcuts while this web contents is focused.
    
    #### `contents.setAudioMuted(muted)`
    
    * `dibungkam` Boolean
    
    Mute the audio on the current web page.
    
    #### `contents.isAudioMuted()`
    
    Returns `Boolean` - Whether this page has been muted.
    
    #### `contents.isCurrentlyAudible()`
    
    Returns `Boolean` - Whether audio is currently playing.
    
    #### `contents.setZoomFactor(factor)`
    
    * `faktor` Angka - Faktor zoom.
    
    Mengubah faktor pembesaran ke faktor yang ditentukan. Faktor zoom adalah zoom persen dibagi dengan 100, sehingga 300% = 3,0.
    
    #### `contents.getZoomFactor()`
    
    Returns `Number` - the current zoom factor.
    
    #### `contents.setZoomLevel(level)`
    
    * `level` Angka - level zoom.
    
    Mengubah tingkat zoom ke tingkat tertentu. Ukuran aslinya adalah 0 dan masing-masing Peningkatan atas atau di bawah mewakili zoom 20% lebih besar atau lebih kecil ke default batas 300% dan 50% dari ukuran aslinya, berurutan. The formula for this is `scale := 1.2 ^ level`.
    
    #### `contents.getZoomLevel()`
    
    Returns `Number` - the current zoom level.
    
    #### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`
    
    * `minimalLevel` Nomor
    * `maksimalLevel` Nomor
    
    Menetapkan maksimum dan minimum tingkat mencubit-to-zoom.
    
    > **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
    > 
    > ```js
    > contents.setVisualZoomLevelLimits(1, 3)
    > ```
    
    #### `contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`
    
    * `minimalLevel` Nomor
    * `maksimalLevel` Nomor
    
    Menetapkan tingkat zoom maksimal dan minimal berbasis tata letak (yaitu bukan-visual).
    
    #### `contents.undo()`
    
    Executes the editing command `undo` in web page.
    
    #### `contents.redo()`
    
    Executes the editing command `redo` in web page.
    
    #### `contents.cut()`
    
    Executes the editing command `cut` in web page.
    
    #### `contents.copy()`
    
    Executes the editing command `copy` in web page.
    
    #### `contents.copyImageAt(x, y)`
    
    * `x` Integer
    * `y` Integer
    
    Copy the image at the given position to the clipboard.
    
    #### `contents.paste()`
    
    Executes the editing command `paste` in web page.
    
    #### `contents.pasteAndMatchStyle()`
    
    Executes the editing command `pasteAndMatchStyle` in web page.
    
    #### `contents.delete()`
    
    Executes the editing command `delete` in web page.
    
    #### `contents.selectAll()`
    
    Executes the editing command `selectAll` in web page.
    
    #### `contents.unselect()`
    
    Executes the editing command `unselect` in web page.
    
    #### `contents.replace(text)`
    
    * `teks` String
    
    Executes the editing command `replace` in web page.
    
    #### `contents.replaceMisspelling(text)`
    
    * `teks` String
    
    Executes the editing command `replaceMisspelling` in web page.
    
    #### `contents.insertText(text)`
    
    * `teks` String
    
    Sisipan `teks` ke elemen yang terfokus.
    
    #### `contents.findInPage(text[, options])`
    
    * `text` String - Konten yang akan dicari, tidak boleh kosong.
    * `pilihan` Objek (pilihan) 
      * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
      * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
      * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
      * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
      * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Menerima beberapa kecocokan intra-kata lainnya, defaultnya adalah `false`.
    
    Returns `Integer` - The request id used for the request.
    
    Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](web-contents.md#event-found-in-page) event.
    
    #### `contents.stopFindInPage(action)`
    
    * `tindakan` String - Specifies the action to take place when ending [`webContents.findInPage`] request. 
      * `clearSelection` - jelas pilihan.
      * `keepSelection` - menerjemahkan pemilihan menjadi sebuah pilihan yang normal.
      * `activateSelection` - fokus dan klik seleksi simpul.
    
    Stops any `findInPage` request for the `webContents` with the provided `action`.
    
    ```javascript
    const { webContents } = require('electron')
    webContents.on('found-in-page', (event, result) => {
      if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
    })
    
    const requestId = webContents.findInPage('api')
    console.log(requestId)
    ```
    
    #### `contents.capturePage ([rect,] callback)`
    
    * ` rect </ 0>  <a href="structures/rectangle.md"> Rectangle </ 1> (opsional) - Batas untuk ditangkap</li>
<li><code>callback` Fungsi 
      * ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
</ul></li>
</ul>

<p>Menangkap sebuah snapshot dari halaman dalam <code>rect`. Setelah menyelesaikan `callback` yang akan disebut dengan `callback(image)`. The `image` is an instance of [NativeImage](native-image.md) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.</p> 
        **[Deprecated Soon](modernization/promisification.md)**
        
        #### `contents.capturePage([rect])`
        
        * `rect` [Persegi panjang](structures/rectangle.md) (opsional) - daerah halaman untuk ditangkap.
        
        Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)
        
        Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.
        
        #### `contents.getPrinters()`
        
        Get the system printer list.
        
        Returns [`PrinterInfo[]`](structures/printer-info.md).
        
        #### `contents.print([options], [callback])`
        
        * `pilihan` Objek (pilihan) 
          * `diam` Boolean (opsional) - Jangan tanya pengguna untuk pengaturan cetak. Defaultnya adalah `false`.
          * `printBackground` Boolean (opsional) - Juga mencetak warna latar belakang dan gambar halaman web Defaultnya adalah `false`.
          * `deviceName` String (opsional) - Tetapkan nama perangkat printer yang akan digunakan. Defaultnya adalah `''`.
        * `callback` Fungsi (opsional) 
          * `success` Boolean - Indicates success of the print call.
        
        Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.
        
        Calling `window.print()` in web page is equivalent to calling `webContents.print({ silent: false, printBackground: false, deviceName: '' })`.
        
        Use `page-break-before: always;` CSS style to force to print to a new page.
        
        #### `contents.printToPDF(pilihan, callback)`
        
        * `pilihan` Sasaran 
          * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
          * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be`A3`,`A4`,`A5`,` Legal `,`Letter`,`Tabloid` or an Object containing `height` and `width` in microns.
          * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
          * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
          * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
        * `callback` Fungsi 
          * Kesalahan `kesalahan`
          * `data` nomor
        
        Prints window's web page as PDF with Chromium's preview printing custom settings.
        
        The `callback` will be called with `callback(error, data)` on completion. The `data` is a `Buffer` that contains the generated PDF data.
        
        **[Deprecated Soon](modernization/promisification.md)**
        
        #### `contents.printToPDF(options)`
        
        * `pilihan` Obyek 
          * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
          * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be`A3`,`A4`,`A5`,` Legal `,`Letter`,`Tabloid` or an Object containing `height` and `width` in microns.
          * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
          * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
          * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
        
        Returns `Promise<Buffer>` - Resolves with the generated PDF data.
        
        Prints window's web page as PDF with Chromium's preview printing custom settings.
        
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
        
        Use `page-break-before: always;` CSS style to force to print to a new page.
        
        An example of `webContents.printToPDF`:
        
        ```javascript
        const { BrowserWindow } = require('electron')
        const fs = require('fs')
        
        let win = new BrowserWindow({ width: 800, height: 600 })
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

<pre><code class="javascript">const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.webContents.on('devtools-opened', () => {
  win.webContents.addWorkSpace(__dirname)
})
`</pre> 
          #### `contents.removeWorkSpace(path)`
          
          * ` path </ 0>  String</li>
</ul>

<p>Removes the specified path from DevTools workspace.</p>

<h4><code>contents.setDevToolsWebContents(devToolsWebContents)`</h4> 
            * `devToolsWebContents` WebContents
            
            Uses the `devToolsWebContents` as the target `WebContents` to show devtools.
            
            The `devToolsWebContents` must not have done any navigation, and it should not be used for other purposes after the call.
            
            By default Electron manages the devtools by creating an internal `WebContents` with native view, which developers have very limited control of. With the `setDevToolsWebContents` method, developers can use any `WebContents` to show the devtools in it, including `BrowserWindow`, `BrowserView` and `<webview>` tag.
            
            Note that closing the devtools does not destroy the `devToolsWebContents`, it is caller's responsibility to destroy `devToolsWebContents`.
            
            An example of showing devtools in a `<webview>` tag:
            
            ```html
            <html>
            <head>
              <style type="text/css">
            
                * { margin: 0; }
                #browser { height: 70%; }
                #devtools { height: 30%; }
              </style>
            </head>
            <body>
              <webview id="browser" src="https://github.com"></webview>
              <webview id="devtools"></webview>
              <script>
                const browserView = document.getElementById('browser')
                const devtoolsView = document.getElementById('devtools')
                browserView.addEventListener('dom-ready', () => {
                  const browser = browserView.getWebContents()
                  browser.setDevToolsWebContents(devtoolsView.getWebContents())
                  browser.openDevTools()
                })
              </script>
            </body>
            </html>
            ```
            
            An example of showing devtools in a `BrowserWindow`:
            
            ```js
            const { app, BrowserWindow } = require('electron')
            
            let win = null
            let devtools = null
            
            app.once('ready', () => {
              win = new BrowserWindow()
              devtools = new BrowserWindow()
              win.loadURL('https://github.com')
              win.webContents.setDevToolsWebContents(devtools.webContents)
              win.webContents.openDevTools({ mode: 'detach' })
            })
            ```
            
            #### `contents.openDevTools([options])`
            
            * `pilihan` Objek (opsional) 
              * `mode` String - Membuka devtool dengan status dermaga tertentu, bisa `kanan`, `bawah`, `undocked`, `lepas`. Default untuk terakhir digunakan dermaga negara. Pada mode `undocked`, mungkin untuk kembali ke dermaga. Di dalam `melepaskan` bukan mode itu.
              * `activate` Boolean (optional) - Whether to bring the opened devtools window to the foreground. The default is `true`.
            
            Opens the devtools.
            
            When `contents` is a `<webview>` tag, the `mode` would be `detach` by default, explicitly passing an empty `mode` can force using last used dock state.
            
            #### `contents.closeDevTools()`
            
            Closes the devtools.
            
            #### `contents.isDevToolsOpened()`
            
            Returns `Boolean` - Whether the devtools is opened.
            
            #### `contents.isDevToolsFocused()`
            
            Returns `Boolean` - Whether the devtools view is focused .
            
            #### `contents.toggleDevTools()`
            
            Toggles the developer tools.
            
            #### `contents.inspectElement(x, y)`
            
            * `x` Integer
            * `y` Integer
            
            Starts inspecting element at position (`x`, `y`).
            
            #### `contents.inspectSharedWorker()`
            
            Opens the developer tools for the shared worker context.
            
            #### `contents.inspectServiceWorker()`
            
            Opens the developer tools for the service worker context.
            
            #### `contents.send(channel[, arg1][, arg2][, ...])`
            
            * ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p>Kirim pesan asinkron ke proses renderer melalui <code>channel`, Anda juga bisa mengirim argumen sewenang wenang. Argumen akan diserialkan di JSON secara internal dan karenanya tidak ada fungsi atau rantai prototipe yang akan disertakan.</p> 
              The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.
              
              An example of sending messages from the main process to the renderer process:
              
              ```javascript
              // Pada proses utama.
              const { app, BrowserWindow } = require('electron')
              let win = null
              
              app.on('ready', () => {
                win = new BrowserWindow({ width: 800, height: 600 })
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
                    console.log(message) // Prints 'whoooooooh!'
                  })
                </script>
              </body>
              </html>
              ```
              
              #### `contents.sendToFrame(frameId, channel[, arg1][, arg2][, ...])`
              
              * `frameId` Integer
              * ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p>Send an asynchronous message to a specific frame in a renderer process via
<code>channel`. Arguments will be serialized as JSON internally and as such no functions or prototype chains will be included.</p> 
                The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.
                
                If you want to get the `frameId` of a given renderer context you should use the `webFrame.routingId` value. E.g.
                
                ```js
                // In a renderer process
                console.log('My frameId is:', require('electron').webFrame.routingId)
                ```
                
                You can also read `frameId` from all incoming IPC messages in the main process.
                
                ```js
                // In the main process
                ipcMain.on('ping', (event) => {
                  console.info('Message came from frameId:', event.frameId)
                })
                ```
                
                #### `contents.enableDeviceEmulation(parameters)`
                
                * `parameter` Obyek 
                  * `screenPosition` String - Tentukan jenis layar yang akan ditiru (default: `Desktop`): 
                    * `desktop` - Jenis layar desktop.
                    * `ponsel` - Jenis layar seluler.
                  * `screenSize` [Ukuran](structures/size.md) - Menetapkan ukuran layar yang ditiru (screenPosition == mobile).
                  * `viewPosition` [Point](structures/point.md) - Posisikan tampilan di layar (screenPosition == mobile) (default: `{ x: 0, y: 0 }`).
                  * `deviceScaleFactor` Integer - Tetapkan faktor skala perangkat (jika nol default ke faktor skala perangkat asli) (default: `0`).
                  * `viewSize` [Size](structures/size.md) - Set the emulated view size (empty means no override)
                  * `skala` Float - Skala tampilan yang ditiru di dalam ruang yang tersedia (tidak sesuai untuk melihat mode) (default: ` 1 `).
                
                Enable device emulation with the given parameters.
                
                #### `contents.disableDeviceEmulation()`
                
                Disable device emulation enabled by `webContents.enableDeviceEmulation`.
                
                #### `contents.sendInputEvent(event)`
                
                * `peristiwa` Obyek 
                  * `type` String (**required**) - The type of the event, can be `mouseDown`, `mouseUp`, `mouseEnter`, `mouseLeave`, `contextMenu`, `mouseWheel`, `mouseMove`, `keyDown`, `keyUp` or `char`.
                  * `modifiers` String[] - An array of modifiers of the event, can include `shift`, `control`, `alt`, `meta`, `isKeypad`, `isAutoRepeat`, `leftButtonDown`, `middleButtonDown`, `rightButtonDown`, `capsLock`, `numLock`, `left`, `right`.
                
                Mengirim masukan `event` ke halaman. **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.
                
                For keyboard events, the `event` object also have following properties:
                
                * `keyCode` String (**required**) - Karakter yang akan dikirim sebagai acara keyboard. Sebaiknya gunakan kode kunci yang valid di [Accelerator](accelerator.md).
                
                For mouse events, the `event` object also have following properties:
                
                * `x` Integer (**required**)
                * `y` Integer (**required**)
                * `button` String - The button pressed, can be `left`, `middle`, `right`.
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
                
                * `onlyDirty` Boolean (opsional) - Default ke `false`.
                * `callback` Fungsi 
                  * ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
<li><code>dirtyRect` [Persegi panjang](structures/rectangle.md)
                
                Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(image, dirtyRect)` when there is a presentation event.
                
                The `image` is an instance of [NativeImage](native-image.md) that stores the captured frame.
                
                The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. If `onlyDirty` is set to `true`, `image` will only contain the repainted area. `onlyDirty` defaults to `false`.
                
                #### `contents.endFrameSubscription()`
                
                End subscribing for frame presentation events.
                
                #### `contents.startDrag(item)`
                
                * `item` Obyek 
                  * `file` String or `files` Array - The path(s) to the file(s) being dragged.
                  * `icon` [NativeImage](native-image.md) - The image must be non-empty on macOS.
                
                Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.
                
                #### `contents.savePage(fullPath, saveType)`
                
                * `fullPath` String - Jalur file lengkap.
                * `saveType` String - Specify the save type. 
                  * `HTMLOnly` - Simpan hanya HTML halaman.
                  * `HTMLComplete` - Simpan halaman lengkap-html.
                  * `MHTML` - Simpan halaman lengkap-html sebagai MHTML.
                
                Returns `Promise<void>` - resolves if the page is saved.
                
                ```javascript
                const { BrowserWindow } = require('electron')
                let win = new BrowserWindow()
                
                win.loadURL('https://github.com')
                
                win.webContents.on('did-finish-load', async () => {
                  win.webContents.savePage('/tmp/test.html', 'HTMLComplete').then(() => {
                    console.log('Page was saved successfully.')
                  }).catch(err => {
                    console.log(err)
                  })
                })
                ```
                
                #### `contents.showDefinitionForSelection()` *macOS*
                
                Menampilkan kamus pop-up yang mencari kata yang dipilih pada halaman.
                
                #### `contents.isOffscreen()`
                
                Returns `Boolean` - Indicates whether *offscreen rendering* is enabled.
                
                #### `contents.startPainting()`
                
                If *offscreen rendering* is enabled and not painting, start painting.
                
                #### `contents.stopPainting()`
                
                If *offscreen rendering* is enabled and painting, stop painting.
                
                #### `contents.isPainting()`
                
                Returns `Boolean` - If *offscreen rendering* is enabled returns whether it is currently painting.
                
                #### `contents.setFrameRate(fps)`
                
                * `fps` Integer
                
                If *offscreen rendering* is enabled sets the frame rate to the specified number. Only values between 1 and 60 are accepted.
                
                #### `contents.getFrameRate()`
                
                Returns `Integer` - If *offscreen rendering* is enabled returns the current frame rate.
                
                #### `contents.invalidate()`
                
                Schedules a full repaint of the window this web contents is in.
                
                If *offscreen rendering* is enabled invalidates the frame and generates a new one through the `'paint'` event.
                
                #### `contents.getWebRTCIPHandlingPolicy()`
                
                Returns `String` - Returns the WebRTC IP Handling Policy.
                
                #### `contents.setWebRTCIPHandlingPolicy(policy)`
                
                * `policy` String - Tentukan Kebijakan Penanganan IP WebRTC. 
                  * `default ` - Mengekspos IP publik dan lokal pengguna. Ini adalah defaultnya tingkah laku. Bila kebijakan ini digunakan, WebRTC berhak untuk menghitung semua antarmuka dan mengikat mereka untuk menemukan antarmuka publik.
                  * `default_public_interface_only` - Mengekspos IP publik pengguna, namun tidak paparkan IP lokal pengguna. When this policy is used, WebRTC should only use the default route used by http. Ini tidak mengekspos alamat lokal apapun.
                  * `default_public_and_private_interfaces` - Paparkan IP publik dan lokal pengguna. Saat kebijakan ini digunakan, WebRTC seharusnya hanya menggunakan rute default yang digunakan dengan http. Ini juga menunjukkan alamat pribadi default yang terkait. Default Rute adalah rute yang dipilih oleh OS pada titik akhir multi-homed.
                  * `disable_non_proxied_udp` - Does not expose public or local IPs. When this policy is used, WebRTC should only use TCP to contact peers or servers unless the proxy server supports UDP.
                
                Setting the WebRTC IP handling policy allows you to control which IPs are exposed via WebRTC. See [BrowserLeaks](https://browserleaks.com/webrtc) for more details.
                
                #### `contents.getOSProcessId()`
                
                Returns `Integer` - The operating system `pid` of the associated renderer process.
                
                #### `contents.getProcessId()`
                
                Returns `Integer` - The Chromium internal `pid` of the associated renderer. Can be compared to the `frameProcessId` passed by frame specific navigation events (e.g. `did-frame-navigate`)
                
                #### `contents.takeHeapSnapshot(filePath)`
                
                * `filePath` String - Path to the output file.
                
                Returns `Promise<void>` - Indicates whether the snapshot has been created successfully.
                
                Takes a V8 heap snapshot and saves it to `filePath`.
                
                #### `contents.setBackgroundThrottling(allowed)`
                
                * `allowed` Boolean
                
                Controls whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.
                
                #### `contents.getType()`
                
                Returns `String` - the type of the webContent. Can be `backgroundPage`, `window`, `browserView`, `remote`, `webview` or `offscreen`.
                
                ### Contoh properti
                
                #### `contents.id`
                
                A `Integer` representing the unique ID of this WebContents.
                
                #### `contents.session`
                
                A [`Session`](session.md) used by this webContents.
                
                #### `contents.hostWebContents`
                
                A [`WebContents`](web-contents.md) instance that might own this `WebContents`.
                
                #### `contents.devToolsWebContents`
                
                A `WebContents` of DevTools for this `WebContents`.
                
                **Note:** Users should never store this object because it may become `null` when the DevTools has been closed.
                
                #### `contents.debugger`
                
                A [Debugger](debugger.md) instance for this webContents.