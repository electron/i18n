# protocol

> Register a custom protocol and intercept existing protocol requests.

Processus : [Main](../glossary.md#main-process)

An example of implementing a protocol that has the same effect as the `file://` protocol:

```javascript
const { app, protocol } = require('electron')
const path = require('path')

app.on('ready', () => {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })
})
```

**Note :** Toutes les méthodes si non spécifiées ne peuvent être utilisées qu'après que l'évènement `ready` de l' `app` ne soit émis.

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
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      partition: partition
    }
  })
})
```

## Méthodes

Le module `protocol` dispose des méthodes suivantes :

### `protocol.registerSchemesAsPrivileged(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)

**Note:** This method can only be used before the `ready` event of the `app` module gets emitted and can be called only once.

Registers the `scheme` as standard, secure, bypasses content security policy for resources, allows registering ServiceWorker and supports fetch API.

Specify a privilege with the value of `true` to enable the capability. An example of registering a privileged scheme, with bypassing Content Security Policy:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privileges: { bypassCSP: true } }
])
```

Un schéma standard adhère à ce que la RFC 3986 appelle la syntaxe [générique de l'URI ](https://tools.ietf.org/html/rfc3986#section-3). Par exemple `http` et `https` sont des schémas standard, alors que `file` ne l'est pas.

L'enregistrement d'un schéma en tant que standard, permettra de résoudre les ressources relatives et absolues quand elles sont servies. Sinon, le schéma se comportera comme le protocole `fichier`, mais sans la possibilité de résoudre les URL relatives.

Par exemple lorsque vous chargez la page suivante avec un protocole personnalisé sans l'enregistrer en tant que schéma standard, l'image ne sera pas chargée car les schémas non standards ne peuvent pas reconnaître les URL relatives :

```html
<body>
  <img src='test.png'>
</body>
```

L'enregistrement d'un schéma en tant que standard permettra l'accès aux fichiers via l'API [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). Sinon, le moteur de rendu lancera une erreur de sécurité pour le schéma.

Par défaut apis de stockage web (localStorage, sessionStorage, webSQL, indexedDB, cookies) sont désactivés pour les schémas non standard. Donc en général si vous voulez enregistrer un protocole personnalisé pour remplacer le protocole `http`, vous devez l'enregistrer en tant que système standard.

`protocol.registerSchemesAsPrivileged` peut être utilisé pour reproduire la fonctionnalité des fonctions précédentes `protocol.registerStandardSchemes`, `webFrame.registerURLSchemeAs*` et `protocol.registerServiceWorkerSchemes` qui existaient avant Electron 5.0.0, par exemple :

**avant (<= v4.x)**

```javascript
// Principal
protocol.registerStandardSchemes(['scheme1', 'scheme2'], { secure: true })
// Rendu
webFrame.registerURLSchemeAsPrivileged('scheme1', { secure: true })
webFrame.registerURLSchemeAsPrivileged('scheme2', { secure: true })
```

**après (>= v5.x)**

```javascript
protocol.registerSchemesAsPrivileged([
  { scheme: 'scheme1', privileges: { standard: true, secure: true } },
  { scheme: 'scheme2', privileges: { standard: true, secure: true } }
])
```

### `protocol.registerFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Objet 
    * `url` String
    * Enregistrement `en-têtes`<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `filePath` String | [FilePathWithHeaders](structures/file-path-with-headers.md) (facultatif)
* `completion` Function (facultatif) 
  * `error` Error

Enregistre un protocole de `schéma` qui enverra le fichier en tant que réponse. Le `manipulateur` sera appelé avec `manipulateur(demande, rappel)` lorsqu'une `demande` est va être créé avec un schéma `. <code>completion` sera appelé avec `completion(null)` lorsque `scheme` est enregistré avec succès ou `completion(error)` en cas d'échec.

Pour gérer la `requête`, la `callback` doit être appelée soit avec le chemin du fichier, soit avec un objet qui a une propriété `chemin`. . `callback(filePath)` ou `callback({ path: filePath })`. L'objet peut également avoir une propriété `en-têtes` qui donne une correspondance des en-têtes aux valeurs des en-têtes de réponse, e. `callback({ path: filePath, headers: {"Content-Security-Policy": "default-src 'none'"]})`.

Lorsque `callback` est appelé avec rien, un numéro ou un objet qui a un `erreur` propriété, la `demande` échouera avec le `erreur` numéro que vous spécifié. Pour les numéros d'erreur disponibles que vous pouvez utiliser, veuillez consulter la liste des erreurs [net](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

Par défaut, le `schéma` est traité comme `http:`, qui est analysé différemment que les protocoles qui suivent la "syntaxe URI générique" comme `fichier:`.

### `protocol.registerBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Objet 
    * `url` String
    * Enregistrement `en-têtes`<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (facultatif)
* `completion` Function (facultatif) 
  * `error` Error

Enregistre un protocole de `schéma` qui enverra un `Buffer` en tant que réponse.

