# Función nativa arrastrar & soltar archivo

Ciertos tipos de aplicaciones que manipulan archivos podrían querer soportar la función nativa de arrastrar & soltar archivos del sistema operativo. Arrastrar archivos dentro de un web content es común y soportado por muchos sitios web. Adicionalmente Electron soporta arrastre de archivos fuera del web content dentro del mundo del sistema.

Para implementar esta característica en tu aplicación usted necesita llamar a la API `webContents.startDrag(item)` en respuesta al evento `ondragstart`.

En tu renderer process, maneja el evento `ondragstart` y reenvíe la información a tu main process.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Luego, en el proceso principal, aumente el evento con una ruta al archivo que se está arrastrando y un icono.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```
