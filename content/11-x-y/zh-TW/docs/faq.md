# Electron 常見問題集

## 為什麼我的 Electron 裝不起來?

執行 `npm install electron` 時，有些人會遇到安裝錯誤。

大多數情況下，這些錯誤是來自於網路問題，而不是 `electron` npm 套件本身的問題。 諸如 `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` 及 `ETIMEDOUT` 全都是網路方面的問題。 turkısh

如果用 `npm` 怎樣都裝不起來的話，你也可以直接由 [electron/electron/releases](https://github.com/electron/electron/releases) 下載 Electron。

## Electron 何時會升級用 Chrome 的最新版本？

通常在 Chrome 穩定版本發佈後一至兩周內會升級， 但實際需時取決於升級 Chrome 所涉及的工作量。

只使用 Chrome 的穩定版本。 如果其中一個重要的修復仍處於測試或開發階段，我們則將其修復作向後移植。

詳情請參閱[安全簡介](tutorial/security.md)。

## Electron 何時會升級用 Node.js 的最新版本？

通常 Node.js 新版本發佈後，我們會等大概一個月才升級 Electron 用的 Node 版本， 以免受 Node.js 新版本中引入的 bug，這情況經常發生。

通常 Node.js 的新功能是來自於 V8 升版，而 Electron 是使用 Chrome 瀏覽器的 V8，通常新版 Node.js 裡的 JavaScript 新功能，在 Electron 裡早就有了。

## 不同頁面之間怎麼共用資料?

要在不同網頁 (畫面轉譯處理序) 之間共用資料，最簡單的方法就是使用瀏覽器早就提供的 HTML5 API。 方式包括 [Storage API][storage] 、 [`localStorage`][local-storage] 、 [`sessionStorage`][session-storage] ，以及 [IndexedDB][indexed-db]。

或者你可以使用由 Electron 提供的跨處理序通訊 (IPC) 基元。 若要在主處理序及畫面轉譯處理序之間共用資料，可以使用 [`ipcMain`](api/ipc-main.md) 及 [`ipcRenderer`](api/ipc-renderer.md) 模組。 To communicate directly between web pages, you can send a [`MessagePort`][message-port] from one to the other, possibly via the main process using [`ipcRenderer.postMessage()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). Subsequent communication over message ports is direct and does not detour through the main process.

## 我應用程式的視窗或工作列圖示幾分鐘後消失了。

當儲存工作列圖示的變數被垃圾回收後就會這樣。

如果你遇到這個問題，以下文章應該能幫上忙:

* [記憶體管理][memory-management]
* [變數範圍][variable-scope]

如果你只想馬上修好，可以將變數設成全域的，假設原本是這樣寫:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

請改為:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## 我不能在 Electron 裡用 jQuery/RequireJS/Meteor/AnguarJS。

因為 Electron 與 Node.js 整合的需求，DOM 會被填入一些額外的符號，例如 `module`, `exports`, `require`。 這樣子可能會導致某些程式庫有問題，因為它們也想把自已的符號塞到相同的名稱裡。

要解決這個問題，可以停用 Electron 的 Node 整合功能:

```javascript
// 在主處理序中.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

如果你想同時保有 Node.js 跟 Electron API 的功能，就要在載入其他程式庫之前先將那些符號改名:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` is undefined.

使用 Electron 內建模組時，你可能會遇到這樣的錯誤:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

很可能你在使用模組的過程出錯了。 例如 `electron.app` 只能在主處理序中用，而 `electron.webFrame` 只能在畫面轉譯處理序裡用。

## 字體看起來模糊不清。這是為甚麼？我又能做甚麼？

若關掉[字體平滑](http://alienryderflex.com/sub_pixel/)功能，LCD螢幕上的字體則可能會看起來模糊不清。 範例:

![subpixel rendering example][]

Sub-pixel anti-aliasing needs a non-transparent background of the layer containing the font glyphs. (See [this issue](https://github.com/electron/electron/issues/6344#issuecomment-420371918) for more info).

To achieve this goal, set the background in the constructor for [BrowserWindow][browser-window]:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Even if you don't see a difference, some of your users may. It is best to always set the background this way, unless you have reasons not to do so.

Notice that just setting the background in the CSS does not have the desired effect.

[memory-management]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
[variable-scope]: https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[session-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[indexed-db]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[message-port]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[browser-window]: api/browser-window.md
[subpixel rendering example]: images/subpixel-rendering-screenshot.gif
