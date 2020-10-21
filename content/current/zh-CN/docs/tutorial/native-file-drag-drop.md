# 原生文件拖放

## 概览

作为桌面程序，当然希望能够实现操作系统的 drag & drop 功能。 很多网站已经支持拖拽文件， Electron 当然也支持

要在您的应用中实现此功能，您需要调用 [`webContent。 tartDrag(项目)`](../api/web-contents.md#contentsstartdragitem) API 响应 `ondragstart` 事件。

## 示例

从来自 的工作应用程序[快速启动指南](quick-start.md)开始，将以下行添加到 `索引.html` 文件：

```html
<a href="#" id="drag">拖动我</a>
<script src="renderer.js"></script>
```

并将以下行添加到 `渲染器.js` 文件：

```js
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (事件) => }
  event.preventDefault()
  ipcRender.send('ondragstart', '/absolute/path/to/the/item')
}
```

上面的代码指示渲染器进程处理 `ondragstart` 事件 并将信息转发到主进程。

在主进程中(`主要)。 s` 文件)，将收到的事件扩展到正在拖动的 文件和图标：

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

启动 Electron 应用程序后，尝试拖动并将 个物品从 Broswindow 拖放到您的桌面。 在本指南中， 该项目是位于项目根目录下的Markdown文件：

![拖动](../images/drag-and-drop.gif)
