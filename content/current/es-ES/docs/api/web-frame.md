# webFrame

> Personalizar el renderizado de la página web actual.

Proceso: [Renderer](../glossary.md#renderer-process)

`webFrame` exportación del mudulo Electron es una instancia de la clase `WebFrame` que representa el frame superior del actual `BrowserWindow`. Sub-frames pueden ser recuperados a través de propiedades y métodos determinados (ejemplo `webFrame.firstChild`).

Un ejemplo de zoom de la página actual al 200%.

```javascript
const { webFrame } = require('electron')
```

## Métodos

La clase `WebFrame` tiene los siguientes métodos de instancia:

### `webFrame.setZoomFactor(factor)`

* `factor` Double - Zoom factor; default is 1.0.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

The factor must be greater than 0.0.

### `webFrame.getZoomFactor()`

Devuelve `Número` - El factor de zoom actual.

### `webFrame.setZoomLevel(nivel)`

* `nivel` Número - Nivel de Zoom.

Cambia el nivel de zoom al nivel especificado. El tamaño original es 0 y cada incremento por encima o por debajo representa un zoom del 20% mayor o menor a los límites predeterminados de 300% y 50% del tamaño original, respectivamente.

### `webFrame.getZoomLevel()`

Devuelve `Número` - El nivel de zoom actual.

### `webFrame.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

Establecer el nivel de máximo y mínimo pizca de zoom.

> **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
> 
> `js
  webFrame.setVisualZoomLevelLimits(1, 3)`

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)` _Deprecated_

* `minimumLevel` Número
* `maximumLevel` Número

Establece el nivel de zoom máximo y mínimo basado en el diseño (es decir, no visual).

**Deprecated:** This API is no longer supported by Chromium.

### `webFrame.setSpellCheckProvider(language, provider)`

* `idioma` Cadena
* `provider` Object
  * `spellCheck` Function
    * `words` String[]
    * `callback` Función
      * `misspeltWords` String[]

Establece un proveedor para la corrección ortográfica en campos de entrada y áreas de texto.

If you want to use this method you must disable the builtin spellchecker when you construct the window.

```js
const mainWindow = new BrowserWindow({
  webPreferences: {
    spellcheck: false
  }
})
```

El `provider` debe ser un objeto que tiene un método `spellCheck` que acepte un array de palabras individuales para revisión ortográfica. La función `spellCheck` corre cronológicamente y llama a la función `callback` con un array de palabras mal escritas cuando se completa.

Un ejemplo de uso de [node-spellchecker](https://github.com/atom/node-spellchecker) como proveedor:

```javascript
const { webFrame } = require('electron')
const spellChecker = require('spellchecker')
webFrame.setSpellCheckProvider('en-US', {
  spellCheck (words, callback) {
    setTimeout(() => {
      const spellchecker = require('spellchecker')
      const misspelled = words.filter(x => spellchecker.isMisspelled(x))
      callback(misspelled)
    }, 0)
  }
})
```

### `webFrame.insertCSS(css)`

* `css` String - CSS codigo de origen.

Returns `String` - A key for the inserted CSS that can later be used to remove the CSS via `webFrame.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

### `webFrame.removeInsertedCSS(key)`

* `llave` Cadena

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `webFrame.insertCSS(css)`.

### `webFrame.insertText(texto)`

* `text` Cadena

Inserta `texto` en el elemento enfocado.

### `webFrame.executeJavaScript(code[, userGesture])`

* `code` Cadena de caracteres
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.

Devuelve `Promise<any>` - Una promesa que resuelve con el resultado de la ejecución del código o es rechazada si el resultado del código es una promesa rechazada.

Evalúa el `código` en la página.

En la ventana del navegador, algunas API HTML como `requestFullScreen` solo pueden invocarse con un gesto del usuario. Establecer `userGesture` a `true` eliminará esta limitación.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - El ID de la palabra para correr javascript en, `0` es el mundo por defecto, `999` es el mundo usado por la característica de Electron `contextIsolation`.  Puede aquí suministrar cualquier entero.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.

Devuelve `Promise<any>` - Una promesa que resuelve con el resultado de la ejecución del código o es rechazada si el resultado del código es una promesa rechazada.

