# Snapcraft Guide (Ubuntu Software Center & meer)

Deze handleiding biedt informatie over hoe je de Electron applicatie voor elke Snapcraft omgeving, inclusief het Ubuntu Software Center, moet verwerken.

## Achtergrond en vereisten

Together with the broader Linux community, Canonical aims to fix many of the common software installation problems with the [`snapcraft`](https://snapcraft.io/) project. Snaps zijn gecontainreerde softwarepakketten die vereiste dependencies, auto-update en werken aan alle grote Linux distributies zonder systeemwijziging.

Er zijn drie manieren om een bestand `.snap` te maken:

1) gebruik makend van [`electron-forge`](https://github.com/electron-userland/electron-forge) of [`electron-builder`](https://github.com/electron-userland/electron-builder), beide gereedschappen die komen met `klik` steun uit de doos. Dit is de gemakkelijkste optie. 2) Met `electron-installer-`kun je `electron-packager`'s output. 3) Een pakket gebruikt dat al is aangemaakt `.deb`.

In sommige gevallen moet je de `snapcraft` tool hebben geïnstalleerd. Instructies voor het installeren van `snapcraft` voor je specifieke distributie zijn beschikbaar [hier](https://snapcraft.io/docs/installing-snapcraft).

## Gebruik `electron-installer-snap`

De module werkt als [`electron-winstaller`](https://github.com/electron/windows-installer) en soortgelijke modules in dat de reikwijdte beperkt is tot het bouwen van snap pakketten. U kunt installeren met:

```sh
npm installeren --save-dev electron-installer-snap
```

### Stap 1: pakket je Electron applicatie

Pakket de toepassing met behulp van [electron-packager](https://github.com/electron/electron-packager) (of een soortgelijke tool). Zorg ervoor dat je `node_modules` verwijdert die je niet nodig hebt in je uiteindelijke applicatie, omdat elke module die je niet nodig hebt de grootte van je applicatie verhoogt.

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

Als je een bestaande build-pijplijn hebt, kun je `electron-installer-snap` programmatisch gebruiken. Zie de [Snapcraft API documentatie](https://docs.snapcraft.io/build-snaps/syntax) voor meer informatie.

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Gemaakte snap op ${snapPath}!`))
```

## Met behulp van een bestaand Debian Pakket

Snapcraft is in staat om een bestaand `.deb` bestand te gebruiken en het te veranderen in a `.snap` bestand. De aanmaak van een snap is geconfigureerd met behulp van een `snapcraft. aml` bestand dat de bronnen, afhankelijkheden, beschrijving en andere core bouwblokken beschrijft.

### Stap 1: Maak een Debiaans Pakket

Als u nog geen `.deb` pakket hebt, kan het gebruik van `electron-installer-snap` een makkelijker pad zijn om snap pakketten aan te maken. Er zijn echter meerdere oplossingen voor het maken van Debian pakketten, waaronder [`electron-forge`](https://github.com/electron-userland/electron-forge), [`electron-builder`](https://github.com/electron-userland/electron-builder) of [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### Stap 2: Maak een snapcraft.yaml

Voor meer informatie over de beschikbare configuratie-opties, zie de [documentatie over de snapcraft syntax](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

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
