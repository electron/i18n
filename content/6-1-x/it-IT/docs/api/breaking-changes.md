# Breaking Changes

I cambiamenti delle API assieme agli avvisi di deprecazione aggiunti al codice JavaScript, dove possibile, saranno qui documentati almeno [una versione maggiore](../tutorial/electron-versioning.md#semver) prima che il cambiamento sia implementato.

# Commenti `FIXME`

La stringa `FIXME` è usata nei commenti del codice per denotare cose che dovrebbero essere sistemate per i prossimi rilasci. Vedi https://github.com/electron/electron/search?q=fixme

# Cambiamenti Pianificati API (7.0)

## `shell.openExternalSync(url[, opzioni])`

```js
// Deprecated
shell.openExternalSync(url)
// Replace with
async function openThing (url) {
  await shell.openExternal(url)
}
```

# Cambiamenti Pianificati API (6.0)

## `win.setMenu(null)`

```js
// Deprecated
win.setMenu(null)
// Replace with
win.removeMenu()
```

## `contentTracing.getTraceBufferUsage()`

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

## `electron.screen` in renderer process

```js
// Deprecated
require('electron').screen
// Replace with
require('electron').remote.screen
```

## `require` in sandboxed renderers

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

## `powerMonitor.querySystemIdleState`

```js
// Deprecated
powerMonitor.querySystemIdleState(threshold, callback)
// Replace with synchronous API
const idleState = getSystemIdleState(threshold)
```

## `powerMonitor.querySystemIdleTime`

```js
// Deprecated
powerMonitor.querySystemIdleTime(callback)
// Replace with synchronous API
const idleTime = getSystemIdleTime()
```

## `Tray`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

# Cambiamenti Pianificati API (5.0)

## `new BrowserWindow({ webPreferences })`

The following `webPreferences` option default values are deprecated in favor of the new defaults listed below.

| Property           | Deprecated Default                   | New Default |
| ------------------ | ------------------------------------ | ----------- |
| `contextIsolation` | `false`                              | `true`      |
| `nodeIntegration`  | `true`                               | `false`     |
| `webviewTag`       | `nodeIntegration` if set else `true` | `false`     |

E.g. Re-enabling the webviewTag

```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```

### `nativeWindowOpen`

Child windows opened with the `nativeWindowOpen` option will always have Node.js integration disabled, unless `nodeIntegrationInSubFrames` is `true.

## Privileged Schemes Registration

Renderer process APIs `webFrame.setRegisterURLSchemeAsPrivileged` and `webFrame.registerURLSchemeAsBypassingCSP` as well as browser process API `protocol.registerStandardSchemes` have been removed. A new API, `protocol.registerSchemesAsPrivileged` has been added and should be used for registering custom schemes with the required privileges. Custom schemes are required to be registered before app ready.

## webFrame Isolated World APIs

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

# Cambiamenti Pianificati API (4.0)

The following list includes the breaking API changes made in Electron 4.0.

## `app.makeSingleInstance`

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

## `app.rilasciaIstanzaSingola`

```js
// Deprecato
app.releaseSingleInstance()
// Sostituire con
app.releaseSingleInstanceLock()
```

## `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Now behaves the same with `basic` on macOS
app.getGPUInfo('basic')
```

## `win_delay_load_hook`

When building native modules for windows, the `win_delay_load_hook` variable in the module's `binding.gyp` must be true (which is the default). If this hook is not present, then the native module will fail to load on Windows, with an error message like `Cannot find module`. See the [native module guide](/docs/tutorial/using-native-node-modules.md) for more.

# Cambiamenti API (3.0)

La seguente lista include i cambiamenti delle API in Electron 3.0.

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
// Deprecated
const info = process.getProcessMemoryInfo()
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
// Deprecated
ses.setCertificateVerifyProc((hostname, certificate, callback) => {
  callback(true)
})
// Replace with
ses.setCertificateVerifyProc((request, callback) => {
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
webContents.openDevTools({ detach: true })
// Sostituire con
webContents.openDevTools({ mode: 'detach' })

// Rimosso
webContents.setSize(options)
// Non c'è sostituzione per questa API
```

## `webFrame`

```js
// Deprecato
webFrame.registerURLSchemeAsSecure('app')
// Rimpiazza con
protocol.registerStandardSchemes(['app'], { secure: true })

// Deprecato
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Rimpiazza con
protocol.registerStandardSchemes(['app'], { secure: true })
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
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Sostituire con
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

## `menu`

```js
// Rimosso
menu.popup(browserWindow, 100, 200, 2)
// Sostituito con
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
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

Il file _senza prefisso_ è ancora in fase di pubblicazione per evitare di rompere le configurazioni che lo stanno ancora utilizzando. A partire dalla versione 2.0, il file senza prefisso non sarà più pubblicato.

Per maggiori dettagli, vedere [6986](https://github.com/electron/electron/pull/6986) e [7189](https://github.com/electron/electron/pull/7189).
