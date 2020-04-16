# protocol (NetworkService) (Draft)

This document describes the new protocol APIs based on the [NetworkService](https://www.chromium.org/servicification).

We don't currently have an estimate of when we will enable the `NetworkService` by default in Electron, but as Chromium is already removing non-`NetworkService` code, we will probably switch before Electron 10.

The content of this document should be moved to `protocol.md` after we have enabled the `NetworkService` by default in Electron.

> Enregistrez un protocole personnalisé et interceptez les requêtes de protocole existantes.

Processus : [Main](../glossary.md#main-process)

Un exemple d'implémentation d'un protocole qui a le même effet que le protocole `file://` :

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

**Note :** Toutes les méthodes si non spécifiées ne peuvent être utilisées qu'après que l'évènement `ready` de l' `app` ne soit émis.

## Utiliser `protocole` avec une `partition` personnalisée ou `session`

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

## Méthodes

Le module `protocol` dispose des méthodes suivantes :

### `protocol.registerSchemesAsPriviled(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)

**Note:** Cette méthode ne peut être utilisée qu'avant l'événement `ready` du `app` est émis et ne peut être appelé qu'une seule fois.

Registers the `scheme` as standard, secure, bypasses content security policy for resources, allows registering ServiceWorker and supports fetch API. Specify a privilege with the value of `true` to enable the capability.

An example of registering a privileged scheme, that bypasses Content Security Policy:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privilèges: { bypassCSP: true } }
])
```

Un schéma standard adhère à ce que la RFC 3986 appelle la syntaxe [générique de l'URI ](https://tools.ietf.org/html/rfc3986#section-3). Par exemple `http` et `https` sont des schémas standard, alors que `file` ne l'est pas.

Registering a scheme as standard allows relative and absolute resources to be resolved correctly when served. Sinon, le schéma se comportera comme le protocole `fichier`, mais sans la possibilité de résoudre les URL relatives.

Par exemple lorsque vous chargez la page suivante avec un protocole personnalisé sans l'enregistrer en tant que schéma standard, l'image ne sera pas chargée car les schémas non standards ne peuvent pas reconnaître les URL relatives :

```html
<body>
  <img src='test.png'>
</body>
```

L'enregistrement d'un schéma en tant que standard permettra l'accès aux fichiers via l'API [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). Sinon, le moteur de rendu lancera une erreur de sécurité pour le schéma.

By default web storage apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) are disabled for non standard schemes. So in general if you want to register a custom protocol to replace the `http` protocol, you have to register it as a standard scheme.

### `protocol.registerFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Registers a protocol of `scheme` that will send a file as the response. The `handler` will be called with `request` and `callback` where `request` is an incoming request for the `scheme`.

Pour gérer la `requête`, la `callback` doit être appelée soit avec le chemin du fichier, soit avec un objet qui a une propriété `chemin`. . `callback(filePath)` ou `callback({ path: filePath })`. The `filePath` must be an absolute path.

By default the `scheme` is treated like `http:`, which is parsed differently from protocols that follow the "generic URI syntax" like `file:`.

### `protocol.registerBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Enregistre un protocole de `schéma` qui enverra un `Buffer` en tant que réponse.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `Buffer` object or an object that has the `data` property.

Exemple :

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

Enregistre un protocole de `schéma` qui enverra une `String` en tant que réponse.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `String` or an object that has the `data` property.

### `protocol.registerHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` ProtocolResponse

Enregistre un protocole de `schéma` qui enverra une requête HTTP en réponse.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with an object that has the `url` property.

### `protocol.registerStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Registers a protocol of `scheme` that will send a stream as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) object or an object that has the `data` property.

Exemple :

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

Enregistre le protocole personnalisé de `schéma`.

### `protocol.isProtocolRegistered(scheme)`

* `scheme` String

Returns `Boolean` - Whether `scheme` is already registered.

### `protocol.interceptFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Intercepte le protocole `schéma` et utilise `handler` comme nouveau gestionnaire du protocole, qui envoie un fichier comme réponse.

### `protocol.interceptStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Intercepte le protocole `schéma` et utilise `handler` comme nouveau gestionnaire du protocole, qui envoie une `String` comme réponse.

### `protocol.interceptBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Intercepte le protocole `schéma` et utilise `handler` comme nouveau gestionnaire du protocole, qui envoie un `Buffer` comme réponse.

### `protocol.interceptHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` ProtocolResponse

Intercepte le protocole `schéma` et utilise `handler` comme nouveau gestionnaire du protocole, qui envoie une nouvelle requête HTTP comme réponse.

### `protocol.interceptStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` ProtocolRequest
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Identique à `protocol.registerStreamProtocol`, excepté qu'il remplace un gestionnaire de protocole existant.

### `protocol.uninterceptProtocol(scheme)`

* `scheme` String

Retirez l'intercepteur installé pour `schéma` et restaurez son gestionnaire d'origine.

### `protocol.isProtocolIntercepted(scheme)`

* `scheme` String

Returns `Boolean` - Whether `scheme` is already intercepted.
