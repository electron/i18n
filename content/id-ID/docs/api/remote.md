# remot

> Gunakan modul proses utama dari proses renderer.

Proses: [Renderer](../glossary.md#renderer-process)

The `remote` Modul menyediakan cara sederhana untuk melakukan komunikasi antar proses (IPC) antara proses renderer (halaman web) dan proses utama.

Di Elektron, modul yang berhubungan dengan GUI (seperti `dialog`,`menu` etc.) hanya tersedia dalam proses utama, bukan dalam proses renderer. In order to use them from the renderer process, the `ipc` module is necessary to send inter-process messages to the main process. With the `remote` module, you can invoke methods of the main process object without explicitly sending inter-process messages, similar to Java's [RMI](http://en.wikipedia.org/wiki/Java_remote_method_invocation). An example of creating a browser window from a renderer process:

```javascript
const {BrowserWindow} = require('electron').remote
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

**Note:** Untuk kebalikannya (akses proses renderer dari proses utama), Kamu dapat memakai [webContents.executeJavascript](web-contents.md#contentsexecutejavascriptcode-usergesture-callback).

## Objek Jarak Jauh

Setiap objek (termasuk fungsi) dikembalikan oleh `remote` modul mewakili sebuah Objek dalam proses utama (kita menyebutnya remote object atau remote function). Saat Anda memanggil metode objek jarak jauh, panggil fungsi remote, atau buat Sebuah objek baru dengan konstruktor jarak jauh (fungsi), sebenarnya Anda mengirim pesan inter-proses sinkron.

In the example above, both `BrowserWindow` and `win` were remote objects and `new BrowserWindow` didn't create a `BrowserWindow` object in the renderer process. Instead, it created a `BrowserWindow` object in the main process and returned the corresponding remote object in the renderer process, namely the `win` object.

**Note:** Only [enumerable properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) which are present when the remote object is first referenced are accessible via remote.

**Note:** Arrays and Buffers are copied over IPC when accessed via the `remote` module. Modifying them in the renderer process does not modify them in the main process and vice versa.

## Lifetime dari Remote Objects

Elektron memastikan bahwa selama objek remote dalam proses renderer Hidup (dengan kata lain, belum ada sampah yang dikumpulkan), objek yang sesuai dalam proses utama tidak akan dilepaskan. Bila objek remote sudah ada Sampah dikumpulkan, objek yang sesuai dalam proses utamanya adalah dereferenced.

Jika objek jauh bocor dalam proses renderer (misalnya disimpan di peta tapi tidak pernah dibebaskan), objek yang sesuai dalam proses utama juga akan bocor, jadi Anda harus sangat berhati-hati untuk tidak membocorkan benda-benda remote.

Jenis nilai primer seperti senar dan angka, bagaimanapun, dikirim melalui salinan.

## Melewati callback ke proses utama

Kode dalam proses utama dapat menerima callback dari renderer - misalnya itu `remote` modul - tapi Anda harus sangat berhati-hati saat menggunakan ini fitur.

Pertama, untuk menghindari kebuntuan, callback masuk ke proses utama disebut asynchronous. Anda seharusnya tidak mengharapkan proses utama dapatkan nilai kembalian dari callback yang lewat.

Misalnya Anda tidak dapat menggunakan fungsi dari proses renderer di a `Array.map` disebut dalam proses utama:

```javascript
// main process mapNumbers.js
exports.withRendererCallback = (mapper) => {
  return [1, 2, 3].map(mapper)
}

exports.withLocalCallback = () => {
  return [1, 2, 3].map(x => x + 1)
}
```

```javascript
// renderer process
const mapNumbers = require('electron').remote.require('./mapNumbers')
const withRendererCb = mapNumbers.withRendererCallback(x => x + 1)
const withLocalCb = mapNumbers.withLocalCallback()

console.log(withRendererCb, withLocalCb)
// [undefined, undefined, undefined], [2, 3, 4]
```

Seperti yang Anda lihat, nilai pengembalian sinkron caller caller tidak seperti diharapkan, dan tidak sesuai dengan nilai kembalian dari callback identik yang hidup dalam proses utamanya.

Kedua, callback yang lolos ke proses utama akan bertahan sampai Proses utama sampah-mengumpulkan mereka.

Misalnya, kode berikut sepertinya tidak bersalah pada pandangan pertama. Ini menginstal a callback untuk `close` acara pada objek remote:

```javascript
require('electron').remote.getCurrentWindow().on('close', () => {
  // window was closed...
})
```

Tapi ingat callback ini direferensikan dengan proses utama sampai Anda secara eksplisit mencopot pemasangannya. Jika tidak, setiap kali Anda me-reload jendela Anda callback akan dipasang lagi, bocor satu callback untuk setiap restart.

Untuk memperburuk keadaan, karena konteks callback yang sebelumnya telah diinstal Telah dilepaskan, pengecualian akan dinaikkan dalam proses utama saat `close` acara dipancarkan.

Untuk menghindari masalah ini, pastikan Anda membersihkan rujukan ke callback renderer diteruskan ke proses utama. Ini melibatkan pembersihan penangan acara, atau memastikan proses utama secara eksplisit diceritakan kepada penghormatan callback yang datang dari proses renderer yang keluar.

## Mengakses modul built-in dalam proses utama

The built-in modules in the main process are added as getters in the `remote` module, so you can use them directly like the `electron` module.

```javascript
const app = require('electron').remote.app
console.log(app)
```

## Metode

The `remote` module has the following methods:

### `remote.require(module)`

* `module` String

Returns `any` - The object returned by `require(module)` in the main process. Modules specified by their relative path will resolve relative to the entrypoint of the main process.

e.g.

    project/
    ├── main
    │   ├── foo.js
    │   └── index.js
    ├── package.json
    └── renderer
        └── index.js
    

```js
// main process: main/index.js
const {app} = require('electron')
app.on('ready', () => { /* ... */ })
```

```js
// some relative module: main/foo.js
module.exports = 'bar'
```

```js
// renderer process: renderer/index.js
const foo = require('electron').remote.require('./foo') // bar
```

### `remote.getCurrentWindow()`

Returns [`BrowserWindow`](browser-window.md) - The window to which this web page belongs.

### `remote.getCurrentWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents of this web page.

### `remote.getGlobal(name)`

* ` nama </ 0>  String</li>
</ul>

<p>Returns <code>any` - The global variable of `name` (e.g. `global[name]`) in the main process.</p> 
    ## properti
    
    ### `remote.process`
    
    The `process` object in the main process. This is the same as `remote.getGlobal('process')` but is cached.