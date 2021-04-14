# webFrame

> Personalizar el renderizado de la página web actual.

Proceso: [Renderer](../glossary.md#renderer-process)

`webFrame` exportación del mudulo Electron es una instancia de la clase `WebFrame` que representa el frame superior del actual `BrowserWindow`. Sub-frames pueden ser recuperados a través de propiedades y métodos determinados (ejemplo `webFrame.firstChild`).

Un ejemplo de zoom de la página actual al 200%.

```javascript
const { webFrame } = require('electron')

webFrame.setZoomFactor(2)
```

## Métodos

La clase `WebFrame` tiene los siguientes métodos de instancia:

### `webFrame.setZoomFactor(factor)`

* `factor` Double - Factor de zoom; por defecto es 1.0.

Cambia el nivel de zoom al nivel especificado. Factor de zoom es porcentaje de zoom dividido entre 100, así que 300% = 3.0.

El factor debe ser mayor que 0.0.

### `webFrame.getZoomFactor()`

Devuelve `Número` - El factor de zoom actual.

### `webFrame.setZoomLevel(level)`

* `nivel` Número - Nivel de Zoom.

Cambia el nivel de zoom al nivel especificado. El tamaño original es 0 y cada incremento por encima o por debajo representa un zoom del 20% mayor o menor a los límites predeterminados de 300% y 50% del tamaño original, respectivamente.

> **Nota**: la política de zoom en el nivel de cromo es la misma-origen, lo que significa que el nivel de zoom para un dominio específico se propaga en todas las instancias de Windows con el mismo dominio. Diferenciar las URL de las ventanas hará que el zoom se trabaje por ventana.

### `webFrame.getZoomLevel()`

Devuelve `Número` - El nivel de zoom actual.

### `webFrame.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Número
* `maximumLevel` Número

Establecer el nivel de máximo y mínimo pizca de zoom.

> **Nota**: el zoom visual se inhabilita por defecto en Electron. Para volver a habilitarlo, llama a:
> 
> ```js
webFrame.setVisualZoomLevelLimits(1, 3)
```

### `webFrame.setSpellCheckProvider(language, provider)`

* `idioma` Cadena
* Objeto `provider`
  * Función `spellCheck`
    * `words` String[]
    * `callback` Función
      * `misspeltWords` String[]

Establece un proveedor para la corrección ortográfica en campos de entrada y áreas de texto.

Si quiere utilizar este método debe deshabilitar el corrector ortográfico incorporado cuando construya la ventana.

```js
const mainWindow = new BrowserWindow({
  webPreferences: {
    spellcheck: false
  }
})
```

El `provider` debe ser un objeto que tiene un método `spellCheck` que acepte un array de palabras individuales para revisión ortográfica. La función `spellCheck` corre cronológicamente y llama a la función `callback` con un array de palabras mal escritas cuando se completa.

Un ejemplo de uso de [node-spellchecker][spellchecker] como proveedor:

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

Devuelve `String` - Una llave para el CSS insertado que puede ser utilizado más tarde para eliminar el CSS a través de `webFrame.removeInsertedCSS(key)`.

Inyecta CSS en la página web actual y devuelve un identificador único para la hoja de estilo insertada.

### `webFrame.removeInsertedCSS(key)`

* `llave` Cadena

Elimina el CSS insertado desde la página web actual. La hoja de estilos se identifica por su clave, que se devuelve desde `webFrame.insertCSS(css)`.

### `webFrame.insertText(texto)`

* `texto` String

Inserta `texto` en el elemento enfocado.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `codigo` String
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.
* `callback` function (opcional)-se llama una vez que se ha ejecutado la secuencia de comandos. A menos que se suspenda la trama (p. ej., mostrando una alerta modal), la ejecución será sincrónica y la devolución de llamada se invocará antes de que el método regrese. Para compatibilidad con una versión anterior de este método, el parámetro de error es segundo.
  * `resultado` Cualquiera
  * `error` Error

Devuelve `Promise<any>` -una promesa que se resuelve con el resultado del código de ejecutado o se rechaza si se produce una ejecución o se produce una promesa rechazada.

Evalúa el `código` en la página.

En la ventana del navegador, algunas API HTML como `requestFullScreen` solo pueden invocarse con un gesto del usuario. Establecer `userGesture` a `true` eliminará esta limitación.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer-el ID del mundo en el que se ejecuta el de JavaScript, `0` es el mundo principal predeterminado (donde se ejecuta el contenido), `999` es el mundo utilizado por la característica de `contextIsolation` de Electron. Acepta valores en el rango 1.. 536870911.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opcional) - Predeterminado es `falso`.
* `callback` function (opcional)-se llama una vez que se ha ejecutado la secuencia de comandos. A menos que se suspenda la trama (p. ej., mostrando una alerta modal), la ejecución será sincrónica y la devolución de llamada se invocará antes de que el método regrese.  Para compatibilidad con una versión anterior de este método, el parámetro de error es segundo.
  * `resultado` Cualquiera
  * `error` Error

