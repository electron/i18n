# Briser les changements

Les changements cassants seront documentés ici, et des avertissements de dépréciations ajoutés au code JS quand possible, au moins [une version majeur](tutorial/electron-versioning.md#semver) avant que le changement soit fait.

### Types de changements de rupture

Ce document utilise la convention suivante pour catégoriser les modifications en cours :

* **API modifiée :** Une API a été modifiée de manière à ce que le code qui n'a pas été mis à jour soit garanti de lancer une exception.
* **Comportement modifié :** Le comportement d'Electron a changé, mais pas de telle manière qu'une exception soit nécessairement levée.
* **Valeur par défaut modifiée :** Le code dépendant de l'ancienne valeur par défaut peut se briser, sans nécessairement lancer une exception. L'ancien comportement peut être restauré en spécifiant explicitement la valeur.
* **Obsolète :** Une API a été marquée comme obsolète. L'API continuera à fonctionner, mais émettra une alerte de dépréciation, et sera supprimée dans une prochaine version.
* **Supprimé:** Une API ou une fonctionnalité a été supprimée, et n'est plus prise en charge par Electron.

## Changements majeurs prévus de l'API (14.0)

### Modification de l’API : `window.(open)`

Le paramètre `frameName` ne définira plus le titre de la fenêtre. Cela fait maintenant suite à la spécification décrite par [documentation native](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters) sous le paramètre correspondant `windowName`.

Si vous utilisiez ce paramètre pour définir le titre d’une fenêtre, vous pouvez plutôt utiliser [win.setTitle (titre)](https://www.electronjs.org/docs/api/browser-window#winsettitletitle).

### Retiré: `worldSafeExecuteJavaScript`

Dans Electron 14, `worldSafeExecuteJavaScript` sera supprimé.  Il n’y a pas d’alternative, vous assurer que votre code fonctionne avec cette propriété activée.  Il a été activé par défaut depuis Electron
12.

Vous serez affecté par ce changement si vous utilisez des `webFrame.executeJavaScript` ou `webFrame.executeJavaScriptInIsolatedWorld`. Vous devrez vous assurer que les valeurs retournées par l’une ou l’autre de ces méthodes sont prises en charge par le [Context Bridge API](api/context-bridge.md#parameter--error--return-type-support) car ces méthodes utilisent la même valeur passant sémantique.

## Changements majeurs prévus de l'API (13.0)

### API modifiée : `session.setPermissionCheckHandler(handler)`

Le premier paramètre `handler` des méthodes était auparavant toujours un `webContents`, il peut maintenant parfois être `null`.  Vous devez utiliser les propriétés `requestingOrigin`, `embeddingOrigin` et `securityOrigin` pour répondre correctement à la vérification des permissions.  Comme le `webContents` peut être désormais `null` , on ne peut plus s'y fier.

```js
// Ancien code:
session.setPermissionCheckHandler((webContents, permission) => {
  if (webContents.getURL().startsWith('https://google.com/') && permission === 'notification') {
    return true
  }
  return false
})

// A remplacer par:
session.setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
  if (new URL(requestingOrigin).hostname === 'google.com' && permission === 'notification') {
    return true
  }
  return false
})
```

### Supprimé: `shell.moveItemToTrash()`

L'API `shell.moveItemToTrash()` dépréciée a été supprimée. Utilisez le shell.trashItem() `asynchrone` à la place.

```js
// Supprimé dans Electron 13
shell.moveItemToTrash(path)
// Remplacer par
shell.trashItem(path).then(/* ... */)
```

### Supprimé : API `BrowserWindow` 'extension

Les API d’extension dépréciées ont été supprimées :

* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

Utilisez plutôt les API de session :

* `ses.loadExtension(path)`
* `ses.removeExtension (extension_id)`
* `ses.getAllExtensions()`

```js
Supprimé dans Electron 13
BrowserWindow.addExtension (path)
BrowserWindow.addDevToolsExtension (path)
// Remplacer par
session.defaultSession.loadExtension(path)
```

```js
Supprimé dans Electron 13
BrowserWindow.removeExtension (nom)
BrowserWindow.removeDevToolsExtension (nom)
// Remplacer par
session.defaultSession.removeExtension(extension_id)
```

```js
Supprimé dans Electron 13
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Remplacer par
session.defaultSession.getAllExtensions()
```

### Méthodes supprimées dans `systemPreferences`

Les méthodes suivantes de `systemPreferences` ont été dépréciées :

* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

Veuillez utiliser à la place les propriétés de `nativeTheme` suivantes :

* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
// Supprimée dans Electron 13
systemPreferences.isDarkMode()
// Remplacée par
nativeTheme.shouldUseDarkColors

// Supprimée dans Electron 13
systemPreferences.isInvertedColorScheme()
// Remplacée par
nativeTheme.shouldUseInvertedColorScheme

// Supprimée dans Electron 13
systemPreferences.isHighContrastColorScheme()
// Remplacée par
nativeTheme.shouldUseHighContrastColors
```

## Changements majeurs prévus de l'API (12.0)

### Supprimé: Support de Pepper Flash

Chromium a supprimé le support pour Flash, et nous devons donc suivre. Voir la feuille de route Flash [de Chromium](https://www.chromium.org/flash-roadmap) pour plus de détails.

### Modification par défaut : `worldSafeExecuteJavaScript` par défaut pour `true`

Dans Electron 12, `worldSafeExecuteJavaScript` sera activé par défaut.  Pour restaurer comportement précédent, il `worldSafeExecuteJavaScript: false` spécifié dans WebPreferences. S’il vous plaît noter que la configuration de cette option `false` est **'**.

Cette option sera supprimée dans Electron 14 donc s’il vous plaît migrer votre code pour prendre en charge la valeur par défaut.

### Par défaut modifié : `contextIsolation` par défaut à `true`

Dans Electron 12, `contextIsolation` sera activé par défaut.  Pour restaurer le comportement précédent, `contextIsolation: false` doit être spécifié dans WebPreferences.

Nous [recommandons que contextIsolation soit activé](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) pour la sécurité de votre application.

En conséquence `require()` ne peut pas être utilisé dans le processus de rendu à sauf si `nodeIntegration` est à `true` et `contextIsolation` à `false`.

Pour plus de détails, voir : https://github.com/electron/electron/issues/23506

### Retiré: `crashReporter.getCrashesDirectory()`

La `crashReporter.getCrashesDirectory` méthode a été supprimée. Les d’utilisation doivent être remplacés par `app.getPath('crashDumps')`.

```js
Supprimé dans Electron 12
crashReporter.getCrashesDirectory()
// Remplacer par
app.getPath ('crashDumps')
```

### Supprimé : `crashReporter` méthodes dans le processus de rendu

Les méthodes `crashReporter` sont plus disponibles dans le processus de rendu :

* `crashReporter.start`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

Ils ne devraient être appelés qu’à partir du processus principal.

Voir [#23265](https://github.com/electron/electron/pull/23265) plus de détails.

### Par défaut modifié : `crashReporter.start({ compress: true })`

La valeur par défaut de l'option `compresser` à `crashReporter.start` a changé de `false` à `true`. Cela signifie que les dumps plantés seront envoyés sur le serveur crash ingestion avec l'en-tête `Content-Encoding: gzip` et le corps sera compressé.

Si votre serveur d'ingestion crash ne supporte pas les charges compressées, vous pouvez désactiver la compression en spécifiant `{ compress: false }` dans les options du reporter de plantage .

### Déprécié : module` remote `

Le module `remote` est déprécié dans Electron 12, et sera supprimé dans Electron 14. Il est remplacé par le module [`@electron/remote`](https://github.com/electron/remote).

```js
// Déprécié dans Electron 12 :
const { BrowserWindow } = require('electron').remote
```

```js
Remplacer par :
const { BrowserWindow } = require('@electron/remote')

// Dans le processus principal:
require('@electron/remote/main').initialize()
```

### Déprécié : `shell.moveItemToTrash()`

La méthode synchrone `shell.moveItemToTrash() ` a été remplacée par une asynchrone `shell.trashItem() `.

```js
Déprécié dans Electron 12
shell.moveItemToTrash(path)
// Remplacer par
shell.trashItem(path).then(/* ... */)
```

## Changements majeurs prévus de l'API (11.0)

### Supprimés: `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` et `id` propriété de `BrowserView`

Les API expérimentales `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` ont maintenant été supprimées. De plus, la propriété `id` de `BrowserView` a également été supprimée.

Pour des informations plus détaillées, voir [#23578](https://github.com/electron/electron/pull/23578).

## Changements prévus de l'API (10.0)

### Déprécié : l'argument `companyName` de `crashReporter.start()`

L'argument `companyName` de `crashReporter.start()`, qui était auparavant requis, est maintenant optionnel et de plus déprécié. Pour obtenir le même comportement de manière non dépréciée, vous pouvez passer une valeur `companyName` dans `globalExtra`.

```js
// Déprécié dans Electron 10
crashReporter.start({ companyName: 'Umbrella Corporation' })
// Remplacé par
crashReporter.start({ globalExtra: { _companyName: 'Umbrella Corporation' }})
```

### Déprécié: `crashReporter.getCrashesDirectory()`

La `crashReporter.getCrashesDirectory` méthode a été dépréciée. Les d’utilisation doivent être remplacés par `app.getPath('crashDumps')`.

```js
Déprécié dans Electron 10
crashReporter.getCrashesDirectory()
// Remplacer par
app.getPath ('crashDumps')
```

### Déprécié : `crashReporter` méthodes dans le processus de rendu

Appeler les méthodes `crashReporter` du processus de rendu est déprécié :

* `crashReporter.start`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

Les seules méthodes non dépréciées restantes dans le module `crashReporter` dans le rendu sont `addExtraParameter`, `removeExtraParameter` et `getParameters`.

Toutes les méthodes ci-dessus restent non dépréciées lorsqu’elles sont appelées à partir du processus principal.

Voir [#23265](https://github.com/electron/electron/pull/23265) plus de détails.

### Obsolète : `crashReporter.start({ compress: false })`

La configuration `{ compress: false }` dans `crashReporter.start` est obsolète. Presque tous les serveurs d'ingestion plantent la compression gzip. Cette option sera retirée dans une future version d'Electron.

### Suppression : Affinité de la fenêtre de navigation

L'option `affinité` lors de la construction d'une nouvelle `BrowserWindow` sera supprimée dans le cadre de notre plan pour mieux s'aligner avec le modèle de processus de Chromium pour la sécurité, performances et maintenabilité.

Pour des informations plus détaillées, voir [#18397](https://github.com/electron/electron/issues/18397).

### Par défaut modifié : `enableRemoteModule` par défaut à `false`

Dans Electron 9, l'utilisation du module distant sans l'activer explicitement via l'option `enableRemoteModule` WebPreferences a commencé à émettre un avertissement. Dans Electron 10, le module distant est maintenant désactivé par défaut. Pour utiliser le module distant, `enableRemoteModule : true` doit être spécifié dans les WebPreferences:

```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

Nous [vous recommandons de vous éloigner du module distant](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

### `protocol.unregisterProtocol`

### `protocol.uninterceptProtocol`

Les API sont maintenant synchrones et le rappel optionnel n’est plus nécessaire.

```javascript
Deprecated
protocol.unregisterProtocol(scheme, () => { /* ... */ })
// Remplacer par
protocol.unregisterProtocol(schéma)
```

### `protocol.registerFileProtocol`

### `protocol.registerBufferProtocol`

### `protocol.registerStringProtocol`

### `protocol.registerHttpProtocol`

### `protocol.registerStreamProtocol (en)`

### `protocol.interceptFileProtocol`

### `protocol.interceptStringProtocol`

### `protocol.interceptBufferProtocol`

### `protocol.interceptHttpProtocol`

### `protocol.interceptStreamProtocol`

Les API sont maintenant synchrones et le rappel optionnel n’est plus nécessaire.

```javascript
Deprecated
protocol.registerFileProtocol (schéma, gestionnaire, () => { /* ... */ })
// Remplacer par
protocol.registerFileProtocol (schéma, gestionnaire)
```

Le protocole enregistré ou intercepté n’a pas d’effet sur la page actuelle de que la navigation se produise.

### `protocol.isProtocolHandled`

Cette API est dépréciée et les utilisateurs doivent utiliser `protocol.isProtocolRegistered` et `protocol.isProtocolIntercepted` la place.

```javascript
Deprecated
protocol.isProtocolHandled(scheme).then() => { /* ... */ })
// Remplacer par
un const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```

## Changements d'API prévus (9.0)

### Par défaut modifié : le chargement des modules natifs non contextuels dans le processus de rendu est désactivé par défaut

Depuis Electron 9, nous n'autorisons pas le chargement de modules natifs non contextuels dans le processus de rendu .  Ceci est pour améliorer la sécurité, les performances et la maintenabilité d'Electron en tant que projet.

Si cela vous impacte, vous pouvez définir temporairement `app.allowRenderererProcessReuse` à `false` pour revenir à l'ancien comportement.  Ce drapeau ne sera une option que jusqu'à Electron 11 donc vous devriez planifier de mettre à jour vos modules natifs pour être conscients du contexte.

Pour des informations plus détaillées, voir [#18397](https://github.com/electron/electron/issues/18397).

### Déprécié : `BrowserWindow` extension d’API

Les API d’extension suivantes ont été dépréciées :

* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

Utilisez plutôt les API de session :

* `ses.loadExtension(path)`
* `ses.removeExtension (extension_id)`
* `ses.getAllExtensions()`

```js
Déprécié dans Electron 9
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension (path)
// Remplacer par
session.defaultSession.loadExtension(path)
```

```js
Déprécié dans Electron 9
BrowserWindow.removeExtension (nom)
BrowserWindow.removeDevToolsExtension (nom)
// Remplacer par
session.defaultSession.removeExtension(extension_id)
```

```js
Déprécié dans Electron 9
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Remplacer par
session.defaultSession.getAllExtensions()
```

### Supprimé: `<webview>.getWebContents()`

Cette API, qui a été dépréciée dans Electron 8.0, est maintenant supprimée.

```js
// Supprimé dans Electron 9.0
webview.getWebContents()
// Remplacé par
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Supprimé: `webFrame.setLayoutZoomLevelLimits()`

Chrome a supprimé le support pour changer les limites de niveau de zoom de mise en page, et il est au-delà de la capacité d’Electron à le maintenir. La fonction a été dépréciée dans Electron 8.x, et supprimée dans Electron 9.x. Les limites de niveau de zoom de mise en page sont maintenant fixées à un minimum de 0. 5 et un maximum de 5.0, tel que défini [ici](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Comportement modifié : l'envoi d'objets non-JS via IPC lance maintenant une exception

Dans Electron 8.0, l'IPC a été modifié pour utiliser l'algorithme de clonage structuré, apportant des améliorations significatives des performances. Pour aider à faciliter la transition, l'ancien algorithme de sérialisation IPC a été conservé et utilisé pour certains objets qui ne sont pas sérialisables avec le clonage Structuré. En particulier, les objets DOM (par exemple, `Élément`, `Emplacement` et `DOMMatrix`), Node. s objets supportés par des classes C++ (par exemple `processus. nv`, certains membres de `Stream`), et les objets Electron soutenus par les classes C++ (par ex. `WebContents`, `BrowserWindow` et `WebFrame`) ne sont pas sérialisables avec Structured Clone. À chaque fois que l'ancien algorithme a été appelé, un avertissement de dépréciation a été imprimé.

Dans Electron 9. , l'ancien algorithme de sérialisation a été supprimé, et envoyer de tels objets non sérialisables lancera maintenant une erreur "l'objet n'a pas pu être cloné".

### API modifiée : `shell.openItem` est maintenant `shell.openPath`

L'API `shell.openItem` a été remplacée par une API `shell.openPath` asynchrone. Vous pouvez voir la proposition initiale de l'API et le raisonnement [ici](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Changements majeurs prévus de l'API (8.0)

### Comportement modifié : les valeurs envoyées par IPC sont maintenant sérialisées avec l'algorithme de clonage structuré

L’algorithme utilisé pour sérialiser les objets envoyés sur IPC (via `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` et les méthodes de connexes) a été passé d’un algorithme personnalisé à V8 intégré [Structured Clone Algorithm][SCA], le même algorithme utilisé pour sérialiser les messages pour `postMessage`. Cela entraîne une amélioration des performances 2x pour les messages , mais apporte également quelques changements de comportement de rupture.

* L’envoi de fonctions, promesses, weakmaps, weaksets, ou des objets contenant des telles valeurs, sur IPC va maintenant jeter une exception, au lieu de convertir silencieusement les fonctions en `undefined`.

```js
Précédemment:
ipcRenderer.send('channel', { valeur: 3, someFunction: () => {} })
// => results in { value: 3 } arriving in the main process

// From Electron 8:
ipcRenderer.send ('channel', { valeur: 3, someFunction: () => {} })
// => lance Error(« () => {} ne pouvait pas être cloné. »)
```

* `NaN`, `Infinity` et `-Infinity` seront désormais correctement sérialisés, au lieu d d’être convertis en `null`.
* Les objets contenant des références cycliques seront désormais correctement sérialisés, au lieu d’être convertis en `null`.
* `Set`, `Map`, `Error` et `RegExp` valeurs seront correctement sérialisées, au lieu d’être converties en `{}`.
* `BigInt` valeurs seront correctement sérialisées, au lieu d’être converties en `null`.
* Les tableaux clairsemés seront sérialisés en tant que tels, au lieu d’être convertis en denses avec `null`s.
* `Date` objets seront transférés en tant qu `Date` objets, au lieu d’être convertis à leur représentation de chaîne ISO.
* Les tableaux dactylographyés (tels que `Uint8Array`, `Uint16Array`, `Uint32Array` et ainsi de suite) seront transférés en tant que tels, au lieu d’être convertis en nœud.js `Buffer`.
* Les objets .js `Buffer` nœuds seront transférés `Uint8Array`s. Vous pouvez convertir un `Uint8Array` en nœud.js `Buffer` en enveloppant le `ArrayBuffer`:

```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```

Envoi d’objets qui ne sont pas des types JS natifs, tels que les objets DOM (par exemple `Element`, `Location`, `DOMMatrix`), nœud.js objets (par exemple. `process.env`, `Stream`), ou des objets électroniques (p. ex. `WebContents`, `BrowserWindow`, `WebFrame`) est déprécié. Dans Electron 8, ces objets seront sérialisés comme avant avec un message de deprecationWarning, mais à partir d’Electron 9, l’envoi de ce genre d’objets lancera une erreur « ne pouvait pas être cloné ».

### Obsolète: `<webview>.getWebContents()`

Cette API est implémentée à l’aide du module `remote` , qui a à la fois des performances des implications en matière de sécurité. Par conséquent, son utilisation doit être explicite.

```js

webview.getWebContents()
// Remplacer par
const { remote } = require ('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

Cependant, il est recommandé d’éviter d’utiliser le module `remote` tout à fait.

```js
// main
const { ipcMain, webContents } = require('electron')

const getGuestForWebContents = (webContentsId, contents) => {
  const guest = webContents. romId(webContentsId)
  si (! uest) {
    throw new Error(`Invalid webContentsId: ${webContentsId}`)
  }
  if (invité. ostWebContents ! = contents) {
    throw new Error('Accès refusé à webContents')
  }
  return guest
}

ipcMain. handle('openDevTools', (event, webContentsId) => {
  const guest = getGuestForWebContents(webContentsId, event.sender)
  invité. penDevTools()
})

// moteur de rendu
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```

### Obsolète : `webFrame.setLayoutZoomLevelLimits()`

Chrome a supprimé le support pour changer les limites de niveau de zoom de mise en page, et il est au-delà de la capacité d’Electron à le maintenir. La fonction émettra un avertissement dans Electron 8.x, et cessera d’exister dans Electron 9.x. Les limites de zoom de mise en page sont maintenant fixées à un minimum de 0,25 et un maximum de 5,0, tel que défini [ici](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Événements obsolètes dans `systemPreferences`

Les événements `systemPreferences` suivants ont été dépréciés :

* `inverted-color-scheme-changed`
* `high-contrast-color-scheme-changed`

Utilisez à la place le nouvel événement `updated` sur le module `nativeTheme`.

```js
Deprecated
systemPreferences.on ('inverted-color-scheme-changed', () => { /* ... */ })
systemPreferences.on ('high-contrast-color-scheme-changed', () => { /* ... */ })

// Remplacer par
nativeTheme.on('updated', () => { /* ... */ })
```

### Méthodes obsolètes dans `systemPreferences`

Les méthodes suivantes de `systemPreferences` ont été dépréciées :

* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

Veuillez utiliser à la place les propriétés de `nativeTheme` suivantes :

* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
// Depreciée
systemPreferences.isDarkMode()
// Remplacer par
nativeTheme.shouldUseDarkColors

// Depreciée
systemPreferences.isInvertedColorScheme()
// Remplacer par
nativeTheme.shouldUseInvertedColorScheme

// Depreciée
systemPreferences.isHighContrastColorScheme()
// Remplacer par
nativeTheme.shouldUseHighContrastColors
```

## Changements majeurs prévus de l'API (7.0)

### Obsolète : URL d'en-tête Atom.io Node

Il s’agit de l’URL spécifiée comme `disturl` dans un fichier `.npmrc` ou le flag `--dist-url` en ligne de commande lors de la compilation des modules natifs de Node.  Les deux seront pris en charge dans un avenir prévisible, mais il est recommandé que vous changez.

Déprécié : https://atom.io/download/electron

Remplacé par : https://electronjs.org/headers

### API modifiée : `session.clearAuthCache()` n'accepte plus les options

L `session.clearAuthCache` API n’accepte plus les options pour ce qu’il doit effacer, et efface au contraire inconditionnellement l’ensemble du cache.

```js
Deprecated
session.clearAuthCache ({ type: 'password' })
// Remplacer par
session.clearAuthCache()
```

### API modifiée : `powerMonitor.querySystemIdleState` est maintenant `powerMonitor.getSystemIdleState`

```js
// Supprimé dans Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Remplacer par API synchrone
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### API modifiée : `powerMonitor.querySystemIdleTime` est maintenant `powerMonitor.getSystemIdleTime`

```js
// Supprimé dans Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Remplacer par l'API synchronisée
const idleTime = powerMonitor.getSystemIdleTime()
```

### API modifiée : `webFrame.setIsolatedWorldInfo` remplace les méthodes séparées

```js
Supprimé dans Electron 7.0
webFrame.setIsolatedWorldContentSecurityPolicy (worldId, csp)
webFrame.setIsolatedWorldHumanReadableName (worldId, nom)
webFrame.setIsolatedWorldSecurityOrigin (worldId, securityOrigin)
// Remplacer par
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### Supprimé: `propriété marquée` sur `getBlinkMemoryInfo`

Cette propriété a été enlevée dans Chrome 77, et en tant que telle n’est plus disponible.

### Comportement modifié : l'attribut `webkitdirectory` pour `<input type="file"/>` liste maintenant le contenu du répertoire

La propriété `webkitdirectory` sur les entrées de fichiers HTML leur permet de sélectionner des dossiers. Les versions précédentes d’Electron avaient une implémentation incorrecte où la `event.target.files` de l’entrée a retourné un `FileList` qui a retourné un `File` correspondant au dossier sélectionné.

Depuis Electron 7, ce `FileList` est maintenant la liste de tous les fichiers contenus dans le dossier, de la même manière que Chrome, Firefox et Edge ([lien vers les docs MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

En guise d'illustration, prenez un dossier avec cette structure :

```console
dossier
├── fichier1
├── fichier2
└── fichier3
```

Dans Electron <=6, cela retournerait une `FileList` avec un objet `File` pour :

```console
chemin/vers/dossier
```

Dans Electron 7, cela retourne maintenant une `FileList` avec un objet `Fichier` pour :

```console
/chemin/vers/dossier/fichier3
/chemin/vers/dossier/fichier2
/chemin/vers/dossier/fichier1
```

Notez que `webkitdirectory` n'expose plus le chemin vers le dossier sélectionné. Si vous avez besoin du chemin vers le dossier sélectionné plutôt que le contenu du dossier, voir l’API `dialog.showOpenDialog` ([lien](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

### Modification de l’API : versions basées sur rappel d’API promisifiées

Electron 5 et Electron 6 ont introduit des versions des API asynchrones existantes basées sur les promise et déprécié leurs homologues basées sur les callback. Dans Electron 7, toutes les APIs obsolètes basées sur les callback sont maintenant supprimées.

Les fonctions suivantes ne retournent plus que des promesses :

* `app.getFileIcon()` [#15742](https://github.com/electron/electron/pull/15742)
* `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)
* `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
* `contentTracing.getTraceBufferUsage()` [#16600](https://github.com/electron/electron/pull/16600)
* `contentTracing.startRecording()` [#16584](https://github.com/electron/electron/pull/16584)
* `contentTracing.stopRecording()` [#16584](https://github.com/electron/electron/pull/16584)
* `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
* `debugger.sendCommand()` [#16861](https://github.com/electron/electron/pull/16861)
* `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
* `inAppPurchase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
* `inAppPurchase.purchaseProduct()`[#17355](https://github.com/electron/electron/pull/17355)
* `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
* `session.clearAuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
* `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
* `session.clearHostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
* `session.clearStorageData()` [#17249](https://github.com/electron/electron/pull/17249)
* `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
* `session.getCacheSize()`  [#17185](https://github.com/electron/electron/pull/17185)
* `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
* `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
* `shell.openExternal()` [#16176](https://github.com/electron/electron/pull/16176)
* `()` [#15855](https://github.com/electron/electron/pull/15855)
* `()` [#15855](https://github.com/electron/electron/pull/15855)
* `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
* `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
* `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
* `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `webFrame.executeJavaScriptInIsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
* `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `win.capturePage()` [#15743](https://github.com/electron/electron/pull/15743)

Ces fonctions ont maintenant deux formes, synchrone et asynchrone basées sur Promis:

* `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
* `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
* `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

## Changements majeurs prévus de l'API (6.0)

### API modifiée : `win.setMenu(null)` est maintenant `win.removeMenu()`

```js
Deprecated
win.setMenu (null)
// Remplacer par
win.removeMenu()
```

### API modifiée : `electron.screen` dans le processus de rendu doit être accédé via `remote`

```js
Les
nécessitent ('electron').screen
// Remplacer par
nécessitent ('electron').remote.screen
```

### API modifiée : `require()`ing node builtins in sandboxed renderers ne charge plus implicitement la version `remote`

```js
Les
dépréciées nécessitent ('child_process')
// Remplacer par
require ('electron').remote.require ('child_process')

// Deprecated
require ('fs')
// Remplacer par
require ('electron').remote.require ('fs')

// Les
dépréciées nécessitent ('os')
// Remplacer par
require ('electron').remote.require ('os')

// Deprecated
require ('path')
// Remplacer par
require ('electron').remote.require ('path')
```

### Déprécié: `powerMonitor.querySystemIdleState` remplacé par `powerMonitor.getSystemIdleState`

```js
// Déprécié
powerMonitor.querySystemIdleState(seuil, callback)
// Remplacer par API synchronisée
const idleState = powerMonitor.getSystemIdleState(seuil)
```

### Déprécié : `powerMonitor.querySystemIdleTime` remplacé par `powerMonitor.getSystemIdleTime`

```js
// Déprécié
powerMonitor.querySystemIdleTime(callback)
// Remplacer par l'API synchronisée
const idleTime = powerMonitor.getSystemIdleTime()
```

### Obsolète : `app.enableMixedSandbox()` n'est plus nécessaire

```js
Deprecated
app.enableMixedSandbox()
```

Le mode bac à sable mixte est désormais activé par défaut.

### Obsolète: `Tray.setHighlightMode`

Sous macOS Catalina, notre ancienne mise en œuvre de Tray se casse. Le substitut natif d’Apple ne prend pas en charge la modification du comportement de mise en surbrillance.

```js
Les
tray.setHighlightMode (mode)
// API seront supprimés en v7.0 sans remplacement.
```

## Changements majeurs prévus de l'API (5.0)

### Par défaut modifié : `nodeIntegration` et `webviewTag` par défaut à false, `contextIsolation` par défaut à true

Les options suivantes de `webPreferences` seront dépréciées en faveur de nouvelles valeurs par défaut listées ci-dessous.

| Propriétés         | Valeur par défaut dépréciée           | Nouvelle valeur par défaut |
| ------------------ | ------------------------------------- | -------------------------- |
| `contextIsolation` | `false`                               | `true`                     |
| `nodeIntegration`  | `true`                                | `false`                    |
| `webviewTag`       | `nodeIntegration` si mis sinon `true` | `false`                    |

Exemple : Réactivation du webviewTag

```js
const w = nouveau BrowserWindow ({
  webPreferences: {
    webviewTag: true
  }
})
```

### Comportement modifié : `nodeIntegration` dans les fenêtres enfants ouvertes via `nativeWindowOpen`

Les fenêtres enfants ouvertes avec l'option `nativeWindowOpen` auront toujours l'intégration de Node.js désactivée, sauf si `nodeIntegrationInSubFrames` est `true`.

### API modifiée : l'enregistrement des systèmes privilégiés doit maintenant être fait avant que l'application ne soit prête

Les API de processus de rendu `webFrame.registerURLSchemeAsPrivileged` et `webFrame.registerURLSchemeAsBypassingCSP` ainsi que l'API de processus de navigateur `protocol.registerStandardSchemes` ont été supprimés. Une nouvelle API, `protocol.registerSchemesAsPrivileged` a été ajoutée et devrait être utilisée pour l’enregistrement de systèmes personnalisés avec les privilèges requis. Les systèmes personnalisés doivent être enregistrés avant que l’application ne soit prête.

### Déprécié: `webFrame.setIsolatedWorld*` remplacé par `webFrame.setIsolatedWorldInfo`

```js
Deprecated
webFrame.setIsolatedWorldContentSecurityPolicy (worldId, csp)
webFrame.setIsolatedWorldHumanReadableName (worldId, nom)
webFrame.setIsolatedWorldSecurityOrigin (worldId, securityOrigin)
// Remplacer par
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### API modifiée : `webFrame.setSpellCheckProvider` prend maintenant un callback asynchrone

Le `spellCheck` rappel est maintenant asynchrone, et `autoCorrectWord` paramètre a été supprimé.

```js

webFrame.setSpellCheckProvider ('en-US', true, {
  spellCheck: (texte) => {
    return !spellchecker.isMisspelled(text)
  }
})
// Remplacer par
webFrame.setSpellCheckProvider ('en-US', {
  spellCheck: (mots, rappel) => {
    rappel (words.filter(texte => spellchecker.isMisspelled(text))
  }
})
```

### API modifiée : `webContents.getZoomLevel` et `webContents.getZoomFactor` sont désormais synchrones

`webContents.getZoomLevel` et `webContents.getZoomFactor` n'ont plus de callback en paramètre et retournent directement leurs valeur numérique.

```js
// Déprécié:
webContents.getZoomLevel((level) => {
  console.log(level)
})
// Remplacer par
const level = webContents.getZoomLevel()
console.log(level)
```

```js
// Déprécié:
webContents.getZoomLevel((level) => {
  console.log(factor)
})
// Remplacer par
const level = webContents.getZoomLevel()
console.log(factor)
```

## Changements majeurs prévus de l'API (4.0)

La liste suivant inclut les changements majeurs faits dans Electron 4.0.

### `app.makeSingleInstance`

```js
Deprecated
app.makeSingleInstance (argv, cwd) => {
  /* ... */
})
// Remplacer par
app.requestSingleInstanceLock ()
app.on ('second-instance', (événement, argv, cwd) => {
  /* ... */
})
```

### `app.releaseSingleInstance`

```js
// Déprécié
app.releaseSingleInstance()
// Remplacé par
app.releaseSingleInstanceLock()
```

### `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Now behaves the same with `basic` on macOS
app.getGPUInfo('basic')
```

### `win_delay_load_hook`

Quand vous compilez des modules natifs sous Windows, la variable `win_delay_load_hook` dans le fichier `binding.gyp` doit être mise à vrai (qui l'est par défaut). Si cet accroche n'est pas présente, l'exécution du module natif échouera sur Windows, avec un message d'erreur comme `Cannot find module`. Voir le [Guide des modules natifs](/docs/tutorial/using-native-node-modules.md) pour plus d'informations.

## Changements majeurs prévus de l'API (3.0)

La liste suivante inclut les changements majeurs pour Electron 3.0.

### `app`

```js
// Deprecated
app.getAppMemoryInfo()
// Replace with
app.getAppMetrics()

// Deprecated
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Deprecated property
```

### `BrowserWindow`

```js
// Déprécié
const optionsA = { webPreferences: { blinkFeatures: '' } }
const windowA = new BrowserWindow(optionsA)
// Remplacer par
const optionsB = { webPreferences: { enableBlinkFeatures: '' } }
const windowB = new BrowserWindow(optionsB)

// Déprécié
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // fait quelque chose
  }
})
// Remplacer par
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // fait quelque chose
  }
})
```

### `clipboard`

```js
// Déprécié
clipboard.readRtf()
// Remplacé par
clipboard.readRTF()

// Déprécié
clipboard.writeRtf()
// Remplacé par
clipboard.writeRTF()

// Déprécié
clipboard.readHtml()
// Remplacé par
clipboard.readHTML()

// Déprécié
clipboard.writeHtml()
// Remplacé par
clipboard.writeHTML()
```

### `crashReporter`

```js
// Déprécié
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Remplacé par
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

### `nativeImage`

```js
// Déprécié
nativeImage.createFromBuffer(buffer, 1.0)
// Remplacé par
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `processus (process)`

```js
// Déprécié
const info = process.getProcessMemoryInfo()
```

### `screen`

```js
// Déprécié
screen.getMenuBarHeight()
// Remplacé par
screen.getPrimaryDisplay().workArea
```

### `session`

```js

ses.setCertificateVerifyProc ((nom d’hôte, certificat, rappel) => {
  rappel (vrai)
})
// Remplacer par
ses.setCertificateVerifyProc ((demande, rappel) => {
  rappel (0)
})
```

### `Tray`

```js
// Déprécié
tray.setHighlightMode(true)
// Remplacé par
tray.setHighlightMode('on')

// Déprécié
tray.setHighlightMode(false)
// Remplacé par
tray.setHighlightMode('off')
```

### `webContents`

```js
// Déprécié
webContents.openDevTools({ detach: true })
// Remplacé par
webContents.openDevTools({ mode: 'detach' })

// Supprimé
webContents.setSize(options)
// Il n'y a pas de remplacement prévu
```

### `webFrame`

```js
// Déprécié
webFrame.registerURLSchemeAsSecure('app')
// Remplacé par
protocol.registerStandardSchemes(['app'], { secure: true })

// Déprécié
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Remplacé par
protocol.registerStandardSchemes(['app'], { secure: true })
```

### `<webview>`

```js
// Supprimé
webview.setAttribute('disableguestresize', '')
// There is no replacement for this API

// Supprimé
webview.setAttribute('guestinstance', instanceId)
// There is no replacement for this API

// Les écouteurs d'événements ne marchent plus sur les tags webview
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```

### Node Headers URL

Il s’agit de l’URL spécifiée comme `disturl` dans un fichier `.npmrc` ou le flag `--dist-url` en ligne de commande lors de la compilation des modules natifs de Node.

Déprécié : https://atom.io/download/atom-shell

Remplacé par : https://atom.io/download/electron

## Changements majeurs prévus de l'API (2.0)

La liste suivant inclut les changements majeurs faits dans Electron 2.0.

### `BrowserWindow`

```js
// Déprécié
const optionsA = { titleBarStyle: 'hidden-inset' }
const windowA = new BrowserWindow(optionsA)
// Remplacer par
const optionsB = { titleBarStyle: 'hiddenInset' }
const windowB = new BrowserWindow(optionsB)
```

### `menu`

```js
// Supprimé
menu.popup(browserWindow, 100, 200, 2)
// Remplacé par
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `nativeImage`

```js
// Supprimé
nativeImage.toPng()
// Remplacé par
nativeImage.toPNG()

// Supprimé
nativeImage.toJpeg()
// Remplacé par
nativeImage.toJPEG()
```

### `processus (process)`

* `process.versions.electron` et `process.version.chrome` seront mis en lecture seule par souci de cohérence avec la propriété `process.versions` définie par Node.

### `webContents`

```js
// Supprimé
webContents.setZoomLevelLimits(1, 2)
// Remplacé par
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
// Supprimé
webFrame.setZoomLevelLimits(1, 2)
// Remplacé par
webFrame.setVisualZoomLevelLimits(1, 2)
```

### `<webview>`

```js
// Supprimé
webview.setZoomLevelLimits(1, 2)
// Remplacé par
webview.setVisualZoomLevelLimits(1, 2)
```

### Versions ARM dupliquées

Chaque version d'Electron contient deux versions ARM identiques avec des noms légèrement différents, comme `electron-v1.7.3-linux-arm.zip` et `electron-v1.7.3-linux-armv7l.zip`. Celui avec le préfixe `v7l` a été ajouté pour clarifier aux utilisateurs quelle version ARM elle supporte, et supprimer les ambiguïtés des prochains paquets armv6l et arm64 qui pourraient être produites.

Le fichier _sans le préfixe_ est toujours publié afin d'éviter de casser les installations qui pourraient l'utiliser. À partir de 2.0, le fichier non ne sera plus publié.

Pour plus de détails, voir [6986](https://github.com/electron/electron/pull/6986) et [7189](https://github.com/electron/electron/pull/7189).

[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
