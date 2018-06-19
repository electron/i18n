# Cookie Object

* `name` String - Der Name des Cookies.
* `value` String - Der Wert des Cookies.
* `domain` String (optional) - Die Domain des Cookies.
* `hostOnly` Boolean (optional) - true, wenn der Cookie ein host-only Cookie ist.
* `path` String (optional) - Der Pfad des Cookie.
* `secure` Boolean (optional) - true, wenn der Cookie als sicher markiert ist.
* `httpOnly` Boolean (optional) - true, wenn der Cookie als HTTP only markiert ist.
* `session` Boolean (optional) - true, wenn der Cookie ein Session Cookie ist. false, wenn der Cookie ein permanenter Cookie mit einem Ablaufdatum ist.
* `expirationDate` Double (optional) - Das Ablaufdatum des Cookies in Sekunden seit Beginn der UNIX-Zeit. Bei Session-Cookies nicht angegeben.