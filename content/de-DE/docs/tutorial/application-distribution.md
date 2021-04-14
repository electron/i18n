# Veröffentlichung der Anwendung

## Übersicht

Um Ihre App mit Electron zu verteilen, müssen Sie sie paketieren und neu markieren. Dazu können Sie entweder spezielle Werkzeuge oder manuelle Ansätze verwenden.

## Mit Werkzeugen

Sie können die folgenden Tools verwenden, um Ihre Anwendung zu verteilen:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

Diese Tools kümmern sich um alle Schritte, die Sie ausführen müssen, um mit einer verteilbaren Electron-Anwendung zu enden, wie z. B. das Bündeln Ihrer Anwendung, Rebranding der ausführbaren Datei und das Festlegen der richtigen Symbole.

Sie können das Beispiel zum Verpacken Ihrer App mit `electron-forge` in unserer [Schnellstartanleitung](quick-start.md#package-and-distribute-the-application).

## Manuelle Verteilung

### Mit vorgefertigten Binärdateien

Um Ihre App manuell zu verteilen, müssen Sie die [vorgefertigten -Binärdateien von Electron](https://github.com/electron/electron/releases)herunterladen. Als nächstes sollte der Ordner, der die App beinhaltet, `app` genannt werden und in das Electron-Resources-Verzeichnis verschoben werden, wie in den unten stehenden Beispielen zu erkennnen ist.

> *HINWEIS:* die Position der vorgefertigten Binärdateien von Electron wird mit `electron/` in den folgenden Beispielen angezeigt.

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

Führen Sie dann `Electron.app` unter macOS, `electron` unter Linux oder `electron.exe` unter Windows aus, und Electron wird als App gestartet. Das `electron` -Verzeichnis dann Ihre Verteilung sein, die an Benutzer übermittelt werden soll.

### Mit einem App-Quellcodearchiv

Anstatt Ihre App durch Kopieren aller Quelldateien zu versenden, können Sie Ihre App in ein [asar][] Archiv packen, um die Leistung beim Lesen Dateien auf Plattformen wie Windows zu verbessern, wenn Sie nicht bereits einen Bundler wie wie Parcel oder Webpack verwenden.

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

Weitere Informationen zur Verwendung von `asar` finden Sie im [`electron/asar` -Repository][asar].

### Rebranding mit heruntergeladenen Binärdateien

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

### Rebranding durch Wiederaufbau von Electron aus der Quelle

Es ist auch möglich Electron zu rebranden, indem man den Produktnamen ändert und es vom Sourcecode buildet. Um dies zu Tun müssen sie das Buildargument, das zum Produktnamen gehört (`electron_product_name = "IhrProduktName"`) in der `args.gn` Datei setzen und rebuilden.

[asar]: https://github.com/electron/asar

[asar]: https://github.com/electron/asar
