# ipcMain

> Comunicazione asincrona dal processo principale ai processi di rendering.

Processo: [Main](../glossary.md#main-process)

Il modulo `ipcMain` è un'istanza della classe [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Quando utilizzato nel processo principale, gestisce i messaggi sincroni e asincroni inviati da un processo di rendering (pagina web). I messaggi inviati da un renderer verranno emesso a questo modulo.

## L'invio di messaggi

È anche possibile inviare messaggi dal processo principale per il processo di rendering, vedere [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) per ulteriori informazioni.

* Quando si invia un messaggio, il nome dell'evento è il `channel`(canale).
* Per rispondere a un messaggio sincrono, è necessario impostare `event.returnValue`.
* To send an asynchronous message back to the sender, you can use `event.reply(...)`. This helper method will automatically handle messages coming from frames that aren't the main frame (e.g. iframes) whereas `event.sender.send(...)` will always send to the main frame.

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

Ascola sul `channel`, quando arriva un nuovo messaggio il `listener` verrà chiamato con `listener(event, args...)`.

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Function

Aggiunge una funzione `listener` per l'evento richiamato una sola volta. Questo `listener` viene invocato solamente la volta dopo che un messaggio viene inviato al `channel`, dopo di chè viene rimosso.

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Function

Il `listener` specificato viene rimosso dalla lista dei listener del `channel` indicato.

### `ipcMain.removeAllListeners([channel])`

* `channel` String

Rimuove tutti i listeners del `channel` specificato.

## L'oggetto Event

L'oggetto `event` passato al `callback` ha i seguenti metodi:

### `event.frameId`

An `Integer` representing the ID of the renderer frame that sent this message.

### `event.returnValue`

Set this to the value to be returned in a synchronous message.

### `event.sender`

Returns the `webContents` that sent the message, you can call `event.sender.send` to reply to the asynchronous message, see [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) for more information.

### `event.reply`

A function that will send an IPC message to the renderer frane that sent the original message that you are currently handling. You should use this method to "reply" to the sent message in order to guaruntee the reply will go to the correct process and frame.