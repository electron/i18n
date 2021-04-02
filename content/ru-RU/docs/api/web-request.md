## Class: WebRequest

> Intercept and modify the contents of a request at various stages of its lifetime.

Процесс: [Основной](../glossary.md#main-process)

К экземплярам `WebRequest` класса доступа можно получить с помощью `webRequest` свойства `Session`.

Методы `WebRequest` принимают факультативную `filter` и `listener`. Данные `listener` вызваны с `listener(details)` , когда событие API произошло. Объект `details` описывает запрос.

⚠️ будет использоваться только `listener` прикрепленная к ней . Проходя `null` как `listener` будет отписаться от события.

Объект `filter` имеет свойство `urls` , которое является массивом шаблонов URL , которые будут использоваться для фильтрации запросов, которые не соответствуют URL- шаблонов. Если `filter` опущен, то все запросы будут соответствовать.

Для определенных событий `listener` передается с `callback`, который должен с `response` объектом, `listener` сделал свою работу.

Пример добавления заголовка `User-Agent` для запросов:

```javascript
const { session } требуют ('электрон')

// Изменить пользовательский агент для всех запросов на следующие URL-адреса.
конст-фильтр и
  URL-адреса: «https://.github.com/», '://electron.github.io''
-

session.defaultSession.webRequest.onBeforeSendHeaders (фильтр, (подробности, обратный вызов) -> -
  details.requestHeaders.'User-Agent'" - 'MyAgent'
  обратный вызов ({ requestHeaders: details.requestHeaders })
)
```

### Методы экземпляра

Следующие методы доступны на экземплярах `WebRequest`:

#### `webRequest.onBeforeRequest (фильтр, слушатель)`

* `filter` (по желанию)
  * `urls` String - Массив шаблонов URL, которые будут использоваться для фильтрации запросов , которые не соответствуют шаблонам URL.
* `listener` функции | Null
  * `details` объект
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` (по желанию)
    * `webContents` WebContents (по желанию)
    * `frame` WebFrameMain (по желанию)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Двойной
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `response` объект
      * `cancel` Булан (по желанию)
      * `redirectURL` String (необязательно) - Исходный запрос не отправлен или завершен и вместо этого перенаправляется на данный URL.

Запрос `listener` вызван с помощью `listener(details, callback)` , когда будет происходить запрос.

" `uploadData` " - это массив `UploadData` объектов.

`callback` должен быть вызван с `response` объектом.

Некоторые примеры действительной `urls`:

```js
'http://foo:1234/'
'http://foo.com/'
'http://foo:1234/bar'
''://'/'
'://example.com/'
'://example.com/foo/ "
": "http://'.foo:1234/"
'file://foo:1234/bar'
'http://foo:'/'
'://www.foo.com/'
```

#### `webRequest.onBeforeSendHeaders (фильтр, слушатель)`

* `filter` (по желанию)
  * `urls` String - Массив шаблонов URL, которые будут использоваться для фильтрации запросов , которые не соответствуют шаблонам URL.
* `listener` функции | Null
  * `details` объект
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` (по желанию)
    * `webContents` WebContents (по желанию)
    * `frame` WebFrameMain (по желанию)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Двойной
    * `requestHeaders` рекорд<string, string>
  * `callback` Function
    * `beforeSendResponse` объект
      * `cancel` Булан (по желанию)
      * `requestHeaders` запись<string, string | string[]> (необязательно) - При условии, запрос будет сделан с этими головами.

Веб `listener` будет вызван с `listener(details, callback)` перед отправкой запрос http, как только запрос заготовки доступны. Это может произойти после подключения TCP к серверу, но до отправки любых данных http.

`callback` должен быть вызван с `response` объектом.

#### `webRequest.onSendHeaders (фильтр, слушатель)`

* `filter` (по желанию)
  * `urls` String - Массив шаблонов URL, которые будут использоваться для фильтрации запросов , которые не соответствуют шаблонам URL.
* `listener` функции | Null
  * `details` объект
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` (по желанию)
    * `webContents` WebContents (по желанию)
    * `frame` WebFrameMain (по желанию)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Двойной
    * `requestHeaders` рекорд<string, string>

Веб `listener` будет вызван с `listener(details)` незадолго до того, как запрос будет отправлен на сервер, изменения предыдущего ответа `onBeforeSendHeaders` видны к тому времени, когда этот слушатель уволен.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` (по желанию)
  * `urls` String - Массив шаблонов URL, которые будут использоваться для фильтрации запросов , которые не соответствуют шаблонам URL.
* `listener` функции | Null
  * `details` объект
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` (по желанию)
    * `webContents` WebContents (по желанию)
    * `frame` WebFrameMain (по желанию)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Двойной
    * `statusLine` Струна
    * `statusCode` Integer
    * `requestHeaders` рекорд<string, string>
    * `responseHeaders` запись<string, string[]> (по желанию)
  * `callback` Function
    * `headersReceivedResponse` объект
      * `cancel` Булан (по желанию)
      * `responseHeaders` запись<string, string | string[]> (необязательно) - При условии, сервер предполагается, , ответил с этими головами.
      * `statusLine` String (необязательно) - Следует предоставлять при `responseHeaders` изменения статуса заголовка в противном случае будет использоваться исходный ответ на статус заголовка.

Сообщение `listener` вызвано с `listener(details, callback)` , были получены заготовки ответа на запрос.

`callback` должен быть вызван с `response` объектом.

#### `webRequest.onResponseСтарт (Фильтр, «слушатель»)`

* `filter` (по желанию)
  * `urls` String - Массив шаблонов URL, которые будут использоваться для фильтрации запросов , которые не соответствуют шаблонам URL.
* `listener` функции | Null
  * `details` объект
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` (по желанию)
    * `webContents` WebContents (по желанию)
    * `frame` WebFrameMain (по желанию)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Двойной
    * `responseHeaders` запись<string, string[]> (по желанию)
    * `fromCache` Boolean - Указывает, был ли ответ получен из кэша диска.
    * `statusCode` Integer
    * `statusLine` Струна

Ответ `listener` вызван с `listener(details)` , когда будет получен первый органа реагирования. Для запросов HTTP это означает, что доступна строка и заготовки ответов.

#### `webRequest.onBeforeRedirect (фильтр, слушатель)`

* `filter` (по желанию)
  * `urls` String - Массив шаблонов URL, которые будут использоваться для фильтрации запросов , которые не соответствуют шаблонам URL.
* `listener` функции | Null
  * `details` объект
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` (по желанию)
    * `webContents` WebContents (по желанию)
    * `frame` WebFrameMain (по желанию)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Двойной
    * `redirectURL` Струна
    * `statusCode` Integer
    * `statusLine` Струна
    * `ip` String (необязательно) - IP-адрес сервера, на который был отправлен.
    * `fromCache` Булан
    * `responseHeaders` запись<string, string[]> (по желанию)

Данный `listener` вызван с помощью `listener(details)` когда сервер, перенаправление, вот-вот произойдет.

#### `webRequest.onCompleted (фильтр, слушатель)`

* `filter` (по желанию)
  * `urls` String - Массив шаблонов URL, которые будут использоваться для фильтрации запросов , которые не соответствуют шаблонам URL.
* `listener` функции | Null
  * `details` объект
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` (по желанию)
    * `webContents` WebContents (по желанию)
    * `frame` WebFrameMain (по желанию)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Двойной
    * `responseHeaders` запись<string, string[]> (по желанию)
    * `fromCache` Булан
    * `statusCode` Integer
    * `statusLine` Струна
    * `error` Струна

После `listener` запрос будет `listener(details)` с запросом.

#### `webRequest.onErrorOccurred (Фильтр, «слушатель»)`

* `filter` (по желанию)
  * `urls` String - Массив шаблонов URL, которые будут использоваться для фильтрации запросов , которые не соответствуют шаблонам URL.
* `listener` функции | Null
  * `details` объект
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` (по желанию)
    * `webContents` WebContents (по желанию)
    * `frame` WebFrameMain (по желанию)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Двойной
    * `fromCache` Булан
    * `error` строка - Описание ошибки.

Сообщение `listener` вызвано с `listener(details)` когда происходит ошибка.
