# Función nativa arrastrar & soltar archivo

## Descripción general

Ciertos tipos de aplicaciones que manipulan archivos podrían querer soportar la función nativa de arrastrar & soltar archivos del sistema operativo. Arrastrar archivos dentro de un web content es común y soportado por muchos sitios web. Adicionalmente Electron soporta arrastre de archivos fuera del web content dentro del mundo del sistema.

Para implementar esta característica en tu aplicación, necesitas llamar a [`webContents. tartDrag(item)`](../api/web-contents.md#contentsstartdragitem) API en respuesta al evento `ondragstart`.

## Ejemplo

Comenzando con una aplicación funcional de la [Guía de inicio rápido](quick-start.md), agregue las siguientes líneas al archivo `index.html`:

```html
<a href="#" id="drag">Arrastra me</a>
<script src="renderer.js"></script>
```

y añadir las siguientes líneas al archivo `renderer.js`:

```javascript
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/absolute/path/to/the/item')
}
```

El código anterior indica al proceso de Renderer que maneje el evento `ondragstart` y reenvíe la información al proceso Principal.

En el proceso principal(`main. s` archivo), expande el evento recibido con una ruta al archivo que está siendo arrastrado y un icono:

```javascript fiddle='docs/fiddles/features/drag-and-drop'
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

After launching the Electron application, try dragging and dropping the item from the BrowserWindow onto your desktop. En esta guía, el elemento es un archivo Markdown ubicado en la raíz del proyecto:

![Arrastre y suelte](../images/drag-and-drop.gif)
