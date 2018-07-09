# Cookie objekt

* `name` String – jméno cookie.
* `value` String – hodnota cookie.
* `domain` String (volitelné) – doména cookie.
* `hostOnly` Boolean (volitelné) – značí, jestli je cookie host-only.
* `path` String (volitelné) – cesta cookie.
* `secure` Boolean (volitelné) – značí, jestli je cookie značena jako secure.
* `httpOnly` Boolean (volitelné) – značí, jestli je cookie označena jako HTTP only.
* `session` Boolean (volitelné) – značí, jestli je cookie session cookie, anebo časově omezenou cookie s datem vypršení.
* `expirationDate` Double (volitelné) – datum vypršení platnosti cookie uvedeno jako číslo v sekundách od počátku Unixového času. Nelze nastavit session cookie.