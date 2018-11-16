# Contratto API

I cambiamenti delle API assieme agli avvisi di deprecazione aggiunti al codice JavaScript, dove possibile, saranno qui documentati almeno [una versione maggiore](../tutorial/electron-versioning.md#semver) prima che il cambiamento sia implementato.

# Commenti `FIXME`

La stringa `FIXME` è usata nei commenti del codice per denotare cose che dovrebbero essere sistemate per i prossimi rilasci. Vedi https://github.com/electron/electron/search?q=fixme

# Cambiamenti Pianificati API (4.0)

La seguente lista include i cambiamenti delle API pianificati per Electron 4.0.

## `app.makeSingleInstance`

```js
// Deprecato
app.makeSingleInstance(function (argv, cwd) {

})
// Sostituire con
app.requestSingleInstanceLock()
app.on('second-instance', function (event, argv, cwd) {

})
```

## `app.releaseSingleInstance`

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

## `clipboard`

```js
// Deprecato
clipboard.readRtf()
// Sostituire con
clipboard.readRTF()

// Deprecato
clipboard.writeRtf()
// Sostituire con
clipboard.writeRTF()

// Deprecato
clipboard.readHtml()
// Sostituire con
clipboard.readHTML()

// Deprecato
clipboard.writeHtml()
// Sostituire con
clipboard.writeHTML()
```

## `creshReporter`

```js
// Deprecato
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Sostituire con
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

## `nativeImage`

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

## `screen`

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

## `webContents`

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
// Sostituire con
protocol.registerStandardSchemes(['app'], {secure: true})

// Deprecato
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// Sostituire con
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
// Deprecato
let optionsA = {titleBarStyle: 'hidden-inset'}
let windowA = new BrowserWindow(optionsA)
// Sostituire con
let optionsB = {titleBarStyle: 'hiddenInset'}
let windowB = new BrowserWindow(optionsB)
```

## `menu`

```js
// Rimosso
menu.popup(browserWindow, 100, 200, 2)
// Sostituito con
menu.popup(browserWindow, {x: 100, y: 200, positioningItem: 2})
```

## `nativeImage`

```js
// Rimosso
nativeImage.toPng()
// Sostituito con
nativeImage.toPNG()

// Rimosso
nativeImage.toJpeg()
// Sostituito con
nativeImage.toJPEG()
```

## `process`

* `process.versions.electron` e `process.version.chrome` diventeranno delle proprietà di sola lettura coerentemente con le altre proprietà `process.versions` impostate da Node.

## `webContents`

```js
// Rimosso
webContents.setZoomLevelLimits(1, 2)
// Sostituito con
webContents.setVisualZoomLevelLimits(1, 2)
```

## `webFrame`

```js
// Rimosso
webContents.setZoomLevelLimits(1, 2)
// Sostituito con
webContents.setVisualZoomLevelLimits(1, 2)
```

## `<webview>`

```js
// Rimosso
webContents.setZoomLevelLimits(1, 2)
// Sostituito con
webContents.setVisualZoomLevelLimits(1, 2)
```

## Asset ARM duplicati

Ogni rilascio di Electron include due build ARM identiche con filename leggermente differenti, come `electron-v1.7.3-linux-arm.zip` e `electron-v1.7.3-linux-armv7l.zip`. L'asset con il prefisso `v7l` è stato aggiunto per chiarire agli utenti quale versione di ARM esso supporti, e per renderlo disambiguo dai futuri asset armv6l e arm64 che potrebbero essere prodotti.

Il file *senza prefisso* è ancora in fase di pubblicazione per evitare di rompere le configurazioni che lo stanno ancora utilizzando. A partire dalla versione 2.0, il file senza prefisso non sarà più pubblicato.

Per maggiori dettagli, vedere [6986](https://github.com/electron/electron/pull/6986) e [7189](https://github.com/electron/electron/pull/7189).