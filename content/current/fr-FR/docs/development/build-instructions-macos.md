# Instructions de compilation (macOS)

Suivez les indications ci-dessous pour compiler Electron sur macOS.

## Prérequis

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9,0,0
* [node.js](https://nodejs.org) (externe)
* Python 2.7 avec le support de TLS 1.2

## Python

S’il vous plaît également s’assurer que votre système et la version Python prendre en charge au moins TLS 1.2. Cela dépend à la fois de votre version de macOS et Python. Pour un test rapide, exécutez :

```sh
$ npx @electron/check-python-tls
```

Si le script vous retourne que votre configuration utilise un protocole de sécurité obsolète, vous pouvez soit mettre à jour macOS vers High Sierra ou installer une nouvelle version de Python 2.7.x. Pour mettre à jour Python, utilisez [Homebrew](https://brew.sh/):

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

Les builds officiels Electron sont construits avec [Xcode 12.2](https://download.developer.apple.com/Developer_Tools/Xcode_12.2/Xcode_12.2.xip), et le macOS 11.0 SDK. Compiler avec des nouvelles version du SDK marche aussi, mais les releases utilisent actuellement le SDK 11.0.

## Compilation d'Electron

Voir les [Instructions de compilation : GN](build-instructions-gn.md).
