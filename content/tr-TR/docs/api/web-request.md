## Sınıf: WebRequest

> İsteğin içeriğini, ömrünün çeşitli aşamalarında kesip değiştirin.

İşlem: [Ana](../glossary.md#main-process)

`WebRequest` sınıfının örneklerine `Session`'nın `webRequest` özelliği kullanılarak erişilir.

`WebRequest`'in metodları isteğe bağlı bir `filter` ve `listener` kabul eder. API'nin event'ı olduğunda `listener` `listener(details)` ile birlikte çağırılmış olacak. `details` nesnesi isteği açıklar.

⚠️ Only the last attached `listener` will be used. Passing `null` as `listener` will unsubscribe from the event.

The `filter` object has a `urls` property which is an Array of URL patterns that will be used to filter out the requests that do not match the URL patterns. If the `filter` is omitted then all requests will be matched.

For certain events the `listener` is passed with a `callback`, which should be called with a `response` object when `listener` has done its work.

An example of adding `User-Agent` header for requests:

```javascript
const { session } = require('electron')

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({ cancel: false, requestHeaders: details.requestHeaders })
})
```

### Örnek yöntemleri

The following methods are available on instances of `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Obje (opsiyonel) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Fonksiyon 
  * `details` Nesne 
    * `id` tamsayı
    * `url` Dize
    * `method` Dizi
    * `webContentsId` Integer (optional)
    * `resourceType` Dize
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `geri aramak` Function 
    * `cevap` Nesne 
      * `cancel` Boolean (isteğe bağlı)
      * `redirectURL` String (isteğe bağlı) - Orijinal istek gönderilmesinden veya tamamlanmasına engel olunur ve bunun yerine belirtilen URL'ye yönlendirilir.

The `listener` will be called with `listener(details, callback)` when a request is about to occur.

The `uploadData` is an array of `UploadData` objects.

The `callback` has to be called with an `response` object.

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filter` Obje (opsiyonel) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Fonksiyon

The `listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any http data is sent.

* `details` Obje 
  * `id` tamsayı
  * `url` Dize
  * `method` Dizi
  * `webContentsId` Integer (optional)
  * `resourceType` Dize
  * `timestamp` Double
  * `requestHeaders` Object
* `geri aramak` Fonksiyon 
  * `response` Nesne 
    * `cancel` Boolean (isteğe bağlı)
    * `requestHeaders` Object (isteğe bağlı) - Sağlandığında istek bu başlıklarla birlikte yapılacaktır.

The `callback` has to be called with an `response` object.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Obje (opsiyonel) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function 
  * `details` Nesne 
    * `id` tamsayı
    * `url` Dize
    * `method` Dizi
    * `webContentsId` Integer (optional)
    * `resourceType` Dize
    * `timestamp` Double
    * `requestHeaders` Object

The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Obje (opsiyonel) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Fonksiyon

The `listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.

* `details` Nesne 
  * `id` tamsayı
  * `url` Dize
  * `method` Dizi
  * `webContentsId` Integer (optional)
  * `resourceType` Dize
  * `timestamp` Double
  * `statusLine` String
  * `statusCode` Tamsayı
  * `responseHeaders` Object
* `geri aramak` Function 
  * `cevap` Nesne 
    * `cancel` Boolean
    * `responseHeaders` Object (isteğe bağlı) - Sağlandığında, sunucu bu başlıklara cevap verecektir.
    * `statusLine` String (optional) - `responseHeaders`'ı geçersiz kılarak başlık durumunu değiştirmeye çalıştığımızda değerler sağlanmalıdır aksi taktirde orjinal yanıt başlığının durumu kullanılır.

The `callback` has to be called with an `response` object.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Obje (opsiyonel) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function 
  * `details` Nesne 
    * `id` tamsayı
    * `url` Dize
    * `method` Dizi
    * `webContentsId` Integer (optional)
    * `resourceType` Dize
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean - Yanıtın disk önbelleğinden getirilip getirilmediğini gösterir.
    * `statusCode` Tamsayı
    * `statusLine` String

The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Obje (opsiyonel) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function 
  * `details` Nesne 
    * `id` tamsayı
    * `url` Dize
    * `method` Dizi
    * `webContentsId` Integer (optional)
    * `resourceType` Dize
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Tamsayı
    * `ip` String (isteğe bağlı) - Gönderilen isteğin olduğu sunucu IP adresi.
    * `fromCache` Boolean
    * `responseHeaders` Object

The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Obje (opsiyonel) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function 
  * `details` Nesne 
    * `id` tamsayı
    * `url` Dize
    * `method` Dizi
    * `webContentsId` Integer (optional)
    * `resourceType` Dize
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean
    * `statusCode` Tamsayı
    * `statusLine` String

The `listener` will be called with `listener(details)` when a request is completed.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Obje (opsiyonel) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function 
  * `details` Nesne 
    * `id` tamsayı
    * `url` Dize
    * `method` Dizi
    * `webContentsId` Integer (optional)
    * `resourceType` Dize
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - Hata açıklaması.

The `listener` will be called with `listener(details)` when an error occurs.