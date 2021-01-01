# Objeto del Cuerpo

* `datos<`ArrayPostData (Datos)-El post data deben ser enviado a la nueva ventana.</p></li> 
  
  * `Tipodecontenido`El `El titulo del tipo de contenido usado para los datos. <code>Uno dato <code>de aplicacion/x-wwww-form-urlencoded`o<0>mulipart/form-data</code>. Corresponds to the `enctype` attribute of the submitted HTML form.

* `boundary` String (optional) - The boundary used to separate multiple parts of the message. Only valid when `contentType` is `multipart/form-data`.</ul> 

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
