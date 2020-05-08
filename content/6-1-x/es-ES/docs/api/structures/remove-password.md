# Objeto RemovePassword

* `tipo` String - `contraseña`.
* `origen` String (opcional) - Cuando sea ofrecida, sólo será eliminada la información de autenticación, de lo contrario toda la caché se borrará.
* `Esquema` Cadena (opcional) - Esquema de autentificación. Puede ser `basico`, `resumen`, `ntlm`, `negociar`. Debe darse si es removido por `originen`.
* `realm` String (opcional) - El ámbito de la autenticación. Debe darse si es removido por `originen`.
* `username` String (opcional) - Credenciales de autenticación. Se debe proveer si se elimina por `origin`.
* `password` String (opcional) - Credenciales de autenticación. Se debe proveer si se elimina por `origin`.
