# ipcMain

> Communicate asynchronously from the main process to renderer processes.

Prozess: [Main](../glossary.md#main-process)

The `ipcMain` module is an [Event Emitter][event-emitter]. When used in the main process, it handles asynchronous and synchronous messages sent from a renderer process (web page). Messages sent from a renderer will be emitted to this module.

## Sending Messages

It is also possible to send messages from the main process to the renderer process, see [webContents.send][web-contents-send] for more information.

* Beim Senden einer Nachricht ist der Ereignisname der `channel`.
* To reply to a synchronous message, you need to set `event.returnValue`.
* To send an asynchronous message back to the sender, you can use `event.reply(...)`.  This helper method will automatically handle messages coming from frames that aren't the main frame (e.g. iframes) whereas `event.sender.send(...)` will always send to the main frame.

An example of sending and handling messages between the render and main processes:

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

## Methoden

The `ipcMain` module has the following method to listen for events:

### `ipcMain.on(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

Listens to `channel`, when a new message arrives `listener` would be called with `listener(event, args...)`.

### `ipcMain.once(Kanal, Listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

Fügt eine einmalige `listener` Funktion für das Ereignis hinzu. Diese `listener` wird nur aufgerufen, wenn eine Nachricht das nächste Mal an `channel`gesendet wird, nach der sie entfernt wird.

### `ipcMain.removeListener(Kanal, Listener)`

* `channel` String
* `listener` Function
  * `...args` any[]

Entfernt die angegebenen `listener` aus dem Listenerarray für die angegebene `channel`.

### `ipcMain.removeAlleListen([channel])`

* `channel` String (optional)

Entfernt Listener der angegebenen `channel`.

### `ipcMain.handle(Kanal, Listener)`

* `channel` String
* `listener` Funktion<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Fügt einen Handler für einen `invoke`fähigen IPC hinzu. Dieser Handler wird aufgerufen, wenn ein Renderer `ipcRenderer.invoke(channel, ...args)`aufruft.

Wenn `listener` ein Versprechen zurückgibt, wird das letztendliche Ergebnis des Versprechens als Antwort an den Remoteaufrufer zurückgegeben. Andernfalls wird der Rückgabewert des -Listeners als Wert der Antwort verwendet.

```js
Hauptprozess
ipcMain.handle('my-invokable-ipc', async (event, ... args) =>
  const result = warten einigePromise(... args)
  Rückgabeergebnis


/ / Renderer-Prozess
async () =>
  const result = await ipcRenderer.invoke('my-invokable-ipc', arg1, arg2)
  / ...
}
```

Die `event` , die als erstes Argument an den Handler übergeben wird, entspricht dem , der an einen regulären Ereignislistener übergeben wurde. Sie enthält Informationen darüber, welche WebContents die Quelle der Aufrufanforderung ist.

### `ipcMain.handleOnce(Kanal, Listener)`

* `channel` String
* `listener` Funktion<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Behandelt eine einzelne `invoke`fähige IPC-Nachricht und entfernt dann den Listener. Siehe `ipcMain.handle(channel, listener)`.

### `ipcMain.removeHandler(Kanal)`

* `channel` String

Entfernt alle Handler für `channel`, falls vorhanden.

## IpcMainEvent-Objekt

Die Dokumentation für das `event` An das `callback` übergebene Objekt finden Sie in den [`ipc-main-event`](structures/ipc-main-event.md) Strukturdokumenten.

## IpcMainInvokeEvent-Objekt

Die Dokumentation für das `event` -Objekt, das an `handle` Rückrufe übergeben wurde, finden Sie in den [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) Strukturdokumenten.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[web-contents-send]: web-contents.md#contentssendchannel-args
