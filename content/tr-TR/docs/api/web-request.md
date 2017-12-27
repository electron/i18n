## Sınıf: WebRequest

> İsteğin içeriğini ömrünün çeşitli aşamalarında kesip değiştirin.

Süreç: [Ana](../glossary.md#main-process)

`WebRequest` sınıfının örneklerine `webRequest`'nin `Session` özelliği kullanılarak erişilir.

`WebRequest`'in metodları isteğe bağlı bir `filter` ve `listener` kabul eder. API'nin event'ı olduğunda `listener` `listener(details)` ile birlikte çağırılmış olacak. `details` nesnesi isteği açıklar. `listener` gibi `null` göndermek event'ı iptal edecektir.

The `filter` object has a `urls` property which is an Array of URL patterns that will be used to filter out the requests that do not match the URL patterns. Eğer `filter` eksikse, tüm istekler eşleştirilmiş olacaktır.

Bazı durumlar için `listener` işini bitirdiği zaman bir `callback` ile aktarılan `listener` bir `response` nesnesi ile çağırılmış olmalıdır.

İsteklere `User-Agent` başlığı ekleme örneği:

```javascript
const {session} = require('electron')

// Aşağıdaki Url'ler için tüm istekleri kullanıcı aracına değiştirin.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({cancel: false, requestHeaders: details.requestHeaders})
})
```

### Örnek yöntemleri

Aşağıdaki yöntemler `WebRequest`'in örneklerinde mevcuttur:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Nesne 
  * `urls` String[] - Filtre uygulamak için kullanılacak URL kalıpları dizisi URL modelleriyle eşleşmeyen istekler.
* `listener` Function 
  * `details` Nesne 
    * `id` Integer
    * `url` String
    * `method` String
    * `resourceType` Dize
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `response` Object 
      * `cancel` Boolean (isteğe bağlı)
      * `redirectURL` String (isteğe bağlı) - Orijinal istek gönderilmesinden veya tamamlanmasına engel olunur ve bunun yerine belirtilen URL'ye yönlendirilir.

Bir istek gerçekleşmek üzereyken `listener` `listener(details, callback)` ile birlikte çağırılmış olacak.

`uploadData`, `UploadData` nesnelerinin bir dizisidir.

`callback` bir `response` nesnesi ile birlikte çağırılacak.

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filter` Object 
  * `urls` String[] - Filtre uygulamak için kullanılacak URL kalıpları dizisi URL modelleriyle eşleşmeyen istekler.
* `listener` Function

The `listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any http data is sent.

* `details` Nesne 
  * `id` Integer
  * `url` String
  * `method` String
  * `resourceType` Dize
  * `timestamp` Double
  * `requestHeaders` Object
* `callback` Function 
  * `cevap` Nesne 
    * `cancel` Boolean (isteğe bağlı)
    * `requestHeaders` Object (isteğe bağlı) - Sağlandığında istek bu header bilgileriyle birlikte yapılacaktır.

`callback` bir `response` nesnesi ile birlikte çağırılacak.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Nesne 
  * `urls` String[] - Filtre uygulamak için kullanılacak URL kalıpları dizisi URL modelleriyle eşleşmeyen istekler.
* `listener` Function 
  * `details` Nesne 
    * `id` Integer
    * `url` String
    * `method` String
    * `resourceType` Dize
    * `timestamp` Double
    * `requestHeaders` Object

The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Nesne 
  * `urls` String[] - Filtre uygulamak için kullanılacak URL kalıpları dizisi URL modelleriyle eşleşmeyen istekler.
* `listener` Function

İsteklerin HTTP cevap başlıkları alındığında `listener` `listener(details, callback)` ile birlikte çağırılacak.

* `details` Nesne 
  * `kimlik` dizesi
  * `url` String
  * `method` String
  * `resourceType` Dize
  * `timestamp` Double
  * `statusLine` String
  * `statusCode` Integer
  * `responseHeaders` Object
* `callback` Function 
  * `response` Object 
    * `cancel` Boolean
    * `responseHeaders` Object (optional) - When provided, the server is assumed to have responded with these headers.
    * `statusLine` String (optional) - Should be provided when overriding `responseHeaders` to change header status otherwise original response header's status will be used.

`callback` bir `response` nesnesi ile birlikte çağırılacak.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Nesne 
  * `urls` String[] - Filtre uygulamak için kullanılacak URL kalıpları dizisi URL modelleriyle eşleşmeyen istekler.
* `listener` Function 
  * `details` Nesne 
    * `id` Integer
    * `url` String
    * `method` String
    * `resourceType` Dize
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean - Yanıtın disk önbelleğinden getirilip getirilmediğini gösterir.
    * `statusCode` Integer
    * `statusLine` String

Cevap parçasının ilk byte'ı alındığında `listener` `listener(details)` ile birlikte çağırılacaktır. HTTP istekleri için bu durum satırı ve yanıt başlıklarının mevcut olduğu anlamına gelmektedir.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Nesne 
  * `urls` String[] - Filtre uygulamak için kullanılacak URL kalıpları dizisi URL modelleriyle eşleşmeyen istekler.
* `listener` Function 
  * `details` Nesne 
    * `id` String
    * `url` String
    * `method` String
    * `resourceType` Dize
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Integer
    * `ip` String (isteğe bağlı) - Gönderilen isteğin olduğu sunucu IP adresi.
    * `fromCache` Boolean
    * `responseHeaders` Object

Sunucu ile başlatılan bir yönlendirme gerçekleşmek üzereyken `listener` `listener(details)` ile birlikte çağırılacaktır.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Nesne 
  * `urls` String[] - Filtre uygulamak için kullanılacak URL kalıpları dizisi URL modelleriyle eşleşmeyen istekler.
* `listener` Function 
  * `details` Nesne 
    * `id` Integer
    * `url` String
    * `method` String
    * `resourceType` String
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean
    * `statusCode` Integer
    * `statusLine` String

Bir istek tamamlandığında `listener` `listener(details)` ile birlikte çağırılacaktır.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Nesne 
  * `urls` String[] - Filtre uygulamak için kullanılacak URL kalıpları dizisi URL modelleriyle eşleşmeyen istekler.
* `listener` Function 
  * `details` Nesne 
    * `id` Integer
    * `url` String
    * `method` String
    * `resourceType` Dize
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - Hata açıklaması.

Bir hata oluştuğunda `listener` `listener(details)` ile birlikte çağırılacaktır.