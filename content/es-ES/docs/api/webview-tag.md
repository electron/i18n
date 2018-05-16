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

### `precargado`

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
<webview src="https://electronjs.org" partition="electron"></webview>
```

Establece la sesión usada por la página. Si `partition` empieza con `persist:`, la página usará una sesión persistente disponible para todas las páginas en la aplicación con la misma `partition`. si no está el prefijo `persist:`, la página usara una sesión de la memoria interna. Al asignar la misma `partition`, las páginas múltiples pueden compartir la misma sesión. Si la `partition` no se establece entonces la sesión por defecto de la aplicación será usada.

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
* `opciones` Objecto (opcional) 
  * `httpReferrer` String (opcional) - Un url de HTTP referencial.
  * `userAgent` String (opcional) - Un agente de usuario originando el pedido.
  * `extraHeaders` String (opcional) - Encabezados extras separadas por "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (optional) -
  * `baseURLForDataURL` String (opcional) - Url base (con separadores de ruta arrastrables) para archivos que se cargan por el url de datos. Esto es necesario únicamente si el `url` especificado es un url de datos y necesita cargar otros archivos.

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

Borra el historial de navegación.

### `<webview>.goBack()`

Hace que la página de invitado vaya hacia atrás.

### `<webview>.goForward()`

Hace que la página de invitado vaya hacia adelante.

### `<webview>.goToIndex(index)`

* `index` Íntegro

Navega a el índice absoluto específico.

### `<webview>.goToOffset(offset)`

* `offset` Íntegro

Navega hacia el offset especificado desde "la entrada actual".

### `<webview>.isCrashed()`

Devuelve `Boolean` - Si el proceso de renderizado ha fallado.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` cadena

Anula el agente usuario para la página de invitado.

### `<webview>.getUserAgent()`

Devuelve `String` - El agente usuario para la página de invitado.

### `<webview>.insertCSS(css)`

* `css` Cadena

Inyecta CSS en la página de invitado.

### `<webview>.executeJavaScript(code[, userGesture, callback])`

* `codigo` String
* `userGesture` Boolean (optional) - Default `false`.
* `callback` Function (opcional) - Es llamado luego de que se haya ejecutado el script. 
  * `resultado` Cualquiera

Evalúa el `code` en la página. Si `userGesture` está establecido, creará el contexto de gesto del usuario en la página. APIs de HTML como `requestFullScreen`, los cuales requieren acciones de usuario, puede tomar ventaja de esta opción para automatización.

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

* `texto` Cadena

Ejecuta el comando de edición `replace` en página.

### `<webview>.replaceMisspelling(text)`

* `texto` String

Ejecuta el comando de edición `replaceMisspelling` en página.

### `<webview>.insertText(text)`

* `texto` String

Inserta `text` al elemento enfocado.

### `<webview>.findInPage(text[, options])`

* `text` String - El contenido para ser buscado, no debe quedar en blanco.
* `opciones` Object (opcional) 
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Acepta muchas otras coincidencias intra palabras, por defecto a `falso`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.

### `<webview>.stopFindInPage(action)`

* `acción` String - Especifica la acción que se llevará a cabo cuando finalice [`<webview>.findInPage`](#webviewfindinpagetext-options) request. 
  * `clearSelection` - Borrar la selección.
  * `keepSelection` - Traduce la selección en una selección normal.
  * `activateSelection` - Enfoca y hace clic en el nodo de selección.

Stops any `findInPage` request for the `webview` with the provided `action`.

### `<webview>.print([options])`

* `opciones` Object (opcional) 
  * `silent` Boolean (opcional) - No le pide al usuario configurar la impresora. Por defecto es `false`.
  * `printBackground` Boolean (opcional) - También imprime el color de fondo y la imagen de la página web. Por defecto es `false`.
  * `deviceName` String (opcional) - Configura el nombre de la impresora que se va a usar. Por defecto es `''`.

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options, callback)`

* `opciones` Object 
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String (optional) - Specify page size of the generated PDF. Puede ser `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o un objeto que contenga `height` y `width` en micron.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
* `callback` Function 
  * `error` Error
  * `data` Buffer

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options, callback)`.

### `<webview>.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured.
* `callback` Function 
  * `image` [NativeImage](native-image.md)

