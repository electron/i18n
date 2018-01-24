# ipcRenderer

> Makipag-usap ng sabay-sabay mula sa prosesong tagasalin hanggang sa pangunahing proseso.

Mga proseso: [Renderer](../glossary.md#renderer-process)

Ang modyul ng `ipcRenderer` ay ang instansya ng uri ng [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ito ay nagbibigay ng ilang mga pamamaraan kaya maaari kang magpadala ng magkasabay at sabay-sabay na mga mensahe mula sa proseso ng pagsalin (pahina ng web) patungo sa pangunahing proseso. Maaari ka ring makatanggap ng kasagutan mula sa pangunahing proseso.

Tingnan ang [ipcMain](ipc-main.md) para sa mga halimbawa ng code.

## Pamamaraan

The `ipcRenderer` module has the following method to listen for events and send messages:

### `ipcRenderer.on(channel, listener)`

* `channel` String
* `listener` Function

Listens to `channel`, when a new message arrives `listener` would be called with `listener(event, args...)`.

### `ipcRenderer.once(channel, listener)`

* `channel` String
* `listener` Function

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` String
* `listener` Function

Removes the specified `listener` from the listener array for the specified `channel`.

### `ipcRenderer.removeAllListeners([channel])`

* `channel` String (optional)

Removes all listeners, or those of the specified `channel`.

### `ipcRenderer.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Send a message to the main process asynchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with `ipcMain` module.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Returns `any` - The value sent back by the [`ipcMain`](ipc-main.md) handler.

Send a message to the main process synchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with `ipcMain` module, and replies by setting `event.returnValue`.

**Note:** Sending a synchronous message will block the whole renderer process, unless you know what you are doing you should never use it.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.