# webContents

> Procesamiento y control de páginas webs.

Proceso: [Principal](../glossary.md#main-process)

`webContents` es un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ese es responsable de renderizar y controlar la página web y es el propietario del objeto [`BrowserWindow`](browser-window.md). Un ejemplo de acceso del objeto `webContents`:

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 1500})
win.loadURL('http://github.com')

let contents = win.webContents
console.log(contents)
```

## Métodos

Se pueden acceder a estos métodos desde el módulo `webContents`:

```javascript
const {webContents} = require('electron')
console.log(webContents)
```

### `webContents.getAllWebContents()`

Volver `WebContents[]` a la matriz de todo el caso `WebContents`. Esto incluirá contenido web para todos los windows, páginas web, devtools abiertos y extensión de páginas de origen devtools.

### `webContents.getFocusedWebContents()`

Volver `WebContents` - El contenido web que se centra en esta aplicación, de lo contrario regresa `null`.

### `webContents.fromId(id)`

* `id` Íntegro

Returns `WebContents` - A WebContents instance with the given ID.

## Clase: ContenidoWeb

> Renderice y controle el contenido de una instancia de BrowserWindow.

Proceso: [Principal](../glossary.md#main-process)

### Eventos de Instancia

#### Event: 'did-finish-load'

Emite cuando la navegación está hecha, i.e.

#### Event: 'did-fail-load'

Devuelve:

* `event` Evento
* `errorCode` Entero
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

Este evento es como `did-finish-load` pero emitido cuando la carga falló o fue cancelada, e.g `window.stop()`. La lista completa de errores de código y su significado está disponible [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

#### Evento: 'did-frame-finish-load'

Devuelve:

* `event` Evento
* `isMainFrame` Boolean

Emite cuando un frame ha terminado la navegación.

#### Evento: 'did-start-loading'

Corresponde a los puntos en el tiempo cuando el girador de la pestaña comenzó a girar.

#### Evento: 'did-stop-loading'

Corresponde a los puntos en tiempo cuando el girador del tabulador terminó de girar.

#### Evento: 'did-get-response-details'

Devuelve:

* `event` Evento
* `status` Boolean
* `newURL` String
* `originalURL` String
* `httpResponseCode` Entero
* `requestMethod` String
* `referrer` String
* `headers` Objeto
* `resourceType` String

Emite cuando los detalles acerca de un recurso solicitado está disponible. `estado` indica la toma de conexión para descargar el recurso.

#### Evento: 'did-get-redirect-request'

Devuelve:

* `evento` Evento
* `viejoURL` String
* `nuevoURL` String
* `EsElFramePrincipal` Boolean
* `httpResponseCode` Entero
* `requestMethod` String
* `referencia` String
* `headers` Objeto

Se emite cuando se recibe una redirección mientras se solicita un recurso.

#### Event: 'dom-ready'

Devuelve:

* `evento` Evento

Emitido cuando el documento en el frame dado es cargado.

#### Event: 'page-favicon-updated'

Devuelve:

* `evento` Evento
* `favicons` String[] - matriz de URLs

Emite cuando la página recibe urls de favicon.

#### Event: 'new-window'

Devuelve:

* `evento` Evento
* `url` String
* `frameName` String
* `disposition` String - Puede ser `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
* `options` Objeto - las opciones que se usarán para crear crear el nuevo `BrowserWindow`.
* `additionalFeatures` String[] - The non-standard features (features not handled by Chromium or Electron) given to `window.open()`.

Emite cuando la página solicita abrir una nueva ventana para una `url`. Podría ser solicitada por `window.open` or an external link like `<a target='_blank'>`.

Por defecto se creará un nuevo `BrowserWindow` para la `dirección url`.

Llamando `event.preventDefault()` evitará Electron automáticamente creando un nuevo `BrowserWindow`. Si llama `event.preventDefault()` y manualmente creas un nuevo `BrowserWindow` luego debe establecer `event.newGuest` para referenciar la nueva instancia de `BrowserWindow`, al no hacerlo así puede resultar un comportamiento inesperado. Por ejemplo:

```javascript
myBrowserWindow.webContents.on('new-window', (event, url) => {
  event.preventDefault()
  const win = new BrowserWindow({show: false})
  win.once('ready-to-show', () => win.show())
  win.loadURL(url)
  event.newGuest = win
})
```

