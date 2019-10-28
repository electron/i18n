# Etiqueta `<webview>`

## Advertencia

La etiqueta `webview` de Electron está basada en [Chromium's `webview`](https://developer.chrome.com/apps/tags/webview), el cual está experimentado cambios de arquitectura dramáticos. Esto impacta la estabilidad de `webviews`, incluyendo el renderizado, navegación y el enrutamiento de evento. Nosotros actualmente recomendamos no usar la etiqueta `webviews` y considerar alternativas como `iframe`, `BrowserView` de Electron o una arquitectura que evite embeber contenido incrustado.

## Activando

Por defecto la etiqueta `webview` está deshabilitada en Elctron >= 5. Usted necesita habilitar la etiqueta estableciendo la opción `webviewTag` de webPreferences cuando se construye su `BrowserWindow`. Para más información vea el [BrowserWindow constructor docs](browser-window.md).

## Descripción general

> Mostrar contenido externo de la web en un cuadro aislado y procesado.

Proceso: [Renderer](../glossary.md#renderer-process)

Usa el etiqueta de `webview` para incrustar contenido (tales como páginas web) en tu aplicación de Electron. El contenido de invitados se encuentra dentro del contenedor `webview<\0>.
Una página incrustada dentro de los controles de tu aplicación como el contenido de invitado es dispuesto y renderizado.</p>

<p>A diferencia de <code>iframe`, el `webview` se ejecuta en un proceso distinto al de tu aplicación. No tiene los mismos permisos que tu página web y todas las interacciones entre tu aplicación y el contenido incrustado será asincrónico. Esto mantiene a tu aplicación a salvo del contenido incrustado. **Note:** Muchos de los métodos en la vista web de la página anfitriona requieren una llamada sincrónica al proceso principal.

## Ejemplo

Para incrustar una página web en tu aplicación, añade la etiqueta `webview` a la página de embebido de tu aplicación (esta es la página de la aplicación que mostrará el contenido del invitado). En su manera más sencilla, la etiqueta `webview` incluye el `src` de la página web y los estilos css que controlan la apariencia de el contenedor `webview`:

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

Si tú quieres controlar el contenido de invitado de cualquier manera, puedes escribir JavaScript que escucha los eventos `webview` y responde a esos eventos usando los métodos `webview`. Aquí tenemos un código de muestra con dos detectores de eventos: uno que escucha para que la página web empiece a cargar, la otra para que la página web deje de cargar y muestre un mensaje que indique "cargando..." durante el tiempo de carga:

```html
<script>
  onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const loadstart = () => {
      indicator.innerText = 'loading...'
    }

    const loadstop = () => {
      indicator.innerText = ''
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
  }
</script>
```

## Implementación interna

Bajo la capa `webview` es implementado con [Out-of-Process iframes (OOPIFs)](https://www.chromium.org/developers/design-documents/oop-iframes). La etiqueta `webview` es esencialmente un elemento personalizado usando shadow DOM para envolver un elemento `iframe` dentro de el.

Entonces el comportamiento de `webview` es muy similar a `iframe` cross-domain, como ejemplos:

* Cuando se pulsa dentro de un `webview`, el foco de la página se moverá desde el incrustador a `webview`.
* Usted puede no agregar escuchadores de eventos de teclado, mouse y scroll a `webview`.
* Todas las reacciones entre el frame embebedor y el `webview` son asíncronas.

## Notas de Estilo CSS

Por favor tenga en cuenta que las etiquetas de estilos de `webview` usa internamente `display:flex;` para asegurar que el elemento `iframe` hijo rellena el alto y el ancho por completo de su `webview` contenedor cuando es usado con el layouts tradicionales y flexbox. Por favor no sobrescrita la propiedad CSS por defecto `display:flex;` a menos que se especifique `display:inline-flex;` para layout inline.

## Atributos de Etiqueta

La etiqueta de `webview` tiene los siguientes atributos:

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

A `String` representing the visible URL. Writing to this attribute initiates top-level navigation.

Asignarle a `src` su propio valor reiniciará la página actual.

El atributo `src` puede aceptar data de URL, como `data:text/plain,Hello, world!`.

### `no desintegración`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

A `Boolean`. When this attribute is present the guest page in `webview` will have node integration and can use node APIs like `require` and `process` to access low level system resources. Node integration is disabled by default in the guest page.

### `nodeintegrationinsubframes`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

A `Boolean` for the experimental option for enabling NodeJS support in sub-frames such as iframes inside the `webview`. Todas sus precargas se cargarán por cada iframe, pude usar `process.isMainFrame` para determinar si estás en el frame principal o no. Esta opción está deshailitada por defecto en la pagina de invitado.

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

A `Boolean`. When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](remote.md) module. The remote module is available by default.

### `complementos`

```html
<webview src="https://www.github.com/" plugins></webview>
```

A `Boolean`. When this attribute is present the guest page in `webview` will be able to use browser plugins. Plugins are disabled by default.

### `precarga`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

A `String` that specifies a script that will be loaded before other scripts run in the guest page. El protocolo de guiones de URL deben ser `file:` o `asar:`, porque será cargado por `require` en la página de invitado debajo de la capucha.

Cuando la página de invitado no tiene integración de nodo, este guión todavía tendrá acceso a todos los nodos APIs, pero los objetos globales inyectados por Nodo serán eliminados luego de que el guión haya finalizado de ejecutarse.

**Note:** This option will appear as `preloadURL` (not `preload`) in the `webPreferences` specified to the `will-attach-webview` event.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

A `String` that sets the referrer URL for the guest page.

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

A `String` that sets the user agent for the guest page before the page is navigated to. Once the page is loaded, use the `setUserAgent` method to change the user agent.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

A `Boolean`. When this attribute is present the guest page will have web security disabled. Web security is enabled by default.

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

A `String` that sets the session used by the page. Si `partition` empieza con `persist:`, la página usará una sesión persistente disponible para todas las páginas en la aplicación con la misma `partition`. si no hay un prefijo `persist:`, la página usará una sesión en memoria. Por asignar el mismo `partition`, múltiples páginas podrán compartir la misma sesión. Si la `partition` no se establece entonces la sesión por defecto de la aplicación será usada.

Este valor solo puede ser modificado antes que la primera navegación, ya que la sesión de un proceso de renderizado activo no puede cambiar. Intentos subsecuentes de modificar el valor fallarán con la excepción de DOM.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

A `Boolean`. When this attribute is present the guest page will be allowed to open new windows. Popups are disabled by default.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

A `String` which is a comma separated list of strings which specifies the web preferences to be set on the webview. La lista completa de cuerdas preferenciales soportadas puede ser encontradas en [BrowserWindow](browser-window.md#new-browserwindowoptions).

La cuerda sigue el mismo formato que las cuerdas que aparecen en `window.open`. Un nombre por sí mismo es dado a `true` por valores booleanos. Una preferencia puede ser establecida por otro valor incluyendo un `=`, seguido por el valor. Valores especiales como `yes` y `1` son interpretados como `true`, mientras que `no` y `0` son interpretados como `false`.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be enabled separated by `,`. La lista completa de cadenas características soportadas puede ser encontrada en el archivo [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be disabled separated by `,`. La lista completa de cadenas características soportadas puede ser encontrada en el archivo [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).

## Métodos

La etiqueta de `webview` tiene los siguientes métodos:

**Nota:** El elemento webview debe ser cargado antes de usar los métodos.

**Ejemplo**

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```

### `<webview>.loadURL(url[, options])`

* `url` URL
* `opciones` Object (opcional) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (opcional) - Una url HTTP de referencia.
  * `userAgent` String (opcional) - Un agente de usuario originando la solicitud.
  * `extraHeaders` String (opcional) - Encabezados extras separadas por "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (opcional)
  * `baseURLForDataURL` String (opcional) - Url base (con separadores de ruta arrastrables) para archivos que se cargan por el url de datos. Esto es necesario únicamente si el `url` especificado es un url de datos y necesita cargar otros archivos.

Devuelve `Promise<void>` - La promesa se resolverá cuando la pagina ha finalizado de cargar (ver [`did-finish-load`](webview-tag.md#event-did-finish-load)), y rechaza si la página falla al cargar (ver [`did-fail-load`](webview-tag.md#event-did-fail-load)).

Carga el `url` en el webview, el `url` debe contener el prefijo protocolo, e.g. el `http://` or `file://`.

### `<webview>.downloadURL(url)`

* `url` Cadena

Inicia una descarga del recurso en `url` sin navegar.

### `<webview>.getURL()`

Devuelve `String` - El URL de la página de invitado.

### `<webview>.getTitle()`

Devuelve `Cadena` - El título de la página de invitado.

### `<webview>.isLoading()`

Devuelve `Boolean` - Aunque la página de invitado esté cargando recursos.

### `<webview>.isLoadingMainFrame()`

Devuelve `Boolean` - Si el marco principal (y no sólo iframes o frames dentro de él) todavía está cargando.

### `<webview>.isWaitingForResponse()`

Devuelve `Boolean` - Aunque la página de invitado esté esperando por una primera respuesta de el principal recurso de la página.

### `<webview>.stop()`

Detiene cualquier navegación pendiente.

### `<webview>.reload()`

Recarga la página de invitado.

### `<webview>.reloadIgnoringCache()`

Recarga la página de invitado e ignora el caché.

### `<webview>.canGoBack()`

Devuelve `Boolean` - Aunque la página de invitado pueda retroceder.

### `<webview>.canGoForward()`

Devuelve `Boolean` - Aunque la página de invitado úeda ir hacia adelante.

### `<webview>.canGoToOffset(offset)`

* `offset` Íntegro

Devuelve `Boolean` - Aunque la página de invitado pueda ir a `offset`.

### `<webview>.clearHistory()`

Limpia el historial de navegación.

### `<webview>.goBack()`

Hace que la página de invitado vaya hacia atrás.

### `<webview>.goForward()`

Hace que la página de invitado vaya hacia adelante.

### `<webview>.goToIndex(index)`

* `index` Íntegro

Navega a el índice absoluto específico.

### `<webview>.goToOffset(offset)`

* `offset` Íntegro

Navega a la compensación especifica desde la "entrada actual".

### `<webview>.isCrashed()`

Devuelve `Boolean` - Si el proceso de renderizado ha fallado.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` cadena

Anula el agente usuario para la página de invitado.

### `<webview>.getUserAgent()`

Devuelve `String` - El agente usuario para la página de invitado.

### `<webview>.insertCSS(css)`

* `css` Cadena

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `<webview>.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

### `<webview>.removeInsertedCSS(key)`

* `llave` Cadena

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `<webview>.insertCSS(css)`.

### `<webview>.executeJavaScript(code[, userGesture])`

* `code` Cadena de caracteres
* `userGesture` Boolean (opcional) - Por defecto `false`.

Devuelve `Promise<any>` - Una promesa que resuelve con el resultado de la ejecución del código o es rechazada si el resultado del código es una promesa rechazada.

Evalúa el `código` en la página. Si `userGesture` está establecido, creará el contexto de gesto del usuario en la página. APIs de HTML como `requestFullScreen`, los cuales requieren acciones de usuario, puede tomar ventaja de esta opción para automatización.

### `<webview>.openDevTools()`

Abre una ventana de DevTools para la página de invitado.

### `<webview>.closeDevTools()`

Cierra la ventana de DevTools para la página de invitado.

### `<webview>.isDevToolsOpened()`

Devuelve `Boolean` - Aunque la página de invitado tenga una ventana de DevTools unida.

### `<webview>.isDevToolsFocused()`

Devuelve `Boolean` - Aunque la ventana de DevTools de la página de invitado esté centrada.

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Empieza inspeccionado elementos en posición (`x`, `y`) de la página de invitado.

### `<webview>.inspectSharedWorker()`

Abre el DevTools para el contexto de trabajadores compartidos presentes en la página de invitado.

### `<webview>.inspectServiceWorker()`

Abre el DevTools para el contexto del trabajador de servicio presente en la página de invitado.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Establece la página de invitado silenciada.

### `<webview>.isAudioMuted()`

Devuelve `Boolean` - Aunque a página de invitado haya sido silenciada.

### `<webview>.isCurrentlyAudible()`

Devuelve `Boolean` - Si el audio se esta reproduciendo actualmente.

### `<webview>.undo()`

Ejecuta el comando de edición `undo` en página.

### `<webview>.redo()`

Ejecuta el comando de edición `redo` en página.

### `<webview>.cut()`

Ejecuta comando de edición `cut` en página.

### `<webview>.copy()`

Ejecuta comando de edición `copy` en página.

### `<webview>.paste()`

Ejecuta el comando de edición `paste` en la página.

### `<webview>.pasteAndMatchStyle()`

Ejecuta el comando de edición `pasteAndMatchStyle` en la página.

### `<webview>.delete()`

Ejecuta el comando de edición `delete` en página.

### `<webview>.selectAll()`

Ejecuta el comando de edición `selectAll` en página.

### `<webview>.unselect()`

Ejecuta el comando de edición `unselect` en página.

### `<webview>.replace(text)`

* `texto` String

Ejecuta el comando de edición `replace` en página.

### `<webview>.replaceMisspelling(text)`

* `texto` String

Ejecuta el comando de edición `replaceMisspelling` en página.

### `<webview>.insertText(text)`

* `texto` String

Returns `Promise<void>`

Inserta `texto` en el elemento enfocado.

### `<webview>.findInPage(text[, options])`

* `text` String - El contenido para ser buscado, no debe quedar en blanco.
* `opciones` Objecto (opcional) 
  * `forward` Boolean (opcional) - Ya sea para buscar hacia adelante o hacia atrás, el valor predeterminado es `true`.
  * `findNext` Boolean (opcional) - Si la operación es la primera solicitud o un seguimiento, por defecto a `false`.
  * `matchCase` Boolean (opcional) - Si la busqueda debe ser sensible a mayúsculas, por defecto es `false`.
  * `wordStart` Boolean (opcional) - Si sólo se mira al inicio de las palabras. por defecto a `false`.
  * `medialCapitalAsWordStart` Boolean (opcional) - Cuando se combina con `wordStart`, acepta emparejar en el medio de una palabra si el emparejado comienza con un una letra mayúscula seguida por una minúscula o no letra. Acepta muchas otras coincidencias intra palabras, por defecto a `falso`.

Devuelve `Integer` - El id de la solicitud usado para la solicitud.

Empieza una solicitud para encontrar todas las coincidencias para el `text` en la página web. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.

### `<webview>.stopFindInPage(action)`

* `acción` Cadena - Especifica la acción que tendrá lugar al finalizar [`<webview>.findInPage`](#webviewfindinpagetext-options) pedido. 
  * `clearSelection` - Borrar la selección.
  * `keepSelection` - Traduce la selección en una selección normal.
  * `activateSelection` - Enfoca y hace clic en el nodo de selección.

Stops any `findInPage` request for the `webview` with the provided `action`.

### `<webview>.print([options])`

* `opciones` Objecto (opcional) 
  * `silent` Boolean (opcional) - No le pide al usuario configurar la impresora. Por defecto es `false`.
  * `printBackground` Boolean (opcional) - También imprime el color de fondo y la imagen de la página web. Por defecto es `false`.
  * `deviceName` String (opcional) - Configura el nombre de la impresora que se va a usar. Por defecto es `''`.

Returns `Promise<void>`

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options)`

* `opciones` Object 
  * `marginsType` Integer (opcional) - Especifica los tipos de margenes a usar. Usa 0 para el margen por defecto, 1 para no margen, y dos para el margen máximo.
  * `pageSize` String | Size (opcional) - Especifique el tamaño de la página del PDF Generado. Puede ser `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o un contenedor de objeto `height` y `width` en micrones.
  * `printBackground` Boolean (opcional) - Si se imprime o no el fondo CSS.
  * `printSelectionOnly` Boolean (opcional) - Si se imprime solo la selección.
  * `landscape` Boolean (opcional) - `true` for landscape, `false` for portrait.

Returns `Promise<Buffer>` - Se resuelve cuando los datos PDF son generados.

Imprime la página web de `webview` como PDF, Igual como `webContents.printToPDF(options)`.

### `<webview>.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (opcional) - El área de la página para ser capturada.

Devuelve `Promise<NativeImage>` - Resuelve con el un [NativeImage](native-image.md)

Captura una instantánea de la página dentro de `rect`. Omitiendo `rect` capturará toda la página visible.

### `<webview>.send(channel, ...args)`

* `channel` Cadena
* `...args` any[]

Returns `Promise<void>`

Envía un mensaje asincrónico al proceso de renderizado vía `channel`, también puedes mandar argumentos arbitrarios. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

See [webContents.send](web-contents.md#contentssendchannel-args) for examples.

### `<webview>.sendInputEvent(event)`

* `event` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Returns `Promise<void>`

Envía un input `event` a la página.

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventinputevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - Factor Zoom.

Cambia el factor de zoom al factor especificado. El factor de zoom es el porcentaje de zoom dividido por 100, por lo que 300% = 3.0.

### `<webview>.setZoomLevel(level)`

* `nivel` Número - Nivel de Zoom.

Cambia el nivel de zoom al nivel especificado. El tamaño original es 0 y cada incremento por encima o por debajo representa un zoom del 20% mayor o menor a los límites predeterminados de 300% y 50% del tamaño original, respectivamente. La fórmula para esto es `scale := 1.2 ^ level`.

### `<webview>.getZoomFactor()`

Devuelve `Number` - el factor de zoom actual.

### `<webview>.getZoomLevel()`

Devuelve `Number` - el nivel de zoom actual.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

Returns `Promise<void>`

Establecer el nivel de máximo y mínimo pizca de zoom.

### `<webview>.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

Returns `Promise<void>`

Establece el nivel de zoom máximo y mínimo basado en el diseño (es decir, no visual).

### `<webview>.showDefinitionForSelection()` *macOS*

Muestra el diccionario pop-up que busca la palabra seleccionada en la página.

### `<webview>.getWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents associated with this `webview`.

It depends on the [`remote`](remote.md) module, it is therefore not available when this module is disabled.

### `<webview>.getWebContentsId()`

Returns `Number` - The WebContents ID of this `webview`.

## DOM Events

The following DOM events are available to the `webview` tag:

### Event: 'load-commit'

Devuelve:

* `url` String
* `EsElFramePrincipal` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### Evento: 'did-finish-load'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

### Evento: 'did-fail-load'

Devuelve:

* `errorCode` Entero
* `errorDescription` String
* `validatedURL` String
* `EsElFramePrincipal` Boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

### Evento: 'did-frame-finish-load'

Devuelve:

* `EsElFramePrincipal` Boolean

Fired when a frame has done navigation.

### Evento: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### Evento: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### Evento: 'dom-ready'

Fired when document in the given frame is loaded.

### Evento: 'page-title-updated'

Devuelve:

* `title` String
* `explicitSet` Boolen

Disparado cuando el título de la página es establecido durante la navegación. `explicitSet` es falso cuando el título es sintetizado del archivo url.

### Evento: 'page-favicon-updated'

Devuelve:

* `favicons` Cadena[] - Arreglo para URLs.

Fired when page receives favicon urls.

### Evento: "enter-html-full-screen"

Fired when page enters fullscreen triggered by HTML API.

### Evento: "leave-html-full-screen"

Fired when page leaves fullscreen triggered by HTML API.

### Evento: 'console-message'

Devuelve:

* `level` Íntegro
* `message` String
* `line` Íntegro
* `sourceId` Cadena

Fired when the guest window logs a console message.

The following example code forwards all log messages to the embedder's console without regard for log level or other properties.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => {
  console.log('Guest page logged a message:', e.message)
})
```

### Evento: 'found-in-page'

Devuelve:

* `resultado` Objeto 
  * `requestId` Íntegro
  * `activeMatchOrdinal` Integer - Posición de la coincidencia activa.
  * `matches` Integer - Número de coincidencias.
  * `selectionArea` Rectangle - Coordinates of first match region.
  * `finalUpdate` Boolean

Fired when a result is available for [`webview.findInPage`](#webviewfindinpagetext-options) request.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('found-in-page', (e) => {
  webview.stopFindInPage('keepSelection')
})

const requestId = webview.findInPage('test')
console.log(requestId)
```

### Evento: 'new-window'

Devuelve:

* `url` String
* `frameName` String
* `disposition` String - Puede ser `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
* `options` BrowserWindowConstructorOptions - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.

```javascript
const { shell } = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', async (e) => {
  const protocol = require('url').parse(e.url).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    await shell.openExternal(e.url)
  }
})
```

### Evento: 'will-navigate'

Devuelve:

* `url` String

Emitido cuando un usuario o la página quiere iniciar la navegación. Puede suceder cuando el objeto `window.location` es cambiado o un usuario hace click en un link de la página.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does **NOT** have any effect.

### Evento: 'did-navigate'

Devuelve:

* `url` String

Emitted when a navigation is done.

Este evento no es emitido para navegaciones dentro de la página, como hacerle click a links o actualizando `window.location.hash`. Usa el evento `did-navigate-in-page` para este propósito.

### Evento: 'did-navigate-in-page'

Devuelve:

* `EsElFramePrincipal` Boolean
* `url` String

Emitted when an in-page navigation happened.

Cuando una navegación dentro de la página sucede, el URL de la página cambia, pero no causa una navegación fuera de la página. Ejemplos de ésto ocurriendo son cuando los links son clickeados o cuando el evento DOM `hashchange` es activado.

### Evento: "close"

Fired when the guest page attempts to close itself.

The following example code navigates the `webview` to `about:blank` when the guest attempts to close itself.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```

