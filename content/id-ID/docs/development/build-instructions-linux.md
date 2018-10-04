# Membangun petunjuk (Linux)

Ikuti panduan di bawah ini untuk membangun Elektron di Linux.

## Prasyarat

* Sedikitnya ruang disk 25GB dan RAM 8GB.
* Python 2.7.x. Beberapa distribusi seperti CentOS 6.x masih menggunakan Python 2.6.x jadi Anda mungkin perlu memeriksa versi Python Anda dengan ` python -V `.
    
    Harap pastikan juga bahwa sistem dan versi Python Anda mendukung setidaknya TLS 1.2. Untuk tes cepat, jalankan skrip berikut:
    
    ```sh
    $ npm run check-tls
    ```
    
    Jika skrip mengembalikan bahwa konfigurasi Anda menggunakan protokol keamanan yang ketinggalan jaman, gunakan manajer paket di sistem Anda untuk memperbarui Python ke versi yang terbaru di cabang 2.7.x. Atau, kunjungi https://www.python.org/downloads/ untuk instruksi yang lebih detail.

* Node.js. Ada berbagai cara untuk menginstal Node. Anda dapat mendownload kode sumber dari [nodejs.org](https://nodejs.org) dan mengkompilasinya. Melakukan hal tersebut memungkinkan pemasangan Node di direktori home Anda sendiri sebagai pengguna standar. Atau coba repositori seperti [ NodeSource ](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).

* [berdentang](https://clang.llvm.org/get_started.html) 3.4 atau yang lebih baru.
* Header pengembangan GTK + dan libnotify.

Di Ubuntu, instal pustaka berikut ini:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock
```

Pada RHEL / CentOS, instal pustaka berikut ini:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

Di Fedora, instal pustaka berikut ini:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

Distribusi lainnya mungkin menawarkan paket yang serupa untuk instalasi melalui manajer paket seperti pacman. Atau seseorang bisa mengkompilasi dari source code.

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

And to cross-compile for `arm` or `ia32` targets, you should pass the `target_cpu` parameter to `gn gen`:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## Bangunan

See [Build Instructions: GN](build-instructions-gn.md)

## Penyelesaian masalah

### Kesalahan saat Memuat Perpustakaan Bersama: libtinfo.so.5

Prebuilt ` clang ` akan mencoba untuk link ke ` libtinfo.so.5 `. Bergantung pada arsitektur host, symlink ke sesuai ` libncurses `:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Topik lanjutan

Konfigurasi bangunan default ditargetkan untuk distribusi desktop desktop utama. Untuk membangun distribusi atau perangkat tertentu, informasi berikut mungkin bisa membantu Anda.

### Menggunakan sistem ` clang ` daripada download ` clang ` binari

Secara default Elektron dibangun dengan pembangunan setelahnya [`clang`](https://clang.llvm.org/get_started.html) binari yang disediakan oleh Proyek kromium. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### Menggunakan kompiler selain ` clang `

Building Electron with compilers other than `clang` is not supported.