#### Event: 'will-navigate'

Devuelve:

* `evento` Evento
* `url` String

Emitido cuando un usuario o la página quiere iniciar la navegación. Puede suceder cuando el objeto `window.location` es cambiado o un usuario hace click en un link de la página.

Este evento no se emitirá cuando la navegación es iniciada con programación con APIs como `webContents.loadURL` y `webContents.back`.

Tampoco es emitido para las navegaciones en la página, como hacerle click a links o actualizando el `window.location.hash`. Usa el evento `did-navigate-in-page` para este propósito.

Llamando `event.preventDefault()` evitará la navegación.

#### Evento: 'did-navigate'

Devuelve:

* `evento` Evento
* `url` String

Emitido cuando la navegación es finalizada.

Este evento no es emitido para navegaciones dentro de la página, como hacerle click a links o actualizando `window.location.hash`. Usa el evento `did-navigate-in-page` para este propósito.

#### Evento: 'did-navigate-in-page'

Devuelve:

* `event` Evento
* `url` String
* `isMainFrame` Boolean

Emitido cuando una navegación dentro de la página sucede.

Cuando una navegación dentro de la página sucede, el URL de la página cambia, pero no causa una navegación fuera de la página. Ejemplos de ésto ocurriendo son cuando los links son clickeados o cuando el evento DOM `hashchange` es activado.

#### Event: 'will-prevent-unload'

Devuelve:

* `evento` Evento

Emite cuando un controlador de eventos `beforeunload` está tratando de cancelar una descarga de la página.

Llamando a `event.preventDefault()` ignorará el controlador de eventos `beforeunload` y permite que la página sea descargada.

```javascript
const {BrowserWindow, dialog} = require('electron')
const win = new BrowserWindow({width: 800, height: 600})
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

#### Event: 'crashed'

Devuelve:

* `event` Evento
* `killed` Booleano

Emitido cuando el proceso se crashea o es terminado.

#### Event: 'plugin-crashed'

Devuelve:

* `evento` Evento
* `name` String
* `version` String

Emitido cuando el proceso de enchufe se ha caído.

#### Evento: 'destroyed'

Emitido cuando `webContents` es destruido.

#### Evento: 'before-input-event'

Devuelve:

* `evento` Evento
* `entrada` Object - Propiedades de la entrada 
  * `type` String - Sea `keyUp` o `keyDown`
  * `key` String - Es igual a [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
  * `code` String - Es igual a [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
  * `isAutoRepeat` Boolean - Es igual a [KeyboardEvent.repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
  * `shift` Boolean - Es igual a [KeyboardEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
  * `control` Boolean - Es igual a [KeyboardEvent.controlKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
  * `alt` Boolean - Es igual a [KeyboardEvent.altKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
  * `meta` Boolean - Es igual a [KeyboardEvent.metaKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)

Emitido antes de enviar los eventos `keydown` y `keyup` en la página. Llamando a `event.preventDefault` evitará la página `keydown`/ eventos `keyup` y los accesos rápidos al menú.

Para evitar sólo los accesos directos del menú, use [`setignoreMenuShortcuts`](#contentssetignoremenushortcuts):

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})

win.webContents.on('before-input-event', (event, input) => {
  // For example, only enable application menu keyboard shortcuts when
  // Ctrl/Cmd are down.
  win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Event: 'devtools-opened'

Emitido cuando DevTools es abierto.

#### Evento: 'devtools-closed'

Emitido cuando Devtools es cerrado.

#### Event: 'devtools-focused'

Emitido cuando DevTools es centrado o abierto.

#### Evento: 'error-certificado'

Devuelve:

* `evento` Evento
* `url` String
* `error` cadena - el error del código
* `certificate` [certificate](structures/certificate.md)
* `llamada de vuelta` Función 
  * `isTrusted` Boolean - indica si el certificado se puede considerar de confianza

Emitido cuando no se pudo verificar el `certificate` for `url`.

El uso es el mismo con [the `certificate-error` evento de `app`](app.md#event-certificate-error).

#### Evento: 'select--client-certificate'

Devuelve:

* `evento` Evento
* `url` URL
* `certificateList`[Certificate[]](structures/certificate.md)
* `llamada de vuelta` Función 
  * `certificate`[Certificate](structures/certificate.md) - Debe ser un certificado de la lista dada

Emitido cuando el certificado de un cliente es requerido.

El uso es el mismo con [the `select-client-certificate` evento de `app`](app.md#event-select-client-certificate).

#### Evento:'login'

Devuelve:

* `evento` Evento
* `request` Object 
  * `method` Cuerda
  * `url` URL
  * `referrer` URL
* `authInfo` Object 
  * `isProxy` Boolean
  * `esquema` Cadena
  * `anfitrión` Cadena
  * `puerto` Íntegro
  * `realm` Cadena
* `llamada de vuelta` Función 
  * `username` Cadena
  * `contraseña` Cadena

Emitido cuando `webContents` quiere hacer una autenticación básica.

El uso es lo mismo que con el evento [the `login` de la `app`](app.md#event-login).

#### Event: 'found-in-page'

Devuelve:

* `evento` Evento
* `resultado` Object 
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Posición de la coincidencia activa.
  * `matches` Integer - Número de coincidencias.
  * `selectionArea` Object - Coordenadas del lugar de la primera coincidencia.
  * `finalUpdate` Boolean

Emitido cuando un resultado está disponible para la petición de [`webContents.findInPage`].

#### Event: 'media-started-playing'

Emitido cuando la media empieza a reproducirse.

#### Event: 'media-paused'

Emitido cuando la media es pausada o ha terminado de reproducirse.

#### Event: 'did-change-theme-color'

Emitido cuando el color de tema de una página cambia. Esto usualmente se debe al encuentro de una meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

#### Event: 'update-target-url'

Devuelve:

* `evento` Evento
* `url` String

Emitido cuando el mouse se mueve sobre un link o el teclado se mueve el concentrado a un link.

#### Event: 'cursor-changed'

Devuelve:

* `evento` Evento
* `type` String
* `image` NativeImage (optional)
* `scale` Float (opcional) - Factor de escala para el cursor personalizado
* `size` [Size](structures/size.md) (opcional) - El tamaño de la `image`
* `hotspot` [Point](structures/point.md) (opcional) - Coordenadas de la zona activa del cursor personalizado

Emitido cuando el tipo del cursor cambia. El `type` parámetro puede ser `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, ``ne-resize</code>, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing`, `custom</0>.</p>

