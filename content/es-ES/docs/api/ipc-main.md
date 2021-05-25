# ipcMain

> Se comunica de forma asincrónica desde el proceso principal a los procesos de renderizado.

Proceso: [Main](../glossary.md#main-process)

El módulo `ipcMain` es un [Event Emitter][event-emitter]. Cuando se utiliza en el proceso principal, maneja mensajes asincrónicos y sincrónicos enviados desde el proceso de renderizado (página web). Los mensajes enviados desde el renderizador serán emitidos a este módulo.

## Enviando mensajes

También es posible enviar mensajes desde el proceso principal al proceso de renderizado, ver [webContents.send][web-contents-send] para más información.

* Cuando se envía un mensaje, el nombre del evento es el`channel`.
* Para responder a un mensaje sincrónico, es necesario establecer `event.returnValue`.
* Para enviar un mensaje asíncrono de vuelta al emisor, puede usar `event.reply(...)`.  Este método de ayuda automáticamente va a manejar los mensajes entrantes desde frames que no son el frame principal (ejemplo iframes) mientras que `event.sender.send(...)` siempre enviará al frame principal.

Ejemplo de envío y manejo de mensajes entre el proceso de renderizado y el principal:

```javascript
// In main process.
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
// In renderer process (web page).
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
* `listener` Función
  * `event` IpcMainEvent
  * `...args` any[]

Escucha al `channel`. Cuando llega un nuevo mensaje `listener` es llamado con `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` Cadena
* `listener` Función
  * `event` IpcMainEvent
  * `...args` any[]

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcMain.removeListener(channel, listener)`

* `channel` Cadena
* `listener` Función
  * `...args` any[]

Elimina el `listener` especificado del arreglo del oyente para el `channel` especificado.

### `ipcMain.removeAllListeners([channel])`

* `channel` Cadena (opcional)

Elimina los oyentes del `channel` especificado.

### `ipcMain.handle(channel, listener)`

* `channel` Cadena
* `listener` Function<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Adds a handler for an `invoke`able IPC. This handler will be called whenever a renderer calls `ipcRenderer.invoke(channel, ...args)`.

Si `listener` devuelve una Promise, el eventual resultado de la promise será devuelto como una respuesta al controlador remoto. De lo contrario, el valor de retorno del listener será usado como el valor de la respuesta.

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

El `event` que es pasado como primer argumento al handler es el mismo que es pasado a un event listener normal. Incluye información sobre cual WebContents es el origen de la solicitud invocada.

Los errores lanzados a través de `handle` en el main process no son transparentes, ya que se serializan y solo la propiedad `message` del error original es proveído al renderer process. Por favor, consulte [#24427](https://github.com/electron/electron/issues/24427) para más detalles.

### `ipcMain.handleOnce(channel, listener)`

* `channel` Cadena
* `listener` Function<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Maneja un solo `invoke`able mensaje IPC, luego elimina el listener. See `ipcMain.handle(channel, listener)`.

### `ipcMain.removeHandler(channel)`

* `channel` Cadena

Elimina cualquier controlador para `channel`, si hay.

## Objeto IpcMainEvent

La documentación para el objeto `event` pasado a `callback` puede ser encontrada en la estructura de documentos de [`ipc-main-event`](structures/ipc-main-event.md).

## Objeto IpcMainInvokeEvent

La documentación para el objeto `event` pasado a `handle` callbacks puede ser encontrada en la estructura de documentos [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md).

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[web-contents-send]: web-contents.md#contentssendchannel-args
