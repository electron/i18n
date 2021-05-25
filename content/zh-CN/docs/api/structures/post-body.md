# PostBody 对象

* `data` ([UploadRawData](upload-raw-data.md) | [UploadFile](upload-file.md))[] - The post data to be sent to the new window.
* `contentType` String - 数据的 `content-type` 头部。 `application/x-www-form-urlencoded` 或 `multipart/form-data`之一。 相当于提交的 HTML 表单的 `enctype` 属性。
* `boundary` String (可选) - 用于消息中分离多个部分的边界。 仅当 `contentType` 是 `multipart/form-data` 时有效。

请注意，当前不支持以 `--` 开头的key。 例如，当 `nativeWindowOpen` 在 WebPrepres 中设置为 `false` 时，该对象会错误地被作为 `multipart/form-data` 提交：

```html
<form
  target="_blank"
  method="POST"
  enctype="application/x-www-form-urlencoded"
  action="https://postman-echo.com/post"
>
  <input type="text" name="--theKey">
  <input type="submit">
</form>
```
