# ipcrenderer

> Makipag-usap ng sabay-sabay mula sa prosesong tagasalin hanggang sa pangunahing proseso.

Mga proseso: [Renderer](../glossary.md#renderer-process)

The `ipcRenderer` module is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ito ay nagbibigay ng ilang mga pamamaraan kaya maaari kang magpadala ng magkasabay at sabay-sabay na mga mensahe mula sa proseso ng pagsalin (pahina ng web) patungo sa pangunahing proseso. Maaari ka ring makatanggap ng kasagutan mula sa pangunahing proseso.

Tingnan ang [ipcMain](ipc-main.md) para sa mga halimbawa ng code.

## Mga Paraan

Ang modyul ng `ipcRenderer` ay mayroon ng mga sumusunod na pamamaraan para makinig sa mga event at magpadala ng mga mensahe:

### `ipcRenderer.on(tsanel, tagapakinig)`

* `channel` String
* `listener` Function 
  * `event` IpcRendererEvent
  * `...args` anuman[]

Makinig sa `channel`, kapag ang bagong mensaheng dumating sa `listener` ay tinawag pati ang `listener(event, args...)`.

### `ipcRenderer.once(tsanel, tagapakinig)`

* `channel` String
* `listener` Function 
  * `event` IpcRendererEvent
  * `...args` anuman[]

Nagdadagdag ng isang beses na function ng `listener` para sa event. Ang `listener` na ito ay naihalo lamang sa susunod na ang isang mensahe ay naipadala sa `channel`, ito ay aalisin pagkatapos nito.

### `ipcRenderer.removeListener(tsanel, tagapakinig)`

* `channel` String
* `listener` Punsyon 
  * `...args` anuman[]

Tatanggalin ang mga tinukoy na `listener` mula sa hanay ng mga tagapakinig para sa tinukoy na `channel`.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` String

Tinatanggal ang lahat ng mga tagapakinig, o ang mga tinukoy sa `channel`.

### `ipcRenderer.send(channel, ...args)`

* `channel` String
* `...args` anuman[]

Magpadala ng mensahe sa pangunahing proseso ng magkahiwalay sa pamamagitan ng `channel`, maaari ka ring magpadala ng hindi makatwiran na mga argumento. Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with the [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.invoke(channel, ...args)`

* `channel` String
* `...args` anuman[]

Returns `Promise<any>` - Resolves with the response from the main process.

Send a message to the main process asynchronously via `channel` and expect an asynchronous result. Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.

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

Returns `any` - The value sent back by the [`ipcMain`](ipc-main.md) handler.

Send a message to the main process synchronously via `channel`, you can also send arbitrary arguments. Ang mga argumento ay maaaring ilalathala ng baha-bahagi sa loob ng JSON at dahil dito walang mga punsyon o ugnay-ugnay na modelo ang maaaring isama.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

**Note:** Sending a synchronous message will block the whole renderer process, unless you know what you are doing you should never use it.

### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* `channel` String
* `...args` anuman[]

Sends a message to a window with `webContentsId` via `channel`.

### `ipcRenderer.sendToHost(channel, ...args)`

* `channel` String
* `...args` anuman[]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.

## Ang bagay ng event

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-renderer-event`](structures/ipc-renderer-event.md) structure docs.