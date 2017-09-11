# Changements API non rétro-compatible prévus

La liste suivante inclut les APIs qui seront supprimés dans Electron 2.0.

Il n'y a aucune date prévue pour cette prochaine version, mais les avertissements des déprécations seront ajoutés au moins 90 jours à l'avance.

## `app`

```js
// Déprécié
app.getAppMemoryInfo()
// Remplacé par
app.getAppMetrics()
```

## `BrowserWindow`

```js
// Déprécié
let optionsA = {webPreferences: {blinkFeatures: ''}}
let windowA = new BrowserWindow(optionsA)
// Remplacé par
let optionsB = {webPreferences: {enableBlinkFeatures: ''}}
let windowB = new BrowserWindow(optionsB)
```

```js
// Déprécié
let optionsA = {titleBarStyle: 'hidden-inset'}
let windowA = new BrowserWindow(optionsA)
// Remplacé par
let optionsB = {titleBarStyle: 'hiddenInset'}
let windowB = new BrowserWindow(optionsB)
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

## `menu`

```js
// Déprécié
menu.popup(browserWindow, 100, 200, 2)
// Remplacé par
menu.popup(browserWindow, {x: 100, y: 200, positioningItem: 2})
```

## `nativeImage`

```js
// Déprécié
nativeImage.toPng()
// Remplacé par
nativeImage.toPNG()

// Déprécié
nativeImage.toJpeg()
// Remplacé par
nativeImage.toJPEG()

// Déprécié
nativeImage.createFromBuffer(buffer, 1.0)
// Remplacé par
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `processus (process)`

```js
// Déprécié
process.versions['atom-shell']
// Remplacé par
process.versions.electron
```

* `process.versions.electron` et `process.version.chrome` seront mis en lecture seule par souci de cohérence avec la propriété `process.versions` définie par Node.

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
// Déprécié
webContents.openDevTools({detach: true})
// Remplacé par
webContents.openDevTools({mode: 'detach'})
```

```js
// Déprécié
webContents.setZoomLevelLimits(1, 2)
// Remplacé par
webContents.setVisualZoomLevelLimits(1, 2)
```

## `webFrame`

```js
// Déprécié
webFrame.setZoomLevelLimits(1, 2)
// Remplacé par
webFrame.setVisualZoomLevelLimits(1, 2)

// Déprécié
webFrame.registerURLSchemeAsSecure('app')
// Remplacé par
protocol.registerStandardSchemes(['app'], {secure: true})

// Déprécié
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// Remplacé par
protocol.registerStandardSchemes(['app'], {secure: true})
```

## `<webview>`

```js
// Déprécié
webview.setZoomLevelLimits(1, 2)
// Remplacé par
webview.setVisualZoomLevelLimits(1, 2)
```

## Node Headers URL

Il s’agit de l’URL spécifiée comme `disturl` dans un fichier `.npmrc` ou le flag `--dist-url` en ligne de commande lors de la compilation des modules natifs de Node.

Déprécié : https://atom.io/download/atom-shell

Remplacé par : https://atom.io/download/electron

## Duplicate ARM Assets

Chaque version d'Electron comprend deux versions identiques ARM avec des noms légèrement différents, comme `electron-v1.7.3-linux-arm.zip` et `electron-v1.7.3-linux-armv7l.zip`. The asset with the `v7l` prefix was added to clarify to users which ARM version it supports, and to disambiguate it from future armv6l and arm64 assets that may be produced.

The file *without the prefix* is still being published to avoid breaking any setups that may be consuming it. Starting at 2.0, the un-prefixed file will no longer be published.

Pour plus de détails, voir [6986](https://github.com/electron/electron/pull/6986) et [7189](https://github.com/electron/electron/pull/7189).

## commentaires `FIXME`

La chaîne de caractère `FIXME` est utilisée dans les commentaires de code pour désigner les choses qu’il convient de fixer pour la version 2.0. Voir https://github.com/electron/electron/search?q=fixme