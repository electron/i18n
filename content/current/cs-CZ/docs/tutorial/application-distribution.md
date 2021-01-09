# Distribuce aplikací

## Přehled

Chcete-li aplikaci distribuovat pomocí Electronu, musíte ji balit a znovu značit. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [elektronová kovárna](https://github.com/electron-userland/electron-forge)
* [elektronický stavitel](https://github.com/electron-userland/electron-builder)
* [elektronický balík](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in our [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## Ruční distribuce

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Dále, složka obsahující vaši aplikaci by měla být pojmenována `aplikace` a umístěna do adresáře Electronu , jak je zobrazeno v následujících příkladech.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*Na platformě macOS:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*Na platformě Windows a Linux:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar](https://github.com/electron/asar) archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

Chcete-li použít archiv `asar` k nahrazení složky `aplikace` , musíte přejmenovat archiv na aplikaci `. bezpečí`a vložte jej do adresáře zdrojů Electronu, jako je níže, a Electron se pak pokusí přečíst archiv a začít od něj.

*Na platformě macOS:*

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*Na platformě Windows a Linux:*

```plaintext
electron/resources/
└── app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository](https://github.com/electron/asar).

### Rebranding with downloaded binaries

Po vložení vaší aplikace do Electronu budete chtít znovu značit Electron před tím, než ji budete distribuovat uživatelům.

#### macOS

Můžete přejmenovat `Electron. pp` na libovolné jméno, které chcete, a také musíte přejmenovat `CFBundleDisplayName`, `pole CFBundleIdentifier` a `CFBundleName` v následujících souborech :

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Můžete také přejmenovat pomocnou aplikaci, abyste se vyhnuli zobrazování `Electron Helper` v Monitoru aktivity, ale ujistěte se, že jste přejmenovali název souboru aplikace Helper.

Struktura přejmenované aplikace bude:

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

Můžete přejmenovat `elektroniku. xe` na libovolné jméno, které se vám líbí, a upravte jeho ikonu a další informace s nástroji jako [rcedit](https://github.com/electron/rcedit).

#### Linux

Můžete přejmenovat soubor `electron` na libovolné jméno, které se vám líbí.

### Rebranding by rebuilding Electron from source

Je také možné změnit značku Electron změnou názvu výrobku a jeho vybudování ze zdroje. K tomu je třeba nastavit stavební argument odpovídající názvu produktu (`electron_product_name = "YourProductName"`) v `nákladech. n` soubor a znovu sestaven.
