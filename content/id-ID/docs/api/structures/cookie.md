# Obyek Cookie

* `name` String - Nama cookie.
* `value` String - Nilai cookie.
* `domain` String (tidak wajib diisi) - Domain cookie.
* `hostOnly` Boolean (tidak wajib diisi) - Kalau cookie adalah sebuah cookie hanya-penerima.
* `path` String (tidak wajib diisi) - Jejak dari sebuah cookie.
* `secure` Boolean (tidak wajib diisi) - Kalau cookie ditandai sebagai aman.
* `httpOnly` Boolean (tidak wajib diisi) - Kalau cookie ditandai hanya sebagai HTTP.
* `session` Boolean (tidak wajib diisi) - Apakah cookie adalah sebuah cookie sesi atau cookie tetap dengan tanggal kadaluwarsa.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.