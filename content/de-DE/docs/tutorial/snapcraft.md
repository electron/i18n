# Snapcraft Guide (Ubuntu Software Center & Mehr)

Diese Anleitung enthält Informationen darüber, wie Sie Ihre Electron-Anwendung für jede Snapcraft Umgebung, einschließlich des Ubuntu Software Centers, paketieren können.

## Hintergrund und Voraussetzungen

Zusammen mit der breiteren Linux-Community Canonical zielt darauf ab, viele der verbreiteten Softwareinstallationsprobleme mit dem [`snapcraft`](https://snapcraft.io/) Projekt zu beheben. Snaps sind containerifizierte Softwarepakete, die benötigte Abhängigkeiten enthalten und automatisch aktualisiert werden und ohne Systemveränderungen an allen wichtigen Linux-Distributionen arbeiten.

Es gibt drei Möglichkeiten, eine `.snap` Datei zu erstellen:

1) Mit [`electron-forge`][electron-forge] oder [`electron-builder`][electron-builder], beide Werkzeuge, die mit `snap` Unterstützung aus dem Kasten kommen. Das ist die einfachste Option. 2) Verwendung von `electron-installer-rap`, was `Elektron-packager`ausgibt. 3) Benutze ein bereits erstelltes `.deb` Paket.

In einigen Fällen müssen Sie das `Snapcraft` Werkzeug installiert haben. Anweisungen zur Installation von `snapcraft` für Ihre bestimmte Distribution sind hier [verfügbar](https://snapcraft.io/docs/installing-snapcraft).

## `Elektron-Installer-Einrasten` verwenden

Das Modul funktioniert wie [`electron-winstaller`][electron-winstaller] und ähnliche Module, da sein Anwendungsbereich auf das Erstellen von Snap-Paketen beschränkt ist. Sie können installieren mit:

```sh
npm Installation --save-dev electron-installer-rap
```

### Schritt 1: Die Electron Anwendung packen

Verpacken Sie die Anwendung mit [Elektronen-Paket-][electron-packager] (oder einem ähnlichen Werkzeug). Achten Sie darauf, `node_modules` zu entfernen, die Sie in Ihrer Endanwendung nicht benötigen da jedes Modul, das Sie nicht benötigen, die Größe Ihrer Anwendung erhöht.

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

Wenn Sie eine vorhandene Build-Pipeline haben, können Sie `Elektron-Installer-Einrasten` programmatisch verwenden. Weitere Informationen finden Sie in der [Snapcraft-API-Dokumente][snapcraft-syntax].

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## Verwenden von `snapcraft` mit `electron-packager`

### Schritt 1: Erstellen von Beispiel-Snapcraft-Projekt

Erstellen Sie Ihr Projektverzeichnis, und fügen Sie `snap/snapcraft.yaml`Folgendes hinzu:

```yaml
Name: electron-packager-hello-world
Version: '0.1'
Zusammenfassung: Hello World Electron App
Beschreibung: |
  Simple Hello World Electron App als Beispiel
Basis: core18
Einschließung: streng
Grade: stabil

Apps:
  -Elektronen-Paket-hallo-Welt:
    Befehl: elektronen-quick-start/electron-quick-start --no-sandbox
    Extensions: [gnome-3-34]
    Stecker:
    - Browser-Unterstützung
    - Netzwerk-
    - Netzwerk-bindung
    -Umgebung:
      

      TMPDIR: $XDG_RUNTIME_DIR

Teile:
  Elektron-Schnellstart:
    Plugin: null
    Quelle: https://github.com/electron/electron-quick-start.git
    override-build: |
        npm installieren Elektronen-Elektronen-Paket
        npx-Elektronen-Paket. --overwrite --platform=linux --output=release-build --prune=true
        cp -rv ./electron-quick-start-linux-* $SNAPCRAFT_PART_INSTALL/electron-quick-start
    build-snaps:
    - node/14/stable
    build-packages:
    - unzip
    stage-packages:
    - libnss3
    - libnspr4
```

Wenn Sie dieses Beispiel auf ein vorhandenes Projekt anwenden möchten:

- Ersetzen Sie `source: https://github.com/electron/electron-quick-start.git` durch `source: .`.
- Ersetzen Sie alle Instanzen von `electron-quick-start` durch den Projektnamen.

### Schritt 2: Erstellen des Snaps

```sh
$ Snapcraft

<output snipped>
Snapped electron-packager-hello-world_0.1_amd64.snap
```

### Schritt 3: Installieren Sie den Snap

```sh
sudo snap installieren electron-packager-hello-world_0.1_amd64.snap --gefährlich
```

### Schritt 4: Ausführen des Snaps

```sh
elektro-packager-hello-world
```

## Benutze ein bestehendes Debian-Paket

Snapcraft kann eine vorhandene `.deb` Datei aufnehmen und in eine `.snap` Datei verwandeln. Die Erstellung eines Schnapps ist mit einer `-Schnappmaschine konfiguriert. aml` Datei, die die Quellen, Abhängigkeiten, Beschreibungen und andere Kern- Bausteine beschreibt.

### Schritt 1: Erstelle ein Debian-Paket

Wenn Sie noch nicht über ein `.deb` Paket verfügen, ist die Verwendung von `electron-installer-rap` möglicherweise ein einfacherer Pfad, um Einrastpakete zu erstellen. Es gibt jedoch mehrere Lösungen, die für die Erstellung von Debian-Paketen , einschließlich [`electron-forge`][electron-forge], [`electron-builder`][electron-builder] oder [`electron-installer-debian`][electron-installer-debian].

### Schritt 2: Erstellen Sie eine snapcraft.yaml

Weitere Informationen zu den verfügbaren Konfigurationsoptionen finden Sie in der [Dokumentation zur Snapcraft-Syntax][snapcraft-syntax]. Sehen wir uns ein Beispiel an:

```yaml
name: myApp
version: '2.0.0'
summary: Eine kurze Beschreibung der App.
weist du was? Diese App ist unglaublich! Sie tut all diese Dinge für dich. Manch einer behauptet, sie hält dich jung oder macht dich sogar glücklich.

Note: stabil
Einschließung: klassische

Teile:
  Slack:
    Plugin: dump
    Quelle: my-deb.deb
    source-type: deb
    nach:
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
  -Elektronenstart:
    Plugin: dump
    Quelle: dateien/
    vorbereiten: |
      chmod +x bin/electron-launch

Apps:
  myApp:
    Befehl: bin/electron-launch $SNAP/usr/lib/myApp/myApp
    Desktop: usr/share/applications/myApp.desktop
    . Korrigieren Sie den TMPDIR-Pfad für Chromium Framework/Electron, um sicherzustellen,
    .
    environment:
      TMPDIR: $XDG_RUNTIME_DIR
```

Wie Sie sehen können, weist der `snapcraft.yaml` das System an, eine Datei namens `electron-launch`zu starten. In diesem Beispiel werden Informationen an die Binärdatei der -App weitergegeben:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Wenn Sie Ihre `snap` mit `strict` -Einschließung erstellen, können Sie den Befehl `desktop-launch` verwenden:

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
