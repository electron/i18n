# ipcrenderer

> Makipag-usap ng sabay-sabay mula sa prosesong tagasalin hanggang sa pangunahing proseso.

Mga proseso: [Renderer](../glossary.md#renderer-process)

Ang modyul ng `ipcRenderer` ay ang instansya ng uri ng [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ito ay nagbibigay ng ilang mga pamamaraan kaya maaari kang magpadala ng magkasabay at sabay-sabay na mga mensahe mula sa proseso ng pagsalin (pahina ng web) patungo sa pangunahing proseso. Maaari ka ring makatanggap ng kasagutan mula sa pangunahing proseso.

Tingnan ang [ipcMain](ipc-main.md) para sa mga halimbawa ng code.

## Mga Paraan

Ang modyul ng `ipcRenderer` ay mayroon ng mga sumusunod na pamamaraan para makinig sa mga event at magpadala ng mga mensahe:

### `ipcRenderer.on(tsanel, tagapakinig)`

* `channel` String
* `listener` Function

Makinig sa `channel`, kapag ang bagong mensaheng dumating sa `listener` ay tinawag pati ang `listener(event, args...)`.

### `ipcRenderer.once(tsanel, tagapakinig)`

* `channel` String
* `listener` Function

Nagdadagdag ng isang beses na function ng `listener` para sa event. Ang `listener` na ito ay naihalo lamang sa susunod na ang isang mensahe ay naipadala sa `channel`, ito ay aalisin pagkatapos nito.

### `ipcRenderer.removeListener(tsanel, tagapakinig)`

* `channel` String
* `listener` Function

Tatanggalin ang mga tinukoy na `listener` mula sa hanay ng mga tagapakinig para sa tinukoy na `channel`.

### `ipcRenderer.removeAllListeners([channel])`

* `channel` String (optional)

Tinatanggal ang lahat ng mga tagapakinig, o ang mga tinukoy sa `channel`.

### `ipcRenderer.send(channel[, arg1][,arg2][, ...])`

* `channel` String
* `...args` anuman[]

Magpadala ng mensahe sa pangunahing proseso ng magkahiwalay sa pamamagitan ng `channel`, maaari ka ring magpadala ng hindi makatwiran na mga argumento. Ang mga argumento ay maaaring ilalathala ng baha-bahagi sa loob ng JSON at dahil dito walang mga punsyon o ugnay-ugnay na modelo ang maaaring isama.

The main process handles it by listening for `channel` with `ipcMain` module.

### `ipcRenderer.sendSync(channel[,arg1][,arg2][, ...])`

* `channel` String
* `...args` anuman[]

Magbabalik ng `any` - Ang halaga ay ipinadala pabalik sa pamamagitan ng tagahawak ng [`ipcMain`](ipc-main.md).

Magpadala ng mensahe sa pangunahing proseso ng magkasabay sa pamamagitan ng `channel`, maaari ka ring magpadala ng hindi makatwiran na mga argumento. Ang mga argumento ay maaaring ilalathala ng baha-bahagi sa loob ng JSON at dahil dito walang mga punsyon o ugnay-ugnay na modelo ang maaaring isama.

The main process handles it by listening for `channel` with `ipcMain` module, and replies by setting `event.returnValue`.

**Note:** Ang pagpapadala ng magkasabay na mensahe ay iba-block ang buong prosesong tagabigay, maliban kung alam mo ang ginagawa mo huwag mo itong gagamitin.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` anuman[]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.