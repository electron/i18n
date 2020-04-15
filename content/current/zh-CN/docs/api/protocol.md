# protocol

> 注册自定义协议并拦截基于现有协议的请求。

进程：[主进程](../glossary.md#main-process)

实现与 ` file://` 协议具有相同效果的协议的示例:

```javascript
const { app, protocol } = require('electron')
const path = require('path')

app.on('ready', () => {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })
})
```

** 注意: **除了指定的方法, 其他方法只能在 ` app ` 模块的 ` ready ` 事件被触发后使用。

## Using `protocol` with a custom `partition` or `session`

A protocol is registered to a specific Electron [`session`](./session.md) object. If you don't specify a session, then your `protocol` will be applied to the default session that Electron uses. However, if you define a `partition` or `session` on your `browserWindow`'s `webPreferences`, then that window will use a different session and your custom protocol will not work if you just use `electron.protocol.XXX`.

To have your custom protocol work in combination with a custom session, you need to register it to that session explicitly.

```javascript
const { session, app, protocol } = require('electron')
const path = require('path')

app.on('ready', () => {
  const partition = 'persist:example'
  const ses = session.fromPartition(partition)

  ses.protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      partition: partition
    }
  })
})
```

## 方法

`protocol` 模块具有以下方法：

### `protocol.registerSchemesAsPrivileged(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)


**注意.** 此方法只能在 `app` 的 `ready` 事件触发前调用，且只能调用一次

Registers the `scheme` as standard, secure, bypasses content security policy for resources, allows registering ServiceWorker and supports fetch API.

Specify a privilege with the value of `true` to enable the capability. An example of registering a privileged scheme, with bypassing Content Security Policy:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privileges: { bypassCSP: true } }
])
```

标准scheme遵循 RFC 3986 所设定的 [URI泛型语法 ](https://tools.ietf.org/html/rfc3986#section-3)。 例如, ` http ` 和 ` https ` 是标准协议, 而 ` file ` 不是。

将一个scheme注册为标准scheme, 将保证相对和绝对资源在使用时能够得到正确的解析。 否则, 该协议将表现为 ` file ` 协议, 而且，这种文件协议将不能解析相对路径。

例如, 当您使用自定义协议加载以下内容时，如果你不将其注册为标准scheme, 图片将不会被加载, 因为非标准scheme无法识别相对 路径:

```html
<body>
  <img src='test.png'>
</body>
```

注册一个scheme作为标准scheme将允许其通过[FileSystem 接口](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem)访问文件。 否则, 渲染器将会因为该scheme，而抛出一个安全性错误。

默认情况下web storage apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) 被禁止访问非标准schemes。 So in general if you want to register a custom protocol to replace the `http` protocol, you have to register it as a standard scheme.

`protocol.registerSchemesAsPrivileged` can be used to replicate the functionality of the previous `protocol.registerStandardSchemes`, `webFrame.registerURLSchemeAs*` and `protocol.registerServiceWorkerSchemes` functions that existed prior to Electron 5.0.0, for example:

**before (<= v4.x)**
```javascript
// Main
protocol.registerStandardSchemes(['scheme1', 'scheme2'], { secure: true })
// Renderer
webFrame.registerURLSchemeAsPrivileged('scheme1', { secure: true })
webFrame.registerURLSchemeAsPrivileged('scheme2', { secure: true })
```

**after (>= v5.x)**
```javascript
protocol.registerSchemesAsPrivileged([
  { scheme: 'scheme1', privileges: { standard: true, secure: true } },
  { scheme: 'scheme2', privileges: { standard: true, secure: true } }
])
```

### `protocol.registerFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `filePath` String | [FilePathWithHeaders](structures/file-path-with-headers.md) (optional)
* `completion` Function (optional)
  * `error` Error

注册一个 `scheme` 协议, 将该文件作为响应发送 当要使用 `scheme` 创建 `request` 时, 将使用 `handler(request, callback)` 来调用 `handler` 。 `completion` 将在 `scheme` 注册成功时通过`completion(null)` 调用，失败时通过`completion(error)` 调用。

