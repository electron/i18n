# Инструкции по сборке (macOS)

Следуйте рекомендациям ниже для сборки Electron на macOS.

## Требования

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](https://nodejs.org) (внешнее)

Если вы используете Python, скачайте Homebrew, необходимо также установить следующие модули Python:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

Если вы просто разрабатываете Electron и не планируют распространять пользовательские сборки Electron, вы можете пропустить этот раздел.

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

## Получение кода

```sh
$ git clone https://github.com/electron/electron
```

## Самонастройка

Скрипт bootstrap скачает все необходимые зависимые сборки и построит файлы проекта. Обратите внимание, что мы используем [ninja](https://ninja-build.org/) для сборки Electron, пока не создан проект Xcode.

```sh
$ cd electron
$ ./script/bootstrap.py -v
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

## Сборка

Build both `Release` and `Debug` targets:

```sh
$ ./script/build.py
```

You can also only build the `Debug` target:

```sh
$ ./script/build.py -c D
```

After building is done, you can find `Electron.app` under `out/D`.

## Поддержка 32bit

Electron can only be built for a 64bit target on macOS and there is no plan to support 32bit macOS in the future.

## Очистка

Очистить файлы построения:

```sh
$ npm run clean
```

Для очистки только `out` и `dist` каталогов:

```sh
$ npm run clean-build
```

**Примечание:** Обе команды очистки требуют запуска `bootstrap` снова перед построением.

## Тесты

Смотрите [Build System Overview: Tests](build-system-overview.md#tests)