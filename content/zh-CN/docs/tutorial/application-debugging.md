# 调试应用

无论何时，你的Electron应用程序没有按照你想的方式运行，一组调试工具也许可以帮助你找到代码的错误，性能瓶颈，或者优化的机会。

## 渲染进程

最广泛使用来调试指定渲染进程的工具是Chromium的开发者工具集。 它可以获取到所有的渲染进程，包括`BrowserWindow`的实例，`BrowserView`以及`WebView`。 你可以通过编程的方式在BrowserWindow的`webContents`中调用`openDevTool()`API来打开它们：

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

谷歌为他们的开发者工具提供了[杰出的文档](https://developer.chrome.com/devtools) 我们建议您让自己熟悉它们，它们对于任何Electron开发者通常都是工具包中最强大的工具之一。

## 主进程

Debugging the main process is a bit trickier, since you cannot simply open developer tools for them. The Chromium Developer Tools can [be used to debug Electron's main process](https://nodejs.org/en/docs/inspector/) thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation](./debugging-main-process.md).