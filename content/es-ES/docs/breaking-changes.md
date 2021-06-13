# Restaurar archivos borrados

Los cambios de ruptura se documentaran aquí y se agregaran advertencias de desaprobación al código JS cuando sea posible, al menos [una versión superior](tutorial/electron-versioning.md#semver) se publicará, antes de que se realice cualquier cambio.

### Tipos de cambios de ruptura

Este documento utiliza la siguiente convención para clasificar los cambios de ruptura:

* **API cambiada:** Una API fue cambiada de tal manera que el código que no ha sido actualizado se garantiza para arrojar una excepción.
* **Comportamiento Cambiado:** El comportamiento de Electron ha cambiado, pero no de tal manera que necesariamente se lanzará una excepción.
* **Predeterminado cambiado:** El código dependiendo del valor predeterminado puede romperse, no necesariamente arrojando una excepción. El comportamiento antiguo se puede restaurar especificando explícitamente el valor.
* **Obsoleto:** Una API fue marcada como obsoleta. La API continuará funcionando, pero emitirá una advertencia de desaprobación y será eliminada en una futura versión.
* **Eliminado:** Se ha eliminado una API o característica y ya no es compatible con Electron.

## Cambios planeados en la API(14.0)

### API Changed: `window.(open)`

El parámetro opcional `frameName` ya no se establecerá como el título de la ventana. Esto ahora sigue la especificación descrita por la [documentación nativa](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters) bajo el correspondiente parámetro `windowName`.

Si estaba usando este parámetro para establecer el título de una ventana, puede usar [win.setTitle(title)](https://www.electronjs.org/docs/api/browser-window#winsettitletitle) en su lugar.

### Eliminado: `worldSafeExecuteJavaScript`

En Electron 14 `worldSafeExecuteJavaScript` será eliminado.  No hay alternativa, por favor asegúrese que su código trabaja con esta propiedad activada.  Ha sido activada por defecto desde Electron
12.

Será afectado por este cambio si usted utliza `webFrame.executeJavaScript` o `webFrame.executeJavaScriptInIsolatedWorld`. Necesitará asegurase que los valores devueltos por cualquiera de esos métodos son soportados por [Context Bridge API](api/context-bridge.md#parameter--error--return-type-support) ya que estos métodos utilizan la misma semántica de paso de valores.

## Cambios planeados en la API(13.0)

### API modificada: `session.setPermissionCheckHandler(handler)`

El primer parámetro de los métodos `handler` anteriormente siempre era un `webContents`, ahora puede ser a veces `null`.  Debe usar las propiedades `requestingOrigin`, `embeddingOrigin` y `securityOrigin` para responder correctamente a la verificación de permiso.  Como el `webContents` puede ser `null` ya no se puede confiar en él.

```js
// Old code
session.setPermissionCheckHandler((webContents, permission) => {
  if (webContents.getURL().startsWith('https://google.com/') && permission === 'notification') {
    return true
  }
  return false
})

// Replace with
session.setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
  if (new URL(requestingOrigin).hostname === 'google.com' && permission === 'notification') {
    return true
  }
  return false
})
```

### Eliminado: `shell.moveItemToTrash()`

Se ha eliminado la API síncrona `shell.moveItemToTrash()` obsoleta. Utilice en su lugar `shell.trashItem()`.

```js
// Removed in Electron 13
shell.moveItemToTrash(path)
// Replace with
shell.trashItem(path).then(/* ... */)
```

### Eliminado: APIs de extensión `BrowserWindow`

La APIs de extensión han sido eliminadas:

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
// Removed in Electron 13
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension(path)
// Replace with
session.defaultSession.loadExtension(path)
```

```js
// Removed in Electron 13
BrowserWindow.removeExtension(name)
BrowserWindow.removeDevToolsExtension(name)
// Replace with
session.defaultSession.removeExtension(extension_id)
```

```js
// Removed in Electron 13
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Replace with
session.defaultSession.getAllExtensions()
```

### Eliminado: métodos en `systemPreferences`

Los métodos siguientes de `systemPreferences` han quedado obsoletos:

* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

En su lugar, usa las siguientes propiedades `nativeTheme`:

* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
// Removed in Electron 13
systemPreferences.isDarkMode()
// Replace with
nativeTheme.shouldUseDarkColors

// Removed in Electron 13
systemPreferences.isInvertedColorScheme()
// Replace with
nativeTheme.shouldUseInvertedColorScheme

// Removed in Electron 13
systemPreferences.isHighContrastColorScheme()
// Replace with
nativeTheme.shouldUseHighContrastColors
```

### Deprecated: WebContents `new-window` event

The `new-window` event of WebContents has been deprecated. Es reemplazado por [`webContents.setWindowOpenHandler()`](api/web-contents.md#contentssetwindowopenhandlerhandler).

```js
// Deprecated in Electron 13
webContents.on('new-window', (event) => {
  event.preventDefault()
})

// Replace with
webContents.setWindowOpenHandler((details) => {
  return { action: 'deny' }
})
```

## Cambios planeados en la API(12.0)

### Eliminado: Soporte de Pepper Flash

Chromium a eliminado el soporte para Flash, por lo tanto nosotros debemos seguir el ejemplo. Vea el [Flash Roadmap](https://www.chromium.org/flash-roadmap) de Chromium para más detalles.

### Valor por defecto moidificado: `worldSafeExecuteJavaScript` por defecto a `true`

En Electron 12, `worldSafeExecuteJavaScript` será activado por defecto.  Para restuaurar el comportamiento anterior, `worldSafeExecuteJavaScript: false` debe especificarse en WebPreferences. Por favor tenga en cuenta que estableciendo esta opción a `false` es **inseguro**.

Esta opción sera removida en Electron 14, así que por favor migra tu código para soportar el valor por defecto.

### Valor por defecto modificado: `contextIsolation` por defecto a `true`

En Electron 12, `contextIsolation` será activado por defecto.  Para restaurar el comportamiento anterior `contextIsolation: false` debe ser especificado en WebPreferences.

Nosotros [recomendamos tener contextIsolation activado](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) por la seguridad de su aplicación.

Otra implicación es que `require()` no puede ser usada en el renderer process a menos que `nodeIntegration` sea `true` y `contextIsolation` sea `false`.

Para más detalles ver: https://github.com/electron/electron/issues/23506

### Eliminado: `crashReporter.getCrashesDirectory()`

El método `crashReporter.getCrashesDirectory` ha sido eliminado. Uso debe ser reemplazado por `app.getPath('crashDumps')`.

```js
// Eliminado en Electron 12
crashReporter.getCrashesDirectory()
// Reeamplazar con
app.getPath('crashDumps')
```

### Eliminado: métodos `crashReporter` en el render process

Los siguientes métodos `crashReporter` ya no están disponible en el renderer process:

* `crashReporter.start`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

Deberían ser llamados solo desde el proceso principal.

Vea [#23265](https://github.com/electron/electron/pull/23265) para más detalles.

### Valor por defecto modificado: `crashReporter.start({ compress: true })`

El valor por defecto de la opción `compress` a `crashReporter.start` ha cambiado de `false` a `true`. Esto significa que los volcados se subirán al servidor de ingestión de errores con el encabezado `Content-Encoding: gzip` y el cuerpo será comprimido.

Si su servidor de gestión de fallos no soporta cargas comprimidas, puedes desactivar la compresión especificando `{ compress: false }` en las opciones del reportero de errores .

### Obsoleto: módulo `remote`

El módulo `remote` está obsoleto en Electron 12 y sera eliminado en Electron 14. Es reemplazado por el módulo [`@electron/remote`](https://github.com/electron/remote).

```js
// Deprecated in Electron 12:
const { BrowserWindow } = require('electron').remote
```

```js
// Replace with:
const { BrowserWindow } = require('@electron/remote')

// In the main process:
require('@electron/remote/main').initialize()
```

### Obsoleto: `shell.moveItemToTrash()`

El síncrono `shell.moveItemToTrash()` ha sido reemplazado por el nuevo asíncrono `shell.trashItem()`.

```js
// Deprecated in Electron 12
shell.moveItemToTrash(path)
// Replace with
shell.trashItem(path).then(/* ... */)
```

## Cambios planeados en la API(11.0)

### Removed: `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` and `id` property of `BrowserView`

Las APIs experimentales `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` fueron removidas. Adicionalmente, la propiedad `id` de `BrowserView` también ha sido removida.

For more detailed information, see [#23578](https://github.com/electron/electron/pull/23578).

## Cambios de API de ruptura planificados (10.0)

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

* `crashReporter.start`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

Los únicos métodos no desaprobados restantes en el modulo `crashReporter` en el render son `addExtraParameter`, `removeExtraParameter` y `getParameters`.

Todos los métodos anteriores permanecen no desaprobados cuando son llamados desde el proceso principal.

Vea [#23265](https://github.com/electron/electron/pull/23265) para más detalles.

### Obsoleto: `crashReporter.start({ compress: false })`

Establecer `{ compress: false }` en `crashReporter.start` está obsoleto. Casi todos los servidores de gestión de fallos soportan compresión gzip. Esta opción será eliminada en una versión futura de Electron.

### Eliminado: Browser Window Affinity

La opción `affinity` al construir una nueva `BrowserWindow` se eliminará como parte de nuestro plan para alinear más estrechamente con el modelo de proceso de Chromium por seguridad, rendimiento y mantenimiento.

Para información más detallada vea [#18397](https://github.com/electron/electron/issues/18397).

### Valor por defecto modificado: `enableRemoteModule` por defecto a `false`

En Electron 9, usar el módulo remoto sin habilitarlo explícitamente a través de la opción `enableRemoteModule` WebPreferences comenzó a emitir una advertencia. En Electron 10, el módulo remote está deshabilitado por defecto. Para usar el módulo remote debe especificarse `enableRemoteModule: true` en WebPreferences:

```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

Nosotros [recomendamos alejarse del módulo remote](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

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

## Cambios de API de ruptura planificados (9.0)

### Default Changed: Loading non-context-aware native modules in the renderer process is disabled by default

As of Electron 9 we do not allow loading of non-context-aware native modules in the renderer process.  This is to improve security, performance and maintainability of Electron as a project.

If this impacts you, you can temporarily set `app.allowRendererProcessReuse` to `false` to revert to the old behavior.  This flag will only be an option until Electron 11 so you should plan to update your native modules to be context aware.

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

Esta API la cual fue marcada como obsoleta en Electron 8.0, ahora es eliminada.

```js
// Eliminado en Electron 9.0
webview.getWebContents()
// Reemplazar con 
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Eliminada: `webFrame.setLayoutZoomLevelLimits()`

Chromium ha eliminado el soporte para cambiar los limites del nivel de zoom del diseño y esta más allá de la capacidad de Electron el mantenerlo. La función fue marcada como obsoleta en Electron 8.x, y ha sido eliminada en Electron 9.x. Los niveles de zoom limites ahora están fijados a un mínimo de 0.25 y un máximo de 5.0, como se define [aquí](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Comportamiento Modificado: Enviando objetos no JS sobre IPC ahora lanza una excepción

In Electron 8.0, IPC was changed to use the Structured Clone Algorithm, bringing significant performance improvements. To help ease the transition, the old IPC serialization algorithm was kept and used for some objects that aren't serializable with Structured Clone. In particular, DOM objects (e.g. `Element`, `Location` and `DOMMatrix`), Node.js objects backed by C++ classes (e.g. `process.env`, some members of `Stream`), and Electron objects backed by C++ classes (e.g. `WebContents`, `BrowserWindow` and `WebFrame`) are not serializable with Structured Clone. Whenever the old algorithm was invoked, a deprecation warning was printed.

En Electron 9,0, se eliminó el algoritmo de serialización anterior, y enviar tales objetos no serializables ahora lanzará un error "no se pudo clonar el objeto".

### API Modificada: `shell.openItem` ahora es `shell.openPath`

The `shell.openItem` API has been replaced with an asynchronous `shell.openPath` API. You can see the original API proposal and reasoning [here](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Cambios planeados en la API(8.0)

### Behavior Changed: Values sent over IPC are now serialized with Structured Clone Algorithm

El algoritmo usado para serializar los objetos enviados sobre IPC (mediante `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` y métodos relacionados) han sido cambiados de un algoritmo personalizado a los de V8 [Structured Clone Algorithm][SCA], el mismo algoritmo usado para serializar los mensajes para `postMessage`. Esto conlleva una mejora en el rendimiento de 2x para mensajes grandes, pero también trae algunos cambios de comportamiento.

* Enviar Functions, Promises, WeakMaps, WeakSets, o objetos que contengan tales valores sobre IPC no lanzará ninguna excepción, en lugar de convertir las funciones a `undefined`.

```js
// Anteriormente:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => results in { value: 3 } arriving in the main process

// Desde Electron 8:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => throws Error("() => {} could not be cloned.")
```

* `NaN`, `Infinity` y `-Infinity` ahora serán correctamente serializados en lugar de ser convertidos a `null`.
* Los objectos que contengan referencias cíclicas ahora serán correctamente serializados en lugar de ser convertidos a `null`.
* Los valores `Set`, `Map`, `Error` y `RegExp` ahora serán correctamente serializados en lugar de ser convertidos a `{}`.
* Los valores `BigInt` ahora serán correctamente serializados en lugar de ser convertidos a `null`.
* Las matrices dispersas se serializarán como tales, en lugar de convertirse en matrices densas con `null`s.
* Los objetos `Date` serán transferidos como objetos `Date`, en lugar de ser convertidos en su representación de cadena ISO.
* Los Arrays con tipo (tales como `Uint8Array`, `Uint16Array`, `Uint32Array` y así sucesivamente) serán transferidas como tales, en lugar de ser convertida a Node.js `Buffer`.
* Los objetos Node.js `Buffer` serán transferidos como `Uint8Array`s. Puedes convertir un `Uint8Array` de nuevo a un Node.js `Buffer` envolviendo el `ArrayBuffer` subyacente:

```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```

Enviar objetos que no son de tipos nativos de JS, tales como objetos DOM (p.ej. `Element`, `Location`, `DOMMatrix`),objetos Node.js (p.ej. `process.env`, `Stream`), u objetos Electron (p.ej. `WebContents`, `BrowserWindow`, `WebFrame`) es obsoleto. En Electron 8, estos objetos serán serializados como antes con un mensaje DeprecationWarning, pero a partir de Electron 9, enviar estos tipos de objetos lanzará un error 'could not be cloned'.

### Obsoleto: `<webview>.getWebContents()`

Esta API está implementada usando el módulo `remote`, que tiene implicaciones de rendimiento y seguridad. Por lo tanto, su uso debe ser explícito.

```js
// Obsoleto
webview.getWebContents()
// Reemplazar con
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

Sin embargo, es recomendado evitar el uso por completo del modulo `remote`.

```js
// main
const { ipcMain, webContents } = require('electron')

const getGuestForWebContents = (webContentsId, contents) => {
  const guest = webContents.fromId(webContentsId)
  if (!guest) {
    throw new Error(`Invalid webContentsId: ${webContentsId}`)
  }
  if (guest.hostWebContents !== contents) {
    throw new Error('Access denied to webContents')
  }
  return guest
}

ipcMain.handle('openDevTools', (event, webContentsId) => {
  const guest = getGuestForWebContents(webContentsId, event.sender)
  guest.openDevTools()
})

// renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```

### Obsoleto: `webFrame.setLayoutZoomLevelLimits()`

Chromium ha eliminado el soporte para cambiar los limites del nivel de zoom del diseño y esta más allá de la capacidad de Electron el mantenerlo. La función emitirá una advertencia en Electron 8.x, y dejará de existir en Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Deprecated events in `systemPreferences`

The following `systemPreferences` events have been deprecated:

* `inverted-color-scheme-changed`
* `high-contrast-color-scheme-changed`

Use the new `updated` event on the `nativeTheme` module instead.

```js
// Obsoleto
systemPreferences.on('inverted-color-scheme-changed', () => { /* ... */ })
systemPreferences.on('high-contrast-color-scheme-changed', () => { /* ... */ })

// Reemplazar con
nativeTheme.on('updated', () => { /* ... */ })
```

### Deprecated: methods in `systemPreferences`

Los métodos siguientes de `systemPreferences` han quedado obsoletos:

* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

En su lugar, usa las siguientes propiedades `nativeTheme`:

* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
// Obsoleto
systemPreferences.isDarkMode()
// Reemplazar con
nativeTheme.shouldUseDarkColors

// Obsoleto
systemPreferences.isInvertedColorScheme()
// Reemplazar con
nativeTheme.shouldUseInvertedColorScheme

// Obsoleto
systemPreferences.isHighContrastColorScheme()
// Reemplazar con
nativeTheme.shouldUseHighContrastColors
```

## Cambios planeados en la API(7.0)

### Obsoleto: Atom.io Node Headers URL

Este es el URL especificado como `disturl` en un archivo `.npmrc` o como el comando de linea `--dist-url` al construir los módulos nativos de nodo.  Ambos serán admitidos para el futuro previsible, pero se recomienda que cambies.

Deprecated: https://atom.io/download/electron

Replace with: https://electronjs.org/headers

### API Modificada: `session.clearAuthCache()` ya no acepta opciones

La API `session.clearAuthCache` ya no acepta opciones de que limpiar y en su lugar incondicionalmente limpia la cache entera.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### API Modificada: `powerMonitor.querySystemIdleState` ahora es `powerMonitor.getSystemIdleState`

```js
// Removed in Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Replace with synchronous API
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### API Changed: `powerMonitor.querySystemIdleTime` is now `powerMonitor.getSystemIdleTime`

```js
// Eliminada en Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Reemplazar con API síncrona
const idleTime = powerMonitor.getSystemIdleTime()
```

### API Modificada: `webFrame.setIsolatedWorldInfo` reemplaza métodos separados

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

### Eliminado: propiedad `marked` en `getBlinkMemoryInfo`

Esta propiedad fue removida en Chromium 77, y como tal ya no está disponible.

### Comportamiento Cambiado: atributo `webkitdirectory` a `<input type="file"/>` ahora lista el contenido del directorio

La propiedad `webkitdirectory` en las entradas de archivos HTML les permite seleccionar carpetas. Las versiones anteriores de Electron tenían una implementación incorrecta donde la entrada de `event.target.files` retornaba un `FileList` que retornaba un `File` correspondiente a la carpeta seleccionada.

As of Electron 7, that `FileList` is now list of all files contained within the folder, similarly to Chrome, Firefox, and Edge ([link to MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

Como una ilustración, toma una carpeta con esta estructura:

```console
folder
├── file1
├── file2
└── file3
```

En Electron <=6, esto debería retornar un `FileList` con un objeto `File` para:

```console
rata/al/directorio
```

En Electron 7, esto ahora retorna un `FileList` con un objeto `File` para:

```console
/ruta/a/directorio/archivo3
/ruta/a/directorio/archivo2
/ruta/a/directorio/archivo1
```

Tenga en cuenta que `webkitdirectory` ya no expone la ruta a la carpeta seleccionada. Si requieras la ruta a la carpeta seleccionada en lugar de los contenidos de la carpeta, ver el `Dialog. showOpenDialog` API ([Link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

### API Modificada: Versiones basadas en Callback de APIs promisificadas

Electron 5 y Electron 6 introdujeron versiones basadas en Promise de las API asíncornas existentes y desaprobaron sus contrapartes antiguas basadas en callback. En Electron 7, todas las APIs desaprobadas basadas en callback ahora están eliminadas.

Estas funciones ahora sólo devuelven Promises:

* `app.getFileIcon()` [#15742](https://github.com/electron/electron/pull/15742)
* `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)
* `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
* `contentTracing.getTraceBufferUsage()` [#16600](https://github.com/electron/electron/pull/16600)
* `contentTracing.startRecording()` [#16584](https://github.com/electron/electron/pull/16584)
* `contentTracing.stopRecording()` [#16584](https://github.com/electron/electron/pull/16584)
* `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
* `debugger.sendCommand()` [#16861](https://github.com/electron/electron/pull/16861)
* `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
* `inAppPurchase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
* `inAppPurchase.purchaseProduct()`[#17355](https://github.com/electron/electron/pull/17355)
* `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
* `session.clearAuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
* `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
* `session.clearHostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
* `session.clearStorageData()` [#17249](https://github.com/electron/electron/pull/17249)
* `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
* `session.getCacheSize()`  [#17185](https://github.com/electron/electron/pull/17185)
* `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
* `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
* `shell.openExternal()` [#16176](https://github.com/electron/electron/pull/16176)
* `webContents.loadFile()` [#15855](https://github.com/electron/electron/pull/15855)
* `webContents.loadURL()` [#15855](https://github.com/electron/electron/pull/15855)
* `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
* `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
* `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
* `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `webFrame.executeJavaScriptInIsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
* `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `win.capturePage()` [#15743](https://github.com/electron/electron/pull/15743)

Estas funciones ahora tienen dos formas, sincrónicas y asíncronas basadas en promesa:

* `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
* `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
* `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

## Cambios planeados en la API(6.0)

### API Modificada: `win.setMenu(null)` ahora es `win.removeMenu()`

```js
// Deprecated
win.setMenu(null)
// Replace with
win.removeMenu()
```

### API Modificada: `electron.screen` en el proceso renderer debe ser accedido a través de `remote`

```js
// Deprecated
require('electron').screen
// Replace with
require('electron').remote.screen
```

### API Changed: `require()`ing node builtins in sandboxed renderers no longer implicitly loads the `remote` version

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

### Obsoleto: `powerMonitor.querySystemIdleState` reemplazar con `powerMonitor.getSystemIdleState`

```js
// Obsoleto
powerMonitor.querySystemIdleState(threshold, callback)
// Reemplazar con API síncrona
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### Obsoleto: `powerMonitor.querySystemIdleTime` reemplazado con `powerMonitor.getSystemIdleTime`

```js
// Obsoleto
powerMonitor.querySystemIdleTime(callback)
// Reemplazar con API síncrona
const idleTime = powerMonitor.getSystemIdleTime()
```

### Obsoleto: `app.enableMixedSandbox()` ya no es necesario

```js
// Obsoleto
app.enableMixedSandbox()
```

El modo Mixed-sandbox ahora está activado por defecto.

### Obsoleto: `Tray.setHighlightMode`

Bajo macOS Catalina nuestra implementación Tray se rompe. El sustituto nativo de Apple no soporta cambiar el comportamiento de resaltado.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

## Cambios planeados en la API(5.0)

### Default Changed: `nodeIntegration` and `webviewTag` default to false, `contextIsolation` defaults to true

Los siguientes valores por defectos de opción `webPreferences` están obsoletos a favor de los nuevos valores por defectos listados a continuación.

| Propiedad          | Valor obsoleto                       | El valor por defecto nuevo |
| ------------------ | ------------------------------------ | -------------------------- |
| `contextIsolation` | `false`                              | `true`                     |
| `nodeIntegration`  | `true`                               | `false`                    |
| `webviewTag`       | `nodeIntegration` if set else `true` | `false`                    |

Por ejemplo. Re-enabling the webviewTag

```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```

### Comportamiento Modificado: `nodeIntegration` en ventanas hijas abiertas a través de `nativeWindowOpen`

Child windows opened with the `nativeWindowOpen` option will always have Node.js integration disabled, unless `nodeIntegrationInSubFrames` is `true`.

### API Changed: Registering privileged schemes must now be done before app ready

Las APIs de Renderer Process `webFrame.registerURLSchemeAsPrivileged` y `webFrame.registerURLSchemeAsBypassingCSP` tal como la API del proceso de navegador `protocol.registerStandardSchemes` han sido eliminados. Una nueva API, `protocol.registerSchemesAsPrivileged` ha sido agregada y debe ser usada para registrar esquemas personalizados con los privilegios requeridos. Se requieren esquemas personalizados para ser registrados antes de que la aplicación esté lista.

### Obsoleto: `webFrame.setIsolatedWorld*` reemplazar con `webFrame.setIsolatedWorldInfo`

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

### API Changed: `webFrame.setSpellCheckProvider` now takes an asynchronous callback

El callback `spellCheck` ahora es asincrónico y el parámetro `autoCorrectWord` ha sido removido.

```js
// Obsoleto
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck: (text) => {
    return !spellchecker.isMisspelled(text)
  }
})
// Reemplazar con
webFrame.setSpellCheckProvider('en-US', {
  spellCheck: (words, callback) => {
    callback(words.filter(text => spellchecker.isMisspelled(text)))
  }
})
```

### API Modificada: `webContents.getZoomLevel` y `webContents.getZoomFactor` ahora son síncrono

`webContents.getZoomLevel` y `webContents.getZoomFactor` ya no toman parámetros callback, en su lugar devuelven directamente sus valores numéricos.

```js
// Deprecated
webContents.getZoomLevel((level) => {
  console.log(level)
})
// Replace with
const level = webContents.getZoomLevel()
console.log(level)
```

```js
// Deprecated
webContents.getZoomFactor((factor) => {
  console.log(factor)
})
// Replace with
const factor = webContents.getZoomFactor()
console.log(factor)
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
// Deprecated
app.releaseSingleInstance()
// Replace with
app.releaseSingleInstanceLock()
```

### `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Now behaves the same with `basic` on macOS
app.getGPUInfo('basic')
```

### `win_delay_load_hook`

Cuando se construye módulos nativos para windows, la variable `win_delay_load_hook` del módulo `binding.gyp` debe ser true (el cual es por defecto). Si este hook no esta presente, luego el módulo nativo va a fallar al cargar en Windows, con un mensaje de error como `Cannot find module`. Consulte la [guía de módulo nativo](/docs/tutorial/using-native-node-modules.md) para más infromación.

## Cambios en la API(3.0)

La siguiente lista incluye cambios efectuados en la API 3.0 de Electrón.

### `app`

```js
// Deprecated
app.getAppMemoryInfo()
// Replace with
app.getAppMetrics()

// Deprecated
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Deprecated property
```

### `BrowserWindow`

```js
// Obsoleto
const optionsA = { webPreferences: { blinkFeatures: '' } }
const windowA = new BrowserWindow(optionsA)
// Reemplazar con
const optionsB = { webPreferences: { enableBlinkFeatures: '' } }
const windowB = new BrowserWindow(optionsB)

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

### `NativeImage`

```js
// Deprecated
nativeImage.createFromBuffer(buffer, 1.0)
// Replace with
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `process`

```js
// Deprecated
const info = process.getProcessMemoryInfo()
```

### `screen`

```js
// Deprecated
screen.getMenuBarHeight()
// Replace with
screen.getPrimaryDisplay().workArea
```

### `session`

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
// Deprecated
webContents.openDevTools({ detach: true })
// Replace with
webContents.openDevTools({ mode: 'detach' })

// Removed
webContents.setSize(options)
// There is no replacement for this API
```

### `webFrame`

```js
// Deprecated
webFrame.registerURLSchemeAsSecure('app')
// Replace with
protocol.registerStandardSchemes(['app'], { secure: true })

// Deprecated
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Replace with
protocol.registerStandardSchemes(['app'], { secure: true })
```

### `<webview>`

```js
// Removed
webview.setAttribute('disableguestresize', '')
// There is no replacement for this API

// Removed
webview.setAttribute('guestinstance', instanceId)
// There is no replacement for this API

// Keyboard listeners no longer work on webview tag
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
// Obsoleto
const optionsA = { titleBarStyle: 'hidden-inset' }
const windowA = new BrowserWindow(optionsA)
// Reemplazar con
const optionsB = { titleBarStyle: 'hiddenInset' }
const windowB = new BrowserWindow(optionsB)
```

### `menu`

```js
// Removed
menu.popup(browserWindow, 100, 200, 2)
// Replaced with
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `NativeImage`

```js
// Removed
nativeImage.toPng()
// Replaced with
nativeImage.toPNG()

// Removed
nativeImage.toJpeg()
// Replaced with
nativeImage.toJPEG()
```

### `process`

* `Versión de procesos de Electron` y `Versión de procesos de Chrome` Serán propiedades de solo lectura para la consistencia con otras propiedades de `process.versions` configuradas por Node.

### `webContents`

```js
// Removed
webContents.setZoomLevelLimits(1, 2)
// Replaced with
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
// Removed
webFrame.setZoomLevelLimits(1, 2)
// Replaced with
webFrame.setVisualZoomLevelLimits(1, 2)
```

### `<webview>`

```js
// Removed
webview.setZoomLevelLimits(1, 2)
// Replaced with
webview.setVisualZoomLevelLimits(1, 2)
```

### Duplicado de brazo ARM

Cada versión de Electrón incluye dos versiones de ARM idénticas con diferentes nombres de archivo, como: `electron-v1.7.3-linux-arm.zip` y `electron-v1.7.3-linux-armv7l.zip`. Se agregó el archivo con el prefijo `v7l` para aclarar a los usuarios qué versión de ARM soporta y desambiguar los futuros archivos de armv6l y arm64 que pueden ser producidos.

El archivo _sin el prefijo_ todavía se está publicando para evitar romper cualquier configuración que pueda estar consumiéndolo. A partir de 2.0, el archivo sin prefijo ya no será publicado.

Para más detalles, vea: [6986](https://github.com/electron/electron/pull/6986) y [7189](https://github.com/electron/electron/pull/7189).

[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
