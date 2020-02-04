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

> **NOTA**: El zoom visual está desactivado por defecto en Electron. Para volverlo a activar, llame:
> 
> ```js
webFrame.setVisualZoomLevelLimits(1, 3)
```

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)` *Deprecated*

* `minimumLevel` Número
* `maximumLevel` Número

Establece el nivel de zoom máximo y mínimo basado en el diseño (es decir, no visual).

**Deprecated:** This API is no longer supported by Chromium.

### `webFrame.setSpellCheckProvider(language, provider)`

* `idioma` Cadena
* `proveedor` Object 
  * `Corrector Ortográfico
` Function 
    * `words` String[]
    * `callback` Function 
      * `misspeltWords` String[]

Sets a provider for spell checking in input fields and text areas.

If you want to use this method you must disable the builtin spellchecker when you construct the window.

```js
const mainWindow = new BrowserWindow({
  webPreferences: {
    spellcheck: false
  }
})
```

The `provider` must be an object that has a `spellCheck` method that accepts an array of individual words for spellchecking. The `spellCheck` function runs asynchronously and calls the `callback` function with an array of misspelt words when complete.

An example of using [node-spellchecker](https://github.com/atom/node-spellchecker) as provider:

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

* `worldId` Integer - El ID de la palabra para correr javascript en, `0` es el mundo por defecto, `999` es el mundo usado por la característica de Electron `contextIsolation`. Puede aquí suministrar cualquier entero.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.

Devuelve `Promise<any>` - Una promesa que resuelve con el resultado de la ejecución del código o es rechazada si el resultado del código es una promesa rechazada.

Funciona como `executeJavaScript` pero evaluá `scripts` en un contexto aislado.

### `webFrame.setIsolatedWorldInfo(worldId, info)`

* `worldId` Integer - El ID de la palabra para correr javascript en, `0` es el mundo por defecto, `999` es el mundo usado por la característica de Electron `contextIsolation`. Las extenciones de Chrome reservan el rango de IDs en `[1 << 20, 1 << 29)`. Aquí puede suministrar cualquier entero.
* `información` Object 
  * `securityOrigin` String (opcional) - Origen de seguridad para el mundo aislado.
  * `csp` String (opcional) - Política de Seguridad de Contenido para el mundo aislado.
  * `name` String (opcional) - Nombre para el mundo aislado. Útil en devtools.

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

* `selector` String - selector CSS para un elemento frame.

Returns `WebFrame` - The frame element in `webFrame's` document selected by `selector`, `null` would be returned if `selector` does not select a frame or if the frame is not in the current renderer process.

### `webFrame.findFrameByName(name)`

* `name` String

Returns `WebFrame` - A child of `webFrame` with the supplied `name`, `null` would be returned if there's no such frame or if the frame is not in the current renderer process.

### `webFrame.findFrameByRoutingId(routingId)`

* `routingId` Integer - Un `Integer` representando el id único del frame en el proceso renderer actual. Las IDs de rutas se pueden recuperar de `WebFrame` instancias (`webFrame.routingId`) y también son pasados por el frame `WebContents` específicos eventos de navegación (por ejemplo, `did-frame-navigate`)

Returns `WebFrame` - that has the supplied `routingId`, `null` if not found.

## Propiedades

### `webFrame.top` *Readonly*

A `WebFrame | null` representing top frame in frame hierarchy to which `webFrame` belongs, the property would be `null` if top frame is not in the current renderer process.

### `webFrame.opener` *Readonly*

A `WebFrame | null` representing the frame which opened `webFrame`, the property would be `null` if there's no opener or opener is not in the current renderer process.

### `webFrame.parent` *Readonly*

A `WebFrame | null` representing parent frame of `webFrame`, the property would be `null` if `webFrame` is top or parent is not in the current renderer process.

### `webFrame.firstChild` *Readonly*

A `WebFrame | null` representing the first child frame of `webFrame`, the property would be `null` if `webFrame` has no children or if first child is not in the current renderer process.

### `webFrame.nextSibling` *Readonly*

A `WebFrame | null` representing next sibling frame, the property would be `null` if `webFrame` is the last frame in its parent or if the next sibling is not in the current renderer process.

### `webFrame.routingId` *Readonly*

An `Integer` representing the unique frame id in the current renderer process. Distinct WebFrame instances that refer to the same underlying frame will have the same `routingId`.