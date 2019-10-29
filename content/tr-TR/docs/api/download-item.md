## Sınıf: DownloadItem

> Kontrol dosyası uzak kaynaklardan yükleme yapar.

İşlem: [Ana](../glossary.md#main-process)

`DownloadItem` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) that represents a download item in Electron. O `oturumun` `will-download` olayı içinde kullanılır ve kullanıcıların indirilen öğeyi kontrol etmesine izin verir.

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

Döndürür:

* `event` Olay
* `state` String - Can be `progressing` or `interrupted`.

İndirme güncellendiğinde ve bitmediğinde yayınlanır.

`Durum` aşağıdakilerden biri olabilir:

* `progressing` - İndirme devam ediyor.
* `interrupted` - İndirme kesintiye uğradı ve devam edilebilir.

#### Event: 'done'

Dönüşler:

* `event` Event
* `state` String - Can be `completed`, `cancelled` or `interrupted`.

İndirme işlemi terminal durumundayken yayınlanır. Bu, bitmiş bir indirme, (`downloadItem.cancel()`) ile iptal edilmiş bir indirme ve devam edilemeyen kesintiye uğramış indirme içerir.

`Durum` aşağıdakilerden biri olabilir:

* `completed` - İndirme başarıyla tamamlandı.
* `cancelled` - İndirme iptal edildi.
* `interrupted` - İndirme kesintiye uğradı ve devam edemez.

### Örnek Metodlar

`downloadItem` nesnesi aşağıdaki yöntemleri içerir:

#### `downloadItem.setSavePath(path)`

* `path` String - indirme öğesinin dosya kaydetme yolunu ayarlayın.

API, yalnızca oturumun `will-download` geri arama işlevinde kullanılabilir. If user doesn't set the save path via the API, Electron will use the original routine to determine the save path; this usually prompts a save dialog.

**[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**

#### `downloadItem.getSavePath()`

İndirilen öğenin kaydedilecek yolunu `String` olarak döndürür. Bu ya `downloadItem.setSavePath(path)` ile ayarlanmış yol olacak yada kaydetme diyaloğunda görünen seçilmiş yol olacak.

**[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Set the save file dialog options. This object has the same properties as the `options` parameter of [`dialog.showSaveDialog()`](dialog.md).

This API allows the user to set custom options for the save dialog that opens for the download item by default. The API is only available in session's `will-download` callback function.

#### `downloadItem.getSaveDialogOptions()`

Returns `SaveDialogOptions` - Returns the object previously set by `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

İndirmeyi duraklatır.

#### `downloadItem.isPaused()`

İndirmenin durdurulup durdurulmadığına dair `Boolean` döndürür.

#### `downloadItem.resume()`

Durdurulmuş indirmeyi devam ettirir.

**Not:** Devamlı indirmeleri etkinleştirmek için, indirdiğiniz sunucunun aralık isteklerini desteklemesi gerekir ve `Last-Modified` ve `ETag` başlık değerlerinin ikisini de sağlamalıdir. Aksi takdirde, `resume()`, daha önce alınan baytları atlayacak ve indirmeyi baştan başlatacaktır.

#### `downloadItem.canResume()`

Returns `Boolean` - Whether the download can resume.

#### `downloadItem.cancel()`

İndirme işlemini iptal eder.

#### `downloadItem.getURL()`

Returns `String` - The origin URL where the item is downloaded from.

#### `downloadItem.getMimeType()`

Dosyaların Mime türünü `String` olarak döndürür.

#### `downloadItem.hasUserGesture()`

İndirme işleminin kullanıcı hareketi olup olmadığına dair `Boolean` döndürür.

#### `downloadItem.getFilename()`

İndirilen öğenin ismini `String` olarak döndürür.

**Not:** Dosya adı her zaman yerel diskte kaydedilen dosya adıyla aynı değildir. Kullanıcı, istenen bir indirme kaydetme iletişim kutusunda dosya adını değiştirirse, kaydedilen dosyanın gerçek adı farklı olacaktır.

#### `downloadItem.getTotalBytes()`

İndirilen öğenin toplam byte boyutunu `Integer` olarak döndürür.

Eğer boyutu bilinmiyorsa 0 değerini döndürür.

#### `downloadItem.getReceivedBytes()`

İndirilen öğenin indirilen byte kadarını `Integer` türünde döndürür.

#### `downloadItem.getContentDisposition()`

Cevabın başlığından İçerik-Hazırlama alanını `String` türünde döndürür.

#### `downloadItem.getState()`

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Not:** Aşağıdaki metodlar oturum yeniden başlatıldığı zaman bir `cancelled` öğenin devamı için oldukça kullanışlıdır.

#### `downloadItem.getURLChain()`

Returns `String[]` - The complete URL chain of the item including any redirects.

#### `downloadItem.getLastModifiedTime()`

Son değiştirilen başlık değerini `String` olarak döndürür.

#### `downloadItem.getETag()`

ETag başlık değerini `String` olarak döndürür.

#### `downloadItem.getStartTime()`

UNIX zaman başlangıcından indirmenin başlatıldığı zamana kadar geçen saniye sayısını `Double` türünde döndürür.

### Örnek özellikleri

#### `downloadItem.savePath`

A `String` property that determines the save file path of the download item.

The property is only available in session's `will-download` callback function. If user doesn't set the save path via the property, Electron will use the original routine to determine the save path; this usually prompts a save dialog.