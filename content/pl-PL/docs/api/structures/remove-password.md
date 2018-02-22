# Obiekt RemovePassword

* `type` String - `password`.
* `origin` String (opcjonalne) - Jeśli podane, informacje uwierzytelniania związane ze źródłami, zostaną tylko usunięte w przeciwnym razie cała pamięć podręczna zostanie wyczyszczona.
* `scheme` String (opcjonalnie) - schemat uwierzytelniania. Może być `basic`, `digest`, `ntlm`, `negotiate`. Musi zostać podane, jeśli jest usuwane poprzez `origin`.
* `realm` String (optional) - Realm of the authentication. Must be provided if removing by `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.