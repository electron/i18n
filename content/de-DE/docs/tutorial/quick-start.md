# Schnellstart-Anleitung

## Schnellstart

Electron ist ein Framework, mit dem Sie Desktop-Anwendungen mit JavaScript, HTML und CSS erstellen können. Diese Anwendungen können dann so gebildet werden, dass sie direkt auf macOS, Windows oder Linux laufen. Zudem können sie direkt über den Mac App Store sowie den Microsoft Store verteilt werden.

Normalerweise erstellt man eine Desktop-Anwendung separat für jedes Betriebssystem unter Verwendung von dessen spezifischem Applikations-Framework. Electron ermöglicht es Ihnen, Ihre Anwendung nur einmal unter Anwendung von Ihnen bereits bekannten Technologien schreiben zu müssen.

### Vorrausetzungen

Bevor Sie mit Electron fortfahren, müssen Sie [Nodeinstallieren.js][node-download]installieren. Wir empfehlen Ihnen, entweder die neueste `LTS` oder `Aktuelle` Version zu installieren.

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
- package.json
-, Main.js
-Preload.js
-Index.html
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

-Funktion createWindow () '
  const win = new BrowserWindow('
    breite: 800,
    höhe: 600,
    webPreferences: '
      preload: path.join(__dirname, 'preload.js')


  
  ('index.html')
'

app.whenReady().then() => '
  createWindow()

  app.on('activate', () => '
    if (BrowserWindow.getAll) Windows().length === 0)
      createWindow()
    -
  -)
-)

app.on('window-all-closed', () => '
  if (process.platform !== 'darwin') -
    app.quit()
  -
)
```

##### Was geschieht oben?

1. Zeile 1: Zuerst werden die Module `app` und `BrowserWindow` des Pakets `electron` importiert, um den Lebenszyklus deiner Anwendung verwalten zu können sowie Browserfenster zu erstellen und zu steuern.
2. Zeile 2: Zweitens importieren Sie das `path` -Paket, das Dienstprogrammfunktionen für Dateipfade bereitstellt.
3. Zeile 4: Danach definieren Sie eine Funktion, die eine [neues Browserfenster erstellt](../api/browser-window.md#new-browserwindowoptions) mit einem Preload-Skript `index.html` Datei in dieses Fenster lädt (Zeile 13, wir werden die Datei später besprechen).
4. Zeile 16: Sie erstellen ein neues Browserfenster, indem Sie die Funktion `createWindow` aufrufen, sobald die Electron-Anwendung [initialisiert wurde](../api/app.md#appwhenready).
5. Zeile 18: Sie fügen einen neuen Listener hinzu, der ein neues Browserfenster nur dann erstellt, wenn die Anwendung nach der Aktivierung keine sichtbaren Fenster hat. Zum Beispiel nach dem ersten Start der Anwendung oder nach dem Neustart der bereits laufenden Anwendung.
6. Zeile 25: Sie fügen einen neuen "listener" hinzu, der versucht, die Anwendung zu beenden, wenn sie kein geöffnetes Fenster mehr hat. Dieser Listener ist unter macOS aufgrund des [Fensterverwaltungsverhaltens des Betriebssystems](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac) ein No-Op.

#### Webseite erstellen

Dies ist die Webseite, die nach der Initialisierung der Anwendung angezeigt werden soll. Diese Webseite repräsentiert den Renderer-Prozess. Sie können mehrere Browserfenster erstellen, in denen jedes Fenster seinen eigenen, unabhängigen Renderer verwendet. Sie können optional Zugriff auf zusätzliche Node.js-APIs gewähren, indem Sie sie aus Ihrem Preload-Skript aussetzen.

Die `index.html` Seite sieht wie folgt aus:

```html fiddle='docs/fiddles/quick-start'
<! DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hello World!</h1>
    <p>
        Wir verwenden Node.js <span id="node-version"></span>,
        Chromium <span id="chrome-version"></span>,
        und Electron <span id="electron-version"></span>.
    </p>
