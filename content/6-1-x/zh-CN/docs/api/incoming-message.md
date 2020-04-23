## 类：IncomingMessage

> 处理 HTTP/HTTPS 请求的响应。

进程：[主进程](../glossary.md#main-process)

`ClientRequest`实现了[Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams)接口, 因此是一个[EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)类型.

### 事件

#### Event: 'data'

返回:

* `chunk` 缓冲区: 响应体数据块。

`data`事件是将响应数据转换为应用程序代码的常用方法。

#### Event: 'end'

指示响应正文已结束。

#### Event: 'aborted'

正在进行的 HTTP 事务被取消后触发。

#### Event: 'error'

返回:

`error` 通常保存一个错误字符串，识别失败的根本原因。

当流响应数据事件遇到错误时发出。 例如, 如果服务器在响应仍在流时关闭基础, 则会在响应对象上发出一个 ` error ` 事件, 随后将在请求对象上执行 ` close ` 事件。

### 实例属性

` IncomingMessage ` 实例具有以下可读属性:

#### `response.statusCode`

一个指示 HTTP 响应状态代码的 ` Integer `。

#### `response.statusMessage`

表示HTTP状态消息的`string`。

#### `response.headers`

An `Object` representing the response HTTP headers. The `headers` object is formatted as follows:

* 所有的头文件名是小写的。
* 每个头名称在头对象上生成一个数组值属性。
* 每个头值被推入与它的头名称相关联的数组中。

#### `response.httpVersion`

表示HTTP协议版本号的 `String` 。 一般是“1”或“1.1”。 此外 `httpVersionMajor` 和`httpVersionMinor` 两整数值可读属性，分别返回HTTP的主要和次要版本号

#### `response.httpVersionMajor`

表示HTTP协议主要版本号的 `整数`。

#### `response.httpVersionMinor`

表示http协议次要版本号的`整数`。
