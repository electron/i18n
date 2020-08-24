# Cookie objekt

* `name` String – jméno cookie.
* `value` String – hodnota cookie.
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (volitelné) – cesta cookie.
* `secure` Boolean (volitelné) – značí, jestli je cookie značena jako secure.
* `httpOnly` Boolean (volitelné) – značí, jestli je cookie označena jako HTTP only.
* `session` Boolean (volitelné) – značí, jestli je cookie session cookie, anebo časově omezenou cookie s datem vypršení.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
