# Übersicht

> Verwendung von Node.js- und Electron-APIs.

Alle integrierten Module von [Node.js](https://nodejs.org/api/) sind in Electron- und Drittanbieter-Knotenmodulen ebenfalls vollständig unterstützt (einschließlich [nativemodule](../tutorial/using-native-node-modules.md)).

Electron bietet auch einige zusätzliche integrierte Module für die Entwicklung nativer Desktop-Anwendungen. Einige Module sind nur im Hauptprozess verfügbar, einige sind nur im Rendererprozess (Webseite) verfügbar, und einige können in beiden Prozesstyps verwendet werden.

Die Grundregel lautet: Wenn ein Modul [GUI][gui] oder Low-Level-System verwandt ist, sollte es nur im Hauptprozess verfügbar sein. Sie müssen mit konzept [Hauptprozess vs. Renderer-Prozess](../tutorial/quick-start.md#main-and-renderer-processes) Skripts vertraut sein, um diese Module verwenden zu können.

Das Main-Prozess Script ist wie ein normales Node.js Script:

```javascript
const { app, BrowserWindow } = require('electron')
win = null

app.whenReady().then() => '
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('https://github.com')
)
```

Der Renderer-Prozess unterscheidet sich nicht von einer normalen Webseite, mit Ausnahme der zusätzlichen Möglichkeit, Knotenmodule zu verwenden, wenn `nodeIntegration` aktiviert ist:

```html
<! DOCTYPE html>
<html>
<body>
<script>
  const fs = require('fs')
  console.log(fs.readFileSync(__filename, 'utf8'))
</script>
</body>
</html>
```

Um Ihre App auszuführen, lesen Sie [Führen Sie Ihre App](../tutorial/quick-start.md#run-your-application)aus.

## Destructuring assignment

Ab 0.37 können Sie [Destructuring-Zuweisung][destructuring-assignment] verwenden, um die Verwendung integrierten Modulen zu vereinfachen.

```javascript
const { app, BrowserWindow } = require('electron')



app.whenReady().then() => '
  win = new BrowserWindow()
  win.loadURL('https://github.com')
gewinnen lassen.
```

Wenn du das gesamte `electron` Module brauchst, dann kannst du dieses per require einbinden und auf einzelne `electron` Module per destructuring zugreifen.

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

lassen sie

app.whenReady(). dann() =>
  win = new BrowserWindow()
  win.loadURL('https://github.com')

```

Dies ist equivalent zum folgenden Code:

```javascript
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron. BrowserWindow


app.whenReady(). dann() =>
  win = new BrowserWindow()
  win.loadURL('https://github.com')

```

[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[destructuring-assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
