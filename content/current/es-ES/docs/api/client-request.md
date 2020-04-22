## Clase: ClientRequest

> Hace solicitudes HTTP/HTTPS.

Proceso: [Main](../glossary.md#main-process)

`Peticiones del cliente` implementa la interfaz de [corriente de escritura](https://nodejs.org/api/stream.html#stream_writable_streams) y por lo tanto es un [emitidor de eventos](https://nodejs.org/api/events.html#events_class_eventemitter).

### `new ClientRequest(options)`

* `options` (Object | String) - If `options` is a String, it is interpreted as the request URL. If it is an object, it is expected to fully specify an HTTP request via the following properties:
  * `method` String (optional) - The HTTP request method. Defaults to the GET method.
  * `url` String (optional) - The request URL. Must be provided in the absolute form with the protocol scheme specified as http or https.
  * `session` Session (optional) - The [`Session`](session.md) instance with which the request is associated.
  * `partición` Cadena (opcional) - el nombre de la [`partición`](session.md) en la cual está asociada la solicitud. Por defecto es la cadena vacía. La opción `sesión` prevalece sobre `partición`. De esta manera si una `sesión` está explícitamente especificada, `partición` es ignorada.
  * `useSessionCookies` Boolean (optional) - Whether to send cookies with this request from the provided session.  This will make the `net` request's cookie behavior match a `fetch` request. Por defecto es `false`.
  * `protocol` String (optional) - The protocol scheme in the form 'scheme:'. Currently supported values are 'http:' or 'https:'. Defaults to 'http:'.
  * `host` Cadena (opcional) - El servidor central proporcionado como una concatenación de nombres de anfitrión y el número de puerto "nombre del host:puerto".
  * `nombre de anfitrión` Cadena (opcional) - el nombre del servidor central.
  * `Puerto` Entero (opcional) - el número de puerto listado en el servidor.
  * `ruta` Cadena (opcional) - La parte de la ruta de la solicitud URL.
  * `Redirigir` cadena (opcional) - El modo de redirección de esta solicitud. Debe ser `seguir`, `error` o `manual`. Por defecto es `seguir`. Cuando el modo es `error`, cualquier redirección será abortada. When mode is `manual` the redirection will be cancelled unless [`request.followRedirect`](#requestfollowredirect) is invoked synchronously during the [`redirect`](#event-redirect) event.

`opcions` propiedades como `protocolo`, `central`, `nombre de anfitrión`, `puerto` y `ruta` siguen estrictamente al modo Node.js como es descrito en el módulo [URL](https://nodejs.org/api/url.html).

Por ejemplo, podemos haber creado la misma solicitud a 'github.com' como sigue:

```JavaScript
const request = net.request({
  method: 'GET',
  protocol: 'https:',
  hostname: 'github.com',
  port: 443,
  path: '/'
})
```

### Eventos de Instancia

#### Evento: 'response'

Devuelve:

* `respuesta` IncomingMessage - Un objeto representando el mensaje de respuesta de HTTP.

#### Evento:'login'

Devuelve:

* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `anfitrión` Cadena
  * `puerto` Íntegro
  * `realm` Cadena
* `callback` Función
  * `username` String (opcional)
  * `password` String (opcional)

Emitido cuando un proxy de autenticación requiere las credenciales del usuario.

Se espera que la función `retrollamada` sea llamada de vuelta con las credenciales del usuario:

* `username` Cadena
* `contraseña` Cadena

```JavaScript
request.on('login', (authInfo, callback) => {
  callback('username', 'password')
})
```
Proporcional credenciales vacías cancelará la solicitud y reportará un error de autenticación en el objeto de respuesta:

```JavaScript
request.on('response', (response) => {
  console.log(`STATUS: ${response.statusCode}`);
  response.on('error', (error) => {
    console.log(`ERROR: ${JSON.stringify(error)}`)
  })
})
request.on('login', (authInfo, callback) => {
  callback()
})
```

#### Evento: "terminado"

Emitido justo antes de que el último paquete de los datos de la `solicitud` haya sido escrito en el objeto `solicitud`.

#### Evento: "abortar"

Emitted when the `request` is aborted. The `abort` event will not be fired if the `request` is already closed.

#### Evento: "error"

Devuelve:

* `error` Error - un objeto error proporciona cierta información sobre la falla.

Emitido cuando el módulo `net` falla en emitir una solicitud de red. Típicamente cuando el objeto `solicitud` emite un evento `error`, un evento `cerrar` lo seguirá subsecuentemente y ningún objeto respuesta será proporcionado.

#### Evento: "close"

Emitido cuando el último evento en la transacción solicitud-respuesta HTTP. El evento `cerrar` indica que ningún otro evento será emitido en los objetos `solicitud` o `respuesta`.


#### Evento: "redirigir"

Devuelve:

* `Estatus de código` entero
* `method` String
* `Redirigir Url` Cadena
* `responseHeaders` Record<String, String[]>

Emitted when the server returns a redirect response (e.g. 301 Moved Permanently). Calling [`request.followRedirect`](#requestfollowredirect) will continue with the redirection.  If this event is handled, [`request.followRedirect`](#requestfollowredirect) must be called **synchronously**, otherwise the request will be cancelled.

### Propiedades de Instancia

#### `request.chunkedEncoding`

Un `Booleano` especificando cuando la solicitud usará el la codificación de transferencia del paquete HTTP o no. Por defecto es false. La propiedad es de lectura y escritura, sin embargo puede ser configurada antes de la primera operación de escritura debido a que el encabezado HTTP no se ha puesto en el hilo. Tratar de configurar la propiedad `codificación empaquetada` después de la primera escritura arrojará un error.

Utilizar codificación empaquetada es fuertemente recomendado si no necesita enviar una solicitud grande dado que lo datos serán transmitidos en paquetes pequeños en lugar de ser cargados internamente en la memoria de proceso de Electron.

### Métodos de Instancia

#### `request.setHeader(name, value)`

* `nombre` Cadena - Un nombre de encabezado HTTP extra.
* `value` String - An extra HTTP header value.

Añade otro encabezado HTTP. The header name will be issued as-is without lowercasing. Será llamado solo antes de la primera escritura. Llamar a este método despues de la primera escritura arrojará un error. Si el valor pasado no es una `Cadena`, llamará a su método `toString()` para obtener el valor final.

#### `request.getHeader(name)`

* `nombre` Cadena - Especifica el nombre del encabezado extra.

Returns `String` - The value of a previously set extra header name.

#### `request.removeHeader(name)`

* `nombre` Cadena - Especifica el nombre del encabezado extra.

Removes a previously set extra header name. This method can be called only before first write. Trying to call it after the first write will throw an error.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - A chunk of the request body's data. If it is a string, it is converted into a Buffer using the specified encoding.
* `encoding` String (optional) - Used to convert string chunks into Buffer objects. Defaults to 'utf-8'.
* `retrollamada` función (opcional) - Llamado cuando se haya realizado la operación de escritura.

La `retrollamada` es esencialmente una función sencilla introducida con el propósito de mantener similitudes con el API Node.js. Es llamada asincrónicamente en el siguiente tick después de que el contenido del `paquete` haya sido entregado a la capa de red de Chromium. A diferencia de la implementación de Node.js, no está garantizado que el contenido del `paquete` haya sido entregado en el hilo antes de que sea llamada `retrollamada`.

Agrega un paquete de datos al cuerpo de la solicitud. La primera operación de escritura pudiese causar que el encabezado de la solicitud sea cambiado en el hilo. Después de la primera operación de escritura, no está permitido el añadir o remover un encabezado personalizado.

#### `request.end([chunk][, encoding][, callback])`

* `paquete` (Cadena | Almacenamiento) (opcional)
* `codificación` Cadena (opcional)
* `retrocallback` Funcion (opcional)

Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish` event is emitted just after the end operation.

#### `request.abort()`

Cancela una transacción HTTP en proceso. Si la solicitud ya emitió el evento de `cerrar`, la operación abortar no tendrá ningún efecto. De otra manera un evento en proceso emitirá los eventos `abortar` y `cerrar`. Adicionalmente, si hay algún objeto de respuesta activo, será emitido el evento `abortado`.

#### `request.followRedirect()`

Continues any pending redirection. Can only be called during a `'redirect'` event.

#### `request.getUploadProgress()`

Devuelve `Objecto`:

* `active` Boolean - Whether the request is currently active. If this is false no other properties will be set
* `started` Boolean - Whether the upload has started. If this is false both `current` and `total` will be set to 0.
* `current` Integer - El número de bytes que se han subido hasta ahora
* `total` Integer - El número de bytes que ha subido esta solicitud

Puedes usar este método en conjunto con solicitudes `POST` para obtener el progreso de la carga de un archivo u otro dato de transferencia.
