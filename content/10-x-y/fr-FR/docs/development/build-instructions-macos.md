# Instructions de Build (macOS)

Suivez les indications ci-dessous pour compiler Electron sur macOS.

## Prerequisites

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9,0,0
* [node.js](https://nodejs.org) (externe)
* Python 2.7 avec le support de TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. Pour un test rapide, exécutez :

```sh
$ npx @electron/check-python-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

Si vous utilisez le Python fournit par Homebrew, vous devez également installer les modules Python suivants:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

Vous pouvez utiliser `pip` pour l'installer :

```sh
$ pip install pyobjc
```

## SDK macOS

Si vous développez Electron et ne prévoyez pas de redistribuer votre version d'Electron vous pouvez sauter cette section.

Official Electron builds are built with [Xcode 11.1](https://download.developer.apple.com/Developer_Tools/Xcode_11.1/Xcode_11.1.xip), and the macOS 10.15 SDK. Compiler avec des nouvelles version du SDK marche aussi, mais les releases utilisent actuellement le SDK 10.15.

## Compilation d'Electron

Voir les [Instructions de compilation : GN](build-instructions-gn.md).
