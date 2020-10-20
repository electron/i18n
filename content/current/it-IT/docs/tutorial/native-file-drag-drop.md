# Trascina & Rilascia File Nativo

## Overview

Alcuni tipi di app che manipolano file potrebbero voler supportare la funzione trascina & rilascia del file nativo del sistema operativo. Rilasciare file nel contenuto web è comune e supportato da molti siti web. Electron supporta inoltre il rilascio di file e contenuti fuori dal contenuto web nel mondo del sistema operativo.

To implement this feature in your app, you need to call the [`webContents.startDrag(item)`](../api/web-contents.md#contentsstartdragitem) API in response to the `ondragstart` event.

## Esempio

Starting with a working application from the [Quick Start Guide](quick-start.md), add the following lines to the `index.html` file:

```html
<a href="#" id="drag">Drag me</a>
<script src="renderer.js"></script>
```

and add the following lines to the `renderer.js` file:

```js
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/absolute/path/to/the/item')
}
```

The code above instructs the Renderer process to handle the `ondragstart` event and forward the information to the Main process.

In the Main process(`main.js` file), expand the received event with a path to the file that is being dragged and an icon:

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

After launching the Electron application, try dragging and dropping the item from the BroswerWindow onto your desktop. In this guide, the item is a Markdown file located in the root of the project:

![Drag and drop](../images/drag-and-drop.gif)
