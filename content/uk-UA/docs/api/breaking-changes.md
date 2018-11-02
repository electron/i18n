# Угода API

Зміни, які ламають роботу застосунку, будуть документуватися тут, також попередження про припинення підримки по можливості додано в JS код, як мінімум за [одне велике оновлення](../tutorial/electron-versioning.md#semver) до змін.

# Коментарі `FIXME`

Стрічки `FIXME` використовуються в коментарях коду для маркування речей, які мають бути виправлені для майбутній релізів. Дивіться https://github.com/electron/electron/search?q=fixme

# Заплановані Зміни API (4.0)

Даний список містить заплановані API зміни для Electron 4.0.

## `app.makeSingleInstance`

```js
// Припиняється підтримка
app.makeSingleInstance(function (argv, cwd) {

})
// Замінити на
app.requestSingleInstanceLock()
app.on('second-instance', function (argv, cwd) {

})
```

## `app.releaseSingleInstance`

```js
// Припиняється підтримка
app.releaseSingleInstance()
// Замінити на
app.releaseSingleInstanceLock()
```

# Зміни API (3.0)

Даний список містить API зміни для Electron 3.0.

## `app`

```js
// Припиняється підтримка
app.getAppMemoryInfo()
// Замінити на
app.getAppMetrics()

// Припиняється підтримка
const metrics = app.getAppMetrics()
const {memory} = metrics[0]
memory.privateBytes  // Припиняється підтримка властивості
memory.sharedBytes  // Припиняється підтримка властивості
```

## `BrowserWindow`

```js
// Припиняється підтримка
let optionsA = {webPreferences: {blinkFeatures: ''}}
let windowA = new BrowserWindow(optionsA)
// Замінити на
let optionsB = {webPreferences: {enableBlinkFeatures: ''}}
let windowB = new BrowserWindow(optionsB)

// Припиняється підтримка
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // зробити щось
  }
})
// Замінити на
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // зробити щось
  }
})
```

## `clipboard`

```js
// Припиняється підтримка
clipboard.readRtf()
// Замінити на
clipboard.readRTF()

// Припиняється підтримка
clipboard.writeRtf()
// Замінити на
clipboard.writeRTF()

// Припиняється підтримка
clipboard.readHtml()
// Замінити на
clipboard.readHTML()

// Припиняється підтримка
clipboard.writeHtml()
// Замінити на
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

## `процес`

```js
// Deprecated
const info = process.getProcessMemoryInfo()
const privateBytes = info.privateBytes // deprecated property
const sharedBytes = info.sharedBytes // deprecated property
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
ses.setCertificateVerifyProc(function (hostname, certificate, callback) {
  callback(true)
})
// Replace with
ses.setCertificateVerifyProc(function (request, callback) {
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
webContents.openDevTools({detach: true})
// Replace with
webContents.openDevTools({mode: 'detach'})

// Removed
webContents.setSize(options)
// There is no replacement for this API
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
let optionsA = {titleBarStyle: 'hidden-inset'}
let windowA = new BrowserWindow(optionsA)
// Replace with
let optionsB = {titleBarStyle: 'hiddenInset'}
let windowB = new BrowserWindow(optionsB)
```

## `menu`

```js
// Removed
menu.popup(browserWindow, 100, 200, 2)
// Replaced with
menu.popup(browserWindow, {x: 100, y: 200, positioningItem: 2})
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

## `процес`

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