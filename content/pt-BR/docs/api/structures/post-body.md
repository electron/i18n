# Objeto PostBody

* `data` ([UploadRawData](upload-raw-data.md) | [UploadFile](upload-file.md))[] - The post data to be sent to the new window.
* `contentType` String - O cabeçalho `content-type` usado para os dados. Um dos `application/x-www-form-urlencoded` ou `multipart/form-data`. Corresponde ao atributo `enctype` do formulário HTML submetido.
* `boundary` String (opcional) - O limite usado para separar múltiplas partes da mensagem. Válido somente quando `contentType` é `multipart/form-data`.

Observe que chaves começando com `--` não são suportadas atualmente. Por exemplo, isso será erroneamente enviado como `multipart/form-data` quando `nativeWindowOpen` for definodo para `false` em webPreferences:

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
