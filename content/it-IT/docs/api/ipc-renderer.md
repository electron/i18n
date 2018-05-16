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

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Restituisce `any` - il valore inviato indietro dal gestore [`ipcMain`](ipc-main.md).

Invia un messaggio al processo principale in modo sincrono attraverso il canale `channel`, si possono inviare un numero qualsiasi di argomenti. Gli argomenti verranno serializzati internamenti in JSON e dunque le funzioni e la catena dei prototype non verrano inclusi.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

**Nota:** L'invio di un messaggio sincrono bloccherà il processo di rendering nel punto in cui invia il messaggio fino a quando il processo main non imposta il returnValue sull'oggetto event che ha ricevuto, a meno che non si sa cosa si stia facendo è meglio evitare di usarlo.

### `ipcRenderer.sendTo(windowId, channel, [, arg1][, arg2][, ...])`

* `windowId` Number
* `channel` String
* `...args` any[]

Sends a message to a window with `windowid` via `channel`.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.