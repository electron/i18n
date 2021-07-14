# `<webview>` Etiqueta

## Warning

Electron's `webview` tag is based on [Chromium's `webview`][chrome-webview], which is undergoing dramatic architectural changes. This impacts the stability of `webviews`, including rendering, navigation, and event routing. We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, [Electron's `BrowserView`](browser-view.md), or an architecture that avoids embedded content altogether.

## Enabling

By default the `webview` tag is disabled in Electron >= 5.  You need to enable the tag by setting the `webviewTag` webPreferences option when constructing your `BrowserWindow`. For more information see the [BrowserWindow constructor docs](browser-window.md).

## Descripción general

> Display external web content in an isolated frame and process.

Proceso: [Renderer](../glossary.md#renderer-process)

Use the `webview` tag to embed 'guest' content (such as web pages) in your Electron app. The guest content is contained within the `webview` container. An embedded page within your app controls how the guest content is laid out and rendered.

Unlike an `iframe`, the `webview` runs in a separate process than your app. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content. **Note:** Most methods called on the webview from the host page require a synchronous call to the main process.

## Ejemplo

To embed a web page in your app, add the `webview` tag to your app's embedder page (this is the app page that will display the guest content). In its simplest form, the `webview` tag includes the `src` of the web page and css styles that control the appearance of the `webview` container:

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

If you want to control the guest content in any way, you can write JavaScript that listens for `webview` events and responds to those events using the `webview` methods. Here's sample code with two event listeners: one that listens for the web page to start loading, the other for the web page to stop loading, and displays a "loading..." message during the load time:

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

## Internal implementation

Under the hood `webview` is implemented with [Out-of-Process iframes (OOPIFs)](https://www.chromium.org/developers/design-documents/oop-iframes). The `webview` tag is essentially a custom element using shadow DOM to wrap an `iframe` element inside it.

So the behavior of `webview` is very similar to a cross-domain `iframe`, as examples:

* When clicking into a `webview`, the page focus will move from the embedder frame to `webview`.
* You can not add keyboard, mouse, and scroll event listeners to `webview`.
* All reactions between the embedder frame and `webview` are asynchronous.

## CSS Styling Notes

Please note that the `webview` tag's style uses `display:flex;` internally to ensure the child `iframe` element fills the full height and width of its `webview` container when used with traditional and flexbox layouts. Please do not overwrite the default `display:flex;` CSS property, unless specifying `display:inline-flex;` for inline layout.

## Tag Attributes

The `webview` tag has the following attributes:

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

A `String` representing the visible URL. Writing to this attribute initiates top-level navigation.

Assigning `src` its own value will reload the current page.

The `src` attribute can also accept data URLs, such as `data:text/plain,Hello, world!`.

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

Un `Boolean`. When this attribute is present the guest page in `webview` will have node integration and can use node APIs like `require` and `process` to access low level system resources. Node integration is disabled by default in the guest page.

### `nodeintegrationinsubframes`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

A `Boolean` for the experimental option for enabling NodeJS support in sub-frames such as iframes inside the `webview`. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not. This option is disabled by default in the guest page.

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Un `Boolean`. When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](remote.md) module. The remote module is unavailable by default.

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

Un `Boolean`. When this attribute is present the guest page in `webview` will be able to use browser plugins. Plugins are disabled by default.

### `preload`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

A `String` that specifies a script that will be loaded before other scripts run in the guest page. The protocol of script's URL must be either `file:` or `asar:`, because it will be loaded by `require` in guest page under the hood.

When the guest page doesn't have node integration this script will still have access to all Node APIs, but global objects injected by Node will be deleted after this script has finished executing.

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

Un `Boolean`. When this attribute is present the guest page will have web security disabled. Web security is enabled by default.

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

A `String` that sets the session used by the page. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. if there is no `persist:` prefix, the page will use an in-memory session. Al asignar la misma `partition`, las páginas múltiples pueden compartir la misma sesión. If the `partition` is unset then default session of the app will be used.

This value can only be modified before the first navigation, since the session of an active renderer process cannot change. Subsequent attempts to modify the value will fail with a DOM exception.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

Un `Boolean`. When this attribute is present the guest page will be allowed to open new windows. Popups are disabled by default.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

A `String` which is a comma separated list of strings which specifies the web preferences to be set on the webview. The full list of supported preference strings can be found in [BrowserWindow](browser-window.md#new-browserwindowoptions).

The string follows the same format as the features string in `window.open`. A name by itself is given a `true` boolean value. A preference can be set to another value by including an `=`, followed by the value. Special values `yes` and `1` are interpreted as `true`, while `no` and `0` are interpreted as `false`.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be enabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5][runtime-enabled-features] file.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be disabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5][runtime-enabled-features] file.

## Métodos

The `webview` tag has the following methods:

**Note:** The webview element must be loaded before using the methods.

**Ejemplo**

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```

### `<webview>.loadURL(url[, options])`

* `url` URL
* `options` Object (opcional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (opcional) - Una url HTTP Referencia.
  * `userAgent` Cadena (opcional) - Un agente de usuario originando el pedido.
  * `extraHeaders` Cadena (opcional) - Encabezados extras separados por "\n"
  * `postData` ([UploadRawData](structures/upload-raw-data.md) | [UploadFile](structures/upload-file.md))[] (optional)
  * `baseURLForDataURL` String (opcional) - Url base (con separadores de ruta arrastrables) para archivos que se cargan por el url de datos. Esto es necesario únicamente si el `url` especificado es un url de datos y necesita cargar otros archivos.

Returns `Promise<void>` - The promise will resolve when the page has finished loading (see [`did-finish-load`](webview-tag.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](webview-tag.md#event-did-fail-load)).

Loads the `url` in the webview, the `url` must contain the protocol prefix, e.g. the `http://` or `file://`.

### `<webview>.downloadURL(url)`

* `url` String

Inicia una descarga del recurso en `url` sin navegar.

### `<webview>.getURL()`

Returns `String` - The URL of guest page.

### `<webview>.getTitle()`

Returns `String` - The title of guest page.

### `<webview>.isLoading()`

Returns `Boolean` - Whether guest page is still loading resources.

### `<webview>.isLoadingMainFrame()`

Devuelve `Boolean` - Si el marco principal (y no sólo iframes o frames dentro de él) todavía está cargando.

### `<webview>.isWaitingForResponse()`

Returns `Boolean` - Whether the guest page is waiting for a first-response for the main resource of the page.

### `<webview>.stop()`

Detiene cualquier navegación pendiente.

### `<webview>.reload()`

Reloads the guest page.

### `<webview>.reloadIgnoringCache()`

Reloads the guest page and ignores cache.

### `<webview>.canGoBack()`

Returns `Boolean` - Whether the guest page can go back.

### `<webview>.canGoForward()`

Returns `Boolean` - Whether the guest page can go forward.

### `<webview>.canGoToOffset(offset)`

* `offset` Íntegro

Returns `Boolean` - Whether the guest page can go to `offset`.

### `<webview>.clearHistory()`

Borra el historial de navegación.

### `<webview>.goBack()`

Makes the guest page go back.

### `<webview>.goForward()`

Makes the guest page go forward.

### `<webview>.goToIndex(index)`

* `index` Íntegro

Navigates to the specified absolute index.

### `<webview>.goToOffset(offset)`

* `offset` Íntegro

Navega hacia el offset especificado desde "la entrada actual".

### `<webview>.isCrashed()`

Devuelve `Boolean` - Si el proceso de renderizado ha fallado.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` cadena

Overrides the user agent for the guest page.

### `<webview>.getUserAgent()`

Returns `String` - The user agent for guest page.

### `<webview>.insertCSS(css)`

* `css` Cadena

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `<webview>.removeInsertedCSS(key)`.

Inyecta CSS en la página web actual y devuelve un identificador único para la hoja de estilo insertada.

### `<webview>.removeInsertedCSS(key)`

* `key` String

Devuelve `Promise<void>` - Resuelve si la eliminación fue exitosa.

Elimina el CSS insertado desde la página web actual. The stylesheet is identified by its key, which is returned from `<webview>.insertCSS(css)`.

### `<webview>.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (optional) - Default `false`.

Devuelve `Promise<any>` - Una promesa que resuelve con el resultado de la ejecución del código o es rechazada si el resultado del código es una promesa rechazada.

Evalúa el `código` en la página. If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen`, which require user action, can take advantage of this option for automation.

### `<webview>.openDevTools()`

Opens a DevTools window for guest page.

### `<webview>.closeDevTools()`

Closes the DevTools window of guest page.

### `<webview>.isDevToolsOpened()`

Returns `Boolean` - Whether guest page has a DevTools window attached.

### `<webview>.isDevToolsFocused()`

Returns `Boolean` - Whether DevTools window of guest page is focused.

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`) of guest page.

