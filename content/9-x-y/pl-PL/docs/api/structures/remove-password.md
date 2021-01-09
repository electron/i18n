# Obiekt RemovePassword

* `type` String - `password`.
* `origin` String (opcjonalne) - Jeżeli podane, usunięte zostaną tylko dane uwierzytelniania dotyczące określonego pochodenia, w przeciwnym wypadku wyczyszczona zostanie cała pamięć podręczna.
* `scheme` String (opcjonalnie) - schemat uwierzytelniania. Może mieć wartość: `basic`, `digest`, `ntlm`, `negotiate`. Musi zostać podane, jeśli jest usuwane poprzez `origin`.
* `realm` String (optional) - Realm of the authentication. Musi zostać podane, jeśli jest usuwane poprzez `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
