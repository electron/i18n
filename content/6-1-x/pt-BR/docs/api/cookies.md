## Class: Cookies

> Query and modify a session's cookies.

Processo: [Main](../glossary.md#main-process)

Instâncias da classe `Cookies` são acessadas através da propriedade `cookies` de uma `Sessão`.

Por exemplo:

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

### Eventos de instância

Os seguintes eventos estão disponíveis em instâncias de `Cookies`:

#### Evento: 'changed'

* `event` Event
* `cookie` [Cookie](structures/cookie.md) - O cookie que foi modificado.
* `cause` String - The cause of the change with one of the following values:
  * `explicit` - O cookie foi modificado diretamente por uma ação do consumidor.
  * `overwrite` - O cookie foi removido automaticamente devido à uma ação de inserção que o sobrescreveu.
  * `expired` - O cookie foi automaticamente removido conforme expirou.
  * `evicted` - The cookie was automatically evicted during garbage collection.
  * `expired-overwrite` - The cookie was overwritten with an already-expired expiration date.
* `removed` Boolean - `true` se o cookie foi removido, `false` caso contrário.

Emitido quando um cookie é modificado devido à adição, edição, remoção ou expiração.

### Métodos de Instância

Os metódos a seguir estão disponíveis em instâncias `de Cookies`:

#### `cookies.get(filter)`

* `filter` Object
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
  * `name` String (opcional) - Filtra cookies por nome.
  * `domain` String (opcional) - Recupera cookies nos quais os domínios sejam iguais ou subdomínios de `domain`.
  * `path` String (opcional) - Recupera cookies nos quais o caminho seja igual a `path`.
  * `secure` Boolean (opcional) - Filtra cookies pela propriedade Secure.
  * `session` Boolean (optional) - Filters out session or persistent cookies.

Returns `Promise<Cookie[]>` - A promise which resolves an array of cookie objects.

Sends a request to get all cookies matching `filter`, and resolves a promise with the response.

#### `cookies.get(filter, callback)`

* `filter` Object
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
  * `name` String (opcional) - Filtra cookies por nome.
  * `domain` String (opcional) - Recupera cookies nos quais os domínios sejam iguais ou subdomínios de `domain`.
  * `path` String (opcional) - Recupera cookies nos quais o caminho seja igual a `path`.
  * `secure` Boolean (opcional) - Filtra cookies pela propriedade Secure.
  * `session` Boolean (optional) - Filters out session or persistent cookies.
* `callback` Function
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - Um array de objetos cookie.

Sends a request to get all cookies matching `filter`, `callback` will be called with `callback(error, cookies)` on complete.

**[Deprecated Soon](modernization/promisification.md)**

#### `cookies.set(details)`

* `details` Object
  * `url` String - A url que será associada ao cookie. The promise will be rejected if the url is invalid.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` String (opcional) - O domínio do cookie; isto será normalizado com um ponto no início para que ele também seja válido para subdomínios. Empty by default if omitted.
  * `path` String (opcional) - O Diretório do cookie. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Padrão sendo false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Defaults to false.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.

Returns `Promise<void>` - A promise which resolves when the cookie has been set

Sets a cookie with `details`.

#### `cookies.set(details, callback)`

* `details` Object
  * `url` String - A url que será associada ao cookie.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` String (optional) - O domínio do cookie. Empty by default if omitted.
  * `path` String (opcional) - O Diretório do cookie. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Padrão sendo false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Defaults to false.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.
* `callback` Function
  * `error` Error

Sets a cookie with `details`, `callback` will be called with `callback(error)` on complete.

**[Deprecated Soon](modernization/promisification.md)**

#### `cookies.remove(url, name)`

* `url` String - A URL associada com o cookie.
* `name` String - O nome do cookie a ser removido.

Returns `Promise<void>` - A promise which resolves when the cookie has been removed

Removes the cookies matching `url` and `name`

#### `cookies.remove(url, name, callback)`

* `url` String - A URL associada com o cookie.
* `name` String - O nome do cookie a ser removido.
* `callback` Function

Removes the cookies matching `url` and `name`, `callback` will called with `callback()` on complete.

**[Deprecated Soon](modernization/promisification.md)**

#### `cookies.flushStore()`

Returns `Promise<void>` - A promise which resolves when the cookie store has been flushed

Escreve qualquer cookie que não tenha sido escrito no disco.

#### `cookies.flushStore(callback)`

* `callback` Function

Escreve qualquer cookie que não tenha sido escrito no disco.

**[Deprecated Soon](modernization/promisification.md)**
