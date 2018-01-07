# contentTracing

> Performans darboğazlarını ve yavaş işlemleri bulmak için Chromium'un içerik modülünden izleme verilerini toplar.

Süreç: [Ana](../glossary.md#main-process)

Bu modül web arabirimi içermez o yüzden sonuçları görüntülemek için `chrome://tracing/` bunu Chrome tarayıcısında açın ve oluşturulan dosyayı yükleyin.

**Not:** Uygulama modülünün `ready` etkinliği belirtilmeden bu modülü kullanmamalısınız.

```javascript
const {app, contentTracing} = require('electron')

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

## Metodlar

`contentTracing` modülü aşağıdaki metodları içerir:

### `contentTracing.getCategories(callback)`

* `callback` Fonksiyon 
  * `categories` String[]

Kategori gruplarının bir kümesini edinin. Yeni kod yollarına ulaşıldığında kategori grupları değiiştirilebilir.

Once all child processes have acknowledged the `getCategories` request the `callback` is invoked with an array of category groups.

### `contentTracing.startRecording(options, callback)`

* `options` Nesne 
  * `categoryFilter` String
  * `traceOptions` String
* `callback` Function

Tüm işlemler kaydetmeye başlayın.

Kayıt işlemi, EnableRecording isteği alındığı gibi yerel ve asenkron olarak alt süreçlerde başlar. Bütün alt süreçler `startRecording` isteğini onayladıktan sonra `callback` çağırılır.

`categoryFilter`, hangi kategori gruplarının izleneceğini kontrol eden bir filtredir. Filtre, eşleşen bir kategori içeren kategori gruplarını hariç tutmak için `-` ön ekini içerebilir. Aynı listede hem eşleşen hem de eşleşmeyen kategori desenleri desteklenmemektedir.

Örnekler:

* `test_MyTest*`,
* `test_MyTest*,test_OtherStuff`,
* `"-excluded_category1,-excluded_category2`

`traceOptions` ne tarz izlemenin etkinleştirildiğini kontrol eder, virgül ile ayrılmıştır. Mümkün seçenekler şunlardır:

* `kayıt-kadar-tam`
* `Kayıt-sürekli`
* `trace-to-console`
* `enable-sampling`
* `enable-systrace`

İlk 3 seçenek izleme kayıt modlarıdır ve bundan dolayı karşılıklı olarak dışlarlar. Eğer `traceOptions` dizesinde birden fazla izleme kayıt modu varsa, sonuncusu öncelikli olacaktır. If none of the trace recording modes are specified, recording mode is `record-until-full`.

İzleme seçeneği ilk olarak varsayılan seçeneğe (`record_mode` başlamak `record-until-full`, `enable_sampling` ve `enable_systrace`, `traceOptions`'dan ayrıştırılan seçeneklerin üzerine uygulanmadan önce `false`) olarak ayarlanır.

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Fonksiyon 
  * `resultFilePath` String

Kayıt işlemini tüm süreçlerde durdurur.

Child processes typically cache trace data and only rarely flush and send trace data back to the main process. Bu çalışma zamanı yükünü en aza indirmeye yardımcı olur. İzleme verilerini IPC üzerinden gönderdikten sonra izlemenin pahalı bir işlemi olabilir. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `stopRecording` request, `callback` will be called with a file that contains the traced data.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file. The actual file path will be passed to `callback` if it's not `null`.

### `contentTracing.startMonitoring(options, callback)`

* `options` Nesne 
  * `categoryFilter` String
  * `traceOptions` String
* `callback` Function

Start monitoring on all processes.

Monitoring begins immediately locally and asynchronously on child processes as soon as they receive the `startMonitoring` request.

Once all child processes have acknowledged the `startMonitoring` request the `callback` will be called.

### `contentTracing.stopMonitoring(callback)`

* `callback` Function

Tüm işlemlerin izlemesini durdurun.

Once all child processes have acknowledged the `stopMonitoring` request the `callback` is called.

### `contentTracing.captureMonitoringSnapshot(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Fonksiyon 
  * `resultFilePath` String

Geçerli izleme verilerini alın.

Child processes typically cache trace data and only rarely flush and send trace data back to the main process. This is because it may be an expensive operation to send the trace data over IPC and we would like to avoid unneeded runtime overhead from tracing. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `captureMonitoringSnapshot` request the `callback` will be called with a file that contains the traced data.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Fonksiyon 
  * `value` Number
  * `percentage` Number

Get the maximum usage across processes of trace buffer as a percentage of the full state. When the TraceBufferUsage value is determined the `callback` is called.