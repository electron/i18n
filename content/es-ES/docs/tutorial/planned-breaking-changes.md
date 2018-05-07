# Planned Breaking API Changes (3.0)

La siguiente lista incluye las APIs que serán removidas en Electron 3.0.

There is no timetable for when this release will occur but deprecation warnings will be added at least [one major version](electron-versioning.md#semver) beforehand.

## `app`

```js
// Cambiar
app.getAppMemoryInfo()
// Reemplazar con
app.getAppMetrics()
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
// Cambiar
clipboard.readRtf()
// Reemplazar con
clipboard.readRTF()

// Cambiar
clipboard.writeRtf()
// Reemplazar con
clipboard.writeRTF()

// Cambiar
clipboard.readHtml()
// Reemplazar con
clipboard.readHTML()

// Cambiar
clipboard.writeHtml()
// Reemplazar con
clipboard.writeHTML()
```

## `crashReporter`

```js
// Cambiar
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Reemplazar con
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
// Cambiar
ses.setCertificateVerifyProc(function (hostname, certificate, callback) {
  callback(true)
})
// Reemplazar con
ses.setCertificateVerifyProc(function (request, callback) {
  callback(0)
})
```

## `Tray`

```js
// Cambiar
tray.setHighlightMode(true)
// Reemplazar con
tray.setHighlightMode('on')

// Cambiar
tray.setHighlightMode(false)
// Reemplazar con
tray.setHighlightMode('off')
```

## `webContents`

```js
// Cambiar
webContents.openDevTools({detach: true})
// Reemplazar con
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

## URL de cabecera de nodo

Este es el URL especificado como `disturl` en un archivo `.npmrc` o como el comando de linea `--dist-url` al construir los módulos nativos de nodo.

Cambiar: https://atom.io/download/atom-shell

Reemplazar con: https://atom.io/download/electron

## Comentarios `Arreglar`

The `FIXME` string is used in code comments to denote things that should be fixed for the 3.0 release. See https://github.com/electron/electron/search?q=fixme

# Planned Breaking API Changes (4.0)

La siguiente lista incluye las APIs que serán removidas en Electron 4.0.

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