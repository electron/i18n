# webFrame

> Personalice la reproducción de la página web actual.

Proceso: [Reproducir](../glossary.md#renderer-process)

Un ejemplo de zoom de la página actual al 200%.

```javascript
const {webFrame} = require('electron')
```

## Métodos

El módulo `webFrame` tiene los siguientes métodos:

### `webFrame.setZoomFactor(factor)`

* `factor` Number - Zoom factor.

Cambia el factor de zoom al factor especificado. El factor de zoom es el porcentaje de zoom dividido por 100, por lo que 300% = 3.0.

### `webFrame.getZoomFactor()`

Devuelve `Número` - El factor de zoom actual.

### `webFrame.setZoomLevel(nivel)`

* `nivel` Número - Nivel de Zoom

Cambia el nivel de zoom al nivel especificado. El tamaño original es 0 y cada incremento por encima o por debajo representa un zoom del 20% mayor o menor a los límites predeterminados de 300% y 50% del tamaño original, respectivamente.

### `webFrame.getZoomLevel()`

Devuelve `Número` - El nivel de zoom actual.

### `webFrame.setZoomLevelLimits (minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

**Obsoleto:** Llamar al `setVisualZoomLevelLimits` en su lugar para establecer los límites del nivel de zoom visual. Este método se eliminará en Electron 2.0.

### `webFrame.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

Establecer el nivel de máximo y mínimo pizca de zoom.

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

Establece el nivel de zoom máximo y mínimo basado en el diseño (es decir, no visual).

### `webFrame.setSpellCheckProvider (Idioma, autoCorrectorPalabra, proveedor)`

* `idioma` Cadena
* `autoCorrectorPalabra` Boolean
* `proveedor` Objeto 
  * `Corrector Ortográfico
` Función - Devoluciones `Boolean` 
    * `texto` Cadena

Establece un proveedor para la corrección ortográfica en campos de entrada y áreas de texto.

El `proveedor` debe ser un objeto que tenga un método de `corrección ortográfica` que devuelva si la palabra aprobada está escrita correctamente.

Un ejemplo de uso de [node-spellchecker](https://github.com/atom/node-spellchecker) como proveedor:

```javascript
const {webFrame} = require('electron')
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck (text) {
    return !(require('spellchecker').isMisspelled(text))
  }
})
```

### `webFrame.registerURLSchemeAsSecure(esquema)`

* `esquema` Cadena

Registra el `esquema` como esquema seguro.

Los esquemas seguros no activan advertencias de contenido mixto. Por ejemplo, `https` y `datos` son esquemas seguros porque no pueden ser dañados por atacantes de red activos.

### `webFrame.registerURLSchemeAsBypassingCSP(esquema)`

* `esquema` Cadena

Los recursos se cargarán desde este `esquema` independientemente de la Política de Seguridad de Contenido de la página actual.

### `webFrame.registerURLSchemeAsPrivileged(esquema[, opciones])`

* `esquema` Cadena
* `opciones` Objecto (opcional) 
  * ` seguro` Boolean - (opcional) Predeterminado verdadero.
  * `bypassCSP` Boolean - (opcional) Predeterminado verdadero.
  * `allowServiceWorkers` Boolean - Predeterminado verdadero (opcional).
  * `supportFetchAPI` Boolean - Predeterminado verdadero (opcional).
  * `corsEnabled` Boolean - Predeterminado verdadero (opcional).

Registra el `esquema` como seguro, omite la política de seguridad de contenido para los recursos, permite el registro de ServiceWorker y admite la API de recuperación.

Especifique una opción con el valor de `falso` para omitirla del registro. Un ejemplo de registro de un esquema con privilegios, sin eludir la Política de Seguridad de Contenido:

```javascript
const {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })
```

### `webFrame.insertText(texto)`

* `texto` String

Inserts `text` to the focused element.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `codigo` String
* `userGesture` Boolean (optional) - Default is `false`.
* `callback` Function (optional) - Called after script has been executed. 
  * `result` Any

Returns `Promise` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page.

In the browser window some HTML APIs like `requestFullScreen` can only be invoked by a gesture from the user. Setting `userGesture` to `true` will remove this limitation.

### `webFrame.getResourceUsage()`

Returns `Object`:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Returns an object describing usage information of Blink's internal memory caches.

```javascript
const {webFrame} = require('electron')
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