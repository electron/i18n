# protokol

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
  }, (error) => {
    if (error) console.error('Failed to register protocol')
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

## Metodlar

`protokol` modülünde aşağıdaki yöntemler bulunur:

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

Standart bir şema, RFC 3986'ın çağırdığı [genel URL'ye uygun sözdizimi](https://tools.ietf.org/html/rfc3986#section-3). Örneğin `http` ve `https` standart şemalardır; `dosyası` ise değildir.

Bir planı standart olarak kaydetmek, göreceli ve mutlak kaynakların sunulduğunda doğru bir şekilde çözülmesini sağlayacaktır. Aksi takdirde şema `file` protokolu gibi davranır, ancak belirsiz URL' leri çözme becerisine sahip değildir.

Örneğin, özel protokollü aşağıdaki sayfayı yüklediğinizde, standart şema olarak kaydettiğinizde, resim yüklenmeyecektir çünkü standart olmayan şemalar göreceli URL'leri tanımlayamaz:

```html
<body>
  <img src='test.png'>
</body>
```

Kayıt şeması [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem) aracılığıyla dosyalara ulaşım sağlar. Aksi takdirde rendercı şema için güvenlik hatası verir.

Varsayılan olarak, standart olmayan şemalar için web depolama apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) devre dışı bırakılmıştır. Yani çoğu zaman `http` protokolünün yerine özel bir protokol kaydetmek istiyorsanız standart düzeni kaydeder gibi kaydetmelisiniz.

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

### `protocol.registerFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` Dize
    * `headers` Record<String, String>
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `filePath` String | [FilePathWithHeaders](structures/file-path-with-headers.md) (optional)
* `completion` Function (optional)
  * `error` Error

Dosyayı yanıt olarak gönderecek `şema` protokolünü kaydeder. `handler`, bir `request``scheme` ile oluşturulacağı zaman `handler(request, callback)` ile çağırılacak. `completion`, `scheme` başarılı bir şekilde kaydolduğunda `completion(null)` ile veya başarısız olduğunda `completion(error)` ile çağırılacak.

`request`'i işleyebilmek için `callback` ya dosyanın yoluyla ya da `path` özelliği olan bir obje ile çağırılmalıdır, örneğin `callback(filePath)` veya `callback({ path: filePath })`. The object may also have a `headers` property which gives a map of headers to values for the response headers, e.g. `callback({ path: filePath, headers: {"Content-Security-Policy": "default-src 'none'"]})`.

