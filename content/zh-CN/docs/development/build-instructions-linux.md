# 构建步骤（Linux）

遵循下面的准则在 Linux 上创建 Electron 。

## 前提条件

* 至少 25GB 硬盘空间 和 8GB 内存.
* Python 2.7.x. 一些分布，如CentOS 6.x仍然使用Python 2.6.x ，所以你可能需要检查你的Python版本与 `python -V`。

  也请确保您的系统和Python版本支持至少TLS 1.2。 要快速测试，运行以下脚本：

  ```sh
  $npx @emen/chect-python-tls
  ```

  如果脚本反映你的设置使用过时的安全协议，请用系统的软件包管理器更新Python在2.7.x中的最高版本。 或者，您也可以访问 https://www.python.org/downloads/ ，以获取更加详细的指导信息。

* Node.js. 有多种方法安装 Node.js。 您可以从 [ Nodejs.org ](https://nodejs.org) 下载源代码并进行编译。 也可以作为一个标准的用户在 home 目录下安装 node. 或者尝试使用 [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories) 仓库
* [ clang ](https://clang.llvm.org/get_started.html) 3.4 或更高版本。
* Заголовочные файлы от GTK 3 и libnotify.

在 Ubuntu, 安装下面的库:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock openjdk-8-jre
```

在 RHEL / CentOS, 安装下面的库:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

在 Fedora, 安装下面的库:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

在拱门Linux/曼贾罗，安装以下库：

```sh
$苏多·帕克曼-Syu基地-德维尔·克兰格·利布布斯gtk2自由通知-
                   利布格诺姆-基林阿尔萨-libcap图书馆图书馆-
                   libxs ns gcc-多利布卷曲gperf野牛-
                   蟒蛇2蟒蛇-德布斯莫克jdk8-开放
```

其他分销可能提供类似的包安装通过包 经理，如pacman。 或者可以从源代码进行编译。

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

并为 `arm` 或 `ia32` 目标交叉编译 您应该将 `target_cpu` 参数传递给 `gn gen`:

```sh
$gn 基因出 / 测试 - args = "进口 （...） target_cpu= "手臂"
```

## 构建

参照[Build Instructions: GN](build-instructions-gn.md)

## 故障排查

### 加载共享库时出现错误： libtinfo.so.5

预建 `clang` 将尝试链接到 `libtinfo.so.5`。 根据主机 架构，与适当的 `libncurses`相链接：

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## 高级提示

默认构建配置针对主要桌面 Linux 分布。 要构建特定的分布或设备，以下 信息可能会对您有所帮助。

### 使用系统提供的 `clang` 替换下载的 `clang` 二进制文件

默认情况下, Electron 是由 Chromium 项目提供的预生成的 [`clang`](https://clang.llvm.org/get_started.html) 二进制文件构建的。 如果出于某些原因你想用你系统已安装的 `clang`来构建，你可以在GN的参数中指定`clang_base_path`

例如如果你的 `clang`安装在 `/usr/local/bin/clang`下：

```sh
$gn gen 出/测试 -- -- args="导入（"//电子/生成/args/测试.gn"）clang_base_path= "/usr/本地/bin"
```

### 使用 `clang` 之外的其它编译器

Electron 不支持除 `clang`之外的其他编译器构建
