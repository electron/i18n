## Classe: Travailleurs de service

> Interrogez et recevez des événements d’une séance de travailleurs actifs des services.

Processus : [Main](../glossary.md#main-process)

Les instances de la `ServiceWorkers` sont consultées en utilisant `serviceWorkers` propriété de un `Session`.

Par exemple :

```javascript
const { session } = exiger ('electron')

// Obtenir tous les travailleurs de service.
console.log (session.defaultSession.serviceWorkers.getAllRunning())

// Gérer les journaux et obtenir des informations sur les travailleurs de service
session.defaultSession.serviceWorkers.on('console-message', (événement, messageDetails) => { console
  .log(
    'Got service worker message',
    messageDetails,
    'from',
    session.defaultSession.serviceWorkers.getFromVersionID (messageDetails.versionId)
  )
})
```

### Événements d’instance

Les événements suivants sont disponibles sur les instances de `ServiceWorkers`:

#### Événement : 'console-message'

Retourne :

* `event` Événement
* `messageDetails` objet - Informations sur le message de la console
  * `message` String - The actual console message
  * `versionId` Number - The version ID of the service worker that sent the log message
  * `source` String - The type of source for this message.  Can be `javascript`, `xml`, `network`, `console-api`, `storage`, `app-cache`, `rendering`, `security`, `deprecation`, `worker`, `violation`, `intervention`, `recommendation` or `other`.
  * `level` Number - The log level, from 0 to 3. In order it matches `verbose`, `info`, `warning` and `error`.
  * `sourceUrl` String - The URL the message came from
  * `lineNumber` Number - The line number of the source that triggered this console message

Emitted when a service worker logs something to the console.

### Méthodes d’instance

The following methods are available on instances of `ServiceWorkers`:

#### `serviceWorkers.getAllRunning()`

Returns `Record<Number, ServiceWorkerInfo>` - A [ServiceWorkerInfo](structures/service-worker-info.md) object where the keys are the service worker version ID and the values are the information about that service worker.

#### `serviceWorkers.getFromVersionID(versionId)`

* `versionId` Number

Returns [`ServiceWorkerInfo`](structures/service-worker-info.md) - Information about this service worker

If the service worker does not exist or is not running this method will throw an exception.
