# Инструкции по сборке (macOS)

Follow the guidelines below for building **Electron itself** on macOS, for the purposes of creating custom Electron binaries. For bundling and distributing your app code with the prebuilt Electron binaries, see the [application distribution][application-distribution] guide.

## Требования

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (внешнее)
* Python 2.7 с поддержкой TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npx @electron/check-python-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

Если вы используете Python предоставленный Homebrew, вам также необходимо установить следующие модули Python:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

Вы можете использовать `pip` для установки:

```sh
$ pip установить pyobjc
```

## macOS SDK

If you're developing Electron and don't plan to redistribute your custom Electron build, you may skip this section.

Official Electron builds are built with [Xcode 12.2](https://download.developer.apple.com/Developer_Tools/Xcode_12.2/Xcode_12.2.xip), and the macOS 11.0 SDK. Building with a newer SDK works too, but the releases currently use the 11.0 SDK.

## Собираем Electron

See [Build Instructions: GN](build-instructions-gn.md).

[application-distribution]: ../tutorial/application-distribution.md
