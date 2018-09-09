# Инструкции по сборке (macOS)

Следуйте рекомендациям ниже для сборки Electron на macOS.

## Требования

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](https://nodejs.org) (внешнее)
- Python 2.7 with support for TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npm run check-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

If you are using Python as provided by Homebrew, you also need to install the following Python modules:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

If you're developing Electron and don't plan to redistribute your custom Electron build, you may skip this section.

Для работы некоторых функций (например pinch-zoom) правильно, вы должны выбрать macOS 10.10 SDK.

Официальные Electron сборки создаются на [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), которая не содержит 10.10 SDK по умолчанию. Для его получения, сначала загрузите и установите [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG.

Затем предполагая, что Xcode 6.4 DMG был смонтирован в `/Volumes/Xcode` и установленый Xcode 8.2.1 находится в `/Applications/Xcode.app`, запустите:

```sh
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

Вы также должны включить Xcode, чтобы построить на 10.10 SDK:

- Откройте `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- Установите `MinimumSDKVersion` в `10.10`
- Сохраните файл

## Building Electron

See [Build Instructions: GN](build-instructions-gn.md).