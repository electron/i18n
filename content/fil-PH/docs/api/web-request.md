## Klase: WebRequest

> Pagkuha at pagbago ng mga nilalaman ng hiling at ng ibat ibang antas ng kanyang buhay.

Proseso:[Pangunahi](../glossary.md#main-process)

May ilang pagkakataon na ang `WebRequests` class ay mapupuntahan gamit ang `WebRequests` na katangian ng isang `Session`.

Ang mga paraan ng `WebRequest` pagtanggap ng opsyunal `filter` at isang `listener`. `listener` ay matatawag gamit ang `listener(details)` kung ang event ng API ay naganap. Ang `detalye` bagay na nagrerepresenta sa request.

⚠️ Only the last attached `listener` will be used. Passing `null` as `listener` will unsubscribe from the event.

Ang `filter` ng isang bagay ay mayroong `urls` katangian kung saan ito ay Array ng URL patterns na magagamit sa pagiba-iba ng mga hiling na hindi tugma sa URL patterns. Kung ang `filter` ay makukuha kung kaya lahat ng mga hiling ay matutugma.

Para sa ilang mga event ang `listener` ay binigyan ng isang `callback`, na kung tatawagin ay isang `response` bagay kung `listener` nagampanan nya ang kanyang trabaho.

Isang halimbawa ng pagdagdag ng `User-Agent` header para sa mga halimbawa:

```javascript
const { session } = require('electron')

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({ requestHeaders: details.requestHeaders })
})
```

### Mga Halimbawa ng Sistematikong Paraan

The following methods are available on instances of `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `salain` Bagay (opsyonal) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null 
  * `ang mga detalye` Bagay 
    * `id` Integer
    * `key` String
    * `path` na String
    * `exitCode` Integer (opsyonal)
    * `referrer` na String
    * `referer` String
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Punsyon 
    * `response` Bagay 
      * `cancel` Boolean (optional)
      * `redirectURL` String (optional) - The original request is prevented from being sent or completed and is instead redirected to the given URL.

The `listener` will be called with `listener(details, callback)` when a request is about to occur.

The `uploadData` is an array of `UploadData` objects.

The `callback` has to be called with an `response` object.

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

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `salain` Bagay (opsyonal) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null 
  * `ang mga detalye` Bagay 
    * `id` Integer
    * `url` Tali
    * `method` na String
    * `exitCode` Integer (opsyonal)
    * `resourceType` Tali
    * `referer` String
    * `timestamp` Double
    * `requestHeaders` Record<string, string>
  * `callback` Function 
    * `response` Bagay 
      * `cancel` Boolean (optional)
      * `requestHeaders` Record<string, string | string[]> (optional) - When provided, request will be made with these headers.

The `listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any http data is sent.

The `callback` has to be called with a `response` object.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `salain` Na Bagay (opsyonal) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null 
  * `ang mga detalye` Bagay 
    * `id` Integer
    * `url` Tali
    * `method` na String
    * `exitCode` Integer (opsyonal)
    * `resourceType` Tali
    * `referer` String
    * `timestamp` Double
    * `requestHeaders` Record<string, string>

The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `salain` Bagay (opsyonal) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null 
  * `ang mga detalye` Bagay 
    * `id` Integer
    * `url` Tali
    * `method` na String
    * `exitCode` Integer (opsyonal)
    * `resourceType` String
    * `referer` String
    * `timestamp` Double
    * `statusLine` String
    * `statusCode` Integer
    * `responseHeaders` Record<string, string> (optional)
  * `callback` Function 
    * `response` Bagay 
      * `cancel` Boolean (optional)
      * `responseHeaders` Record<string, string | string[]> (optional) - When provided, the server is assumed to have responded with these headers.
      * `statusLine` String (optional) - Should be provided when overriding `responseHeaders` to change header status otherwise original response header's status will be used.

The `listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.

The `callback` has to be called with a `response` object.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `salain` Bagay (opsyonal) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null 
  * `ang mga detalye` Bagay 
    * `id` Integer
    * `url` Tali
    * `method` na String
    * `exitCode` Integer (opsyonal)
    * `resourceType` Tali
    * `referer` String
    * `timestamp` Double
    * `responseHeaders` Record<string, string> (optional)
    * `fromCache` Boolean - Indicates whether the response was fetched from disk cache.
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `salain` Na Bagay (opsyonal) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null 
  * `ang mga detalye` Bagay 
    * `id` Integer
    * `url` Tali
    * `method` na String
    * `exitCode` Integer (opsyonal)
    * `resourceType` Tali
    * `referer` String
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Integer
    * `statusLine` String
    * `ip` String (optional) - The server IP address that the request was actually sent to.
    * `fromCache` Boolean
    * `responseHeaders` Record<string, string> (optional)

The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.

#### `webRequest.onCompleted([filter, ]listener)`

* `salain` Na Bagay (opsyonal) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null 
  * `ang mga detalye` Bagay 
    * `id` Integer
    * `url` Tali
    * `method` na String
    * `exitCode` Integer (opsyonal)
    * `resourceType` Tali
    * `referer` String
    * `timestamp` Double
    * `responseHeaders` Record<string, string> (optional)
    * `fromCache` Boolean
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when a request is completed.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `salain` Bagay (opsyonal) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null 
  * `ang mga detalye` Bagay 
    * `id` Integer
    * `url` Tali
    * `method` na String
    * `exitCode` Integer (opsyonal)
    * `resourceType` String
    * `referer` String
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - The error description.

The `listener` will be called with `listener(details)` when an error occurs.