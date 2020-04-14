## Classe : IncomingMessage

> Gère les réponses aux requêtes HTTP/HTTPS.

Processus : [Main](../glossary.md#main-process)

`IncomingMessage` Implémente l'interface [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) et est donc un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### Événements d’instance

#### Événement : 'data'

Retourne :

* `chunk` Buffer - Un segment de données du corps de réponse.

L'événement `data` est la méthode habituelle de transfert des données de réponse dans le code applicatif.

#### Événement : 'end'

Indique que le corps de réponse est terminée.

#### Événement : 'aborted'

Émis lorsqu’une requête a été annulée lors d’une transaction HTTP en cours.

#### Événement : 'error'

Retourne :

`error` Error - Retourne généralement une chaîne de caractères d’erreur identifiant les causes d’échec.

Émis lorsqu’une erreur s’est produite pendant le transfert d’événements de données de réponse. Par exemple, si le serveur ferme la connexion alors que la réponse est toujours en transfert, un événement `error` retentit sur l’objet de réponse et un événement `close` suivra par la suite sur l’objet de la demande.

### Propriétés d'instance

Une instance `IncomingMessage` possède les propriétés suivantes :

#### `response.statusCode`

Un `Integer` indiquant le code d'état de la réponse HTTP.

#### `response.statusMessage`

Un `String` représentant le message d'état HTTP.

#### `response.headers`

An `Object` representing the response HTTP headers. The `headers` object is formatted as follows:

* Tous les noms d’en-têtes sont en minuscules.
* Chaque nom d’en-tête créer une propriété de tableau sur l’objet d'en-têtes.
* Chaque valeur d'en-tête est ajouté dans le tableau associé à son nom d'en-tête.

#### `response.httpVersion`

Un `String` indiquant le numéro de version du protocole HTTP. Les valeurs habituelles sont '1.0' ou '1.1'. De plus, `httpVersionMajor` et `httpVersionMinor` sont deux propriétés entières lisibles qui retournent respectivement les numéros de version principale et secondaire de HTTP.

#### `response.httpVersionMajor`

Un `Integer`indiquant le numéro de version majeur du protocol HTTP.

#### `response.httpVersionMinor`

Un `Integer` indiquant le numéro de version mineur du protocol HTTP.
