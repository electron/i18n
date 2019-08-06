# Ruperea modificărilor

Ruperea modificărilor va fi documentată aici, iar notificările dezaprobatoare adăugate în codul JavaScript unde e posibil, [cel puțin o versiune majoră](../tutorial/electron-versioning.md#semver) înainte de a fi făcută modificarea.

# Comentariile ` FIXME sau Repară-mă `

Șir-ul sau String-ul `FIXME` este utilizat în comentariile codului pentru a indica lucruri ce ar trebui reparate în realizările viitoare. Vezi https://github.com/electron/electron/search?q=fixme

# Modificări Plănuite ale API(7.0)

## `shell.openExternalSync(url, ["optiuni"-options])`

```js
// Dezaprobată
shell.openExternalSync(url)
// Înlocuită  cu 
async function open Thing (url) {
await.shell.openExternal(url)
```

# Modificări Plănuite ale API (6.0)

## `win.setMenu(null)`

```js
// Dezaprobată
win.setMenu(null)
// Înlocuită cu 
win.removeMenu()
```

## `contentTracing.getTraceBufferUsage()`

```js
// Dezaprobată
contentTracing.getTTraceBufferUsage((percentage,value) => {
// Fă ceva 
})
// Înlocuiește cu 
contentTracing.getTraceBufferUsage().then(infoObject = > {
    //infoObject deține procente și valori 
})
```

## `electron.screen` în procesul de cedare

```js
// Dezaprobată
require(`electron`).screen
// Înlocuiește cu 
require(`electron`).remote.screen
```

## `require` procesul de cedare în cutiidenisip

```js
// Dezaprobată
require('child_process')
// Înlocuiește cu 
require('electron').remote.require('child.process')
// Dezaprobată
require('fs')
// Înlocuiește cu 
require('electron').remote.require('fs')
// Dezaprobată
require('os')
// Înlocuiește cu 
require('electron').remote.require('os')
// Dezaprobată
require('path')
// Înlocuiește cu 
require('electron').remote.require('path')
```

## `powerMonitor.querySystemIdleState`

```js
//Dezaprobată
powerMonitor.querySystemIdleState(threshold, callback)
//Înlocuiește cu API sincronizat
const idleState = getSystemIdleState(threshold)
```

## `powerMonitor.querySystemIdleTime`

```js
//Dezaprobată
powerMonitor.querySystemIdleTime(callback)
//Înlocuiește cu API sincronizat
const idleTime = getSystemIdleTime()
```

## `Tray - Tavă`

Sub îndrumarea formatoruilui nostru macOS Cătălina, implementarea se rupe. Substitutul nativ Apple nu suportă schimbarea în evidențierea comportamentului.

```js
//Dezaprobată
tray.setHighlightMode(mode)
// API v-a fi indepărtat în v7.0 fără posibilitate de înlocuire.
```

# Plănuirea modificărilor ruperilor API(5.0)

## `new BrowserWindow({ webPreferences })`

Următoarea opțiune `webPreferences` este dezaprobată în favoarea unor noi valori prestabilite afișate în continuare.

| Propietate         | Valoare dezaprobată                  | Noua valoare |
| ------------------ | ------------------------------------ | ------------ |
| `contextIsolation` | `false`                              | `true`       |
| `nodeIntegration`  | `true`                               | `false`      |
| `webviewTag`       | `nodeIntegration` if set else `true` | `false`      |

Ex. Reactivarea webviewTag

```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```

### `nativeWindowOpen`

Copilul windows deschis cu opțiunea `nativeWindowOpen` mereu va avea integrat Node.js invalid, doar dacă `nodeIntegrationInSubFrames` este `true.

## Înregistrarea schemelor privilegiate

Generarea proceselor API `webFrame.setRegisterURLSchemeAsPrivileged ` si `webFrame.registerURLSchemeAsBypassingCSP` la fel ca procesul browserului API ` protocol.registerStandardSchemes` au fost eliminate. Un nou API, `protocol.registerSchemesAsPrivileged` a fost adăugat și ar trebui să fie utilizat la înregistrarea unor scheme personalizate ce conțin cereri privilegiate. Schemele personalizate trebuie să fie înregistrate înainte de terminarea aplicației.

## webFrame API-urile lumii izolate

```js
// Dezaprobate
 webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Înlocuite cu 
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

# Plănuirea modificărilor ruperilor API(4.0)

Următoarea listă include schimbările ruperilor API făcute în Electron 4.0.

## `app.makeSingleInstance`

```js
// Dezaprobată 
app.makeSingleInstance((argv, cwd) => {
  /* ... */... */
})
// Înlocuiește cu 
app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
  /* ... */
})
```

## `app.releaseSingleInstance`

```js
// Dezaprobată 
app.releaseSingleInstance()
// Înlocuiește cu 
app.releaseSingleInstanceLock()
```

## `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Acum se comportă la fel ca `basic`in macOs
app.getGPUInfo('basic')
```

## `win_delay_load_hook`

Când construiești un mod nativ pentru window, variabila `win_delay_load_hook` în modulul `binding.gyp` trebuie să fie adevărată (true, vine implicit). If this hook is not present, then the native module will fail to load on Windows, with an error message like `Cannot find module`. See the [native module guide](/docs/tutorial/using-native-node-modules.md) for more.

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
// Deprecated
clipboard.readRtf()
// Replace with
clipboard.readRTF()

// Deprecated
clipboard.writeRtf()
// Replace with
clipboard.writeRTF()

// Deprecated
clipboard.readHtml()
// Replace with
clipboard.readHTML()

// Deprecated
clipboard.writeHtml()
// Replace with
clipboard.writeHTML()
```

## `crashReporter`

```js
// Deprecated
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Replace with
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

## `process`

```js
// Deprecated
const info = process.getProcessMemoryInfo()
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
// Deprecated
tray.setHighlightMode(true)
// Replace with
tray.setHighlightMode('on')

// Deprecated
tray.setHighlightMode(false)
// Replace with
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
// Deprecated
webFrame.registerURLSchemeAsSecure('app')
// Replace with
protocol.registerStandardSchemes(['app'], { secure: true })

// Deprecated
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Replace with
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

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.

Deprecated: https://atom.io/download/atom-shell

Replace with: https://atom.io/download/electron

# Breaking API Changes (2.0)

The following list includes the breaking API changes made in Electron 2.0.

## `BrowserWindow`

```js
// Deprecated
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Replace with
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

## `process`

* `process.versions.electron` and `process.version.chrome` will be made read-only properties for consistency with the other `process.versions` properties set by Node.

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

## Duplicate ARM Assets

Each Electron release includes two identical ARM builds with slightly different filenames, like `electron-v1.7.3-linux-arm.zip` and `electron-v1.7.3-linux-armv7l.zip`. The asset with the `v7l` prefix was added to clarify to users which ARM version it supports, and to disambiguate it from future armv6l and arm64 assets that may be produced.

The file *without the prefix* is still being published to avoid breaking any setups that may be consuming it. Starting at 2.0, the un-prefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).