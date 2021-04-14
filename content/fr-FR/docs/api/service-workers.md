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
  * `message` String - Le message de la console réelle
  * `versionId` - L’iD de version du travailleur de service qui a envoyé le message journal
  * `source` String - Le type de source pour ce message.  Peut être `javascript`, `xml`, `network`, `console-api`, `storage`, `app-cache`, `rendering`, `security`, `deprecation`, `worker`, `violation`, `intervention`, `recommendation` ou `other`.
  * `level` numéro - Le niveau de journal, de 0 à 3. Dans l’ordre, il correspond `verbose`, `info`, `warning` et `error`.
  * `sourceUrl` String - L’URL du message est venue de
  * `lineNumber` numéro - Le numéro de ligne de la source qui a déclenché ce message console

Émis lorsqu’un travailleur de service enregistre quelque chose sur la console.

### Méthodes d’instance

Les méthodes suivantes sont disponibles sur les cas de `ServiceWorkers`:

#### `serviceWorkers.getAllRunning()`

Retours `Record<Number, ServiceWorkerInfo>` - Un objet [ServiceWorkerInfo](structures/service-worker-info.md) lorsque les clés sont l’ID de version travailleur de service et les valeurs sont les informations sur ce travailleur de service.

#### `serviceWorkers.getFromVersionID (versionId)`

* `versionId` numéro

Retours [`ServiceWorkerInfo`](structures/service-worker-info.md) - Informations sur ce travailleur de service

Si le travailleur de service n’existe pas ou n’est pas en cours d’exécution de cette méthode jettera une exception.
