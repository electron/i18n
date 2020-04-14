# protocol (NetworkService) (Draft)

This document describes the new protocol APIs based on the [NetworkService](https://www.chromium.org/servicification).

We don't currently have an estimate of when we will enable the `NetworkService` by default in Electron, but as Chromium is already removing non-`NetworkService` code, we will probably switch before Electron 10.

The content of this document should be moved to `protocol.md` after we have enabled the `NetworkService` by default in Electron.

> Registra um protocolo personalizado e intercepta as solicitações de protocolo existentes.

Processo: [Main](../glossary.md#main-process)

Um exemplo de implementação de um protocolo que tem o mesmo efeito que o `file://` protocol:

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

**Nota:** Todos os métodos, a menos que seja especificados, só podem ser usados ​​após o evento `app` quando é emitido.

## Using `protocol` with a custom `partition` or `session`

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

O módulo de protocolo possui os seguintes métodos:

### `protocol.registerSchemesAsPrivileged(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)

**Note:** This method can only be used before the `ready` event of the `app` module gets emitted and can be called only once.

Registers the `scheme` as standard, secure, bypasses content security policy for resources, allows registering ServiceWorker and supports fetch API. Specify a privilege with the value of `true` to enable the capability.

An example of registering a privileged scheme, that bypasses Content Security Policy:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privileges: { bypassCSP: true } }
])
```

Um esquema padrão adere ao que a RFC 3986 chama [generic URI syntax](https://tools.ietf.org/html/rfc3986#section-3). Por exemplo `http` e `https` são esquema padrão, enquanto `file` não é.

Registering a scheme as standard allows relative and absolute resources to be resolved correctly when served. Caso contrário, o esquema se comportará como o protocolo `file`, mas sem a capacidade de resolver URLs relativos.

Por exemplo, quando você carrega a página seguinte com o protocolo personalizado sem registrando-o como esquema padrão, a imagem não será carregada porque esquemas não padrão não podem reconhecer URLs relativas:

```html
<body>
  <img src='test.png'>
</body>
```

Registrar um esquema como padrão permitirá o acesso aos arquivos através do[FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). Caso contrário, o renderizador lançará um erro de segurança para o esquema.

By default web storage apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) are disabled for non standard schemes. So in general if you want to register a custom protocol to replace the `http` protocol, you have to register it as a standard scheme.

### `protocol.registerFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Registers a protocol of `scheme` that will send a file as the response. The `handler` will be called with `request` and `callback` where `request` is an incoming request for the `scheme`.

To handle the `request`, the `callback` should be called with either the file's path or an object that has a `path` property, e.g. `callback(filePath)` or `callback({ path: filePath })`. The `filePath` must be an absolute path.

By default the `scheme` is treated like `http:`, which is parsed differently from protocols that follow the "generic URI syntax" like `file:`.

### `protocol.registerBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Registers a protocol of `scheme` that will send a `Buffer` as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `Buffer` object or an object that has the `data` property.

Exemplo:

```javascript
protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({ mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>') })
})
```

### `protocol.registerStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Registers a protocol of `scheme` that will send a `String` as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `String` or an object that has the `data` property.

### `protocol.registerHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` ProtocolResponse

Registers a protocol of `scheme` that will send an HTTP request as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with an object that has the `url` property.

### `protocol.registerStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Registers a protocol of `scheme` that will send a stream as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) object or an object that has the `data` property.

Exemplo:

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

Unregisters the custom protocol of `scheme`.

### `protocol.isProtocolRegistered(scheme)`

* `scheme` String

Returns `Boolean` - Whether `scheme` is already registered.

### `protocol.interceptFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a file as a response.

### `protocol.interceptStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `String` as a response.

### `protocol.interceptBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response.

### `protocol.interceptHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` ProtocolResponse

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a new HTTP request as a response.

### `protocol.interceptStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Same as `protocol.registerStreamProtocol`, except that it replaces an existing protocol handler.

### `protocol.uninterceptProtocol(scheme)`

* `scheme` String

Remove the interceptor installed for `scheme` and restore its original handler.

### `protocol.isProtocolIntercepted(scheme)`

* `scheme` String

Returns `Boolean` - Whether `scheme` is already intercepted.
