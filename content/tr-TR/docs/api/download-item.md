## Sınıf: DownloadItem

> Kontrol dosyası uzak kaynaklardan yükleme yapar.

Süreç: [Ana](../glossary.md#main-process)

`DownloadItem` elektron içindeki indirme öğesini temsil eden bir `EventEmitter`'dir. It is used in `will-download` event of `Session` class, and allows users to control the download item.

```javascript
// Ana işlem içinde.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => {
Kaydetme yolunu ayarlayın ve Electron'un bir kaydetme istememesi için yol gösterin.
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

### Örnek Events

#### Event: 'updated'

Returns:

* `event` Event
* `state` String

İndirme güncellendiğinde ve bitmediğinde yayınlanır.

`Durum` aşağıdakilerden biri olabilir:

* `progressing` - İndirme devam ediyor.
* `interrupted` - İndirme kesildi ama devam edilebilir.

#### Event: 'done'

Returns:

* `event` Event
* `state` String

İndirme işlemi terminal durumundayken yayımlanır. Bu bitmiş indirme, (via `downloadItem.cancel()`) ile iptal edilmiş bir indirme ve devam edilemeyen kesmeye uğramış indirme içerir.

`Durum` aşağıdakilerden biri olabilir:

* `completed` - İndirme başarıyla tamamlandı.
* `cancelled` - İndirme iptal edildi.
* `interrupted` - İndirme kesildi ve devam edemez.

### Örnek yöntemler

`downloadItem` nesnesi aşağıdaki yöntemleri içerir:

#### `downloadItem.setSavePath(path)`

* `path` String - indirme öğesinin dosya kaydetme yolunu ayarlayın.

The API is only available in session's `will-download` callback function. If user doesn't set the save path via the API, Electron will use the original routine to determine the save path(Usually prompts a save dialog).

#### `downloadItem.getSavePath()`

Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.

#### `downloadItem.pause()`

İndirmeyi duraklatır.

#### `downloadItem.isPaused()`

İndirilmenin durdurulup durdurulmadığına dair `Boolean` döndürür.

#### `downloadItem.resume()`

Durdurulmuş indirmeyi devam ettirir.

**Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. Otherwise `resume()` will dismiss previously received bytes and restart the download from the beginning.

#### `downloadItem.canResume()`

İndirmenin devam edip edemeyeceğine dair `Boolean` döndürür.

#### `downloadItem.cancel()`

İndirme işlemini iptal eder.

#### `downloadItem.getURL()`

Öğenin nereden indirildiğine dair orjinal url'sini `String` olarak döndürür.

#### `downloadItem.getMimeType()`

Dosyaların Mime türünü `String` olarak döndürür.

#### `downloadItem.hasUserGesture()`

Returns `Boolean` - Whether the download has user gesture.

#### `downloadItem.getFilename()`

İndirilen öğenin ismini `String` olarak döndürür.

**Note:** The file name is not always the same as the actual one saved in local disk. If user changes the file name in a prompted download saving dialog, the actual name of saved file will be different.

#### `downloadItem.getTotalBytes()`

İndirilen öğenin toplam byte boyutunu `Integer` olarak döndürür.

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