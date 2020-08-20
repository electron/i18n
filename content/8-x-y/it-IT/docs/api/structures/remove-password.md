# Oggetto RemovePassword

* `type` Stringa - `password`.
* `origin` Stringa (opzionale) - Quando fornita, le informazioni di autenticazione relative all'origine saranno solo rimosse, altrimenti l'intera cache sarà pulita.
* `scheme` Stringa (opzionale) - Scheme di autenticazione. I possibili valori sono: `basic`, `digest`, `ntlm`, `negotiate`. Deve essere fornito se rimosso dall'`origin`.
* `realm` Stringa (opzionale) - Regno dell'autenticazione. Deve essere fornito se rimosso dall'`origin`.
* `nome utente`Stringa (opzionale) - Credenziali dell'autenticazione. Deve essere fornito se rimosso per `origine`.
* `password` Stringa (opzionale) - Credenziali dell'autenticazione. Deve essere fornita se rimossa dall'`origine`.
