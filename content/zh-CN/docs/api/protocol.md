# protocol

> 注册自定义协议并拦截基于现有协议的请求。

进程：[主进程](../glossary.md#main-process)

实现与 ` file://` 协议具有相同效果的协议的示例:

```javascript
康斯特 { app, protocol } =需要（"电子"）
通路=需要（'路径'）

应用程序
  > 。 （请求、回调）=> {
    网址=请求。url.substr（7）
    回调（+路径：路径。规范化（"${__dirname}/${url}"）}）
  }）
}）
```

** 注意: **除了指定的方法, 其他方法只能在 ` app ` 模块的 ` ready ` 事件被触发后使用。

## 使用带有自定义 `partition` 或 `session`的 `protocol`

协议注册到特定的电子 [`session`](./session.md) 对象。 如果您没有指定会话，则您的 `protocol` 将应用于 电子使用的默认会话。 但是，如果您在 `browserWindow`的 `webPreferences`上定义 `partition` 或 `session` ，则该窗口将 使用不同的会话，如果您只使用 `electron.protocol.XXX`，则自定义协议将不起作用。

要使自定义协议与自定义会话结合工作，您需要 才能明确地将其注册到该会话。

```javascript
const { session, app, protocol } =要求（"电子"）
const路径=要求（'路径'）

应用程序。当准备（然后）=> {
  const分区="坚持：示例"
  const ses=会话。从分区（分区）

  ses.协议。注册文件程序（"原子"， （请求，回调）=> {
    const url=请求.url.substr（7）
    回调（+路径：路径。规范化（"${__dirname}/${url}"）}）
  }）

  主窗口=新浏览器窗口（{WebPrefers： { partition } }）
}）
```

## 方法

`protocol` 模块具有以下方法：

### `协议。注册化学优先（自定义化学）`

* `customSchemes` [自定义化学[]](structures/custom-scheme.md)

**注意.** 此方法只能在 `app` 的 `ready` 事件触发前调用，且只能调用一次

将 `scheme` 注册为标准、安全、绕过 资源的内容安全策略、允许注册服务人员、支持获取 API 以及流式处理 视频/音频。 指定具有 `true` 值的特权，以启用该功能。

注册特权计划的一个示例，该方案绕过了内容安全 政策：

```javascript
康斯特 { protocol } =要求（"电子"）
协议。注册化学优先（[
  {计划：'foo'，特权： { bypassCSP: true } =
]）
```

标准scheme遵循 RFC 3986 所设定的 [URI泛型语法 ](https://tools.ietf.org/html/rfc3986#section-3)。 例如, ` http ` 和 ` https ` 是标准协议, 而 ` file ` 不是。

将计划注册为标准允许在送达时正确解决相关资源和绝对资源 。 否则, 该协议将表现为 ` file ` 协议, 而且，这种文件协议将不能解析相对路径。

例如, 当您使用自定义协议加载以下内容时，如果你不将其注册为标准scheme, 图片将不会被加载, 因为非标准scheme无法识别相对 路径:

```html
<body>
  <img src='test.png'>
</body>
```

注册一个scheme作为标准scheme将允许其通过[FileSystem 接口][file-system-api]访问文件。 否则, 渲染器将会因为该scheme，而抛出一个安全性错误。

默认情况下，Web 存储 apis（本地存储、会话存储、WebSQL、索引数据库、 cookie）因非标准计划而禁用。 因此，一般来说，如果你想 注册一个自定义协议，以取代 `http` 协议，你必须注册 它作为一个标准方案。

使用流（http和流协议）的协议应设置 `stream: true`。 `<video>` 和 `<audio>` HTML 元素预计协议在默认情况下会缓冲其 响应。 `stream` 标记配置这些元素，以正确 预期流响应。

### `协议。注册文件（方案、处理程序）`

* `scheme` String
* `handler` 功能
  * `request` [协议要求](structures/protocol-request.md)
  * `callback` Function
    * `response` （字符串| [协议回应](structures/protocol-response.md)）

退货 `Boolean` - 协议是否成功注册

注册一份 `scheme` 协议，该协议将发送一个文件作为响应。 `handler` 将与 `request` 和 `callback` `scheme`的来电请求 `request` 。

要处理 `request`, 应当使用文件的路径或具有 `path` 属性的对象来调用 `callback`。例如:`callback(filePath)`或 `callback({ path: filePath })`. `filePath` 必须是一条绝对的道路。

默认情况下， `scheme` 被当作 `http:`来对待，它与遵循"通用URI语法"的协议（如 `file:`） 解析方式不同。

### `协议。注册布弗普罗托科尔（方案，处理程序）`

* `scheme` String
* `handler` 功能
  * `request` [协议要求](structures/protocol-request.md)
  * `callback` Function
    * `response` （缓冲| [协议回应](structures/protocol-response.md)）

退货 `Boolean` - 协议是否成功注册

注册一个 `scheme` 协议, 将 `Buffer`作为响应发送

`registerFileProtocol`的用法相同，只是 `callback` 应使用 `Buffer` 对象或具有 `data` 属性的对象调用。

示例:

```javascript
协议。注册BufferProtocol（'原子'，（请求，回调）=> {
  回调（{哑剧类型：'文本/html'，数据：缓冲区。来自（'<h5>响应</h5>）}）
}）
```

### `协议。注册斯特林普罗托科尔（方案，处理程序）`

* `scheme` String
* `handler` 功能
  * `request` [协议要求](structures/protocol-request.md)
  * `callback` Function
    * `response` （字符串| [协议回应](structures/protocol-response.md)）

退货 `Boolean` - 协议是否成功注册

注册一个 `scheme` 协议, 将 `String` 作为响应发送

`registerFileProtocol`的用法相同，只是 `callback` 应使用 `String` 或具有 `data` 属性的对象调用。

### `协议。注册普罗托科尔（方案，处理程序）`

* `scheme` String
* `handler` 功能
  * `request` [协议要求](structures/protocol-request.md)
  * `callback` Function
    * `response` 协议响应

退货 `Boolean` - 协议是否成功注册

注册一个 `scheme` 协议, 将 HTTP 请求作为响应发送

`registerFileProtocol`的用法相同，但 `callback` 应使用具有 `url` 属性的对象调用。

### `协议。注册流普罗托科尔（方案，处理程序）`

* `scheme` String
* `handler` 功能
  * `request` [协议要求](structures/protocol-request.md)
  * `callback` Function
    * `response` （可读流| [协议回应](structures/protocol-response.md)）

退货 `Boolean` - 协议是否成功注册

注册 `scheme` 协议，该协议将发送流作为响应。

`registerFileProtocol`的用法相同，只是 `callback` 应使用 [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) 对象或 具有 `data` 属性的对象调用。

示例:

```javascript
康斯特 { protocol } =要求（'电子'）
const { PassThrough } =需要（'流'）

功能创建流（文本）{
  const rv=新的通路（）//通过是 也是可读流
  rv.推（文本）
  rv.推（空）
  返回rv
=

协议。 回调）=> {
  回拨（{
    状态代码：200，
    标题：{
      "内容类型"："文本/html"
    }，
    数据：创建Stream（"<h5>响应</h5>"）
  }）
}）
```

可以通过任何实现可读流API（发出 `data`/`end`/`error` 事件）的对象。 例如，如何返回文件：

```javascript
协议。注册流蛋白（'原子'，（请求，回调）=> {
  回调（fs.创建阅读流（'索引.html'）
}）
```

### `protocol.unregisterProtocol(scheme)`

* `scheme` String

返回 `Boolean` - 协议是否成功未注册

取消对自定义`scheme`的注册

### `protocol.isProtocolRegistered(scheme)`

* `scheme` String

退货 `Boolean` - 是否已注册 `scheme` 。

### `协议。拦截文件（方案、处理程序）`

* `scheme` String
* `handler` 功能
  * `request` [协议要求](structures/protocol-request.md)
  * `callback` Function
    * `response` （字符串| [协议回应](structures/protocol-response.md)）

返回 `Boolean` - 协议是否被成功截获

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个file。

### `协议。拦截串普罗托科尔（方案，处理程序）`

* `scheme` String
* `handler` 功能
  * `request` [协议要求](structures/protocol-request.md)
  * `callback` Function
    * `response` （字符串| [协议回应](structures/protocol-response.md)）

返回 `Boolean` - 协议是否被成功截获

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个`String`。

### `协议.拦截布弗普罗托科尔（方案，处理程序）`

* `scheme` String
* `handler` 功能
  * `request` [协议要求](structures/protocol-request.md)
  * `callback` Function
    * `response` （缓冲| [协议回应](structures/protocol-response.md)）

返回 `Boolean` - 协议是否被成功截获

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个`Buffer`。

### `协议。拦截普罗托科尔（方案，处理程序）`

* `scheme` String
* `handler` 功能
  * `request` [协议要求](structures/protocol-request.md)
  * `callback` Function
    * `response` [协议响应](structures/protocol-response.md)

返回 `Boolean` - 协议是否被成功截获

终止 ` scheme ` 协议, 并将 ` handler ` 作为该protocol新的处理方式，即返回一个新 HTTP 请求。

### `协议。拦截流普罗托科尔（方案，处理程序）`

* `scheme` String
* `handler` 功能
  * `request` [协议要求](structures/protocol-request.md)
  * `callback` Function
    * `response` （可读流| [协议回应](structures/protocol-response.md)）

返回 `Boolean` - 协议是否被成功截获

它与 ` registerStreamProtocol `方法相同, 不过它是用来替换现有的protocol处理方式。

### `protocol.uninterceptProtocol(scheme)`

* `scheme` String

返回 `Boolean` - 协议是否成功不干预

移除为 ` scheme ` 安装的拦截器，并还原其原始处理方式。

### `protocol.isProtocolIntercepted(scheme)`

* `scheme` String

返回 `Boolean` - 是否已截获 `scheme` 。

[file-system-api]: https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem
