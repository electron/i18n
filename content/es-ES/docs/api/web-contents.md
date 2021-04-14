# webContents

> Procesamiento y control de páginas webs.

Proceso: [Main](../glossary.md#main-process)

`webContents` es un [EventEmitter][event-emitter]. Es responsable de renderizar y controlar una página web y es una propiedad del objeto [`BrowserWindow`](browser-window.md). Un ejemplo de acceso al objeto `webContents`:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('http://github.com')

const contents = win.webContents
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

Devuelve `WebContents` | undefined - Una instancia de WebContents con el ID dado, o `undefined` si no hay WebContents asociados con ID dado.

## Clase: WebContents

> Renderice y controle el contenido de una instancia de BrowserWindow.

Proceso: [Main](../glossary.md#main-process)

### Eventos de Instancia

#### Evento: 'did-finish-load'

Emite cuando la navegación está hecha, i.e.

#### Evento: 'did-fail-load'

Devuelve:

* `event` Event
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Este evento es como `did-finish-load` pero emitido cuando falló la carga. La lista completa de los códigos de error y su significado está disponible [aquí](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h).

#### Evento: 'did-fail-provisional-load'

Devuelve:

* `event` Event
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Este evento es como `did-fail-load` pero emitido cuando la carga fue cancelada (p. e. fue invocado `window.stop()`).

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

#### Evento: 'page-title-updated'

Devuelve:

* `event` Event
* `title` String
* `explicitSet` Boolen

Disparado cuando el título de la página se configura durante la navegación. `explicitSet` es false cuando el título es sincronizado desde el archivo url.

#### Evento: 'page-favicon-updated'

Devuelve:

* `event` Event
* `favicons` Cadena[] - Arreglo para URLs.

Emite cuando la página recibe urls de favicon.

#### Evento: 'new-window' _Obsoleto_

Devuelve:

* `event` NewWindowWebContentsEvent
* `url` String
* `frameName` String
* `disposition` String - Puede ser `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
* `options` BrowserWindowConstructorOptions - Las opciones que serán utilizadas para la creación del nuevo [`BrowserWindow`](browser-window.md).
* `additionalFeatures` String[] - Las características no estándar (características no manejadas por Chromium o Electron) pasadas a `window.open()`.
* `referrer` [Referrer](structures/referrer.md) - El remitente que será pasado a la nueva ventana. Puede resultar o no en la cabecera `Referer` siendo enviado, dependiendo de la política de referencia.
* `postBody` [PostBody](structures/post-body.md) (opcional) - Los datos que serán enviados a la nueva ventana, junto con las cabeceras apropiadas que se establecerán. Si no hay datos para enviar, el valor será `null`. Solo se define cuando la ventana está siendo creada por un formulario que establece `target=_blank`.

Obsoleto a favor de [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler).

Emitido cuando la página solicita abrir una nueva ventana para una `url`. Puede ser requerido por `window.open` o un link externo como `<a target='_blank'>`.

Por defecto se creará un nuevo `BrowserWindow` para la `dirección url`.

Ejecutar `event.preventDefault()` evitará que Electron cree automáticamente un nuevo [`BrowserWindow`](browser-window.md). Si se llama a `event.preventDefault()` y se crea manualmente un nuevo [`BrowserWindow`](browser-window.md) entonces se debe activar `event.newGuest` para referenciar a la nueva instancia de [`BrowserWindow`](browser-window.md), no hacerlo puede causar un comportamiento inesperado. Por ejemplo:

```javascript
myBrowserWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures, referrer, postBody) => {
  event.preventDefault()
  const win = new BrowserWindow({
    webContents: options.webContents, // use existing webContents if provided
    show: false
  })
  win.once('ready-to-show', () => win.show())
  if (!options.webContents) {
    const loadOptions = {
      httpReferrer: referrer
    }
    if (postBody != null) {
      const { data, contentType, boundary } = postBody
      loadOptions.postData = postBody.data
      loadOptions.extraHeaders = `content-type: ${contentType}; boundary=${boundary}`
    }

    win.loadURL(url, loadOptions) // existing webContents will be navigated automatically
  }
  event.newGuest = win
})
```

#### Evento: 'did-create-window'

Devuelve:
* `window` Navegador Windows
* Objeto `details`
    * `url` String-URL para la ventana creada.
    * `frameName` string-name dado a la ventana creada en la `window.open()` llamada.
    * `options` BrowserWindowConstructorOptions-las opciones usadas para crear el BrowserWindow. Se fusionan en una precedencia creciente: opciones heredadas desde el padre, opciones analizadas de la cadena `features` de `window.open()`, y opciones dadas por [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler). Las opciones no reconocidas no se filtran.
    * `additionalFeatures` String []-las características no estándar (características no cromo o electrones) _obsoletas_
    * `referrer` [Referrer](structures/referrer.md) - El remitente que será pasado a la nueva ventana. Puede dar como resultado que el encabezado de `Referer` se envíe, en función de la política de referencia.
    * `postBody` [](structures/post-body.md) PostBody (opcional)-los datos post que se enviarán a la ventana nueva, junto con los encabezados apropiados que se establecerá. Si no hay datos para enviar, el valor será `null`. Solo se define cuando se crea la ventana mediante un formulario que establece `target=_blank`.
    * `disposition` String-puede ser `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` y `other`.

_emitido después de_ creación exitosa de una ventana a través de `window.open` en el representador. No emitido si la creación de la ventana es cancelada desde [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler).

Consulta [`window.open()`](window-open.md) para obtener más detalles y cómo utilizar esto en conjunción con `webContents.setWindowOpenHandler`.

#### Evento: 'will-navigate'

Devuelve:

* `event` Event
* `url` String

Emitido cuando un usuario o l página quiere empezar la navegación. Puede ocurrir cuando el objeto `window.location` se cambia o un usuario hace clic en un enlace en la página.

Este evento no se emitirá cuando la navegación es iniciada con programación con APIs como `webContents.loadURL` y `webContents.back`.

Tampoco se emite para las navegaciones en la página, como hacer clic en los enlaces de ancla o actualizar el `window.location.hash`. Utiliza `did-navigate-in-page` evento para este propósito.

Llamando `event.preventDefault()` evitará la navegación.

#### Evento: 'did-start-navigation'

Devuelve:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Se emite cuando cualquier fotograma (incluido Main) comienza a navegar. `isInPlace` se `true` para las navegaciones en la página.

#### Evento: 'will-redirect'

Devuelve:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitido como redireccionamiento del lado del servidor se produce durante la navegación.  Por ejemplo, un 302 redirigir.

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

Emitido después de que se produzca una redirección del lado del servidor durante la navegación.  Por ejemplo, un 302 redirigir.

Este evento no puede ser prevenir. Si quieres prevenir redirecciones deber ver el evento `will-redirect` arriba.

#### Evento: 'did-navigate'

Devuelve:

* `event` Event
* `url` String
* `httpResponseCode` Integer - -1 para navegaciones no HTTP
* `httpStatusText` String - vacío para navegaciones no HTTP

Emitido cuando se realizo un navegación del frame principal.

Este evento no se emite para las navegaciones en la página, como hacer clic en los enlaces de ancla o actualizar el `window.location.hash`. Utiliza `did-navigate-in-page` evento para este propósito.

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

Este evento no se emite para las navegaciones en la página, como hacer clic en los enlaces de ancla o actualizar el `window.location.hash`. Utiliza `did-navigate-in-page` evento para este propósito.

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
  const choice = dialog.showMessageBoxSync(win, {
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

#### Evento: 'crashed' _Obsoleto_

Devuelve:

* `event` Event
* `killed` Boolean

Emitido cuando el proceso se crashea o es terminado.

**Obsoleto:** Este evento es reemplazado por el evento `render-process-gone` el cual contiene más información acerca de porque desapareció el renderer process. No siempre se debe a que haya dejado de funcionar.  El booleano `killed` puede ser reemplazado al comprobar que `reason === 'killed'` cuando se cambie a ese evento.

#### Evento: 'render-process-gone'

Devuelve:

* `event` Event
* Objeto `details`
  * `reason` String-la razón por la que el proceso de renderizado se ha ido.  Posibles valores:
    * `clean-exit` -proceso salido con un código de salida de cero
    * `abnormal-exit` -proceso salido con un código de salida distinto a cero
    * `killed` -proceso fue enviado un SIGTERM o asesinado externamente
    * `crashed` -Process se estrelló
    * `oom` -Process se quedó sin memoria
    * `launch-failed` - El proceso nunca se ha ejecutado correctamente
    * `integrity-failure` -las verificaciones de integridad de código de Windows fallaron
  * `exitCode` Integer - El código de salida del proceso, a menos que `reason` sea `launch-failed`, en cuyo caso `exitCode` será un código de error de ejecución especifico de la plataforma.

Emitido cuando el renderer process desaparece inesperadamente.  Esto suele ser porque fue estrellado o asesinado.

#### Evento: "unresponsive"

Aparece cuando la página web deja de responder.

#### Evento: "responsive"

Aparece cuando la página web que no responde vuelve a responder.

#### Evento: 'plugin-crashed'

Devuelve:

* `event` Event
* `name` String
* `version` String

Emitido cuando el proceso de enchufe se ha caído.

#### Evento: 'destroyed'

Emitido cuando `webContents` es destruido.

#### Evento: 'before-input-event'

Devuelve:

* `event` Event
* `input` propiedades de entrada de objeto.
  * `type` String - Sea `keyUp` o `keyDown`.
  * `key` String - Es igual a [KeyboardEvent.key][keyboardevent].
  * `code` String - Es igual a [KeyboardEvent.code][keyboardevent].
  * `isAutoRepeat` Boolean - Es igual a [KeyboardEvent.repeat][keyboardevent].
  * `isComposing` Boolean - Equivalente a [KeyboardEvent.isComposing][keyboardevent].
  * `shift` Boolean - Es igual a [KeyboardEvent.shiftKey][keyboardevent].
  * `control` Boolean - Es igual a [KeyboardEvent.controlKey][keyboardevent].
  * `alt` Boolean - Es igual a [KeyboardEvent.altKey][keyboardevent].
  * `meta` Boolean - Es igual a [KeyboardEvent.metaKey][keyboardevent].

Emitido antes de enviar los eventos `keydown` y `keyup` en la página. Llamando a `event.preventDefault` evitará la página `keydown`/ eventos `keyup` y los accesos rápidos al menú.

Para evitar sólo los accesos directos del menú, use [`setignoreMenuShortcuts`](#contentssetignoremenushortcutsignore):

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

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

#### Evento: 'zoom-changed'

Devuelve:

* `event` Event
* `zoomDirection` String - Puede ser `in` o `out`.

Emitido cuando es usuario esta solicitando cambiar el nivel del zoom usando la rueda del ratón.

#### Evento: 'devtools-opened'

Emitido cuando DevTools es abierto.

#### Evento: 'devtools-closed'

Emitido cuando Devtools es cerrado.

#### Evento: 'devtools-focused'

Emitido cuando DevTools es centrado o abierto.

#### Evento: 'certificate-error'

Devuelve:

* `event` Event
* `url` String
* `error` cadena - el error del código.
* `certificate` [Certificate](structures/certificate.md)
* `callback` Función
  * `isTrusted` Boolean - indica si el certificado se puede considerar de confianza.

Emitido cuando no se pudo verificar el `certificate` for `url`.

El uso es el mismo con [the `certificate-error` evento de `app`](app.md#event-certificate-error).

#### Evento: 'select-client-certificate'

Devuelve:

* `event` Event
* `url` URL
* `certificateList`[Certificate[]](structures/certificate.md)
* `callback` Función
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
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String (opcional)
  * `password` String (opcional)

Emitido cuando `webContents` quiere hacer una autenticación básica.

El uso es lo mismo que con el evento [the `login` de la `app`](app.md#event-login).

#### Evento: 'found-in-page'

Devuelve:

* `event` Event
* Objeto `result`
  * `requestId` Íntegro
  * `activeMatchOrdinal` Integer - Posición de la coincidencia activa.
  * `matches` Integer - Número de coincidencias.
  * `selectionArea` Rectangle - Coordenadas de la primera región de coincidencia.
  * `finalUpdate` Boolean

Emitido cuando un resultado está disponible para la petición de [`webContents.findInPage`].

#### Evento: 'media-started-playing'

Emitido cuando la media empieza a reproducirse.

#### Evento: 'media-paused'

Emitido cuando la media es pausada o ha terminado de reproducirse.

#### Evento: 'did-change-theme-color'

Devuelve:

* `event` Event
* `color` (String | null)-el color del tema está en formato de ' #rrggbb '. Es `null` cuando no se establece ningún color del tema.

Se emite cuando cambia el color del tema de una página. Por lo general, esto se debe a encontrar una etiqueta meta:

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

Emitido cuando el tipo del cursor cambia. El parámetro `type` puede ser `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` o `custom`.

Si el parámetro `type` es `custom`, el parámetro de la `image` mantendrá la imagen del cursor personalizado en un [`NativeImage`](native-image.md), `scale` y `size`, `hotpost` mantendrá información adicional sobre el cursor personalizado.

#### Evento: 'context-menu'

Devuelve:

* `event` Event
* Objeto `params`
  * Entero `x` - coordenadas x.
  * Entero `y` - coordenadas x.
  * `linkURL` String - URL del enlace que incluye el nodo del menú contextual que fue invocado.
  * `linkText` String-Text asociado con el enlace. Puede ser una cadena de vacía si los contenidos del enlace son una imagen.
  * `pageURL` String - URL de la parte superior del nivel de la página que se invocó en el menú del contexto.
  * `framseURL` String - URL de la parte inferior del marco que se invocó en el menú del contexto.
  * `srcURL` URL de origen de cadena para el elemento en el que se invocó el menú contextual . Los elementos con URL de origen son imágenes, audio y vídeo.
  * `mediaTipo` String - Tipo de nodo que el menú del contexto fue invocado. Puede ser `none`, `image`, `audio`, `video`, `canvas`, `file` o `plugin`.
  * `<0>tieneImagenContenido` Boolean - si el menú del contexto fue invocado en una imagen la cual tiene contenido no vacío.
  * `esEditable` Boolean - Si el contexto es editable.
  * `selectrionText` String. Texto de la selección la cual el menú del contexto fue invocado.
  * `tituloTexto` String - Título o texto alt de la selección la cual el contexto fue invocado.
  * `misspelledWord` String - La palabra mal escrita bajo el cursor, si cualquiera.
  * `dictionarySuggestions` String[] - Un array de palabras sugeridas para mostrar al usuario para remplazar el `misspelledWord`.  Solo disponible si hay una palabra mal escrita y el corrector está habilitado.
  * `frameCharset` String - La codificación de carácteres de la estructura la cual el menú fue invocado.
  * `inputFieldType` Cadena - Si se invoca el menú de contexto en un campo de entrada, el tipo de ese campo. Los valores posibles son `none`, `plainText`, `password`, `other`.
  * `menuSourceType` fuente de entrada de cadena que invocó el menú contextual. Puede ser `none`, `mouse`, `keyboard`, `touch` o `touchMenu`.
  * `mediaFlags` Object-los indicadores para el elemento multimedia en que se invocado el menú contextual.
    * `enError` Boolean - Si el elemento multimedia se ha dañado.
    * `estáPausado` Boolean - Si el elemento multimedia está pausado.
    * `estáSilenciado` Boolean - Si el elemento multimedia está silenciado.
    * `tieneAudio` Boolean - Si el elemento multimedia tiene audio.
    * `estáLooping` Boolean - Si el elemento multimedia está enredado.
    * `esControlVisible` Boolean - Si los controles del elemento multimedia son visibles.
    * `puedeToggleControles` Boolean - Si los controles de los elementos multimedia son toggleable.
    * `puedeRotar` Boolean - Si el elemento multimedia puede ser rotado.
  * `editFlags` Object-estos indicadores indican si el representador cree que puede realizar la acción correspondiente.
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
* `callback` Función
  * `deviceId` String

Emite cuando el dispositivo bluetooth necesita ser seleccionado en la llamada `navigator.bluetooth.requestDevice`. Para usar `navigator.bluetooth` api `webBluetooth` debe ser activada. Si no se llama `event.preventDefault` el primer dispositivo disponible será seleccionado. `callback` puede ser llamado con `deviceId` ser seleccionado,.

```javascript
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    const result = deviceList.find((device) => {
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

Se emite cuando se genera un nuevo fotograma. Solo se pasa el área sucia en el búfer de .

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ webPreferences: { offscreen: true } })
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
* `webPreferences` WebPreferences-las preferencias web que será utilizada por la página de de invitados. Este objeto se puede modificar para ajustar las preferencias de la página de del invitado.
* `params`<string, string> de registro-los otros parámetros de `<webview>` como la URL de `src` . Este objeto se puede modificar para ajustar los parámetros de la página del huésped.

Se emite cuando se conecta el contenido Web de un `<webview>`a este contenido Web. Llamar a `event.preventDefault()` destruirá la página del huésped.

Este evento puede utilizarse para configurar `webPreferences` para la `webContents` de un `<webview>`antes de que se carga y proporciona la capacidad de configuración que no se puede establecer a través de atributos `<webview>`.

**Nota:** La opción específica de `preload` aparecerá como `preloadURL` (no `preload`) en el objeto `webPreferences` emitido con este evento.

#### Event: 'did-attach-webview'

Devuelve:

* `event` Event
* `webContents` WebContents - El contenido de la página web invitada que será usado por `<webview>`.

Emitido cuando se ha adjuntado un `<webview>` a este contenido web.

#### Evento: 'console-message'

Devuelve:

* `event` Event
* `level` Entero - El nivel de registro, desde 0 hasta 3. Con el fin de que coincida con `verbose`, `info`, `warning` y `error`.
* `message` String-el mensaje de la consola real
* `line` Entero - El número de línea de la fuente que activó este mensaje de consola
* `sourceId` Cadena

Emitido cuando la ventana asociada registra un mensaje de consola.

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

Se emite cuando se llama a `desktopCapturer.getSources()` en el proceso del representador. Llamando a `event.preventDefault()` hará que devuelva fuentes vacías.