Funciona como `executeJavaScript` pero evaluá `scripts` en un contexto aislado.

### `webFrame.setIsolatedWorldInfo(worldId, info)`
* `worldId` Integer - El ID de la palabra para correr javascript en, `0` es el mundo por defecto, `999` es el mundo usado por la característica de Electron `contextIsolation`. Las extenciones de Chrome reservan el rango de IDs en `[1 << 20, 1 << 29)`. Aquí puede suministrar cualquier entero.
* `info` Object
  * `securityOrigin` String (opcional) - Origen de seguridad para el mundo aislado.
  * `csp` String (opcional) - Política de Seguridad de Contenido para el mundo aislado.
  * `name` String (optional) - Name for isolated world. Useful in devtools.

Set the security origin, content security policy and name of the isolated world. Note: If the `csp` is specified, then the `securityOrigin` also has to be specified.

### `webFrame.getResourceUsage()`

Devuelve `Objeto`:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `scripts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Devuelve un objeto que describe la información de uso de las cachés de memoria interna de Blink.

```javascript
const { webFrame } = require('electron')
console.log(webFrame.getResourceUsage())
```

Esto generará:

```javascript
{
  images: {
    count: 22,
    size: 2549,
    liveSize: 2542
  },
  cssStyleSheets: { /* same with "images" */ },
  xslStyleSheets: { /* same with "images" */ },
  fonts: { /* same with "images" */ },
  other: { /* same with "images" */ }
}
```

### `webFrame.clearCache()`

Intenta liberar memoria que ya no se usa (como las imágenes de una navegación anterior).

Tenga en cuenta que llamar ciegamente este método probablemente haga que Electron sea más lento, ya que tendrá que volver a llenar estos cachés vacíos, solo debe llamarlo si ha ocurrido un evento en su aplicación que le haga pensar que su página está usando menos memoria (es decir, ha navegado desde una página muy pesada a una casi vacía, y tiene la intención de permanecer allí).

### `webFrame.getFrameForSelector(selector)`

* `selector` String - selector CSS para un elemento frame.

Devuelve `WebFrame` - El elemento de frame en `webFrame's` documento seleccionado por `selector`, `null` sería devuelto si `selector` no selecciona un frame o si el frame no está en el proceso actual de renderizado.

### `webFrame.findFrameByName(name)`

* `name` String

Deveulve `WebFrame` - Un hijo de `webFrame` con el `name` suministrado, `null` sería retornado is no hay tal frame o si el frame no está en el proceso renderer actual.

### `webFrame.findFrameByRoutingId(routingId)`

* `routingId` Integer - Un `Integer` representando el id único del frame en el proceso renderer actual. Las IDs de rutas se pueden recuperar de `WebFrame` instancias (`webFrame.routingId`) y también son pasados por el frame `WebContents` específicos eventos de navegación (por ejemplo, `did-frame-navigate`)

Devuelve `WebFrame` - que tiene el `routingId` proporcionado, `null` si no se encuentra.

## Propiedades

### `webFrame.top` _Readonly_

A `WebFrame | null` representing top frame in frame hierarchy to which `webFrame` belongs, the property would be `null` if top frame is not in the current renderer process.

### `webFrame.opener` _Readonly_

A `WebFrame | null` representing the frame which opened `webFrame`, the property would be `null` if there's no opener or opener is not in the current renderer process.

### `webFrame.parent` _Readonly_

A `WebFrame | null` representing parent frame of `webFrame`, the property would be `null` if `webFrame` is top or parent is not in the current renderer process.

### `webFrame.firstChild` _Readonly_

A `WebFrame | null` representing the first child frame of `webFrame`, the property would be `null` if `webFrame` has no children or if first child is not in the current renderer process.

### `webFrame.nextSibling` _Readonly_

A `WebFrame | null` representing next sibling frame, the property would be `null` if `webFrame` is the last frame in its parent or if the next sibling is not in the current renderer process.

### `webFrame.routingId` _Readonly_

An `Integer` representing the unique frame id in the current renderer process. Distinct WebFrame instances that refer to the same underlying frame will have the same `routingId`.
