# ipcMain

> Comunicazione asincrona dal processo principale ai processi di rendering.

Processo: [Main](../glossary.md#main-process)

Il modulo `ipcMain` è un'istanza della classe [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Quando utilizzato nel processo principale, gestisce i messaggi sincroni e asincroni inviati da un processo di rendering (pagina web). I messaggi inviati da un renderer verranno emesso a questo modulo.

## L'invio di messaggi

È anche possibile inviare messaggi dal processo principale per il processo di rendering, vedere [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-) per ulteriori informazioni.

* Quando si invia un messaggio, il nome dell'evento è il `channel`(canale).
* Per rispondere a un messaggio sincrono, è necessario impostare `event.returnValue`.
* Per inviare un messaggio asincrono al mittente, è possibile utilizzare `event.sender.send(...)`.

Un esempio di invio e gestione dei messaggi tra i processi render e main:

```javascript
// Nel processo principale.
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
// Nel processo di rendering (pagina web).
const {ipcRenderer} = require('electron')
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

### `event.returnValue`

Imposta il valore da restituire in un messaggio sincrono.

### `event.sender`

Restituisce il `webContents` che ha inviato il messaggio, è possibile chiamare `event.sender.send` per rispondere al messaggio asincrono, vedere [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-) per ulteriori informazioni.