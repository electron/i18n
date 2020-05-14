# Ruperea modificărilor

Ruperea modificărilor va fi documentată aici, iar notificările dezaprobatoare adăugate în codul JavaScript unde e posibil, [cel puțin o versiune majoră](tutorial/electron-versioning.md#semver) înainte de a fi făcută modificarea.

### Types of Breaking Changes

This document uses the following convention to categorize breaking changes:

- **API Changed:** An API was changed in such a way that code that has not been updated is guaranteed to throw an exception.
- **Behavior Changed:** The behavior of Electron has changed, but not in such a way that an exception will necessarily be thrown.
- **Default Changed:** Code depending on the old default may break, not necessarily throwing an exception. The old behavior can be restored by explicitly specifying the value.
- **Deprecated:** An API was marked as deprecated. The API will continue to function, but will emit a deprecation warning, and will be removed in a future release.
- **Removed:** An API or feature was removed, and is no longer supported by Electron.

## Modificări Plănuite ale API(12.0)

### Removed: `crashReporter` methods in the renderer process

The following `crashReporter` methods are no longer available in the renderer process:

- `crashReporter.start`
- `crashReporter.getLastCrashReport`
- `crashReporter.getUploadedReports`
- `crashReporter.getUploadToServer`
- `crashReporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

They should be called only from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

## Modificări Plănuite ale API(11.0)

## Modificări Plănuite ale API(10.0)

### Deprecated: `companyName` argument to `crashReporter.start()`

The `companyName` argument to `crashReporter.start()`, which was previously required, is now optional, and further, is deprecated. To get the same behavior in a non-deprecated way, you can pass a `companyName` value in `globalExtra`.

```js
// Deprecated in Electron 10
crashReporter.start({ companyName: 'Umbrella Corporation' })
// Replace with
crashReporter.start({ globalExtra: { _companyName: 'Umbrella Corporation' } })
```

### Deprecated: `crashReporter.getCrashesDirectory()`

The `crashReporter.getCrashesDirectory` method has been deprecated. Usage should be replaced by `app.getPath('crashDumps')`.

```js
// Deprecated in Electron 10
crashReporter.getCrashesDirectory()
// Replace with
app.getPath('crashDumps')
```

### Deprecated: `crashReporter` methods in the renderer process

Calling the following `crashReporter` methods from the renderer process is deprecated:

- `crashReporter.start`
- `crashReporter.getLastCrashReport`
- `crashReporter.getUploadedReports`
- `crashReporter.getUploadToServer`
- `crashReporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

The only non-deprecated methods remaining in the `crashReporter` module in the renderer are `addExtraParameter`, `removeExtraParameter` and `getParameters`.

All above methods remain non-deprecated when called from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### Removed: Browser Window Affinity

The `affinity` option when constructing a new `BrowserWindow` will be removed as part of our plan to more closely align with Chromium's process model for security, performance and maintainability.

For more detailed information see [#18397](https://github.com/electron/electron/issues/18397).

### Default Changed: `enableRemoteModule` defaults to `false`

In Electron 9, using the remote module without explicitly enabling it via the `enableRemoteModule` WebPreferences option began emitting a warning. In Electron 10, the remote module is now disabled by default. To use the remote module, `enableRemoteModule: true` must be specified in WebPreferences:

```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

We [recommend moving away from the remote module](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

## Modificări Plănuite ale API(9.0)

### Default Changed: Loading non-context-aware native modules in the renderer process is disabled by default

As of Electron 9 we do not allow loading of non-context-aware native modules in the renderer process.  This is to improve security, performance and maintainability of Electron as a project.

If this impacts you, you can temporarily set `app.allowRendererProcessReuse` to `false` to revert to the old behavior.  This flag will only be an option until Electron 11 so you should plan to update your native modules to be context aware.

For more detailed information see [#18397](https://github.com/electron/electron/issues/18397).

### Removed: `<webview>.getWebContents()`

This API, which was deprecated in Electron 8.0, is now removed.

```js
// Removed in Electron 9.0
webview.getWebContents()
// Replace with
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Removed: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function was deprecated in Electron 8.x, and has been removed in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Behavior Changed: Sending non-JS objects over IPC now throws an exception

In Electron 8.0, IPC was changed to use the Structured Clone Algorithm, bringing significant performance improvements. To help ease the transition, the old IPC serialization algorithm was kept and used for some objects that aren't serializable with Structured Clone. In particular, DOM objects (e.g. `Element`, `Location` and `DOMMatrix`), Node.js objects backed by C++ classes (e.g. `process.env`, some members of `Stream`), and Electron objects backed by C++ classes (e.g. `WebContents`, `BrowserWindow` and `WebFrame`) are not serializable with Structured Clone. Whenever the old algorithm was invoked, a deprecation warning was printed.

In Electron 9.0, the old serialization algorithm has been removed, and sending such non-serializable objects will now throw an "object could not be cloned" error.

### API Changed: `shell.openItem` is now `shell.openPath`

The `shell.openItem` API has been replaced with an asynchronous `shell.openPath` API. You can see the original API proposal and reasoning [here](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Modificări Plănuite ale API(8.0)

### Behavior Changed: Values sent over IPC are now serialized with Structured Clone Algorithm

The algorithm used to serialize objects sent over IPC (through `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` and related methods) has been switched from a custom algorithm to V8's built-in [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), the same algorithm used to serialize messages for `postMessage`. This brings about a 2x performance improvement for large messages, but also brings some breaking changes in behavior.

- Sending Functions, Promises, WeakMaps, WeakSets, or objects containing any such values, over IPC will now throw an exception, instead of silently converting the functions to `undefined`.
```js
// Previously:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => results in { value: 3 } arriving in the main process

// From Electron 8:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => throws Error("() => {} could not be cloned.")
```
- `NaN`, `Infinity` and `-Infinity` will now be correctly serialized, instead of being converted to `null`.
- Objects containing cyclic references will now be correctly serialized, instead of being converted to `null`.
- `Set`, `Map`, `Error` and `RegExp` values will be correctly serialized, instead of being converted to `{}`.
- `BigInt` values will be correctly serialized, instead of being converted to `null`.
- Sparse arrays will be serialized as such, instead of being converted to dense arrays with `null`s.
- `Date` objects will be transferred as `Date` objects, instead of being converted to their ISO string representation.
- Typed Arrays (such as `Uint8Array`, `Uint16Array`, `Uint32Array` and so on) will be transferred as such, instead of being converted to Node.js `Buffer`.
- Node.js `Buffer` objects will be transferred as `Uint8Array`s. You can convert a `Uint8Array` back to a Node.js `Buffer` by wrapping the underlying `ArrayBuffer`:
```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```

Sending any objects that aren't native JS types, such as DOM objects (e.g. `Element`, `Location`, `DOMMatrix`), Node.js objects (e.g. `process.env`, `Stream`), or Electron objects (e.g. `WebContents`, `BrowserWindow`, `WebFrame`) is deprecated. In Electron 8, these objects will be serialized as before with a DeprecationWarning message, but starting in Electron 9, sending these kinds of objects will throw a 'could not be cloned' error.

### Deprecated: `<webview>.getWebContents()`

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

const getGuestForWebContents = (webContentsId, contents) => {
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

### Deprecated: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

## Modificări Plănuite ale API(7.0)

### Deprecated: Atom.io Node Headers URL

Acest URL poate fi specificat ca `disturl` într-un fișier `.npmrc` sau ca și o comandă principală `--dist-url` când e vorba de construirea unor module de tip Node- nod.  Both will be supported for the foreseeable future but it is recommended that you switch.

Dezaprobată: https://atom.io/download/electron

Înlocuiește cu: https://electronjs.org/headers

### API Changed: `session.clearAuthCache()` no longer accepts options

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### API Changed: `powerMonitor.querySystemIdleState` is now `powerMonitor.getSystemIdleState`

```js
// Removed in Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Replace with synchronous API
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### API Changed: `powerMonitor.querySystemIdleTime` is now `powerMonitor.getSystemIdleState`

```js
// Removed in Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Replace with synchronous API
const idleTime = powerMonitor.getSystemIdleTime()
```

### API Changed: `webFrame.setIsolatedWorldInfo` replaces separate methods

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

### Removed: `marked` property on `getBlinkMemoryInfo`

This property was removed in Chromium 77, and as such is no longer available.

### Behavior Changed: `webkitdirectory` attribute for `<input type="file"/>` now lists directory contents

The `webkitdirectory` property on HTML file inputs allows them to select folders. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

As of Electron 7, that `FileList` is now list of all files contained within the folder, similarly to Chrome, Firefox, and Edge ([link to MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

As an illustration, take a folder with this structure:
```console
folder
├── file1
├── file2
└── file3
```

In Electron <=6, this would return a `FileList` with a `File` object for:
```console
path/to/folder
```

In Electron 7, this now returns a `FileList` with a `File` object for:
```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Note that `webkitdirectory` no longer exposes the path to the selected folder. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Modificări Plănuite ale API (6.0)

### API Changed: `win.setMenu(null)` is now `win.removeMenu()`

```js
// Dezaprobată
win.setMenu(null)
// Înlocuită cu 
win.removeMenu()
```

### API Changed: `contentTracing.getTraceBufferUsage()` is now a promise

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

### API Changed: `electron.screen` in the renderer process should be accessed via `remote`

```js
// Dezaprobată
require(`electron`).screen
// Înlocuiește cu 
require(`electron`).remote.screen
```

### API Changed: `require()`ing node builtins in sandboxed renderers no longer implicitly loads the `remote` version

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

### Deprecated: `powerMonitor.querySystemIdleState` replaced with `powerMonitor.getSystemIdleState`

```js
// Deprecated
powerMonitor.querySystemIdleState(threshold, callback)
// Replace with synchronous API
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### Deprecated: `powerMonitor.querySystemIdleTime` replaced with `powerMonitor.getSystemIdleTime`

```js
// Deprecated
powerMonitor.querySystemIdleTime(callback)
// Replace with synchronous API
const idleTime = powerMonitor.getSystemIdleTime()
```

### Deprecated: `app.enableMixedSandbox()` is no longer needed

```js
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### Deprecated: `Tray.setHighlightMode`

Sub îndrumarea formatoruilui nostru macOS Cătălina, implementarea se rupe. Substitutul nativ Apple nu suportă schimbarea în evidențierea comportamentului.

```js
//Dezaprobată
tray.setHighlightMode(mode)
// API v-a fi indepărtat în v7.0 fără posibilitate de înlocuire.
```

## Plănuirea modificărilor ruperilor API(5.0)

### Default Changed: `nodeIntegration` and `webviewTag` default to false, `contextIsolation` defaults to true

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

### Behavior Changed: `nodeIntegration` in child windows opened via `nativeWindowOpen`

Child windows opened with the `nativeWindowOpen` option will always have Node.js integration disabled, unless `nodeIntegrationInSubFrames` is `true`.

### API Changed: Registering privileged schemes must now be done before app ready

Renderer process APIs `webFrame.registerURLSchemeAsPrivileged` and `webFrame.registerURLSchemeAsBypassingCSP` as well as browser process API `protocol.registerStandardSchemes` have been removed. Un nou API, `protocol.registerSchemesAsPrivileged` a fost adăugat și ar trebui să fie utilizat la înregistrarea unor scheme personalizate ce conțin cereri privilegiate. Schemele personalizate trebuie să fie înregistrate înainte de terminarea aplicației.

### Deprecated: `webFrame.setIsolatedWorld*` replaced with `webFrame.setIsolatedWorldInfo`

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

### API Changed: `webFrame.setSpellCheckProvider` now takes an asynchronous callback
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

## Plănuirea modificărilor ruperilor API(4.0)

Următoarea listă include schimbările ruperilor API făcute în Electron 4.0.

### `app.makeSingleInstance`

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

### `app.releaseSingleInstance`

```js
// Dezaprobată 
app.releaseSingleInstance()
// Înlocuiește cu 
app.releaseSingleInstanceLock()
```

### `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Acum se comportă la fel ca `basic`in macOs
app.getGPUInfo('basic')
```

### `win_delay_load_hook`

La construirea unui model autohton window, variabila `win_delay_load_hook` în modulul `binding.gyp` trebuie să fie adevărată (true, vine implicit). Dacă acest cârlig nu este prezent, atunci modelul autohton nu se va încărca în Windows și va aparea următorul mesaj `Cannot find module`. Pentru mai multe detalii, vezi [native module guide](/docs/tutorial/using-native-node-modules.md).

## Modificarea Ruperilor API(3.0)

Următoarea listă include modificarea ruperilor API în Electron 3.0.

### `app`

```js
// Dezaprobată 
app.getAppMemoryInfo()
// Înlocuiește cu
app.getAppMetrics()

// Dezaprobate
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Proprietăți dezaprobate
```

### `BrowserWindow - FereastraBrowser-ului`

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

### `clipboard-clipboard`

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

### `crashReporter`

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

### `nativeImage-ImagineNativă`

```js
// Dezaprobată 
nativeImage.createFromBuffer(buffer, 1.0)
// Înlocuiește cu
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `proces`

```js
// Dezaprobată 
const info = process.getProcessMemoryInfo()
```

### `screen`

```js
// Dezaprobată 
screen.getMenuBarHeight()
// Înlocuiește cu
screen.getPrimaryDisplay().workArea
```

### `session`

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

### `Tray`

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

### `webContents`

```js
// Dezaprobată 
webContents.openDevTools({ detach: true })
// Înlocuiește cu
webContents.openDevTools({ mode: 'detach' })

// Eliminată 
webContents.setSize(options)
// Acest API nu a fost înlocuit
```

### `webFrame-cadruWeb`

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

### `<webview>vizualizareWeb`

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

### Node Headers URL - Anteturile nodurilor URL

Acest URL poate fi specificat ca `disturl` într-un fișier `.npmrc` sau ca și o comandă principală `--dist-url` când e vorba de construirea unor module de tip Node- nod.

Dezaprobată: https://atom.io/download/atom-shell

Înlocuiește cu: https://atom.io/download/electron

## Modificarea Ruperilor API(2.0)

Următoarea listă include modificarea ruperilor API făcute în Electron 2.0.

### `BrowserWindow - FereastraBrowser-ului`

```js
// Dezaprobate
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Înlocuiește cu
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

### `menu-meniu`

```js
// Eliminată 
menu.popup(browserWindow, 100, 200, 2)
// Înlocuiește cu
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `nativeImage-ImagineNativă`

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

### `proces`

* `process.versions.electron` și `process.version.chrome` vor fi făcute propietăți read-only - doarcitit, pentru a avea consistență cu celelalte propietăți setate de Node `process.versions`.

### `webContents`

```js
// Eliminată 
webContents.setZoomLevelLimits(1, 2)
// Înlocuiește cu
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame-cadruWeb`

```js
// Eliminată 
webFrame.setZoomLevelLimits(1, 2)
// Înlocuiește cu
webFrame.setVisualZoomLevelLimits(1, 2)
```

### `<webview>vizualizareWeb`

```js
// Eliminată 
webview.setZoomLevelLimits(1, 2)
// Înlocuiește cu
webview.setVisualZoomLevelLimits(1, 2)
```

### Duplicarea bunurilor ARM

Fiecare eliberare Electron include 2 ARM identice, construite cu diferențe mici în numirea fișierelor, ca `electron-v1.7.3-linux-arm.zip` și `electron-v1.7.3-linux-armv7l.zip`. Bunurile cu prefixul `v7l` au fost adăugate pentru a ajuta la clarificarea versiunilor pe care le suporta șii la dezambiguarea viitoarelor armv6l si arm64, bunuri care se pot produce.

Fișierul _without the prefix_ încă funcționează pentru a ajuta la evitarea ruperilor unor setări care îl pot consuma. Starting at 2.0, the unprefixed file will no longer be published.

Pentru detalii, vezi [6986](https://github.com/electron/electron/pull/6986) și [7189](https://github.com/electron/electron/pull/7189).
