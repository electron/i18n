# macOS BrowserWindows 的代表文件

## 概览

在 macOS 上，您可以为应用程序中的任何窗口设置一个代表文件。 代表文件的图标将显示在标题栏中，当用户 `Command-单击` 或 `Control-单击`，一个带有文件路径的弹出窗口将会显示。

![展示文件（Represented File）][1]

> 注意：上面的屏幕截图是一个示例，其中此功能用于指示 Atom 文本编辑器中当前打开的文件。

您还可以设置窗口的编辑状态，以便文件图标可以指示该窗口中的文档是否已修改。

要设置窗口的代表文件，您可以使用 [BrowserWindow.setRepresentedFilename][setrepresentedfilename] 和 [BrowserWindow.setDocumentEdited][setdocumentedited] API。

## 示例

从起 [Quick Start Guide](quick-start.md) 示例的应用程序开始，将以下行添加到 `main.js` 文件：

```javascript fiddle='docs/fiddles/features/represented-file'
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow()

  win.setRepresentedFilename('/etc/passwd')
  win.setDocumentEdited(true)
})
```

启动 Electron 应用程序后，在按下 `Command` 或 `Control` 键时单击标题。 您应该能看到您刚定义的文件的弹出窗口：

![Represented file](../images/represented-file.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
