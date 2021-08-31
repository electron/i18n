## Class: WebRequest

> Intercept and modify the contents of a request at various stages of its lifetime.

Process: [Main](../glossary.md#main-process)

Instances of the `WebRequest` class are accessed by using the `webRequest`
property of a `Session`.

The methods of `WebRequest` accept an optional `filter` and a `listener`. The
`listener` will be called with `listener(details)` when the API's event has
happened. The `details` object describes the request.

⚠️ Only the last attached `listener` will be used. Passing `null` as `listener` will unsubscribe from the event.

The `filter` object has a `urls` property which is an Array of URL
patterns that will be used to filter out the requests that do not match the URL
patterns. If the `filter` is omitted then all requests will be matched.

For certain events the `listener` is passed with a `callback`, which should be
called with a `response` object when `listener` has done its work.

An example of adding `User-Agent` header for requests:

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

### Instance Methods

The following methods are available on instances of `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the
        requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String - Can be `mainFrame`, `subFrame`, `stylesheet`, `script`, `image`, `font`, `object`, `xhr`, `ping`, `cspReport`, `media`, `webSocket` or `other`.
    * `referrer` String
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `response` Object
      * `cancel` Boolean (optional)
      * `redirectURL` String (optional) - The original request is prevented from
        being sent or completed and is instead redirected to the given URL.

The `listener` will be called with `listener(details, callback)` when a request
is about to occur.

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

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the
        requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String - Can be `mainFrame`, `subFrame`, `stylesheet`, `script`, `image`, `font`, `object`, `xhr`, `ping`, `cspReport`, `media`, `webSocket` or `other`.
    * `referrer` String
    * `timestamp` Double
    * `requestHeaders` Record<string, string>
  * `callback` Function
    * `beforeSendResponse` Object
      * `cancel` Boolean (optional)
      * `requestHeaders` Record<string, string | string[]> (optional) - When provided, request will be made
  with these headers.

The `listener` will be called with `listener(details, callback)` before sending
an HTTP request, once the request headers are available. This may occur after a
TCP connection is made to the server, but before any http data is sent.

The `callback` has to be called with a `response` object.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the
        requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String - Can be `mainFrame`, `subFrame`, `stylesheet`, `script`, `image`, `font`, `object`, `xhr`, `ping`, `cspReport`, `media`, `webSocket` or `other`.
    * `referrer` String
    * `timestamp` Double
    * `requestHeaders` Record<string, string>

The `listener` will be called with `listener(details)` just before a request is
going to be sent to the server, modifications of previous `onBeforeSendHeaders`
response are visible by the time this listener is fired.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the
        requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String - Can be `mainFrame`, `subFrame`, `stylesheet`, `script`, `image`, `font`, `object`, `xhr`, `ping`, `cspReport`, `media`, `webSocket` or `other`.
    * `referrer` String
    * `timestamp` Double
    * `statusLine` String
    * `statusCode` Integer
    * `responseHeaders` Record<string, string[]> (optional)
  * `callback` Function
    * `headersReceivedResponse` Object
      * `cancel` Boolean (optional)
      * `responseHeaders` Record<string, string | string[]> (optional) - When provided, the server is assumed
        to have responded with these headers.
      * `statusLine` String (optional) - Should be provided when overriding
        `responseHeaders` to change header status otherwise original response
        header's status will be used.

The `listener` will be called with `listener(details, callback)` when HTTP
response headers of a request have been received.

The `callback` has to be called with a `response` object.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the
        requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String - Can be `mainFrame`, `subFrame`, `stylesheet`, `script`, `image`, `font`, `object`, `xhr`, `ping`, `cspReport`, `media`, `webSocket` or `other`.
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` Record<string, string[]> (optional)
    * `fromCache` Boolean - Indicates whether the response was fetched from disk
      cache.
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when first byte of the
response body is received. For HTTP requests, this means that the status line
and response headers are available.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the
        requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String - Can be `mainFrame`, `subFrame`, `stylesheet`, `script`, `image`, `font`, `object`, `xhr`, `ping`, `cspReport`, `media`, `webSocket` or `other`.
    * `referrer` String
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Integer
    * `statusLine` String
    * `ip` String (optional) - The server IP address that the request was
      actually sent to.
    * `fromCache` Boolean
    * `responseHeaders` Record<string, string[]> (optional)

The `listener` will be called with `listener(details)` when a server initiated
redirect is about to occur.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the
        requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String - Can be `mainFrame`, `subFrame`, `stylesheet`, `script`, `image`, `font`, `object`, `xhr`, `ping`, `cspReport`, `media`, `webSocket` or `other`.
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` Record<string, string[]> (optional)
    * `fromCache` Boolean
    * `statusCode` Integer
    * `statusLine` String
    * `error` String

The `listener` will be called with `listener(details)` when a request is
completed.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the
        requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `webContents` WebContents (optional)
    * `frame` WebFrameMain (optional)
    * `resourceType` String - Can be `mainFrame`, `subFrame`, `stylesheet`, `script`, `image`, `font`, `object`, `xhr`, `ping`, `cspReport`, `media`, `webSocket` or `other`.
    * `referrer` String
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - The error description.

The `listener` will be called with `listener(details)` when an error occurs.