<p>Si el parámetro <code>type` es `custom`, el parámetro de la `image` mantendrá la imagen del cursor personalizado en un `NativeImage`, y `scale`, `size` y`hotpost` mantendrá información adicional sobre el cursor personalizado.

#### Evento: 'context-menu'

Devuelve:

* `evento` Evento
* `params` Object 
  * Entero `x` - coordenadas x
  * Entero `y` - coordenadas x
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
  * `menúFuenteTipo` Cadena - Fuente de entrada que invoca el menú de contexto. Puede ser `ninguno`, `ratón`, `teclado`, `toque`, `toqueMenú`.
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

#### Event: 'select-bluetooth-device'

Devuelve:

* `evento` Evento
* `devices` [BluetoothDevice[]](structures/bluetooth-device.md)
* `llamada de vuelta` Función 
  * `deviceId` String

Emite cuando el dispositivo bluetooth necesita ser seleccionado en la llamada `navigator.bluetooth.requestDevice`. Para usar `navigator.bluetooth` api `webBluetooth` debe ser activada. Si no se llama `event.preventDefault` el primer dispositivo disponible será seleccionado. `callback` puede ser llamado con `deviceId` ser seleccionado,.

```javascript
const {app, webContents} = require('electron')
app.commandLine.appendSwitch('enable-web-bluetooth')

