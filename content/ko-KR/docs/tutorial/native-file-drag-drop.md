# Native File Drag & Drop

파일을 조작하는 특정 종류의 애플리케이션은 운영 체제의 native file drag & drop 기능을 지원하기를 몹시 원할것입니다. 웹 컨텐츠에 파일을 드래그하는 것은 일반적이며 많은 웹 사이트에서 지원됩니다. Electron은 웹 콘텐츠에서 운영 체제의 세계로 파일 및 콘텐츠를 드래그하는 기능을 추가적으로 지원합니다.

앱에서이 기능을 구현하려면 `ondragstart` 이벤트에 대한 응답으로 `webContents.startDrag(item)` API를 호출해야합니다.

Renderer process에서 `ondragstart`이벤트를 처리하고 정보를 main process로 전달하십시오.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

그런 다음, main process에서 drag 되고 있는 파일의 경로와 아이콘으로 이벤트를 추가하십시오.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```