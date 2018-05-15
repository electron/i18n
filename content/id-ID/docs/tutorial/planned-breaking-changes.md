# Planned Breaking API Changes (3.0)

Daftar berikut mencakup API yang akan dihapus di Electron 3.0.

There is no timetable for when this release will occur but deprecation warnings will be added at least [one major version](electron-versioning.md#semver) beforehand.

## `aplikasi`

```js
// Tidak berlaku lagi
app.getAppMemoryInfo ()
// Ubah dengan
app.getAppMetrics ()
```

## `BrowserWindow`

```js
// Deprecated
let optionsA = {webPreferences: {blinkFeatures: ''}}
let windowA = new BrowserWindow(optionsA)
// Replace with
let optionsB = {webPreferences: {enableBlinkFeatures: ''}}
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

## `gambarasli`

```js
// Deprecated
nativeImage.createFromBuffer(buffer, 1.0)
// Replace with
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `layar`

```js
// Deprecated
screen.getMenuBarHeight()
// Replace with
screen.getPrimaryDisplay().workArea
```

## `sesi`

```js
// Tidak berlaku lagi
ses.setCertificateVerifyProc(function (hostname, certificate, callback) {
  callback(true)
})
// Ubah dengan
ses.setCertificateVerifyProc(function (request, callback) {
  callback(0)
})
```

## `Nampan`

```js
// Tidak berlaku lagi
tray.setHighlightMode (true)
// Ubah dengan
tray.setHighlightMode ('on')

// Tidak berlaku lagi
tray.setHighlightMode (salah)
// Ubah dengan
tray.setHighlightMode ('off')
```

## `kontenWeb`

```js
// Tidak berlaku lagi
webContents.openDevTools ({detach: true})
// Ubah dengan
webContents.openDevTools ({mode: 'detach'})
```

## `webBingkai`

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

## URL Node Header

Ini adalah URL yang ditentukan sebagai `disturl` pada file `.npmrc` atau sebagai `--dist-url` bendera perintah saat membangun modul Node asli.

Tidak berlaku lagi: https://atom.io/download/atom-shell

Ganti dengan: https://atom.io/download/electron

## `FIXME` komentar

The `FIXME` string is used in code comments to denote things that should be fixed for the 3.0 release. See https://github.com/electron/electron/search?q=fixme

# Planned Breaking API Changes (4.0)

Daftar berikut mencakup API yang akan dihapus di Electron 4.0.

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