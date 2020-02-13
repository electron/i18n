# Breaking Changes

I cambiamenti delle API assieme agli avvisi di deprecazione aggiunti al codice JavaScript, dove possibile, saranno qui documentati almeno [una versione maggiore](../tutorial/electron-versioning.md#semver) prima che il cambiamento sia implementato.

## Commenti `FIXAMI`

La stringa `FIXME` è usata nei commenti del codice per denotare cose che dovrebbero essere sistemate per i prossimi rilasci. Vedi https://github.com/electron/electron/search?q=fixme

## Cambiamenti Pianificati API (8.0)

### Values sent over IPC are now serialized with Structured Clone Algorithm

The algorithm used to serialize objects sent over IPC (through `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` and related methods) has been switched from a custom algorithm to V8's built-in [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), the same algorithm used to serialize messages for `postMessage`. This brings about a 2x performance improvement for large messages, but also brings some breaking changes in behavior.

* Sending Functions, Promises, WeakMaps, WeakSets, or objects containing any such values, over IPC will now throw an exception, instead of silently converting the functions to `undefined`.

```js
// Previously:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => results in { value: 3 } arriving in the main process

// From Electron 8:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => throws Error("() => {} could not be cloned.")
```

* `NaN`, `Infinity` and `-Infinity` will now be correctly serialized, instead of being converted to `null`.
* Objects containing cyclic references will now be correctly serialized, instead of being converted to `null`.
* `Set`, `Map`, `Error` and `RegExp` values will be correctly serialized, instead of being converted to `{}`.
* `BigInt` values will be correctly serialized, instead of being converted to `null`.
* Sparse arrays will be serialized as such, instead of being converted to dense arrays with `null`s.
* `Date` objects will be transferred as `Date` objects, instead of being converted to their ISO string representation.
* Typed Arrays (such as `Uint8Array`, `Uint16Array`, `Uint32Array` and so on) will be transferred as such, instead of being converted to Node.js `Buffer`.
* Node.js `Buffer` objects will be transferred as `Uint8Array`s. You can convert a `Uint8Array` back to a Node.js `Buffer` by wrapping the underlying `ArrayBuffer`:

```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```

Sending any objects that aren't native JS types, such as DOM objects (e.g. `Element`, `Location`, `DOMMatrix`), Node.js objects (e.g. `process.env`, `Stream`), or Electron objects (e.g. `WebContents`, `BrowserWindow`, `WebFrame`) is deprecated. In Electron 8, these objects will be serialized as before with a DeprecationWarning message, but starting in Electron 9, sending these kinds of objects will throw a 'could not be cloned' error.

### `<webview>.getWebContents()`

This API is implemented using the `remote` module, which has both performance and security implications. Therefore its usage should be explicit.

```js
// Deprecated
webview.getWebContents()
// Replace with
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

However, it is recommended to avoid using the `remote` module altogether.

```js
// main
const { ipcMain, webContents } = require('electron')

const getGuestForWebContents = function (webContentsId, contents) {
  const guest = webContents.fromId(webContentsId)
  if (!guest) {
    throw new Error(`Invalid webContentsId: ${webContentsId}`)
  }
  if (guest.hostWebContents !== contents) {
    throw new Error(`Access denied to webContents`)
  }
  return guest
}

ipcMain.handle('openDevTools', (event, webContentsId) => {
  const guest = getGuestForWebContents(webContentsId, event.sender)
  guest.openDevTools()
})

// renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```

### `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

## Cambiamenti Pianificati API (7.0)

### Node Headers URL

Questa è l'URL specificata come `disturl` in un file `.npmrc` o come linea di comando `--dist-url` segnalata costruendo moduli Node nativi. Both will be supported for the foreseeable future but it is recommended that you switch.

Deprecato: https://atom.io/download/electron

Rimpiazza con: https://electronjs.org/headers

### `session.clearAuthCache(options)`

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### `powerMonitor.querySystemIdleState`

```js
// Removed in Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Replace with synchronous API
const idleState = getSystemIdleState(threshold)
```

### `powerMonitor.querySystemIdleTime`

```js
// Removed in Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Replace with synchronous API
const idleTime = getSystemIdleTime()
```

### webFrame Isolated World APIs

```js
// Removed in Electron 7.0
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

### Removal of deprecated `marked` property on getBlinkMemoryInfo

This property was removed in Chromium 77, and as such is no longer available.

### `webkitdirectory` attribute for `<input type="file"/>`

￼ The `webkitdirectory` property on HTML file inputs allows them to select folders. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder. ￼ As of Electron 7, that `FileList` is now list of all files contained within the folder, similarly to Chrome, Firefox, and Edge ([link to MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)). ￼ As an illustration, take a folder with this structure:

```console
folder
├── file1
├── file2
└── file3
```

￼ In Electron <=6, this would return a `FileList` with a `File` object for:

```console
path/to/folder
```

￼ In Electron 7, this now returns a `FileList` with a `File` object for:

```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

￼ Note that `webkitdirectory` no longer exposes the path to the selected folder. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Cambiamenti Pianificati API (6.0)

### `win.setMenu(null)`

```js
// Deprecated
win.setMenu(null)
// Replace with
win.removeMenu()
```

### `contentTracing.getTraceBufferUsage()`

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

### `electron.screen` in renderer process

```js
// Deprecated
require('electron').screen
// Replace with
require('electron').remote.screen
```

### `require` in sandboxed renderers

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

### `powerMonitor.querySystemIdleState`

```js
// Deprecated
powerMonitor.querySystemIdleState(threshold, callback)
// Replace with synchronous API
const idleState = getSystemIdleState(threshold)
```

### `powerMonitor.querySystemIdleTime`

```js
// Deprecated
powerMonitor.querySystemIdleTime(callback)
// Replace with synchronous API
const idleTime = getSystemIdleTime()
```

### `app.enableMixedSandbox`

```js
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### `Tray`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

## Cambiamenti Pianificati API (5.0)

### `new BrowserWindow({ webPreferences })`

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

### Privileged Schemes Registration

Renderer process APIs `webFrame.setRegisterURLSchemeAsPrivileged` and `webFrame.registerURLSchemeAsBypassingCSP` as well as browser process API `protocol.registerStandardSchemes` have been removed. A new API, `protocol.registerSchemesAsPrivileged` has been added and should be used for registering custom schemes with the required privileges. Custom schemes are required to be registered before app ready.

### webFrame Isolated World APIs

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

## `webFrame.setSpellCheckProvider`

The `spellCheck` callback is now asynchronous, and `autoCorrectWord` parameter has been removed.

```js
// Deprecated
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck: (text) => {
    return !spellchecker.isMisspelled(text)
  }
})
// Replace with
webFrame.setSpellCheckProvider('en-US', {
  spellCheck: (words, callback) => {
    callback(words.filter(text => spellchecker.isMisspelled(text)))
  }
})
```

## Cambiamenti Pianificati API (4.0)

The following list includes the breaking API changes made in Electron 4.0.

### `app.makeSingleInstance`

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

### `app.rilasciaIstanzaSingola`

```js
// Deprecato
app.releaseSingleInstance()
// Sostituire con
app.releaseSingleInstanceLock()
```

### `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Now behaves the same with `basic` on macOS
app.getGPUInfo('basic')
```

### `win_delay_load_hook`

When building native modules for windows, the `win_delay_load_hook` variable in the module's `binding.gyp` must be true (which is the default). If this hook is not present, then the native module will fail to load on Windows, with an error message like `Cannot find module`. See the [native module guide](/docs/tutorial/using-native-node-modules.md) for more.

## Cambiamenti API (3.0)

La seguente lista include i cambiamenti delle API in Electron 3.0.

### `app`

```js
// Deprecated
app.getAppMemoryInfo()
// Replace with
app.getAppMetrics()

