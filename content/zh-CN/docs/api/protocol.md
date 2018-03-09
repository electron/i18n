# protocol

> 注册自定义协议并拦截基于现有协议的请求。

线程：[主线程](../glossary.md#main-process)

实现与 ` file://` 协议具有相同效果的协议的示例:

```javascript
const {app, protocol} = require('electron')
const path = require('path')

app.on('ready', () => {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({path: path.normalize(`${__dirname}/${url}`)})
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })
})
```

** 注意: **除了指定的方法, 其他方法只能在 ` app ` 模块的 ` ready ` 事件被触发后使用。

## 方法

`protocol` 模块具有以下方法：

### `protocol.registerStandardSchemes(schemes[, options])`

* `schemes` String[] - 注册 schemes 为标准schemes。
* `选项` Object (可选) 
  * `secure` Boolean (可选) - `true` 注册scheme为安全scheme。 默认 `false`.

标准方案遵循 RFC 3986 所调用的 [ generic URI syntax ](https://tools.ietf.org/html/rfc3986#section-3)。 For example `http` and `https` are standard schemes, while `file` is not.

Registering a scheme as standard, will allow relative and absolute resources to be resolved correctly when served. Otherwise the scheme will behave like the `file` protocol, but without the ability to resolve relative URLs.

For example when you load following page with custom protocol without registering it as standard scheme, the image will not be loaded because non-standard schemes can not recognize relative URLs:

```html
<body>
  <img src='test.png'>
</body>
```

注册一个scheme作为标准scheme将允许其访问文件通过[FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem)。 Otherwise the renderer will throw a security error for the scheme.

默认情况下web storage apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) 被禁止访问非标准schemes。 所以一般来说如果你想注册一个 自定义协议来替换`http`协议，您必须将其注册为标准scheme：

```javascript
const {app, protocol} = require('electron')

protocol.registerStandardSchemes(['atom'])
app.on('ready', () => {
  protocol.registerHttpProtocol('atom', '...')
})
```

**Note:** This method can only be used before the `ready` event of the `app` module gets emitted.

### `protocol.registerServiceWorkerSchemes(schemes)`

* `schemes` String[] - Custom schemes to be registered to handle service workers.

### `protocol.registerFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function - 回调函数 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `filePath` String (optional)
* `completion` Function (可选) 
  * `error` Error

Registers a protocol of `scheme` that will send the file as a response. The `handler` will be called with `handler(request, callback)` when a `request` is going to be created with `scheme`. `completion` will be called with `completion(null)` when `scheme` is successfully registered or `completion(error)` when failed.

To handle the `request`, the `callback` should be called with either the file's path or an object that has a `path` property, e.g. `callback(filePath)` or `callback({path: filePath})`.

When `callback` is called with nothing, a number, or an object that has an `error` property, the `request` will fail with the `error` number you specified. For the available error numbers you can use, please see the [net error list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

By default the `scheme` is treated like `http:`, which is parsed differently than protocols that follow the "generic URI syntax" like `file:`, so you probably want to call `protocol.registerStandardSchemes` to have your scheme treated as a standard scheme.

### `protocol.registerBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (optional)
* `completion` Function (可选) 
  * `error` Error

Registers a protocol of `scheme` that will send a `Buffer` as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `Buffer` object or an object that has the `data`, `mimeType`, and `charset` properties.

例子:

```javascript
const {protocol} = require('electron')

protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>')})
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.registerStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `data` String (optional)
* `completion` Function (可选) 
  * `error` Error

Registers a protocol of `scheme` that will send a `String` as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `String` or an object that has the `data`, `mimeType`, and `charset` properties.

### `protocol.registerHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `redirectRequest` Object 
      * `url` String
      * `method` String
      * `session` Object (optional)
      * `uploadData` Object (可选) 
        * `contentType` String - MIME type of the content.
        * `data` String - Content to be sent.
* `completion` Function (可选) 
  * `error` Error

Registers a protocol of `scheme` that will send an HTTP request as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with a `redirectRequest` object that has the `url`, `method`, `referrer`, `uploadData` and `session` properties.

By default the HTTP request will reuse the current session. If you want the request to have a different session you should set `session` to `null`.

For POST requests the `uploadData` object must be provided.

### `protocol.registerStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `headers` Object
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
* `completion` Function (可选) 
  * `error` Error

Registers a protocol of `scheme` that will send a `Readable` as a response.

The usage is similar to the other `register{Any}Protocol`, except that the `callback` should be called with either a `Readable` object or an object that has the `data`, `statusCode`, and `headers` properties.

例子:

```javascript
const {protocol} = require('electron')
const {PassThrough} = require('stream')

function createStream (text) {
  const rv = new PassThrough()  // PassThrough is also a Readable stream
  rv.push(text)
  rv.push(null)
  return rv
}

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback({
    statusCode: 200,
    headers: {
      'content-type': 'text/html'
    },
    data: createStream('<h5>Response</h5>')
  })
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

It is possible to pass any object that implements the readable stream API (emits `data`/`end`/`error` events). For example, here's how a file could be returned:

```javascript
const {protocol} = require('electron')
const fs = require('fs')

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs.createReadStream('index.html'))
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.unregisterProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (可选) 
  * `error` Error

Unregisters the custom protocol of `scheme`.

### `protocol.isProtocolHandled(scheme, callback)`

* `scheme` String
* `callback` Function - 回调函数 
  * `error` Error

The `callback` will be called with a boolean that indicates whether there is already a handler for `scheme`.

### `protocol.interceptFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `filePath` String
* `completion` Function (可选) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a file as a response.

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `data` String (optional)
* `completion` Function (可选) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `String` as a response.

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `buffer` Buffer (optional)
* `completion` Function (可选) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response.

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `redirectRequest` Object 
      * `url` String
      * `method` String
      * `session` Object (optional)
      * `uploadData` Object (可选) 
        * `contentType` String - MIME type of the content.
        * `data` String - Content to be sent.
* `completion` Function (可选) 
  * `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a new HTTP request as a response.

### `protocol.interceptStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function 
  * `request` Object 
    * `url` String
    * `headers` Object
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
* `completion` Function (可选) 
  * `error` Error

Same as `protocol.registerStreamProtocol`, except that it replaces an existing protocol handler.

### `protocol.uninterceptProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (可选) 
  * `error` Error

Remove the interceptor installed for `scheme` and restore its original handler.