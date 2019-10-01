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

### `no desintegración`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

Cuando este atributo esté presente, la página de invitado en `webview` tendrá integración de nodo y puede usar nodos APIs como `require` y `process` para acceder a bajos niveles de recursos de sistemas. La integración de nodo está desactivada por defecto en la página de invitado.

### `nodeintegrationinsubframes`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

Opción experimental para habilitar el suporte de NodeJS en sub-frames tal como iframes dentro de `webview`. Todas sus precargas se cargarán por cada iframe, pude usar `process.isMainFrame` para determinar si estás en el frame principal o no. Esta opción está deshailitada por defecto en la pagina de invitado.

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Cuando este atributo es `false` la pagina de invitado en `webview` no tendrá acceso al módulo [`remote`](remote.md). El módulo remote está habilitado por defecto.

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
<webview src="https://electronjs.org" partition="electron"></webview>
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

Inyecta CSS en la página de invitado.

### `<webview>.executeJavaScript(code[, userGesture, callback])`

* `code` Cadena de caracteres
* `userGesture` Boolean (opcional) - Predeterminado `false`.
* `callback` Función (opcional) - Llamado después de que se haya ejecutado el script. 
  * `resultado` Cualquiera

Devuelve `Promise<any>` - Una promesa que resuelve con el resultado de la ejecución del código o es rechazada si el resultado del código es una promesa rechazada.

Evalúa el `código` en la página. Si `userGesture` está establecido, creará el contexto de gesto del usuario en la página. APIs de HTML como `requestFullScreen`, los cuales requieren acciones de usuario, puede tomar ventaja de esta opción para automatización.

**[Próximamente desaprobado](modernization/promisification.md)**

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

Empieza una solicitud para encontrar todas las coincidencias para el `text` en la página web. El resultado de la petición puede ser obtenido por suscripción al evento [`found-in-page`](webview-tag.md#event-found-in-page).

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
  * `marginsType` Integer (opcional) - Especifica los tipos de margenes a usar. Usa 0 para el margen por defecto, 1 para no margen, y dos para el margen máximo.
  * `pageSize` String | Size (opcional) - Especifique el tamaño de la página del PDF Generado. Puede ser `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o un contenedor de objeto `height` y `width` en micrones.
  * `printBackground` Boolean (opcional) - Si se imprime o no el fondo CSS.
  * `printSelectionOnly` Boolean (opcional) - Si se imprime solo la selección.
  * `landscape` Boolean (opcional) - `true` for landscape, `false` for portrait.
* `callback` Function 
  * `error` Error
  * `data` Buffer

Imprime la página web de `webview` como un PDF, al igual que `webContents.printToPDF(options, callback)`.

**[Próximamente desaprobado](modernization/promisification.md)**

### `<webview>.printToPDF(opciones)`

* `opciones` Object 
  * `marginsType` Integer (opcional) - Especifica los tipos de margenes a usar. Usa 0 para el margen por defecto, 1 para no margen, y dos para el margen máximo.
  * `pageSize` String | Size (opcional) - Especifique el tamaño de página del PDF generado. Puede ser `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o un contenedor de objeto `height` y `width` en micrones.
  * `printBackground` Boolean (opcional) - Si se va a imprimir o no el fondo CSS.
  * `printSelectionOnly` Boolean (opcional) - Si se imprime solo la selección.
  * `landscape` Boolean (opcional) - `true` for landscape, `false` for portrait.

Returns `Promise<Buffer>` - Se resuelve cuando los datos PDF son generados.

Imprime la página web de `webview` como PDF, Igual como `webContents.printToPDF(options)`.

### `<webview>.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (opcional) - Los límites para capturar
* `callback` Function 
  * `image` [NativeImage](native-image.md)

Captura una foto instantánea de la página dentro de `rect`. Al finalizar se llamará `callback` con `callback(image)`. La `image` es una instancia de [NativeImage](native-image.md) que almacena datos de la instantánea. Omitir `rect` capturará toda la página visible.

**[Próximamente desaprobado](modernization/promisification.md)**

### `<webview>.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (opcional) - El área de la página para ser capturada.

Devuelve `Promise<NativeImage>` - Resuelve con el un [NativeImage](native-image.md)

Captura una instantánea de la página dentro de `rect`. Omitiendo `rect` capturará toda la página visible.

### `<webview>.send(channel[, arg1][, arg2][, ...])`

* `channel` Cadena
* `...args` any[]

Envía un mensaje asincrónico al proceso de renderizado vía `channel`, también puedes mandar argumentos arbitrarios. El proceso renderizador puede manejar el mensaje escuchando el evento `channel` con el módulo [`ipcRenderer`](ipc-renderer.md).

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

Cambia el nivel de zoom al nivel especificado. El tamaño original es 0 y cada incremento por encima o por debajo representa un zoom del 20% mayor o menor a los límites predeterminados de 300% y 50% del tamaño original, respectivamente. La fórmula para esto es `scale := 1.2 ^ level`.

### `<webview>.getZoomFactor()`

Devuelve `Number` - el factor de zoom actual.

### `<webview>.getZoomLevel()`

Devuelve `Number` - el nivel de zoom actual.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

Establecer el nivel de máximo y mínimo pizca de zoom.

### `<webview>.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

Establece el nivel de zoom máximo y mínimo basado en el diseño (es decir, no visual).

### `<webview>.showDefinitionForSelection()` *macOS*

Muestra el diccionario pop-up que busca la palabra seleccionada en la página.

### `<webview>.getWebContents()`

Devuelve [`WebContents`](web-contents.md) - Los contenidos web asociados con esto `webview`.

Depende del módulo [`remote`](remote.md), por lo tanto no esta disponible cuando este módulo esta deshabilitado.

### `<webview>.getWebContentsId()`

Devuelve `Number` - El ID de WebContents de este `webview`.

## Eventos DOM

Los siguientes eventos DOM están disponibles en la etiqueta `webview`:

### Evento: 'load-commit'

Devuelve:

* `url` String
* `isMainFrame` Boolean

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

* `title` String
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
* `frameName` String
* `disposition` String - Puede ser `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
* `options` Object - Las opciones que deberían ser usadas para la creación del nuevo [`BrowserWindow`](browser-window.md).

Disparado cuando la página de invitado intenta abrir una nueva ventana de buscador.

El siguiente código ejemplo abre el nuevo url en el buscador por defecto del sistema.

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

### Evento: 'close'

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

Con el método `sendToHost` y el evento `ipc-message` puedes comunicarte entre la página de invitado y la página del integrador:

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

Disparado cuando el proceso de renderizado se cierra.

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