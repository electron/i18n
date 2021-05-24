# Распространение приложений

## Обзор

Чтобы распространять приложение с помощью Electron, вам нужно его перегруппировать и перегруппировать. Для этого можно использовать специализированный инструментарий или ручной подход.

## С инструментами

Вы можете использовать следующие инструменты для распространения вашего приложения:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

Эти инструменты позаботятся о всех шагах, которые вам нужно предпринять, чтобы получить распространяемое приложение Electron, такие как сборка вашего приложения, ребрендинг выполнения и установка нужных иконок.

You can check the example of how to package your app with `electron-forge` in the [Quick Start guide](quick-start.md#package-and-distribute-your-application).

## Ручное распространение

### С предустановленными бинарными файлами

Для ручного распространения вашего приложения Electron, вам нужно скачать [предварительно собранные двоичные файлы](https://github.com/electron/electron/releases) Electron. Далее папку, содержащую ваше приложение следует назвать `app` и поместить в каталог ресурсов Electron, как показано в следующих примерах.

> *ПРИМЕЧАНИЕ:* расположение заранее встроенных двоичных файлов Electron указывается на примерах ниже, начиная с `electron/`.

*На macOS:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*На Windows и Linux:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### С архивом исходного кода приложения

Вместо того, чтобы отправлять ваше приложение, копируя все исходные файлы, вы можете запаковать ваше приложение в [asar][] архив, чтобы улучшить производительность чтения файлов на платформах, таких как Windows, если вы еще не используете такой пакет как Parcel или Webpack.

Чтобы использовать архив `asar` для замены каталога `app`, необходимо переименовать архив в `app.asar` и положить его в каталог ресурсов Electron, как показано ниже, и Electron будет пытаться прочитать архив и начать с него.

*На macOS:*

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*На Windows и Linux:*

```plaintext
electron/resources/
└── app.asar
```

Более подробную информацию об использовании `asar` вы можете найти в репозитории [`electron/asar`][asar].

### Ребрендинг скачанных бинарных файлов

После построения вашего приложения в Electron и перед распространением вам следует провести его ребрендинг.

#### macOS

Вы можете переименовать `Electron.app`, а также вы должны переименовать поля `CFBundleDisplayName`, `CFBundleIdentifier` и `CFBundleName` в следующих файлах:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Вы также можете переименовать helper приложения, чтобы избежать показа `Electron Helper` в Activity Monitor, но убедитесь, что вы переименовали имя исполняемого файла helper приложения.

Структура переименования app будет такая:

```plaintext
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

#### Windows

Вы можете сменить имя файла `electron.exe` на любое понравившееся, отредактировать его значок и другую информацию такими инструментами, как [rcedit](https://github.com/electron/rcedit).

#### Linux

`Electron` исполняемый файл можно переименовать на любое имя, которое вам нравится.

### Проведите ребрендинг, пересобрав Electron из исходных кодов

Можно изменить бренд Electron путем изменения имени продукта и сборки его из исходных кодов. Для этого вам надо установить аргумент, отвечающий за имя продукта (`electron_product_name = "YourProductName"`) в файле `args.gn` и пересобрать Electron.

[asar]: https://github.com/electron/asar

[asar]: https://github.com/electron/asar