### `<webview>.inspectSharedWorker()`

Opens the DevTools for the shared worker context present in the guest page.

### `<webview>.inspectServiceWorker()`

Opens the DevTools for the service worker context present in the guest page.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Set guest page muted.

### `<webview>.isAudioMuted()`

Returns `Boolean` - Whether guest page has been muted.

### `<webview>.isCurrentlyAudible()`

Devuelve `Boolean` - Si el audio se esta reproduciendo actualmente.

### `<webview>.undo()`

Executes editing command `undo` in page.

### `<webview>.redo()`

Executes editing command `redo` in page.

### `<webview>.cut()`

Executes editing command `cut` in page.

### `<webview>.copy()`

Executes editing command `copy` in page.

### `<webview>.paste()`

Executes editing command `paste` in page.

### `<webview>.pasteAndMatchStyle()`

Executes editing command `pasteAndMatchStyle` in page.

### `<webview>.delete()`

Executes editing command `delete` in page.

### `<webview>.selectAll()`

Executes editing command `selectAll` in page.

### `<webview>.unselect()`

Executes editing command `unselect` in page.

### `<webview>.replace(text)`

* `texto` Cadena

Executes editing command `replace` in page.

### `<webview>.replaceMisspelling(text)`

* `texto` Cadena

Executes editing command `replaceMisspelling` in page.

