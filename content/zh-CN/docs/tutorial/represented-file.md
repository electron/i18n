# 针对 macOS系统 BrowserWindows的展示文件

## 概览

在 macOS 上，您可以为应用程序中的任何窗口设置一个代表文件。 所示文件的图标将显示在标题栏中，当用户 `Command-Click` 或 `Control-Click`时，将 显示带有文件路径的弹出窗口。

![展示文件（Represented File）][1]

> 注：上面的屏幕截图是使用此功能表示 Atom 文本编辑器中当前打开的文件的示例。

您还可以为窗口设置经过编辑的状态，以便文件图标可以 指示此窗口中的文档是否已修改。

要设置所表示的窗口文件，您可以使用 [浏览器窗口.集代表菲莱娜][setrepresentedfilename] 和 [浏览器窗口][setdocumentedited] 。

## 示例

从起 [Quick Start Guide](quick-start.md) 示例的应用程序开始，将以下行添加到 `main.js` 文件：

```javascript fiddle='docs/fiddles/features/represented-file'
康斯特 { app, BrowserWindow } =需要（'电子'）

应用程序。当准备好（然后）=> {
  缺点赢=新的浏览器窗口（）

  赢

  。
```

启动 Electron 应用程序后，单击标题时按下 `Command` 或 `Control` 键。 您应该会看到一个弹出窗口，其中有您刚刚定义的文件：

![表示文件](../images/represented-file.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
