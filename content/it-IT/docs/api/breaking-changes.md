# API Contract

Breaking changes will be documented here, and deprecation warnings added to JS code where possible, at least [one major version](../tutorial/electron-versioning.md#semver) before the change is made.

# Commenti `FIXAMI`

La stringa `FIXME` è usata nei commenti del codice per denotare cose che dovrebbero essere sistemate per i prossimi rilasci. Vedi https://github.com/electron/electron/search?q=fixme

# Planned Breaking API Changes (4.0)

La seguente lista include i cambiamenti delle API pianificati per Electron 4.0.

## `app.makeSingleInstance`

```js
// Deprecato
app.makeSingleInstance(function (argv, cwd) {

})
// Sostituire con
app.requestSingleInstanceLock()
app.on('second-instance', function (argv, cwd) {

})
```

## `app.rilasciaIstanzaSingola`

```js
// Deprecato
app.releaseSingleInstance()
// Sostituire con
app.releaseSingleInstanceLock()
```

# Cambiamenti API (3.0)

La seguente lista include i cambiamenti delle API in Electron 3.0.

## `app`

```js
// Deprecato
app.getAppMemoryInfo()
// Sostituire con
app.getAppMetrics()

// Deprecato
const metrics = app.getAppMetrics()
const {memory} = metrics[0]
memory.privateBytes  // Proprietà deprecata
memory.sharedBytes  // Proprietà deprecata
```

## `BrowserWindow`

```js
// Deprecato
let optionsA = {webPreferences: {blinkFeatures: ''}}
let windowA = new BrowserWindow(optionsA)
// Sostituire con
let optionsB = {webPreferences: {enableBlinkFeatures: ''}}
let windowB = new BrowserWindow(optionsB)

// Deprecato
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // fai qualcosa
  }
})
// Sostituire con
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // fai qualcosa
  }
})
```

## `appunti`

```js
// Deprecato
clipboard.readRtf()
// Rimpiazza con
clipboard.readRTF()

// Deprecato
clipboard.writeRtf()
// Rimpiazza con
clipboard.writeRTF()

// Deprecato
clipboard.readHtml()
// Rimpiazza con
clipboard.readHTML()

// Deprecato
clipboard.writeHtml()
// Rimpiazza con
clipboard.writeHTML()
```

## `riportatorecrash`

```js
// Deprecato
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Rimpiazza con
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

## `immagineNativa`

```js
// Deprecato
nativeImage.createFromBuffer(buffer, 1.0)
// Rimpiazza con
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `process`

```js
// Deprecato
const info = process.getProcessMemoryInfo()
const privateBytes = info.privateBytes // Proprietà deprecata
const sharedBytes = info.sharedBytes // Proprietà deprecata
```

## `schermo`

```js
// Deprecato
screen.getMenuBarHeight()
// Rimpiazza con
screen.getPrimaryDisplay().workArea
```

## `sessione`

```js
// Deprecato
ses.setCertificateVerifyProc(function (hostname, certificate, callback) {
  callback(true)
})
// Rimpiazza con
ses.setCertificateVerifyProc(function (request, callback) {
  callback(0)
})
```

## `Tray`

```js
// Deprecato
tray.setHighlightMode(true)
// Rimpiazza con
tray.setHighlightMode('on')

// Deprecato
tray.setHighlightMode(false)
// Rimpiazza con
tray.setHighlightMode('off')
```

## `contenutiWeb`

```js
// Deprecato
webContents.openDevTools({detach: true})
// Sostituire con
webContents.openDevTools({mode: 'detach'})

// Rimosso
webContents.setSize(options)
// Non c'è sostituzione per questa API
```

## `webFrame`

```js
// Deprecato
webFrame.registerURLSchemeAsSecure('app')
// Rimpiazza con
protocol.registerStandardSchemes(['app'], {secure: true})

// Deprecato
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// Rimpiazza con
protocol.registerStandardSchemes(['app'], {secure: true})
```

## `<webview>`

```js
// Rimosso
webview.setAttribute('disableguestresize', '')
// Non c'è sostituzione per questa API

// Rimosso
webview.setAttribute('guestinstance', instanceId)
// Non c'è sostituzione per questa API

// I listeners di tastiera non funzionano più sul tag webview
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```

## Node Headers URL

Questa è l'URL specificata come `disturl` in un file `.npmrc` o come linea di comando `--dist-url` segnalata costruendo moduli Node nativi.

Deprecato: https://atom.io/download/atom-shell

Rimpiazza con: https://atom.io/download/electron

# Cambiamenti API (2.0)

The following list includes the breaking API changes made in Electron 2.0.

## `BrowserWindow`

```js
// Deprecated
let optionsA = {titleBarStyle: 'hidden-inset'}
let windowA = new BrowserWindow(optionsA)
// Replace with
let optionsB = {titleBarStyle: 'hiddenInset'}
let windowB = new BrowserWindow(optionsB)
```

## `menu`

```js
// Removed
menu.popup(browserWindow, 100, 200, 2)
// Replaced with
menu.popup(browserWindow, {x: 100, y: 200, positioningItem: 2})
```

## `immagineNativa`

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

## `process`

* `process.versions.electron` and `process.version.chrome` will be made read-only properties for consistency with the other `process.versions` properties set by Node.

## `contenutiWeb`

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

## Duplicate ARM Assets

Each Electron release includes two identical ARM builds with slightly different filenames, like `electron-v1.7.3-linux-arm.zip` and `electron-v1.7.3-linux-armv7l.zip`. The asset with the `v7l` prefix was added to clarify to users which ARM version it supports, and to disambiguate it from future armv6l and arm64 assets that may be produced.

The file *without the prefix* is still being published to avoid breaking any setups that may be consuming it. Starting at 2.0, the un-prefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).