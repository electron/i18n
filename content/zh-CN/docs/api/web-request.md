## 类：WebRequest

> 在一个请求生命周期的不同阶段，截取和修改其内容。

线程：[主线程](../glossary.md#main-process)

使用 ` Session ` 的 ` WebRequest ` 属性访问 ` WebRequest ` 类的实例。

` WebRequest ` 的方法接受可选的 `filter ` 和 ` listener `。 当 API 的事件发生时, 将使用 ` listener(details) ` 来调用 ` listener`。 `详细信息`对象描述了请求。

⚠️ 仅最后一个附加的 `listener` 将被使用。对 `listener` 传递 `null` 将会取消监听该事件。

` filter ` 对象具有一个 ` url ` 属性, 它是一个 url 模式数组, 用于筛选出与 url 模式不匹配的请求。 如果省略 ` filter `, 则所有请求都将匹配。

对于某些事件, ` listener ` 是通过 ` callback` 传递的, 当 `listener ` 完成其工作时, 应使用 ` response ` 对象进行调用。

为 requests 添加 `User-Agent` 头的示例：

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

### 实例方法

以下事件会在` Session `实例触发。

#### `webRequest.onBeforeRequest([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。</code></code>
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (可选)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `response` Object 
      * `cancel` Boolean (可选)
      * `redirectURL` String (可选) - 原始请求被阻止发送或完成，而不是重定向到给定的URL。

当请求即将发生时，调用`listener(details, callback)`。

`uploadData` 是` UploadData `对象的一个数组。

必须使用 `response` 对象调用` callback `。

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

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。</code></code>
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (可选)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `requestHeaders` Record<string, string>
  * `callback` Function 
    * `beforeSendResponse` Object 
      * `cancel` Boolean (可选)
      * `requestHeaders` Record<string, string | string[]> (optional) - When provided, request will be made with these headers.

一旦请求头可用，在发送 HTTP 请求之前，`listener` 将以 `listener(details, callback)` 的形式被调用。 这可能发生在对服务器进行 TCP 连接之后，但在发送任何HTTP数据之前。

The `callback` has to be called with a `response` object.

#### `webRequest.onSendHeaders([filter, ]listener)`

* `过滤` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。</code></code>
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (可选)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `requestHeaders` Record<string, string>

在请求发送到服务器之前，`listener`将以`listener(details)`的形式被调用，在该侦听器被出发前，上一个对 `onBeforeSendHeaders` 响应的修改是可见的。

#### `webRequest.onHeadersReceived([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。</code></code>
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (可选)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `statusLine` String
    * `statusCode` Integer
    * `responseHeaders` Record<string, string> (optional)
  * `callback` Function - 回调函数 
    * `headersReceivedResponse` Object 
      * `cancel` Boolean (可选)
      * `responseHeaders` Record<string, string | string[]> (optional) - When provided, the server is assumed to have responded with these headers.
      * `statusLine` String (optional) - Should be provided when overriding `responseHeaders` to change header status otherwise original response header's status will be used.

当HTTP请求接收到报头后，会通过调用 `listener(details, callback)`方法来触发`listener`。

The `callback` has to be called with a `response` object.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。</code></code>
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (可选)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` Record<string, string> (optional)
    * `fromCache` Boolean - 表明响应是取自硬盘缓存。
    * `statusCode` Integer
    * `statusLine` String

当收到响应体的第一个字节时， 将以 ` listener(details) ` 的形式来调用 ` listener`。 对于 HTTP 请求而言，这意味着此时 HTTP 状态行和回应头已经可以读取了。

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。</code></code>
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (可选)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `redirectURL` String
    * `statusCode` Integer
    * `statusLine` String
    * `ip` String (可选) - 请求实际发送到的服务器 IP 地址。
    * `fromCache` Boolean
    * `responseHeaders` Record<string, string> (optional)

当服务器的初始重定向即将发生时，将以 `listener(details)`的方式调用`listener`。

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。</code></code>
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (可选)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `responseHeaders` Record<string, string> (optional)
    * `fromCache` Boolean
    * `statusCode` Integer
    * `statusLine` String

当请求完成时，将以 `listener(details)`的方式调用`listener`。

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Object (可选) 
  * `urls` String[] - URL 模式的数组，用来过滤与URL模式不匹配的请求。</code></code>
* `listener` Function | null 
  * `details` Object 
    * `id` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (可选)
    * `resourceType` String
    * `referrer` String
    * `timestamp` Double
    * `fromCache` Boolean
    * `error` String - 错误描述.

当发生错误时，将以 `listener(details)`的方式调用`listener`。