# Ghid de artizanat (Ubuntu Software Centru & Mai mult)

Acest ghid oferă informații despre modul de ambalare a aplicației dvs. Electron pentru orice mediu Snapcraft, inclusiv Ubuntu Software Center.

## Context și Cerințe

Together with the broader Linux community, Canonical aims to fix many of the common software installation problems with the [`snapcraft`](https://snapcraft.io/) project. Snaps are containerized software packages that include required dependencies, auto-update, and work on all major Linux distributions without system modification.

Există trei modalități de a crea un fișier `.snap`:

1) Using [`electron-forge`][electron-forge] or [`electron-builder`][electron-builder], both tools that come with `snap` support out of the box. Aceasta este opţiunea cea mai uşoară. 2) Folosind `electron-installer-snap`, care ia ieșirea lui `electron-packer`. 3) Folosirea unui pachet `.deb` deja creat.

In all cases, you will need to have the `snapcraft` tool installed. We recommend building on Ubuntu 16.04 (or the current LTS).

```sh
instalare snapcraft --clasic
```

While it _is possible_ to install `snapcraft` on macOS using Homebrew, it is not able to build `snap` packages and is focused on managing packages in the store.

## Folosind `electron-installer-snap`

The module works like [`electron-winstaller`][electron-winstaller] and similar modules in that its scope is limited to building snap packages. Poți instala cu:

```sh
npm instalare --save-dev electron-installer-snap
```

### Pasul 1: Împărtășește aplicația ta Electron

Package the application using [electron-packager][electron-packager] (or a similar tool). Asigură-te că elimini `node_module` de care nu ai nevoie în aplicația ta finală, din moment ce orice modul de care nu aveţi nevoie va creşte dimensiunea aplicaţiei.

Rezultatul ar trebui să arate cam așa:

```plaintext
.
• rezistă la
    • ─ app-linux-x64
        <unk> <unk> ─ LICENSE
        <unk> ─ LICENSES. hromium.html
        • ─ content_shell. ak
        <unk> <unk> ─ app
        <unk> ─ nicudtl. la
        <unk> <unk> ─ libgcrypt.so.11
        • ─ libnode. o
        Τηλ... localnici
        <unk> ─ resurse
        <unk> • ─ v8_context_snapshot. în versiunea
        <unk> ─
```

### Pasul 2: Rulând `electron-installer-snap`

De la un terminal care are `ancorare` în `PATH`, rulează `electron-installer-snap` cu singurul parametru necesar `--src`, care este locația pachetului dvs. Aplicație Electron creată în primul pas.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

Dacă aveți o conductă de construcție existentă, puteți utiliza programatic `electron-installer-snap` . For more information, see the [Snapcraft API docs][snapcraft-syntax].

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(``Creat snap at ${snapPath}!`))
```

## Utilizarea unui pachet Debian existent

Fabrica este capabilă să ia un fișier `.deb` existent și să-l transforme în fișier un `.snap`. Crearea unei ancorări este configurată folosind un `snapcraft. aml` fișier care descrie sursele, dependențele, descrierile și alte blocuri de bază .

### Pasul 1: Creează un pachet Debian

Dacă nu aveți deja un pachet `.deb` folosind `electron-installer-snap` ar putea fi o cale mai ușoară pentru a crea pachete de ancorare. However, multiple solutions for creating Debian packages exist, including [`electron-forge`][electron-forge], [`electron-builder`][electron-builder] or [`electron-installer-debian`][electron-installer-debian].

### Pasul 2: Creează un snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax][snapcraft-syntax]. Let's look at an example:

```yaml
nume: versiunea myApp
: '2.0.0'
rezumat: o scurtă descriere pentru aplicație.
descriere: <unk>
 Știți ce? Această aplicație este uimitoare! Face toate lucrurile
 pentru tine. Unii spun că te ţine tânăr, poate chiar fericit.

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
    mediu:
      TMPDIR: $XDG_RUNTIME_DIR
```

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Alternativ, dacă vă construiți comanda `snap` cu `strict` nfinement, puteți utiliza comanda `desktop-launch`:

```yaml
aplicații:
  myApp:
    # Corectați calea TMPDIR pentru Chromium Framework/Electron pentru a asigura
    # libappindicator are resurse lizibile.
    comandă: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```

[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder
[electron-installer-debian]: https://github.com/unindented/electron-installer-debian
[electron-winstaller]: https://github.com/electron/windows-installer
