# 构建步骤 (Linux)

遵循下面的步骤，在 Linux 上构建 Electron.

## 基本要求

* 至少 25GB 硬盘空间 和 8GB 内存.
* Python 2.7.x. 一些发行版如 CentOS 6.x 仍然使用 Python 2.6.x ，所以或许需要 check 你的 Python 版本，使用 `python -V`.
* Node.js. 有多种方法安装 Node.js。 You can download source code from [nodejs.org](http://nodejs.org) and compile it. 也可以作为一个标准的用户在 home 目录下安装 node. 或者尝试使用 [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories) 仓库
* [clang](https://clang.llvm.org/get_started.html) 3.4 or later.
* GTK+ 开发头文件和 libnotify.

在 Ubuntu, 安装下面的库:

```bash
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk2.0-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

在 RHEL / CentOS, 安装下面的库:

```bash
$ sudo yum install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

在 Fedora, 安装下面的库:

```bash
$ sudo dnf install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

其它版本通过包管理器也可能提供了相似的包来安装，例如 pacman. 或一个可以编译的源文件.

## 获取代码

```bash
$ git clone https://github.com/electron/electron
```

## 引导

Bootstrap 脚本也是必须下载的构建依赖，来创建项目文件. 必须使用 Python 2.7.x 来让脚本成功执行. 正确下载文件会花费较长的时间. 注意我们使用的是 `ninja` 来构建 Electron，所以没有生成 `Makefile` 项目.

```bash
$ cd electron
$ ./script/bootstrap.py --verbose
```

### 交叉编译

如果想创建一个 `arm` target ，应当还要下载下面的依赖:

```bash
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

And to cross-compile for `arm` or `ia32` targets, you should pass the `--target_arch` parameter to the `bootstrap.py` script:

```bash
$ ./script/bootstrap.py -v --target_arch=arm
```

## 构建

如果你想要创建 `Release` 、 `Debug` 目标:

```bash
$ ./script/build.py
```

这个脚本也许会在目录 `out/R` 下创建一个巨大的可执行的 Electron. 文件大小或许会超过 1.3 G. 原因是释放的目标二进制文件包含了调试标识. 运行 `create-dist.py` 脚本来减小文件的大小:

```bash
$ ./script/create-dist.py
```

这会在 `dist` 目录下创建一个有大量小文件的工作空间. After running the `create-dist.py` script, you may want to remove the 1.3+ gigabyte binary which is still in `out/R`.

你可以只创建 `Debug` 目标:

```bash
$ ./script/build.py -c D
```

创建完毕, 可以在 `out/D`下面找到 `electron`.

## 清理

清理构建文件:

```bash
$ npm run clean
```

清理 `out` 和 `dist` 目录:

```bash
$ npm run clean-build
```

**注意:** 两个清理命令都需要在构建之前再次运行 `bootstrap`。

## 故障排查

### 加载共享库时出现错误： libtinfo.so.5

预构建的 `clang` 会尝试链接到 `libtinfo.so.5`. 取决于 host 架构, 适当的使用 `libncurses`:

```bash
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## 测试

查看 [构建系统概述: 测试](build-system-overview.md#tests)

## 高级提示

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### 本地编译 `libchromiumcontent`

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps: 1. Install [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install) 2. Install [additional build dependencies](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install-additional-build-dependencies) 3. Fetch the git submodules:

    bash
      $ git submodule update --init --recursive 4. Copy the .gclient config file

    bash
      $ cp vendor/libchromiumcontent/.gclient . 5. Pass the 

`--build_libchromiumcontent` switch to `bootstrap.py` script:

    bash
      $ ./script/bootstrap.py -v --build_libchromiumcontent

Note that by default the `shared_library` configuration is not built, so you can only build `Release` version of Electron if you use this mode:

```bash
$ ./script/build.py -c R
```

### 使用系统提供的 `clang` 替换下载的 `clang` 二进制文件

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can call `bootstrap.py` with `--clang_dir=<path>` switch. By passing it the build script will assume the `clang` binaries reside in `<path>/bin/`.

For example if you installed `clang` under `/user/local/bin/clang`:

```bash
$ ./script/bootstrap.py -v --build_libchromiumcontent --clang_dir /usr/local
$ ./script/build.py -c R
```

### Using compilers other than `clang`

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

For example building with GCC toolchain:

```bash
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_libchromiumcontent --disable_clang
$ ./script/build.py -c R
```

### 环境变量

Apart from `CC` and `CXX`, you can also set following environment variables to custom the building configurations:

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