## Classe : ClientRequest

> Faire des requêtes HTTP/HTTPS.

Processus : [Main](../glossary.md#main-process)

`ClientRequest` implémente l'interface de [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) et, du coup, elle est un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `new ClientRequest(options)`

* `options` (Object | String) - Si `options` est un String, il est interprété comme une URL demandée. Si c'est un objet, il est nécessaire de spécifier une requête HTTP complètement en utilisant les propriétés suivantes: 
  * `méthode` String (optionnel) - La méthode de requête HTTP. La méthode GET par défaut.
  * `url` String (facultatif) - L'URL de requête. Doit être fournie sous la forme absolue avec le schéma de protocole spécifié en http ou https.
  * `session` Session (facultatif) - l'instance [`Session`](session.md) avec à laquelle la requête est associée.
  * `partition` String (facultatif) - Le nom de la [`partition`](session.md) avec laquelle la requête est associée. Par défaut, la chaîne vide est utilisée. L'option `session` prévaut sur `partition`. Ainsi, si une `session` est explicitement spécifiée , `partition` est ignorée.
  * `useSessionCookies` Boolean (optional) - Whether to send cookies with this request from the provided session. This will make the `net` request's cookie behavior match a `fetch` request. Par défaut la valeur est `false`.
  * `protocole` String (facultatif) - Le schéma de protocole sous la forme 'scheme:'. Les valeurs actuellement supportées sont 'http:' ou 'https:'. Par défaut, 'http:'.
  * `host` String (facultatif) - L'hôte du serveur fourni en concaténation de le nom d'hôte et le numéro de port 'hostname:port'.
  * `hostname` String (facultatif) - Le nom d'hôte du serveur.
  * `port` Integer (facultatif) - Le numéro de port d'écoute du serveur.
  * `path` String (facultatif) - La partie chemin de l'URL de la requête.
  * `redirect` String (optionnel) - Le mode de redirection pour cette requête. Doit être l'un des `follow`, `erreur` ou `manuel`. Par défaut, `follow`. Lorsque le mode est `erreur`, toute redirection sera abandonnée. Lorsque le mode est `manuel,` la redirection sera annulée à moins que [`request.followRedirect`](#requestfollowredirect) ne soit invoquée de façon synchronisée pendant l'événement [`redirect`](#event-redirect).

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

* `authInfo` Objet 
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

Émis lorsque la `requête` est abandonnée. L'événement `avorter` ne sera pas déclenché si la `requête` est déjà fermée.

#### Événement : 'error'

Renvoie :

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