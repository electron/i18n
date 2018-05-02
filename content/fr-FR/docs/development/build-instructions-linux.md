# Instructions de compilation (Linux)

Suivez les indications ci-dessous pour compiler Electron sur Linux.

## Prérequis

* Au moins 25GB d'espace disque et 8 Go de RAM.
* Python 2.7.x. Certaines distributions comme CentOS 6.x utilisent encore Python 2.6.x, vous devrez peut-être vérifier votre version de Python avec `python -V`.
* Node.js. Il y a différentes façons d’installer Node. Vous pouvez télécharger le code source depuis [nodejs.org](https://nodejs.org) et le compiler vous-même. Cela permet l’installation de Node sur votre propre répertoire comme un utilisateur standard. Ou essayez les dépôts tels que [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 ou plus.
* En-têtes de développement de GTK+ et libnotify.

Sur Ubuntu, installez les bibliothèques suivantes :

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

Sur RHEL / CentOS, installez les bibliothèques suivantes :

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                    libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                    cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                    GConf2-devel nss-devel
```

Sur Fedora, installez les bibliothèques suivantes :

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Les autres distributions peuvent offrir des packages similaires pour l’installation via les gestionnaires de paquets tels que pacman. Ou l'un pouvant compiler depuis les codes sources.

## Obtenir le code

```sh
$ git clone https://github.com/electron/electron
```

## Amorçage

Le script d'amorçage téléchargera toutes les dépendances nécessaires et créera les fichiers de compilation. Vous devez avoir Python 2.7.x pour le bon fonctionnement du script. Le téléchargement de certains fichiers peut prendre un certain temps. Pour information, nous utilisons`ninja` pour compiler Electron, donc il n’y a aucun `Makefile` généré.

```sh
$ cd electron
$ ./script/bootstrap.py --verbose
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

### Multi-compilation

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

## Compilation

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

## Nettoyage

Pour nettoyer les fichiers de build :

```sh
$ npm run clean
```

Pour nettoyer uniquement les répertoires `out` et `dist` :

```sh
$ npm run clean-build
```

**Remarque :** Les deux commandes de nettoyage requière l’exécution de `bootstrap`.

## Résolution de problème

### Erreur lors du chargement Shared Libraries : libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Tests

Voir [Build System Overview : Tests](build-system-overview.md#tests)

## Sujets Avancés

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Compiler `libchromiumcontent` localement

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps:

1. Installez [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install)
2. Installez [additional build dependencies](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install-additional-build-dependencies)
3. Récupérez les sous-modules git :

```sh
$ git submodule update --init --recursive
```

1. Passez le paramètre `--build_release_libcc` au script `bootstrap.py` :

```sh
$ ./script/bootstrap.py -v --build_release_libcc
```

Note that by default the `shared_library` configuration is not built, so you can only build `Release` version of Electron if you use this mode:

```sh
$ ./script/build.py -c R
```

### Utiliser le système `clang` au lieu des fichiers binaires téléchargés `clang`

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can call `bootstrap.py` with `--clang_dir=<path>` switch. By passing it the build script will assume the `clang` binaries reside in `<path>/bin/`.

For example if you installed `clang` under `/user/local/bin/clang`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir /usr/local
$ ./script/build.py -c R
```

### Utiliser un compilateur autre que `clang`

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

For example building with GCC toolchain:

```sh
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_release_libcc --disable_clang
$ ./script/build.py -c R
```

### Variables d'environnement

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