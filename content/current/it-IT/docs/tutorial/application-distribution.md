# Distribuzione delle applicazioni

## Overview

Per distribuire la tua app con Electron, devi imballarla e riprenderla. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [electron-forgia](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in our [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## Distribuzione manuale

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Successivamente, la cartella contenente la tua app dovrebbe essere chiamata `app` e posizionata nella directory delle risorse di Electron come mostrato negli esempi seguenti.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*Su macOS:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├<unk> <unk> package.json
├<unk> <unk> main.js
<unk> <unk> <unk> <unk> index.html
```

*Su Windows e Linux:*

```plaintext
electron/resources/app
├<unk> <unk> <unk> package.json
<unk> <unk> <unk> <unk> <unk> main.js
<unk> <unk> <unk> <unk> <unk> index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar](https://github.com/electron/asar) archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

Per utilizzare un archivio `asar` per sostituire la cartella `app` , devi rinominare l'archivio in `app. sar`e metterlo nella directory delle risorse di Electron, come qui sotto, e Electron proverà quindi a leggere l'archivio e a partire da esso.

*Su macOS:*

```plaintext
electron/Electron.app/Contents/Resources/
◆ app.asar
```

*Su Windows e Linux:*

```plaintext
electron/resources/
l’onorevole app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository](https://github.com/electron/asar).

### Rebranding with downloaded binaries

Dopo aver raggruppato l'app in Electron, si desidera rebrand Electron prima di distribuirla agli utenti.

#### macOS

Puoi rinominare `Electron. pp` a qualsiasi nome che desideri, e devi anche rinominare il `CFBundleDisplayName`, `CFBundleIdentifier` e `CFBundleName` campi nei seguenti file:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Puoi anche rinominare l'app helper per evitare di mostrare `Electron Helper` nel Monitoraggio attività, ma assicurati di aver rinominato il nome dell'eseguibile dell'applicazione helper .

La struttura di un'app rinominata sarebbe simile:

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

Puoi rinominare `electron. xe` con qualsiasi nome desideri, e modificare la sua icona e altre informazioni con strumenti come [rcedit](https://github.com/electron/rcedit).

#### Linux

Puoi rinominare l'eseguibile `electron` in qualsiasi nome tu voglia.

### Rebranding by rebuilding Electron from source

E 'anche possibile rebrand Electron cambiando il nome del prodotto e costruirlo dalla fonte. Per fare questo è necessario impostare l'argomento di compilazione corrispondente al nome del prodotto (`electron_product_name = "YourProductName"`) negli args `. n` file e ricostruisce.
