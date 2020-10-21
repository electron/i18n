# Veröffentlichung der Anwendung

Um Ihre App mit Electron zu verteilen, müssen Sie sie paketieren und neu markieren. Am einfachsten ist es, eines der folgenden Verpackungswerkzeuge von Drittanbietern zu verwenden:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

Diese Tools werden sich um alle Schritte kümmern, die benötigt werden um am Ende eine verbreitbare Electron Anwendung zu Haben.

## Manuelle Verteilung
Sie können Ihre App auch manuell für den Vertrieb vorbereiten. Die hierfür erforderlichen Schritte sind unten aufgeführt.

Um eine App mit Electron zu veröffentlichen, müssen Sie die vorgefertigten [Electron-Dateien](https://github.com/electron/electron/releases) herunterladen. Als nächstes sollte der Ordner, der die App beinhaltet, `app` genannt werden und in das Electron-Resources-Verzeichnis verschoben werden, wie in den unten stehenden Beispielen zu erkennnen ist. Achten Sie darauf, dass das Verzeichnis der vorgefertigten Electron-Dateien in den Beispielen mit `electron/` angegeben ist.

Unter macOS:

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

Unter Windows und Linux:

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` (or `electron` on Linux, `electron.exe` on Windows), and Electron will start as your app. The `electron` directory will then be your distribution to deliver to final users.

## App in eine Datei packen

Unabhängig vom Verbreiten Ihrer App durch das Kopieren aller Quelldateien können Sie Ihre App auch in ein [asar](https://github.com/electron/asar)-Archiv packen, um zu vermeiden, dass der Nutzer Zugriff auf den Quellcode Ihrer Anwendung erhält.

Um ein `asar`-Archiv zu nutzen, um den `app` Ordner zu ersetzen, müssen Sie das Archiv in `app.asar` umbenennen und, wie unten, in das Resources-Verzeichnis von Electron verschieben. Erst dann wird Electron versuchen das Archiv zu lesen und daraus starten.

Unter macOS:

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

Unter Windows und Linux:

```plaintext
electron/resources/
└── app.asar
```

Mehr Details finden Sie unter [Anwendungspakete](application-packaging.md) in der Dokumentation.

## Änderung des Namens in Downloaddateien

Nachdem Sie Ihre App in Electron gebündelt haben, sollten Sie Electron umbennen, bevor Sie es an Ihre Nutzer weiterreichen.

### Windows

Sie können `electron.exe` einen beliebigen Namen geben und das Icon der App bzw. weitere Metadaten mit Tools wie [rcedit](https://github.com/electron/rcedit) bearbeiten.

### macOS

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

### Linux

Sie können der ausführbaren `electron`-Datei einen beliebigen Namen geben.

## Änderung des Names durch Neukompilieren des Quellcodes von Electron

Es ist auch möglich Electron zu rebranden, indem man den Produktnamen ändert und es vom Sourcecode buildet. Um dies zu Tun müssen sie das Buildargument, das zum Produktnamen gehört (`electron_product_name = "IhrProduktName"`) in der `args.gn` Datei setzen und rebuilden.

### Erstellen eines angepassten Electron Forks

Einen benutzerdefinierten Fork von Electron zu erstellen ist mit großer Sicherheit nicht das, was Sie tun möchten wenn Sie Ihre App erstellen, auch nicht bei "Producton Level" Anwendungen. Das Verwenden eines Tools wie `electron-packager` oder `electron-forge` ermöglicht Ihnen Electron einen neuen Namen zu geben, ohne diese Schritte durchführen zu müssen.

Sie müssen nur einen Fork von Electron erstellen, wenn Sie mit benutzerdefiniertem C++ Code direkt in Electron arbeiten, der entweder nicht vorgeschalten werden kann oder durch die offizielle Version von Electron abgelehnt wird. Als Maintainer von Electron würden wir es sehr begrüßen, wenn Sie Ihren Plan umsetzen können. Also versuchen Sie das Beste, um Ihre Änderungen an Electron in die offizielle Version einfließen zu lassen. Dadurch wird es um Einiges leichter für Sie. Wir schätzen Hilfe jeglicher Art.

#### Erstellen einer angepassten Version mit surf-build

1. Installieren Sie [Surf](https://github.com/surf-build/surf) mit npm: `npm install -g surf-build@latest`

2. Erstellen Sie einen neuen S3 bucket und nutzen Sie die folgende leere Verzeichnis-Struktur:

    ```sh
    - elektronisch /
      - Symbole/
      - dist/
    ```

3. Setzen Sie die folgenden Umgebungsvariablen:

  * `ELECTRON_GITHUB_TOKEN` - Ein Token das Veröffentlichungen auf GitHub erstellen kann
  * `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - Der Ort an dem sie Node.js Header und symbols hochladen werden
  * `ELECTRON_RELEASE` - Setze auf `true` und das Upload-Teil wird ausgeführt, lassen Sie unset und `Surf-Build` führt CI-Prüfungen durch, die für jeden Pull-Request geeignet sind.
  * `CI` - Auf `true` setzen, ansonsten erscheinen Fehler
  * `GITHUB_TOKEN` - auf das Gleiche wie `ELECTRON_GITHUB_TOKEN` setzen
  * `SURF_TEMP` - auf `C:\Temp` unter Windows setzen um zu langen Pfaden vorzubeugen
  * `TARGET_ARCH` - auf `ia32` oder `x64` setzen

4. In der `script/upload.py` _müssen_ Sie `ELECTRON_REPO` in Ihren Fork (z.B. `MYORG/electron`) ändern, vor allem, wenn sie ein Mitwirkender am Electron-Eigentum sind.

5. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

6. Warten sie eine halbe Ewigkeit bis der Build abgeschlossen ist.
