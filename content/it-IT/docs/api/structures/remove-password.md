# Oggetto RemovePassword

* `type` Stringa - `password`.
* `origin` Stringa (opzionale) - Quando fornita, le informazioni di autenticazione relative all'origine saranno solo rimosse, altrimenti l'intera cache sarà pulita.
* `scheme` Stringa (opzionale) - Scheme di autenticazione. I possibili valori sono: `basic`, `digest`, `ntlm`, `negotiate`. Deve essere fornito se rimosso dall'`origin`.
* `realm` Stringa (opzionale) - Realm di autenticazione. Deve essere fornita se rimossa dall'`origin`.
* `username` Stringa (opzionale) - Credenziali di autenticazione. Devono essere fornite se rimosse dall'`origin`.
* `password` Stringa (opzionale) - Credenziali di autenticazione. Devono essere fornite se rimosse dall'`origin`.