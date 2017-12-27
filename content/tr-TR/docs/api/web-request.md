## Sınıf: WebRequest

> İsteğin içeriğini ömrünün çeşitli aşamalarında kesip değiştirin.

Süreç: [Ana](../glossary.md#main-process)

`WebRequest` sınıfının örneklerine `webRequest`'nin `Session` özelliği kullanılarak erişilir.

`WebRequest`'in metodları isteğe bağlı bir `filter` ve `listener` kabul eder. API'nin event'ı olduğunda `listener` `listener(details)` ile birlikte çağırılmış olacak. `details` nesnesi isteği açıklar. `listener` gibi `null` göndermek event'ı iptal edecektir.

The `filter` object has a `urls` property which is an Array of URL patterns that will be used to filter out the requests that do not match the URL patterns. Eğer `filter` eksikse, tüm istekler eşleştirilmiş olacaktır.

For certain events the `listener` is passed with a `callback`, which should be called with a `response` object when `listener` has done its work.

An example of adding `User-Agent` header for requests:

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
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
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
      * `cancel` Boolean (optional)
      * `redirectURL` String (optional) - The original request is prevented from being sent or completed and is instead redirected to the given URL.

The `listener` will be called with `listener(details, callback)` when a request is about to occur.

The `uploadData` is an array of `UploadData` objects.

The `callback` has to be called with an `response` object.

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filter` Object 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
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
    * `cancel` Boolean (optional)
    * `requestHeaders` Object (optional) - When provided, request will be made with these headers.

The `callback` has to be called with an `response` object.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Nesne 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
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
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function

The `listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.

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

The `callback` has to be called with an `response` object.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Nesne 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function 
  * `details` Nesne 
    * `id` Integer
    * `url` String
    * `method` String
    * `resourceType` Dize
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean - Indicates whether the response was fetched from disk cache.
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Nesne 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function 
  * `details` Nesne 
    * `id` String
    * `url` String
    * `method` String
    * `resourceType` Dize
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Integer
    * `ip` String (optional) - The server IP address that the request was actually sent to.
    * `fromCache` Boolean
    * `responseHeaders` Object

The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Nesne 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
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

The `listener` will be called with `listener(details)` when a request is completed.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Nesne 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function 
  * `details` Nesne 
    * `id` Integer
    * `url` String
    * `method` String
    * `resourceType` Dize
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - The error description.

The `listener` will be called with `listener(details)` when an error occurs.