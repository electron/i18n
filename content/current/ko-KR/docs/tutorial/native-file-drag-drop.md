# 네이티브 파일 Drag & Drop

## 개요

파일을 조작하는 특정 종류의 애플리케이션은 운영 체제의 native file drag & drop 기능을 지원하기를 몹시 원할것입니다. 웹 컨텐츠에 파일을 드래그하는 것은 일반적이며 많은 웹 사이트에서 지원됩니다. Electron은 웹 콘텐츠에서 운영 체제의 세계로 파일 및 콘텐츠를 드래그하는 기능을 추가적으로 지원합니다.

To implement this feature in your app, you need to call the [`webContents.startDrag(item)`](../api/web-contents.md#contentsstartdragitem) API in response to the `ondragstart` event.

## Example

Starting with a working application from the [Quick Start Guide](quick-start.md), add the following lines to the `index.html` file:

```html
<a href="#" id="drag">Drag me</a>
<script src="renderer.js"></script>
```

and add the following lines to the `renderer.js` file:

```javascript
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/absolute/path/to/the/item')
}
```

The code above instructs the Renderer process to handle the `ondragstart` event and forward the information to the Main process.

In the Main process(`main.js` file), expand the received event with a path to the file that is being dragged and an icon:

```javascript fiddle='docs/fiddles/features/drag-and-drop'
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

After launching the Electron application, try dragging and dropping the item from the BroswerWindow onto your desktop. In this guide, the item is a Markdown file located in the root of the project:

![Drag and drop](../images/drag-and-drop.gif)
