## Clase: IncomingMessage

> Maneja las respuestas a las solicitudes HTTP/HTTPS.

Proceso: [Main](../glossary.md#main-process)

`IncomingMessage` implementa la interfaz [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) y es por lo tanto un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### Eventos de Instancia

#### Evento: "data"

Devuelve:

* `chunk` Buffer - Un fragmento de la colección de datos de respuesta.

El evento `data` es el método habitual de transferir datos de respuesta en código aplicativo.

#### Evento: "end"

Indica que la respuesta del cuerpo ha finalizado.

#### Evento: "aborted"

Aparece cuando una solicitud ha sido cancelada durante una transacción HTTP en curso.

#### Evento: "error"

Devuelve:

`error` Error - Por lo general tiene tiene una cadena de error por la falla de la identificación de la causa raíz.

Aparece cuando se detecta un error mientras se transmiten los eventos de datos de respuesta. Por ejemplo, si el servidor cierra el subyacente mientras que la respuesta todavía se está transfiriendo, un evento `data` aparecerá como objeto de respuesta y un evento `close` seguirá posteriormente al objeto de la solicitud.

### Propiedades de Instancia

Una instancia `IncomingMessage` tiene las siguientes propiedades legibles:

#### `response.statusCode`

Un `Integer` indicando el código de estatus de respuesta HTTP.

#### `response.statusMessage`

Una `String` representando el mensaje de estado HTTP.

#### `response.headers`

Un `Object` que representa las cabeceras HTTP de respuesta. El objeto `headers` es formateado de la siguiente manera:

* Todos los nombres de cabecera son puestos en minúsculas.
* Cada nombre de cabecera produce una propiedad de valores del arreglo en el objeto de las cabeceras.
* Cada valor de cabecera es puesto dentro del arreglo asociado al nombre de cabecera.

#### `response.httpVersion`

A `String` indicating the HTTP protocol version number. Typical values are '1.0' or '1.1'. Additionally `httpVersionMajor` and `httpVersionMinor` are two Integer-valued readable properties that return respectively the HTTP major and minor version numbers.

#### `response.httpVersionMajor`

An `Integer` indicating the HTTP protocol major version number.

#### `response.httpVersionMinor`

An `Integer` indicating the HTTP protocol minor version number.