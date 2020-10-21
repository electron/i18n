# Schnellstart-Anleitung

## Schnellstart

Electron ist ein Framework, mit dem Sie Desktop-Anwendungen mit JavaScript, HTML und CSS erstellen können. Diese Anwendungen können dann direkt auf macOS, Windows oder Linux verpackt oder über den Mac App Store oder den Microsoft Store verteilt werden.

Normalerweise erstellen Sie eine Desktop-Anwendung für ein Betriebssystem unter Verwendung der jeweiligen native Anwendungs-Frameworks jedes Betriebssystems. Electron ermöglicht es, Ihre Anwendung einmal mit Technologien zu schreiben, die Sie bereits kennen.

### Vorrausetzungen

Bevor Sie mit Electron fortfahren, müssen Sie [Node.js](https://nodejs.org/en/download/) installieren. Wir empfehlen Ihnen, entweder die neueste `LTS` oder `Aktuelle` Version zu installieren.

> Bitte installieren Sie Node.js mit vorkompilierten Installern für Ihre Plattform. Andernfalls könnten Inkompatibilitätsprobleme mit verschiedenen Entwicklungstools auftreten.

Um zu überprüfen, ob Node.js korrekt installiert wurde, geben Sie die folgenden Befehle in Ihrem Terminal-Client ein:

```sh
knode -v
npm -v
```

Die Befehle sollten die Versionen von Node.js und npm entsprechend ausgeben. Wenn beide Befehle erfolgreich waren, sind Sie bereit, Electron zu installieren.

### Erstelle eine Basisanwendung

Aus der Entwicklungsperspektive ist eine Electron-Anwendung im Wesentlichen eine Node.js-Anwendung. Das bedeutet, dass der Ausgangspunkt Ihrer Electron-Anwendung eine `package.json` Datei sein wird, wie in jeder anderen Node.js Anwendung. Eine minimale Elektronenanwendung hat folgende Struktur:

```plain
my-electron-app/
<unk> 文<unk> package.json
<unk> 本<unk> main.js
<unk> 本<unk> index.html
```

Erstellen wir eine Basisanwendung basierend auf der obigen Struktur.

#### Install Electron

Erstellen Sie einen Ordner für Ihr Projekt und installieren Sie dort Electron:

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### Erstellen Sie die Hauptskript-Datei

Das Haupt-Skript legt den Einstiegspunkt Ihrer Electron-Anwendung fest (in unserem Fall die `main.js` Datei). Normalerweise zeigt das Skript, das im Hauptprozess ausgeführt wird, den Lebenszyklus der Anwendung an, die grafische Benutzeroberfläche und ihre Elemente an, führt native Betriebssystem-Interaktionen aus und erstellt Renderer-Prozesse innerhalb von Webseiten. Eine Electron-Anwendung kann nur einen Hauptprozess haben.

Das Hauptskript kann wie folgt aussehen:

```js
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    Höhe: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  gewinnen. oadFile('index.html')
  win.webContents.openDevTools()
}

App. henReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app. uit()
  }
})

app.on('activate', () => {
  if (BrowserWindow. etAllWindows().length === 0) {
    createWindow()
  }
})
```

##### Was geschieht oben?

1. Zeile 1: Zuerst du die `-App` und `BrowserWindow` Module des `electron` Pakets importierst, um den Lebenszyklus deiner Anwendung verwalten zu können sowie Browserfenster erstellen und steuern.
2. Zeile 3: Danach definieren Sie eine Funktion, die ein [neues Browserfenster](../api/browser-window.md#new-browserwindowoptions) mit aktivierter Knotenintegration erzeugt, lade `Index. tml` Datei in diesem Fenster (Zeile 12, wir werden die Datei später besprechen) und öffnet Entwicklerwerkzeuge (Zeile 13).
3. Zeile 16: Sie erstellen ein neues Browserfenster, indem Sie die `createWindow` Funktion aufrufen, sobald die Electron-Anwendung [initialisiert wurde](../api/app.md#appwhenready).
4. Zeile 18: Sie fügen einen neuen Zuhörer hinzu, der versucht, die Anwendung zu beenden, wenn sie kein geöffnetes Fenster mehr hat. This listener is a no-op on macOS due to the operating system's [window management behavior](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac).
5. Zeile 24: Sie fügen einen neuen Listener hinzu, der ein neues Browserfenster nur dann erzeugt, wenn die Anwendung nach der Aktivierung keine sichtbaren Fenster hat. Zum Beispiel nach dem ersten Start der Anwendung oder nach dem Neustart der bereits laufenden Anwendung.

#### Webseite erstellen

Dies ist die Webseite, die nach der Initialisierung der Anwendung angezeigt werden soll. Diese Webseite repräsentiert den Renderer-Prozess. Sie können mehrere Browserfenster erstellen, in denen jedes Fenster seinen eigenen, unabhängigen Renderer verwendet. Jedes Fenster kann optional mit vollem Zugriff auf die Node.js API durch die `Knoten-Integration` bevorzugt werden.

Die `index.html` Seite sieht wie folgt aus:

```html
<! OCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hallo Welt!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body>
    <h1>Hallo Welt!</h1>
    Wir verwenden node <script>Dokument. rite(process.versions.node)</script>,
    Chrome <script>document.write(process.versions. hrome)</script>,
    und Electron <script>document.write(process.versions.electron)</script>.
</body>
</html>
```

#### Ändern Sie Ihre package.json Datei

Ihre Electron-Anwendung verwendet die `package.json` Datei als Haupteintragspunkt (wie jede andere Node.js-Anwendung). Das Hauptskript Ihrer Anwendung ist `main.js`, also ändern Sie die `package.json` Datei entsprechend:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js"
}
```

> HINWEIS: Wenn das `Hauptfeld` weggelassen wird, versucht Electron einen `Index zu laden. s` Datei aus dem Verzeichnis, das `package.json` enthält.

Standardmäßig wird der `npm start` Befehl das Hauptskript mit Node.js ausführen. Um das Skript mit Electron auszuführen, müssen Sie es als solches ändern:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
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
    npx @electron-forge/cli import

    ✔ Überprüfe dein System
    ✔ Initialisiere Git Repository
    ✔ Schreiben modifiziertes Paket. son file
    ✔ Installiere Abhängigkeiten
    ✔ Schreiben des modifizierten Pakets. son file
    ✔ Fixing . itignore

    Wir haben AUSSCHLIESSLICH, um Ihre App in ein Format umzuwandeln, das Elektron-forge versteht.

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
// Im Hauptprozess
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... erledigen Aktionen im Namen des Renderer
})
```

```js
// Im Renderer-Prozess
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> HINWEIS: Da Renderer Prozesse möglicherweise nicht vertrauenswürdigen Code ausführen können (insbesondere von Dritten), Es ist wichtig, die Anforderungen, die an den Hauptprozess kommen, sorgfältig zu prüfen.

##### Node.js API

> HINWEIS: Um auf die Node.js API des Renderer-Prozesses zuzugreifen, müssen Sie die `nodeIntegration` Präferenz auf `true` setzen.

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