# ipcMain

> Ipaalam sa asynchronously na mula pangunahing proseso papunta sa proseso ng renderer.

Proseso:[Pangunahi](../glossary.md#main-process)

Ang `ipcMain` modyul ay isang halimbawa ng [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) klase. Kapag ginamit sa pangunahing proseso, pinangangasiwaan nito ang asynchronous at synchronous mga mensahe na naipadala mula sa renderer process (web page). Ipinadalang mensahe galing sa renderer ay magiging emetted sa modyul na ito.

## Ipinadalang mga mensahe

Ito rin ay posibleng maipada ang mga mensaheng mula sa pangunahing proseso papunta sa proseso ng renderer, tingnan [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-) para sa karagdagang impormasyon.

* Kapag nagpadala ng mensahe, ang event name ay ang `channel`.
* Upang tumugon sa mensahe ng synchronous, maaari mong i-set ang `event.returnValue`.
* Magpadala ng isang nmensahe ng asynchronous pabalik sa nag padala, maaari mong gamitin ang `event.sender.send(...)`.

Isang halimbawa ng pagpapadala at paghawak ng mensahe sa pagitan ng render at ng pangunahing proseso:

```javascript
// Sa pangunahing proseso.
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
// Sa proseso ng redererer (web page).
const {ipcRenderer} = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## Mga Pamamaraan

Ang modyul ng `ipcRenderer` ay mayroong mga sumusunod na pamamaraan sa pakikinig sa mga event:

### `ipcMain.on(channel, listener)`

* `channel` String
* `listener` Punsyon

Nakikinig sa `channel`, kapag ang bagong mensahe ay dumarating ang `listener` ay tatawagin pati ang `listener(event, args....)`.

### `ipcMain.once(channel, listener)`

* `channel` String
* `listener` Punsyon

Nagdadagdag ng isang beses na punsyon ng `listener` para sa event. Ang `listener` na ito ay naihalo lamang sa susunod na ang isang mensahe ay naipadala sa `channel`, ito ay aalisin pagkatapos nito.

### `ipcMain.removeListener(channel, listener)`

* `channel` String
* `listener` Punsyon

Tinatanggal ang mga tinukoy `listener` mula sa hanay ng mga tagapakinig para sa tinukoy na `channel`.

### `ipcMain.removeAllListeners([channel])`

* `channel` String

Tinatanggal ang mga tagapakinig ng tinukoy na `channel`.

## Ang bagay ng event

Ang bagay `event` na pumasa sa `callback` ay may mga sumusunod na pamamaraan:

### `event.returnValue`

Itakda ang mga ito sa halaga na ibabalik sa isang mensahe ng synchronous.

### `event.sender`

Nagbabalik ang `webContents` na nagpadala ng mensahe, maaari mong tawagan ang `event.sender.send` upang tumugon sa mensahe ng asynchronous, tingnan ang [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-) para sa karagdagang impormasyon.