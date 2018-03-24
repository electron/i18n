# Nativo Arquivo Drag & Drop

Certain kinds of applications that manipulate files might want to support the operating system's native file drag & drop feature. Arrastar de arquivos para um web conteúdo é comum e apoiado por muitos sites. Além disso, Electron adicionou suporte para arrastar arquivos e conteúdos de fora do conteúdo web para o mundo do sistema operacional.

Para implementar esse funções em seu aplicativo, você precisa chamar a API `webContents.startDrag(item)` em resposta ao evento `ondragstart`.

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