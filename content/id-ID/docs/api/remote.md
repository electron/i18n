# remot

> Gunakan modul proses utama dari proses renderer.

Proses: [Renderer](../glossary.md#renderer-process)

The `remote` Modul menyediakan cara sederhana untuk melakukan komunikasi antar proses (IPC) antara proses renderer (halaman web) dan proses utama.

Di Elektron, modul yang berhubungan dengan GUI (seperti `dialog`,`menu` etc.) hanya tersedia dalam proses utama, bukan dalam proses renderer. Untuk menggunakannya dari proses renderer, modul ` ipc </ 0> diperlukan untuk mengirim pesan antar proses ke proses utama. Dengan modul <code> remote </ 0> , Anda dapat meminta metode objek proses utama tanpa mengirim pesan inter-proses secara eksplisit, mirip dengan Java <a href="http://en.wikipedia.org/wiki/Java_remote_method_invocation"> RMI </ 1> . Contoh membuat jendela browser dari proses renderer:</p>

<pre><code class="javascript">const {BrowserWindow} = require('electron').remote
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
`</pre> 

**Note:** Untuk kebalikannya (akses proses renderer dari proses utama), Kamu dapat memakai [webContents.executeJavascript](web-contents.md#contentsexecutejavascriptcode-usergesture-callback).

## Objek Jarak Jauh

Setiap objek (termasuk fungsi) dikembalikan oleh `remote` modul mewakili sebuah Objek dalam proses utama (kita menyebutnya remote object atau remote function). Saat Anda memanggil metode objek jarak jauh, panggil fungsi remote, atau buat Sebuah objek baru dengan konstruktor jarak jauh (fungsi), sebenarnya Anda mengirim pesan inter-proses sinkron.

Dalam contoh di atas, baik ` BrowserWindow </ 0> dan <code> menang </ 0> adalah objek remote dan
 <code> BrowserWindow baru </ 0> tidak membuat <code> BrowserWindow </ 0> objek dalam proses renderer Sebagai gantinya, ia menciptakan objek <code> BrowserWindow </ 0> dalam proses utama dan mengembalikan objek remote yang sesuai dalam proses renderer, yaitu objek
 <code> win </ 0> .</p>

<p><strong> Catatan: </ 0> Hanya <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties"> enumerable properties </ 1> yang hadir saat objek jarak jauh pertama kali direferensikan dapat diakses melalui remote.</p>

<p><strong> Catatan: </ 0> Array dan Buffer disalin melalui IPC saat diakses melalui 
modul <code> remote </ 1> . Memodifikasi mereka dalam proses renderer tidak memodifikasinya dalam proses utama dan sebaliknya.</p>

<h2>Lifetime dari Remote Objects</h2>

<p>Elektron memastikan bahwa selama objek remote dalam proses renderer
Hidup (dengan kata lain, belum ada sampah yang dikumpulkan), objek yang sesuai
dalam proses utama tidak akan dilepaskan. Bila objek remote sudah ada
Sampah dikumpulkan, objek yang sesuai dalam proses utamanya adalah
dereferenced.</p>

<p>Jika objek jauh bocor dalam proses renderer (misalnya disimpan di peta tapi
tidak pernah dibebaskan), objek yang sesuai dalam proses utama juga akan bocor,
jadi Anda harus sangat berhati-hati untuk tidak membocorkan benda-benda remote.</p>

<p>Jenis nilai primer seperti senar dan angka, bagaimanapun, dikirim melalui salinan.</p>

<h2>Melewati callback ke proses utama</h2>

<p>Kode dalam proses utama dapat menerima callback dari renderer - misalnya
itu <code>remote` modul - tapi Anda harus sangat berhati-hati saat menggunakan ini fitur.

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

Modul built-in dalam proses utama ditambahkan sebagai getter di modul `remote`, sehingga Anda dapat menggunakannya secara langsung seperti modul `elektron`.

```javascript
const app = require('electron').remote.app
console.log(app)
```

## Metode

Itu `jarak jauh` modul memiliki metode berikut:

### `remote.require(module)`

* `module` String

Mengembalikan `sembarang` - Objek dikembalikan oleh `require(module)` pada proses utama. Modul yang ditentukan oleh jalur relatif mereka akan mengatasi relatif terhadap titik masuk proses utama.

misalnya

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

Mengembalikan [`BrowserWindow`](browser-window.md) - Jendela tempat halaman web ini berada.

### `remote.getCurrentWebContents()`

Mengembalikan [`WebContents`](web-contents.md) - Isi web dari halaman web ini.

### `remote.getGlobal(name)`

* ` nama </ 0>  String</li>
</ul>

<p>Mengembalikan <code>sembarang` - Variabel global`nama` (misalnya `global[name]`) dalam proses utama.</p> 
    ## properti
    
    ### `remote.process`
    
    The `process` object in the main process. This is the same as `remote.getGlobal('process')` but is cached.