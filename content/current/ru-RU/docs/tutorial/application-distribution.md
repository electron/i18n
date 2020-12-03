# Распространение приложений

## Обзор

Чтобы распространять приложение с помощью Electron, вам нужно его перегруппировать и перегруппировать. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in our [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## Ручное распространение

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Далее папку, содержащую ваше приложение следует назвать `app` и поместить в каталог ресурсов Electron, как показано в следующих примерах.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

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

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar](https://github.com/electron/asar) archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

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

You can find more details on how to use `asar` in the [`electron/asar` repository](https://github.com/electron/asar).

### Rebranding with downloaded binaries

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

### Rebranding by rebuilding Electron from source

Можно изменить бренд Electron путем изменения имени продукта и сборки его из исходных кодов. Для этого вам надо установить аргумент, отвечающий за имя продукта (`electron_product_name = "YourProductName"`) в файле `args.gn` и пересобрать Electron.
