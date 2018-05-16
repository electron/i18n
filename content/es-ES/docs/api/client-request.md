## Clase: ClientRequest

> Hace solicitudes HTTP/HTTPS.

Process: [Main](../glossary.md#main-process)

`Peticiones del cliente` implementa la interfaz de [corriente de escritura](https://nodejs.org/api/stream.html#stream_writable_streams) y por lo tanto es un [emitidor de eventos](https://nodejs.org/api/events.html#events_class_eventemitter).

### `new ClientRequest(options)`

* `opciones` (Objecto | Cadena) - Si `opciones` es una cadena, es interpretada como la URL de la solicitud. Si es un objeto, se espera que especifique una olicitud HTTP por medio de las siguientes propiedades: 
  * `método` Cadena (opcional) - El método de la solicitud HTTP. por defenteto al método GET.
  * `url` Cadena (opcional) - La URL solicitada. Debe proporcionarse en la forma absoluta con el esquema de protocolo especificado como http o https.
  * `sesion` Objecto (opcional) - La instancia de [`Sesión`](session.md) en la cual está asociada la solicitud.
  * `partición` Cadena (opcional) - el nombre de la [`partición`](session.md) en la cual está asociada la solicitud. Por defecto es la cadena vacía. La opción `sesión` prevalece sobre `partición`. De esta manera si una `sesión` está explícitamente especificada, `partición` es ignorada.
  * `protocolo` Cadena (opcional) -El esquema de protocolo en la forma "esquema": Valores soportados actualmente son 'http:' o 'https:'. Por defecto es 'http:'.
  * `host` String (optional) - The server host provided as a concatenation of the hostname and the port number 'hostname:port'.
  * `nombre de anfitrión` Cadena (opcional) - el nombre del servidor central.
  * `Puerto` Entero (opcional) - el número de puerto listado en el servidor.
  * `ruta` Cadena (opcional) - La parte de la ruta de la solicitud URL.
  * `Redirigir` cadena (opcional) - El modo de redirección de esta solicitud. Debe ser `seguir`, `error` o `manual`. Por defecto es `seguir`. Cuando el modo es `error`, cualquier redirección será abortada. When mode is `manual` the redirection will be deferred until [`request.followRedirect`](#requestfollowredirect) is invoked. Listado por el evento [`redirigir`](#event-redirect) en este modo para obtener más detalles sobre las solicitudes de redirección.

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

* `authInfo` Objeto 
  * `isProxy` Boolean
  * `scheme` String
  * `anfitrión` Cadena
  * `puerto` Íntegro
  * `realm` Cadena
* `callback` Function 
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

Emitido cuando la `solicitud` es abortada. El evento `abortar` no será disparado si la `solicitud` ya está cerrada.

#### Evento: 'error'

Devuelve:

* `error` Error - un objeto error proporciona cierta información sobre la falla.

Emitido cuando el módulo `net` falla en emitir una solicitud de red. Típicamente cuando el objeto `solicitud` emite un evento `error`, un evento `cerrar` lo seguirá subsecuentemente y ningún objeto respuesta será proporcionado.

#### Evento: 'close'

Emitido cuando el último evento en la transacción solicitud-respuesta HTTP. El evento `cerrar` indica que ningún otro evento será emitido en los objetos `solicitud` o `respuesta`.

#### Evento: "redirigir"

Devuelve:

* `Estatus de código` entero
* `method` String
* `Redirigir Url` Cadena
* `headers de respuesta` objeto

Emitted when there is redirection and the mode is `manual`. Calling [`request.followRedirect`](#requestfollowredirect) will continue with the redirection.

### Propiedades de la instancia

#### `request.chunkedEncoding`

Un `Booleano` especificando cuando la solicitud usará el la codificación de transferencia del paquete HTTP o no. Por defecto es false. La propiedad es de lectura y escritura, sin embargo puede ser configurada antes de la primera operación de escritura debido a que el encabezado HTTP no se ha puesto en el hilo. Tratar de configurar la propiedad `codificación empaquetada` después de la primera escritura arrojará un error.

Utilizar codificación empaquetada es fuertemente recomendado si no necesita enviar una solicitud grande dado que lo datos serán transmitidos en paquetes pequeños en lugar de ser cargados internamente en la memoria de proceso de Electron.

### Métodos de Instancia

#### `request.setHeader(name, value)`

* `nombre` Cadena - Un nombre de encabezado HTTP extra.
* `valor` Objecto - Un valor de encabezado HTTP extra.

Añade otro encabezado HTTP. El nombre del encabezado será publicado como es sin minúsculas. Será llamado solo antes de la primera escritura. Llamar a este método despues de la primera escritura arrojará un error. Si el valor pasado no es una `Cadena`, llamará a su método `toString()` para obtener el valor final.

#### `request.getHeader(name)`

* `nombre` Cadena - Especifica el nombre del encabezado extra.

Devuelve `objeto` - el valor de un nombre de encabezado extra configurado anteriormente.

#### `request.removeHeader(name)`

* `nombre` Cadena - Especifica el nombre del encabezado extra.

Remueve un nombre extra de encabezado configurado anteriormente. Este método puede ser llamado solo antes de escribir. Tratar de llamarlo después de la primera escritura arrojará un error.

#### `request.write(chunk[, encoding][, callback])`

* `paquete` (Cadena | Almacenamiento temporal) - Un paquete del cuerpo de información de la solicitud. Si es una cadena, se convierte a en un almacenador interno usando codificación especial.
* `Codificación` Cadena (opcional) - Usado para convertir paquetes de cadenas en objetos de almacenamiento. Por defecto es 'utf-8'.
* `retrollamada` función (opcional) - Llamado cuando se haya realizado la operación de escritura.

La `retrollamada` es esencialmente una función sencilla introducida con el propósito de mantener similitudes con el API Node.js. Es llamada asincrónicamente en el siguiente tick después de que el contenido del `paquete` haya sido entregado a la capa de red de Chromium. A diferencia de la implementación de Node.js, no está garantizado que el contenido del `paquete` haya sido entregado en el hilo antes de que sea llamada `retrollamada`.

Agrega un paquete de datos al cuerpo de la solicitud. La primera operación de escritura pudiese causar que el encabezado de la solicitud sea cambiado en el hilo. Después de la primera operación de escritura, no está permitido el añadir o remover un encabezado personalizado.

#### `request.end([chunk][, encoding][, callback])`

* `paquete` (Cadena | Almacenamiento) (opcional)
* `codificación` Cadena (opcional)
* `retrocallback` Funcion (opcional)

Envía el último paquete de datos solicitado. Subsecuentemente escribir o terminar operaciones no estará permitido. El evento `final` es emitido justo después de que termina la operación.

#### `request.abort()`

Cancela una transacción HTTP en proceso. Si la solicitud ya emitió el evento de `cerrar`, la operación abortar no tendrá ningún efecto. De otra manera un evento en proceso emitirá los eventos `abortar` y `cerrar`. Adicionalmente, si hay algún objeto de respuesta activo, será emitido el evento `abortado`.

#### `request.followRedirect()`

Sigue cualquier solicitud de redirección diferida cuando el modo de redirección es `manual`.