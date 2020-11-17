# remot

> Gunakan modul proses utama dari proses renderer.

Processo: [Renderizador](../glossary.md#renderer-process)

The `remote` Modul menyediakan cara sederhana untuk melakukan komunikasi antar proses (IPC) antara proses renderer (halaman web) dan proses utama.

Di Elektron, modul yang berhubungan dengan GUI (seperti `dialog`,`menu` etc.) hanya tersedia dalam proses utama, bukan dalam proses renderer. Untuk menggunakannya Dari proses renderer, `ipc` modul diperlukan untuk mengirim antar proses pesan ke proses utama. Dengan `remote` modul, Anda dapat memanggil metode dari objek proses utama tanpa secara eksplisit mengirim pesan antar proses, mirip dengan Java [RMI](https://en.wikipedia.org/wiki/Java_remote_method_invocation). Contoh membuat jendela browser dari a Proses renderer:

```javascript
const { BrowserWindow } = require('electron').remote
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

**Note:** For the reverse (access the renderer process from the main process), you can use [webContents.executeJavaScript](web-contents.md#contentsexecutejavascriptcode-usergesture).

**Note:** The remote module can be disabled for security reasons in the following contexts:
- [`BrowserWindow`](browser-window.md) - by setting the `enableRemoteModule` option to `false`.
- [`<webview>`](webview-tag.md) - by setting the `enableremotemodule` attribute to `false`.

## Objek Jarak Jauh

Setiap objek (termasuk fungsi) dikembalikan oleh `remote` modul mewakili sebuah Objek dalam proses utama (kita menyebutnya remote object atau remote function). Saat Anda memanggil metode objek jarak jauh, panggil fungsi remote, atau buat Sebuah objek baru dengan konstruktor jarak jauh (fungsi), sebenarnya Anda mengirim pesan inter-proses sinkron.

In the example above, both [`BrowserWindow`](browser-window.md) and `win` were remote objects and `new BrowserWindow` didn't create a `BrowserWindow` object in the renderer process. Sebagai gantinya, ia menciptakan `BrowserWindow` objek dalam proses utama dan mengembalikan objek remote yang sesuai dalam proses renderer, yaitu `menang` objek.

**Catatan:** Hanya [enumerable properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) yang ada Bila objek remote pertama direferensikan bisa diakses via remote.

**Catatan:** Array dan Buffer disalin melalui IPC saat diakses melalui `remote` modul. Mengubahnya dalam proses renderer tidak mengubahnya menjadi yang utama proses dan sebaliknya.

## Lifetime dari Remote Objects

Elektron memastikan bahwa selama objek remote dalam proses renderer Hidup (dengan kata lain, belum ada sampah yang dikumpulkan), objek yang sesuai dalam proses utama tidak akan dilepaskan. Bila objek remote sudah ada Sampah dikumpulkan, objek yang sesuai dalam proses utamanya adalah dereferenced.

Jika objek jauh bocor dalam proses renderer (misalnya disimpan di peta tapi tidak pernah dibebaskan), objek yang sesuai dalam proses utama juga akan bocor, jadi Anda harus sangat berhati-hati untuk tidak membocorkan benda-benda remote.

Jenis nilai primer seperti senar dan angka, bagaimanapun, dikirim melalui salinan.

## Melewati callback ke proses utama

Kode dalam proses utama dapat menerima callback dari renderer - misalnya itu `remote` modul - tapi Anda harus sangat berhati-hati saat menggunakan ini fitur.

First, in order to avoid deadlocks, the callbacks passed to the main process are called asynchronously. You should not expect the main process to get the return value of the passed callbacks.

Misalnya Anda tidak dapat menggunakan fungsi dari proses renderer di a `Array.map` disebut dalam proses utama:

```javascript
// peta proses utamaNumbers.js
export.withRendererCallback = (mapper) => {
  kembali [1, 2, 3] .map(mapper)
}

export.withLocalCallback = () = > {
  kembali [1, 2, 3] .map(x => x + 1)
}
```

```javascript
// renderer proses
const mapNumbers = require('electron').remote.require('./mapNumbers')
const withRendererCb = mapNumbers.withRendererCallback(x => x + 1)
const withLocalCb = mapNumbers.withLocalCallback()

console.log(withRendererCb, withLocalCb)
// [terdefinidi, terdefinisi, terdefinisi], [2, 3, 4]
```

Seperti yang Anda lihat, nilai pengembalian sinkron caller caller tidak seperti diharapkan, dan tidak sesuai dengan nilai kembalian dari callback identik yang hidup dalam proses utamanya.

Kedua, callback yang lolos ke proses utama akan bertahan sampai Proses utama sampah-mengumpulkan mereka.

For example, the following code seems innocent at first glance. It installs a callback for the `close` event on a remote object:

```javascript
require('electron').remote.getCurrentWindow().on('close', () => {
  // window was closed...
})
```

Tapi ingat callback ini direferensikan dengan proses utama sampai Anda secara eksplisit mencopot pemasangannya. Jika tidak, setiap kali Anda me-reload jendela Anda callback akan dipasang lagi, bocor satu callback untuk setiap restart.

Untuk memperburuk keadaan, karena konteks callback yang sebelumnya telah diinstal Telah dilepaskan, pengecualian akan dinaikkan dalam proses utama saat `close` acara dipancarkan.

Untuk menghindari masalah ini, pastikan Anda membersihkan rujukan ke callback renderer diteruskan ke proses utama. This involves cleaning up event handlers, or ensuring the main process is explicitly told to dereference callbacks that came from a renderer process that is exiting.

## Mengakses modul built-in dalam proses utama

Modul built-in dalam proses utama ditambahkan sebagai getter di `remote` modul, sehingga Anda dapat menggunakannya secara langsung seperti modul `elektron`.

```javascript
const app = require ('elektron'). remote.app
console.log (app)
```

## Metode

Itu `jarak jauh` modul memiliki metode berikut:

### `remote.require (modul)`

* ` modul ` String

Mengembalikan `sembarang` - Objek dikembalikan oleh `require (module)` pada proses utama. Modul yang ditentukan oleh jalur relatif mereka akan mengatasi relatif terhadap titik masuk dari proses utama.

misalnya

```sh
proyek/
├── utama
│ ├── foo.js
│ └── index.js
├── package.json
└── renderer
    └── index.js
```

```js
// main process: main/index.js
const { app } = require('electron')
app.whenReady().then(() => { /* ... */ })
```

```js
// beberapa modul relatif: main/foo.js
module.exports = 'bar'
```

```js
// proses renderer: renderer/index.js
const foo = require ('electron'). remote.require ('./ foo') // bar
```

### `remote.getCurrentWindow ()`

Mengembalikan [`BrowserWindow`](browser-window.md) - Jendela tempat halaman web ini milik.

**Note:** Do not use `removeAllListeners` on [`BrowserWindow`](browser-window.md). Use of this can remove all [`blur`](https://developer.mozilla.org/en-US/docs/Web/Events/blur) listeners, disable click events on touch bar buttons, and other unintended consequences.

### `remote.getCurrentWebContents ()`

Mengembalikan [`WebContents`](web-contents.md) - Isi web dari halaman web ini.

### `remote.getGlobal (nama)`

* ` nama </ 0>  String</li>
</ul>

<p spaces-before="0">Mengembalikan <code>sembarang` - Variabel global`nama` (misalnya `global[name]`) di utama proses.</p>

## properti

### `remote.process` _Readonly_

A `NodeJS.Process` object.  The `process` object in the main process. This is the same as `remote.getGlobal('process')` but is cached.