#### Evento: 'remote-require' _Obsoleto_

Devuelve:

* `event` IpcMainEvent
* `moduleName` String

Emitido cuando `remote.require()` se llama en el proceso de renderizado. Llamando `event.preventDefault()` evitará que se devuelva el modulo. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

#### Evento: 'remote-get-global' _Obsoleto_

Devuelve:

* `event` IpcMainEvent
* `globalName` String

Emitido cuando `remote.getGlobal()` se llama en el proceso de renderizado. Llamando `event.preventDefault()` evitará que sea devuelto el global. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

#### Evento: 'remote-get-builtin' _Obsoleto_

Devuelve:

* `event` IpcMainEvent
* `moduleName` String

Emitido cuando `remote.getBuiltin()` se llama en el proceso de renderizado. Llamando `event.preventDefault()` evitará que se devuelva el modulo. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

#### Evento: 'remote-get-current-window' _Obsoleto_

Devuelve:

* `event` IpcMainEvent

Emitido cuando `remote.getCurrentWindow()` se llama en el proceso de renderizado. Llamar a `event.preventDefault()` impedirá que el objeto sea devuelto. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

#### Evento: 'remote-get-current-web-contents' _Obsoleto_

Devuelve:

* `event` IpcMainEvent

Emitido cuando `remote.getCurrentWebContents()` se llama en el proceso de renderizado. Llamar a `event.preventDefault()` impedirá que el objeto sea devuelto. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

