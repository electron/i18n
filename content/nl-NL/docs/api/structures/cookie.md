# Cookie Object

* `name` String - de naam van de cookie.
* `value` String - de waarde van de cookie.
* `domain` String (optional) - The domain of the cookie.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie.
* `path` String (optioneel) - Het pad van de cookie.
* `secure` Boolean (optional) - Whether the cookie is marked as secure.
* `httpOnly` Boolean (optioneel) - of de cookie is gemarkeerd als alleen HTTP.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.