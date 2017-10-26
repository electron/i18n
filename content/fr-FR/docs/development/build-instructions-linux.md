# Instructions de compilation (Linux)

Suivez les indications ci-dessous pour compiler Electron sur Linux.

## Prérequis

* Au moins 25GB d'espace disque et 8 Go de RAM.
* Python 2.7.x. Certaines distributions comme CentOS 6.x utilisent encore Python 2.6.x, vous devrez peut-être vérifier votre version de Python avec `python -V`.
* Node.js. Il y a différentes façons d’installer Node. You can download source code from [nodejs.org](http://nodejs.org) and compile it. Cela permet l’installation de Node sur votre propre répertoire comme un utilisateur standard. Ou essayez les dépôts tels que [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 or later.
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

Sur Fedora, installez les bibliothèques suivantes :

```bash
$ sudo dnf install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Les autres distributions peuvent offrir des packages similaires pour l’installation via les gestionnaires de paquets tels que pacman. Ou l'un pouvant compiler depuis les codes sources.

## Obtenir le Code

```bash
$ git clone https://github.com/electron/electron
```

## Amorçage

Le script d'amorçage téléchargera toutes les dépendances nécessaires et créera les fichiers de compilation. Vous devez avoir Python 2.7.x pour le bon fonctionnement du script. Le téléchargement de certains fichiers peut prendre un certain temps. Pour information, nous utilisons`ninja` pour compiler Electron, donc il n’y a aucun `Makefile` généré.

```bash
$ cd electron
$ ./script/bootstrap.py --verbose
```

### Multi-compilation

Si vous voulez compiler une version `arm`, vous devez installer les dépendances suivantes :

```bash
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                        g++-arm-linux-gnueabihf
```

And to cross-compile for `arm` or `ia32` targets, you should pass the `--target_arch` parameter to the `bootstrap.py` script:

```bash
$ ./script/bootstrap.py -v --target_arch=arm
```

## Compilation

Compiler une version `Release` et une version `Debug` :

```bash
$ ./script/build.py
```

Ce script créera un lourd exécutable d'Electron dans le répertoire `out/R`. La taille du fichier est supérieure à 1.3 gigaoctets. Cela se produit parce que la version binaire Release contient des symboles de débogage. Pour réduire la taille du fichier, exécutez le script de `create-dist.py` :

```bash
$ ./script/create-dist.py
```

Cela mettra un espace de travail avec des fichier beaucoup plus petits dans le répertoire `dist`. After running the `create-dist.py` script, you may want to remove the 1.3+ gigabyte binary which is still in `out/R`.

Vous pouvez également compiler seulement une version `Debug` :

```bash
$ ./script/build.py -c D
```

Une fois la compilation terminée, vous trouverez un binaire de debug `Electron` dans `out/D`.

## Nettoyage

Pour nettoyer les fichiers de build :

```bash
$ npm run clean
```

Pour nettoyer uniquement les répertoires `out` et `dist` :

```bash
$ npm run clean-build
```

**Remarque :** Les deux commandes de nettoyage requière l’exécution de `bootstrap`.

## Résolution de problème

### Erreur lors du chargement Shared Libraries : libtinfo.so.5

Pré-compiler `clang` va permettre d'essayer de faire un lien vers `libtinfo.so.5`. Selon l'architecture de l'hôte, avoir `libncurses` comme lien symbolique est plus approprié :

```bash
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Tests

Voir [Build System Overview : Tests](build-system-overview.md#tests)

## Sujets Avancés

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Compiler `libchromiumcontent` localement

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps: 1. Install [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install) 2. Install [additional build dependencies](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install-additional-build-dependencies) 3. Fetch the git submodules:

    bash
      $ git submodule update --init --recursive 4. Copy the .gclient config file

    bash
      $ cp vendor/libchromiumcontent/.gclient . 5. Pass the 

`--build_libchromiumcontent` switch to `bootstrap.py` script:

    bash
      $ ./script/bootstrap.py -v --build_libchromiumcontent

Note that by default the `shared_library` configuration is not built, so you can only build `Release` version of Electron if you use this mode:

```bash
$ ./script/build.py -c R
```

### Utiliser le système `clang` au lieu des fichiers binaires téléchargés `clang`

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can call `bootstrap.py` with `--clang_dir=<path>` switch. By passing it the build script will assume the `clang` binaries reside in `<path>/bin/`.

For example if you installed `clang` under `/user/local/bin/clang`:

```bash
$ ./script/bootstrap.py -v --build_libchromiumcontent --clang_dir /usr/local
$ ./script/build.py -c R
```

### Using compilers other than `clang`

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

For example building with GCC toolchain:

```bash
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_libchromiumcontent --disable_clang
$ ./script/build.py -c R
```

### Variables d'environnement

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