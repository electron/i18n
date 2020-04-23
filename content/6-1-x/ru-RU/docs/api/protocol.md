# protocol

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
  }, (error) => {
    if (error) console.error('Failed to register protocol')
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

## Методы

Модуль `protocol` имеет следующие методы:

### `protocol.registerSchemesAsPrivileged(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)


**Примечание:** Этот метод можно использовать только до отправки события `ready` модуля `app` и может быть вызван только один раз.

Регистрирует `scheme` как стандартную, безопасную, обходит политику безопасности контента для ресурсов, позволяет регистрировать ServiceWorker и поддерживает получение API.

Specify a privilege with the value of `true` to enable the capability. An example of registering a privileged scheme, with bypassing Content Security Policy:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privileges: { bypassCSP: true } }
])
```

Стандартная схема соответствует вызовам RFC 3986 [универсальный синтаксис URI](https://tools.ietf.org/html/rfc3986#section-3). Например, `http` и `https` являются стандартными схемами, в то время как `file` не является.

Регистрация схемы в качестве стандартной позволит правильно разрешать относительные и абсолютные ресурсы при обслуживании. В противном случае схема будет вести себя как протокол `file`, но без возможности разрешения относительных URL-адресов.

Например, когда вы загружаете следующую страницу с помощью пользовательского протокола, не регистрируя его как стандартную схему, изображение не будет загружено, потому что нестандартные схемы не могут распознать относительные URL-адреса:

```html
<body>
  <img src='test.png'>
</body>
```

Регистрация схемы в качестве стандарта позволит получить доступ к файлам через [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). В противном случае программа для схемы выдаст ошибку безопасности.

По умолчанию веб-хранилище Apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) отключено для нестандартных схем. Поэтому в общем случае, если вы хотите зарегистрировать пользовательский протокол для замены протокола `http`, необходимо зарегистрировать его как стандартную схему.

`protocol.registerSchemesAsPrivileged` может быть использован для копирования функциональности предыдущих функций, таких как `protocol.registerStandardSchemes`, `webFrame.registerURLSchemeAs*` и `protocol.registerServiceWorkerSchemes`, существовавших до Electron 5.0.0, например:

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
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `filePath` String (optional)
* `completion` Function (optional)
  * `error` Error

Регистрирует протокол `scheme`, который отправит файл в качестве ответа. Обработчик `handler` будет вызван с помощью `handler(request, callback)`, когда запрос `request` будет создан с помощью схемы `scheme`. `completion` будет вызван с `completion(null)` когда `scheme` будет успешно зарегистрирована или с `completion(error)` при неудаче.

Для обработки запроса `request`, обратный вызов `callback` должен быть вызван либо с путём к файлу, либо с объектом, который имеет свойство `path`, например, `callback(filePath)` или `callback({ path: filePath })`. Объект также может иметь свойство `headers`, которое дает карту заголовков к значениям заголовков ответа, например,`callback({ path: filePath, headers: {"Content-Security-Policy": "default-src 'none'"]})`.

Когда `callback` вызывается без значения, с числом или объектом, имеющим свойство `error`, запрос `request` завершится ошибкой `error` с номером, который вы указали. Доступные номера ошибок, которые вы можете использовать, смотрите в [списке ошибок сети](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

По умолчанию `scheme` обрабатывается как `http:`, который анализируется иначе, чем протоколы, которые следуют "общему синтаксису URI", как `file:`.

### `protocol.registerBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (опционально)
* `completion` Function (optional)
  * `error` Error

Регистрирует протокол `scheme`, который отправит `Buffer` в качестве ответа.

Использование аналогично `registerFileProtocol`, за исключением того, что `callback` должен вызываться либо с объектом `Buffer`, либо с объектом, имеющим свойства `data`, `mimeType` и `charset`.

Пример:

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
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `data` String (optional)
* `completion` Function (optional)
  * `error` Error

Регистрирует протокол `scheme`, который отправит `String` в качестве ответа.

Использование аналогично `registerFileProtocol`, за исключением того, что `callback` должен вызываться либо со свойством `String`, либо с объектом, имеющим свойства `data`, `mimeType` и `charset`.

### `protocol.registerHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Object
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `redirectRequest` Object
      * `url` String
      * `method` String
      * `session` Object (optional)
      * `uploadData` Object (optional)
        * `contentType` String - тип содержимого MIME.
        * `data` String - Содержимое для отправки.
* `completion` Function (optional)
  * `error` Error

Регистрирует протокол `scheme`, который отправит HTTP-запрос в качестве ответа.

Использование аналогично `registerFileProtocol`, за исключением того, что `callback` должен вызываться с объектом `redirectRequest`, имеющим свойства `url`, `method`, `referrer`, `uploadData` и `session`.

By default the HTTP request will reuse the current session. If you want the request to have a different session you should set `session` to `null`.

Для POST-запросов должен быть предоставлен объект `uploadData`.

### `protocol.registerStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Object
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (опционально)
* `completion` Function (optional)
  * `error` Error

Регистрирует протокол `scheme`, который отправит `Readable` в качестве ответа.

Использование аналогично использованию другого `register{Any}Protocol`, за исключением того, что `callback` должен вызываться либо с объектом `Readable`, либо с объектом, имеющим свойства `data`, `statusCode` и `headers`.

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
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

Возможно передать любой объект, реализующий читаемый потоковый API (выдающий `data`/`end`/`error` события). Например, вот как может быть возвращен файл:

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

* `scheme` String
* `completion` Function (optional)
  * `error` Error

Отменяет регистрацию пользовательского протокола `scheme`.

### `protocol.isProtocolHandled(scheme, callback)`

* `scheme` String
* `callback` Function
  * `handled` Boolean

The `callback` will be called with a boolean that indicates whether there is already a handler for `scheme`.

**[Скоро устареет](modernization/promisification.md)**

### `protocol.isProtocolHandled(scheme)`

* `scheme` String

Возвращает `Promise<Boolean>` - заполнено логическим значением, которое указывает, есть ли уже обработчик для `scheme`.

### `protocol.interceptFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `filePath` String
* `completion` Function (optional)
  * `error` Error

Перехватывает протокол `scheme` и использует `handler` в качестве нового обработчика протокола, который отправляет файл в качестве ответа.

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `data` String (optional)
* `completion` Function (optional)
  * `error` Error

Перехватывает протокол `scheme` и использует `handler` в качестве нового обработчика протокола, который отправляет `String` в качестве ответа.

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `buffer` Buffer (опционально)
* `completion` Function (optional)
  * `error` Error

Перехватывает протокол `scheme` и использует `handler` в качестве нового обработчика протокола, который отправляет `Buffer` в качестве ответа.

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Object
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `redirectRequest` Object
      * `url` String
      * `method` String
      * `session` Object (optional)
      * `uploadData` Object (optional)
        * `contentType` String - тип содержимого MIME.
        * `data` String - Содержимое для отправки.
* `completion` Function (optional)
  * `error` Error

Перехватывает протокол `scheme` и использует `handler` в качестве нового обработчика протокола, который отправляет новый HTTP-запрос в качестве ответа.

### `protocol.interceptStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Object
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (опционально)
* `completion` Function (optional)
  * `error` Error

То же самое, что и `protocol.registerStreamProtocol`, за исключением того, что он заменяет существующий обработчик протокола.

### `protocol.uninterceptProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (optional)
  * `error` Error

Remove the interceptor installed for `scheme` and restore its original handler.