`callback` hiçbir şeyle, bir sayıyla ya da `error` özelliği olan bir nesneyle çağırıldığı zaman `request` belirttiğiniz ` error` numarası ile başarısız olacaktır. Mevcut hata numaraları için lütfen bakın [net hataların listesi](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

By default the `scheme` is treated like `http:`, which is parsed differently than protocols that follow the "generic URI syntax" like `file:`.

### `protocol.registerBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` Dize
    * `headers` Record<String, String>
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (isteğe bağlı)
* `completion` Function (optional)
  * `error` Error

`Buffer`'ı yanıt olarak gönderecek `şema` protokolünü kaydeder.

Kullanımı `registerFileProtocol` ile aynıdır, ancak `callback` `Buffer` nesnesi veya `data`,`mimeType` ve `charset` özelliklerine sahip bir nesneyle çağrılması gerekir.

Örneğin:

```javascript
const { protocol } = require('electron')

protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({ mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>') })
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.registerStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` Dize
    * `headers` Record<String, String>
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `data` (String | [StringProtocolResponse](structures/string-protocol-response.md)) (optional)
* `completion` Function (optional)
  * `error` Error

`String`'i yanıt olarak gönderecek `şema` protokolünü kaydeder.

Kullanımı `registerFileProtocol` ile aynıdır, ancak `callback` `String` veya `data` olan bir nesne ile çağrılmalıdır, `mimeType` ve `charset` özelliklerine sahiptir.

### `protocol.registerHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` Dize
    * `headers` Record<String, String>
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `redirectRequest` Object
      * `url` Dize
      * `method` String (optional)
      * `session` Session | null (optional)
      * `uploadData` [ProtocolResponseUploadData](structures/protocol-response-upload-data.md) (optional)
* `completion` Function (optional)
  * `error` Error

Yanıt olarak bir HTTP isteği göndererek `scheme` protokolünü kaydeder.

`callback`, `url` olan bir `redirectRequest` nesnesi ile çağrılması dışında, `registerFileProtocol` ile kullanımı aynıdır. `method`, url ` referrer `, `uploadData` ve `session` özelliklerine sahiptir.

By default the HTTP request will reuse the current session. If you want the request to have a different session you should set `session` to `null`.

POST istekleri için `uploadData` nesnesi sağlanmalıdır.

### `protocol.registerStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` Dize
    * `headers` Record<String, String>
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
* `completion` Function (optional)
  * `error` Error

Yanıt olarak `Readable` gönderen bir `scheme` protokolünü kaydeder.

Kullanımı, diğer `register{Any}Protocol`'e benzer, ancak `callback`'nin bir `Readable` nesne veya `data`, `statusCode` ve `headers` özelliklere sahip bir nesneyle çağrılması gerekir.

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

### `protocol.unregisterProtocol(scheme[, completion])`

* `scheme` Dizi
* `completion` Function (optional)
  * `error` Error

`şemanın` özel protokol kaydını iptal eder.

### `protocol.isProtocolHandled(scheme)`

* `scheme` Dizi

Returns `Promise<Boolean>` - fulfilled with a boolean that indicates whether there is already a handler for `scheme`.

### `protocol.interceptFileProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `handler` Function
  * `request` Object
    * `url` Dize
    * `headers` Record<String, String>
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `filePath` Dizi
* `completion` Function (optional)
  * `error` Error

`scheme` protokolünü böler ve cevap olarak bir dosya yollayan `handler`'ı protokolün yeni işleyicisi gibi kullanır.

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `handler` Function
  * `request` Object
    * `url` Dize
    * `headers` Record<String, String>
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `data` (String | [StringProtocolResponse](structures/string-protocol-response.md)) (optional)
* `completion` Function (optional)
  * `error` Error

`scheme` protokolünü böler ve cevap olarak bir `String` yollayan `handler`'ı protokolün yeni işleyicisi gibi kullanır.

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `handler` Function
  * `request` Object
    * `url` Dize
    * `headers` Record<String, String>
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `buffer` Arabellek (isteğe bağlı)
* `completion` Function (optional)
  * `error` Error

`scheme` protokolünü böler ve cevap olarak bir `Buffer` yollayan `handler`'ı protokolün yeni işleyicisi gibi kullanır.

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `handler` Function
  * `request` Object
    * `url` Dize
    * `headers` Record<String, String>
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `redirectRequest` Object
      * `url` Dize
      * `method` String (optional)
      * `session` Session | null (optional)
      * `uploadData` [ProtocolResponseUploadData](structures/protocol-response-upload-data.md) (optional)
* `completion` Function (optional)
  * `error` Error

`scheme` protokolünü böler ve cevap olarak yeni bir HTTP isteği yollayan `handler`'ı protokolün yeni işleyicisi gibi kullanır.

### `protocol.interceptStreamProtocol(scheme, handler[, completion])`

* `scheme` Dizi
* `handler` Function
  * `request` Object
    * `url` Dize
    * `headers` Record<String, String>
    * `referrer` Dize
    * `method` Dizi
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
* `completion` Function (optional)
  * `error` Error

Mevcut bir protokol işlecinin yerini alması dışında, `protocol.registerStreamProtocol` ile aynı.

### `protocol.uninterceptProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (optional)
  * `error` Error

`Şema` için kurulmuş olan önleyiciyi kaldırın ve orijinal işleyicisini geri yükleyin.
