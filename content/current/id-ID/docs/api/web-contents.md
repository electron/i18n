# konten web

> Membuat dan mengontrol halaman web.

Proses: [Main](../glossary.md#main-process)

`webContents` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ini bertanggung jawab untuk kontrol dan mengendalikan halaman web dan properti objek [`Jendela Peramban`](browser-window.md). Contoh untuk mengakses objek `isi web`:

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

Proses: [utama](../glossary.md#main-process)

### Contoh peristiwa

#### Event: 'Apakah-selesai-load'

Dibunyikan apabila navigasi dilakukan, yakni pemintal tab telah berhenti berputar dan acara `pada beban` dikirim.

#### Peristiwa: 'Apakah-gagal-beban'

Pengembalian:

* `event` Sinyal
* `kode kesalahan` Bilangan bulat
* `Deskripsi kesalahan` Tali
* `memvalidasi URL` Tali
* `adalah Bingkai Utama` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

This event is like `did-finish-load` but emitted when the load failed. Daftar lengkap kode galat dan makna mereka tersedia [di sini](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

#### Event: 'did-fail-provisional-load'

Pengembalian:

* `peristiwa` Peristiwa
* `kode kesalahan` Bilangan bulat
* `Deskripsi kesalahan` Tali
* `memvalidasi URL` Tali
* `adalah Bingkai Utama` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

This event is like `did-fail-load` but emitted when the load was cancelled (e.g. `window.stop()` was invoked).

#### Peristiwa: 'Apakah-frame-selesai-beban'

Pengembalian:

* `event</ 0> Acara</li>
<li><code>adalah Bingkai Utama` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Dibunyikan apabila bingkai telah melakukan navigasi.

#### Peristiwa: 'Apakah-mulai-pemuatan'

Sesuai dengan poin pada saat pemintal tab berhenti berputar.

#### Peristiwa: 'Apakah-stop-pemuatan'

Sesuai dengan poin pada saat pemintal tab berhenti berputar.

#### Peristiwa: 'lokal-siap'

Pengembalian:

* `acara` Acara

dipancarkan saat dokumen dalam bingkai yang diberikan dimuat.

#### Acara : 'halaman-judul-diperbarui'

Pengembalian:

* `acara` Acara
* ` judul </ 0> String</li>
<li><code>explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

#### Peristiwa: 'halaman-favicon-diperbarui '

Pengembalian:

* `event` Acara
* `FAVICONS` String [] - serangkaian URL.

Dibunyikan saat halaman menerima url favicon.

#### Peristiwa: 'baru-jendela'

Pengembalian:

* `acara` Acara
* `url` String
* `nama bingkai` tali
* `disposisi` String - dapat `default`, `latar depan-tab`, `latar belakang-tab`, `jendela baru`, `Simpan ke disk` dan `lainnya`.
* `options` BrowserWindowConstructorOptions - The options which will be used for creating the new [`BrowserWindow`](browser-window.md).
* `fitur tambahan` String [] - fitur tidak-standar (fitur tidak ditangani oleh Kromium atau elektron) diberikan kepada `jendela terbuka()`.
* `referrer` [Referrer](structures/referrer.md) - The referrer that will be passed to the new window. May or may not result in the `Referer` header being sent, depending on the referrer policy.

Emitted when the page requests to open a new window for a `url`. It could be requested by `window.open` or an external link like `<a target='_blank'>`.

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
* ` url </ 0> Tali</li>
</ul>

<p spaces-before="0">Emitted when a user or the page wants to start navigation. It can happen when
the <code>window.location` object is changed or a user clicks a link in the page.</p>

Peristiwa ini tidak akan memancarkan saat navigasi dimulai secara pemrograman API seperti `isi web memuat URL` dan `isi web kembali`.

It is also not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Memanggil `peristiwa.mencegah Default()` akan mencegah navigasi.

#### Event: 'did-start-navigation'

Pengembalian:

* `acara` Acara
* `url` Tali
* `isInPlace` Boolean
* `adalah Bingkai Utama` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when any frame (including main) starts navigating. `isInplace` will be `true` for in-page navigations.

#### Event: 'will-redirect'

Pengembalian:

* `acara` Acara
* `url` String
* `isInPlace` Boolean
* `adalah Bingkai Utama` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted as a server side redirect occurs during navigation.  For example a 302 redirect.

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

Emitted after a server side redirect occurs during navigation.  For example a 302 redirect.

This event can not be prevented, if you want to prevent redirects you should checkout out the `will-redirect` event above.

#### Peristiwa: 'akan navigasi'

Pengembalian:

* `acara` Acara
* `url` String
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - empty for non HTTP navigations

Emitted when a main frame navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

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

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### peristiwa: 'Apakah-menavigasi-di halaman'

Pengembalian:

* `acara` Acara
* `url` String
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

* `acara` Acara
* `input` Object - Input properties.
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

#### Event: 'zoom-changed'

Pengembalian:
* `acara` Acara
* `zoomDirection` String - Can be `in` or `out`.

Emitted when the user is requesting to change the zoom level using the mouse wheel.

#### Event: 'devtools-dibuka'

Emitted saat DevTools dibuka.

#### Event: 'devtools-ditutup'

Emitted saat DevTools ditutup.

#### Event: 'fokus devtools'

Emitted saat DevTools difokuskan / dibuka.

#### Acara: 'sertifikat-kesalahan'

Pengembalian:

* `acara` Acara
* `url` String
* `error` String - Kode kesalahan.
* `sertifikat` [Sertifikat](structures/certificate.md)
* `callback ` Fungsi
  * `Terpercaya` Boolean -Menunjukkan apakah sertifikat bisa dianggap terpercaya.

Emitted ketika gagal untuk memverifikasi `sertifikat` untuk `url`.

Penggunaannya sama dengan [the `certificate-error` event of `app`](app.md#event-certificate-error).

#### Acara: 'pilih-klien-sertifikat'

Pengembalian:

* `acara` Acara
* `url` URL
* `certificateList` [Sertifikat[]](structures/certificate.md)
* `callback ` Fungsi
  * `sertifikat` [Sertifikat](structures/certificate.md) - Harus berupa sertifikat dari daftar yang diberikan.

Emitted ketika sertifikat klien diminta.

Penggunaannya sama dengan [the `pilih-sertifikat-klien` acara `app`](app.md#event-select-client-certificate).

#### Acara: 'login'

Pengembalian:

* `acara` Acara
* `authenticationResponseDetails` Object
  * `url` URL
* `authInfo` Object
  * ` isProxy </ 0>  Boolean</li>
<li><code>skema` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback ` Fungsi
  * `username` String (optional)
  * `password` String (optional)

Emitted ketika `webContents` ingin melakukan auth dasar.

Penggunaannya sama dengan [the `masuk` event of `app`](app.md#event-login).

#### Event: 'ditemukan-di-halaman'

Pengembalian:

* `acara` Acara
* `result` Object
  * `requestId` Bilangan bulat
  * `activeMatchOrdinal` Bulat - posisi pertandingan aktif.
  * `pertandingan` Bulat - jumlah pertandingan.
  * `selectionArea` Rectangle - Coordinates of first match region.
  * `finalUpdate` Boolean

Dipancarkan saat hasilnya tersedia [`webContents.findInPage`] permintaan.

#### Event: 'media-mulai-bermain''

Emitted saat media mulai diputar.

#### Event: 'media-berhenti'

Emitted saat media dijeda atau dilakukan bermain.

#### Event: 'apakah-ganti-tema-warna'

Pengembalian:

* `acara` Acara
* `color` (String | null) - Theme color is in format of '#rrggbb'. It is `null` when no theme color is set.

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

#### Event: 'update-target-url'

Pengembalian:

* `acara` Acara
* `url` String

Emitted saat mouse bergerak di atas sebuah link atau keyboard memindahkan fokus ke sebuah link.

#### Event: 'kursor-berubah'

Pengembalian:

* `acara` Acara
* `jenis` String
* ` gambar </ 0>  <a href="native-image.md"> NativeImage </ 1> (opsional)</li>
<li><code>skala` Mengambang (opsional) - skala faktor untuk kursor kustom.
* `ukuran` [Ukuran](structures/size.md) (opsional) - ukuran `gambar`.
* `hotspot` [Titik](structures/point.md) (opsional) - koordinat kursor kustom Hotspot.

Emitted saat tipe kursor berubah. The `type` parameter can be `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` or `custom`.

If the `type` parameter is `custom`, the `image` parameter will hold the custom cursor image in a [`NativeImage`](native-image.md), and `scale`, `size` and `hotspot` will hold additional information about the custom cursor.

#### Event: 'menu konteks'

Pengembalian:

* `acara` Acara
* `params` Object
  * `x` koordinat Integer - x.
  * ` y </ 0>  Koordinat integer.</li>
<li><code> linkURL </ 0>  String - URL tautan yang membungkus node menu konteks dipanggil.</li>
<li><code>linkText` String - Text associated with the link. May be an empty string if the contents of the link are an image.
  * ` pageURL `  String - URL halaman tingkat atas yang diikuti menu konteks.
  * `frameURL` String - URL subframe yang diikuti menu konteks.
  * `srcURL` String - Source URL for the element that the context menu was invoked on. Elements with source URLs are images, audio and video.
  * `mediaType` String - jenis node menu konteks dipanggil pada. Bisa `none`, ` gambar`, `audio`, `video`, `kanvas`, `file` atau `plugin`.
  * `hasImageContents` Boolean - Apakah menu konteks dipanggil pada gambar yang isinya tidak kosong.
  * `isEditable` Boolean - Apakah konteks dapat diedit.
  * `selectionText` String - Teks pilihan bahwa menu konteks dipanggil.
  * `titleText` String - Judul atau teks alt dari pilihan yang konteksnya dipanggil.
  * `salah eja` String - Kata salah eja di bawah kursor, jika ada.
  * `dictionarySuggestions` String[] - An array of suggested words to show the user to replace the `misspelledWord`.  Only available if there is a misspelled word and spellchecker is enabled.
  * `frameCharset` String - Pengkodean karakter dari bingkai tempat menu dipanggil.
  * `inputFieldType` String - Jika menu konteks dipanggil pada bidang masukan, jenis bidang itu. Nilai yang mungkin adalah `tidak ada` `plainText`, `sandi`, `lain`.
  * `menuSourceType` String - Input source that invoked the context menu. Can be `none`, `mouse`, `keyboard`, `touch` or `touchMenu`.
  * `mediaFlags` Object - The flags for the media element the context menu was invoked on.
    * `inError` Boolean - Apakah elemen media telah jatuh.
    * `isPaused` Boolean - Apakah elemen media dijeda.
    * `isMuted` Boolean - Apakah elemen media dimatikan.
    * `hasAudio` Boolean - Apakah elemen media memiliki audio.
    * `isLooping` Boolean - Apakah elemen media adalah perulangan.
    * `isControlsVisible` Boolean - Apakah kontrol elemen media terlihat.
    * `canToggleControls` Boolean - Apakah kontrol elemen media dapat dialihkan.
    * `canRotate` Boolean - Apakah elemen media dapat diputar.
  * `editFlags` Object - These flags indicate whether the renderer believes it is able to perform the corresponding action.
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

* `acara` Acara
* `perangkat` [[BluetoothDevice]](structures/bluetooth-device.md)
* `callback ` Fungsi
  * `deviceId` String

Dipancarkan saat perangkat bluetooth perlu dipilih saat dihubungi `navigator.bluetooth.requestDevice`. Menggunakan `navigator.bluetooth` api `webBluetooth` harus diaktifkan. Jika `event.preventDefault` tidak disebut, perangkat tersedia pertama akan dipilih. `callback` harus disebut dengan `deviceId` untuk dipilih, melewati string kosong ke `callback` akan membatalkan permintaan.

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

#### Event: 'cat'

Pengembalian:

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

#### Event: 'devtools-reload-halaman'

Dibunyikan apabila jendela devtools memerintahkan webContents untuk reload

#### Event: 'akan-melampirkan-webview'

Pengembalian:

* `acara` Acara
* `webPreferences` WebPreferences - The web preferences that will be used by the guest page. This object can be modified to adjust the preferences for the guest page.
* `params` Record<string, string> - The other `<webview>` parameters such as the `src` URL. This object can be modified to adjust the parameters of the guest page.

Emitted when a `<webview>`'s web contents is being attached to this web contents. Calling `event.preventDefault()` will destroy the guest page.

Acara ini dapat digunakan untuk mengkonfigurasi `webPreferences` untuk `webContents` dari `<webview>`sebelum dimuat, dan menyediakan kemampuan untuk mengatur pengaturan yang tidak dapat diatur melalui `<webview>`atribut.

**Catatan:** Opsi script tertentu `preload` akan muncul sebagai `preloadURL` (tidak `preload`) di objek `webPreferences` yang dipancarkan dengan acara ini.

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

Emitted when the associated window logs a console message.

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

<p spaces-before="0">Emitted when the renderer process sends an asynchronous message via <code>ipcRenderer.send()`.</p>

#### Event: 'ipc-message-sync'

Pengembalian:

* `acara` Acara
* ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p spaces-before="0">Emitted when the renderer process sends a synchronous message via <code>ipcRenderer.sendSync()`.</p>

#### Event: 'desktop-capturer-get-sources'

Pengembalian:

* `acara` Acara

Emitted when `desktopCapturer.getSources()` is called in the renderer process. Calling `event.preventDefault()` will make it return empty sources.

#### Event: 'remote-require'

Pengembalian:

* `event` IpcMainEvent
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-global'

Pengembalian:

* `event` IpcMainEvent
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process. Calling `event.preventDefault()` will prevent the global from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-builtin'

Pengembalian:

* `event` IpcMainEvent
* `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-current-window'

Pengembalian:

* `event` IpcMainEvent

Emitted when `remote.getCurrentWindow()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-current-web-contents'

Pengembalian:

* `event` IpcMainEvent

Emitted when `remote.getCurrentWebContents()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-guest-web-contents'

Pengembalian:

* `event` IpcMainEvent
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Metode Instance

#### `contents.loadURL (url [, opsi])`

* ` url </ 0> String</li>
<li><code>options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * ` userAgent </ 0>  String (opsional) - Agen pengguna yang berasal dari permintaan.</li>
<li><code>extraHeaders` String (opsional) - header tambahan yang dipisahkan oleh "\n".
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * ` baseURLForDataURL </ 0>  String (opsional) - URL dasar (dengan pemisah jalur trailing) untuk file yang akan dimuat oleh url data. Hal ini diperlukan hanya jika ditentukan <code>url` data url dan perlu memuat file lainnya.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)). A noop rejection handler is already attached, which avoids unhandled rejection errors.

Beban `url` di jendela. `Url` harus mengandung prefiks protokol, misalnya `http://` atau `file://`. Jika beban harus mem-bypass http cache kemudian menggunakan `pragma` header untuk mencapainya.

```javascript
const { webContents } = require('electron')
const options = { extraHeaders: 'pragma: no-cache\n' }
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath[, options])`

* `fullPath` String
* `options` Object (optional)
  * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Loads the given file in the window, `filePath` should be a path to an HTML file relative to the root of your application.  For instance an app structure like this:

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

* ` url </ 0> String</li>
</ul>

<p spaces-before="0">Initiates a download of the resource at <code>url` without navigating. The `will-download` event of `session` will be triggered.</p>

#### `contents.getURL()`

Mengembalikan `String` - URL laman web saat ini.

```javascript
const { BrowserWindow } = require('electron') membiarkan memenangkan = baru BrowserWindow({ width: 800, height: 600 }) win.loadURL ('http://github.com') Biarkan currentURL = win.webContents.getURL() console.log(currentURL)
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

#### `isi.reload()`

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

#### `isi.goForward()`

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

**[Tidak berlaku lagi](modernization/property-updates.md)**

#### `contents.getUserAgent()`

Mengembalikan `String` - Agen pengguna untuk halaman web ini.

**[Tidak berlaku lagi](modernization/property-updates.md)**

#### `contents.insertCSS(css[, options])`

* `css` String
* `options` Object (optional)
  * `cssOrigin` String (optional) - Can be either 'user' or 'author'; Specifying 'user' enables you to prevent websites from overriding the CSS you insert. Default is 'author'.

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `contents.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

```js
contents.on('did-finish-load', function () {
  contents.insertCSS('html, body { background-color: #f00; }')
})
```

#### `contents.removeInsertedCSS(key)`

* `kunci` senar

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `contents.insertCSS(css)`.

```js
contents.on('did-finish-load', async function () {
  const key = await contents.insertCSS('html, body { background-color: #f00; }')
  contents.removeInsertedCSS(key)
})
```

#### `contents.executeJavaScript(code[, userGesture])`

* `id` String
* `userGesture` Boolean (opsional) - Default adalah `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluasi `kode` di halaman.

Di jendela browser beberapa API HTML seperti `requestFullScreen` hanya bisa dipanggil oleh isyarat dari pengguna. Setting `userGesture` ke `true` akan dihapus keterbatasan ini.

Code execution will be suspended until web page stop loading.

```js
isi.executeJavaScript('ambil("https://jsonplaceholder.typicode.com/users/1"). kemudian (resp => resp.json())', true)
  .Kemudian ((hasil) => {
    console.log (result) // Akan menjadi objek JSON dari fetch call
  })
```

#### `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electron's `contextIsolation` feature.  You can provide any integer here.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opsional) - Default adalah `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Works like `executeJavaScript` but evaluates `scripts` in an isolated context.

#### `contents.setIgnoreMenuShortcuts (abaikan)` _Eksperimental_

* `mengabaikan` Boolean

Abaikan shortcut menu aplikasi sementara konten web ini difokuskan.

#### `contents.setAudioMuted(dibungkam)`

* `dibungkam` Boolean

Sesuaikan render halaman web saat ini.

**[Tidak berlaku lagi](modernization/property-updates.md)**

#### `isi.isAudioMuted()`

Mengembalikan `Boolean` - Apakah halaman ini telah dibungkam.

**[Tidak berlaku lagi](modernization/property-updates.md)**

#### `contents.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

#### `contents.setZoomFactor(faktor)`

* `factor` Double - Zoom factor; default is 1.0.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

The factor must be greater than 0.0.

**[Tidak berlaku lagi](modernization/property-updates.md)**

#### `contents.getZoomFactor()`

Returns `Number` - the current zoom factor.

**[Tidak berlaku lagi](modernization/property-updates.md)**

#### `contents.setZoomLevel(level)`

* `level` Angka - level zoom.

Mengubah tingkat zoom ke tingkat tertentu. Ukuran aslinya adalah 0 dan masing-masing Peningkatan atas atau di bawah mewakili zoom 20% lebih besar atau lebih kecil ke default batas 300% dan 50% dari ukuran aslinya, berurutan. The formula for this is `scale := 1.2 ^ level`.

**[Tidak berlaku lagi](modernization/property-updates.md)**

#### `contents.getZoomLevel()`

Returns `Number` - the current zoom level.

**[Tidak berlaku lagi](modernization/property-updates.md)**

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimalLevel` Nomor
* `maksimalLevel` Nomor

Returns `Promise<void>`

Menetapkan maksimum dan minimum tingkat mencubit-to-zoom.

> **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
> 
> `js
  contents.setVisualZoomLevelLimits(1, 3)`

#### `contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)` _Deprecated_

* `minimalLevel` Nomor
* `maksimalLevel` Nomor

Returns `Promise<void>`

Menetapkan tingkat zoom maksimal dan minimal berbasis tata letak (yaitu bukan-visual).

**Deprecated:** This API is no longer supported by Chromium.

#### `contents.undo()`

Jalankan perintah pengeditan `undo` di halaman web.

#### `konten.redo()`

Jalankan perintah pengeditan `ulangi` di halaman web.

#### `konten.potong()`

Jalankan perintah pengeditan `potong` di halaman web.

#### `konten.mengkopi()`

Jalankan perintah pengeditan `copy` di halaman web.

#### `contents.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Salin gambar pada posisi yang diberikan ke clipboard.

#### `contents.paste()`

Jalankan perintah pengeditan `paste` di halaman web.

#### `contents.pasteAndMatchStyle()`

Jalankan perintah pengeditan `pasteAndMatchStyle` di halaman web.

#### `konten.menghapus()`

Jalankan perintah pengeditan `hapus` di halaman web.

#### `konten.memilihsemua()`

Jalankan perintah pengeditan `selectAll` di halaman web.

#### `konten.tidakmemilih()`

Jalankan perintah pengeditan `batalkan pilihan` di halaman web.

#### `isi.replace(teks)`

* `teks` String

Jalankan perintah pengeditan `ganti` di halaman web.

#### `contents.replaceMisspelling(teks)`

* `teks` String

Jalankan perintah pengeditan `replaceMisspelling` di halaman web.

#### `konten.mencaritek()`

* `teks` String

Returns `Promise<void>`

Sisipan `teks` ke elemen yang terfokus.

#### `contents.findInPage(teks[, pilihan])`

* `text` String - Konten yang akan dicari, tidak boleh kosong.
* `options` Object (optional)
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. default ke ` false </ 0>.</li>
<li><code>medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Menerima beberapa kecocokan intra-kata lainnya, defaultnya adalah `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](web-contents.md#event-found-in-page) event.

#### `contents.stopFindInPage(tindakan)`

* `action` String - Specifies the action to take place when ending [`webContents.findInPage`] request.
  * `clearSelection` - jelas pilihan.
  * `keepSelection` - menerjemahkan pemilihan menjadi sebuah pilihan yang normal.
  * `activateSelection` - fokus dan klik seleksi simpul.

Berhenti setiap permintaan `findInPage` untuk `webContents` dengan disediakan `tindakan`.

```javascript
const { webContents } = require('electron') webContents.on (' ditemukan-di-halaman ', (acara, hasil) = > {jika webContents.stopFindInPage('clearSelection') (result.finalUpdate)}) const requestId = webContents.findInPage('api') console.log(requestId)
```

#### `contents.capturePage([rect])`

* `rect` [Persegi panjang](structures/rectangle.md) (opsional) - daerah halaman untuk ditangkap.

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Menangkap sebuah snapshot dari halaman dalam `rect`. Omitting `rect` will capture the whole visible page.

#### `contents.isBeingCaptured()`

Returns `Boolean` - Whether this page is being captured. It returns true when the capturer count is large then 0.

#### `contents.incrementCapturerCount([size, stayHidden])`

* `size` [Size](structures/size.md) (optional) - The perferred size for the capturer.
* `stayHidden` Boolean (optional) -  Keep the page hidden instead of visible.

Increase the capturer count by one. The page is considered visible when its browser window is hidden and the capturer count is non-zero. If you would like the page to stay hidden, you should ensure that `stayHidden` is set to true.

This also affects the Page Visibility API.

#### `contents.decrementCapturerCount([stayHidden])`

* `stayHidden` Boolean (optional) -  Keep the page in hidden state instead of visible.

Decrease the capturer count by one. The page will be set to hidden or occluded state when its browser window is hidden or occluded and the capturer count reaches zero. If you want to decrease the hidden capturer count instead you should set `stayHidden` to true.

#### `konten.mendapatkanpercetakan()`

Dapatkan daftar printer sistem.

Mengembalikan [`membuatinfo[]`](structures/printer-info.md)

#### `contents.print([options], [callback])`

* `options` Object (optional)
  * `silent` Boolean (optional) - Don't ask user for print settings. Defaultnya adalah ` false </ 0> .</li>
<li><code>printBackground` Boolean (optional) - Prints the background color and image of the web page. Defaultnya adalah ` false </ 0> .</li>
<li><code>deviceName` String (optional) - Set the printer device name to use. Must be the system-defined name and not the 'friendly' name, e.g 'Brother_QL_820NWB' and not 'Brother QL-820NWB'.
  * `color` Boolean (optional) - Set whether the printed web page will be in color or grayscale. Defaultnya adalah `true`.
  * `margins` Object (optional)
    * `marginType` String (optional) - Can be `default`, `none`, `printableArea`, or `custom`. If `custom` is chosen, you will also need to specify `top`, `bottom`, `left`, and `right`.
    * `top` Number (optional) - The top margin of the printed web page, in pixels.
    * `bottom` Number (optional) - The bottom margin of the printed web page, in pixels.
    * `left` Number (optional) - The left margin of the printed web page, in pixels.
    * `right` Number (optional) - The right margin of the printed web page, in pixels.
  * `landscape` Boolean (optional) - Whether the web page should be printed in landscape mode. Defaultnya adalah ` false </ 0> .</li>
<li><code>scaleFactor` Number (optional) - The scale factor of the web page.
  * `pagesPerSheet` Number (optional) - The number of pages to print per page sheet.
  * `collate` Boolean (optional) - Whether the web page should be collated.
  * `copies` Number (optional) - The number of copies of the web page to print.
  * `pageRanges` Record<string, number> (optional) - The page range to print. Should have two keys: `from` and `to`.
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Object (optional)
    * `horizontal` Number (optional) - The horizontal dpi.
    * `vertical` Number (optional) - The vertical dpi.
  * `header` String (optional) - String to be printed as page header.
  * `footer` String (optional) - String to be printed as page footer.
* `callback` Fungsi (opsional)
  * `success` Boolean - Indicates success of the print call.
  * `failureReason` String - Error description called back if the print fails.

Mencetak halaman web jendela. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Gunakan `halaman-break-before: always;` Gaya CSS untuk memaksa mencetak ke halaman baru.

Example usage:

```js
const options = { silent: true, deviceName: 'My-Printer' }
win.webContents.print(options, (success, errorType) => {
  if (!success) console.log(errorType)
})
```

#### `contents.printToPDF(options)`

* `options` Object
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be`A3`,`A4`,`A5`,` Legal `,`Letter`,`Tabloid` or an Object containing `height` and `width` in microns.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.

Returns `Promise<Buffer>` - Resolves with the generated PDF data.

Mencetak halaman web jendela sebagai PDF dengan custom printing preview Chromium pengaturan.

The `landscape` will be ignored if `@page` CSS at-rule is used in the web page.

By default, an empty `options` will be regarded as:

```javascript
{marginsType: 0, printBackground: false, printSelectionOnly: false, landscape: false}
```

Gunakan `halaman-break-before: always;` Gaya CSS untuk memaksa mencetak ke halaman baru.

An example of `webContents.printToPDF `:

```javascript
const { BrowserWindow } = require('electron')
const fs = require('fs')

let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}).then(data => {
    fs.writeFile('/tmp/print.pdf', data, (error) => {
      if (error) throw error
      console.log('Write PDF successfully.')
    })
  }).catch(error => {
    console.log(error)
  })
})
```

#### `contents.addWorkSpace (path)`

* ` path </ 0>  String</li>
</ul>

