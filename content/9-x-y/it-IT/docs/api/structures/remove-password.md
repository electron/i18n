# Oggetto RemovePassword

* `type` Stringa - `password`.
* `origin` Stringa (opzionale) - Quando fornita, le informazioni di autenticazione relative all'origine saranno solo rimosse, altrimenti l'intera cache sarà pulita.
* `scheme` Stringa (opzionale) - Scheme di autenticazione. I possibili valori sono: `basic`, `digest`, `ntlm`, `negotiate`. Deve essere fornito se rimosso dall'`origin`.
* `realm` String (optional) - Realm of the authentication. Deve essere fornito se rimosso dall'`origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