app.on('ready', () => {
  webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
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

#### Event: 'paint'

Devuelve:

* `evento` Evento
* `dirtyRect` [Rectangle](structures/rectangle.md)
* `image` [NativeImage](native-image.md) - La información de la imagen de todo el fotograma.

Emitido cuando un se genera un nuevo fotograma. Solo la zona oscura se pasa al búfer.

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({webPreferences: {offscreen: true}})
win.webContents.on('paint', (event, dirty, image) => {
  // updateBitmap(dirty, image.getBitmap())
})
win.loadURL('http://github.com')
```

#### Event: 'devtools-reload-page'

Emitido cuando la ventana devtools instruya la webContents para recargar

#### Event: 'will-attach-webview'

Devuelve:

* `evento` Evento
* `webPreferencias` Objeto - Las preferencias de la web que será utilizada por la página de invitado. Este objeto puede modificarse para ajustar las preferencias de la página de invitado.
* `params` Objeto - Los otros `<webview>` parámetros tales como la URL de la `fuente`. Este objeto puede ser modificado para ajustar los parámetros de la página de invitado.

Cuando emite contenidos de la web de `<webview>` se está conectando a los contenidos de esta web. Llamando a `event.preventDefault()` destruirá la página de invitado.

Este evento puede utilizarse para configurar `webPreferences` para la `webContents` de un `<webview>`antes de que se carga y proporciona la capacidad de configuración que no se puede establecer a través de atributos `<webview>`.

**Nota:** La opción del script especificado `precarga` aparecerá como `preloadURL` (no como `preload`) en el objeto `webPreferences` emitido con este evento.

### Métodos de Instancia

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Objecto (opcional) 
  * `httpReferrer` String (opcional) - Un url de HTTP referencial.
  * `userAgent` String (opcional) - Un agente de usuario originando la solicitud.
  * `extraHeaders` String (opcional) - Encabezados extras separadas por "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) - (optional)
  * `baseURLForDataURL` String (opcional) - Url base (con separadores de ruta arrastrables) para archivos que se cargan por el url de datos. Esto es necesario únicamente si el `url` especificado es un url de datos y necesita cargar otros archivos.

Carga el `url` en la ventana. El `url` debe contener el prefijo de protocolo. Por ejemplo `http://` o `file://`. Si la carga debe omitir el caché http entonces hay que utilizar el encabezado `pragma` para lograrlo.

```javascript
const {webContents} = require('electron')
const options = {extraHeaders: 'pragma: no-cache\n'}
webContents.loadURL('https://github.com', options)
```

#### `contents.downloadURL(url)`

* `url` String

Inicia una descarga del recurso en el `url` sin navegar. Se activará el evento `will-download` de la `session`.

#### `contents.getURL()`

Devuelve `String` - El URL de la página web actual.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600})
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

* `offset` Integer

Devuelve `Boolean` - Si la página web puede ir a `offset`.

#### `contents.clearHistory()`

Borra el historial de navegación.

#### `contents.goBack()`

Hace que el navegador regrese a una página web.

#### `contents.goForward()`

Hace que el navegador avance a una página web.

#### `contents.goToIndex(index)`

* `index` Integer

Navigates browser to the specified absolute web page index.

#### `contents.goToOffset(offset)`

* `offset` Integer

Navega hacia el offset especificado desde "la entrada actual".

#### `contents.isCrashed()`

Devuelve `Boolean` - Si el proceso de renderizado ha fallado.

#### `contents.setUserAgent(userAgent)`

* `userAgent` cadena

Anula el agente usuario para esta página web.

#### `contents.getUserAgent()`

Devuelve `String` - El agente usuario para esta página web.

#### `contents.insertCSS(css)`

* `css` String

Inserta CSS en la página web actual.

#### `contents.executeJavaScript(code[, userGesture, callback])`

* `codigo` String
* `userGesture` Boolean (opcional) - Por de `false`.
* `callback` Function (opcional) - Es llamado luego de que se haya ejecutado el script. 
  * `result` Any

Devuelve `Promise` - Un compromiso que soluciona con el resultado del código ejecutado o es rechazado si el resultado del código es un compromiso rechazado.

Evalúa el `code` en la página.

En la ventana del buscador, algunas APIs HTML como `requestFullScreen` solo pueden ser invocadas por un gesto del usuario. Configurar `userGesture` a `true` eliminará esta limitación.

Si el resultado del código ejecutado es un compromiso, el callback resultante será el valor resuelto del compromiso. Se recomienda utilizar el compromiso devuelto para manejar el código que resulte en un Compromiso.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

#### `contents.setIgnoreMenuShortcuts(ignore)` *Experimental*

* `ignore` Boolean

Ignora los accesos directos del menú de la aplicación mientras se enfoca los contenidos de la web.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Silencia el audio la página web actual.

#### `contents.isAudioMuted()`

