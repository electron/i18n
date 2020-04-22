# Объект RemovePassword

* `type` String - `password`.
* `origin` String (опционально) - когда предоставлено, информация аутентификации, связанная с происхождением( origin ), будет удалена только в том случае, если весь кэш будет очищен.
* `scheme` String (опционально) - схема аутентификации. Может быть `basic`, `digest`, `ntlm`, `negotiate`. Должна предоставляться, если удаление через `origin`.
* `realm` String (optional) - Realm of the authentication. Должна предоставляться, если удаление через `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