<p spaces-before="0">Adds the specified path to DevTools workspace. Must be used after DevTools
creation:</p>

<pre><code class="javascript">const { BrowserWindow } = require ('electron') let win = new BrowserWindow () win.webContents.on ('devtools-opened', () = > {win.webContents.addWorkSpace (__ dirname)})
`</pre>

#### `konten.memindahkanruankerja(jalur)`

* ` path </ 0>  String</li>
</ul>

<p spaces-before="0">Menghapus jalur yang ditentukan dari ruang kerja DevTools.</p>

<h4 spaces-before="0"><code>contents.setDevToolsWebContents(devToolsWebContents)`</h4>

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

#### `konten.membukaDevAlat([options])`

* `options` Object (optional)
  * `mode` String - Membuka devtool dengan status dermaga tertentu, bisa `kanan`, `bawah`, `undocked`, `lepas`. Default untuk terakhir digunakan dermaga negara. Pada mode `undocked`, mungkin untuk kembali ke dermaga. Di dalam `melepaskan` bukan mode itu.
  * `activate` Boolean (optional) - Whether to bring the opened devtools window to the foreground. The default is `true`.

Membuka devtools.

When `contents` is a `<webview>` tag, the `mode` would be `detach` by default, explicitly passing an empty `mode` can force using last used dock state.

#### `konten.menutupDevAlat()`

Menutup devtools.

#### `konten.apakahalatDevTerbuka()`

Mengembalikan `boolean` - apakah alatdev sudah terbuka.

#### `konten.apakahAlatDevsudahTerfokus()`

Mengembalikan `Boolean` - Apakah tampilan devtools terfokus.

#### `konten.mematikanAlatDev()`

Toggles alat pengembang.

#### `contents.inspectElement (x, y)`

* `x` Integer
* `y` Integer

Mulai memeriksa elemen pada posisi (`x`, `y`).

#### `contents.inspectSharedWorker()`

Opens the developer tools for the shared worker context.

#### `contents.inspectSharedWorkerById(workerId)`

* `workerId` String

Inspects the shared worker based on its ID.

#### `contents.getAllSharedWorkers()`

Returns [`SharedWorkerInfo[]`](structures/shared-worker-info.md) - Information about all Shared Workers.

#### `konten.inspectServiceWorker()`

Membuka alat pengembang untuk konteks pekerja layanan.

#### `contents.send(channel, ...args)`

* ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p spaces-before="0">Send an asynchronous message to the renderer process via <code>channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.</p>

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

Contoh pengiriman pesan dari proses utama ke proses renderer:

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

#### `contents.sendToFrame(frameId, channel, ...args)`

* `frameId` Integer
* ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p spaces-before="0">Send an asynchronous message to a specific frame in a renderer process via
<code>channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.</p>

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

If you want to get the `frameId` of a given renderer context you should use the `webFrame.routingId` value.  Misalnya

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

#### `contents.enableDeviceEmulation(parameter)`

* `parameters` Object
  * `screenPosition` String - Specify the screen type to emulate (default: `desktop`):
    * `desktop` - Jenis layar desktop.
    * `ponsel` - Jenis layar seluler.
  * `screenSize` [Ukuran](structures/size.md) - Menetapkan ukuran layar yang ditiru (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - Posisikan tampilan di layar (screenPosition == mobile) (default: `{ x: 0, y: 0 }`).
  * `deviceScaleFactor` Integer - Tetapkan faktor skala perangkat (jika nol default ke faktor skala perangkat asli) (default: `0`).
  * `viewSize` [Size](structures/size.md) - Set the emulated view size (empty means no override)
  * `skala` Float - Skala tampilan yang ditiru di dalam ruang yang tersedia (tidak sesuai untuk melihat mode) (default: ` 1 `).

Aktifkan emulasi perangkat dengan parameter yang diberikan.

#### `contents.disableDeviceEmulation()`

Disable device emulation enabled by `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(inputEvent)`

* `inputEvent` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Mengirim masukan `event` ke halaman. **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.

#### `<code>dirtyRect` [Rectangle](structures/rectangle.md)</code>

* `onlyDirty` Boolean (opsional) - Default ke `false`.
* `callback ` Fungsi
  * ` gambar </ 0>  <a href="native-image.md"> gambar asli </ 1></li>
