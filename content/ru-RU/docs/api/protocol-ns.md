# протокол (NetworkService) (Черновик)

В этом документе описываются API нового протокола, основанное на [NetworkService](https://www.chromium.org/servicification).

В настоящее время мы не можем сказать, когда мы включим `NetworkService` по умолчанию в Electron, но поскольку Chromium уже удаляет код, отличный от `NetworkService`, мы, вероятно, переключимся до Electron 10.

Содержимое этого документа должно быть перемещено в `protocol.md`, после того, как мы включим `NetworkService` в Electron.

> Register a custom protocol and intercept existing protocol requests.

Процесс: [Главный](../glossary.md#main-process)

An example of implementing a protocol that has the same effect as the `file://` protocol:

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

## Использование протокола `protocol` с пользовательским разделом `partition` или сеансом `session`

Протокол регистрируется для определенного Electron объекта [`session`](./session.md). Если вы не укажете сеанс, то ваш `protocol` будет применен сеансу по умолчанию, который использует Electron. Однако, если вы определите `partition` или `session` в `браузереWindow` в `webPreferences`, то это окно будет использовать другой сеанс, и ваш пользовательский протокол не будет работать, если вы просто используете `electron.protocol.XXX`.

Для того, чтобы ваш пользовательский протокол работал в сочетании с пользовательским сеансом, вам необходимо явно зарегистрировать его в этом сеансе.

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

## Методы

The `protocol` module has the following methods:

### `protocol.registerSchemesAsPrivileged(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)

**Примечание:** Этот метод можно использовать только до отправки события `ready` модуля `app` и может быть вызван только один раз.

Регистрирует `scheme` как стандартную, безопасную, обходит политику безопасности контента для ресурсов, позволяет регистрировать ServiceWorker и поддерживает получение API. Укажите привилегию со значением `true` чтобы включить возможность.

Пример регистрации привилегированной схемы, которая обходит Политику безопасности контента:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privileges: { bypassCSP: true } }
])
```

A standard scheme adheres to what RFC 3986 calls [generic URI syntax](https://tools.ietf.org/html/rfc3986#section-3). For example `http` and `https` are standard schemes, while `file` is not.

Регистрация схемы в качестве стандартной позволяет правильно разрешать относительные и абсолютные ресурсы при обслуживании. Otherwise the scheme will behave like the `file` protocol, but without the ability to resolve relative URLs.

For example when you load following page with custom protocol without registering it as standard scheme, the image will not be loaded because non-standard schemes can not recognize relative URLs:

```html
<body>
  <img src='test.png'>
</body>
```

Registering a scheme as standard will allow access to files through the [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). Otherwise the renderer will throw a security error for the scheme.

По умолчанию веб-хранилище Apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) отключено для нестандартных схем. Поэтому в общем случае, если вы хотите зарегистрировать пользовательский протокол для замены протокола `http`, необходимо зарегистрировать его как стандартную схему.

### `protocol.registerFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Регистрирует протокол `scheme`, который отправит файл в качестве ответа. Обработчик `handler` будет вызван с запросом `request` и обратным вызовом `callback`, где запрос `request` является входящим запросом для схемы `scheme`.

To handle the `request`, the `callback` should be called with either the file's path or an object that has a `path` property, e.g. `callback(filePath)` or `callback({ path: filePath })`. `filePath` должен быть абсолютным путем.

По умолчанию `scheme` обрабатывается как `http:`, который анализируется иначе, чем протоколы, которые следуют "общему синтаксису URI", как `file:`.

### `protocol.registerBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Регистрирует протокол `scheme`, который отправит `Buffer` в качестве ответа.

То же самое с `registerFileProtocol`, за исключением того, что следует вызвать `callback` с объектом `Buffer` или с объектом, имеющим свойство `data`.

Пример:

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

Регистрирует протокол `scheme`, который отправит `String` в качестве ответа.

То же самое с `registerFileProtocol`, за исключением того, что следует вызвать `callback` с `String` или с объектом, имеющим свойство `data`.

### `protocol.registerHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` ProtocolResponse

Регистрирует протокол `scheme`, который отправит HTTP-запрос в качестве ответа.

То же самое с `registerFileProtocol`, за исключением того, что следует вызвать `callback` с объектом, имеющим свойство `url`.

### `protocol.registerStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Регистрирует протокол `scheme`, который отправит поток в качестве ответа.

То же самое с `registerFileProtocol`, за исключением того, что следует вызвать `callback` либо с объектом [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable), либо с объектом, имеющим свойство `data`.

Пример:

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

Unregisters the custom protocol of `scheme`.

### `protocol.isProtocolRegistered(scheme)`

* `scheme` String

Returns `Boolean` - Whether `scheme` is already registered.

### `protocol.interceptFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a file as a response.

### `protocol.interceptStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `String` as a response.

### `protocol.interceptBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response.

### `protocol.interceptHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` ProtocolResponse

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a new HTTP request as a response.

### `protocol.interceptStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Same as `protocol.registerStreamProtocol`, except that it replaces an existing protocol handler.

### `protocol.uninterceptProtocol(scheme)`

* `scheme` String

Remove the interceptor installed for `scheme` and restore its original handler.

### `protocol.isProtocolIntercepted(scheme)`

* `scheme` String

Returns `Boolean` - Whether `scheme` is already intercepted.