Captures a snapshot of the `webview`'s page. Same as `webContents.capturePage([rect, ]callback)`.

### `<webview>.send(channel[, arg1][, arg2][, ...])`

* `channel` Cadena
* `...args` any[]

Envía un mensaje asincrónico al proceso de renderizado vía `channel`, también puedes mandar argumentos arbitrarios. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

See [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) for examples.

### `<webview>.sendInputEvent(event)`

* `event` Objeto

Sends an input `event` to the page.

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - Zoom factor.

Cambia el factor zoom al factor especificado. El factor zoom es el porcentaje de zoom dividido por 100, por lo que 300% = 3.0.

### `<webview>.setZoomLevel(level)`

* `level` Number - Zoom level.

Cambia el nivel de zoom al nivel especificado. El tamaño original es 0 y cada incremento por encima o por debajo representa un zoom del 20% mayor o menor a los límites predeterminados de 300% y 50% del tamaño original, respectivamente.

### `<webview>.showDefinitionForSelection()` *macOS*

Muestra un diccionario que busca la palabra seleccionada en la página.

### `<webview>.getWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents associated with this `webview`.

## Eventos DOM

The following DOM events are available to the `webview` tag:

### Evento: 'load-commit'

Devuelve:

* `url` Cadena
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

### Evento: 'did-get-response-details'

Devuelve:

* `status` Boolean
* `newURL` String
* `originalURL` String
* `httpResponseCode` Entero
* `requestMethod` String
* `referrer` Cadena
* `headers` Objeto
* `resourceType` String

Fired when details regarding a requested resource is available. `status` indicates socket connection to download the resource.

### Evento: 'did-get-redirect-request'

Devuelve:

* `viejoURL` String
* `newURL` String
* `isMainFrame` Boolean

Fired when a redirect was received while requesting a resource.

### Evento: 'dom-ready'

Fired when document in the given frame is loaded.

### Evento: "page-title-updated"

Devuelve:

* `title` Cadena
* `explicitSet` Boolen

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

### Evento: 'page-favicon-updated'

Devuelve:

* `favicons` String[] - matriz de URLs.

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

* `resultado` Object 
  * `requestId` Íntegro
  * `activeMatchOrdinal` Integer - Posición de la coincidencia activa.
  * `matches` Integer - Número de coincidencias.
  * `selectionArea` Object - Coordenadas del lugar de la primera coincidencia.
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

* `url` Cadena
* `frameName` Cadena
* `disposition` String - Puede ser `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
* `options` Object - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

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

### Evento: 'will-navigate'

Devuelve:

* `url` String

Emitido cuando un usuario o la página quiere iniciar la navegación. Puede suceder cuando el objeto `window.location` es cambiado o un usuario hace click en un link de la página.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does **NOT** have any effect.

### Evento: 'did-navigate'

Devuelve:

* `url` Cadena

Emitido cuando la navegación es finalizada.

Este evento no es emitido para navegaciones dentro de la página, como hacerle click a links o actualizando `window.location.hash`. Usa el evento `did-navigate-in-page` para este propósito.

### Evento: 'did-navigate-in-page'

Devuelve:

* `isMainFrame` Boolean
* `url` String

Emitido cuando una navegación dentro de la página sucede.

Cuando una navegación dentro de la página sucede, el URL de la página cambia, pero no causa una navegación fuera de la página. Ejemplos de esto ocurriendo son cuando los links son clickeados o cuando el evento DOM `hashchange` es activado.

### Evento: 'close'

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
* `args` Arreglo

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
// En la página de invitado.
const {ipcRenderer} = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

### Evento: 'crashed'

Fired when the renderer process is crashed.

### Evento: 'gpu-crashed'

Fired when the gpu process is crashed.

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

* `themeColor` Cadena

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

### Evento: 'update-target-url'

Devuelve:

* `url` Cadena

Emitido cuando el mouse se mueve sobre un link o el teclado se mueve el concentrado a un link.

### Evento: 'devtools-opened'

Emitido cuando DevTools es abierto.

### Evento: 'devtools-closed'

Emitido cuando DevTools es cerrado.

### Evento: 'devtools-focused'

Emitido cuando DevTools es centrado o abierto.