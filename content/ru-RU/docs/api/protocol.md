# protocol

> Регистрация пользовательского протокола и перехват существующих запросов протокола.

Процесс: [Основной](../glossary.md#main-process)

Пример реализации протокола, имеющего тот же эффект, что и протокол `file://`:

```javascript
const { app, protocol } и требуют ('электрон')
const путь - требуют ('путь')

app.whenReady ().,после этого (()) -> -
  protocol.registerFileProtocol ('atom', (запрос, обратный вызов) -> -
    const URL - request.url.substr(7)
    обратный вызов (
путь: path.normalize('${__dirname}/${url}'
  )
```

**Примечание:** Все методы, если не указано другого, могут быть использованы только после того, как событие `ready` модуля `app` будет отправлено.

## Использование протокола `protocol` с пользовательским разделом `partition` или сеансом `session`

Протокол регистрируется для определенного Electron объекта [`session`](./session.md). Если вы не укажете сеанс, то ваш `protocol` будет применен сеансу по умолчанию, который использует Electron. Однако, если вы определите `partition` или `session` в `браузереWindow` в `webPreferences`, то это окно будет использовать другой сеанс, и ваш пользовательский протокол не будет работать, если вы просто используете `electron.protocol.XXX`.

Для того, чтобы ваш пользовательский протокол работал в сочетании с пользовательским сеансом, вам необходимо явно зарегистрировать его в этом сеансе.

```javascript
const { session, app, protocol } - требуют ('электрон')
const путь - требуют ('путь')

app.whenReady ().,после этого (()) -> -
  const partition - 'persist:example'
  const ses ss ss s.fromPartition (partition)

  ses.protocol.registerFileProtocol('atom', (запрос, обратный вызов) -> -
    const URL - request.url.substr(7)
    обратный вызов (путь: путь.нормализовано('${__dirname}/${url}')
  )

  mainWindow - новый BrowserWindow (является веб- { partition } )
)
```

## Методы

Модуль `protocol` имеет следующие методы:

### `protocol.registerSchemesAsPrivileged(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)

**Примечание:** Этот метод можно использовать только до отправки события `ready` модуля `app` и может быть вызван только один раз.

Регистрирует `scheme` в качестве стандартной, безопасной, обходит политику безопасности контента для ресурсов, позволяет регистрировать ServiceWorker, поддерживает получение API и потоковое видео/аудио. Укажите привилегию со значением `true` для включения возможности.

Пример регистрации привилегированной схемы, которая обходит Политику безопасности контента:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privileges: { bypassCSP: true } }
])
```

Стандартная схема соответствует вызовам RFC 3986 [универсальный синтаксис URI](https://tools.ietf.org/html/rfc3986#section-3). Например, `http` и `https` являются стандартными схемами, в то время как `file` не является.

Регистрация схемы в качестве стандартной позволяет правильно разрешать относительные и абсолютные ресурсы при обслуживании. В противном случае схема будет вести себя как протокол `file`, но без возможности разрешения относительных URL-адресов.

Например, когда вы загружаете следующую страницу с помощью пользовательского протокола, не регистрируя его как стандартную схему, изображение не будет загружено, потому что нестандартные схемы не могут распознать относительные URL-адреса:

```html
<body>
  <img src='test.png'>
