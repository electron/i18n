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
$ git clone https://github.com/electron/electron.git
```

## Amorçage

Le script d'amorçage téléchargera toutes les dépendances nécessaires et créera les fichiers de compilation. Vous devez avoir Python 2.7.x pour le bon fonctionnement du script. Le téléchargement de certains fichiers peut prendre un certain temps. Pour information, nous utilisons`ninja` pour compiler Electron, donc il n’y a aucun `Makefile` généré.

```bash
$ cd electron
$ ./script/bootstrap.py -v
```

### Multi-compilation

Si vous voulez compiler une version `arm`, vous devez installer les dépendances suivantes :

```bash
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                        g++-arm-linux-gnueabihf
```

Et pour cross-compiler une version `arm` ou `ia32`, vous devez indiquer le paramètre `--target_arch` au script `bootstrap.py` :

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

Cela mettra un espace de travail avec des fichier beaucoup plus petits dans le répertoire `dist`. Après avoir exécuté le script create-dist.py, vous pouvez supprimer le fichier binaire de 1.3 + gigaoctets se trouvant toujours dans `out/R`.

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

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```bash
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Tests

Voir [Build System Overview : Tests](build-system-overview.md#tests)

## Sujets Avancés

La configuration par défaut de compilation cible la majorité des distributions bureau Linux. Pour compiler sur une distribution ou un appareil spécifique, les informations suivantes peuvent vous aider.

### Compiler `libchromiumcontent` localement

Pour éviter d’utiliser les binaires précompilés de `libchromiumcontent`, vous pouvez passer le paramètre `--build_libchromiumcontent` au script `bootstrap.py` :

```bash
$ ./script/bootstrap.py -v --build_libchromiumcontent
```

Notez que par défaut la configuration `shared_library` n'est pas compilée, ainsi vous pouvez seulement compiler la version `Release` d’Electron si vous utilisez ce mode :

```bash
$ ./script/build.py -c R
```

### Utiliser le système `clang` au lieu des fichiers binaires téléchargés `clang`

Par défaut, Electron est compilé avec les binaires précompilés `clang` fournis par le projet Chromium. Si pour une raison quelconque vous souhaitez compiler avec `clang` d'installé sur votre système, vous pouvez appeler `bootstrap.py` avec le paramètre `--clang_dir=<path>`. En lui passant ce paramètre, le script de compilation assumera que les binaires de `clang` se situent dans `<path>/bin/`.

Par exemple, si vous avez installé `clang` sous `/user/local/bin/clang`:

```bash
$ ./script/bootstrap.py -v --build_libchromiumcontent --clang_dir /usr/local
$ ./script/build.py -c R
```

### Utiliser un compilateur autre que `clang`

Pour compiler ELectron avec des compilateur comme `g++`, vous devez d'abord désactiver `clang` avec le paramètre `--disable_clang`. Ensuite, vous devez définir les variables d'environnement `CC` et `CXX` avec les compilateur que vous souhaitez.

Par exemple, compiler avec les outils de compilation GCC :

```bash
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_libchromiumcontent --disable_clang
$ ./script/build.py -c R
```

### Variables d'environnement

En dehors de `CC` et `CXX`, vous pouvez également définir la suite de variables d’environnement pour modifier les configurations de compilation :

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

Les variables d’environnement doivent être définies lors de l’exécution du script `bootstrap.py` , ça ne marchera pas avec le script `build.py` .