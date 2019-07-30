# webFrame

> Personalice la reproducción de la página web actual.

Proceso: [Renderer](../glossary.md#renderer-process)

`webFrame` export of the Electron module is an instance of the `WebFrame` class representing the top frame of the current `BrowserWindow`. Sub-frames can be retrieved by certain properties and methods (e.g. `webFrame.firstChild`).

Un ejemplo de zoom de la página actual al 200%.

```javascript
const { webFrame } = require('electron')
```

## Métodos

The `WebFrame` class has the following instance methods:

### `webFrame.setZoomFactor(factor)`

* `factor` Number - Factor Zoom.

Cambia el factor de zoom al factor especificado. El factor de zoom es el porcentaje de zoom dividido por 100, por lo que 300% = 3.0.

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
> ```js
webFrame.setVisualZoomLevelLimits(1, 3)
```

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

Establece el nivel de zoom máximo y mínimo basado en el diseño (es decir, no visual).

### `webFrame.setSpellCheckProvider(language, provider)`

* `idioma` Cadena
* `proveedor` Object 
  * `Corrector Ortográfico
` Function. 
    * `words` String[]
    * `callback` Function 
      * `misspeltWords` String[]

Establece un proveedor para la corrección ortográfica en campos de entrada y áreas de texto.

The `provider` must be an object that has a `spellCheck` method that accepts an array of individual words for spellchecking. The `spellCheck` function runs asynchronously and calls the `callback` function with an array of misspelt words when complete.

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

* `css` String - CSS source code.

Inserts `css` as a style sheet in the document.

### `webFrame.insertText(text)`

* `texto` String

Inserta `texto` en el elemento enfocado.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `codigo` String
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.
* `callback` Función (opcional) - Llamado después de que se haya ejecutado el script. 
  * `resultado` Cualquiera

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evalúa el `código` en la página.

En la ventana del navegador, algunas API HTML como `requestFullScreen` solo pueden invocarse con un gesto del usuario. Establecer `userGesture` a `true` eliminará esta limitación.

**[Próximamente desaprobado](modernization/promisification.md)**

### `webFrame.executeJavaScript(code[, userGesture])`

* `codigo` String
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evalúa el `código` en la página.

En la ventana del navegador, algunas API HTML como `requestFullScreen` solo pueden invocarse con un gesto del usuario. Establecer `userGesture` a `true` eliminará esta limitación.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. Aquí puede suministrar cualquier entero.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.
* `callback` Función (opcional) - Llamado después de que se haya ejecutado el script. 
  * `resultado` Cualquiera

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Works like `executeJavaScript` but evaluates `scripts` in an isolated context.

**[Próximamente desaprobado](modernization/promisification.md)**

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Aquí puede suministrar cualquier entero.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Works like `executeJavaScript` but evaluates `scripts` in an isolated context.

### `webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)` *(Deprecated)*

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. Aquí puede suministrar cualquier entero.
* `csp` String

Set the content security policy of the isolated world.

### `webFrame.setIsolatedWorldHumanReadableName(worldId, name)` *(Deprecated)*

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. Aquí puede suministrar cualquier entero.
* `name` String

Set the name of the isolated world. Useful in devtools.

### `webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)` *(Deprecated)*

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. Aquí puede suministrar cualquier entero.
* `securityOrigin` String

Set the security origin of the isolated world.

### `webFrame.setIsolatedWorldInfo(worldId, info)`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. Aquí puede suministrar cualquier entero.
* `info` Objeto 
  * `securityOrigin` String (optional) - Security origin for the isolated world.
  * `csp` String (optional) - Content Security Policy for the isolated world.
  * `name` String (optional) - Name for isolated world. Useful in devtools.

Set the security origin, content security policy and name of the isolated world. Note: If the `csp` is specified, then the `securityOrigin` also has to be specified.

### `webFrame.getResourceUsage()`

Devuelve `Objecto`:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `scripts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Returns an object describing usage information of Blink's internal memory caches.

```javascript
const { webFrame } = require('electron')
console.log(webFrame.getResourceUsage())
```

This will generate:

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

Attempts to free memory that is no longer being used (like images from a previous navigation).

Note that blindly calling this method probably makes Electron slower since it will have to refill these emptied caches, you should only call it if an event in your app has occurred that makes you think your page is actually using less memory (i.e. you have navigated from a super heavy page to a mostly empty one, and intend to stay there).

### `webFrame.getFrameForSelector(selector)`

* `selector` String - CSS selector for a frame element.

Returns `WebFrame` - The frame element in `webFrame's` document selected by `selector`, `null` would be returned if `selector` does not select a frame or if the frame is not in the current renderer process.

### `webFrame.findFrameByName(name)`

* `name` String

Returns `WebFrame` - A child of `webFrame` with the supplied `name`, `null` would be returned if there's no such frame or if the frame is not in the current renderer process.

### `webFrame.findFrameByRoutingId(routingId)`

* `routingId` Integer - An `Integer` representing the unique frame id in the current renderer process. Routing IDs can be retrieved from `WebFrame` instances (`webFrame.routingId`) and are also passed by frame specific `WebContents` navigation events (e.g. `did-frame-navigate`)

Returns `WebFrame` - that has the supplied `routingId`, `null` if not found.

## Propiedades

### `webFrame.top`

A `WebFrame` representing top frame in frame hierarchy to which `webFrame` belongs, the property would be `null` if top frame is not in the current renderer process.

### `webFrame.opener`

A `WebFrame` representing the frame which opened `webFrame`, the property would be `null` if there's no opener or opener is not in the current renderer process.

### `webFrame.parent`

A `WebFrame` representing parent frame of `webFrame`, the property would be `null` if `webFrame` is top or parent is not in the current renderer process.

### `webFrame.firstChild`

A `WebFrame` representing the first child frame of `webFrame`, the property would be `null` if `webFrame` has no children or if first child is not in the current renderer process.

### `webFrame.nextSibling`

A `WebFrame` representing next sibling frame, the property would be `null` if `webFrame` is the last frame in its parent or if the next sibling is not in the current renderer process.

### `webFrame.routingId`

An `Integer` representing the unique frame id in the current renderer process. Distinct WebFrame instances that refer to the same underlying frame will have the same `routingId`.