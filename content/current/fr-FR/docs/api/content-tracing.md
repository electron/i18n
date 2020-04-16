# contentTracing

> Collecter des données de traçage de Chromium pour trouver des goulets d'étranglement de performance et des opérations lentes.

Processus : [Main](../glossary.md#main-process)

Ce module n'inclut pas d'interface web. Pour afficher les traces enregistrées, utilisez [visionneuse de traces](https://github.com/catapult-project/catapult/blob/master/tracing), disponible sur `chrome://tracing` dans Chrome.

**Remarque :** Vous ne devriez pas utiliser ce module tant que l'événement `ready` du module de l'application n'est pas émis.

```javascript
const { app, contentTracing } = require('electron')

app.on('ready', () => {
  (async () => {
    await contentTracing.startRecording({
      include_categories: ['*']
    })
    console.log('Commencement de la relève de données')
    await new Promise(resolve => setTimeout(resolve, 5000))
    const path = await contentTracing.stopRecording()
    console.log('Données relevées et enregistrées ' + path)
  })()
})
```

## Méthodes

Le module `contentTracing` a les méthodes suivantes :

### `contentTracing.getCategories()`

Retourne `Promise<String[]>` - résout avec un tableau de groupes de catégories une fois que tous les processus enfants ont reconnu la requête `getCategories`

Obtenir un ensemble de groupes de catégories. Les groupes de catégories peuvent changer lorsque de nouveaux chemins de code sont atteints. Voir aussi la [liste des catégories de traçage intégrées](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h).

### `contentTracing.startRecording(options)`

* `options` ([TraceConfig](structures/trace-config.md) | [TraceCategoriesAndOptions](structures/trace-categories-and-options.md))

Retourne `Promise<void>` - résolu une fois que tous les processus enfants ont reconnu la requête `startRecording`.

Commencez à enregistrer sur tous les processus.

L'enregistrement commence immédiatement localement et de manière asynchrone sur les processus enfants dès qu'il reçoit la demande EnableRecording.

Si un enregistrement est déjà en cours, la promesse sera immédiatement résolue, car seule une opération de trace peut être en cours à la fois.

### `contentTracing.stopRecording([resultFilePath])`

* `resultFilePath` String (facultatif)

Retourne `Promise<String>` - résout avec un chemin vers un fichier qui contient les données tracées une fois que tous les processus enfants ont reconnu la requête `stopRecording`

Arrêter l'enregistrement sur tous les processus.

Les processus fils mettent généralement en cache les données de trace et ne suppriment que rarement et envoient données de trace au processus principal. Cela aide à minimiser les frais d'exécution de traçage puisque l'envoi de données de traces via IPC peut être une opération coûteuse. Ainsi, pour terminer le traçage, Chromium demande asynchrone à tous les processus enfants de vider les données de traces en attente.

Les données de trace seront écrites dans `resultFilePath`. Si `resultFilePath` est vide ou non fourni, les données de trace seront écrites dans un fichier temporaire, et le chemin sera retourné dans la promesse.

### `contentTracing.getTraceBufferUsage()`

Retourne `Promise<Object>` - Résolution avec un objet contenant la `valeur` et `pourcentage` d'utilisation maximale du tampon de trace

* `value` Number
* `percentage` Number

Récupère l'utilisation maximale sur les processus de mémoire tampon trace en pourcentage de l'état complet de .
