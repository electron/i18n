# 중대한 변화

주요 변경사항은 여기에 기록됩니다. and deprecation warnings added to JS code where possible, at least [one major version](../tutorial/electron-versioning.md#semver) before the change is made.

# `FIXME` 주석

코드 주석으로 `FIXME` 문자는 미래의 릴리즈에서 수정되어야 함을 표시합니다. https://github.com/electron/electron/search?q=fixme 를 참조하세요.

# 중단될 예정 API (7.0)

## `shell.openExternalSync(url[, options])`

```js
// Deprecated
shell.openExternalSync(url)
// Replace with
async function openThing (url) {
  await shell.openExternal(url)
}
```

# 중단될 예정 API (6.0)

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
// 더 이상 사용하지 않음
powerMonitor.querySystemIdleState(threshold, callback)
// 동기 API로 대체됨
const idleState = getSystemIdleState(threshold)
```

## `powerMonitor.querySystemIdleTime`

```js
// 더 이상 사용하지 않음
powerMonitor.querySystemIdleTime(callback)
// 동기 API로 대체됨
const idleTime = getSystemIdleTime()
```

## `Tray`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

# 중단될 예정 API (5.0)

## `new BrowserWindow({ webPreferences })`

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

# 중단될 예정 API (4.0)

다음 리스트는 Electron 4.0에서의 중대한 API 변화를 포함합니다.

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

## `app.releaseSingleInstance`

```js
// Deprecated
app.releaseSingleInstance()
// Replace with
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

# 중대한 API 변화 (3.0)

다음 리스트는 Electron 3.0에서의 중대한 API 변화를 포함합니다.

## `app`

```js
// 중단예정
app.getAppMemoryInfo()
// 다음으로 대체됨
app.getAppMetrics()

// 중단예정
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Deprecated property
```

## `BrowserWindow`

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

## `clipboard`

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

## `crashReporter`

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

## `nativeImage`

```js
// 중단예정
nativeImage.createFromBuffer(buffer, 1.0)
// 다음으로 대체됨
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `프로세스`

```js
// 중단예정
const info = process.getProcessMemoryInfo()
```

## `screen`

```js
// 중단예정
screen.getMenuBarHeight()
// 다음으로 대체됨
screen.getPrimaryDisplay().workArea
```

## `session`

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

## `Tray`

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

## `webContents`

```js
// 중단예정
webContents.openDevTools({ detach: true })
// 다음으로 대체됨
webContents.openDevTools({ mode: 'detach' })

// 제거됨
webContents.setSize(options)
// 대체할 API 없음
```

## `webFrame`

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

## `<webview>`

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

## Node Headers URL

native Node 모듈을 빌드할 때 `.npmrc`파일의 `disturl`나 명령행 플래그의 `--dist-url`로 정의된 URL입니다.

더이상 사용하지 않음: https://atom.io/download/atom-shell

다음으로 대체: https://atom.io/download/electron


# 중대한 API 변화 (2.0)

다음 리스트는 Electron 2.0에서의 중대한 API 변화를 포함합니다.

## `BrowserWindow`

```js
// 중단예정
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// 다음으로 대체됨
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

## `menu`

```js
// 제거됨
menu.popup(browserWindow, 100, 200, 2)
// 다음으로 대체됨
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

## `nativeImage`

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

## `프로세스`

* `process.versions.electron` and `process.version.chrome` will be made read-only properties for consistency with the other `process.versions` properties set by Node.

## `webContents`

```js
// 제거됨
webContents.setZoomLevelLimits(1, 2)
// 다음으로 대체
webContents.setVisualZoomLevelLimits(1, 2)
```

## `webFrame`

```js
// 제거됨
webFrame.setZoomLevelLimits(1, 2)
// 다음으로 대체
webFrame.setVisualZoomLevelLimits(1, 2)
```

## `<webview>`

```js
// 제거됨
webview.setZoomLevelLimits(1, 2)
// 다음으로 대체됨
webview.setVisualZoomLevelLimits(1, 2)
```

## Duplicate ARM Assets

Each Electron release includes two identical ARM builds with slightly different filenames, like `electron-v1.7.3-linux-arm.zip` and `electron-v1.7.3-linux-armv7l.zip`. The asset with the `v7l` prefix was added to clarify to users which ARM version it supports, and to disambiguate it from future armv6l and arm64 assets that may be produced.

The file _without the prefix_ is still being published to avoid breaking any setups that may be consuming it. Starting at 2.0, the un-prefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).
