# Instrucciones para compilación (macOS)

Siga las pautas a continuación para construir Electron en macOS.

## Prerequisitos

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
* [node.js](https://nodejs.org) (externo)
* Python 2.7 con soporte para TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npm run check-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

Si está utilizando Python descargado por Homebrew, también debe instalar los siguientes módulos de Python:

* [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

Si simplemente estás desarrollando Electron y no planeas redistribuir tu compilación personalizada de Electron, puede omitir esta sección.

Las "builds" oficiales de Electron están compiladas con [Xcode 8.3.3](http://adcdownload.apple.com/Developer_Tools/Xcode_8.3.3/Xcode_8.3.3.xip), y el SDK de MacOS 10.12. Building with a newer SDK works too, but the releases currently use the 10.12 SDK.

## Construyendo Electron

Ver [Build Instructions: GN](build-instructions-gn.md).