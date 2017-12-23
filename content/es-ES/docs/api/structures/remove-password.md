# Objeto RemovePasswor

* `tipo` String - `contraseña`.
* `origen` String (opcional) - Cuando se ofrezca, la información de autenticación sólo será eliminada de lo contrario toda la caché se borrará.
* `scheme` String (optional) - Scheme of the authentication. Can be `basic`, `digest`, `ntlm`, `negotiate`. Must be provided if removing by `origin`.
* `realm` String (optional) - Realm of the authentication. Must be provided if removing by `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.