# processus (process)

> Extension de l'objet process.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

L'objet `process` d'Electron une extension de l'[objet `process` de Node.js](https://nodejs.org/api/process.html). Cela ajoute les événements, propriétés et méthodes suivantes :

## Mode bac à sable

Dans les moteurs de rendu en bac à sable, l'objet `process` ne contient qu'un sous-ensemble des APIs :

* `crash()`
* `hang()`
* `getCreationTime()`
* `getHeapStatistics()`
* `getBlinkMemoryInfo()`
* `getProcessMemoryInfo()`
* `getSystemMemoryInfo()`
* `getSystemVersion()`
* `getCPUUsage()`
* `getIOCounters()`
* `uptime()`
* `argv`
* `execPath`
* `env`
* `pid`
* `arc`
* `plateforme`
* `bac à sable`
* `contextIsolated`
* `type`
* `version`
* `versions`
* `mas`
* `windowsStore`
* `contextId`

## Événements

### Événement : 'loaded'

Émis lorsque Electron a chargé son script d'initialisation interne et que commence à charger la page web ou le script principal.

## Propriétés

### `process.defaultApp` _Readonly_

Un `Boolean`. When app is started by being passed as parameter to the default app, this property is `true` in the main process, otherwise it is `undefined`.

### `process.isMainFrame` _Readonly_

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas` _Readonly_

Un `Boolean`. For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### `process.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### `process.noDeprecation`

Un `Booléen` qui contrôle si oui ou non les avertissements de dépréciation sont imprimés sur `stderr`. Mettre ceci à `true` fera taire les avertissements de dépréciation. Cette propriété est utilisée à la place du drapeau `--no-deprecation`.

### `process.resourcesPath` _Readonly_

Une `String` représentant le chemin vers le répertoire des ressources.

### `process.sandboxed` _Readonly_

Un `Boolean`. When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `process.contextIsolated` _Lecture seule_

A `Boolean` that indicates whether the current renderer context has `contextIsolation` enabled. It is `undefined` in the main process.

### `process.throwDeprecation`

Un `Booléen` qui contrôle si oui ou non les avertissements de dépréciation seront lancés sous forme d'exceptions . En définissant cette valeur à `true` lancera des erreurs pour les dépréciations. Cette propriété est utilisée à la place du drapeau de ligne de commande `--throw-deprecation`.

### `process.traceDeprecation`

Un `Booléen` qui contrôle si les dépréciations affichées sur `stderr` incluent leur trace de pile. En définissant cette valeur à `true` affichera les traces de piles pour les dépréciations. Cette propriété est à la place du drapeau `--trace-deprecation`.

### `process.traceProcessWarnings`

Un `Booléen` qui contrôle si oui ou non les avertissements affichés sur `stderr` incluent leur trace de pile. En définissant cette valeur à `true` affichera les traces de piles pour les avertissements de processus (y compris les dépréciations). Cette propriété est à la place du drapeau de ligne `--trace-warnings` de la commande .

### `process.type` _Readonly_

A `String` representing the current process's type, can be:

* `browser` - The main process
* `renderer` - A renderer process
* `worker` - In a web worker

### `process.versions.chrome` _Readonly_

Un `String` représentant la version de Chrome.

### `process.versions.electron` _Readonly_

Un `String` représentant la version d'Electron.

### `process.windowsStore` _Readonly_

Un `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

### `process.contextId` _Lecture seule_

A `String` (optional) representing a globally unique ID of the current JavaScript context. Each frame has its own JavaScript context. When contextIsolation is enabled, the isolated world also has a separate JavaScript context. This property is only available in the renderer process.

## Méthodes

L'objet `process` dispose des méthodes suivantes :

### `process.crash()`

Cause le thread principal du processus en cours de plantage.

### `process.getCreationTime()`

Retourne `Nombre | null` - Le nombre de millisecondes depuis Epoch, ou `null` si l'information est indisponible

Indicates the creation time of the application. Le temps est représenté par le nombre de millisecondes depuis l'epoch. It returns null if it is unable to get the process creation time.

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

### `process.getBlinkMemoryInfo()`

Retourne `Object`:

* `alloué` Integer - Taille de tous les objets alloués dans Kilobytes.
* `marked` Integer - Taille de tous les objets marqués dans Kilobytes.
* `total` Integer - Espace total alloué en kilobytes.

Returns an object with Blink memory information. It can be useful for debugging rendering / DOM related memory issues. Note that all values are reported in Kilobytes.

### `process.getProcessMemoryInfo()`

Retourne `Promise<ProcessMemoryInfo>` - résout avec un [ProcessMemoryInfo](structures/process-memory-info.md)

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium ne fournit pas de valeur `residentSet` pour macOS. Ceci est dû au fait que macOS effectue une compression en mémoire des pages qui n'ont pas été récemment utilisées. En tant que résultat la valeur de la taille de la définition résident n'est pas celle qu'on pourrait attendre. `la mémoire privé` est plus représentative de l'utilisation réelle de la mémoire de pré-compression du processus sur macOS.

### `process.getSystemMemoryInfo()`

Retourne `Object`:

* `total` Integer - La quantité totale de mémoire physique dans Kilobytes disponibles pour le système .
* `libre` Integer - La quantité totale de mémoire non utilisée par les applications ou le cache du disque.
* `swapTotal` Integer _Windows_ _Linux_ - La quantité totale de mémoire swap dans Kilobytes disponible pour le système .
* `swapFree` Integer _Windows_ _Linux_ - La quantité gratuite de mémoire swap dans Kilobytes disponible pour le système .

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.getSystemVersion()`

Retourne `String` - La version du système d'exploitation hôte.

Exemple :

```js
const version = process.getSystemVersion()
console.log(version)
// Sur macOS -> '10. 3.6'
// Sous Windows -> '10.0.17763'
// Sous Linux -> '4.15.0-45-générique'
```

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