Devuelve `Boolean` - Si esta página ha sido silenciada.

#### `contents.setZoomFactor(factor)`

* `factor` Number - Factor Zoom.

Cambia el factor zoom al factor especificado. El factor zoom es el porcentaje de zoom dividido por 100, por lo que 300% = 3.0.

#### `contents.getZoomFactor(callback)`

* `llamada de vuelta` Función 
  * `zoomFactor` Number

Envía una solicitud para obtener el factor zoom actual. El `callback` será llamado con `callback(zoomFactor)`.

#### `contents.setZoomLevel(level)`

* `level` Number - Nivel de zoom

Cambia el nivel de zoom al nivel especificado. El tamaño original es 0 y cada incremento por encima o por debajo representa un zoom del 20% mayor o menor a los límites predeterminados de 300% y 50% del tamaño original, respectivamente.

#### `contents.getZoomLevel(callback)`

* `llamada de vuelta` Función 
  * `zoomLevel` Number

Envía una solicitud para obtener el factor zoom actual. El `callback` será llamado con `callback(zoomLevel)`.

#### `contents.setZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

**Obsoleto:** Llamar al `setVisualZoomLevelLimits` en su lugar para establecer los límites del nivel de zoom visual. Este método se eliminará en Electron 2.0.

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Establece el nivel de máximo y mínimo de acercar y alejar.

#### `contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

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

Inserta `text` al elemento enfocado.

#### `contents.findInPage(text[, options])`

* `text` String - El contenido para ser buscado, no debe quedar en blanco.
* `options` Objecto (opcional) 
  * `forward` Boolean - (opcional) Si buscar hacia adelante o hacia atrás. Por defecto es `true`.
  * `findNext` Boolean - (optional) Si la operación se solicita de primero o después. Por defecto es `false`.
  * `matchCase` Boolean - (optional) Si la búsqueda es en mayúsculas o minúsculas. Por defecto es `false`.
  * `wordStart` Boolean - (optional) Si solo se desea ver al comienzo de las palabras. Por defecto es `false`.
  * `medialCapitalAsWordStart` Boolean - (opcional) Cuando se combina con `wordStart`, acepta una coincidencia en el medio de una palabra si la coincidencia comienza con una letra mayúscula seguida de una minúscula o algún caracter que no se letra. Acepta muchas otras coincidencias intra palabras, por defecto a `falso`.

