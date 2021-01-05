# 原生文件拖放

## 概览

作为桌面程序，当然希望能够实现操作系统的 drag & drop 功能。 很多网站已经支持拖拽文件， Electron 当然也支持

要在您的应用中实现此功能，您需要调用 [`webContent.startDrag(item)`](../api/web-contents.md#contentsstartdragitem) API 响应 `ondragstart` 事件。

## 示例

从 [Quick Start Guide](quick-start.md) 示例的应用程序开始，将以下行添加到 `index.html` 文件：

```html
<a href="#" id="drag">拖动我</a>
<script src="renderer.js"></script>
```

并将以下内容添加到 `renderer.js` 文件：

```js
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (事件) => }
  event.preventDefault()
  ipcRender.send('ondragstart', '/absolute/path/to/the/item')
}
```

上面的代码指示渲染进程处理 `ondragstart` 事件并将信息转发到主进程。

在主进程中(`main.js` 文件)，将收到的事件扩展到正在拖动的文件和图标：

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

启动 Electron 应用程序后，尝试将该项从 BroswerWindow 拖放到桌面上。 在本指南中，本项是位于项目根目录下的 Markdown 文件：

![拖动](../images/drag-and-drop.gif)
