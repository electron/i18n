# API Eksperimental

Beberapa API Electrons ditandai dengan `_Experimental_` dalam dokumentasi. Tandai ini menunjukkan bahwa API mungkin tidak dianggap stabil dan API mungkin dihapus atau dimodifikasi lebih sering daripada API lainnya dengan peringatan yang lebih sedikit.

## Kondisi agar API ditandai sebagai Eksperimental

Siapa pun dapat meminta API ditandai sebagai eksperimental dalam PR fitur, ketidaksepakatan tentang sifat eksperimental fitur dapat dibahas di API WG jika tidak dapat diselesaikan di PR.

## Proses untuk menghapus tandai Eksperimental

Setelah API stabil dan setidaknya dalam dua garis rilis stabil utama dapat dinominasikan untuk menghapus tandai eksperimentalnya.  Diskusi ini harus terjadi pada pertemuan WG API.  Hal-hal yang perlu dipertimbangkan ketika membahas / mencalonkan:

* Kondisi "dua jalur rilis di kandang utama" di atas kondisi pasti terpenuhi
* Selama waktu itu tidak ada perbaikan / masalah utama yang seharusnya disebabkan oleh adopsi fitur ini
* API cukup stabil dan belum terlalu terpengaruh oleh peningkatan kromosium
* Apakah ada yang menggunakan API?
* Apakah API memenuhi pengguna asli yang diusulkan, apakah ia memiliki celah?
