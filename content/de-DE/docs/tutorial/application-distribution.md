# Veröffentlichung der Anwendung

## Übersicht

Um Ihre App mit Electron zu verteilen, müssen Sie sie paketieren und neu markieren. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in the [Quick Start guide](quick-start.md#package-and-distribute-your-application).

## Manuelle Verteilung

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Als nächstes sollte der Ordner, der die App beinhaltet, `app` genannt werden und in das Electron-Resources-Verzeichnis verschoben werden, wie in den unten stehenden Beispielen zu erkennnen ist.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*Unter macOS:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*Unter Windows und Linux:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar][] archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

Um ein `asar`-Archiv zu nutzen, um den `app` Ordner zu ersetzen, müssen Sie das Archiv in `app.asar` umbenennen und, wie unten, in das Resources-Verzeichnis von Electron verschieben. Erst dann wird Electron versuchen das Archiv zu lesen und daraus starten.

*Unter macOS:*

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*Unter Windows und Linux:*

```plaintext
electron/resources/
└── app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository][asar].

### Rebranding with downloaded binaries

Nachdem Sie Ihre App in Electron gebündelt haben, sollten Sie Electron umbennen, bevor Sie es an Ihre Nutzer weiterreichen.

#### macOS

Sie können `Electron.app` einen beliebigen Namen geben, aber Sie müssen zusätzlich die Felder `CFBundleDisplayName`, `CFBundleIdentifier` und `CFBundleName` in den folgenden Dateien umbenennen:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Sie können desweiteren die 'Helper App' von Electron umbenennen um das Auftauchen von `Electron Helper` im Activity Monitor zu vermeiden. Stellen Sie dabei sicher, dass Sie die ausführbare Datei der 'Helper App' umbenannt haben.

Die Struktur der umbenannten App könnte so aussehen:

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

Sie können `electron.exe` einen beliebigen Namen geben und das Icon der App bzw. weitere Metadaten mit Tools wie [rcedit](https://github.com/electron/rcedit) bearbeiten.

#### Linux

Sie können der ausführbaren `electron`-Datei einen beliebigen Namen geben.

### Rebranding by rebuilding Electron from source

Es ist auch möglich Electron zu rebranden, indem man den Produktnamen ändert und es vom Sourcecode buildet. Um dies zu Tun müssen sie das Buildargument, das zum Produktnamen gehört (`electron_product_name = "IhrProduktName"`) in der `args.gn` Datei setzen und rebuilden.

[asar]: https://github.com/electron/asar

[asar]: https://github.com/electron/asar
