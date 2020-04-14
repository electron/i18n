# protocol (NetworkService) (Draft)

This document describes the new protocol APIs based on the [NetworkService](https://www.chromium.org/servicification).

We don't currently have an estimate of when we will enable the `NetworkService` by default in Electron, but as Chromium is already removing non-`NetworkService` code, we will probably switch before Electron 10.

The content of this document should be moved to `protocol.md` after we have enabled the `NetworkService` by default in Electron.

> Registrar un protocolo personalizado e interceptar las peticiones de protocolo existentes.

Proceso: [principal](../glossary.md#main-process)</0>

Un ejemplo de la implementación de un protocolo que tiene el mismo efecto que el protocolo `file://`:

```javascript
const { app, protocol } = require('electron')
const path = require('path')

app.on('ready', () => {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  })
})
```

**Nota:** Todos los métodos salvo los especificados pueden ser usados solo después de que el evento `listo` del módulo de la `aplicación` sea emitido.

## Usando `protocol` con una `partition` o `session` personalizada

A protocol is registered to a specific Electron [`session`](./session.md) object. If you don't specify a session, then your `protocol` will be applied to the default session that Electron uses. However, if you define a `partition` or `session` on your `browserWindow`'s `webPreferences`, then that window will use a different session and your custom protocol will not work if you just use `electron.protocol.XXX`.

To have your custom protocol work in combination with a custom session, you need to register it to that session explicitly.

```javascript
const { session, app, protocol } = require('electron')
const path = require('path')

app.on('ready', () => {
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

Registers the `scheme` as standard, secure, bypasses content security policy for resources, allows registering ServiceWorker and supports fetch API. Specify a privilege with the value of `true` to enable the capability.

An example of registering a privileged scheme, that bypasses Content Security Policy:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privileges: { bypassCSP: true } }
])
```

Un esquema estandar se adhiere a lo que el RFC3986 llama [Sintaxis URI genérica](https://tools.ietf.org/html/rfc3986#section-3). Por ejemplo `http` y `https` son esquemas estándar, mientras `archivo` no lo es.

Registering a scheme as standard allows relative and absolute resources to be resolved correctly when served. De otra manera el esquema se comportaría como el protocolo `archivo`, pero sin la habilidad de resolver URLs relativas.

Por ejemplo cuando usted carga la siguiente carga con un protocolo personalizado sin registrar como un esquema estándar, esta imagen no será cargada debido a que un esquema que no es estandar puede no reconocer URLs relativas:

```html
<body>
  <img src='test.png'>
</body>
```

Registrando un esquema como estándar permitirá el acceso a archivos mediante la [Api de archivos de sistema](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). De otra manera el renderizador arrojará un error de seguridad en el sistema.

By default web storage apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) are disabled for non standard schemes. So in general if you want to register a custom protocol to replace the `http` protocol, you have to register it as a standard scheme.

### `protocol.registerFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Función
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Registers a protocol of `scheme` that will send a file as the response. The `handler` will be called with `request` and `callback` where `request` is an incoming request for the `scheme`.

Para controlar la `solicitud`, la `retrollamada` debe ser llamada con la ruta al archivo o un objeto que tiene una propiedad `ruta`, ejemplo `callback(filePath)` o `callback({ path: filePath })`. The `filePath` must be an absolute path.

By default the `scheme` is treated like `http:`, which is parsed differently from protocols that follow the "generic URI syntax" like `file:`.

### `protocol.registerBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Función
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Registra un protocolo de `esquema` que enviará un `Buffer` como respuesta.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `Buffer` object or an object that has the `data` property.

Ejemplo:

```javascript
protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({ mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>') })
})
```

### `protocol.registerStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Función
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Registra un protocolo de `esquema` que enviará una `cadena` como respuesta.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `String` or an object that has the `data` property.

### `protocol.registerHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Función
    * `response` ProtocolResponse

Registra un protocolo de `esquema` que enviará una solicitud HTTP como respuesta.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with an object that has the `url` property.

### `protocol.registerStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Función
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Registers a protocol of `scheme` that will send a stream as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) object or an object that has the `data` property.

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

It is possible to pass any object that implements the readable stream API (emits `data`/`end`/`error` events). For example, here's how a file could be returned:

```javascript
protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs.createReadStream('index.html'))
})
```

### `protocol.unregisterProtocol(scheme)`

* `scheme` String

Anula el registro del protocolo predeterminado de `esquema`.

### `protocol.isProtocolRegistered(scheme)`

* `scheme` String

Returns `Boolean` - Whether `scheme` is already registered.

### `protocol.interceptFileProtocol(scheme, handler)`

* `esquema` Cadena
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Función
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Intercepta el protocolo `esquema` y usa `controlador` como el controlador del nuevo protocolo lo cual enviará un archivo como respuesta.

### `protocol.interceptStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Función
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Intercepta el protocolo `esquema` y usa `controlador` como el nuevo controlador de protocolo, lo cual envía una `Cadena` como respuesta.

### `protocol.interceptBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Función
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Intercepta el protocolo de `scheme` y usa el `handler` como el nuevo manejador del protocolo, el cual envía un `Buffer` como respuesta.

### `protocol.interceptHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Función
    * `response` ProtocolResponse

Intercepta el protocolo `scheme` y utiliza el `handler` como el nuevo controlador del protocolo, el cual envía una nueva solicitud HTTP como respuesta.

### `protocol.interceptStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Función
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Mismo que `protocol.registerStreamProtocol`, excepto que reemplaza un manejador de protocolo existente.

### `protocol.uninterceptProtocol(scheme)`

* `scheme` String

Elimina el interceptor instalado para el `scheme` y restaura su controlador original.

### `protocol.isProtocolIntercepted(scheme)`

* `scheme` String

Returns `Boolean` - Whether `scheme` is already intercepted.
