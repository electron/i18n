# `<webview>` Etiqueta

## Warning

Electron's `webview` tag is based on [Chromium's `webview`](https://developer.chrome.com/apps/tags/webview), which is undergoing dramatic architectural changes. This impacts the stability of `webviews`, including rendering, navigation, and event routing. We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, Electron's `BrowserView`, or an architecture that avoids embedded content altogether.

## Overview

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

## Internal implementation

Under the hood `webview` is implemented with [Out-of-Process iframes (OOPIFs)](https://www.chromium.org/developers/design-documents/oop-iframes). The `webview` tag is essentially a custom element using shadow DOM to wrap an `iframe` element inside it.

So the behavior of `webview` is very similar to a cross-domain `iframe`, as examples:

* When clicking into a `webview`, the page focus will move from the embedder frame to `webview`.
* You can not add keyboard event listeners to `webview`.
* All reactions between the embedder frame and `webview` are asynchronous.

## Notas de Estilo CCS

Please note that the `webview` tag's style uses `display:flex;` internally to ensure the child `iframe` element fills the full height and width of its `webview` container when used with traditional and flexbox layouts. Please do not overwrite the default `display:flex;` CSS property, unless specifying `display:inline-flex;` for inline layout.

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

Establece la sesión usada por la página. Si `partition` empieza con `persist:`, la página usará una sesión persistente disponible para todas las páginas en la aplicación con la misma `partition`. si no hay un prefijo `persist:`, la página usará una sesión en memoria. Al asignar la misma `partition`, las páginas múltiples pueden compartir la misma sesión. Si la `partition` no se establece entonces la sesión por defecto de la aplicación será usada.

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

La cuerda sigue el mismo formato que las cuerdas que aparecen en `window.open`. Un nombre por sí mismo es dado a `true` por valores booleanos. Una preferencia puede ser establecida por otro valor incluyendo un `=`, seguido por el valor. Valores especiales como `yes` y `1` son interpretados como `true`, mientras que `no` y `0` son interpretados como `false`.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Una lista de cadenas que especifican las preferencias de blink para ser activadas, separadas por `,`. La lista completa de cadenas características soportadas puede ser encontrada en el archivo [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Una lista de cadenas que especifican las cadenas de blink para ser desactivadas, separadas por `,`. La lista completa de cadenas características soportadas puede ser encontrada en el archivo [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).

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
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` Cadena (opcional) - Un agente de usuario originando el pedido.
  * `extraHeaders` String (opcional) - Encabezados extras separadas por "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
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

### `<webview>.executeJavaScript(code[, userGesture, callback])`

* `code` Cadena de caracteres
* `userGesture` Boolean (optional) - Default `false`.
* `callback` Function (opcional) - Es llamado luego de que se haya ejecutado el script. 
  * `resultado` Cualquiera

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

* `x` Íntegro
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

* `texto` String

Ejecuta el comando de edición `replace` en página.

### `<webview>.replaceMisspelling(text)`

* `texto` String

Ejecuta el comando de edición `replaceMisspelling` en página.

### `<webview>.insertText(text)`

* `texto` String

Inserta `texto` al elemento centrado.

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

* `acción` Cadena - Especifica la acción que tendrá lugar al finalizar [`<webview>.findInPage`](#webviewfindinpagetext-options) pedido. 
  * `clearSelection` - Borrar la selección.
  * `keepSelection` - Traduce la selección en una selección normal.
  * `activateSelection` - Enfoca y hace clic en el nodo de selección.

Detiene cualquier solicitud `findInPage` para el `webview` con la `action` dada.

### `<webview>.print([options])`

* `opciones` Objecto (opcional) 
  * `silent` Boolean (opcional) - No le pide al usuario configurar la impresora. Por defecto es `false`.
  * `printBackground` Boolean (opcional) - También imprime el color de fondo y la imagen de la página web. Por defecto es `false`.
  * `deviceName` String (opcional) - Configura el nombre de la impresora que se va a usar. Por defecto es `''`.

Imprime la página web de `webview`. Al igual que `webContents.print([options])`.

### `<webview>.printToPDF(options, callback)`

* `opciones` Object 
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String (optional) - Specify page size of the generated PDF. Puede ser `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o un contenedor de objeto `height` y `width` en micrones.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
* `callback` Function 
  * `error` Error
  * `data` Buffer

Imprime la página web de `webview` como un PDF, al igual que `webContents.printToPDF(options, callback)`.

### `<webview>.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (opcional) - El área de la página para ser capturada.
* `callback` Function 
  * `image` [NativeImage](native-image.md)

Captura una instantánea de la página de `webview`. Al igual que `webContents.capturePage([rect, ]callback)`.

### `<webview>.send(channel[, arg1][, arg2][, ...])`

* `channel` Cadena
* `...args` any[]

Envía un mensaje asincrónico al proceso de renderizado vía `channel`, también puedes mandar argumentos arbitrarios. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

Ver [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) para ejemplos.

### `<webview>.sendInputEvent(event)`

* `event` Objeto

Envía un input `event` a la página.

Ver [webContents.sendInputEvent](web-contents.md#contentssendinputeventevent) para una descripción detallada del objeto `event`.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - Zoom factor.

Cambia el factor de zoom al factor especificado. El factor de zoom es el porcentaje de zoom dividido por 100, por lo que 300% = 3.0.

### `<webview>.setZoomLevel(level)`

* `nivel` Número - Nivel de Zoom.

Cambia el nivel de zoom al nivel especificado. El tamaño original es 0 y cada incremento por encima o por debajo representa un zoom del 20% mayor o menor a los límites predeterminados de 300% y 50% del tamaño original, respectivamente.

### `<webview>.showDefinitionForSelection()` *macOS*

Muestra el diccionario pop-up que busca la palabra seleccionada en la página.

### `<webview>.getWebContents()`

Devuelve [`WebContents`](web-contents.md) - Los contenidos web asociados con esto `webview`.

## Eventos DOM

Los siguientes eventos DOM están disponibles en la etiqueta `webview`:

### Evento: 'load-commit'

Devuelve:

* `url` String
* `EsElFramePrincipal` Boolean

Disparado cuando una carga ha sido cometida, Esto incluye navegaciones dentro del documento actual así como cargas de documentos de bajo nivel, pero no incluye fuentes asincrónicas de cargas.

### Evento: 'did-finish-load'

Disparado cuando la navegación es terminada, i.e. el girador del tabulador dejará de girar, y el evento `onload` es discapacitado.

### Evento: 'did-fail-load'

Devuelve:

* `errorCode` Entero
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

Este evento es como `did-finish-load`,pero disparado cuando la carga falla o es cancelada, e.g. `window.stop()` es involucrada.

### Evento: 'did-frame-finish-load'

Devuelve:

* `isMainFrame` Boolean

Disparado cuando un frame ha terminado la navegación.

### Evento: 'did-start-loading'

Corresponde a los puntos en tiempo cuando el girador del tabulador empieza a girar.

### Evento: 'did-stop-loading'

Corresponde a los puntos en tiempo cuando el girador del tabulador termina de girar.

### Evento: 'dom-ready'

Disparado cuando el documento en el frame dado es cargado.

### Evento: "page-title-updated"

Devuelve:

* `title` Cadena
* `explicitSet` Boolen

Disparado cuando el título de la página es establecido durante la navegación. `explicitSet` es falso cuando el título es sintetizado del archivo url.

### Evento: 'page-favicon-updated'

Devuelve:

* `favicons` Cadena[] - Arreglo para URLs.

Disparado cuando la página recibe urls de favicon.

### Evento: "enter-html-full-screen"

Disparado cuando la página entra en pantalla entera i¿y es activado por HTML API.

### Evento: "leave-html-full-screen"

Disparado cuando la página deja la pantalla completa activada por HTML API.

### Evento: 'console-message'

Devuelve:

* `level` Íntegro
* `message` String
* `line` Íntegro
* `sourceId` Cadena

Disparado cuando la ventana invitada entra un mensaje de consola.

El siguiente código ejemplo sigue con todos los mensajes guardados a la consola embebedora sin preocupación por el nivel de guardado u otras propiedades.

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

Disparado cuando un resultado es disponible en la solicitud [`webview.findInPage`](#webviewfindinpagetext-options).

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
* `frameName` Cadena
* `disposition` String - Puede ser `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
* `options` Object - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

Disparado cuando la página de invitado intenta abrir una nueva ventana de buscador.

El siguiente código ejemplo abre el nuevo url en el buscador por defecto del sistema.

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

* `url` Cadena

Emitido cuando un usuario o la página quiere iniciar la navegación. Puede suceder cuando el objeto `window.location` es cambiado o un usuario hace click en un link de la página.

Este evento no se emitirá cuando la navegación es iniciada con programación con APIs como `<webview>.loadURL` y `<webview>.back`.

Tampoco es emitido durante la navegación en la página, como hacerle click a links o actualizando el `window.location.hash`. Usa el evento `did-navigate-in-page` para este propósito.

Llamar a `event.preventDefault()`, **NO** tiene ningún efecto.

### Evento: 'did-navigate'

Devuelve:

* `url` String

Emitido cuando la navegación es finalizada.

Este evento no es emitido para navegaciones dentro de la página, como hacerle click a links o actualizando `window.location.hash`. Usa el evento `did-navigate-in-page` para este propósito.

### Evento: 'did-navigate-in-page'

Devuelve:

* `isMainFrame` Boolean
* `url` String

Emitido cuando una navegación dentro de la página sucede.

Cuando una navegación dentro de la página sucede, el URL de la página cambia, pero no causa una navegación fuera de la página. Ejemplos de ésto ocurriendo son cuando los links son clickeados o cuando el evento DOM `hashchange` es activado.

### Evento: "close"

Disparado cuando la página de invitado intenta cerrarse.

El siguiente código ejemplo navega el `webview` a `about:blank` cuando el invitado intenta cerrase.

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

Disparado cuando la página de invitado ha enviado un mensaje asincrónico a la página de embebido.

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
const {ipcRenderer} = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

### Evento: 'crashed'

Disparado cuando el proceso de renderizado se cierra.

### Evento: 'gpu-crashed'

Disparado cuando el proceso gpu se cae.

### Evento: 'plugin-crashed'

Devuelve:

* `name` String
* `version` Cadena

Disparado cuando el proceso de plugin se cae.

### Evento: 'destroyed'

Disparado cuando el WebContents es destrozado.

### Evento: 'media-started-playing'

Emitido cuando la media empieza a reproducirse.

### Evento: 'media-paused'

Emitido cuando la media es pausada o ha terminado de reproducirse.

### Evento: 'did-change-theme-color'

Devuelve:

* `themeColor` Cadena

Emitido cuando el color de tema de una página cambia. Esto usualmente se debe a encontrar una etiqueta meta:

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