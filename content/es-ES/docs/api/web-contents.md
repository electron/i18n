# webContents

> Procesamiento y control de páginas webs.

Process: [Main](../glossary.md#main-process)

`webContents` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ese es responsable de renderizar y controlar la página web y es el propietario del objeto [`BrowserWindow`](browser-window.md). Un ejemplo de acceso del objeto `webContents`:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('http://github.com')

let contents = win.webContents
console.log(contents)
```

## Métodos

Se pueden acceder a estos métodos desde el módulo `webContents`:

```javascript
const { webContents } = require('electron')
console.log(webContents)
```

### `webContents.getAllWebContents()`

Volver `WebContents[]` a la matriz de todo el caso `WebContents`. Esto incluirá contenido web para todos los windows, páginas web, devtools abiertos y extensión de páginas de origen devtools.

### `webContents.getFocusedWebContents()`

Volver `WebContents` - El contenido web que se centra en esta aplicación, de lo contrario regresa `null`.

### `webContents.fromId(id)`

* `id` Íntegro

Devuelve `WebContents` - Una instancia de WebContents con el ID especificado.

## Clase: ContenidoWeb

> Renderice y controle el contenido de una instancia de BrowserWindow.

Process: [Main](../glossary.md#main-process)

### Eventos de Instancia

#### Evento: 'did-finish-load'

Emite cuando la navegación está hecha, i.e.

#### Evento: 'did-fail-load'

Devuelve:

* `event` Event
* `errorCode` Entero
* `errorDescription` String
* `validatedURL` String
* `EsElFramePrincipal` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

This event is like `did-finish-load` but emitted when the load failed. La lista completa de errores de código y su significado está disponible [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

#### Event: 'did-fail-provisional-load'

Devuelve:

* `event` Event
* `errorCode` Entero
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

This event is like `did-fail-load` but emitted when the load was cancelled (e.g. `window.stop()` was invoked).

#### Evento: 'did-frame-finish-load'

Devuelve:

* `event` Event
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emite cuando un frame ha terminado la navegación.

#### Evento: 'did-start-loading'

Corresponde a los puntos en el tiempo cuando el girador de la pestaña comenzó a girar.

#### Evento: 'did-stop-loading'

Corresponde a los puntos en tiempo cuando el girador del tabulador terminó de girar.

#### Evento: 'dom-ready'

Devuelve:

* `event` Event

Emitido cuando el documento en el frame dado es cargado.

#### Evento: "page-title-updated"

Devuelve:

* `event` Event
* `title` Cadena
* `explicitSet` Boolen

Disparado cuando el título de la página es establecido durante la navegación. `explicitSet` es falso cuando el título es sintetizado del archivo url.

#### Evento: 'page-favicon-updated'

Devuelve:

* `event` Event
* `favicons` Cadena[] - Arreglo para URLs.

Emite cuando la página recibe urls de favicon.

#### Evento: 'new-window'

Devuelve:

* `event` Event
* `url` String
* `frameName` String
* `disposition` String - Puede ser `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
* `options` BrowserWindowConstructorOptions - The options which will be used for creating the new [`BrowserWindow`](browser-window.md).
* `additionalFeatures` String[] - Las características no estándar (características no manejadas por Chromium o Electron) pasadas a `window.open()`.
* `referrer` [Referrer](structures/referrer.md) - El remitente que será pasado a la nueva ventana. Puede resultar o no en la cabecera `Referer` siendo enviado, dependiendo de la política de referencia.

Emite cuando la página solicita abrir una nueva ventana para una `url`. Podría ser solicitada por `window.open` or an external link like `<a target='_blank'>`.

Por defecto se creará un nuevo `BrowserWindow` para la `dirección url`.

Ejecutar `event.preventDefault()` evitará que Electron cree automáticamente un nuevo [`BrowserWindow`](browser-window.md). Si se llama a `event.preventDefault()` y se crea manualmente un nuevo [`BrowserWindow`](browser-window.md) entonces se debe activar `event.newGuest` para referenciar a la nueva instancia de [`BrowserWindow`](browser-window.md), no hacerlo puede causar un comportamiento inesperado. Por ejemplo:

```javascript
myBrowserWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
  event.preventDefault()
  const win = new BrowserWindow({
    webContents: options.webContents, // use existing webContents if provided
    show: false
  })
  win.once('ready-to-show', () => win.show())
  if (!options.webContents) {
    win.loadURL(url) // existing webContents will be navigated automatically
  }
  event.newGuest = win
})
```

#### Evento: 'will-navigate'

Devuelve:

* `event` Event
* `url` Cadena

Emitido cuando un usuario o la página quiere iniciar la navegación. Puede suceder cuando el objeto `window.location` es cambiado o un usuario hace click en un link de la página.

Este evento no se emitirá cuando la navegación es iniciada con programación con APIs como `webContents.loadURL` y `webContents.back`.

Tampoco es emitido para las navegaciones en la página, como hacerle click a links o actualizando el `window.location.hash`. Usa el evento `did-navigate-in-page` para este propósito.

Llamando `event.preventDefault()` evitará la navegación.

#### Evento: 'did-start-navigation'

Devuelve:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitido cuando algún frame (incluido el principal) empieza la navegación. `isInplace` será `true` para las navegaciones en la página.

#### Evento: 'will-redirect'

Devuelve:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitido como una redirección ocurrido del lado del servidor durante la navegación. Por ejemplo un redirección 302.

Este evento sera emitido después de `did-start-navigation` y siempre antes del evento `did-redirect-navigation` para la misma navegación.

Llamar a `event.preventDefault()` evitará la navegación (no solo la redirección).

#### Evento: 'did-redirect-navigation'

Devuelve:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitido después de una redirección ocurrida del lado del servidor durante la navegación. Por ejemplo una redirección 302.

Este evento no puede ser evitado, si usted quiere evitar las redirecciones debe revisar el evento `will-redirect` anterior.

#### Evento: 'did-navigate'

Devuelve:

* `event` Event
* `url` String
* `httpResponseCode` Integer - -1 para navegaciones no HTTP
* `httpStatusText` String - vacío para navegaciones no HTTP

Emitido cuando se realizo un navegación del frame principal.

Este evento no es emitido para navegaciones dentro de la página, como hacerle click a links o actualizando `window.location.hash`. Usa el evento `did-navigate-in-page` para este propósito.

#### Evento: 'did-frame-navigate'

Devuelve:

* `event` Event
* `url` String
* `httpResponseCode` Integer - -1 para navegaciones no HTTP
* `httpStatusText` String - vacío para navegaciones no HTTP
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitido cuando se ha realizado un navegación de algun frame.

Este evento no es emitido para navegaciones dentro de la página, como hacerle click a links o actualizando `window.location.hash`. Usa el evento `did-navigate-in-page` para este propósito.

#### Evento: 'did-navigate-in-page'

Devuelve:

* `event` Event
* `url` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitido cuando se produjo una navegación en la página en cualquier frame.

Cuando una navegación dentro de la página sucede, el URL de la página cambia, pero no causa una navegación fuera de la página. Ejemplos de ésto ocurriendo son cuando los links son clickeados o cuando el evento DOM `hashchange` es activado.

#### Evento: 'will-prevent-unload'

Devuelve:

* `event` Event

Emite cuando un controlador de eventos `beforeunload` está tratando de cancelar una descarga de la página.

Llamando a `event.preventDefault()` ignorará el controlador de eventos `beforeunload` y permite que la página sea descargada.

```javascript
const { BrowserWindow, dialog } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
win.webContents.on('will-prevent-unload', (event) => {
  const choice = dialog.showMessageBox(win, {
    type: 'question',
    buttons: ['Leave', 'Stay'],
    title: 'Do you want to leave this site?',
    message: 'Changes you made may not be saved.',
    defaultId: 0,
    cancelId: 1
  })
  const leave = (choice === 0)
  if (leave) {
    event.preventDefault()
  }
})
```

#### Evento: 'crashed'

Devuelve:

* `event` Event
* `killed` Booleano

Emitido cuando el proceso se crashea o es terminado.

#### Evento: "unresponsive"

Aparece cuando la página web deja de responder.

#### Evento: "responsive"

Aparece cuando la página web que no responde vuelve a responder.

#### Evento: 'plugin-crashed'

Devuelve:

* `event` Event
* `name` String
* `version` Cadena

Emitido cuando el proceso de enchufe se ha caído.

#### Evento: 'destroyed'

Emitido cuando `webContents` es destruido.

#### Evento: 'before-input-event'

Devuelve:

* `event` Event
* `entrada` Object - Propiedades de la entrada. 
  * `type` String - Sea `keyUp` o `keyDown`.
  * `key` String - Es igual a [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `code` String - Es igual a [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `isAutoRepeat` Boolean - Es igual a [KeyboardEvent.repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `shift` Boolean - Es igual a [KeyboardEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `control` Boolean - Es igual a [KeyboardEvent.controlKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `alt` Boolean - Es igual a [KeyboardEvent.altKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `meta` Boolean - Es igual a [KeyboardEvent.metaKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).

Emitido antes de enviar los eventos `keydown` y `keyup` en la página. Llamando a `event.preventDefault` evitará la página `keydown`/ eventos `keyup` y los accesos rápidos al menú.

Para evitar sólo los accesos directos del menú, use [`setignoreMenuShortcuts`](#contentssetignoremenushortcutsignore-experimental):

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })

win.webContents.on('before-input-event', (event, input) => {
  // For example, only enable application menu keyboard shortcuts when
  // Ctrl/Cmd are down.
  win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Evento: "enter-html-full-screen"

Aparece cuando la ventana entra en un estado pantalla completa activado por la API HTML.

#### Evento: "leave-html-full-screen"

Aparece cuando la ventana sale de un estado pantalla completa activado por la API HTML.

#### Event: 'zoom-changed'

Devuelve:

* `event` Event
* `zoomDirection` String - Can be `in` or `out`.

Emitted when the user is requesting to change the zoom level using the mouse wheel.

#### Evento: 'devtools-opened'

Emitido cuando DevTools es abierto.

#### Evento: 'devtools-closed'

Emitido cuando Devtools es cerrado.

#### Evento: 'devtools-focused'

Emitido cuando DevTools es centrado o abierto.

#### Evento: 'error-certificado'

Devuelve:

* `event` Event
* `url` String
* `error` cadena - el error del código.
* `certificate` [certificate](structures/certificate.md)
* `callback` Function 
  * `isTrusted` Boolean - indica si el certificado se puede considerar de confianza.

Emitido cuando no se pudo verificar el `certificate` for `url`.

El uso es el mismo con [the `certificate-error` evento de `app`](app.md#event-certificate-error).

#### Evento: 'select--client-certificate'

Devuelve:

* `event` Event
* `url` URL
* `certificateList`[Certificate[]](structures/certificate.md)
* `callback` Function 
  * `certificate`[Certificate](structures/certificate.md) - Debe ser un certificado de la lista dada.

Emitido cuando el certificado de un cliente es requerido.

El uso es el mismo con [the `select-client-certificate` evento de `app`](app.md#event-select-client-certificate).

#### Evento:'login'

Devuelve:

* `event` Event
* `authenticationResponseDetails` Object 
  * `url` URL
* `authInfo` Object 
  * `isProxy` Boolean
  * `scheme` String
  * `anfitrión` Cadena
  * `puerto` Íntegro
  * `realm` Cadena
* `callback` Function 
  * `username` String (optional)
  * `password` String (optional)

Emitido cuando `webContents` quiere hacer una autenticación básica.

El uso es lo mismo que con el evento [the `login` de la `app`](app.md#event-login).

#### Evento: 'found-in-page'

Devuelve:

* `event` Event
* `resultado` Object 
  * `requestId` Íntegro
  * `activeMatchOrdinal` Integer - Posición de la coincidencia activa.
  * `matches` Integer - Número de coincidencias.
  * `selectionArea` Rectangle - Coordinates of first match region.
  * `finalUpdate` Boolean

Emitido cuando un resultado está disponible para la petición de [`webContents.findInPage`].

#### Evento: 'media-started-playing'

Emitido cuando la media empieza a reproducirse.

#### Evento: 'media-paused'

Emitido cuando la media es pausada o ha terminado de reproducirse.

#### Evento: 'did-change-theme-color'

Devuelve:

* `event` Event
* `color` (String | null) - Tema de color en formato '#rrggbb'. Es `null` cuando no se ha establecido ningún tema.

Emitido cuando el color de tema de una página cambia. Esto usualmente se debe al encuentro de una meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

#### Evento: 'update-target-url'

Devuelve:

* `event` Event
* `url` String

Emitido cuando el mouse se mueve sobre un link o el teclado se mueve el concentrado a un link.

#### Evento: 'cursor-changed'

Devuelve:

* `event` Event
* `type` String
* `image` [NativeImage](native-image.md) (opcional)
* `scale` Float (opcional) - Factor de escala para el cursor personalizado.
* `size` [Size](structures/size.md) (opcional) - El tamaño de la `image`.
* `hotspot` [Point](structures/point.md) (opcional) - Coordenadas de la zona activa del cursor personalizado.

Emitido cuando el tipo del cursor cambia. El parámetro `type` puede ser `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` or `custom`.

Si el parámetro `type` es `custom`, el parámetro de la `image` mantendrá la imagen del cursor personalizado en un [`NativeImage`](native-image.md), `scale` y `size`, `hotpost` mantendrá información adicional sobre el cursor personalizado.

#### Evento: 'context-menu'

Devuelve:

* `event` Event
* `params` Object 
  * Entero `x` - coordenadas x.
  * Entero `y` - coordenadas x.
  * `linkURL` String - URL del enlace que incluye el nodo del menú contextual que fue invocado.
  * `linkText` String - Texto asociado con el enlace. Puede ser una cadena vacía si el contenido del enlace es una imagen.
  * `pageURL` String - URL de la parte superior del nivel de la página que se invocó en el menú del contexto.
  * `framseURL` String - URL de la parte inferior del marco que se invocó en el menú del contexto.
  * `srcURL` String - Source URL para el elemento que el menú del contexto fue invocado. Elementos con fuente URLs son imágenes, audio y video.
  * `mediaTipo` String - Tipo de nodo que el menú del contexto fue invocado. Puede ser `none`, `image`, `audio`, `video`, `canvas`, `file` o `plugin`.
  * `<0>tieneImagenContenido` Boolean - si el menú del contexto fue invocado en una imagen la cual tiene contenido no vacío.
  * `esEditable` Boolean - Si el contexto es editable.
  * `selectrionText` String. Texto de la selección la cual el menú del contexto fue invocado.
  * `tituloTexto` String - Título o texto alt de la selección la cual el contexto fue invocado.
  * `misspelledWord` String - La palabra mal escrita bajo el cursor, si cualquiera.
  * `frameCharset` String - La codificación de carácteres de la estructura la cual el menú fue invocado.
  * `inputFieldType` Cadena - Si se invoca el menú de contexto en un campo de entrada, el tipo de ese campo. Los valores posibles son `none`, `plainText`, `password`, `other`.
  * `menuSourceType` String - Fuente de entrada que invoca el menú contextual. Puede ser `none`, `mouse`, `keyboard`, `touch` o `touchMenu`.
  * `mediaFlags` Objeto - Las banderas para el elemento multimedia la cual el menú contextual fue invocado. 
    * `enError` Boolean - Si el elemento multimedia se ha dañado.
    * `estáPausado` Boolean - Si el elemento multimedia está pausado.
    * `estáSilenciado` Boolean - Si el elemento multimedia está silenciado.
    * `tieneAudio` Boolean - Si el elemento multimedia tiene audio.
    * `estáLooping` Boolean - Si el elemento multimedia está enredado.
    * `esControlVisible` Boolean - Si los controles del elemento multimedia son visibles.
    * `puedeToggleControles` Boolean - Si los controles de los elementos multimedia son toggleable.
    * `puedeRotar` Boolean - Si el elemento multimedia puede ser rotado.
  * `editFlags` Objeto - Estas banderas indican si el procesador se cree capaz de realizar la acción correspondiente. 
    * `canUndo` Boolean - Si cree que el procesador puede deshacer.
    * `canRedo` Boolean - Si cree que el procesador pueda rehacer.
    * `canCut` Boolean - Si cree que el procesador puede cortar.
    * `canCopy` Boolean - Si cree que el procesador puede copiar
    * `canPaste` Boolean - Si cree que el procesador puede pegar.
    * `canDelete` Boolean - Si cree que el procesador puede borrar.
    * `canSelectAll` Boolean - Si cree que el procesador puede seleccionar todo.

Emitido cuando hay un nuevo menú de contexto que debe ser manejado.

#### Evento: 'select-bluetooth-device'

Devuelve:

* `event` Event
* `devices` [BluetoothDevice[]](structures/bluetooth-device.md)
* `callback` Function 
  * `deviceId` String

Emite cuando el dispositivo bluetooth necesita ser seleccionado en la llamada `navigator.bluetooth.requestDevice`. Para usar `navigator.bluetooth` api `webBluetooth` debe ser activada. Si no se llama `event.preventDefault` el primer dispositivo disponible será seleccionado. `callback` puede ser llamado con `deviceId` ser seleccionado,.

```javascript
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    let result = deviceList.find((device) => {
      return device.deviceName === 'test'
    })
    if (!result) {
      callback('')
    } else {
      callback(result.deviceId)
    }
  })
})
```

#### Evento: 'paint'

Devuelve:

* `event` Event
* `dirtyRect` [Rectangle](structures/rectangle.md)
* `image` [NativeImage](native-image.md) - La información de la imagen de todo el fotograma.

Emitido cuando un se genera un nuevo fotograma. Solo la zona oscura se pasa al búfer.

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ webPreferences: { offscreen: true } })
win.webContents.on('paint', (event, dirty, image) => {
  // updateBitmap(dirty, image.getBitmap())
})
win.loadURL('http://github.com')
```

#### Evento: 'devtools-reload-page'

Emitido cuando la ventana devtools instruya la webContents para recargar

#### Evento: 'will-attach-webview'

Devuelve:

* `event` Event
* `webPreferences` WebPreferences - The web preferences that will be used by the guest page. This object can be modified to adjust the preferences for the guest page.
* `params` Record<string, string> - The other `<webview>` parameters such as the `src` URL. This object can be modified to adjust the parameters of the guest page.

Cuando emite contenidos de la web de `<webview>` se está conectando a los contenidos de esta web. Llamando a `event.preventDefault()` destruirá la página de invitado.

Este evento puede utilizarse para configurar `webPreferences` para la `webContents` de un `<webview>`antes de que se carga y proporciona la capacidad de configuración que no se puede establecer a través de atributos `<webview>`.

**Nota:** La opción del script especificado `precarga` aparecerá como `preloadURL` (no como `preload`) en el objeto `webPreferences` emitido con este evento.

#### Event: 'did-attach-webview'

Devuelve:

* `event` Event
* `webContents` WebContents - El contenido de la página web invitada que será usado por `<webview>`.

Emitido cuando se ha adjuntado un `<webview>` a este contenido web.

#### Evento: 'console-message'

Devuelve:

* `event` Event
* `level` Íntegro
* `message` String
* `line` Íntegro
* `sourceId` Cadena

Emitido cuando la ventana asociada registra un mensaje de consola. No se emite para ventanas con *Renderización fuera de pantalla* activado.

#### Evento: 'error-preload'

Devuelve:

* `event` Event
* `preloadPath` String
* `error` Error

Emitido cuando el script de preload `preloadPath`lanza una excepción no manejada `error`.

#### Evento: 'ipc-message'

Devuelve:

* `event` Event
* `channel` Cadena
* `...args` any[]

Emitido cuando el proceso de renderizado enviá un mensaje asíncrono a través de `ipcRenderer.send()`.

#### Evento: 'ipc-message-sync'

Devuelve:

* `event` Event
* `channel` Cadena
* `...args` any[]

Emitido cuando el proceso de renderizado envía un mensaje sincronídico a través de `ipcRenderer.sendSync()`.

#### Event: 'desktop-capturer-get-sources'

Devuelve:

* `event` Event

Emitido cuando `desktopCapturer.getSources()` se llama en el proceso de renderizado. Llamando `event.preventDefault()` lo hará devolver fuentes vacías.

#### Evento: 'remote-require'

Devuelve:

* `event` IpcMainEvent
* `moduleName` String

Emitido cuando `remote.require()` se llama en el proceso de renderizado. Llamando `event.preventDefault()` evitará que se devuelva el modulo. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

#### Evento: 'remote-get-global'

Devuelve:

* `event` IpcMainEvent
* `globalName` String

Emitido cuando `remote.getGlobal()` se llama en el proceso de renderizado. Llamando `event.preventDefault()` evitará que sea devuelto el global. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

#### Evento: 'remote-get-builtin'

Devuelve:

* `event` IpcMainEvent
* `moduleName` String

Emitido cuando `remote.getBuiltin()` se llama en el proceso de renderizado. Llamando `event.preventDefault()` evitará que se devuelva el modulo. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

#### Evento: 'remote-get-current-window'

Devuelve:

* `event` IpcMainEvent

Emitido cuando `remote.getCurrentWindow()` se llama en el proceso de renderizado. Llamar a `event.preventDefault()` impedirá que el objeto sea devuelto. El valor personalizado puede ser devuelto por la configuración `event.returnValue`.

#### Evento: 'remote-get-current-web-contents'

Devuelve:

* `event` IpcMainEvent

Emitido cuando `remote.getCurrentWebContents()` se llama en el proceso de renderizado. Llamar a `event.preventDefault()` evitará que el objeto sea devuelto. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

#### Evento: 'remote-get-guest-web-contents'

Devuelve:

* `event` IpcMainEvent
* `guestWebContents` [WebContents](web-contents.md)

Emitido cuando `<webview>.getWebContents()` se llama en el proceso de renderizado. Llamando `event.preventDefault()` evitará que el objeto sea retornado. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

### Métodos de Instancia

#### `contents.loadURL(url[, options])`

* `url` String
* `opciones` Objecto (opcional) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (opcional) - Una url HTTP Referencia.
  * `userAgent` String (opcional) - Un agente de usuario originando la solicitud.
  * `extraHeaders` String (opcional) - Encabezados extras separadas por "\n".
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (opcional)
  * `baseURLForDataURL` String (opcional) - Url base (con separadores de ruta arrastrables) para archivos que se cargan por el url de datos. Esto es necesario únicamente si el `url` especificado es un url de datos y necesita cargar otros archivos.

Devuelve `Promise<void>` - la promesa se resolverá cuando la página ha finalizado de cargar (mira [`did-finish-load`](web-contents.md#event-did-finish-load)), y rechaza si la página falla al cargar (mira[`did-fail-load`](web-contents.md#event-did-fail-load)). A noop rejection handler is already attached, which avoids unhandled rejection errors.

Carga el `url` en la ventana. El `url` debe contener el prefijo de protocolo. Por ejemplo `http://` o `file://`. Si la carga debe omitir el caché http entonces hay que utilizar el encabezado `pragma` para lograrlo.

```javascript
const { webContents } = require('electron')
const options = { extraHeaders: 'pragma: no-cache\n' }
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath[, options])`

* `filePath` String
* `opciones` Objecto (opcional) 
  * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (opcional) - Pasado a `url.format()`.
  * `hash` String (opcional) - Pasado a `url.format()`.

Devuelve `Promise<void>` - la promesa sera resolvida cuando la página haya finalizado de cargar (mira [`did-finish-load`](web-contents.md#event-did-finish-load)), y será rechazada si la pagina falla al cargar (mira [`did-fail-load`](web-contents.md#event-did-fail-load)).

Carga el archivo dado en la ventana, `filePath` debe ser una ruta a un archivo HTML relativo a la raíz de su aplicación. Por ejemplo, una estructura de aplicación como esta:

```sh
| root
| - package.json
| - src
|   - main.js
|   - index.html
```

Requeriría un código como este

```js
win.loadFile('src/index.html')
```

#### `contents.downloadURL(url)`

* `url` String

Inicia una descarga del recurso en el `url` sin navegar. Se activará el evento `will-download` de la `session`.

#### `contents.getURL()`

Devuelve `String` - El URL de la página web actual.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

let currentURL = win.webContents.getURL()
console.log(currentURL)
```

#### `contents.getTitle()`

Devuelve `String` - El título de la página web actual.

#### `contents.isDestroyed()`

Devuelve `Boolean` - Si la página web fue destruida o no.

#### `contents.focus()`

Enfoca la página web.

#### `contents.isFocused()`

Devuelve `Boolean` - Si se enfocó o no la página web.

#### `contents.isLoading()`

Devuelve `Boolean` - Si todavía la página web está cargando recursos.

#### `contents.isLoadingMainFrame()`

Devuelve `Boolean` - Si el marco principal (y no sólo iframes o frames dentro de él) todavía está cargando.

#### `contents.isWaitingForResponse()`

Devuelve `Boolean` - Si la página web espera una primera respuesta desde el recurso principal de la página.

#### `contents.stop()`

Detiene cualquier navegación pendiente.

#### `contents.reload()`

Recarga la página web actual.

#### `contents.reloadIgnoringCache()`

Recarga la página actual e ignora el caché.

#### `contents.canGoBack()`

Devuelve `Boolean` - Si el navegador puede volver a la página web anterior.

#### `contents.canGoForward()`

Devuelve `Boolean` - Si el navegador puede avanzar a la siguiente página web.

#### `contents.canGoToOffset(offset)`

* `offset` Íntegro

Devuelve `Boolean` - Si la página web puede ir a `offset`.

#### `contents.clearHistory()`

Limpia el historial de navegación.

#### `contents.goBack()`

Hace que el navegador regrese a una página web.

#### `contents.goForward()`

Hace que el navegador avance a una página web.

#### `contents.goToIndex(index)`

* `index` Íntegro

Navega al índice de página web absoluta especificado.

#### `contents.goToOffset(offset)`

* `offset` Íntegro

Navega a la compensación especifica desde la "entrada actual".

#### `contents.isCrashed()`

Devuelve `Boolean` - Si el proceso de renderizado ha fallado.

#### `contents.setUserAgent(userAgent)`

* `userAgent` cadena

Anula el agente usuario para esta página web.

**[Cambiar](modernization/property-updates.md)**

#### `contents.getUserAgent()`

Devuelve `String` - El agente usuario para esta página web.

**[Cambiar](modernization/property-updates.md)**

#### `contents.insertCSS(css[, options])`

* `css` Cadena
* `opciones` Objecto (opcional) 
  * `cssOrigin` String (optional) - Can be either 'user' or 'author'; Specifying 'user' enables you to prevent websites from overriding the CSS you insert. Default is 'author'.

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `contents.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

```js
contents.on('did-finish-load', function () {
  contents.insertCSS('html, body { background-color: #f00; }')
})
```

#### `contents.removeInsertedCSS(key)`

* `llave` Cadena

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `contents.insertCSS(css)`.

```js
contents.on('did-finish-load', async function () {
  const key = await contents.insertCSS('html, body { background-color: #f00; }')
  contents.removeInsertedCSS(key)
})
```

#### `contents.executeJavaScript(code[, userGesture])`

* `code` Cadena de caracteres
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.

Devuelve `Promise<any>` - Una promesa que resuelve con el resultado de la ejecución del código o es rechazada si el resultado del código es una promesa rechazada.

Evalúa el `código` en la página.

En la ventana del navegador, algunas API HTML como `requestFullScreen` solo pueden invocarse con un gesto del usuario. Establecer `userGesture` a `true` eliminará esta limitación.

Code execution will be suspended until web page stop loading.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Será el objeto JSON de la fetch call
  })
```

#### `contents.setIgnoreMenuShortcuts(ignoreo)` *Experimental*

* `ignore` Boolean

Ignora los accesos directos del menú de la aplicación mientras se enfoca los contenidos de la web.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Silencia el audio la página web actual.

**[Cambiar](modernization/property-updates.md)**

#### `contents.isAudioMuted()`

Devuelve `Boolean` - Si esta página ha sido silenciada.

**[Cambiar](modernization/property-updates.md)**

#### `contents.isCurrentlyAudible()`

Devuelve `Boolean` - Si el audio se esta reproduciendo actualmente.

#### `contents.setZoomFactor(factor)`

* `factor` Number - Zoom factor.

Cambia el factor de zoom al factor especificado. El factor de zoom es el porcentaje de zoom dividido por 100, por lo que 300% = 3.0.

**[Cambiar](modernization/property-updates.md)**

#### `contents.getZoomFactor()`

Devuelve `Number` - el factor de zoom actual.

**[Cambiar](modernization/property-updates.md)**

#### `contents.setZoomLevel(level)`

* `nivel` Número - Nivel de Zoom.

Cambia el nivel de zoom al nivel especificado. El tamaño original es 0 y cada incremento por encima o por debajo representa un zoom del 20% mayor o menor a los límites predeterminados de 300% y 50% del tamaño original, respectivamente. La fórmula para esto es `scale := 1.2 ^ level`.

**[Cambiar](modernization/property-updates.md)**

#### `contents.getZoomLevel()`

Devuelve `Number` - el nivel de zoom actual.

**[Cambiar](modernization/property-updates.md)**

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

Devuelve `Promise<void>`

Establecer el nivel de máximo y mínimo pizca de zoom.

> **NOTA**: El zoom visual está desactivado por defecto en Electron. Para volverlo a activar, llame:
> 
> ```js
contents.setVisualZoomLevelLimits(1, 3)
```

#### `contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

Devuelve `Promise<void>`

Establece el nivel de zoom máximo y mínimo basado en el diseño (es decir, no visual).

#### `contents.undo()`

Ejecuta el comando de edición `undo` en la página web.

#### `contents.redo()`

Ejecuta el comando de edición `redo` en la página web.

#### `contents.cut()`

Ejecuta el comando de edición `cut` en la página web.

#### `contents.copy()`

Ejecuta el comando de edición `copy` en la página web.

#### `contents.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Copia la imagen en la posición determinada al portapapeles.

#### `contents.paste()`

Ejecuta el comando de edición `paste` en la página web.

#### `contents.pasteAndMatchStyle()`

Ejecuta el comando de edición `pasteAndMatchStyle` en la página web.

#### `contents.delete()`

Ejecuta el comando de edición `delete` en la página web.

#### `contents.selectAll()`

Ejecuta el comando de edición `selectAll` en la página web.

#### `contents.unselect()`

Ejecuta el comando de edición `unselect` en la página web.

#### `contents.replace(text)`

* `texto` String

Ejecuta el comando de edición `replace` en la página web.

#### `contents.replaceMisspelling(text)`

* `texto` String

Ejecuta el comando de edición `replaceMisspelling` en página web.

#### `contents.insertText(text)`

* `texto` String

Devuelve `Promise<void>`

Inserta `texto` en el elemento enfocado.

#### `contents.findInPage(text[, options])`

* `text` String - El contenido para ser buscado, no debe quedar en blanco.
* `opciones` Objecto (opcional) 
  * `forward` Boolean (opcional) - Ya sea para buscar hacia adelante o hacia atrás, el valor predeterminado es `true`.
  * `findNext` Boolean (opcional) - Si la operación es la primera solicitud o un seguimiento, por defecto a `false`.
  * `matchCase` Boolean (opcional) - Si la busqueda debe ser sensible a mayúsculas, por defecto es `false`.
  * `wordStart` Boolean (opcional) - Si sólo se mira al inicio de las palabras. por defecto a `false`.
  * `medialCapitalAsWordStart` Boolean (opcional) - Cuando se combina con `wordStart`, acepta emparejar en el medio de una palabra si el emparejado comienza con un una letra mayúscula seguida por una minúscula o no letra. Acepta muchas otras coincidencias intra palabras, por defecto a `falso`.

Devuelve `Integer` - El id de la solicitud usado para la solicitud.

Empieza una solicitud para encontrar todas las coincidencias para el `text` en la página web. El resultado de la solicitud puede ser obtenida suscribiendote al evento [`found-in-page`](web-contents.md#event-found-in-page).

#### `contents.stopFindInPage(action)`

* `acción` String - Especifica la acción que se llevará a cabo cuando finalice [`webContents.findInPage`] la solicitud. 
  * `clearSelection` - Borrar la selección.
  * `keepSelection` - Traduce la selección en una selección normal.
  * `activateSelection` - Enfoca y hace clic en el nodo de selección.

Detiene cualquier solicitud `findInPage` para el `webContents` con la `action` proporcionada.

```javascript
const { webContents } = require('electron')
webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```

#### `contents.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (opcional) - El área de la página para ser capturada.

Devuelve `Promise<NativeImage>` - Resuelve con el un [NativeImage](native-image.md)

Captura una instantánea de la página dentro de `rect`. Omitiendo `rect` capturará toda la página visible.

#### `contents.getPrinters()`

Obtiene la lista de impresora del sistema.

Devuelve [`PrinterInfo[]`](structures/printer-info.md)

#### `contents.print([options], [callback])`

* `opciones` Objecto (opcional) 
  * `silent` Boolean (opcional) - No le pide al usuario configurar la impresora. Por defecto es `false`.
  * `printBackground` Boolean (optional) - Prints the background color and image of the web page. Default is `false`.
  * `deviceName` String (opcional) - Configura el nombre de la impresora que se va a usar. Por defecto es `''`.
  * `color` Boolean (optional) - Set whether the printed web page will be in color or grayscale. Default is `true`.
  * `margins` Objecto (opcional) 
    * `marginType` String (optional) - Can be `default`, `none`, `printableArea`, or `custom`. If `custom` is chosen, you will also need to specify `top`, `bottom`, `left`, and `right`.
    * `top` Number (optional) - The top margin of the printed web page, in pixels.
    * `bottom` Number (optional) - The bottom margin of the printed web page, in pixels.
    * `left` Number (optional) - The left margin of the printed web page, in pixels.
    * `right` Number (optional) - The right margin of the printed web page, in pixels.
  * `landscape` Boolean (optional) - Whether the web page should be printed in landscape mode. Default is `false`.
  * `scaleFactor` Number (optional) - The scale factor of the web page.
  * `pagesPerSheet` Number (optional) - The number of pages to print per page sheet.
  * `collate` Boolean (optional) - Whether the web page should be collated.
  * `copies` Number (optional) - The number of copies of the web page to print.
  * `pageRanges` Record<string, number> (optional) - The page range to print. Should have two keys: `from` and `to`.
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Objecto (opcional) 
    * `horizontal` Number (optional) - The horizontal dpi.
    * `vertical` Number (optional) - The vertical dpi.
* `callback` Función (opcional) 
  * `success` Boolean - Indica el éxito de la llamada impresa.
  * `failureReason` String - Called back if the print fails; can be `cancelled` or `failed`.

Imprime la página web de la ventana. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Utilizar el estilo CCS `page-break-before: always;` para imprimir a la fuerza una página nueva.

Ejemlo de uso:

```js
const options = { silent: true, deviceName: 'My-Printer' }
win.webContents.print(options, (success, errorType) => {
  if (!success) console.log(errorType)
})
```

#### `contents.printToPDF(options)`

* `opciones` Object 
  * `marginsType` Integer (opcional) - Especifica los tipos de margenes a usar. Use 0 para margen predeterminado, 1 para no margen y dos para margenes mínimos.
  * `pageSize` String | Size (opcional) - Especifique el tamaño de la pagina PDF generada. Puede ser `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o un contenedor de objeto `height` y `width` en micrones.
  * `printBackground` Boolean (opcional) - Si va a imprimir los fondos CSS.
  * `printSelectionOnly` Boolean (opcional) - Si se va a imprimir solo la selección.
  * `landscape` Boolean (opcional) - `true` para landscape, `false` para portrait.

Returns `Promise<Buffer>` - Se resuelve cuando los datos PDF son generados.

Imprime la página web de la ventana como PDF con la configuración personalizada de impresión previa de Chromium.

El `landscape` se ignorará si `@page` CSS at-rule es utilizado en la página web.

Por defecto, una `options` en blanco se considerará como:

```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false
}
```

Utilizar el estilo CCS `page-break-before: always;` para imprimir a la fuerza una página nueva.

Un ejemplo de `webContents.printToPDF`:

```javascript
const { BrowserWindow } = require('electron')
const fs = require('fs')

let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}, (error, data) => {
    if (error) throw error
    fs.writeFile('/tmp/print.pdf', data, (error) => {
      if (error) throw error
      console.log('PDF escrito con éxito.')
    })
  })
})
```

#### `contents.addWorkSpace(path)`

* `path` String

Añade la ruta especificada al espacio de trabajo DevTools. Debe ser utilizado luego de la creación de DevTools:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.webContents.on('devtools-opened', () => {
  win.webContents.addWorkSpace(__dirname)
})
```

#### `contents.removeWorkSpace(path)`

* `path` String

Elimina la ruta especificada del espacio de trabajo de DevTools.

#### `contents.setDevToolsWebContents(devToolsWebContents)`

* `devToolsWebContents` WebContents

Usa el `devToolsWebContents` como objetivo `WebContents` para mostrar devtools.

El `devToolsWebContents` no debe tener ninguna ninguna navegación, y este no debería ser usado para otros propósitos después de la llamada.

Por defecto Electron maneja el devtools creando un `WebContents` interno con un vista nativa, de lo cual los desarrolladores tienen un control muy limitado. Con el método `setDevToolsWebContents`, los desarrolladores pueden usar algún `WebContents` para mostrar el devtools en él, incluyendo la etiqueta `BrowserWindow`, `BrowserView` y `<webview>`.

Tenga en cuenta que cerrando el devtools no se destruye el `devToolsWebContents`, es responsabilidad del que llamo destruir el `devToolsWebContents`.

Un ejemplo de mostrar devtools en una etiqueta `<webview>`:

```html
<html>
<head>
  <style type="text/css">

    * { margin: 0; }
    #browser { height: 70%; }
    #devtools { height: 30%; }
  </style>
</head>
<body>
  <webview id="browser" src="https://github.com"></webview>
  <webview id="devtools"></webview>
  <script>
    const browserView = document.getElementById('browser')
    const devtoolsView = document.getElementById('devtools')
    browserView.addEventListener('dom-ready', () => {
      const browser = browserView.getWebContents()
      browser.setDevToolsWebContents(devtoolsView.getWebContents())
      browser.openDevTools()
    })
  </script>
</body>
</html>
```

Un ejemplo de mostrar devtools en un `BrowserWindow`:

```js
const { app, BrowserWindow } = require('electron')

let win = null
let devtools = null

app.once('ready', () => {
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({ mode: 'detach' })
})
```

#### `contents.openDevTools([options])`

* `opciones` Objecto (opcional) 
  * `mode` String - Abre las herramientas del desarrollador con el estado de dock especificado, puede ser `right`, `bottom`, `undocked`, `detach`. Por defecto se utiliza el último estado del dock. En el modo `undocked` es posible acoplarse de nuevo. En el modo `detach` no se puede.
  * `activate` Boolean (opcional) - Si llevar la ventana de devtools abierta al primer plano. El valor predeterminado es `true`.

Abre las herramientas del desarrolador.

Cuando `contents` es un tag `<webview>`, el `mode` debería ser `detach` por defecto, explícitamente pasando un `mode` vacío puede forzar el uso del último estado del dock.

#### `contents.closeDevTools()`

Cierra las devtools.

#### `contents.isDevToolsOpened()`

Devuelve `Boolean` - Si se abren las herramientas del desarrollador.

#### `contents.isDevToolsFocused()`

Devuelve `Boolean` - Si se enfoca la vista de las herramientas del desarrollador .

#### `contents.toggleDevTools()`

Alterna las herramientas de desarrollador.

#### `contents.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Empieza a inspeccionar elementos en la posición (`x`, `y`).

#### `contents.inspectSharedWorker()`

Abre las herramientas de desarrollador para el contexto de los trabajadores compartidos.

#### `contents.inspectServiceWorker()`

Abre las herramientas de desarrollador para el contexto del trabajador de servicio.

#### `contents.send(channel, ...args)`

* `channel` Cadena
* `...args` any[]

Envía un mensaje asincrónico al proceso de renderizado vía `channel`, también puedes mandar argumentos arbitrarios. Los argumentos se serializarán en JSON internamente y por lo tanto, no se incluirán funciones ni cadenas de prototipos.

El proceso de renderizado puede manejar el mensaje escuchando el `canal` con el módulo [`ipcRenderer`](ipc-renderer.md).

Un ejemplo de envío de mensajes desde el proceso principal al proceso de renderizado:

```javascript
// En el proceso principal.
const { app, BrowserWindow } = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', '¡Suuuuuuuuuuuuuu!')
  })
})
```

```html
<!-- index.html -->
<html>
<body>
  <script>
    require('electron').ipcRenderer.on('ping', (event, message) => {
      console.log(message) // Imprime '¡Suuuuuuuuuuuuuu!'
    })
  </script>
</body>
</html>
```

#### `contents.sendToFrame(frameId, channel, ...args)`

* `frameId` Entero
* `channel` Cadena
* `...args` any[]

Envía un mensaje asíncrono para especificar el frame en el proceso renderizador vía `channel`. Los argumentos serán serializados internamente como JSON y como tal no se incluirán funciones o cadenas de prototipo.

El proceso de renderizado puede manejar el mensaje escuchando el `canal` con el módulo [`ipcRenderer`](ipc-renderer.md).

Si quieres obtener el `frameId` de un contexto renderer dado deberías usar el valor `webFrame.routingId`. E.g.

```js
// En un proceso renderizador
console.log('Mi frameid es:', require('electron').webFrame.routingId)
```

También puede leer el `frameId` de todos los mensajes IPC entrantes en el proceso principal.

```js
// En el proceso principal
ipcMain.on('ping', (event) => {
  console.info('Mensaje viene de  frameId:', event.frameId)
})
```

#### `contents.enableDeviceEmulation(parameters)`

* `parámetros` Object 
  * `screenPosition` String - Especifica el tipo de pantalla que se va a emular (Por defecto: `desktop`): 
    * `desktop` - El tipo de la pantalla de escritorio.
    * `mobile` - El tipo de la pantalla móvil.
  * `screenSize` [Size](structures/size.md) - Configura el tamaño de la pantalla emulada (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - Posiciona la vista sobre la pantalla (screenPosition == mobile) (por defecto: `{ x: 0, y: 0 }`).
  * `deviceScaleFactor` Integer - Configura el factor escala del dispositivo (si es cero regresa por defecto al factor de escala original del dispositivo) (por defecto: `0`).
  * `viewSize` [Size](structures/size.md) - Configura el tamaño de la vista emulada (en blanco significa que no hay anulación)
  * `scale` Float - Escala de la vista emulada dentro del espacio disponible (no dentro del modo vista) (por defecto: `1`).

Habilita la emulación del dispositivo con los parámetros predeterminados.

#### `contents.disableDeviceEmulation()`

Deshabilita la emulación del dispositivo habilitado por `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(inputEvent)`

* `inputEvent` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Envía un input `event` a la página. **Nota:** El [`BrowserWindow`](browser-window.md) que contiene los contenidos necesita estar enfocado para que `sendInputEvent()` trabaje.

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (opcional) - Por defecto es `false`.
* `callback` Function 
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Empezar suscripción para eventos de presentación y capturas de fotogramas, la `callback` sera llamada con `callback(image, dirtyRect)` cuando hay un evento de presentación.

La `image` es una instancia de [NativeImage](native-image.md) que almacena el fotograma capturado.

El `dirtyRect` es un objeto con propiedades `x, y, width, height` que describe cual parte de la página fue pintada de nuevo. Si `onlyDirty` está configurado a `true`, `image` solo contendrá el área repintada. `onlyDirty` por defecto en `false`.

#### `contents.endFrameSubscription()`

Finalizar suscripción para eventos de presentación de marcos.

#### `contents.startDrag(item)`

* `item` Object 
  * `file` String[] | String - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) - La imagen no debe estar en blanco en macOS.

Configura el `item` como un elemento arrastrable para la operación drag-drop actual. El `file` es la ruta absoluta del archivo que se va a arrastrar, y `icon` es la imagen que se muestra debajo del cursor cuando se arrastra.

#### `contents.savePage(fullPath, saveType)`

* `fullPath` String - La ruta completa del archivo.
* `saveType` String - Especifica el tipo de guardado. 
  * `HTMLOnly` - Guarda solamente el HTML de la página.
  * `HTMLComplete` - Guarda una página html completa.
  * `MHTML` - Guarda una página html completa como MHTML.

Devuelve `Promise<void>` - resuelve si la pagina se guardo.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', async () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete').then(() => {
    console.log('Page was saved successfully.')
  }).catch(err => {
    console.log(err)
  })
})
```

#### `contents.showDefinitionForSelection()` *macOS*

Muestra el diccionario pop-up que busca la palabra seleccionada en la página.

#### `contents.isOffscreen()`

Devuelve `Boolean` - Indica si *offscreen rendering* está habilitado o no.

#### `contents.startPainting()`

Si *offscreen rendering* está habilitado y no pinta, comienza a pintar.

#### `contents.stopPainting()`

Si *offscreen rendering* está habilitado y pinta, deja de pintar.

#### `contents.isPainting()`

Devuelve `Boolean` - Si *offscreen rendering* está habilitado devuelve lo que esté pintando en ese momento.

#### `contents.setFrameRate(fps)`

* `fps` Integer

Si *offscreen rendering* está habilitado, configura la velocidad de fotograma al número especificado. Solo se aceptan los valores entre 1 y 60.

**[Cambiar](modernization/property-updates.md)**

#### `contents.getFrameRate()`

Devuelve `Integer` - Si *offscreen rendering* esta habilitado devuelve el indice de fotogramas en ese momento.

**[Cambiar](modernization/property-updates.md)**

#### `contents.invalidate()`

Programa un repintado completo de la ventana en la que se encuentra este contenido web.

Si *offscreen rendering* está habilitado invalida el fotograma y genera uno nuevo a través del evento `'paint'`.

#### `contents.getWebRTCIPHandlingPolicy()`

Devuelve `String` - Devuelve el WebRTC IP Handling Policy.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `política` String - Especifica el WebRTC IP Handling Policy. 
  * `default` - Revela los IPs locales y publicos del usuario. Este es el comportamiento por defecto. Cuando se usa esta política, WebRTC tiene el derecho de enumerar todas las interfaces y vincularlas para descubrir interfaces públicas.
  * `default_public_interface_only` - Revela el IP público del usuario pero no revela el IP local del usuario. Cuando se usa esta política, WebRTC solo debe usar la ruta predeterminada utilizada por http. Esto no expone ninguna dirección local.
  * `default_public_and_private_interfaces` - Revela los IPs público y local del usuario. Cuando se usa esta política, WebRTC solo debe usar la ruta predeterminada utilizada por http. Esto también expone la dirección privada predeterminada asociada. La ruta predeterminada es la ruta elegida por el SO en un punto final multitarjeta.
  * `disable_non_proxied_udp` - No expone IPs publica o locales. Cuando esta política es usada, WEBRTC solo debería usar TCP para contactas a los pares o servidores a menos que el proxy soporta UDP.

Configure la política de manejo de WebRTC IP, le permite controlar cuales IPs son expuestas vía WebRTC. Ver [BrowserLeaks](https://browserleaks.com/webrtc) para más detalles.

#### `contents.getOSProcessId()`

Devuelve `Integer` - El `pid` del sistema operativo, del proceso de renderizado asociado.

#### `contents.getProcessId()`

Devuelve `Integer` - El `pid` interno de Chromium del renderizador asociado. Puede ser comparado con el `frameProcessId` pasado por los eventos de navegación específicos del frame (e.g. `did-frame-navigate`)

#### `contents.takeHeapSnapshot(filePath)`

* `filePath` String - Ruta al archivo de salida.

Devuelve `Promise<void>` - Indica si la instantánea se ha creado correctamente.

Toma una instantánea de la pila V8 y la guarda en `filePath`.

#### `contents.setBackgroundThrottling(allowed)`

* `allowed` Boolean

Controla si el WebContents acelerará o no las animaciones y temporizadores cuando la página se vuelve de fondo. Esto además afecta la API de Visibilidad de la Página.

#### `contents.getType()`

Devuelve `String` - el tipo de webContent. Puede ser `backgroundPage`, `window`, `browserView`, `remote`, `webview` o `offscreen`.

### Propiedades de Instancia

#### `contents.audioMuted`

A `Boolean` property that determines whether this page is muted.

#### `contents.userAgent`

A `String` property that determines the user agent for this web page.

#### `contents.zoomLevel`

A `Number` property that determines the zoom level for this web contents.

The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

#### `contents.zoomFactor`

A `Number` property that determines the zoom factor for this web contents.

The zoom factor is the zoom percent divided by 100, so 300% = 3.0.

#### `contents.frameRate`

An `Integer` property that sets the frame rate of the web contents to the specified number. Only values between 1 and 60 are accepted.

Only applicable if *offscreen rendering* is enabled.

#### `contents.id` *Readonly*

Un `Integer` representando el ID único de este WebContents.

#### `contents.session` *Readonly*

Un [`Session`](session.md) usado por este webContents.

#### `contents.hostWebContents` *Readonly*

Un instancia de [`WebContents`](web-contents.md) que podría poseer este `WebContents`.

#### `contents.devToolsWebContents` *Readonly*

Un `WebContents` de DevTools para este `WebContents`.

**Note:** Los usuario nunca deberían almacenar este objeto porque puede convertirse en `null` cuando el DevTools ha sido cerrado.

#### `contents.debugger` *Readonly*

A [`Debugger`](debugger.md) instance for this webContents.