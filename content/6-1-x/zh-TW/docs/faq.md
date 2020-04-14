# Electron 常見問題集

## 為什麼我的 Electron 裝不起來?

執行 `npm install electron` 時，有些人會遇到安裝錯誤。

大多數情況下，這些錯誤是來自於網路問題，而不是 `electron` npm 套件本身的問題。 諸如 `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` 及 `ETIMEDOUT` 全都是網路方面的問題。 The best resolution is to try switching networks, or wait a bit and try installing again.

如果用 `npm` 怎樣都裝不起來的話，你也可以直接由 [electron/electron/releases](https://github.com/electron/electron/releases) 下載 Electron。

## Electron 何時會升級用 Chrome 的最新版本？

通常在 Chrome 穩定版本發佈後一至兩周內會升級， 但實際需時取決於升級 Chrome 所涉及的工作量。

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

詳情請參閱[安全簡介](tutorial/security.md)。

## Electron 何時會升級用 Node.js 的最新版本？

通常 Node.js 新版本發佈後，我們會等大概一個月才升級 Electron 用的 Node 版本， 以免受 Node.js 新版本中引入的 bug，這情況經常發生。

通常 Node.js 的新功能是來自於 V8 升版，而 Electron 是使用 Chrome 瀏覽器的 V8，通常新版 Node.js 裡的 JavaScript 新功能，在 Electron 裡早就有了。

## 不同頁面之間怎麼共用資料?

要在不同網頁 (畫面轉譯處理序) 之間共用資料，最簡單的方法就是使用瀏覽器早就提供的 HTML5 API。 [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) 以及 [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) 都是不錯的選擇。

你也可以使用 Electron 特有的 IPC 系統，將物件以全域變數的型式存到主處理序中，再由畫面轉譯器中透過 `electron` 模組的 `remote` 屬性存取:

```javascript
// 在主處理序中.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## My app's window/tray disappeared after a few minutes.

This happens when the variable which is used to store the window/tray gets garbage collected.

如果你遇到這個問題，以下文章應該能幫上忙:

* [記憶體管理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [變數範圍](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

如果你只想馬上修好，可以將變數設成全域的，假設原本是這樣寫:

```javascript
const { app, Tray } = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

請改為:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.on('ready', () => {
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
let win = new BrowserWindow({
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

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```sh
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. 例如 `electron.app` 只能在主處理序中用，而 `electron.webFrame` 只能在畫面轉譯處理序裡用。
