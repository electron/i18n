# Guida snapcraft (Centro Software Ubuntu & Altro)

Questa guida fornisce informazioni su come impacchettare la tua app Electron per ogni ambiente Snapcraft, incluso il Centro Software Ubuntu.

## Requisiti e Contesto

Con la più ampia community di Linuz, Canonical risolve molti dei problemi di installazione software comuni con il progetto [`snapcraft`](https://snapcraft.io/). Gli snap sono pacchetti software impacchettati che includono dipendenze richieste, aggiornamenti automatici e funzionano su tutte le distribuzioni maggiori di Linux senza modifiche di sistema.

Ci sono tre modi per creare un file `.snap`:

1) Usando [`forgia-electron`](https://github.com/electron-userland/electron-forge) o [`builder-electron`](https://github.com/electron-userland/electron-builder), entrambi strumenti con supporto `snap` fuori dalla scatola. Questa è l'opzione più facile. 2) Usando `electron-istallatore-snap`, che prende l'output dell'`electron-impacchettatore`. 3) Usando un pacchetto `.deb` preesistente.

In ogni caso, hai bisogno di uno strumento `snapcraft` installato. Raccomandiamo la building su Ubuntu 16.04 (o l'LTS corrente).

```sh
snap install snapcraft --classic
```

Mentre *è possibile* installare `snapcraft` su macOS usando Homebrew, non è possibile costruire pacchetti `snap` ed è focalizzato su pacchetti gestionali nel negozio.

## Usando `electron-installatore-snap`

Il modulo fuziona come [`electron-winsallatore`](https://github.com/electron/windows-installer) e simili moduli di questo, con scopi limitati alla costruzione dei pacchetti snap. Puoi installarlo con:

```sh
npm install --save-dev electron-installer-snap
```

### Fase 1: Impacchetta La Tua App Electron

Impacchetta l'app usando [electron-impacchettatore](https://github.com/electron-userland/electron-packager) (o uno strumento simile). Assicurati di rimuovere i `moduli_node` che non necessiti nella tua app, visto che non ne necessiti ognuno, aumenterà solo le dimensioni della tua app.

L'output dovrebbe sembrare questo:

```text
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
        ├── natives_blob.bin
        ├── resources
        ├── snapshot_blob.bin
        └── version
```

### Fase 2: Eseguire `electron-installatore-snap`

Da un terminale con `snapcraft` nel suo `PERCORSO`, esegui `electron-installatore-snap` con il parametro richiesto `--src`, posizione della tua app Electron impacchettata creata nella prima fase.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

Se hai una pipeline di costruzione esistente, puoi usare `electron-installatore-snap` programmaticamente. Per altre informazioni, vedi i [documenti API Snapcraft](https://docs.snapcraft.io/build-snaps/syntax).

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## Using an Existing Debian Package

Snapcraft is capable of taking an existing `.deb` file and turning it into a `.snap` file. The creation of a snap is configured using a `snapcraft.yaml` file that describes the sources, dependencies, description, and other core building blocks.

### Step 1: Create a Debian Package

If you do not already have a `.deb` package, using `electron-installer-snap` might be an easier path to create snap packages. However, multiple solutions for creating Debian packages exist, including [`electron-forge`](https://github.com/electron-userland/electron-forge), [`electron-builder`](https://github.com/electron-userland/electron-builder) or [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### Step 2: Create a snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

```yaml
name: myApp
version: '2.0.0'
summary: A little description for the app.
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
      - libgconf2-4
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

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it simply passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Alternatively, if you're building your `snap` with `strict` confinement, you can use the `desktop-launch` command:

```yaml
apps:
  myApp:
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```