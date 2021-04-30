# ProtocolResponse 对象

* `error` Integer（可选的） - 如果赋值，`request`将会失败，并返回`error`错误码。 更多的错误号信息，您可以查阅[网络错误列表][net-error].
* `statusCode` Number （可选的） - HTTP响应码，默认是200。
* `charset` String (可选) - 响应体的字符集, 默认值为 `"utf-8"`.
* `mimeType` String (可选) - MIME 类型的响应正文，默认是 `"text/html"`。 设置 `mimeType` 将静默地设置响应头的 `content-type`。 但如果`头部`已经设置了 `content-type`，`mimeType` 将被忽略。
* `headers` Record<string, string | string[]> (可选) - 包含响应头的对象。 Key必须是String类型，value必须是String或者String类型的Array。
* `data` (Buffer | String | ReadableStream) (可选) - 响应体。 当以流作为响应返回时，响应体将以Node.js readable stream的形式呈现。 当以 `Buffer` 作为响应返回时，该属性就是个 `Buffer` 对象。 当以 `String` 作为响应返回时，该属性就是一个 `String`。 其它类型的响应，该属性可被忽略。
* `path` String (可选) - 将作为响应体发送的文件的路径。 仅对文件响应生效。
* `url` String (可选) - 从该`url`下载并把结果通过管道作为响应体。 仅对URL响应生效。
* `referrer` String (可选) - `引用` URL。 仅对文件和URL响应生效。
* `method` String (可选) - HTTP `方法`。 仅对文件和URL响应生效。
* `session` Session (可选) - 用于请求URL的会话，默认情况下HTTP 请求将重复使用当前会话。 将 `session` 设置为 `null` 将使用随机独立会话。 仅对URL响应生效。
* `uploadData` [ProtocolResponseUploadData](protocol-response-upload-data.md) (可选) - 用于上传的数据。 仅对 `方法` 是 `"POST"` 的URL响应生效。

[net-error]: https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h
