# ipcMain

> Se comunica de forma asincrónica desde el proceso principal a los procesos de renderizado.

Proceso: [principal](../glossary.md#main-process)</0>

El módulo `ipcMain` es una instancia de la clase [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Cuando se utiliza en el proceso principal, maneja mensajes asincrónicos y sincrónicos enviados desde el proceso de renderizado (página web). Los mensajes enviados desde el renderizador serán emitidos a este módulo.

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

Elimina el `listener` especificado del arreglo listener para el `channel` especificado.

### `ipcMain.removeAllListeners([channel])`

* `channel` Cadena

Elimina los oyentes del `channel` especificado.

## Objeto de evento

La documentación para el objeto `event` pasado a `callback` puede ser encontrada en la estructura de documentos de [`ipc-main-event`](structures/ipc-main-event.md).