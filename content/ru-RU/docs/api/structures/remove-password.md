# RemovePassword Объект

* `type` String - `password`.
* `origin` String (опционально) - Когда предоставлена информация аутентификации связанная с происхождением, то будет удалена только в том случае, если весь кэш будет очищен.
* `scheme` String (опиционально) - Схема аутентификации. Может быть `basic`, `digest`, `ntlm`, `negotiate`. Должно быть предоставлена, если вы удалили `origin`.
* `realm` String (опиционально) - Realm аутентификация. Должна быть предоставлена, если вы удалили `origin`.
* `username` String (опиционально) - учетные данные проверки подлинности. Должна предоставляться, если удаление с помощью `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.