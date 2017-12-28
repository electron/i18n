# Schnellstart

Electron ermöglicht Ihnen Desktop-Applikationen mittels reinem JavaScript zu erstellen. Es wird eine Laufzeitumgebung mit umfangreichen nativen (auf Betriebssystemebene) APIs bereitgestellt. Sie können sich Electron als eine Variante der Node.js-Runtime vorstellen, die sich auf Desktop-Apps anstatt auf Webserver fokussiert.

Das bedeutet nicht, dass Electron's JavaScript an Bibliotheken für die grafische Oberfläche (GUI) gebunden ist. Anstattdessen benutzt Electron Webseiten als GUI. Man könnte es auch als eine Art abgespeckten Chromium Browser ansehen, welcher durch JavaScript gesteuert wird.

### Hauptprozess

Der Prozess, der das `main`-Skript der `package.json`-Datei ausführt, wird in Electron als **Hauptprozess** bezeichnet. Das im Hauptprozess laufende Skript kann durch das Erstellen von Webseiten eine grafische Oberfläche generieren.

### Renderer-Prozess

Dadurch, dass Electron für die Darstellung der Webseiten Chromium nutzt, wird auch Chromium's Multi-Prozess-Architektur verwendet. Jede Webseite in Electron läuft in ihrem eigenen Prozess, welcher **Renderer-Prozess** genannt wird.

In regulären Browsern laufen Webseiten normalerweise in einer isolierten Umgebung und haben daher keinen Zugriff auf native Ressourcen. Als Nutzer von Electron haben Sie die Option Node.js-APIs in den Webseiten zu nutzen. Damit werden Interaktionen auf Betriebssystemebene möglich.

### Unterschiede zwischen Hauptprozess und Renderer-Prozess

Der Hauptprozess erschafft Webseiten durch die Verwendung von Instanzen der Klasse `BrowserWindow`. Jede dieser `BrowserWindow`-Instanzen lässt die Webseite in ihrem eigenen Renderer-Prozess laufen. Wird eine Instanz von `BrowserWindow` zerstört, so wird auch der zugehörige Renderer-Prozess beendet.

Der Hauptprozess verwaltet alle Webseiten und die zugehörigen Renderer-Prozesse. Jeder Renderer-Prozess ist abgekapselt und kümmert sich nur um die Webseite die von ihm ausgeführt wird.

Auf Webseiten ist das Aufrufen von APIs, die auf native GUI-Elemente zugreifen, nicht erlaubt. Die Verwaltung dieser Elemente ist sehr gefährlich und stellt ein Sicherheitsrisiko da. Wenn Sie GUI-Operationen auf einer Website ausführen wollen, dann muss der Renderer-Prozess der Webseite eine Anfrage an den Hauptprozess weiterleiten, damit letzterer diese Operationen ausführen kann.

In Electron existieren verschiedene Möglichkeiten zwischen dem Hauptprozess und den Renderer-Prozessen zu kommunizieren. Zum Beispiel die [`ipcRenderer`](../api/ipc-renderer.md) und [`ipcMain`](../api/ipc-main.md)-Module für das senden von einfachen Nachrichten und das [remote](../api/remote.md)-Modul für RPC-ähnliche Kommunikation. Passend dazu gibt es in den FAQ einen Eintrag zum [Teilen von Daten zwischen Webseiten](../faq.md#how-to-share-data-between-web-pages).

## Ihre erste Electron-App

Im Allgemeinen ist eine Electron-App wie folgt aufgebaut:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

Das Format der `package.json`-Datei ist genau das Gleiche wie das des Node-Moduls und das Script, welches durch das `main`-Feld angegeben wird ist das Einstiegsskript für Ihre App. Dieses führt den Hauptprotess aus. Ihre `package.json`-Datei könnte zum Beispiel so aussehen:

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Bemerkung**: Wenn das `main`-Feld in der `package.json`-Datei nicht angegeben ist, wird Electron versuchen eine `index.js`-Datei zu laden.

Das `main.js`-Skript sollte typischerweise Fenster erschaffen und Systemevents behandeln:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Behalten Sie eine globale Referenz auf das Fensterobjekt. 
// Wenn Sie dies nicht tun, wird das Fenster automatisch geschlossen, 
// sobald das Objekt dem JavaScript-Garbagekollektor übergeben wird.
let win

function createWindow () {
  // Erstellen des Browser-Fensters.
  win = new BrowserWindow({width: 800, height: 600})

  // und Laden der index.html der App.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Öffnen der DevTools.
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

Sobald Sie Ihre anfänglichen `main.js`, `index.html`, und `package.json`-Dateien erstellt haben, möchten Sie wahrscheinlich versuchen Ihre App lokal zu testen, um zu schauen ob sie wie geplant funktioniert.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) ist ein `npm`-Modul, dass vorkompilierte Versionen von Electron enthält.

Wenn Sie es global mit `npm` installiert haben, dann müssen Sie lediglich das Folgende im Souce-Verzeichnis Ihrer App ausführen:

```sh
electron .
```

Wenn Sie es lokal installiert haben, dann führen Sie Folgendes aus:

#### macOS / Linux

```sh
$ ./node_modules/.bin/electron .
```

#### Windows

```sh
$ .\node_modules\.bin\electron .
```

#### Node v8.2.0 und Neuere

```sh
$ npx electron .
```

### Electron manuell heruntergeladen

Wenn Sie Electron manuell heruntergeladen haben, können Sie auch die beiliegende Binary nutzen um Ihre App direkt auszuführen.

#### macOS

```sh
$ ./Electron.app/Contents/MacOS/Electron ihre-app/
```

#### Linux

```sh
$ ./electron/electron ihre-app/
```

#### Windows

```sh
$ .\electron\electron.exe ihre-app\
```

`Electron.app` ist hier Teil des Electron-Releases. Sie können es [hier](https://github.com/electron/electron/releases) herunterladen.

### Als Distribution ausführen

Nachdem Sie Ihre App fertig geschrieben haben, können Sie eine Distribution erstellen indem Sie der Anleitung "[Veröffentlichung der Anwendung](./application-distribution.md)" folgen und dann die gepackte Anwendung ausführen.

### Beispiel-Anwendung

Klonen und führen sie den Code für dieses Tutorial mithilfe folgendem Repository aus: [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

**Bemerkung**: Das Ausführen benötigt [Git](https://git-scm.com) und [Node.js](https://nodejs.org/en/download/) (welches [npm](https://npmjs.org) enthält) auf Ihrem System.

```sh
# Klonen des Repositorys
$ git clone https://github.com/electron/electron-quick-start
# Verzeichniswechsel in das Repository
$ cd electron-quick-start
# Install dependencies
$ npm install
# Run the app
$ npm start
```

Für weitere Beispiele, sehen Sie sich die [Liste der Boilerplates](https://electronjs.org/community#boilerplates) an, die von der großartigen Electron-Community entwickelt wurde.