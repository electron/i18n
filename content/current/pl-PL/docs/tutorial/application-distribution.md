# Dystrybuowanie Aplikacji

## Przegląd

Aby rozpowszechniać swoją aplikację za pomocą Electrona, musisz ją zapakować i przemarkować. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in our [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## Ręczna dystrybucja

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Next, the folder containing your app should be named `app` and placed in Electron's resources directory as shown in the following examples.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*Na macOS:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*Na systemach Windows i Linux:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar](https://github.com/electron/asar) archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

Aby użyć archiwum `asar` aby zastąpić folder `app` , musisz zmienić nazwę archiwum na aplikację `. sar`i umieść go w katalogu zasobów Electrona, jak poniżej, i Electron spróbuje następnie odczytać archiwum i zacząć od niego.

*Na macOS:*

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*Na systemach Windows i Linux:*

```plaintext
electron/resources/
└── app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository](https://github.com/electron/asar).

### Rebranding with downloaded binaries

Po połączeniu aplikacji z Electronem będziesz chciał odświeżyć Electron przed dystrybucją jej do użytkowników.

#### macOS

You can rename `Electron.app` to any name you want, and you also have to rename the `CFBundleDisplayName`, `CFBundleIdentifier` and `CFBundleName` fields in the following files:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

You can also rename the helper app to avoid showing `Electron Helper` in the Activity Monitor, but make sure you have renamed the helper app's executable file's name.

Struktura zmienionej nazwy aplikacji byłaby taka:

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

Możesz zmienić nazwę `electron.exe` na dowolną nazwę, którą chcesz, i edytować jej ikonę i inne informacje za pomocą narzędzi takich jak [rcedit](https://github.com/electron/rcedit).

#### Linux

Możesz zmienić nazwę `electron` na dowolną nazwę, którą chcesz.

### Rebranding by rebuilding Electron from source

Możliwe jest również remarkowanie Electrona poprzez zmianę nazwy produktu i zbudowanie go ze źródła. Aby to zrobić, musisz ustawić argument budowy odpowiadający nazwie produktu (`electron_product_name = "YourProductName"`) w opłatach `. n` plik i przebudowane.
