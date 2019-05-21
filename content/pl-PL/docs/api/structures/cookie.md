# Obiekt Cookie

* `name` String - Nazwa pliku cookie.
* `value` String - Wartość pliku cookie.
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (opcjonalne) - Ścieżka ciasteczka.
* `secure` Boolean (opcjonalne) - Czy ciasteczko jest oznaczone jako bezpieczne.
* `httpOnly` Boolean (opcjonalne) - Czy ciasteczko jest oznaczone jako HTTP.
* `session` Boolean (opcjonalne) - Czy ciasteczko jest ciasteczkiem sesji czy trwałym ciasteczkiem z datą ważności.
* `expirationDate` Double (ocjonalne) - Data ważności ciasteczka wyrażona w sekundach od epoki UNIX. Nie podana dla ciasteczek sesji.