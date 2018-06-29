# Deine erste Electron Anwendung

Electron ermöglicht Ihnen Desktop-Applikationen mittels reinem JavaScript zu erstellen. Es wird eine Laufzeitumgebung mit umfangreichen nativen (auf Betriebssystemebene) APIs bereitgestellt. Sie können sich Electron als eine Variante der Node.js-Runtime vorstellen, die sich auf Desktop-Apps anstatt auf Webserver fokussiert.

Das bedeutet nicht, dass Electron's JavaScript an Bibliotheken für die grafische Oberfläche (GUI) gebunden ist. Anstattdessen benutzt Electron Webseiten als GUI. Man könnte es auch als eine Art abgespeckten Chromium Browser ansehen, welcher durch JavaScript gesteuert wird.

**Hinweis**: Dieses Beispiel ist auch verfügbar als Repository, dieses können Sie [herunterladen und sofort ausführen](#trying-this-example).

Was die Entwicklung betrifft, so ist eine Electron Anwendung grundlegend eine Node.js Anwendung. Beginnen wir mit einer `package.json`, die die gleiche ist, wie die eines Node.js Moduls. Eine einfache Electron App hat die folgende Ordnerstruktur:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

Erstelle ein neues leeres Verzeichnis für deine Electron Anwendung. Öffne die Kommandozeile und führe `npm init` in diesem Verzeichnis aus.

```sh
npm init
```

npm wird dich schrittweise durch die Erstellung einer `package.json` Datei führen. Das Skript, welches im `main` Feld angegeben wird, ist das Start Skript deiner Anwendung, welches den Hauptprozess startet. Ein Beispiel für Ihre `package.json` könnte wie folgt aussehen:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

**Bemerkung**: Wenn das `main`-Feld in der `package.json`-Datei nicht angegeben ist, wird Electron (so wie Node.js) versuchen eine `index.js`-Datei zu laden. Wenn es sich um eine einfache Node-Anwendung handelt, würden Sie ein `start`-Skript hinzufügen, das `node` anweist, das aktuelle Paket auszuführen:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

Diese Node-Anwendung in eine Electron-Anwendung umzuwandeln ist ganz einfach - wir ersetzen lediglich die `node`-Laufzeit durch die `electron`-Laufzeit.

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Installiere Electron

An dieser Stelle müssen Sie das `electron` installieren. Der empfohlene Weg dies zu tun ist, es als Abhängigkeit (dependency) in Ihrer Anwendung zu installieren. Dies erlaubt Ihnen an mehreren Anwendungen mit verschiedenen Electron-Versionen zu arbeiten. Führen Sie dazu den folgenden Befehl aus dem Verzeichnis Ihrer Anwendung aus:

```sh
npm install --save-dev electron
```

Es gibt noch andere Möglichkeiten um Electron zu installieren. Bitte lesen Sie die [Installationsanleitung](installation.md), um mehr über die Verwendung mit Proxies, Mirrors und benutzerdefinierten Caches zu erfahren.

## Electron-Entwicklung auf einen Blick

Electron apps are developed in JavaScript using the same principles and methods found in Node.js development. Alle APIs und Features von Electron sind zugänglich durch das `electron`-Modul, das wie jedes andere Node.js-Modul eingebunden werden kann:

```javascript
const electron = require('electron')
```

The `electron` module exposes features in namespaces. As examples, the lifecycle of the application is managed through `electron.app`, windows can be created using the `electron.BrowserWindow` class. A simple `main.js` file might wait for the application to be ready and open a window:

```javascript
const {app, BrowserWindow} = require('electron')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // und Laden der index.html der App.
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

```javascript
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Erstellen des Browser-Fensters.
  win = new BrowserWindow({width: 800, height: 600})

  // und Laden der index.html der App.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Ausgegeben, wenn das Fenster geschlossen wird.
  win.on('closed', () => {
    // Dereferenzieren des Fensterobjekts, normalerweise würden Sie Fenster
    // in einem Array speichern, falls Ihre App mehrere Fenster unterstützt. 
    // Das ist der Zeitpunkt, an dem Sie das zugehörige Element löschen sollten.
    win = null
  })
}

// Diese Methode wird aufgerufen, wenn Electron mit der
// Initialisierung fertig ist und Browserfenster erschaffen kann.
// Einige APIs können nur nach dem Auftreten dieses Events genutzt werden.
app.on('ready', createWindow)

// Verlassen, wenn alle Fenster geschlossen sind.
app.on('window-all-closed', () => {
  // Unter macOS ist es üblich für Apps und ihre Menu Bar
  // aktiv zu bleiben bis der Nutzer explizit mit Cmd + Q die App beendet.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Unter macOS ist es üblich ein neues Fenster der App zu erstellen, wenn
  // das Dock Icon angeklickt wird und keine anderen Fenster offen sind.
  if (win === null) {
    createWindow()
  }
})

// In dieser Datei können Sie den Rest des App-spezifischen 
// Hauptprozess-Codes einbinden. Sie können den Code auch 
// auf mehrere Dateien aufteilen und diese hier einbinden.
```

Zu guter Letzt die `index.html`-Webseite, die Sie anzeigen lassen möchten:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Ihre App ausführen

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you can try your app by running `npm start` from your application's directory.

## Beispiel-Anwendung

Klonen und führen sie den Code für dieses Tutorial mithilfe folgendem Repository aus: [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

**Hinweis**: Das Ausführen erfordert [Git](https://git-scm.com).

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

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation](./boilerplates-and-clis.md).