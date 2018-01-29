## 类：IncomingMessage

> 处理 HTTP/HTTPS 请求的响应。

线程：[主线程](../glossary.md#main-process)

`ClientRequest`实现了[Writable Stream](https://nodejs.org/api/stream.html#stream_readable_streams)接口, 因此是一个[EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)类型.

### 事件

#### Event: 'data'

返回:

* `chunk` Buffer - A chunk of response body's data.

The `data` event is the usual method of transferring response data into applicative code.

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

A `String` representing the HTTP status message.

#### `response.headers`

An `Object` representing the response HTTP headers. The `headers` object is formatted as follows:

* All header names are lowercased.
* Each header name produces an array-valued property on the headers object.
* Each header value is pushed into the array associated with its header name.

#### `response.httpVersion`

A `String` indicating the HTTP protocol version number. Typical values are '1.0' or '1.1'. Additionally `httpVersionMajor` and `httpVersionMinor` are two Integer-valued readable properties that return respectively the HTTP major and minor version numbers.

#### `response.httpVersionMajor`

An `Integer` indicating the HTTP protocol major version number.

#### `response.httpVersionMinor`

An `Integer` indicating the HTTP protocol minor version number.