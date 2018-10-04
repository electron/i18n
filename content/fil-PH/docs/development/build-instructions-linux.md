# "Build Instructions (Linux)"

Sundin ang mga patnubay sa ibaba para sa pagbuo ng Electron sa Linux.

## Mga Pangunahing Kailangan

* Hindi bababa sa 25GB disk space at 8GB RAM.
* Ang ilang distribusyon ng Python 2.7.x. tulad ng CentOS 6.x ay gumagamit pa rin hanggang ngayon ng Python 2.6.x kaya naman maaaring suriin ang Python version gamit ang `python -V`.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
    ```sh
    $ npm run check-tls
    ```
    
    If the script returns that your configuration is using an outdated security protocol, use your system's package manager to update Python to the latest version in the 2.7.x branch. Alternatively, visit https://www.python.org/downloads/ for detailed instructions.

* Node.js. May iba't-ibang paraan upang i-install ang Node. Maaaring "i-download" ang "source code" galing sa [nodejs.org](https://nodejs.org) at ikompayl ito. Ang paggawa nito ay hahayaang "i-install" ang Node sa iyong "home directory" bilang "standard user". Maaari din namang subukan ang mga "repository" tulad ng [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).

* [clang](https://clang.llvm.org/get_started.html) 3.4 o mamaya.
* Ang pagpapaunlad ng mga "header" ng GTK+ at libnotify.

Sa Ubuntu, "i-install" ang mga susunod na mga "library":

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock
```

Sa RHEL / CentOS, "i-install" ang mga sumusunod na "library":

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

Sa Fedora, "i-install" ang mga sumusunod na mga "library":

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

Ang ibang mga distribusyon ay maaaring ipagamit ang parehong "package" para sa "installation" gamit ang "package managers" tulad ng "pacman". Pwede ring ikompayl ang isa galing sa "source code".

### "Cross Compilation"

Kung nais nating bumuo para sa "`arm` target", dapat din nating "i-install" ang mga sumusunod na "dependency":

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

Gayundin para sa `arm64`, kailangang "i-install" ang mga sumusunod:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

And to cross-compile for `arm` or `ia32` targets, you should pass the `target_cpu` parameter to `gn gen`:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## Ang Pagbubuo

See [Build Instructions: GN](build-instructions-gn.md)

## Paghahanap ng ProblemaPaghahanap ng Problema

### Mga Mali na Maaaring Lumabas Habang ang "Shared Libraries" ay "Loading": libtinfo.so.5

Ang muling nabuo na `clang` ay susubukang "i-link" sa `libtinfo.so.5`. Depende sa "host architecture" kung ang "symlink" ay iaangkop ang `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Mga Pinatiunang Paksa

Ang kumpigurasyon ng "default building" ay tinatarget para sa mga pangunahing distribusyon ng "desktop Linux". Ang mga sumusunod na impormasyon ay maaaring makatulong para makabuo ng tiyak na distribusyon.

### Gamitin ang sistema ng `clang` sa halip na "downloaded `clang` binaries"

Bilang "default", ang Electron ay binuo gamit ang bagong buo ng "[`clang`](https://clang.llvm.org/get_started.html) binaries" na binibigay ng proyekto ng Chromium. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### Gamit ang kompayler kaysa sa `clang`

Building Electron with compilers other than `clang` is not supported.