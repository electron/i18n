# protocol

> Enregistrez un protocole personnalisé et interceptez les requêtes de protocole existantes.

Processus : [Main](../glossary.md#main-process)

Un exemple d'implémentation d'un protocole qui a le même effet que le protocole `file://` :

```javascript
const { app, protocol } = require('electron')
const path = require('path')

application. n('ready', () => {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request. rl.substr(7)
    callback({ path: path. ormalize(`${__dirname}/${url}`) })
  }, (error) => {
    if (error) console. rror('Échec de l'enregistrement du protocole)
  })
})
```

**Note :** Toutes les méthodes si non spécifiées ne peuvent être utilisées qu'après que l'évènement `ready` de l' `app` ne soit émis.

## Utiliser `protocole` avec une `partition` personnalisée ou `session`

Un protocole est enregistré dans un objet Electron spécifique [`session`](./session.md). Si vous ne spécifiez pas de session, alors votre `protocole` sera appliqué à la session par défaut qu'Electron utilise. Cependant, si vous définissez une `partition` ou `session` sur les `browserWindow` de votre `webPreferences`, alors cette fenêtre utilisera une session différente et votre protocole personnalisé ne fonctionnera pas si vous utilisez juste `electron. rotocol.XXX`.

Pour que votre protocole personnalisé fonctionne en combinaison avec une session personnalisée, vous devez l'enregistrer explicitement à cette session.

```javascript
const { session, app, protocol } = require('electron')
const path = require('path')

application. n('ready', () => {
  const partition = 'persist:example'
  const ses = session. romPartition(partition)

  ses.protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url. ubstr(7)
    callback({ path: path. ormalize(`${__dirname}/${url}`) })
  }, (error) => {
    if (error) console. rror('Échec de l'enregistrement du protocole)
  })

  mainWindow = new BrowserWindow({
    width: 800,
    hauteur: 600,
    webpréférences : {
      partition: partition
    }
  })
})
```

## Méthodes

Le module `protocol` dispose des méthodes suivantes :

### `protocol.registerSchemesAsPriviled(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)


**Note:** This method can only be used before the `ready` event of the `app` module gets emitted and can be called only once.

Enregistre le `schéma` en standard, sécurisé, contourne la politique de sécurité du contenu pour les ressources, permet d'enregistrer ServiceWorker et supporte la récupération de l'API.

Specify a privilege with the value of `true` to enable the capability. An example of registering a privileged scheme, with bypassing Content Security Policy:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privilèges: { bypassCSP: true } }
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

**before (<= v4.x)**
```javascript
// Principal
protocol.registerStandardSchemes(['scheme1', 'scheme2'], { secure: true })
// Rendu
webFrame.registerURLSchemeAsPrivileged('scheme1', { secure: true })
webFrame.registerURLSchemeAsPrivileged('scheme2', { secure: true })
```

**after (>= v5.x)**
```javascript
protocol.registerSchemesAsPrivileged([
  { scheme: 'scheme1', privileges: { standard: true, secure: true } },
  { scheme: 'scheme2', privileges: { standard: true, secure: true } }
])
```

### `protocol.registerFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `filePath` String (facultatif)
* `completion` Function (optional)
  * `error` Error

Enregistre un protocole de `schéma` qui enverra le fichier en tant que réponse. Le `manipulateur` sera appelé avec `manipulateur(demande, rappel)` lorsqu'une `demande` est va être créé avec un schéma `. <code>completion` sera appelé avec `completion(null)` lorsque `scheme` est enregistré avec succès ou `completion(error)` en cas d'échec.

Pour gérer la `requête`, la `callback` doit être appelée soit avec le chemin du fichier, soit avec un objet qui a une propriété `chemin`. . `callback(filePath)` ou `callback({ path: filePath })`. L'objet peut également avoir une propriété `en-têtes` qui donne une correspondance des en-têtes aux valeurs des en-têtes de réponse, e. `callback({ path: filePath, headers: {"Content-Security-Policy": "default-src 'none'"]})`.

