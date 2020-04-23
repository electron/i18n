# Objeto RemovePassword

* `tipo` String - `contraseña`.
* `origen` String (opcional) - Cuando sea ofrecida, sólo será eliminada la información de autenticación, de lo contrario toda la caché se borrará.
* `Esquema` Cadena (opcional) - Esquema de autentificación. Puede ser `basico`, `resumen`, `ntlm`, `negociar`. Debe darse si es removido por `originen`.
* `realm` String (optional) - Realm of the authentication. Debe darse si es removido por `originen`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
