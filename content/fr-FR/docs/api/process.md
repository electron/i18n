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
- `getBlinkMemoryInfo()`
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

### `process.defaultApp` _Readonly_

Un `Boolean`. Lorsque l’application est commencée en étant passé comme paramètre à l’application par défaut, cette propriété est `true` dans le processus principal, sinon il est `undefined`.

### `process.isMainFrame` _Readonly_

Un `Boolean`, `true` lorsque le contexte de rendu actuel est le rendu « principal » cadre. Si vous voulez l’ID du cadre actuel, vous devez utiliser `webFrame.routingId`.

### `process.mas` _Readonly_

Un `Boolean`. Pour Mac App Store construire, cette propriété est `true`, pour d’autres constructions, il est `undefined`.

### `process.noAsar`

Une `Boolean` contrôle le support ASAR à l’intérieur de votre application. Le réglage de `true` 'il désactivera le support `asar` archives dans les modules intégrés de Node.

### `process.noDeprecation`

Un `Booléen` qui contrôle si oui ou non les avertissements de dépréciation sont imprimés sur `stderr`. Mettre ceci à `true` fera taire les avertissements de dépréciation. Cette propriété est utilisée à la place du drapeau `--no-deprecation`.

### `process.resourcesPath` _Readonly_

Une `String` représentant le chemin vers le répertoire des ressources.

### `process.sandboxed` _Readonly_

Un `Boolean`. Lorsque le processus de rendu est bac à sable, cette propriété est `true`, sinon il est `undefined`.

### `process.throwDeprecation`

Un `Booléen` qui contrôle si oui ou non les avertissements de dépréciation seront lancés sous forme d'exceptions . En définissant cette valeur à `true` lancera des erreurs pour les dépréciations. Cette propriété est utilisée à la place du drapeau de ligne de commande `--throw-deprecation`.

### `process.traceDeprecation`

Un `Booléen` qui contrôle si les dépréciations affichées sur `stderr` incluent leur trace de pile. En définissant cette valeur à `true` affichera les traces de piles pour les dépréciations. Cette propriété est à la place du drapeau `--trace-deprecation`.

### `process.traceProcessWarnings`

Un `Booléen` qui contrôle si oui ou non les avertissements affichés sur `stderr` incluent leur trace de pile. En définissant cette valeur à `true` affichera les traces de piles pour les avertissements de processus (y compris les dépréciations). Cette propriété est à la place du drapeau de ligne `--trace-warnings` de la commande .

### `process.type` _Readonly_

Un `String` représentant le type de processus actuel, peut être :

* `browser` - Le processus principal
* `renderer` - Un processus de rendu
* `worker` - Dans un travailleur web

### `process.versions.chrome` _Readonly_

Un `String` représentant la version de Chrome.

### `process.versions.electron` _Readonly_

Un `String` représentant la version d'Electron.

### `process.windowsStore` _Readonly_

Un `Boolean`. Si l’application est en cours d’exécution comme une application du Windows Store (appx), cette propriété est `true`, pour sinon il est `undefined`.

## Méthodes

L'objet `process` dispose des méthodes suivantes :

### `process.crash()`

Cause le thread principal du processus en cours de plantage.

### `process.getCreationTime()`

Retourne `Nombre | null` - Le nombre de millisecondes depuis Epoch, ou `null` si l'information est indisponible

Indique le temps de création de l’application. Le temps est représenté par le nombre de millisecondes depuis l'epoch. Il revient nul s’il n’est pas en mesure d’obtenir le temps de création du processus.

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

Renvoie un objet avec des statistiques de tas V8. Notez que toutes les statistiques sont en kilo-octets.

### `process.getBlinkMemoryInfo()`

Retourne `Object`:

* `alloué` Integer - Taille de tous les objets alloués dans Kilobytes.
* `marked` Integer - Taille de tous les objets marqués dans Kilobytes.
* `total` Integer - Espace total alloué en kilobytes.

Renvoie un objet avec des informations mémoire Blink. Il peut être utile pour débogage du rendu / DOM questions de mémoire connexes. Notez que toutes les valeurs sont rapportées dans Kilobytes.

### `process.getProcessMemoryInfo()`

Retourne `Promise<ProcessMemoryInfo>` - résout avec un [ProcessMemoryInfo](structures/process-memory-info.md)

Renvoie un objet donnant des statistiques d’utilisation de mémoire sur le processus actuel. Notez toutes les statistiques sont rapportées dans Kilobytes. Cette api doit être appelée après que l’application soit prête.

Chromium ne fournit pas de valeur `residentSet` pour macOS. Ceci est dû au fait que macOS effectue une compression en mémoire des pages qui n'ont pas été récemment utilisées. En tant que résultat la valeur de la taille de la définition résident n'est pas celle qu'on pourrait attendre. `la mémoire privé` est plus représentative de l'utilisation réelle de la mémoire de pré-compression du processus sur macOS.

### `process.getSystemMemoryInfo()`

Retourne `Object`:

* `total` Integer - La quantité totale de mémoire physique dans Kilobytes disponibles pour le système .
* `libre` Integer - La quantité totale de mémoire non utilisée par les applications ou le cache du disque.
* `swapTotal` Integer _Windows_ _Linux_ - La quantité totale de mémoire swap dans Kilobytes disponible pour le système .
* `swapFree` Integer _Windows_ _Linux_ - La quantité gratuite de mémoire swap dans Kilobytes disponible pour le système .

Renvoie un objet donnant des statistiques d’utilisation de mémoire sur l’ensemble du système. Notez toutes les statistiques sont rapportées dans Kilobytes.

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
