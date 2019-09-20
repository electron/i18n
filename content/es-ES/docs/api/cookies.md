## Clase: Cookies

> Busca y modifica las cookies de la sesión.

Process: [Main](../glossary.md#main-process)

Las instancias de la clase `Cookies` son accedidas utilizado la propiedad `cookies` de una `Session`.

Por ejemplo:

```javascript
const { session } = require('electron')

// Busca todas las cookies.
session.defaultSession.cookies.get({})
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// Consulta todas las cookies asociadas con un url especifica.
session.defaultSession.cookies.get({ url: 'http://www.github.com' })
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// Establece un cookie con los datos de la misma.
// puede sobrescriba cookies iguales si existen.
const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
session.defaultSession.cookies.set(cookie)
  .then(() => {
    // success
  }, (error) => {
    console.error(error)
  })
```

### Eventos de Instancia

Los siguientes eventos están disponibles en las instancias de `Cookies`:

#### Evento: "changed"

* `event`
* `cookie` [Cookie](structures/cookie.md) - La cookie que se ha cambiado.
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

#### `cookies.get(filter)`

* `filter` Objecto 
  * `url` Cadena (opcional) - Recupera las cookies que estás asociadas con el `url`. Dejarlo en blanco implica recuperar las cookies de todos los Urls.
  * `name` Cadena (opcional) - Filtra las cookies por nombre.
  * `domain` Cadena (opcional) - Recupera las cookies de cuyos dominios coinciden o son subdominios de `domains`.
  * `path` Cadena (opcional) - Recupera las cookies de cuya ruta coincide con `path`.
  * `secure` Booleano (opcional) - Filtra las cookies por su propiedad Secure.
  * `session` Booleano (opcional) - Filtra las cookies fuera de la sesión o cookies persistentes.

Returns `Promise<Cookie[]>` - Una promesa que resulve un array de objetos cookies.

Envía una solicitud para obtener todas las cookies que coincidan con `filter`, y resuelve una promesa con la respuesta.

#### `cookies.get(filter, callback)`

* `filter` Objeto 
  * `url` Cadena (opcional) - Recupera las cookies que estás asociadas con el `url`. Dejarlo en blanco implica recuperar las cookies de todos los Urls.
  * `name` Cadena (opcional) - Filtra las cookies por nombre.
  * `domain` Cadena (opcional) - Recupera las cookies de cuyos dominios coinciden o son subdominios de `domains`.
  * `path` Cadena (opcional) - Recupera las cookies de cuya ruta coincide con `path`.
  * `secure` Booleano (opcional) - Filtra las cookies por su propiedad Secure.
  * `session` Booleano (opcional) - Filtra las cookies fuera de la sesión o cookies persistentes.
* `callback` Function 
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - un arreglo con objetos de cookies.

Envía una solicitud para obtener todas las cookies que coinciden con `filter`, `callback` y será llamada con `callback(error, cookies)` cuando termine.

**[Próximamente desaprobado](modernization/promisification.md)**

#### `cookies.set(details)`

* `details` Object 
  * `url` String - La url con la que asociar la cookie. La promesa será rechazada si la url no es válida.
  * `name` Cadena (opcional) - El nombre de la cookie. Por defecto estará vacío si se omite.
  * `value` Cadena (opcional) - El valor de la cookie. Por defecto estará vacío si se omite.
  * `domain` String (opcional) - El dominio de la cookie; esto se normalizara con un punto anterior para que también sean validos para subdominios. Vacío por defecto si se omite.
  * `path` Cadena (opcional) - La ruta de la cookie. Por defecto estará vacío si se omite.
  * `secure` Booleano (opcional) - Si la cookie debe ser marcada como Secure. Por defecto es false.
  * `httpOnly` Booleano (opcional) - Si la cookie debe ser marcada como HTTP solamente. Por defecto es false.
  * `expirationDate` Doble (opcional) - La fecha de vencimiento de la cookie como el número de segundos desde la época UNIX. Si se omite, entonces la cookie cambia a una cookie de sesión y no se conservará entre sesiones.

Returns `Promise<void>` - A promise which resolves when the cookie has been set

Establece una cookie con `detalles`.

#### `cookies.set(details, callback)`

* `details` Object 
  * `url` Cadena - La url para asociarla con la cookie.
  * `name` Cadena (opcional) - El nombre de la cookie. Por defecto estará vacío si se omite.
  * `value` Cadena (opcional) - El valor de la cookie. Por defecto estará vacío si se omite.
  * `domain` Cadena (opcional) - El dominio de la cookie. Por defecto estará vacío si se omite.
  * `path` Cadena (opcional) - La ruta de la cookie. Por defecto estará vacío si se omite.
  * `secure` Booleano (opcional) - Si la cookie debe ser marcada como Secure. Por defecto es false.
  * `httpOnly` Booleano (opcional) - Si la cookie debe ser marcada como HTTP solamente. Por defecto es false.
  * `expirationDate` Doble (opcional) - La fecha de vencimiento de la cookie como el número de segundos desde la época UNIX. Si se omite, entonces la cookie cambia a una cookie de sesión y no se conservará entre sesiones.
* `callback` Function 
  * `error` Error

Configura una cookie con `details`, `callback` y sera llamada con `callback(error)` cuando termine.

**[Próximamente desaprobado](modernization/promisification.md)**

#### `cookies.remove(url, name)`

* `url` Cadena - La URL asociada con la cookie.
* `name` Cadena - El nombre de la cookie que será eliminada.

Returns `Promise<void>` - A promise which resolves when the cookie has been removed

Removes the cookies matching `url` and `name`

#### `cookies.remove(url, name, callback)`

* `url` Cadena - La URL asociada con la cookie.
* `name` Cadena - El nombre de la cookie que será eliminada.
* `callback` Función

Elimina las cookies que coinciden con `url` and `name`, `callback` y serán llamadas con `callback()` cuando termine.

**[Próximamente desaprobado](modernization/promisification.md)**

#### `cookies.flushStore()`

Returns `Promise<void>` - A promise which resolves when the cookie store has been flushed

Escribe cualquier dato de cookies en el disco que no haya sido escrito.

#### `cookies.flushStore(callback)`

* `callback` Función

Escribe cualquier dato de cookies en el disco que no haya sido escrito.

**[Próximamente desaprobado](modernization/promisification.md)**