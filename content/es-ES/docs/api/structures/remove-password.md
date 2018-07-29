# Objeto RemovePassword

* `tipo` String - `contraseña`.
* `origen` String (opcional) - Cuando sea ofrecida, la información de autenticación sólo será eliminada de lo contrario toda la caché se borrará.
* `Esquema` Cadena (opcional) - Esquema de autentificación. Puede ser `basico`, `digerido`, `ntlm`, `negociar`. Debe darse si es removido por `originen`.
* `campo` Cadena (opcional) - campo de autentificación. debe ser ofrecido si es removido por el `originen`.
* `nombredeusuario` String (opcional) - Credenciales de autentificación. Debe ser ofrecido si es removido por el `origen`.
* `contraseña` String (opcional) - Credenciales de autentificación. Debe ser ofrecido si es removido por el `origen`.