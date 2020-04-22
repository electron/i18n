# ipcRenderer

> Comunica asincrónicamente desde un proceso de renderizado al proceso principal.

Proceso: [Renderer](../glossary.md#renderer-process)

The `ipcRenderer` module is an  [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Proporciona un par de métodos para enviar mensajes sincrónicos y asincrónicos desde el proceso de renderizado (página web) al proceso principal. También puede recibir respuestas del proceso principal.

Ver [ipcMain](ipc-main.md) para ejemplos de códigos.

## Métodos

El módulo `ipcRenderer` tiene los siguientes métodos para escuchar los eventos y mensajes enviados:

### `ipcRenderer.on(channel, listener)`

* `channel` Cadena
* `listener` Función
  * `event` IpcRendererEvent
  * `...args` any[]

Escucha al `channel`. Cuando llega un nuevo mensaje `listener` es llamado con `listener(event, args...)`.

### `ipcRenderer.once(channel, listener)`

* `channel` Cadena
* `listener` Función
  * `event` IpcRendererEvent
  * `...args` any[]

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` Cadena
* `listener` Función
  * `...args` any[]

Elimina el `listener` especificado del arreglo del oyente para el `channel` especificado.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` Cadena

Elimina todos los oyentes, o aquellos del `channel` especificado.

### `ipcRenderer.send(channel, ...args)`

* `channel` Cadena
* `...args` any[]

Send an asynchronous message to the main process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The main process handles it by listening for `channel` with the [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.invoke(channel, ...args)`

* `channel` Cadena
* `...args` any[]

Returns `Promise<any>` - Resolves with the response from the main process.

Send a message to the main process via `channel` and expect a result asynchronously. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The main process should listen for `channel` with [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener).

Por ejemplo:
```javascript
// Renderer process
ipcRenderer.invoke('some-name', someArgument).then((result) => {
  // ...
})

// Main process
ipcMain.handle('some-name', async (event, someArgument) => {
  const result = await doSomeWork(someArgument)
  return result
})
```

### `ipcRenderer.sendSync(channel, ...args)`

* `channel` Cadena
* `...args` any[]

Devuelve `any` - El valor enviado de vuelta por el controlador [`ipcMain`](ipc-main.md).

Send a message to the main process via `channel` and expect a result synchronously. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

El processo principal lo controlo por escuchar `channel` con el módulo [`ipcMain`](ipc-main.md), y contesta configurando `event.returnValue`.

> :warning: **WARNING**: Sending a synchronous message will block the whole renderer process until the reply is received, so use this method only as a last resort. It's much better to use the asynchronous version, [`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args).

### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* `channel` Cadena
* `...args` any[]

Envía un mensaje a la ventana con `webContentsId` a través de `channel`.

### `ipcRenderer.sendToHost(channel, ...args)`

* `channel` Cadena
* `...args` any[]

Es como `ipcRenderer.send` pero el evento se enviará al `<webview>`elemento en la página host en vez de el proceso principal.

## Objeto de evento

La documentación para el objeto `event` pasado a `callback` pude ser encontrada en la estructura de documentos de [`ipc-renderer-event`](structures/ipc-renderer-event.md).
