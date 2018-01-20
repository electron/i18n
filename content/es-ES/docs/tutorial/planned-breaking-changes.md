# Cambios planificados de API

La siguiente lista incluye las APIs que serán removidas en Electron 2.0.

No hay un tiempo estipulado para este lanzamiento pero las advertencias de solicitudes de cambio serán añadidas por lo menos 90 días antes del hecho.

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

```js
// Cambiar
let optionsA = {titleBarStyle: 'hidden-inset'}
let windowA = new BrowserWindow(optionsA)
// Reemplazar con
let optionsB = {titleBarStyle: 'hiddenInset'}
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

## `menu`

```js
// Cambiar
menu.popup(browserWindow, 100, 200, 2)
// Reemplazar con
menu.popup(browserWindow, {x: 100, y: 200, positioningItem: 2})
```

## `nativeImage`

```js
// Cambiar
nativeImage.toPng()
// Reemplazar con
nativeImage.toPNG()

// Cambiar
nativeImage.toJpeg()
// Reemplazar con
nativeImage.toJPEG()

// Cambiar
nativeImage.createFromBuffer(buffer, 1.0)
// Reemplazar con
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `proceso`

```js
// Deprecated
process.versions['atom-shell']
// Replace with
process.versions.electron
```

* `Versión de procesos de Electron` y `Versión de procesos de Chrome` Serán propiedades de solo lectura para la consistencia con otras propiedades de `process.versions` configuradas por Node.

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

```js
// Cambiar
webContents.setZoomLevelLimits(1, 2)
// Reemplazar con
webContents.setVisualZoomLevelLimits(1, 2)
```

## `webFrame`

```js
// Cambiar
webFrame.setZoomLevelLimits(1, 2)
// Reemplazar con
webFrame.setVisualZoomLevelLimits(1, 2)

// Cambiar
webFrame.registerURLSchemeAsSecure('app')
// Reemplazar con
protocol.registerStandardSchemes(['app'], {secure: true})

// Cambiar
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// Reemplazar con
protocol.registerStandardSchemes(['app'], {secure: true})
```

## `<webview>`

```js
// Cambiar
webview.setZoomLevelLimits(1, 2)
// Reemplazar con
webview.setVisualZoomLevelLimits(1, 2)
```

## URL de cabecera de nodo

Este es el URL especificado como `disturl` en un archivo `.npmrc` o como el comando de linea `--dist-url` al construir los módulos nativos de nodo.

Cambiar: https://atom.io/download/atom-shell

Reemplazar con: https://atom.io/download/electron

## Duplicado de brazo ARM

Cada lanzamiento de Electron incluye dos estructuras ARM idénticas con pequeña diferencias en el nombre de sus archivos, como `electron-v1.7.3-linux-arm.zip` y `electron-v1.7.3-linux-armv7l.zip`. El brazo con el prefijo `v7l` fue añadido para aclarar a los usuarios cuál versión de ARM soportaba, y para definir para un futuro los brazos armv6l y arm64 que sean producidos.

El archivo *sin el prefijo* todavía está siendo publicado para evitar romper alguna configuración que lo esté usando. Con el 2.0, el archivo sin el prefijo no será publicado.

Para obtener más información, vea [6986](https://github.com/electron/electron/pull/6986) y [7189](https://github.com/electron/electron/pull/7189).

## Comentarios `Arreglar`

La cadena `Arreglar` es usada en los comentarios del código para señalar cosas que deben ser arregladas para el lanzamiento del 2.0. Vea https://github.com/electron/electron/search?q=fixme