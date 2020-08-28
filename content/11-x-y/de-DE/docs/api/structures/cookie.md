# Cookie Objekt

* `name` String - Der Name des Cookies.
* `value` String - Der Wert des Cookies.
* `domain` String (optional) - Die Domain des Cookie; dies wird mit einem vorhergehenden Punkt normalisiert, so dass es auch für Subdomains gilt.
* `hostOnly` Boolean (optional) - Ob das Cookie ein Host-only Cookie ist; dies wird nur `true` sein, wenn keine Domain übergeben wurde.
* `path` String (optional) - Der Pfad des Cookie.
* `secure` Boolean (optional) - Ist der Cookie als sicher markiert?
* `httpOnly` Boolean (optional) - Ist der Cookie als "HTTP only" markiert?
* `session` Boolean (optional) - Ist der Cookie ein Session Cookie oder ein permanenter Cookie mit einem Ablaufdatum?
* `expirationDate` Double (optional) - Das Ablaufdatum des Cookies in Sekunden seit Beginn der UNIX-Zeit. Bei Session-Cookies nicht angegeben.
* `sameSite` String - Die [Gleiche-Seite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies)-Richtlinie, die für dieses Cookie gilt.  Sein Wert kann `nicht gesetzt `, `no_restriction`, `lax` oder `strict` sein.
