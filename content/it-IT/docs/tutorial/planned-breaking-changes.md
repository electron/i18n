# Planned Breaking API Changes (3.0)

La lista seguente include le API che saranno rimosse in Electron 3.0.

Non c'è una data in cui avverrà questo rilascio ma gli avvisi negativi saranno aggiunti almeno [una versione maggiore](electron-versioning.md#semver) prima.

## `app`

```js
// Deprecato
app.getAppMemoryInfo()
// Rimpiazza con
app.getAppMetrics()
```

## `BrowserWindow`

```js
// Deprecated
let optionsA = {webPreferences: {blinkFeatures: ''}}
let windowA = new BrowserWindow(optionsA)
// Replace with
let optionsB = {webPreferences: {enableBlinkFeatures: ''}}
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
// Rimpiazza con
webContents.openDevTools({mode: 'detach'})
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

## Node Headers URL

Questa è l'URL specificata come `disturl` in un file `.npmrc` o come linea di comando `--dist-url` segnalata costruendo moduli Node nativi.

Deprecato: https://atom.io/download/atom-shell

Rimpiazza con: https://atom.io/download/electron

## Commenti `FIXAMI`

La stringa `FIXAMI` è utilizzata nei commenti del codice per denotare cose che potrebbero essere fixate per il rilascio 3.0. Vedi https://github.com/electron/electron/search?q=fixme

# Planned Breaking API Changes (4.0)

La lista seguente include le API che saranno rimosse in Electron 4.0.

Non c'è una data in cui avverrà questo rilascio ma gli avvisi negativi saranno aggiunti almeno [una versione maggiore](electron-versioning.md#semver) prima.

## `app.makeSingleInstance`

```js
// Deprecated
app.makeSingleInstance(function (argv, cwd) {

})
// Replace with
app.requestSingleInstanceLock()
app.on('second-instance', function (argv, cwd) {

})
```

## `app.releaseSingleInstance`

```js
// Deprecated
app.releaseSingleInstance()
// Replace with
app.releaseSingleInstanceLock()
```