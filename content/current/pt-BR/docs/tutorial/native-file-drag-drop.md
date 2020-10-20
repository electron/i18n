# Nativo Arquivo Drag & Drop (Arrastar e Soltar)

## Visão Geral

Determinados tipos de aplicativos que manipulam arquivos talvez queiram oferecer suporte a recurso de arrastar e soltar arquivo nativo do sistema operacional. Arrastar de arquivos para um web conteúdo é comum e apoiado por muitos sites. Além disso, Electron adicionou suporte para arrastar arquivos e conteúdos de fora do conteúdo web para o mundo do sistema operacional.

To implement this feature in your app, you need to call the [`webContents.startDrag(item)`](../api/web-contents.md#contentsstartdragitem) API in response to the `ondragstart` event.

## Exemplo

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
