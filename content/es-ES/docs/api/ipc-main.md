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
* `listener` Función
  * `event` IpcMainEvent
  * `...args` any[]

Escucha al `channel`. Cuando llega un nuevo mensaje `listener` es llamado con `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` Cadena
* `listener` Función
  * `event` IpcMainEvent
  * `...args` any[]

Agrega una función de `listener` una vez para el evento. Este `listener` se invoca solo la próxima vez que se envíe un mensaje a `channel`, después del cual se elimina.

### `ipcMain.removeListener(channel, listener)`

* `channel` Cadena
* `listener` Función
  * `...args` any[]

Elimina el `listener` especificado del arreglo del oyente para el `channel` especificado.

### `ipcMain.removeAllListeners([channel])`

* `channel` Cadena (opcional)

Elimina los oyentes del `channel` especificado.

### `ipcMain. Handle (Channel, Listener)`

* `channel` Cadena
* `listener`<Promise\<void> de función | cualquier >
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Agrega un controlador para una IPC `invoke`able. Se llamará a este controlador cada vez que un procesador llame a `ipcRenderer.invoke(channel, ...args)`.

Si `listener` devuelve una Promise, el eventual resultado de la promise será devuelto como una respuesta al controlador remoto. De lo contrario, el valor de retorno del listener será usado como el valor de la respuesta.

```js
Proceso principal
ipcMain. Handle (' My-invokable-IPC ', Async (Event,... args) => {
  const result = Await somePromise (... args)
  Return result
})

//proceso del renderizador
Async () => {
  const result = Await ipcRenderer. Invoke (' My-invokable-IPC ', arg1, arg2)
  //...
}
```

El `event` que es pasado como primer argumento al handler es el mismo que es pasado a un event listener normal. Incluye información sobre cual WebContents es el origen de la solicitud invocada.

### `ipcMain. handleOnce (Channel, Listener)`

* `channel` Cadena
* `listener`<Promise\<void> de función | cualquier >
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Maneja un solo `invoke`able mensaje IPC, luego elimina el listener. Consulta `ipcMain.handle(channel, listener)`.

### `ipcMain. removeHandler (Channel)`

* `channel` Cadena

Elimina cualquier controlador para `channel`, si hay.

## Objeto IpcMainEvent

La documentación para el objeto `event` pasado a `callback` puede ser encontrada en la estructura de documentos de [`ipc-main-event`](structures/ipc-main-event.md).

## Objeto IpcMainInvokeEvent

La documentación para el objeto `event` pasado a `handle` callbacks puede ser encontrada en la estructura de documentos [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md).

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[web-contents-send]: web-contents.md#contentssendchannel-args
