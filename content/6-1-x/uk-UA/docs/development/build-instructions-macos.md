# Інструкція Збірки (macOS)

Дотримуйтесь рекомендацій нижче для збірки Electron на macOS.

## Системні вимоги

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [Node.js](https://nodejs.org) (зовнішній)
* Python 2.7 with support for TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npm run check-tls
```

Якщо скрипт повертає, що ваша конфігурація використовує застарілий протокол безпеки, ви можете або оновити macOS до High Sierra, або встановити нову версію Python 2.7.x. Щоб оновити Python, використайте [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

If you are using Python as provided by Homebrew, you also need to install the following Python modules:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

Ви можете використати `pip` для встановлення:

```sh
$ pip install pyobjc
```

## macOS SDK

Якщо ви розробляєте Electron і не плануєте перенаправити ваші користувальницькі Electron збірки, ви можете пропустити цей розділ.

Official Electron builds are built with [Xcode 9.4.1](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip), and the MacOS 10.13 SDK.  Building with a newer SDK works too, but the releases currently use the 10.13 SDK.

## Building Electron

See [Build Instructions: GN](build-instructions-gn.md).
