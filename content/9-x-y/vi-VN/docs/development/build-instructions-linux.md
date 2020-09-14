# Hướng dẫn build (Linux)

Xpath:/p.

## Kiện tiên quyết

* Ít nhất là 25GB ổ cứng và 8GB bộ nhớ RAM.
* Python 2.7.x. Some distributions like CentOS 6.x still use Python 2.6.x so you may need to check your Python version with `python -V`.

  Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:

  ```sh
  $ npx @electron/Check-Python-TLS
  ```

  Nếu kịch bản trả về cấu hình của bạn đang sử dụng giao thức bảo mật đã lỗi thời, hãy sử dụng trình quản lý gói của hệ thống để Cập Nhật Python lên phiên bản mới nhất trong nhánh 2.7. x. Alternatively, visit https://www.python.org/downloads/ for detailed instructions.

* Node.js. Có rất nhiều cách khác nhau để cài đặt Node.js. Bạn có thể tải mã nguồn từ [nodejs.org](https://nodejs.org), sau đó compile. Làm như vậy cho phép cài đặt Node.js của riêng của bạn trên thư mục như một người dùng tiêu chuẩn. Hoặc thử các repository chẳng hạn như [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 hoặc mới hơn.
* Development headers of GTK 3 and libnotify.

Trên Ubuntu, cài đặt các thư viện sau đây:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock openjdk-8-jre
```

Trên RHEL / CentOS, cài đặt các thư viện sau đây:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

Trên Fedora, cài đặt các thư viện sau đây:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

Other distributions may offer similar packages for installation via package managers such as pacman. Or one can compile from source code.

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
$ gn gen out/Testing --args='import(...) target_cpu="arm"'
```

## Build

Xem [Build Instructions: GN](build-instructions-gn.md)

## Xử lý sự cố

### Error While Loading Shared Libraries: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Chủ đề nâng cao

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Using system `clang` instead of downloaded `clang` binaries

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

```sh
$ gn gen out/Testing --args='import("//electron/build/args/testing.gn") clang_base_path = "/usr/local/bin"'
```

### Using compilers other than `clang`

Xây dựng Electron với trình biên dịch khác không phải `clang` sẽ không được hỗ trợ.
