# ipcMain

> Se comunica de forma asincrónica desde el proceso principal a los procesos de renderizado.

Process: [Main](../glossary.md#main-process)

El módulo `ipcMain` es una instancia de la clase [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Cuando se utiliza en el proceso principal, maneja mensajes asincrónicos y sincrónicos enviados desde el proceso de renderizado (página web). Los mensajes enviados desde el renderizador serán emitidos a este módulo.

## Enviando mensajes

También es posible enviar mensajes desde el proceso principal al proceso de renderizado, ver [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) para más información.

* Cuando se envía un mensaje, el nombre del evento es el`channel`.
* Para responder a un mensaje sincrónico, es necesario establecer `event.returnValue`.
* To send an asynchronous message back to the sender, you can use `event.reply(...)`. This helper method will automatically handle messages coming from frames that aren't the main frame (e.g. iframes) whereas `event.sender.send(...)` will always send to the main frame.

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

Agrega una función `listener` para el evento. Este `listener` es invocado solo la próxima vez que se envía un mensaje a `channel`, después que se elimina.

### `ipcMain.removeListener(channel, listener)`

* `channel` Cadena
* `listener` Función

Elimina el `listener` especificado del arreglo del oyente para el `channel` especificado.

### `ipcMain.removeAllListeners([channel])`

* `channel` Cadena

Elimina los oyentes del `channel` especificado.

## Objeto de evento

La documentación para el objeto `event` pasado a `callback` puede ser encontrada en la estructura de documentos de [`ipc-main-event`](structures/ipc-main-event.md).