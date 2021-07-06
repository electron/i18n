# Instructions de compilation (Linux)

Follow the guidelines below for building **Electron itself** on Linux, for the purposes of creating custom Electron binaries. For bundling and distributing your app code with the prebuilt Electron binaries, see the [application distribution][application-distribution] guide.

## Prérequis

* Au moins 25GB d'espace disque et 8 Go de RAM.
* Python 2.7.x. Certaines distributions comme CentOS 6.x utilisent toujours Python 2.6.x vous devrez donc peut-être vérifier votre version de Python avec `python -V`.

  Veuillez également vous assurer que votre système et la version Python prennent en charge au moins TLS 1.2. Pour un test rapide, exécutez le script suivant :

  ```sh
  $ npx @electron/check-python-tls
  ```

  Si le script renvoie que votre configuration utilise un protocole de sécurité obsolète, utilisez le Gestionnaire de paquets de votre système afin de mettre à jour vers la dernière version dans la branche 2.7.x de Python. Vous pouvez également visiter https://www.python.org/downloads/ pour plus de détails.

* Node.js. Il y a différentes façons d’installer Node. Vous pouvez télécharger le code source depuis [nodejs.org](https://nodejs.org) et le compiler vous-même. Cela permet l’installation de Node sur votre propre répertoire comme un utilisateur standard. Ou essayez les dépôts tels que [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 ou plus.
* En-têtes de développement de GTK+ et libnotify.

Sur Ubuntu, installez les bibliothèques suivantes :

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock openjdk-8-jre
```

Sur RHEL / CentOS, installez les bibliothèques suivantes :

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

Sur Fedora, installez les bibliothèques suivantes :

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

Sur Arch Linux / Manjaro, installez les bibliothèques suivantes :

```sh
$ sudo pacman -Syu base-devel clang libdbus gtk2 libnotify \
                   libgnome-keyring alsa-lib libcap libcups libxtst \
                   libxss nss gcc-multilib curl gperf bison \
                   python2 python-dbusmock jdk8-openjdk
```

Other distributions may offer similar packages for installation via package managers such as pacman. Ou on peut compiler à partir du code source.

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

Et pour effectuer une compilation croisée pour les cibles `arm` ou `ia32`, vous devez passer le `target_cpu` paramètre à `gn gen` :

```sh
$ gn gen out/Testing --args='import(...) target_cpu="arm"'
```

## Compilation

Voir les [Instructions de compilation : GN](build-instructions-gn.md)

## Résolution de problème

### Erreur lors du chargement Shared Libraries : libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Sujets Avancés

The default building configuration is targeted for major desktop Linux distributions. Pour créer une distribution ou un périphérique spécifique, les informations informations peuvent vous aider.

### Utiliser le système `clang` au lieu des fichiers binaires téléchargés `clang`

Par défaut, Electron est compilé avec les binaires précompilés de [`clang`](https://clang.llvm.org/get_started.html) fournis par le projet Chromium. Si pour une raison quelconque, vous souhaitez construire avec le `clang` installé dans votre système, vous pouvez spécifier l'argument `clang_base_path` dans le GN args.

Par exemple, si vous avez installé `clang` sous `/usr/local/bin/clang` :

```sh
$ gn gen out/Testing --args='import("//electron/build/args/testing.gn") clang_base_path = "/usr/local/bin"'
```

### Utiliser un compilateur autre que `clang`

La construction d'électrons avec des compilateurs autres que `clang` n'est pas prise en charge.

[application-distribution]: ../tutorial/application-distribution.md
