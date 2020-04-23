# Anwendungsarchitektur in Electron

Bevor wir in die APIs von Electron eintauchen können, müssen wir die beiden in Electron verfügbare Prozess-Arten besprechen. Sie sind grundlegend verschieden und es ist wichtig sie zu verstehen.

## Main und Render Prozesse

Der Prozess, der das `main`-Skript der `package.json`-Datei ausführt, wird in Electron als __Hauptprozess__ bezeichnet. Das im Main Prozess laufende Skript kann durch das Erstellen von Webseiten eine grafische Oberfläche generieren. Eine Electron-App hat immer einen Main Prozess, aber niemals mehrere.

Dadurch, dass Electron für die Darstellung der Webseiten Chromium nutzt, wird auch Chromium's Multi-Prozess-Architektur verwendet. Jede Webseite in Electron läuft in ihrem eigenen Prozess, welcher __Renderer-Prozess__ genannt wird.

In regulären Browsern laufen Webseiten normalerweise in einer isolierten Umgebung und haben daher keinen Zugriff auf native Ressourcen. Als Nutzer von Electron haben Sie die Option Node.js-APIs in den Webseiten zu nutzen. Damit werden Interaktionen auf Betriebssystemebene möglich.

### Unterschiede zwischen Main Prozess und Renderer Prozess

Der Main Prozess erschafft Webseiten durch die Verwendung von Instanzen der Klasse `BrowserWindow`. Jede dieser `BrowserWindow`-Instanzen lässt die Webseite in ihrem eigenen Renderer-Prozess laufen. Wird eine Instanz von `BrowserWindow` zerstört, so wird auch der zugehörige Renderer-Prozess beendet.

Der Main Prozess verwaltet alle Webseiten und deren Renderer-Prozesse. Jeder Renderer-Prozess ist isoliert und kümmert sich nur um die Webseite die darin läuft.

Auf Webseiten ist das Aufrufen von APIs, die auf native GUI-Elemente zugreifen, nicht erlaubt. Die Verwaltung dieser Elemente ist sehr gefährlich und stellt ein Sicherheitsrisiko da. Wenn Sie GUI-Operationen auf einer Website ausführen wollen, dann muss der Renderer-Prozess der Webseite eine Anfrage an den Main Prozess weiterleiten, damit der Main Prozess diese Operationen ausführt.

> #### Anmerkung: Kommunikation zwischen Prozessen
> 
> In Electron stehen uns verschiedene Wege der Kommunikation zwischen Main- und Render Prozess zur Verfügung, wie z.B. das [`ipcRenderer`](../api/ipc-renderer.md) und das [`ipcMain`](../api/ipc-main.md) Module für das versenden von Nachrichten und das [remote](../api/remote.md) module für RPC Kommunikation. Passend dazu gibt es in den FAQ einen Eintrag zum [Teilen von Daten zwischen Webseiten](../faq.md#how-to-share-data-between-web-pages).

## Benutzung der Electron's APIs

Electron bietet eine Reihe von APIs an, die die Entwicklung einer Desktop-Anwendung sowohl im Main-Prozess als auch im Renderer-Prozess unterstützen. In beiden Prozessen greifen Sie auf die APIs von Electron zu, indem Sie das enthaltene Modul per require einbinden:

```javascript
const electron = require('electron')
```

Allen Electron-APIs ist ein Prozesstyp zugeordnet. Viele von ihnen können nur aus dem Main-Prozess verwendet werden, einige nur aus einem Renderer-Prozess, andere aus beiden. Die Dokumentation jeder einzelnen API gibt an, von welchem Prozess sie verwendet werden kann.

Ein Fenster in Electron wird z.B. mit dem `BrowserWindow`-Klasse erzeugt. Sie ist nur im Main-Prozess verfügbar.

```javascript
// Dies funktioniert im Main-Prozess, wird aber
// in einem Renderer-Prozess `undefined` sein:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Dadurch dass Kommunikation zwischen Prozessen möglich ist, kann ein Render-Prozess den Main-Prozess auffordern einen Task auszuführen. In Electron gibt es ein Modul genannt `remote` welches APIs bereitstellt welche gewöhnlich nur dem Main-Prozess zur Verfügung stehen. Um ein `BrowserWindow` aus einem Render-Prozess heraus zu erstellen, verwenden wir <0>remote</0> als Mittelsmann:

```javascript
// Dies funtioniert in Render-Prozess, gibt aber `undefined` 
// im Main-Prozess zurück:
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

## Node.js APIs verwenden

Electron erlaubt vollen Zugriff auf Node.js, sowohl im Main- als auch im Render-Prozess. Dies hat zwei wichtige Auswirkungen:

1) Alle APIs welche Node.js zur Verfügung stehen, stehen auch Electron zur Verfügung. Der folgende Code funktioniert in einer Electron App:

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// Dies gibt alle Dateien die sich in Ihrem Root-Verzeichnis,
// befinden aus, '/' oder 'C:\'.
console.log(root)
```

Wie Du dir bestimmt Vorstellen kannst, ist dies ein wichtiger Aspekt im Bezug auf Sicherheit, wann auch immer du Remote Inhalte lädst. Weitere Informationen und Anleitung zum Thema, laden von Remote Inhalten findest Du in unserer [Security Dokumentation](./security.md).

2) Du kannst Node.js Module in deiner App verwenden. Pick dir einfach dein lieblings npm Modul. npm bietet zur Zeit das Welt größte Repository mit Open-Source-Code an. Die Möglichkeit gut gepflegten und getesteten Code zu verwenden, der bisher nur für Server Anwendungen zur Verfügung stand, ist eine der wichtigsten Eigenschaften von Electron.

Um zum Beispiel die offizielle AWS SDK in Deiner Anwendung zu verwenden, installierst du diese zuerst einmal als Dependency:

```sh
npm install --save aws-sdk
```

Dann, in deiner Electron App bindest du das Modul ein per require, genauso wie du es ein einer Node.js App tun würdest:

```javascript
// A ready-to-use S3 Client
const S3 = require('aws-sdk/clients/s3')
```

Es gibt eine wichtig Einschränkung: Native Node.js Module welche compiliert werden müssen bevor sie verwendet werden können, müssen compiliert werden bevor sie in Electron verwendet werden können.

Die große Mehrheit der Node.js Module sind _nicht_ nativ. Nur 400 aus ca. 650,000 Modulen sind Nativ. Dennoch, wenn Du Native Module benötigst, dann lies bitte [diese Anleitung über das recompilen von Modulen für Electron](./using-native-node-modules.md).
