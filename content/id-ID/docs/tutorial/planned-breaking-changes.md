# Perubahan API Pelacakan Terencana

Daftar berikut mencakup API yang akan dihapus di Electron 2.0.

Tidak ada jadwal kapan pembebasan ini akan terjadi namun tidak berlaku lagi peringatan akan ditambahkan setidaknya 90 hari sebelumnya.

## `aplikasi`

```js
// Tidak berlaku lagi
app.getAppMemoryInfo ()
// Ubah dengan
app.getAppMetrics ()
```

## `JendelaBrowser`

```js
// Deprecated
let optionsA = {webPreferences: {blinkFeatures: ''}}
let windowA = new BrowserWindow(optionsA)
// Replace with
let optionsB = {webPreferences: {enableBlinkFeatures: ''}}
let windowB = new BrowserWindow(optionsB)
```

```js
// Deprecated
let optionsA = {titleBarStyle: 'hidden-inset'}
let windowA = new BrowserWindow(optionsA)
// Replace with
let optionsB = {titleBarStyle: 'hiddenInset'}
let windowB = new BrowserWindow(optionsB)
```

## `clipboard`

```js
/ Tidak berlaku lagi
clipboard.readRtf ()
// Ubah dengan
clipboard.readRTF ()

// Tidak berlaku lagi
clipboard.writeRtf ()
// Ubah dengan
clipboard.writeRTF ()

// Tidak berlaku lagi
clipboard.readHtml ()
// Ubah dengan
clipboard.readHTML ()

// Tidak berlaku lagi
clipboard.writeHtml ()
// Ubah dengan
clipboard.writeHTML ()
```

## `kerusakanReporter`

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

## `menu`

```js
// Deprecated
menu.popup(browserWindow, 100, 200, 2)
// Replace with
menu.popup(browserWindow, {x: 100, y: 200, positioningItem: 2})
```

## `gambarasli`

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

## `proses`

```js
// Tidak berlaku lagi
process.versions ['atom-shell']
// Ubah dengan
process.versions.electron
```

* `process.versions.electron` and `process.version.chrome` will be made read-only properties for consistency with the other `process.versions` properties set by Node.

## `sesi`

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

## `Nampan`

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

## `kontenWeb`

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

## `webBingkai`

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

## URL Node Header

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.

Tidak berlaku lagi: https://atom.io/download/atom-shell

Ganti dengan: https://atom.io/download/electron

## Aset ARM Duplikat

Setiap rilis Elektron mencakup dua ARM identik yang dibangun dengan sedikit berbeda nama file, seperti `electron-v1.7.3-linux-arm.zip` dan `electron-v1.7.3-linux-armv7l.zip`. Aset dengan awalan `v7l` ditambahkan untuk mengklarifikasi kepada pengguna versi ARM yang didukungnya, dan untuk membedakannya dari aset armv6l dan arm64 masa depan yang mungkin diproduksi.

File *tanpa awalan* masih dipublikasikan untuk menghindari pemutusan setup yang mungkin memakannya Mulai dari 2.0, file yang tidak diawali akan tidak lagi dipublikasikan.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).

## `FIXME` comments

The `FIXME` string is used in code comments to denote things that should be fixed for the 2.0 release. See https://github.com/electron/electron/search?q=fixme