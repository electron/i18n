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

Un entier indiquant le code d'état de la réponse HTTP.

#### `response.statusMessage`

Une chaîne de caractère représentant le message d'état HTTP.

#### `response.headers`

Un objet représentant les en-têtes de la réponse HTTP. L'objet d'`en-têtes` est formaté comme suit :

* Tous les noms d’en-têtes sont en minuscules.
* Chaque nom d’en-tête créer une propriété de tableau sur l’objet d'en-têtes.
* Chaque valeur d'en-tête est ajouté dans le tableau associé à son nom d'en-tête.

#### `response.httpVersion`

Une chaîne de caractère indiquant le numéro de version du protocole HTTP. Les valeurs habituelles sont '1.0' ou '1.1'. Additionally `httpVersionMajor` and `httpVersionMinor` are two Integer-valued readable properties that return respectively the HTTP major and minor version numbers.

#### `response.httpVersionMajor`

An Integer indicating the HTTP protocol major version number.

#### `response.httpVersionMinor`

An Integer indicating the HTTP protocol minor version number.