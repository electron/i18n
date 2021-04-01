# Schnellstart-Anleitung

## Schnellstart

Electron ist ein Framework, mit dem Sie Desktop-Anwendungen mit JavaScript, HTML und CSS erstellen können. Diese Anwendungen können dann so gebildet werden, dass sie direkt auf macOS, Windows oder Linux laufen. Zudem können sie direkt über den Mac App Store sowie den Microsoft Store verteilt werden.

Normalerweise erstellt man eine Desktop-Anwendung separat für jedes Betriebssystem unter Verwendung von dessen spezifischem Applikations-Framework. Electron ermöglicht es Ihnen, Ihre Anwendung nur einmal unter Anwendung von Ihnen bereits bekannten Technologien schreiben zu müssen.

### Vorrausetzungen

Before proceeding with Electron you need to install [Node.js][node-download]. Wir empfehlen Ihnen, entweder die neueste `LTS` oder `Aktuelle` Version zu installieren.

> Bitte installieren Sie Node.js mit vorkompilierten Installern für Ihre Plattform. Andernfalls könnten Inkompatibilitätsprobleme mit verschiedenen Entwicklungstools auftreten.

Um zu überprüfen, ob Node.js korrekt installiert wurde, geben Sie die folgenden Befehle in Ihrem Terminalfenster ein:

```sh
node -v
npm -v
```

Die Befehle sollten die entsprechenden Versionen von Node.js und npm ausgeben. Wenn beide Befehle erfolgreich waren, sind Sie bereit, Electron zu installieren.

### Erstelle eine Basisanwendung

Aus der Entwicklungsperspektive ist eine Electron-Anwendung im Wesentlichen eine Node.js-Anwendung. Das bedeutet, dass der Ausgangspunkt Ihrer Electron-Anwendung eine `package.json` Datei sein wird, wie in jeder anderen Node.js Anwendung. Eine minimale Electron-Anwendung hat folgende Struktur:

```plaintext
my-electron-app/
├── package.json
├── main.js
├── preload.js
└── index.html
```

Lassen Sie uns eine Basisanwendung basierend auf der obigen Struktur erstellen.

#### Electron Installieren

Erstellen Sie einen Ordner für Ihr Projekt und installieren Sie dort Electron:

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### Erstellen Sie die Hauptskript-Datei

Das Haupt-Skript legt den Einstiegspunkt Ihrer Electron-Anwendung fest (in unserem Fall die `main.js` Datei). Normalerweise zeigt das Skript, das im Hauptprozess ausgeführt wird, den Lebenszyklus der Anwendung an, die grafische Benutzeroberfläche und ihre Elemente an, führt native Betriebssystem-Interaktionen aus und erstellt Renderer-Prozesse innerhalb von Webseiten. Eine Electron-Anwendung kann nur einen Hauptprozess haben.

Das Hauptskript kann wie folgt aussehen:

```javascript fiddle='docs/fiddles/quick-start'
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

##### Was geschieht oben?

1. Zeile 1: Zuerst werden die Module `app` und `BrowserWindow` des Pakets `electron` importiert, um den Lebenszyklus deiner Anwendung verwalten zu können sowie Browserfenster zu erstellen und zu steuern.
2. Line 2: Second, you import the `path` package which provides utility functions for file paths.
3. Line 4: After that, you define a function that creates a [new browser window](../api/browser-window.md#new-browserwindowoptions) with a preload script, loads `index.html` file into this window (line 13, we will discuss the file later).
4. Zeile 16: Sie erstellen ein neues Browserfenster, indem Sie die Funktion `createWindow` aufrufen, sobald die Electron-Anwendung [initialisiert wurde](../api/app.md#appwhenready).
5. Line 18: You add a new listener that creates a new browser window only if when the application has no visible windows after being activated. Zum Beispiel nach dem ersten Start der Anwendung oder nach dem Neustart der bereits laufenden Anwendung.
6. Zeile 25: Sie fügen einen neuen "listener" hinzu, der versucht, die Anwendung zu beenden, wenn sie kein geöffnetes Fenster mehr hat. Dieser Listener ist unter macOS aufgrund des [Fensterverwaltungsverhaltens des Betriebssystems](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac) ein No-Op.

#### Webseite erstellen

Dies ist die Webseite, die nach der Initialisierung der Anwendung angezeigt werden soll. Diese Webseite repräsentiert den Renderer-Prozess. Sie können mehrere Browserfenster erstellen, in denen jedes Fenster seinen eigenen, unabhängigen Renderer verwendet. You can optionally grant access to additional Node.js APIs by exposing them from your preload script.

Die `index.html` Seite sieht wie folgt aus:

```html fiddle='docs/fiddles/quick-start'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hello World!</h1>
    <p>
        We are using Node.js <span id="node-version"></span>,
        Chromium <span id="chrome-version"></span>,
        and Electron <span id="electron-version"></span>.
    </p>
