# Applicatie distributie

## Overview

Om de app te distribueren met Electro, moet je hem verpakken en opnieuw branden. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [Elektron-verpakker](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in our [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## Handmatige distributie

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Vervolgens moet de map met de naam `app` worden geplaatst in de Electron's resources map zoals weergegeven in de volgende voorbeelden.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*Op macOS:*

```plaintext
electron/Electron.app/Contents/Resources/app/
½ Packpackage.json
ρρmain.js
ρρindex.html
```

*Op Windows en Linux:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar](https://github.com/electron/asar) archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

Om een `asar` archief te gebruiken ter vervanging van de `app` map, u moet het archief hernoemen naar `app. sar`, en zet het onder de resources map van Electron, zoals hieronder, en Electron zal dan proberen het archief te lezen en er vanaf te starten.

*Op macOS:*

```plaintext
electron/Electron.app/Contents/Resources/
½ app.asar
```

*Op Windows en Linux:*

```plaintext
elektron/hulpbronnen/
½ app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository](https://github.com/electron/asar).

### Rebranding with downloaded binaries

Nadat je je app hebt gebundeld met Electroon, wil je Electron opnieuw branden, voordat je het aan gebruikers verspreidt.

#### macOS

You can rename `Electron.app` to any name you want, and you also have to rename the `CFBundleDisplayName`, `CFBundleIdentifier` and `CFBundleName` fields in the following files:

* `Electron.app/Contents/Info.plist`
* `Elektron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

U kunt ook de helper-app hernoemen om te voorkomen dat u `Electron Helper` in de Activiteitenmonitor toont, maar zorg ervoor dat u de naam van de uitvoerbare app van de helper-app bestand hebt hernoemd.

De structuur van een hernoemde app zou gelijk zijn:

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

U kunt `e-mail hernoemen. Bijwerken` aan elke naam die je wilt, en bewerken het pictogram en andere informatie met gereedschappen zoals [rcedit](https://github.com/electron/rcedit).

#### Linux

Je kunt het programma `elektron` hernoemen naar elke gewenste naam.

### Rebranding by rebuilding Electron from source

Het is ook mogelijk om Electron te hertekenen door de productnaam te veranderen en het te bouwen vanaf de bron. Om dit te doen moet u het build argument instellen die overeenkomt met de productnaam (`electron_product_name = "YourProductNaam"`) in de `args. n` bestand en opnieuw opbouwen.