<li><code>dirtyRect` [Persegi panjang](structures/rectangle.md)

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(image, dirtyRect)` when there is a presentation event.

The `image` is an instance of [NativeImage](native-image.md) that stores the captured frame.

`dirtyRect` adalah objek dengan properti `x, y, width, height` yang menggambarkan bagian mana dari halaman yang dicat ulang. If `onlyDirty` is set to `true`, `image` will only contain the repainted area. `onlyDirty` defaults to `false`.

#### `contents.endFrameSubscription()`

Akhiri berlangganan untuk presentasi peristiwa.

#### `contents.startDrag(item)`

* `item` Object
  * `file` String[] | String - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) | String - The image must be non-empty on macOS.

Menetapkan item `item` sebagai item drag untuk operasi drag-drop saat ini, `file` adalah path absolut dari file yang akan diseret, dan `icon` adalah gambar ditampilkan di bawah kursor saat menyeret.

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

#### `contents.showDefinitionForSelection()` _macos_

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

**[Tidak berlaku lagi](modernization/property-updates.md)**

#### `contents.getFrameRate()`

Mengembalikan `Integer` - Jika *rendering offscreen* diaktifkan mengembalikan frame rate saat ini.

**[Tidak berlaku lagi](modernization/property-updates.md)**

#### `contents.invalidate()`

