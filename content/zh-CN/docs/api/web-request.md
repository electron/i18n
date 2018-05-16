## Class: WebRequest

> 在一个请求生命周期的不同阶段，截取和修改其内容。

线程：[主线程](../glossary.md#main-process)

使用 ` Session ` 的 ` WebRequest ` 属性访问 ` WebRequest ` 类的实例。

` WebRequest ` 的方法接受可选的 `filter ` 和 ` listener `。 当 API 的事件发生时, 将使用 ` listener(details) ` 来调用 ` listener`。 ` 详细details ` 对象描述了该请求。 若` listener `为` null `，则取消订阅该事件。

` filter ` 对象具有一个 ` url ` 属性, 它是一个 url 模式数组, 用于筛选出与 url 模式不匹配的请求。 如果省略 ` filter `, 则所有请求都将匹配。

对于某些事件, ` listener ` 是通过 ` callback` 传递的, 当 `listener ` 完成其工作时, 应使用 ` response ` 对象进行调用。

为 requests 添加 `User-Agent` 头的示例：

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

### 实例方法

以下方法可用于 ` WebRequest ` 的实例:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function - 回调函数 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `response` Object 
      * `cancel` Boolean (optional)
      * `redirectURL` String (optional) - The original request is prevented from being sent or completed and is instead redirected to the given URL.

当请求即将发生时，调用`listener(details, callback)`。

`uploadData` 是` UploadData `对象的一个数组。

必须使用 `response` 对象调用` callback `。

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function

The `listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any http data is sent.

* `details` Object 
  * `id` Integer
  * `url` String
  * `method` String
  * `webContentsId` Integer (optional)
  * `resourceType` String
  * `timestamp` Double
  * `requestHeaders` Object
* `callback` Function - 回调函数 
  * `response` Object 
    * `cancel` Boolean (optional)
    * `requestHeaders` Object (optional) - When provided, request will be made with these headers.

必须使用 `response` 对象调用` callback `。

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function - 回调函数 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `timestamp` Double
    * `requestHeaders` Object

The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function

The `listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.

* `details` Object 
  * `id` Integer
  * `url` String
  * `method` String
  * `webContentsId` Integer (optional)
  * `resourceType` String
  * `timestamp` Double
  * `statusLine` String
  * `statusCode` Integer
  * `responseHeaders` Object
* `callback` Function - 回调函数 
  * `response` Object 
    * `cancel` Boolean
    * `responseHeaders` Object (optional) - When provided, the server is assumed to have responded with these headers.
    * `statusLine` String (optional) - Should be provided when overriding `responseHeaders` to change header status otherwise original response header's status will be used.

必须使用 `response` 对象调用` callback `。

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean - Indicates whether the response was fetched from disk cache.
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function - 回调函数 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Integer
    * `ip` String (optional) - The server IP address that the request was actually sent to.
    * `fromCache` Boolean
    * `responseHeaders` Object

The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function - 回调函数 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when a request is completed.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function - 回调函数 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `resourceType` String
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - The error description.

The `listener` will be called with `listener(details)` when an error occurs.