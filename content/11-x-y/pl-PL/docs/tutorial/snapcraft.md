# Przewodnik Snapcraft (Ubuntu Software Center & Więcej)

Ten przewodnik zawiera informacje o tym, jak spakować aplikację Electron dla każdego środowiska Snapcraft, w tym Centrum Oprogramowania Ubuntu

## Tło i wymagania

wraz z szerszą społecznością Linuksa, Canonical ma na celu rozwiązanie wielu z wspólnych problemów z instalacją oprogramowania z projektem [`snapcraft`](https://snapcraft.io/) . Snaps to pakiety oprogramowania konteneryzowanego, które zawierają wymagane zależności, automatyczną aktualizację i pracują na wszystkich głównych dystrybucjach Linuksa bez modyfikacji systemu.

Istnieją trzy sposoby na utworzenie pliku `.snap`:

1) Using [`electron-forge`][electron-forge] or [`electron-builder`][electron-builder], both tools that come with `snap` support out of the box. To najprostsza opcja. 2) Korzystanie z `electron-installer-snap`, który generuje `electron-packer`na wyjściu. 3) Korzystanie z już utworzonego pakietu `.deb`.

In all cases, you will need to have the `snapcraft` tool installed. We recommend building on Ubuntu 16.04 (or the current LTS).

```sh
snap install snapcraft --classic
```

While it _is possible_ to install `snapcraft` on macOS using Homebrew, it is not able to build `snap` packages and is focused on managing packages in the store.

## Używanie `electron-installer-snap`

The module works like [`electron-winstaller`][electron-winstaller] and similar modules in that its scope is limited to building snap packages. Możesz zainstalować z:

```sh
npm install --save-dev electron-installer-snap
```

### Krok 1: Spakuj Twoją Aplikację Electron Upewnij się, że usuniesz `node_modules` , których nie potrzebujesz w swojej aplikacji końcowej, ponieważ jakikolwiek moduł, którego tak naprawdę nie potrzebujesz, zwiększy rozmiar aplikacji.</p> 

Wyjście powinno wyglądać mniej więcej tak:



```plaintext
.
Dźwignia
    † App linux-x64
        <unk> <unk> LICENSE
        <unk> <unk> LICENSES. hromium.html
        →content_shell. ak
        × aplikacja
        × × icudtl. na
        &gt; &gt; libgcrypt.so.11
        &gt; libnode. o
        <unk> <unk> locales
        <unk> resources
        <unk> <unk> <unk> v8_context_snapshot. w wersji

```




### Krok 2: Uruchamianie `electron-installer-snap`

Z terminalu, który `snapcraft` w swoim `PATH`, uruchom `electron-installer-snap` z jedynym wymaganym parametrem `--src`, która jest lokalizacją Twojego pakietu Aplikacja Electron utworzona w pierwszym kroku.



```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```


Jeśli masz istniejący proces budowy, możesz użyć `electron-installer-snap` programowo. For more information, see the [Snapcraft API docs][snapcraft-syntax].



```js
const snap = require('electron-installer-snap')

snap(opcje)
  .then(snapŚcieżka => console.log(`Utworzona snap w ${snapPath}!`))
```




## Używanie istniejącego pakietu Debian

Snapcraft jest w stanie pobrać istniejący plik `.deb` i zamienić go w plik `.snap`. Tworzenie snap jest skonfigurowane za pomocą `snapcraft. aml` plik opisujący źródła, zależności, opis i inne podstawowe bloki budowlane.



### Krok 1: Utwórz pakiet debiański

Jeśli nie masz jeszcze pakietu `.deb` , użycie `electron-installer-snap` może być prostszą ścieżką do tworzenia pakietów przyciągających. However, multiple solutions for creating Debian packages exist, including [`electron-forge`][electron-forge], [`electron-builder`][electron-builder] or [`electron-installer-debian`][electron-installer-debian].



### Krok 2: Utwórz snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax][snapcraft-syntax]. Let's look at an example:



```yaml
nazwa: myApp
wersja: '2.0.0'
streszczenie: Mały opis aplikacji.
opis: |
 Wiesz co? Ta aplikacja jest niesamowita! To wszystko robi dla ciebie
. Niektórzy mówią, że jest to dla Ciebie młode, być może nawet szczęśliwe.

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


As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:



```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```


Alternatywnie, jeśli budujesz `przyciągnij` z `ścisłym` zamknięciem, możesz użyć polecenia `uruchamiania`:



```yaml
aplikacje:
  myApp:
    # Popraw ścieżkę TMPDIR dla Chromium Framework/Electron aby upewnić się, że
    # libappindicator ma czytelne zasoby.
    polecenie: plv TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-laun $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```

[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder
[electron-installer-debian]: https://github.com/unindented/electron-installer-debian
[electron-winstaller]: https://github.com/electron/windows-installer
