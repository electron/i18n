# "Build Instructions (Linux)"

Sundin ang mga patnubay sa ibaba para sa pagbuo ng Electron sa Linux.

## Mga Pangunahing Kailangan

* Hindi bababa sa 25GB disk space at 8GB RAM.
* Ang ilang distribusyon ng Python 2.7.x. tulad ng CentOS 6.x ay gumagamit pa rin hanggang ngayon ng Python 2.6.x kaya naman maaaring suriin ang Python version gamit ang `python -V`.
* Node.js. May iba't-ibang paraan upang i-install ang Node. Maaaring "i-download" ang "source code" galing sa [nodejs.org](https://nodejs.org) at ikompayl ito. Ang paggawa nito ay hahayaang "i-install" ang Node sa iyong "home directory" bilang "standard user". Maaari din namang subukan ang mga "repository" tulad ng [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 o mamaya.
* Ang pagpapaunlad ng mga "header" ng GTK+ at libnotify.

Sa Ubuntu, "i-install" ang mga susunod na mga "library":

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

Sa RHEL / CentOS, "i-install" ang mga sumusunod na "library":

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Sa Fedora, "i-install" ang mga sumusunod na mga "library":

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Ang ibang mga distribusyon ay maaaring ipagamit ang parehong "package" para sa "installation" gamit ang "package managers" tulad ng "pacman". Pwede ring ikompayl ang isa galing sa "source code".

## Pagkuha ng code

```sh
$ git clone https://github.com/electron/electron
```

## "Bootstrapping"

Ang bootstrap script ay kinukuha (download) ang lahat ng mahahalagang dependencies at lumilikha ng pagbuo ng proyekto sa files. Para magtagumpay, dapat meron kang Python 2.7.x para sa skrip. Ang "pagda-download" ng mga tiyak na payl ay maaaring tumagal ang pagpoproseso. Kung papansinin, tayo'y gumagamit ng `ninja` upang buuin ang Electron para hindi magkaroon ng `Makefile`.

```sh
$ cd electron
$ ./script/bootstrap.py --verbose
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

### "Cross Compilation"

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

## Pagbuo

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
$ ./script/build.py -c D
```

After building is done, you can find the `electron` debug binary under `out/D`.

## Paglilinis

Upang malinis ang binubuong files:

```sh
$ npm run clean
```

Na maglilinis lamang ng mga direktoryong `out` at `dist`:

```sh
$ npm run clean-build
```

Paalala: Ang parehong codes para sa paglilinis ay kailangang muling pinatatakbo ng `bootstrap</strong> bago mabuo.</p>

<h2>Paghahanap ng Problema</h2>

<h3>Mga Mali na Maaaring Lumabas Habang ang "Shared Libraries" ay "Loading": libtinfo.so.5</h3>

<p>Prebuilt <code>clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Mga Pagsusuri

Tingnan ang [ Buod ng Pagbuo ng Sistema: Mga Pagsusuri ](build-system-overview.md#tests)

## Mga Pinatiunang Paksa

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Ang pagbuo ng lokal na `libchromiumcontent`

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps:

1. "I-install" ang [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install)
2. "I-install" ang [additional build dependencies](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install-additional-build-dependencies)
3. Kunin ang "git submodules":

```sh
$ git submodule update --init --recursive
```

1. Ipasa ang `--build_release_libcc` at pagpalitin sa skrip na `bootstrap.py`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc
```

Note that by default the `shared_library` configuration is not built, so you can only build `Release` version of Electron if you use this mode:

```sh
$ ./script/build.py -c R
```

### Gamitin ang sistema ng `clang` sa halip na "downloaded `clang` binaries"

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can call `bootstrap.py` with `--clang_dir=<path>` switch. By passing it the build script will assume the `clang` binaries reside in `<path>/bin/`.

For example if you installed `clang` under `/user/local/bin/clang`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir /usr/local
$ ./script/build.py -c R
```

### Gamit ang kompayler kaysa sa `clang`

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

For example building with GCC toolchain:

```sh
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_release_libcc --disable_clang
$ ./script/build.py -c R
```

### "Environment Variables"

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