## Class: ClientRequest

> Создает HTTP/HTTPS-запросы.

Процесс: [Основной](../glossary.md#main-process)

`ClientRequest` реализует интерфейс [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) и [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `new ClientRequest(options)`

* `options` (Object | String) – Если `options` это строка, она интерпретируется как URL-адрес запроса. Если объект, то подразумевается, что он полностью определяет HTTP запрос, используя следующие свойства: 
  * `method` String (опционально) – метод HTTP запроса. По умолчанию GET.
  * `url` String (опционально) – URL запроса. Должен быть предоставлен в абсолютной форме, с указанной схемой протокола http или https.
  * `session` Object (опционально) – экземпляр [`Session`](session.md), с которым ассоциирован данный запрос.
  * `partition` String (опционально) – название [`раздела`](session.md), с которым ассоциирован данный запрос. По умолчанию является пустой строкой. Параметр `session` преобладает над параметром `partition`. Поэтому, если параметр `session` явно указан, то `partition` игнорируется.
  * `protocol` String (опционально) – схема протокола в виде 'схема:'. На текущий момент поддерживаются следующие значения: 'http:' или 'https:'. По умолчанию 'http:'.
  * `host` String (опционально) - объединенное с номером порта доменное имя сервера 'доменное_имя:порт'.
  * `hostname` String (опционально) – доменное имя сервера.
  * `port` Integer (опционально) – номер порта сервера.
  * `path` String (опционально) - часть пути запроса URL.
  * `redirect` String (опционально) - режим перенаправления для запроса. Должно быть одно из `follow`, `error` или `manual`. По умолчанию - `follow`. Когда режим `error`, любые перенаправления будут отменены. Когда режим `manual`, перенаправление будет отложено до тех пор, пока [`request.followRedirect`](#requestfollowredirect) не будет вызван. Прослушивайте событие [`redirect`](#event-redirect) в этом режиме, чтобы получить больше информации о перенаправлении запроса.

Свойства `options`, такие как `protocol`, `host`, `hostname`, `port` и `path`, строго следуют модели Node.js, которая описана в модуле [URL](https://nodejs.org/api/url.html).

Например, мы могли бы создать такой же запрос на 'github.com' следующим образом:

```JavaScript
const request = net.request({
  method: 'GET',
  protocol: 'https:',
  hostname: 'github.com',
  port: 443,
  path: '/'
})
```

### События экземпляра

#### Событие: 'response'

Возвращает:

* `response` IncomingMessage - объект, представляющий ответ HTTP.

#### Событие: 'login'

Возвращает:

* `authInfo` Object 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String
  * `password` String

Происходит, когда прокси-сервер, выполняющий проверку подлинности, запрашивает учетные данные пользователя.

Ожидается, что функция `callback` будет вызвана с учетными данными пользователя:

* `username` String
* `password` String

```JavaScript
request.on('login', (authInfo, callback) => {
  callback('username', 'password')
})
```

Предоставление пустых учетных данных отменит запрос и сообщит об ошибке проверки подлинности в объекте ответа:

```JavaScript
request.on('response', (response) => {
  console.log(`STATUS: ${response.statusCode}`);
  response.on('error', (error) => {
    console.log(`ERROR: ${JSON.stringify(error)}`)
  })
})
request.on('login', (authInfo, callback) => {
  callback()
})
```

#### Событие: 'finish'

Происходит сразу после того, как последняя часть данных `запроса` была записана в объект `request`.

#### Событие: 'abort'

Происходит, когда `запрос` был отменен. Событие `abort` не произойдет, если `запрос` уже закрыт.

#### Событие: 'error'

Возвращает:

* `error` Error - объект ошибки, содержащий некоторую информацию о неудаче.

Происходит, когда модулю `net` не удается выполнить сетевой запрос. Typically when the `request` object emits an `error` event, a `close` event will subsequently follow and no response object will be provided.

#### Событие: 'close'

Emitted as the last event in the HTTP request-response transaction. The `close` event indicates that no more events will be emitted on either the `request` or `response` objects.

#### Событие: 'redirect'

Возвращает:

* `statusCode` Integer
* `method` String
* `redirectUrl` String
* `responseHeaders` Object

Emitted when there is redirection and the mode is `manual`. Calling [`request.followRedirect`](#requestfollowredirect) will continue with the redirection.

### Instance Properties

#### `request.chunkedEncoding`

A `Boolean` specifying whether the request will use HTTP chunked transfer encoding or not. Defaults to false. The property is readable and writable, however it can be set only before the first write operation as the HTTP headers are not yet put on the wire. Trying to set the `chunkedEncoding` property after the first write will throw an error.

Using chunked encoding is strongly recommended if you need to send a large request body as data will be streamed in small chunks instead of being internally buffered inside Electron process memory.

### Методы экземпляра

#### `request.setHeader(name, value)`

* `name` String - An extra HTTP header name.
* `value` Object - An extra HTTP header value.

Adds an extra HTTP header. The header name will issued as it is without lowercasing. It can be called only before first write. Calling this method after the first write will throw an error. If the passed value is not a `String`, its `toString()` method will be called to obtain the final value.

#### `request.getHeader(name)`

* `name` String - Specify an extra header name.

Returns `Object` - The value of a previously set extra header name.

#### `request.removeHeader(name)`

* `name` String - Specify an extra header name.

Removes a previously set extra header name. This method can be called only before first write. Trying to call it after the first write will throw an error.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - A chunk of the request body's data. If it is a string, it is converted into a Buffer using the specified encoding.
* `encoding` String (optional) - Used to convert string chunks into Buffer objects. Defaults to 'utf-8'.
* `callback` Function (optional) - Called after the write operation ends.

`callback` is essentially a dummy function introduced in the purpose of keeping similarity with the Node.js API. It is called asynchronously in the next tick after `chunk` content have been delivered to the Chromium networking layer. Contrary to the Node.js implementation, it is not guaranteed that `chunk` content have been flushed on the wire before `callback` is called.

Adds a chunk of data to the request body. The first write operation may cause the request headers to be issued on the wire. After the first write operation, it is not allowed to add or remove a custom header.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (optional)
* `encoding` String (optional)
* `callback` Function (optional)

Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish` event is emitted just after the end operation.

#### `request.abort()`

Отменяет текущую транзакцию HTTP. If the request has already emitted the `close` event, the abort operation will have no effect. Otherwise an ongoing event will emit `abort` and `close` events. Additionally, if there is an ongoing response object,it will emit the `aborted` event.

#### `request.followRedirect()`

Продолжает любой отложенный запрос перенаправления, когда режим перенаправления `manual`.

#### `request.getUploadProgress()`

Возвращает `Object`:

* `active` Boolean - Whether the request is currently active. If this is false no other properties will be set
* `started` Boolean - Whether the upload has started. If this is false both `current` and `total` will be set to 0.
* `current` Integer - The number of bytes that have been uploaded so far
* `total` Integer - The number of bytes that will be uploaded this request

You can use this method in conjunction with `POST` requests to get the progress of a file upload or other data transfer.