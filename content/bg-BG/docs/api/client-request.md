## Клас: ClientRequest

> Направи искания HTTP/HTTPS.

Процеса: [Main](../glossary.md#main-process)

`ClientRequest` интерфейс [Writable поток](https://nodejs.org/api/stream.html#stream_writable_streams) и следователно е [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `Нова ClientRequest(options)`

* `опции` (Обект | Низ) - ако `опции` е низ, се тълкува като заявка URL. Ако това е обект, се очаква да напълно Задайте HTTP заявка чрез следните свойства: 
  * `метод` Низ (по избор) - HTTP заявка метод. По подразбиране метода GET.
  * `URL` Низ (по избор) - заявка URL. Трябва да се предоставя в абсолютна форма зададена като http или https схемата на протокола.
  * `сесия` Обект (по избор) - екземплярът на [`сесията`](session.md), с който е свързана заявката.
  * `сесия` Обект (по избор) - екземплярът на [`сесията`](session.md), с който е свързана заявката. По подразбиране е празен низ. Опцията `сесия` преобладава на `дял`. Следователно ако изрично е указано `сесия`, `дял` се игнорира.
  * `протокол` Низ (по избор) - схемата на протокол във формата "схема:'. Поддържани в момента стойности са ' http:' или ' https:'. По подразбиране е "http:".
  * `host` String (optional) - The server host provided as a concatenation of the hostname and the port number 'hostname:port'.
  * `име на хост` Низ (по избор) - името на хоста на сървъра.
  * `порт` Цяло число (по избор) - слушане номера на порта на сървъра.
  * `path` String (по избор) - Пътя на бисквитката.
  * `redirect` String (optional) - The redirect mode for this request. Should be one of `follow`, `error` or `manual`. Defaults to `follow`. When mode is `error`, any redirection will be aborted. When mode is `manual` the redirection will be deferred until [`request.followRedirect`](#requestfollowredirect) is invoked. Listen for the [`redirect`](#event-redirect) event in this mode to get more details about the redirect request.

свойства на `Опции` като `протокол`, `хост`, `име на хост`, `пристанището` и `пътя` следват стриктно Node.js модела, както е описано в модула [URL](https://nodejs.org/api/url.html).

Например ние може да сме създали същото искане за "github.com" както следва:

```JavaScript
const request = net.request({
  method: 'GET',
  protocol: 'https:',
  hostname: 'github.com',
  port: 443,
  path: '/'
})
```

### Събития

#### Събитие: "отговор"

Връща:

* `отговор` IncomingMessage - обект, представляващ HTTP отговор съобщението.

#### Събитие: 'login'

Връща:

* `authInfo` Object 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `потребителско име` Низ
  * `парола` Низ

Отделяни при автентичността прокси е asking за потребителски идентификационни данни.

Функцията `за обратно извикване` се очаква да се обади с потребителски идентификационни данни:

* `потребителско име` Низ
* `парола` Низ

```JavaScript
request.On ("вход", (authInfo, callback) => {обратно повикване ("потребителско име", "парола")})
```

Предоставяне на идентификационни данни на празна ще отмени искането и доклад грешка при удостоверяване на обект на отговор:

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

#### Събитие: "Готово"

Излъчва само след последното парче от `заявка` на данни е написано в `искането` предмет.

#### Събитие: "недоносче"

Emitted when the `request` is aborted. The `abort` event will not be fired if the `request` is already closed.

#### Събитие: 'error'

Връща:

* `error` Error - an error object providing some information about the failure.

Emitted when the `net` module fails to issue a network request. Typically when the `request` object emits an `error` event, a `close` event will subsequently follow and no response object will be provided.

#### Event: 'close'

Emitted as the last event in the HTTP request-response transaction. The `close` event indicates that no more events will be emitted on either the `request` or `response` objects.

#### Event: 'redirect'

Връща:

* `statusCode` Integer
* `method` String
* `redirectUrl` String
* `responseHeaders` Object

Emitted when there is redirection and the mode is `manual`. Calling [`request.followRedirect`](#requestfollowredirect) will continue with the redirection.

### Инстантни свойства

#### `request.chunkedEncoding`

A `Boolean` specifying whether the request will use HTTP chunked transfer encoding or not. Defaults to false. The property is readable and writable, however it can be set only before the first write operation as the HTTP headers are not yet put on the wire. Trying to set the `chunkedEncoding` property after the first write will throw an error.

Using chunked encoding is strongly recommended if you need to send a large request body as data will be streamed in small chunks instead of being internally buffered inside Electron process memory.

### Инстантни методи

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

`callback` is essentially a dummy function introduced in the purpose of keeping similarity with the Node.js API. It is called asynchronously in the next tick after `chunk` content have been delivered to the Chromium networking layer. Противно на Node.js изпълнението не е гарантирано, че `парче` съдържание са изпразнен на тел преди `обратно повикване` се нарича.

Добавя парче на данни към органа по заявка. Първата операция на запис може да причини на искането заглавията да бъдат издадени на тел. След първата пиша операция, не е позволено да добавите или премахнете потребителски горен колонтитул.

#### `request.End ([chunk][, кодиране] [, обратно повикване])`

* `chunk` (String | Buffer) (optional)
* `encoding` String (optional)
* `callback` Function (optional)

Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish` event is emitted just after the end operation.

#### `request.abort()`

Cancels an ongoing HTTP transaction. If the request has already emitted the `close` event, the abort operation will have no effect. Otherwise an ongoing event will emit `abort` and `close` events. Additionally, if there is an ongoing response object,it will emit the `aborted` event.

#### `request.followRedirect()`

Continues any deferred redirection request when the redirection mode is `manual`.