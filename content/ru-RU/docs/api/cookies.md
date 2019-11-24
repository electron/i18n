## Class: Cookies

> Запрашивайте и изменяйте cookie.

Process: [Main](../glossary.md#main-process)

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
* `cause` String - Причина изменения с одним из следующих значений: 
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
  * `url` String (опционально) - Извлекает cookies, которые связаны с `url`. Пустой подразумевает получение cookies всех URL.
  * `name` String (опционально) - Фильтрует cookies по имени.
  * `domain` String (опционально) - Изменяет cookies, чьи домены совпадают или являются поддоменами `domains`.
  * `path` String (опционально) - Извлекает cookies чей путь совпадает с `path`.
  * `secure` Boolean (опционально) - Фильтрует cookies по их защищенному свойству.
  * `session` Boolean (опционально) - Отфильтровывает сеансовые или постоянные файлы cookie.

Возвращает `Promise<Cookie[]>` - промисы, которые разрешают массив Cookie объектов.

Отправляет запрос на получение всех cookies, соответствующих `filter`, и выдает promise с ответом.

#### `cookies.set(details)`

* `details` Object 
  * `url` String - URL для привязки к cookie. Promise будет отклонён, если URL недействителен.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains. Empty by default if omitted.
  * `path` String (optional) - The path of the cookie. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Defaults to false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Defaults to false.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.

Returns `Promise<void>` - A promise which resolves when the cookie has been set

Sets a cookie with `details`.

#### `cookies.remove(url, name)`

* `url` String - URL-дарес, связанный с cookie.
* `name` String - Название cookie для удаления.

Returns `Promise<void>` - A promise which resolves when the cookie has been removed

Removes the cookies matching `url` and `name`

#### `cookies.flushStore()`

Returns `Promise<void>` - A promise which resolves when the cookie store has been flushed

Записывает непрочитанные cookies на диск.