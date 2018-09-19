# API Contract

Breaking changes will be documented here, and deprecation warnings added to JS code where possible, at least [one major version](../tutorial/electron-versioning.md#semver) before the change is made.

# `FIXME` टिप्पणियाँ

The `FIXME` string is used in code comments to denote things that should be fixed for future releases. See https://github.com/electron/electron/search?q=fixme

# Planned Breaking API Changes (4.0)

The following list includes the breaking API changes planned for Electron 4.0.

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

# Breaking API Changes (3.0)

The following list includes the breaking API changes in Electron 3.0.

## `एप्प`

```js
// Deprecated
app.getAppMemoryInfo()
// Replace with
app.getAppMetrics()

// Deprecated
const metrics = app.getAppMetrics()
const {memory} = metrics[0]
memory.privateBytes  // Deprecated property
memory.sharedBytes  // Deprecated property
```

## `ब्राउज़र विंडो`

```js
// Deprecated
let optionsA = {webPreferences: {blinkFeatures: ''}}
let windowA = new BrowserWindow(optionsA)
// Replace with
let optionsB = {webPreferences: {enableBlinkFeatures: ''}}
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

## `क्लिपबोर्ड`

```js
// निरस्त
clipboard.readRtf()
// इससे बदलें
clipboard.readRTF()
 
// निरस्त
clipboard.writeRtf() 
// इससे बदलें
clipboard.writeRTF()
 
// निरस्त
clipboard.readHtml() 
// इससे बदलें
clipboard.readHTML() 

// निरस्त
clipboard.writeHtml() 
// इससे बदलें
clipboard.writeHTML()
```

## `क्रेश रिपोर्टर`

```js
// निरस्त
crashReporter.start({
   companyName: 'Crashly',
   submitURL: 'https://crash.server.com',
   autoSubmit: true 
}) 
// इससे बदलें
crashReporter.start({
   companyName: 'Crashly',
   submitURL: 'https://crash.server.com',
   uploadToServer: true
 })
```

## `मूल छवि`

```js
// Deprecated
nativeImage.createFromBuffer(buffer, 1.0)
// Replace with
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `प्रक्रिया`

```js
// Deprecated
const info = process.getProcessMemoryInfo()
const privateBytes = info.privateBytes // deprecated property
const sharedBytes = info.sharedBytes // deprecated property
```

## `स्क्रीन`

```js
// Deprecated
screen.getMenuBarHeight()
// Replace with
screen.getPrimaryDisplay().workArea
```

## `सत्र`

```js
// निरस्त
ses.setCertificateVerifyProc(function (hostname, certificate, 
callback) {
   callback(true) 
}) 
// इससे बदलें
ses.setCertificateVerifyProc(function (request, callback) {
   callback(0) 
})
```

## `ट्रे`

```js
// निरस्त
tray.setHighlightMode(true)
// इससे बदलें
tray.setHighlightMode('on')

// निरस्त
tray.setHighlightMode(false)
// इससे बदलें
tray.setHighlightMode('off')
```

## `वेबसामग्री`

```js
// Deprecated
webContents.openDevTools({detach: true})
// Replace with
webContents.openDevTools({mode: 'detach'})

// Removed
webContents.setSize(options)
// There is no replacement for this API
```

## `वेबफ्रेम`

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

## नोड हेडर्स युआरएल

यह युआरएल एक `.npmrc` फाइल में `disturl` की तरह निर्दिष्ट है या मूल नोड मोडयुल्स का निर्माण करने के दौरान `--dist-url` कमांड लाइन फ्लैग की तरह |

निरस्त: https://atom.io/download/atom-shell

इससे बदलें: https://atom.io/download/electron

# Breaking API Changes (2.0)

The following list includes the breaking API changes made in Electron 2.0.

## `ब्राउज़र विंडो`

```js
// निरस्त
let optionsA = {titleBarStyle: 'hidden-inset'}
let windowA = new BrowserWindow(optionsA)
// इससे बदलें
let optionsB = {titleBarStyle: 'hiddenInset'}
let windowB = new BrowserWindow(optionsB)
```

## `मेन्यु`

```js
// Removed
menu.popup(browserWindow, 100, 200, 2)
// Replaced with
menu.popup(browserWindow, {x: 100, y: 200, positioningItem: 2})
```

## `मूल छवि`

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

## `प्रक्रिया`

* नोड द्वारा सेट की गयी अन्य `process.versions` प्रॉपर्टीज के संग अनुरूपता बनाये रखने के लिए `process.versions.electron` और `process.version.chrome` को रीड-ओनली प्रॉपर्टीज बनाया जायेगा |

## `वेबसामग्री`

```js
// Removed
webContents.setZoomLevelLimits(1, 2)
// Replaced with
webContents.setVisualZoomLevelLimits(1, 2)
```

## `वेबफ्रेम`

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

## अतिरिक्त ऐआरएम एसेट्स

Each Electron release includes two identical ARM builds with slightly different filenames, like `electron-v1.7.3-linux-arm.zip` and `electron-v1.7.3-linux-armv7l.zip`. The asset with the `v7l` prefix was added to clarify to users which ARM version it supports, and to disambiguate it from future armv6l and arm64 assets that may be produced.

The file *without the prefix* is still being published to avoid breaking any setups that may be consuming it. Starting at 2.0, the un-prefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).