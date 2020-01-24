## Classe : ClientRequest

> Faire des requêtes HTTP/HTTPS.

Processus : [Main](../glossary.md#main-process)

`ClientRequest` implémente l'interface de [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) et, du coup, elle est un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `new ClientRequest(options)`

* `options` (Object | String) - Si `options` est un String, il est interprété comme une URL demandée. Si c'est un objet, il est nécessaire de spécifier une requête HTTP complètement en utilisant les propriétés suivantes: 
  * `method` String (optional) - The HTTP request method. Defaults to the GET method.
  * `url` String (optional) - The request URL. Must be provided in the absolute form with the protocol scheme specified as http or https.
  * `session` Session (optional) - The [`Session`](session.md) instance with which the request is associated.
  * `partition` String (optional) - The name of the [`partition`](session.md) with which the request is associated. Defaults to the empty string. The `session` option prevails on `partition`. Thus if a `session` is explicitly specified, `partition` is ignored.
  * `protocol` String (optional) - The protocol scheme in the form 'scheme:'. Currently supported values are 'http:' or 'https:'. Defaults to 'http:'.
  * `host` String (optional) - The server host provided as a concatenation of the hostname and the port number 'hostname:port'.
  * `hostname` String (optional) - The server host name.
  * `port` Integer (optional) - The server's listening port number.
  * `path` String (optional) - The path part of the request URL.
  * `redirect` String (optional) - The redirect mode for this request. Should be one of `follow`, `error` or `manual`. Defaults to `follow`. When mode is `error`, any redirection will be aborted. When mode is `manual` the redirection will be cancelled unless [`request.followRedirect`](#requestfollowredirect) is invoked synchronously during the [`redirect`](#event-redirect) event.

`options` properties such as `protocol`, `host`, `hostname`, `port` and `path` strictly follow the Node.js model as described in the [URL](https://nodejs.org/api/url.html) module.

Par exemple, nous aurions pu créer la même requête à 'github.com' comme suit:

```JavaScript
const request = net.request({
  method: 'GET',
  protocol: 'https:',
  hostname: 'github.com',
  port: 443,
  path: '/'
})
```

### Événements d’instance

#### Événement : 'response'

Retourne :

* `response` IncomingMessage - An object representing the HTTP response message.

#### Événement : 'login'

Retourne :

* `authInfo` Objet 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `nom d'utilisateur` String (facultatif)
  * `mot de passe` String (facultatif)

Emitted when an authenticating proxy is asking for user credentials.

The `callback` function is expected to be called back with user credentials:

* `username` String
* `password` String

```JavaScript
request.on('login', (authInfo, callback) => {
  callback('username', 'password')
})
```

Providing empty credentials will cancel the request and report an authentication error on the response object:

```JavaScript
request.on('response', (response) => {
  console.log(`STATUS: ${response.statusCode}`);
  response.on('error', (error) => {
    console.log(`ERROR: ${JSON.stringify(error)}`)
  })
})
request.on('login', (authInfo, callback) => {
  callback()
})
```

#### Événement : 'finish'

Emitted just after the last chunk of the `request`'s data has been written into the `request` object.

#### Événement : 'abort'

Emitted when the `request` is aborted. The `abort` event will not be fired if the `request` is already closed.

#### Événement : 'error'

Renvoie :

* `error` Error - an error object providing some information about the failure.

Emitted when the `net` module fails to issue a network request. Typically when the `request` object emits an `error` event, a `close` event will subsequently follow and no response object will be provided.

#### Événement : 'close'

Emitted as the last event in the HTTP request-response transaction. The `close` event indicates that no more events will be emitted on either the `request` or `response` objects.

#### Événement : 'redirect'

Retourne :

* `statusCode` Integer
* `method` String
* `redirectUrl` String
* `responseHeaders` Record<String, String[]>

Émis lorsque le serveur renvoie une réponse de redirection (par exemple 301 Déplacé de manière permanente). Appeler [`request.followRedirect`](#requestfollowredirect) va continuer avec la redirection. Si cet événement est géré, [`request.followRedirect`](#requestfollowredirect) doit être appelé **synchrones**, sinon la requête sera annulée.

### Instance Properties

#### `request.chunkedEncoding`

Un `Booléen` spécifiant si la requête utilisera l'encodage de transfert HTTP chunked ou non. Par défaut, faux. La propriété est lisible et en écriture, Cependant, il ne peut être défini que avant la première opération d'écriture car les en-têtes HTTP ne sont pas encore mis sur le fil. Tenter de définir la propriété `chunkedEncoding` après la première écriture lancera une erreur.

L'utilisation de l'encodage chunked est fortement recommandée si vous avez besoin d'envoyer un grand corps de requête car les données seront diffusées en petits morceaux au lieu d'être en mémoire tampon interne dans la mémoire de processus d'Electron.

### Méthodes d’instance

#### `request.setHeader(name, value)`

* `name` String - Un nom d'en-tête HTTP supplémentaire.
* `valeur` String - Une valeur d'en-tête HTTP supplémentaire.

Ajoute un en-tête HTTP supplémentaire. Le nom de l'en-tête sera publié tel quel sans minuscules. Il peut être appelé seulement avant d'écrire en premier. Appeler cette méthode après la première écriture lancera une erreur. Si la valeur passée n'est pas une `String`, sa méthode `toString()` sera appelée pour obtenir la valeur finale.

#### `request.getHeader(name)`

* `name` Chaîne - Spécifie un nom d'en-tête supplémentaire.

Retourne `String` - La valeur d'un nom d'en-tête supplémentaire précédemment défini.

#### `request.removeHeader(name)`

* `name` Chaîne - Spécifie un nom d'en-tête supplémentaire.

Supprime un nom d'en-tête supplémentaire précédemment défini. Cette méthode peut être appelée seulement avant d'écrire la première fois. Tenter de l'appeler après la première écriture lancera une erreur.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - Un morceau des données du corps de la requête. S'il s'agit d'une chaîne , elle est convertie en tampon en utilisant l'encodage spécifié.
* `encoding` String (facultatif) - Utilisé pour convertir des chunks de chaîne en objets Buffer. Par défaut, 'utf-8'.
* `callback` Fonction (facultatif) - Appelée après la fin de l'opération d'écriture.

`callback` est essentiellement une fonction factice introduite dans le but de conserver la similarité avec l'API Node.js. Il est appelé de manière asynchrone dans le prochain tick après que le contenu `chunk` ait été livré à la couche de réseau Chromium. Contrairement à l'implémentation de Node.js, il n'est pas garanti que le contenu `chunk` ait été vidé sur le fil avant que `callback` ne soit appelé.

Ajoute un morceau de données au corps de la requête. La première opération d'écriture peut causer la publication des en-têtes de la requête sur le fil. Après la première opération d'écriture, il n'est pas autorisé d'ajouter ou de supprimer un en-tête personnalisé.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (facultatif)
* `encoding` String (facultatif)
* `callback` Function (facultatif)

Envoie le dernier chunk des données de la requête. Les opérations d'écriture ou de fin ultérieures ne seront pas autorisées. L'événement `finish` est émis juste après l'opération finale.

#### `request.abort()`

Annule une transaction HTTP en cours. Si la requête a déjà émis l'événement `close` , l'opération d'abandon n'aura aucun effet. Sinon, un événement en cours émettra des événements `abandon` et `close` . De plus, s'il y a un objet de réponse en cours, il émettra l'évènement `abandonné`.

#### `request.followRedirect()`

Suit toute redirection en attente. Ne peut être appelée que pendant un événement `'redirect'` .

#### `request.getUploadProgress()`

Retourne `Object`:

* `active` Booléen - Si la requête est actuellement active. Si c'est faux aucune autre propriété ne sera définie
* `started` Boolean - Si le téléchargement a commencé. Si c'est faux `current` et `total` seront réglés à 0.
* `current` Integer - Le nombre d'octets qui ont été téléchargés jusqu'à présent
* `total` Integer - Le nombre d'octets qui seront chargés dans cette requête

Vous pouvez utiliser cette méthode en conjonction avec les requêtes `POST` pour obtenir la progression d'un téléchargement de fichier ou d'un autre transfert de données.