# Elektron FAQ

## Mengapa saya menemui kesulitan menginstal Electron?

Saat menjalankan `npm menginstal elektron`, beberapa pengguna sesekali menemuinya kesalahan instalasi.

Di hampir semua kasus, kesalahan ini adalah hasil dari masalah jaringan dan tidak masalah aktual dengan `electron` paket npm. Kesalahan seperti `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, dan `ETIMEDOUT` adalah semua indikasi dari hal tersebut. masalah jaringan. Resolusi terbaik adalah untuk mencoba beralih jaringan, atau hanya menunggu sedikit dan mencoba menginstal lagi.

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

This happens when the variable which is used to store the window/tray gets garbage collected.

If you encounter this problem, the following articles may prove helpful:

* [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Variable Scope](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

If you want a quick fix, you can make the variables global by changing your code from this:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

to this:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## I can not use jQuery/RequireJS/Meteor/AngularJS in Electron.

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

To solve this, you can turn off node integration in Electron:

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

But if you want to keep the abilities of using Node.js and Electron APIs, you have to rename the symbols in the page before including other libraries:

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

## `require('electron').xxx` is undefined.

When using Electron's built-in module you might encounter an error like this:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```sh
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.