# Snapcraft Guide (Ubuntu Software Center & meer)

Deze handleiding biedt informatie over hoe je de Electron applicatie voor elke Snapcraft omgeving, inclusief het Ubuntu Software Center, moet verwerken.

## Achtergrond en vereisten

Together with the broader Linux community, Canonical aims to fix many of the common software installation problems with the [`snapcraft`](https://snapcraft.io/) project. Snaps zijn gecontainreerde softwarepakketten die vereiste dependencies, auto-update en werken aan alle grote Linux distributies zonder systeemwijziging.

Er zijn drie manieren om een bestand `.snap` te maken:

1) Using [`electron-forge`][electron-forge] or [`electron-builder`][electron-builder], both tools that come with `snap` support out of the box. Dit is de gemakkelijkste optie. 2) Met `electron-installer-`kun je `electron-packager`'s output. 3) Een pakket gebruikt dat al is aangemaakt `.deb`.

In all cases, you will need to have the `snapcraft` tool installed. We recommend building on Ubuntu 16.04 (or the current LTS).

```sh
snap installatie snapcraft --klassiek
```

While it _is possible_ to install `snapcraft` on macOS using Homebrew, it is not able to build `snap` packages and is focused on managing packages in the store.

## Gebruik `electron-installer-snap`

The module works like [`electron-winstaller`][electron-winstaller] and similar modules in that its scope is limited to building snap packages. U kunt installeren met:

```sh
npm installeren --save-dev electron-installer-snap
```

### Stap 1: pakket je Electron applicatie

Package the application using [electron-packager][electron-packager] (or a similar tool). Zorg ervoor dat je `node_modules` verwijdert die je niet nodig hebt in je uiteindelijke applicatie, omdat elke module die je niet nodig hebt de grootte van je applicatie verhoogt.

De uitvoer zou er ongeveer zo uit moeten zien:

```plaintext
.
+unnamed@@0 dist
    ・wom. app-linux-x664
        ρLICENSESE
        ρρLICENSES. hromium.html
        ½ content_shell. akte
        ½ ½ app
        ρreached. icudtl. op
        --------womit libgcrypt.so.11
        A36 libnode. o
        ・²locales
        ½ locales
        Februath resources 
 womt_context_snapshot. in
        ½ ½ versie
```

### Stap 2: `electron-installer-snap` uitvoeren

Van een terminal met `snapcraft` in zijn `PATH`, voer `electron-installer-snap` met de enige vereiste parameter `--src`, wat de locatie is van je verpakte Electron applicatie gemaakt in de eerste stap.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

Als je een bestaande build-pijplijn hebt, kun je `electron-installer-snap` programmatisch gebruiken. For more information, see the [Snapcraft API docs][snapcraft-syntax].

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Gemaakte snap op ${snapPath}!`))
```

## Met behulp van een bestaand Debian Pakket

Snapcraft is in staat om een bestaand `.deb` bestand te gebruiken en het te veranderen in a `.snap` bestand. De aanmaak van een snap is geconfigureerd met behulp van een `snapcraft. aml` bestand dat de bronnen, afhankelijkheden, beschrijving en andere core bouwblokken beschrijft.

### Stap 1: Maak een Debiaans Pakket

Als u nog geen `.deb` pakket hebt, kan het gebruik van `electron-installer-snap` een makkelijker pad zijn om snap pakketten aan te maken. However, multiple solutions for creating Debian packages exist, including [`electron-forge`][electron-forge], [`electron-builder`][electron-builder] or [`electron-installer-debian`][electron-installer-debian].

### Stap 2: Maak een snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax][snapcraft-syntax]. Let's look at an example:

```yaml
naam: myApp
versie: '2.0.0'
samenvatting: Een korte beschrijving voor de app.
beschrijving: ℃
 Weet je wat? Deze app is geweldig! Het doet alle dingen
 voor u. Sommigen zeggen dat het je jong houdt, misschien zelfs gelukkig.

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
    omgeving:
      TMPDIR: $XDG_RUNTIME_DIR
```

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 & &
```

Als je ook je `snap` met `strikte` isolatie aan het maken bent, kun je het `desktop-launch` commando gebruiken:

```yaml
apps:
  myApp:
    # Corrigeer het pad van de TMPDIR voor Chromium Framework/Electron om ervoor te zorgen dat
    # libappindicator leesbare bronnen heeft.
    opdracht: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-lancering $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```

[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder
[electron-installer-debian]: https://github.com/unindented/electron-installer-debian
[electron-winstaller]: https://github.com/electron/windows-installer