</body>
```

Registering a scheme as standard will allow access to files through the [FileSystem API][file-system-api]. В противном случае программа для схемы выдаст ошибку безопасности.

По умолчанию веб-хранилище Apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) отключено для нестандартных схем. Поэтому в общем случае, если вы хотите зарегистрировать пользовательский протокол для замены протокола `http`, необходимо зарегистрировать его как стандартную схему.

Протоколы, в которые используются потоки (протоколы http и stream), должны `stream: true`. В `<video>` и `<audio>` HTML-элементы ожидают, что протоколы буферизации своих ответы по умолчанию. Флаг `stream` эти элементы, чтобы правильно ожидать потоковых ответов.

### `protocol.registerFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ПротоколРеквест](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Возвращает `Boolean` - Был ли протокол успешно зарегистрирован

Регистрирует протокол `scheme`, который отправит файл в качестве ответа. Обработчик `handler` будет вызван с запросом `request` и обратным вызовом `callback`, где запрос `request` является входящим запросом для схемы `scheme`.

Для обработки запроса `request`, обратный вызов `callback` должен быть вызван либо с путём к файлу, либо с объектом, который имеет свойство `path`, например, `callback(filePath)` или `callback({ path: filePath })`. `filePath` должен быть абсолютным путем.

По умолчанию `scheme` обрабатывается как `http:`, который анализируется иначе, чем протоколы, которые следуют "общему синтаксису URI", как `file:`.

### `protocol.registerBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ПротоколРеквест](structures/protocol-request.md)
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Возвращает `Boolean` - Был ли протокол успешно зарегистрирован

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
  * `request` [ПротоколРеквест](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Возвращает `Boolean` - Был ли протокол успешно зарегистрирован

Регистрирует протокол `scheme`, который отправит `String` в качестве ответа.

Использование аналогично `registerFileProtocol`, за исключением того, что `callback` должен вызываться либо с `String`, либо с объектом, имеющим свойство `data`.

### `protocol.registerHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ПротоколРеквест](structures/protocol-request.md)
  * `callback` Function
    * `response` ProtocolResponse

Возвращает `Boolean` - Был ли протокол успешно зарегистрирован

Регистрирует протокол `scheme`, который отправит HTTP-запрос в качестве ответа.

Использование аналогично `registerFileProtocol`, за исключением того, что `callback` должен быть вызван с объектом, имеющим свойство `url`.

### `protocol.registerStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ПротоколРеквест](structures/protocol-request.md)
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Возвращает `Boolean` - Был ли протокол успешно зарегистрирован

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

Возвращает `Boolean` - Был ли протокол успешно незарегистрирован

Отменяет регистрацию пользовательского протокола `scheme`.

### `protocol.isProtocolRegistered(scheme)`

* `scheme` String

Возвращает `Boolean` - является ли `scheme` уже зарегистрированной.

### `protocol.interceptFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ПротоколРеквест](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Возвращает `Boolean` - Был ли протокол успешно перехвачен

Перехватывает протокол `scheme` и использует `handler` в качестве нового обработчика протокола, который отправляет файл в качестве ответа.

### `protocol.interceptStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ПротоколРеквест](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Возвращает `Boolean` - Был ли протокол успешно перехвачен

Перехватывает протокол `scheme` и использует `handler` в качестве нового обработчика протокола, который отправляет `String` в качестве ответа.

### `protocol.interceptBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ПротоколРеквест](structures/protocol-request.md)
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Возвращает `Boolean` - Был ли протокол успешно перехвачен

Перехватывает протокол `scheme` и использует `handler` в качестве нового обработчика протокола, который отправляет `Buffer` в качестве ответа.

### `protocol.interceptHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ПротоколРеквест](structures/protocol-request.md)
  * `callback` Function
    * `response` [протоколОтветчик](structures/protocol-response.md)

Возвращает `Boolean` - Был ли протокол успешно перехвачен

Перехватывает протокол `scheme` и использует `handler` в качестве нового обработчика протокола, который отправляет новый HTTP-запрос в качестве ответа.

### `protocol.interceptStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ПротоколРеквест](structures/protocol-request.md)
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Возвращает `Boolean` - Был ли протокол успешно перехвачен

То же самое, что и `protocol.registerStreamProtocol`, за исключением того, что он заменяет существующий обработчик протокола.

### `protocol.uninterceptProtocol(scheme)`

* `scheme` String

Возвращает `Boolean` - Был ли протокол успешно невмешательн

Удаляет перехватчик, установленный для `scheme` и восстанавливает его оригинальный обработчик.

### `protocol.isProtocolIntercepted(scheme)`

* `scheme` String

Возвращает `Boolean` - является ли `scheme` уже перехваченной.

[file-system-api]: https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem
