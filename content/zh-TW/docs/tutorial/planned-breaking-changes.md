# 預計變更的 API

這份清單包含將會在 Electron 2.0 中被拿掉的 API。

There is no timetable for when this release will occur but deprecation warnings will be added at least 90 days beforehand.

## `app`

```js
// 已被取代
app.getAppMemoryInfo()
// 請寫成
app.getAppMetrics()
```

## `BrowserWindow`

```js
// 已被取代
let optionsA = {webPreferences: {blinkFeatures: ''}}
let windowA = new BrowserWindow(optionsA)
// 請寫成
let optionsB = {webPreferences: {enableBlinkFeatures: ''}}
let windowB = new BrowserWindow(optionsB)
```

```js
// 已被取代
let optionsA = {titleBarStyle: 'hidden-inset'}
let windowA = new BrowserWindow(optionsA)
// 請寫成
let optionsB = {titleBarStyle: 'hiddenInset'}
let windowB = new BrowserWindow(optionsB)
```

## `clipboard`

```js
// 已被取代
clipboard.readRtf()
// 請寫成
clipboard.readRTF()

// 已被取代
clipboard.writeRtf()
// 請寫成
clipboard.writeRTF()

// 已被取代
clipboard.readHtml()
// 請寫成
clipboard.readHTML()

// 已被取代
clipboard.writeHtml()
// 請寫成
clipboard.writeHTML()
```

## `crashReporter`

```js
// 已被取代
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// 請寫成
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

## `menu`

```js
// 已被取代
menu.popup(browserWindow, 100, 200, 2)
// 請寫成
menu.popup(browserWindow, {x: 100, y: 200, positioningItem: 2})
```

## `nativeImage`

```js
// 已被取代
nativeImage.toPng()
// 請寫成
nativeImage.toPNG()

// 已被取代
nativeImage.toJpeg()
// 請寫成
nativeImage.toJPEG()

// 已被取代
nativeImage.createFromBuffer(buffer, 1.0)
// 請寫成
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `process`

```js
// 已被取代
process.versions['atom-shell']
// 請寫成
process.versions.electron
```

* `process.versions.electron` 及 `process.version.chrome` 將變為唯讀的屬性，與其他由 Node 設定的 `process.versions` 一致。

## `session`

```js
// 已被取代
ses.setCertificateVerifyProc(function (hostname, certificate, callback) {
  callback(true)
})
// 請寫成
ses.setCertificateVerifyProc(function (request, callback) {
  callback(0)
})
```

## `Tray`

```js
// 已被取代
tray.setHighlightMode(true)
// 請寫成
tray.setHighlightMode('on')

// 已被取代
tray.setHighlightMode(false)
// 請寫成
tray.setHighlightMode('off')
```

## `webContents`

```js
// 已被取代
webContents.openDevTools({detach: true})
// 請寫成
webContents.openDevTools({mode: 'detach'})
```

```js
// 已被取代
webContents.setZoomLevelLimits(1, 2)
// 請寫成
webContents.setVisualZoomLevelLimits(1, 2)
```

## `webFrame`

```js
// 已被取代
webFrame.setZoomLevelLimits(1, 2)
// 請寫成
webFrame.setVisualZoomLevelLimits(1, 2)

// 已被取代
webFrame.registerURLSchemeAsSecure('app')
// 請寫成
protocol.registerStandardSchemes(['app'], {secure: true})

// 已被取代
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// 請寫成
protocol.registerStandardSchemes(['app'], {secure: true})
```

## `<webview>`

```js
// 已被取代
webview.setZoomLevelLimits(1, 2)
// 請寫成
webview.setVisualZoomLevelLimits(1, 2)
```

## Node Headers URL

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.

Deprecated: https://atom.io/download/atom-shell

Replace with: https://atom.io/download/electron

## Duplicate ARM Assets

Each Electron release includes two identical ARM builds with slightly different filenames, like `electron-v1.7.3-linux-arm.zip` and `electron-v1.7.3-linux-armv7l.zip`. The asset with the `v7l` prefix was added to clarify to users which ARM version it supports, and to disambiguate it from future armv6l and arm64 assets that may be produced.

The file *without the prefix* is still being published to avoid breaking any setups that may be consuming it. Starting at 2.0, the un-prefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).

## `FIXME` 註解

The `FIXME` string is used in code comments to denote things that should be fixed for the 2.0 release. See https://github.com/electron/electron/search?q=fixme