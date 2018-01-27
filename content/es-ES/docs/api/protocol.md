# protocol

> Registra un protocolo personalizado e intercepta solicitudes de protocolos existente.

Proceso: [Principal](../glossary.md#main-process)

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
* `options` Objecto (opcional) 
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
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` Cuerda
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `llamada de vuelta` Función 
    * `filePath` String (optional)
* `completion` Función (opcional) 
  * `error` Error

Registra un protocolo de `esquema` que enviará el archivo como respuesta. El `controlador` será llamado con `handler(request, callback)` cuando una `solicitud` será creada con el `esquema`. `completion` will be called with `completion(null)` when `scheme` is successfully registered or `completion(error)` when failed.

To handle the `request`, the `callback` should be called with either the file's path or an object that has a `path` property, e.g. `callback(filePath)` or `callback({path: filePath})`.

When `callback` is called with nothing, a number, or an object that has an `error` property, the `request` will fail with the `error` number you specified. For the available error numbers you can use, please see the [net error list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

By default the `scheme` is treated like `http:`, which is parsed differently than protocols that follow the "generic URI syntax" like `file:`, so you probably want to call `protocol.registerStandardSchemes` to have your scheme treated as a standard scheme.

### `protocol.registerBufferProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` Cuerda
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `llamada de vuelta` Función 
    * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (optional)
* `completion` Función (opcional) 
  * `error` Error

Registers a protocol of `scheme` that will send a `Buffer` as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `Buffer` object or an object that has the `data`, `mimeType`, and `charset` properties.

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
    * `referrer` String
    * `method` Cuerda
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `llamada de vuelta` Función 
    * `data` String (optional)
* `completion` Función (opcional) 
  * `error` Error

Registers a protocol of `scheme` that will send a `String` as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `String` or an object that has the `data`, `mimeType`, and `charset` properties.

### `protocol.registerHttpProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` Cuerda
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `llamada de vuelta` Función 
    * `redirectRequest` Object 
      * `url` String
      * `method` Cuerda
      * `session` Object (optional)
      * `uploadData` Objecto (opcional) 
        * `contentType` String - MIME type of the content.
        * `data` String - Content to be sent.
* `completion` Función (opcional) 
  * `error` Error

Registers a protocol of `scheme` that will send an HTTP request as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with a `redirectRequest` object that has the `url`, `method`, `referrer`, `uploadData` and `session` properties.

By default the HTTP request will reuse the current session. If you want the request to have a different session you should set `session` to `null`.

For POST requests the `uploadData` object must be provided.

### `protocol.unregisterProtocol(scheme[, completion])`

* `esquema` Cadena
* `completion` Función (opcional) 
  * `error` Error

Unregisters the custom protocol of `scheme`.

### `protocol.isProtocolHandled(scheme, callback)`

* `esquema` Cadena
* `llamada de vuelta` Función 
  * `error` Error

The `callback` will be called with a boolean that indicates whether there is already a handler for `scheme`.

### `protocol.interceptFileProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` Cuerda
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `llamada de vuelta` Función 
    * `filePath` String
* `completion` Función (opcional) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a file as a response.

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` Cuerda
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `llamada de vuelta` Función 
    * `data` String (optional)
* `completion` Función (opcional) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `String` as a response.

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` Cuerda
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `llamada de vuelta` Función 
    * `buffer` Buffer (optional)
* `completion` Función (opcional) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response.

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `esquema` Cadena
* `manejador` Función 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` Cuerda
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `llamada de vuelta` Función 
    * `redirectRequest` Object 
      * `url` String
      * `method` Cuerda
      * `session` Object (optional)
      * `uploadData` Objecto (opcional) 
        * `contentType` String - MIME type of the content.
        * `data` String - Content to be sent.
* `completion` Función (opcional) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a new HTTP request as a response.

### `protocol.uninterceptProtocol(scheme[, completion])`

* `esquema` Cadena
* `completion` Función (opcional) 
  * `error` Error

Remove the interceptor installed for `scheme` and restore its original handler.