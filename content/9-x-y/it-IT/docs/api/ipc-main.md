# ipcMain

> Comunicazione asincrona dal processo principale ai processi di rendering.

Processo: [Main](../glossary.md#main-process)

The `ipcMain` module is an [Event Emitter](https://nodejs.org/api/events.html#events_class_eventemitter). Quando utilizzato nel processo principale, gestisce i messaggi sincroni e asincroni inviati da un processo di rendering (pagina web). I messaggi inviati da un renderer verranno emesso a questo modulo.

## L'invio di messaggi

È anche possibile inviare messaggi dal processo principale per il processo di rendering, vedere [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) per ulteriori informazioni.

* Quando si invia un messaggio, il nome dell'evento è il `channel`(canale).
* Per rispondere a un messaggio sincrono, è necessario impostare `event.returnValue`.
* To send an asynchronous message back to the sender, you can use `event.reply(...)`.  This helper method will automatically handle messages coming from frames that aren't the main frame (e.g. iframes) whereas `event.sender.send(...)` will always send to the main frame.

Un esempio di invio e gestione dei messaggi tra i processi render e main:

```javascript
// Nel processo principale.
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
// Nel processo di rendering (pagina web).
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // stampa "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // stampa "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## Metodi

Il modulo `icpMain` ha i seguenti metodi per ascolater gli eventi:

### `ipcMain.on(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

Ascola sul `channel`, quando arriva un nuovo messaggio il `listener` verrà chiamato con `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function
  * `event` IpcMainEvent
  * `...args` any[]

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function
  * `...args` any[]

Il `listener` specificato viene rimosso dalla lista dei listener del `channel` indicato.

### `ipcMain.removeAllListeners([channel])`

* `channel` String (optional)

Rimuove tutti i listeners del `channel` specificato.

### `ipcMain.handle(channel, listener)`

* `channel` String
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

* `channel` String
* `listener` Function<Promise<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Handles a single `invoke`able IPC message, then removes the listener. See `ipcMain.handle(channel, listener)`.

### `ipcMain.removeHandler(channel)`

* `channel` String

Removes any handler for `channel`, if present.

## IpcMainEvent object

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-main-event`](structures/ipc-main-event.md) structure docs.

## IpcMainInvokeEvent object

The documentation for the `event` object passed to `handle` callbacks can be found in the [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) structure docs.
