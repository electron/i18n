# Débogage de l’application

Chaque fois que votre application Electron ne se comporte pas comme vous le souhaitez, un panel d'outils de débogage peut vous aider à trouver des erreurs de code, des goulots d’étranglement ou possibilités d’optimisation.

## Processus de rendu (renderer process)

L’outil le plus complet pour déboguer les processus individuels de rendu est le Chromium Developer Toolset. Il est disponible pour tous les processus de rendu, y compris les instances de `BrowserWindow`, `BrowserView` et `WebView`. You can open them programmatically by calling the `openDevTools()` API on the `webContents` of the instance:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google offers [excellent documentation for their developer tools](https://developer.chrome.com/devtools). We recommend that you make yourself familiar with them - they are usually one of the most powerful utilities in any Electron Developer's tool belt.

## Processus principal

Debugging the main process is a bit trickier, since you cannot open developer tools for them. The Chromium Developer Tools can [be used to debug Electron's main process](https://nodejs.org/en/docs/inspector/) thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation](./debugging-main-process.md).