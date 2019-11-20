# Cambios de última hora

Los cambios de ruptura se documentaran aquí y se agregaran advertencias de desaprobación al código JS cuando sea posible, al menos [una versión superior](../tutorial/electron-versioning.md#semver) se publicará, antes de que se realice cualquier cambio.

## Comentarios `Arreglar`

El string `FIXME` se usa en las cadenas de código para indicar que cualquier problema debería solucionarse para futuras versiones. Puede ver: https://github.com/electron/electron/search?q=fixme para mas información

## Cambios planeados en la API(7.0)

### URL de cabecera de nodo

Este es el URL especificado como `disturl` en un archivo `.npmrc` o como el comando de linea `--dist-url` al construir los módulos nativos de nodo. Both will be supported for the foreseeable future but it is recommended that you switch.

Cambiar: https://atom.io/download/electron

Reemplazar con: https://electronjs.org/headers

### `session.clearAuthCache(options)`

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### `powerMonitor.querySystemIdleState`

```js
// Removed in Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Replace with synchronous API
const idleState = getSystemIdleState(threshold)
```

### `powerMonitor.querySystemIdleTime`

```js
// Removed in Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Replace with synchronous API
const idleTime = getSystemIdleTime()
```

### webFrame APIs del mundo Aislado

```js
// Removed in Elecron 7.0
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

### Removal of deprecated `marked` property on getBlinkMemoryInfo

This property was removed in Chromium 77, and as such is no longer available.

### `webkitdirectory` attribute for `<input type="file"/>`

￼ ￼The `webkitdirectory` property on HTML file inputs allows them to select folders. ￼Previous versions of Electron had an incorrect implementation where the `event.target.files` ￼of the input returned a `FileList` that returned one `File` corresponding to the selected folder. ￼ ￼As of Electron 7, that `FileList` is now list of all files contained within ￼the folder, similarly to Chrome, Firefox, and Edge ￼([link to MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)). ￼ ￼As an illustration, take a folder with this structure: ￼

    console
    ￼folder
    ￼├── file1
    ￼├── file2
    ￼└── file3
    ￼ ￼ ￼In Electron <=6, this would return a 

`FileList` with a `File` object for: ￼

    console
    ￼path/to/folder
    ￼ ￼ ￼In Electron 7, this now returns a 

`FileList` with a `File` object for: ￼

    console
    ￼/path/to/folder/file3
    ￼/path/to/folder/file2
    ￼/path/to/folder/file1
    ￼ ￼ ￼Note that 

`webkitdirectory` no longer exposes the path to the selected folder. ￼If you require the path to the selected folder rather than the folder contents, ￼see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Cambios planeados en la API(6.0)

### `win.setMenu(null)`

```js
// Deprecado
win.setMenu(null)
// Reemplazar con 
win.removeMenu()
```

### `contentTracing.getTraceBufferUsage()`

```js
// Deprecado
contentTracing.getTraceBufferUsage((percentage, value) => {
  // hacer algo
})
// Reemplace con 
contentTracing.getTraceBufferUsage().then(infoObject => {
  // infoObject tiene campos de porcentaje y valor
})
```

### `electron.screen` en proceso de renderizado

```js
// Deprecado
require('electron').screen
// Reemplazar con 
require('electron').remote.screen
```

### `requiere` en renderizadores sandboxed

```js
// Deprecado
require('child_process')
// Reemplazar con
require('electron').remote.require('child_process')

// Deprecado
require('fs')
// Reemplazar con
require('electron').remote.require('fs')

// Deprecado
require('os')
// Reemplazar con
require('electron').remote.require('os')

// Deprecado
require('path')
// Reemplazar con
require('electron').remote.require('path')
```

### `powerMonitor.querySystemIdleState`

```js
// Deprecado
powerMonitor.querySystemIdleState(threshold, callback)
// Reemplazar con API síncrona 
const idleState = getSystemIdleState(threshold)
```

### `powerMonitor.querySystemIdleTime`

```js
// Deprecado
powerMonitor.querySystemIdleTime(callback)
// Reemplazar con API síncrona
const idleTime = getSystemIdleTime()
```

### `app.enableMixedSandbox`

```js
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### `Tray`

Bajo macOS Catalina nuestra implementación Tray se rompe. El sustituto nativo de Apple no soporta cambiar el comportamiento de resaltado.

```js
// Deprecado
tray.setHighlightMode(mode)
// API sera eliminada en V7.0 sin reemplazo.
```

## Cambios planeados en la API(5.0)

### `new BrowserWindow({ webPreferences })`

Los siguientes valores por defectos de opción `webPreferences` están obsoletos a favor de los nuevos valores por defectos listados a continuación.

| Propiedad          | Valor obsoleto                       | El valor por defecto nuevo |
| ------------------ | ------------------------------------ | -------------------------- |
| `contextIsolation` | `false`                              | `cierto`                   |
| `nodeIntegration`  | `cierto`                             | `false`                    |
| `webviewTag`       | `nodeIntegration` if set else `true` | `false`                    |

Por ejemplo, rehabilitar la webviewTag

```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```

### `nativeWindowOpen`

Las ventanas hijas abiertas con la opción `webPreferences` siempre tienen la integración con Node.js deshabilitada, a menos que `nodeIntegrationInSubFrames` se true.

### Registro de Esquema Privilegiados

Las APIs de Renderer Process `webFrame.setRegisterURLSchemeAsPrivileged` y `webFrame.registerURLSchemeAsBypassingCSP` tal como la API del proceso de navegador `protocol.registerStandardSchemes` han sido eliminados. Una nueva API, `protocol.registerSchemesAsPrivileged` ha sido agregada y debe ser usada para registrar esquemas personalizados con los privilegios requeridos. Se requieren esquemas personalizados para ser registrados antes de que la aplicación esté lista.

### webFrame APIs del mundo Aislado

```js
// Removed in Electron 7.0
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

## `webFrame.setSpellCheckProvider`

The `spellCheck` callback is now asynchronous, and `autoCorrectWord` parameter has been removed.

```js
// Deprecated
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck: (text) => {
    return !spellchecker.isMisspelled(text)
  }
})
// Replace with
webFrame.setSpellCheckProvider('en-US', {
  spellCheck: (words, callback) => {
    callback(words.filter(text => spellchecker.isMisspelled(text)))
  }
})
```

## Cambios planeados en la API(4.0)

La siguiente lista incluye cambios efectuados en la API 4.0 de Electrón.

### `app.makeSingleInstance`

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

### `app.releaseSingleInstance`

```js
// Obsoleto
app.releaseSingleInstance()
// Reemplazar con
app.releaseSingleInstanceLock()
```

### `app.getGPUInfo`

```js
app.getGPUInfo('completo')
// Ahora se comporta lo mismo con `basic` en macOS
app.getGPUInfo('básico')
```

### `win_delay_load_hook`

Cuando se construye módulos nativos para windows, la variable `win_delay_load_hook` del módulo `binding.gyp` debe ser true (el cual es por defecto). Si este hook no esta presente, luego el módulo nativo va a fallar al cargar en Windows, con un mensaje de error como `Cannot find module`. Consulte la [guía de módulo nativo](/docs/tutorial/using-native-node-modules.md) para más infromación.

## Cambios en la API(3.0)

La siguiente lista incluye cambios efectuados en la API 3.0 de Electrón.

### `app`

```js
// Obsoleto
app.getAppMemoryInfo()
// Remplazar con
app.getAppMetrics()

