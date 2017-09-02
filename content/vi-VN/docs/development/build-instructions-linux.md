# Hướng dẫn build (Linux)

Làm theo hướng dẫn dưới đây để xây dựng Electron trên Linux.

## Điều kiện yêu cầu

* Ít nhất là 25GB ổ cứng và 8GB bộ nhớ RAM.
* Python phiên bản 2.7.x. Một số bản phân phối như CentOS 6.x vẫn sử dụng Python 2.6.x vì vậy bạn có thể cần phải kiểm tra phiên bản Python của bạn với `python -V`.
* Node.js. Có rất nhiều cách khác nhau để cài đặt Node.js. Bạn có thể tải về mã nguồn từ [Node.js](http://nodejs.org) và biên dịch từ nguồn. Làm như vậy cho phép cài đặt Node.js của riêng của bạn trên thư mục như một người dùng tiêu chuẩn. Hoặc thử các repository chẳng hạn như [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* Clang phiên bản 3.4+.
* Bộ phát triển tiên đề GTK+ và libnotify.

Trên Ubuntu, cài đặt các thư viện sau đây:

```bash
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk2.0-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

Trên RHEL / CentOS, cài đặt các thư viện sau đây:

```bash
$ sudo yum install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Trên Fedora, cài đặt các thư viện sau đây:

```bash
$ sudo dnf install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Trên các bản phân phối khác có thể cung cấp cá gói tương tự cho việc cài đặt thông qua các phần mềm quản lý gói như pacman. Hoặc cũng có thể biên dịch từ mã nguồn của các gói đó.

## Getting the Code

```bash
$ git clone https://github.com/electron/electron.git
```

## Bootstrapping

The bootstrap script will download all necessary build dependencies and create the build project files. You must have Python 2.7.x for the script to succeed. Downloading certain files can take a long time. Notice that we are using `ninja` to build Electron so there is no `Makefile` generated.

```bash
$ cd electron
$ ./script/bootstrap.py -v
```

### Biên soạn đa nền tảng

If you want to build for an `arm` target you should also install the following dependencies:

```bash
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

And to cross compile for `arm` or `ia32` targets, you should pass the `--target_arch` parameter to the `bootstrap.py` script:

```bash
$ ./script/bootstrap.py -v --target_arch=arm
```

## Xây dựng

Nếu bạn nhắm tới mong muốn xây dựng cả hai phiên bản là `Bản phát hành chính thức` và `Bản debug`:

```bash
$ ./script/build.py
```

This script will cause a very large Electron executable to be placed in the directory `out/R`. The file size is in excess of 1.3 gigabytes. This happens because the Release target binary contains debugging symbols. To reduce the file size, run the `create-dist.py` script:

```bash
$ ./script/create-dist.py
```

This will put a working distribution with much smaller file sizes in the `dist` directory. After running the create-dist.py script, you may want to remove the 1.3+ gigabyte binary which is still in `out/R`.

You can also build the `Debug` target only:

```bash
$ ./script/build.py -c D
```

After building is done, you can find the `electron` debug binary under `out/D`.

## Dọn dẹp

Để dọn các file build:

```bash
$ npm run clean
```

To clean only `out` and `dist` directories:

```bash
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## Xử lý sự cố

### Error While Loading Shared Libraries: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```bash
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Thử nghiệm

See [Build System Overview: Tests](build-system-overview.md#tests)

## Advanced topics

The default building configuration is targeted for major desktop Linux distributions, to build for a specific distribution or device, following information may help you.

### Building `libchromiumcontent` locally

To avoid using the prebuilt binaries of `libchromiumcontent`, you can pass the `--build_libchromiumcontent` switch to `bootstrap.py` script:

```bash
$ ./script/bootstrap.py -v --build_libchromiumcontent
```

Note that by default the `shared_library` configuration is not built, so you can only build `Release` version of Electron if you use this mode:

```bash
$ ./script/build.py -c R
```

### Using system `clang` instead of downloaded `clang` binaries

By default Electron is built with prebuilt `clang` binaries provided by Chromium project. If for some reason you want to build with the `clang` installed in your system, you can call `bootstrap.py` with `--clang_dir=<path>` switch. By passing it the build script will assume the `clang` binaries reside in `<path>/bin/`.

For example if you installed `clang` under `/user/local/bin/clang`:

```bash
$ ./script/bootstrap.py -v --build_libchromiumcontent --clang_dir /usr/local
$ ./script/build.py -c R
```

### Using other compilers other than `clang`

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

For example building with GCC toolchain:

```bash
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_libchromiumcontent --disable_clang
$ ./script/build.py -c R
```

### Các biến môi trường

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