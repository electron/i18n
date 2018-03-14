# Changements API non rétro-compatible prévus

La liste suivante inclut les APIs qui seront supprimés dans Electron 3.0.

There is no timetable for when this release will occur but deprecation warnings will be added at least [one major version](electron-versioning.md#semver) beforehand.

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
// Deprecated
nativeImage.createFromBuffer(buffer, 1.0)
// Replace with
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `screen`

```js
// Deprecated
screen.getMenuBarHeight()
// Replace with
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
// Déprécié
webContents.openDevTools({detach: true})
// Remplacé par
webContents.openDevTools({mode: 'detach'})
```

## `webFrame`

```js
// Deprecated
webFrame.registerURLSchemeAsSecure('app')
// Replace with
protocol.registerStandardSchemes(['app'], {secure: true})

// Deprecated
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// Replace with
protocol.registerStandardSchemes(['app'], {secure: true})
```

## Node Headers URL

Il s’agit de l’URL spécifiée comme `disturl` dans un fichier `.npmrc` ou le flag `--dist-url` en ligne de commande lors de la compilation des modules natifs de Node.

Déprécié : https://atom.io/download/atom-shell

Remplacé par : https://atom.io/download/electron

## commentaires `FIXME`

The `FIXME` string is used in code comments to denote things that should be fixed for the 3.0 release. See https://github.com/electron/electron/search?q=fixme