# Snapcraft Guide (Ubuntu Software Center & Mehr)

Diese Anleitung enthält Informationen darüber, wie Sie Ihre Electron-Anwendung für jede Snapcraft Umgebung, einschließlich des Ubuntu Software Centers, paketieren können.

## Hintergrund und Voraussetzungen

Zusammen mit der breiteren Linux-Community Canonical zielt darauf ab, viele der verbreiteten Softwareinstallationsprobleme mit dem [`snapcraft`](https://snapcraft.io/) Projekt zu beheben. Snaps sind containerifizierte Softwarepakete, die benötigte Abhängigkeiten enthalten und automatisch aktualisiert werden und ohne Systemveränderungen an allen wichtigen Linux-Distributionen arbeiten.

Es gibt drei Möglichkeiten, eine `.snap` Datei zu erstellen:

1) Using [`electron-forge`][electron-forge] or [`electron-builder`][electron-builder], both tools that come with `snap` support out of the box. Das ist die einfachste Option. 2) Verwendung von `electron-installer-rap`, was `Elektron-packager`ausgibt. 3) Benutze ein bereits erstelltes `.deb` Paket.

In einigen Fällen müssen Sie das `Snapcraft` Werkzeug installiert haben. Anweisungen zur Installation von `snapcraft` für Ihre bestimmte Distribution sind hier [verfügbar](https://snapcraft.io/docs/installing-snapcraft).

## `Elektron-Installer-Einrasten` verwenden

The module works like [`electron-winstaller`][electron-winstaller] and similar modules in that its scope is limited to building snap packages. Sie können installieren mit:

```sh
npm Installation --save-dev electron-installer-rap
```

### Schritt 1: Die Electron Anwendung packen

Package the application using [electron-packager][electron-packager] (or a similar tool). Achten Sie darauf, `node_modules` zu entfernen, die Sie in Ihrer Endanwendung nicht benötigen da jedes Modul, das Sie nicht benötigen, die Größe Ihrer Anwendung erhöht.

Die Ausgabe sollte etwa wie folgt aussehen:

```plaintext
.
<unk> 本<unk> dist
    <unk> 本<unk> app-linux-x64
        <unk> 本<unk> LICENSE
        <unk> 本<unk> LICENSES. hromium.html
        <unk> 文<unk> content_shell. ak
        <unk> 本<unk> app
        <unk> <unk> <unk> <unk> icudtl. unter
        <unk> 本<unk> libgcrypt.so.11
        <unk> 文<unk> libnode. o
        <unk> 本<unk> Gebietsschema
        <unk> 本<unk> Ressourcen
        <unk> <unk> v8_context_snapshot. in
        <unk> 本<unk> Version
```

### Schritt 2: Führe `Elektron-Installer-Einrasten`

Von einem Terminal, das `Snapcraft` in seinem `PATH`hat, führen Sie `electron-installer-snap` mit dem einzigen erforderlichen Parameter `--src`aus, das ist der Ort Ihrer gepackten Electron Applikation, die im ersten Schritt erstellt wurde.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

Wenn Sie eine vorhandene Build-Pipeline haben, können Sie `Elektron-Installer-Einrasten` programmatisch verwenden. For more information, see the [Snapcraft API docs][snapcraft-syntax].

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

## Benutze ein bestehendes Debian-Paket

Snapcraft kann eine vorhandene `.deb` Datei aufnehmen und in eine `.snap` Datei verwandeln. Die Erstellung eines Schnapps ist mit einer `-Schnappmaschine konfiguriert. aml` Datei, die die Quellen, Abhängigkeiten, Beschreibungen und andere Kern- Bausteine beschreibt.

### Schritt 1: Erstelle ein Debian-Paket

Wenn Sie noch nicht über ein `.deb` Paket verfügen, ist die Verwendung von `electron-installer-rap` möglicherweise ein einfacherer Pfad, um Einrastpakete zu erstellen. However, multiple solutions for creating Debian packages exist, including [`electron-forge`][electron-forge], [`electron-builder`][electron-builder] or [`electron-installer-debian`][electron-installer-debian].

### Schritt 2: Erstellen Sie eine snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax][snapcraft-syntax]. Let's look at an example:

```yaml
name: myApp
version: '2.0.0'
summary: Eine kurze Beschreibung der App.
weist du was? Diese App ist unglaublich! Sie tut all diese Dinge für dich. Manch einer behauptet, sie hält dich jung oder macht dich sogar glücklich.

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

Alternatively, if you're building your `snap` with `strict` confinement, you can use the `desktop-launch` command:

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
