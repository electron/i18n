# protocol (NetworkService) (Draft)

This document describes the new protocol APIs based on the [NetworkService](https://www.chromium.org/servicification).

We don't currently have an estimate of when we will enable the `NetworkService` by default in Electron, but as Chromium is already removing non-`NetworkService` code, we will probably switch before Electron 10.

The content of this document should be moved to `protocol.md` after we have enabled the `NetworkService` by default in Electron.

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
  })

  mainWindow = new BrowserWindow({ webPreferences: { partition } })
})
```

## Methods

Modul ` protocol ` memiliki beberapa metode berikut:

### `protocol.registerSchemesAsPrivileged(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)

**Note:** This method can only be used before the `ready` event of the `app` module gets emitted and can be called only once.

Registers the `scheme` as standard, secure, bypasses content security policy for resources, allows registering ServiceWorker and supports fetch API. Specify a privilege with the value of `true` to enable the capability.

An example of registering a privileged scheme, that bypasses Content Security Policy:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privileges: { bypassCSP: true } }
])
```

Skema standar mematuhi apa yang RFC 3986 memanggil [sintaks URI generik](https://tools.ietf.org/html/rfc3986#section-3). Misalnya `http` dan `https` adalah skema standar, sedangkan `file` tidak.

Registering a scheme as standard allows relative and absolute resources to be resolved correctly when served. Jika tidak, skema akan berperilaku seperti `file` protocol, namun tanpa kemampuan untuk menyelesaikan URL relatif.

Misalnya saat Anda memuat halaman berikut dengan protokol kustom tanpa mendaftarkannya sebagai skema standar, gambar tidak akan dimuat karena skema non-standar tidak dapat mengenali URL relatif:

```html
<body>
  <img src='test.png'>
</body>
```

Mendaftarkan skema sebagai standar akan memungkinkan akses ke file melalui [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). Jika tidak, renderer akan membuang kesalahan keamanan untuk skema ini.

By default web storage apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) are disabled for non standard schemes. So in general if you want to register a custom protocol to replace the `http` protocol, you have to register it as a standard scheme.

### `protocol.registerFileProtocol(scheme, handler)`

* `skema` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback ` Fungsi
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Registers a protocol of `scheme` that will send a file as the response. The `handler` will be called with `request` and `callback` where `request` is an incoming request for the `scheme`.

Untuk menangani `permintaan`, `panggilan balik` harus dipanggil dengan jalur file atau objek yang memiliki properti `path`, misalnya `callback(filePath)` atau `callback({ path: filePath })`. The `filePath` must be an absolute path.

By default the `scheme` is treated like `http:`, which is parsed differently from protocols that follow the "generic URI syntax" like `file:`.

### `protocol.registerBufferProtocol(scheme, handler)`

* `skema` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback ` Fungsi
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Mendaftarkan protokol `skema` yang akan mengirim `Buffer` sebagai tanggapan.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `Buffer` object or an object that has the `data` property.

Contoh:

```javascript
protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({ mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>') })
})
```

### `protocol.registerStringProtocol(scheme, handler)`

* `skema` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback ` Fungsi
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Mendaftarkan protokol `skema` yang akan mengirim `String` sebagai tanggapan.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `String` or an object that has the `data` property.

### `protocol.registerHttpProtocol(scheme, handler)`

* `skema` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback ` Fungsi
    * `response` ProtocolResponse

Mendaftarkan protokol `skema` yang akan mengirim permintaan HTTP sebagai tanggapan.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with an object that has the `url` property.

### `protocol.registerStreamProtocol(scheme, handler)`

* `skema` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback ` Fungsi
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Registers a protocol of `scheme` that will send a stream as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) object or an object that has the `data` property.

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
})
```

It is possible to pass any object that implements the readable stream API (emits `data`/`end`/`error` events). For example, here's how a file could be returned:

```javascript
protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs.createReadStream('index.html'))
})
```

### `protocol.unregisterProtocol(scheme)`

* `skema` String

Unregisters protokol kustom `skema`.

### `protocol.isProtocolRegistered(scheme)`

* `skema` String

Returns `Boolean` - Whether `scheme` is already registered.

### `protocol.interceptFileProtocol(scheme, handler)`

* `skema` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback ` Fungsi
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Sisipkan `skema` dan gunakan ` handler ` sebagai penangan baru protokol yang mengirimkan file sebagai tanggapan.

### `protocol.interceptStringProtocol(scheme, handler)`

* `skema` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback ` Fungsi
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Sisipkan `skema` dan gunakan `handler` sebagai penangan baru protokol yang mengirim `String` sebagai tanggapan.

### `protocol.interceptBufferProtocol(scheme, handler)`

* `skema` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback ` Fungsi
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Sisipkan `skema` dan gunakan <0 handler</code> sebagai penangan baru protokol yang mengirimkan `Buffer` sebagai tanggapan.

### `protocol.interceptHttpProtocol(scheme, handler)`

* `skema` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback ` Fungsi
    * `response` ProtocolResponse

Sisipkan `skema` dan gunakan `handler` sebagai penangan baru protokol yang mengirimkan permintaan HTTP baru sebagai tanggapan.

### `protocol.interceptStreamProtocol(scheme, handler)`

* `skema` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback ` Fungsi
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Same as `protocol.registerStreamProtocol`, except that it replaces an existing protocol handler.

### `protocol.uninterceptProtocol(scheme)`

* `skema` String

Hapus interceptor dipasang untuk `skema` dan mengembalikan handler aslinya.

### `protocol.isProtocolIntercepted(scheme)`

* `skema` String

Returns `Boolean` - Whether `scheme` is already intercepted.
