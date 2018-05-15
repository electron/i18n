# 應用程式 Debug

Whenever your Electron application is not behaving the way you wanted it to, an array of debugging tools might help you find coding errors, performance bottlenecks, or optimization opportunities.

## 畫面轉譯處理序

The most comprehensive tool to debug individual renderer processes is the Chromium Developer Toolset. It is available for all renderer processes, including instances of `BrowserWindow`, `BrowserView`, and `WebView`. You can open them programmatically by calling the `openDevTools()` API on the `webContents` of the instance:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google offers [excellent documentation for their developer tools](https://developer.chrome.com/devtools). We recommend that you make yourself familiar with them - they are usually one of the most powerful utilities in any Electron Developer's tool belt.

## 主處理序

Debugging the main process is a bit trickier, since you cannot open developer tools for them. The Chromium Developer Tools can [be used to debug Electron's main process](https://nodejs.org/en/docs/inspector/) thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation](./debugging-main-process.md).