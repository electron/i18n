# 原生文件拖放

## 概览

作为桌面程序，当然希望能够实现操作系统的 drag & drop 功能。 很多网站已经支持拖拽文件， Electron 当然也支持

要在您的应用中实现此功能，您需要调用 [`webContent.startDrag(item)`](../api/web-contents.md#contentsstartdragitem) API 响应 `ondragstart` 事件。

## 示例

An example demonstrating how you can create a file on the fly to be dragged out of the window.

### Preload.js

In `preload.js` use the [`contextBridge`][] to inject a method `window.electron.startDrag(...)` that will send an IPC message to the main process.

```js
const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')

contextBridge.exposeInMainWorld('electron', {
  startDrag: (fileName) => {
    ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName))
  }
})
```

### Index.html

Add a draggable element to `index.html`, and reference your renderer script:

```html
<div style="border:2px solid black;border-radius:3px;padding:5px;display:inline-block" draggable="true" id="drag">Drag me</div>
<script src="renderer.js"></script>
```

### Renderer.js

In `renderer.js` set up the renderer process to handle drag events by calling the method you added via the [`contextBridge`][] above.

```javascript
document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  window.electron.startDrag('drag-and-drop.md')
}
```

### Main.js

In the Main process (`main.js` file), expand the received event with a path to the file that is being dragged and an icon:

```javascript fiddle='docs/fiddles/features/drag-and-drop'
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

启动 Electron 应用程序后，尝试将该项从 BrowserWindow 拖放到桌面上。 在本指南中，本项是位于项目根目录下的 Markdown 文件：

![Drag and drop](../images/drag-and-drop.gif)

[`contextBridge`]: ../api/context-bridge.md