Devuelve `Promise<any>` -una promesa que se resuelve con el resultado del código de ejecutado o se rechaza si no se puede iniciar la ejecución.

Funciona como `executeJavaScript` pero evaluá `scripts` en un contexto aislado.

Ten en cuenta que cuando se produce un error en la ejecución del script, la promesa devuelta no rechazará y la `result` se `undefined`. Esto se debe a que Chromium no enviar errores de mundos aislados a mundos extranjeros.

### `webFrame.setIsolatedWorldInfo(worldId, info)`

* `worldId` Integer - El ID de la palabra para correr javascript en, `0` es el mundo por defecto, `999` es el mundo usado por la característica de Electron `contextIsolation`. Las extenciones de Chrome reservan el rango de IDs en `[1 << 20, 1 << 29)`. Puede aquí suministrar cualquier entero.
* Objeto `info`
  * `securityOrigin` String (opcional) - Origen de seguridad para el mundo aislado.
  * `csp` String (opcional) - Política de Seguridad de Contenido para el mundo aislado.
  * `name` cadena (opcional)-nombre para el mundo aislado. Útil en DevTools.

Establece el origen de seguridad, la política de seguridad del contenido y el nombre del mundo aislado. Nota: si se especifica el `csp` , también se debe especificar el `securityOrigin` .

### `webFrame.getResourceUsage()`

Devuelve `Objecto`:

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

### `webFrame.isWordMisspelled(word)`

* `word` String-the Word to spellchecked (ortografía).

Devuelve `Boolean` -true si la palabra está mal escrita de acuerdo con el corrector de ortografía incorporado, falso en caso contrario. Si no se carga ningún diccionario, siempre devuelve false.

### `webFrame.getWordSuggestions(word)`

* `word` cadena-la palabra mal escrita.

Devuelve `String[]` -una lista de palabras sugeridas para una palabra determinada. Si la palabra se escribe correctamente, el resultado estará vacío.

## Propiedades

### `webFrame.top` _Readonly_

Un `WebFrame | null` que representa el frame superior en la jerarquía de frames al cual pertenece el `webFrame`, la propiedad debe ser `null` si el frame superior no está en el renderer process actual.

### `webFrame.opener` _Readonly_

Un `WebFrame` representa el frame `webFrame` que abrió, la propiedad debería ser `null` si no hay abridores o si el abridor no está en el proceso renderer actual.

### `webFrame.parent` _Readonly_

Un `WebFrame | null` que representa el frame padre de `webFrame`, la propiedad debería ser `null` si `webFrame` es superior o el padre no está en renderer process actual.

### `webFrame.firstChild` _Readonly_

Un `WebFrame | null` que representa al primer frame hijo de `webFrame`, la propiedad debería ser `null` si `webFrame` no tiene hijos o el primer hijo no esta en el renderer process actual.

### `webFrame.nextSibling` _Readonly_

Un `WebFrame | null` que representa el siguiente frame hermano, la propiedad debería ser `null` si `webFrame` es el último frame en su padre o si el siguiente hermano no está en el renderer process actual.

### `webFrame.routingId` _Readonly_

Una `Integer` que representa el ID de trama único en el proceso de representador actual. Las instancias diferentes de WebFrame que se refieren al mismo fotograma subyacente tendrán la misma `routingId`.

[spellchecker]: https://github.com/atom/node-spellchecker
