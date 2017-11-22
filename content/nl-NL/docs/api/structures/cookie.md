# Cookie Object

* `name` String - de naam van de cookie.
* `value` String - de waarde van de cookie.
* `domain` String (optional) - The domain of the cookie.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie.
* `path` String (optional) - The path of the cookie.
* `secure` Boolean (optional) - Whether the cookie is marked as secure.
* `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.