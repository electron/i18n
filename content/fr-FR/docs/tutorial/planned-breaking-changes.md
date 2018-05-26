# Changements majeurs prévus de l'API (3.0)

La liste suivante inclut les APIs qui seront supprimés dans Electron 3.0.

Il n'y a pas de planning pour la sortie de cette version, mais des avertissements de dépréciation seront ajoutés au moins [une version majeure ](electron-versioning.md#semver)au préalable.

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

// Déprécié
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // faire quelquechose
  }
})
// Remplacé par
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // faire quelquechose>
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
// Déprécié
webContents.openDevTools({detach: true})
// Remplacé par
webContents.openDevTools({mode: 'detach'})
```

## `webFrame`

```js
// Déprécié
webFrame.registerURLSchemeAsSecure('app')
// Remplacé par
protocol.registerStandardSchemes(['app'], {secure: true})

// Déprécié
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// Remplacé par
protocol.registerStandardSchemes(['app'], {secure: true})
```

## Node Headers URL

Il s’agit de l’URL spécifiée comme `disturl` dans un fichier `.npmrc` ou le flag `--dist-url` en ligne de commande lors de la compilation des modules natifs de Node.

Déprécié : https://atom.io/download/atom-shell

Remplacé par : https://atom.io/download/electron

## commentaires `FIXME`

La chaîne de caractère `FIXME` est utilisée dans les commentaires de code pour désigner les choses qu’il convient de fixer pour la version 3.0. Voir https://github.com/electron/electron/search?q=fixme

# Changements majeurs prévus de l'API (4.0)

La liste suivante inclut les APIs qui seront supprimés dans Electron 4.0.

Il n'y a pas de planning pour la sortie de cette version, mais des avertissements de dépréciation seront ajoutés au moins [une version majeure ](electron-versioning.md#semver)au préalable.

## `app.makeSingleInstance`

```js
// Déprécié
app.makeSingleInstance(function (argv, cwd) {

})
// Remplacé par
app.requestSingleInstanceLock()
app.on('second-instance', function (argv, cwd) {

})
```

## `app.releaseSingleInstance`

```js
// Déprécié
app.releaseSingleInstance()
// Remplacé par
app.releaseSingleInstanceLock()
```