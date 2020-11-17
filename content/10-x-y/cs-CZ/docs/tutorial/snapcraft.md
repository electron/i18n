# Průvodce Snapcraft (Ubuntu Software Center & více)

Tato příručka poskytuje informace o tom, jak nainstalovat vaši Electron aplikaci pro jakékoli prostředí Snapcraft, včetně softwarového centra Ubuntu .

## Pozadí a Požadavky

Společně s širší komunitou Linuxu Canonical si klade za cíl opravit mnoho z běžných problémů s instalací softwaru s projektem [`snapcraft`](https://snapcraft.io/) . Snaps jsou balíky s kontejnery, které obsahují požadované závislosti, automatickou aktualizaci a fungují na všech hlavních distribucích Linuxu bez úpravy systému.

Existují tři způsoby, jak vytvořit soubor `.snap`:

1) Using [`electron-forge`][electron-forge] or [`electron-builder`][electron-builder], both tools that come with `snap` support out of the box. To je nejjednodušší možnost. 2) Používání `electron-installer-snap`, který bere `elektronický balík`výstup. 3) Použití již vytvořeného balíčku `.deb`.

In all cases, you will need to have the `snapcraft` tool installed. We recommend building on Ubuntu 16.04 (or the current LTS).

```sh
snap instalace snapcraft --classic
```

While it _is possible_ to install `snapcraft` on macOS using Homebrew, it is not able to build `snap` packages and is focused on managing packages in the store.

## Používá se `elektron-installer-snap`

The module works like [`electron-winstaller`][electron-winstaller] and similar modules in that its scope is limited to building snap packages. Můžete ji nainstalovat pomocí:

```sh
npm install --save-dev electron-installer-snap
```

### Krok 1: Připojte vaši Electron aplikaci

Package the application using [electron-packager][electron-packager] (or a similar tool). Ujistěte se, že odstraníte `node_modules` , které nepotřebujete ve své konečné aplikaci, protože žádný modul, který ve skutečnosti nepotřebujete, zvýší velikost vaší aplikace.

Výstup by měl vypadat zhruba takto:

```plaintext
.
<unk> Ă dist
    <unk> Ă app-linux-x64
        <unk> ý-ý-ý-LICENSE
        <unk> ý-ý-LICENSES. hromium.html
        <unk> я content_shell. ak
        <unk> (<unk> <unk> ) aplikace
        , <unk> (<unk> ) icudtl. v
        <unk> Ă libgcrypt.so.11
        <unk> šek šek libnode. o
        <unk> ý-locales
        <unk> ý-resources
        <unk> ý-ý-v8_context_snapshot. v
        <unk> (<unk> <unk> ) verzi
```

### Krok 2: Běh `elektroinstalátor-hlemýždi`

z terminálu, který má `snapcraft` ve svém `PATH`, spustit `electron-installer-snap` s jediným požadovaným parametrem `--src`která je umístěna vaší zabalené Electron aplikace, která byla vytvořena v prvním kroku.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

Máte-li již existující vývojářský produkt, můžete programovat `electron-installer-snap` . For more information, see the [Snapcraft API docs][snapcraft-syntax].

```js
const snap = require('electron-installer-snap')

snap(volitelné)
  .then(napPath => console.log(`Created Přicházení v ${snapPath}!`))
```

## Použití existujícího balíku Debianu

Snapcraft může použít existující soubor `.deb` a změnit jej na soubor a `.snap`. Vytvoření hlemýždi je nakonfigurováno pomocí `snapcraft. soubor aml` , který popisuje zdroje, závislosti, popis a další základní stavební bloky.

### Krok 1: Vytvořte balíček Debianu

If you do not already have a `.deb` package, using `electron-installer-snap` might be an easier path to create snap packages. However, multiple solutions for creating Debian packages exist, including [`electron-forge`][electron-forge], [`electron-builder`][electron-builder] or [`electron-installer-debian`][electron-installer-debian].

### Krok 2: Vytvoř snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax][snapcraft-syntax]. Let's look at an example:

```yaml
Název: myApp
verze: '2.0.0'
shrnutí: malý popis aplikace.
popis: |
 Co víš? Tato aplikace je úžasná! To pro vás dělá vše
. Někteří říkají, že vás udržuje mladý, možná dokonce šťastný.

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
    životní prostředí:
      TMPDIR: $XDG_RUNTIME_DIR
```

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Alternativně pokud budujete svůj `hlemýžd` s `přísným` , můžete použít příkaz `desktop-launch`:

```yaml
aplikace:
  myApp:
    # Opravte TMPDIR cestu pro Chromium Framework/Electron pro zajištění
    # libappindikátor má čitelné zdroje.
    příkaz: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    plocha: usr/share/applications/desktop.desktop
```

[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder
[electron-installer-debian]: https://github.com/unindented/electron-installer-debian
[electron-winstaller]: https://github.com/electron/windows-installer
