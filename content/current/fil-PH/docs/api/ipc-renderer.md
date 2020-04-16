# ipcRenderer

> Makipag-usap ng sabay-sabay mula sa prosesong tagasalin hanggang sa pangunahing proseso.

Mga proseso: [Renderer](../glossary.md#renderer-process)

The `ipcRenderer` module is an  [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ito ay nagbibigay ng ilang mga pamamaraan kaya maaari kang magpadala ng magkasabay at sabay-sabay na mga mensahe mula sa proseso ng pagsalin (pahina ng web) patungo sa pangunahing proseso. Maaari ka ring makatanggap ng kasagutan mula sa pangunahing proseso.

Tingnan ang [ipcMain](ipc-main.md) para sa mga halimbawa ng code.

## Mga Paraan

Ang modyul ng `ipcRenderer` ay mayroon ng mga sumusunod na pamamaraan para makinig sa mga event at magpadala ng mga mensahe:

### `ipcRenderer.on(tsanel, tagapakinig)`

* `channel` String
* `listener` Punsyon
  * `event` IpcRendererEvent
  * `...args` anuman[]

Nakikinig sa `channel`, kapag ang bagong mensahe ay dumarating ang `listener` ay tatawagin pati ang `listener(event, args....)`.

### `ipcRenderer.once(tsanel, tagapakinig)`

* `channel` String
* `listener` Punsyon
  * `event` IpcRendererEvent
  * `...args` anuman[]

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcRenderer.removeListener(tsanel, tagapakinig)`

* `channel` String
* `listener` Punsyon
  * `...args` anuman[]

Tinatanggal ang mga tinukoy `listener` mula sa hanay ng mga tagapakinig para sa tinukoy na `channel`.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

Tinatanggal ang lahat ng mga tagapakinig, o ang mga tinukoy sa `channel`.

### `ipcRenderer.send(channel, ...args)`

* `channel` String
* `...args` anuman[]

Send an asynchronous message to the main process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The main process handles it by listening for `channel` with the [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String
* `...args` anuman[]

Returns `Promise<any>` - Resolves with the response from the main process.

Send a message to the main process via `channel` and expect a result asynchronously. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The main process should listen for `channel` with [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener).

Halimbawa:
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
* `...args` anuman[]

Magbabalik ng `any` - Ang halaga ay ipinadala pabalik sa pamamagitan ng tagahawak ng [`ipcMain`](ipc-main.md).

Send a message to the main process via `channel` and expect a result synchronously. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

> :warning: **WARNING**: Sending a synchronous message will block the whole renderer process until the reply is received, so use this method only as a last resort. It's much better to use the asynchronous version, [`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args).

### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* `channel` String
* `...args` anuman[]

Sends a message to a window with `webContentsId` via `channel`.

### `ipcRenderer.sendToHost(channel, ...args)`

* `channel` String
* `...args` anuman[]

Katulad ng `ipcRenderer.send` ngunit ang event ay ipapadala sa `<webview>` bahagi sa pahina ng host sa halip na sa pangunahing proseso.

## Ang bagay ng event

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-renderer-event`](structures/ipc-renderer-event.md) structure docs.