要处理 `request`, 应当使用文件的路径或具有 `path` 属性的对象来调用 `callback`。例如:`callback(filePath)`或 `callback({ path: filePath })`. The object may also have a `headers` property which gives a map of headers to values for the response headers, e.g. `callback({ path: filePath, headers: {"Content-Security-Policy": "default-src 'none'"]})`.

当 `callback` 被调用后，并且没有带着数字或 `error` 属性的对象时, `request`将会失败, 并且带有你指定的 `error`错误号。 更多的错误号信息，您可以查阅[网络错误列表](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

By default the `scheme` is treated like `http:`, which is parsed differently than protocols that follow the "generic URI syntax" like `file:`.

### `protocol.registerBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (可选)
* `completion` Function (optional)
  * `error` Error

注册一个 `scheme` 协议, 将 `Buffer`作为响应发送

该用法与 `registerFileProtocol` 相同, 只是`callback` 会被`Buffer`对象或者带有`data`，`mimeType`和 `charset`属性的对象调用。

示例：

```javascript
const { protocol } = require('electron')

protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({ mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>') })
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.registerStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `data` (String | [StringProtocolResponse](structures/string-protocol-response.md)) (optional)
* `completion` Function (optional)
  * `error` Error

注册一个 `scheme` 协议, 将 `String` 作为响应发送

该用法与 ` registerFileProtocol ` 相同, 只是`callback` 会被`String`对象或者带有`data`，`mimeType`和 `charset`属性的对象调用。

### `protocol.registerHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `redirectRequest` Object
      * `url` String
      * `method` String (optional)
      * `session` Session | null (optional)
      * `uploadData` [ProtocolResponseUploadData](structures/protocol-response-upload-data.md) (optional)
* `completion` Function (optional)
  * `error` Error

注册一个 `scheme` 协议, 将 HTTP 请求作为响应发送

该用法与 `registerFileProtocol` 相同, 只是`callback` 会被` redirectRequest `对象或者带有`url`, `method`, `referrer`, `uploadData` 和 `session` 属性的对象调用。

By default the HTTP request will reuse the current session. If you want the request to have a different session you should set `session` to `null`.

对于 POST 请求, 必须提供 ` uploadData ` 对象。

### `protocol.registerStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (可选)
* `completion` Function (optional)
  * `error` Error

注册一个 `scheme` 协议, 将 ` Readable `作为响应发送

该用法类似于 `register{Any}Protocol` ，只是`callback` 会被` Readable `对象或者带有`data`, `statusCode` 和 `headers` 属性的对象调用。

示例：

```javascript
const { protocol } = require('electron')
const { PassThrough } = require('stream')

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

It is possible to pass any object that implements the readable stream API (emits `data`/`end`/`error` events). For example, here's how a file could be returned:

```javascript
const { protocol } = require('electron')
const fs = require('fs')

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs.createReadStream('index.html'))
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

### `protocol.unregisterProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (optional)
  * `error` Error

取消对自定义`scheme`的注册

### `protocol.isProtocolHandled(scheme)`

* `scheme` String

Returns `Promise<Boolean>` - fulfilled with a boolean that indicates whether there is already a handler for `scheme`.

### `protocol.interceptFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `filePath` String
* `completion` Function (optional)
  * `error` Error

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个file。

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `data` (String | [StringProtocolResponse](structures/string-protocol-response.md)) (optional)
* `completion` Function (optional)
  * `error` Error

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个`String`。

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `buffer` Buffer (可选)
* `completion` Function (optional)
  * `error` Error

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个`Buffer`。

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `redirectRequest` Object
      * `url` String
      * `method` String (optional)
      * `session` Session | null (optional)
      * `uploadData` [ProtocolResponseUploadData](structures/protocol-response-upload-data.md) (optional)
* `completion` Function (optional)
  * `error` Error

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个新 HTTP 请求。

### `protocol.interceptStreamProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
  * `request` Object
    * `url` String
    * `headers` Record<String, String>
    * `referrer` String
    * `method` String
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (可选)
* `completion` Function (optional)
  * `error` Error

它与 ` registerStreamProtocol `方法相同, 不过它是用来替换现有的protocol处理方式。

### `protocol.uninterceptProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (optional)
  * `error` Error

移除为 ` scheme ` 安装的拦截器，并还原其原始处理方式。
