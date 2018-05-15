# Veröffentlichung der Anwendung

Um eine App mit Electron zu veröffentlichen, müssen Sie die vorgefertigten [Electron-Dateien](https://github.com/electron/electron/releases) herunterladen. Als nächstes sollte der Ordner, der die App beinhaltet, `app` genannt werden und in das Electron-Resources-Verzeichnis verschoben werden, wie in den unten stehenden Beispielen zu erkennnen ist. Achten Sie darauf, dass das Verzeichnis der vorgefertigten Electron-Dateien in den Beispielen mit `electron/` angegeben ist.

Unter macOS:

```text
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

Unter Windows und Linux:

```text
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Danach führen Sie `Electron.app` (oder `electron` unter Linux, `electron.exe` unter Windows) aus, und Electron wird als Ihre App starten. Das `electron`-Verzeichnis wird dann Ihre Distribution sein, die Sie an die Endnutzer weitergeben.

## App in eine Datei packen

Unabhängig vom Verbreiten Ihrer App durch das Kopieren aller Quelldateien können Sie Ihre App auch in ein [asar](https://github.com/electron/asar)-Archiv packen, um zu vermeiden, dass der Nutzer Zugriff auf den Quellcode Ihrer Anwendung erhält.

Um ein `asar`-Archiv zu nutzen, um den `app` Ordner zu ersetzen, müssen Sie das Archiv in `app.asar` umbenennen und, wie unten, in das Resources-Verzeichnis von Electron verschieben. Erst dann wird Electron versuchen das Archiv zu lesen und daraus starten.

Unter macOS:

```text
electron/Electron.app/Contents/Resources/
└── app.asar
```

Unter Windows und Linux:

```text
electron/resources/
└── app.asar
```

Mehr Details finden Sie unter [Anwendungspakete](application-packaging.md) in der Dokumentation.

## Änderung des Namens in Downloaddateien

Nachdem Sie Ihre App in Electron gebündelt haben, sollten Sie Electron umbennen, bevor Sie es an Ihre Nutzer weiterreichen.

### Windows

Sie können `electron.exe` einen beliebigen Namen geben und das Icon der App bzw. weitere Metadaten mit Tools wie [rcedit](https://github.com/atom/rcedit) bearbeiten.

### macOS

Sie können `Electron.app` einen beliebigen Namen geben, aber Sie müssen zusätzlich die Felder `CFBundleDisplayName`, `CFBundleIdentifier` und `CFBundleName` in den folgenden Dateien umbenennen:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Sie können desweiteren die 'Helper App' von Electron umbenennen um das Auftauchen von `Electron Helper` im Activity Monitor zu vermeiden. Stellen Sie dabei sicher, dass Sie die ausführbare Datei der 'Helper App' umbenannt haben.

Die Struktur der umbenannten App könnte so aussehen:

```text
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    ├── MyApp Helper EH.app
    |   ├── Info.plist
    |   └── MacOS/
    |       └── MyApp Helper EH
    ├── MyApp Helper NP.app
    |   ├── Info.plist
    |   └── MacOS/
    |       └── MyApp Helper NP
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

### Linux

Sie können der ausführbaren `electron`-Datei einen beliebigen Namen geben.

## Paket-Tools

Unabhängig davon, Ihre App manuell zu packen, können Sie sich für Paket-Tools von Drittanbietern entscheiden, die Ihnen die Arbeit abnehmen:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## Änderung des Names durch Neukompilieren des Quellcodes von Electron

Es ist weiterhin möglich Electron umzubennen in dem Sie den Produktnamen ändern und es erneut kompilieren. Um dies zu erreichen, modifizieren Sie die `atom.gyp`-Datei und rekompilieren das Projekt.

### Erstellen eines angepassten Electron Forks

Einen benutzerdefinierten Fork von Electron zu erstellen ist mit großer Sicherheit nicht das, was Sie tun möchten wenn Sie Ihre App erstellen, auch nicht bei "Producton Level" Anwendungen. Das Verwenden eines Tools wie `electron-packager` oder `electron-forge` ermöglicht Ihnen Electron einen neuen Namen zu geben, ohne diese Schritte durchführen zu müssen.

Sie müssen nur einen Fork von Electron erstellen, wenn Sie mit benutzerdefiniertem C++ Code direkt in Electron arbeiten, der entweder nicht vorgeschalten werden kann oder durch die offizielle Version von Electron abgelehnt wird. Als Maintainer von Electron würden wir es sehr begrüßen, wenn Sie Ihren Plan umsetzen können. Also versuchen Sie das Beste, um Ihre Änderungen an Electron in die offizielle Version einfließen zu lassen. Dadurch wird es um Einiges leichter für Sie. Wir schätzen Hilfe jeglicher Art.

#### Erstellen einer angepassten Version mit surf-build

1. Installieren Sie [Surf](https://github.com/surf-build/surf) mit npm: `npm install -g surf-build@latest`

2. Erstellen Sie einen neuen S3 bucket und nutzen Sie die folgende leere Verzeichnis-Struktur:
    
    ```sh
- atom-shell/
  - symbols/
  - dist/
```

3. Setzen Sie die folgenden Umgebungsvariablen:

* `ELECTRON_GITHUB_TOKEN` - Ein Token das Veröffentlichungen auf GitHub erstellen kann
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - der Ort an dem Sie node.js header und Symbole hochladen werden
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will do CI-type checks, appropriate to run for every pull request.
* `CI` - Auf `true` setzen, ansonsten erscheinen Fehler
* `GITHUB_TOKEN` - auf das Gleiche wie `ELECTRON_GITHUB_TOKEN` setzen
* `SURF_TEMP` - auf `C:\Temp` unter Windows setzen um zu langen Pfaden vorzubeugen
* `TARGET_ARCH` - auf `ia32` oder `x64` setzen

1. In der `script/upload.py` *müssen* Sie `ELECTRON_REPO` in Ihren Fork (z.B. `MYORG/electron`) ändern, vor allem, wenn sie ein Mitwirkender am Electron-Eigentum sind.

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. Warten sie eine halbe Ewigkeit bis der Build abgeschlossen ist.