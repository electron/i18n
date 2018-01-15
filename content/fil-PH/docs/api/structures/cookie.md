# Ang Cookie na bagay

* `name` na String - Ang pangalan ng mga cookie.
* `value` na String - Ang halaga ng mga cookie.
* `domain` na String (opsyonal) - Ang dominyo ng mga cookie.
* `hostOnly`Boolean (opsyonal) - Depende kung ang cookie ay isang cookie na host lamang.
* `path` na String (opsyonal) - Ang path ng mga cookie.
* `secure` Boolean (opsyonal) - Depende kung ang cookie ay markado na ligtas.
* `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.