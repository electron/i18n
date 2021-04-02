# Drag & Drop de Arquivos Nativo (Arrastar e Soltar)

## Visão Geral

Alguns tipos de aplicativos que manipulam arquivos talvez queiram oferecer suporte ao recurso de drag & drop (arrastar e soltar) nativo do sistema operacional. Arrastar arquivos para a web é bastante comum e utilizado por muitos sites. Além disso, Electron adicionou suporte para arrastar arquivos e conteúdos de fora do conteúdo web para o mundo do sistema operacional.

Para implementar esse recurso no seu aplicativo, você precisa chamar o [`webContents. tartDrag(item)`](../api/web-contents.md#contentsstartdragitem) API em resposta ao evento `ondragstart`.

## Exemplo

Começando com um aplicativo que funciona no [Guia de Início Rápido](quick-start.md), adicione as seguintes linhas ao arquivo `index.html`:

```html
<a href="#" id="drag">Arraste para mim</a>
<script src="renderer.js"></script>
```

e adicionar as seguintes linhas ao arquivo `renderer.js` :

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

Depois de lançar o aplicativo Electron, tente arrastar e soltar o item da Janela de Navegador para o seu desktop. Neste guia, o item é um arquivo de Markdown localizado na raiz do projeto:

![Arraste e solte](../images/drag-and-drop.gif)
