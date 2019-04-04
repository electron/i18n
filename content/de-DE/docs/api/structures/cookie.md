# Cookie Object

* `name` String - Der Name des Cookies.
* `value` String - Der Wert des Cookies.
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` String (optional) - Der Pfad des Cookie.
* `secure` Boolean (optional) - Ist der Cookie als sicher markiert? 
* `httpOnly` Boolean (optional) - Ist der Cookie als "HTTP only" markiert?
* `session` Boolean (optional) - Ist der Cookie ein Session Cookie oder ein permanenter Cookie mit einem Ablaufdatum?
* `expirationDate` Double (optional) - Das Ablaufdatum des Cookies in Sekunden seit Beginn der UNIX-Zeit. Bei Session-Cookies nicht angegeben.