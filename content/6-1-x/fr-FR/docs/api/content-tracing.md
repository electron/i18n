# contentTracing

> Collect tracing data from Chromium's content module for finding performance bottlenecks and slow operations.

Processus : [Main](../glossary.md#main-process)

This module does not include a web interface so you need to open `chrome://tracing/` in a Chrome browser and load the generated file to view the result.

**Remarque :** Vous ne devriez pas utiliser ce module tant que l'événement `ready` du module de l'application n'est pas émis.

```javascript
const { app, contentTracing } = require('electron')

app.on('ready', () => {
  const options = {
    categoryFilter: '*',
    traceOptions: 'record-until-full,enable-sampling'
  }

  contentTracing.startRecording(options, () => {
    console.log('Tracing started')
    setTimeout(() => {
      contentTracing.stopRecording('', (path) => {
        console.log('Tracing data recorded to ' + path)
      })
    }, 5000)
  })
})
```

## Méthodes

Le module `contentTracing` a les méthodes suivantes :

### `contentTracing.getCategories(callback)`

* `callback` Function
  * `categories` String[]

Obtenir un ensemble de groupes de catégories. The category groups can change as new code paths are reached.

Once all child processes have acknowledged the `getCategories` request the `callback` is invoked with an array of category groups.

**[Deprecated Soon](modernization/promisification.md)**

### `contentTracing.getCategories()`

Retourne `Promise<String[]>` - résout avec un tableau de groupes de catégories une fois que tous les processus enfants ont reconnu la requête `getCategories`

Obtenir un ensemble de groupes de catégories. The category groups can change as new code paths are reached.


### `contentTracing.startRecording(options, callback)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))
* `callback` Function

Commencez à enregistrer sur tous les processus.

L'enregistrement commence immédiatement localement et de manière asynchrone sur les processus enfants dès qu'il reçoit la demande EnableRecording. The `callback` will be called once all child processes have acknowledged the `startRecording` request.

**[Deprecated Soon](modernization/promisification.md)**

### `contentTracing.startRecording(options)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))

Retourne `Promise<void>` - résolu une fois que tous les processus enfants ont reconnu la requête `startRecording`.

Commencez à enregistrer sur tous les processus.

L'enregistrement commence immédiatement localement et de manière asynchrone sur les processus enfants dès qu'il reçoit la demande EnableRecording.

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Function
  * `resultFilePath` String

Arrêter l'enregistrement sur tous les processus.

Les processus fils mettent généralement en cache les données de trace et ne suppriment que rarement et envoient données de trace au processus principal. Cela aide à minimiser les frais d'exécution de traçage puisque l'envoi de données de traces via IPC peut être une opération coûteuse. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `stopRecording` request, `callback` will be called with a file that contains the traced data.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file. The actual file path will be passed to `callback` if it's not `null`.

**[Deprecated Soon](modernization/promisification.md)**

### `contentTracing.stopRecording(resultFilePath)`

* `resultFilePath` String

Returns `Promise<String>` - resolves with a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

Arrêter l'enregistrement sur tous les processus.

Les processus fils mettent généralement en cache les données de trace et ne suppriment que rarement et envoient données de trace au processus principal. Cela aide à minimiser les frais d'exécution de traçage puisque l'envoi de données de traces via IPC peut être une opération coûteuse. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Function
  * Objet
    * `value` Number
    * `percentage` Number

Récupère l'utilisation maximale sur les processus de mémoire tampon trace en pourcentage de l'état complet de . When the TraceBufferUsage value is determined the `callback` is called.

**[Deprecated Soon](modernization/promisification.md)**

### `contentTracing.getTraceBufferUsage()`

Retourne `Promise<Object>` - Résolution avec un objet contenant la `valeur` et `pourcentage` d'utilisation maximale du tampon de trace

Récupère l'utilisation maximale sur les processus de mémoire tampon trace en pourcentage de l'état complet de .
