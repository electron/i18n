# 调试应用

无论何时，您的Electron应用程序没有按照您设想的方式运行，一组调试工具也许可以帮助您找到代码的错误，性能瓶颈，或者优化的机会。

## 渲染进程

最广泛使用来调试指定渲染进程的工具是Chromium的开发者工具集。 它可以获取到所有的渲染进程，包括`BrowserWindow`的实例，`BrowserView`以及`WebView`。 您可以通过编程的方式在BrowserWindow的`webContents`中调用`openDevTool()`API来打开它们：

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

谷歌为他们的开发者工具提供了[杰出的文档](https://developer.chrome.com/devtools) 我们建议您熟悉它们，它们对于任何Electron开发者来说通常都是工具包中最强大的工具之一。

## 主进程

Debugging the main process is a bit trickier, since you cannot open developer tools for them. 多亏了谷歌和Node.js的紧密合作，Chromium开发者工具可以[被用来调试Electron的主进程](https://nodejs.org/en/docs/inspector/)，否则你也许会遇到许多怪事就像`require`不能再控制台中显示。

如果想获取更多信息，可以看[调试主进程的文档](./debugging-main-process.md)