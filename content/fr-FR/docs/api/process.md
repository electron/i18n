# processus (process)

> Extension de l'objet process.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

L'objet `process` d'Electron une extension de l'[objet `process` de Node.js](https://nodejs.org/api/process.html). Cela ajoute les événements, propriétés et méthodes suivantes :

## Sandbox

In sandboxed renderers the `process` object contains only a subset of the APIs:

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
* `argv`
* `execPath`
* `env`
* `pid`
* `arc`
* `plateforme`
* `bac à sable`
* `type`
* `version`
* `versions`
* `mas`
* `windowsStore`

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

### `process.defaultApp` *Readonly*

A `Booléen`. Lorsque l'application démarre en passant comme paramètre à l'application par défaut, cette propriété est `true` dans le processus principal, sinon elle est `undefined`.

### `process.isMainFrame` *Readonly*

A `Booléen`, `true` lorsque le contexte du moteur de rendu actuel est le cadre du moteur de rendu "main". Si vous voulez l'ID de la frame courante, vous devez utiliser `webFrame.routingId`.

### `process.mas` *Readonly*

Une `Boolean`. Pour la construction de l'App Store Mac, cette propriété est `true`, pour les autres builds, elle est `undefined`.

### `process.noAsar`

Un `Booléen` qui contrôle le support ASAR dans votre application. Définir ceci à `true` désactivera le support des archives `asar` dans les modules intégrés de Node.

### `process.noDeprecation`

Un `Booléen` qui contrôle si oui ou non les avertissements de dépréciation sont imprimés sur `stderr`. Mettre ceci à `true` fera taire les avertissements de dépréciation. Cette propriété est utilisée à la place du drapeau `--no-deprecation`.

### `activer les PromiseAPIs`

Un `Boolean` qui contrôle si oui ou non les avertissements de dépréciation sont imprimés à `stderr` lorsque les APIs anciennement basées sur les callbacks sont convertis en Promises sont appelées en utilisant des callbacks. Définir ceci à `true` activera les avertissements de dépréciation.

### `process.resourcesPath` *Readonly*

Une `String` représentant le chemin vers le répertoire des ressources.

### `process.sandboxed` *Readonly*

A `Boolean`. Lorsque le processus de rendu est en bac à sable, cette propriété est `true`, sinon elle est `undefined`.

### `process.throwDeprecation`

Un `Booléen` qui contrôle si oui ou non les avertissements de dépréciation seront lancés sous forme d'exceptions . En définissant cette valeur à `true` lancera des erreurs pour les dépréciations. Cette propriété est utilisée à la place du drapeau de ligne de commande `--throw-deprecation`.

### `process.traceDeprecation`

Un `Booléen` qui contrôle si les dépréciations affichées sur `stderr` incluent leur trace de pile. En définissant cette valeur à `true` affichera les traces de piles pour les dépréciations. Cette propriété est à la place du drapeau `--trace-deprecation`.

### `process.traceProcessWarnings`

Un `Booléen` qui contrôle si oui ou non les avertissements affichés sur `stderr` incluent leur trace de pile. En définissant cette valeur à `true` affichera les traces de piles pour les avertissements de processus (y compris les dépréciations). Cette propriété est à la place du drapeau de ligne `--trace-warnings` de la commande .

### `process.type` *Readonly*

Une `String` représentant le type du processus courant, peut être `"browser"` (c'est-à-dire le processus principal), `"renderer"`, ou `"worker"` (c'est-à-dire le web worker).

### `process.versions.chrome` *Readonly*

Un `String` représentant la version de Chrome.

### `process.versions.electron` *Readonly*

Un `String` représentant la version d'Electron.

### `process.windowsStore` *Readonly*

A `Booléen`. Si l'application fonctionne sous la forme d'une application Windows Store (appx), cette propriété est `true`, sinon elle est `indéfinie`.

## Méthodes

L'objet `process` dispose des méthodes suivantes :

### `process.crash()`

Cause le thread principal du processus en cours de plantage.

### `process.getCreationTime()`

Retourne `Nombre | null` - Le nombre de millisecondes depuis Epoch, ou `null` si l'information est indisponible

Indique le temps de création de l'application. L'heure est représentée par le nombre de millisecondes depuis l'époque. Il retourne Null s'il est impossible d'obtenir le temps de création du processus.

### `process.getCPUUsage()`

Retourne [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

Retourne [`IOCounters`](structures/io-counters.md)

### `process.getHeapStatistics()`

Retourne `Object`:

* `totalHeapSize` Integer
* `totalHeapSizeExecutable` Integer
* `totalPhysicalSize` Integer
* `totalAvailableSize` Integer
* `usedHeapSize` Integer
* `heapSizeLimit` Integer
* `mallocedMemory` Integer
* `peakMallocedMemory` Integer
* `doesZapGarbage` Boolean

Returns an object with V8 heap statistics. Note that all statistics are reported in Kilobytes.

### `process.getBlinkMemoryInfo()`

Retourne `Object`:

* `allocated` Integer - Size of all allocated objects in Kilobytes.
* `marked` Integer - Size of all marked objects in Kilobytes.
* `total` Integer - Total allocated space in Kilobytes.

Returns an object with Blink memory information. It can be useful for debugging rendering / DOM related memory issues. Note that all values are reported in Kilobytes.

### `process.getProcessMemoryInfo()`

Returns `Promise<ProcessMemoryInfo>` - Resolves with a [ProcessMemoryInfo](structures/process-memory-info.md)

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium does not provide `residentSet` value for macOS. This is because macOS performs in-memory compression of pages that haven't been recently used. As a result the resident set size value is not what one would expect. `private` memory is more representative of the actual pre-compression memory usage of the process on macOS.

### `process.getSystemMemoryInfo()`

Retourne `Object`:

* `total` Integer - The total amount of physical memory in Kilobytes available to the system.
* `free` Integer - The total amount of memory not being used by applications or disk cache.
* `swapTotal` Integer *Windows* *Linux* - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer *Windows* *Linux* - The free amount of swap memory in Kilobytes available to the system.

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.getSystemVersion()`

Returns `String` - The version of the host operating system.

Exemple :

```js
const version = process.getSystemVersion()
console.log(version)
// On macOS -> '10.13.6'
// On Windows -> '10.0.17763'
// On Linux -> '4.15.0-45-generic'
```

**Note:** It returns the actual operating system version instead of kernel version on macOS unlike `os.release()`.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

### `process.hang()`

Causes the main thread of the current process hang.

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

Sets the file descriptor soft limit to `maxDescriptors` or the OS hard limit, whichever is lower for the current process.