#### Evento: 'preferred-size-changed'

Devuelve:

* `event` Event
* `preferredSize` [tamaño](structures/size.md) -el tamaño mínimo necesario para contener el diseño del documento, sin requerir desplazamiento.

Se emite cuando ha cambiado el `WebContents` tamaño preferido.

Este evento solo se emitirá cuando `enablePreferredSizeMode` esté establecido en `true` en `webPreferences`.

### Métodos de Instancia

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Object (opcional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (opcional) - Una url HTTP de referencia.
  * `userAgent` String (opcional) - Un agente de usuario originando la solicitud.
  * `extraHeaders` String (opcional) - Encabezados extras separadas por "\n".
  * `postData` ([UploadRawData []](structures/upload-raw-data.md) | [UploadFile []](structures/upload-file.md)) (opcional)
  * `baseURLForDataURL` String (opcional) - Url base (con separadores de ruta arrastrables) para archivos que se cargan por el url de datos. Esto es necesario únicamente si el `url` especificado es un url de datos y necesita cargar otros archivos.

Devuelve `Promise<void>` - la promesa se resolverá cuando la página ha finalizado de cargar (mira [`did-finish-load`](web-contents.md#event-did-finish-load)), y rechaza si la página falla al cargar (mira[`did-fail-load`](web-contents.md#event-did-fail-load)). Un manejador de rechazo noop ya esta adjunto, el cual evita errores de rechazo no controlados.

Carga el `url` en la ventana. El `url` debe contener el prefijo de protocolo. Por ejemplo `http://` o `file://`. Si la carga debe omitir el caché http entonces hay que utilizar el encabezado `pragma` para lograrlo.

```javascript
const { webContents } = require('electron')
const options = { extraHeaders: 'pragma: no-cache\n' }
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (opcional)
  * `query` Record<String, String> (opcional) - Pasado a `url.format()`.
  * `search` String (opcional) - Pasado a `url.format()`.
  * `hash` String (opcional) - Pasado a `url.format()`.

Devuelve `Promise<void>` - la promesa sera resolvida cuando la página haya finalizado de cargar (mira [`did-finish-load`](web-contents.md#event-did-finish-load)), y será rechazada si la pagina falla al cargar (mira [`did-fail-load`](web-contents.md#event-did-fail-load)).

Carga el archivo dado en la ventana, `filePath` debe ser una ruta para un archivo HTML relativo a la raíz de tu aplicación.  Por ejemplo una estructura de aplicación como la siguiente:

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

Inicia una descarga del recurso en `url` sin navegar. Se activará el evento `will-download` de `session` .

#### `contents.getURL()`

Devuelve `String` - El URL de la página web actual.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com').then(() => {
  const currentURL = win.webContents.getURL()
  console.log(currentURL)
})
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

#### `contents.forcefullyCrashRenderer()`

Forzosamente termina el renderer process que actualmente aloja este `webContents`. Esto hará que sea emitido el evento `render-process-gone` con el `reason=killed || reason=crashed`. Tenga en cuenta que algunos webContents comparten el renderer process y por lo tanto llamar a este método puede causar que se bloque el proceso también para otros wevContents.

Llamar a `reload()` inmediatamente después de llamar a este método forzará que la recarga ocurra en un nuevo proceso. Esto debería ser usado cuando el proceso es inestable o inutilizable, por ejemplo parar recuperar del evento `unresponsive`.

```js
contents.on('unresponsive', async () => {
  const { response } = await dialog.showMessageBox({
    message: 'App X has become unresponsive',
    title: 'Do you want to try forcefully reloading the app?',
    buttons: ['OK', 'Cancel'],
    cancelId: 1
  })
  if (response === 0) {
    contents.forcefullyCrashRenderer()
    contents.reload()
  }
})
```

#### `contents.setUserAgent(userAgent)`

* `userAgent` cadena

Anula el agente usuario para esta página web.

#### `contents.getUserAgent()`

Devuelve `String` - El agente usuario para esta página web.

#### `contents.insertCSS(css[, options])`

* `css` Cadena
* `options` Object (opcional)
  * `cssOrigin` String (opcional)-puede ser ' User ' o ' author '; Especificar ' User ' te permite evitar que los sitios web invaliden el CSS que insertas. El valor predeterminado es ' author ' (autor).

Devuelve `Promise<String>` - Una promesa que resuelve con una llave para el CSS insertado que puede ser utilizado más tarde para eliminar el CSS a través `contents.removeInsertedCSS(key)`.

Inyecta CSS en la página web actual y devuelve un identificador único para la hoja de estilo insertada.

```js
contents.on('did-finish-load', () => {
  contents.insertCSS('html, body { background-color: #f00; }')
})
```

#### `contents.removeInsertedCSS(key)`

* `key` String

Devuelve `Promise<void>` - Resuelve si la eliminación fue exitosa.

Elimina el CSS insertado desde la página web actual. La hoja de estilos se identifica por su clave, que se devuelve desde `contents.insertCSS(css)`.

```js
contents.on('did-finish-load', async () => {
  const key = await contents.insertCSS('html, body { background-color: #f00; }')
  contents.removeInsertedCSS(key)
})
```

#### `contents.executeJavaScript(code[, userGesture])`

* `codigo` String
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.

Devuelve `Promise<any>` - Una promesa que resuelve con el resultado de la ejecución del código o es rechazada si el resultado del código es una promesa rechazada.

Evalúa el `código` en la página.

En la ventana del navegador, algunas API HTML como `requestFullScreen` solo pueden invocarse con un gesto del usuario. Establecer `userGesture` a `true` eliminará esta limitación.

La ejecución de código se suspenderá hasta que la pagina pare de cargarse.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

#### `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - El ID de la palabra para correr javascript en, `0` es el mundo por defecto, `999` es el mundo usado por la característica `contextIsolation` de Electron.  Puede aquí suministrar cualquier entero.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.

Devuelve `Promise<any>` - Una promesa que resuelve con el resultado de la ejecución del código o es rechazada si el resultado del código es una promesa rechazada.

Funciona como `executeJavaScript` pero evaluá `scripts` en un contexto aislado.

#### `contents.setIgnoreMenuShortcuts(ignore)`

* `ignore` Boolean

Ignora los accesos directos del menú de la aplicación mientras se enfoca los contenidos de la web.

#### `contents.setWindowOpenHandler(handler)`

* Función `handler`<{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}>
  * Objeto `details`
    * `url` String - La versión _resuelta_ de la URL pasada a `window.open()`. por ejemplo una ventana con `window.open('foo')` producirá algo como `https://the-origin/the/current/path/foo`.
    * `frameName` String - Nombre de la ventana proporcionado en `window.open()`
    * `features` String - Lista separada por coma de la características de ventana proporcionada a `window.open()`.

  Devuelve `{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}` - `deny` cancela la creación de la nueva ventana. `allow` permitirá la que se cree la nueva ventana. Especificando `overrideBrowserWindowOptions` permite la personalización de la ventana creada. Devolver un valor no reconocido como un null, undefined o un objeto sin una 'action' reconocida resultará en un error de consola tiene el mismo efecto que devolver `{action: 'deny'}`.

Se llama antes de crear una ventana cuando se llama a `window.open()` desde el representador de . Consulta [`window.open()`](window-open.md) para obtener más detalles y cómo utilizar esto en conjunción con `did-create-window`.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Silencia el audio la página web actual.

#### `contents.isAudioMuted()`

Devuelve `Boolean` - Si esta página ha sido silenciada.

#### `contents.isCurrentlyAudible()`

Devuelve `Boolean` - Si el audio se esta reproduciendo actualmente.

#### `contents.setZoomFactor(factor)`

* `factor` Double - Factor de zoom; por defecto es 1.0.

Cambia el nivel de zoom al nivel especificado. Factor de zoom es porcentaje de zoom dividido entre 100, así que 300% = 3.0.

El factor debe ser mayor que 0.0.

#### `contents.getZoomFactor()`

Devuelve `Number` - el factor de zoom actual.

#### `contents.setZoomLevel(level)`

* `nivel` Número - Nivel de Zoom.

Cambia el nivel de zoom al nivel especificado. El tamaño original es 0 y cada incremento por encima o por debajo representa un zoom del 20% mayor o menor a los límites predeterminados de 300% y 50% del tamaño original, respectivamente. La fórmula para esto es `scale := 1.2 ^ level`.

> **Nota**: la política de zoom en el nivel de cromo es la misma-origen, lo que significa que el nivel de zoom para un dominio específico se propaga en todas las instancias de Windows con el mismo dominio. Diferenciar las URL de las ventanas hará que el zoom se trabaje por ventana.

#### `contents.getZoomLevel()`

Devuelve `Number` - el nivel de zoom actual.

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

Devuelve `Promise<void>`

Establecer el nivel de máximo y mínimo pizca de zoom.

> **Nota**: el zoom visual se inhabilita por defecto en Electron. Para volver a habilitarlo, llama a:
> 
> ```js
contents.setVisualZoomLevelLimits(1, 3)
```

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

* `text` String

Ejecuta el comando de edición `replace` en la página web.

#### `contents.replaceMisspelling(text)`

* `text` String

Ejecuta el comando de edición `replaceMisspelling` en página web.

#### `contents.insertText(text)`

* `text` String

Devuelve `Promise<void>`

Inserta `texto` en el elemento enfocado.

#### `contents.findInPage(text[, options])`

* `text` String - El contenido para ser buscado, no debe quedar en blanco.
* `options` Object (opcional)
  * `forward` Boolean (opcional) - Ya sea para buscar hacia adelante o hacia atrás, el valor predeterminado es `true`.
  * `findNext` Boolean (opcional) - Si la operación es la primera solicitud o un seguimiento, por defecto a `false`.
  * `matchCase` Boolean (opcional) - Si la busqueda debe ser sensible a mayúsculas, por defecto es `false`.

Devuelve `Integer` - El id de la solicitud usado para la solicitud.

Empieza una solicitud para encontrar todas las coincidencias para el `text` en la página web. El resultado de la solicitud puede ser obtenida suscribiendote al evento [`found-in-page`](web-contents.md#event-found-in-page).

#### `contents.stopFindInPage(action)`

* `action` String-especifica la acción a tener lugar cuando finaliza [`webContents.findInPage`] solicitud.
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

Captura una foto instantánea de la página dentro de `rect`. Omitiendo `rect` capturará toda la página visible.

#### `contents.isBeingCaptured()`

Devuelve `Boolean` -si se está capturando esta página. Devuelve true cuando el conteo del capturador es grande y luego 0.

#### `contents.incrementCapturerCount([size, stayHidden])`

* `size` [Tamaño](structures/size.md) (opcional) - El tamaño preferido para el capturador.
* `stayHidden` Boolean (opcional) - Mantiene la página oculta en lugar de visible.

Incrementa el contador de captura en uno. La página es considerada visible cuando su ventana de navegador está oculta y el recuento del capturador no es cero. Si le gustaría que la página permanezca oculta, debería asegurarse que `stayHidden` está establecido a true.

Esto también afecta a la API de visibilidad de la página.

#### `contents.decrementCapturerCount([stayHidden])`

* `stayHidden` Boolean (opcional) - Mantiene la página en estado oculto en lugar de visible.

Disminuye el recuento del capturador en uno. La página se establecerá en el estado oculto u ocluido cuando la ventana del navegador esté oculta u ocluida y el recuento del capturador llegue a cero. Si quiere disminuir el contador del caputador en su lugar debería establecer `stayHidden` a true.

#### `contents.getPrinters()`

Obtiene la lista de impresora del sistema.

Devuelve [`PrinterInfo[]`](structures/printer-info.md)

#### `contents.print([options], [callback])`

* `options` Object (opcional)
  * `silent` Boolean (opcional)-no le pidas a un usuario las configuraciones de impresión. Por defecto es `false`.
  * `printBackground` Boolean (opcional)-imprime el color de fondo y la imagen de la Página Web. Por defecto es `false`.
  * `deviceName` String (opcional)-configura el nombre del dispositivo de la impresora para usar. Debe ser el nombre definido por el sistema y no el nombre ' Friendly ', p. ej., ' Brother_QL_820NWB ' y no ' Brother QL-820NWB '.
  * `color` Boolean (opcional)-establecer si la página web impresa estará en color o en escala de grises. Por defecto es `true`.
  * `margins` objeto (opcional)
    * `marginType` String (opcional) - Puede ser `default`, `none`, `printableArea`, o `custom`. Si `custom` es elegido, además necesitar especificar `top`, `bottom`, `left`, y `right`.
    * `top` Number (opcional) - El margen superior de la página web impresa, en píxeles.
    * `bottom` Number (opcional) - El margen inferior de la página web impresa, en píxeles.
    * `left` Number (opcional) - El margen izquierdo de la página web impresa, en píxeles.
    * `right` Number (opcional) - El margen derecho de la página web impresa, en píxeles.
  * `landscape` Boolean (opcional)-si la página web debe imprimirse en modo horizontal. Por defecto es `false`.
  * `scaleFactor` Number (opcional) - El factor de escalado de la página web.
  * `pagesPerSheet` Number (opcional) - El número de páginas a imprimir por hoja de página.
  * `collate` Boolean (opcional) - Si la página web debe ser intercalada.
  * `copies` Number (opcional) - El número de copias de la página web a imprimir.
  * `pageRanges` Object [] (opcional)-el rango de página a imprimir. En macOS, solo se respeta un rango.
    * `from` número-índice de la primera página en imprimir (basado en 0).
    * `to` Number - Índice de la última página a imprimir (inclusive) (0-based).
  * `duplexMode` String (opcional)-configura el modo dúplex de la página web impresa. Puede ser `simplex`, `shortEdge`o `longEdge`.
  * `dpi` Record<string, number> (opcional)
    * `horizontal` Number (opcional) - El dpi horizontal.
    * `vertical` Number (opcional) - El dpi vertical.
  * `header` String (opcional) - Cadena a ser impresa como cabecera de la página.
  * `footer` String (opcional) - Cadena a ser impresa como pie de página.
  * `pageSize` String | Tamaño (opcional) - Especifique el tamaño de página del documento impreso. Puede ser `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o un objeto que contenga `height`.
* `retrocallback` Funcion (opcional)
  * `success` Boolean - Indica el éxito de la llamada impresa.
  * `failureReason` String - Descripción del error llamada de nuevo si la impresión falla.

Cuando es pasado un `pageSize` personalizado, Chromium intenta validar los valores mínimos específicos de la plataforma para `width_microns` y `height_microns`. Ambos anchura y altura deben ser mínimamente 353 microns, pero puede ser más grande en algunos sistemas operativos.

Imprime la página web de la ventana. Cuando `silent` es establecido a `true`, Electron tomará la impresora por defecto del sistema si `deviceName` está vacío y la configuraciones por defecto para imprimir.

Utilizar el estilo CCS `page-break-before: always;` para imprimir a la fuerza una página nueva.

Ejemplo de uso:

```js
const options = {
  silent: true,
  deviceName: 'My-Printer',
  pageRanges: [{
    from: 0,
    to: 1
  }]
}
win.webContents.print(options, (success, errorType) => {
  if (!success) console.log(errorType)
})
```

#### `contents.printToPDF(options)`

* `options` Object
  * `headerFooter` Record<string, string> (opcional) - el encabezado y el pie de página para el PDF.
    * `title` String - El título para el encabezado PDF.
    * `url` String - la url para el pie de página PDF.
  * `landscape` Boolean (opcional) - `true` for landscape, `false` for portrait.
  * `marginsType` Integer (opcional): especifica el tipo de márgenes que se utilizarán. Usa 0 para margen predeterminado, 1 para ningún margen y 2 para un margen mínimo.
  * `scaleFactor` Number (opcional) - El factor de escalado de la página web. Puede variar entre 0 to 100.
  * `pageRanges`<string, number> de registro (opcional)-el rango de página a imprimir.
    * `from` número-índice de la primera página en imprimir (basado en 0).
    * `to` Number - Índice de la última página a imprimir (inclusive) (0-based).
  * `pageSize` String | Size (opcional) - Especifique el tamaño de la página del PDF Generado. Puede ser `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o un objeto que contiene `height` y `width` en micrones.
  * `printBackground` Boolean (opcional) - Si se imprime o no el fondo CSS.
  * `printSelectionOnly` Boolean (opcional) - Si se imprime solo la selección.

Returns `Promise<Buffer>` - Se resuelve cuando los datos PDF son generados.

Imprime la página web de la ventana como PDF con la configuración personalizada de impresión previa de Chromium.

El `landscape` se ignorará si `@page` CSS at-rule es utilizado en la página web.

Por defecto, una `options` en blanco se considerará como:

```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false,
  pageSize: 'A4',
  scaleFactor: 100
}
```

Utilizar el estilo CCS `page-break-before: always;` para imprimir a la fuerza una página nueva.

Un ejemplo de `webContents.printToPDF`:

```javascript
const { BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')
const os = require('os')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}).then(data => {
    const pdfPath = path.join(os.homedir(), 'Desktop', 'temp.pdf')
    fs.writeFile(pdfPath, data, (error) => {
      if (error) throw error
      console.log(`Wrote PDF successfully to ${pdfPath}`)
    })
  }).catch(error => {
    console.log(`Failed to write PDF to ${pdfPath}: `, error)
  })
})
```

#### `contents.addWorkSpace(path)`

* `path` String

Agrega la ruta especificada al área de trabajo de DevTools. Se debe usar después de la creación de de DevTools:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
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
  <webview id="devtools" src="about:blank"></webview>
  <script>
    const { ipcRenderer } = require('electron')
    const emittedOnce = (element, eventName) => new Promise(resolve => {
      element.addEventListener(eventName, event => resolve(event), { once: true })
    })
    const browserView = document.getElementById('browser')
    const devtoolsView = document.getElementById('devtools')
    const browserReady = emittedOnce(browserView, 'dom-ready')
    const devtoolsReady = emittedOnce(devtoolsView, 'dom-ready')
    Promise.all([browserReady, devtoolsReady]).then(() => {
      const targetId = browserView.getWebContentsId()
      const devtoolsId = devtoolsView.getWebContentsId()
      ipcRenderer.send('open-devtools', targetId, devtoolsId)
    })
  </script>
</body>
</html>
```

```js
// Main process
const { ipcMain, webContents } = require('electron')
ipcMain.on('open-devtools', (event, targetContentsId, devtoolsContentsId) => {
  const target = webContents.fromId(targetContentsId)
  const devtools = webContents.fromId(devtoolsContentsId)
  target.setDevToolsWebContents(devtools)
  target.openDevTools()
})
```

Un ejemplo de mostrar devtools en un `BrowserWindow`:

```js
const { app, BrowserWindow } = require('electron')

let win = null
let devtools = null

app.whenReady().then(() => {
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({ mode: 'detach' })
})
```

#### `contents.openDevTools([options])`

* `options` Object (opcional)
  * `mode` String - Abre las herramientas del desarrollador con el estado de dock especificado, puede ser `right`, `bottom`, `undocked`, `detach`. Por defecto se utiliza el último estado de dock. En el modo `undocked` es posible acoplarse de nuevo. En el modo `detach` no se puede.
  * `activate` Boolean (opcional)-ya sea para llevar la ventana DevTools abierta en primer plano. El valor por defecto es `true`.

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

#### `contents.inspectSharedWorkerById(workerId)`

* Cadena `workerId`

Inspecciona el shared worker basado en su ID.

#### `contents.getAllSharedWorkers()`

Devuelve [`SharedWorkerInfo[]`](structures/shared-worker-info.md) - Información sobre todos los Shared Workers.

#### `contents.inspectServiceWorker()`

Abre las herramientas de desarrollador para el contexto del trabajador de servicio.

#### `contents.send(channel, ...args)`

* `channel` Cadena
* `...args` any[]

Envía un mensaje asíncrono al renderer process a través de `channel` junto con los argumentos. Los argumentos se serializan con el [clon estructurado algoritmo][SCA], al igual que [`postMessage`][], por lo que las cadenas de prototipos no se incluirán incluidas. El envío de funciones, promesas, símbolos, WeakMaps o WeakSets lanzará una excepción.

> **NOTA**: Enviar tipos de JavaScript no estándar tales como objetos DOM o objetos especiales de Electron lanzará una excepción.

El proceso de renderizado puede manejar el mensaje escuchando el `canal` con el módulo [`ipcRenderer`](ipc-renderer.md).

Un ejemplo de envío de mensajes desde el proceso principal al proceso de renderizado:

```javascript
// In the main process.
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
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
      console.log(message) // Prints 'whoooooooh!'
    })
  </script>
</body>
</html>
```

#### `contents.sendToFrame(frameId, channel, ...args)`

* `frameId` Integer | [number, number]-el ID del fotograma al que se enviará o un par de de `[processId, frameId]` si el fotograma se encuentra en un proceso diferente para el fotograma principal.
* `channel` Cadena
* `...args` any[]

Envía un mensaje asíncrono al frame especifico en un renderer process a través de `channel`, junto con los argumentos. Los argumentos se serializan con el [algoritmo de clon estructurado][SCA], al igual que [`postMessage`][], por lo que no se incluirán las cadenas de de prototipo. El envío de funciones, promesas, símbolos, WeakMaps o WeakSets lanzará una excepción.

> **NOTA**: Enviar tipos de JavaScript no estándar tales como objetos DOM o objetos especiales de Electron lanzará una excepción.

El proceso de renderizado puede manejar el mensaje escuchando el `canal` con el módulo [`ipcRenderer`](ipc-renderer.md).

Si quieres obtener el `frameId` de un contexto de representador determinado, debes usar el valor `webFrame.routingId` .  Por ejemplo.

```js
// In a renderer process
console.log('My frameId is:', require('electron').webFrame.routingId)
```

También puede leer el `frameId` de todos los mensajes IPC entrantes en el proceso principal.

```js
// In the main process
ipcMain.on('ping', (event) => {
  console.info('Message came from frameId:', event.frameId)
})
```

#### `contents.postMessage(channel, message, [transfer])`

* `channel` Cadena
* `mensaje` cualquiera
* `transfer` MessagePortMain [] (opcional)

Envía un mensaje al renderer process, transfiriendo opcionalmente la propiedad de cero o más objetos [`MessagePortMain`][].

Los objetos `MessagePortMain` transferidos estarán disponible en el renderer process accediendo a la propiedad `ports` del evento emitido. Cuando llegan al renderer, serán objetos DOM `MessagePort` nativos.

Por ejemplo:

```js
// Main process
const { port1, port2 } = new MessageChannelMain()
webContents.postMessage('port', { message: 'hello' }, [port1])

// Renderer process
ipcRenderer.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

#### `contents.enableDeviceEmulation(parameters)`

* Objeto `parameters`
  * `screenPosition` String-especifica el tipo de pantalla para emular (predeterminado: `desktop`):
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
* `callback` Función
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Empezar suscripción para eventos de presentación y capturas de fotogramas, la `callback` sera llamada con `callback(image, dirtyRect)` cuando hay un evento de presentación.

La `image` es una instancia de [NativeImage](native-image.md) que almacena el fotograma capturado.

El `dirtyRect` es un objeto con propiedades `x, y, width, height` que describe cual parte de la página fue pintada de nuevo. Si `onlyDirty` está configurado a `true`, `image` solo contendrá el área repintada. `onlyDirty` por defecto en `false`.

#### `contents.endFrameSubscription()`

Finalizar suscripción para eventos de presentación de marcos.

#### `contents.startDrag(item)`

* Objeto `item`
  * `file` String[] | String - La ruta(s) al arhivo(s) siendo arrastrado.
  * `icon` [NativeImage](native-image.md) | String - La imagen no debe estar vacía en on macOS.

Configura el `item` como un elemento arrastrable para la operación drag-drop actual. El `file` es la ruta absoluta del archivo que se va a arrastrar, y `icon` es la imagen que se muestra debajo del cursor cuando se arrastra.

#### `contents.savePage(fullPath, saveType)`

* `fullPath` String - La ruta completa del archivo.
* `saveType` String-especifica el tipo de guardado.
  * `HTMLOnly` - Guarda solamente el HTML de la página.
  * `HTMLComplete` - Guarda una página html completa.
  * `MHTML` - Guarda una página html completa como MHTML.

Devuelve `Promise<void>` - resuelve si la pagina se guardo.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', async () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete').then(() => {
    console.log('Page was saved successfully.')
  }).catch(err => {
    console.log(err)
  })
})
```

#### `contents.showDefinitionForSelection()` _macOS_

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

Si ** de representación fuera de pantalla está habilitado, establece la velocidad de fotogramas en el número especificado. Sólo se aceptan valores entre 1 y 240.

#### `contents.getFrameRate()`

Devuelve `Integer` - Si *offscreen rendering* esta habilitado devuelve el indice de fotogramas en ese momento.

#### `contents.invalidate()`

Programa un repintado completo de la ventana en la que se encuentra este contenido web.

Si *offscreen rendering* está habilitado invalida el fotograma y genera uno nuevo a través del evento `'paint'`.

#### `contents.getWebRTCIPHandlingPolicy()`

Devuelve `String` - Devuelve el WebRTC IP Handling Policy.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` String-especifica la política de gestión de IP de WebRTC.
  * `default` - Revela los IPs locales y publicos del usuario. Este es el comportamiento por defecto. Cuando se usa esta política, WebRTC tiene el derecho de enumerar todas las interfaces y vincularlas para descubrir interfaces públicas.
  * `default_public_interface_only` - Revela el IP público del usuario pero no revela el IP local del usuario. Cuando se usa esta política, WebRTC solo debe usar la ruta predeterminada utilizada por http. Esto no expone ninguna dirección local.
  * `default_public_and_private_interfaces` - Revela los IPs público y local del usuario. Cuando se usa esta política, WebRTC solo debe usar la ruta predeterminada utilizada por http. Esto también expone la dirección privada predeterminada asociada. La ruta predeterminada es la ruta elegida por el SO en un punto final multitarjeta.
  * `disable_non_proxied_udp` -no expone IPs públicas o locales. Cuando se usa esta política de , WebRTC solo debe usar TCP para ponerse en contacto con los pares o servidores a menos que el servidor proxy admita UDP.

