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

Creating a custom fork of Electron is almost certainly not something you will need to do in order to build your app, even for "Production Level" applications. Using a tool such as `electron-packager` or `electron-forge` will allow you to "Rebrand" Electron without having to do these steps.

You need to fork Electron when you have custom C++ code that you have patched directly into Electron, that either cannot be upstreamed, or has been rejected from the official version. As maintainers of Electron, we very much would like to make your scenario work, so please try as hard as you can to get your changes into the official version of Electron, it will be much much easier on you, and we appreciate your help.

#### Creating a Custom Release with surf-build

1. Install [Surf](https://github.com/surf-build/surf), via npm: `npm install -g surf-build@latest`

2. Create a new S3 bucket and create the following empty directory structure:
    
    ```sh
- atom-shell/
  - symbols/
  - dist/
```

3. Set the following Environment Variables:

* `ELECTRON_GITHUB_TOKEN` - a token that can create releases on GitHub
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - the place where you'll upload node.js headers as well as symbols
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will just do CI-type checks, appropriate to run for every pull request.
* `CI` - Set to `true` or else it will fail
* `GITHUB_TOKEN` - set it to the same as `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - set to `C:\Temp` on Windows to prevent path too long issues
* `TARGET_ARCH` - set to `ia32` or `x64`

1. In `script/upload.py`, you *must* set `ELECTRON_REPO` to your fork (`MYORG/electron`), especially if you are a contributor to Electron proper.

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. Wait a very, very long time for the build to complete.