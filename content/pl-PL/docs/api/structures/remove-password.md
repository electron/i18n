# Obiekt RemovePassword

* `type` String - `password`.
* `origin` String (opcjonalne) - Jeżeli podane, usunięte zostaną tylko dane uwierzytelniania dotyczące określonego pochodenia, w przeciwnym wypadku wyczyszczona zostanie cała pamięć podręczna.
* `scheme` String (opcjonalnie) - schemat uwierzytelniania. Może mieć wartość: `basic`, `digest`, `ntlm`, `negotiate`. Musi zostać podane, jeśli jest usuwane poprzez `origin`.
* `realm` String (opcjonalnie) - Sfera uwierzytelniania. Musi zostać podane, jeśli jest usuwane poprzez `origin`.
* `username` String (opcjonalne) - Poświadczenie uwierzytelnienia. Musi zostać podane, jeśli jest usuwane poprzez `origin`.
* `password` String (opcjonalne) - Poświadczenie uwierzytelnienia. Musi zostać podane jeśli jest usuwane poprzez `origin`.