Empieza una solicitud para encontrar todas las coincidencias para el `text` en la página web y devuelve un `Integer` que representa el id de solicitud utilizado. El resultado de la solicitud puede obtenerse al suscribirse al evento [`found-in-page`](web-contents.md#event-found-in-page).

#### `contents.stopFindInPage(action)`

* `action` String - Especifica la acción que se llevará a cabo cuando finalice [`webContents.findInPage`] la solicitud. 
  * `clearSelection` - Borrar la selección.
  * `keepSelection` - Traduce la selección en una selección normal.
  * `activateSelection` - Enfoca y hace clic en el nodo de selección.

Detiene cualquier solicitud `findInPage` para el `webContents` con la `action` proporcionada.

```javascript
const {webContents} = require('electron')
webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```

#### `contents.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (opcional) - El área de la página para ser capturada
* `llamada de vuelta` Función 
  * `image` [NativeImage](native-image.md)

Captura una foto instantánea de la página dentro de `rect`. Al finalizar se llamará `callback` con `callback(image)`. La `imagen` es una instancia de [NativeImage](native-image.md) que almacena los datos de la foto instantánea. Si se omitir `rect`, se capturará toda la página visible.

#### `contents.hasServiceWorker(callback)`

* `llamada de vuelta` Función 
  * `hasWorker` Boolean

Comprueba si cualquier ServiceWorker está registrado y devuelve un valor booleano como respuesta a `callback`.

#### `contents.unregisterServiceWorker(callback)`

* `llamada de vuelta` Función 
  * `success` Boolean

Anula el registro de cualquier ServiceWorker si presenta y devuelve un valor booleano como respuesta a `callback` cuando el compromiso de JS es cumplido o falso cuando el compromiso de JS es rechazado.

#### `contents.getPrinters()`

Obtiene la lista de impresora del sistema.

Devuelve [`PrinterInfo[]`](structures/printer-info.md)

#### `contents.print([options])`

* `options` Objecto (opcional) 
  * `silent` Boolean (opcional) - No le pide al usuario configurar la impresora. Por defecto es `false`.
  * `printBackground` Boolean (opcional) - También imprime el color de fondo y la imagen de la página web. Por defecto es `false`.
  * `deviceName` String (opcional) - Configura el nombre de la impresora que se va a usar. Por defecto es `''`.

Imprime la página web de la ventana. Cuando se configura `silent` a `true`, Electron seleccionará la impresora por defecto del sistema si `deviceName` esta en blanco y la configuración por defecto para imprimir.

Llamar `window.print()` en la página web es igual a llamar `webContents.print({silent: false, printBackground: false, deviceName: ''})`.

Utilizar el estilo CCS `page-break-before: always;` para imprimir a la fuerza una página nueva.

#### `contents.printToPDF(options, callback)`

* `options` Object 
  * `marginsType` Integer - (opcional) Especifica el tipo de márgenes que se va a usar. Utiliza 0 para el margen por defecto, 1 para ningún margen y 2 para el margen mínimo.
  * `pageSize` String - (opcional) Especifica el tamaño de la página del PDF generado. Puede ser `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o un objeto que contenga `height` y `width` en micron.
  * `printBackground` Boolean - (opcional) Si se imprime o no los fondos CCS.
  * `printSelectionOnly` Boolean - (opcional) Si solo se imprime la selección.
  * `landscape` Boolean - (opcional) `true` para paisajes, `false` para retratos.
* `callback` Función 
  * `error` Error
  * `data` Buffer

Imprime la página web de la ventana como PDF con la configuración personalizada de impresión previa de Chromium.

El `callback` será llamado con `callback(error, data)` cuando finalice. La `data` es un `Buffer` que contiene la información de PDF generado.

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
const {BrowserWindow} = require('electron')
const fs = require('fs')

let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}, (error, data) => {
    if (error) throw error
    fs.writeFile('/tmp/print.pdf', data, (error) => {
      if (error) throw error
      console.log('Write PDF successfully.')
    })
  })
})
```

#### `contents.addWorkSpace(path)`

* `path` String

Añade la ruta especificada al espacio de trabajo DevTools. Debe ser utilizado luego de la creación de DevTools:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.webContents.on('devtools-opened', () => {
  win.webContents.addWorkSpace(__dirname)
})
```

#### `contents.removeWorkSpace(path)`

* `path` String

Elimina la ruta especificada del espacio de trabajo de DevTools.

#### `contents.openDevTools([options])`

* `options` Objecto (opcional) 
  * `mode` String - Abre las herramientas del desarrollador con el estado de dock especificado, puede ser `right`, `bottom`, `undocked`, `detach`. Por defecto se utiliza el último estado de dock. En el modo `undocked` es posible acoplarse de nuevo. En el modo `detach` no se puede.

Abre las herramientas del desarrolador.

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

#### `contents.inspectServiceWorker()`

Abre las herramientas de desarrollador para el contexto del trabajador de servicio.

#### `contents.send(channel[, arg1][, arg2][, ...])`

* `channel` Cadena
* `...args` any[]

Envía un mensaje asincrónico al proceso de renderizado a través de `channel`. También se puede enviar argumentos arbitrarios. Los argumentos se serializarán en JSON internamente y por lo tanto, no se incluirán funciones ni cadenas de prototipos.

El proceso de renderizado puede manejar el mensaje escuchando al evento `channel` con el módulo `ipcRenderer`.

Un ejemplo de envío de mensajes desde el proceso principal al proceso de renderizado:

```javascript
// En el proceso principal.
const {app, BrowserWindow} = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', 'whoooooooh!')
  })
})
```

```html
<!-- index.html -->
<html>
<body>
  <script>
    require('electron').ipcRenderer.on('ping', (event, message) => {
      console.log(message)  // Prints 'whoooooooh!'
    })
  </script>
