# Instrukcje Budowania (macOS)

Follow the guidelines below for building Electron on macOS.

## Wymagania

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (zewnętrznie)
* Python 2.7 z wsparciem dla TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npx @electron/check-python-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

Jeśli używasz wersji Pythona dostarczonego przez Homebrew, potrzebujesz również doinstalować następujące moduły:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

Możesz wykorzystać `pip` do zainstalowania tego:

```sh
$ pip install pyobjc
```

## macOS SDK

Jeśli rozwijasz Electron i nie planujesz rozpowszechniać niestandardowej kompilacji Electron, możesz pominąć tę sekcję.

Official Electron builds are built with [Xcode 9.4.1](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip), and the macOS 10.13 SDK.  Budowanie z nowszym SDK również działa, aczkolwiek wydania aktualnie używają wersji SDK 10.13.

## Budowanie Electrona

See [Instrukcje Budowania (Ogólne)](build-instructions-gn.md).
