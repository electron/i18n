# Contrato de API

Los cambios de ruptura se documentaran aquí y se agregaran advertencias de desaprobación al código JS cuando sea posible, al menos [una versión superior](../tutorial/electron-versioning.md#semver) se publicará, antes de que se realice cualquier cambio.

# Comentarios `FIXME`

El string `FIXME` se usa en las cadenas de código para indicar que cualquier problema debería solucionarse para futuras versiones. Puede ver: https://github.com/electron/electron/search?q=fixme para mas información

# Cambios planeados en la API(4.0)

La siguiente lista incluye los cambios planeados en la API 4.0 de Electrón.

## `app.makeSingleInstance`

```js
// Deprecated
app.makeSingleInstance(function (argv, cwd) {

})
// Replace with
app.requestSingleInstanceLock()
app.on('second-instance', function (event, argv, cwd) {

})
```

## `app.releaseSingleInstance`

```js
// Obsoleto
app.releaseSingleInstance()
// Reemplazar con
app.releaseSingleInstanceLock()
```

# Cambios en la API(3.0)

La siguiente lista incluye cambios efectuados en la API 3.0 de Electrón.

## `app`

```js
// Obsoleto
app.getAppMemoryInfo()
// Remplazar con
app.getAppMetrics()

// Obsoleto
const metrics = app.getAppMetrics()
const {memory} = metrics[0]
memory.privateBytes  // Propiedad Obsoleta
memory.sharedBytes  // Propiedad Obsoleta
```

## `BrowserWindow`

```js
// Obsoleto
let optionsA = {webPreferences: {blinkFeatures: ''}}
let windowA = new BrowserWindow(optionsA)
// Reemplazar con
let optionsB = {webPreferences: {enableBlinkFeatures: ''}}
let windowB = new BrowserWindow(optionsB)

// Obsoleto
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // do something
  }
})
// Reemplazar con
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // do something
  }
})
```

## `clipboard`

```js
// Obsoleto
clipboard.readRtf()
// Reemplazar con
clipboard.readRTF()

// Obsoleto
clipboard.writeRtf()
// Reemplazar con
clipboard.writeRTF()

// Obsoleto
clipboard.readHtml()
// Reemplazar con
clipboard.readHTML()

// Obsoleto
clipboard.writeHtml()
// Reemplazar con
clipboard.writeHTML()
```

## `crashReporter`

```js
// Obsoleto
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
// Obsoleto
nativeImage.createFromBuffer(buffer, 1.0)
// Reemplazar con
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `process`

```js
// Obsoleto
const info = process.getProcessMemoryInfo()
const privateBytes = info.privateBytes // Propiedad Obsoleta
const sharedBytes = info.sharedBytes // Propiedad Obsoleta
```

## `screen`

```js
// Obsoleto
screen.getMenuBarHeight()
// Reemplazar con
screen.getPrimaryDisplay().workArea
```

## `session`

```js
// Obsoleto
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
// Obsoleto
tray.setHighlightMode(true)
// Reemplazar con
tray.setHighlightMode('on')

// Obsoleto
tray.setHighlightMode(false)
// Reemplazar con
tray.setHighlightMode('off')
```

## `webContents`

```js
// Obsoleto
webContents.openDevTools({detach: true})
// Reemplazar con
webContents.openDevTools({mode: 'detach'})

// Eliminado
webContents.setSize(options)
// No hay reemplazo para esto en la API
```

## `webFrame`

```js
// Obsoleto
webFrame.registerURLSchemeAsSecure('app')
// Reemplazar con
protocol.registerStandardSchemes(['app'], {secure: true})

// Obsoleto
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// Reemplazar con
protocol.registerStandardSchemes(['app'], {secure: true})
```

## `<webview>`

```js
// Eliminado
webview.setAttribute('disableguestresize', '')
// No hay reemplazo para esto en la API

// Eliminado
webview.setAttribute('guestinstance', instanceId)
// No hay reemplazo para esto en la API

// Los eventos de tecldo ya no funcionan en la etiqueta de webview
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```

## URL de cabecera de nodo

Este es el URL especificado como `disturl` en un archivo `.npmrc` o como el comando de linea `--dist-url` al construir los módulos nativos de nodo.

Cambiar: https://atom.io/download/atom-shell

Reemplazar con: https://atom.io/download/electron

# Cambios en la API(2.0)

La siguiente lista incluye cambios efectuados en la API 2.0 de Electrón.

## `BrowserWindow`

```js
// Obsoleto
let optionsA = {titleBarStyle: 'hidden-inset'}
let windowA = new BrowserWindow(optionsA)
// Reemplazar con
let optionsB = {titleBarStyle: 'hiddenInset'}
let windowB = new BrowserWindow(optionsB)
```

## `menu`

```js
// Obsoleto
menu.popup(browserWindow, 100, 200, 2)
// Reemplazar con
menu.popup(browserWindow, {x: 100, y: 200, positioningItem: 2})
```

## `nativeImage`

```js
// Obsoleto
nativeImage.toPng()
// Reemplazar con
nativeImage.toPNG()

// Obsoleto
nativeImage.toJpeg()
// Reemplazar con
nativeImage.toJPEG()
```

## `process`

* `Versión de procesos de Electron` y `Versión de procesos de Chrome` Serán propiedades de solo lectura para la consistencia con otras propiedades de `process.versions` configuradas por Node.

## `webContents`

```js
// Obsoleto
webContents.setZoomLevelLimits(1, 2)
// Reemplazar con
webContents.setVisualZoomLevelLimits(1, 2)
```

## `webFrame`

```js
// Obsoleto
webFrame.setZoomLevelLimits(1, 2)
// Reemplazar con
webFrame.setVisualZoomLevelLimits(1, 2)
```

## `<webview>`

```js
// Obsoleto
webview.setZoomLevelLimits(1, 2)
// Reemplazar con
webview.setVisualZoomLevelLimits(1, 2)
```

## Archivos duplicados ARM

Cada versión de Electrón incluye dos versiones de ARM idénticas con diferentes nombres de archivo, como: `electron-v1.7.3-linux-arm.zip` y `electron-v1.7.3-linux-armv7l.zip`. Se agregó el archivo con el prefijo `v7l` para aclarar a los usuarios qué versión de ARM soporta y desambiguar los futuros archivos de armv6l y arm64 que pueden ser producidos.

El archivo *sin el prefijo* todavía se está publicando para evitar romper cualquier configuración que pueda estar consumiéndolo. A partir de la versión 2.0, el archivo sin prefijo ya no se estara publicando.

Para más detalles, vea: [6986](https://github.com/electron/electron/pull/6986) y [7189](https://github.com/electron/electron/pull/7189).