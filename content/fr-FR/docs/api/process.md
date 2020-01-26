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
* `totalHeapSizeExecutable` Entier
* `Taillephysique` Entier
* `Taille totale` Entier
* `usedHeapSize` Integer
* `heapSizeLimit` Integer
* `Mémoire de malloced` Entier
* `peakMallocedMemory` Integer
* `doesZapGarbage` Boolean

Retourne un objet avec des statistiques de pile V8. Notez que toutes les statistiques sont rapportées en kilobytes.

### `process.getBlinkMemoryInfo()`

Retourne `Object`:

* `alloué` Integer - Taille de tous les objets alloués dans Kilobytes.
* `marked` Integer - Taille de tous les objets marqués dans Kilobytes.
* `total` Integer - Espace total alloué en kilobytes.

Retourne un objet avec des informations de mémoire de Blink. Cela peut être utile pour déboguer les problèmes de mémoire liés au rendu / DOM. Notez que toutes les valeurs sont signalées en Kilobytes.

### `process.getProcessMemoryInfo()`

Retourne `Promise<ProcessMemoryInfo>` - résout avec un [ProcessMemoryInfo](structures/process-memory-info.md)

Retourne un objet qui donne des statistiques d'utilisation de la mémoire à propos du processus courant. Notez que toutes les statistiques sont signalées dans des Kilobytes. Cet api doit être appelé après que l'application soit prête.

Chromium ne fournit pas de valeur `residentSet` pour macOS. Ceci est dû au fait que macOS effectue une compression en mémoire des pages qui n'ont pas été récemment utilisées. En tant que résultat la valeur de la taille de la définition résident n'est pas celle qu'on pourrait attendre. `la mémoire privé` est plus représentative de l'utilisation réelle de la mémoire de pré-compression du processus sur macOS.

### `process.getSystemMemoryInfo()`

Retourne `Object`:

* `total` Integer - La quantité totale de mémoire physique dans Kilobytes disponibles pour le système .
* `libre` Integer - La quantité totale de mémoire non utilisée par les applications ou le cache du disque.
* `swapTotal` Integer *Windows* *Linux* - La quantité totale de mémoire swap dans Kilobytes disponible pour le système .
* `swapFree` Integer *Windows* *Linux* - La quantité gratuite de mémoire swap dans Kilobytes disponible pour le système .

Renvoie un objet donnant des statistiques d'utilisation de la mémoire sur l'ensemble du système. Note : que toutes les statistiques sont exprimées en kilo-octets.

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

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

Définit la limite de programmation du descripteur de fichier à `maxDescriptors` ou la limite de dur de l'OS, quelle que soit la plus faible pour le processus en cours.