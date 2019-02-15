# Anwendungs Debugging

Wann auch immer deine Electron App sich nicht so verhält wie gewünscht, dann stehen dir eine Vielzahl von Debugging-Tools zur Verfügung um Fehler im Code, einen Flaschenhals für die Pervormance oder Möglichkeiten zur Optimierung zu finden.

## Renderer-Prozess

Das umfassendste Tool zum Debuggen individueller Render-Pozesse ist das Chromium Developer Toolset. Das Toolset steht zur Verfügung in allen Render-Prozessen, inklusive Instanzen von `BrowserWindow`, `BrowserView` und `WebView`. You can open them programmatically by calling the `openDevTools()` API on the `webContents` of the instance:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google offers [excellent documentation for their developer tools](https://developer.chrome.com/devtools). We recommend that you make yourself familiar with them - they are usually one of the most powerful utilities in any Electron Developer's tool belt.

## Hauptprozess

Debugging the main process is a bit trickier, since you cannot open developer tools for them. The Chromium Developer Tools can [be used to debug Electron's main process](https://nodejs.org/en/docs/inspector/) thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation](./debugging-main-process.md).