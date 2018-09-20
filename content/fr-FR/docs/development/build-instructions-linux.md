# Instructions de compilation (Linux)

Suivez les indications ci-dessous pour compiler Electron sur Linux.

## Prérequis

* Au moins 25GB d'espace disque et 8 Go de RAM.
* Python 2.7.x. Certaines distributions comme CentOS 6.x utilisent encore Python 2.6.x, vous devrez peut-être vérifier votre version de Python avec `python -V`.
    
    Veuillez vérifier que votre système et votre version de Python supporte au moins le TLS 1.2 ou une version supérieure. Pour un test rapide, exécutez le script suivant:
    
    ```sh
    $ npm run check-tls
    ```
    
    Si le script renvoie que votre configuration utilise un protocole de sécurité obsolète, utilisez le Gestionnaire de paquets de votre système afin de mettre à jour vers la dernière version dans la branche 2.7.x de Python. Vous pouvez également visiter https://www.python.org/downloads/ pour plus de détails.

* Node.js. Il y a différentes façons d’installer Node. Vous pouvez télécharger le code source depuis [nodejs.org](https://nodejs.org) et le compiler vous-même. Cela permet l’installation de Node sur votre propre répertoire comme un utilisateur standard. Ou essayez les dépôts tels que [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).

* [clang](https://clang.llvm.org/get_started.html) 3.4 ou plus.
* En-têtes de développement de GTK+ et libnotify.

Sur Ubuntu, installez les bibliothèques suivantes :

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock
```

Sur RHEL / CentOS, installez les bibliothèques suivantes :

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

Sur Fedora, installez les bibliothèques suivantes :

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

Les autres distributions peuvent offrir des packages similaires pour l’installation via les gestionnaires de paquets tels que pacman. Ou l'un pouvant compiler depuis les codes sources.

### Multi-compilation

Si vous voulez compiler une version `arm`, vous devez installer les dépendances suivantes :

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                        g++-arm-linux-gnueabihf
```

De même pour `arm64`, installez ce qui suit :

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

And to cross-compile for `arm` or `ia32` targets, you should pass the `target_cpu` parameter to `gn gen`:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## Compilation

See [Build Instructions: GN](build-instructions-gn.md)

## Résolution de problème

### Erreur lors du chargement Shared Libraries : libtinfo.so.5

Pré-compiler `clang` va permettre d'essayer de faire un lien vers `libtinfo.so.5`. Selon l'architecture de l'hôte, avoir `libncurses` comme lien symbolique est plus approprié :

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Sujets Avancés

La configuration par défaut de compilation cible la majorité des distributions bureau Linux. Pour compiler sur une distribution ou un appareil spécifique, les informations suivantes peuvent vous aider.

### Utiliser le système `clang` au lieu des fichiers binaires téléchargés `clang`

Par défaut, Electron est compilé avec les binaires précompilés de [`clang`](https://clang.llvm.org/get_started.html) fournis par le projet Chromium. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### Utiliser un compilateur autre que `clang`

Building Electron with compilers other than `clang` is not supported.