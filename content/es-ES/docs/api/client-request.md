## Clase: ClientRequest

> Hace solicitudes HTTP/HTTPS.

Proceso: [Principal](../glossary.md#main-process)

`Peticiones del cliente` implementa la interfaz de [corriente de escritura](https://nodejs.org/api/stream.html#stream_writable_streams) y por lo tanto es un [emitidor de eventos](https://nodejs.org/api/events.html#events_class_eventemitter).

### `new ClientRequest(options)`

* `options` (Objecto | Cadena) - Si `opciones` es una cadena, es interpretada como la URL de la solicitud. Si es un objeto, se espera que especifique una olicitud HTTP por medio de las siguientes propiedades: 
  * `método` Cadena (opcional) - El método de la solicitud HTTP. por defenteto al método GET.
  * `url` Cadena (opcional) - La URL solicitada. Debe proporcionarse en la forma absoluta con el esquema de protocolo especificado como http o https.
  * `sesion` Objecto (opcional) - La instancia de [`Sesión`](session.md) en la cual está asociada la solicitud.
  * `partición` Cadena (opcional) - el nombre de la [`partición`](session.md) en la cual está asociada la solicitud. Por defecto es la cadena vacía. La opción `sesión` prevalece sobre `partición`. De esta manera si una `sesión` está explícitamente especificada, `partición` es ignorada.
  * `protocolo` Cadena (opcional) -El esquema de protocolo en la forma "esquema": Valores soportados actualmente son 'http:' o 'https:'. Por defecto es 'http:'.
  * `central` Cadena (opcional) - El servidor central proporcionado como una concatenación de nombres de anfitrión y el número de puerto "nombre de anfitrión:puerto"
  * `nombre de anfitrión` Cadena (opcional) - el nombre del servidor central.
  * `Puerto` Entero (opcional) - el número de puerto listado en el servidor.
  * `ruta` Cadena (opcional) - La parte de la ruta de la solicitud URL.
  * `Redirigir` cadena (opcional) - El modo de redirección de esta solicitud. Debe ser `seguir`, `error` o `manual`. Por defecto es `seguir`. Cuando el modo es `error`, cualquier redirección será abortada. Cuando el modo es `manual` la redirección será aplaza hasta que el procedimiento [`request.followRedirect`](#requestfollowRedirect) sea llamado. Listado por el evento [`redirigir`](#event-redirect) en este modo para obtener más detalles sobre las solicitudes de redirección.

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

#### Evento: 'login'

Devuelve:

* `authInfo` Object 
  * `isProxy` Boolean
  * `esquema` Cadena
  * `anfitrión` Cadena
  * `puerto` Íntegro
  * `realm` Cadena
* `llamada de vuelta` Función 
  * `username` Cadena
  * `contraseña` Cadena

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

#### Evento: 'error'

Devuelve:

* `error` Error - an error object providing some information about the failure.

Emitted when the `net` module fails to issue a network request. Typically when the `request` object emits an `error` event, a `close` event will subsequently follow and no response object will be provided.

#### Evento: 'close'

Emitted as the last event in the HTTP request-response transaction. The `close` event indicates that no more events will be emitted on either the `request` or `response` objects.

#### Event: 'redirect'

Devuelve:

* `statusCode` Integer
* `method` Cuerda
* `redirectUrl` String
* `responseHeaders` Object

Emitted when there is redirection and the mode is `manual`. Calling [`request.followRedirect`](#requestfollowRedirect) will continue with the redirection.

### Propiedades de Instancia

#### `request.chunkedEncoding`

A `Boolean` specifying whether the request will use HTTP chunked transfer encoding or not. Defaults to false. The property is readable and writable, however it can be set only before the first write operation as the HTTP headers are not yet put on the wire. Trying to set the `chunkedEncoding` property after the first write will throw an error.

Using chunked encoding is strongly recommended if you need to send a large request body as data will be streamed in small chunks instead of being internally buffered inside Electron process memory.

### Métodos de Instancia

#### `request.setHeader(name, value)`

* `name` String - An extra HTTP header name.
* `value` Object - An extra HTTP header value.

Adds an extra HTTP header. The header name will issued as it is without lowercasing. It can be called only before first write. Calling this method after the first write will throw an error. If the passed value is not a `String`, its `toString()` method will be called to obtain the final value.

#### `request.getHeader(name)`

* `name` String - Specify an extra header name.

Returns `Object` - The value of a previously set extra header name.

#### `request.removeHeader(name)`

* `name` String - Specify an extra header name.

Removes a previously set extra header name. This method can be called only before first write. Trying to call it after the first write will throw an error.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - A chunk of the request body's data. If it is a string, it is converted into a Buffer using the specified encoding.
* `encoding` String (optional) - Used to convert string chunks into Buffer objects. Defaults to 'utf-8'.
* `callback` Function (optional) - Called after the write operation ends.

`callback` is essentially a dummy function introduced in the purpose of keeping similarity with the Node.js API. It is called asynchronously in the next tick after `chunk` content have been delivered to the Chromium networking layer. Contrary to the Node.js implementation, it is not guaranteed that `chunk` content have been flushed on the wire before `callback` is called.

Adds a chunk of data to the request body. The first write operation may cause the request headers to be issued on the wire. After the first write operation, it is not allowed to add or remove a custom header.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (optional)
* `encoding` String (optional)
* `callback` Function (optional)

Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish` event is emitted just after the end operation.

#### `request.abort()`

Cancels an ongoing HTTP transaction. If the request has already emitted the `close` event, the abort operation will have no effect. Otherwise an ongoing event will emit `abort` and `close` events. Additionally, if there is an ongoing response object,it will emit the `aborted` event.

#### `request.followRedirect()`

Continues any deferred redirection request when the redirection mode is `manual`.