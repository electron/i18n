# Débogage de l’application

Chaque fois que votre application Electron ne se comporte pas comme vous le souhaitez, un panel d'outils de débogage peut vous aider à trouver des erreurs de code, des goulots d’étranglement ou possibilités d’optimisation.

## Processus de rendu (renderer process)

L’outil le plus complet pour déboguer les processus individuels de rendu est le Chromium Developer Toolset. Il est disponible pour tous les processus de rendu, y compris les instances de `BrowserWindow`, `BrowserView` et `WebView`. Vous pouvez les ouvrir en appelant l'API `openDevTools()` sur le `webContents` de l’instance :

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google offre [une excellente documentation pour leurs outils de développement](https://developer.chrome.com/devtools). Nous vous recommandons que vous vous familiariser avec eux - ils sont généralement un des utilitaires plus puissants dans le panel d’outil à disposition des développeur Electron.

## Processus principal

Déboguer le processus principal est un peu plus compliqué, car vous ne pouvez pas ouvrir les outils de développement. Le Chromium Developer Tool peut [être utilisé pour déboguer le processus principal d'Electron](https://nodejs.org/en/docs/inspector/) grâce à une collaboration plus étroite entre Google / Chrome et Node.js, mais vous risquez de rencontrer des étrangetés comme `require` n’étant pas présent dans la console.

Pour plus d'informations, voir la [documentation sur le Débogage du processus principal](./debugging-main-process.md).