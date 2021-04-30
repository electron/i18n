# Instruções para Compilação (macOS)

Follow the guidelines below for building **Electron itself** on macOS, for the purposes of creating custom Electron binaries. For bundling and distributing your app code with the prebuilt Electron binaries, see the [application distribution][application-distribution] guide.

## Pré-requisitos

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (externo)
* Python 2.7 com suporte para TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npx @electron/check-python-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

If you are using Python as provided by Homebrew, you also need to install the following Python modules:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

You can use `pip` to install it:

```sh
$ pip instalar pyobjc
```

## macOS SDK

Se está desenvolvendo com Electron e não planeja redistribuir sua construção personalizada, pode pular essa seção.

Official Electron builds are built with [Xcode 12.2](https://download.developer.apple.com/Developer_Tools/Xcode_12.2/Xcode_12.2.xip), and the macOS 11.0 SDK. Compilar com um SDK mais recente também funciona, mas os lançamentos atualmente usam o SDK 11.0.

## Construindo Electron

Veja [Instruções de build: GN](build-instructions-gn.md).

[application-distribution]: ../tutorial/application-distribution.md
