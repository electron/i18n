# Розповсюдження Програм

## Огляд

Щоб розповсюдити свій застосунок з Electron, вам потрібно упакувати і проаналізувати його. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [електро-пакувальник](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in our [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## Ручний розподіл

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Далі, папка , що містить ваш додаток, має бути названа `застосунком` і розміщена в каталозі ресурсів Electron, , як показано в наступних прикладах.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*На macOS:*

```plaintext
electron/Electron.app/Contents/Resources/app/
────package.json
─────.js
────index.html
```

*На Windows та Linux:*

```plaintext
electron/resources/app
── package.json
────main.js
─ index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar](https://github.com/electron/asar) archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

Для використання `asar` архіву замінити папку `додатка` , ви повинні перейменувати архів на `додаток. сару`, і розмістіть його під каталогом ресурсів Electron, як нижче, і потім Electron спробує прочитати архів і почати з нього.

*На macOS:*

```plaintext
electron/Electron.app/Contents/Resources/
──app.asar
```

*На Windows та Linux:*

```plaintext
electron/resources/
───app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository](https://github.com/electron/asar).

### Rebranding with downloaded binaries

Після приєднання вашої програми до Electron, ви хочете перефлучити Electron перед тим, як поділитись нею з користувачами.

#### macOS

You can rename `Electron.app` to any name you want, and you also have to rename the `CFBundleDisplayName`, `CFBundleIdentifier` and `CFBundleName` fields in the following files:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Ви також можете перейменувати допоміжний додаток, щоб уникнути показу `Electron Helper` в Моніторі діяльності, але переконайтеся, що ви перейменували виконуване ім'я додатку помічника імені файлу.

Структура перейменованого додатку виглядатиме так:

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

Можна перейменувати `електрон. xe` будь-якої назви, яка вам подобається, а також змінити її значок та іншу інформацію з інструментами, такими як [rcedit](https://github.com/electron/rcedit).

#### Linux

Можна перейменувати `електрон` виконуваний з будь-яким іменами.

### Rebranding by rebuilding Electron from source

Також можливо зробити Electron шляхом зміни назви продукту і створення його з джерела. Щоб зробити це ви повинні встановити аргумент збірки відповідний до назви товару (`electron_product_name = "YourProductName"`) в аргументах `. n` файл і перебудова.