</body>
</html>
```

#### `contents.enableDeviceEmulation(parameters)`

* `parámetros` Object 
  * `screenPosition` String - Especifica el tipo de pantalla que se va a emular (Por defecto: `desktop`) 
    * `desktop` - El tipo de la pantalla de escritorio
    * `mobile` - El tipo de la pantalla móvil
  * `screenSize` [Size](structures/size.md) - Configura el tamaño de la pantalla emulada (screenPosition == mobile)
  * `viewPosition` [Point](structures/point.md) - Posiciona la vista sobre la pantalla (screenPosition == mobile) (por defecto: `{x: 0, y: 0}`)
  * `deviceScaleFactor` Integer - Configura el factor escala del dispositivo (si es cero regresa por defecto al factor de escala original del dispositivo) (por defecto: ``)
  * `viewSize` [Size](structures/size.md) - Configura el tamaño de la vista emulada (en blanco significa que no hay anulación)
  * `fitToView` Boolean - Si la vista emulada debe reducirse si es necesario para que quepa dentro del espacio disponible (por defecto: `false`)
  * `offset` [Point](structures/point.md) - El offset de la vista emulada dentro del espacio disponible (no dentro del modo vista) (por defecto: `{x: 0, y: 0}`)
  * `scale` Float - Escala de la vista emulada dentro del espacio disponible (no dentro del modo vista) (por defecto: `1`)

Habilita la emulación del dispositivo con los parámetros predeterminados.

#### `contents.disableDeviceEmulation()`

Deshabilita la emulación del dispositivo habilitado por `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(event)`

* `event` Object 
  * `type` String (**required**) - El tipo de evento, puede ser `mouseDown`, `mouseUp`, `mouseEnter`, `mouseLeave`, `contextMenu`, `mouseWheel`, `mouseMove`, `keyDown`, `keyUp`, `char`.
  * `modifiers` String[] - Un arreglo con los modificadores del evento, puede incluir `shift`, `control`, `alt`, `meta`, `isKeypad`, `isAutoRepeat`, `leftButtonDown`, `middleButtonDown`, `rightButtonDown`, `capsLock`, `numLock`, `left`, `right`.

Envia una entrada `event` a la página. **Nota:** El `BrowserWindow` que contiene los contenidos necesitan ser enfocados para que `sendInputEvent()` funcione.

Para eventos del teclado, el objeto `evento` también tiene las siguientes propiedades:

* `keyCode` String (**necesario**) - El carácter que se enviará como evento del teclado. Solo debe utilizarse los teclas válidas en el [Accelerator](accelerator.md).

Para eventos del ratón, el objeto `evento` también tiene las siguientes propiedades:

* `x` Integer (**required**)
* `y` Integer (**required**)
* `button` String - The button pressed, can be `left`, `middle`, `right`
* `globalX` Integer
* `globalY` Integer
* `movementX` Integer
* `movementY` Integer
* `clickCount` Integer

Para el evento `mouseWheel`, el objeto `evento` también tiene las siguientes propiedades:

* `deltaX` Integer
* `deltaY` Integer
* `wheelTicksX` Integer
* `wheelTicksY` Integer
* `accelerationRatioX` Integer
* `accelerationRatioY` Integer
* `hasPreciseScrollingDeltas` Boolean
* `canScroll` Boolean

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (opcional) - Por defecto es `false`
* `llamada de vuelta` Función 
  * `frameBuffer` Buffer
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Empieza por suscribir eventos y fotogramas capturados para la presentación. El `callback` será llamado con `callback(frameBuffer, dirtyRect)` cuando haya un evento de presentación.

El `frameBuffer` es un `Buffer` que contiene la información de pixeles sin procesar. En la mayoría de las máquinas, los datos de píxeles se almacenan efectivamente en formato BGRA de 32 bits, pero la representación real depende del endianness del procesador (la mayoría de los procesadores modernos son little-endian, en máquinas con procesadores big-endian los datos están en formato ARGB de 32 bits).

El `dirtyRect` es un objeto con propiedades `x, y, width, height` que describe cual parte de la página fue pintada de nuevo. Si se configura `onlyDirty` a `true`, `frameBuffer` solo va a contener el área repintada. `onlyDirty` por defecto es `false`.

#### `contents.endFrameSubscription()`

Finalizar suscripción para eventos de presentación de marcos.

#### `contents.startDrag(item)`

* `item` Object 
  * `file` String or `files` Array - Las rutas del archivo arrastrado.
  * `icon` [NativeImage](native-image.md) - La imagen no debe estar en blanco en macOS.

Configura el `item` como un elemento arrastrable para la operación drag-drop actual. El `file` es la ruta absoluta del archivo que se va a arrastrar, y `icon` es la imagen que se muestra debajo del cursor cuando se arrastra.

#### `contents.savePage(fullPath, saveType, callback)`

* `fullPath` String - La ruta completa del archivo.
* `saveType` String - Especifica el tipo de guardado. 
  * `HTMLOnly` - Guarda solamente el HTML de la página.
  * `HTMLComplete` - Guarda una página html completa.
  * `MHTML` - Guarda una página html completa como MHTML.
* `llamada de vuelta` Función - `(error) => {}`. 
  * `error` Error

Devuelve `Boolean` - true si se ha iniciado con éxito el proceso de guardar la página.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete', (error) => {
    if (!error) console.log('Save page successfully')
  })
})
```