### Evento: 'ipc-message'

Devuelve:

* `channel` Cadena
* `args` any[]

Fired when the guest page has sent an asynchronous message to embedder page.

With `sendToHost` method and `ipc-message` event you can communicate between guest page and embedder page:

```javascript
// In embedder page.
const webview = document.querySelector('webview')
webview.addEventListener('ipc-message', (event) => {
  console.log(event.channel)
  // Prints "pong"
})
webview.send('ping')
```

```javascript
// En la página de invitado.
const { ipcRenderer } = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

### Evento: 'crashed'

Fired when the renderer process is crashed.

### Evento: 'plugin-crashed'

Devuelve:

* `name` String
* `version` Cadena

Fired when a plugin process is crashed.

### Evento: 'destroyed'

Fired when the WebContents is destroyed.

### Evento: 'media-started-playing'

Emitido cuando la media empieza a reproducirse.

### Evento: 'media-paused'

Emitido cuando la media es pausada o ha terminado de reproducirse.

### Evento: 'did-change-theme-color'

Devuelve:

* `themeColor` String

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

### Evento: 'update-target-url'

Devuelve:

* `url` String

Emitido cuando el mouse se mueve sobre un link o el teclado se mueve el concentrado a un link.

### Evento: 'devtools-opened'

Emitido cuando DevTools es abierto.

### Evento: 'devtools-closed'

Emitido cuando Devtools es cerrado.

### Evento: 'devtools-focused'

Emitido cuando DevTools es centrado o abierto.