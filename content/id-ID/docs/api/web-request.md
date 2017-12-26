## Kelas: WebRequest

> Mencegat dan memodifikasi isi permintaan pada berbagai tahap dalam masa hidupnya.

Proses:  Utama </ 0></p> 

Instances of the `WebRequest` class are accessed by using the `webRequest` property of a `Session`.

The methods of `WebRequest` accept an optional `filter` and a `listener`. The `listener` will be called with `listener(details)` when the API's event has happened. The `details` object describes the request. Passing `null` as `listener` will unsubscribe from the event.

The `filter` object has a `urls` property which is an Array of URL patterns that will be used to filter out the requests that do not match the URL patterns. If the `filter` is omitted then all requests will be matched.

For certain events the `listener` is passed with a `callback`, which should be called with a `response` object when `listener` has done its work.

An example of adding `User-Agent` header for requests:

```javascript
const {session} = require('electron')

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({cancel: false, requestHeaders: details.requestHeaders})
})
```

### Metode Instance

The following methods are available on instances of `WebRequest`:

#### `webRequest.onBeforeRequest ([filter,] pendengar)`

* `menyaring` Obyek 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `pendengar` Fungsi 
  * `rincian` Obyek 
    * `id` Integer
    * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Fungsi 
    * `respon` Obyek 
      * `cancel` Boolean (optional)
      * `redirectURL` String (optional) - The original request is prevented from being sent or completed and is instead redirected to the given URL.

The `listener` will be called with `listener(details, callback)` when a request is about to occur.

The `uploadData` is an array of `UploadData` objects.

The `callback` has to be called with an `response` object.

#### `webRequest.onBeforeSendHeaders ([filter,] pendengar)`

* `menyaring` Obyek 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* ` pendengar </ 0> Fungsi</li>
</ul>

<p>The <code>listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. Hal ini dapat terjadi setelah a Sambungan TCP dibuat ke server, namun sebelum data http dikirim.</p> 
  * `rincian` Obyek 
    * `id` Integer
    * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
    * `timestamp` Double
    * `requestHeaders` Object
  * `callback` Fungsi 
    * `respon` Obyek 
      * `cancel` Boolean (optional)
      * `requestHeaders` Object (optional) - When provided, request will be made with these headers.
  
  The `callback` has to be called with an `response` object.
  
  #### `webRequest.onSendHeaders ([filter,] pendengar)`
  
  * `menyaring` Obyek 
    * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
  * `pendengar` Fungsi 
    * `rincian` Obyek 
      * `id` Integer
      * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
      * `timestamp` Double
      * `requestHeaders` Object
  
  The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.
  
  #### `webRequest.onHeadersReceived([filter, ]listener)`
  
  * `menyaring` Obyek 
    * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
  * ` pendengar </ 0> Fungsi</li>
</ul>

<p>The <code>listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.</p> 
    * `rincian` Obyek 
      * ` id </ 0>  String</li>
<li><code> url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
      * `timestamp` Double
      * `statusLine` String
      * `statusCode` Bilangan bulat
      * `responseHeaders` Objek
    * `callback` Fungsi 
      * `respon` Obyek 
        * `cancel` Boolean
        * `responseHeaders` Object (optional) - When provided, the server is assumed to have responded with these headers.
        * `statusLine` String (optional) - Should be provided when overriding `responseHeaders` to change header status otherwise original response header's status will be used.
    
    The `callback` has to be called with an `response` object.
    
    #### `webRequest.onResponseStarted([filter, ]listener)`
    
    * `menyaring` Obyek 
      * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
    * `pendengar` Fungsi 
      * `rincian` Obyek 
        * `id` Integer
        * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
        * `timestamp` Double
        * `responseHeaders` Objek
        * `fromCache` Boolean - Indicates whether the response was fetched from disk cache.
        * `statusCode` Bilangan bulat
        * `statusLine` String
    
    The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.
    
    #### `webRequest.onBeforeRedirect([filter, ]listener)`
    
    * `menyaring` Obyek 
      * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
    * `pendengar` Fungsi 
      * `rincian` Obyek 
        * ` id </ 0>  String</li>
<li><code> url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
        * `timestamp` Double
        * `redirectURL` String
        * `statusCode` Bilangan bulat
        * `ip` String (optional) - The server IP address that the request was actually sent to.
        * `fromCache` Boolean
        * `responseHeaders` Objek
    
    The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.
    
    #### `webRequest.onCompleted([filter, ]listener)`
    
    * `menyaring` Obyek 
      * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
    * `pendengar` Fungsi 
      * `rincian` Obyek 
        * `id` Integer
        * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
        * `timestamp` Double
        * `responseHeaders` Objek
        * `fromCache` Boolean
        * `statusCode` Bilangan bulat
        * `statusLine` String
    
    The `listener` will be called with `listener(details)` when a request is completed.
    
    #### `webRequest.onErrorOccurred([filter, ]listener)`
    
    * `menyaring` Obyek 
      * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
    * `pendengar` Fungsi 
      * `rincian` Obyek 
        * `id` Integer
        * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
        * `timestamp` Double
        * `fromCache` Boolean
        * `error` String - The error description.
    
    The `listener` will be called with `listener(details)` when an error occurs.