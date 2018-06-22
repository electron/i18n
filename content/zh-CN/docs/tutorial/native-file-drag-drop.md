# 原生文件拖放

作为桌面程序，当然希望能够实现操作系统的 drag & drop 功能。 很多网站已经支持拖拽文件 Electron 当然也支持

要在 app 中实现此功能 ，你需要在 Render 进程中调用`webContents.startDrag(item)` API， 此API会给 Main 进程发送一个`ondragstart`事件。

在 Render 进程中, 接收 ` ondragstart ` 事件并发送消息到 Main 进程。

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

然后, 在主进程中，接收拖拽过来的文件路径和在拖拽过程中要显示的图标。

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```