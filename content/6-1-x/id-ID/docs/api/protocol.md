# protokol

> Mampu melaksanakan tugas yang diberikan sepenuhnya.

Proses: [Main](../glossary.md#main-process)

Contoh penerapan protokol yang memiliki efek yang sama seperti protokol `file://`:

```javascript
const { app, protocol } = require('electron')
const path = require('path')

app.on('ready', () => {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })
})
```

** Catatan: ** Semua metode kecuali yang ditentukan hanya dapat digunakan setelah event ` ready ` dari modul ` app ` dipancarkan.

## Using `protocol` with a custom `partition` or `session`

A protocol is registered to a specific Electron [`session`](./session.md) object. If you don't specify a session, then your `protocol` will be applied to the default session that Electron uses. However, if you define a `partition` or `session` on your `browserWindow`'s `webPreferences`, then that window will use a different session and your custom protocol will not work if you just use `electron.protocol.XXX`.

To have your custom protocol work in combination with a custom session, you need to register it to that session explicitly.

```javascript
const { session, app, protocol } = require('electron')
const path = require('path')

app.on('ready', () => {
  const partition = 'persist:example'
  const ses = session.fromPartition(partition)

  ses.protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      partition: partition
    }
  })
})
```

## Metode

Modul ` protocol ` memiliki beberapa metode berikut:

### `protocol.registerSchemesAsPrivileged(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)


**Note:** This method can only be used before the `ready` event of the `app` module gets emitted and can be called only once.

Registers the `scheme` as standard, secure, bypasses content security policy for resources, allows registering ServiceWorker and supports fetch API.

Specify a privilege with the value of `true` to enable the capability. An example of registering a privileged scheme, with bypassing Content Security Policy:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privileges: { bypassCSP: true } }
])
```

Skema standar mematuhi apa yang RFC 3986 memanggil [sintaks URI generik](https://tools.ietf.org/html/rfc3986#section-3). Misalnya `http` dan `https` adalah skema standar, sedangkan `file` tidak.

Mendaftarkan skema sebagai standar, akan memungkinkan sumber daya relatif dan absolut untuk diselesaikan dengan benar saat disajikan. Jika tidak, skema akan berperilaku seperti `file` protocol, namun tanpa kemampuan untuk menyelesaikan URL relatif.

Misalnya saat Anda memuat halaman berikut dengan protokol kustom tanpa mendaftarkannya sebagai skema standar, gambar tidak akan dimuat karena skema non-standar tidak dapat mengenali URL relatif:

```html
<body>
  <img src='test.png'>
</body>
```

Mendaftarkan skema sebagai standar akan memungkinkan akses ke file melalui [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). Jika tidak, renderer akan membuang kesalahan keamanan untuk skema ini.

Secara default penyimpanan apis web (localStorage, sessionStorage, webSQL, indexedDB, cookies) dinonaktifkan untuk skema standar. Jadi secara umum jika Anda ingin mendaftarkan sebuah protokol kustom untuk mengganti protokol `http`, Anda harus mendaftarkannya sebagai skema standar.

`protocol.registerSchemesAsPrivileged` can be used to replicate the functionality of the previous `protocol.registerStandardSchemes`, `webFrame.registerURLSchemeAs*` and `protocol.registerServiceWorkerSchemes` functions that existed prior to Electron 5.0.0, for example:

**before (<= v4.x)**
```javascript
// Main
protocol.registerStandardSchemes(['scheme1', 'scheme2'], { secure: true })
// Renderer
webFrame.registerURLSchemeAsPrivileged('scheme1', { secure: true })
webFrame.registerURLSchemeAsPrivileged('scheme2', { secure: true })
```

**after (>= v5.x)**
```javascript
protocol.registerSchemesAsPrivileged([
  { scheme: 'scheme1', privileges: { standard: true, secure: true } },
  { scheme: 'scheme2', privileges: { standard: true, secure: true } }
])
```

### `protocol.registerFileProtocol (skema, handler [, completion])`

* `skema` String
* `handler` Function
  * `request` Object
    * ` url </ 0> String</li>
<li><code>pengarah` String
    * ` path </ 0>  String</li>
