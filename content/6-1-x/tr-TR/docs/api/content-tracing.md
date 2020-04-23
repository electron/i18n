# contentTracing

> Performans darboğazlarını ve yavaş işlemleri bulmak için Chromium'un içerik modülünden izleme verilerini toplar.

İşlem: [Ana](../glossary.md#main-process)

Bu modül web arabirimi içermez o yüzden sonuçları görüntülemek için `chrome://tracing/` bunu Chrome tarayıcısında açın ve oluşturulan dosyayı yükleyin.

**Not:** Uygulama modülünün `ready` etkinliği belirtilmeden bu modülü kullanmamalısınız.

```javascript
const { app, contentTracing } = require('electron')

app.on('ready', () => {
  const options = {
    categoryFilter: '*',
    traceOptions: 'record-until-full,enable-sampling'
  }

  contentTracing.startRecording(options, () => {
    console.log('Tracing started')

    setTimeout(() => {
      contentTracing.stopRecording('', (path) => {
        console.log('Tracing data recorded to ' + path)
      })
    }, 5000)
  })
})
```

## Yöntemler

`contentTracing` modülü aşağıdaki metodları içerir:

### `contentTracing.getCategories(callback)`

* `callback` Function
  * `categories` Dizi[]

Get a set of category groups. The category groups can change as new code paths are reached.

Once all child processes have acknowledged the `getCategories` request the `callback` is invoked with an array of category groups.

**[Deprecated Soon](modernization/promisification.md)**

### `contentTracing.getCategories()`

Returns `Promise<String[]>` - resolves with an array of category groups once all child processes have acknowledged the `getCategories` request

Get a set of category groups. The category groups can change as new code paths are reached.


### `contentTracing.startRecording(options, callback)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))
* `callback` Function

Tüm işlemler kaydetmeye başlayın.

Kayıt işlemi, EnableRecording isteği alındığı gibi yerel ve asenkron olarak alt süreçlerde başlar. Bütün alt süreçler `startRecording` isteğini onayladıktan sonra `callback` çağırılır.

**[Deprecated Soon](modernization/promisification.md)**

### `contentTracing.startRecording(options)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))

Returns `Promise<void>` - resolved once all child processes have acknowledged the `startRecording` request.

Tüm işlemler kaydetmeye başlayın.

Kayıt işlemi, EnableRecording isteği alındığı gibi yerel ve asenkron olarak alt süreçlerde başlar.

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` Dizi
* `callback` Function
  * `resultFilePath` Dizi

Kayıt işlemini tüm süreçlerde durdurur.

Alt süreçler tipik olarak izleme verilerini önbelleğe alır ve nadiren temizlerler ve izleme verisini ana sürece gönderirler. Bu çalışma zamanı yükünü en aza indirmeye yardımcı olur. İzleme verilerini IPC üzerinden gönderdikten sonra izlemenin pahalı bir işlemi olabilir. Dolayısıyla, izlemeyi sonlandırmak için, asenkron olarak bütün alt süreçlerden bekleyen tüm izleme verilerini silmek için isteyin.

Bütün alt süreçler, `stopRecording` isteğini onayladıktan sonra, `callback`, izlenen verileri içeren bir dosyayla çağrılır.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file. The actual file path will be passed to `callback` if it's not `null`.

**[Deprecated Soon](modernization/promisification.md)**

### `contentTracing.stopRecording(resultFilePath)`

* `resultFilePath` Dizi

Returns `Promise<String>` - resolves with a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

Kayıt işlemini tüm süreçlerde durdurur.

Alt süreçler tipik olarak izleme verilerini önbelleğe alır ve nadiren temizlerler ve izleme verisini ana sürece gönderirler. Bu çalışma zamanı yükünü en aza indirmeye yardımcı olur. İzleme verilerini IPC üzerinden gönderdikten sonra izlemenin pahalı bir işlemi olabilir. Dolayısıyla, izlemeyi sonlandırmak için, asenkron olarak bütün alt süreçlerden bekleyen tüm izleme verilerini silmek için isteyin.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Function
  * Nesne
    * `value` numara
    * `percentage` numara

Get the maximum usage across processes of trace buffer as a percentage of the full state. When the TraceBufferUsage value is determined the `callback` is called.

**[Deprecated Soon](modernization/promisification.md)**

### `contentTracing.getTraceBufferUsage()`

Returns `Promise<Object>` - Resolves with an object containing the `value` and `percentage` of trace buffer maximum usage

Get the maximum usage across processes of trace buffer as a percentage of the full state.
