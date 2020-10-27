# Guida snapcraft (Centro Software Ubuntu & Altro)

Questa guida fornisce informazioni su come impacchettare la tua app Electron per ogni ambiente Snapcraft, incluso il Centro Software Ubuntu.

## Requisiti e Contesto

Con la più ampia community di Linuz, Canonical risolve molti dei problemi di installazione software comuni con il progetto [`snapcraft`](https://snapcraft.io/). Gli snap sono pacchetti software impacchettati che includono dipendenze richieste, aggiornamenti automatici e funzionano su tutte le distribuzioni maggiori di Linux senza modifiche di sistema.

Ci sono tre modi per creare un file `.snap`:

1) Usando [`forgia-electron`](https://github.com/electron-userland/electron-forge) o [`builder-electron`](https://github.com/electron-userland/electron-builder), entrambi strumenti con supporto `snap` fuori dalla scatola. Questa è l'opzione più facile. 2) Usando `electron-istallatore-snap`, che prende l'output dell'`electron-impacchettatore`. 3) Usando un pacchetto `.deb` preesistente.

In alcuni casi, dovrai avere lo strumento `snapcraft` installato. Le istruzioni per installare `snapcraft` per la tua particolare distribuzione sono disponibili [qui](https://snapcraft.io/docs/installing-snapcraft).

## Usando `electron-installatore-snap`

Il modulo fuziona come [`electron-winsallatore`](https://github.com/electron/windows-installer) e simili moduli di questo, con scopi limitati alla costruzione dei pacchetti snap. Puoi installarlo con:

```sh
npm install --save-dev electron-installer-snap
```

### Fase 1: Impacchetta La Tua App Electron

Impacchetta l'app usando [electron-impacchettatore](https://github.com/electron/electron-packager) (o uno strumento simile). Assicurati di rimuovere `node_modules` che non necessiti nella tua applicazione finale, poiché ogni modulo che non ti serve realmente aumenterà le dimensioni della tua applicazione.

L'output dovrebbe sembrare questo:

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

## Using `snapcraft` with `electron-packager`

### Step 1: Create Sample Snapcraft Project

Create your project directory and add add the following to `snap/snapcraft.yaml`:

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

## Usando un Pacchetto Debian Esistente

Snapcraft può prendere un file `.deb` e trasformarlo in uno `.snap`. La creazione di uno snap è configurata usando un file `snapcraft.yaml` che descrive la fonte, le dipendenze, la descrizione ed altri blocchi costruttivi essenziali.

### Fase 1: Crea un Pacchetto Debian

Se non hai già un pacchetto `.deb`, usando `electron-installatore-snap` potrebbe essere un percorso più facile per creare pacchetti snap. Comunque, esistono soluzioni multiple per creare pacchetti Debian, inclusi [`electron-forgia`](https://github.com/electron-userland/electron-forge), [`electron-costruttore`](https://github.com/electron-userland/electron-builder) o [`electron-installatore-debian`](https://github.com/unindented/electron-installer-debian).

### Fase 2: Crea uno snapcraft.yaml

Per ulteriori informazioni sulle opzioni di configurazione disponibili, vedi la [documentazione sulla sintassi di snapcraft](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

```yaml
nome: miaApp
versione: '2.0.0'
sommario: Una piccola descrizione per l'app.
descrizione: |
 Sai una cosa? Questa app è fantastica! Fa di tutto
 per te. Alcuni dicono che ti mantiene giovane, forse anche felice.

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
    ambiente:
      TMPDIR: $XDG_RUNTIME_DIR
```

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Altrimenti, se stai costruendo il tuo `snap` con confinamenti `strict`, puoi usare il comando `desktop-lancio`:

```yaml
app:
  miaApp:
    # Corretto il percorso TMPDIR per Chromium Framework/Electron per assicurare
    # libappindicator abbia risorse leggibili.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```
