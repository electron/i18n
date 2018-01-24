# ipcRenderer

> Makipag-usap ng sabay-sabay mula sa prosesong tagasalin hanggang sa pangunahing proseso.

Mga proseso: [Renderer](../glossary.md#renderer-process)

Ang modyul ng `ipcRenderer` ay ang instansya ng uri ng [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ito ay nagbibigay ng ilang mga pamamaraan kaya maaari kang magpadala ng magkasabay at sabay-sabay na mga mensahe mula sa proseso ng pagsalin (pahina ng web) patungo sa pangunahing proseso. Maaari ka ring makatanggap ng kasagutan mula sa pangunahing proseso.

Tingnan ang [ipcMain](ipc-main.md) para sa mga halimbawa ng code.

## Pamamaraan

Ang modyul ng `ipcRenderer` ay mayroon ng mga sumusunod na pamamaraan para makinig sa mga event at magpadala ng mga mensahe:

### `ipcRenderer.on(tsanel, tagapakinig)`

* `channel` String
* `listener` Punsyon

Nakikinig sa `channel`, kapag ang bagong mensahe ay dumarating ang `listener` ay tatawagin pati ang `listener(event, args....)`.

### `ipcRenderer.once(tsanel, tagapakinig)`

* `channel` String
* `listener` Punsyon

Nagdadagdag ng isang beses na punsyon ng `listener` para sa event. Ang `listener` na ito ay naihalo lamang sa susunod na ang isang mensahe ay naipadala sa `channel`, ito ay aalisin pagkatapos nito.

### `ipcRenderer.removeListener(tsanel, tagapakinig)`

* `channel` String
* `listener` Punsyon

Tinatanggal ang mga tinukoy `listener` mula sa hanay ng mga tagapakinig para sa tinukoy na `channel`.

### `ipcRenderer.removeAllListeners([channel])`

* `channel` String (opsyonal)

Tinatanggal ang lahat ng mga tagapakinig, o ang mga tinukoy sa `channel`.

### `ipcRenderer.send(channel[,arg1][,arg2][, ...])`

* `channel` String
* `...args` anuman[]

Send a message to the main process asynchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with `ipcMain` module.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` anuman[]

Returns `any` - The value sent back by the [`ipcMain`](ipc-main.md) handler.

Send a message to the main process synchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with `ipcMain` module, and replies by setting `event.returnValue`.

**Note:** Sending a synchronous message will block the whole renderer process, unless you know what you are doing you should never use it.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` anuman[]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.