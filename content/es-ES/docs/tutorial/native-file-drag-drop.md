# Función nativa arrastrar & soltar archivo

## Descripción general

Ciertos tipos de aplicaciones que manipulan archivos podrían querer soportar la función nativa de arrastrar & soltar archivos del sistema operativo. Arrastrar archivos dentro de un web content es común y soportado por muchos sitios web. Adicionalmente Electron soporta arrastre de archivos fuera del web content dentro del mundo del sistema.

Para implementar esta característica en tu aplicación, necesitas llamar a [`webContents. tartDrag(item)`](../api/web-contents.md#contentsstartdragitem) API en respuesta al evento `ondragstart`.

## Ejemplo

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

Después de lanzar la aplicación Electron, intente arrastrar y soltar el elemento desde el BrowserWindow a su escritorio. In this guide, the item is a Markdown file located in the root of the project:

![Drag and drop](../images/drag-and-drop.gif)

[`contextBridge`]: ../api/context-bridge.md
