# `<webview>` Etiqueta

> Mostrar contenido externo de la web en un cuadro aislado y procesado.

Proceso: [Renderer](../tutorial/quick-start.md#renderer-process)

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

## Notas de Estilo CCS

Por favor nota que el estilo de etiqueta `webview` usa `display:flex;` internamente para asegurar que el menor elemento de `object` llene el alto y ancho completo de su contenedor `webview` cuando se usa con diseños tradicionales y de flexbox (desde la v0.36.11). Por favor, no sobrescribir el por defecto propiedad de CSS `display:flex;`, a menos que se especifique `display:inline-flex;` para el diseño entre líneas.

`webview` tiene problemas siendo escondido usando el atributo `hidden` o usando `display: none;`. Puede causar comportamiento de traducción inusual dentro de su menor objeto `browserplugin` y la página web es recargada cuando el `webview` no es escondido. El acercamiento recomendado es esconder el `webview` usando `visibility: hidden`.

```html
<style>
  webview {
    display:inline-flex;
    width:640px;
    height:480px;
  }
  webview.hide {
    visibility: hidden;
  }
</style>
```

## Atributos de Etiqueta

La etiqueta de `webview` tiene los siguientes atributos:

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

Regresa el URL visible. Escribir a este atributo inicia un alto nivel de navegación.

Asignarle a `src` su propio valor reiniciará la página actual.

El atributo `src` puede aceptar data de URL, como `data:text/plain,Hello, world!`.

### `auto Ajustar`

```html
<webview src="https://www.github.com/" autosize minwidth="576" minheight="432"></webview>
```

Cuando este atributo está presente, el contenedor `webview` se reajustará automáticamente dentro de los límites establecidos por los atributos `minwidth`, `minheight`, `maxwidth`, y `maxheight`. Estas restricciones no impactan el `webview` a menos que `autosize` sea activada. Cuando `autosize` es activada, el tamaño del contenedor `webview` no puede ser menos que los valores mínimos o mayor que el máximo.

### `no desintegración`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

Cuando este atributo esté presente, la página de invitado en `webview` tendrá integración de nodo y puede usar nodos APIs como `require` y `process` para acceder a bajos niveles de recursos de sistemas. La integración de nodo está desactivada por defecto en la página de invitado.

### `complementos`

```html
<webview src="https://www.github.com/" plugins></webview>
```

Cuando este atributo está presente, la página de invitado en `webview` podrá usar complementos del buscador. Los complementos están desactivados por defecto.

### `precarga`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

Especifica un guión que será cargado antes que otros guiones sean ejecutados en la página de invitado. El protocolo de guiones de URL deben ser `file:` o `asar:`, porque será cargado por `require` en la página de invitado debajo de la capucha.

Cuando la página de invitado no tiene integración de nodo, este guión todavía tendrá acceso a todos los nodos APIs, pero los objetos globales inyectados por Nodo serán eliminados luego de que el guión haya finalizado de ejecutarse.

**Note:** Esta opción aparecerá como `preloadURL` (not `preload`) en el evento `webPreferences`, específicamente al evento `will-attach-webview`.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

Establece el URL de referencia para la página de invitado.

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

Establece el agente de usuario para la página de invitado antes que la página sea navegada a eso. Una vez que la página sea cargada, usa el método `setUserAgent` para cambiar el agente de usuario.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

Cuando este atributo está presente, la página de invitado tendrá la seguridad web desactivada. La seguridad web está activada por defecto.

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electron.atom.io" partition="electron"></webview>
```

Establece la sesión usada por la página. Si `partition` empieza con `persist:`, la página usará una sesión persistente disponible para todas las páginas en la aplicación con la misma `partition`. si no hay un prefijo `persist:`, la página usará una sesión en memoria. Por asignar el mismo `partition`, múltiples páginas podrán compartir la misma sesión. Si la `partition` no se establece entonces la sesión por defecto de la aplicación será usada.

Este valor solo puede ser modificado antes que la primera navegación, ya que la sesión de un proceso de renderizado activo no puede cambiar. Intentos subsecuentes de modificar el valor fallarán con la excepción de DOM.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

Cuando este atributo está presente, la página de invitados tendrá permitido abrir nuevas ventanas. Las ventanas emergentes están desactivadas por defecto.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

Una lista de cuerdas que especifica la preferencias de la web para ser colocados en la vista de la web, separado por `,`. La lista completa de cuerdas preferenciales soportadas puede ser encontradas en [BrowserWindow](browser-window.md#new-browserwindowoptions).

La cuerda sigue el mismo formato que las cuerdas que aparecen en `window.open`. Un nombre por sí mismo es dado a `true` por valores booleanos. Una preferencia puede ser establecida por otro valor incluyendo un `=`, seguido por el valor. Valores especiales como `yes` y `1` son interpretados como `true`, mientras que `no` y `` son interpretados como `false`.

### `blinkfeatures`

```html
<webview src="https://www.github.com/" blinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Una lista de cadenas que especifican las preferencias de blink para ser activadas, separadas por `,`. La lista completa de cadenas características soportadas puede ser encontrada en el archivo [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62).

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Una lista de cadenas que especifican las cadenas de blink para ser desactivadas, separadas por `,`. La lista completa de cadenas características soportadas puede ser encontrada en el archivo [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62).

### `guestinstance`

```html
<webview src="https://www.github.com/" guestinstance="3"></webview>
```

Un valor que conecta el webview a un contenido de web especifico. Cuando una vista de web primero carga, un nuevo contenido de web es creado y este atributo está establecido para su identificador ejemplo. Ajustar este atributo en un nuevo o existente webview lo conecta a el contenido de web existente que actualmente renderiza en un webview diferente.

El webview existente verá el evento `destruir` y entonces creará un nuevo contenido web cuando un nuevo url es cargado.

### `disableguestresize`

```html
<webview src="https://www.github.com/" disableguestresize></webview>
```

Cuando este atributo es presentado, el contenido `webview` será prevenido de reajustarse cuando el elemento `webview` es reajustado por sí mismo.

Esto puede ser usado en combinación con [`webContents.setSize`](web-contents.md#contentssetsizeoptions) para reajustar manualmente el contenido web en reacción con un cambio de tamaño de una cadena. Esto puede hacer que el reajuste sea más rápido en comparación a confiar en que el elemento del webview se reajuste automáticamente.

```javascript
const {webContents} = require('electron')

// Asumimos que `ganar` apunta al ejemplo `BrowserWindow` conteniendo un 
// `<webview>` con `disableguestresize`.

win.on('resize', () => {
  const [width, height] = win.getContentSize()
  for (let wc of webContents.getAllWebContents()) {
    // Revisa si `wc` pertenece a un webview en la ventana `ganar`.
    si (wc.hostWebContents &&
        wc.hostWebContents.id === win.webContents.id) {
      wc.setSize({
        normal: {
          width: width,
          height: height
        }
      })
    }
  }
})
```

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
* `options` Objecto (opcional) 
  * `httpReferrer` Cadena (opcional) - Un url de HTTP referencial.
  * `userAgent` Cadena (opcional) - Un agente de usuario originando el pedido.
  * `extraHeaders` Cadena (opcional) - Encabezados extras separados por "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) - (opcional)
  * `baseURLForDataURL` Cadena (opcional) - url base (con arrastrar separadores de camino) para archivos a ser cargados por la data del url. Esto es necesitado únicamente si el `url` especificado es data de url y necesia cargar otros archivos.

Carga el `url` en el webview, el `url` debe contener el prefijo protocolo, e.g. el `http://` or `file://`.

### `<webview>.getURL()`

Devuelve `String` - El URL de la página de invitado.

### `<webview>.getTitle()`

Devuelve `Cadena` - El título de la página de invitado.

### `<webview>.isLoading()`

Devuelve `Boolean` - Aunque la página de invitado esté cargando recursos.

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

Devuelve `Boolean` - Aunque el proceso del renderizador se haya arruinado.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` cadena

Anula el agente usuario para la página de invitado.

### `<webview>.getUserAgent()`

Devuelve `String` - El agente usuario para la página de invitado.

### `<webview>.insertCSS(css)`

* `css` Cadena

Inyecta CSS en la página de invitado.

### `<webview>.executeJavaScript(code, userGesture, callback)`

* `codigo` String
* `userGesture` Boolean - Por defecto `false`.
* `llamada de vuelta` Función (opcional) - La llamada luego del guión ha sido ejecutada. 
  * `result` Cuaquiera

Evaluar `code` en la página. Si `userGesture` está establecido, creará el contexto de gesto del usuario en la página. APIs de HTML como `requestFullScreen`, los cuales requieren acciones de usuario, puede tomar ventaja de esta opción para automatización.

### `<webview>.openDevTools()`

Abre una ventana de DevTools para la página de invitado.

### `<webview>.closeDevTools()`

Cierra la ventana de DevTools para la página de invitado.

### `<webview>.isDevToolsOpened()`

Devuelve `Boolean` - Aunque la página de invitado tenga una ventana de DevTools unida.

### `<webview>.isDevToolsFocused()`

Devuelve `Boolean` - Aunque la ventana de DevTools de la página de invitado esté centrada.

### `<webview>.inspectElement(x, y)`

* `x` Íntegro
* `y` Íntegro

Empieza inspeccionado elementos en posición (`x`, `y`) de la página de invitado.

### `<webview>.inspectServiceWorker()`

Abre el DevTools para el contexto del trabajador de servicio presente en la página de invitado.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Establece la página de invitado silenciada.

### `<webview>.isAudioMuted()`

Devuelve `Boolean` - Aunque a página de invitado haya sido silenciada.

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

* `texto` Cadena

Ejecuta el comando de edición `replaceMisspelling` en página.

### `<webview>.insertText(text)`

* `texto` Cadena

Inserta `texto` al elemento centrado.

### `<webview>.findInPage(text[, options])`

* `text` Cadena - Contenido para ser buscado, no debe ser vaciado.
* `options` Objecto (opcional) 
  * `forward` Boolean - (opcional) Aunque busques adelante o hacia atrás, por defecto a `true`.
  * `findNext` Boolean - (opcional) Aunque la operación sea primero pedida o seguida por defecto a `false`.
  * `matchCase` Boolean - (opcional) Aunque la búsqueda deba ser sensible a letra, por defecto a `false`.
  * `wordStart` Boolean - (opcional) Aunque mires solo al principio de las palabras.. Por defecto a `falso`.
  * `medialCapitalAsWordStart` Boolean - (opcional) Cuando Combinas con`wordStart`, acepta un partido en la mitad d una palabra si el partido comienza con una letra mayúscula seguida por un símbolo, no letra, minúscula. Acepta muchas otras coincidencias intra palabras, por defecto a `falso`.

Empieza un pedido para encontrar todas las coincidencias para el `text` en la página web y devuelve un `Integer` representando id pedido para la solicitud. El resultado del pedido puede ser obtenido al subscribirse al evento [`found-in-page`](webview-tag.md#event-found-in-page).

### `<webview>.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`<webview>.findInPage`](webview-tag.md#webviewtagfindinpage) request. 
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webview` with the provided `action`.

### `<webview>.print([options])`

* `options` Objecto (opcional) 
  * `silent` Boolean (optional) - Don't ask user for print settings. Default is `false`.
  * `printBackground` Boolean (optional) - Also prints the background color and image of the web page. Default is `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Default is `''`.

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options, callback)`

* `options` Object 
  * `marginsType` Integer - (optional) Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String - (optional) Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
  * `printBackground` Boolean - (optional) Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean - (optional) Whether to print selection only.
  * `landscape` Boolean - (optional) `true` for landscape, `false` for portrait.
* `llamada de vuelta` Función 
  * `error` Error
  * `data` Buffer

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options, callback)`.

### `<webview>.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured
* `llamada de vuelta` Función 
  * `image` [NativeImage](native-image.md)

Captures a snapshot of the `webview`'s page. Same as `webContents.capturePage([rect, ]callback)`.

### `<webview>.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. The renderer process can handle the message by listening to the `channel` event with the `ipcRenderer` module.

See [webContents.send](web-contents.md#webcontentssendchannel-args) for examples.

### `<webview>.sendInputEvent(event)`

* `event` Object

Sends an input `event` to the page.

See [webContents.sendInputEvent](web-contents.md#webcontentssendinputeventevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - Zoom factor.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

### `<webview>.setZoomLevel(level)`

* `level` Number - Zoom level

Changes the zoom level to the specified level. The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively.

### `<webview>.showDefinitionForSelection()` *macOS*

Shows pop-up dictionary that searches the selected word on the page.

### `<webview>.getWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents associated with this `webview`.

## DOM events

The following DOM events are available to the `webview` tag:

### Event: 'load-commit'

Devuelve:

* `url` String
* `isMainFrame` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### Event: 'did-finish-load'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

### Event: 'did-fail-load'

Devuelve:

* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

### Event: 'did-frame-finish-load'

Devuelve:

* `isMainFrame` Boolean

Fired when a frame has done navigation.

### Event: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### Event: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### Event: 'did-get-response-details'

Devuelve:

* `status` Boolean
* `newURL` String
* `originalURL` String
* `httpResponseCode` Integer
* `requestMethod` String
* `referrer` String
* `headers` Object
* `resourceType` String

Fired when details regarding a requested resource is available. `status` indicates socket connection to download the resource.

### Event: 'did-get-redirect-request'

Devuelve:

* `oldURL` String
* `newURL` String
* `isMainFrame` Boolean

Fired when a redirect was received while requesting a resource.

### Event: 'dom-ready'

Fired when document in the given frame is loaded.

### Event: 'page-title-updated'

Devuelve:

* `title` String
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

### Event: 'page-favicon-updated'

Devuelve:

* `favicons` String[] - Array of URLs.

Fired when page receives favicon urls.

### Event: 'enter-html-full-screen'

Fired when page enters fullscreen triggered by HTML API.

### Event: 'leave-html-full-screen'

Fired when page leaves fullscreen triggered by HTML API.

### Event: 'console-message'

Devuelve:

* `level` Integer
* `message` String
* `line` Integer
* `sourceId` String

Fired when the guest window logs a console message.

The following example code forwards all log messages to the embedder's console without regard for log level or other properties.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => {
  console.log('Guest page logged a message:', e.message)
})
```

### Event: 'found-in-page'

Devuelve:

* `result` Object 
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Position of the active match.
  * `matches` Integer - Number of Matches.
  * `selectionArea` Object - Coordinates of first match region.
  * `finalUpdate` Boolean

Fired when a result is available for [`webview.findInPage`](webview-tag.md#webviewtagfindinpage) request.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('found-in-page', (e) => {
  webview.stopFindInPage('keepSelection')
})

const requestId = webview.findInPage('test')
console.log(requestId)
```

### Event: 'new-window'

Devuelve:

* `url` String
* `frameName` String
* `disposition` String - Can be `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
* `options` Object - The options which should be used for creating the new `BrowserWindow`.

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.

```javascript
const {shell} = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', (e) => {
  const protocol = require('url').parse(e.url).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    shell.openExternal(e.url)
  }
})
```

### Event: 'will-navigate'

Devuelve:

* `url` String

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does **NOT** have any effect.

### Event: 'did-navigate'

Devuelve:

* `url` String

Emitted when a navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

### Event: 'did-navigate-in-page'

Devuelve:

* `isMainFrame` Boolean
* `url` String

Emitted when an in-page navigation happened.

When in-page navigation happens, the page URL changes but does not cause navigation outside of the page. Examples of this occurring are when anchor links are clicked or when the DOM `hashchange` event is triggered.

### Event: 'close'

Fired when the guest page attempts to close itself.

The following example code navigates the `webview` to `about:blank` when the guest attempts to close itself.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```

### Event: 'ipc-message'

Devuelve:

* `channel` String
* `args` Array

Fired when the guest page has sent an asynchronous message to embedder page.

With `sendToHost` method and `ipc-message` event you can easily communicate between guest page and embedder page:

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
// In guest page.
const {ipcRenderer} = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

### Event: 'crashed'

Fired when the renderer process is crashed.

### Event: 'gpu-crashed'

Fired when the gpu process is crashed.

### Event: 'plugin-crashed'

Devuelve:

* `name` String
* `version` String

Fired when a plugin process is crashed.

### Event: 'destroyed'

Fired when the WebContents is destroyed.

### Event: 'media-started-playing'

Emitted when media starts playing.

### Event: 'media-paused'

Emitted when media is paused or done playing.

### Event: 'did-change-theme-color'

Devuelve:

* `themeColor` String

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

### Event: 'update-target-url'

Devuelve:

* `url` String

Emitted when mouse moves over a link or the keyboard moves the focus to a link.

### Event: 'devtools-opened'

Emitted when DevTools is opened.

### Event: 'devtools-closed'

Emitted when DevTools is closed.

### Event: 'devtools-focused'

Emitted when DevTools is focused / opened.