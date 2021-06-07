# 最近文档 (Windows & macOS)

## 概览

Windows 和 macOS 分别通过打开跳转列表和dock菜单使应用程序能够快速的访问最近打开的文档列表。

__JumpList:__

![跳转列表最近的文件][1]

__应用 dock 菜单__

![macOS Dock 菜单][2]

## 示例

### Managing recent documents

```javascript fiddle='docs/fiddles/features/recent-documents'
const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

const fileName = 'recently-used.md'
fs.writeFile(fileName, 'Lorem Ipsum', () => {
  app.addRecentDocument(path.join(__dirname, fileName))
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.clearRecentDocuments()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

#### Adding a recent document

To add a file to recent documents, use the [app.addRecentDocument][addrecentdocument] API.

启动 Electron 应用程序后，右键点击应用程序图标。 In this guide, the item is a Markdown file located in the root of the project. You should see `recently-used.md` added to the list of recent files:

![Recent document](../images/recent-documents.png)

#### Clearing the list of recent documents

To clear the list of recent documents, use the [app.clearRecentDocuments][clearrecentdocuments] API. In this guide, the list of documents is cleared once all windows have been closed.

## 补充资料

### Windows 注意事项

若要在 Windows 上使用此功能，您的应用程序必须注册为这类文件的处理程序。 否则，文件将不会在跳转列表中出现。 You can find everything on registering your application in [Application Registration][app-registration].

当用户点击“跳转列表”上的一个文件时，系统会启动一个新的应用程序的实例 ，而文件的路径将作为一个命令行参数被传入这个实例。

### macOS 注意事项

#### Add the Recent Documents list to the application menu

您可以添加菜单项以访问和清除最近的文档，方法是在菜单模板中添加以下代码片段：

```json
{
  "submenu":[
    {
      "label":"Open Recent",
      "role":"recentdocuments",
      "submenu":[
        {
          "label":"Clear Recent",
          "role":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```

请确保在 [`'ready'`](../api/app.md#event-ready)事件后添加应用菜单而不是之前，否则菜单项将被禁用：

```javascript
const { app, Menu } = require('electron')

const template = [
  // 这里是菜单模版
]
const menu = Menu.buildFromTemplate(template)

app.whenReady().then(() => {
  Menu.setApplicationMenu(menu)
})
```

![macOS 最近文档菜单项][6]

从 "最近文档" 菜单中请求文件时, 将为其发出 ` app ` 模块的 ` open-file ` 事件。

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