Jadwal repaint penuh dari jendela isi web ini masuk.

Jika *offscreen rendering* diaktifkan akan membuat frame tidak valid dan menghasilkan yang baru satu melalui acara `'paint' `.

#### `contents.getWebRTCIPHandlingPolicy()`

Mengembalikan `String` - Mengembalikan Kebijakan Penanganan IP WebRTC.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` String - Specify the WebRTC IP Handling Policy.
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

#### `contents.audioMuted`

A `Boolean` property that determines whether this page is muted.

#### `contents.userAgent`

A `String` property that determines the user agent for this web page.

#### `contents.zoomLevel`

A `Number` property that determines the zoom level for this web contents.

The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

#### `contents.zoomFactor`

A `Number` property that determines the zoom factor for this web contents.

The zoom factor is the zoom percent divided by 100, so 300% = 3.0.

#### `contents.frameRate`

An `Integer` property that sets the frame rate of the web contents to the specified number. Only values between 1 and 60 are accepted.

Only applicable if *offscreen rendering* is enabled.

#### `contents.id` _Readonly_

A `Integer` mewakili ID unik dari Konten Web ini.

#### `contents.session` _Readonly_

[`Sesi`](session.md) digunakan oleh webContents ini.

#### `contents.hostWebContents` _Readonly_

Sebuah instance [`WebContents`](web-contents.md) yang mungkin sendiri ini `WebContents`.

#### `contents.devToolsWebContents` _Readonly_

A `WebContents | null` property that represents the of DevTools `WebContents` associated with a given `WebContents`.

**Catatan:** Pengguna harus tidak pernah menyimpan objek ini karena hal itu mungkin menjadi `null` ketika DevTools telah ditutup.

#### `contents.debugger` _Readonly_

A [`Debugger`](debugger.md) instance for this webContents.
