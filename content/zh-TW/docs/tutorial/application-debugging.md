# 應用程式 Debug

每當你编寫的 Electron 應用程式没有按照你想要的方式運作時，一系列的除錯器可能可以幫助你發現程式碼的錯誤、效能瓶頸或優化的機會。

## 畫面轉譯處理序

最廣泛被使用來除錯指定渲染進程(renderer process)的工具是 Chromium 的開發者工具。 它適用於所有的渲染過程，包括 `BrowserWindow` 、`BrowserView`、以及 `WebView`的實例。 您可以透過程式設計的方式，呼叫在 `webContents` 中的 `openDevTool()` API 打開它們：

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google 為他們的開發者工具提供了[傑出的文件](https://developer.chrome.com/devtools) 我們建議你熟悉它們，他們對於任何 Electron 的開發者來說通常都是工具包中最強大的工具之一。

## 主處理序

调试主进程有点棘手, 因为您不能简单地打开开发者工具来调试它们。 多亏了谷歌和Node.js的紧密合作，Chromium开发者工具可以[被用来调试Electron的主进程](https://nodejs.org/en/docs/inspector/)，否则你也许会遇到许多怪事就像`require`不能再控制台中显示。

如果想获取更多信息，可以看[调试主进程的文档](./debugging-main-process.md)