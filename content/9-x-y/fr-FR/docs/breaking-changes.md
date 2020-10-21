# Breaking Changes

Les changements cassants seront documentés ici, et des avertissements de dépréciations ajoutés au code JS quand possible, au moins [une version majeur](tutorial/electron-versioning.md#semver) avant que le changement soit fait.

### Types de changements de rupture

Ce document utilise la convention suivante pour catégoriser les modifications en cours :

- **API modifiée :** Une API a été modifiée de manière à ce que le code qui n'a pas été mis à jour soit garanti de lancer une exception.
- **Comportement modifié :** Le comportement d'Electron a changé, mais pas de telle manière qu'une exception soit nécessairement levée.
- **Valeur par défaut modifiée :** Le code dépendant de l'ancienne valeur par défaut peut se briser, sans nécessairement lancer une exception. L'ancien comportement peut être restauré en spécifiant explicitement la valeur.
- **Obsolète :** Une API a été marquée comme obsolète. L'API continuera à fonctionner, mais émettra une alerte de dépréciation, et sera supprimée dans une prochaine version.
- **Supprimé:** Une API ou une fonctionnalité a été supprimée, et n'est plus prise en charge par Electron.

## Changements majeurs prévus de l'API (12.0)

### Removed: `crashReporter` methods in the renderer process

The following `crashReporter` methods are no longer available in the renderer process:

- `crashReporter.start`
- `crashReporter.getLastCrashReport`
- `crashReporter.getUploadedReports`
- `crashReporter.getUploadToServer`
- `crashReporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

They should be called only from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

## Changements majeurs prévus de l'API (11.0)

## Changements majeurs prévus de l'API (10.0)

### Déprécié : l'argument `companyName` de `crashReporter.start()`

L'argument `companyName` de `crashReporter.start()`, qui était auparavant requis, est maintenant optionnel et de plus déprécié. Pour obtenir le même comportement de manière non dépréciée, vous pouvez passer une valeur `companyName` dans `globalExtra`.

```js
// Déprécié dans Electron 10
crashReporter.start({ companyName: 'Umbrella Corporation' })
// Remplacé par
crashReporter.start({ globalExtra: { _companyName: 'Umbrella Corporation' }})
```

### Deprecated: `crashReporter.getCrashesDirectory()`

The `crashReporter.getCrashesDirectory` method has been deprecated. Usage should be replaced by `app.getPath('crashDumps')`.

```js
// Deprecated in Electron 10
crashReporter.getCrashesDirectory()
// Replace with
app.getPath('crashDumps')
```

### Deprecated: `crashReporter` methods in the renderer process

Calling the following `crashReporter` methods from the renderer process is deprecated:

- `crashReporter.start`
- `crashReporter.getLastCrashReport`
- `crashReporter.getUploadedReports`
- `crashReporter.getUploadToServer`
- `crashReporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

The only non-deprecated methods remaining in the `crashReporter` module in the renderer are `addExtraParameter`, `removeExtraParameter` and `getParameters`.

All above methods remain non-deprecated when called from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### Suppression : Browser Window Affinity

L'option `affinity` lors de l'instanciation d'une nouvelle `BrowserWindow` sera supprimée dans le cadre de notre plan d'alignement sur le modèle de processus de Chromium à des fins de sécurité, performances et maintenabilité.

Pour des informations plus détaillées, voir [#18397](https://github.com/electron/electron/issues/18397).

### Valeur par défaut modifié : `enableRemoteModule`est par défaut à `false`

Dans Electron 9, l'utilisation du module remote sans l'activer explicitement via l'option `enableRemoteModule` de WebPreferences émet dès maintenant un avertissement. Avec Electron 10, le module remote est dès maintenant désactivé par défaut. Pour utiliser le module remote, on doit spécifier `enableRemoteModule : true` dans les WebPreferences:

```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

Nous vous recommandons d'éviter d'utiliser le module [distant](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

### `protocol.unregisterProtocol`
### `protocol.uninterceptProtocol`

Les API sont désormais synchrones donc la callback qui était facultative n'est plus nécessaire.

```javascript
// Deprecated
protocol.unregisterProtocol(scheme, () => { /* ... */ })
// Replace with
protocol.unregisterProtocol(scheme)
```

### `protocol.registerFileProtocol`
### `protocol.registerBufferProtocol`
### `protocol.registerStringProtocol`
### `protocol.registerHttpProtocol`
### `protocol.registerStreamProtocol`
### `protocol.interceptFileProtocol`
### `protocol.interceptStringProtocol`
### `protocol.interceptBufferProtocol`
### `protocol.interceptHttpProtocol`
### `protocol.interceptStreamProtocol`

Les API sont désormais synchrones donc la callback qui était facultative n'est plus nécessaire.

```javascript
// Deprecated
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// Replace with
protocol.registerFileProtocol(scheme, handler)
```

Le protocole enregistré ou intercepté n'a pas d'effet sur la page actuelle tant que la navigation n'a pas eu lieu.

### `protocol.isProtocolHandled`

Cette API est dépréciée et les utilisateurs doivent utiliser à la place `protocol.isProtocolRegistered` et `protocol.isProtocolIntercepted`.

```javascript
// Deprecated
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Replace with
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```

## Changements majeurs prévus de l'API (9.0)

### Fonctionnement par défaut modifié : le chargement des modules natifs non contextuels dans le processus de rendu est désactivé par défaut

À partir d’Electron 9, nous n’autorisons plus le chargement de modules natifs insensibles au contexte dans le processus de rendu.  Ceci est pour améliorer la sécurité, les performances et la maintenabilité d'Electron en tant que projet.

Si cela vous affecte, vous pouvez définir temporairement `app.allowRendererProcessReuse` pour `faux` pour revenir à l’ancien comportement.  Ce drapeau ne sera une option que jusqu'à Electron 11 donc vous devriez planifier de mettre à jour vos modules natifs pour être sensible au contexte.

Pour des informations plus détaillées, voir [#18397](https://github.com/electron/electron/issues/18397).

### Supprimé: `<webview>.getWebContents()`

Cette API, qui a été dépréciée dans Electron 8.0, est désormais supprimée.

```js
// Supprimé dans Electron 9.0
webview.getWebContents()
// Remplacé par
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Supprimé: `webFrame.setLayoutZoomLevelLimits()`

Chrome a supprimé la prise en charge pour modifier les limites de niveau de zoom de mise en page et il n'est plus possible pour Electron de le maintenir. La fonction a été dépréciée dans Electron 8.x, et supprimée dans Electron 9.x. Les limites de niveau de zoom de mise en page sont maintenant fixées à un minimum de 0. 5 et un maximum de 5.0, tel que défini [ici](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Comportement modifié : l’envoi d’objets non-JS au travers d' IPC déclenche maintenant une exception

Dans Electron 8.0, l'IPC a été modifié pour utiliser l'algorithme Structured Clone , apportant des améliorations significatives des performances. Pour aider à faciliter la transition, l'ancien algorithme de sérialisation IPC a été conservé et utilisé pour certains objets qui ne sont pas sérialisables avec le clonage Structuré. En particulier, les objets DOM (par exemple, `Élément`, `Emplacement` et `DOMMatrix`), Node. s objets supportés par des classes C++ (par exemple `processus. nv`, certains membres de `Stream`), et les objets Electron soutenus par les classes C++ (par ex. `WebContents`, `BrowserWindow` et `WebFrame`) ne sont pas sérialisables avec Structured Clone. À chaque fois que l'ancien algorithme a été appelé, un avertissement de dépréciation a été imprimé.

Dans Electron 9. , l'ancien algorithme de sérialisation a été supprimé, et envoyer de tels objets non sérialisables lancera maintenant une erreur "l'objet n'a pas pu être cloné".

### API modifiée : `shell.openItem` est maintenant `shell.openPath`

L'API `shell.openItem` a été remplacée par une API `shell.openPath` asynchrone. Vous pouvez voir la proposition initiale de l'API et le raisonnement [ici](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Changements majeurs prévus de l'API (8.0)

### Comportement modifié : les valeurs envoyées par IPC sont maintenant sérialisées avec l'algorithme de clonage structuré

L'algorithme utilisé pour sérialiser les objets envoyés par IPC (via `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents. les méthodes de fin` et associées) est passé d'un algorithme personnalisé à l'algorithme intégré de V8 [Structured Clone Algorithm][SCA] qui est déja utilisé pour sérialiser les messages dans `postMessage`. Cela entraîne une amélioration dans un rapport 2 des performances en ce qui concerne les messages de grande taille, mais apporte également quelques changements de rupture dans le comportement.

- Sending Functions, Promises, WeakMaps, WeakSets, or objects containing any such values, over IPC will now throw an exception, instead of silently converting the functions to `undefined`.
```js
// Previously:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => results in { value: 3 } arriving in the main process

// From Electron 8:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => throws Error("() => {} could not be cloned.")
```
- `NaN`, `Infinity` and `-Infinity` will now be correctly serialized, instead of being converted to `null`.
- Objects containing cyclic references will now be correctly serialized, instead of being converted to `null`.
- `Set`, `Map`, `Error` and `RegExp` values will be correctly serialized, instead of being converted to `{}`.
- `BigInt` values will be correctly serialized, instead of being converted to `null`.
- Sparse arrays will be serialized as such, instead of being converted to dense arrays with `null`s.
- `Date` objects will be transferred as `Date` objects, instead of being converted to their ISO string representation.
- Typed Arrays (such as `Uint8Array`, `Uint16Array`, `Uint32Array` and so on) will be transferred as such, instead of being converted to Node.js `Buffer`.
- Node.js `Buffer` objects will be transferred as `Uint8Array`s. You can convert a `Uint8Array` back to a Node.js `Buffer` by wrapping the underlying `ArrayBuffer`:
```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```

Sending any objects that aren't native JS types, such as DOM objects (e.g. `Element`, `Location`, `DOMMatrix`), Node.js objects (e.g. `process.env`, `Stream`), or Electron objects (e.g. `WebContents`, `BrowserWindow`, `WebFrame`) is deprecated. In Electron 8, these objects will be serialized as before with a DeprecationWarning message, but starting in Electron 9, sending these kinds of objects will throw a 'could not be cloned' error.

### Obsolète: `<webview>.getWebContents()`

This API is implemented using the `remote` module, which has both performance and security implications. Par conséquent, son utilisation doit être explicite.

```js
// Deprecated
webview.getWebContents()
// Replace with
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

Cependant, il est recommandé d'éviter d'utiliser le module `remote`.

```js
// main
const { ipcMain, webContents } = require('electron')

const getGuestForWebContents = (webContentsId, contents) => {
  const guest = webContents. romId(webContentsId)
  si (! uest) {
    throw new Error(`Invalid webContentsId: ${webContentsId}`)
  }
  if (invité. ostWebContents ! = contents) {
    throw new Error(`Access denied to webContents`)
  }
  return guest
}

ipcMain. andle('openDevTools', (event, webContentsId) => {
  const guest = getGuestForWebContents(webContentsId, event.sender)
  invité. penDevTools()
})

// moteur de rendu
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```

### Obsolète : `webFrame.setLayoutZoomLevelLimits()`

Chrome a supprimé la prise en charge pour modifier les limites de niveau de zoom de mise en page et il n'est plus possible pour Electron de le maintenir. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

## Changements majeurs prévus de l'API (7.0)

### Obsolète : URL d'en-tête Atom.io Node

Il s’agit de l’URL spécifiée comme `disturl` dans un fichier `.npmrc` ou le flag `--dist-url` en ligne de commande lors de la compilation des modules natifs de Node.  Both will be supported for the foreseeable future but it is recommended that you switch.

Déprécié : https://atom.io/download/electron

Remplacé par : https://electronjs.org/headers

### API modifiée : `session.clearAuthCache()` n'accepte plus les options

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### API modifiée : `powerMonitor.querySystemIdleState` est maintenant `powerMonitor.getSystemIdleState`

```js
// Supprimé dans Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Remplacer par API synchrone
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### API modifiée : `powerMonitor.querySystemIdleTime` est maintenant `powerMonitor.getSystemIdleState`

```js
// Supprimé dans Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Remplacer par l'API synchronisée
const idleTime = powerMonitor.getSystemIdleTime()
```

### API modifiée : `webFrame.setIsolatedWorldInfo` remplace les méthodes séparées

```js
// Removed in Electron 7.0
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Replace with
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### Supprimé: `propriété marquée` sur `getBlinkMemoryInfo`

Cette propriété a été supprimée dans Chromium 77 et n'est donc plus disponible.

### Comportement modifié : l'attribut `webkitdirectory` pour `<input type="file"/>` liste maintenant le contenu du répertoire

La propriété `webkitdirectory` sur les entrées de fichiers HTML leur permet de sélectionner des dossiers. Dans les versions précédentes d'Electron l'implémentation était incorrecte et la propriété `event.target.files` de l'input retournait une `FileList` qui retournait un objet `File` correspondant au dossier sélectionné.

Depuis Electron 7, ce `FileList` est maintenant la liste de tous les fichiers contenus dans le dossier, de la même manière que Chrome, Firefox et Edge ([lien vers les docs MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

En guise d'illustration, considérez un dossier avec cette structure :
```console
dossier
├── fichier1
├── fichier2
└── fichier3
```

Dans Electron < 6, cela renverrait une` FileList` avec un objet` File `pour :
```console
chemin/vers/dossier
```

Dans Electron 7, cela renvoie maintenant une` FileList` avec un objet` File `pour :
```console
/chemin/vers/dossier/fichier3
/chemin/vers/dossier/fichier2
/chemin/vers/dossier/fichier1
```

Notez que `webkitdirectory` n'expose plus le chemin vers le dossier sélectionné. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Changements majeurs prévus de l'API (6.0)

### API modifiée : `win.setMenu(null)` est maintenant `win.removeMenu()`

```js
// Déprécié
win.setMenu(null)
// Remplacé par
win.removeMenu()
```

### API modifiée : `contentTracing.getTraceBufferUsage()` est maintenant une promesse

```js
// Deprecated
contentTracing.getTraceBufferUsage((percentage, value) => {
  // do something
})
// Replace with
contentTracing.getTraceBufferUsage().then(infoObject => {
  // infoObject has percentage and value fields
})
```

### API modifiée : `electron.screen` dans le processus de rendu doit être accédé via `remote`

```js
// Deprecated
require('electron').screen
// Replace with
require('electron').remote.screen
```

### API modifiée : `require()`ing node builtins in sandboxed renderers ne charge plus implicitement la version `remote`

```js
// Deprecated
require('child_process')
// Replace with
require('electron').remote.require('child_process')

// Deprecated
require('fs')
// Replace with
require('electron').remote.require('fs')

// Deprecated
require('os')
// Replace with
require('electron').remote.require('os')

// Deprecated
require('path')
// Replace with
require('electron').remote.require('path')
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
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### Obsolète: `Tray.setHighlightMode`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

## Changements majeurs prévus de l'API (5.0)

### Par défaut modifié : `nodeIntegration` et `webviewTag` par défaut à false, `contextIsolation` par défaut à true

Les options suivantes de `webPreferences` seront dépréciées en faveur de nouvelles valeurs par défaut listées ci-dessous.

| Propriétés         | Valeur par défaut dépréciée           | Nouvelle valeur par défaut |
| ------------------ | ------------------------------------- | -------------------------- |
| `contextIsolation` | `false`                               | `true`                     |
| `nodeIntegration`  | `true`                                | `false`                    |
| `webviewTag`       | `nodeIntegration` si mis sinon `true` | `false`                    |

Exemple : Re-enabling the webviewTag

```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```

### Comportement modifié : `nodeIntegration` dans les fenêtres enfants ouvertes via `nativeWindowOpen`

Les fenêtres enfants ouvertes avec l'option `nativeWindowOpen` auront toujours Node.js integration désactivée, sauf si `nodeIntegrationInSubFrames` est à `true`.

### API modifiée : l'enregistrement des systèmes privilégiés doit maintenant être fait avant que l'application ne soit prête

Les API de processus de rendu `webFrame.registerURLSchemeAsPrivileged` et `webFrame.registerURLSchemeAsBypassingCSP` ainsi que l'API de processus de navigateur `protocol.registerStandardSchemes` ont été supprimés. A new API, `protocol.registerSchemesAsPrivileged` has been added and should be used for registering custom schemes with the required privileges. Custom schemes are required to be registered before app ready.

### Déprécié: `webFrame.setIsolatedWorld*` remplacé par `webFrame.setIsolatedWorldInfo`

```js
// Deprecated
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Replace with
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### API modifiée : `webFrame.setSpellCheckProvider` prend maintenant un callback asynchrone
The `spellCheck` callback is now asynchronous, and `autoCorrectWord` parameter has been removed.
```js
// Deprecated
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck: (text) => {
    return !spellchecker.isMisspelled(text)
  }
})
// Replace with
webFrame.setSpellCheckProvider('en-US', {
  spellCheck: (words, callback) => {
    callback(words.filter(text => spellchecker.isMisspelled(text)))
  }
})
```

## Changements majeurs prévus de l'API (4.0)

La liste suivant inclut les changements majeurs faits dans Electron 4.0.

### `app.makeSingleInstance`

```js
// Deprecated
app.makeSingleInstance((argv, cwd) => {
  /* ... */
})
// Replace with
app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
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
let optionsA = { webPreferences: { blinkFeatures: '' } }
let windowA = new BrowserWindow(optionsA)
// Replace with
let optionsB = { webPreferences: { enableBlinkFeatures: '' } }
let windowB = new BrowserWindow(optionsB)

// Déprécié
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // do something
  }
})
// Remplacé par
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // do something
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
// Deprecated
ses.setCertificateVerifyProc((hostname, certificate, callback) => {
  callback(true)
})
// Replace with
ses.setCertificateVerifyProc((request, callback) => {
  callback(0)
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
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Remplacé par
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
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

Le fichier _sans le préfixe_ est toujours publié afin d'éviter de casser les installations qui pourraient l'utiliser. Starting at 2.0, the unprefixed file will no longer be published.

Pour plus de détails, voir [6986](https://github.com/electron/electron/pull/6986) et [7189](https://github.com/electron/electron/pull/7189).

[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
