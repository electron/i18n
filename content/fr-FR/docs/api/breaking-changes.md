# Contrat d'API

Les changements cassants seront documentés ici, et des avertissements de dépréciations ajoutés au code JS quand possible, au moins [une version majeur](../tutorial/electron-versioning.md#semver) avant que le changement soit fait.

# commentaires `FIXME`

La string `FIXME` est utilisée en commentaires codes afin de noter les choses qui devraient être fixées dans les prochaines versions. Voir <https://github.com/electron/electron/search?q=fixme>

# Changements majeurs prévus de l'API (5.0)

## `new BrowserWindow({ webPreferences })`

Les options suivantes de `webPreferences` seront dépréciées en faveur de nouvelles valeurs par défaut listées ci-dessous.

| Propriétés         | Valeur par défaut dépréciée           | Nouvelle valeur par défaut |
| ------------------ | ------------------------------------- | -------------------------- |
| `contextIsolation` | `false`                               | `true`                     |
| `nodeIntegration`  | `true`                                | `false`                    |
| `webviewTag`       | `nodeIntegration` si mis sinon `true` | `false`                    |

## `nativeWindowOpen`

La fenêtre enfant ouverte avec l'option `nativeWindowOpen` aura toujours l'intégration de Node.js désactivée.

## `webContents.findInPage(text[, options])`

Les options `wordStart` et `medialCapitalAsWordStart` sont supprimées.

# Changements majeurs prévus de l'API (4.0)

La liste suivante contient les changements cassants prévus pour Electron 4.0.

## `app.makeSingleInstance`

```js
// Deprecated
app.makeSingleInstance(function (argv, cwd) {

})
// Replace with
app.requestSingleInstanceLock()
app.on('second-instance', function (event, argv, cwd) {

})
```

## `app.releaseSingleInstance`

```js
// Déprécié
app.releaseSingleInstance()
// Remplacé par
app.releaseSingleInstanceLock()
```

## `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Now behaves the same with `basic` on macOS
app.getGPUInfo('basic')
```

## `win_delay_load_hook`

Quand vous compilez des modules natifs sous Windows, la variable `win_delay_load_hook` dans le fichier `binding.gyp` doit être mise à vrai (qui l'est par défaut). If this hook is not present, then the native module will fail to load on Windows, with an error message like `Cannot find module`. See the [native module guide](/docs/tutorial/using-native-node-modules.md) for more.

# Breaking API Changes (3.0)

The following list includes the breaking API changes in Electron 3.0.

## `app`

```js
// Deprecated
app.getAppMemoryInfo()
// Replace with
app.getAppMetrics()

// Deprecated
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Deprecated property
```

## `BrowserWindow`

```js
// Deprecated
let optionsA = { webPreferences: { blinkFeatures: '' } }
let windowA = new BrowserWindow(optionsA)
// Replace with
let optionsB = { webPreferences: { enableBlinkFeatures: '' } }
let windowB = new BrowserWindow(optionsB)

// Deprecated
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // do something
  }
})
// Replace with
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // do something
  }
})
```

## `clipboard`

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

## `crashReporter`

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

## `nativeImage`

```js
// Déprécié
nativeImage.createFromBuffer(buffer, 1.0)
// Remplacé par
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `processus (process)`

```js
// Deprecated
const info = process.getProcessMemoryInfo()
```

## `screen`

```js
// Déprécié
screen.getMenuBarHeight()
// Remplacé par
screen.getPrimaryDisplay().workArea
```

## `session`

```js
// Déprécié
ses.setCertificateVerifyProc(function (hostname, certificate, callback) {
  callback(true)
})
// Remplacé par
ses.setCertificateVerifyProc(function (request, callback) {
  callback(0)
})
```

## `Tray`

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

## `webContents`

```js
// Deprecated
webContents.openDevTools({ detach: true })
// Replace with
webContents.openDevTools({ mode: 'detach' })

// Removed
webContents.setSize(options)
// There is no replacement for this API
```

## `webFrame`

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

## `<webview>`

```js
// Removed
webview.setAttribute('disableguestresize', '')
// There is no replacement for this API

// Removed
webview.setAttribute('guestinstance', instanceId)
// There is no replacement for this API

// Keyboard listeners no longer work on webview tag
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```

## Node Headers URL

Il s’agit de l’URL spécifiée comme `disturl` dans un fichier `.npmrc` ou le flag `--dist-url` en ligne de commande lors de la compilation des modules natifs de Node.

Déprécié : https://atom.io/download/atom-shell

Remplacé par : https://atom.io/download/electron

# Breaking API Changes (2.0)

The following list includes the breaking API changes made in Electron 2.0.

## `BrowserWindow`

```js
// Déprécié
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Remplacé par
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

## `menu`

```js
// Removed
menu.popup(browserWindow, 100, 200, 2)
// Replaced with
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

## `nativeImage`

```js
// Removed
nativeImage.toPng()
// Replaced with
nativeImage.toPNG()

// Removed
nativeImage.toJpeg()
// Replaced with
nativeImage.toJPEG()
```

## `processus (process)`

* `process.versions.electron` et `process.version.chrome` seront mis en lecture seule par souci de cohérence avec la propriété `process.versions` définie par Node.

## `webContents`

```js
// Removed
webContents.setZoomLevelLimits(1, 2)
// Replaced with
webContents.setVisualZoomLevelLimits(1, 2)
```

## `webFrame`

```js
// Removed
webFrame.setZoomLevelLimits(1, 2)
// Replaced with
webFrame.setVisualZoomLevelLimits(1, 2)
```

## `<webview>`

```js
// Removed
webview.setZoomLevelLimits(1, 2)
// Replaced with
webview.setVisualZoomLevelLimits(1, 2)
```

## Versions ARM dupliquées

Each Electron release includes two identical ARM builds with slightly different filenames, like `electron-v1.7.3-linux-arm.zip` and `electron-v1.7.3-linux-armv7l.zip`. The asset with the `v7l` prefix was added to clarify to users which ARM version it supports, and to disambiguate it from future armv6l and arm64 assets that may be produced.

The file *without the prefix* is still being published to avoid breaking any setups that may be consuming it. Starting at 2.0, the un-prefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).