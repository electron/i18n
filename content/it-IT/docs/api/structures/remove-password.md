# Oggetto RimuoviPassword

* `tipo` Stringa - `password`.
* `origine` Stringa (opzionale) - Quando fornite, le informazioni di autenticazione relative all'origine saranno solo rimosse mentre l'intera cache sarà pulita.
* `schema` Stringa (opzionale) - Schema di autenticazione. Può essere `base`, `assimilato`, `ntlm`, `negoziato`. Deve essere fornito se rimosso dall'`origine`.
* `regno` Stringa (opzionale) - Regno dell'autenticazione. Deve essere fornita se rimossa dall'`origine`.
* `nomeutente` Stringa (opzionale) - Credenziali di autenticazione. Devono essere fornite se rimosse dall'`origine`.
* `password` Stringa (opzionale) - Credenziali di autenticazione. Devono essere fornite se rimosse dall'`origine`.