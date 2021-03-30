# Objeto del Cuerpo

* `datos<`ArrayPostData (Datos)-El post data deben ser enviado a la nueva ventana.</p></li> 
  
  * `Tipodecontenido`El `El titulo del tipo de contenido usado para los datos. <code>Uno dato <code>de aplicacion/x-wwww-form-urlencoded`o<0>mulipart/form-data</code>. Corresponde a el atributo`enctype` del formulario HTML enviado.

* `boundary` String (opcional) - El límite utilizado para separar varias partes de el mensaje. Solo es válido cuando `contentType` es `multipart/form-data`.</ul> 

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
