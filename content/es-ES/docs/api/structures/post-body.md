# Objeto PostBody

* `data` ([UploadRawData](upload-raw-data.md) | [UploadFile](upload-file.md))[] - The post data to be sent to the new window.
* `contentType` String - La cabecera `content-type` usada para los datos. Uno de `aplicacion/x-wwww-form-urlencoded` o `mulipart/form-data`. Corresponde al atributo `enctype` del formulario HTML enviado.
* `boundary` String (opcional) - El límite utilizado para separar varias partes del mensaje. Solo es válido cuando `contentType` es `multipart/form-data`.

Tenga en cuenta que las claves que empiezan con `--` no están soportadas actualmente. Por ejemplo, el siguiente ejemplo se enviará incorrectamente como `multipart/form-data` cuando `nativeWindowOpen` tiene valor `false` en webPreferences:

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
