# Membangun petunjuk (Linux)

Ikuti panduan di bawah ini untuk membangun Elektron di Linux.

## Prasyarat

* Sedikitnya ruang disk 25GB dan RAM 8GB.
* Python 2.7.x. Beberapa distribusi seperti CentOS 6.x masih menggunakan Python 2.6.x jadi Anda mungkin perlu memeriksa versi Python Anda dengan ` python -V `.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
    ```sh
    $ python ./script/tls.py
    ```
    
    If the script returns that your configuration is using an outdated security protocol, use your system's package manager to update Python to the latest version in the 2.7.x branch. Alternatively, visit https://www.python.org/downloads/ for detailed instructions.

* Node.js. Ada berbagai cara untuk menginstal Node. Anda dapat mendownload kode sumber dari [nodejs.org](https://nodejs.org) dan mengkompilasinya. Melakukan hal tersebut memungkinkan pemasangan Node di direktori home Anda sendiri sebagai pengguna standar. Atau coba repositori seperti [ NodeSource ](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).

* [berdentang](https://clang.llvm.org/get_started.html) 3.4 atau yang lebih baru.
* Header pengembangan GTK + dan libnotify.

Di Ubuntu, instal pustaka berikut ini:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

Pada RHEL / CentOS, instal pustaka berikut ini:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
GConf2-devel nss-devel
```

Di Fedora, instal pustaka berikut ini:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
GConf2-devel nss-devel
```

Distribusi lainnya mungkin menawarkan paket yang serupa untuk instalasi melalui manajer paket seperti pacman. Atau seseorang bisa mengkompilasi dari source code.

## Dapatkan kode

```sh
$ git klon https://github.com/electron/electron
```

## Bootstrapping

Skrip bootstrap akan men-download semua dependensi diperlukan membangun dan menciptakan membangun project file. Anda harus memiliki Python 2.7.x agar naskahnya berhasil. Mengunduh file tertentu bisa memakan waktu lama. Perhatikan bahwa kami menggunakan ` ninja ` untuk membangun Elektron sehingga tidak ada ` Makefile ` yang dihasilkan.

```sh
$ cd elektron
$ ./script/bootstrap.py --verbose
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

### Kompilasi silang

Jika Anda ingin membangun target ` lengan ` Anda juga harus menginstal dependensi berikut ini:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                         g ++ - arm-linux-gnueabihf
```

Demikian pula untuk ` arm64 `, instal yang berikut ini:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                         g ++ - aarch64-linux-gnu
```

Dan untuk mengkompilasi silang target ` lengan ` atau ` ia32 `, Anda harus melewati parameter ` - target_arch ` ke ` bootstrap.py ` script:

```sh
$ ./script/bootstrap.py -v --target_arch=lengan
```

## Bangunan

Jika Anda ingin membangun target ` Release ` dan ` Debug `:

```sh
$ ./script/build.py
```

Script ini akan menyebabkan Elektron sangat besar dieksekusi untuk ditempatkan di direktori ` keluar / R `. Ukuran file lebih dari 1,3 gigabyte. Ini Terjadi karena biner target rilis berisi simbol debugging. Untuk mengurangi ukuran file, jalankan script ` create-dist.py `:

```sh
$ ./script/create-dist.py
```

Ini akan menempatkan distribusi kerja dengan ukuran file yang jauh lebih kecil di direktori ` dist `. Setelah menjalankan script ` create-dist.py `, Anda mungkin ingin menghapus binari 1.3 + gigabyte yang masih di ` keluar / R `.

Anda juga dapat membangun target ` Debug ` saja:

```sh
$ ./script/build.py
```

Setelah selesai, Anda bisa menemukan biner debug ` elektron ` di bawah ` keluar / D `.

## Membersihkan

Untuk membersihkan bangunan file:

```sh
$ npm bersih
```

Untuk pembersihan hanya `keluar` dan `dist` direktori:

```sh
$ npm berjalan bersih-bangun
```

**Catatan:** Kedua perintah bersih perlu menjalankan `bootstrap` lagi sebelum membangun.

## Penyelesaian masalah

### Kesalahan saat Memuat Perpustakaan Bersama: libtinfo.so.5

Prebuilt ` clang ` akan mencoba untuk link ke ` libtinfo.so.5 `. Bergantung pada arsitektur host, symlink ke sesuai ` libncurses `:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Uji

Lihat [Bangun Gambaran Sistem: Pengujian](build-system-overview.md#tests)

## Topik lanjutan

Konfigurasi bangunan default ditargetkan untuk distribusi desktop desktop utama. Untuk membangun distribusi atau perangkat tertentu, informasi berikut mungkin bisa membantu Anda.

### Membangun ` libchromiumcontent ` secara lokal

Untuk menghindari penggunaan binari setelah pembangunan dari `libchromiumcontent`, Anda dapat membangun `libchromiumcontent` secara lokal. Untuk melakukannya, ikuti langkah-langkah ini:

1. Menginstal [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install)
2. Install [ tambahan build dependencies ](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install-additional-build-dependencies)
3. Ambil submodul git:

```sh
$ git submodule update --init --recursive
```

1. Pass ` - build_release_libcc ` beralih ke script ` bootstrap.py `:

```sh
$ ./script/bootstrap.py -v --build_release_libcc
```

Perhatikan bahwa secara default konfigurasi ` shared_library ` tidak dibangun, jadi Anda hanya bisa membuat versi Elemen ` Release ` dari Elektron jika Anda menggunakan mode ini:

```sh
$ ./script/build.py -c R
```

### Menggunakan sistem ` clang ` daripada download ` clang ` binari

Secara default Elektron dibangun dengan pembangunan setelahnya [`clang`](https://clang.llvm.org/get_started.html) binari yang disediakan oleh Proyek kromium. Jika karena alasan tertentu Anda ingin membangun dengan `clang` terinstal di dalam sistem Anda, Anda dapat memanggil `bootstrap.py`with`--clang_dir=<path>` beralih. Dengan melewatkannya, skrip yang sedang dibangun akan mengasumsikan biner `clang` berada di `<path>/bin/`.

Sebagai contoh jika Anda menginstal ` clang ` di bawah ` / user / local / bin / clang `:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir / usr / local
$ ./script/build.py -c R
```

### Menggunakan kompiler selain ` clang `

Untuk membangun Elektron dengan kompiler seperti ` g ++ `, Anda harus menonaktifkan ` clang ` dengan ` - disable_clang ` terlebih dulu, lalu set ` CC ` dan ` CXX ` variabel lingkungan ke yang Anda inginkan.

Misalnya bangunan dengan GCC toolchain:

```sh
$ env CC = gcc CXX = g ++ ./script/bootstrap.py -v --build_release_libcc --disable_clang 
$ ./script/build.py -c R
```

### Variabel Lingkungan

Selain ` CC ` dan ` CXX `, Anda juga dapat mengatur variabel lingkungan berikut untuk menyesuaikan konfigurasi pembuatan:

* `CPPFLAGS`
* `CPPFLAGS_host`
* `CFLAGS`
* `CFLAGS_host`
* `CXXFLAGS`
* `CXXFLAGS_host`
* `AR`
* `AR_host`
* `CC`
* `CC_host`
* `CXX`
* `CXX_host`
* `LDFLAGS`

Variabel lingkungan harus ditetapkan saat menjalankan script ` bootstrap.py `, variabel tidak akan bekerja di script ` build.py `.