# Objek Cookie

* `namz` String - Nama cookie.
* `nilai` String - Nilai cookie.
* `domain` String (pilihan) - Domain cookie; ini akan dinormalisasi dengan titik sebelumnya sehingga juga berlaku untuk subdomain.
* `hanyaHost` Boolean (pilihan) - Apakah cookie adalah cookie hanya host; ini hanya akan ` benar ` jika tidak ada domain yang dilewati.
* `jejak` String (pilihan) - Jejak dari sebuah cookie.
* `aman` Boolean (tidak wajib diisi) - Kalau cookie ditandai sebagai aman.
* `hanyaHttp` Boolean (tidak wajib diisi) - Kalau cookie ditandai hanya sebagai HTTP.
* `sesi` Boolean (tidak wajib diisi) - Apakah cookie adalah sebuah cookie sesi atau cookie tetap dengan tanggal kadaluwarsa.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
