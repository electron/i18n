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

* `geri aramak` Fonksiyon 
  * `categories` Dizi[]

Kategori gruplarının bir kümesini edinin. Yeni kod yollarına ulaşıldığında kategori grupları değiiştirilebilir.

Bütün alt süreçler, `getCategories` isteğini onayladıktan sonra, `callback` kategori grupları dizisi ile çağırılır.

### `contentTracing.startRecording(options, callback)`

* `seçenekler` Nesne 
  * `categoryFilter` Dizi
  * `traceOptions` Dizi
* `callback` Fonksiyon

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

İlk 3 seçenek izleme kayıt modlarıdır ve bundan dolayı karşılıklı olarak dışlarlar. Eğer `traceOptions` dizesinde birden fazla izleme kayıt modu varsa, sonuncusu öncelikli olacaktır. Eğer hiç izleme kayıt modu belirtilmediyse, kayıt modu `record-until-full` olacaktır.

İzleme seçeneği ilk olarak varsayılan seçeneğe (`record_mode` başlamak `record-until-full`, `enable_sampling` ve `enable_systrace`, `traceOptions`'dan ayrıştırılan seçeneklerin üzerine uygulanmadan önce `false`) olarak ayarlanır.

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` Dizi
* `geri aramak` Fonksiyon 
  * `resultFilePath` Dizi

Kayıt işlemini tüm süreçlerde durdurur.

Alt süreçler tipik olarak izleme verilerini önbelleğe alır ve nadiren temizlerler ve izleme verisini ana sürece gönderirler. Bu çalışma zamanı yükünü en aza indirmeye yardımcı olur. İzleme verilerini IPC üzerinden gönderdikten sonra izlemenin pahalı bir işlemi olabilir. Dolayısıyla, izlemeyi sonlandırmak için, asenkron olarak bütün alt süreçlerden bekleyen tüm izleme verilerini silmek için isteyin.

Bütün alt süreçler, `stopRecording` isteğini onayladıktan sonra, `callback`, izlenen verileri içeren bir dosyayla çağrılır.

Eğer izleme verileri boş değilse veya geçici dosyaya gönderilirse `resultFilePath` içerisine yazılır. Eğer gerçek dosya yolu `null` değil ise `callback`'e geçirilir.

### `contentTracing.startMonitoring(options, callback)`

* `seçenekler` Nesne 
  * `categoryFilter` Dizi
  * `traceOptions` Dizi
* `callback` Fonksiyon

Tüm süreçlerin izlenmesini başlat.

İzleme işlemi, `startMonitoring` isteği alındığı gibi yerel ve asenkron olarak alt süreçlerde başlar.

Tüm alt süreçler `startMonitoring` isteğini onayladıktan sonra `callback` çağırılacaktır.

### `contentTracing.stopMonitoring(callback)`

* `callback` Fonksiyon

Tüm işlemlerin izlemesini durdurun.

Tüm alt süreçler `stopMonitoring` isteğini onayladıktan sonra `callback` çağırılır.

### `contentTracing.captureMonitoringSnapshot(resultFilePath, callback)`

* `resultFilePath` Dizi
* `geri aramak` Fonksiyon 
  * `resultFilePath` Dizi

Geçerli izleme verilerini alın.

Alt süreçler tipik olarak izleme verilerini önbelleğe alır ve nadiren temizlerler ve izleme verisini ana sürece gönderirler. İzleme verilerini IPC üzerinden göndermek pahalı bir işlem olabilir ve gereksiz çalışma zamanı yükünün izlenmesini önlemek istiyoruz. Dolayısıyla, izlemeyi sonlandırmak için, asenkron olarak bütün alt süreçlerden bekleyen tüm izleme verilerini silmek için isteyin.

Bütün alt süreçler, `captureMonitoringSnapshot` isteğini onayladıktan sonra, `callback`, izlenen verileri içeren bir dosyayla çağrılır.

### `contentTracing.getTraceBufferUsage(callback)`

* `geri aramak` Fonksiyon 
  * `value` numara
  * `percentage` numara

İzleme arabelleği işlemlerindeki maksimum kullanımı tam durum yüzdesi olarak alın. TraceBufferUsage değeri belirlendiğinde `callback` çağırılır.