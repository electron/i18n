## 类: ClientRequest

> 发起HTTP/HTTPS请求.

进程：[主进程](../glossary.md#main-process)

`ClientRequest`实现了[Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams)接口, 因此是一个[EventEmitter][event-emitter]类型.

### `new ClientRequest(options)`

* `options` (Object | String) - 如果 `options` 是字符串，则将其解释为请求 URL。 如果是对象，它应该通过以下属性完全指定HTTP请求：
  * `method` String (可选) - HTTP 请求方法。 默认为GET方法。
  * `url` String (可选) - 请求URL。 必须以绝对路径形式提供，并将协议指定为http或https。
  * `session` Object (可选) - 与请求相关联的[`Session`](session.md)实例.
  * `partition` String (可选) - 与请求相关联的[`partition`](session.md)名称. 默认为空字符串. `session` 选项取代了 `partition`。 因此, 如果`session`是显式指定的, 则`partition`将被忽略.
  * `credentials` String (可选) - 可以是 `include` 或 `omit`。 是否随此请求发送 [凭据](https://fetch.spec.whatwg.org/#credentials)。 如果设置为 `include`，将使用与请求相关的会话凭据。 如果设置为 `omit`，则不会随请求发送凭据(并且不会在 401响应的事件中触发 `'login'` 事件)。 这与同名的 [fetch](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) 选项的行为相同。 如果未指定此选项，则会发送来自会话的身份验证数据，同时不发送cookie(除非 设置了`useSessionCookies`)。
  * `useSessionCookies` Boolean (可选) - 是否从提供的会话与请求一起发送cookie。 如果指定了 `credentials` ，则此选项没有效果。 默认值为 `false`.
  * `protocol` String (可选) - 可以是 `http:` 或 `https:`。 协议方案的形式为“scheme:”。 默认为 'http:'。
  * `host` String (可选) - 作为连接提供的服务器主机,主机名和端口号'hostname:port'.
  * `hostname` String (可选) - 服务器主机名.
  * `port` Integer (可选) - 服务器侦听的端口号.
  * `path` String (可选) - 请求URL的路径部分.
  * `redirect` String (可选) - 可以是 `follow`， `error` 或 `manual`。 当前请求的重定向模式。 当模式为 `error` 时，任何重定向都会被中止。 当模式为 `manual` 时，重定向会被取消，除非 [`request.followRedirect`](#requestfollowredirect) 在[`redirect`](#event-redirect) 事件期间同步调用。  默认值为 `follow`.
  * `origin` String (可选) - 请求的源 URL。

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

* `response` [收到的消息](incoming-message.md) - 表示HTTP响应消息的对象。

#### 事件: "login"

返回:

* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String (可选)
  * `password` String (可选)

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

在 `request` 被中止时触发。 如果 `request` 已经关闭， `abort` 事件将不会被触发。

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
* `responseHeaders` Record<String, String[]>

当服务器返回重定向响应时触发(例如，301 页面永久性移走)。 调用 [`request.followRirect`](#requestfollowredirect) 将继续重定向。  如果该事件被处理，[`request.followRedirect`](#requestfollowredirect) 必须**同步**调用，否则请求将被取消。

### 实例属性

#### `request.chunkedEncoding`

一个`Boolean`类型的值，指定请求是否将使用 HTTP 分块传输编码。 默认值为 false. 该属性是可读写的, 但它只能在第一次写入操作之前设置，因为还没有写入 HTTP 头。 在第一写入后如果设置`chunkedEncoding`属性将引发错误。

如果 request 的 body 是一个大的数据时，强烈建议使用块编码。因为数据将以小块的方式进行传输, 而不是在 Electron 进程内存中内部缓冲。

### 实例方法

#### `request.setHeader(name, value)`

* `name` String - 额外的 HTTP 头名称.
* `value` String - 额外的 HTTP 头部值。

添加一个额外的 HTTP 头。 头名称将按原样发布，不会转为小写。 它只能在第一次写入之前调用。 在第一次写入后调用此方法将引发错误。 如果传递的值不是 ` String `, 则会调用 ` toString () ` 方法来获取最终值。

某些头部受应用程序设置的限制。 这些头部如下所列。 有关受限头部的更多信息，可以在 [Chromium的头部工具](https://source.chromium.org/chromium/chromium/src/+/master:services/network/public/cpp/header_util.cc;drc=1562cab3f1eda927938f8f4a5a91991fefde66d3;bpv=1;bpt=1;l=22) 中找到。

* `Content-Length`
* `Host`
* `Trailer` 或 `Te`
* `Upgrade`
* `Cookie2`
* `Keep-Alive`
* `Transfer-Encoding`

此外，也不允许将 `Connection` 头部设置为 `upgrade`。

#### `request.getHeader(name)`

* `name` String - 指定一个额外的头名称.

返回 `String` - 以前设置的额外头部名称的值。

#### `request.removeHeader(name)`

* `name` String - 指定一个额外的头名称.

移除先前设置的额外头部名称。 此方法只能在首次写入前调用。 尝试在第一次写入后调用将抛出一个错误。

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - 请求主体的数据块。 如果是字符串，则使用指定的编码将其转换为Buffer。
* `encoding` String (可选) - 用于将字符串块转换为Buffer对象。 默认为“utf-8”。
* ` callback ` Function (可选)-在写操作结束后调用。

` callback ` 实质上是为了保持与 Node.js API 的相似性而引入的虚拟函数。 在将 ` chunk ` 内容传递到 Chromium 网络层之后, 在下一个 tick 中异步调用。 与 Node.js 实现相反, 不保证 ` chunk ` 内容在调用 ` callback ` 之前已经被刷新。

向请求正文中添加一个数据块。 第一次写操作可能导致在线路上发出请求头。 在第一次写入操作后, 不允许添加或删除自定义标头。

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (可选)
* `encoding` String (可选)
* `callback` Function (可选)

发送请求数据的剩下部分。 不允许进行后续的写入或结束操作。 `finish` 事件在结束操作后发出。

#### `request.abort()`

取消正在进行的 HTTP 事务。 如果请求已发出 ` close ` 事件, 则中止操作将不起作用。 否则正在进行的事件将发出 ` abort ` 和 ` close ` 事件。 此外, 如果有一个正在进行的响应对象, 它将发出 ` aborted ` 事件。

#### `request.followRedirect()`

继续任何待处理的重定向。 只能在 `'redirect'` 事件期间调用。

#### `request.getUploadProgress()`

返回 ` Object `:

* `active` Boolean - 请求当前是否处于活动状态。 如果为 false，将不会设置其他属性。
* `started` Boolean - 上传是否已经开始。 如果值为false，`current` 和 `total` 将被设置为 0。
* `current` Integer - 到目前为止已上传的字节数
* `total` Integer - 本次请求总共要上传的字节数

您可以使用此方法获取使用 `POST` 请求的文件上传或其他数据传输的进度

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
