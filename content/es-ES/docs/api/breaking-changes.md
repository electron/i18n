# Contrato de API

Los cambios de ruptura se documentaran aquí y se agregaran advertencias de desaprobación al código JS cuando sea posible, al menos [una versión superior](../tutorial/electron-versioning.md#semver) se publicará, antes de que se realice cualquier cambio.

# Comentarios `FIXME`

El string `FIXME` se usa en las cadenas de código para indicar que cualquier problema debería solucionarse para futuras versiones. Puede ver: https://github.com/electron/electron/search?q=fixme para mas información

# Cambios planeados en la API(6.0)

## `win.setMenu(null)`

```js
// Deprecated
win.setMenu(null)
// Replace with
win.removeMenu()
```

## `electron.screen` en proceso de renderizado

```js
// Deprecated
require('electron').screen
// Replace with
require('electron').remote.screen
```

## `require` in sandboxed renderers

```js
// Deprecated
require('child_process')
// Replace with
require('electron').remote.require('child_process')

// Deprecated
require('fs')
// Replace with
require('electron').remote.require('fs')

// Deprecated
require('os')
// Replace with
require('electron').remote.require('os')

// Deprecated
require('path')
// Replace with
require('electron').remote.require('path')
```

# Cambios planeados en la API(5.0)

## `new BrowserWindow({ webPreferences })`

The following `webPreferences` option default values are deprecated in favor of the new defaults listed below.

| Propiedad          | Valor obsoleto                       | El valor por defecto nuevo |
| ------------------ | ------------------------------------ | -------------------------- |
| `contextIsolation` | `false`                              | `cierto`                   |
| `nodeIntegration`  | `cierto`                             | `false`                    |
| `webviewTag`       | `nodeIntegration` if set else `true` | `false`                    |

## `nativeWindowOpen`

Child windows opened with the `nativeWindowOpen` option will always have Node.js integration disabled.

## Privileged Schemes Registration

Renderer process APIs `webFrame.setRegisterURLSchemeAsPrivileged` and `webFrame.registerURLSchemeAsBypassingCSP` as well as browser process API `protocol.registerStandardSchemes` have been removed. A new API, `protocol.registerSchemesAsPrivileged` has been added and should be used for registering custom schemes with the required privileges. Custom schemes are required to be registered before app ready.

## webFrame Isolated World APIs

```js
// Deprecated
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Replace with
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

# Cambios planeados en la API(4.0)

La siguiente lista incluye cambios efectuados en la API 4.0 de Electrón.

## `app.makeSingleInstance`

```js
// Deprecated
app.makeSingleInstance((argv, cwd) => {
  /* ... */
})
// Replace with
app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
  /* ... */
})
```

## `app.releaseSingleInstance`

```js
// Obsoleto
app.releaseSingleInstance()
// Reemplazar con
app.releaseSingleInstanceLock()
```

## `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Now behaves the same with `basic` on macOS
app.getGPUInfo('basic')
```

## `win_delay_load_hook`

When building native modules for windows, the `win_delay_load_hook` variable in the module's `binding.gyp` must be true (which is the default). If this hook is not present, then the native module will fail to load on Windows, with an error message like `Cannot find module`. Consulte la [guía de módulo nativo](/docs/tutorial/using-native-node-modules.md) para más infromación.

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
const { memory } = metrics[0] // Propiedad Obsoleta
```

## `BrowserWindow`

```js
// Obsoleto
let optionsA = {webPreferences: { blinkFeatures: '' }}
let windowA = new BrowserWindow(optionsA)
// Reemplazar con
let optionsB = {webPreferences: { enableBlinkFeatures: '' }}
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
// Deprecated
ses.setCertificateVerifyProc((hostname, certificate, callback) => {
  callback(true)
})
// Replace with
ses.setCertificateVerifyProc((request, callback) => {
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
// Obsoleto
webContents.openDevTools({ detach: true })
// Reemplazar con
webContents.openDevTools({ mode: 'detach' })

// Eliminado
webContents.setSize(options)
// No hay reemplazo para esto en la API
```

## `webFrame`

```js
// Obsoleto
webFrame.registerURLSchemeAsSecure('app')
// Reemplazar con
protocol.registerStandardSchemes(['app'], { secure: true })

// Obsoleto
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Reemplazar con
protocol.registerStandardSchemes(['app'], { secure: true })
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
// Cambiar
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Reemplazar con
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

## `menu`

```js
// Obsoleto
menu.popup(browserWindow, 100, 200, 2)
// Reemplazar con
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
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

## Duplicado de brazo ARM

Cada versión de Electrón incluye dos versiones de ARM idénticas con diferentes nombres de archivo, como: `electron-v1.7.3-linux-arm.zip` y `electron-v1.7.3-linux-armv7l.zip`. Se agregó el archivo con el prefijo `v7l` para aclarar a los usuarios qué versión de ARM soporta y desambiguar los futuros archivos de armv6l y arm64 que pueden ser producidos.

El archivo *sin el prefijo* todavía se está publicando para evitar romper cualquier configuración que pueda estar consumiéndolo. A partir de la versión 2.0, el archivo sin prefijo ya no se estara publicando.

Para más detalles, vea: [6986](https://github.com/electron/electron/pull/6986) y [7189](https://github.com/electron/electron/pull/7189).