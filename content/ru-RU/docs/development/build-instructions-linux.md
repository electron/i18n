# Инструкции по сборке (Linux)

Следуйте рекомендациям ниже для сборки Electron под Linux.

## Требования

* Как минимум 25 ГБ дискового пространства и 8 ГБ памяти.
* Питон 2.7.x. Некоторые дистрибутивы, такие как CentOS 6.x, по-прежнему используют Python 2.6.x поэтому вам может понадобиться проверить свою версию Python с помощью `python -V`.

  Пожалуйста, также убедитесь, что ваша система и версия Python поддерживают по крайней мере TLS 1.2. Для быстрого теста запустите следующий скрипт:

  ```sh
  $ npx @electron/check-python-tls
  ```

  Если скрипт выдаёт сообщение, что ваша конфигурация использует устаревший протокол безопасности, используйте вашу систему управления пакетами для обновления Питона последней версией в ветке 2.7. Альтернативно, посетите страницу https://www.python.org/downloads/ для подробных инструкций.

* Node.js. Существует несколько способов установить Node. Вы можете скачать исходный код с [nodejs.org](https://nodejs.org) и скомпилировать его. Это позволяет установить Node в вашу домашнюю директорию со стандартными правами пользователя. Или используйте такие репозитории как [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 или выше.
* Заголовочные файлы от GTK 3 и libnotify.

Под Ubuntu, установите следующие библиотеки:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock openjdk-8-jre
```

Под RHEL / CentOS, установите следующие библиотеки:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-shamrock
```

Под Fedora, установите следующие библиотеки:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock openjdk-8-jre
```

На Arch Linux / Manjaro установите следующие библиотеки:

```sh
$ судо pacman -Syu базы-devel лязг libdbus gtk2 libnotify -
                   libgnome-ключ alsa-lib libcap libcups libxtst -
                   libxss nss gss gcc-multilib curl gperf bison -
                   python2 python-dbusmock jdk8-openjdk
```

Другие дистрибутивы могут предлагать аналогичные пакеты для установки с помощью пакетных менеджеров, таких как pacman. Или можно компилировать из исходных кодов.

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

И для кросс-компиляции для `arm` или `ia32`, вам нужно использовать `--target_arch` параметр для `` скрипта:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## Сборка

See [Build Instructions: GN](build-instructions-gn.md)

## Устранение проблем

### Error While Loading Shared Libraries: libtinfo.so.5

Предварительно `clang` постараемся связать с `libtinfo.so.5`. В зависимости от архитектуры , симлинка к соответствующим `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Advanced topics

Конфигурация здания по умолчанию предназначена для основных настольных дистрибутивов Linux linux. Чтобы создать для конкретного дистрибутива или устройства, может помочь вам следующая информация.

### Using system `clang` instead of downloaded `clang` binaries

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/user/local/bin/clang`:

```sh
$ gn gen out/Testing --args='import("//electron/build/args/testing.gn") clang_base_path = "/usr/local/bin"'
```

### Использование других компиляторов вместо `clang`

Создание Electron с компиляторами, отличными от `clang` не поддерживается.
