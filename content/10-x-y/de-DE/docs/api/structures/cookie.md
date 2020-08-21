# Cookie Objekt

* `name` String - Der Name des Cookies.
* `value` String - Der Wert des Cookies.
* `domain` String (optional) - Die Domain des Cookie; dies wird mit einem vorhergehenden Punkt normalisiert, so dass es auch für Subdomains gilt.
* `hostOnly` Boolean (optional) - Ob das Cookie ein Host-only Cookie ist; dies wird nur `true` sein, wenn keine Domain übergeben wurde.
* `path` String (optional) - Der Pfad des Cookie.
* `secure` Boolean (optional) - Ist der Cookie als sicher markiert?
* `httpOnly` Boolean (optional) - Ist der Cookie als "HTTP only" markiert?
* `session` Boolean (optional) - Ist der Cookie ein Session Cookie oder ein permanenter Cookie mit einem Ablaufdatum?
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
* `sameSite` String - The [Same Site](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies) policy applied to this cookie.  Can be `unspecified`, `no_restriction`, `lax` or `strict`.
