# Instrukcje Budowania (Linux)

Postępuj zgodnie z wytycznymi poniżej do zbudowania Electrona dla Linuxa.

## Wymagania

* Co najmniej 25GB pamięci dyskowej i 8GB pamięci RAM.
* Python 2.7.x. Niektóre dystrybucje jak CentOS 6.x nadal używają Python 2.6.x, więc może trzeba sprawdzić wersję Pythona przez `python -V`.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
    ```sh
    $ npm run check-tls
    ```
    
    If the script returns that your configuration is using an outdated security protocol, use your system's package manager to update Python to the latest version in the 2.7.x branch. Alternatively, visit https://www.python.org/downloads/ for detailed instructions.

* Node.js. Istnieją różne sposoby instalacji Node. Możesz pobrać kod źródłowy z [nodejs.org](https://nodejs.org) i go skompilować. Ten sposób pozwala na instalowanie Node na swój własny katalog domowy jako użytkownik standardowy. Lub spróbuj repozytoriów takich jak [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).

* [clang](https://clang.llvm.org/get_started.html) 3.4 lub nowszy.
* Nagłówki rozwoju GTK+ i libnotify.

Na Ubuntu zainstalować należy następujące biblioteki:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

Na RHEL / CentOS, zainstaluj następujące biblioteki:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Na Fedorze, zainstalować należy poniższe biblioteki:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Inne dystrybucje mogą oferować podobne paczki instalacji przez managery paczek takie jak pacman. Można też kompilować z kodu źródłowego.

### Kompilacja międzyplatformowa

Jeśli chcesz zbudować dla `arm` należy również zainstalować następujące zależności:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

Podobnie dla `arm64`, zainstalować następujące elementy:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

And to cross-compile for `arm` or `ia32` targets, you should pass the `target_cpu` parameter to `gn gen`:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## Kompilowanie

See [Build Instructions: GN](build-instructions-gn.md)

## Rozwiązywanie problemów

### Wystąpił błąd podczas ładowania biblioteki współdzielenia: libtinfo.so.5

Prekompilowany `clang` będzie próbował powiązać z `libtinfo.so.5`. W zależności od architektury hosta, dowiązanie symboliczne do odpowiednich `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Zaawansowane tematy

Domyślne tworzenie konfiguracji jest celem dla głównej dystrybucji pulpitu Linux. Aby zbudować dla konkretnej dystrybucji lub urządzenia, następujące informacje mogą ci pomóc.

### Using system `clang` instead of downloaded `clang` binaries

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### Używanie kompilatorów innych niż `clang`

Building Electron with compilers other than `clang` is not supported.