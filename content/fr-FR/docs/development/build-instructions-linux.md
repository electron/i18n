# Construire des Instructions (Linux)

Suivez les indications ci-dessous pour la construction des électrons sur Linux.

## Conditions préalables

* Au moins 25GB espace disque et 8 Go de RAM.
* Python 2.7.x. Certaines distributions comme l’utilisent encore 6.x CentOS Python 2.6.x vous devrez peut-être vérifier votre version de Python avec `python-V`.
* Node.js. Il y a différentes façons d’installer le nœud. Vous pouvez télécharger le code source de [Node.js](http://nodejs.org) et de compilation de source. Faisant permet l’installation de nœud sur votre propre répertoire comme un utilisateur standard. Ou essayez les référentiels tels que [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* Clang 3.4 ou plus tard.
* En-têtes de développement de GTK + et libnotify.

Sur Ubuntu, installer les bibliothèques suivantes :

```bash
$ sudo apt-get installer build-essential clang libdbus-1-dev libgtk2. 0-dev \ libnotify-dev libgnome-keyring-dev libgconf2-dev \ libasound2-dev libcap-dev libcups2-dev libxtst-dev \ libxss1 libnss3-dev gcc-multilib g ++-multilib curl \ gperf bison
```

Sur RHEL / CentOS, installer les bibliothèques suivantes :

```bash
$ sudo yum install clang dbus-devel gtk2-devel libnotify-devel \ libgnome-keyring-devel xorg-x11-serveur-utils libcap-devel \ tasses-devel libXtst-devel alsa-lib-devel libXrandr-devel \ GConf2-devel nss-devel
```

Sur Fedora, installer les bibliothèques suivantes :

```bash
$ sudo dnf install clang dbus-devel gtk2-devel libnotify-devel \ libgnome-keyring-devel xorg-x11-serveur-utils libcap-devel \ tasses-devel libXtst-devel alsa-lib-devel libXrandr-devel \ GConf2-devel nss-devel
```

Autres distributions peuvent offrir des programmes similaires pour l’installation via les gestionnaires de paquets tels que pacman. Ou on peut compiler du code source.

## Obtenir le Code

```bash
$ git clone https://github.com/electron/electron.git
```

## Amorçage

Le script bootstrap téléchargera toutes les dépendances nécessaires et créer les fichiers de projet. Vous devez avoir Python 2.7.x pour le script réussir. Téléchargement de certains fichiers peut prendre un certain temps. Avis que nous utilisons`ninja` pour construire des électrons donc il n’y a aucun `Makefile` généré.

```bash
$ cd $ électron./script/bootstrap.py - v
```

### Croix de compilation

Si vous voulez construire une cible `arm`, vous devez également installer les dépendances suivantes :

```bash
$ sudo apt-get installer linux-libc-dev-Portage-Croix libc6-dev-Portage-Croix \ g ++-arm-linux-gnueabihf
```

Et pour traverser les compiler pour les cibles `arm` ou `ia32`, vous devez passer la `--target_arch` paramètre au script `bootstrap.py` :

```bash
$./script/bootstrap.py - v--target_arch = bras
```

## Bâtiment

Si vous souhaitez générer les cibles fois `Release` et `Debug` :

```bash
$./script/build.py
```

Ce script va provoquer un très large Electron exécutable être placé dans le répertoire `out/R`. La taille du fichier est supérieure à 1,3 gigaoctets. Cela se produit parce que la cible de sortie binaire contient les symboles de débogage. Pour réduire la taille du fichier, exécutez le script de `create-dist.py` :

```bash
$./script/create-dist.py
```

Cela mettra une répartition du travail avec les tailles de fichier beaucoup plus petits dans le répertoire `dist`. Après avoir exécuté le script create-dist.py, vous pouvez supprimer le gigaoctet 1.3 + binaire qui est toujours en `out/R`.

Vous pouvez également créer la cible `Debug` uniquement :

```bash
$./script/build.py - c D
```

Après que le bâtiment est terminé, vous pouvez trouver le débogage `electron` binaire sous `out/D`.

## Nettoyage

Pour nettoyer les fichiers de build :

```bash
NGP $ courir propre
```

Pour nettoyer uniquement les répertoires `out` et `dist` :

```bash
NGP $ exécuter nettoyer-génération
```

**Note:** que les deux commandes propres demander l’exécution de `bootstrap` encore une fois devant le bâtiment.

## Dépannage

### Erreur lors du chargement Shared Libraries : libtinfo.so.5

Prebulit `clang` vais essayer de faire un lien vers `libtinfo.so.5`. Selon l’architecture de l’hôte, un lien symbolique vers `libncurses` appropriés :

```bash
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Tests

Voir la présentation du système [Build : Tests](build-system-overview.md#tests)

## Rubriques avancées

La valeur par défaut, configuration de construction est ciblé pour les distributions majeures de Linux desktop, de construire pour une distribution spécifique ou périphérique, les informations suivantes peut-être vous aider.

### Bâtiment `libchromiumcontent` localement

Pour éviter d’utiliser les binaires précompilés de `libchromiumcontent`, vous pouvez passer la `--build_libchromiumcontent` interrupteur au script `bootstrap.py` :

```bash
$./script/bootstrap.py - v--build_libchromiumcontent
```

Notez que par défaut la configuration `shared_library` n'est pas construite, ainsi vous pouvez seulement construire `Release` version d’électron si vous utilisez ce mode :

```bash
$./script/build.py - c R
```

### À l’aide de système `clang` au lieu de fichiers binaires téléchargés `clang`

Par défaut, électron est construit avec binaires précompilés `clang` fournis par projet de chrome. Si pour une raison quelconque vous souhaitez construire avec les `clang` installés sur votre système, vous pouvez appeler `bootstrap.py` avec `--clang_dir = commutateur<path>`. En lui passant la build script assumera que les `clang` binaires résident dans `<path>/bin/`.

Par exemple, si vous avez installé `clang` sous `/utilisateur/local/bin/clang` :

```bash
$./script/bootstrap.py - v--build_libchromiumcontent--clang_dir/usr/local $./script/build.py - c R
```

### À l’aide d’autres compilateurs autres que `clang`

Pour construire des électrons avec les compilateurs comme `g ++`, vous devez désactiver `clang` avec `--disable_clang` abord passer la première et puis définissez les variables d’environnement `CC` et `CXX` à ceux que vous voulez.

Bâtiment par exemple avec les outils de compilation GCC :

```bash
$ env CC = gcc CXX = g ++./script/bootstrap.py - v--build_libchromiumcontent--disable_clang $./script/build.py - c R
```

### Variables d’environnement

En dehors de `CC` et `CXX`, vous pouvez également définir la suite de variables d’environnement Custom les configurations de bâtiment :

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

Les variables d’environnement doivent être réglés lors de l’exécution du script `bootstrap.py`, ça ne marchera pas dans le script `build.py`.