# Istruzioni per la compilazione (Linux)

Segui le seguenti linee guida per compilare Electron su Linux.

## Prerequisiti

* Almeno 25 GB di spazio su disco e 8 GB di RAM.
* Python 2.7.x. Alcune distribuzioni, come ad esempio CentOS 6.x, utilizzano ancora Python 2.6.x potresti quindi avere la necessità di controllare la versione di Python installata con `python -V`.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
    ```sh
    $ npm run check-tls
    ```
    
    If the script returns that your configuration is using an outdated security protocol, use your system's package manager to update Python to the latest version in the 2.7.x branch. Alternatively, visit https://www.python.org/downloads/ for detailed instructions.

* Node.js. Ci sono diversi modi per installare Node. Puoi scaricare i sorgenti da [nodejs.org](https://nodejs.org) e compilarli. Ciò consente di installare Node nella propria home directory come utente standard. O puoi scaricarlo da un repository come ad esempio [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).

* [clang](https://clang.llvm.org/get_started.html) 3.4 o successiva.
* Headers di sviluppo per GTK+ e libnotify.

Su Ubuntu, installa le seguenti librerie:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock
```

Su RHEL / CentOS, installa le seguenti librerie:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

Su Fedora, installa le seguenti librerie:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

Altre distribuzioni possono offrire pacchetti simili per l'installazione tramite gestori di pacchetti come pacman. Oppure si possono compilare dai sorgenti.

### Cross compilation

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

And to cross-compile for `arm` or `ia32` targets, you should pass the `target_cpu` parameter to `gn gen`:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## Building

See [Build Instructions: GN](build-instructions-gn.md)

## Risoluzione dei problemi

### Error While Loading Shared Libraries: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Advanced topics

La configurazione di costruzione predefinita è destinata alle principali distribuzioni Linux desktop. Per creare una distribuzione o un dispositivo specifico, le seguenti informazioni potrebbero essere di aiuto.

### Using system `clang` instead of downloaded `clang` binaries

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### Using compilers other than `clang`

Building Electron with compilers other than `clang` is not supported.