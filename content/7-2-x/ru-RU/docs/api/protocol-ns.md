# протокол (NetworkService) (Черновик)

В этом документе описываются API нового протокола, основанное на [NetworkService](https://www.chromium.org/servicification).

В настоящее время мы не можем сказать, когда мы включим `NetworkService` по умолчанию в Electron, но поскольку Chromium уже удаляет код, отличный от `NetworkService`, мы, вероятно, переключимся до Electron 10.

Содержимое этого документа должно быть перемещено в `protocol.md`, после того, как мы включим `NetworkService` в Electron.

> Регистрация пользовательского протокола и перехват существующих запросов протокола.

Процесс: [Главный](../glossary.md#main-process)

Пример реализации протокола, имеющего тот же эффект, что и протокол `file://`:

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

**Примечание:** Все методы, если не указано другого, могут быть использованы только после того, как событие `ready` модуля `app` будет отправлено.

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

Регистрирует `scheme` как стандартную, безопасную, обходит политику безопасности контента для ресурсов, позволяет регистрировать ServiceWorker и поддерживает получение API. Укажите привилегию со значением `true` чтобы включить эту возможность.

Пример регистрации привилегированной схемы, которая обходит Политику безопасности контента:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privileges: { bypassCSP: true } }
])
```

Стандартная схема соответствует вызовам RFC 3986 [универсальный синтаксис URI ](https://tools.ietf.org/html/rfc3986#section-3). For example `http` and `https` are standard schemes, while `file` is not.

Регистрация схемы в качестве стандартной позволяет правильно разрешать относительные и абсолютные ресурсы при обслуживании. Otherwise the scheme will behave like the `file` protocol, but without the ability to resolve relative URLs.

For example when you load following page with custom protocol without registering it as standard scheme, the image will not be loaded because non-standard schemes can not recognize relative URLs:

```html
<body>
  <img src='test.png'>
</body>
```

Регистрация схемы в качестве стандарта позволит получить доступ к файлам через [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). Otherwise the renderer will throw a security error for the scheme.

По умолчанию веб-хранилище Apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) отключено для нестандартных схем. Поэтому в общем случае, если вы хотите зарегистрировать пользовательский протокол для замены протокола `http`, необходимо зарегистрировать его как стандартную схему.

### `protocol.registerFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Регистрирует протокол `scheme`, который отправит файл в качестве ответа. Обработчик `handler` будет вызван с запросом `request` и обратным вызовом `callback`, где запрос `request` является входящим запросом для схемы `scheme`.

Для обработки запроса `request`, обратный вызов `callback` должен быть вызван либо с путём к файлу, либо с объектом, который имеет свойство `path`, например, `callback(filePath)` или `callback({ path: filePath })`. `filePath` должен быть абсолютным путем.

По умолчанию `scheme` обрабатывается как `http:`, который анализируется иначе, чем протоколы, которые следуют "общему синтаксису URI", как `file:`.

### `protocol.registerBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Регистрирует протокол `scheme`, который отправит `Buffer` в качестве ответа.

Использование аналогично `registerFileProtocol`, за исключением того, что `callback` должен вызываться либо с объектом `Buffer`, либо с объектом, имеющим свойство `data`.

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

Использование аналогично `registerFileProtocol`, за исключением того, что `callback` должен вызываться либо с `String`, либо с объектом, имеющим свойство `data`.

### `protocol.registerHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` ProtocolResponse

Регистрирует протокол `scheme`, который отправит HTTP-запрос в качестве ответа.

Использование аналогично `registerFileProtocol`, за исключением того, что `callback` должен быть вызван с объектом, имеющим свойство `url`.

### `protocol.registerStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Регистрирует протокол `scheme`, который отправит поток в качестве ответа.

Использование аналогично `registerFileProtocol`, за исключением того, что `callback` должен вызываться либо с объектом [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable), либо с объектом, имеющим свойство `data`.

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

Возможно передать любой объект, реализующий читаемый потоковый API (выдающий `data`/`end`/`error` события). Например, вот как может быть возвращен файл:

```javascript
protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs.createReadStream('index.html'))
})
```

### `protocol.unregisterProtocol(scheme)`

* `scheme` String

Отменяет регистрацию пользовательского протокола `scheme`.

### `protocol.isProtocolRegistered(scheme)`

* `scheme` String

Возвращает `Boolean` - является ли `scheme` уже зарегистрированной.

### `protocol.interceptFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Перехватывает протокол `scheme` и использует `handler` в качестве нового обработчика протокола, который отправляет файл в качестве ответа.

### `protocol.interceptStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Перехватывает протокол `scheme` и использует `handler` в качестве нового обработчика протокола, который отправляет `String` в качестве ответа.

### `protocol.interceptBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Перехватывает протокол `scheme` и использует `handler` в качестве нового обработчика протокола, который отправляет `Buffer` в качестве ответа.

### `protocol.interceptHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` ProtocolResponse

Перехватывает протокол `scheme` и использует `handler` в качестве нового обработчика протокола, который отправляет новый HTTP-запрос в качестве ответа.

### `protocol.interceptStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

То же самое, что и `protocol.registerStreamProtocol`, за исключением того, что он заменяет существующий обработчик протокола.

### `protocol.uninterceptProtocol(scheme)`

* `scheme` String

Удаляет перехватчик, установленный для `scheme` и восстанавливает его оригинальный обработчик.

### `protocol.isProtocolIntercepted(scheme)`

* `scheme` String

Возвращает `Boolean` - является ли `scheme` уже перехваченной.
