# webFrame

> Personalizar el renderizado de la página web actual.

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

> **NOTA**: El zoom visual está desactivado por defecto en Electron. Para volverlo a activar, llame:
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

* `css` String - CSS codigo de origen.

Se inserta `css` como una hoja de estilo en el documento.

### `webFrame.insertText(texto)`

* `texto` String

Inserta `texto` en el elemento enfocado.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` Cadena de caracteres
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.
* `callback` Función (opcional) - Llamado después de que se haya ejecutado el script. 
  * `resultado` Cualquiera

Devuelve `Promise<any>` - Una promesa que resuelve con el resultado de la ejecución del código o es rechazada si el resultado del código es una promesa rechazada.

Evalúa el `código` en la página.

En la ventana del navegador, algunas API HTML como `requestFullScreen` solo pueden invocarse con un gesto del usuario. Establecer `userGesture` a `true` eliminará esta limitación.

**[Próximamente desaprobado](modernization/promisification.md)**

### `webFrame.executeJavaScript(code[, userGesture])`

* `code` Cadena de caracteres
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.

Devuelve `Promise<any>` - Una promesa que resuelve con el resultado de la ejecución del código o es rechazada si el resultado del código es una promesa rechazada.

Evalúa el `código` en la página.

En la ventana del navegador, algunas API HTML como `requestFullScreen` solo pueden invocarse con un gesto del usuario. Establecer `userGesture` a `true` eliminará esta limitación.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Las extenciones de Chrome reservan el rango de IDs en `[1 << 20, 1 << 29)`. Puede aquí suministrar cualquier entero.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.
* `callback` Función (opcional) - Llamado después de que se haya ejecutado el script. 
  * `resultado` Cualquiera

Devuelve `Promise<any>` - Una promesa que resuelve con el resultado de la ejecución del código o es rechazada si el resultado del código es una promesa rechazada.

Funciona como `executeJavaScript` pero evaluá `scripts` en un contexto aislado.

**[Próximamente desaprobado](modernization/promisification.md)**

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Puede aquí suministrar cualquier entero.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.

Devuelve `Promise<any>` - Una promesa que resuelve con el resultado de la ejecución del código o es rechazada si el resultado del código es una promesa rechazada.

Funciona como `executeJavaScript` pero evaluá `scripts` en un contexto aislado.

### `webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)` *(Deprecated)*

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Las extenciones de Chrome reservan el rango de IDs en `[1 << 20, 1 << 29)`. Puede proporcionar aquí cualquier entero.
* `csp` String

Establecer la política de seguridad de contenido del mundo aislado.

### `webFrame.setIsolatedWorldHumanReadableName(worldId, name)` *(Deprecated)*

* `worldId` Integer - El ID del mundo para ejecutar el javascript en `0` el mundo por defecto es `999` es el mundo usado por la caracteristica de Electron `contextIsolation`. Las extenciones de Chrome reservan el rango de IDs en `[1 << 20, 1 << 29)`. Puede aquí suministrar cualquier entero.
* `name` String

Establecer el nombre del mundo aislado. Útil en devtools.

### `webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)` *(Deprecated)*

* `worldId` Integer - El ID del mundo para correr el javascript en `0` es el mundo por defecto, `999` es el mindo usado por la característica `contextIsolation` de Electron. Las extenciones de Chrome reservan el rango de IDs en `[1 << 20, 1 << 29)`. Puede aquí suministrar cualquier entero.
* `securityOrigin` String

Establecer el origen de seguridad del mundo aislado.

### `webFrame.setIsolatedWorldInfo(worldId, info)`

* `worldId` Integer - El ID del mundo para correr el javascript en `0` es el mundo por defecto, `999` es el mindo usado por la característica `contextIsolation` de Electron. Las extenciones de Chrome reservan el rango de IDs en `[1 << 20, 1 << 29)`. Puede aquí suministrar cualquier entero.
* `información` Object 
  * `securityOrigin` String (opcional) - Origen de seguridad para el mundo aislado.
  * `csp` String (opcional) - Política de Seguridad de Contenido para el mundo aislado.
  * `name` String (opcional) - Nombre para el mundo aislado. Útil en devtools.

Establecer el origen de seguridad, la política de seguridad de contenido y el nombre del mundo aislado. Nota: Si se especifica el `csp` entonces el `securityOrigin` también debe ser especificado.

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

### `webFrame.top`

Un `WebFrame` representa el frame superior en la jerarquía de frames a la que pertenece el `webFrame`, la propiedad sería `null` si el frame superior no es el actual.

### `webFrame.opener`

Un `WebFrame` representa el frame `webFrame` que abrió, la propiedad sería `null` si no hay abridores o si el abridor no está en el proceso renderer actual.

### `webFrame.parent`

Un `WebFrame` representando el marco padre de `webFrame`, la propiedad sería `null` si `webFrame` es superior o padre no está en el proceso actual de renderer.

### `webFrame.firstChild`

Un `WebFrame` representa el primer hijo de `webFrame`, la propiedad sería `null` si `webFrame` no tiene hijos o si el primer hijo no esta en el proceso renderer actual.

### `webFrame.nextSibling`

Un `WebFrame` que representa el siguiente marco hermano, la propiedad sería `null` si `webFrame` es el último fotograma en su padre o si el próximo hermano no está en el proceso renderer actual.

### `webFrame.routingId`

Un `Integer` que representa el id único del frame en el proceso renderizador actual. Distintas instancias WebFrame que refieren al mismo frame subyacente tendrán el mismo `routingId`.