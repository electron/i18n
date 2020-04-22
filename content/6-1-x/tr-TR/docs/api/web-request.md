## Sınıf: WebRequest

> İsteğin içeriğini, ömrünün çeşitli aşamalarında kesip değiştirin.

İşlem: [Ana](../glossary.md#main-process)

`WebRequest` sınıfının örneklerine `Session`'nın `webRequest` özelliği kullanılarak erişilir.

Ang mga paraan ng `WebRequest` pagtanggap ng opsyunal `filter` at isang `listener`. API'nin event'ı olduğunda `listener` `listener(details)` ile birlikte çağırılmış olacak. `details` nesnesi isteği açıklar.

⚠️ Only the last attached `listener` will be used. Passing `null` as `listener` will unsubscribe from the event.

`filtre` nesnesi, URL kalıplarının bir dizisi olan URL ile eşleşmeyen istekleri filtrelemek için kullanılacak kalıpların `urls` özelliğine sahiptir. Eğer `filter` eksikse, tüm istekler eşleştirilmiş olacaktır.

Bazı durumlar için `listener` işini bitirdiği zaman bir `callback` ile aktarılan `listener`, bir `response` nesnesi ile çağırılmış olmalıdır.

İsteklere `User-Agent` başlığı ekleme örneği:

```javascript
const { session } = require('electron')

// Aşağıdaki Url'ler için tüm istekleri kullanıcı aracına değiştirin.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({ requestHeaders: details.requestHeaders })
})
```

### Örnek yöntemleri

Aşağıdaki yöntemler `WebRequest`'in örneklerinde mevcuttur:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` tamsayı
    * `url` Dize
    * `method` Dizi
    * `webContentsId` Integer (optional)
    * `resourceType` Dize
    * `referrer` Dize
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `response` Object
      * `cancel` Boolean (isteğe bağlı)
      * `redirectURL` String (isteğe bağlı) - Orijinal istek gönderilmesinden veya tamamlanmasına engel olunur ve bunun yerine belirtilen URL'ye yönlendirilir.

Bir istek gerçekleşmek üzereyken `listener` `listener(details, callback)` ile birlikte çağırılmış olacak.

`uploadData`, `UploadData` nesnelerinin bir dizisidir.

`callback` bir </code>`response` nesnesi ile birlikte çağırılacak.

Some examples of valid `urls`:

```js
'http://foo:1234/'
'http://foo.com/'
'http://foo:1234/bar'
'*://*/*'
'*://example.com/*'
'*://example.com/foo/*'
'http://*.foo:1234/'
'file://foo:1234/bar'
'http://foo:*/'
'*://www.foo.com/'
```

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `kOD` Sayı
    * `path` {string}
    * `method` Dizi
    * `webContentsId` Integer (optional)
    * `resourceType` Dize
    * `referrer` Dize
    * `timestamp` Double
    * `requestHeaders` Object
  * `callback` Function
    * `response` Object
      * `cancel` Boolean (isteğe bağlı)
      * `requestHeaders` Object (isteğe bağlı) - Sağlandığında istek bu başlıklarla birlikte yapılacaktır.

Bir HTTP isteği gönderilmeden önce, istek başlıkları mevcut olduğunda `listener` `listener(details, callback)` ile birlikte çağırılacak. Bu, bir sunucuya TCP bağlantısı yapıldığında ortaya çıkabilir ancak öncesinde herhangi bir http verisi gönderilmiştir.

`callback` bir </code>`response` nesnesi ile birlikte çağırılacak.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` tamsayı
    * `url` Dize
    * `method` Dizi
    * `webContentsId` Integer (optional)
    * `resourceType` Dize
    * `referrer` Dize
    * `timestamp` Double
    * `requestHeaders` Object

Sunucuya gönderilecek bir istekten hemen önce `listener` `listener(details)` ile birlikte çağırılacak. `onBeforeSendHeaders` yanıtlarının önceki değişiklikleri bu listener'ın işi bitinceye kadar görülür.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` tamsayı
    * `url` Dize
    * `method` Dizi
    * `webContentsId` Integer (optional)
    * `resourceType` Dize
    * `referrer` Dize
    * `timestamp` Double
    * `statusLine` String
    * `statusCode` Tamsayı
    * `responseHeaders` Object
  * `callback` Function
    * `response` Object
      * `cancel` Boolean (isteğe bağlı)
      * `responseHeaders` Object (isteğe bağlı) - Sağlandığında, sunucu bu başlıklara cevap verecektir.
      * `statusLine` String (optional) - `responseHeaders`'ı geçersiz kılarak başlık durumunu değiştirmeye çalıştığımızda değerler sağlanmalıdır aksi taktirde orjinal yanıt başlığının durumu kullanılır.

İsteklerin HTTP cevap başlıkları alındığında `listener` `listener(details, callback)` ile birlikte çağırılacak.

`callback` bir </code>`response` nesnesi ile birlikte çağırılacak.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` tamsayı
    * `url` Dize
    * `method` Dizi
    * `webContentsId` Integer (optional)
    * `resourceType` Dize
    * `referrer` Dize
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean - Yanıtın disk önbelleğinden getirilip getirilmediğini gösterir.
    * `statusCode` Tamsayı
    * `statusLine` String

Cevap parçasının ilk byte'ı alındığında `listener` `listener(details)` ile birlikte çağırılacaktır. HTTP istekleri için bu, durum satırı ve yanıt başlıklarının mevcut olduğu anlamına gelmektedir.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` tamsayı
    * `url` Dize
    * `method` Dizi
    * `webContentsId` Integer (optional)
    * `resourceType` Dize
    * `referrer` Dize
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Tamsayı
    * `ip` String (isteğe bağlı) - Gönderilen isteğin olduğu sunucu IP adresi.
    * `fromCache` Boolean
    * `responseHeaders` Object

Sunucu ile başlatılan bir yönlendirme gerçekleşmek üzereyken `listener` `listener(details)` ile birlikte çağırılacaktır.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` tamsayı
    * `url` Dize
    * `method` Dizi
    * `webContentsId` Integer (optional)
    * `resourceType` Dize
    * `referrer` Dize
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean
    * `statusCode` Tamsayı
    * `statusLine` String

Bir istek tamamlandığında `listener` `listener(details)` ile birlikte çağırılacaktır.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` tamsayı
    * `url` Dize
    * `method` Dizi
    * `webContentsId` Integer (optional)
    * `resourceType` Dize
    * `referrer` Dize
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - Hata açıklaması.

Bir hata oluştuğunda `listener` `listener(details)` ile birlikte çağırılacaktır.
