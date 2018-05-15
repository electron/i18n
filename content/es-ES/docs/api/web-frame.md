# webFrame

> Personalice la reproducción de la página web actual.

Proceso: [Renderer](../glossary.md#renderer-process)

Un ejemplo de zoom de la página actual al 200%.

```javascript
const {webFrame} = require('electron')

webFrame.setZoomFactor(2)
```

## Métodos

El módulo `webFrame` tiene los siguientes métodos:

### `webFrame.setZoomFactor(factor)`

* `factor` Number - Factor Zoom.

Cambia el factor zoom al factor especificado. El factor zoom es el porcentaje de zoom dividido por 100, por lo que 300% = 3.0.

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

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

Establece el nivel de zoom máximo y mínimo basado en el diseño (es decir, no visual).

### `webFrame.setSpellCheckProvider (Idioma, autoCorrectorPalabra, proveedor)`

* `idioma` Cadena
* `autoCorrectorPalabra` Boolean
* `proveedor` Object 
  * `Corrector Ortográfico
` Función - Devoluciones `Boolean`. 
    * `texto` String

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

* `scheme` String

Registra el `esquema` como esquema seguro.

Los esquemas seguros no activan advertencias de contenido mixto. Por ejemplo, `https` y `datos` son esquemas seguros porque no pueden ser dañados por atacantes de red activos.

### `webFrame.registerURLSchemeAsBypassingCSP(esquema)`

* `scheme` String

Los recursos se cargarán desde este `esquema` independientemente de la Política de Seguridad de Contenido de la página actual.

### `webFrame.registerURLSchemeAsPrivileged(esquema[, opciones])`

* `scheme` String
* `opciones` Objecto (opcional) 
  * `secure` Boolean (optional) - Default true.
  * `bypassCSP` Boolean (optional) - Default true.
  * `allowServiceWorkers` Boolean (optional) - Default true.
  * `supportFetchAPI` Boolean (optional) - Default true.
  * `corsEnabled` Boolean (optional) - Default true.

Registra el `esquema` como seguro, omite la política de seguridad de contenido para los recursos, permite el registro de ServiceWorker y admite la API de recuperación.

Especifique una opción con el valor de `falso` para omitirla del registro. Un ejemplo de registro de un esquema con privilegios, sin eludir la Política de Seguridad de Contenido:

```javascript
const {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })
```

### `webFrame.insertText(texto)`

* `texto` String

Inserta `texto` en el elemento enfocado.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `codigo` String
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.
* `callback` Función (opcional) - Llamado después de que se haya ejecutado el script. 
  * `resultado` Cualquiera

Devolver `Promesa`: una promesa se resuelve con el resultado del código ejecutado o se rechaza si el resultado del código es una promesa rechazada.

Evalúa el `code` en la página.

En la ventana del buscador, algunas APIs HTML como `requestFullScreen` solo pueden ser invocadas por un gesto del usuario. Configurar `userGesture` a `true` eliminará esta limitación.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.
* `callback` Función (opcional) - Llamado después de que se haya ejecutado el script. 
  * `resultado` Cualquiera

Work like `executeJavaScript` but evaluates `scripts` in isolated context.

### `webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)`

* `worldId` Integer
* `csp` String

Set the content security policy of the isolated world.

### `webFrame.setIsolatedWorldHumanReadableName(worldId, name)`

* `worldId` Integer
* `name` String

Set the name of the isolated world. Useful in devtools.

### `webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)`

* `worldId` Integer
* `securityOrigin` String

Set the security origin of the isolated world.

### `webFrame.getResourceUsage()`

Devuelve `Objecto`:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Devuelve un objeto que describe la información de uso de las cachés de memoria interna de Blink.

```javascript
const {webFrame} = requiere('electron')
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