// Obsoleto
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Propiedad Obsoleta
```

### `BrowserWindow`

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

### `clipboard`

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

### `crashReporter`

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

### `nativeImage`

```js
// Obsoleto
nativeImage.createFromBuffer(buffer, 1.0)
// Reemplazar con
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `process`

```js
// Obsoleto
const info = process.getProcessMemoryInfo()
```

### `screen`

```js
// Obsoleto
screen.getMenuBarHeight()
// Reemplazar con
screen.getPrimaryDisplay().workArea
```

### `session`

```js
// Deprecado
ses.setCertificateVerifyProc((hostname, certificate, callback) => {
  callback(true)
})
// Reemplazar con
ses.setCertificateVerifyProc((request, callback) => {
  callback(0)
})
```

### `Tray`

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

### `webContents`

```js
// Obsoleto
webContents.openDevTools({ detach: true })
// Reemplazar con
webContents.openDevTools({ mode: 'detach' })

// Eliminado
webContents.setSize(options)
// No hay reemplazo para esto en la API
```

### `webFrame`

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

### `<webview>`

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

### URL de cabecera de nodo

Este es el URL especificado como `disturl` en un archivo `.npmrc` o como el comando de linea `--dist-url` al construir los módulos nativos de nodo.

Cambiar: https://atom.io/download/atom-shell

Reemplazar con: https://atom.io/download/electron

## Cambios en la API(2.0)

La siguiente lista incluye cambios efectuados en la API 2.0 de Electrón.

### `BrowserWindow`

```js
// Cambiar
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Reemplazar con
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

### `menu`

```js
// Obsoleto
menu.popup(browserWindow, 100, 200, 2)
// Reemplazar con
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `nativeImage`

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

### `process`

* `Versión de procesos de Electron` y `Versión de procesos de Chrome` Serán propiedades de solo lectura para la consistencia con otras propiedades de `process.versions` configuradas por Node.

### `webContents`

```js
// Obsoleto
webContents.setZoomLevelLimits(1, 2)
// Reemplazar con
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
// Obsoleto
webFrame.setZoomLevelLimits(1, 2)
// Reemplazar con
webFrame.setVisualZoomLevelLimits(1, 2)
```

### `<webview>`

```js
// Obsoleto
webview.setZoomLevelLimits(1, 2)
// Reemplazar con
webview.setVisualZoomLevelLimits(1, 2)
```

### Duplicado de brazo ARM

Cada versión de Electrón incluye dos versiones de ARM idénticas con diferentes nombres de archivo, como: `electron-v1.7.3-linux-arm.zip` y `electron-v1.7.3-linux-armv7l.zip`. Se agregó el archivo con el prefijo `v7l` para aclarar a los usuarios qué versión de ARM soporta y desambiguar los futuros archivos de armv6l y arm64 que pueden ser producidos.

El archivo *sin el prefijo* todavía se está publicando para evitar romper cualquier configuración que pueda estar consumiéndolo. Starting at 2.0, the unprefixed file will no longer be published.

Para más detalles, vea: [6986](https://github.com/electron/electron/pull/6986) y [7189](https://github.com/electron/electron/pull/7189).