# remote

> Utiliza los módulos del proceso principal del proceso de renderizado.

Proceso: [Renderer](../glossary.md#renderer-process)

El módulo `remote` proporciona una manera sencilla de hacer una comunicación (IPC) entre el proceso de renderizado (página web) y el proceso principal.

En electron, los módulos relacionados con GUI (como `dialog`, `menu` etc.) están solamente disponibles en el proceso principal, no en el proceso de renderizado. Para usarlos en el proceso de renderizado, el módulo `ipc` es necesario para enviar mensajes entre procesos al proceso principal. With the `remote` module, you can invoke methods of the main process object without explicitly sending inter-process messages, similar to Java's [RMI](https://en.wikipedia.org/wiki/Java_remote_method_invocation). Ejemplo de creación de una ventana de navegador desde un proceso de renderizado:

```javascript
const {BrowserWindow} = require('electron').remote
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

**Nota:** Para realizar esta acción al revés (acceder al proceso de renderizado desde el proceso principal) se puede utilizar [webContents.executeJavascript](web-contents.md#contentsexecutejavascriptcode-usergesture-callback).

## Objetos Remotos

Cada objeto (incluidas las funciones) devuelto por el módulo `remote` representa un objeto en el proceso principal (lo llamaremos objeto remoto o función remota). Cuando se invocan métodos de un objeto remoto, cuando se llama a una función remota o cuando se crea un nuevo objeto con el constructor remoto (función), realmente se están enviando mensajes sincrónicos entre procesos.

In the example above, both [`BrowserWindow`](browser-window.md) and `win` were remote objects and `new BrowserWindow` didn't create a `BrowserWindow` object in the renderer process. En cambio, creó un objeto `BrowserWindow` en el proceso principal y devolvió el objeto remoto correspondiente en el proceso de renderizado, concretamente el objeto `win`.

**Nota:** Solamente las [enumarable properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) que están presentes cuando primero se hace referencia al objeto remoto son accesibles vía el remota.

**Note:** Los arreglos y búferes son copiados sobre el IPC cuando son accedidas a través del módulo `remote`. Cuando se modifican en el proceso de renderizado no se modifican en el proceso principal y viceversa.

## Duración de objetos remotos

Electron se asegura que mientras que el objeto remoto exista en el proceso de renderizado (en otras palabra, que no haya sido recopilado como desecho), el objeto correspondiente no se liberará en el proceso principal. Cuando el objeto remoto haya sido recopilado como desecho, la referencia del objeto correspondiente en el proceso principal se elimina.

Si el objeto remoto se filtra en el proceso de renderizado (por ejemplo, almancenado en un mapa pero nunca liberado), el objeto correspondiente en el proceso principal también se filtrará, por lo tanto hay que tener cuidado de no filtrar objetos remotos.

Los tipos de valor primario como cadenas y números, sin embargo, son enviados por copia.

## Pasar los callbacks al proceso principal

El código en el proceso principal puede aceptar callbacks desde el renderizador, por ejemplo el módulo `remote`, pero hay que extremo cuidado cuando se usa esta característica.

Primero, para evitar interbloqueos, los callbacks pasados al proceso principal se llaman asincrónicamente. No hay que esperar a que el proceso principal obtenga el valor devuelto de los callbacks pasados.

Por ejemplo, no se puede utilizar una función del proceso de renderizado en un `Array.map` llamado en el proceso principal:

```javascript
// proceso principal mapNumbers.js
exports.withRendererCallback = (mapper) => {
  return [1, 2, 3].map(mapper)
}

exports.withLocalCallback = () => {
  return [1, 2, 3].map(x => x + 1)
}
```

```javascript
// proceso de renderizado
const mapNumbers = require('electron').remote.require('./mapNumbers')
const withRendererCb = mapNumbers.withRendererCallback(x => x + 1)
const withLocalCb = mapNumbers.withLocalCallback()

console.log(withRendererCb, withLocalCb)
// [undefined, undefined, undefined], [2, 3, 4]
```

Como puede observarse, el valor devuelto sincrónico del callback renderizador no era como se esperaba, y no coincide con el valor devuelto de un callback idéntico que existe en el proceso principal.

Segundo, los callbacks pasados al proceso principal persistirán hasta que los desechos del proceso principal los recopile.

Por ejemplo, el siguiente código parece inocente a primera vista. Instala un callback para el evento `close` en un objeto remoto:

```javascript
require('electron').remote.getCurrentWindow().on('close', () => {
  // la ventana se cerró...
})
```

Pero recuerde que el callback está referenciado por el proceso principal hasta que se desinstale explícitamente. Si no lo haces, cada vez que recargues la ventana el callback se instalará de nuevo, filtrando un callback por cada reinicio.

Para empeorar las cosas, debido a que el contexto de los callbacks previamente instalados han sido liberados, las excepciones surgirán en el proceso principal cuando se emita el evento `close`.

Para evitar esto, asegúrese de borrar cualquier referencia a los callbacks del renderizador passados al proceso principal. This involves cleaning up event handlers, or ensuring the main process is explicitly told to dereference callbacks that came from a renderer process that is exiting.

## Acceso a módulos incorporados en el proceso principal

Los módulos incorporados en el proceso principal se añaden como captadores en el módulo `remoto`, por lo que se puede utilizar directamente como el módulo de `electron`.

```javascript
const app = require('electron').remote.app
console.log(app)
```

## Métodos

El módulo `remote` tiene los siguientes métodos:

### `remote.require(module)`

* `module` Cadena

Devuelve `any` - El objeto devuelto por `require(module)` en el proceso principal. Los módulos especificados por su ruta relativa se resolverán en relación al punto de entrada del proceso principal.

por ejemplo.

```sh
project/
├── main
│   ├── foo.js
│   └── index.js
├── package.json
└── renderer
    └── index.js
```

```js
// proceso principal: main/index.js
const {app} = require('electron')
app.on('ready', () => { /* ... */ })
```

```js
// algún módulo relativo: main/foo.js
module.exports = 'bar'
```

```js
// proceso de renderizado: renderer/index.js
const foo = require('electron').remote.require('./foo') // bar
```

### `remote.getCurrentWindow()`

Devuelve [`BrowserWindow`](browser-window.md) - La ventana a la cual pertenece esta página web.

### `remote.getCurrentWebContents()`

Devuelve [`WebContents`](web-contents.md) - Los contenidos web de esta página web.

### `remote.getGlobal(name)`

* `name` Cadena

Devuelve `any` - La variable global de `name` (por ejemplo `global[name]`) en el proceso principal.

## Propiedades

### `remote.process`

El objeto `process` en el proceso principal. Este es igual a `remote.getGlobal('process')` pero está almacenado en caché.