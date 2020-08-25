# Objek Cookie

* `namz` String - Nama cookie.
* `nilai` String - Nilai cookie.
* `domain` String (pilihan) - Domain cookie; ini akan dinormalisasi dengan titik sebelumnya sehingga juga berlaku untuk subdomain.
* `hanyaHost` Boolean (pilihan) - Apakah cookie adalah cookie hanya host; ini hanya akan ` benar ` jika tidak ada domain yang dilewati.
* `jejak` String (pilihan) - Jejak dari sebuah cookie.
* `aman` Boolean (tidak wajib diisi) - Kalau cookie ditandai sebagai aman.
* `hanyaHttp` Boolean (tidak wajib diisi) - Kalau cookie ditandai hanya sebagai HTTP.
* `sesi` Boolean (tidak wajib diisi) - Apakah cookie adalah sebuah cookie sesi atau cookie tetap dengan tanggal kadaluwarsa.
* ` tanggalKadaluwarsa ` Double (tidak wajib diisi) - Tanggal kadaluwarsa cookie sebagai jumlah detik sejak zaman UNIX. Tidak disediakan untuk sesi cookie.
* `sameSite` String - The [Same Site](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies) policy applied to this cookie.  Can be `unspecified`, `no_restriction`, `lax` or `strict`.
