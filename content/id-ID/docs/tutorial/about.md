# Tentang Electron

[Electron](https://electron.atom.io) adalah perpustakaan open source yang dikembangkan oleh GitHub untuk membangun aplikasi desktop lintas-platform dengan HTML, CSS, dan JavaScript. Electron menyelesaikan hal ini dengan menggabungkan [Chromium](https://www.chromium.org/Home) dan [Node.js](https://nodejs.org) ke dalam satu runtime dan aplikasi dapat dikemas untuk Mac, Windows, dan Linux.

Elektron dimulai pada 2013 sebagai kerangka kerja di mana [Atom](https://atom.io), editor teks milik GitHub, akan dibangun. Dua yang dibuka di musim semi tahun 2014.

Karena telah menjadi alat populer yang digunakan oleh pengembang open source, pemula, dan perusahaan-perusahaan yang mapan. [Melihat siapa yang membangun pada elektron](https://electron.atom.io/apps/).

Baca terus untuk mempelajari lebih lanjut tentang kontributor dan rilis elektron atau cara mulai membangun aplikasi dengan elektron melalui [Panduan Ringkas](quick-start.md).

## Tim Inti dan Kontributor

Elektron dikelola oleh sebuah tim di GitHub serta sekelompok [contributors aktif](https://github.com/electron/electron/graphs/contributors) dari komunitas. Beberapa kontributor individu dan beberapa bekerja lebih besar perusahaan yang mengembangkan pada elektron. Kami senang untuk menambahkan kontributor untuk proyek sebagai pengelola. Baca lebih lanjut tentang [kontribusi kepada Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Rilis

[Rilis Electron](https://github.com/electron/electron/releases) sangat kerap. Kami merilis ketika ada perbaikan bug yang signifikan, api atau yang memperbarui versi baru dari chromium atau Node.js.

### Memperbarui Dependensi

Elektron versi Chromium biasanya diperbarui dalam waktu satu atau dua minggu setelah Chromium versi baru dirilis, tergantung pada upaya yang terlibat dalam upgrade.

Ketika sebuah versi baru dari Node.js dirilis, elektron biasanya menunggu sekitar satu bulan sebelum meningkatkannya untuk membawa di versi yang lebih stabil.

Di Electron, Node.js dan Chromium berbagi satu contoh V8 — biasanya versi yang Kromium menggunakan. Sebagian besar waktu ini *hanya bekerja* tapi kadang-kadang itu berarti menambal Node.js.

### Versi

Karena ketergantungan pada Node.js dan Chromium, electron adalah dalam posisi versi rumit dan [tidak mengikuti `semver`](http://semver.org). Anda harus karena itu selalu referensi versi tertentu elektron. [Baca lebih lanjut tentang versi elektron 's](https://electron.atom.io/docs/tutorial/electron-versioning/) atau melihat [versi yang saat ini digunakan](https://electron.atom.io/#electron-versions).

### LTS

Dukungan jangka panjang dari versi elektron tidak saat ini ada. Jika versi elektron anda saat ini bekerja dengan baik, Anda dapat tinggal di atasnya untuk sepanjang seperti yang Anda inginkan. Jika Anda ingin membuat menggunakan fitur-fitur baru anda harus meng-upgrade ke versi terbaru.

Update besar datang pada versi `v1.0.0`. Jika Anda belum menggunakan versi ini, Anda harus [Baca lebih lanjut tentang perubahan `v1.0.0`](https://electron.atom.io/blog/2016/05/11/electron-1-0).

## Filosofi inti

Untuk menjaga Electron kecil (ukuran file) dan berkelanjutan (penyebaran dependensi dan api) proyek membatasi lingkup proyek inti.

Sebagai contoh, electron menggunakan hanya render library dari Chromium daripada semua Chromium. Hal ini membuat lebih mudah untuk meng-upgrade Kromium tetapi juga berarti beberapa fitur browser yang ditemukan di Google Chrome tidak ada di elektron.

Fitur baru yang ditambahkan ke elektron terutama harus API asli. Jika fitur berupa modul Node.js sendiri, itu harus mungkin. Lihat [alat Electron yang dibangun oleh komunitas](https://electron.atom.io/community).

## Riwayat

Berikut adalah tonggak dalam sejarah Electron.

| :calendar:       | :tada:                                                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **April 2013**   | [Atom Shell dimulai](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).                 |
| **Mei 2014**     | [Atom Shell merupakan open source](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                            |
| **April 2015**   | [Atom Shell menjadi Electron](https://github.com/electron/electron/pull/1389).                                              |
| **Mei 2016**     | [Elektron rilis `v1.0.0`](https://electron.atom.io/blog/2016/05/11/electron-1-0).                                           |
| **Mei 2016**     | [Aplikasi Electron kompatibel dengan Mac App Store](https://electron.atom.io/docs/tutorial/mac-app-store-submission-guide). |
| **Agustus 2016** | [Windows Store mendukungan aplikasi Electron](https://electron.atom.io/docs/tutorial/windows-store-guide).                  |