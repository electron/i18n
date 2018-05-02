# Membangun petunjuk (Linux)

Ikuti panduan di bawah ini untuk membangun Elektron di Linux.

## Prasyarat

* Sedikitnya ruang disk 25GB dan RAM 8GB.
* Python 2.7.x. Beberapa distribusi seperti CentOS 6.x masih menggunakan Python 2.6.x jadi Anda mungkin perlu memeriksa versi Python Anda dengan ` python -V `.
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

If you want to build for an `arm` target you should also install the following dependencies:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

Similarly for `arm64`, install the following:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

And to cross-compile for `arm` or `ia32` targets, you should pass the `--target_arch` parameter to the `bootstrap.py` script:

```sh
$ ./script/bootstrap.py -v --target_arch=arm
```

## Bangunan

If you would like to build both `Release` and `Debug` targets:

```sh
$ ./script/build.py
```

This script will cause a very large Electron executable to be placed in the directory `out/R`. The file size is in excess of 1.3 gigabytes. This happens because the Release target binary contains debugging symbols. To reduce the file size, run the `create-dist.py` script:

```sh
$ ./script/create-dist.py
```

This will put a working distribution with much smaller file sizes in the `dist` directory. After running the `create-dist.py` script, you may want to remove the 1.3+ gigabyte binary which is still in `out/R`.

You can also build the `Debug` target only:

```sh
$ ./script/build.py
```

After building is done, you can find the `electron` debug binary under `out/D`.

## Membersihkan

Untuk membersihkan membangun file:

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

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Uji

Lihat [Bangun Gambaran Sistem: Pengujian](build-system-overview.md#tests)

## Topik lanjutan

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Membangun ` libchromiumcontent ` secara lokal

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps:

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

Note that by default the `shared_library` configuration is not built, so you can only build `Release` version of Electron if you use this mode:

```sh
$ ./script/build.py -c R
```

### Menggunakan sistem ` clang ` daripada download ` clang ` binari

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can call `bootstrap.py` with `--clang_dir=<path>` switch. By passing it the build script will assume the `clang` binaries reside in `<path>/bin/`.

For example if you installed `clang` under `/user/local/bin/clang`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir /usr/local
$ ./script/build.py -c R
```

### Menggunakan kompiler selain ` clang `

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

For example building with GCC toolchain:

```sh
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_release_libcc --disable_clang
$ ./script/build.py -c R
```

### Variabel Lingkungan

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