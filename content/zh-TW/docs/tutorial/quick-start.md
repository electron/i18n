# 快速入門

Electron 讓你可以使用原生的 JavaScript 便能呼叫豐富的原生 (作業系統) APIs 來建立桌面應用程式。 你可以將它視為另一個著重於桌面應用程式的 Node.js ，而非網站伺服器。

這並不表示 Electron 是綁定在圖形使用者介面 (GUI) 上的 JavaScript 函式庫。 相反地，Electron 使用網頁作為他的 GUI, 因此你可以把它視為被 JavaScript 所控制的一個精簡版的 Chromium 瀏覽器。

### 主程序

在 Electron 中，透過 `package.json` 中的 `main` 指令執行的程序稱作**主處理程序**。 在主處理序中執行的程式碼會透過建立 web 頁面來作為顯示的 GUI。

### 渲染器程序

由於 Electron 使用 Chromium 來顯示 web 頁面，因此 Chromium 的多程序架構也可以被使用。 Electron 中每個 web 頁面各自的程序，稱作**渲染程序**。

在一般的瀏覽器中，網頁通常是在沙箱環境中執行，不能存取本機資源。 然後，Electron 的使用者，能在網頁中使用 Node.js API，與作業系統進行較低階的互動。

### 主程序與渲染器程序的差別

主程序透過 `BrowserWindow` 實例來建立 web 頁面。 每一個 `BrowserWindow` 實例都會在自己的渲染器程序中運行 web 頁面。 當一個 `BrowserWindow` 實例被銷毀後，相應的渲染器程序也會被終止。

主程序會管理每一個 web 頁面和其相應的渲染器程序；而每一個渲染器程序都是獨立的，它只關注自己運行的 web 頁面。

由於在 web 頁面中管理原生的 GUI 資源很危險且容易導致資源洩漏，所以在 web 頁面中不被允許使用原生 GUI 相關的 APIs。 If you want to perform GUI operations in a web page, the renderer process of the web page must communicate with the main process to request that the main process perform those operations.

In Electron, we have several ways to communicate between the main process and renderer processes. Like [`ipcRenderer`](../api/ipc-renderer.md) and [`ipcMain`](../api/ipc-main.md) modules for sending messages, and the [remote](../api/remote.md) module for RPC style communication. There is also an FAQ entry on [how to share data between web pages](../faq.md#how-to-share-data-between-web-pages).

## 寫你第一個 Electron 應用程式

Generally, an Electron app is structured like this:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

The format of `package.json` is exactly the same as that of Node's modules, and the script specified by the `main` field is the startup script of your app, which will run the main process. An example of your `package.json` might look like this:

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Note**: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js`.

The `main.js` should create windows and handle system events, a typical example being:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// 將這個 window 物件記在全域變數裡。
// 如果你不這麼做，這個視窗在 JavaScript 物件被 GC 後就會被自動關閉。
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
    // 你可能會想存成陣列，現在該是時候清除相關的物件了。
    win = null
  })
}

// 這個方法在 Electron 初始化完成，準備好建立瀏覽器視窗時會被叫用。
// 有些 API 只能在這個事件發生後才能用。
app.on('ready', createWindow)

// 在所有視窗都關閉時結束程式。
app.on('window-all-closed', () => {
  // 在 macOS 裡，普遍的作法是將應用程式及選單列繼續留著，直到使用者按了 Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在 macOS 裡，一般會在使用者按了 Dock 圖示且沒有其他視窗開啟的情況下，
  // 重新在應用程式裡建立視窗。
  if (win === null) {
    createWindow()
  }
})

// 你可以在這個檔案中繼續寫應用程式主處理序要執行的程式碼。 你也可以將它們放在別的檔案裡，再由這裡 require 進來。
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

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you'll probably want to try running your app locally to test it and make sure it's working as expected.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) is an `npm` module that contains pre-compiled versions of Electron.

If you've installed it globally with `npm`, then you will only need to run the following in your app's source directory:

```sh
electron .
```

If you've installed it locally, then run:

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

### 手動下載 Electron 二進位

If you downloaded Electron manually, you can also use the included binary to execute your app directly.

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

`Electron.app` here is part of the Electron's release package, you can download it from [here](https://github.com/electron/electron/releases).

### 以發佈檔執行

After you're done writing your app, you can create a distribution by following the [Application Distribution](./application-distribution.md) guide and then executing the packaged app.

### 試試這個範例

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which includes [npm](https://npmjs.org)) on your system.

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

For more example apps, see the [list of boilerplates](https://electronjs.org/community#boilerplates) created by the awesome electron community.