L'utilisation est la même avec `registerFileProtocol`, excepté que le `callback` doit être appelé avec un objet `Buffer` ou un objet qui a les `données`, `mimeType`, et `charset` propriétés.

Exemple :

```javascript
const { protocol } = require('electron')

protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({ mimeType: 'text/html', data: Buffer. rom('<h5>Response</h5>') })
}, (error) => {
  if (error) console.error('Échec de l'enregistrement du protocole)
})
```

### `protocol.registerStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Objet 
    * `url` String
    * Enregistrement `en-têtes`<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `données` (String | [StringProtocolResponse](structures/string-protocol-response.md)) (facultatif)
* `completion` Function (facultatif) 
  * `error` Error

Enregistre un protocole de `schéma` qui enverra une `String` en tant que réponse.

L'utilisation est la même avec `registerFileProtocol`, excepté que le `callback` doit être appelé avec une `String` ou un objet qui a les `données`, `mimeType`, et `charset` propriétés.

### `protocol.registerHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Objet 
    * `url` String
    * Enregistrement `en-têtes`<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `redirectRequest` Objet 
      * `url` String
      * `méthode` String (facultatif)
      * `session` Session | null (optionnel)
      * `uploadData` [ProtocolResponseUploadData](structures/protocol-response-upload-data.md) (facultatif)
* `completion` Function (facultatif) 
  * `error` Error

Enregistre un protocole de `schéma` qui enverra une requête HTTP en réponse.

L'utilisation est la même avec `registerFileProtocol`, sauf que la `callback` doit être appelée avec un objet `redirectRequest` qui a l'`url`, `méthode`, `referrer`, `uploadData` et `session` propriétés.

Par défaut, la requête HTTP réutilisera la session courante. Si vous voulez que la requête ait une session différente, vous devez définir `session` à `null`.

Pour les requêtes POST, l'objet `uploadData` doit être fourni.

### `protocol.registerStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Objet 
    * `url` String
    * Enregistrement `en-têtes`<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (facultatif)
* `completion` Function (facultatif) 
  * `error` Error

Enregistre un protocole de `schéma` qui enverra une réponse `Lisible`.

L'utilisation est similaire à l'autre `registre du protocole{Any}`, excepté que le `callback` doit être appelé avec soit un objet `Readable` ou un objet que a les propriétés `data`, `statusCode`, et `headers`.

Exemple :

```javascript
const { protocol } = require('electron')
const { PassThrough } = require('stream')

function createStream (text) {
  const rv = new PassThrough() // PassThrough est également un flux lisible
  rv. ush(texte)
  rv.push(null)
  return rv
}

protocole. egisterStreamProtocol('atom', (request, callback) => {
  callback({
    statusCode: 200,
    en-têtes : {
      'content-type': 'text/html'
    },
    données : createStream('<h5>Response</h5>')
  })
}, (error) => {
  if (error) console. rror('Échec de l'enregistrement du protocole)
})
```

Il est possible de passer n'importe quel objet qui implémente l'API de flux lisible (émet `data`/`end`/`error`). Par exemple, voici comment un fichier peut être retourné :

```javascript
const { protocol } = require('electron')
const fs = require('fs')

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs. reateReadStream('index.html'))
}, (error) => {
  if (error) console.error('Échec de l'enregistrement du protocole)
})
```

### `protocol.unregisterProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (facultatif) 
  * `error` Error

Enregistre le protocole personnalisé de `schéma`.

### `protocol.isProtocolHandled(scheme)`

* `scheme` String

Retourne `Promise<Boolean>` - rempli avec un booléen qui indique s'il y a déjà un gestionnaire pour `schéma`.

### `protocol.interceptFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Objet 
    * `url` String
    * Enregistrement `en-têtes`<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `filePath` String
* `completion` Function (facultatif) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a file as a response.

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Objet 
    * `url` String
    * Enregistrement `en-têtes`<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `données` (String | [StringProtocolResponse](structures/string-protocol-response.md)) (facultatif)
* `completion` Function (facultatif) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `String` as a response.

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Objet 
    * `url` String
    * Enregistrement `en-têtes`<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `buffer` Buffer (facultatif)
* `completion` Function (facultatif) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response.

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Objet 
    * `url` String
    * Enregistrement `en-têtes`<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `redirectRequest` Objet 
      * `url` String
      * `méthode` String (facultatif)
      * `session` Session | null (optionnel)
      * `uploadData` [ProtocolResponseUploadData](structures/protocol-response-upload-data.md) (facultatif)
* `completion` Function (facultatif) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a new HTTP request as a response.

### `protocol.interceptStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Objet 
    * `url` String
    * Enregistrement `en-têtes`<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (facultatif)
* `completion` Function (facultatif) 
  * `error` Error

Same as `protocol.registerStreamProtocol`, except that it replaces an existing protocol handler.

### `protocol.uninterceptProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (facultatif) 
  * `error` Error

Remove the interceptor installed for `scheme` and restore its original handler.