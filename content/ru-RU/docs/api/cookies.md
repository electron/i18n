## Class: Cookies

> Запрашивайте и изменяйте cookie.

Процесс: [Основной](../glossary.md#main-process)

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

Возвращает:

* `event` Event
* `cookie` [Cookie](structures/cookie.md) - Cookie, который был изменен.
* `cause` Строка - Причина изменения с одним из следующих значений:
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

* `filter` объект
  * `url` String (по желанию) - Извлекает файлы cookie, связанные с `url`. Пустой подразумевает получение файлов cookie всех URL-адресов.
  * `name` String (опционально) - Фильтрует cookies по имени.
  * `domain` String (опционально) - Изменяет cookies, чьи домены совпадают или являются поддоменами `domains`.
  * `path` String (опционально) - Извлекает cookies чей путь совпадает с `path`.
  * `secure` Boolean (опционально) - Фильтрует cookies по их защищенному свойству.
  * `session` Boolean (опционально) - Отфильтровывает сеансовые или постоянные файлы cookie.

Возвращает `Promise<Cookie[]>` - промисы, которые разрешают массив Cookie объектов.

Отправляет запрос на получение всех cookies, соответствующих `filter`, и выдает promise с ответом.

#### `cookies.set(details)`

* `details` Object
  * `url` Строка - URL, чтобы связать печенье с. Обещание будет отклонено, если URL-адрес недействителен.
  * `name` Строка (по желанию) - Название файла cookie. Пустой по умолчанию, если опущены.
  * `value` Строка (по желанию) - Значение cookie. Пустой по умолчанию, если опущены.
  * `domain` String (опционально) - домен cookie; это будет нормализовано с предыдущей точкой, чтобы он также был действителен для поддоменов. Пустой по умолчанию, если опущены.
  * `path` String (опционально) - путь к cookie. Пустой по умолчанию, если опущены.
  * `secure` Boolean (по желанию) - Следует ли маркировано печенье как безопасное. Значение по умолчанию: false.
  * `httpOnly` Boolean (по желанию) - Следует ли маркировано печенье только как HTTP. По умолчанию - false.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.
  * `sameSite` String (по желанию) - [же](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies) , чтобы применить к этому куки.  Может быть `unspecified`, `no_restriction`, `lax` или `strict`.  По умолчанию `no_restriction`.

Возвращает `Promise<void>` - Promise, которое разрешается после установки файла cookie

Устанавливает cookie с `details`.

#### `cookies.remove(url, name)`

* `url` String - URL-дарес, связанный с cookie.
* `name` String - Название cookie для удаления.

Возвращает `Promise<void>` - Promise, которое разрешается после удаления файла cookie

Удаляет cookies, соответствующие `url` и `name`

#### `cookies.flushStore()`

Возвращает `Promise<void>` - Promise, которое разрешается, когда хранилище cookie было очищено

Записывает непрочитанные cookies на диск.
