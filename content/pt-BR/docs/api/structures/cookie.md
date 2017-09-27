# Cookie Object

* `name` String - O nome do cookie.
* `value` String - O valor do cookie.
* `domain` String (optional) - O domínio do cookie.
* `hostOnly` Boolean (opcional) - O cookie é somente de host.
* `path` String (opcional) - A diretoria do cookie.
* `secure` Boolean (opcional) - O cookie está marcado como seguro.
* `httpOnly` Boolean (opcional) - O cookie é somente HTTP.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.