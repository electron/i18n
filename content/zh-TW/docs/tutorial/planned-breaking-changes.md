# Planned Breaking API Changes (3.0)

這份清單包含將會在 Electron 3.0 中被拿掉的 API。

There is no timetable for when this release will occur but deprecation warnings will be added at least [one major version](electron-versioning.md#semver) beforehand.

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

## `nativeImage`

```js
// Deprecated
nativeImage.createFromBuffer(buffer, 1.0)
// Replace with
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
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

## `webFrame`

```js
// Deprecated
webFrame.registerURLSchemeAsSecure('app')
// Replace with
protocol.registerStandardSchemes(['app'], {secure: true})

// Deprecated
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// Replace with
protocol.registerStandardSchemes(['app'], {secure: true})
```

## Node Headers URL

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.

已被取代: https://atom.io/download/atom-shell

請改用: https://atom.io/download/electron

## `FIXME` 註解

The `FIXME` string is used in code comments to denote things that should be fixed for the 3.0 release. See https://github.com/electron/electron/search?q=fixme

# Planned Breaking API Changes (4.0)

這份清單包含將會在 Electron 4.0 中被拿掉的 API。

There is no timetable for when this release will occur but deprecation warnings will be added at least [one major version](electron-versioning.md#semver) beforehand.

## `app.makeSingleInstance`

```js
// Deprecated
app.makeSingleInstance(function (argv, cwd) {

})
// Replace with
app.requestSingleInstanceLock()
app.on('second-instance', function (argv, cwd) {

})
```

## `app.releaseSingleInstance`

```js
// Deprecated
app.releaseSingleInstance()
// Replace with
app.releaseSingleInstanceLock()
```