### `<webview>.insertText(text)`

* `texto` Cadena

Devuelve `Promise<void>`

Inserta `text` al elemento enfocado.

### `<webview>.findInPage(text[, options])`

* `text` String - El contenido para ser buscado, no debe quedar en blanco.
* `options` Object (opcional)
  * `forward` Boolean (opcional) - Ya sea para buscar hacia adelante o hacia atrás, el valor predeterminado es `true`.
  * `findNext` Boolean (optional) - Whether to begin a new text finding session with this request. Should be `true` for initial requests, and `false` for follow-up requests. Por defecto es `false`.
  * `matchCase` Boolean (opcional) - Si la busqueda debe ser sensible a mayúsculas, por defecto es `false`.

Devuelve `Integer` - El id de la solicitud usado para la solicitud.

Empieza una solicitud para encontrar todas las coincidencias para el `text` en la página web. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.

### `<webview>.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`<webview>.findInPage`](#webviewfindinpagetext-options) request.
  * `clearSelection` - Borrar la selección.
  * `keepSelection` - Traduce la selección en una selección normal.
  * `activateSelection` - Enfoca y hace clic en el nodo de selección.

Stops any `findInPage` request for the `webview` with the provided `action`.

### `<webview>.print([options])`

* `options` Object (opcional)
  * `silent` Boolean (optional) - Don't ask user for print settings. Por defecto es `false`.
  * `printBackground` Boolean (optional) - Prints the background color and image of the web page. Por defecto es `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Must be the system-defined name and not the 'friendly' name, e.g 'Brother_QL_820NWB' and not 'Brother QL-820NWB'.
  * `color` Boolean (optional) - Set whether the printed web page will be in color or grayscale. Por defecto es `true`.
  * `margins` Object (opcional)
    * `marginType` String (opcional) - Puede ser `default`, `none`, `printableArea`, o `custom`. Si `custom` es elegido, además necesitar especificar `top`, `bottom`, `left`, y `right`.
    * `top` Number (opcional) - El margen superior de la página web impresa, en píxeles.
    * `bottom` Number (opcional) - El margen inferior de la página web impresa, en píxeles.
    * `left` Number (opcional) - El margen izquierdo de la página web impresa, en píxeles.
    * `right` Number (opcional) - El margen derecho de la página web impresa, en píxeles.
  * `landscape` Boolean (optional) - Whether the web page should be printed in landscape mode. Por defecto es `false`.
  * `scaleFactor` Number (opcional) - El factor de escalado de la página web.
  * `pagesPerSheet` Number (opcional) - El número de páginas a imprimir por hoja de página.
  * `collate` Boolean (opcional) - Si la página web debe ser intercalada.
  * `copies` Number (opcional) - El número de copias de la página web a imprimir.
  * `pageRanges` Object[] (optional) - The page range to print.
    * `from` Number - Index of the first page to print (0-based).
    * `to` Number - Índice de la última página a imprimir (inclusive) (0-based).
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. Puede ser `simplex`, `shortEdge`, o `longEdge`.
  * `dpi` Record<string, number> (opcional)
    * `horizontal` Number (opcional) - El dpi horizontal.
    * `vertical` Number (opcional) - El dpi vertical.
  * `header` String (opcional) - Cadena a ser impresa como cabecera de la página.
  * `footer` String (opcional) - Cadena a ser impresa como pie de página.
  * `pageSize` String | Tamaño (opcional) - Especifique el tamaño de página del documento impreso. Puede ser `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o un objeto que contenga `height`.

Devuelve `Promise<void>`

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options)`

* `options` Object
  * `headerFooter` Record<string, string> (opcional) - el encabezado y el pie de página para el PDF.
    * `title` String - El título para el encabezado PDF.
    * `url` String - la url para el pie de página PDF.
  * `landscape` Boolean (opcional) - `true` para landscape, `false` para portrait.
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin. and `width` in microns.
  * `scaleFactor` Number (opcional) - El factor de escalado de la página web. Puede variar entre 0 to 100.
  * `pageRanges` Record<string, number> (optional) - The page range to print. On macOS, only the first range is honored.
    * `from` Number - Index of the first page to print (0-based).
    * `to` Number - Índice de la última página a imprimir (inclusive) (0-based).
  * `pageSize` String | Size (opcional) - Especifique el tamaño de la pagina PDF generada. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`
  * `printBackground` Boolean (opcional) - Si va a imprimir los fondos CSS.
  * `printSelectionOnly` Boolean (opcional) - Si se va a imprimir solo la selección.

Returns `Promise<Uint8Array>` - Resolves with the generated PDF data.

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options)`.

### `<webview>.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (opcional) - El área de la página para ser capturada.

Devuelve `Promise<NativeImage>` - Resuelve con el un [NativeImage](native-image.md)

Captura una foto instantánea de la página dentro de `rect`. Omitiendo `rect` capturará toda la página visible.

### `<webview>.send(channel, ...args)`

* `channel` Cadena
* `...args` any[]

Devuelve `Promise<void>`

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

See [webContents.send](web-contents.md#contentssendchannel-args) for examples.

### `<webview>.sendInputEvent(event)`

* `event`  [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Devuelve `Promise<void>`

Sends an input `event` to the page.

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventinputevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - Zoom factor.

Cambia el nivel de zoom al nivel especificado. Factor de zoom es porcentaje de zoom dividido entre 100, así que 300% = 3.0.

### `<webview>.setZoomLevel(level)`

* `nivel` Número - Nivel de Zoom.

Cambia el nivel de zoom al nivel especificado. El tamaño original es 0 y cada incremento por encima o por debajo representa un zoom del 20% mayor o menor a los límites predeterminados de 300% y 50% del tamaño original, respectivamente. La fórmula para esto es `scale := 1.2 ^ level`.

> **NOTE**: The zoom policy at the Chromium level is same-origin, meaning that the zoom level for a specific domain propagates across all instances of windows with the same domain. Differentiating the window URLs will make zoom work per-window.

### `<webview>.getZoomFactor()`

Devuelve `Number` - el factor de zoom actual.

### `<webview>.getZoomLevel()`

Devuelve `Number` - el nivel de zoom actual.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

Devuelve `Promise<void>`

Establece el nivel de máximo y mínimo de acercar y alejar.

### `<webview>.showDefinitionForSelection()` _macOS_

Shows pop-up dictionary that searches the selected word on the page.

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

* `errorCode` Integer
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
* `explicitSet` Boolean

Disparado cuando el título de la página se configura durante la navegación. `explicitSet` es false cuando el título es sincronizado desde el archivo url.

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

* `level` Entero - El nivel de registro, desde 0 hasta 3. In order it matches `verbose`, `info`, `warning` and `error`.
* `message` String - The actual console message
* `line` Entero - El número de línea de la fuente que activó este mensaje de consola
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

* `result` Object
  * `requestId` Íntegro
  * `activeMatchOrdinal` Integer - Posición de la coincidencia activa.
  * `matches` Integer - Número de coincidencias.
  * `selectionArea` Rectangle - Coordenadas de la primera región de coincidencia.
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

### Event: 'new-window'

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
  const protocol = (new URL(e.url)).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    await shell.openExternal(e.url)
  }
})
```

### Evento: 'will-navigate'

Devuelve:

* `url` String

Emitido cuando un usuario o l página quiere empezar la navegación. Puede ocurrir cuando el objeto `window.location` se cambia o un usuario hace clic en un enlace en la página.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does __NOT__ have any effect.

### Evento: 'did-navigate'

Devuelve:

* `url` String

Emitted when a navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

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
// In guest page.
const { ipcRenderer } = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

### Event: 'crashed'

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

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[chrome-webview]: https://developer.chrome.com/docs/extensions/reference/webviewTag/
