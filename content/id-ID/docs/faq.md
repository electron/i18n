# FAQ Elektronika

## Mengapa saya menemui kesulitan menginstal Electron?

Saat menjalankan `npm menginstal elektron`, beberapa pengguna sesekali menemuinya kesalahan instalasi.

Di hampir semua kasus, kesalahan ini adalah hasil dari masalah jaringan dan tidak masalah aktual dengan `electron` paket npm. Kesalahan seperti `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, dan `ETIMEDOUT` adalah semua indikasi dari hal tersebut. masalah jaringan. The best resolution is to try switching networks, or wait a bit and try installing again.

Anda juga dapat mencoba mendownload Electron langsung dari [Electron/Electron/pelepasan](https://github.com/electron/electron/releases) Jika memasang melalui `npm`gagal.

## Ketika Electron akan meng-upgrade ke Chrome terbaru?

Versi Chrome Electron biasanya terbentur dalam satu atau dua minggu setelahnya versi Chrome stabil baru akan dirilis. Perkiraan ini tidak dijamin dan tergantung pada jumlah pekerjaan yang terlibat dengan peningkatan.

Hanya saluran stabil Chrome yang digunakan. Jika perbaikan penting ada dalam versi beta atau dev Saluran, kita akan back-port itu.

Untuk informasi lebih lanjut, silakan lihat [pengenalan keamanan](tutorial/security.md).

## Kapan Electron akan tingkatkan ke Node.js terbaru?

Ketika sebuah versi baru dari Node.js akan dirilis, kita biasanya menunggu selama sebulan sebelum meningkatkannya salah satu di Electron. Jadi kita bisa menghindari terkena bug diperkenalkan dalam versi Node.js baru, yang sangat sering terjadi.

Fitur baru Node.js biasanya dibawa oleh tingkatan V8, karena Electron adalah menggunakan V8 dikirimkan oleh browser Chrome, fitur JavaScript baru mengkilap dari Versi Node.js yang baru biasanya sudah ada di Electron.

## Bagaimana cara berbagi data antara halaman web?

Untuk berbagi data antara halaman web (proses renderer) cara paling sederhana adalah dengan gunakan HTML5 API yang sudah tersedia di browser. Kandidat yang baik adalah [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), dan [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Atau anda bisa menggunakan sistem IPC, yang khusus untuk Electron, untuk menyimpan objek dalam proses utama sebagai variabel global, dan kemudian mengaksesnya dari renderers melalui `remot`elemen`electron`modul:

```javascript
// In the main process.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## Aplikasi saya jendela/nampan menghilang setelah beberapa menit.

Ini terjadi ketika variabel yang digunakan untuk menyimpan jendela/nampan mendapat sampah dikumpulkan.

Jika Anda mengalami masalah ini, artikel berikut mungkin bisa membantu:

* [Manajemen memori](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Lingkup variabel](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Jika Anda ingin memperbaiki cepat, Anda bisa membuat variabel global dengan mengubahnya kode dari ini:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

ini:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Saya tidak dapat menggunakan jQuery/RequireJS/Meteor/AngularJS di electron.

Karena integrasi Electron Node.js, ada beberapa simbol tambahan dimasukkan ke dalam DOM seperti `module`, `export`, `require`. Hal ini menyebabkan masalah untuk beberapa perpustakaan karena mereka ingin memasukkan simbol dengan nama yang sama.

Untuk memecahkan masalah ini, Anda dapat menonaktifkan node integrasi dalam electron:

```javascript
// In the main process.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
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

Ini karena Anda memasang modul [npm `electron` modul](https://www.npmjs.com/package/electron)terinstal baik lokal maupun global, yang menggantikan modul built-in Electron.

Untuk memverifikasi apakah Anda menggunakan modul built-in yang benar, Anda dapat mencetaknya jalur `electron` modul:

```javascript
console.log(require.resolve('electron'))
```

dan kemudian memeriksa apakah itu dalam bentuk sebagai berikut:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

Jika itu seperti `node_modules/electron/index.js`, maka Anda harus melakukannya lepaskan npm `electron` modul, atau ganti namanya.

```sh
npm uninstall electron
npm uninstall -g electron
```

Namun jika Anda menggunakan modul built-in tapi masih mendapatkan kesalahan ini, sangat mungkin Anda menggunakan modul dalam proses yang salah. Sebagai contoh `electron.app` hanya dapat digunakan dalam proses utama, sedangkan`electron.webFrame` hanya tersedia dalam proses renderer.