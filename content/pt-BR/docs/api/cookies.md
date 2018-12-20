## Class: Cookies

> Query and modify a session's cookies.

Processo: [Main](../glossary.md#main-process)

Instâncias da classe `Cookies` são acessadas através da propriedade `cookies` de uma `Sessão`.

Como por exemplo:

```javascript
const { session } = require('electron')

// Query all cookies.
session.defaultSession.cookies.get({}, (error, cookies) => {
  console.log(error, cookies)
})

// Query all cookies associated with a specific url.
session.defaultSession.cookies.get({ url: 'http://www.github.com' }, (error, cookies) => {
  console.log(error, cookies)
})

// Set a cookie with the given cookie data;
// may overwrite equivalent cookies if they exist.
const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
session.defaultSession.cookies.set(cookie, (error) => {
  if (error) console.error(error)
})
```

### Eventos de instância

Os seguintes eventos estão disponíveis em instâncias de `Cookies`:

#### Evento: 'changed'

* `event` Event
* `cookie` [Cookie](structures/cookie.md) - O cookie que foi modificado.
* `cause` String - A causa da mudança com um dos seguintes valores: 
  * `explicit` - O cookie foi modificado diretamente por uma ação do consumidor.
  * `overwrite` - O cookie foi removido automaticamente devido à uma ação de inserção que o sobrescreveu.
  * `expired` - O cookie foi automaticamente removido conforme expirou.
  * `evicted` - The cookie was automatically evicted during garbage collection.
  * `expired-overwrite` - The cookie was overwritten with an already-expired expiration date.
* `removed` Boolean - `true` se o cookie foi removido, `false` caso contrário.

Emitido quando um cookie é modificado devido à adição, edição, remoção ou expiração.

### Métodos de Instância

Os metódos a seguir estão disponíveis em instâncias `de Cookies`:

#### `cookies.get(filter, callback)`

* `filter` Object 
  * `url` String (opcional) - Recupera cookies associados com a `url`. Sendo vazia recupera cookies de todas as urls.
  * `name` String (opcional) - Filtra cookies por nome.
  * `domain` String (opcional) - Recupera cookies nos quais os domínios sejam iguais ou subdomínios de `domain`.
  * `path` String (opcional) - Recupera cookies nos quais o caminho seja igual a `path`.
  * `secure` Boolean (opcional) - Filtra cookies pela propriedade Secure.
  * `session` Boolean (optional) - Filters out session or persistent cookies.
* `callback` Function 
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - Um array de objetos cookie.

Sends a request to get all cookies matching `filter`, `callback` will be called with `callback(error, cookies)` on complete.

#### `cookies.set(details, callback)`

* `detalhes` Object 
  * `url` String - A url que será associada ao cookie.
  * `name` String (opcional) - O nome do cookie. Vazio por padrão caso omitido.
  * `value` String (opcional) - O valor do cookie. Vazio por padrão caso omitido.
  * `domain` String (opcional) - O domínio do cookie. Vazio por padrão caso omitido.
  * `path` String (opcional) - O caminho do cookie. Vazio por padrão caso omitido.
  * `secure` Boolean (opcional) - Indica se o cookie deve ser marcado como seguro. Padrão é falso.
  * `httpOnly` Boolean (opcional) - Indica se o cookie deve ser marcado como apenas HTTP. Padrão é falso.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.
* `callback` Function 
  * `error` Error

Sets a cookie with `details`, `callback` will be called with `callback(error)` on complete.

#### `cookies.remove(url, name, callback)`

* `url` String - A URL associada com o cookie.
* `name` String - O nome do cookie a ser removido.
* `callback` Function

Removes the cookies matching `url` and `name`, `callback` will called with `callback()` on complete.

#### `cookies.flushStore(callback)`

* `callback` Function

Escreve qualquer cookie que não tenha sido escrito no disco.