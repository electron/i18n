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

标准scheme遵循 RFC 3986 所设定的 [URI泛型语法 ](https://tools.ietf.org/html/rfc3986#section-3)。 例如, ` http ` 和 ` https ` 是标准协议, 而 ` file ` 不是。

将一个scheme注册为标准scheme, 将保证相对和绝对资源在使用时能够得到正确的解析。 否则, 该协议将表现为 ` file ` 协议, 而且，这种文件协议将不能解析相对路径。

例如, 当您使用自定义协议加载以下内容时，如果你不将其注册为标准scheme, 图片将不会被加载, 因为非标准scheme无法识别相对 路径:

```html
<body>
  <img src='test.png'>
</body>
```

注册一个scheme作为标准scheme将允许其通过[FileSystem 接口](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem)访问文件。 否则, 渲染器将会因为该scheme，而抛出一个安全性错误。

默认情况下web storage apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) 被禁止访问非标准schemes。 所以一般来说如果你想注册一个 自定义协议来替换`http`协议，您必须将其注册为标准scheme：

```javascript
const {app, protocol} = require('electron')

protocol.registerStandardSchemes(['atom'])
app.on('ready', () => {
  protocol.registerHttpProtocol('atom', '...')
})
```

** 注意: **此方法只能在 ` app ` 模块的 ` ready ` 事件被发出之前使用。

### `protocol.registerServiceWorkerSchemes(schemes)`

* `schemes` String[] - 将自定义 schemes注册为处理线程服务的标准schemes。

### `protocol.registerFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function - 回调函数 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `filePath` String (可选)
* `completion` Function (可选) 
  * `error` Error

注册一个 `scheme` 协议, 将该文件作为响应发送 当要使用 `scheme` 创建 `request` 时, 将使用 `handler(request, callback)` 来调用 `handler` 。 `completion` 将在 `scheme` 注册成功时通过`completion(null)` 调用，失败时通过`completion(error)` 调用。

要处理 `request`, 应当使用文件的路径或具有 `path` 属性的对象来调用 `callback`。例如:`callback(filePath)`或 `callback({path: filePath})`.

当 `callback` 被调用后，并且没有带着数字或 `error` 属性的对象时, `request`将会失败, 并且带有你指定的 `error`错误号。 更多的错误号信息，您可以查阅[网络错误列表](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

默认情况下, `scheme` 与 `http:`,类似, 它的分析方式不同于遵循 "generic URI syntax" 的协议(例如 `file:`), 所以您可能需要调用`protocol.registerStandardSchemes` 以使您的方案作为标准方案处理。

### `protocol.registerBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function - 回调函数 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (可选)
* `completion` Function (可选) 
  * `error` Error

注册一个 `scheme` 协议, 将 `Buffer`作为响应发送

该用法与 `registerFileProtocol` 相同, 只是`callback` 会被`Buffer`对象或者带有`data`，`mimeType`和 `charset`属性的对象调用。

示例:

```javascript
const {protocol} = require('electron')

protocol.registerBufferProtocol('atom', () => {
  globalSuffer.from('Response') () => {
    console.error('Failed is pressed')
  })
})
```

### `protocol.registerStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function - 回调函数 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `data` String (可选)
* `completion` Function (可选) 
  * `error` Error

注册一个 `scheme` 协议, 将 `String` 作为响应发送

该用法与 ` registerFileProtocol ` 相同, 只是`callback` 会被`String`对象或者带有`data`，`mimeType`和 `charset`属性的对象调用。

### `protocol.registerHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function - 回调函数 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `redirectRequest` Object 
      * `url` String
      * `method` String
      * `session` Object (可选)
      * `uploadData` Object (可选) 
        * `contentType` String - 内容的MIME类型。
        * `data` String - 发送内容。
* `completion` Function (可选) 
  * `error` Error

注册一个 `scheme` 协议, 将 HTTP 请求作为响应发送

该用法与 `registerFileProtocol` 相同, 只是`callback` 会被` redirectRequest `对象或者带有`url`, `method`, `referrer`, `uploadData` 和 `session` 属性的对象调用。

默认情况下, HTTP 请求会重复使用当前的 session。如果希望请求具有不同的session, 则应将 `session`设置为 `null`.

对于 POST 请求, 必须提供 ` uploadData ` 对象。

### `protocol.registerStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function - 回调函数 
  * `request` Object 
    * `url` String
    * `headers` Object
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (可选)
* `completion` Function (可选) 
  * `error` Error

注册一个 `scheme` 协议, 将 ` Readable `作为响应发送

该用法类似于 `register{Any}Protocol` ，只是`callback` 会被` Readable `对象或者带有`data`, `statusCode` 和 `headers` 属性的对象调用。

示例:

```javascript
const {protocol} = require('electron')
const {PassThrough} = require('stream')

function createStream (text) {
  const rv = new PassThrough() // PassThrough is also a Readable stream
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

可以传递任何可读取流 API 的对象(`data`/`end`/`error` 事件)。以下是如何返回文件的方法示例:

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

取消对自定义`scheme`的注册

### `protocol.isProtocolHandled(scheme, callback)`

* `scheme` String
* `callback` Function - 回调函数 
  * `error` Error

`callback` 会被调用，带有布尔值，表示是否已经有`scheme` 的处理程序。

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

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个file。

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function - 回调函数 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function 
    * `data` String (可选)
* `completion` Function (可选) 
  * `error` Error

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个`String`。

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function - 回调函数 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `buffer` Buffer (可选)
* `completion` Function (可选) 
  * `error` Error

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个`Buffer`。

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function - 回调函数 
  * `request` Object 
    * `url` String
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * `redirectRequest` Object 
      * `url` String
      * `method` String
      * `session` Object (可选)
      * `uploadData` Object (可选) 
        * `contentType` String - 内容的MIME类型。
        * `data` String - 发送内容。
* `completion` Function (可选) 
  * `error` Error

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个新 HTTP 请求。

### `protocol.interceptStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function - 回调函数 
  * `request` Object 
    * `url` String
    * `headers` Object
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function - 回调函数 
    * ` stream `(ReadableStream |[ StreamProtocolResponse ](structures/stream-protocol-response.md)) (可选)
* `completion` Function (可选) 
  * `error` Error

它与 ` registerStreamProtocol `方法相同, 不过它是用来替换现有的protocol处理方式。

### `protocol.uninterceptProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (可选) 
  * `error` Error

移除为 ` scheme ` 安装的拦截器，并还原其原始处理方式。