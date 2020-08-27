# Electron FAQ

## Mengapa saya menemui kesulitan menginstal Electron?

Saat menjalankan `npm install electron`, beberapa pengguna sesekali menemui kesalahan pada instalasi.

Di hampir semua kasus, kesalahan ini adalah hasil dari masalah jaringan dan tidak masalah dengan paket npm `electron`. Kesalahan seperti `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, dan `ETIMEDOUT` adalah semua indikasi dari masalah jaringan. Solusi terbaik adalah untuk mencoba mengganti jaringan, atau menunggu sebentar dan mencoba menginstall lagi.

Anda juga dapat mencoba mendownload Electron langsung dari [electron/electron/release](https://github.com/electron/electron/releases) Jika gagal menginstall melalui `npm`.

## Ketika Electron akan ditingkatkan ke versi Chrome terbaru?

Versi Chrome Electron biasanya terbentur dalam satu atau dua minggu setelahnya versi Chrome stabil baru akan dirilis. Perkiraan ini tidak menjamiin dan tergantung pada jumlah pekerjaan yang terlibat dalam proses upgrade.

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

Untuk informasi lebih lanjut, silakan lihat [pengenalan keamanan](tutorial/security.md).

## Kapan Electron akan tingkatkan ke Node.js terbaru?

Ketika sebuah versi baru dari Node.js akan dirilis, kita biasanya menunggu selama sebulan sebelum meningkatkannya salah satu di Electron. Jadi kita bisa menghindari terkena bug diperkenalkan dalam versi Node.js baru, yang sangat sering terjadi.

Fitur baru Node.js biasanya dibawa oleh tingkatan V8, karena Electron adalah menggunakan V8 dikirimkan oleh browser Chrome, fitur JavaScript baru mengkilap dari Versi Node.js yang baru biasanya sudah ada di Electron.

## Bagaimana cara berbagi data antara halaman web?

Untuk berbagi data antara halaman web (proses renderer) cara paling sederhana adalah dengan gunakan HTML5 API yang sudah tersedia di browser. Good candidates are [Storage API][storage], [`localStorage`][local-storage], [`sessionStorage`][session-storage], and [IndexedDB][indexed-db].

Alternatively, you can use the IPC primitives that are provided by Electron. To share data between the main and renderer processes, you can use the [`ipcMain`](api/ipc-main.md) and [`ipcRenderer`](api/ipc-renderer.md) modules. To communicate directly between web pages, you can send a [`MessagePort`][message-port] from one to the other, possibly via the main process using [`ipcRenderer.postMessage()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). Subsequent communication over message ports is direct and does not detour through the main process.

## Baki aplikasi saya menghilang setelah beberapa menit.

Hal ini terjadi saat variabel yang digunakan untuk menyimpan baki didapat sampah dikumpulkan.

Jika Anda mengalami masalah ini, artikel berikut mungkin bisa membantu:

* [Manajemen memori][memory-management]
* [Lingkup variabel][variable-scope]

Jika Anda ingin memperbaiki cepat, Anda bisa membuat variabel global dengan mengubahnya kode dari ini:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

ini:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Saya tidak dapat menggunakan jQuery/RequireJS/Meteor/AngularJS di electron.

Karena integrasi Electron Node.js, ada beberapa simbol tambahan dimasukkan ke dalam DOM seperti `module`, `export`, `require`. Hal ini menyebabkan masalah untuk beberapa perpustakaan karena mereka ingin memasukkan simbol dengan nama yang sama.

Untuk memecahkan masalah ini, Anda dapat menonaktifkan node integrasi dalam electron:

```javascript
// Pada proses utama.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Tetapi jika Anda ingin menyimpan kemampuan menggunakan Node.js dan Electron API, Anda harus mengubah nama simbol dalam halaman sebelum termasuk perpustakaan lain:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `memerlukan('elektron').xxx` tidak terdefinisi.

Bila menggunakan built-in modul Electron anda mungkin menemukan kesalahan seperti ini:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

Kemungkinan besar Anda menggunakan modul dalam proses yang salah. Sebagai contoh `electron.app` hanya dapat digunakan dalam proses utama, sedangkan`electron.webFrame` hanya tersedia dalam proses renderer.

## Font terlihat kabur, apa ini dan apa yang dapat saya lakukan?

If [sub-pixel anti-aliasing](http://alienryderflex.com/sub_pixel/) is deactivated, then fonts on LCD screens can look blurry. Contoh:

![subpixel rendering example][]

Anti-aliasing sub-piksel membutuhkan latar belakang non-transparan dari layer yang berisi font glyphs. (Lihat [isu ini](https://github.com/electron/electron/issues/6344#issuecomment-420371918) untuk info lebih lanjut).

To achieve this goal, set the background in the constructor for [BrowserWindow][browser-window]:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Even if you don't see a difference, some of your users may. It is best to always set the background this way, unless you have reasons not to do so.

Perhatikan bahwa hanya mengatur latar belakang di CSS tidak menimbulkan efek yang diinginkan.

[memory-management]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
[variable-scope]: https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[session-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[indexed-db]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[message-port]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[browser-window]: api/browser-window.md
[subpixel rendering example]: images/subpixel-rendering-screenshot.gif
