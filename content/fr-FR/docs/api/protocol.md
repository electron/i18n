# protocol

> Enregistrez un protocole personnalisé et interceptez les requêtes de protocole existantes.

Processus : [Main](../glossary.md#main-process)

Un exemple d'implémentation d'un protocole qui a le même effet que le protocole `file://` :

```javascript
const { app, protocol } = require ('electron')
const path = require ('path')

app.whenReady().then()) => {
  protocol.registerFileProtocol('atom', (demande, rappel) => { url const de
    = request.url.substr(7)
    rappel ({ chemin: path.normalize('${__dirname}/${url}') })
  })
})
```

**Note :** Toutes les méthodes si non spécifiées ne peuvent être utilisées qu'après que l'évènement `ready` de l' `app` ne soit émis.

## Utiliser `protocole` avec une `partition` personnalisée ou `session`

Un protocole est enregistré sur un objet spécifique d' [`session`](./session.md) 'électrons. Si vous ne spécifiez pas une session, vos `protocol` seront appliqués pour la session par défaut qu’Electron utilise. Toutefois, si vous définissez un `partition` ou un `session` sur le `webPreferences`de votre `browserWindow`, alors cette fenêtre utilisera une session différente et votre protocole personnalisé ne fonctionnera pas si vous utilisez simplement `electron.protocol.XXX`.

Pour que votre protocole personnalisé fonctionne en combinaison avec une session personnalisée, vous devez l’enregistrer explicitement à cette session.

```javascript
const { session, app, protocol } = require ('electron')
const path = require ('path')

app.whenReady().then()() => {
  const partition = 'persist:example'
  const ses = session.fromPartition(partition)

  ses.protocol.registerFileProtocol ('atom', (demande, rappel) => { url const
    = request.url.substr(7)
    rappel ({ chemin: path.normalize('${__dirname}/${url}') })
  })

  mainWindow = nouveau BrowserWindow ({ webPreferences: { partition } })
})
```

## Méthodes

Le module `protocol` dispose des méthodes suivantes :

### `protocol.registerSchemesAsPriviled(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)

**note :** méthode ne peut être utilisée qu’avant que l’événement `ready` du module `app` ne soit émis et ne puisse être appelé qu’une seule fois.

Enregistre l' `scheme` en tant que norme, sécurisée, contourne la politique de sécurité du contenu pour les ressources , permet l’enregistrement de ServiceWorker, prend en charge aller chercher api, et streaming vidéo / audio. Spécifiez un privilège avec la valeur `true` pour activer la capacité.

Un exemple d’enregistrement d’un système privilégié, qui contourne la sécurité du contenu politique :

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privilèges: { bypassCSP: true } }
])
```

Un schéma standard adhère à ce que la RFC 3986 appelle la syntaxe [générique de l'URI ](https://tools.ietf.org/html/rfc3986#section-3). Par exemple `http` et `https` sont des schémas standard, alors que `file` ne l'est pas.

L’enregistrement d’un régime en standard permet aux ressources relatives et absolues être résolues correctement lorsqu’elles sont servies. Sinon, le schéma se comportera comme le protocole `fichier`, mais sans la possibilité de résoudre les URL relatives.

Par exemple lorsque vous chargez la page suivante avec un protocole personnalisé sans l'enregistrer en tant que schéma standard, l'image ne sera pas chargée car les schémas non standards ne peuvent pas reconnaître les URL relatives :

```html
<body>
  <img src='test.png'>
</body>
```

L'enregistrement d'un schéma en tant que standard permettra l'accès aux fichiers via l'API [FileSystem API][file-system-api]. Sinon, le moteur de rendu lancera une erreur de sécurité pour le schéma.

Par défaut, les apis de stockage web (localStorage, sessionStorage, webSQL, indexedDB, cookies) sont désactivés pour les systèmes non standard. Donc, en général, si vous enregistrer un protocole personnalisé pour remplacer le protocole `http` , vous devez l’enregistrer comme un système standard.

Les protocoles qui utilisent des flux (protocoles http et stream) doivent définir `stream: true`. Les `<video>` et `<audio>` HTML s’attendent à ce que les protocoles tamponner réponses par défaut. Le `stream` configure ces éléments pour qu’ils s’attendent des réponses en streaming.

### `protocol.registerFileProtocol (schéma, gestionnaire)`

* `scheme` String
* `handler` fonction
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Retours `Boolean` - Si le protocole a été enregistré avec succès

Enregistre un protocole de `scheme` qui enverra un fichier comme réponse. Le `handler` sera appelé avec `request` et `callback` où `request` est une demande entrante pour le `scheme`.

Pour gérer la `requête`, la `callback` doit être appelée soit avec le chemin du fichier, soit avec un objet qui a une propriété `chemin`. . `callback(filePath)` ou `callback({ path: filePath })`. Le `filePath` doit être un chemin absolu.

Par défaut, le `scheme` est traité comme `http:`, qui est parsed différemment des protocoles qui suivent la « syntaxe générique URI » comme `file:`.

### `protocol.registerBufferProtocol (schéma, gestionnaire)`

* `scheme` String
* `handler` fonction
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (Tampon | [ProtocolResponse](structures/protocol-response.md))

Retours `Boolean` - Si le protocole a été enregistré avec succès

Enregistre un protocole de `schéma` qui enverra un `Buffer` en tant que réponse.

L’utilisation est la même avec `registerFileProtocol`, sauf que le `callback` doit être appelé soit avec un objet `Buffer` ou un objet qui a la propriété `data` .

Exemple :

```javascript
protocol.registerBufferProtocol ('atom', (demande, rappel) => {
  rappel ({ mimeType: 'texte/html', données: Buffer.from('<h5>Response</h5>') })
})
```

### `protocol.registerStringProtocol (schéma, gestionnaire)`

* `scheme` String
* `handler` fonction
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Retours `Boolean` - Si le protocole a été enregistré avec succès

Enregistre un protocole de `schéma` qui enverra une `String` en tant que réponse.

L’utilisation est la même avec `registerFileProtocol`, sauf que le `callback` doit être appelé soit avec un `String` ou un objet qui a la propriété `data` propriété.

### `protocol.registerHttpProtocol (schéma, gestionnaire)`

* `scheme` String
* `handler` fonction
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` ProtocoleResponse

