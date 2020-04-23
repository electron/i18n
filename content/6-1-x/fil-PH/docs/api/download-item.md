## Klase: "DownloadItem"

> Kontrolin ang "downloads" ng payl galing sa "remote sources".

Proseso:[Pangunahi](../glossary.md#main-process)

`DownloadItem` ay isang `EventEmitter` na kumakatawan sa "download item" sa Elektron. Ito ay ginagamit sa `will-download` na nangyayari sa klase ng `Session`, at hinahayaan ang mga gumagamit na kontrolin ang "download item".

```javascript
// Sa mga pangunahing proseso.
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => {
  // itakda ang pinanatiling "path", na hinahayaan ang Elektron na huwag gawin ang "save dialog".
  item.setSavePath('/tmp/save.pdf')

  item.on('updated', (event, state) => {
    if (state === 'interrupted') {
      console.log('Download is interrupted but can be resumed')
    } else if (state === 'progressing') {
      if (item.isPaused()) {
        console.log('Download is paused')
      } else {
        console.log(`Received bytes: ${item.getReceivedBytes()}`)
      }
    }
  })
  item.once('done', (event, state) => {
    if (state === 'completed') {
      console.log('Download successfully')
    } else {
      console.log(`Download failed: ${state}`)
    }
  })
})
```

### Mga Halimbawa ng "Events"

#### Event: 'updated'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `state` String - Can be `progressing` or `interrupted`.

Ito ay lumalabas kapag ang "download" ay kinakailangan baguhin at itatakda ang mga bagong impormasyon na nakapaloob dito, at kung ito ay hindi tapos.

Ang `state` ay maaaring isa sa mga sumusunod:

* `progressing` - Ang proseso ng "download" ay umuusad.
* `interrupted` - Ang "download" ay napapahinto at maaaring ituloy ang pagproseso nito.

#### Event: 'done'

Pagbabalik:

* `event` na Pangyayari
* `state` String - Can be `completed`, `cancelled` or `interrupted`.

Emitted when the download is in a terminal state. This includes a completed download, a cancelled download (via `downloadItem.cancel()`), and interrupted download that can't be resumed.

Ang `state` ay maaaring isa sa mga sumusunod:

* `completed`- Kapag ang "download" ay matagumpay na naiproseso.
* `cancelled` - Kapag ang "download" ay inihinto.
* `interrupted` - Kapag ang "download" ay itinigil at hindi na maaari pang ipagpatuloy.

### Mga Pamamaraan ng Instance

Ang `downloadItem` ay may mga sumusunod na paraan:

#### `downloadItem.setSavePath(path)`

* `path` String - Itakda ang lokasyon o direktoryo o tinatawag ding "path", ng pinanatiling payl ng "download item".

Ang API ay ang natatanging posibleng gamitin sa sesyon ng `will-download` na maaaring muling gamitin. Kung ang gumagamit ay hindi nagtakda ng "save path" sa pamamagitan ng API, ang Elektron ay gagamit ng karaniwang gawain nito upang matukoy ang "save path" (Kadalasang ginagawa sa "save dialog").

#### `downloadItem.getSavePath()`

Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Set the save file dialog options. This object has the same properties as the `options` parameter of [`dialog.showSaveDialog()`](dialog.md).

This API allows the user to set custom options for the save dialog that opens for the download item by default. Ang API ay ang natatanging posibleng gamitin sa sesyon ng `will-download` na maaaring muling gamitin.

#### `downloadItem.getSaveDialogOptions()`

Returns `SaveDialogOptions` - Returns the object previously set by `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

Pansamantalang paghinto ng "download".

#### `downloadItem.isPaused()`

Pagbabalik sa `Boolean` - Kahit pa ang "download" ay pansamantalang nakahinto.

#### `downloadItem.resume()`

Pagbabalik sa pagproseso ng "download" na pansamantalang inihinto.

**Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. Kung hindi man, ang `resume()` ay ihihinto ang pagtanggap ng nakaraang "bytes" at muling uumpisahan ang "download".

#### `downloadItem.canResume()`

Returns `Boolean` - Whether the download can resume.

#### `downloadItem.cancel()`

Paghinto ng operasyon ng "download".

#### `downloadItem.getURL()`

Pagbabalik ng `String` - Ang orihinal na "url" kung saan galing ang "downloaded item".

#### `downloadItem.getMimeType()`

Pagbabalik ng `String` - Ang uri ng payl na nanggagaya.

#### `downloadItem.hasUserGesture()`

Pagbabalik ng `Boolean` - Kapag ang "download" ay may kilos ng gumagamit.

#### `downloadItem.getFilename()`

Pagbabalik ng `String` - Ang pangalan ng payl ng "download item".

**Note:** The file name is not always the same as the actual one saved in local disk. Kung ang gumagamit ay nagsagawa ng pagbabago sa pangalan ng payl sa pinoproseso na "download" na nananatili sa "dialog", ang aktwal na pangalan sa payl ay magbabago din.

#### `downloadItem.getTotalBytes()`

Pagbabalik ng `Integer` - Ang kabuuang sukat ng "bytes" ng "download item".

Kung hindi alam ang sukat, ito ay magbabalik sa 0.

#### `downloadItem.getReceivedBytes()`

Pagbabalik ng `Integer` - Ang "bytes" na natanggap sa download item.

#### `downloadItem.getContentDisposition()`

Pagbabalik ng `String` - Ang Content-Disposition galing sa tugon ng "header".

#### `downloadItem.getState()`

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Note:** The following methods are useful specifically to resume a `cancelled` item when session is restarted.

#### `downloadItem.getURLChain()`

Pagbabalik ng `String[]` - Ang kumpletong "url" ng aytem kasama ang kahit anong mga muling dinirekta.

#### `downloadItem.getLastModifiedTime()`

Pagbabalik ng `String` - Ang halaga ng Last-Modified header.

#### `downloadItem.getETag()`

Pagbabalik ng `String` - Ang halaga ng "ETag header".

#### `downloadItem.getStartTime()`

Pagbabalik ng `Double` - Bilang ng mga segundo simula ang "UNIX epoch" kapag ang "download" ay nag-umpisa.
