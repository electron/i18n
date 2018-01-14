# नियोजित ब्रेकिंग ऐपीआई परिवर्तन

निम्नलिखित सूचि में वे ऐपीआई शामिल हैं जो कि इलेक्ट्रॉन 2.0 में से निकाल दी जायेंगी |

यह रिलीज़ कब होगा इसकी कोई समय सारिणी नहीं है पर निरस्तीकरण चेतावनियाँ 90 दिन पहले ही जोड़ दी जायेंगी |

## `एप्प`

```js
// निरस्त
app.getAppMemoryInfo()
// इससे बदलें
app.getAppMetrics()
```

## `ब्राउज़र विंडो`

```js
// निरस्त
let optionsA = {webPreferences: {blinkFeatures: ''}}
let windowA = new BrowserWindow(optionsA)
// इससे बदलें
let optionsB = {webPreferences: {enableBlinkFeatures: ''}}
let windowB = new BrowserWindow(optionsB)
```

```js
// निरस्त
let optionsA = {titleBarStyle: 'hidden-inset'}
let windowA = new BrowserWindow(optionsA)
// इससे बदलें
let optionsB = {titleBarStyle: 'hiddenInset'}
let windowB = new BrowserWindow(optionsB)
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

## `मेन्यु`

```js
// निरस्त
menu.popup(browserWindow, 100, 200, 2)
// इससे बदलें
menu.popup(browserWindow, {x: 100, y: 200, positioningItem: 2})
```

## `मूल छवि`

```js
// निरस्त
nativeImage.toPng() 
// इससे बदलें
nativeImage.toPNG()
 
// निरस्त
nativeImage.toJpeg() 
// इससे बदलें
nativeImage.toJPEG() 

// निरस्त
nativeImage.createFromBuffer(buffer, 1.0) 
// इससे बदलें
nativeImage.createFromBuffer(buffer, {   
scaleFactor: 1.0 
})
```

## `प्रक्रिया`

```js
// निरस्त
process.versions['atom-shell'] 
// इससे बदलें
process.versions.electron
```

* `process.versions.electron` and `process.version.chrome` will be made read-only properties for consistency with the other `process.versions` properties set by Node.

## `सत्र`

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

## `ट्रे`

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

## `वेबसामग्री`

```js
// Deprecated
webContents.openDevTools({detach: true})
// Replace with
webContents.openDevTools({mode: 'detach'})
```

```js
// Deprecated
webContents.setZoomLevelLimits(1, 2)
// Replace with
webContents.setVisualZoomLevelLimits(1, 2)
```

## `वेबफ्रेम`

```js
// Deprecated
webFrame.setZoomLevelLimits(1, 2)
// Replace with
webFrame.setVisualZoomLevelLimits(1, 2)

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
// Deprecated
webview.setZoomLevelLimits(1, 2)
// Replace with
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

## `FIXME` comments

The `FIXME` string is used in code comments to denote things that should be fixed for the 2.0 release. See https://github.com/electron/electron/search?q=fixme