# Bangun Instruksi (Linux)

Ikuti panduan di bawah ini untuk membangun Elektron di Linux.

## Prasyarat

* Sedikitnya ruang disk 25GB dan RAM 8GB.
* Python 2.7.x. Beberapa distribusi seperti CentOS 6.x masih menggunakan Python 2.6.x jadi Anda mungkin perlu memeriksa versi Python Anda dengan ` python -V `.
* Node.js Ada berbagai cara untuk menginstal Node. Kamu bisa mengunduh source code dari [ nodejs.org ](http://nodejs.org) dan kompilasi. Melakukan hal tersebut memungkinkan pemasangan Node di direktori home Anda sendiri sebagai pengguna standar. Atau coba repositori seperti [ NodeSource ](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [berdentang](https://clang.llvm.org/get_started.html) 3.4 atau yang lebih baru.
* Header pengembangan GTK + dan libnotify.

Di Ubuntu, instal pustaka berikut ini:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk2.0-dev \ 
libnotify-dev libgnome-keyring-dev libgconf2-dev \
libasound2-dev libcap-dev libcups2-dev libxtst-dev \
libxss1 libnss3-dev gcc-multilib g ++ - multilib curl \
gperf bison
```

Pada RHEL / CentOS, instal pustaka berikut ini:

```sh
$ sudo yum install clang dbus-devel gtk2-devel libnotify-devel \
libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
GConf2-devel nss-devel
```

Di Fedora, instal pustaka berikut ini:

```sh
$ sudo yum install clang dbus-devel gtk2-devel libnotify-devel \
libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
GConf2-devel nss-devel
```

Distribusi lainnya mungkin menawarkan paket yang serupa untuk instalasi melalui manajer paket seperti pacman. Atau seseorang bisa mengkompilasi dari source code.

## Mendapatkan kode

```sh
$ git klon https://github.com/electron/electron
```

## Bootstrap

Script bootstrap akan mendownload semua dependensi build yang diperlukan dan membuat file proyek build. Anda harus memiliki Python 2.7.x agar naskahnya berhasil. Mengunduh file tertentu bisa memakan waktu lama. Perhatikan bahwa kami menggunakan ` ninja ` untuk membangun Elektron sehingga tidak ada ` Makefile ` yang dihasilkan.

```sh
$ cd elektron
$ ./script/bootstrap.py --verbose
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

## Membangun

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

## Pembersihan

Untuk membersihkan membangun file:

```sh
$ npm bersih
```

Untuk membersihkan hanya ` keluar ` dan ` dist ` direktori:

```sh
$ npm bersih
```

** Catatan: ** Kedua perintah bersih mengharuskan menjalankan ` bootstrap ` lagi sebelum membangun.

## Penyelesaian masalah

### Kesalahan saat Memuat Perpustakaan Bersama: libtinfo.so.5

Prebuilt ` clang ` akan mencoba untuk link ke ` libtinfo.so.5 `. Bergantung pada arsitektur host, symlink ke sesuai ` libncurses `:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Pengujian

Lihat [ Bangun Ikhtisar Sistem: Pengujian ](build-system-overview.md#tests)

## Topik lanjutan

Konfigurasi bangunan default ditargetkan untuk distribusi desktop desktop utama. Untuk membangun distribusi atau perangkat tertentu, informasi berikut mungkin bisa membantu Anda.

### Membangun ` libchromiumcontent ` secara lokal

Untuk menghindari penggunaan binari prebuilt dari ` libchromiumcontent `, Anda dapat membangun ` libchromiumcontent ` secara lokal. Untuk melakukannya, ikuti langkah-langkah ini:

1. Menginstal [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install)
2. Install [additional build dependencies](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install-additional-build-dependencies)
3. Fetch the git submodules:

```sh
$ git submodule update --init --recursive
```

1. Pass the `--build_release_libcc` switch to `bootstrap.py` script:

```sh
$ ./script/bootstrap.py -v --build_release_libcc
```

Note that by default the `shared_library` configuration is not built, so you can only build `Release` version of Electron if you use this mode:

```sh
$ ./script/build.py -c R
```

### Using system `clang` instead of downloaded `clang` binaries

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can call `bootstrap.py` with `--clang_dir=<path>` switch. By passing it the build script will assume the `clang` binaries reside in `<path>/bin/`.

For example if you installed `clang` under `/user/local/bin/clang`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir /usr/local
$ ./script/build.py -c R
```

### Using compilers other than `clang`

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

For example building with GCC toolchain:

```sh
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_release_libcc --disable_clang
$ ./script/build.py -c R
```

### Environment variables

Apart from `CC` and `CXX`, you can also set the following environment variables to customise the build configuration:

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

The environment variables have to be set when executing the `bootstrap.py` script, it won't work in the `build.py` script.