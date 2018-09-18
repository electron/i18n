# Инструкции по сборке (Linux)

Следуйте рекомендациям ниже для сборки Electron под Linux.

## Требования

* Как минимум 25 ГБ дискового пространства и 8 ГБ памяти.
* Python 2.7.x. Некоторые дистрибутивы, такие как CentOS 6.x, по-прежнему используют Python 2.6.x, поэтому вам нужно проверить версию Python командой `python -V`.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
    ```sh
    $ npm run check-tls
    ```
    
    If the script returns that your configuration is using an outdated security protocol, use your system's package manager to update Python to the latest version in the 2.7.x branch. Alternatively, visit https://www.python.org/downloads/ for detailed instructions.

* Node.js. Существует несколько способов установить Node. Вы можете скачать исходный код с [nodejs.org](https://nodejs.org) и скомпилировать его. Это позволяет установить Node в вашу домашнюю директорию со стандартными правами пользователя. Или используйте такие репозитории как [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).

* [clang](https://clang.llvm.org/get_started.html) 3.4 или выше.
* Заголовочные файлы от GTK+ и libnotify.

Под Ubuntu, установите следующие библиотеки:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

Под RHEL / CentOS, установите следующие библиотеки:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Под Fedora, установите следующие библиотеки:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Другие дистрибутивы могут предложить аналогичные пакеты для установки через менеджеры пакетов, такие как pacman. Либо можно скомпилировать их из исходного кода.

### Кросс-компиляция

Если вы хотите собрать для платформы `arm`, вам нужно установить следующие зависимости:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

Аналогично для `arm64`:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

And to cross-compile for `arm` or `ia32` targets, you should pass the `target_cpu` parameter to `gn gen`:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## Сборка

See [Build Instructions: GN](build-instructions-gn.md)

## Устранение проблем

### Error While Loading Shared Libraries: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

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

### Использование других компиляторов вместо `clang`

Building Electron with compilers other than `clang` is not supported.