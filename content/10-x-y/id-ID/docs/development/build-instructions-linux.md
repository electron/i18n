# Bangun Instruksi (Linux)

Ikuti panduan di bawah ini untuk membangun Elektron di Linux.

## Prasyarat

* Sedikitnya ruang disk 25GB dan RAM 8GB.
* Python 2.7.x. Some distributions like CentOS 6.x still use Python 2.6.x so you may need to check your Python version with `python -V`.

  Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:

  ```sh
  $ npx @electron/check-python-tls
  ```

  Jika skrip mengembalikan bahwa konfigurasi Anda menggunakan protokol keamanan yang ketinggalan jaman, gunakan manajer paket di sistem Anda untuk memperbarui Python ke versi yang terbaru di cabang 2.7.x. Atau, kunjungi https://www.python.org/downloads/ untuk instruksi yang lebih detail.

* Node.js. Ada berbagai cara untuk menginstal Node. Anda dapat mendownload kode sumber dari [nodejs.org](https://nodejs.org) dan mengkompilasinya. Melakukan hal tersebut memungkinkan pemasangan Node di direktori home Anda sendiri sebagai pengguna standar. Atau coba repositori seperti [ NodeSource ](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [berdentang](https://clang.llvm.org/get_started.html) 3.4 atau yang lebih baru.
* Pemimpin pengembangan GTK 3 dan libnotify.

Di Ubuntu, instal pustaka berikut ini:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock openjdk-8-jre
```

Pada RHEL / CentOS, instal pustaka berikut ini:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

Di Fedora, instal pustaka berikut ini:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

Other distributions may offer similar packages for installation via package managers such as pacman. Or one can compile from source code.

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

Dan untuk mengkompilasi silang target ` arm ` atau ` ia32 `, Anda harus meneruskan parameter ` target_cpu ` ke ` gn gen `:

```sh
$ gn gen out/Testing --args='import(...) target_cpu="arm"'
```

## Bangunan

Lihat [Build Instructions: GN](build-instructions-gn.md)

## Penyelesaian masalah

### Kesalahan saat Memuat Perpustakaan Bersama: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Topik lanjutan

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Menggunakan sistem ` clang ` daripada download ` clang ` binari

Secara default Elektron dibangun dengan pembangunan setelahnya [`clang`](https://clang.llvm.org/get_started.html) binari yang disediakan oleh Proyek kromium. Jika karena alasan tertentu Anda ingin membangun dengan ` clang ` terpasang di sistem Anda, Anda dapat menentukan argumen ` clang_base_path ` di GN args.

Misalnya bila anda memeasang `clang` di bawah `/usr/local/bin/clang`:

```sh
$ gn gen out/Testing --args='import("//electron/build/args/testing.gn") clang_base_path = "/usr/local/bin"'
```

### Menggunakan kompiler selain ` clang `

Membangun Electron dengan kompiler selain `clang` tidak didukung.
