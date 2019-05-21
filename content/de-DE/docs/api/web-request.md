## Class: WebRequest

> Intercept and modify the contents of a request at various stages of its lifetime.

Prozess: [Haupt](../glossary.md#main-process)

Instances of the `WebRequest` class are accessed by using the `webRequest` property of a `Session`.

The methods of `WebRequest` accept an optional `filter` and a `listener`. The `listener` will be called with `listener(details)` when the API's event has happened. The `details` object describes the request.

⚠️ Only the last attached `listener` will be used. Passing `null` as `listener` will unsubscribe from the event.

The `filter` object has a `urls` property which is an Array of URL patterns that will be used to filter out the requests that do not match the URL patterns. If the `filter` is omitted then all requests will be matched.

For certain events the `listener` is passed with a `callback`, which should be called with a `response` object when `listener` has done its work.

Ein Beispiel zum hinzufügen von `User-Agent` Headern für Requests:

```javascript
const { session } = require('electron')

// Modifiziert den user agent für alle requests zu den folgenden Urls.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({ requestHeaders: details.requestHeaders })
}){ requestHeaders: details.requestHeaders }
```

### Instanz Methoden

Die folgenden Methoden sind verfügbar in Instanzen von `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Objekt (optional) 
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Function | null 
  * `details` Objekt 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Funktion 
    * `response` Objekt 
      * `cancel` Boolean (optional)
      * `redirectURL` String (optional) - The original request is prevented from being sent or completed and is instead redirected to the given URL.

The `listener` will be called with `listener(details, callback)` when a request is about to occur.

`uploadData` ist ein Array mit `UploadData` Objekten.

Der `callback` muss aufgerufen werden mit einem `response` Objekt.

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filter` Objekt (optional) 
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `requestHeaders` Object
  * `callback` Funktion 
    * `response` Objekt 
      * `cancel` Boolean (optional)
      * `requestHeaders` Object (optional) - When provided, request will be made with these headers.

The `listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any http data is sent.

Der `callback` muss aufgerufen werden mit einem `response` Objekt.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Objekt (optional) 
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `requestHeaders` Object

The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Objekt (optional) 
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `statusLine` String
    * `statusCode` Integer
    * `responseHeaders` Object
  * `callback` Funktion 
    * `response` Object 
      * `cancel` Boolean (optional)
      * `responseHeaders` Object (optional) - When provided, the server is assumed to have responded with these headers.
      * `statusLine` String (optional) - Should be provided when overriding `responseHeaders` to change header status otherwise original response header's status will be used.

The `listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.

Der `callback` muss aufgerufen werden mit einem `response` Objekt.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Objekt (optional) 
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean - Indicates whether the response was fetched from disk cache.
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Objekt (optional) 
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Integer
    * `ip` String (optional) - Die Server IP Adresse an den der Request ursprünglich gesendet wurde.
    * `fromCache` Boolean
    * `responseHeaders` Object

The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Objekt (optional) 
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when a request is completed.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Objekt (optional) 
  * `urls` String[] - Array mit URL Patterns welche requests herausfiltern die nicht dem URL Pattern entsprechen.
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - The error description.

The `listener` will be called with `listener(details)` when an error occurs.