# Instrucțiuni de generare (Windows)

Urmaţi instrucţiunile de mai jos pentru construirea Electron cu Linux.

## Cerințe preliminare

* Cel puțin 25GB pe disc și 8GB RAM.
* Python 2.7.x. Unele distribuții, ar fi CentOS 6.x, utilizează în continuare Python 2.6.x, astfel încât poate fi necesar să verificați versiunea Python cu `python -V`.

  De asemenea, asigurați-vă că sistemul și versiunea Python acceptă cel puțin TLS 1.2. Pentru un test rapid, executați următorul script:

  ```sh
  $ npx @electron/check-python-tls
  ```

  Dacă scriptul returnează că configurația utilizează un protocol de securitate depășit, utilizați managerul de pachete al sistemului pentru a actualiza Python la cea mai recentă versiune din ramura 2.7.x. Alternativ, vizitați https://www.python.org/downloads/ pentru instrucțiuni detaliate.

* Node.js. Există diferite moduri de a instala Node. Aveți posibilitatea să descărcați cod sursă de la [nodejs.org](https://nodejs.org) și să-l compilați. Acest lucru permite instalarea Node pe propriul director de acasă ca un utilizator standard. Sau încercaţi depozite cum ar fi [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 sau mai târziu.
* Antete de dezvoltare ale GTK 3 şi libnotify.

Pe Ubuntu, instalați următoarele biblioteci:

```sh
$ sudo apt-get instalare clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxs1 libnss3-dev gcc-multilib g+--multilib curl \
                       gperf bison python-dsmock openjdk-8-jre
```

Pe RHEL / CentOS, instalați următoarele biblioteci:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cupe-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

În Fedora, instalați următoarele biblioteci:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

On Arch Linux / Manjaro, install the following libraries:

```sh
$ sudo pacman -Syu base-devel clang libdbus gtk2 libnotify \
                   libgnome-keyring alsa-lib libcap libcups libxtst \
                   libxss nss gcc-multilib curl gperf bison \
                   python2 python-dbusmock jdk8-openjdk
```

Other distributions may offer similar packages for installation via package managers such as pacman. Or one can compile from source code.

### Compilație încrucișată

Dacă vrei să construiești pentru o țintă de `braț` ar trebui să instalezi și următoarele dependențe:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

Similarly for `arm64`, install the following:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

And to cross-compile for `arm` or `ia32` targets, you should pass the `target_cpu` parameter to `gn gen`:

```sh
$ gn gen out/Testing --args='import(...) target_cpu="arm"'
```

## Building

See [Build Instructions: GN](build-instructions-gn.md)

## Depanare

### Error While Loading Shared Libraries: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Subiecte complexe

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Using system `clang` instead of downloaded `clang` binaries

În mod implicit, Electron este construit cu fișiere binare prebuilt [`clang`](https://clang.llvm.org/get_started.html) furnizate de proiectul Chromium. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

```sh
$ gn gen out/Testing --args='import("//electron/build/args/testing.gn") clang_base_path = "/usr/local/bin"'
```

### Using compilers other than `clang`

Building Electron with compilers other than `clang` is not supported.
