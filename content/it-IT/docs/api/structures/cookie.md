# Oggetto Cookie

* `name` Stringa - Il nome del cookie.
* `value` Stringa - Il contenuto del cookie.
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` Stringa (opzionale) - Il path del cookie.
* `secure` Booleano (opzionale) - Indica se il cookie è segnato come sicuro.
* `httpOnly` Booleano (opzionale) - Indica se il cookie è segnato come solo HTTP.
* `session` Booleano (opzionale) - Indica se si tratta di un cookie di sessione o di uno persistente con data di scadenza.
* `expirationDate` Double (opzionale) - La data di scadenza del cookie come numero di secondi dall'epoca UNIX. Non fornito per i cookie di sessione.