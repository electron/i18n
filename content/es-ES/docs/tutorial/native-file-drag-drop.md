# Función nativa arrastrar & soltar archivo

Ciertos tipos de aplicaciones que manipulan archivos podrían querer soportar la función nativa de arrastrar & soltar archivos del sistema operativo. Arrastrar archivos dentro de un web content es común y soportado por muchos sitios web. Electron additionally supports dragging files and content out from web content into the operating system's world.

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

Then, in the main process, augment the event with a path to the file that is being dragged and an icon.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```