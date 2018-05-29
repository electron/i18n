# "Build Instructions (Linux)"

Sundin ang mga patnubay sa ibaba para sa pagbuo ng Electron sa Linux.

## Mga Pangunahing Kailangan

* Hindi bababa sa 25GB disk space at 8GB RAM.
* Ang ilang distribusyon ng Python 2.7.x. tulad ng CentOS 6.x ay gumagamit pa rin hanggang ngayon ng Python 2.6.x kaya naman maaaring suriin ang Python version gamit ang `python -V`.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
    ```sh
    $ python ./script/tls.py
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

At para "mai-cross-compile" ang `arm` o `ia32` "targets", kailangan mong idaan ang "parameter" na `--target_arch` sa skrip na `bootstrap.py`:

```sh
$ ./script/bootstrap.py -v --target_arch=arm
```

## Pagbuo

Kung ang nais mo ay bumuo ng parehong `Release` at `Debug` "targets":

```sh
$ ./script/build.py
```

Ang skrip na ito ang magiging dahilan upang mapalabas o maipakita ang napakalaking Electron na ilalagay sa loob ng "directory" ng `out/R`. Ang sukat ng payl ay lalagpas sa "1.3 gigabytes". Ito ay mangyayari dahil ang "Release target binary" ay naglalaman ng mga simbolo ng "debugging". Upang mabawasan ang sukat ng payl, patakbuhin ang skrip na `create-dist.py`:

```sh
$ ./script/create-dist.py
```

Itatakda nito ang "working distribution" na may mas maliit ng sukat ng payl sa loob ng "directory" ng `dist`. Matapos paganahin ang skrip na `create-dist.py`, maaaring mong tanggalin ang "1.3+ gigabyte binary" na nasa loob pa rin ng `out/R`.

Maaari ka ring bumuo lamang ng "`Debug` target":

```sh
$ ./script/build.py -c D
```

Matapos itong buuin, hanapin ang "`electron` debug binary" sa ilalim ng `out/D`.

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

<h2>Paghahanap ng ProblemaPaghahanap ng Problema</h2>

<h3>Mga Mali na Maaaring Lumabas Habang ang "Shared Libraries" ay "Loading": libtinfo.so.5</h3>

<p>Ang muling nabuo na <code>clang` ay susubukang "i-link" sa `libtinfo.so.5`. Depende sa "host architecture" kung ang "symlink" ay iaangkop ang `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Mga Pagsusuri

Tingnan ang [ Buod ng Pagbuo ng Sistema: Mga Pagsusuri ](build-system-overview.md#tests)

## Mga Pinatiunang Paksa

Ang kumpigurasyon ng "default building" ay tinatarget para sa mga pangunahing distribusyon ng "desktop Linux". Ang mga sumusunod na impormasyon ay maaaring makatulong para makabuo ng tiyak na distribusyon.

### Ang pagbuo ng lokal na `libchromiumcontent`

Gamit ang "prebuilt binaries" ng `libchromiumcontent`, maaaring maiwasan ang sa pamamagitan ng pagbuo ng lokal na `libchromiumcontent`. Para magawa ito, sundin lang ang mga hakbang:

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

Paalala, hindi kasama ang kumpigurasyon ng `shared_library` bilang "default", at maaari lang buuin ang "`Release` version" ng Electron kung ginagamit ang "mode" na ito:

```sh
$ ./script/build.py -c R
```

### Gamitin ang sistema ng `clang` sa halip na "downloaded `clang` binaries"

Bilang "default", ang Electron ay binuo gamit ang bagong buo ng "[`clang`](https://clang.llvm.org/get_started.html) binaries" na binibigay ng proyekto ng Chromium. Para sa ilang rason, nais mong bumuo gamit ang `clang` na "naka-install" sa sistema, maaaring gamitin ang `bootstrap.py` kasama ang "switch" ng `--clang_dir=<path>`. Bilang paggamit nito, ang nabuong iskrip ay ipagpapalagay na ang "`clang` binaries" ay nasa `<path>/bin/`.

Halimbawa, kapag "in-install" ang `clang` sa ilalim ng `/user/local/bin/clang`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir /usr/local
$ ./script/build.py -c R
```

### Gamit ang kompayler kaysa sa `clang`

Para mabuo ang Electron gamit ang mga kompayler tulag ng `g++`, ang unang kailangang gawin ay ihinto ang paggana ng `clang` gamit ang "switch" ng `--disable_clang`, pagkatapos ay itakda ang `CC` at `CXX` bilang "environment variables" na nais mong gamitin.

Halimbawa, ang pagbuo gamit ang GCC toolchain:

```sh
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_release_libcc --disable_clang
$ ./script/build.py -c R
```

### "Environment Variables"

Bukod sa `CC` at `CXX`, maaari mo ring itakda ng mga sumusunod na environment variable para baguhin ang pagkakabuo ng kumpigurasyon ayon sa nais mo:

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

Ang "environment variables" ay dapat nakatakda na kapag pagaganahin ang iskrip ng `bootstrap.py`, at ito'y 'di gaganasa iskrip na `build.py`.