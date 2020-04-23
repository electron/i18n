# ipcMain

> Se comunica de forma asincrónica desde el proceso principal a los procesos de renderizado.

Proceso: [Main](../glossary.md#main-process)

The `ipcMain` module is an [Event Emitter](https://nodejs.org/api/events.html#events_class_eventemitter). Cuando se utiliza en el proceso principal, maneja mensajes asincrónicos y sincrónicos enviados desde el proceso de renderizado (página web). Los mensajes enviados desde el renderizador serán emitidos a este módulo.

## Enviando mensajes

También es posible enviar mensajes desde el proceso principal al proceso de renderizado, ver [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) para más información.

* Cuando se envía un mensaje, el nombre del evento es el`channel`.
* Para responder a un mensaje sincrónico, es necesario establecer `event.returnValue`.
* Para enviar un mensaje asíncrono de vuelta al emisor, puede usar `event.reply(...)`.  Este método de ayuda automáticamente va a manejar los mensajes entrantes desde frames que no son el frame principal (ejemplo iframes) mientras que `event.sender.send(...)` siempre enviará al frame principal.

Ejemplo de envío y manejo de mensajes entre el proceso de renderizado y el principal:

```javascript
// En el proceso principal.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
```

```javascript
// En el proceso de renderizado (página web).
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## Métodos

El módulo `ipcMain` tiene el siguiente método para escuchar los eventos:

### `ipcMain.on(channel, listener)`

* `channel` Cadena
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

Escucha al `channel`. Cuando llega un nuevo mensaje `listener` es llamado con `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` Cadena
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcMain.removeListener(channel, listener)`

* `channel` Cadena
* `listener` Function
  * `...args` any[]

Elimina el `listener` especificado del arreglo del oyente para el `channel` especificado.

### `ipcMain.removeAllListeners([channel])`

* `channel` Cadena (opcional)

Elimina los oyentes del `channel` especificado.

### `ipcMain.handle(channel, listener)`

* `channel` Cadena
* `listener` Function<Promise<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Adds a handler for an `invoke`able IPC. This handler will be called whenever a renderer calls `ipcRenderer.invoke(channel, ...args)`.

If `listener` returns a Promise, the eventual result of the promise will be returned as a reply to the remote caller. Otherwise, the return value of the listener will be used as the value of the reply.

```js
// Main process
ipcMain.handle('my-invokable-ipc', async (event, ...args) => {
  const result = await somePromise(...args)
  return result
})

// Renderer process
async () => {
  const result = await ipcRenderer.invoke('my-invokable-ipc', arg1, arg2)
  // ...
}
```

The `event` that is passed as the first argument to the handler is the same as that passed to a regular event listener. It includes information about which WebContents is the source of the invoke request.

### `ipcMain.handleOnce(channel, listener)`

* `channel` Cadena
* `listener` Function<Promise<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Handles a single `invoke`able IPC message, then removes the listener. See `ipcMain.handle(channel, listener)`.

### `ipcMain.removeHandler(channel)`

* `channel` Cadena

Removes any handler for `channel`, if present.

## IpcMainEvent object

La documentación para el objeto `event` pasado a `callback` puede ser encontrada en la estructura de documentos de [`ipc-main-event`](structures/ipc-main-event.md).

## IpcMainInvokeEvent object

The documentation for the `event` object passed to `handle` callbacks can be found in the [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) structure docs.
