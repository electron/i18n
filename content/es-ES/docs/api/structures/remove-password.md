# Objeto RemovePassword

* `tipo` String - `contraseña`.
* `origen` String (opcional) - Cuando se ofrezca, la información de autenticación sólo será eliminada de lo contrario toda la caché se borrará.
* `scheme` String (optional) - Scheme of the authentication. Can be `basic`, `digest`, `ntlm`, `negotiate`. Must be provided if removing by `origin`.
* `realm` String (optional) - Realm of the authentication. Must be provided if removing by `origin`.
* `nombredeusuario` String (opcional) - Credenciales de la autentificación. Debe ser ofrecido si es removido por el `origen`.
* `contraseña` String (opcional) - Credenciales de la autentificación. Debe ser ofrecido si es removido por el `origen`.