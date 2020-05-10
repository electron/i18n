# Obiekt Cookie

* `name` String - Nazwa pliku cookie.
* `value` String - Wartość pliku cookie.
* `domain` String (opcjonalne) - Domena ciasteczka; wartość zostanie znormalizowane poprzez dodanie kropki na początku, przez co będzie również działać z subdomenami.
* `hostOnly` Boolean (opcjonalne) - jeżeli `true`, to zawartość cookie nie będzie dostępna dla aplikacji działających po stronie klienta; jego wartość może być <0>true</0> tylko jeżeli ciasteczko nie posiada ustawionej domeny.
* `path` String (opcjonalne) - Ścieżka ciasteczka.
* `secure` Boolean (opcjonalne) - Czy ciasteczko jest oznaczone jako bezpieczne.
* `httpOnly` Boolean (opcjonalne) - Czy ciasteczko jest oznaczone jako HTTP.
* `session` Boolean (opcjonalne) - Czy ciasteczko jest ciasteczkiem sesji czy trwałym ciasteczkiem z datą ważności.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Nie dostarczono dla plików cookie sesji.
