# Pengembangan Chromium

> Kumpulan sumber daya untuk belajar tentang Chromium dan melacak perkembangannya

- [chromiumdev](https://chromiumdev-slack.herokuapp.com) pada Slack
- [@ChromiumDev](https://twitter.com/ChromiumDev) pada Twitter
- [@googlechrome](https://twitter.com/googlechrome) pada Twitter
- [Blog](https://blog.chromium.org)
- [Pencarian Kode](https://cs.chromium.org/)
- [Kode sumber](https://cs.chromium.org/chromium/src/)
- [Kalender Pengembangan dan Info Pelepasan](https://www.chromium.org/developers/calendar)
- [Kelompok Diskusi](http://www.chromium.org/developers/discussion-groups)

Lihat juga [V8 Pengembangan ](v8-development.md)

# Chromium pengembangan dengan Elektron

Hal ini dimungkinkan untuk debug Chromium dengan Electron dengan melewati `--build_debug_libcc ` ke skrip bootstrap:

```sh
$ ./script/bootstrap.py -d --build_debug_libcc
```

Ini akan mendownload dan membangun libchromiumcontent secara lokal, serupa dengan ` - build_release_libcc `, tapi akan membuat shared library build libchromiumcontent dan tidak akan strip simbol apapun, sehingga ideal untuk debugging.

Saat dibangun seperti ini, Anda bisa membuat perubahan pada file ` vendor / libchromiumcontent / src ` dan segera membangun kembali dengan cepat:

```sh
$ ./script/build.py -c D --libcc
```

Saat mengembangkan di linux dengan gdb, disarankan untuk menambahkan indeks gdb ke kecepatan up loading simbol. Ini tidak perlu dijalankan pada setiap bangunan, tapi memang begitu disarankan untuk melakukannya setidaknya sekali untuk mengindeks perpustakaan yang paling banyak dibagikan:

```sh
$ ./vendor/libchromiumcontent/src/build/gdb-add-index ./out/D/electron
```

Membangun konten libchromium memerlukan mesin yang kuat dan membutuhkan waktu lama (meskipun penambahan komponen perpustakaan bersama secara bertahap semakin cepat). Dengan sebuah 8-core / 16-thread Ryzen 1700 CPU clock pada 3ghz, SSD cepat dan 32GB RAM, itu harus memakan waktu sekitar 40 menit. Tidak disarankan untuk membangun dengan kurang dari 16GB dari RAM.

## Chromium git cache

` depot_tools ` memiliki opsi tidak terdokumentasi yang memungkinkan pengembang menetapkan cache global untuk semua objek git dari Chromium + dependensi. Adalah pilihan penggunaan `git clone --shared` untuk menyimpan bandwidth/spasi pada beberapa klon yang sama repositori.

Pada elektron/libchromium, pilihan ini terpapar melalui `LIBCHROMIUMCONTENT_GIT_CACHE` variabel lingkungan. Jika Anda berniat untuk memiliki beberapa libchromiumcontent membangun pohon di mesin yang sama (untuk bekerja pada berbeda cabang misalnya), disarankan untuk mengatur variabel untuk mempercepat download sumber Chromium. Sebagai contoh:

```sh
$ mkdir ~ / .chromium-git-cache
$ LIBCHROMIUMCONTENT_GIT_CACHE = ~ / .chromium-git-cache ./script/bootstrap.py -d --build_debug_libcc
```

Jika script bootstrap terganggu saat menggunakan cache git, itu akan pergi cache terkunci Untuk menghapus kunci, hapus file yang diakhiri dengan `.lock`:

```sh
$ find ~/.chromium-git-cache/ -type f -name '*.lock' -delete
```

Adalah mungkin untuk berbagi direktori ini dengan mesin lain dengan mengekspornya sebagai Bagian SMB di linux, tapi hanya satu proses / mesin yang bisa menggunakan cache di a waktu. Kunci yang dibuat dengan skrip git-cache akan mencoba untuk mencegah hal ini, tapi mungkin saja tidak bekerja sempurna dalam jaringan.

Pada Windows, SMBv2 memiliki cache direktori yang akan menimbulkan masalah dengan git Script cache, jadi perlu untuk menonaktifkannya dengan mengatur kunci registry

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

ke 0. Informasi lebih lanjut: https://stackoverflow.com/a/9935126