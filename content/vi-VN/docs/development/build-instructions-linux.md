# Hướng dẫn build (Linux)

Làm theo hướng dẫn dưới đây để xây dựng Electron trên Linux.

## Điều kiện yêu cầu

* Ít nhất là 25GB ổ cứng và 8GB bộ nhớ RAM.
* Python phiên bản 2.7.x. Một số bản phân phối như CentOS 6.x vẫn sử dụng Python 2.6.x vì vậy bạn có thể cần phải kiểm tra phiên bản Python của bạn với `python -V`.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
    ```sh
    $ python ./script/check-tls.py
    ```
    
    If the script returns that your configuration is using an outdated security protocol, use your system's package manager to update Python to the latest version in the 2.7.x branch. Alternatively, visit https://www.python.org/downloads/ for detailed instructions.

* Node.js. Có rất nhiều cách khác nhau để cài đặt Node.js. Bạn có thể tải mã nguồn từ [nodejs.org](https://nodejs.org), sau đó compile. Làm như vậy cho phép cài đặt Node.js của riêng của bạn trên thư mục như một người dùng tiêu chuẩn. Hoặc thử các repository chẳng hạn như [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).

* [clang](https://clang.llvm.org/get_started.html) 3.4 hoặc mới hơn.
* Header của GTK+ và libnotify.

Trên Ubuntu, cài đặt các thư viện sau đây:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

Trên RHEL / CentOS, cài đặt các thư viện sau đây:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Trên Fedora, cài đặt các thư viện sau đây:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Trên các bản phân phối khác có thể cung cấp cá gói tương tự cho việc cài đặt thông qua các phần mềm quản lý gói như pacman. Hoặc cũng có thể biên dịch từ mã nguồn của các gói đó.

## Lấy mã nguồn

```sh
$ git clone https://github.com/electron/electron
```

## Khởi tạo dự án

Mã khởi tạo dự án sẽ tải tất cả các file phụ thuộc cần thiết và tạo các file dự án. Bạn phải có Python 2.7.x để chạy được mã khởi tạo. Quá trình tải một số file có thể mất nhiều thời gian. Chú ý, chúng tôi sử dụng `ninja` để build Electron, do đó không có `Makefile` được tạo ra.

```sh
$ cd electron
$ ./script/bootstrap.py --verbose
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

### Compile đa nền tảng

Nếu bạn muốn build cho nền tảng `arm` bạn cần cài thêm những phần phụ thuộc sau:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

Tương tự cho `arm64`, cài thêm như sau:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

Đồng thời để compile cho `arm` hoặc `ia32`, bạn nên thêm `--target_arch` cho `bootstrap.py`:

```sh
$ ./script/bootstrap.py -v --target_arch=arm
```

## Build

Nếu bạn nhắm tới mong muốn xây dựng cả hai phiên bản là `Bản phát hành chính thức` và `Bản debug`:

```sh
$ ./script/build.py
```

Sau khi chạy file code này sẽ tạo ra file thực thi Electron rất lớn trong thư mục `out/R`. Kích thước file vượt 1,3 GB. Đó là do file thực thi Release cũng chứa thông tin debug. Để giảm kích thước file, hãy chạy `create-dist.py`:

```sh
$ ./script/create-dist.py
```

Nó sẽ giúp đặt các file phụ thuộc có kích thước nhỏ hơn nhiều vào thư mục `dist`. Sau khi chạy `create-dist.py`, bạn có thể xóa file thực thi nặng hơn 1,3GB vẫn còn nằm trong thư mục `out/R`.

Bạn cũng có thể chỉ build `bản Debug` như sau:

```sh
$ ./script/build.py -c D
```

Sau khi build xong, bạn sẽ tìm thấy file thực thi debug `electron` trong `out/D`.

## Dọn dẹp

Để dọn các file build:

```sh
$ npm run clean
```

Để chỉ dọn thư mục `out` và `dist`:

```sh
$ npm run clean-build
```

**Chú ý:** Cả hai lệnh dọn dẹp trên yêu cầu chạy `khởi tạo dự án` lại trước khi build.

## Xử lý sự cố

### Error While Loading Shared Libraries: libtinfo.so.5

Bản build sẵn của `clang` sẽ tìm cách link tới `libtinfo.so.5`. Phụ thuộc vào kiến trúc của máy chủ, symlink tới `libncurses` tương ứng:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Các thử nghiệm

See [Build System Overview: Tests](build-system-overview.md#tests)

## Advanced topics

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Building `libchromiumcontent` locally

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps:

1. Install [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install)
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

For example if you installed `clang` under `/user/local/bin/clang`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir /usr/local
$ ./script/build.py -c R
```

### Using compilers other than `clang`

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

For example building with GCC toolchain:

```sh
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_release_libcc --disable_clang
$ ./script/build.py -c R
```

### Các biến môi trường

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