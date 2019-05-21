# Instructions de Build (macOS)

Suivez les indications ci-dessous pour compiler Electron sur macOS.

## Prérequis

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (externe)
* Python 2.7 avec le support de TLS 1.2

## Python

Veuillez vous assurer que votre système et votre version de Python supporte au moins le TLS 1.2. Cela dépend à la fois de votre version de macOS et Python. Pour un test rapide, lancez:

```sh
$ npm run check-tls
```

Si le script vous retourne que votre configuration utilise un protocole de sécurité obsolète, vous pouvez soit mettre à jour macOS vers High Sierra ou installer une nouvelle version de Python 2.7.x. Pour mettre à jour Python, utilisez [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

Si vous utilisez le Python fournit par Homebrew, vous devez également installer les modules Python suivants:

* [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## SDK macOS

Si vous développez Electron et ne prévoyez pas de redistribuer votre version d'Electron vous pouvez sauter cette section.

Official Electron builds are built with [Xcode 9.4.1](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip), and the MacOS 10.13 SDK. Compiler avec des nouvelles version du SDK marche aussi, mais les releases utilisent actuellement le SDK 10.13.

## Compilation d'Electron

Voir les [Instructions de compilation : GN](build-instructions-gn.md).