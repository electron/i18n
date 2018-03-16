# protocol

> Registra un protocolo personalizado e intercepta solicitudes de protocolos existente.

Process: [Main](../glossary.md#main-process)

Un ejemplo de la implementación de un protocolo que tiene el mismo efecto que el protocolo `file://`:

```javascript
const {app, protocol} = require('electron')
const path = require('path')

app.on('ready', () => {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({path: path.normalize(`${__dirname}/${url}`)})
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })
})
```

**Nota:** Todos los métodos salvo los especificados pueden ser usados solo después de que el evento `listo` del módulo de la `aplicación` sea emitido.

## Métodos

El módulo `protocolo` tiene los siguientes métodos:

### `protocol.registerStandardSchemes(schemes[, options])`

* `esquemas` Cadenas[] - Esquema personalizado a ser registrado como un esquema estándar.
* `opciones` Objecto (opcional) 
  * `seguro` Booleano (opcional) - `verdad` al registrar un esquema como seguro. Por defecto es `falso`.

Un esquema estandar se adhiere a lo que el RFC3986 llama [Sintaxis URI genérica](https://tools.ietf.org/html/rfc3986#section-3). Por ejemplo `http` y `https` son esquemas estándar, mientras `archivo` no lo es.

Registrar un esquema como estandar, permitirá a recursos relativos y absolutos ser resueltos correctamente cuando son servidos. De otra manera el esquema se comportaría como el protocolo `archivo`, pero sin la habilidad de resolver URLs relativas.

Por ejemplo cuando usted carga la siguiente carga con un protocolo personalizado sin registrar como un esquema estándar, esta imagen no será cargada debido a que un esquema que no es estandar puede no reconocer URLs relativas:

```html
<body>
  <img src='test.png'>
</body>
```

Registrando un esquema como estándar permitirá el acceso a archivos mediante la [Api de archivos de sistema](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). De otra manera el renderizador arrojará un error de seguridad en el sistema.

Por defecto el almacenamiento web de apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) está deshabilitado para esquemas no estándar. Así que en general si quiere registrar un protocolo personalizado para reemplazar el protocolo el `http`, tiene que registrarlo como un esquema estándar:

```javascript
const {app, protocol} = require('electron')

protocol.registerStandardSchemes(['atom'])
app.on('ready', () => {
  protocol.registerHttpProtocol('atom', '...')
})
```

**Nota:** Este método puede ser usado antes del evento `Listo` del módulo `app` sea emitido.

### `protocol.registerServiceWorkerSchemes(schemes)`

* `esquemas` Cadena[] - Esquema personalizado a ser registrado para facilitar servicios.

### `protocol.registerFileProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Objeto 
    * `url` Cadena
    * `referencia` String
    * `method` Cuerda
    * `subir información` [Subir Información[]](structures/upload-data.md)
  * `callback` Función 
    * `filePath` Cadena (opcional)
* `completion` Función (opcional) 
  * `error` Error

Registra un protocolo de `esquema` que enviará el archivo como respuesta. El `controlador` será llamado con `handler(request, callback)` cuando una `solicitud` será creada con el `esquema`. `terminación` será llamado con `terminación(nulo)` cuando el `esquema` está registrado exitósamente o `terminación(error)` cuando haya fallado.

Para controlar la `solicitud`, la `retrollamada` debe ser llamada con la ruta al archivo o un objeto que tiene una propiedad `ruta`, ejemplo `callback(filePath)` o `callback({path: filePath})`.

Cuando la `retrollamada` es llamada sin argumento, un número, o un objeto que tiene una propiedad `error`, la `solicitud` fallará con el número de `error` que usted haya especificado. Para números de errores que puede usar, por favor vea la [lista de errores de red](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

Por defecto el `esquema` es tratado como `http:`, que es analizado diferente que los protocolos que siguen la "sintaxis URI genérica" como `file:`,, así que probablemente quiera llamara `protocol.registerStandardSchemes` para que su esquema sea tratado como un esquema estándar.

### `protocol.registerBufferProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Objeto 
    * `url` Cadena
    * `referrer` Cadena
    * `method` Cuerda
    * `subir información` [Subir Información[]](structures/upload-data.md)
  * `callback` Función 
    * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (opcional)
* `completion` Función (opcional) 
  * `error` Error

Registra un protocolo de `esquema` que enviará un `Buffer` como respuesta.

El uso es el mismo que con `registerFileProtocol`, excepto que la `retrollamada` debe ser llamada bien con un objeto `Buffer` o con un objeto que tenga las propiedades `data`, `mimeType`, y `charset`.

Ejemplo:

```javascript
const {protocol} = require('electron')

protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>')})
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.registerStringProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Object 
    * `url` String
    * `referrer` Cadena
    * `method` Cuerda
    * `subir información` [Subir Información[]](structures/upload-data.md)
  * `callback` Función 
    * `data` String (optional)
* `completion` Función (opcional) 
  * `error` Error

Registra un protocolo de `esquema` que enviará una `cadena` como respuesta.

El uso es el mismo que con `registerFileProtocol`, excepto que la `retrollamada` debe ser llamada bien sea con una `cadena` o un objeto que tienen las propiedades`data`, `mimeType`, and `charset`.

### `protocol.registerHttpProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Object 
    * `url` String
    * `referrer` Cadena
    * `method` Cuerda
    * `subir información` [Subir Información[]](structures/upload-data.md)
  * `callback` Función 
    * `redirectRequest` Object 
      * `url` String
      * `method` Cuerda
      * `session` Object (optional)
      * `uploadData` Object (opcional) 
        * `contentType` String - MIME type of the content.
        * `data` String - Content to be sent.
* `completion` Función (opcional) 
  * `error` Error

Registra un protocolo de `esquema` que enviará una solicitud HTTP como respuesta.

El uso es el mismo que con `registerFileProtocol`, excepto que la `retrollamada` debe ser llamada con un objeto `redirectRequest` que tenga las propiedades `url`, `metodo`, `referenciar`, `uploadData` y `sesion`.

Por defecto la solicitud HTTP reutilizará la sesión actual. Si quiere que solicitud tenga una sesión diferente debe configurarla de `sesion` a `nulo`.

Para solicitudes POST el objeto `uploadData` debe ser proporcionado.

### `protocol.registerStreamProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Object 
    * `url` Cadena
    * `headers` Objeto
    * `referrer` Cadena
    * `method` Cuerda
    * `subir información` [Subir Información[]](structures/upload-data.md)
  * `callback` Función 
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
* `completion` Función (opcional) 
  * `error` Error

Registers a protocol of `scheme` that will send a `Readable` as a response.

The usage is similar to the other `register{Any}Protocol`, except that the `callback` should be called with either a `Readable` object or an object that has the `data`, `statusCode`, and `headers` properties.

Ejemplo:

```javascript
const {protocol} = require('electron')
const {PassThrough} = require('stream')

function createStream (text) {
  const rv = new PassThrough()  // PassThrough is also a Readable stream
  rv.push(text)
  rv.push(null)
  return rv
}

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback({
    statusCode: 200,
    headers: {
      'content-type': 'text/html'
    },
    data: createStream('<h5>Response</h5>')
  })
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

It is possible to pass any object that implements the readable stream API (emits `data`/`end`/`error` events). For example, here's how a file could be returned:

```javascript
const {protocol} = require('electron')
const fs = require('fs')

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs.createReadStream('index.html'))
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.unregisterProtocol(scheme[, completion])`

* `esquema` Cadena
* `completion` Función (opcional) 
  * `error` Error

Anula el registro del protocolo predeterminado de `esquema`.

### `protocol.isProtocolHandled(scheme, callback)`

* `esquema` Cadena
* `callback` Función 
  * `error` Error

La `retrollamada` será cancelada con un booleano que indique si ya es un controlador para `esquema`.

### `protocol.interceptFileProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Object 
    * `url` Cadena
    * `referrer` Cadena
    * `method` Cuerda
    * `subir información` [Subir Información[]](structures/upload-data.md)
  * `callback` Función 
    * `filePath` String
* `completion` Función (opcional) 
  * `error` Error

Intercepta el protocolo `esquema` y usa `controlador` como el controlador del nuevo protocolo lo cual enviará un archivo como respuesta.

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Object 
    * `url` Cadena
    * `referrer` Cadena
    * `method` Cuerda
    * `subir información` [Subir Información[]](structures/upload-data.md)
  * `callback` Función 
    * `data` String (optional)
* `completion` Función (opcional) 
  * `error` Error

Intercepta el protocolo `esquema` y usa `controlador` como el nuevo controlador de protocolo, lo cual envía una `Cadena` como respuesta.

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Object 
    * `url` Cadena
    * `referrer` Cadena
    * `method` Cuerda
    * `subir información` [Subir Información[]](structures/upload-data.md)
  * `callback` Función 
    * `buffer` Buffer (optional)
* `completion` Función (opcional) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response.

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Object 
    * `url` String
    * `referrer` Cadena
    * `method` Cuerda
    * `subir información` [Subir Información[]](structures/upload-data.md)
  * `callback` Función 
    * `redirectRequest` Object 
      * `url` String
      * `method` Cuerda
      * `session` Object (optional)
      * `uploadData` Object (opcional) 
        * `contentType` String - MIME type of the content.
        * `data` String - Content to be sent.
* `completion` Función (opcional) 
  * `error` Error

Intercepta el protocolo `scheme` y utiliza el `handler` como el nuevo controlador del protocolo, el cual envía una nueva solicitud HTTP como respuesta.

### `protocol.interceptStreamProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Object 
    * `url` String
    * `headers` Objeto
    * `referrer` Cadena
    * `method` Cuerda
    * `subir información` [Subir Información[]](structures/upload-data.md)
  * `callback` Función 
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
* `completion` Función (opcional) 
  * `error` Error

Same as `protocol.registerStreamProtocol`, except that it replaces an existing protocol handler.

### `protocol.uninterceptProtocol(scheme[, completion])`

* `esquema` Cadena
* `completion` Función (opcional) 
  * `error` Error

Elimina el interceptor instalado para el `scheme` y restaura su controlador original.