# Native File Drag & Drop

파일을 조작하는 특정 종류의 애플리케이션은 운영 체제의 native file drag & drop 기능을 지원하기를 몹시 원할것입니다. 웹 컨텐츠에 파일을 드래그하는 것은 일반적이며 많은 웹 사이트에서 지원됩니다. Electron additionally supports dragging files and content out from web content into the operating system's world.

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