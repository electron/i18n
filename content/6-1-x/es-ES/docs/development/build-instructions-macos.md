# Instrucciones para compilación (macOS)

Siga las pautas a continuación para construir Electron en macOS.

## Prerequisitos

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (externo)
* Python 2.7 con soporte para TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npm run check-tls
```

Si el script devuelve que su configuración está usando un protocolo de seguridad obsoleto, puede actualizar macOS a High Sierra o instalar una nueva versión de Python 2.7.x. Para actualizar Python use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

Si está utilizando Python descargado por Homebrew, también debe instalar los siguientes módulos de Python:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

Usted puede usar `pip` para instalarlo:

```sh
$ pip install pyobjc
```

## SDK macOS

Si simplemente estás desarrollando Electron y no planeas redistribuir tu compilación personalizada de Electron, puede omitir esta sección.

Las compilaciones oficiales de Electron están basadas en [Xcode 9.4.1](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip), y MacOS 10.13 SDK.  Construir con un SDK más nuevo también funciona, pero las versiones actualmente usan el SDK 10.13.

## Construyendo Electron

Ver [Build Instructions: GN](build-instructions-gn.md).
