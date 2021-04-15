## Classe : ClientRequest

> Faire des requêtes HTTP/HTTPS.

Processus : [Main](../glossary.md#main-process)

`ClientRequest` implémente l'interface de [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) et, du coup, elle est un [EventEmitter][event-emitter].

### `new ClientRequest(options)`

* `options` (Objet | Chaîne) - Si `options` est une chaîne, elle est interprétée comme une URL de demande. S’il s’agit d’un objet, on s’attend à ce qu’il spécifie entièrement une demande HTTP via propriétés suivantes :
  * `method` String (facultatif) - La méthode de demande HTTP. Par défaut à la méthode GET 'eau.
  * `url` String (facultatif) - L’URL de demande. Doit être fourni dans la forme avec le schéma de protocole spécifié comme http ou https.
  * `session` Session (facultatif) - l'instance [`Session`](session.md) avec à laquelle la requête est associée.
  * `partition` String (facultatif) - Le nom de la [`partition`](session.md) avec laquelle la requête est associée. Par défaut, la chaîne vide est utilisée. L `session` option remplace `partition`. Ainsi, si une `session` est explicitement spécifiée , `partition` est ignorée.
  * `credentials` String (facultatif) - Peut être `include` ou `omit`. S’il ' [envoyer des informations d'](https://fetch.spec.whatwg.org/#credentials) avec cette demande. S’il est `include`, les informations d’identification de la session associée la demande seront utilisées. S’ils sont définis `omit`, les informations d’identification ne seront pas envoyées avec la demande (et l’événement `'login'` ne sera pas déclenché dans le cas d’un 401). Cela correspond au comportement du [chercher](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) option du même nom. Si cette option n’est pas spécifiée, l’authentification données de la session seront envoyées, et les cookies ne seront pas envoyés (sauf si `useSessionCookies` est défini).
  * `useSessionCookies` Boolean (facultatif) - S’il vous plaît envoyer des cookies avec demande de la session fournie. Si `credentials` spécifié, cette option 'a aucun effet. Par défaut la valeur est `false`.
  * `protocol` String (facultatif) - Peut être `http:` ou `https:`. Le protocole régime dans la forme « régime: ». Par défaut à 'http:'.
  * `host` String (facultatif) - L'hôte du serveur fourni en concaténation de le nom d'hôte et le numéro de port 'hostname:port'.
  * `hostname` String (facultatif) - Le nom d'hôte du serveur.
  * `port` Integer (facultatif) - Le numéro de port d'écoute du serveur.
  * `path` String (facultatif) - La partie chemin de l'URL de la requête.
  * `redirect` String (facultatif) - Peut être `follow`, `error` ou `manual`. Le mode de redirection pour cette demande. Lorsque le mode est `error`, toute redirection être interrompue. Lorsque le mode est `manual` la redirection sera annulée à moins que [`request.followRedirect`](#requestfollowredirect) soit invoquée de façon synchrone pendant l' [`redirect`](#event-redirect) événement.  Par défaut, `follow`.
  * `origin` String (facultatif) - L’URL d’origine de la demande.

`options` propriétés telles que `protocole`, `host`, `hostname`, `port` et `path` suivent strictement le modèle Node.js comme décrit dans le module [URL](https://nodejs.org/api/url.html).

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

* `réponse` IncomingMessage - Un objet représentant le message de réponse HTTP.

#### Événement : 'login'

Retourne :

* `authInfo` objet
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `nom d'utilisateur` String (facultatif)
  * `mot de passe` String (facultatif)

Émis lorsqu'un proxy d'authentification demande les identifiants de l'utilisateur.

La fonction `callback` est censée être rappelée avec les identifiants de l'utilisateur :

* `username` String
* `password` String

```JavaScript
request.on('login', (authInfo, callback) => {
  callback('username', 'password')
})
```

Fournir des identifiants vides annulera la demande et signalera une erreur d'authentification sur l'objet de réponse :

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

Émis juste après le dernier chunk de l'objet `request` a été écrit dans l'objet `request`.

#### Événement : 'abort'

Emitted when the `request` is aborted. The `abort` event will not be fired if the `request` is already closed.

#### Événement : 'error'

Retourne :

* `error` Erreur - un objet d'erreur fournissant des informations sur l'échec.

Émis lorsque le module `net` ne parvient pas à émettre une requête réseau. Généralement lorsque l'objet `request` émet un événement `error`, un événement `close` sera ensuite suivi et aucun objet de réponse ne sera fourni.

#### Événement : 'close'

Émis en tant que dernier événement dans la transaction de réponse de requête HTTP. L'événement `close` indique qu'aucun événement ne sera émis sur les objets `request` ou `response`.

#### Événement : 'redirect'

Retourne :

* `statusCode` Integer
* `method` String
* `redirectUrl` String
* `En-têtes` de réponse<String, String[]>

Émis lorsque le serveur renvoie une réponse de redirection (par exemple 301 Déplacé de manière permanente). Appeler [`request.followRedirect`](#requestfollowredirect) va continuer avec la redirection.  Si cet événement est géré, [`request.followRedirect`](#requestfollowredirect) doit être appelé **synchrones**, sinon la requête sera annulée.

### Propriétés d'instance

#### `request.chunkedEncoding`

Un `Booléen` spécifiant si la requête utilisera l'encodage de transfert HTTP chunked ou non. Par défaut, faux. La propriété est lisible et en écriture, Cependant, il ne peut être défini que avant la première opération d'écriture car les en-têtes HTTP ne sont pas encore mis sur le fil. Tenter de définir la propriété `chunkedEncoding` après la première écriture lancera une erreur.

L'utilisation de l'encodage chunked est fortement recommandée si vous avez besoin d'envoyer un grand corps de requête car les données seront diffusées en petits morceaux au lieu d'être en mémoire tampon interne dans la mémoire de processus d'Electron.

### Méthodes d’instance

#### `request.setHeader(name, value)`

* `name` String - Un nom d'en-tête HTTP supplémentaire.
* `valeur` String - Une valeur d'en-tête HTTP supplémentaire.

Ajoute un en-tête HTTP supplémentaire. Le nom de l'en-tête sera publié tel quel sans minuscules. Il peut être appelé seulement avant d'écrire en premier. Appeler cette méthode après la première écriture lancera une erreur. Si la valeur passée n'est pas une `String`, sa méthode `toString()` sera appelée pour obtenir la valeur finale.

Certain headers are restricted from being set by apps. These headers are listed below. More information on restricted headers can be found in [Chromium's header utils](https://source.chromium.org/chromium/chromium/src/+/master:services/network/public/cpp/header_util.cc;drc=1562cab3f1eda927938f8f4a5a91991fefde66d3;bpv=1;bpt=1;l=22).

* `Content-Length`
* `Hôte`
* `Trailer` or `Te`
* `Upgrade`
* `Cookie2`
* `Keep-Alive`
* `Transfer-Encoding`

Additionally, setting the `Connection` header to the value `upgrade` is also disallowed.

#### `request.getHeader(name)`

* `name` Chaîne - Spécifie un nom d'en-tête supplémentaire.

Retourne `String` - La valeur d'un nom d'en-tête supplémentaire précédemment défini.

#### `request.removeHeader(name)`

* `name` Chaîne - Spécifie un nom d'en-tête supplémentaire.

Removes a previously set extra header name. This method can be called only before first write. Trying to call it after the first write will throw an error.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - A chunk of the request body's data. If it is a string, it is converted into a Buffer using the specified encoding.
* `encoding` String (optional) - Used to convert string chunks into Buffer objects. Defaults to 'utf-8'.
* `callback` Fonction (facultatif) - Appelée après la fin de l'opération d'écriture.

`callback` est essentiellement une fonction factice introduite dans le but de conserver la similarité avec l'API Node.js. Il est appelé de manière asynchrone dans le prochain tick après que le contenu `chunk` ait été livré à la couche de réseau Chromium. Contrairement à l'implémentation de Node.js, il n'est pas garanti que le contenu `chunk` ait été vidé sur le fil avant que `callback` ne soit appelé.

Ajoute un morceau de données au corps de la requête. La première opération d'écriture peut causer la publication des en-têtes de la requête sur le fil. Après la première opération d'écriture, il n'est pas autorisé d'ajouter ou de supprimer un en-tête personnalisé.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (facultatif)
* `encoding` String (facultatif)
* `callback` Function (facultatif)

Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish` event is emitted just after the end operation.

#### `request.abort()`

Annule une transaction HTTP en cours. Si la requête a déjà émis l'événement `close` , l'opération d'abandon n'aura aucun effet. Sinon, un événement en cours émettra des événements `abandon` et `close` . De plus, s'il y a un objet de réponse en cours, il émettra l'évènement `abandonné`.

#### `request.followRedirect()`

Continues any pending redirection. Can only be called during a `'redirect'` event.

#### `request.getUploadProgress()`

Retourne `Object`:

* `active` Boolean - Whether the request is currently active. If this is false no other properties will be set
* `started` Boolean - Whether the upload has started. If this is false both `current` and `total` will be set to 0.
* `current` Integer - Le nombre d'octets qui ont été téléchargés jusqu'à présent
* `total` Integer - Le nombre d'octets qui seront chargés dans cette requête

Vous pouvez utiliser cette méthode en conjonction avec les requêtes `POST` pour obtenir la progression d'un téléchargement de fichier ou d'un autre transfert de données.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
