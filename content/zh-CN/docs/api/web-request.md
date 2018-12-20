## 类：WebRequest

> 在一个请求生命周期的不同阶段，截取和修改其内容。

线程：[主线程](../glossary.md#main-process)

使用 ` Session ` 的 ` WebRequest ` 属性访问 ` WebRequest ` 类的实例。

` WebRequest ` 的方法接受可选的 `filter ` 和 ` listener `。 当 API 的事件发生时, 将使用 ` listener(details) ` 来调用 ` listener`。 ` 详细details ` 对象描述了该请求。

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

### 实例方法

The following methods are available on instances of `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。
* `listener` Function - 回调函数 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (可选)
    * `resourceType` String
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `response` Object 
      * `cancel` Boolean (可选)
      * `redirectURL` String (可选) - 原始请求被阻止发送或完成，而不是重定向到给定的URL。

The `listener` will be called with `listener(details, callback)` when a request is about to occur.

The `uploadData` is an array of `UploadData` objects.

The `callback` has to be called with an `response` object.

#### `webRequest.onBeforeSendHeaders([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。
* `listener` Function

The `listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any http data is sent.

* `details` Object 
  * `id` Integer
  * `url` String
  * `method` String
  * `webContentsId` Integer (可选)
  * `resourceType` String
  * `timestamp` Double
  * `requestHeaders` Object
* `callback` Function - 回调函数 
  * `response` Object 
    * `cancel` Boolean (可选)
    * `requestHeaders` Object (可选) - 当提供时，将使用这些报头进行请求。

The `callback` has to be called with an `response` object.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。
* `listener` Function - 回调函数 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (可选)
    * `resourceType` String
    * `timestamp` Double
    * `requestHeaders` Object

The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。
* `listener` Function

The `listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.

* `details` Object 
  * `id` Integer
  * `url` String
  * `method` String
  * `webContentsId` Integer (可选)
  * `resourceType` String
  * `timestamp` Double
  * `statusLine` String
  * `statusCode` Integer
  * `responseHeaders` Object
* `callback` Function - 回调函数 
  * `response` Object 
    * `cancel` Boolean
    * ` responseHeaders ` Object (可选) - 当提供时，将使用这些报头处理返回。
    * `statusLine` String (optional) - Should be provided when overriding `responseHeaders` to change header status otherwise original response header's status will be used.

The `callback` has to be called with an `response` object.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。
* `listener` Function 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (可选)
    * `resourceType` String
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean - 表明响应是取自硬盘缓存。
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。
* `listener` Function - 回调函数 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (可选)
    * `resourceType` String
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Integer
    * `ip` String (可选) - 请求实际发送到的服务器 IP 地址。
    * `fromCache` Boolean
    * `responseHeaders` Object

The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。
* `listener` Function - 回调函数 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (可选)
    * `resourceType` String
    * `timestamp` Double
    * `responseHeaders` Object
    * `fromCache` Boolean
    * `statusCode` Integer
    * `statusLine` String

The `listener` will be called with `listener(details)` when a request is completed.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。
* `listener` Function - 回调函数 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * ` webContentsId ` Integer (可选)
    * `resourceType` String
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - 错误描述.

The `listener` will be called with `listener(details)` when an error occurs.