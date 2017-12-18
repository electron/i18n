# Obyek Cookie

* `name` String - Nama cookie.
* `value` String - Nilai cookie.
* `domain` String (tidak wajib diisi) - Domain cookie.
* `hostOnly` Boolean (tidak wajib diisi) - Jika seandainya cookie adalah sebuah cookie hanya-penerima.
* `path` String (tidak wajib diisi) - Jejak dari sebuah cookie.
* `secure` Boolean (optional) - Whether the cookie is marked as secure.
* `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.