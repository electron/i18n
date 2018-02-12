# Planlanmış API Değişimleri

Takip eden liste, Electron 2.0'da kaldırılacak API'leri içerir.

Bu sürümün ne zaman ortaya çıkacağına dair herhangi bir zaman çizelgesi mevcut değildir ancak kullanımdan kaldırılma uyarıları en az 90 gün önceden eklenecektir.

## `Uygulama`

```js
// Kullanım Dışı
app.getAppMemoryInfo()
// İle değiştirin
app.getAppMetrics()
```

## `BrowserWindow`

```js
// Kullanım Dışı
let optionsA = {webPreferences: {blinkFeatures: ''}}
let windowA = new BrowserWindow(optionsA)
// İle Değiştirin
let optionsB = {webPreferences: {enableBlinkFeatures: ''}}
let windowB = new BrowserWindow(optionsB)
 
Context | Request Context

```

```js
// Kullanım Dışı
let optionsA = {titleBarStyle: 'hidden-inset'}
let windowA = new BrowserWindow(optionsA)
// İle Değiştirin
let optionsB = {titleBarStyle: 'hiddenInset'}
let windowB = new BrowserWindow(optionsB)
```

## `pano`

```js
// Deprecated
clipboard.readRtf()
// Replace with
clipboard.readRTF()

// Deprecated
clipboard.writeRtf()
// Replace with
clipboard.writeRTF()

// Deprecated
clipboard.readHtml()
// Replace with
clipboard.readHTML()

// Deprecated
clipboard.writeHtml()
// Replace with
clipboard.writeHTML()
```

## `crashReporter`

```js
// Kullanım Dışı
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// İle Değiştirin
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

## `menü`

```js
// Kullanım Dışı
menu.popup(browserWindow, 100, 200, 2)
// İle Değiştirin
menu.popup(browserWindow, {x: 100, y: 200, positioningItem: 2})
```

## `nativeImage`

```js
// Deprecated
nativeImage.toPng()
// Replace with
nativeImage.toPNG()

// Deprecated
nativeImage.toJpeg()
// Replace with
nativeImage.toJPEG()

// Deprecated
nativeImage.createFromBuffer(buffer, 1.0)
// Replace with
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `işlem`

```js
// Kullanım Dışı
process.versions['atom-shell']
// İle Değiştirin
process.versions.electron
```

* `process.versions.electron` ve `process.version.chrome` okunacaktır - diğer tutarlılık için sadece özellikler `process.versions` Node tarafından belirlenen özellikler.

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
```

```js
// Deprecated
webContents.setZoomLevelLimits(1, 2)
// Replace with
webContents.setVisualZoomLevelLimits(1, 2)
```

## `webFrame`

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

## Node Başlıkları URLsi

Bu, bir `.npmrc` dosyasında `disturl` olarak veya yerel Node modülleri oluştururken `--dist-url` komut satırı işareti olarak belirtilen URL'dir.

Kullanımdan kaldırıldı: https://atom.io/download/atom-shell

Şununla değiştirildi: https://atom.io/download/electron

## ARM Varlıklarını Çoğaltın

Her Electron sürümü, `electron-v1.7.3-linux-arm.zip` ve `electron-v1.7.3-linux-armv7l.zip` gibi, az farklılık içeren dosya adlarıyla iki özdeş ARM yapısı içerir. `v7l` ünvanlı öğe, kullanıcılara hangi ARM sürümünü desteklediğini açıklamak ve gelecekte üretilebilecek armv6l ve arm64 öğelerinden ayırt etmek için eklendi.

Herhangi bir dosya kırılmasını önlemek *without the prefix* için dosya hala yayınlanıyor. 2.0 ' dan başlayarak öneksiz dosya artık yayınlanmayacak.

Ayrıntılar için bknz. [6986](https://github.com/electron/electron/pull/6986) ve [7189](https://github.com/electron/electron/pull/7189).

## `FIXME` yorumları

`FIXME` dizesi, kod yorumlarında olması gereken şeyleri belirtmek için kullanılır 2.0 sürümü için sabit