## Class: Cookies

> Запрашивайте и изменяйте cookie.

Process: [Main](../glossary.md#main-process)

Экземпляры класса `Cookies` доступны через свойство `cookies` объекта `Session`.

Например:

```javascript
const {session} = require('electron')

// Запрос всех cookies.
session.defaultSession.cookies.get({}, (error, cookies) => {
  console.log(error, cookies)
})

// Запрос всех файлы cookie, связанных с определенным Url-адресом.
session.defaultSession.cookies.get({url: 'http://www.github.com'}, (error, cookies) => {
  console.log(error, cookies)
})

// Установить cookie с данными объекта cookie;
// перезаписывает эквивалентные cookie, если такие есть.
const cookie = {url: 'http://www.github.com', name: 'dummy_name', value: 'dummy'}
session.defaultSession.cookies.set(cookie, (error) => {
  if (error) console.error(error)
})
```

### События экземпляра

Для экземпляров `Cookies` доступны следующие события:

#### Событие: 'changed'

* `event` Event
* `cookie` [Cookie](structures/cookie.md) - The cookie that was changed.
* `cause` String - The cause of the change with one of the following values: 
  * `explicit` - The cookie was changed directly by a consumer's action.
  * `overwrite` - The cookie was automatically removed due to an insert operation that overwrote it.
  * `expired` - The cookie was automatically removed as it expired.
  * `evicted` - The cookie was automatically evicted during garbage collection.
  * `expired-overwrite` - The cookie was overwritten with an already-expired expiration date.
* `removed` Boolean - `true` if the cookie was removed, `false` otherwise.

Emitted when a cookie is changed because it was added, edited, removed, or expired.

### Методы экземпляра

В экземпляре `Cookies` доступны следующие методы:

#### `cookies.get(filter, callback)`

* `filter` Object 
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
  * `name` String (optional) - Filters cookies by name.
  * `domain` String (optional) - Retrieves cookies whose domains match or are subdomains of `domains`.
  * `path` String (optional) - Retrieves cookies whose path matches `path`.
  * `secure` Boolean (optional) - Filters cookies by their Secure property.
  * `session` Boolean (optional) - Filters out session or persistent cookies.
* `callback` Function 
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - an array of cookie objects.

Sends a request to get all cookies matching `filter`, `callback` will be called with `callback(error, cookies)` on complete.

#### `cookies.set(details, callback)`

* `details` Object 
  * `url` String - The url to associate the cookie with.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` String (optional) - The domain of the cookie. Empty by default if omitted.
  * `path` String (optional) - The path of the cookie. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Defaults to false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Defaults to false.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.
* `callback` Function 
  * `error` Error

Устанавливает cookie с соответствующим `details`. По завершению вызывается `callback(error)`.

#### `cookies.remove(url, name, callback)`

* `url` String - URL-дарес, связанный с cookie.
* `name` String - Название cookie для удаления.
* `callback` Function

Удаляет cookies с соответствующими `url` и `name`, по завершению вызывается `callback()`.

#### `cookies.flushStore(callback)`

* `callback` Function

Записывает непрочитанные cookies на диск.