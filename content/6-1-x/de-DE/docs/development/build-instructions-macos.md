# Build Anweisungen (macOS)

Follow the guidelines below for building Electron on macOS.

## Vorrausetzungen

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (external)
* Python 2.7 with support for TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npm run check-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

If you are using Python as provided by Homebrew, you also need to install the following Python modules:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

Sie können `pip` verwenden, um es zu installieren:

```sh
$ pip install pyobjc
```

## macOS SDK

Wenn Sie Electron entwickeln und nicht vorhaben Ihre Version zu verteilen, können sie diesen Abschnitt überspringen.

Offizielle Electron Builds werden mit [Xcode 9.4.1](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip) und dem MacOS 10.13 SDK erstellt.  Das Erstellen der Software mit einem neueren SDK funktioniert ebenfalls, aber die veröffentlichten Versionen verwenden derzeit das 10.13 SDK.

## Building Electron

Siehe [Build Instruktionen: GN](build-instructions-gn.md).
