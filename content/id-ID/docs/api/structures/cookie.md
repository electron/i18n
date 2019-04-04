# Obyek Cookie

* `namz` String - Nama cookie.
* `nilai` String - Nilai cookie.
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `jejak` String (tidak wajib diisi) - Jejak dari sebuah cookie.
* `aman` Boolean (tidak wajib diisi) - Kalau cookie ditandai sebagai aman.
* `hanyaHttp` Boolean (tidak wajib diisi) - Kalau cookie ditandai hanya sebagai HTTP.
* `sesi` Boolean (tidak wajib diisi) - Apakah cookie adalah sebuah cookie sesi atau cookie tetap dengan tanggal kadaluwarsa.
* `tanggalKadaluwarsa` Double (tidak wajib diisi) - Tanggal kadaluwarsa dari sebuah cookie sebagai sebuah jumlah detik sejak zamann UNIX. Tidak disediakan untuk cookie sesi.