## Clase: IncomingMessage

> Maneja las respuestas a las solicitudes HTTP/HTTPS.

Proceso: [Main](../glossary.md#main-process)

`IncomingMessage` implementa la interfaz [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) y es por lo tanto un [EventEmitter][event-emitter].

### Eventos de Instancia

#### Evento: "data"

Devuelve:

* `chunk` Buffer - Un fragmento de la colección de datos de respuesta.

El evento `data` es el método habitual de transferir datos de respuesta en código aplicativo.

#### Evento: "end"

Indica que la respuesta del cuerpo ha finalizado. Debe colocarse antes del evento ' Data '.

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

Un `Record<string, string | string[]>` que representa las cabeceras de la respuesta HTTP. El objeto `headers` tiene el siguiente formato:

* Todos los nombres de los encabezados son puestos en minúsculas.
* Duplicados de `age`, `authorization`, `content-length`, `content-type`, `etag`, `expires`, `from`, `host`, `if-modified-since`, `if-unmodified-since`, `last-modified`, `location`, `max-forwards`, `proxy-authorization`, `referer`, `retry-after`, `server`, o `user-agent` son descartados.
* `set-cookie` siempre es un array. Los duplicados son agregados al array.
* Para los encabezados `cookie` duplicados, los valores se unen con '; '.
* Para todos los otros encabezados, los valores se unen con ', '.

#### `response.httpVersion`

Una `String` que indica el número de versión de protocolo HTTP. Los valores típicos son "1.0" o "1.1". Adicionalmente `httpVersionMajor` y `httpVersionMinor` son dos propiedades legibles de valores enteros que devuelven los números de la versión principal y secundaria de HTTP respectivamente.

#### `response.httpVersionMajor`

Un `Integer` que indica el número de la versión principal del protocolo HTTP.

#### `response.httpVersionMinor`

Un `Integer` que indica el número de la versión secundaria del protocolo HTTP.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
