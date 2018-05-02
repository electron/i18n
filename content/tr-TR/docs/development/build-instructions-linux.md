# İnşaa Talimatları (Linux)

Electron'u linux üzerinde inşaa etmek için aşağıdaki yönlendirmeleri takip edin.

## Ön gereklilikler

* En az 25GB disk alanı ve 8GB hafıza.
* Python 2.7.x. CentOS gibi bazı dağıtımlar hala Python 2.6.x kullanmakta, dolayısıyla Python versiyonunuzu `python -V` komutu ile ile kontrol edin.
* Node.js. Node'u kurmanın birden fazla yolu var. [nodejs.org](https://nodejs.org)'tan indirip derleyebilirsiniz. Bu şekilde Node'u kullanıcı dizinine standart bir şekilde kurabilirsiniz. Ya da [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories) gibi depoları deneyebilirsiniz.
* [clang](https://clang.llvm.org/get_started.html) 3.4 veya sonrası.
* GTK+ ve libnotify için geliştirme başlıkları.

Ubuntu üzerinde, aşağıdaki kütüphaneleri kurun:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

RHEL / CentOS üzerinde aşağıdaki kütüphaneleri kurun:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Fedora üzerinde aşağıdaki kütüphaneleri kurun:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Diğer linux dağıtımları pacman gibi paket yöneticileri üzerinden benzer paketler sunuyor olabilir. Ya da kaynak kodtan derleyebilirsiniz.

## Kodu almak

```sh
$ git clone https://github.com/electron/electron
```

## İlk işleri halletmek

Ilk işleri halleden bootstrap betiği inşaa için gerekli olan bağımlılıkları indirir ve gerekli inşaa dosyalarını hazırlar. Bu betiğin çalışması içın Python 2.7.x'e sahip olmanız gerekir. Bağımlılıkları indirmek bir miktar zaman alabilir. Dikkat ederseniz, Electron'u inşaa etmek için `Makefile` yerine `ninja` kullanıyoruz.

```sh
$ cd electron
$ ./script/bootstrap.py --verbose
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

### Başka sistemler için derleme

If you want to build for an `arm` target you should also install the following dependencies:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

Similarly for `arm64`, install the following:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

And to cross-compile for `arm` or `ia32` targets, you should pass the `--target_arch` parameter to the `bootstrap.py` script:

```sh
$ ./script/bootstrap.py -v --target_arch=arm
```

## İnşaa

If you would like to build both `Release` and `Debug` targets:

```sh
$ ./script/build.py
```

This script will cause a very large Electron executable to be placed in the directory `out/R`. The file size is in excess of 1.3 gigabytes. This happens because the Release target binary contains debugging symbols. To reduce the file size, run the `create-dist.py` script:

```sh
$ ./script/create-dist.py
```

This will put a working distribution with much smaller file sizes in the `dist` directory. After running the `create-dist.py` script, you may want to remove the 1.3+ gigabyte binary which is still in `out/R`.

You can also build the `Debug` target only:

```sh
$ ./script/build.py -c D
```

After building is done, you can find the `electron` debug binary under `out/D`.

## Temizlik

İnşaa dosyalarını temizlemek için:

```sh
$ npm run clean
```

Sadece `out` and `dist` dizinlerini temizlemek için:

```sh
$ npm run clean-build
```

**Not:** Her iki temizleme komutu inşaa öncesi `bootstrap` çalıştırılmasını şart koşar.

## Arıza giderme

### Hata mesajı: Error While Loading Shared Libraries: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Testler

Burayı ziyaret edin: [İnşaa Sistemi Genel Görünümü: Testler](build-system-overview.md#tests)

## İleri düzey başlıklar

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### `libchromiumcontent`'i yerelinize inşaa etme

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps:

1. [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install)'u kurun
2. [Ek inşaa bağımlılıklarını](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install-additional-build-dependencies) kurun
3. Git alt modullerini çekin:

```sh
$ git submodule update --init --recursive
```

1. `--build_release_libcc` argümanını `bootstrap.py` betiğine geçin:

```sh
$ ./script/bootstrap.py -v --build_release_libcc
```

Note that by default the `shared_library` configuration is not built, so you can only build `Release` version of Electron if you use this mode:

```sh
$ ./script/build.py -c R
```

### İndirdiğıniz `clang` yerine sistem `clang`'ini kullanmak

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can call `bootstrap.py` with `--clang_dir=<path>` switch. By passing it the build script will assume the `clang` binaries reside in `<path>/bin/`.

For example if you installed `clang` under `/user/local/bin/clang`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir /usr/local
$ ./script/build.py -c R
```

### `clang` dışında derleyicileri kullanarak

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

For example building with GCC toolchain:

```sh
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_release_libcc --disable_clang
$ ./script/build.py -c R
```

### Ortam Değişkenleri

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