Retours `Boolean` - Si le protocole a été enregistré avec succès

Enregistre un protocole de `schéma` qui enverra une requête HTTP en réponse.

L’utilisation est la même `registerFileProtocol`, sauf que le `callback` doit être appelé avec un objet qui a la propriété `url` propriété.

### `protocol.registerStreamProtocol (schéma, gestionnaire)`

* `scheme` String
* `handler` fonction
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Retours `Boolean` - Si le protocole a été enregistré avec succès

Enregistre un protocole de `scheme` qui enverra un flux en réponse.

L’utilisation est la même avec `registerFileProtocol`, sauf que le `callback` doit être appelé soit avec un objet [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) ou un objet qui a la `data` propriété.

Exemple :

```javascript
const { protocol } = require ('electron')
const { PassThrough } = require ('stream')

function createStream (text) {
  const rv = new PassThrough() // PassThrough is également un flux lisible
  rv.push (texte)
  rv.push(null)
  return rv
}

protocol.registerStreamProtocol('atom', (demande, rappel) => {
  rappel ({
    statusCode: 200,
    en-têtes : {
      'type de contenu': 'texte/html'
    }, données
    : createStream('<h5>Response</h5>')
  })
})
```

Il est possible de passer n’importe quel objet qui implémente l’API de flux lisible (émet `data`/`end`/`error` événements). Par exemple, voici comment un fichier peut être retourné :

```javascript
protocol.registerStreamProtocol ('atom', (demande, rappel) => {
  rappel (fs.createReadStream('index.html'))
})
```

### `protocol.unregisterProtocol(scheme)`

* `scheme` String

Retours `Boolean` - Si le protocole n’a pas été enregistré avec succès

Enregistre le protocole personnalisé de `schéma`.

### `protocol.isProtocolRegistered(scheme)`

* `scheme` String

Retours `Boolean` - Que `scheme` soit déjà enregistré.

### `protocol.interceptFileProtocol (schéma, gestionnaire)`

* `scheme` String
* `handler` fonction
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Retours `Boolean` - Si le protocole a été intercepté avec succès

Intercepte `scheme` protocole et utilise `handler` comme nouveau gestionnaire du protocole qui envoie un fichier comme réponse.

### `protocol.interceptStringProtocol (schéma, gestionnaire)`

* `scheme` String
* `handler` fonction
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Retours `Boolean` - Si le protocole a été intercepté avec succès

Intercepte `scheme` protocole et utilise `handler` comme nouveau gestionnaire du protocole qui envoie un `String` comme réponse.

### `protocol.interceptBufferProtocol (schéma, gestionnaire)`

* `scheme` String
* `handler` fonction
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (Tampon | [ProtocolResponse](structures/protocol-response.md))

Retours `Boolean` - Si le protocole a été intercepté avec succès

Intercepte `scheme` protocole et utilise `handler` comme nouveau gestionnaire du protocole qui envoie un `Buffer` comme réponse.

### `protocol.interceptHttpProtocol (schéma, gestionnaire)`

* `scheme` String
* `handler` fonction
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` [ProtocolResponse](structures/protocol-response.md)

Retours `Boolean` - Si le protocole a été intercepté avec succès

Intercepte `scheme` protocole et utilise `handler` comme nouveau gestionnaire du protocole qui envoie une nouvelle demande HTTP en réponse.

### `protocol.interceptStreamProtocol (schéma, gestionnaire)`

* `scheme` String
* `handler` fonction
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Retours `Boolean` - Si le protocole a été intercepté avec succès

Même que `protocol.registerStreamProtocol`, sauf qu’il remplace un gestionnaire de protocole existant.

### `protocol.uninterceptProtocol(scheme)`

* `scheme` String

Retours `Boolean` - Si le protocole a été avec succès non accepté

Retirez l’intercepteur installé pour `scheme` et restaurent son gestionnaire d’origine.

### `protocol.isProtocolIntercepted(scheme)`

* `scheme` String

Retours `Boolean` - Que `scheme` soit déjà intercepté.

[file-system-api]: https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem
