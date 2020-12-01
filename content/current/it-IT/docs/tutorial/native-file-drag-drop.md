# Trascina & Rilascia File Nativo

## Overview

Alcuni tipi di app che manipolano file potrebbero voler supportare la funzione trascina & rilascia del file nativo del sistema operativo. Rilasciare file nel contenuto web è comune e supportato da molti siti web. Electron supporta inoltre il rilascio di file e contenuti fuori dal contenuto web nel mondo del sistema operativo.

Per implementare questa funzione nella tua app, devi chiamare i [`contenuti web. tartDrag(item)`](../api/web-contents.md#contentsstartdragitem) API in risposta all'evento `ondragstart`.

## Esempio

A partire da un'applicazione funzionante dalla [Quick Start Guide](quick-start.md), aggiungi le seguenti righe al file `index.html`:

```html
<a href="#" id="drag">Trascina</a>
<script src="renderer.js"></script>
```

e aggiungi le seguenti righe al file `renderer.js`:

```javascript
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/absolute/path/to/the/item')
}
```

Il codice sopra istruisce il processo Renderer per gestire l'evento `ondragstart` e inoltrare le informazioni al processo principale.

Nel processo principale (`principale). s` file), espandere l'evento ricevuto con un percorso al file che è essere trascinato e un'icona:

```javascript fiddle='docs/fiddles/features/drag-and-drop'
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

Dopo aver lanciato l'applicazione Electron, prova a trascinare e rilasciare l'elemento dalla finestra Broswerow sul desktop. In questa guida, l'elemento è un file Markdown situato nella radice del progetto:

![Trascina e rilascia](../images/drag-and-drop.gif)
