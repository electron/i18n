# Nativo Arquivo Drag & Drop (Arrastar e Soltar)

## Visão Geral

Determinados tipos de aplicativos que manipulam arquivos talvez queiram oferecer suporte a recurso de arrastar e soltar arquivo nativo do sistema operacional. Arrastar de arquivos para um web conteúdo é comum e apoiado por muitos sites. Além disso, Electron adicionou suporte para arrastar arquivos e conteúdos de fora do conteúdo web para o mundo do sistema operacional.

Para implementar esse recurso no seu aplicativo, você precisa chamar o [`webContents. tartDrag(item)`](../api/web-contents.md#contentsstartdragitem) API em resposta ao evento `ondragstart`.

## Exemplo

Começando com um aplicativo que funciona no [Guia de Início Rápido](quick-start.md), adicione as seguintes linhas ao arquivo `index.html`:

```html
<a href="#" id="drag">Arraste para mim</a>
<script src="renderer.js"></script>
```

and add the following lines to the `renderer.js` file:

```javascript
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/absolute/path/to/the/item')
}
```

O código acima instrui o processo de Renderização a lidar com o evento `no instante` e encaminhar a informação para o processo principal.

No processo principal (`principal). s` file), expanda o evento recebido com um caminho para o arquivo que está sendo arrastado e um ícone:

```javascript fiddle='docs/fiddles/features/drag-and-drop'
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

After launching the Electron application, try dragging and dropping the item from the BrowserWindow onto your desktop. Neste guia, o item é um arquivo de Markdown localizado na raiz do projeto:

![Arraste e solte](../images/drag-and-drop.gif)
