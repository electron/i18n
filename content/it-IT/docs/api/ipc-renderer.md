# ipcRenderer

> Comunicazione asincrona dal un processo di rendering al processo principale.

Processo: [Renderer](../glossary.md#renderer-process)

The `ipcRenderer` module is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Fornisce alcuni memtodi che permettono l'invio di messaggi sincroni e assincroni dal processo di rendiring(pagina web) al processo principale. È inoltre possibile ricevere risposte dal processo principale.

Vedere [ipcMain](ipc-main.md) per esempi di codice.

## Metodi

Il modulo di `ipcRenderer` ha il seguente metodo per attendere gli eventi e inviare messaggi:

### `ipcRenderer.on(channel, listener)`

* `channel` String
* `listener` Function 
  * `event` IpcRendererEvent
  * `...args` any[]

Ascola sul `channel`, quando arriva un nuovo messaggio il `listener` verrà chiamato con `listener(event, args...)`.

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` Function 
  * `event` IpcRendererEvent
  * `...args` any[]

Aggiunge una funzione `listener` per l'evento richiamato una sola volta. Questo `listener` viene invocato solamente la volta dopo che un messaggio viene inviato al `channel`, dopo di chè viene rimosso.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String
* `listener` Function 
  * `...args` any[]

Il `listener` specificato viene rimosso dalla lista dei listener del `channel` indicato.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

Rimuove tutti i listeners, oppure quelli del `channel` specificato.

### `ipcRenderer.send(channel, ...args)`

* `channel` String
* `...args` any[]

Invia un messaggio al processo principale in modo assincrono attraverso il canale, `channel`, è possibile inviare un numero qualsiasi di argomenti. Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with the [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String
* `...args` any[]

Returns `Promise<any>` - Resolves with the response from the main process.

Send a message to the main process asynchronously via `channel` and expect an asynchronous result. Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.

The main process should listen for `channel` with [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener).

Ad esempio:

```javascript
// Renderer process
ipcRenderer.invoke('some-name', someArgument).then((result) => {
  // ...
})

// Main process
ipcMain.handle('some-name', async (event, someArgument) => {
  const result = await doSomeWork(someArgument)
  return result
})
```

### `ipcRenderer.sendSync(channel, ...args)`

* `channel` String
* `...args` any[]

Restituisce `any` - il valore inviato indietro dal gestore [`ipcMain`](ipc-main.md).

Invia un messaggio al processo principale in modo sincrono attraverso il canale `channel`, si possono inviare un numero qualsiasi di argomenti. Gli argomenti verranno serializzati internamente in JSON e dunque funzioni e catene di prototype non verrano incluse.

Il processo principale lo gestisce ascoltando il `channel` con il modulo [`ipcMain`](ipc-main.md), e risponde impostando un valore `event.returnValue`.

**Nota:** L'invio di un messaggio sincrono bloccherà il processo di rendering nel punto in cui invia il messaggio fino a quando il processo main non imposta il returnValue sull'oggetto event che ha ricevuto, a meno che non si sa cosa si stia facendo è meglio evitare di usarlo.

### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* `channel` String
* `...args` any[]

Sends a message to a window with `webContentsId` via `channel`.

### `ipcRenderer.sendToHost(channel, ...args)`

* `channel` String
* `...args` any[]

Come `ipcRenderer.send` ma l'evento verrà inviato al `<webview>`elemento nella pagina host anziché il processo principale.

## L'oggetto Event

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-renderer-event`](structures/ipc-renderer-event.md) structure docs.