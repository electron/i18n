# remote

> Utiliza los módulos del proceso principal del proceso de renderizado.

Proceso: [Renderer](../glossary.md#renderer-process)

El módulo `remote` proporciona una manera sencilla de hacer una comunicación (IPC) entre el proceso de renderizado (página web) y el proceso principal.

En electron, los módulos relacionados con GUI (como `dialog`, `menu` etc.) están solamente disponibles en el proceso principal, no en el proceso de renderizado. Para usarlos en el proceso de renderizado, el módulo `ipc` es necesario para enviar mensajes entre procesos al proceso principal. Con el módulo `remote`, se puede invocar métodos del objeto del proceso principal sin enviar explícitamente mensajes entre procesos. Es parecido al [RMI](http://en.wikipedia.org/wiki/Java_remote_method_invocation) de Java. Ejemplo de creación de una ventana de navegador desde un proceso de renderizado:

```javascript
const {BrowserWindow} = require('electron').remote
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

**Nota:** Para realizar esta acción al revés (acceder al proceso de renderizado desde el proceso principal) se puede utilizar [webContents.executeJavascript](web-contents.md#contentsexecutejavascriptcode-usergesture-callback).

## Objetos Remotos

Cada objeto (incluidas las funciones) devuelto por el módulo `remote` representa un objeto en el proceso principal (lo llamaremos objeto remoto o función remota). Cuando se invocan métodos de un objeto remoto, cuando se llama a una función remota o cuando se crea un nuevo objeto con el constructor remoto (función), realmente se están enviando mensajes sincrónicos entre procesos.

En el ejemplo anterior, tanto `BrowserWindow` y `win` fueron objetos remotos y `new BrowserWindow` no creó un objeto `BrowserWindow` en el proceso de renderizado. Instead, it created a `BrowserWindow` object in the main process and returned the corresponding remote object in the renderer process, namely the `win` object.

**Note:** Only [enumerable properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) which are present when the remote object is first referenced are accessible via remote.

**Note:** Arrays and Buffers are copied over IPC when accessed via the `remote` module. Modifying them in the renderer process does not modify them in the main process and vice versa.

## Lifetime of Remote Objects

Electron makes sure that as long as the remote object in the renderer process lives (in other words, has not been garbage collected), the corresponding object in the main process will not be released. When the remote object has been garbage collected, the corresponding object in the main process will be dereferenced.

If the remote object is leaked in the renderer process (e.g. stored in a map but never freed), the corresponding object in the main process will also be leaked, so you should be very careful not to leak remote objects.

Primary value types like strings and numbers, however, are sent by copy.

## Passing callbacks to the main process

Code in the main process can accept callbacks from the renderer - for instance the `remote` module - but you should be extremely careful when using this feature.

First, in order to avoid deadlocks, the callbacks passed to the main process are called asynchronously. You should not expect the main process to get the return value of the passed callbacks.

For instance you can't use a function from the renderer process in an `Array.map` called in the main process:

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

As you can see, the renderer callback's synchronous return value was not as expected, and didn't match the return value of an identical callback that lives in the main process.

Second, the callbacks passed to the main process will persist until the main process garbage-collects them.

For example, the following code seems innocent at first glance. It installs a callback for the `close` event on a remote object:

```javascript
require('electron').remote.getCurrentWindow().on('close', () => {
  // la ventana está cerrada...
})
```

But remember the callback is referenced by the main process until you explicitly uninstall it. If you do not, each time you reload your window the callback will be installed again, leaking one callback for each restart.

To make things worse, since the context of previously installed callbacks has been released, exceptions will be raised in the main process when the `close` event is emitted.

To avoid this problem, ensure you clean up any references to renderer callbacks passed to the main process. This involves cleaning up event handlers, or ensuring the main process is explicitly told to deference callbacks that came from a renderer process that is exiting.

## Accessing built-in modules in the main process

The built-in modules in the main process are added as getters in the `remote` module, so you can use them directly like the `electron` module.

```javascript
const app = require('electron').remote.app
console.log(app)
```

## Métodos

The `remote` module has the following methods:

### `remote.require(module)`

* `module` String

Returns `any` - The object returned by `require(module)` in the main process. Modules specified by their relative path will resolve relative to the entrypoint of the main process.

e.g.

    project/
    ├── main
    │   ├── foo.js
    │   └── index.js
    ├── package.json
    └── renderer
        └── index.js
    

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

Returns [`BrowserWindow`](browser-window.md) - The window to which this web page belongs.

### `remote.getCurrentWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents of this web page.

### `remote.getGlobal(name)`

* `name` String

Returns `any` - The global variable of `name` (e.g. `global[name]`) in the main process.

## Propiedades

### `remote.process`

The `process` object in the main process. This is the same as `remote.getGlobal('process')` but is cached.