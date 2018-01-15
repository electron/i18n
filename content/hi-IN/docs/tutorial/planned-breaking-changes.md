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

* नोड द्वारा सेट की गयी अन्य `process.versions` प्रॉपर्टीज के संग अनुरूपता बनाये रखने के लिए `process.versions.electron` और `process.version.chrome` को रीड-ओनली प्रॉपर्टीज बनाया जायेगा |

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

```js
// निरस्त
webContents.setZoomLevelLimits(1, 2) 
// इससे बदलें
webContents.setVisualZoomLevelLimits(1, 2)
```

## `वेबफ्रेम`

```js
// निरस्त
webFrame.setZoomLevelLimits(1, 2) 
// इससे बदलें
webFrame.setVisualZoomLevelLimits(1, 2) 

// निरस्त
webFrame.registerURLSchemeAsSecure('app') 
// इससे बदलें
protocol.registerStandardSchemes(['app'], {secure: true}) 

// निरस्त
webFrame.registerURLSchemeAsPrivileged('app', {secure: true}) 
// इससे बदलें
protocol.registerStandardSchemes(['app'], {secure: true})
```

## `<webview>`

```js
// निरस्त
webview.setZoomLevelLimits(1, 2) 
// इससे बदलें
webview.setVisualZoomLevelLimits(1, 2)
```

## नोड हेडर्स युआरएल

यह युआरएल एक `.npmrc` फाइल में `disturl` की तरह निर्दिष्ट है या मूल नोड मोडयुल्स का निर्माण करने के दौरान `--dist-url` कमांड लाइन फ्लैग की तरह |

निरस्त: https://atom.io/download/atom-shell

इससे बदलें: https://atom.io/download/electron

## अतिरिक्त ऐआरएम एसेट्स

हर इलेक्ट्रॉन रिलीज़ में थोड़े अलग फाइल नामों के साथ दो समरूप ऐआरएम बिल्डस शामिल होती हैं, जैसे कि `electron-v1.7.3-linux-arm.zip` और `electron-v1.7.3-linux-armv7l.zip` | `v7l` नाम के साथ मौज़ूद एसेट उपयोगकर्ताओं के यह बताने के लिए है कि वह कौन सा ऐआरएम संस्करण समर्थित करता है, और साथ ही उसे भविष्य में आने वाले ऐआरएमवी61 और ऐआरएमवी64 एसेट्स से अलग स्पष्ट करने के लिए |

*बिना v71 नाम के* मौज़ूद फाइल अभी भी प्रकाशित की जा रही है ताकि उसे उपयोग करने वाले सेटअप में कोई त्रुटी न आ जाये | पर 2.0 संस्करण से, बिना v71 नाम के मौज़ूद फाइल प्रकाशित होना बंद हो जायेगी |

और अधिक जानकारी के लिए, देखें [6986](https://github.com/electron/electron/pull/6986) और [7189](https://github.com/electron/electron/pull/7189) |

## `FIXME` टिप्पणियाँ

The `FIXME` string is used in code comments to denote things that should be fixed for the 2.0 release. See https://github.com/electron/electron/search?q=fixme