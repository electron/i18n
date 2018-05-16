# Инструкции по сборке (Linux)

Следуйте рекомендациям ниже для сборки Electron под Linux.

## Требования

* Как минимум 25 ГБ дискового пространства и 8 ГБ памяти.
* Python 2.7.x. Некоторые дистрибутивы, такие как CentOS 6.x, по-прежнему используют Python 2.6.x, поэтому вам нужно проверить версию Python командой `python -V`.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
    ```sh
    $ python ./script/check-tls.py
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

## Получение кода

```sh
$ git clone https://github.com/electron/electron
```

## Самонастройка

Скрипт bootstrap скачает все необходимые зависимые сборки и построит файлы проекта. У вас должен быть Python 2.7.x для успешной работы этого скрипта. Загрузка некоторых файлов может занять много времени. Обратите внимание, что мы используем `ninja` для сборки Electron, поэтому `Makefile` не создается.

```sh
$ cd electron
$ ./script/bootstrap.py --verbose
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

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

И для кросс-компиляции для `arm` или `ia32`, вам нужно использовать `--target_arch` параметр для `bootstrap.py` скрипта:

```sh
$ ./script/bootstrap.py -v --target_arch=arm
```

## Сборка

Если вы хотите собрать `Release` и `Debug` версии:

```sh
$ ./script/build.py
```

Скрипт соберет очень большой исполняемый файл Electron в директорию `out/R`. Размер файла превышает 1,3 Гб. Это происходит из-за того что Release версия бинарного файла содержит отладочные символы. Чтобы уменьшить размер файла, запустите `create-dist.py`:

```sh
$ ./script/create-dist.py
```

Оно создаст дистрибутив с гораздо меньшим размером файлов в директорию `dist`. После запуска `create-dist.py`, вероятно, вы захотите удалить 1.3+ Гб бинарный файл, который все еще находится в `out/R`.

Также вы можете собрать только `Debug` версию:

```sh
$ ./script/build.py -c D
```

After building is done, you can find the `electron` debug binary under `out/D`.

## Очистка

Очистить файлы построения:

```sh
$ npm run clean
```

Для очистки только `out` и `dist` каталогов:

```sh
$ npm run clean-build
```

**Примечание:** Обе команды очистки требуют запуска `bootstrap` снова перед построением.

## Устранение проблем

### Error While Loading Shared Libraries: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Тесты

Смотрите [Build System Overview: Tests](build-system-overview.md#tests)

## Advanced topics

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Сборка `libchromiumcontent` локально

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps:

1. Установите [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install)
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

### Использование других компиляторов вместо `clang`

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

For example building with GCC toolchain:

```sh
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_release_libcc --disable_clang
$ ./script/build.py -c R
```

### Переменные окружения

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