# 构建步骤 (Linux)

<<<<<<< HEAD
遵循下面的步骤，在 Linux 上构建 Electron .
=======
按照以下指南以在 Linux 上构建Electron。
>>>>>>> electron/master

## 基本须求

<<<<<<< HEAD
* 至少 25GB 硬盘空间 和 8GB 内存.
* Python 2.7.x.  一些发行版如 CentOS 6.x 仍然使用 Python 2.6.x ，所以或许需要 check 你的 Python 版本，使用 `python -V`.
* Node.js. 有很多方法来安装 Node. 可以从 [Node.js](http://nodejs.org)下载原文件并且编译它 .也可以作为一个标准的用户在 home 目录下安装 node . 或者尝试使用仓库 [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* Clang 3.4 或更新的版本.
* GTK+ 开发头文件和 libnotify.
=======
* 至少 25 GB 的硬碟空间和 8 GB RAM。
* Python 2.7.x。一些像 CentOS 6.x 的分发仍然使用 Python 2.6.x，因此您可能需要以 `python-V`检查您的 Python 版本。
* Node.js. 有多种方法安装 Node.js。 您可以从 [Node.js](http://nodejs.org) 下载从源代码然后从源代码进行编译。 Doing so permits installing Node on your own home directory as a standard user. Or try repositories such as [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* Clang 3.4 or later.
* Development headers of GTK+ and libnotify.
>>>>>>> electron/master

在 Ubuntu, 安装下面的库 :

```bash
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk2.0-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

在 RHEL / CentOS, 安装下面的库 :

```bash
$ sudo yum install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

在 Fedora, 安装下面的库 :

```bash
$ sudo dnf install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

其它版本通过包管理器也可能提供了相似的包来安装，例如 pacman. 或一个可以编译的源文件.

## 获取代码

```bash
$ git clone https://github.com/electron/electron.git
```

## 引导

bootstrap 脚本也是必要下载的构建依赖，来创建项目文件. 必须使用 Python 2.7.x 来让脚本成功执行.正确下载文件会花费较长的时间. 注意我们使用的是 `ninja` 来构建 Electron，所以没有生成 `Makefile` 项目.

```bash
$ cd electron
$ ./script/bootstrap.py -v
```

### 交叉编译

如果想创建一个 `arm` target ，应当还要下载下面的依赖 :

```bash
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

为了编译 `arm` 或 `ia32` targets, 你应当为 `bootstrap.py` 脚本使用 `--target_arch` 参数:

```bash
$ ./script/bootstrap.py -v --target_arch=arm
```

## 构建

如果你想要创建 `Release` 、 `Debug` target:

```bash
$ ./script/build.py
```

这个脚本也许会在目录 `out/R` 下创建一个巨大的可执行的 Electron . 文件大小或许会超过 1.3 G. 原因是释放的目标二进制文件包含了调试标识 .运行 `create-dist.py` 脚本来减小文件的大小 :

```bash
$ ./script/create-dist.py
```

这会在 `dist` 目录下创建一个有大量小文件的工作空间. 运行 create-dist.py 脚本之后, 或许你想删除仍然在 `out/R` 下的 1.3G+ 二进制文件.

你可以只创建 `Debug` 目标:

```bash
$ ./script/build.py -c D
```

创建完毕, 可以在 `out/D`下面找到 `electron`.

## 清理

清理构建文件 :

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

<<<<<<< HEAD
预构建的 `clang` 会尝试链接到 `libtinfo.so.5`. 取决于  host 架构, 适当的使用 `libncurses`:
=======
Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:
>>>>>>> electron/master

```bash
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## 测试

查看 [构建系统概述: 测试](build-system-overview.md#测试)

## 高级提示

默认编译配置是针对主流 Linux 桌面发行版而言, 对于其他特定发行版或平台, 以下信息可能会帮到你.

### 本地编译 `libchromiumcontent`

可以添加参数 `--build_libchromiumcontent` 给 `bootstrap.py` 脚本以避免使用预编译的
`libchromiumcontent` 二进制文件:

```bash
$ ./script/bootstrap.py -v --build_libchromiumcontent
```

注意默认情况下不会以 `shared_library` 方式编译, 所以你如果使用以下模式的话, 只能编译 Electron的 `Release` 版本:

```bash
$ ./script/build.py -c R
```

### 使用系统提供的 `clang` 替换下载的 `clang` 二进制文件

默认情况下 Electron 使用 Chromium 项目提供的预编译的 `clang` 进行编译. 如果基于某些原因你想要使用已经安装到系统的 `clang` 进行编译, 可以添加 `--clang_dir=<path>` 参数给 `bootstrap.py` 以指定 `clang` 安装路径. 上面参数告诉编译脚本, 在目录 `<path>/bin/` 下有 `clang` 程序.

假设你的 `clang` 安装路径为 `/user/local/bin/clang`:

```bash
$ ./script/bootstrap.py -v --build_libchromiumcontent --clang_dir /usr/local
$ ./script/build.py -c R
```

### 使用`clang`之外的其它编译器

要使用其他编译器 (如: `g++`) 编译 Electron, 首先需要使用参数 `--disable_clang` 禁用 `clang`,
然后设置 `CC` 及 `CXX` 环境变量.

假设使用 GCC 工具链:

```bash
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_libchromiumcontent --disable_clang
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