// Deprecated
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Deprecated property
```

### `BrowserWindow`

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

### `appunti`

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

### `riportatorecrash`

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

### `nativeImage`

```js
// Deprecato
nativeImage.createFromBuffer(buffer, 1.0)
// Rimpiazza con
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `process`

```js
// Deprecated
const info = process.getProcessMemoryInfo()
```

### `schermo`

```js
// Deprecato
screen.getMenuBarHeight()
// Rimpiazza con
screen.getPrimaryDisplay().workArea
```

### `sessione`

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

### `Tray`

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

### `webContents`

```js
// Deprecato
webContents.openDevTools({ detach: true })
// Sostituire con
webContents.openDevTools({ mode: 'detach' })

// Rimosso
webContents.setSize(options)
// Non c'è sostituzione per questa API
```

### `webFrame`

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

### `<webview>`

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

### Node Headers URL

Questa è l'URL specificata come `disturl` in un file `.npmrc` o come linea di comando `--dist-url` segnalata costruendo moduli Node nativi.

Deprecato: https://atom.io/download/atom-shell

Rimpiazza con: https://atom.io/download/electron

## Cambiamenti API (2.0)

The following list includes the breaking API changes made in Electron 2.0.

### `BrowserWindow`

```js
// Deprecato
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Sostituire con
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

### `menu`

```js
// Rimosso
menu.popup(browserWindow, 100, 200, 2)
// Sostituito con
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `nativeImage`

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

### `process`

* `process.versions.electron` e `process.version.chrome` diventeranno delle proprietà di sola lettura coerentemente con le altre proprietà `process.versions` impostate da Node.

### `webContents`

```js
// Rimosso
webContents.setZoomLevelLimits(1, 2)
// Sostituito con
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
// Rimosso
webContents.setZoomLevelLimits(1, 2)
// Sostituito con
webContents.setVisualZoomLevelLimits(1, 2)
```

### `<webview>`

```js
// Rimosso
webContents.setZoomLevelLimits(1, 2)
// Sostituito con
webContents.setVisualZoomLevelLimits(1, 2)
```

### Asset ARM duplicati

Ogni rilascio di Electron include due build ARM identiche con filename leggermente differenti, come `electron-v1.7.3-linux-arm.zip` e `electron-v1.7.3-linux-armv7l.zip`. L'asset con il prefisso `v7l` è stato aggiunto per chiarire agli utenti quale versione di ARM esso supporti, e per renderlo disambiguo dai futuri asset armv6l e arm64 che potrebbero essere prodotti.

Il file *senza prefisso* è ancora in fase di pubblicazione per evitare di rompere le configurazioni che lo stanno ancora utilizzando. Starting at 2.0, the unprefixed file will no longer be published.

Per maggiori dettagli, vedere [6986](https://github.com/electron/electron/pull/6986) e [7189](https://github.com/electron/electron/pull/7189).