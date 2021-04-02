# 后身体对象

* `data` 阵列 <[后数据](./post-data.md)> - 将发送到 新窗口的帖子数据。
* `contentType` 字符串 - 用于数据的 `content-type` 标题。 `application/x-www-form-urlencoded` 或 `multipart/form-data`之一。 对应 提交的 HTML 表单的 `enctype` 属性。
* `boundary` 字符串（可选） - 用于 消息中分离多个部分的边界。 只有在 `multipart/form-data``contentType` 时才有效。

请注意，当前不支持以 `--` 开头的密钥。 例如，当 `nativeWindowOpen` 设置为在 WebPrepres 中 `false` 时，这会错误地作为 `multipart/form-data` 提交：

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
