# Cambios de última hora

Los cambios de ruptura se documentaran aquí y se agregaran advertencias de desaprobación al código JS cuando sea posible, al menos [una versión superior](tutorial/electron-versioning.md#semver) se publicará, antes de que se realice cualquier cambio.

### Tipos de cambios de ruptura

Este documento usa la siguiente convención para clasificar los cambios de ruptura:

- **API Modificada:** Se cambió una API de tal manera que se garantiza que el código que no ha sido actualizado produzca una excepción.
- **Comportamiento Modificado: ** El comportamiento de Electron ha cambiado, pero no de tal manera que una excepción se produzca necesariamente.
- **Valor por defecto Modificado:** Código dependiente del viejo valor por defecto puede romperse, no necesariamente lanzando una excepción. El comportamiento antiguo puede ser restaurado especificando explícitamente el valor.
- **Obsoleto:** Una API fue marcada como obsoleta. La API continuará funcionando, pero emitirá una advertencia de desaprobación y será eliminada en una futura versión.
- **Eliminado:** Una API o característica fue eliminada y ya no es compatible por Electron.

## Cambios planeados en la API(12.0)

### Eliminado: métodos `crashReporter` en el render process

Los siguientes métodos `crashReporter` ya no están disponible en el renderer process:

- `crashReporter.start`
- `crashReporter.getLastCrashReport`
- `crashReporter.getUploadedReports`
- `crashReporter.getUploadToServer`
- `crashReporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

Deberían ser llamados solo desde el proceso principal.

Vea [#23265](https://github.com/electron/electron/pull/23265) para mas detalles.

## Cambios planeados en la API(11.0)

## Cambios planeados en la API(10.0)

### Desaprobado: argumento `companyName` para `crashReporter.start()`

El argumento `companyName` para `crashReporter.start()`, que era previamente requerido, ahora es opcional, y aún más, está desaprobado. Para obtener el mismo comportamiento de una forma no desaprobada, pude pasar un valor `companyName` en `globalExtra`.

```js
// Desaprobado en Electron 10
crashReporter.start({ companyName: 'Umbrella Corporation' })
// Reemplazar con 
crashReporter.start({ globalExtra: { _companyName: 'Umbrella Corporation' } })
```

### Obsoleto: `crashReporter.getCrashesDirectory()`

El método `crashReporter.getCrashesDirectory` ha sido desaprobado. Uso debe ser reemplazado por `app.getPath('crashDumps')`.

```js
// Obsoleto en Electron 10
crashReporter.getCrashesDirectory()
// Reemplazar con
app.getPath('crashDumps')
```

### Obsoleto: los métodos `crashReporter` en el renderer process

Llamar a los siguientes métodos `crashReporter` desde el renderer process es obsoleto:

- `crashReporter.start`
- `crashReporter.getLastCrashReport`
- `crashReporter.getUploadedReports`
- `crashReporter.getUploadToServer`
- `crashReporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

Los únicos métodos no desaprobados restantes en el modulo `crashReporter` en el render son `addExtraParameter`, `removeExtraParameter` y `getParameters`.

Todos los métodos anteriores permanecen no desaprobados cuando son llamados desde el proceso principal.

Vea [#23265](https://github.com/electron/electron/pull/23265) para mas detalles.

### Eliminado: Browser Window Affinity

La opción `affinity` al construir una nueva `BrowserWindow` se eliminará como parte de nuestro plan para alinear más estrechamente con el modelo de proceso de Chromium por seguridad, rendimiento y mantenimiento.

Para información más detallada vea [#18397](https://github.com/electron/electron/issues/18397).

### Cambiado por defecto: `enableRemoteModule` por defecto a `false`

En Electron 9, usar el módulo remoto sin habilitarlo explícitamente a través de la opción `enableRemoteModule` WebPreferences comenzó a emitir una advertencia. En Electron 10, el módulo remoto está deshabilitado por defecto. Para utilizar el módulo remoto , `enableRemoteModule: true` debe especificarse en WebPreferences:

```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

Recomendamos [alejarnos del módulo remoto](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

### `protocol.unregisterProtocol`
### `protocol.uninterceptProtocol`

Las APIs ahora son síncronas y el callback opcional ya no es necesario.

```javascript
// Obsoleto
protocol.unregisterProtocol(scheme, () => { /* ... */ })
// Reemplazar con 
protocol.unregisterProtocol(scheme)
```

### `protocol.registerFileProtocol`
### `protocol.registerBufferProtocol`
### `protocol.registerStringProtocol`
### `protocol.registerHttpProtocol`
### `protocol.registerStreamProtocol`
### `protocol.interceptFileProtocol`
### `protocol.interceptStringProtocol`
### `protocol.interceptBufferProtocol`
### `protocol.interceptHttpProtocol`
### `protocol.interceptStreamProtocol`

Las APIs ahora son síncronas y el callback opcional ya no es necesario.

```javascript
// Obsoleto
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// Reemplazar con 
protocol.registerFileProtocol(scheme, handler)
```

El protocolo registrado o interceptado no tiene efecto en la página actual hasta que ocurra la navegación.

### `protocol.isProtocolHandled`

Esta API está obsoleta y los usuarios deberían usar `protocol.isProtocolRegistered` y `protocol.isProtocolIntercepted` en su lugar.

```javascript
// Obsoleto
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Reemplazar con
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```

## Cambios planeados en la API(9.0)

### Cambiado por defecto: Cargando módulos nativos no conscientes del contexto en el proceso de renderizado está desactivado por defecto

A partir de Electron 9 no permitimos la carga de módulos nativos no conscientes del contexto en el proceso de renderizado.  Esto es para mejorar la seguridad, el rendimiento y el mantenimiento de Electron como proyecto.

Si esto le impacta, puede establecer temporalmente `app.allowRendererProcessReuse` a `false` para revertir al viejo comportamiento.  Esta bandera solo será una opción hasta Electron 11, así que debe planear actualizar sus módulos nativos para que sean conscientes de contexto.

Para información más detallada vea [#18397](https://github.com/electron/electron/issues/18397).

### Obsoleto: APIs de extensión `BrowserWindow`

Las siguientes APIs de extensión han sido marcadas como obsoletas:
* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

En su lugar use las APIs de session:
* `ses.loadExtension(path)`
* `ses.removeExtension(extension_id)`
* `ses.getAllExtensions()`

```js
// Obsoleto en Electron 9
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension(path)
// Reemplazar con
session.defaultSession.loadExtension(path)
```

```js
// Obsoleto en Electron 9
BrowserWindow.removeExtension(name)
BrowserWindow.removeDevToolsExtension(name)
// Reemplazar con
session.defaultSession.removeExtension(extension_id)
```

```js
// Obsoleto en Electron 9
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Reemplazar con
session.defaultSession.getAllExtensions()
```

### Eliminado: `<webview>.getWebContents()`

Esta API, que fue obsoleta en Electron 8.0, se ha eliminado.

```js
// Eliminado en Electron 9.0
webview.getWebContents()
// Reemplazar con
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Eliminado: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. La función fue marcada como obsoleta en Electron 8.x, y ha sido eliminada en Electron 9.x. Los niveles de zoom limites ahora están fijados a un mínimo de 0.25 y un máximo de 5.0, como se define [aquí](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Comportamiento cambiado: Enviar objetos no JS sobre IPC ahora arroja una excepción

En Electron 8.0, el IPC se cambió para que utilizara el algoritmo de clon estructurado, con importantes mejoras de rendimiento. Para ayudar a facilitar la transición, el algoritmo de serialización antiguo de IPC fue mantenido y utilizado para algunos objetos que no son serializables con Clone Estructuralizado. En particular, objetos DOM (por ejemplo, `Elemento`, `Ubicación` y `DOMMatrimox`), Nodo. s objetos respaldados por clases C++ (por ejemplo, proceso `. nv`, algunos miembros de `Stream`), y objetos Electron respaldados por C++ clases (e.g. `WebContents`, `BrowserWindow` y `WebFrame`) no son serializables con un Clon Estructuralizado. Siempre que se invoca el antiguo algoritmo, se imprimió una advertencia de desaprobación .

En Electron 9,0, se eliminó el algoritmo de serialización anterior, y enviar tales objetos no serializables ahora lanzará un error "no se pudo clonar el objeto".

### API cambiada: `shell.openItem` ahora es `shell.openPath`

La API `shell.openItem` ha sido reemplazada por una API asincrónica `shell.openPath`. Puedes ver la propuesta original de la API y razonamiento [aquí](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Cambios planeados en la API(8.0)

### Comportamiento cambiado: Los valores enviados a través de IPC ahora se serializan con el algoritmo de clon estructurado

The algorithm used to serialize objects sent over IPC (through `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` and related methods) has been switched from a custom algorithm to V8's built-in [Structured Clone Algorithm][SCA], the same algorithm used to serialize messages for `postMessage`. This brings about a 2x performance improvement for large messages, but also brings some breaking changes in behavior.

- Sending Functions, Promises, WeakMaps, WeakSets, or objects containing any such values, over IPC will now throw an exception, instead of silently converting the functions to `undefined`.
```js
// Previously:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => results in { value: 3 } arriving in the main process

// From Electron 8:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => throws Error("() => {} could not be cloned.")
```
- `NaN`, `Infinity` and `-Infinity` will now be correctly serialized, instead of being converted to `null`.
- Objects containing cyclic references will now be correctly serialized, instead of being converted to `null`.
- `Set`, `Map`, `Error` and `RegExp` values will be correctly serialized, instead of being converted to `{}`.
- `BigInt` values will be correctly serialized, instead of being converted to `null`.
- Sparse arrays will be serialized as such, instead of being converted to dense arrays with `null`s.
- `Date` objects will be transferred as `Date` objects, instead of being converted to their ISO string representation.
- Typed Arrays (such as `Uint8Array`, `Uint16Array`, `Uint32Array` and so on) will be transferred as such, instead of being converted to Node.js `Buffer`.
- Node.js `Buffer` objects will be transferred as `Uint8Array`s. You can convert a `Uint8Array` back to a Node.js `Buffer` by wrapping the underlying `ArrayBuffer`:
```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```

Sending any objects that aren't native JS types, such as DOM objects (e.g. `Element`, `Location`, `DOMMatrix`), Node.js objects (e.g. `process.env`, `Stream`), or Electron objects (e.g. `WebContents`, `BrowserWindow`, `WebFrame`) is deprecated. In Electron 8, these objects will be serialized as before with a DeprecationWarning message, but starting in Electron 9, sending these kinds of objects will throw a 'could not be cloned' error.

### Obsoleto: `<webview>.getWebContents()`

This API is implemented using the `remote` module, which has both performance and security implications. Therefore its usage should be explicit.

```js
// Deprecated
webview.getWebContents()
// Replace with
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

However, it is recommended to avoid using the `remote` module altogether.

```js
// main
const { ipcMain, webContents } = require('electron')

const getGuestForWebContents = (webContentsId, contents) => {
  const guest = webContents. romId(webContentsId)
  if (! uest) {
    throw new Error(`Invalid webContentsId: ${webContentsId}`)
  }
  if (guest. ostWebContents ! = contents) {
    throw new Error(`Access denied to webContents`)
  }
  return guest
}

ipcMain. andle('openDevTools', (event, webContentsId) => {
  const guest = getGuestForWebContents(webContentsId, event.sender)
  invitados. penDevTools()
})

// renderizador
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```

### Desaprobado: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

## Cambios planeados en la API(7.0)

### Obsoleto: URL de Encabezados de Nodo Atom.io

Este es el URL especificado como `disturl` en un archivo `.npmrc` o como el comando de linea `--dist-url` al construir los módulos nativos de nodo.  Both will be supported for the foreseeable future but it is recommended that you switch.

Cambiar: https://atom.io/download/electron

Reemplazar con: https://electronjs.org/headers

### API cambiada: `session.clearAuthCache()` ya no acepta opciones

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### API cambiada: `powerMonitor.querySystemIdleState` ahora es `powerMonitor.getSystemIdleState`

```js
// Removed in Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Replace with synchronous API
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### API cambiada: `powerMonitor.querySystemIdleTime` ahora es `powerMonitor.getSystemIdleState`

```js
// Eliminado en Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Reemplazar con API sincrónica
const idleTime = powerMonitor.getSystemIdleTime()
```

### API cambiada: `webFrame.setIsolatedWorldInfo` reemplaza métodos separados

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

### Eliminado: `marcó la propiedad` en `getBlinkMemoryInfo`

This property was removed in Chromium 77, and as such is no longer available.

### Comportamiento modificado: `atributo webkitdirectory` para `<input type="file"/>` ahora muestra contenido del directorio

La propiedad `webkitdirectory` en las entradas de archivos HTML les permite seleccionar carpetas. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

A partir de Electron 7, esa `Lista de archivos` ahora es la lista de todos los archivos contenidos dentro de la carpeta, similar a Chrome, Firefox, and Edge ([enlace a los documentos MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

Como ilustración, coger una carpeta con esta estructura:
```console
folder
├── file1
├── file2
└── file3
```

En Electron <=6, esto devolvería una `Lista de archivos` con un `Archivo` objeto para:
```console
path/to/folder
```

En Electron 7, esto ahora devuelve una `Lista de archivos` con un objeto `File` para:
```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Tenga en cuenta que `webkitdirectory` ya no expone la ruta a la carpeta seleccionada. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Cambios planeados en la API(6.0)

### API cambiada: `win.setMenu(null)` ahora es `win.removeMenu()`

```js
// Deprecado
win.setMenu(null)
// Reemplazar con 
win.removeMenu()
```

### API cambiada: `contentTracing.getTraceBufferUsage()` ahora es una promesa

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

### API cambiada: `electron.screen` en el proceso de renderizado debe ser accedido a través de `remoto`

```js
// Deprecado
require('electron').screen
// Reemplazar con 
require('electron').remote.screen
```

### API cambiada: `require()`ing node builtins in sandboamed renderers ya no carga implícitamente la versión `remote`

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

### Desaprobado: `powerMonitor.querySystemIdleState` reemplazado por `powerMonitor.getSystemIdleState`

```js
// Obsoleto
powerMonitor.querySystemIdleState(umbral, callback)
// Reemplazar con API sincrónica
const idleState = powerMonitor.getSystemIdleState(aplano)
```

### Desaprobado: `powerMonitor.querySystemIdleTime` reemplazado por `powerMonitor.getSystemIdleTime`

```js
// Obsoleto
powerMonitor.querySystemIdleTime(callback)
// Reemplazar con API sincrónica
const idleTime = powerMonitor.getSystemIdleTime()
```

### Desaprobado: `app.enableMixedSandbox()` ya no es necesario

```js
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### Desaprobado: `Tray.setHighlightMode`

Bajo macOS Catalina nuestra implementación Tray se rompe. El sustituto nativo de Apple no soporta cambiar el comportamiento de resaltado.

```js
// Deprecado
tray.setHighlightMode(mode)
// API sera eliminada en V7.0 sin reemplazo.
```

## Cambios planeados en la API(5.0)

### Cambio predeterminado: `nodeIntegration` y `webviewTag` por defecto a false, `contextIsolation` por defecto a true

Los siguientes valores por defectos de opción `webPreferences` están obsoletos a favor de los nuevos valores por defectos listados a continuación.

| Propiedad          | Valor obsoleto                       | El valor por defecto nuevo |
| ------------------ | ------------------------------------ | -------------------------- |
| `contextIsolation` | `false`                              | `cierto`                   |
| `nodeIntegration`  | `cierto`                             | `false`                    |
| `webviewTag`       | `nodeIntegration` if set else `true` | `false`                    |

Por ejemplo. Re-enabling the webviewTag

```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```

### Comportamiento Cambiado: `nodeIntegration` en ventanas hijas abiertas a través de `nativeWindowOpen`

Las ventanas hijas abiertas con la opción `nativeWindowOpen` siempre tendrán deshabilitada la integración de Node.js, a menos que `nodeIntegrationInSubFrames` sea `verdadero`.

### API modificada: El registro de esquemas privilegiados ahora debe hacerse antes de que la aplicación esté lista

Se han eliminado las APIs de proceso de Renderer `webFrame.registerURLSchemeAsPrivileged` y `webFrame.registerURLSchemeAsBypassingCSP` así como la API de procesos del navegador `protocol.registerStandardSchemes`. Una nueva API, `protocol.registerSchemesAsPrivileged` ha sido agregada y debe ser usada para registrar esquemas personalizados con los privilegios requeridos. Se requieren esquemas personalizados para ser registrados antes de que la aplicación esté lista.

### Desaprobado: `webFrame.setIsolatedWorld*` reemplazado por `webFrame.setIsolatedWorldInfo`

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

### API cambiada: `webFrame.setSpellCheckProvider` ahora toma un callback asincrónico
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

### `crashReporter`

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

### `NativeImage`

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

### `Sesión`

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
// Obsoleto
tray.setHighlightMode(true)
// Reemplazar con
tray.setHighlightMode('on')

// Obsoleto
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

### `NativeImage`

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

El archivo _sin el prefijo_ todavía se está publicando para evitar romper cualquier configuración que pueda estar consumiéndolo. Starting at 2.0, the unprefixed file will no longer be published.

Para más detalles, vea: [6986](https://github.com/electron/electron/pull/6986) y [7189](https://github.com/electron/electron/pull/7189).

[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
