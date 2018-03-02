# Fichier natif Drag & Drop

Certains types d'applications manipulant des fichiers peuvent prendre en charge la fonction de glisser-déplacer native du système d'exploitation. Dragging files into web content is common and supported by many websites. Electron additionally supports dragging files and content out from web content into the operating system's world.

To implement this feature in your app, you need to call `webContents.startDrag(item)` API in response to the `ondragstart` event.

In your renderer process, handle the `ondragstart` event and forward the information to your main process.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Ensuite, dans le processus principal, augmentez l'événement avec un chemin d'accès au fichier à déplacer et une icône.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```