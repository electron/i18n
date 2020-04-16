# processus (process)

> Extension de l'objet process.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

L'objet `process` d'Electron une extension de l'[objet `process` de Node.js](https://nodejs.org/api/process.html). Cela ajoute les événements, propriétés et méthodes suivantes :

## Mode bac à sable

Dans les moteurs de rendu en bac à sable, l'objet `process` ne contient qu'un sous-ensemble des APIs :
- `crash()`
- `hang()`
- `getCreationTime()`
- `getHeapStatistics()`
- `getProcessMemoryInfo()`
- `getSystemMemoryInfo()`
- `getSystemVersion()`
- `getCPUUsage()`
- `getIOCounters()`
- `argv`
- `execPath`
- `env`
- `pid`
- `arc`
- `plateforme`
- `bac à sable`
- `type`
- `version`
- `versions`
- `mas`
- `windowsStore`

## Événements

### Événement : 'loaded'

Émis lorsque Electron a chargé son script d'initialisation interne et que commence à charger la page web ou le script principal.

Il peut être utilisé par le script de préchargement pour ajouter des symboles globaux de Node supprimés à la portée globale lorsque l'intégration des noeuds est désactivée :

```javascript
// preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})
```

## Propriétés

### `process.defaultApp`

A `Boolean`. When app is started by being passed as parameter to the default app, this property is `true` in the main process, otherwise it is `undefined`.

### `process.isMainFrame`

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas`

A `Boolean`. For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### `process.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### `process.noDeprecation`

Un `Booléen` qui contrôle si oui ou non les avertissements de dépréciation sont imprimés sur `stderr`. Mettre ceci à `true` fera taire les avertissements de dépréciation. Cette propriété est utilisée à la place du drapeau `--no-deprecation`.

### `activer les PromiseAPIs`

Un `Boolean` qui contrôle si oui ou non les avertissements de dépréciation sont imprimés à `stderr` lorsque les APIs anciennement basées sur les callbacks sont convertis en Promises sont appelées en utilisant des callbacks. Définir ceci à `true` activera les avertissements de dépréciation.

### `process.resourcesPath`

Une `String` représentant le chemin vers le répertoire des ressources.

### `process.sandboxed`

A `Boolean`. When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `process.throwDeprecation`

Un `Booléen` qui contrôle si oui ou non les avertissements de dépréciation seront lancés sous forme d'exceptions . En définissant cette valeur à `true` lancera des erreurs pour les dépréciations. Cette propriété est utilisée à la place du drapeau de ligne de commande `--throw-deprecation`.

### `process.traceDeprecation`

Un `Booléen` qui contrôle si les dépréciations affichées sur `stderr` incluent leur trace de pile. En définissant cette valeur à `true` affichera les traces de piles pour les dépréciations. Cette propriété est à la place du drapeau `--trace-deprecation`.

### `process.traceProcessWarnings`
Un `Booléen` qui contrôle si oui ou non les avertissements affichés sur `stderr` incluent leur trace de pile. En définissant cette valeur à `true` affichera les traces de piles pour les avertissements de processus (y compris les dépréciations). Cette propriété est à la place du drapeau de ligne `--trace-warnings` de la commande .

### `process.type`

Une `String` représentant le type du processus courant, peut être `"browser"` (c'est-à-dire le processus principal), `"renderer"`, ou `"worker"` (c'est-à-dire le web worker).

### `process.versions.chrome`

Un `String` représentant la version de Chrome.

### `process.versions.electron`

Un `String` représentant la version d'Electron.

### `process.windowsStore`

A `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

## Méthodes

L'objet `process` dispose des méthodes suivantes :

### `process.crash()`

Cause le thread principal du processus en cours de plantage.

### `process.getCreationTime()`

Retourne `Nombre | null` - Le nombre de millisecondes depuis Epoch, ou `null` si l'information est indisponible

Indicates the creation time of the application. The time is represented as number of milliseconds since epoch. It returns null if it is unable to get the process creation time.

### `process.getCPUUsage()`

Retourne [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` _Windows_ _Linux_

Retourne [`IOCounters`](structures/io-counters.md)

### `process.getHeapStatistics()`

Retourne `Object`:

* `totalHeapSize` Integer
* `totalHeapSizeExecutable` Entier
* `Taillephysique` Entier
* `Taille totale` Entier
* `usedHeapSize` Integer
* `heapSizeLimit` Integer
* `Mémoire de malloced` Entier
* `peakMallocedMemory` Integer
* `doesZapGarbage` Boolean

Returns an object with V8 heap statistics. Notez que toutes les statistiques sont en kilo-octets.

### `process.getProcessMemoryInfo()`

Retourne `Promise<ProcessMemoryInfo>` - résout avec un [ProcessMemoryInfo](structures/process-memory-info.md)

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium ne fournit pas de valeur `residentSet` pour macOS. Ceci est dû au fait que macOS effectue une compression en mémoire des pages qui n'ont pas été récemment utilisées. En tant que résultat la valeur de la taille de la définition résident n'est pas celle qu'on pourrait attendre. `la mémoire privé` est plus représentative de l'utilisation réelle de la mémoire de pré-compression du processus sur macOS.

### `process.getSystemMemoryInfo()`

Retourne `Object`:

* `total` Integer - La quantité totale de mémoire physique dans Kilobytes disponibles pour le système .
* `libre` Integer - La quantité totale de mémoire non utilisée par les applications ou le cache du disque.
* `swapTotal` Integer _Windows_ _Linux_ - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer _Windows_ _Linux_ - The free amount of swap memory in Kilobytes available to the system.

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.getSystemVersion()`

Retourne `String` - La version du système d'exploitation hôte.

Exemples:

| Platform | Version             |
| -------- | ------------------- |
| macOS    | `10.13.6`           |
| Windows  | `10.0.17763`        |
| Linux    | `4.15.0-45-generic` |

**Remarque :** Il retourne la version réelle du système d'exploitation au lieu de la version du noyau sur macOS contrairement à `os.release()`.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Chemin vers le fichier de sortie.

Retourne `Boolean` - Indique si l'instantané a été créé avec succès.

Prend un instantané de tas V8 et l'enregistre dans `filePath`.

### `process.hang()`

Cause le fil de discussion principal du processus actuel.

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Integer

Définit la limite de programmation du descripteur de fichier à `maxDescriptors` ou la limite de dur de l'OS, quelle que soit la plus faible pour le processus en cours.
