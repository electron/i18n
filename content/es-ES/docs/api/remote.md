# remote

> Usar módulos del main process desde el renderer process.

Proceso: [Renderer](../glossary.md#renderer-process)

> ⚠️ ADVERTENCIA ⚠️ El módulo  `remote` es [obsoleto](https://github.com/electron/electron/issues/21408). Instead of `remote`, use [`ipcRenderer`](ipc-renderer.md) and [`ipcMain`](ipc-main.md).
> 
> Lea más sobre porque el módulo `remote` es obsoleto [aquí](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).
> 
> If you still want to use `remote` despite the performance and security concerns, see [@electron/remote](https://github.com/electron/remote).

El módulo `remote` proporciona una manera sencilla de hacer una comunicación (IPC) entre el proceso de renderizado (página web) y el proceso principal.

En electron, los módulos relacionados con GUI (como `dialog`, `menu` etc.) están solamente disponibles en el proceso principal, no en el proceso de renderizado. Para usarlos en el proceso de renderizado, el módulo `ipc` es necesario para enviar mensajes entre procesos al proceso principal. Con el módulo `remote`, se puede invocar métodos del objeto del proceso principal sin enviar explícitamente mensajes entre procesos. Es parecido al [RMI][rmi] de Java. Ejemplo de creación de una ventana de navegador desde un proceso de renderizado:

```javascript
const { BrowserWindow } = require('electron').remote
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

**Note:** Para lo contrario (acceder al renderer process desde el main process), puede usar [webContents.executeJavaScript](web-contents.md#contentsexecutejavascriptcode-usergesture).

**Note:** El módulo remote puede ser deshabilitado por razones de seguridad en los siguientes contextos:

* [`BrowserWindow`](browser-window.md) - estableciendo la opción `enableRemoteModule` a `false`.
* [`<webview>`](webview-tag.md) - estableciendo el atributo `enableremotemodule` a `false`.

## Objetos Remotos

Cada objeto (incluidas las funciones) devuelto por el módulo `remote` representa un objeto en el proceso principal (lo llamaremos objeto remoto o función remota). Cuando se invocan métodos de un objeto remoto, cuando se llama a una función remota o cuando se crea un nuevo objeto con el constructor remoto (función), realmente se están enviando mensajes sincrónicos entre procesos.

En el ejemplo anterior, tanto [`BrowserWindow`](browser-window.md) y `win` fueron objetos remotos y `new BrowserWindow` no creó un objeto `BrowserWindow` en el proceso de renderizado. En cambio, creó un objeto `BrowserWindow` en el proceso principal y devolvió el objeto remoto correspondiente en el proceso de renderizado, concretamente el objeto `win`.

**Nota:** Solamente las [enumarable properties][enumerable-properties] que están presentes cuando primero se hace referencia al objeto remoto son accesibles vía el remota.

**Note:** Los arreglos y búferes son copiados sobre el IPC cuando son accedidas a través del módulo `remote`. Cuando se modifican en el proceso de renderizado no se modifican en el proceso principal y viceversa.

## Duración de objetos remotos

Electron se asegura que mientras que el objeto remoto exista en el proceso de renderizado (en otras palabra, que no haya sido recopilado como desecho), el objeto correspondiente no se liberará en el proceso principal. Cuando el objeto remoto haya sido recopilado como desecho, la referencia del objeto correspondiente en el proceso principal se elimina.

Si el objeto remoto se filtra en el proceso de renderizado (por ejemplo, almancenado en un mapa pero nunca liberado), el objeto correspondiente en el proceso principal también se filtrará, por lo tanto hay que tener cuidado de no filtrar objetos remotos.

Los tipos de valor primario como cadenas y números, sin embargo, son enviados por copia.

## Pasar los callbacks al proceso principal

El código en el proceso principal puede aceptar callbacks desde el renderizador, por ejemplo el módulo `remote`, pero hay que extremo cuidado cuando se usa esta característica.

First, in order to avoid deadlocks, the callbacks passed to the main process are called asynchronously. You should not expect the main process to get the return value of the passed callbacks.

Por ejemplo, no se puede utilizar una función del proceso de renderizado en un `Array.map` llamado en el proceso principal:

```javascript
// main process mapNumbers.js
exports.withRendererCallback = (mapper) => {
  return [1, 2, 3].map(mapper)
}

exports.withLocalCallback = () => {
  return [1, 2, 3].map(x => x + 1)
}
```

```javascript
// renderer process
const mapNumbers = require('electron').remote.require('./mapNumbers')
const withRendererCb = mapNumbers.withRendererCallback(x => x + 1)
const withLocalCb = mapNumbers.withLocalCallback()

console.log(withRendererCb, withLocalCb)
// [undefined, undefined, undefined], [2, 3, 4]
```

Como puede observarse, el valor devuelto sincrónico del callback renderizador no era como se esperaba, y no coincide con el valor devuelto de un callback idéntico que existe en el proceso principal.

Segundo, los callbacks pasados al proceso principal persistirán hasta que los desechos del proceso principal los recopile.

Por ejemplo, el siguiente código parece inocente a primera vista. It installs a callback for the `close` event on a remote object:

```javascript
require('electron').remote.getCurrentWindow().on('close', () => {
  // window was closed...
})
```

Pero recuerde que el callback está referenciado por el proceso principal hasta que se desinstale explícitamente. Si no lo haces, cada vez que recargues la ventana el callback se instalará de nuevo, filtrando un callback por cada reinicio.

Para empeorar las cosas, debido a que el contexto de los callbacks previamente instalados han sido liberados, las excepciones surgirán en el proceso principal cuando se emita el evento `close`.

Para evitar esto, asegúrese de borrar cualquier referencia a los callbacks del renderizador passados al proceso principal. Esto incluye borrar los controladores de evento, o asegurarse de que se le diga al proceso principal que elimine las referencia de los callbacks que vinieron desde un proceso de renderizado que esta cerrándose.

## Acceso a módulos incorporados en el proceso principal

Los módulos incorporados en el proceso principal se añaden como captadores en el módulo `remoto`, por lo que se puede utilizar directamente como el módulo de `electron`.

```javascript
const app = require('electron').remote.app
console.log(app)
```

## Métodos

El módulo `remote` tiene los siguientes métodos:

### `remote.getCurrentWindow()`

Devuelve [`BrowserWindow`](browser-window.md) - La ventana a la cual pertenece esta página web.

**Note:** No use `removeAllListeners` en [`BrowserWindow`](browser-window.md). El uso de esto puede remover todo los listeners [`blur`](https://developer.mozilla.org/en-US/docs/Web/Events/blur), desactivar los eventos click de los botones en la barra táctil y otras consecuencias no deseadas.

### `remote.getCurrentWebContents()`

Devuelve [`WebContents`](web-contents.md) - Los contenidos web de esta página web.

### `remote.getGlobal(name)`

* `name` String

Devuelve `any` - La variable global de `name` (por ejemplo `global[name]`) en el proceso principal.

## Propiedades

### `remote.require`

A `NodeJS.Require` function equivalent to `require(module)` in the main process. Los módulos especificados por su ruta relativa se resolverán en relación al punto de entrada del proceso principal.

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
// main process: main/index.js
const { app } = require('electron')
app.whenReady().then(() => { /* ... */ })
```

```js
// some relative module: main/foo.js
module.exports = 'bar'
```

```js
// renderer process: renderer/index.js
const foo = require('electron').remote.require('./foo') // bar
```

### `remote.process` _Readonly_

Un objeto `NodeJS.Process`.  El objeto `process` en el main process. Esto es el mismo que `remote.getGlobal('process')` pero está en cache.

[rmi]: https://en.wikipedia.org/wiki/Java_remote_method_invocation
[enumerable-properties]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
