# Objeto postbody

* `data` Array<[PostData](./post-data.md)> - A Post data a ser enviada para uma nova janela.
* `contentType` String - O cabeçalho `content-type` usado para os dados. Um de `application/x-www-form-urlencoded` ou `multipart/form-data`. Corresponde a o atributo `enctype` do formulário HTML enviado.
* `boundary` String (opcional) - O limite usado para separar várias partes de a mensagem. Somente é válido quando `contentType` é `multipart/form-data`.

Observe que as teclas que começam com `--` não são suportadas no momento. Por exemplo, isso será enviado errantemente como `multipart/form-data` quando `nativeWindowOpen` for definido para `false` em webPreferências:

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