</body>
</html>
```

#### Define a preload script

Your preload script acts as a bridge between Node.js and your web page. It allows you to expose specific APIs and behaviors to your web page rather than insecurely exposing the entire Node.js API. In this example we will use the preload script to read version information from the `process` object and update the web page with that info.

```javascript fiddle='docs/fiddles/quick-start'
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
```

##### What's going on above?

1. On line 1: First you define an event listener that tells you when the web page has loaded
2. On line 2: Second you define a utility function used to set the text of the placeholders in the `index.html`
3. On line 7: Next you loop through the list of components whose version you want to display
4. On line 8: Finally, you call `replaceText` to look up the version placeholders in `index.html` and set their text value to the values from `process.versions`

#### Ändern Sie Ihre package.json Datei

Ihre Electron-Anwendung verwendet die `package.json` Datei als Haupteintragspunkt (wie jede andere Node.js-Anwendung). Das Hauptskript Ihrer Anwendung ist `main.js`, also ändern Sie die `package.json` Datei entsprechend:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js"
}
```

> HINWEIS: Wenn das `Hauptfeld` weggelassen wird, versucht Electron einen `Index zu laden. s` Datei aus dem Verzeichnis, das `package.json` enthält.

> NOTE: The `author` and `description` fields are required for packaging, otherwise error will occur when running `npm run make`.

Standardmäßig wird der `npm start` Befehl das Hauptskript mit Node.js ausführen. Um das Skript mit Electron auszuführen, müssen Sie es als solches ändern:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    }
}
```

#### Anwendung ausführen

```sh
npm Anfang
```

Deine laufende Electron-App sollte wie folgt aussehen:

![Einfachste Electron-App](../images/simplest-electron-app.png)

### Paket und verteilen Sie die Anwendung

Der einfachste und schnellste Weg, Ihre neu erstellte App zu verteilen, ist [Electron Forge](https://www.electronforge.io).

1. Importiere Electron Forge in deinen App-Ordner:

    ```sh
    npm install --save-dev @electron-forge/cli
    npx electron-forge import

    ✔ Checking your system
    ✔ Initializing Git Repository
    ✔ Writing modified package.json file
    ✔ Installing dependencies
    ✔ Writing modified package.json file
    ✔ Fixing .gitignore

    We have ATTEMPTED to convert your app to be in a format that electron-forge understands.

    Vielen Dank für die Verwendung von "electron-forge"!!!
    ```

1. Erstelle eine Verteilbare:

    ```sh
    npm run make

    > my-gsod-electron-app@1.0. make /my-electron-app
    > electron-forge make

    ✔ Prüfe dein System
    ✔ Lösung der Forge Config
    Wir müssen deine Anwendung packen, bevor wir sie machen können:
    ✔ Vorbereitung auf die Paketanwendung für den Bogen: x64
    ✔ Vorbereitung auf native Abhängigkeiten
    ✔ Packaging Application
    Making for the following targets: zip
    ✔ Making for target: zip - On platform: darwin - For arch: x64 x64 electron-forge make /my-electron-app 
 > electron-forge make 

 :heavy_mark: Check _mark: Prfe dein System 

 :heavy_mark:
    ```

    Electron-forge erstellt den `Out` Ordner, in dem Ihr Paket sich befinden wird:

    ```plain
    // Beispiel für MacOS
    draußen/
    <unk> 本<unk> out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    <unk> 文<unk> ...
    <unk> 本<unk> out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

## Grundlagen lernen

