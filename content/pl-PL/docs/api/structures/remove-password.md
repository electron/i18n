# Obiekt RemovePassword

* `type` String - `password`.
* `origin` String (opcjonalne) - Jeśli podane, informacje uwierzytelniania związane ze źródłami, zostaną tylko usunięte w przeciwnym razie cała pamięć podręczna zostanie wyczyszczona.
* `scheme` String (opcjonalnie) - schemat uwierzytelniania. Może być `basic`, `digest`, `ntlm`, `negotiate`. Musi zostać podane, jeśli jest usuwane poprzez `origin`.
* `realm` String (opcjonalnie) - Sfera uwierzytelniania. Musi zostać podane, jeśli jest usuwane poprzez `origin`.
* `username` String (opcjonalne) - Poświadczenie uwierzytelnienia. Musi zostać podane, jeśli jest usuwane poprzez `origin`.
* `password` String (opcjonalne) - Poświadczenie uwierzytelnienia. Musi zostać podane jeśli jest usuwane poprzez `origin`.