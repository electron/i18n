# Build Anweisungen (macOS)

Befolgen Sie die folgenden Richtlinien für den Aufbau von Electron auf macOS.

## Vorrausetzungen

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [Knoten.js](https://nodejs.org) (extern)
* Python 2.7 mit Unterstützung für TLS 1.2

## Python

Stellen Sie außerdem sicher, dass Ihr System und Ihre Python-Version mindestens TLS 1.2 unterstützen. Dies hängt sowohl von Ihrer Version von macOS als auch von Python ab. Führen Sie für einen Schnelltest aus:

```sh
$px @electron/check-python-tls
```

Wenn das Skript zurückgibt, dass Ihre Konfiguration ein veraltetes Protokoll verwendet, können Sie entweder macOS auf High Sierra aktualisieren oder eine neue Version von Python 2.7.x installieren. Um Python zu aktualisieren, verwenden Sie [Homebrew](https://brew.sh/):

```sh
$ Brauen python@2 && Braulink python@2 --force
```

Wenn Sie Python wie von Homebrew bereitgestellt verwenden, müssen Sie auch die folgenden Python-Module installieren:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

Sie können `pip` verwenden, um es zu installieren:

```sh
$ pip install pyobjc
```

## macOS SDK

Wenn Sie Electron entwickeln und nicht vorhaben Ihre Version zu verteilen, können sie diesen Abschnitt überspringen.

Offizielle Electron-Builds werden mit [Xcode 12.2](https://download.developer.apple.com/Developer_Tools/Xcode_12.2/Xcode_12.2.xip)und dem macOS 11.0 SDK erstellt. Das Erstellen der Software mit einem neueren SDK funktioniert ebenfalls, aber die veröffentlichten Versionen verwenden derzeit das 11.0 SDK.

## Building Electron

Siehe [Build Instruktionen: GN](build-instructions-gn.md).
