## Sınıf: DownloadItem

> Kontrol dosyası uzak kaynaklardan yükleme yapar.

İşlem: [Ana](../glossary.md#main-process)

`DownloadItem` Electron içindeki indirme öğesini temsil eden bir `EventEmitter`'dir. O `oturumun` `will-download` olayı içinde kullanılır ve kullanıcıların indirilen öğeyi kontrol etmesine izin verir.

```javascript
// Ana süreçte.
const { BrowserWindow } = require('electron')
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

### Örnek olayları

#### Event: 'updated'

Dönüşler:

* `event` Event
* `state` String - Can be `progressing` or `interrupted`.

İndirme güncellendiğinde ve bitmediğinde yayınlanır.

`Durum` aşağıdakilerden biri olabilir:

* `progressing` - İndirme devam ediyor.
* `interrupted` - İndirme kesintiye uğradı ve devam edilebilir.

#### Event: 'done'

Dönüşler:

* `event` Event
* `state` String - Can be `completed`, `cancelled` or `interrupted`.

Emitted when the download is in a terminal state. This includes a completed download, a cancelled download (via `downloadItem.cancel()`), and interrupted download that can't be resumed.

`Durum` aşağıdakilerden biri olabilir:

* `completed` - İndirme başarıyla tamamlandı.
* `cancelled` - İndirme iptal edildi.
* `interrupted` - İndirme kesintiye uğradı ve devam edemez.

### Örnek yöntemler

`downloadItem` nesnesi aşağıdaki yöntemleri içerir:

#### `downloadItem.setSavePath(path)`

* `path` String - indirme öğesinin dosya kaydetme yolunu ayarlayın.

API, yalnızca oturumun `will-download` geri arama işlevinde kullanılabilir. Kullanıcı API aracılığıyla kaydetme yolunu ayarlamazsa, Electron kaydetme yolunu belirlemek için orijinal rutinleri kullanacaktır. (Genellikle bir kaydetme diyaloğı çıkarır).

#### `downloadItem.getSavePath()`

Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Set the save file dialog options. This object has the same properties as the `options` parameter of [`dialog.showSaveDialog()`](dialog.md).

This API allows the user to set custom options for the save dialog that opens for the download item by default. API, yalnızca oturumun `will-download` geri arama işlevinde kullanılabilir.

#### `downloadItem.getSaveDialogOptions()`

Returns `SaveDialogOptions` - Returns the object previously set by `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

İndirmeyi duraklatır.

#### `downloadItem.isPaused()`

İndirmenin durdurulup durdurulmadığına dair `Boolean` döndürür.

#### `downloadItem.resume()`

Durdurulmuş indirmeyi devam ettirir.

**Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. Aksi takdirde, `resume()`, daha önce alınan baytları atlayacak ve indirmeyi baştan başlatacaktır.

#### `downloadItem.canResume()`

Returns `Boolean` - Whether the download can resume.

#### `downloadItem.cancel()`

İndirme işlemini iptal eder.

#### `downloadItem.getURL()`

Öğenin nereden indirildiğine dair orjinal url'sini `String` olarak döndürür.

#### `downloadItem.getMimeType()`

Dosyaların Mime türünü `String` olarak döndürür.

#### `downloadItem.hasUserGesture()`

İndirme işleminin kullanıcı hareketi olup olmadığına dair `Boolean` döndürür.

#### `downloadItem.getFilename()`

İndirilen öğenin ismini `String` olarak döndürür.

**Note:** The file name is not always the same as the actual one saved in local disk. Kullanıcı, istenen bir indirme kaydetme iletişim kutusunda dosya adını değiştirirse, kaydedilen dosyanın gerçek adı farklı olacaktır.

#### `downloadItem.getTotalBytes()`

İndirilen öğenin toplam byte boyutunu `Integer` olarak döndürür.

Eğer boyutu bilinmiyorsa 0 değerini döndürür.

#### `downloadItem.getReceivedBytes()`

İndirilen öğenin indirilen byte kadarını `Integer` türünde döndürür.

#### `downloadItem.getContentDisposition()`

Cevabın başlığından İçerik-Hazırlama alanını `String` türünde döndürür.

#### `downloadItem.getState()`

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Note:** The following methods are useful specifically to resume a `cancelled` item when session is restarted.

#### `downloadItem.getURLChain()`

Herhangi bir yeniden yönlendirme de dahil olmak üzere öğenin tam url zincirini `String[]` olarak döndürür.

#### `downloadItem.getLastModifiedTime()`

Son değiştirilen başlık değerini `String` olarak döndürür.

#### `downloadItem.getETag()`

ETag başlık değerini `String` olarak döndürür.

#### `downloadItem.getStartTime()`

UNIX zaman başlangıcından indirmenin başlatıldığı zamana kadar geçen saniye sayısını `Double` türünde döndürür.
