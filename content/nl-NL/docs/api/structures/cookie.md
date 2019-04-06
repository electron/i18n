# Cookie Object

* `name` String - de naam van de cookie.
* `value` String - de waarde van de cookie.
* ` domain` String (optioneel) - Het domein van de cookie; dit zal worden genormaliseerd met een punt vooraf zodat het ook geldig is voor subdomeinen.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (optioneel) - Het pad van de cookie.
* `secure` Boolean (optional) - Whether the cookie is marked as secure.
* `httpOnly` Boolean (optioneel) - of de cookie is gemarkeerd als alleen HTTP.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.