# Native Datei Drag & Drop

## Übersicht

Bestimmte Arten von Anwendungen, die Dateien manipulieren, könnten die native Datei-Drag & Drop Funktion des Betriebssystems unterstützen. Das Ziehen von Dateien in Webinhalte ist üblich und wird von vielen Webseiten unterstützt. Electron unterstützt zusätzlich das Ziehen von Dateien und Inhalten aus Webinhalten in die Welt des Betriebssystems .

Um diese Funktion in Ihrer App zu implementieren, müssen Sie den [`Webcontent aufrufen. tartDrag(item)`](../api/web-contents.md#contentsstartdragitem) API als Antwort auf das `ondragstart` Ereignis.

## Beispiel

An example demonstrating how you can create a file on the fly to be dragged out of the window.

### Preload.js

In `preload.js` use the [`contextBridge`][] to inject a method `window.electron.startDrag(...)` that will send an IPC message to the main process.

```js
const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')

contextBridge.exposeInMainWorld('electron', {
  startDrag: (fileName) => {
    ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName))
  }
})
```

### Index.html

Add a draggable element to `index.html`, and reference your renderer script:

```html
<div style="border:2px solid black;border-radius:3px;padding:5px;display:inline-block" draggable="true" id="drag">Drag me</div>
<script src="renderer.js"></script>
```

### Renderer.js

In `renderer.js` set up the renderer process to handle drag events by calling the method you added via the [`contextBridge`][] above.

```javascript
document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  window.electron.startDrag('drag-and-drop.md')
}
```

### Main.js

In the Main process (`main.js` file), expand the received event with a path to the file that is being dragged and an icon:

```javascript fiddle='docs/fiddles/features/drag-and-drop'
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

After launching the Electron application, try dragging and dropping the item from the BrowserWindow onto your desktop. In this guide, the item is a Markdown file located in the root of the project:

![Drag and drop](../images/drag-and-drop.gif)

[`contextBridge`]: ../api/context-bridge.md
