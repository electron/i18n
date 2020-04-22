## Class: ClientRequest

> Создает HTTP/HTTPS-запросы.

Процесс: [Основной](../glossary.md#main-process)

`ClientRequest` реализует интерфейс [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) и [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `new ClientRequest(options)`

* `options` (Object | String) - If `options` is a String, it is interpreted as the request URL. If it is an object, it is expected to fully specify an HTTP request via the following properties:
  * `method` String (optional) - The HTTP request method. Defaults to the GET method.
  * `url` String (optional) - The request URL. Must be provided in the absolute form with the protocol scheme specified as http or https.
  * `session` Session (опционально) – экземпляр [`Session`](session.md), с которым ассоциирован данный запрос.
  * `partition` String (опционально) – название [`раздела`](session.md), с которым ассоциирован данный запрос. По умолчанию является пустой строкой. Параметр `session` преобладает над параметром `partition`. Поэтому, если параметр `session` явно указан, то `partition` игнорируется.
  * `useSessionCookies` Boolean (optional) - Whether to send cookies with this request from the provided session.  This will make the `net` request's cookie behavior match a `fetch` request. По умолчанию - `false`.
  * `protocol` String (optional) - The protocol scheme in the form 'scheme:'. Currently supported values are 'http:' or 'https:'. Defaults to 'http:'.
  * `host` String (опционально) - объединенное с номером порта доменное имя сервера 'доменное_имя:порт'.
  * `hostname` String (опционально) – доменное имя сервера.
  * `port` Integer (опционально) – номер порта сервера.
  * `path` String (опционально) - часть пути запроса URL.
  * `redirect` String (опционально) - режим перенаправления для запроса. Должно быть одно из `follow`, `error` или `manual`. По умолчанию - `follow`. Когда режим `error`, любые перенаправления будут отменены. В режиме `manual` переадресация будет отменена, если синхронно во время события [`redirect`](#event-redirect) не будет вызван [`request.followRedirect`](#requestfollowredirect).

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
  * `username` String (опционально)
  * `password` String (опционально)

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

Emitted when the `request` is aborted. The `abort` event will not be fired if the `request` is already closed.

#### Событие: 'error'

Возвращает:

* `error` Error - объект ошибки, содержащий некоторую информацию о неудаче.

Происходит, когда модулю `net` не удается выполнить сетевой запрос. Обычно, когда объект `request` генерирует событие `error`, в последствии последует событие `close` и не будет представлен объект ответа.

#### Событие: 'close'

Происходит как последнее событие в транзакции HTTP запроса-ответа. Событие `close` указывает, что больше события не будут происходить ни на `request`, ни на `response` объектах.


#### Событие: 'redirect'

Возвращает:

* `statusCode` Integer
* `method` String
* `redirectUrl` String
* `responseHeaders` Record<String, String[]>

Используется при возврате сервером перенаправленного ответа (например, 301 Перемещено навсегда). Вызов [`request.followRedirect`](#requestfollowredirect) продолжится с перенаправлением.  If this event is handled, [`request.followRedirect`](#requestfollowredirect) must be called **synchronously**, otherwise the request will be cancelled.

### Свойства экземпляра

#### `request.chunkedEncoding`

`Boolean`, определяющий, будет ли запрос использовать в HTTP шифрование передачи частей или нет. По умолчанию - false. Свойство доступно для чтения и записи, в любом случае оно может быть установлено только до первой операции записи, поскольку HTTP-заголовки еще не отправлены. Попытка установить свойство `chunkedEncoding` после первой записи вызовет ошибку.

Использование шифрование частей настоятельно рекомендуется, если Вам необходимо отправить большое содержимое запроса как данные, которые будут передаваться в потоке малыми частями вместо внутренней буферизации в памяти процесса Electron.

### Методы экземпляра

#### `request.setHeader(name, value)`

* `name` String - имя дополнительного HTTP-заголовка.
* `value` String - значение дополнительного HTTP-заголовка.

Добавляет дополнительный HTTP-заголовок. Имя заголовка будет выдано как есть, без нижнего регистра. Может быть вызвано только перед первой записи. Вызов этого метода после первой записи вызовет ошибку. Если переданное значение это не `String`, тогда метод `toString()` будет вызван, чтобы получить конечное значение.

#### `request.getHeader(name)`

* `name` String - укажите имя дополнительного заголовка.

Возвращает `String` - значение ранее установленного дополнительного заголовка.

#### `request.removeHeader(name)`

* `name` String - укажите имя дополнительного заголовка.

Removes a previously set extra header name. This method can be called only before first write. Trying to call it after the first write will throw an error.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - A chunk of the request body's data. If it is a string, it is converted into a Buffer using the specified encoding.
* `encoding` String (optional) - Used to convert string chunks into Buffer objects. Defaults to 'utf-8'.
* `callback` Function (опционально) - вызывается после того, как закончится операция записи.

`callback` является по существу фиктивной функцией, представленной в целях сохранения схожести с API Node.JS. Вызывается асинхронно в следующем такте, после содержимое `chunk` будет отправлено в сетевой слой Chromium. В отличие от реализации Node.JS, не гарантировано, что содержимое `chunk` будет отправлено до вызова `callback`.

Добавляет часть данных в содержимое запроса. Первая операция записи может привести тому, что заголовки запроса будут отправлены. После первой операции записи, недопустимо добавлять или удалять пользовательские заголовки.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (опционально)
* `encoding` String (опционально)
* `callback` Function (опционально)

Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish` event is emitted just after the end operation.

#### `request.abort()`

Отменяет текущую транзакцию HTTP. Если запрос уже сгенерировал событие `close`, операция прерывания не будет иметь эффекта. Иначе текущее событие будет генерировать события `abort` и `close`. Кроме того, если есть текущий объект ответа, будет сгенерировано событие `aborted`.

#### `request.followRedirect()`

Continues any pending redirection. Can only be called during a `'redirect'` event.

#### `request.getUploadProgress()`

Возвращает `Object`:

* `active` Boolean - Whether the request is currently active. If this is false no other properties will be set
* `started` Boolean - Whether the upload has started. If this is false both `current` and `total` will be set to 0.
* `current` Integer - количество байтов, которые были загружены
* `total` Integer - количество байтов, которые будут загружены в этом запросе

Вы можете использовать этот метод в сочетании с запросами `POST`, чтобы получить прогресс загрузки файла или другой передачи данных.
