# Protocolo

> Registrar un protocolo personalizado e interceptar las peticiones de protocolo existentes.

Proceso: [Main](../glossary.md#main-process)

Un ejemplo de la implementación de un protocolo que tiene el mismo efecto que el protocolo `file://`:

```javascript
const { app, protocol } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  })
})
```

**Nota:** Todos los métodos salvo los especificados pueden ser usados solo después de que el evento `listo` del módulo de la `aplicación` sea emitido.

## Usando `protocol` con una `partition` o `session` personalizada

Un protocolo está registrado en un objeto [`session`](./session.md) específico de Electron. Si no especificas una sesión, entonces tu `protocol` será aplicado a la sesión por defecto que Electron. Sin embargo, si defines un `partition` o `session` en tu `webPreferences` del `browserWindow`, luego esa ventana usará una sesión diferente y tu protocolo personalizado no funcionará si solo usas `electron.protocol.XXX`.

Para tener su protocolo personalizado trabajando con una sesión personalizada, necesitas registrarlo a esa sesión explícitamente.

```javascript
const { session, app, protocol } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  const partition = 'persist:example'
  const ses = session.fromPartition(partition)

  ses.protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  })

  mainWindow = new BrowserWindow({ webPreferences: { partition } })
})
```

## Métodos

El módulo `protocolo` tiene los siguientes métodos:

### `protocol.registerSchemesAsPrivileged(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)

**Note:** Este método solo puede ser usado antes de que el evento `ready` del modulo `app` sea emitido y solo puede ser llamado una vez.

Registers the `scheme` as standard, secure, bypasses content security policy for resources, allows registering ServiceWorker, supports fetch API, and streaming video/audio. Specify a privilege with the value of `true` to enable the capability.

Un ejemplo de registro de un esquema privilegiado, que elude la Política de Seguridad Contenido:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privileges: { bypassCSP: true } }
])
```

Un esquema estandar se adhiere a lo que el RFC3986 llama [Sintaxis URI genérica](https://tools.ietf.org/html/rfc3986#section-3). Por ejemplo `http` y `https` son esquemas estándar, mientras `archivo` no lo es.

Registrar un esquema como estándar, permite a recursos relativos y absolutos ser resueltos correctamente cuando son servidos. De otra manera el esquema se comportaría como el protocolo `archivo`, pero sin la habilidad de resolver URLs relativas.

Por ejemplo cuando usted carga la siguiente carga con un protocolo personalizado sin registrar como un esquema estándar, esta imagen no será cargada debido a que un esquema que no es estandar puede no reconocer URLs relativas:

```html
<body>
  <img src='test.png'>
</body>
```

Registrando un esquema como estándar permitirá el acceso a archivos mediante la [Api de archivos de sistema][file-system-api]. De otra manera el renderizador arrojará un error de seguridad en el sistema.

Por defecto las apis de web storage (localStorage, sessionStorage, webSQL, indexedDB, cookies) están deshabilitadas para esquemas no estándares. Así que en general, si quieres registrar un protocolo personalizado para reemplazar el protocolo `http`, tienes que registrarlo como un esquema estándar.

Protocols that use streams (http and stream protocols) should set `stream: true`. The `<video>` and `<audio>` HTML elements expect protocols to buffer their responses by default. The `stream` flag configures those elements to correctly expect streaming responses.

### `protocol.registerFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Función
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully registered

Registra un protocolo de `scheme` que enviará un archivo como repuesta. El `handler` será llamado con `request` y `callback` donde `request` es una solicitud entrante para el `scheme`.

Para controlar la `solicitud`, la `retrollamada` debe ser llamada con la ruta al archivo o un objeto que tiene una propiedad `ruta`, ejemplo `callback(filePath)` o `callback({ path: filePath })`. El `filePath` debe ser una ruta absoluta.

Por defecto el `scheme` es tratado como `http:`, que es analizado de forma diferente que los protocolos que siguen la "generic URI syntax" como `file:`.

### `protocol.registerBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Función
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully registered

Registra un protocolo de `esquema` que enviará un `Buffer` como respuesta.

El uso es el mismo con `registerFileProtocol`, excepto que el `callback` debería ser llamado con un objeto `Buffer` o un objeto que tiene la propiedad `data`.

Ejemplo:

```javascript
protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({ mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>') })
})
```

### `protocol.registerStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Función
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully registered

Registra un protocolo de `esquema` que enviará una `cadena` como respuesta.

El uso es el mismo con `registerFileProtocol`, excepto que el `callback` debería ser llamado con un objeto `String` o un objeto que tiene la propiedad `data`.

### `protocol.registerHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Función
    * `response` ProtocolResponse

Returns `Boolean` - Whether the protocol was successfully registered

Registra un protocolo de `esquema` que enviará una solicitud HTTP como respuesta.

El uso es el mismo con `registerFileProtocol`, excepto que el `callback` debería ser llamado con un objeto que tiene la propiedad `url`.

### `protocol.registerStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Función
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully registered

Registra un protocolo de `scheme` que enviará un stream como respuesta.

El uso es el mismo con `registerFileProtocol`, excepto que el `callback` debería ser llamado con un objeto [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) o un objeto que tiene la propiedad `data`.

Ejemplo:

```javascript
const { protocol } = require('electron')
const { PassThrough } = require('stream')

function createStream (text) {
  const rv = new PassThrough() // PassThrough is also a Readable stream
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
})
```

Es posible pasar cualquier objeto que implementa la API readable stream (emite los eventos `data`/`end`/`error`). Por ejemplo, aquí está como puede devolver un archivo:

```javascript
protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs.createReadStream('index.html'))
})
```

### `protocol.unregisterProtocol(scheme)`

* `scheme` String

Returns `Boolean` - Whether the protocol was successfully unregistered

Anula el registro del protocolo predeterminado de `esquema`.

### `protocol.isProtocolRegistered(scheme)`

* `scheme` String

Devuelve `Boolean` - Si el `scheme` ya está registrado.

### `protocol.interceptFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Función
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully intercepted

Intercepta el protocolo `esquema` y usa `controlador` como el controlador del nuevo protocolo lo cual enviará un archivo como respuesta.

### `protocol.interceptStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Función
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully intercepted

Intercepta el protocolo `esquema` y usa `controlador` como el nuevo controlador de protocolo, lo cual envía una `Cadena` como respuesta.

### `protocol.interceptBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Función
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully intercepted

Intercepta el protocolo de `scheme` y usa el `handler` como el nuevo manejador del protocolo, el cual envía un `Buffer` como respuesta.

### `protocol.interceptHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Función
    * `response` [Respuesta de Protocolo](structures/protocol-response.md)

Returns `Boolean` - Whether the protocol was successfully intercepted

Intercepta el protocolo `scheme` y utiliza el `handler` como el nuevo controlador del protocolo, el cual envía una nueva solicitud HTTP como respuesta.

### `protocol.interceptStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Función
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully intercepted

Mismo que `protocol.registerStreamProtocol`, excepto que reemplaza un manejador de protocolo existente.

### `protocol.uninterceptProtocol(scheme)`

* `scheme` String

Returns `Boolean` - Whether the protocol was successfully unintercepted

Elimina el interceptor instalado para el `scheme` y restaura su controlador original.

### `protocol.isProtocolIntercepted(scheme)`

* `scheme` String

Devuelve `Boolean` - Si el `scheme` ya está interceptado.

[file-system-api]: https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem
