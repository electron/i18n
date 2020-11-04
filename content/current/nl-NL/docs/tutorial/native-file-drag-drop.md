# Drag & Drop Bestanden

## Overview

Bepaalde soorten toepassingen die bestanden manipuleren willen misschien het besturingssysteem standaard bestand slepen & drop functie. Bestanden verplaatsen naar webinhoud is veel voorkomende en wordt door veel websites ondersteund. Electron ondersteunt additioneel het slepen van bestanden en inhoud van webcontent naar het besturingssysteem systeem.

Om deze functie te implementeren in uw app, moet u de [`webcontent aanroepen. tartDrag(item)`](../api/web-contents.md#contentsstartdragitem) API in reactie op het `ondragstart` evenement.

## Voorbeeld

Vanaf een werkende applicatie van de [Quick Start Guide](quick-start.md), voeg de volgende regels toe aan het `index.html` bestand:

```html
<a href="#" id="drag">Sleep me</a>
<script src="renderer.js"></script>
```

en voeg de volgende regels toe aan het bestand `renderer.js`:

```js
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/absolute/path/to/item')
}
```

De code hierboven instrueert het Renderer-proces om de `ondragstart` event te verwerken en de informatie door te sturen naar het hoofdproces.

In het hoofdproces (`voorop. s` bestand), vul de ontvangen gebeurtenis uit met een pad naar het bestand dat wordt gesleept en een pictogram:

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icoon: '/path/to/icon.png'
  })
})
```

Na het starten van de Electron applicatie, probeer het te slepen en het item uit het BroswerWindow naar je bureaublad te laten slepen. In deze handleiding, is het artikel een Markdown bestand dat zich bevindt in de hoofdmap van het project:

![Slepen en neerzetten](../images/drag-and-drop.gif)
