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

La construirea unui model autohton window, variabila `win_delay_load_hook` în modulul `binding.gyp` trebuie să fie adevărată (true, vine implicit). Dacă acest cârlig nu este prezent, atunci modelul autohton nu se va încărca în Windows și va aparea următorul mesaj `Cannot find module`. Pentru mai multe detalii, vezi [native module guide](/docs/tutorial/using-native-node-modules.md).

# Modificarea Ruperilor API(3.0)

Următoarea listă include modificarea ruperilor API în Electron 3.0.

## `app`

```js
// Dezaprobată 
app.getAppMemoryInfo()
// Înlocuiește cu
app.getAppMetrics()

// Dezaprobate
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Proprietăți dezaprobate
```

## `BrowserWindow - FereastraBrowser-ului`

```js
// Dezaprobate
let optionsA = { webPreferences: { blinkFeatures: '' } }
let windowA = new BrowserWindow(optionsA)
// Înlocuiește cu
let optionsB = { webPreferences: { enableBlinkFeatures: '' } }
let windowB = new BrowserWindow(optionsB)

// Dezaprobate
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // do something
  }
})
// Înlocuiește cu
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // do something
  }
})
```

## `clipboard -`

```js
// Dezaprobată 
clipboard.readRtf()
// Înlocuiește cu
clipboard.readRTF()

// Dezaprobată 
clipboard.writeRtf()
// Înlocuiește cu
clipboard.writeRTF()

// Dezaprobată 
clipboard.readHtml()
// Înlocuiește cu
clipboard.readHTML()

// Dezaprobată 
clipboard.writeHtml()
// Înlocuiește cu
clipboard.writeHTML()
```

## `crashReporter - ReporterAccident`

```js
// Dezaprobată 
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Înlocuiește cu
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

## `nativeImage-ImagineAutohtonă`

```js
// Dezaprobată 
nativeImage.createFromBuffer(buffer, 1.0)
// Înlocuiește cu
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `process- proces`

```js
// Dezaprobată 
const info = process.getProcessMemoryInfo()
```

## `screen- ecran`

```js
// Dezaprobată 
screen.getMenuBarHeight()
// Înlocuiește cu
screen.getPrimaryDisplay().workArea
```

## `session- sesiune`

```js
// Dezaprobată 
ses.setCertificateVerifyProc((hostname, certificate, callback) => {
  callback(true)
})
// Înlocuiește cu
ses.setCertificateVerifyProc((request, callback) => {
  callback(0)
})
```

## `Tray - tavă`

```js
// Dezaprobată 
tray.setHighlightMode(true)
// Înlocuiește cu
tray.setHighlightMode('on')

// Dezaprobată 
tray.setHighlightMode(false)
// Înlocuiește cu
tray.setHighlightMode('off')
```

## `webContents- conținutWeb`

```js
// Dezaprobată 
webContents.openDevTools({ detach: true })
// Înlocuiește cu
webContents.openDevTools({ mode: 'detach' })

// Eliminată 
webContents.setSize(options)
// Acest API nu a fost înlocuit
```

## `webFrame-cadruWeb`

```js
// Dezaprobată 
webFrame.registerURLSchemeAsSecure('app')
// Înlocuiește cu
protocol.registerStandardSchemes(['app'], { secure: true })

// Dezaprobată 
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Înlocuiește cu
protocol.registerStandardSchemes(['app'], { secure: true })
```

## `<webview>vizualizareWeb`

```js
//  Eliminată 
webview.setAttribute('disableguestresize', '')
// Acest API nu a fost înlocuit

// Eliminată 
webview.setAttribute('guestinstance', instanceId)
// Acest API nu a fost înlocuit

// Keyboard listeners - ascultătorii de tastatură, nu mai funcționează  în eticheta webview
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```

## Node Headers URL - Anteturile nodurilor URL

Acest URL poate fi specificat ca `disturl` într-un fișier `.npmrc` sau ca și o comandă principală `--dist-url` când e vorba de construirea unor module de tip Node- nod.

Dezaprobată: https://atom.io/download/atom-shell

Înlocuiește cu: https://atom.io/download/electron


# Modificarea Ruperilor API(2.0)

Următoarea listă include modificarea ruperilor API făcute în Electron 2.0.

## `BrowserWindow- FereastraBrowser-ului`

```js
// Dezaprobate
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Înlocuiește cu
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

## `menu-meniu`

```js
// Eliminată 
menu.popup(browserWindow, 100, 200, 2)
// Înlocuiește cu
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

## `nativeImage-Imagineautohtonă`

```js
// Eliminată 
nativeImage.toPng()
// Înlocuiește cu
nativeImage.toPNG()

// Eliminată 
nativeImage.toJpeg()
// Înlocuiește cu
nativeImage.toJPEG()
```

## `process-proces`

* `process.versions.electron` și `process.version.chrome` vor fi făcute propietăți read-only - doarcitit, pentru a avea consistență cu celelalte propietăți setate de Node `process.versions`.

## `webContents-conținutWeb`

```js
// Eliminată 
webContents.setZoomLevelLimits(1, 2)
// Înlocuiește cu
webContents.setVisualZoomLevelLimits(1, 2)
```

## `webFrame-cadruWeb`

```js
// Eliminată 
webFrame.setZoomLevelLimits(1, 2)
// Înlocuiește cu
webFrame.setVisualZoomLevelLimits(1, 2)
```

## `<webview>vizualizareWeb`

```js
// Eliminată 
webview.setZoomLevelLimits(1, 2)
// Înlocuiește cu
webview.setVisualZoomLevelLimits(1, 2)
```

## Duplicarea bunurilor ARM

Fiecare eliberare Electron include 2 ARM identice, construite cu diferențe mici în numirea fișierelor, ca `electron-v1.7.3-linux-arm.zip` și `electron-v1.7.3-linux-armv7l.zip`. Bunurile cu prefixul `v7l` au fost adăugate pentru a ajuta la clarificarea versiunilor pe care le suporta șii la dezambiguarea viitoarelor armv6l si arm64, bunuri care se pot produce.

Fișierul _without the prefix_ încă funcționează pentru a ajuta la evitarea ruperilor unor setări care îl pot consuma. Începând cu 2.0 fișierul fără prefix nu va mai fi publicat.

Pentru detalii, vezi [6986](https://github.com/electron/electron/pull/6986) și [7189](https://github.com/electron/electron/pull/7189).
