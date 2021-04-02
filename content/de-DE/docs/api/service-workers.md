## Klasse: ServiceWorkers

> Abfragen und Empfangen von Ereignissen von aktiven Servicemitarbeitern für Sitzungen.

Prozess: [Main](../glossary.md#main-process)

Auf Instances der `ServiceWorkers` -Klasse wird mithilfe `serviceWorkers` Eigenschaft `Session`zugegriffen.

Ein Beispiel:

```javascript
const { session } = require('electron')

/ Get all service workers.
console.log(session.defaultSession.serviceWorkers.getAllRunning())

/ / Handle-Protokolle und abrufen Service Worker-Infos
session.defaultSession.serviceWorkers.on('console-message', (event, messageDetails) => -
  console.log(
    'Got service worker message',
    messageDetails,
    'from',
    session.defaultSession.serviceWorkers.getFromVersion

  ID
```

### Instanz Events

Die folgenden Ereignisse sind auf Instanzen von `ServiceWorkers`verfügbar:

#### Event: 'console-message'

Rückgabewert:

* `event` Event
* `messageDetails` -Objekt - Informationen zur Konsolennachricht
  * `message` String - Die eigentliche Konsolenmeldung
  * `versionId` - Die Versions-ID des Service-Workers, der die Protokollnachricht gesendet hat
  * `source` String - Der Typ der Quelle für diese Nachricht.  Kann `javascript`, `xml`, `network`, `console-api`, `storage`, `app-cache`, `rendering`, `security`, `deprecation`, `worker` `violation`, `intervention`, `recommendation` oder `other`sein.
  * `level` - Die Protokollebene, von 0 bis 3. Damit er `verbose`, `info`, `warning` und `error`entspricht.
  * `sourceUrl` String - Die URL, von der die Nachricht stammt
  * `lineNumber` - Die Zeilennummer der Quelle, die diese Konsolennachricht ausgelöst hat

Wird angezeigt, wenn ein Service-Worker etwas an der Konsole protokolliert.

### Instanz Methoden

Die folgenden Methoden sind für Instanzen von `ServiceWorkers`verfügbar:

#### `serviceWorkers.getAllRunning()`

Gibt `Record<Number, ServiceWorkerInfo>` zurück : Ein [ServiceWorkerInfo](structures/service-worker-info.md) Objekt, bei dem die Schlüssel die Versions-ID des Servicearbeiters und die Werte die Informationen zu diesem Serviceworker sind.

#### `serviceWorkers.getFromVersionID(versionId)`

* `versionId` -Zahl

Gibt [`ServiceWorkerInfo`](structures/service-worker-info.md) zurück - Informationen zu diesem Servicearbeiter

Wenn der Service-Worker nicht vorhanden ist oder diese Methode nicht ausgeführt wird, wird eine Ausnahme ausgelöst.
