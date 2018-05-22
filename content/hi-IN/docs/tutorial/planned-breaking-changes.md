# Planned Breaking API Changes (3.0)

निम्नलिखित सूचि में वे ऐपीआई शामिल हैं जो कि इलेक्ट्रॉन 3.0 में से निकाल दी जायेंगी |

There is no timetable for when this release will occur but deprecation warnings will be added at least [one major version](electron-versioning.md#semver) beforehand.

## `एप्प`

```js
// निरस्त
app.getAppMemoryInfo()
// इससे बदलें
app.getAppMetrics()
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
// निरस्त
webContents.openDevTools({detach: true}) 
// इससे बदलें
webContents.openDevTools({mode: 'detach'})
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

## नोड हेडर्स युआरएल

यह युआरएल एक `.npmrc` फाइल में `disturl` की तरह निर्दिष्ट है या मूल नोड मोडयुल्स का निर्माण करने के दौरान `--dist-url` कमांड लाइन फ्लैग की तरह |

निरस्त: https://atom.io/download/atom-shell

इससे बदलें: https://atom.io/download/electron

## `FIXME` टिप्पणियाँ

The `FIXME` string is used in code comments to denote things that should be fixed for the 3.0 release. See https://github.com/electron/electron/search?q=fixme

# Planned Breaking API Changes (4.0)

निम्नलिखित सूचि में वे ऐपीआई शामिल हैं जो कि इलेक्ट्रॉन 4.0 में से निकाल दी जायेंगी |

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