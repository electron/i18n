# Cookie Object

* `name` String - The name of the cookie.
* `value` String - The value of the cookie.
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (optional) - The path of the cookie.
* `secure` Boolean (optional) - Whether the cookie is marked as secure.
* `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent
  cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as
  the number of seconds since the UNIX epoch. Not provided for session
  cookies.
* `sameSite` String - The [Same Site](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies) policy applied to this cookie.  Can be `unspecified`, `no_restriction`, `lax` or `strict`.
