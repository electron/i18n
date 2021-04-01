# Инструкции по сборке (macOS)

Следуйте рекомендациям ниже для сборки Electron на macOS.

## Требования

* macOS >No 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >9.0.0
* [node.js](https://nodejs.org) (внешнее)
* Python 2.7 с поддержкой TLS 1.2

## Python

Пожалуйста, также убедитесь, что ваша система и версия Python поддерживают по крайней мере TLS 1.2. Это зависит как от вашей версии macOS, так и от Python. Для быстрого теста запустите:

```sh
$ npx @electron/check-python-tls
```

Если скрипт возвращает, что ваша конфигурация использует устаревший протокол безопасности , вы можете обновить macOS для High Sierra или установить новую версию Python 2.7.x. Для обновления Python используйте [Homebrew](https://brew.sh/):

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

Официальные сборки Electron построены с [Xcode 12.2](https://download.developer.apple.com/Developer_Tools/Xcode_12.2/Xcode_12.2.xip), и macOS 11.0 SDK. Building with a newer SDK works too, but the releases currently use the 11.0 SDK.

## Собираем Electron

See [Build Instructions: GN](build-instructions-gn.md).
