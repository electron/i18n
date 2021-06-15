# macOS BrowserWindows 的代表文件

## 概览

在 macOS 上，您可以为应用程序中的任何窗口设置一个代表文件。 代表文件的图标将显示在标题栏中，当用户 `Command-单击` 或 `Control-单击`，一个带有文件路径的弹出窗口将会显示。

![展示文件（Represented File）][1]

> 注意：上面的屏幕截图是一个示例，其中此功能用于指示 Atom 文本编辑器中当前打开的文件。

您还可以设置窗口的编辑状态，以便文件图标可以指示该窗口中的文档是否已修改。

要设置窗口的代表文件，您可以使用 [BrowserWindow.setRepresentedFilename][setrepresentedfilename] 和 [BrowserWindow.setDocumentEdited][setdocumentedited] API。

## 示例

```javascript fiddle='docs/fiddles/features/represented-file'
const { app, BrowserWindow } = require('electron')
const os = require('os');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
}

app.whenReady().then(() => {
  const win = new BrowserWindow()

  win.setRepresentedFilename(os.homedir())
  win.setDocumentEdited(true)
})

app.on('window-all-closed', () => {
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

启动 Electron 应用程序后，在按下 `Command` 或 `Control` 键时单击标题。 You should see a popup with the represented file at the top. In this guide, this is the current user's home directory:

![Represented file](../images/represented-file.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
