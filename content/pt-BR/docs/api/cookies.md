## Class: Cookies

> Query and modify a session's cookies.

Processo: [Main](../glossary.md#main-process)

Instâncias da classe `Cookies` são acessadas através da propriedade `cookies` de uma `Sessão`.

Como por exemplo:

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

#### `cookies.get(filter)`

* `filtrar` Object 
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all URLs.
  * `name` String (opcional) - Filtra cookies por nome.
  * `domain` String (opcional) - Recupera cookies nos quais os domínios sejam iguais ou subdomínios de `domain`.
  * `path` String (opcional) - Recupera cookies nos quais o caminho seja igual a `path`.
  * `secure` Boolean (opcional) - Filtra cookies pela propriedade Secure.
  * `session` Boolean (optional) - Filters out session or persistent cookies.

Returns `Promise<Cookie[]>` - A promise which resolves an array of cookie objects.

Sends a request to get all cookies matching `filter`, and resolves a promise with the response.

#### `cookies.set(details)`

* `detalhes` Object 
  * `url` String - The URL to associate the cookie with. The promise will be rejected if the URL is invalid.
  * `name` String (opcional) - O nome do cookie. Vazio por padrão caso omitido.
  * `value` String (opcional) - O valor do cookie. Vazio por padrão caso omitido.
  * `domain` String (opcional) - O domínio do cookie; isto será normalizado com um ponto no início para que ele também seja válido para subdomínios. Vazio por padrão se omitido.
  * `path` String (opcional) - O caminho do cookie. Vazio por padrão caso omitido.
  * `secure` Boolean (opcional) - Indica se o cookie deve ser marcado como seguro. Padrão é falso.
  * `httpOnly` Boolean (opcional) - Indica se o cookie deve ser marcado como apenas HTTP. Padrão é falso.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.

Returns `Promise<void>` - A promise which resolves when the cookie has been set

Sets a cookie with `details`.

#### `cookies.remove(url, name)`

* `url` String - A URL associada com o cookie.
* `name` String - O nome do cookie a ser removido.

Returns `Promise<void>` - A promise which resolves when the cookie has been removed

Removes the cookies matching `url` and `name`

#### `cookies.flushStore()`

Returns `Promise<void>` - A promise which resolves when the cookie store has been flushed

Escreve qualquer cookie que não tenha sido escrito no disco.