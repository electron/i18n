# Instrukcje Budowania (Linux)

Follow the guidelines below for building Electron on Linux.

## Wymagania

* At least 25GB disk space and 8GB RAM.
* Python 2.7.x. Some distributions like CentOS 6.x still use Python 2.6.x so you may need to check your Python version with `python -V`.
* Node.js. There are various ways to install Node. You can download source code from [nodejs.org](https://nodejs.org) and compile it. Doing so permits installing Node on your own home directory as a standard user. Spróbuj repozytoriów takich jak [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 lub nowszy.
* Development headers of GTK+ and libnotify.

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

Na Fedora, zainstalować należy poniższe biblioteki:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Inne dystrybucje mogą oferować podobne paczki instalacji przez managery paczek takie jak pacman. Można też kompilować z kodu źródłowego.

## Dostawanie kodu

```sh
$ git clone https://github.com/electron/electron
```

## Bootstrapping

Skrypt bootstrap pobierze wszystkie konieczne zależności budowy i stworzy pliki projektu budowy. Musisz mieć Python 2.7.x, aby skrypt się powiódł. Pobieranie niektórych plików może zająć dużo czasu. Zauważ, że używamy `ninja` do budowy Electron'u, więc żaden `Makefile` nie jest generowany.

```sh
$ cd electron
$ ./script/bootstrap.py --verbose
```

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

And to cross-compile for `arm` or `ia32` targets, you should pass the `--target_arch` parameter to the `bootstrap.py` script:

```sh
$ ./script/bootstrap.py -v --target_arch=arm
```

## Kompilowanie

Jeśli chcesz zbudować oba `Wydanie` i `Debugowanie` celów:

```sh
$ ./script/build.py
```

This script will cause a very large Electron executable to be placed in the directory `out/R`. Rozmiar pliku to ponad 1,3 Gb. Dzieje się tak, ponieważ uwolnienie docelowego pliku binarnego zawiera symbole debugowania. Aby zmniejszyć rozmiar pliku, uruchom skrypt `create-dist.py<0>:</p>

<pre><code class="sh">$ ./script/create-dist.py
`</pre> 

This will put a working distribution with much smaller file sizes in the `dist` directory. After running the `create-dist.py` script, you may want to remove the 1.3+ gigabyte binary which is still in `out/R`.

You can also build the `Debug` target only:

```sh
$ ./script/build.py -c D
```

After building is done, you can find the `electron` debug binary under `out/D`.

## Czyszczenie

Aby wyczyścić pliki kompilacji:

```sh
$ npm działa bez problemu
```

Aby oczyścić tylko `z` i `dist`katalogów:

```sh
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## Rozwiązywanie problemów

### Wystąpił błąd podczas ładowania biblioteki współdzielenia: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Testy

Zobacz [przegląd budowy systemu: Testy](build-system-overview.md#tests)

## Zaawansowane tematy

Domyślne tworzenie konfiguracji jest celem dla głównej dystrybucji pulpitu Linux. Aby zbudować dla konkretnej dystrybucji lub urządzenia, następujące informacje mogą ci pomóc.

### Budowanie `libchromiumcontent`lokalnie

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps:

1. Instaluj [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install)
2. Instaluj [dodatkowe zależności kompilacji](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install-additional-build-dependencies)
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

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can call `bootstrap.py` with `--clang_dir=<path>` switch. Przez pominięcie tego, skrypt budowy założy, że pliki binarne `clang` znajdują się w `<path>/bin/`.

Na przykład jeśli zainstalowałeś `clang` pod `/user/local/bin/clang`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir /usr/local
$ ./script/build.py -c R
```

### Using compilers other than `clang`

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

Na przykład budowanie z GCC toolchain:

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