# protocol (NetworkService) (Draft)

This document describes the new protocol APIs based on the [NetworkService](https://www.chromium.org/servicification).

We don't currently have an estimate of when we will enable the `NetworkService` by default in Electron, but as Chromium is already removing non-`NetworkService` code, we will probably switch before Electron 10.

The content of this document should be moved to `protocol.md` after we have enabled the `NetworkService` by default in Electron.

> Özel bir protokol kaydettirin ve mevcut protokol isteklerini engelleyin.

İşlem: [Ana](../glossary.md#main-process)

Şebeke sunucusu ile aynı etkiye sahip bir protokol uygulamak için bir örnek. `dosya://` protokolü:

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

**Note:** All methods unless specified can only be used after the `ready` event of the `app` module gets emitted.

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

## Metodlar

`protokol` modülünde aşağıdaki yöntemler bulunur:

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

Standart bir şema, RFC 3986'ın çağırdığı [genel URL'ye uygun sözdizimi](https://tools.ietf.org/html/rfc3986#section-3). Örneğin `http` ve `https` standart şemalardır; `dosyası` ise değildir.

Registering a scheme as standard allows relative and absolute resources to be resolved correctly when served. Aksi takdirde şema `file` protokolu gibi davranır, ancak belirsiz URL' leri çözme becerisine sahip değildir.

Örneğin, özel protokollü aşağıdaki sayfayı yüklediğinizde, standart şema olarak kaydettiğinizde, resim yüklenmeyecektir çünkü standart olmayan şemalar göreceli URL'leri tanımlayamaz:

```html
<body>
  <img src='test.png'>
</body>
```

Kayıt şeması [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem) aracılığıyla dosyalara ulaşım sağlar. Aksi takdirde rendercı şema için güvenlik hatası verir.

By default web storage apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) are disabled for non standard schemes. So in general if you want to register a custom protocol to replace the `http` protocol, you have to register it as a standard scheme.

### `protocol.registerFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Registers a protocol of `scheme` that will send a file as the response. The `handler` will be called with `request` and `callback` where `request` is an incoming request for the `scheme`.

`request`'i işleyebilmek için `callback` ya dosyanın yoluyla ya da `path` özelliği olan bir obje ile çağırılmalıdır, örneğin `callback(filePath)` veya `callback({ path: filePath })`. The `filePath` must be an absolute path.

By default the `scheme` is treated like `http:`, which is parsed differently from protocols that follow the "generic URI syntax" like `file:`.

### `protocol.registerBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

`Buffer`'ı yanıt olarak gönderecek `şema` protokolünü kaydeder.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `Buffer` object or an object that has the `data` property.

Örneğin:

```javascript
protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({ mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>') })
})
```

### `protocol.registerStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

`String`'i yanıt olarak gönderecek `şema` protokolünü kaydeder.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `String` or an object that has the `data` property.

### `protocol.registerHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` ProtocolResponse

Yanıt olarak bir HTTP isteği göndererek `scheme` protokolünü kaydeder.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with an object that has the `url` property.

### `protocol.registerStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Registers a protocol of `scheme` that will send a stream as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) object or an object that has the `data` property.

Örneğin:

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

* `scheme` String

`şemanın` özel protokol kaydını iptal eder.

### `protocol.isProtocolRegistered(scheme)`

* `scheme` String

Returns `Boolean` - Whether `scheme` is already registered.

### `protocol.interceptFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

`scheme` protokolünü böler ve cevap olarak bir dosya yollayan `handler`'ı protokolün yeni işleyicisi gibi kullanır.

### `protocol.interceptStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

`scheme` protokolünü böler ve cevap olarak bir `String` yollayan `handler`'ı protokolün yeni işleyicisi gibi kullanır.

### `protocol.interceptBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

`scheme` protokolünü böler ve cevap olarak bir `Buffer` yollayan `handler`'ı protokolün yeni işleyicisi gibi kullanır.

### `protocol.interceptHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` ProtocolResponse

`scheme` protokolünü böler ve cevap olarak yeni bir HTTP isteği yollayan `handler`'ı protokolün yeni işleyicisi gibi kullanır.

### `protocol.interceptStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Mevcut bir protokol işlecinin yerini alması dışında, `protocol.registerStreamProtocol` ile aynı.

### `protocol.uninterceptProtocol(scheme)`

* `scheme` String

`Şema` için kurulmuş olan önleyiciyi kaldırın ve orijinal işleyicisini geri yükleyin.

### `protocol.isProtocolIntercepted(scheme)`

* `scheme` String

Returns `Boolean` - Whether `scheme` is already intercepted.
