# Breaking Changes

Breaking changes will be documented here, and deprecation warnings added to JS code where possible, at least [one major version](../tutorial/electron-versioning.md#semver) before the change is made.

## `FIXME` comments

The `FIXME` string is used in code comments to denote things that should be fixed for future releases. See https://github.com/electron/electron/search?q=fixme

## Planned Breaking API Changes (7.0)

### Node Headers URL

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules. Both will be supported for the foreseeable future but it is recommended that you switch.

Deprecated: https://atom.io/download/electron

Replace with: https://electronjs.org/headers

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
// Removed in Elecron 7.0
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

￼ ￼The `webkitdirectory` property on HTML file inputs allows them to select folders. ￼Previous versions of Electron had an incorrect implementation where the `event.target.files` ￼of the input returned a `FileList` that returned one `File` corresponding to the selected folder. ￼ ￼As of Electron 7, that `FileList` is now list of all files contained within ￼the folder, similarly to Chrome, Firefox, and Edge ￼([link to MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)). ￼ ￼As an illustration, take a folder with this structure: ￼

    console
    ￼folder
    ￼├── file1
    ￼├── file2
    ￼└── file3
    ￼ ￼ ￼In Electron <=6, this would return a 

`FileList` with a `File` object for: ￼

    console
    ￼path/to/folder
    ￼ ￼ ￼In Electron 7, this now returns a 

`FileList` with a `File` object for: ￼

    console
    ￼/path/to/folder/file3
    ￼/path/to/folder/file2
    ￼/path/to/folder/file1
    ￼ ￼ ￼Note that 

`webkitdirectory` no longer exposes the path to the selected folder. ￼If you require the path to the selected folder rather than the folder contents, ￼see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Planned Breaking API Changes (6.0)

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

### `Fach`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

## Planned Breaking API Changes (5.0)

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

## Planned Breaking API Changes (4.0)

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

### `app.releaseSingleInstance`

```js
// Veraltet
app.releaseSingleInstance()
// Ersetze mit
app.releaseSingleInstanceLock()
```

### `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Verhält sich jetzt gleich wie `basic` auf macOS
app.getGPUInfo('basic')
```

### `win_delay_load_hook`

When building native modules for windows, the `win_delay_load_hook` variable in the module's `binding.gyp` must be true (which is the default). If this hook is not present, then the native module will fail to load on Windows, with an error message like `Cannot find module`. See the [native module guide](/docs/tutorial/using-native-node-modules.md) for more.

## Breaking API Changes (3.0)

The following list includes the breaking API changes in Electron 3.0.

### `app`

```js
// Veraltet
app.getAppMemoryInfo()
// Ersetze mit
app.getAppMetrics()

// Veraltet
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Deprecated property
```

### `BrowserWindow`

```js
// Veraltet
let optionsA = { webPreferences: { blinkFeatures: '' } }
let windowA = new BrowserWindow(optionsA)
// Ersetze mit
let optionsB = { webPreferences: { enableBlinkFeatures: '' } }
let windowB = new BrowserWindow(optionsB)

// Veraltet
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // do something
  }
})
// Ersetze mit
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // do something
  }
})
```

### `Zwischenablage (clipboard)`

```js
// Veraltet
clipboard.readRtf()
// Ersetze mit
clipboard.readRTF()

// Veraltet
clipboard.writeRtf()
// Ersetze mit
clipboard.writeRTF()

// Veraltet
clipboard.readHtml()
// Ersetze mit
clipboard.readHTML()

// Veraltet
clipboard.writeHtml()
// Ersetze mit
clipboard.writeHTML()
```

### `crashReporter`

```js
// Veraltet
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Ersetze mit
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

### `nativeImage`

```js
// Veraltet
nativeImage.createFromBuffer(buffer, 1.0)
// Ersetze mit
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `process`

```js
// Veraltet
const info = process.getProcessMemoryInfo()
```

### `screen`

```js
// Veraltet
screen.getMenuBarHeight()
// Ersetze mit
screen.getPrimaryDisplay().workArea
```

### `session`

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

### `Fach`

```js
// Veraltet
tray.setHighlightMode(true)
// Ersetze mit
tray.setHighlightMode('on')

// Veraltet
tray.setHighlightMode(false)
// Ersetze mit
tray.setHighlightMode('off')
```

### `webContents`

```js
// Veraltet
webContents.openDevTools({ detach: true })
// Ersetze mit
webContents.openDevTools({ mode: 'detach' })

// Entfernt
webContents.setSize(options)
// Für diese API gibt es keinen Ersatz
```

### `webFrame`

```js
// Veraltet
webFrame.registerURLSchemeAsSecure('app')
// Ersetze mit
protocol.registerStandardSchemes(['app'], { secure: true })

// Veraltet
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Ersetze mit
protocol.registerStandardSchemes(['app'], { secure: true })
```

### `<webview>`

```js
// Entfernt
webview.setAttribute('disableguestresize', '')
// Für diese API gibt es keinen Ersatz

// Entfernt
webview.setAttribute('guestinstance', instanceId)
// Für diese API gibt es keinen Ersatz

// Keyboard listener funktionieren nicht länger für webview tag
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```

### Node Headers URL

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.

Deprecated: https://atom.io/download/atom-shell

Replace with: https://atom.io/download/electron

## Breaking API Changes (2.0)

The following list includes the breaking API changes made in Electron 2.0.

### `BrowserWindow`

```js
// Veraltet
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Ersetze mit
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

### `menu`

```js
// Entfernt
menu.popup(browserWindow, 100, 200, 2)
// Ersetze mit
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `nativeImage`

```js
// Entfernt
nativeImage.toPng()
// Ersetze mit
nativeImage.toPNG()

// Entfernt
nativeImage.toJpeg()
// Ersetze mit
nativeImage.toJPEG()
```

### `process`

* `process.versions.electron` and `process.version.chrome` will be made read-only properties for consistency with the other `process.versions` properties set by Node.

### `webContents`

```js
// Entfernt
webContents.setZoomLevelLimits(1, 2)
// Ersetze mit
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
// Entfernt
webFrame.setZoomLevelLimits(1, 2)
// Ersetze mit
webFrame.setVisualZoomLevelLimits(1, 2)
```

### `<webview>`

```js
// Entfernt
webview.setZoomLevelLimits(1, 2)
// Ersetze mit
webview.setVisualZoomLevelLimits(1, 2)
```

### Duplicate ARM Assets

Each Electron release includes two identical ARM builds with slightly different filenames, like `electron-v1.7.3-linux-arm.zip` and `electron-v1.7.3-linux-armv7l.zip`. The asset with the `v7l` prefix was added to clarify to users which ARM version it supports, and to disambiguate it from future armv6l and arm64 assets that may be produced.

The file *without the prefix* is still being published to avoid breaking any setups that may be consuming it. Starting at 2.0, the unprefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).