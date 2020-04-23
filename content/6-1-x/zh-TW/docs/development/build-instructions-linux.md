# 建置步驟 (macOS)

Follow the guidelines below for building Electron on Linux.

## 系統需求

* 至少 25GB 的磁碟空間及 8GB 的 RAM。
* Python 2.7.x。某些發行版本，例如 CentOS 6.x 還是用 Python 2.6.x。所以請由 `python -V` 確認 Python 的版本。

  Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:

  ```sh
  $ npm run check-tls
  ```

  如果腳本返回了你使用過時的安全協議定義的配置，可以使用系統的包管理器更新python至2.7.x分支的最新版本 或者訪問或者，https://www.python.org/downloads/以獲取詳細說明

* Node.js。 有幾種方法安裝node 你可以從[node.org](https://nodejs.org)下載源代碼並編譯 也可以作為普通用戶在你的home目錄下安裝node 或者嘗試使用[NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories)倉庫
* [clang](https://clang.llvm.org/get_started.html) 3.4 或之後的版本。
* Development headers of GTK+ and libnotify.

在 Ubuntu 上，安將下列程式庫:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock openjdk-8-jre
```

在 RHEL / CentOS 上，安將下列程式庫:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock openjdk-8-jre
```

在 Fedora 上，安將下列程式庫:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock openjdk-8-jre
```

Other distributions may offer similar packages for installation via package managers such as pacman. Or one can compile from source code.

### Cross compilation

如果你想要創建一個`arm`target，應該先下載以下依賴：

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

Similarly for `arm64`, install the following:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

And to cross-compile for `arm` or `ia32` targets, you should pass the `target_cpu` parameter to `gn gen`:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## 建置

See [Build Instructions: GN](build-instructions-gn.md)

## 疑難排解

### Error While Loading Shared Libraries: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## 進階主題

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Using system `clang` instead of downloaded `clang` binaries

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### 使用 `clang` 以外的編譯器

Building Electron with compilers other than `clang` is not supported.
