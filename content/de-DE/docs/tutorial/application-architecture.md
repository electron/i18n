# Anwendungsarchitektur in Electron

Bevor wir in die APIs von Electron eintauchen können, müssen wir die beiden in Electron verfügbare Prozess-Arten besprechen. Sie sind grundlegend verschieden und es ist wichtig sie zu verstehen.

## Main und Render Prozesse

Der Prozess, der das `main`-Skript der `package.json`-Datei ausführt, wird in Electron als **Main Prozess** bezeichnet. Das im Main Prozess laufende Skript kann durch das Erstellen von Webseiten eine grafische Oberfläche generieren. Eine Electron-App hat immer einen Main Prozess, aber niemals mehrere.

Dadurch, dass Electron für die Darstellung der Webseiten Chromium nutzt, wird auch Chromium's Multi-Prozess-Architektur verwendet. Jede Webseite in Electron läuft in ihrem eigenen Prozess, welcher **Renderer-Prozess** genannt wird.

In regulären Browsern laufen Webseiten normalerweise in einer isolierten Umgebung und haben daher keinen Zugriff auf native Ressourcen. Als Nutzer von Electron haben Sie die Option Node.js-APIs in den Webseiten zu nutzen. Damit werden Interaktionen auf Betriebssystemebene möglich.

### Unterschiede zwischen Main Prozess und Renderer Prozess

Der Main Prozess erschafft Webseiten durch die Verwendung von Instanzen der Klasse `BrowserWindow`. Jede dieser `BrowserWindow`-Instanzen lässt die Webseite in ihrem eigenen Renderer-Prozess laufen. Wird eine Instanz von `BrowserWindow` zerstört, so wird auch der zugehörige Renderer-Prozess beendet.

Der Hauptprozess verwaltet alle Webseiten und deren Renderer-Prozesse. Jeder Renderer-Prozess ist isoliert und kümmert sich nur um die Webseite die darin läuft.

Auf Webseiten ist das Aufrufen von APIs, die auf native GUI-Elemente zugreifen, nicht erlaubt. Die Verwaltung dieser Elemente ist sehr gefährlich und stellt ein Sicherheitsrisiko da. Wenn Sie GUI-Operationen auf einer Website ausführen wollen, dann muss der Renderer-Prozess der Webseite eine Anfrage an den Hauptprozess weiterleiten, damit letzterer diese Operationen ausführen kann.

> #### Anmerkung: Kommunikation zwischen Prozessen
> 
> In Electron, we have several ways to communicate between the main process and renderer processes, such as [`ipcRenderer`](../api/ipc-renderer.md) and [`ipcMain`](../api/ipc-main.md) modules for sending messages, and the [remote](../api/remote.md) module for RPC style communication. Passend dazu gibt es in den FAQ einen Eintrag zum [Teilen von Daten zwischen Webseiten](../faq.md#how-to-share-data-between-web-pages).

## Benutzung der Electron's APIs

Electron bietet eine Reihe von APIs an, die die Entwicklung einer Desktop-Anwendung sowohl im Hauptprozess als auch im Renderer-Prozess unterstützen. In beiden Prozessen greifen Sie auf die APIs von Electron zu, indem Sie das enthaltene Modul einbinden:

```javascript
const electron = require('electron')
```

Allen Electron-APIs ist ein Prozesstyp zugeordnet. Viele von ihnen können nur aus dem Hauptprozess verwendet werden, einige nur aus einem Renderer-Prozess, andere aus beiden. Die Dokumentation jeder einzelnen API gibt an, von welchem Prozess sie verwendet werden kann.

Ein Fenster in Electron wird z. B. mit dem `BrowserWindow`-Klasse erzeugt. Sie ist nur im Hauptprozess verfügbar.

```javascript
// Dies funktioniert im Hauptprozess, wird aber
// in einem Renderer-Prozess `undefined` sein:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Since communication between the processes is possible, a renderer process can call upon the main process to perform tasks. Electron comes with a module called `remote` that exposes APIs usually only available on the main process. In order to create a `BrowserWindow` from a renderer process, we'd use the remote as a middle-man:

```javascript
// This will work in a renderer process, but be `undefined` in the
// main process:
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

## Node.js APIs benutzen

Electron exposes full access to Node.js both in the main and the renderer process. This has two important implications:

1) All APIs available in Node.js are available in Electron. Calling the following code from an Electron app works:

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// This will print all files at the root-level of the disk,
// either '/' or 'C:\'.
console.log(root)
```

As you might already be able to guess, this has important security implications if you ever attempt to load remote content. You can find more information and guidance on loading remote content in our [security documentation](./security.md).

2) You can use Node.js modules in your application. Pick your favorite npm module. npm offers currently the world's biggest repository of open-source code – the ability to use well-maintained and tested code that used to be reserved for server applications is one of the key features of Electron.

As an example, to use the official AWS SDK in your application, you'd first install it as a dependency:

```sh
npm install --save aws-sdk
```

Then, in your Electron app, require and use the module as if you were building a Node.js application:

```javascript
// A ready-to-use S3 Client
const S3 = require('aws-sdk/clients/s3')
```

There is one important caveat: Native Node.js modules (that is, modules that require compilation of native code before they can be used) will need to be compiled to be used with Electron.

The vast majority of Node.js modules are *not* native. Only 400 out of the ~650.000 modules are native. However, if you do need native modules, please consult [this guide on how to recompile them for Electron](./using-native-node-modules.md).