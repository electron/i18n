# ipcMain

> Se comunica de forma asincrónica desde el proceso principal a los procesos de renderizado.

Process: [Main](../glossary.md#main-process)

El módulo `ipcMain` es una instancia de la clase [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Cuando se utiliza en el proceso principal, maneja mensajes asincrónicos y sincrónicos enviados desde el proceso de renderizado (página web). Los mensajes enviados desde el renderizador serán emitidos a este módulo.

## Enviando mensajes

También es posible enviar mensajes desde el proceso principal al proceso de renderizado, ver [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-) para más información.

* Cuando se envía un mensaje, el nombre del evento es el`channel`.
* Para responder a un mensaje sincrónico, es necesario establecer `event.returnValue`.
* Para enviar un mensaje asincrónico de vuelta al remitente, puede utilizar `event.sender.send(...)`.

Ejemplo de envío y manejo de mensajes entre el proceso de renderizado y el principal:

```javascript
// En el proceso principal.
const {ipcMain} = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
```

```javascript
// En el proceso de renderizado (página web).
const {ipcRenderer} = require('electron')
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

Escucha al `channel`. Cuando llega un nuevo mensaje `listener` es llamado con `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` Cadena
* `listener` Función

Agrega una función `listener` para el evento. Este `listener` es invocado solo la próxima vez que se envía un mensaje a `channel`, después que se elimina.

### `ipcMain.removeListener(channel, listener)`

* `channel` Cadena
* `listener` Función

Elimina el `listener` especificado del arreglo del oyente para el `channel` especificado.

### `ipcMain.removeAllListeners([channel])`

* `channel` Cadena

Elimina los oyentes del `channel` especificado.

## Objeto de evento

El objeto `event` pasado a la `callback` tiene los siguientes métodos:

### `event.returnValue`

Lo configura al valor que será devuelto en un mensaje sincrónico.

### `event.sender`

Devuelve el `webContents` que envió el mensaje. Puede llamar a `event.sender.send` para responder al mensaje asincrónico. Consulte [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-) para obtener más información.