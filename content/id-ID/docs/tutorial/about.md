# Tentang Electron

[Electron](https://electronjs.org) adalah perpustakaan open source yang dikembangkan oleh GitHub untuk membangun aplikasi desktop lintas-platform dengan HTML, CSS, dan JavaScript. Electron menyelesaikan hal ini dengan menggabungkan [Chromium](https://www.chromium.org/Home) dan [Node.js](https://nodejs.org) ke dalam satu runtime dan aplikasi dapat dikemas untuk Mac, Windows, dan Linux.

Elektron dimulai pada 2013 sebagai kerangka kerja di mana [Atom](https://atom.io), editor teks milik GitHub, akan dibangun. Dua yang dibuka di musim semi tahun 2014.

Karena telah menjadi alat populer yang digunakan oleh pengembang open source, pemula, dan perusahaan-perusahaan yang mapan. [Melihat siapa yang membangun pada elektron](https://electronjs.org/apps).

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

Seperti versi 2.0 Elektron  berikut ` semver </ 1> </ 0> .
Untuk sebagian besar aplikasi, dan menggunakan versi npm terbaru , menjalankan <code> $ npm menginstal elektron </ 0> akan melakukan hal yang benar.</p>

<p>Proses update versi rinci secara eksplisit di <a href="electron-versioning.md"> Versioning Doc </ 0> kami .</p>

<h3>LTS</h3>

<p>Dukungan jangka panjang dari versi elektron tidak saat ini ada. Jika versi elektron anda saat ini bekerja dengan baik, Anda dapat tinggal di atasnya untuk sepanjang seperti yang Anda inginkan. Jika Anda ingin membuat menggunakan fitur-fitur baru anda harus meng-upgrade ke versi terbaru.</p>

<p>Update besar datang pada versi <code>v1.0.0`. Jika Anda belum menggunakan versi ini, Anda harus [Baca lebih lanjut tentang perubahan `v1.0.0`](https://electronjs.org/blog/electron-1-0).</p> 

## Filosofi inti

Untuk menjaga Electron kecil (ukuran file) dan berkelanjutan (penyebaran dependensi dan api) proyek membatasi lingkup proyek inti.

Sebagai contoh, electron menggunakan hanya render library dari Chromium daripada semua Chromium. Hal ini membuat lebih mudah untuk meng-upgrade Kromium tetapi juga berarti beberapa fitur browser yang ditemukan di Google Chrome tidak ada di elektron.

Fitur baru yang ditambahkan ke elektron terutama harus API asli. Jika fitur berupa modul Node.js sendiri, itu harus mungkin. Lihat [alat Electron yang dibangun oleh komunitas](https://electronjs.org/community).

## Riwayat

Berikut adalah tonggak dalam sejarah Electron.

 Dukungan Windows Store untuk aplikasi Elektron </ 0> .</td> </tr> </tbody> </table>