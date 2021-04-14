# 协议响应对象

* `error` Integer（可选的） - 如果赋值，`request`将会失败，并返回`error`错误码。 更多的错误号信息，您可以查阅[网络错误列表][net-error].
* `statusCode` Number （可选的） - HTTP响应码，默认是200。
* `charset` String (可选) - 响应体的字符集, 默认值为 `"utf-8"`.
* `mimeType` 字符串（可选） - MIME类型的响应机构，默认是 `"text/html"`。 设置 `mimeType` 会暗中设置 `content-type` 标题作为回应，但如果 `content-type` 已经设置在 `headers`中， `mimeType` 将被忽略。
* `headers` 记录<string, string | string[]> （可选） - 包含响应标题的对象。 键必须是字符串，值必须是字符串或字符串阵列。
* `data` （缓冲|字符串|可读流）（可选） - 响应主体。 当 返回流作为响应时，这是一个代表响应主体 节点.js可读流。 当返回 `Buffer` 作为回应时，这是一个 `Buffer`。 当返回 `String` 作为回应时，这是一个 `String`。 对于其他类型的响应， 忽略此问题。
* `path` 字符串（可选） - 文件路径，将作为响应发送 机构。 这仅用于文件响应。
* `url` 字符串（可选） - 下载 `url` 并管道结果作为响应 身体。 这仅用于 URL 响应。
* `referrer` 字符串（可选） - `referrer` 网址。 这仅用于文件 和 URL 响应。
* `method` 字符串（可选） - HTTP `method`。 这仅用于文件 和 URL 响应。
* `session` 会话（可选） - 默认情况下用于请求网址的会话 HTTP 请求将重复使用当前会话。 将 `session` 设置为 `null` 将使用随机独立会话。 这仅用于 URL 响应。
* `uploadData` [协议响应加载数据](protocol-response-upload-data.md) （可选） - 用作上传数据的数据。 这只 用于 `method` `"POST"`时的网址响应。

[net-error]: https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h
