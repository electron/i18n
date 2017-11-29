# Electron 常見問題集

## 為什麼我的 Electron 裝不起來?

執行 `npm install electron` 時，有些人會遇到安裝錯誤。

大多數情況下，這些錯誤是來自於網路問題，而不是 `electron` npm 套件本身的問題。 諸如 `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` 及 `ETIMEDOUT` 全都是網路方面的問題。 最好的處理方式就是切換網路看看，或是晚點再重裝一次。

如果用 `npm` 怎樣都裝不起來的話，你也可以直接由 [electron/electron/releases](https://github.com/electron/electron/releases) 下載 Electron。

## Electron 什麼時候會升級到最新的 Chrome?

通常在新 Chrome 穩定版發佈後一到兩週內，Electron 會更新 Chrome 的版本。 但這個時間只是概估值，沒有人可以給你掛保證，全看升級時需花多少工來決定。

我們只會用穩定版的 Chrome。如果測試版或開發版中有重大的修正，我們會移植回來。

詳情請參閱[安全性簡介](tutorial/security.md)。

## Electron 什麼時候會升級到最新的 Node.js?

通常 Node.js 新版本發佈後，我們會等大概一個月才升級 Electron 用的 Node 版本。 如此一來我們可以避開新版 Node.js 帶來的 bug，這種事很常發生。

通常 Node.js 的新功能是來自於 V8 升版，而 Electron 是使用 Chrome 瀏覽器的 V8，通常新版 Node.js 裡的 JavaScript 新功能，在 Electron 裡早就有了。

## 不同頁面之間怎麼共用資料?

要在不同網頁 (畫面轉譯處理序) 之間共用資料，最簡單的方法就是使用瀏覽器早就提供的 HTML5 API。 [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) 以及 [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) 都是不錯的選擇。

你也可以使用 Electron 特有的 IPC 系統，將物件以全域變數的型式存到主處理序中，再由畫面轉譯器中透過 `electron` 模組的 `remote` 屬性存取:

```javascript
// 在主處理序裡。
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// 第 1 頁裡。
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// 第 2 頁裡。
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## 我應用程式的視窗或工作列圖示幾分鐘後消失了。

當儲存視窗或工作列圖示的變數就垃圾回收後就會這樣。

如果你遇到這個問題，以下文章應該能幫上忙:

* [記憶體管理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [變數範圍](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

如果你只想馬上修好，可以將變數設成全域的，假設原本是這樣寫:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

請改為:

```javascript
const {app, Tray} = require('electron')
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
// 在主處理序裡。
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

But if you want to keep the abilities of using Node.js and Electron APIs, you have to rename the symbols in the page before including other libraries:

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

When using Electron's built-in module you might encounter an error like this:

    > require('electron').webFrame.setZoomFactor(1.0)
    Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
    

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

    "/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
    

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```bash
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.