Configurar la política de gestión de IP de WebRTC te permite controlar qué IPs están expuestos mediante WebRTC. Consulta [](https://browserleaks.com/webrtc) BrowserLeaks para más detalles.

#### `contents.getOSProcessId()`

Devuelve `Integer` - El `pid` del sistema operativo, del proceso de renderizado asociado.

#### `contents.getProcessId()`

Devuelve `Integer` - El `pid` interno de Chromium del renderizador asociado. Puede ser comparado con el `frameProcessId` pasado por los eventos de navegación específicos del frame (e.g. `did-frame-navigate`)

#### `contents.takeHeapSnapshot(filePath)`

* `filePath` String - Ruta al archivo de salida.

Devuelve `Promise<void>` - Indica si la instantánea se ha creado correctamente.

Toma una instantánea de la pila V8 y la guarda en `filePath`.

#### `contents.getBackgroundThrottling()`

Devuelve `Boolean` - si este contenido web acelerará o no animaciones y temporizadores cuando la página se haga de fondo. Esto también afecta a la API de visibilidad de la página.

#### `contents.setBackgroundThrottling(allowed)`

* `allowed` Boolean

Controla si estos WebContents estrangularán las animaciones y los temporizadores cuando la página se vuelve en segundo plano. Esto también afecta a la API de visibilidad de la página.

#### `contents.getType()`

Devuelve `String` - el tipo de webContent. Puede ser `backgroundPage`, `window`, `browserView`, `remote`, `webview` o `offscreen`.

### Propiedades de Instancia

#### `contents.audioMuted`

Una propiedad `Boolean` que determina si esta página esta silenciada o no.

#### `contents.userAgent`

Una propiedad `String` que determina el agente de usuario para esta página web.

#### `contents.zoomLevel`

Una propiedad `Number` que determina el nivel de zoom para web contents.

El tamaño original es 0 y en cada incremento arriba o abajo representa un 20% más grande o más pequeño para los limites por defecto que son de 300% y 50% del tamaño original respectivamente. La fórmula para esto es `scale := 1.2 ^ level`.

#### `contents.zoomFactor`

Una propiedad `Number` que determina el facto de zoom para este web contents.

El factor de zoom es el porcentaje de zoom dividido por 100, así que 300% = 3.0.

#### `contents.frameRate`

Una propiedad `Integer` que establece la velocidad de fotogramas de los contenidos web en el número especificado. Sólo se aceptan valores entre 1 y 240.

Solo se aplica si ** de representación fuera de pantalla está habilitado.

#### `contents.id` _Readonly_

Un `Integer` representando el ID único de este WebContents. Cada ID es único entre todas las instancias `WebContents` de toda la aplicación Electron.

#### `contents.session` _Readonly_

Un [`Session`](session.md) usado por este webContents.

#### `contents.hostWebContents` _Readonly_

Un instancia de [`WebContents`](web-contents.md) que podría poseer este `WebContents`.

#### `contents.devToolsWebContents` _Readonly_

Una propiedad `WebContents | null` que representa el `WebContents` de la DevTools asociada con el `WebContents` dado.

**Note:** Los usuario nunca deberían almacenar este objeto porque puede convertirse en `null` cuando el DevTools ha sido cerrado.

#### `contents.debugger` _Readonly_

Una instancia [`Debugger`](debugger.md) para este webContents.

#### `contents.backgroundThrottling`

Una propiedad `Boolean` que determina si este WebContents acelera o no las animaciones y los temporizadores cuando la página pasa a segundo plano. Esto también afecta a la API de visibilidad de la página.

#### `contents.mainFrame` _Readonly_

Una [`WebFrameMain`](web-frame-main.md) propiedad que representa el fotograma superior de la jerarquía de fotogramas de la página.

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
