# Cookie objekt

* `name` String – jméno cookie.
* `value` String – hodnota cookie.
* `domain` String (volitelné) – doména cookie.
* `hostOnly` Boolean (volitelné) – značí, jestli je cookie host-only.
* `path` String (volitelné) – cesta cookie.
* `secure` Boolean (volitelné) – značí, jestli je cookie značena jako secure.
* `httpOnly` Boolean (volitelné) – značí, jestli je cookie označena jako HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.