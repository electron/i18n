# Cookie वस्तु

* `नाम` String - Cookie का नाम ।
* ` मान ` String - Cookie का मूल्य ।
* ` डोमेन ` String (वैकल्पिक) - Cookie का डोमेन ।
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie.
* `path` String (optional) - The path of the cookie.
* `secure` Boolean (optional) - Whether the cookie is marked as secure.
* `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.