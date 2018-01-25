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
  * `explicit` - La cookie se cambió directamente por la acción de un consumidor.
  * `overwrite` - La cookie se eliminó automáticamente debido a una operación insertada que la sobreescribió.
  * `expired` - La cookie se eliminó automáticamente debido a que expiró.
  * `evicted` - La cookie fue desecha automáticamente durante la recolección de desechos.
  * `expired-overwrite` - La cookie fue sobreescrita con una fecha de vencimiento ya expirada.
* `removed` Booleano - `true` si la cookie se eliminó, `false` si no lo hizo.

Aparece cuando se cambia una cookie porque fue añadida, editada, eliminada o expirada.

### Métodos de Instancia

Los siguientes métodos están disponibles en las instancias de `Cookies`:

#### `cookies.get(filter, callback)`

* `filter` Objeto 
  * `url` Cadena (opcional) - Recupera las cookies que estás asociadas con el `url`. Dejarlo en blanco implica recuperar las cookies de todos los Urls.
  * `name` Cadena (opcional) - Filtra las cookies por nombre.
  * `domain` Cadena (opcional) - Recupera las cookies de cuyos dominios coinciden o son subdominios de `domains`
  * `path` Cadena (opcional) - Recupera las cookies de cuya ruta coincide con `path`.
  * `secure` Booleano (opcional) - Filtra las cookies por su propiedad Secure.
  * `session` Booleano (opcional) - Filtra las cookies fuera de la sesión o cookies persistentes.
* `callback` Función 
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - un arreglo con objetos de cookies.

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