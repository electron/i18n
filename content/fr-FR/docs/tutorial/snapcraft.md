# Guide Snapcraft (Linux)

Ce guide fournit des informations sur comment empaqueter votre application Electron pour n’importe quel environnement Snapcraft, y compris l’Ubuntu Software Center.

## Contexte et exigences

Avec une plus large communauté Linux, Canonical a pour but de corriger de nombreux problèmes d'installation de logiciels courants avec le projet [`snapcraft`](https://snapcraft.io/) . Snaps are containerized software packages that include required dependencies, auto-update, and work on all major Linux distributions without system modification.

Il existe trois méthodes pour créer un fichier `.snap` :

1) En utilisant [`electron-forge`][electron-forge] ou [`electron-builder`][electron-builder], deux outils qui sont livrés en supportant `snap` par nature. C'est l'option la plus simple. 2) En utilisant `electron-installer-snap`, qui réceptionne les émissions d'`electron-packager`. 3) En utilisant un package `.deb` déjà créé.

In some cases, you will need to have the `snapcraft` tool installed. Instructions to install `snapcraft` for your particular distribution are available [here](https://snapcraft.io/docs/installing-snapcraft).

## Utilisation de `electron-installer-snap`

Le module fonctionne comme [`electron-winstaller`][electron-winstaller] et les modules similaires en ce sens que sa portée est limitée à la construction de paquets snap. Vous pouvez installer avec :

```sh
npm install --save-dev electron-installer-snap
```

### Étape 1 : Empaqueter votre Application Electron

Empaquetez l’application à l’aide de [electron-packager][electron-packager] (ou d'un outil similaire). Assurez vous de supprimer `node_modules` dont vous n'avez plus besoin dans votre application finale, puisque tout module dont vous n'avez pas besoin augmentera inutilement la taille de votre application.

La sortie devrait ressembler à peu près à ceci :

```plaintext
.
└── dist
    └── app-linux-x64
        ├── LICENSE
        ├── LICENSES.chromium.html
        ├── content_shell.pak
        ├── app
        ├── icudtl.dat
        ├── libgcrypt.so.11
        ├── libnode.so
        ├── locales
        ├── resources
        ├── v8_context_snapshot.bin
        └── version
```

### Step 2: Running `electron-installer-snap`

Depuis un terminal qui a `snapcraft` dans son `PATH`, exécutez `electron-installer-snap` avec seulement `--src`, qui est l'emplacement de votre application Electron créée à la première étape.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

Si vous avez un pipeline de construction existant, vous pouvez utiliser programmer `electron-installer-snap`. Pour plus d'informations, voir [la doc Snapcraft API][snapcraft-syntax].

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## Using `snapcraft` with `electron-packager`

### Step 1: Create Sample Snapcraft Project

Create your project directory and add the following to `snap/snapcraft.yaml`:

```yaml
name: electron-packager-hello-world
version: '0.1'
summary: Hello World Electron app
description: |
  Simple Hello World Electron app as an example
base: core18
confinement: strict
grade: stable

apps:
  electron-packager-hello-world:
    command: electron-quick-start/electron-quick-start --no-sandbox
    extensions: [gnome-3-34]
    plugs:
    - browser-support
    - network
    - network-bind
    environment:
      # Correct the TMPDIR path for Chromium Framework/Electron to ensure
      # libappindicator has readable resources.
      TMPDIR: $XDG_RUNTIME_DIR

parts:
  electron-quick-start:
    plugin: nil
    source: https://github.com/electron/electron-quick-start.git
    override-build: |
        npm install electron electron-packager
        npx electron-packager . --overwrite --platform=linux --output=release-build --prune=true
        cp -rv ./electron-quick-start-linux-* $SNAPCRAFT_PART_INSTALL/electron-quick-start
    build-snaps:
    - node/14/stable
    build-packages:
    - unzip
    stage-packages:
    - libnss3
    - libnspr4
```

If you want to apply this example to an existing project:

- Replace `source: https://github.com/electron/electron-quick-start.git` with `source: .`.
- Replace all instances of `electron-quick-start` with your project's name.

### Step 2: Build the snap

```sh
$ snapcraft

<output snipped>
Snapped electron-packager-hello-world_0.1_amd64.snap
```

### Step 3: Install the snap

```sh
sudo snap install electron-packager-hello-world_0.1_amd64.snap --dangerous
```

### Step 4: Run the snap

```sh
electron-packager-hello-world
```

## En utilisant un package Debian existant

Snapcraft est capable de prendre un fichier `.deb` existant et de le convertir en un fichier `.snap`. La création d'un snap est configurée via un fichier `snapcraft.yaml` qui décrit les sources, dépendances, descriptions, et d'autres blocs de construction cruciaux.

### Étape 1 : Créer un package Debian

Si vous n’avez pas déjà un package `.deb`, utiliser `electron-installer-snap` peut être un chemin plus facile pour créer des packages snap. However, multiple solutions for creating Debian packages exist, including [`electron-forge`][electron-forge], [`electron-builder`][electron-builder] or [`electron-installer-debian`][electron-installer-debian].

### Étape 2 : Créer un snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax][snapcraft-syntax]. Examinons un exemple :

```yaml
name: myApp
version: '2.0.0'
summary: Une breve description de mon apli.
description: |
 You know what? This app is amazing! It does all the things
 for you. Some say it keeps you young, maybe even happy.

grade: stable
confinement: classic

parts:
  slack:
    plugin: dump
    source: my-deb.deb
    source-type: deb
    after:
      - desktop-gtk3
    stage-packages:
      - libasound2
      - libnotify4
      - libnspr4
      - libnss3
      - libpcre3
      - libpulse0
      - libxss1
      - libxtst6
  electron-launch:
    plugin: dump
    source: files/
    prepare: |
      chmod +x bin/electron-launch

apps:
  myApp:
    command: bin/electron-launch $SNAP/usr/lib/myApp/myApp
    desktop: usr/share/applications/myApp.desktop
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    environment:
      TMPDIR: $XDG_RUNTIME_DIR
```

Comme vous pouvez le voir, le `snapcraft.yaml` demande au système d'exécuter le fichier nommé `electron-launch`. Dans cet exemple, il transmet des informations au code binaire de l'application :

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Alternativement, si vous générez votre `snap` avec la restriction `strict` , vous pouvez utiliser la commande `desktop-launch`:

```yaml
apps:
  myApp:
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```

[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder
[electron-installer-debian]: https://github.com/unindented/electron-installer-debian
[electron-winstaller]: https://github.com/electron/windows-installer
