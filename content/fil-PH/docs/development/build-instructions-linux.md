# "Build Instructions (Linux)"

Sundin ang mga patnubay sa ibaba para sa pagbuo ng Electron sa Linux.

## Mga Pangunahing Kailangan

* Hindi bababa sa 25GB disk space at 8GB RAM.
* Python 2.7.x. Ilang mga distribusyon tulad ng CentOS 6.x ay gumagamit pa rin ng Python 2.6.x kaya maaaring kailanganing suriin ang iyong Python version kasama ang `python -V`.
* Node.js. May iba't-ibang paraan upang i-install ang Node. Maaaring kunin o i-download ang source code galing sa [nodejs.org](https://nodejs.org) at i-compile ito. Ang paggawa nito ay hinahayaang i-install ang Node sa sarili nitong home directory bilang pamantayan ng gumagamit o user. O subukan ang mga repository tulad ng [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 o mamaya.
* Ang pagpapaunlad ng mga header ng GTK+ at libnotify.

Sa Ubuntu, i-install ang mga susunod na mga library:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk2.0-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

Sa RHEL / CentOS, i-install ang mga sumusunod na library:

```sh
$ sudo yum install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Sa Fedora, i-install ang mga sumusunod na mga library:

```sh
$ sudo dnf install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Ang ibang mga distribution ay maaaring ialok ang parehong mga package para sa installation gamit ang package managers tulad ng pacman. O ang isa ay maaaring i-compile galing sa cource code.

## Ang Pagkuha ng Code

```sh
$ git clone https://github.com/electron/electron
```

## Bootstrapping

Ang bootstrap script ay kinukuha o dina-download ang lahat ng kailangang build dependencies at nililikha ang build project files. Kailangan mo ng Python 2.7.x para sa skrip upang magtagumpay. Ang pagda-download ng mga tiyak na file ay maaaring tumagal ang pagproseso. Pansinin na tayo'y gumagamit ng `ninja` upang buuin ang Electron para walang mabuo na `Makefile`.

```sh
$ cd electron
$ ./script/bootstrap.py --verbose
```

### Cross compilation

Kung nais nating bumuo para sa `arm` target, dapat din nating i-install ang mga sumusunod na dependency:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

Gayundin para sa `arm64`, kailangang i-install ang mga sumusunod:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

At para mai-cross-compile ang `arm` o `ia32` targets, kailangan mong idaan ang parameter na `--target_arch` sa skrip na `bootstrap.py`:

```sh
$ ./script/bootstrap.py -v --target_arch=arm
```

## Ang Pagbubuo

Kung ninanais mong layunin ay bumuo ng parehong `Release` at `Debug`:

```sh
$ ./script/build.py
```

Ang skrip na ito ang magiging dahilan upang mapalabas o maipakita ang napakalaking Electron na ilalagay sa loob ng directory ng `out/R`. Ang sukat ng file ay lagpas sa 1.3 gigabytes. Ito ay mangyayari dahil ang Release target binary ay naglalaman ng mga simbolo ng debugging. Upang mabawasan ang sukat ng file, patakbuhin ang skrip na `create-dist.py`:

```sh
$ ./script/create-dist.py
```

Itatakda nito ang working distribution na may mas maliit ng sukat ng file sa loob ng directory ng `dist`. Matapos paganahin ang skrip na `create-dist.py`, maaaring naisin mo na tanggalin ang 1.3+ gigabyte binary na nasa loob pa rin ng `out/R`.

Maaari ka ring bumuo lamang ng `Debug` target:

```sh
$ ./script/build.py -c D
```

Matapos itong buuin, hanapin ang `electron` debug binary sa ilalim ng `out/D`.

## Ang Paglilinis

Upang malinis ang binubuong mga file:

```sh
$ npm run clean
```

Na maglilinis lamang ng mga direktoryong `out` at `dist`:

```sh
$ npm run clean-build
```

Paalala: Ang parehong codes para sa paglilinis ay kailangang muling pinatatakbo ng `bootstrap</strong> bago mabuo.</p>

<h2>Troubleshooting</h2>

<h3>Error While Loading Shared Libraries: libtinfo.so.5</h3>

<p>Prebuilt <code>clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Tests

Tingnan ang [ Buod ng Pagbuo ng Sistema: Mga Pagsusuri ](build-system-overview.md#tests)

## Advanced topics

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Building `libchromiumcontent` locally

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps:

1. Install [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install)
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