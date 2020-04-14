## Клас: Cookies

> Достъп и промяна на потребителска сесия.

Процеса: [Main](../glossary.md#main-process)

Инстанция на класа `Cookies` можете да достъпите с помощта на свойството `cookies` на класа `Session`.

Например:

```javascript
const { session } = require('electron')

// Query all cookies.
session.defaultSession.cookies.get({})
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// Query all cookies associated with a specific url.
session.defaultSession.cookies.get({ url: 'http://www.github.com' })
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// Set a cookie with the given cookie data;
// may overwrite equivalent cookies if they exist.
const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
session.defaultSession.cookies.set(cookie)
  .then(() => {
    // success
  }, (error) => {
    console.error(error)
  })
```

### Събития

Имате достъп до следните събития:

#### Събитие: 'changed'

* `event` Събитие
* `cookie` [Cookie](structures/cookie.md) - бисквитката, която е променена.
* `cause` String - The cause of the change with one of the following values:
  * `explicit` - Бисквитката е променена директно чрез действие на потребителя.
  * `overwrite` - Бисквитката е изтрита автоматично поради действие 'Insert', което я е презаписало.
  * `expired` - The cookie was automatically removed as it expired.
  * `evicted` - The cookie was automatically evicted during garbage collection.
  * `expired-overwrite` - The cookie was overwritten with an already-expired expiration date.
* `removed` Boolean - `true` if the cookie was removed, `false` otherwise.

Emitted when a cookie is changed because it was added, edited, removed, or expired.

### Инстантни методи

The following methods are available on instances of `Cookies`:

#### `cookies.get(filter)`

* `filter` Object
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
  * `name` String (optional) - Filters cookies by name.
  * `domain` String (optional) - Retrieves cookies whose domains match or are subdomains of `domains`.
  * `path` String (optional) - Retrieves cookies whose path matches `path`.
  * `secure` Boolean (optional) - Filters cookies by their Secure property.
  * `session` Boolean (optional) - Filters out session or persistent cookies.

Returns `Promise<Cookie[]>` - A promise which resolves an array of cookie objects.

Sends a request to get all cookies matching `filter`, and resolves a promise with the response.

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

**[Deprecated Soon](modernization/promisification.md)**

#### `cookies.set(details)`

* `details` Object
  * `url` String - The url to associate the cookie with. The promise will be rejected if the url is invalid.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` String (по избор) - Това е домайн-а на бисквитката, ще бъде нормализирана с точка така, че да бъде валидна и за съб-домайни. Empty by default if omitted.
  * `path` String (по избор) - Пътя на бисквитката. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. По подразбиране е false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Defaults to false.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.

Returns `Promise<void>` - A promise which resolves when the cookie has been set

Sets a cookie with `details`.

#### `cookies.set(details, callback)`

* `details` Object
  * `url` String - The url to associate the cookie with.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` String (по избор) - Обхвата на бисквитката. Empty by default if omitted.
  * `path` String (по избор) - Пътя на бисквитката. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. По подразбиране е false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Defaults to false.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.
* `callback` Function
  * `error` Error

Sets a cookie with `details`, `callback` will be called with `callback(error)` on complete.

**[Deprecated Soon](modernization/promisification.md)**

#### `cookies.remove(url, name)`

* `url` String - The URL associated with the cookie.
* `name` String - The name of cookie to remove.

Returns `Promise<void>` - A promise which resolves when the cookie has been removed

Removes the cookies matching `url` and `name`

#### `cookies.remove(url, name, callback)`

* `url` String - The URL associated with the cookie.
* `name` String - The name of cookie to remove.
* `callback` Function

Removes the cookies matching `url` and `name`, `callback` will called with `callback()` on complete.

**[Deprecated Soon](modernization/promisification.md)**

#### `cookies.flushStore()`

Returns `Promise<void>` - A promise which resolves when the cookie store has been flushed

Writes any unwritten cookies data to disk.

#### `cookies.flushStore(callback)`

* `callback` Function

Writes any unwritten cookies data to disk.

**[Deprecated Soon](modernization/promisification.md)**
