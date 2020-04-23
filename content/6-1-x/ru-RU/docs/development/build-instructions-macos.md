# Инструкции по сборке (macOS)

Следуйте рекомендациям ниже для сборки Electron на macOS.

## Требования

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (внешнее)
* Python 2.7 с поддержкой TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npm run check-tls
```

Если скрипт возвращает, что ваша конфигурация использует устаревший протокол безопасности, вы можете либо обновить macOS на High Sierra, либо установить новую версию Python 2.7.x. Чтобы обновить Python, используйте [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

If you are using Python as provided by Homebrew, you also need to install the following Python modules:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

You can use `pip` to install it:

```sh
$ pip установить pyobjc
```

## macOS SDK

If you're developing Electron and don't plan to redistribute your custom Electron build, you may skip this section.

Official Electron builds are built with [Xcode 9.4.1](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip), and the MacOS 10.13 SDK.  Building with a newer SDK works too, but the releases currently use the 10.13 SDK.

## Собираем Electron

See [Build Instructions: GN](build-instructions-gn.md).
