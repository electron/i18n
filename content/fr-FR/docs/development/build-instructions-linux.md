# Instructions de Build (Linux)

Suivez les indications ci-dessous pour compiler Electron sur Linux.

## Prérequis

* Au moins 25GB d'espace disque et 8 Go de RAM.
* Python 2.7.x. Certaines distributions comme CentOS 6.x utilisent encore Python 2.6.x, vous devrez peut-être vérifier votre version de Python avec `python -V`.
* Node.js. Il y a différentes façons d’installer Node. Vous pouvez télécharger le code source de [Node.js](http://nodejs.org) et le compiler vous-même. Cela permet l’installation de Node sur votre propre répertoire comme un utilisateur standard. Ou essayez les dépôts tels que [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* Clang version 3.4 ou plus récent.
* En-têtes de développement de GTK+ et libnotify.

Sur Ubuntu, installez les bibliothèques suivantes :

```bash
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk2.0-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

Sur RHEL / CentOS, installez les bibliothèques suivantes :

```bash
$ sudo yum install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

On Fedora, install the following libraries:

```bash
$ sudo dnf install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Les autres distributions peuvent offrir des packages similaires pour l’installation via les gestionnaires de paquets tels que pacman. Ou l'un pouvant compiler depuis les codes sources.

## Getting the Code

```bash
$ git clone https://github.com/electron/electron.git
```

## Bootstrapping

Le script d'amorçage téléchargera toutes les dépendances nécessaires et créera les fichiers de compilation. Vous devez avoir Python 2.7.x pour le bon fonctionnement du script. Le téléchargement de certains fichiers peut prendre un certain temps. Pour information, nous utilisons`ninja` pour compiler Electron, donc il n’y a aucun `Makefile` généré.

```bash
$ cd electron
$ ./script/bootstrap.py -v
```

### Multi-compilation

If you want to build for an `arm` target you should also install the following dependencies:

```bash
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

And to cross compile for `arm` or `ia32` targets, you should pass the `--target_arch` parameter to the `bootstrap.py` script:

```bash
$ ./script/bootstrap.py -v --target_arch=arm
```

## Compilation

If you would like to build both `Release` and `Debug` targets:

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

## Cleaning

To clean the build files:

```bash
$ npm run clean
```

To clean only `out` and `dist` directories:

```bash
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## Troubleshooting

### Error While Loading Shared Libraries: libtinfo.so.5

Prebulit `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```bash
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Tests

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

### Environment variables

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