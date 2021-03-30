# protocol

> 注册自定义协议并拦截基于现有协议的请求。

进程：[主进程](../glossary.md#main-process)

实现与 ` file://` 协议具有相同效果的协议的示例:

```javascript
const { app, protocol } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
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

app.whenReady().then(() => {
  const partition = 'persist:example'
  const ses = session.fromPartition(partition)

  ses.protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  })

  mainWindow = new BrowserWindow({ webPreferences: { partition } })
})
```

## 方法

`protocol` 模块具有以下方法：

### `protocol.registerSchemesAsPrivileged(customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)

**注意.** 此方法只能在 `app` 的 `ready` 事件触发前调用，且只能调用一次

Registers the `scheme` as standard, secure, bypasses content security policy for resources, allows registering ServiceWorker, supports fetch API, and streaming video/audio. Specify a privilege with the value of `true` to enable the capability.

An example of registering a privileged scheme, that bypasses Content Security Policy:

```javascript
const { protocol } = require('electron')
protocol.registerSchemesAsPrivileged([
  { scheme: 'foo', privileges: { bypassCSP: true } }
])
```

标准scheme遵循 RFC 3986 所设定的 [URI泛型语法 ](https://tools.ietf.org/html/rfc3986#section-3)。 例如, ` http ` 和 ` https ` 是标准协议, 而 ` file ` 不是。

Registering a scheme as standard allows relative and absolute resources to be resolved correctly when served. 否则, 该协议将表现为 ` file ` 协议, 而且，这种文件协议将不能解析相对路径。

例如, 当您使用自定义协议加载以下内容时，如果你不将其注册为标准scheme, 图片将不会被加载, 因为非标准scheme无法识别相对 路径:

```html
<body>
  <img src='test.png'>
</body>
```

注册一个scheme作为标准scheme将允许其通过[FileSystem 接口][file-system-api]访问文件。 否则, 渲染器将会因为该scheme，而抛出一个安全性错误。

By default web storage apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) are disabled for non standard schemes. So in general if you want to register a custom protocol to replace the `http` protocol, you have to register it as a standard scheme.

Protocols that use streams (http and stream protocols) should set `stream: true`. The `<video>` and `<audio>` HTML elements expect protocols to buffer their responses by default. The `stream` flag configures those elements to correctly expect streaming responses.

### `protocol.registerFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully registered

Registers a protocol of `scheme` that will send a file as the response. The `handler` will be called with `request` and `callback` where `request` is an incoming request for the `scheme`.

要处理 `request`, 应当使用文件的路径或具有 `path` 属性的对象来调用 `callback`。例如:`callback(filePath)`或 `callback({ path: filePath })`. The `filePath` must be an absolute path.

By default the `scheme` is treated like `http:`, which is parsed differently from protocols that follow the "generic URI syntax" like `file:`.

### `protocol.registerBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully registered

注册一个 `scheme` 协议, 将 `Buffer`作为响应发送

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `Buffer` object or an object that has the `data` property.

示例:

```javascript
protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({ mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>') })
})
```

### `protocol.registerStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully registered

注册一个 `scheme` 协议, 将 `String` 作为响应发送

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `String` or an object that has the `data` property.

### `protocol.registerHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` ProtocolResponse

Returns `Boolean` - Whether the protocol was successfully registered

注册一个 `scheme` 协议, 将 HTTP 请求作为响应发送

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with an object that has the `url` property.

### `protocol.registerStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully registered

Registers a protocol of `scheme` that will send a stream as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) object or an object that has the `data` property.

示例:

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
})
```

It is possible to pass any object that implements the readable stream API (emits `data`/`end`/`error` events). For example, here's how a file could be returned:

```javascript
protocol.registerStreamProtocol('atom', (request, callback) => {
  callback(fs.createReadStream('index.html'))
})
```

### `protocol.unregisterProtocol(scheme)`

* `scheme` String

Returns `Boolean` - Whether the protocol was successfully unregistered

取消对自定义`scheme`的注册

### `protocol.isProtocolRegistered(scheme)`

* `scheme` String

Returns `Boolean` - Whether `scheme` is already registered.

### `protocol.interceptFileProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully intercepted

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个file。

### `protocol.interceptStringProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (String | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully intercepted

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个`String`。

### `protocol.interceptBufferProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (Buffer | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully intercepted

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个`Buffer`。

### `protocol.interceptHttpProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` [ProtocolResponse](structures/protocol-response.md)

Returns `Boolean` - Whether the protocol was successfully intercepted

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个新 HTTP 请求。

### `protocol.interceptStreamProtocol(scheme, handler)`

* `scheme` String
* `handler` Function
  * `request` [ProtocolRequest](structures/protocol-request.md)
  * `callback` Function
    * `response` (ReadableStream | [ProtocolResponse](structures/protocol-response.md))

Returns `Boolean` - Whether the protocol was successfully intercepted

它与 ` registerStreamProtocol `方法相同, 不过它是用来替换现有的protocol处理方式。

### `protocol.uninterceptProtocol(scheme)`

* `scheme` String

Returns `Boolean` - Whether the protocol was successfully unintercepted

移除为 ` scheme ` 安装的拦截器，并还原其原始处理方式。

### `protocol.isProtocolIntercepted(scheme)`

* `scheme` String

Returns `Boolean` - Whether `scheme` is already intercepted.

[file-system-api]: https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem
