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

Ibinabalik ang:

* `event` na Pangyayari
* `state` String - Can be `completed`, `cancelled` or `interrupted`.

Ang mga ito ay lumalabas kapag ang "download" ay nasa estado ng terminal. Kasama dito ang matagumpay na "download", inihintong "download" (via `downloadItem.cancel()`), at itinigil ngunit hindi ma maaaring ituloy na "download".

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

Pagbabalik ng `String` - Ang "save path" ng "download item". Ito ay maaaring itinakdang lokasyon ng payl o "path", sa pamamagitan ng `downloadItem.setSavePath(path)` o ang piniling lokasyon o direktoryo ng payl galing sa ipinakitang "save dialog".

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Set the save file dialog options. This object has the same properties as the `options` parameter of [`dialog.showSaveDialog()`](dialog.md).

This API allows the user to set custom options for the save dialog that opens for the download item by default. The API is only available in session's `will-download` callback function.

#### `downloadItem.getSaveDialogOptions()`

Returns `SaveDialogOptions` - Returns the object previously set by `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

Pauses the download.

#### `downloadItem.isPaused()`

Returns `Boolean` - Whether the download is paused.

#### `downloadItem.resume()`

Resumes the download that has been paused.

**Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. Otherwise `resume()` will dismiss previously received bytes and restart the download from the beginning.

#### `downloadItem.canResume()`

Returns `Boolean` - Whether the download can resume.

#### `downloadItem.cancel()`

Cancels the download operation.

#### `downloadItem.getURL()`

Returns `String` - The origin url where the item is downloaded from.

#### `downloadItem.getMimeType()`

Returns `String` - The files mime type.

#### `downloadItem.hasUserGesture()`

Returns `Boolean` - Whether the download has user gesture.

#### `downloadItem.getFilename()`

Returns `String` - The file name of the download item.

**Note:** The file name is not always the same as the actual one saved in local disk. If user changes the file name in a prompted download saving dialog, the actual name of saved file will be different.

#### `downloadItem.getTotalBytes()`

Returns `Integer` - The total size in bytes of the download item.

If the size is unknown, it returns 0.

#### `downloadItem.getReceivedBytes()`

Returns `Integer` - The received bytes of the download item.

#### `downloadItem.getContentDisposition()`

Returns `String` - The Content-Disposition field from the response header.

#### `downloadItem.getState()`

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Note:** The following methods are useful specifically to resume a `cancelled` item when session is restarted.

#### `downloadItem.getURLChain()`

Returns `String[]` - The complete url chain of the item including any redirects.

#### `downloadItem.getLastModifiedTime()`

Returns `String` - Last-Modified header value.

#### `downloadItem.getETag()`

Returns `String` - ETag header value.

#### `downloadItem.getStartTime()`

Returns `Double` - Number of seconds since the UNIX epoch when the download was started.