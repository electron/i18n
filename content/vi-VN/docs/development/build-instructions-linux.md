# Hướng dẫn build (Linux)

Làm theo hướng dẫn dưới đây để xây dựng Electron trên Linux.

## Điều kiện yêu cầu

* Ít nhất là 25GB ổ cứng và 8GB bộ nhớ RAM.
* Python phiên bản 2.7.x. Một số bản phân phối như CentOS 6.x vẫn sử dụng Python 2.6.x vì vậy bạn có thể cần phải kiểm tra phiên bản Python của bạn với `python -V`.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
    ```sh
    $ npm run check-tls
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

And to cross-compile for `arm` or `ia32` targets, you should pass the `target_cpu` parameter to `gn gen`:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## Build

See [Build Instructions: GN](build-instructions-gn.md)

## Xử lý sự cố

### Error While Loading Shared Libraries: libtinfo.so.5

Bản build sẵn của `clang` sẽ tìm cách link tới `libtinfo.so.5`. Phụ thuộc vào kiến trúc của máy chủ, symlink tới `libncurses` tương ứng:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Advanced topics

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Using system `clang` instead of downloaded `clang` binaries

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### Using compilers other than `clang`

Building Electron with compilers other than `clang` is not supported.