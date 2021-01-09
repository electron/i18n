# Объект PostBody

* `data` Array<[PostData](./post-data.md)> - Данные записи для отправки в новое окно.
* `contentType` String - Заголовок `content-type`, используемый для данных. Одно из следующих значений: `application/x-www-form-urlencoded` или `multipart/form-data`. Соответствует атрибуту `enctype` отправленной HTML-формы.
* `boundary` String (опционально) - Граница, используемая для разделения нескольких частей сообщение. Допустимы только тогда, когда `contentType` является `multipart/form-data`.

Обратите внимание, что ключи, начинающиеся с `--`, в настоящее время не поддерживаются. Например, это будет ошибочно передаваться в виде `multipart/form-data`, когда `nativeWindowOpen` установлен в `false` в веб-настройках:

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
