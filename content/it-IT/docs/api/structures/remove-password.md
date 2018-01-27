# Oggetto RimuoviPassword

* `tipo` Stringa - `password`.
* `origine` Stringa (opzionale) - Quando fornite, le informazioni di autenticazione relative all'origine saranno solo rimosse mentre l'intera cache sarà pulita.
* `schema` Stringa (opzionale) - Schema di autenticazione. Può essere `base`, `assimilato`, `ntlm`, `negoziato`. Deve essere fornito se rimosso dall'`origine`.
* `realm` String (optional) - Realm of the authentication. Must be provided if removing by `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.