Dieser Abschnitt führt Sie durch die Grundlagen wie Electron unter der Haube funktioniert. Es zielt darauf ab, das Wissen über Electron und die Anwendung, die zuvor im Abschnitt Quickstart erstellt wurde, zu verbessern.

### Anwendungsarchitektur

Elektron besteht aus drei Säulen:

* **Chromium** für die Anzeige von Webinhalten.
* **Node.js** für die Arbeit mit dem lokalen Dateisystem und dem Betriebssystem.
* **Benutzerdefinierte APIs** für die Arbeit mit häufig benötigten Betriebssystem-nativen Funktionen.

Die Entwicklung einer Anwendung mit Electron ist wie das Erstellen einer Node.js App mit einer Webschnittstelle oder das Erstellen von Webseiten mit nahtloser Node.js Integration.

#### Main und Render Prozesse

Wie bereits erwähnt, hat Electron zwei Arten von Prozessen: Main und Renderer.

* Der Hauptprozess **erstellt** Webseiten, indem Sie `BrowserWindow` Instanzen erstellen. Jede `BrowserWindow` Instanz führt die Webseite in ihrem Renderer-Prozess aus. Wenn eine `BrowserWindow` Instanz gelöscht wird, wird auch der entsprechende Renderer-Prozess beendet.
* Der Hauptprozess **verwaltet** alle Webseiten und deren entsprechenden Renderer-Prozesse.

----

* Der Renderer-Prozess **verwaltet** nur die entsprechende Webseite. Ein Absturz eines Renderer-Prozesses hat keinen Einfluss auf andere Renderer-Prozesse.
* Der Renderer-Prozess **kommuniziert** mit dem Hauptprozess über IPC, um GUI-Operationen auf einer Webseite durchzuführen. Der direkte Aufruf von GUI-bezogenen APIs aus dem Renderer-Prozess ist aufgrund von Sicherheitsbedenken und potentiellen Resourcenlecks beschränkt.

----

Die Kommunikation zwischen den Prozessen ist über Inter-Process Communication (IPC) Module möglich: [`ipcMain`](../api/ipc-main.md) und [`ipcRenderer`](../api/ipc-renderer.md).

#### APIs

##### Electron API

Electron-APIs werden basierend auf dem Prozess-Typ zugewiesen, , was bedeutet, dass einige Module entweder aus dem Haupt- oder Renderer-Prozess verwendet werden können und einige aus beiden. Die elektronische API-Dokumentation gibt an, aus welchem Prozess jedes Modul verwendet werden kann.

Zum Beispiel, um in beiden Prozessen auf die Electron-API zuzugreifen, benötigen das enthaltene Modul:

```js
const electron = require('electron')
```

Um ein Fenster zu erstellen, rufen Sie die `BrowserWindow` Klasse auf, die nur im Hauptprozess verfügbar ist:

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

Um den Hauptprozess vom Renderer aus aufzurufen, verwenden Sie das IPC-Modul:

```js
// In the Main process
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... do actions on behalf of the Renderer
})
```

```js
// Im Renderer-Prozess
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> HINWEIS: Da Renderer Prozesse möglicherweise nicht vertrauenswürdigen Code ausführen können (insbesondere von Dritten), Es ist wichtig, die Anforderungen, die an den Hauptprozess kommen, sorgfältig zu prüfen.

##### Node.js API

> NOTE: To access the Node.js API from the Renderer process, you need to set the `nodeIntegration` preference to `true` and the `contextIsolation` preference to `false`.  Please note that access to the Node.js API in any renderer that loads remote content is not recommended for [security reasons](../tutorial/security.md#2-do-not-enable-nodejs-integration-for-remote-content).

Electron stellt den vollen Zugriff auf die Node.js API und seine Module sowohl im Haupt- als auch im Renderer-Prozess frei. Zum Beispiel können Sie alle Dateien aus dem Stammverzeichnis lesen:

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

Um ein Node.js Modul zu verwenden, müssen Sie es zuerst als Abhängigkeit installieren:

```sh
npm install --save aws-sdk
```

Dann benötigen Sie in Ihrer Electron-Anwendung das Modul:

```js
const S3 = require('aws-sdk/clients/s3')
```

[node-download]: https://nodejs.org/en/download/