<li><code>uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback ` Fungsi
    * `filePath` String (opsional)
* `completion` Function (optional)
  * Kesalahan `kesalahan`

Mendaftarkan protokol `skema` yang akan mengirim file sebagai tanggapan. `handler` akan disebut dengan `handler(permintaan, callback)` ketika `permintaan` akan dibuat dengan `skema`. `selesai` akan dipanggil dengan `selesai (null)` ketika `skema` berhasil didaftarkan atau `selesai(error)` ketika gagal.

Untuk menangani `permintaan`, `panggilan balik` harus dipanggil dengan jalur file atau objek yang memiliki properti `path`, misalnya `callback(filePath)` atau `callback({ path: filePath })`. The object may also have a `headers` property which gives a map of headers to values for the response headers, e.g. `callback({ path: filePath, headers: {"Content-Security-Policy": "default-src 'none'"]})`.

Ketika `callback` dipanggil tanpa nomor, angka, atau objek yang memiliki properti `kesalahan`, `permintaan` akan gagal dengan `kesalahan` nomor yang Anda tentukan. Untuk nomor kesalahan yang tersedia, silakan lihat [daftar kesalahan bersih](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

By default the `scheme` is treated like `http:`, which is parsed differently than protocols that follow the "generic URI syntax" like `file:`.

### `protocol.registerBufferProtocol (skema, handler [, completion])`

* `skema` String
* `handler` Function
  * `request` Object
    * ` url </ 0> String</li>
<li><code>pengarah` String
    * `method` String
    * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback ` Fungsi
    * `penyangga` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (opsional)
* `completion` Function (optional)
  * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p spaces-before="0">Mendaftarkan protokol <code>skema` yang akan mengirim `Buffer` sebagai tanggapan.</p>

Penggunaannya sama dengan `registerFileProtocol`, kecuali bahwa `callback` harus dipanggil dengan objek `Buffer` atau objek yang memiliki `data`, `mimeType`, dan `charset` properti.

Contoh:

```javascript
const { protocol } = require('electron')

protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({ mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>') })
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.registerStringProtocol (skema, handler [, completion])`

* `skema` String
* `handler` Function
  * `request` Object
    * ` url </ 0> String</li>
<li><code>pengarah` String
    * `method` String
    * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback ` Fungsi
    * `data` String (opsional)
* `completion` Function (optional)
  * Kesalahan `kesalahan`

Mendaftarkan protokol `skema` yang akan mengirim `String` sebagai tanggapan.

Penggunaan adalah sama dengan `registerFileProtocol`, kecuali bahwa `callback` harus disebut dengan baik `String` atau sebuah benda yang memiliki `Data`, `mimeType`, dan `charset` properti.

### `protocol.registerHttpProtocol(skema, handler[, completion])`

* `skema` String
* `handler` Function
  * `request` Object
    * ` url </ 0> String</li>
<li><code>header` Obyek
    * `pengarah` String
    * `method` String
    * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback ` Fungsi
    * `redirectRequest` Object
      * ` url </ 0> String</li>
<li><code>method` String
      * `sesi` Objek (opsional)
      * `uploadData` Object (optional)
        * `contentType` String - jenis konten MIME.
        * `data` String - Konten yang akan dikirim.
* `completion` Function (optional)
  * Kesalahan `kesalahan`

Mendaftarkan protokol `skema` yang akan mengirim permintaan HTTP sebagai tanggapan.

Penggunaannya sama dengan ` registerFileProtocol`, kecuali bahwa `callback` harus dipanggil dengan objek ` redirectRequest` yang memiliki `url`, ` method `, `rujukan `, `uploadData` dan`sesi`.

By default the HTTP request will reuse the current session. If you want the request to have a different session you should set `session` to `null`.

Agar POST meminta objek `uploadData` harus disediakan.

### `protocol.registerStreamProtocol(scheme, handler[, completion])`

* `skema` String
* `handler` Function
  * `request` Object
    * `url` String
    * `header` Obyek
    * `pengarah` String
    * `method` String
    * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback ` Fungsi
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
* `completion` Function (optional)
  * Kesalahan `kesalahan`

Registers a protocol of `scheme` that will send a `Readable` as a response.

The usage is similar to the other `register{Any}Protocol`, except that the `callback` should be called with either a `Readable` object or an object that has the `data`, `statusCode`, and `headers` properties.

Contoh:

```javascript
const { protocol } = require('electron')
const { PassThrough } = require('stream')

function createStream (text) {
  const rv = new PassThrough() // PassThrough is also a Readable stream
  rv.push(text)
  rv.push(null)
  return rv
}

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback({
    statusCode: 200,
    headers: {
      'content-type': 'text/html'
    },
    data: createStream('<h5>Response</h5>')
  })
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

It is possible to pass any object that implements the readable stream API (emits `data`/`end`/`error` events). For example, here's how a file could be returned:

```javascript
const { protocol } = require('electron')
const fs = require('fs')

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs.createReadStream('index.html'))
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.uninterceptProtocol (skema [, penyelesaian])`

* `skema` String
* `completion` Function (optional)
  * Kesalahan `kesalahan`

Unregisters protokol kustom `skema`.

### `protocol.isProtocolHandled(scheme, panggilan kembali)`

* `skema` String
* `callback ` Fungsi
  * `handled` Boolean

The`callback ` akan dipanggil dengan boolean yang menunjukkan apakah ada sudah menjadi handler untuk skema ``.

**[Deprecated Soon](modernization/promisification.md)**

### `protocol.isProtocolHandled(scheme)`

* `skema` String

Returns `Promise<Boolean>` - fulfilled with a boolean that indicates whether there is already a handler for `scheme`.

### `protocol.interceptFileProtocol(skema, handler[,completion])`

* `skema` String
* `handler` Function
  * `request` Object
    * ` url </ 0> String</li>
<li><code>pengarah` String
    * `method` String
    * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback ` Fungsi
    * `fullPath` String
* `completion` Function (optional)
  * Kesalahan `kesalahan`

Sisipkan `skema` dan gunakan ` handler ` sebagai penangan baru protokol yang mengirimkan file sebagai tanggapan.

### `protocol.interceptFileProtocol(skema, handler[,completion])`

* `skema` String
* `handler` Function
  * `request` Object
    * ` url </ 0> String</li>
<li><code>pengarah` String
    * `method` String
    * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback ` Fungsi
    * `data` String (opsional)
* `completion` Function (optional)
  * Kesalahan `kesalahan`

Sisipkan `skema` dan gunakan `handler` sebagai penangan baru protokol yang mengirim `String` sebagai tanggapan.

### `protocol.interceptBufferProtocol(skema, handler[, completion])`

* `skema` String
* `handler` Function
  * `request` Object
    * ` url </ 0> String</li>
<li><code>pengarah` String
    * `method` String
    * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback ` Fungsi
    * `penyangga` Buffer (opsional)
* `completion` Function (optional)
  * Kesalahan `kesalahan`

Sisipkan `skema` dan gunakan <0 handler</code> sebagai penangan baru protokol yang mengirimkan `Buffer` sebagai tanggapan.

### `protocol.interceptHttpProtocol (skema, handler [, completion])`

* `skema` String
* `handler` Function
  * `request` Object
    * ` url </ 0> String</li>
<li><code>header` Obyek
    * `pengarah` String
    * `method` String
    * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback ` Fungsi
    * `redirectRequest` Object
      * ` url </ 0> String</li>
<li><code>method` String
      * `sesi` Objek (opsional)
      * `uploadData` Object (optional)
        * `contentType` String - jenis konten MIME.
        * `data` String - Konten yang akan dikirim.
* `completion` Function (optional)
  * Kesalahan `kesalahan`

Sisipkan `skema` dan gunakan `handler` sebagai penangan baru protokol yang mengirimkan permintaan HTTP baru sebagai tanggapan.

### `protocol.interceptStreamProtocol(scheme, handler[, completion])`

* `skema` String
* `handler` Function
  * `request` Object
    * `url` String
    * `header` Obyek
    * `pengarah` String
    * `method` String
    * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback ` Fungsi
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
* `completion` Function (optional)
  * Kesalahan `kesalahan`

Same as `protocol.registerStreamProtocol`, except that it replaces an existing protocol handler.

### `protocol.uninterceptProtocol(skema[, penyelesaian])`

* `skema` String
* `completion` Function (optional)
  * Kesalahan `kesalahan`

Hapus interceptor dipasang untuk `skema` dan mengembalikan handler aslinya.
