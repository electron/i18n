## Klase: "DownloadItem"

> Kontrolin ang "downloads" ng payl galing sa "remote sources".

Proseso:[Pangunahi](../glossary.md#main-process)

`DownloadItem` ay isang `EventEmitter` na kumakatawan sa "download item" sa Elektron. Ito ay ginagamit sa `will-download` na nangyayari sa klase ng `Session`, at hinahayaan ang mga gumagamit na kontrolin ang "download item".

```javascript
// Sa mga pangunahing proseso.
const {BrowserWindow} = require('electron')
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
* `state` String

Ito ay lumalabas kapag ang "download" ay kinakailangan baguhin at itatakda ang mga bagong impormasyon na nakapaloob dito, at kung ito ay hindi tapos.

Ang `state` ay maaaring isa sa mga sumusunod:

* `progressing` - Ang proseso ng "download" ay umuusad.
* `interrupted` - Ang "download" ay napapahinto at maaaring ituloy ang pagproseso nito.

#### Event: 'done'

Ibinabalik ang:

* `event` na Pangyayari
* `state` String

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

#### `downloadItem.pause()`

Pansamantalang paghinto ng "download".

#### `downloadItem.isPaused()`

Pagbabalik sa `Boolean` - Kahit pa ang "download" ay pansamantalang nakahinto.

#### `downloadItem.resume()`

Pagbabalik sa pagproseso ng "download" na pansamantalang inihinto.

**Paalala:** Para mapagana ang mga "download" na muling prinoseso, ang "server" kung saan pinoproseso ang "download" ay dapat suportahan ng mga saklaw na kahilingan at magbigay pareho ang mga halaga ng "header" na `Last-Modified` at `ETag`. Kung hindi man, ang `resume()` ay ihihinto ang pagtanggap ng nakaraang "bytes" at muling uumpisahan ang "download".

#### `downloadItem.canResume()`

Resumes `Boolean` - Whether the download can resume.

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

**Paalala:** Ang pangalan ng payl ay hindi parating pareho sa isang aktwal na pinanatili sa lokal na "disc". Kung ang gumagamit ay nagsagawa ng pagbabago sa pangalan ng payl sa pinoproseso na "download" na nananatili sa "dialog", ang aktwal na pangalan sa payl ay magbabago din.

#### `downloadItem.getTotalBytes()`

Pagbabalik ng `Integer` - Ang kabuuang sukat ng "bytes" ng "download item".

Kung hindi alam ang sukat, ito ay magbabalik sa 0.

#### `downloadItem.getReceivedBytes()`

Pagbabalik ng `Integer` - Ang "bytes" na natanggap sa download item.

#### `downloadItem.getContentDisposition()`

Pagbabalik ng `String` - Ang Content-Disposition galing sa tugon ng "header".

#### `downloadItem.getState()`

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Note:** Ang mga sumusunod na paraan ay kapaki-pakinabang lalo na para paganahing muli ang aytem na `cancelled` kapag ang sesyon ay muling inumpisahan.

#### `downloadItem.getURLChain()`

Pagbabalik ng `String[]` - Ang kumpletong "url" ng aytem kasama ang kahit anong mga muling dinirekta.

#### `downloadItem.getLastModifiedTime()`

Pagbabalik ng `String` - Ang halaga ng Last-Modified header.

#### `downloadItem.getETag()`

Pagbabalik ng `String` - Ang halaga ng "ETag header".

#### `downloadItem.getStartTime()`

Pagbabalik ng `Double` - Bilang ng mga segundo simula ang "UNIX epoch" kapag ang "download" ay nag-umpisa.