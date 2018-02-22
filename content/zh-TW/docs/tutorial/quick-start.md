# 快速入門

Electron 讓你可以使用原生的 JavaScript 便能呼叫豐富的原生 (作業系統) APIs 來建立桌面應用程式。 你可以將它視為另一個著重於桌面應用程式的 Node.js ，而非網站伺服器。

這並不表示 Electron 是綁定在圖形使用者介面 (GUI) 上的 JavaScript 函式庫。 相反地，Electron 使用網頁作為他的 GUI, 因此你可以把它視為被 JavaScript 所控制的一個精簡版的 Chromium 瀏覽器。

### 主程序

在 Electron 中，透過 `package.json` 中的 `main` 指令執行的程序稱作**主程序**。 在主程序中執行的程式碼可以透過建立網頁來顯示 GUI。

### 渲染器程序

由於 Electron 使用 Chromium 來顯示網頁，因此 Chromium 的多程序架構也可以被使用。 Electron 中每個網頁都執行在各自的程序中，稱作**渲染器程序**。

在一般的瀏覽器中，網頁通常是在沙箱環境中執行，不能存取本機資源。 然後，Electron 的使用者，能在網頁中使用 Node.js API，與作業系統進行較低階的互動。

### 主程序與渲染器程序的差別

主程序透過 `BrowserWindow` 實例來建立網頁。 每一個 `BrowserWindow` 實例都會在自己的渲染器程序中運行網頁。 當一個 `BrowserWindow` 實例被銷毀後，相應的渲染器程序也會被終止。

主程序會管理每一個網頁和其相應的渲染器程序；而每一個渲染器程序都是獨立的，它只關注自己運行的網頁。

由於在網頁中管理原生的 GUI 資源很危險且容易導致資源洩漏，所以在網頁中不被允許使用原生 GUI 相關的 APIs。 如果你想在網頁中對 GUI 進行操作，其對應的渲染器程序必須和主程序溝通，請求主程序進行相關的 GUI 操作。

在 Electron 中，有許多方式可以讓主程序和渲染器程序間通訊。 像 [`ipcRenderer`](../api/ipc-renderer.md) 和 [`ipcMain`](../api/ipc-main.md) 的模組可用於發送訊息，而 [remote](../api/remote.md) 模組則可以用於 RPC 方式通訊。 這些內容都可以在 FAQ 中的[如何在兩個頁面間共享資料](../faq.md#how-to-share-data-between-web-pages)查看。

## 寫你第一個 Electron 應用程式

通常來說，一個 Electron app 的結構會像這樣：

```text
your-app/
├── package.json
├── main.js
└── index.html
```

`package.json` 的格式和 Node 的完全一致，而裡面 `main` 所定義的指令就是用來啟動 app 的，它會運行主程序。 你應用程式中的 `package.json` 應該看起來像這樣：

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**注意**：如果沒有在 `package.json` 定義 `main` ，那麼 Electron 會優先載入 `index.js`。

`main.js` 應該用於創建窗口和處理系統事件，一個典型的例子如下：

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// 將這個 window 物件記在全域變數裡。
// 如果沒這麼做，這個視窗在 JavaScript 物件被垃圾回收時（GC）後就會被自動關閉。
let win

function createWindow () {
  // 建立瀏覽器視窗。
  win = new BrowserWindow({width: 800, height: 600})

  // 並載入應用程式的 index.html。
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // 打開 DevTools。
  win.webContents.openDevTools()

  // 視窗關閉時會觸發。
  win.on('closed', () => {
    // 拿掉 window 物件的參照。如果你的應用程式支援多個視窗，
    // 你可能會將它們存成陣列，現在該是時候清除相關的物件了。
    win = null
  })
}


// 當 Electron 完成初始化，並且準備好建立瀏覽器視窗時
// 會呼叫這的方法
// 有些 API 只能在這個事件發生後才能用。
app.on('ready', createWindow)

// 在所有視窗都關閉時結束程式。
app.on('window-all-closed', () => {
  // 在 macOS 中，一般會讓應用程式及選單列繼續留著，
  // 除非使用者按了 Cmd + Q 確定終止它們
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在 macOS 中，一般會在使用者按了 Dock 圖示
  // 且沒有其他視窗開啟的情況下，
  // 重新在應用程式裡建立視窗。
  if (win === null) {
    createWindow()
  }
})

// 你可以在這個檔案中繼續寫應用程式主程序要執行的程式碼。 
// 你也可以將它們放在別的檔案裡，再由這裡 require 進來。
```

最後，`index.html` 裡放你想顯示的網頁內容:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    我們用了 node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    以及 Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## 執行你的應用程式

一旦你建立好了最初的 `main.js`、` index.html` 和 `package. json` 這些檔案後, 您可能會想嘗試在本機運行應用程式以測試它並確保它按照預期方式工作。

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) 是一個 `npm` 套件，它包含了 Electron 預編譯版本。

如果你已經將 `npm` 安裝在全域環境，你只需要在應用程式目錄下，按照下述方式執行：

```sh
electron .
```

如果你是安裝在局部區域，那運行：

#### macOS / Linux

```sh
$ ./node_modules/.bin/electron .
```

#### Windows

```sh
$ .\node_modules\.bin\electron .
```

#### Node 8.2.0 或其後的版本

```sh
$ npx electron .
```

### 手動下載 Electron 二進位檔案

如果你手動下載了 Electron 的二進位檔案，你可以直接使用其中的二進位檔案來執行應用程式。

#### macOS

```sh
$ ./Electron.app/Contents/MacOS/Electron your-app/
```

#### Linux

```sh
$ ./electron/electron your-app/
```

#### Windows

```sh
$ .\electron\electron.exe your-app\
```

你可以在[這裡](https://github.com/electron/electron/releases)下載到部分 Electron 所發佈的 `Electron.app` 。

### 以發佈檔執行

在完成了你的應用程式後，你可以透過下面的[應用發佈](./application-distribution.md)說明來建立一個打包好的檔案，並執行佈署好的檔案。

### 試試這個範例

複製並且透過 [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) 來執行範例中的這個資料夾。

**注意**：執行範例時，需要在你的系統先安裝好 [Git](https://git-scm.com) 和 [Node.js](https://nodejs.org/en/download/) (包含 [npm](https://npmjs.org))。

```sh
# 複製儲存庫
$ git clone https://github.com/electron/electron-quick-start
# 進到儲存庫裡
$ cd electron-quick-start
# 安裝相依的套件
$ npm install
# 執行應用程式
$ npm start
```

你還可以從 Electron 社群建立的[模板清單](https://electronjs.org/community#boilerplates)中找到更多範例應用程式。