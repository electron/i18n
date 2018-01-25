## Clase: Cookies

> Busca y modifica las cookies de la sesión.

Proceso: [Principal](../glossary.md#main-process)

Las instancias de la clase `Cookies` son accedidas utilizado la propiedad `cookies` de una `Session`.

Por ejemplo:

```javascript
const {session} = require('electron')

// Busca todas las cookies.
session.defaultSession.cookies.get({}, (error, cookies) => {
  console.log(error, cookies)
})

// Busca todas las cookies asociadas con un url específico.
session.defaultSession.cookies.get({url: 'http://www.github.com'}, (error, cookies) => {
  console.log(error, cookies)
})

// Establece una cookie con la información de cookie ofrecida;
// puede sobreescribir cookies equivalentes si existen.
const cookie = {url: 'http://www.github.com', name: 'dummy_name', value: 'dummy'}
session.defaultSession.cookies.set(cookie, (error) => {
  if (error) console.error(error)
})
```

### Eventos de Instancia

Los siguientes eventos están disponibles en las instancias de `Cookies`:

#### Evento: "changed"

* `evento` Evento
* `cookie` [Cookie](structures/cookie.md) - La cookie que se ha cambiado
* `cause` Cadena - La causa del cambio con uno de los siguientes valores: 
  * `explicit` - The cookie was changed directly by a consumer's action.
  * `overwrite` - The cookie was automatically removed due to an insert operation that overwrote it.
  * `expired` - The cookie was automatically removed as it expired.
  * `evicted` - The cookie was automatically evicted during garbage collection.
  * `expired-overwrite` - The cookie was overwritten with an already-expired expiration date.
* `removed` Boolean - `true` if the cookie was removed, `false` otherwise.

Emitted when a cookie is changed because it was added, edited, removed, or expired.

### Métodos de Instancia

The following methods are available on instances of `Cookies`:

#### `cookies.get(filter, callback)`

* `filter` Object 
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
  * `name` String (optional) - Filters cookies by name.
  * `domain` String (optional) - Retrieves cookies whose domains match or are subdomains of `domains`
  * `path` String (optional) - Retrieves cookies whose path matches `path`.
  * `secure` Boolean (optional) - Filters cookies by their Secure property.
  * `session` Boolean (optional) - Filters out session or persistent cookies.
* `llamada de vuelta` Función 
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - an array of cookie objects.

Sends a request to get all cookies matching `details`, `callback` will be called with `callback(error, cookies)` on complete.

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
* `llamada de vuelta` Función 
  * `error` Error

Sets a cookie with `details`, `callback` will be called with `callback(error)` on complete.

#### `cookies.remove(url, name, callback)`

* `url` String - The URL associated with the cookie.
* `name` String - The name of cookie to remove.
* `callback` Función

Removes the cookies matching `url` and `name`, `callback` will called with `callback()` on complete.

#### `cookies.flushStore(callback)`

* `callback` Función

Writes any unwritten cookies data to disk.