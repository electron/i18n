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

Impacchetta l'app usando [electron-impacchettatore](https://github.com/electron-userland/electron-packager) (o uno strumento simile). Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

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

## Usando un Pacchetto Debian Esistente

Snapcraft può prendere un file `.deb` e trasformarlo in uno `.snap`. La creazione di uno snap è configurata usando un file `snapcraft.yaml` che descrive la fonte, le dipendenze, la descrizione ed altri blocchi costruttivi essenziali.

### Fase 1: Crea un Pacchetto Debian

Se non hai già un pacchetto `.deb`, usando `electron-installatore-snap` potrebbe essere un percorso più facile per creare pacchetti snap. Comunque, esistono soluzioni multiple per creare pacchetti Debian, inclusi [`electron-forgia`](https://github.com/electron-userland/electron-forge), [`electron-costruttore`](https://github.com/electron-userland/electron-builder) o [`electron-installatore-debian`](https://github.com/unindented/electron-installer-debian).

### Fase 2: Crea uno snapcraft.yaml

Per altre informazioni sulle opzioni di configurazione disponibili, vedi la [documentazione sulla sintassi snapcraft](https://docs.snapcraft.io/build-snaps/syntax). Guardiamo un esempio:

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