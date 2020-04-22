# Nativo Arquivo Drag & Drop (Arrastar e Soltar)

Determinados tipos de aplicativos que manipulam arquivos talvez queiram oferecer suporte a recurso de arrastar e soltar arquivo nativo do sistema operacional. Arrastar de arquivos para um web conteúdo é comum e apoiado por muitos sites. Além disso, Electron adicionou suporte para arrastar arquivos e conteúdos de fora do conteúdo web para o mundo do sistema operacional.

Para implementar esse funções em seu aplicativo, você precisa chamar a API `webContents.startDrag(item)` em resposta ao evento `ondragstart`.

Em seu processo de renderização, manipular o evento `ondragstart` e encaminhe as informações ao seu processo principal.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Em seguida, no processo principal, use o evento com um caminho para o arquivo que está sendo arrastado e um ícone.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```
