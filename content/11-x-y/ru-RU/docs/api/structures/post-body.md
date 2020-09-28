# Объект PostBody

* `data` Array<[PostData](./post-data.md)> - Данные записи для отправки в новое окно.
* `contentType` String - Заголовок `content-type`, используемый для данных. Одно из следующих значений: `application / x-www-form-urlencoded` или `multipart / form-data`. Соответствует атрибуту `enctype` отправленной HTML-формы.
* `boundary` String (optional) - The boundary used to separate multiple parts of the message. Only valid when `contentType` is `multipart/form-data`.

Note that keys starting with `--` are not currently supported. For example, this will errantly submit as `multipart/form-data` when `nativeWindowOpen` is set to `false` in webPreferences:

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
