# Obiekt Cookie

* `name` String - Nazwa pliku cookie.
* `value` String - Wartość pliku cookie.
* `domain` String (opcjonalne) - Domena ciasteczka; wartość zostanie znormalizowane poprzez dodanie kropki na początku, przez co będzie również działać z subdomenami.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (opcjonalne) - Ścieżka ciasteczka.
* `secure` Boolean (opcjonalne) - Czy ciasteczko jest oznaczone jako bezpieczne.
* `httpOnly` Boolean (opcjonalne) - Czy ciasteczko jest oznaczone jako HTTP.
* `session` Boolean (opcjonalne) - Czy ciasteczko jest ciasteczkiem sesji czy trwałym ciasteczkiem z datą ważności.
* `expirationDate` Double (ocjonalne) - Data ważności ciasteczka wyrażona w sekundach od epoki UNIX. Nie podana dla ciasteczek sesji.