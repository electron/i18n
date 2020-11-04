# Applicatie foutopsporing

Wanneer je Electron applicatie zich niet gedraagt zoals je wilde, een reeks debugging tools zou je kunnen helpen coderingsfouten, prestaties bottlenecks of optimalisatie mogelijkheden te vinden.

## Renderer Proces

Het meest uitgebreide hulpmiddel om individuele renderer-processen te debuggen is de Chromium Developer Toolset. Het is beschikbaar voor alle spelerprocessen, inclusief instanties van `BrowserWindow`, `BrowserView`, en `WebView`. U kunt ze programmatisch openen door de `openDevTools()` API aan te roepen op de `webcontent` van de instantie:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google offers [excellent documentation for their developer tools][devtools]. We raden je aan om jezelf vertrouwd te maken met hen - ze zijn meestal één van de krachtigste functies in de gereedschapsgordels van Electron Ontwikkelaar.

## Hoofd Proces

Debuggen van het hoofdproces is een beetje lastiger, omdat je ontwikkelaarshulpmiddelen voor hen niet kunt openen. The Chromium Developer Tools can [be used to debug Electron's main process][node-inspect] thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation][main-debug].

[node-inspect]: https://nodejs.org/en/docs/inspector/
[devtools]: https://developer.chrome.com/devtools
[main-debug]: ./debugging-main-process.md
