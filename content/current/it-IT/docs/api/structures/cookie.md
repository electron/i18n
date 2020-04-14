# Oggetto Cookie

* `name` Stringa - Il nome del cookie.
* `value` Stringa - Il contenuto del cookie.
* `domain` Stringa (opzionale) - Il dominio del cookie; Sarà normalizzato precedendolo con un punto in modo da essere valido anche per sottodomini.
* `hostOnly` Booleano (opzionale) - Indica se il cookie è "host-only", `true` quindi nel caso in cui non sia stato specificato un dominio.
* `path` Stringa (opzionale) - Il percorso del cookie.
* `secure` Booleano (opzionale) - Indica se il cookie è segnato come sicuro.
* `httpOnly` Booleano (opzionale) - Indica se il cookie è segnato come solo HTTP.
* `session` Booleano (opzionale) - Indica se si tratta di un cookie di sessione o di uno persistente con data di scadenza.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
