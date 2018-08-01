# Objeto RemovePassword

* `tipo` String - `contraseña`.
* `origen` String (opcional) - Cuando sea ofrecida, sólo será eliminada la información de autenticación, de lo contrario toda la caché se borrará.
* `Esquema` Cadena (opcional) - Esquema de autentificación. Puede ser `basico`, `resumen`, `ntlm`, `negociar`. Debe darse si es removido por `originen`.
* `campo` Cadena (opcional) - campo de autentificación. debe ser ofrecido si es removido por el `originen`.
* `nombredeusuario` String (opcional) - Credenciales de autentificación. Debe ser ofrecido si es removido por el `origen`.
* `contraseña` String (opcional) - Credenciales de autentificación. Debe ser ofrecido si es removido por el `origen`.