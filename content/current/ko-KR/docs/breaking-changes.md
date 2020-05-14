# 중대한 변화

주요 변경사항은 여기에 기록됩니다. and deprecation warnings added to JS code where possible, at least [one major version](tutorial/electron-versioning.md#semver) before the change is made.

### Types of Breaking Changes

This document uses the following convention to categorize breaking changes:

- **API Changed:** An API was changed in such a way that code that has not been updated is guaranteed to throw an exception.
- **Behavior Changed:** The behavior of Electron has changed, but not in such a way that an exception will necessarily be thrown.
- **Default Changed:** Code depending on the old default may break, not necessarily throwing an exception. The old behavior can be restored by explicitly specifying the value.
- **Deprecated:** An API was marked as deprecated. The API will continue to function, but will emit a deprecation warning, and will be removed in a future release.
- **Removed:** An API or feature was removed, and is no longer supported by Electron.

## 중단될 예정 API (12.0)

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

## 중단될 예정 API (11.0)

## 중단될 예정 API (10.0)

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

Electron9에서 `enableRemoteModule` WebPreferences 옵션을 명시적으로 활성화하지 않고 remote모듈을 사용하면 경고 발생됩니다. Electron 10에서는 remote 모듈은 기본으로 비활성화됩니다. remote 모듈을 사용하기 위해서는 반드시 WebPreferences에서 `enableRemoteModule: true`를 설정해야합니다.

```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

우리는 [remote 모듈에서 벗어나길 권장합니다.](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)

## 중단될 예정 API (9.0)

### Default Changed: Loading non-context-aware native modules in the renderer process is disabled by default

As of Electron 9 we do not allow loading of non-context-aware native modules in the renderer process.  This is to improve security, performance and maintainability of Electron as a project.

If this impacts you, you can temporarily set `app.allowRendererProcessReuse` to `false` to revert to the old behavior.  This flag will only be an option until Electron 11 so you should plan to update your native modules to be context aware.

For more detailed information see [#18397](https://github.com/electron/electron/issues/18397).

### Removed: `<webview>.getWebContents()`

Electron 8.0에서 중단예정이던 이 API는 제거됩니다.

```js
// Electron 9.0에서 제거
webview.getWebContents()
// 다음으로 대체
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Removed: `webFrame.setLayoutZoomLevelLimits()`

Chromium은 레이아웃 확대/축소 변경 제한에 대한 지원을 중단했습니다. 이를 관리하는 Electron의 용량을 넘어섭니다. 함수는 Electron 8.x에서 중단예정이었고 Electron 9.x에서 제거됩니다. 레이아웃 확대/축소 제한은 이제 최소 0.25에서 최대 5.0으로 고정되며 [여기](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11)에 정의되어 있습니다.

### Behavior Changed: Sending non-JS objects over IPC now throws an exception

Electron 8.0에서 IPC는 Structured Clone Algorithm를 사용하도록 변경되었고 이는 유의미한 성능향상을 가져왔습니다. 전환을 쉽게하기 위해 구식 IPC 직렬화 알고리즘이 유지되어 Structured Clone으로 직렬화 할 수 없는 일부 개체에 사용되었습니다. 특히 DOM 객체 (예: `Element`, `Location` 및 `DOMMatrix`), C ++ 클래스가 지원하는 Node.js 객체 (예: `process.env`, `Stream`의 일부 멤버) 및 C ++ 클래스가 지원하는 Electron 객체 (예: `WebContents`, `BrowserWindow` 및 `WebFrame`)는 구조적 클론으로 직렬화 할 수 없습니다. 이전 알고리즘이 호출될 때마다 사용 중단 경고가 표시됩니다.

Electron 9.0에서는 이전의 직렬화 알고리즘이 제거되었으며, 직렬화 할 수 없는 객체를 전송하면 "객체를 복제 할 수 없습니다" 오류가 발생합니다.

### API Changed: `shell.openItem` is now `shell.openPath`

The `shell.openItem` API has been replaced with an asynchronous `shell.openPath` API. You can see the original API proposal and reasoning [here](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## 중단될 예정 API (8.0)

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

Chromium은 레이아웃 확대/축소 변경 제한에 대한 지원을 중단했습니다. 이를 관리하는 Electron의 용량을 넘어섭니다. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

## 중단될 예정 API (7.0)

### Deprecated: Atom.io Node Headers URL

native Node 모듈을 빌드할 때 `.npmrc`파일의 `disturl`나 명령행 플래그의 `--dist-url`로 정의된 URL입니다.  두가지 모두 가까운 미래에는 지원할 예정이지만 전환하는 것이 좋습니다.

더이상 사용하지 않음: https://atom.io/download/electron

다음으로 대체: https://electronjs.org/headers

### API Changed: `session.clearAuthCache()` no longer accepts options

`session.clearAuthCache` API는 더이상 지울 항목에 대한 옵션을 허용하지 않고 모든 캐시를 무조건 지웁니다.

```js
// 더이상 사용하지 않음
session.clearAuthCache({ type: 'password' })
// 다음으로 대체됨
session.clearAuthCache()
```

### API Changed: `powerMonitor.querySystemIdleState` is now `powerMonitor.getSystemIdleState`

```js
// Electron 7.0 에서 제거됨
powerMonitor.querySystemIdleState(threshold, callback)
// 동기 API로 대체됨
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### API Changed: `powerMonitor.querySystemIdleTime` is now `powerMonitor.getSystemIdleState`

```js
// Electron 7.0 에서 제거됨
powerMonitor.querySystemIdleTime(callback)
// 동기 API로 대체됨
const idleTime = powerMonitor.getSystemIdleTime()
```

### API Changed: `webFrame.setIsolatedWorldInfo` replaces separate methods

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

### Removed: `marked` property on `getBlinkMemoryInfo`

이 프로퍼티는 Chromium 77에서 제거되어 더이상 소용이 없습니다.

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

## 중단될 예정 API (6.0)

### API Changed: `win.setMenu(null)` is now `win.removeMenu()`

```js
// Deprecated
win.setMenu(null)
// Replace with
win.removeMenu()
```

### API Changed: `contentTracing.getTraceBufferUsage()` is now a promise

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

### API Changed: `electron.screen` in the renderer process should be accessed via `remote`

```js
// Deprecated
require('electron').screen
// Replace with
require('electron').remote.screen
```

### API Changed: `require()`ing node builtins in sandboxed renderers no longer implicitly loads the `remote` version

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

### Deprecated: `powerMonitor.querySystemIdleState` replaced with `powerMonitor.getSystemIdleState`

```js
// 더 이상 사용하지 않음
powerMonitor.querySystemIdleState(threshold, callback)
// 동기 API로 대체됨
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

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

## 중단될 예정 API (5.0)

### Default Changed: `nodeIntegration` and `webviewTag` default to false, `contextIsolation` defaults to true

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

### Behavior Changed: `nodeIntegration` in child windows opened via `nativeWindowOpen`

Child windows opened with the `nativeWindowOpen` option will always have Node.js integration disabled, unless `nodeIntegrationInSubFrames` is `true`.

### API Changed: Registering privileged schemes must now be done before app ready

Renderer process APIs `webFrame.registerURLSchemeAsPrivileged` and `webFrame.registerURLSchemeAsBypassingCSP` as well as browser process API `protocol.registerStandardSchemes` have been removed. A new API, `protocol.registerSchemesAsPrivileged` has been added and should be used for registering custom schemes with the required privileges. Custom schemes are required to be registered before app ready.

### Deprecated: `webFrame.setIsolatedWorld*` replaced with `webFrame.setIsolatedWorldInfo`

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

## 중단될 예정 API (4.0)

다음 리스트는 Electron 4.0에서의 중대한 API 변화를 포함합니다.

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

The file _without the prefix_ is still being published to avoid breaking any setups that may be consuming it. Starting at 2.0, the unprefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).
