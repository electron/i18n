# Deine erste Electron-App

Electron ermöglicht Ihnen Desktop-Applikationen mittels reinem JavaScript zu erstellen. Es wird eine Laufzeitumgebung mit umfangreichen nativen (auf Betriebssystemebene) APIs bereitgestellt. Sie können sich Electron als eine Variante der Node.js-Runtime vorstellen, die sich auf Desktop-Apps anstatt auf Webserver fokussiert.

Das bedeutet nicht, dass Electron's JavaScript an Bibliotheken für die grafische Oberfläche (GUI) gebunden ist. Anstattdessen benutzt Electron Webseiten als GUI. Man könnte es auch als eine Art abgespeckten Chromium-Browser ansehen, welcher durch JavaScript gesteuert wird.

**Hinweis**: Dieses Beispiel ist auch verfügbar als Repository, dieses können Sie [herunterladen und sofort ausführen](#trying-this-example).

Was die Entwicklung betrifft, so ist eine Electron-Anwendung grundlegend eine Node.js-Anwendung. Beginnen wir mit einer `package.json`, die die gleiche ist wie die eines Node.js-Moduls. Eine einfache Electron-App hat die folgende Ordnerstruktur:

```plaintext
your-app/
├── package.json
├── main.js
└── index.html
```

Erstelle ein neues leeres Verzeichnis für deine Electron-Anwendung. Öffne die Kommandozeile und führe `npm init` in diesem Verzeichnis aus.

```sh
npm init
```

npm wird dich schrittweise durch die Erstellung einer `package.json`-Datei führen. Das Skript, welches im `main`-Feld angegeben wird, ist das Startskript deiner Anwendung, welches den Hauptprozess startet. Ein Beispiel für Ihre `package.json` könnte wie folgt aussehen:

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

__Bemerkung__: Wenn das `main`-Feld in der `package.json`-Datei nicht angegeben ist, wird Electron (so wie Node.js) versuchen, eine `index.js`-Datei zu laden.

Normalerweise führt `npm start` den main script mit Node.js aus. Um dies zu vermeiden und das Script mit Electron zu starten, kann folgendes `start` script eingestellt werden:

```json
{
  "name": "deine-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Electron installieren

An dieser Stelle müssen Sie das `electron` installieren. Der empfohlene Weg dies zu tun ist, es als Abhängigkeit (dependency) in Ihrer Anwendung zu installieren. Dies erlaubt Ihnen an mehreren Anwendungen mit verschiedenen Electron-Versionen zu arbeiten. Führen Sie dazu den folgenden Befehl aus dem Verzeichnis Ihrer Anwendung aus:

```sh
npm install --save-dev electron
```

Es gibt noch andere Möglichkeiten, um Electron zu installieren. Bitte lesen Sie die [Installationsanleitung](installation.md), um mehr über die Verwendung mit Proxies, Mirrors und benutzerdefinierten Caches zu erfahren.

## Electron-Entwicklung auf einen Blick

Electron Anwendungen werden in JavaScript entwickelt, es werden die gleichen Prinzipien und Methoden wie in der in Node.js-Entwicklung angewandt. Alle APIs und Features von Electron sind zugänglich durch das `electron`-Modul, das wie jedes andere Node.js-Modul eingebunden werden kann:

```javascript
const electron = require('electron')
```

Das Modul `electron` stellt Funktionen in Namespaces zur Verfügung. Beispielsweise wird der Lebenszyklus der Anwendung über `electron.app` verwaltet, Fenster können mit der Klasse `electron.BrowserWindow` erstellt werden. Eine einfache `main.js`-Datei könnte warten, bis die Anwendung fertig ist und anschließend ein Fenster öffnen:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Erstelle das Browser-Fenster.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // und lade den Inhalt von index.html
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

Die `main.js` sollte Fenster erzeugen und alle System-Events behandeln, die in Deiner App auftreten könnten. Eine ausführlichere Version des obigen Beispiels könnte die Developer Tools öffnen, das schließen eines Fenster handeln oder Fenster unter MacOS wieder herstellen, wenn der Benutzer auf das App Icon im Dock klickt.

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Erstelle das Browser-Fenster.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // und lade den Inhalt von index.html
  win.loadFile('index.html')

  // Öffnen der DevTools.
  win.webContents.openDevTools()
}

// Diese Methode wird aufgerufen, wenn Electron das Starten abgeschlossen hat und bereit ist, 
// ein Browser Fenster zu erstellen.
// Einige APIs können nur nach dem Auftreten dieses Events genutzt werden.
app.whenReady().then(createWindow)

// Schließt die App, sobald alle Fenster geschlossen werden, außer auf macOS. Dort ist es nämlich
// üblich, dass Apps und ihre Menüs aktiv bleiben, bis der Benutzer diese
// explizit mit Cmd + Q beendet.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Auf macOs ist es üblich, ein neues Fenster zu erstellen, wenn
  // das dock Icon angeklickt wird und kein anderes Fenster offen ist.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In dieser Datei kann der Rest des App-Codes für den main proccess eingefügt werden. Sie können den Code auch 
// auf mehrere Dateien aufteilen und diese hier einbinden.
```

Zu guter Letzt, die `index.html`-Webseite, die Sie anzeigen lassen möchten:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hallo Welt!</title>
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
  </head>
  <body>
    <h1>Hallo Welt!</h1>
    Aktuell wird die node version <script>document.write(process.versions.node)</script>,
    Chrome in der Version <script>document.write(process.versions.chrome)</script>,
     und Electron in der Version <script>document.write(process.versions.electron)</script> benutzt.
  </body>
</html>
```

## Ihre App ausführen

Sobald Sie Ihre ersten `main.js`, `index.html` und `package.json` Dateien erstellt haben, können Sie Ihre Anwendung testen, indem Sie `npm start` aus dem Verzeichnis Ihrer Anwendung ausführen.

## Beispiel-Anwendung

Klonen und führen sie den Code für dieses Tutorial mithilfe folgendem Repository aus: [`electron/electron-quick-start`][quick-start].

**Hinweis**: Zur Ausführung wird [Git](https://git-scm.com) und [npm](https://www.npmjs.com/) benötigt.

```sh
# Klonen des Repositorys
$ git clone https://github.com/electron/electron-quick-start
# Verzeichniswechsel in das Repository
$ cd electron-quick-start
# Installation von Abhängigkeiten
$ npm install
# Start der Anwendung
$ npm start
```

In der ["Vorlagen und CLIs"-Dokumentation][boilerplates] finden Sie eine Liste von Vorlagen und Tools, um Ihren Entwicklungsprozess zu beschleunigen.

[quick-start]: https://github.com/electron/electron-quick-start
[boilerplates]: ./boilerplates-and-clis.md
