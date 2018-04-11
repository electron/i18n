# ipcRenderer

> Comunicazione asincrona dal un processo di rendering al processo principale.

Processo: [Renderer](../glossary.md#renderer-process)

Il modulo `ipcRenderer` è un'istanza della classe [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Fornisce alcuni memtodi che permettono l'invio di messaggi sincroni e assincroni dal processo di rendiring(pagina web) al processo principale. È inoltre possibile ricevere risposte dal processo principale.

Vedere [ipcMain](ipc-main.md) per esempi di codice.

## Metodi

Il modulo di `ipcRenderer` ha il seguente metodo per attendere gli eventi e inviare messaggi:

### `ipcRenderer.on(channel, listener)`

* `channel` String
* `listener` Function

Ascola sul `channel`, quando arriva un nuovo messaggio il `listener` verrà chiamato con `listener(event, args...)`.

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` Function

Aggiunge una funzione `listener` per l'evento richiamato una sola volta. Questo `listener` viene invocato solamente la volta dopo che un messaggio viene inviato al `channel`, dopo di chè viene rimosso.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String
* `listener` Function

Il `listener` specificato viene rimosso dalla lista dei listener del `channel` indicato.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

Rimuove tutti i listeners, oppure quelli del `channel` specificato.

### `ipcRenderer.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Invia un messaggio al processo principale in modo assincrono attraverso il canale, `channel`, è possibile inviare un numero qualsiasi di argomenti. Gli argomenti verranno serializzati internamenti in JSON e dunque le funzioni e la catena dei prototype non verrano inclusi.

Il processo principale li tratta ascoltando il `channel` con il modulo `ipcMain`.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Returns `any` - The value sent back by the [`ipcMain`](ipc-main.md) handler.

Send a message to the main process synchronously via `channel`, you can also send arbitrary arguments. Gli argomenti verranno serializzati internamenti in JSON e dunque le funzioni e la catena dei prototype non verrano inclusi.

The main process handles it by listening for `channel` with `ipcMain` module, and replies by setting `event.returnValue`.

**Note:** Sending a synchronous message will block the whole renderer process, unless you know what you are doing you should never use it.

### `ipcRenderer.sendTo(windowId, channel, [, arg1][, arg2][, ...])`

* `windowId` Number
* `channel` String
* `...args` any[]

Sends a message to a window with `windowid` via `channel`

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.