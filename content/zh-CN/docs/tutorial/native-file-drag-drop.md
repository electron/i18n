# 原生文件拖放

## 概览

作为桌面程序，当然希望能够实现操作系统的 drag & drop 功能。 很多网站已经支持拖拽文件， Electron 当然也支持

要在您的应用中实现此功能，您需要调用 [`webContent.startDrag(item)`](../api/web-contents.md#contentsstartdragitem) API 响应 `ondragstart` 事件。

## 示例

一个演示如何动态创建要从窗口中拖出的文件的示例。

### Preload.js

在 `preload.js` 中使用 [`contextBridge`][] 注入方法 `window.electron.startDrag(...)` 将向主进程发送IPC消息。

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

添加一个可拖动元素到 `index.html`, 并引用你的渲染器脚本：

```html
<div style="border:2px solid black;border-radius:3px;padding:5px;display:inline-block" draggable="true" id="drag">拖动我</div>
<script src="renderer.js"></script>
```

### Renderer.js

在 `renderer.js` 通过调用通过上述 [`contextBridge`][] 添加的方法来设置渲染器进程处理拖动事件。

```javascript
document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  window.electron.startDrag('drag-and-drop.md')
}
```

### Main.js

在主进程中(`main.js` 文件)，将收到的事件带上文件路径和图标扩展到正在拖动的文件：

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

![拖放](../images/drag-and-drop.gif)

[`contextBridge`]: ../api/context-bridge.md
