# 중대한 변화

주요 변경사항은 여기에 기록됩니다. and deprecation warnings added to JS code where possible, at least [one major version](../tutorial/electron-versioning.md#semver) before the change is made.

## `FIXME` 주석

코드 주석으로 `FIXME` 문자는 미래의 릴리즈에서 수정되어야 함을 표시합니다. https://github.com/electron/electron/search?q=fixme 를 참조하세요.

## 중단될 예정 API (8.0)

### IPC를 통해 보내진 값은 이제 Structured Clone Algorithm로 직렬화 됩니다.

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
// 중단예정
webview.getWebContents()
// 다음으로 대체됨
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

Chromium은 레이아웃 확대/축소 변경 제한에 대한 지원을 중단했습니다. 이를 관리하는 Electron의 용량을 넘어섭니다. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

## 중단될 예정 API (7.0)

### Node Headers URL

native Node 모듈을 빌드할 때 `.npmrc`파일의 `disturl`나 명령행 플래그의 `--dist-url`로 정의된 URL입니다. 두가지 모두 가까운 미래에는 지원할 예정이지만 전환하는 것이 좋습니다.

더이상 사용하지 않음: https://atom.io/download/electron

다음으로 대체: https://electronjs.org/headers

### `session.clearAuthCache(options)`

`session.clearAuthCache` API는 더이상 지울 항목에 대한 옵션을 허용하지 않고 모든 캐시를 무조건 지웁니다.

```js
// 더이상 사용하지 않음
session.clearAuthCache({ type: 'password' })
// 다음으로 대체됨
session.clearAuthCache()
```

### `powerMonitor.querySystemIdleState`

```js
// Electron 7.0 에서 제거됨
powerMonitor.querySystemIdleState(threshold, callback)
// 동기 API 로 대체됨
const idleState = getSystemIdleState(threshold)
```

### `powerMonitor.querySystemIdleTime`

```js
// Electron 7.0에서 제거됨
powerMonitor.querySystemIdleTime(callback)
// 동기 API로 대체됨
const idleTime = getSystemIdleTime()
```

### webFrame Isolated World APIs

```js
// Electron 7.0 에서 제거됨
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// 다음으로 대체됨
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### getBlinkMemoryInfo에서 더이상 사용되지 않는 `marked` 프로퍼티 제거

이 프로퍼티는 Chromium 77에서 제거되어 더이상 소용이 없습니다.

### `<input type="file"/>`의 `webkitdirectory` 속성

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

## 중단될 예정 API (6.0)

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

## 중단될 예정 API (5.0)

### `new BrowserWindow({ webPreferences })`

다음 `webPreferences` 옵션의 기본값은 아래 리스트의 새로운 값으로 변경됩니다.

| 속성                 | 종료되는 기본값                             | 새로운 기본값 |
| ------------------ | ------------------------------------ | ------- |
| `contextIsolation` | `false`                              | `true`  |
| `nodeIntegration`  | `true`                               | `false` |
| `webviewTag`       | `nodeIntegration` if set else `true` | `false` |

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

## 중단될 예정 API (4.0)

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
// Deprecated
app.releaseSingleInstance()
// Replace with
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

## 중대한 API 변화 (3.0)

다음 리스트는 Electron 3.0에서의 중대한 API 변화를 포함합니다.

### `app`

```js
// 중단예정
app.getAppMemoryInfo()
// 다음으로 대체됨
app.getAppMetrics()

// 중단예정
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Deprecated property
```

### `BrowserWindow`

```js
// 중단예정
let optionsA = { webPreferences: { blinkFeatures: '' } }
let windowA = new BrowserWindow(optionsA)
// 다음으로 대체됨
let optionsB = { webPreferences: { enableBlinkFeatures: '' } }
let windowB = new BrowserWindow(optionsB)

// 중단예정
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // do something
  }
})
// 다음으로 대체됨
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // do something
  }
})
```

### `clipboard`

```js
// 중단예정
clipboard.readRtf()
// 다음으로 대체됨
clipboard.readRTF()

// 중단예정
clipboard.writeRtf()
// 다음으로 대체됨
clipboard.writeRTF()

