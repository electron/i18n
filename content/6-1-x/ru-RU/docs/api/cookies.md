## Class: Cookies

> Запрашивайте и изменяйте cookie.

Процесс: [Главный](../glossary.md#main-process)

Экземпляры класса `Cookies` доступны через свойство `cookies` объекта `Session`.

Например:

```javascript
const { session } = require('electron')

// Запрос всех cookies.
session.defaultSession.cookies.get({})
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// Запрос всех cookies, связанных с определенным Url.
session.defaultSession.cookies.get({ url: 'http://www.github.com' })
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// Установить cookie с данными объекта cookie;
// перезаписывает эквивалентные cookie, если такие есть.
const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
session.defaultSession.cookies.set(cookie)
  .then(() => {
    // success
  }, (error) => {
    console.error(error)
  })
```

### События экземпляра

Для экземпляров `Cookies` доступны следующие события:

#### Событие: 'changed'

* Событие типа `event`
* `cookie` [Cookie](structures/cookie.md) - Cookie, который был изменен.
* `cause` String - The cause of the change with one of the following values:
  * `explic` - Cookie был изменен непосредственно действием потребителя.
  * `overwrite` - Cookie был автоматически удален из-за операции вставки, которая перезаписала его.
  * `expired` - Cookie был автоматически удален по истечении срока его действия.
  * `evicted` - Cookie был автоматически исключен во время сбора мусора.
  * `expired-overwrite` - Cookie был перезаписан с уже истекшим сроком действия.
* `removed` Boolean - `true` если cookie был удален, в противном случае `false`.

Возникает при изменении cookie, так как она была добавлена, изменена, удалена или истекла.

### Методы экземпляра

В экземпляре `Cookies` доступны следующие методы:

#### `cookies.get(filter)`

* `filter` Object
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
  * `name` String (опционально) - Фильтрует cookies по имени.
  * `domain` String (опционально) - Изменяет cookies, чьи домены совпадают или являются поддоменами `domains`.
  * `path` String (опционально) - Извлекает cookies чей путь совпадает с `path`.
  * `secure` Boolean (опционально) - Фильтрует cookies по их защищенному свойству.
  * `session` Boolean (опционально) - Отфильтровывает сеансовые или постоянные файлы cookie.

Возвращает `Promise<Cookie[]>` - промисы, которые разрешают массив Cookie объектов.

Отправляет запрос на получение всех cookies, соответствующих `filter`, и выдает promise с ответом.

#### `cookies.get(filter, callback)`

* `filter` Object
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
  * `name` String (опционально) - Фильтрует cookies по имени.
  * `domain` String (опционально) - Изменяет cookies, чьи домены совпадают или являются поддоменами `domains`.
  * `path` String (опционально) - Извлекает cookies чей путь совпадает с `path`.
  * `secure` Boolean (опционально) - Фильтрует cookies по их защищенному свойству.
  * `session` Boolean (опционально) - Отфильтровывает сеансовые или постоянные файлы cookie.
* `callback` Function
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - an array of cookie objects.

Sends a request to get all cookies matching `filter`, `callback` will be called with `callback(error, cookies)` on complete.

**[Скоро устареет](modernization/promisification.md)**

#### `cookies.set(details)`

* `details` Object
  * `url` String - The url to associate the cookie with. The promise will be rejected if the url is invalid.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` String (опционально) - домен cookie; это будет нормализовано с предыдущей точкой, чтобы он также был действителен для поддоменов. Empty by default if omitted.
  * `path` String (опционально) - путь к cookie. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Значение по умолчанию: false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. По умолчанию - false.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.

Возвращает `Promise<void>` - Promise, которое разрешается после установки файла cookie

Устанавливает cookie с `details`.

#### `cookies.set(details, callback)`

* `details` Object
  * `url` String - The url to associate the cookie with.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` String (опиционально) - домен cookie. Empty by default if omitted.
  * `path` String (опционально) - путь к cookie. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Значение по умолчанию: false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. По умолчанию - false.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.
* `callback` Function
  * `error` Error

Устанавливает cookie с соответствующим `details`. По завершению вызывается `callback(error)`.

**[Скоро устареет](modernization/promisification.md)**

#### `cookies.remove(url, name)`

* `url` String - URL-дарес, связанный с cookie.
* `name` String - Название cookie для удаления.

Возвращает `Promise<void>` - Promise, которое разрешается после удаления файла cookie

Удаляет cookies, соответствующие `url` и `name`

#### `cookies.remove(url, name, callback)`

* `url` String - URL-дарес, связанный с cookie.
* `name` String - Название cookie для удаления.
* `callback` Function

Удаляет cookies с соответствующими `url` и `name`, по завершению вызывается `callback()`.

**[Скоро устареет](modernization/promisification.md)**

#### `cookies.flushStore()`

Возвращает `Promise<void>` - Promise, которое разрешается, когда хранилище cookie было очищено

Записывает непрочитанные cookies на диск.

#### `cookies.flushStore(callback)`

* `callback` Function

Записывает непрочитанные cookies на диск.

**[Скоро устареет](modernization/promisification.md)**
