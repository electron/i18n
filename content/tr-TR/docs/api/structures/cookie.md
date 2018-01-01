# Çerez Nesnesi

* `name` Dizi - Çerezin ismi.
* `value` Dizi - Çerezin değeri.
* `domain` Dize (opsiyonel) - Çerezin alan adı.
* `hostOnly` Boolean (opsiyonel) - Çerezin bir host-only çerezi olup olmadığı.
* `path` Dize (opsiyonel) - Çerezin yolu.
* `secure` Boolean (opsiyonel) - Çerezin güvenli olarak işaretlenip işaretlenmediği.
* `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.