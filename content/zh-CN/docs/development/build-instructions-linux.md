# 构建步骤（Linux）

遵循下面的步骤，在 Linux 上构建 Electron.

## 基本要求

* 至少 25GB 硬盘空间 和 8GB 内存.
* Python 2.7.x. 一些发行版如 CentOS 6.x 仍然使用 Python 2.6.x ，所以或许需要 check 你的 Python 版本，使用 `python -V`.
* Node.js. 有多种方法安装 Node.js。 您可以从 [ Nodejs.org ](https://nodejs.org) 下载源代码并进行编译。 也可以作为一个标准的用户在 home 目录下安装 node. 或者尝试使用 [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories) 仓库
* [ clang ](https://clang.llvm.org/get_started.html) 3.4 或更高版本。
* GTK+ 开发头文件和 libnotify.

在 Ubuntu, 安装下面的库:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

在 RHEL / CentOS, 安装下面的库:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

在 Fedora, 安装下面的库:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

其它版本通过包管理器也可能提供了相似的包来安装，例如 pacman. 或一个可以编译的源文件.

## 获取代码

```sh
$ git clone https://github.com/electron/electron
```

## 引导

引导脚本将会下载全部必要的构建依赖，并创建和构建项目文件。 必须使用 Python 2.7.x 来让脚本成功执行. 正确下载文件会花费较长的时间. 注意我们使用的是 `ninja` 来构建 Electron，所以没有生成 `Makefile` 项目.

```sh
$ cd electron
$ ./script/bootstrap.py --verbose
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

### 交叉编译

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

## 构建

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

## 清理

清理构建文件:

```sh
$ npm run clean
```

清理 `out` 和 `dist` 目录:

```sh
$ npm run clean-build
```

**注意:** 两个清理命令都需要在构建之前再次运行 `bootstrap`。

## 故障排查

### 加载共享库时出现错误： libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## 测试

查看 [构建系统概述: 测试](build-system-overview.md#tests)

## 高级提示

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### 本地编译 `libchromiumcontent`

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps:

1. 安装 [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install)
2. 安装 [其他生成依赖项](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install-additional-build-dependencies)
3. 获取(fetch) git 子模块(submodules)：

```sh
$ git submodule update --init --recursive
```

1. 将 `--build_release_libcc` 传给 `bootstrap.py` 脚本:

```sh
$ ./script/bootstrap.py -v --build_release_libcc
```

Note that by default the `shared_library` configuration is not built, so you can only build `Release` version of Electron if you use this mode:

```sh
$ ./script/build.py -c R
```

### 使用系统提供的 `clang` 替换下载的 `clang` 二进制文件

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can call `bootstrap.py` with `--clang_dir=<path>` switch. By passing it the build script will assume the `clang` binaries reside in `<path>/bin/`.

For example if you installed `clang` under `/user/local/bin/clang`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir /usr/local
$ ./script/build.py -c R
```

### 使用 `clang` 之外的其它编译器

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

For example building with GCC toolchain:

```sh
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_release_libcc --disable_clang
$ ./script/build.py -c R
```

### 环境变量

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