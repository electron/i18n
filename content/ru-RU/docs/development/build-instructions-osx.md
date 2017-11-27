# Инструкции по сборке (macOS)

Следуйте рекомендациям ниже для сборки Electron на macOS.

## Требования

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](http://nodejs.org) (внешнее)

Если вы используете Python, скачайте Homebrew, необходимо также установить следующие модули Python:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

Если вы просто разрабатываете Electron и не планируют распространять пользовательские сборки Electron, вы можете пропустить этот раздел.

Для работы некоторых функций (например pinch-zoom) правильно, вы должны выбрать macOS 10.10 SDK.

Официальные Electron сборки создаются на [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), которая не содержит 10.10 SDK по умолчанию. Для его получения, сначала загрузите и установите [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG.

Затем предполагая, что Xcode 6.4 DMG был смонтирован в `/Volumes/Xcode` и установленый Xcode 8.2.1 находится в `/Applications/Xcode.app`, запустите:

```bash
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

You will also need to enable Xcode to build against the 10.10 SDK:

- Open `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- Set the `MinimumSDKVersion` to `10.10`
- Save the file

## Получение кода

```bash
$ git clone https://github.com/electron/electron
```

## Самонастройка

The bootstrap script will download all necessary build dependencies and create the build project files. Notice that we're using [ninja](https://ninja-build.org/) to build Electron so there is no Xcode project generated.

```bash
$ cd electron
$ ./script/bootstrap.py -v
```

## Сборка

Build both `Release` and `Debug` targets:

```bash
$ ./script/build.py
```

You can also only build the `Debug` target:

```bash
$ ./script/build.py -c D
```

After building is done, you can find `Electron.app` under `out/D`.

## Поддержка 32bit

Electron can only be built for a 64bit target on macOS and there is no plan to support 32bit macOS in the future.

## Очистка

To clean the build files:

```bash
$ npm run clean
```

To clean only `out` and `dist` directories:

```bash
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## Тестирование

Смотрите [Build System Overview: Tests](build-system-overview.md#tests)