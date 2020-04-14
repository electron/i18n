## 类: ClientRequest

> 发起HTTP/HTTPS请求.

进程：[主进程](../glossary.md#main-process)

`ClientRequest`实现了[Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams)接口, 因此是一个[EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)类型.

### `new ClientRequest(options)`

* `options` (Object | String) - If `options` is a String, it is interpreted as the request URL. If it is an object, it is expected to fully specify an HTTP request via the following properties:
  * `method` String (optional) - The HTTP request method. Defaults to the GET method.
  * `url` String (optional) - The request URL. Must be provided in the absolute form with the protocol scheme specified as http or https.
  * `session` Object (optional) - The [`Session`](session.md) instance with which the request is associated.
  * `partition` String (可选) - 与请求相关联的[`partition`](session.md)名称. 默认为空字符串. `session`选项优先于`partition`选项. 因此, 如果`session`是显式指定的, 则`partition`将被忽略.
  * `protocol` String (optional) - The protocol scheme in the form 'scheme:'. Currently supported values are 'http:' or 'https:'. Defaults to 'http:'.
  * `host` String (可选) - 作为连接提供的服务器主机,主机名和端口号'hostname:port'.
  * `hostname` String (可选) - 服务器主机名.
  * `port` Integer (可选) - 服务器侦听的端口号.
  * `path` String (可选) - 请求URL的路径部分.
  * `redirect` String (可选) - 请求的重定向模式. 可选值为 `follow`, `error` 或 `manual`. 默认值为 `follow`. 当模式为`error`时, 重定向将被终止. When mode is `manual` the redirection will be deferred until [`request.followRedirect`](#requestfollowredirect) is invoked. Listen for the [`redirect`](#event-redirect) event in this mode to get more details about the redirect request.

`options` 属性，如 `protocol`, `host`, `hostname`, `port` 和 `path`，在 [URL](https://nodejs.org/api/url.html) 模块中会严格遵循 Node.js 的模式

例如,我们可以创建与github.com相同的请求如下:

```JavaScript
const request = net.request({
  method: 'GET',
  protocol: 'https:',
  hostname: 'github.com',
  port: 443,
  path: '/'
})
```

### 实例事件

#### 事件: 'response'

返回:

* `response` 收到的消息 - 表示HTTP响应消息的对象。

#### 事件: "login"

返回:

* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String
  * `password` String

当身份验证代理请求用户认证时触发

用户证书会调用 `callback`方法:

* `username` String
* `password` String

```JavaScript
request.on('login', (authInfo, callback) => {
  callback('username', 'password')
})
```
提供空的凭证将取消请求，并在响应对象上报告一个身份验证错误:

```JavaScript
request.on('response', (response) => {
  console.log(`STATUS: ${response.statusCode}`);
  response.on('error', (error) => {
    console.log(`ERROR: ${JSON.stringify(error)}`)
  })
})
request.on('login', (authInfo, callback) => {
  callback()
})
```

#### 事件：'finish'

在 `request` 最终的 chunk 数据后写入 `request` 后触发

#### 事件: 'abort'

Emitted when the `request` is aborted. The `abort` event will not be fired if the `request` is already closed.

#### 事件: 'error'

返回:

* `error` Error -提供失败信息的错误对象。

当 `net`网络模块没有发出网络请求时会触发。 通常情况下，当 `request`请求对象发出一个 `error`错误事件时，一个 `close`关闭事件会随之发生，并且不会提供响应对象。

#### 事件： 'close'

作为HTTP 的 request-response 中的最后一个事件发出。 `close`事件表明，在`request`或`response` 对象中不会发出更多的事件。


#### 事件: 'redirect'

返回:

* `statusCode` Integer
* `method` String
* `redirectUrl` String
* `responseHeaders` Object

Emitted when there is redirection and the mode is `manual`. Calling [`request.followRedirect`](#requestfollowredirect) will continue with the redirection.

### 实例属性

#### `request.chunkedEncoding`

一个`Boolean`类型的值，指定请求是否将使用 HTTP 分块传输编码。 默认值为 false. 该属性是可读写的, 但它只能在第一次写入操作之前设置，因为还没有写入 HTTP 头。 在第一写入后如果设置`chunkedEncoding`属性将引发错误。

如果 request 的 body 是一个大的数据时，强烈建议使用块编码。因为数据将以小块的方式进行传输, 而不是在 Electron 进程内存中内部缓冲。

### 实例方法

#### `request.setHeader(name, value)`

* `name` String - 额外的 HTTP 头名称.
* `value` Object - An extra HTTP header value.

添加一个额外的 HTTP 头。 The header name will issued as it is without lowercasing. 它只能在第一次写入之前调用。 在第一次写入后调用此方法将引发错误。 如果传递的值不是 ` String `, 则会调用 ` toString () ` 方法来获取最终值。

#### `request.getHeader(name)`

* `name` String - 指定一个额外的头名称.

Returns `Object` - The value of a previously set extra header name.

#### `request.removeHeader(name)`

* `name` String - 指定一个额外的头名称.

Removes a previously set extra header name. This method can be called only before first write. Trying to call it after the first write will throw an error.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - A chunk of the request body's data. If it is a string, it is converted into a Buffer using the specified encoding.
* `encoding` String (optional) - Used to convert string chunks into Buffer objects. Defaults to 'utf-8'.
* ` callback ` Function (可选)-在写操作结束后调用。

` callback ` 实质上是为了保持与 Node.js API 的相似性而引入的虚拟函数。 在将 ` chunk ` 内容传递到 Chromium 网络层之后, 在下一个 tick 中异步调用。 与 Node.js 实现相反, 不保证 ` chunk ` 内容在调用 ` callback ` 之前已经被刷新。

向请求正文中添加一个数据块。 第一次写操作可能导致在线路上发出请求头。 在第一次写入操作后, 不允许添加或删除自定义标头。

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (可选)
* `encoding` String (可选)
* `callback` Function (可选)

Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish` event is emitted just after the end operation.

#### `request.abort()`

取消正在进行的 HTTP 事务。 如果请求已发出 ` close ` 事件, 则中止操作将不起作用。 否则正在进行的事件将发出 ` abort ` 和 ` close ` 事件。 此外, 如果有一个正在进行的响应对象, 它将发出 ` aborted ` 事件。

#### `request.followRedirect()`

Continues any deferred redirection request when the redirection mode is `manual`.

#### `request.getUploadProgress()`

返回 ` Object `:

* `active` Boolean - Whether the request is currently active. If this is false no other properties will be set
* `started` Boolean - Whether the upload has started. If this is false both `current` and `total` will be set to 0.
* `current` Integer - The number of bytes that have been uploaded so far
* `total` Integer - The number of bytes that will be uploaded this request

You can use this method in conjunction with `POST` requests to get the progress of a file upload or other data transfer.
