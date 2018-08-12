# Cookie Object

* `name` String - Der Name des Cookies.
* `value` String - Der Wert des Cookies.
* `domain` String (optional) - Die Domain des Cookies.
* `hostOnly` Boolean (optional) - Ist der Cookie ein host-only Cookie?
* `path` String (optional) - Der Pfad des Cookie.
* `secure` Boolean (optional) - Ist der Cookie als sicher markiert? 
* `httpOnly` Boolean (optional) - Ist der Cookie als "HTTP only" markiert?
* `session` Boolean (optional) - Ist der Cookie ein Session Cookie oder ein permanenter Cookie mit einem Ablaufdatum?
* `expirationDate` Double (optional) - Das Ablaufdatum des Cookies in Sekunden seit Beginn der UNIX-Zeit. Bei Session-Cookies nicht angegeben.