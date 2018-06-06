# 构建步骤（Linux）

遵循下面的步骤，在 Linux 上构建 Electron.

## 基本要求

* 至少 25GB 硬盘空间 和 8GB 内存.
* Python 2.7.x. 一些发行版如 CentOS 6.x 仍然使用 Python 2.6.x ，所以或许需要 check 你的 Python 版本，使用 `python -V`.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
    ```sh
    $ python ./script/tls.py
    ```
    
    If the script returns that your configuration is using an outdated security protocol, use your system's package manager to update Python to the latest version in the 2.7.x branch. 或者，您也可以访问ttps://www.python.org/downloads/，以获取更加详细的指导信息。

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

如果想创建一个 `arm` target ，应当还要下载下面的依赖:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

类似地，对于 `arm64` 平台，请安装下列内容：

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

若要为 `arm` 或 `ia32` 平台的目标设备交叉编译，您应当为 `bootstrap.py` 脚本使用 `--target_arch` 参数：

```sh
$ ./script/bootstrap.py -v --target_arch=arm
```

## 构建

如果你想要创建 `Release` 、 `Debug` 目标:

```sh
$ ./script/build.py
```

这个脚本也许会在目录 `out/R` 下创建一个巨大的可执行的 Electron. 文件大小或许会超过 1.3 G. 原因是释放的目标二进制文件包含了调试标识. 运行 `create-dist.py` 脚本来减小文件的大小:

```sh
$ ./script/create-dist.py
```

这会在 `dist` 目录下创建一个有大量小文件的工作空间. 运行 `create-dist.py` 脚本后，您可能想要删除仍在 `out/R` 的 1.3+ GiB 的二进制文件。

你可以只创建 `Debug` 目标:

```sh
$ ./script/build.py -c D
```

创建完毕, 可以在 `out/D`下面找到 `electron`.

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

预构建的 `clang` 会尝试链接到 `libtinfo.so.5`. 取决于 host 架构, 适当的使用 `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## 测试

查看 [构建系统概述: 测试](build-system-overview.md#tests)

## 高级提示

默认的构建配置针对的是主流的桌面 Linux 发行版。若要为特定的发行版或设备构建，以下信息可能会对您有所帮助。

### 本地编译 `libchromiumcontent`

若要避免使用 ` libchromiumcontent` 的预生成二进制文件, 可以在本地构建 `libchromiumcontent`。 为此, 请按照下列步骤操作:

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

注意默认情况下不会以 `shared_library` 方式编译, 所以你如果使用以下模式的话, 只能编译 Electron的 `Release` 版本:

```sh
$ ./script/build.py -c R
```

### 使用系统提供的 `clang` 替换下载的 `clang` 二进制文件

默认情况下, Electron 是由 Chromium 项目提供的预生成的 [`clang`](https://clang.llvm.org/get_started.html) 二进制文件构建的。 如果基于某些原因你想要使用已经安装到系统的 `clang` 进行编译, 可以给 `bootstrap.py` 传递 `--clang_dir=<path>` 参数来指定 `clang` 安装路径. 上面参数告诉编译脚本, `clang` 程序在目录 `<path>/bin/` 下.

假设你的 `clang` 安装路径为 `/user/local/bin/clang`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir /usr/local
$ ./script/build.py -c R
```

### 使用 `clang` 之外的其它编译器

要使用其他编译器 如: `g++` 编译 Electron, 首先需要使用参数 `--disable_clang` 禁用 `clang`, 然后设置 `CC` 及 `CXX` 环境变量.

假设使用 GCC 工具链:

```sh
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_release_libcc --disable_clang
$ ./script/build.py -c R
```

### 环境变量

除了 `CC` 及 `CXX`, 你还可以设置以下环境变量来自定义编译配置:

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

以上环境变量需要在执行 `bootstrap.py` 前设置, 在执行 `build.py` 的时候再设置将无效.