// 중단예정
clipboard.readHtml()
// 다음으로 대체됨
clipboard.readHTML()

// 중단예정
clipboard.writeHtml()
// 다음으로 대체됨
clipboard.writeHTML()
```

### `crashReporter`

```js
// 중단예정
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// 다음으로 대체됨
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

### `nativeImage`

```js
// 중단예정
nativeImage.createFromBuffer(buffer, 1.0)
// 다음으로 대체됨
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `프로세스`

```js
// 중단예정
const info = process.getProcessMemoryInfo()
```

### `screen`

```js
// 중단예정
screen.getMenuBarHeight()
// 다음으로 대체됨
screen.getPrimaryDisplay().workArea
```

### `session`

```js
// 중단예정
ses.setCertificateVerifyProc((hostname, certificate, callback) => {
  callback(true)
})
// 다음으로 대체됨
ses.setCertificateVerifyProc((request, callback) => {
  callback(0)
})
```

### `Tray`

```js
// 중단예정
tray.setHighlightMode(true)
// 다음으로 대체됨
tray.setHighlightMode('on')

// 중단예정
tray.setHighlightMode(false)
// 다음으로 대체됨
tray.setHighlightMode('off')
```

### `webContents`

```js
// 중단예정
webContents.openDevTools({ detach: true })
// 다음으로 대체됨
webContents.openDevTools({ mode: 'detach' })

// 제거됨
webContents.setSize(options)
// 대체할 API 없음
```

### `webFrame`

```js
// 중단예정
webFrame.registerURLSchemeAsSecure('app')
// 다음으로 대체됨
protocol.registerStandardSchemes(['app'], { secure: true })

// 중단예정
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// 다음으로 대체됨
protocol.registerStandardSchemes(['app'], { secure: true })
```

### `<webview>`

```js
// 제거됨
webview.setAttribute('disableguestresize', '')
// 대체할 API 없음

// 제거됨
webview.setAttribute('guestinstance', instanceId)
// 대체할 API 없음

// 키보드 리스너는 webview 태그에서 더이상 동작하지 않음
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```

### Node Headers URL

native Node 모듈을 빌드할 때 `.npmrc`파일의 `disturl`나 명령행 플래그의 `--dist-url`로 정의된 URL입니다.

더이상 사용하지 않음: https://atom.io/download/atom-shell

다음으로 대체: https://atom.io/download/electron

## 중대한 API 변화 (2.0)

다음 리스트는 Electron 2.0에서의 중대한 API 변화를 포함합니다.

### `BrowserWindow`

```js
// 중단예정
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// 다음으로 대체됨
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

### `menu`

```js
// 제거됨
menu.popup(browserWindow, 100, 200, 2)
// 다음으로 대체됨
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `nativeImage`

```js
// 제거됨
nativeImage.toPng()
// 다음으로 대체됨
nativeImage.toPNG()

// 제거됨
nativeImage.toJpeg()
// 다음으로 대체됨
nativeImage.toJPEG()
```

### `프로세스`

* `process.versions.electron` and `process.version.chrome` will be made read-only properties for consistency with the other `process.versions` properties set by Node.

### `webContents`

```js
// 제거됨
webContents.setZoomLevelLimits(1, 2)
// 다음으로 대체
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
// 제거됨
webFrame.setZoomLevelLimits(1, 2)
// 다음으로 대체
webFrame.setVisualZoomLevelLimits(1, 2)
```

### `<webview>`

```js
// 제거됨
webview.setZoomLevelLimits(1, 2)
// 다음으로 대체됨
webview.setVisualZoomLevelLimits(1, 2)
```

### Duplicate ARM Assets

Each Electron release includes two identical ARM builds with slightly different filenames, like `electron-v1.7.3-linux-arm.zip` and `electron-v1.7.3-linux-armv7l.zip`. The asset with the `v7l` prefix was added to clarify to users which ARM version it supports, and to disambiguate it from future armv6l and arm64 assets that may be produced.

The file *without the prefix* is still being published to avoid breaking any setups that may be consuming it. Starting at 2.0, the unprefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).