</body>
</html>
```

#### Definieren eines Preload-Skripts

Ihr Preload-Skript fungiert als Brücke zwischen Node.js und Ihrer Webseite. Es ermöglicht Ihnen, bestimmte APIs und Verhaltensweisen auf Ihrer Webseite verfügbar zu machen, anstatt die gesamte Node.js-API unsicher verfügbar zu machen. In diesem Beispiel verwenden wir das Preload-Skript, um Versionsinformationen aus dem `process` -Objekt zu lesen und die Webseite mit diesen Informationen zu aktualisieren.

```javascript fiddle='docs/fiddles/quick-start'
window.addEventListener('DOMContentLoaded', () => '
  const replaceText = (Selector, text) =>
    const-Element = document.getElementById(selector)
    if (element) element.innerText = text
  '

  for (const type of ['chrome', ''


  [type]${type}'
```

##### Was ist oben los?

1. In Zeile 1: Zuerst definieren Sie einen Ereignislistener, der Ihnen mitteilt, wann die Webseite geladen wurde.
2. In Zeile 2: Zweitens definieren Sie eine Hilfsfunktion, mit der der Text der Platzhalter im `index.html`
3. In Zeile 7: Als Nächstes durchlaufen Sie die Liste der Komponenten, deren Version Sie anzeigen möchten
4. In Zeile 8: Schließlich rufen Sie `replaceText` auf, die Versionsplatzhalter in `index.html` nachzuschlagen und ihren Textwert auf die Werte aus `process.versions`

#### Ändern Sie Ihre package.json Datei

Ihre Electron-Anwendung verwendet die `package.json` Datei als Haupteintragspunkt (wie jede andere Node.js-Anwendung). Das Hauptskript Ihrer Anwendung ist `main.js`, also ändern Sie die `package.json` Datei entsprechend:

```json
-
    "Name": "my-electron-app",
    "version": "0.1.0",
    "autor": "Ihr Name",
    "Beschreibung": "My Electron app",
    "main": "main.js"
.
```

> HINWEIS: Wenn das `Hauptfeld` weggelassen wird, versucht Electron einen `Index zu laden. s` Datei aus dem Verzeichnis, das `package.json` enthält.

> HINWEIS: Die Felder `author` und `description` sind für die Verpackung erforderlich, andernfalls tritt beim Ausführen `npm run make`fehlerfrei auf.

Standardmäßig wird der `npm start` Befehl das Hauptskript mit Node.js ausführen. Um das Skript mit Electron auszuführen, müssen Sie es als solches ändern:

```json
•
    "Name": "my-electron-app",
    "version": "0.1.0",
    "Autor": "Ihr Name",
    "Beschreibung": "My Electron app",
    "main": "main.js",
    "scripts"
        :
    •

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

    ✔ Überprüfen Ihres Systems
    ✔ Initialisieren von Git Repository
    ✔ Schreiben der modifizierten package.json-Datei
    ✔ Installieren von Abhängigkeiten
    ✔ Schreiben von modifiziertem paket.json-Datei
    ✔ Fixing .gitignore

    Wir haben VERSUCHT, Ihre App in ein Format zu konvertieren, das von Electron forge verstanden wird.

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
Im Hauptprozess
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ... args) => -
  / ... Aktionen im Namen des Renderer-
ausführen)
```

```js
// Im Renderer-Prozess
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> HINWEIS: Da Renderer Prozesse möglicherweise nicht vertrauenswürdigen Code ausführen können (insbesondere von Dritten), Es ist wichtig, die Anforderungen, die an den Hauptprozess kommen, sorgfältig zu prüfen.

##### Node.js API

> HINWEIS: Um über den Renderer-Prozess auf die Node.js-API zuzugreifen, müssen Sie die `nodeIntegration` -Voreinstellung auf `true` und die `contextIsolation` -Voreinstellung für `false`festlegen.  Bitte beachten Sie, dass der Zugriff auf die Node.js-API in jedem Renderer, der Remoteinhalte lädt, aus [Sicherheitsgründen nicht empfohlen wird](../tutorial/security.md#2-do-not-enable-nodejs-integration-for-remote-content).

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
