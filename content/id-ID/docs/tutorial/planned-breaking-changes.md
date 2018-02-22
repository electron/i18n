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

## `BrowserWindow`

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

## `asli`

```js
// Tidak berlaku lagi
nativeImage.toPng()
// Ubah dengan
nativeImage.toPNG()

// Tidak berlaku lagi
nativeImage.toJpeg()
// Ubah dengan
nativeImage.toJPEG()

// Ubah dengan
nativeImage.createFromBuffer(buffer, 1.0)
// Ubah dengan
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

* `proses.versi.electron` dan `proses.versi.chrome` akan dibuat properti hanya baca untuk konsistensi dengan proses `proses.versi` properti yang ditetapkan oleh Node.

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

```js
// Deprecated webContents.setZoomLevelLimits (1, 2) / / ganti dengan webContents.setVisualZoomLevelLimits (1, 2)
```

## `webBingkai`

```js
// Deprecated webFrame.setZoomLevelLimits (1, 2) / / ganti dengan webFrame.setVisualZoomLevelLimits (1, 2) / / Deprecated webFrame.registerURLSchemeAsSecure('app') / / ganti dengan protocol.registerStandardSchemes (['app'], {secure: true}) / / Usang webFrame.registerURLSchemeAsPrivileged ('apl', {secure: true}) / / ganti dengan protocol.registerStandardSchemes (['app'], {secure: true})
```

## `<webview>`

```js
// Deprecated webContents.setZoomLevelLimits (1, 2) / / ganti dengan webContents.setVisualZoomLevelLimits (1, 2)
```

## URL Node Header

Ini adalah URL yang ditentukan sebagai `disturl` pada file `.npmrc` atau sebagai `--dist-url` bendera perintah saat membangun modul Node asli.

Tidak berlaku lagi: https://atom.io/download/atom-shell

Ganti dengan: https://atom.io/download/electron

## Aset ARM Duplikat

Setiap rilis Elektron mencakup dua ARM identik yang dibangun dengan sedikit berbeda nama file, seperti `electron-v1.7.3-linux-arm.zip` dan `electron-v1.7.3-linux-armv7l.zip`. Aset dengan awalan `v7l` ditambahkan untuk mengklarifikasi kepada pengguna versi ARM yang didukungnya, dan untuk membedakannya dari aset armv6l dan arm64 masa depan yang mungkin diproduksi.

File *tanpa awalan* masih dipublikasikan untuk menghindari pemutusan setup yang mungkin memakannya Mulai dari 2.0, file yang tidak diawali akan tidak lagi dipublikasikan.

Untuk detailnya, lihat [6986](https://github.com/electron/electron/pull/6986) dan [7189](https://github.com/electron/electron/pull/7189).

## `FIXME` komentar

`FIXME` string digunakan dalam komentar kode untuk menunjukkan hal-hal yang perlu diperbaiki untuk rilis 2.0. Lihat https://github.com/electron/electron/search?q=fixme