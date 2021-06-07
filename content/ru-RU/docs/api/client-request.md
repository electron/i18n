## Class: ClientRequest

> Создает HTTP/HTTPS-запросы.

Процесс: [Основной](../glossary.md#main-process)

`ClientRequest` реализует интерфейс [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) и [EventEmitter][event-emitter].

### `new ClientRequest(options)`

* `options` (Object | String) - Если `options` является String, то она интепретируется как URL запроса. Если это объект, ожидается полное указание HTTP запроса через следующие свойства:
  * `method` String (опционально) - Метод HTTP-запроса. По умолчанию метод GET.
  * `url` String (опционально) - URL запроса. Необходимо предоставить в абсолютной форме с протокольной схемой, указанной как http или https.
  * `session` Session (опционально) – экземпляр [`Session`](session.md), с которым ассоциирован данный запрос.
  * `partition` String (опционально) – название [`раздела`](session.md), с которым ассоциирован данный запрос. По умолчанию является пустой строкой. The `session` option supersedes `partition`. Поэтому, если параметр `session` явно указан, то `partition` игнорируется.
  * `credentials` String (опционально) - Может быть `include` или `omit`. Whether to send [credentials](https://fetch.spec.whatwg.org/#credentials) with this request. If set to `include`, credentials from the session associated with the request will be used. If set to `omit`, credentials will not be sent with the request (and the `'login'` event will not be triggered in the event of a 401). This matches the behavior of the [fetch](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) option of the same name. If this option is not specified, authentication data from the session will be sent, and cookies will not be sent (unless `useSessionCookies` is set).
  * `useSessionCookies` Boolean (optional) - Whether to send cookies with this request from the provided session. If `credentials` is specified, this option has no effect. По умолчанию - `false`.
  * `protocol` String (опционально) - Может быть `http:` или `https:`. The protocol scheme in the form 'scheme:'. По умолчанию 'http:'.
  * `host` String (опционально) - объединенное с номером порта доменное имя сервера 'доменное_имя:порт'.
  * `hostname` String (опционально) – доменное имя сервера.
  * `port` Integer (опционально) – номер порта сервера.
  * `path` String (опционально) - часть пути запроса URL.
  * `redirect` String (необязательный) - Позиция иконки, может иметь значения `follow`, `error` или `manual`. The redirect mode for this request. When mode is `error`, any redirection will be aborted. When mode is `manual` the redirection will be cancelled unless [`request.followRedirect`](#requestfollowredirect) is invoked synchronously during the [`redirect`](#event-redirect) event.  По умолчанию - `follow`.
  * `origin` String (optional) - The origin URL of the request.

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

* `response` [IncomingMessage](incoming-message.md) - Объект, представляющий ответ HTTP.

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

Возникает при прерывании `request`. Событие `abort` не будет запущено, если `request` уже закрыт.

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

Используется при возврате сервером перенаправленного ответа (например, 301 Перемещено навсегда). Вызов [`request.followRedirect`](#requestfollowredirect) продолжится с перенаправлением.  Если событие обработано, [`request.followRedirect`](#requestfollowredirect) должен вызываться **синхронно**, в противном случае запрос будет отменен.

### Свойства экземпляра

#### `request.chunkedEncoding`

`Boolean`, определяющий, будет ли запрос использовать в HTTP шифрование передачи частей или нет. По умолчанию - false. Свойство доступно для чтения и записи, в любом случае оно может быть установлено только до первой операции записи, поскольку HTTP-заголовки еще не отправлены. Попытка установить свойство `chunkedEncoding` после первой записи вызовет ошибку.

Использование шифрование частей настоятельно рекомендуется, если Вам необходимо отправить большое содержимое запроса как данные, которые будут передаваться в потоке малыми частями вместо внутренней буферизации в памяти процесса Electron.

### Методы экземпляра

#### `request.setHeader(name, value)`

* `name` String - имя дополнительного HTTP-заголовка.
* `value` String - значение дополнительного HTTP-заголовка.

Добавляет дополнительный HTTP-заголовок. Имя заголовка будет выдано как есть, без нижнего регистра. Может быть вызвано только перед первой записи. Вызов этого метода после первой записи вызовет ошибку. Если переданное значение это не `String`, тогда метод `toString()` будет вызван, чтобы получить конечное значение.

Certain headers are restricted from being set by apps. These headers are listed below. More information on restricted headers can be found in [Chromium's header utils](https://source.chromium.org/chromium/chromium/src/+/master:services/network/public/cpp/header_util.cc;drc=1562cab3f1eda927938f8f4a5a91991fefde66d3;bpv=1;bpt=1;l=22).

* `Content-Length`
* `Host`
* `Trailer` or `Te`
* `Upgrade`
* `Cookie2`
* `Keep-Alive`
* `Transfer-Encoding`

Additionally, setting the `Connection` header to the value `upgrade` is also disallowed.

#### `request.getHeader(name)`

* `name` String - укажите имя дополнительного заголовка.

Возвращает `String` - значение ранее установленного дополнительного заголовка.

#### `request.removeHeader(name)`

* `name` String - укажите имя дополнительного заголовка.

Удаляет ранее установленное дополнительное имя заголовка. Этот метод может быть вызван только перед первой записью. Попытка вызвать его после первой записи приведет к ошибке.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - Часть данных в теле запроса. Если это строка, то она преобразуется в буфер в заданной кодировке.
* `encoding` String (опционально) - используется для конвертирования строковые части в объект Buffer. По умолчанию 'utf-8'.
* `callback` Function (опционально) - вызывается после того, как закончится операция записи.

`callback` является по существу фиктивной функцией, представленной в целях сохранения схожести с API Node.JS. Вызывается асинхронно в следующем такте, после содержимое `chunk` будет отправлено в сетевой слой Chromium. В отличие от реализации Node.JS, не гарантировано, что содержимое `chunk` будет отправлено до вызова `callback`.

Добавляет часть данных в содержимое запроса. Первая операция записи может привести тому, что заголовки запроса будут отправлены. После первой операции записи, недопустимо добавлять или удалять пользовательские заголовки.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (опционально)
* `encoding` String (опционально)
* `callback` Function (опционально)

Отправляет последний фрагмент данных запроса. Последующие операции по записи или завершению не будут разрешены. Событие `finish` происходит сразу после завершения операции.

#### `request.abort()`

Отменяет текущую транзакцию HTTP. Если запрос уже сгенерировал событие `close`, операция прерывания не будет иметь эффекта. Иначе текущее событие будет генерировать события `abort` и `close`. Кроме того, если есть текущий объект ответа, будет сгенерировано событие `aborted`.

#### `request.followRedirect()`

Continues any pending redirection. Can only be called during a `'redirect'` event.

#### `request.getUploadProgress()`

Возвращает `Object`:

* `active` Boolean - Активен ли запрос в данный момент. Если это false, никакие другие свойства не будут установлены
* `started` Boolean - Началась ли загрузка. Если это false, то и `current` и `total` будут установлены в 0.
* `current` Integer - количество байтов, которые были загружены
* `total` Integer - количество байтов, которые будут загружены в этом запросе

Вы можете использовать этот метод в сочетании с запросами `POST`, чтобы получить прогресс загрузки файла или другой передачи данных.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
