# 建置步驟 (Linux)

Follow the guidelines below for building Electron on Linux.

## 系統需求

* 至少 25GB 的磁碟空間及 8GB 的 RAM。
* Python 2.7.x。某些發行版本，例如 CentOS 6.x 還是用 Python 2.6.x。所以請由 `python -V` 確認 Python 的版本。
* Node.js. There are various ways to install Node. You can download source code from [nodejs.org](https://nodejs.org) and compile it. Doing so permits installing Node on your own home directory as a standard user. Or try repositories such as [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 或之後的版本。
* Development headers of GTK+ and libnotify.

在 Ubuntu 上，安將下列程式庫:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

在 RHEL / CentOS 上，安將下列程式庫:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

在 Fedora 上，安將下列程式庫:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Other distributions may offer similar packages for installation via package managers such as pacman. Or one can compile from source code.

## 取得程式碼

```sh
$ git clone https://github.com/electron/electron
```

## Bootstrapping

The bootstrap script will download all necessary build dependencies and create the build project files. You must have Python 2.7.x for the script to succeed. Downloading certain files can take a long time. Notice that we are using `ninja` to build Electron so there is no `Makefile` generated.

```sh
$ cd electron
$ ./script/bootstrap.py --verbose
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
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

## 建置

If you would like to build both `Release` and `Debug` targets:

```sh
$ ./script/build.py
```

This script will cause a very large Electron executable to be placed in the directory `out/R`. 檔案大小超過 1.3GB。 This happens because the Release target binary contains debugging symbols. To reduce the file size, run the `create-dist.py` script:

```sh
$ ./script/create-dist.py
```

This will put a working distribution with much smaller file sizes in the `dist` directory. After running the `create-dist.py` script, you may want to remove the 1.3+ gigabyte binary which is still in `out/R`.

You can also build the `Debug` target only:

```sh
$ ./script/build.py -c D
```

After building is done, you can find the `electron` debug binary under `out/D`.

## 清除

To clean the build files:

```sh
$ npm run clean
```

To clean only `out` and `dist` directories:

```sh
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## 疑難排解

### Error While Loading Shared Libraries: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## 測試

See [Build System Overview: Tests](build-system-overview.md#tests)

## 進階主題

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### 在本機建置 `libchromiumcontent`

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps:

1. 安裝 [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install)
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

假設你把 `clang` 安裝在 `/user/local/bin/clang` 下:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir /usr/local
$ ./script/build.py -c R
```

### 使用 `clang` 以外的編譯器

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

For example building with GCC toolchain:

```sh
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_release_libcc --disable_clang
$ ./script/build.py -c R
```

### 環境變數

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