#### `contents.showDefinitionForSelection()` *macOS*

Muestra un diccionario que busca la palabra seleccionada en la página.

#### `contents.setSize(options)`

Configura el tamaño de la página. Esto sólo es compatible con el `<webview>` contenido de invitado.

* `options` Object 
  * `normal` Object (opcional) - Tamaño normal de la página. Esto también se puede utilizar en combinación con el [`disableguestresize`](web-view-tag.md#disableguestresize) atributo para redimensionar manualmente el contenido de invitado en la vista web. 
    * `ancho` Entero
    * `alto` Entero

#### `contents.isOffscreen()`

Returns `Boolean` - Indicates whether *offscreen rendering* is enabled.

#### `contents.startPainting()`

If *offscreen rendering* is enabled and not painting, start painting.

#### `contents.stopPainting()`

If *offscreen rendering* is enabled and painting, stop painting.

#### `contents.isPainting()`

Returns `Boolean` - If *offscreen rendering* is enabled returns whether it is currently painting.

#### `contents.setFrameRate(fps)`

* `fps` Integer

If *offscreen rendering* is enabled sets the frame rate to the specified number. Only values between 1 and 60 are accepted.

#### `contents.getFrameRate()`

Returns `Integer` - If *offscreen rendering* is enabled returns the current frame rate.

#### `contents.invalidate()`

Programa un repintado completo de la ventana en la que se encuentra este contenido web.

If *offscreen rendering* is enabled invalidates the frame and generates a new one through the `'paint'` event.

#### `contents.getWebRTCIPHandlingPolicy()`

Returns `String` - Returns the WebRTC IP Handling Policy.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `política` String - Specify the WebRTC IP Handling Policy. 
  * `default` - Exposes user's public and local IPs. Este es el comportamiento por defecto. Cuando se usa esta política, WebRTC tiene el derecho de enumerar todas las interfaces y vincularlas para descubrir interfaces públicas.
  * `default_public_interface_only` - Exposes user's public IP, but does not expose user's local IP. Cuando se usa esta política, WebRTC solo debe usar la ruta predeterminada utilizada por http. Esto no expone ninguna dirección local.
  * `default_public_and_private_interfaces` - Exposes user's public and local IPs. Cuando se usa esta política, WebRTC solo debe usar la ruta predeterminada utilizada por http. Esto también expone la dirección privada predeterminada asociada. La ruta predeterminada es la ruta elegida por el SO en un punto final multitarjeta.
  * `disable_non_proxied_udp` - Does not expose public or local IPs. When this policy is used, WebRTC should only use TCP to contact peers or servers unless the proxy server supports UDP.

Setting the WebRTC IP handling policy allows you to control which IPs are exposed via WebRTC. See [BrowserLeaks](https://browserleaks.com/webrtc) for more details.

#### `contents.getOSProcessId()`

Returns `Integer` - The `pid` of the associated renderer process.

### Propiedades de Instancia

#### `contents.id`

A `Integer` representing the unique ID of this WebContents.

#### `contents.session`

A [`Session`](session.md) used by this webContents.

#### `contents.hostWebContents`

A [`WebContents`](web-contents.md) instance that might own this `WebContents`.

#### `contents.devToolsWebContents`

A `WebContents` of DevTools for this `WebContents`.

**Note:** Users should never store this object because it may become `null` when the DevTools has been closed.

#### `contents.debugger`

Una instancia del [depurador](debugger.md) para éste webContents.