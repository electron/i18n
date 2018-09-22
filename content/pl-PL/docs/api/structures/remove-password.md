# Obiekt RemovePassword

* `type` String - `password`.
* `origin` String (optional) - When provided, the authentication info related to the origin will only be removed otherwise the entire cache will be cleared.
* `scheme` String (opcjonalnie) - schemat uwierzytelniania. Może mieć wartość: `basic`, `digest`, `ntlm`, `negotiate`. Musi zostać podane, jeśli jest usuwane poprzez `origin`.
* `realm` String (opcjonalnie) - Sfera uwierzytelniania. Musi zostać podane, jeśli jest usuwane poprzez `origin`.
* `username` String (opcjonalne) - Poświadczenie uwierzytelnienia. Musi zostać podane, jeśli jest usuwane poprzez `origin`.
* `password` String (opcjonalne) - Poświadczenie uwierzytelnienia. Musi zostać podane jeśli jest usuwane poprzez `origin`.