Lorsque `callback` est appelé avec rien, un numéro ou un objet qui a un `erreur` propriété, la `demande` échouera avec le `erreur` numéro que vous spécifié. Pour les numéros d'erreur disponibles que vous pouvez utiliser, veuillez consulter la liste des erreurs [net](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

Par défaut, le `schéma` est traité comme `http:`, qui est analysé différemment que les protocoles qui suivent la "syntaxe URI générique" comme `fichier:`.

### `protocol.registerBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (facultatif)
* `completion` Function (optional)
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
  * `request` Object
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `data` String (facultatif)
* `completion` Function (optional)
  * `error` Error

Enregistre un protocole de `schéma` qui enverra une `String` en tant que réponse.

L'utilisation est la même avec `registerFileProtocol`, excepté que le `callback` doit être appelé avec une `String` ou un objet qui a les `données`, `mimeType`, et `charset` propriétés.

### `protocol.registerHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Object
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `redirectRequest` Object
      * `url` String
      * `method` String
      * `session` Object (facultatif)
      * `uploadData` Object (optional)
        * `contentType` String - MIME type of the content.
        * `data` String - Content to be sent.
* `completion` Function (optional)
  * `error` Error

Enregistre un protocole de `schéma` qui enverra une requête HTTP en réponse.

L'utilisation est la même avec `registerFileProtocol`, sauf que la `callback` doit être appelée avec un objet `redirectRequest` qui a l'`url`, `méthode`, `referrer`, `uploadData` et `session` propriétés.

By default the HTTP request will reuse the current session. If you want the request to have a different session you should set `session` to `null`.

Pour les requêtes POST, l'objet `uploadData` doit être fourni.

### `protocol.registerStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Object
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (facultatif)
* `completion` Function (optional)
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

It is possible to pass any object that implements the readable stream API (emits `data`/`end`/`error` events). For example, here's how a file could be returned:

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
* `completion` Function (optional)
  * `error` Error

Enregistre le protocole personnalisé de `schéma`.

### `protocol.isProtocolHandled(scheme, callback)`

* `scheme` String
* `callback` Function
  * `handled` Boolean

The `callback` will be called with a boolean that indicates whether there is already a handler for `scheme`.

**[Deprecated Soon](modernization/promisification.md)**

### `protocol.isProtocolHandled(scheme)`

* `scheme` String

Retourne `Promise<Boolean>` - rempli avec un booléen qui indique s'il y a déjà un gestionnaire pour `schéma`.

### `protocol.interceptFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `filePath` String
* `completion` Function (optional)
  * `error` Error

Intercepte le protocole `schéma` et utilise `handler` comme nouveau gestionnaire du protocole, qui envoie un fichier comme réponse.

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `data` String (facultatif)
* `completion` Function (optional)
  * `error` Error

Intercepte le protocole `schéma` et utilise `handler` comme nouveau gestionnaire du protocole, qui envoie une `String` comme réponse.

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `buffer` Buffer (facultatif)
* `completion` Function (optional)
  * `error` Error

Intercepte le protocole `schéma` et utilise `handler` comme nouveau gestionnaire du protocole, qui envoie un `Buffer` comme réponse.

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Object
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `redirectRequest` Object
      * `url` String
      * `method` String
      * `session` Object (facultatif)
      * `uploadData` Object (optional)
        * `contentType` String - MIME type of the content.
        * `data` String - Content to be sent.
* `completion` Function (optional)
  * `error` Error

Intercepte le protocole `schéma` et utilise `handler` comme nouveau gestionnaire du protocole, qui envoie une nouvelle requête HTTP comme réponse.

### `protocol.interceptStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Object
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (facultatif)
* `completion` Function (optional)
  * `error` Error

Identique à `protocol.registerStreamProtocol`, excepté qu'il remplace un gestionnaire de protocole existant.

### `protocol.uninterceptProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (optional)
  * `error` Error

Retirez l'intercepteur installé pour `schéma` et restaurez son gestionnaire d'origine.
