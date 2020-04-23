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

## 主進程

調試主進程有點棘手, 因為你無法簡單地打開開發者工具來調試它們。 多虧了 Google 和 Node.js 的緊密合作，Chromium 開發者工具可以[被用來調試 Electron 的主進程](https://nodejs.org/en/docs/inspector/)，否則你也許會遇到許多怪事，就像`require`不能在控制台中顯示。

如果想獲取更多訊息，可以看[調試主進程的文件](./debugging-main-process.md)
