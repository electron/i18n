# 撰寫你的第一個 Electron 應用程式

Electron 讓你可以使用 JavaScript 呼叫豐富的原生 (作業系統) APIs 來建立桌面應用程式。 你可以將它視為一個著重於桌面應用程式的 Node.js ，而非網站伺服器。

這並不表示 Electron 是綁定在圖形使用者介面 (GUI) 上的 JavaScript 函式庫。 相反地，Electron 使用網頁作為他的 GUI, 因此你可以把它視為被 JavaScript 所控制的一個精簡版的 Chromium 瀏覽器。

**注意**：這個範例同時是一個 repo，你可以立即[下載並執行](#trying-this-example)。

就開發而言，Electron 應用程式本質上就是 Node.js 應用程式 起始點為 `package.json`，就和 Node.js 中的 Module 相同。 最基本的 Electron 應用將具有以下資料夾結構：

```plaintext
your-app/
├── package.json
├── main.js
└── index.html
```

為你的 Electron App 建一個新的資料夾。 打開終端機，然後從該資料夾執行 `npm init ` 。

```sh
npm init
```

npm 將會引導你建立基本的 `package.json` 檔。 程式中的 `main` 就是你的 app 的起始點，也就是主程式執行的地方。 你的 `package.json` 看起來可能會像這樣：

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

__Note__: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js` (as Node.js does). 如果這是一個簡單的 Node 應用程式，則可以加入一個 `start` 指令碼，指示 `node` 執行目前套件：

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

將 Node 應用程式轉換至 Electron 應用程式是非常簡單的 - 只需要將 `node` 執行環境取代為 `electron` 執行環境則可。

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## 安裝 Electron

重頭戲來了，安裝 `electron`！ 推薦的安裝方法是將其在你的專案中安裝為 development dependency，此舉可讓你開發多個 app 的同時使用多個不同的 Electron 版本。 要這麼做，在你的專案資料夾執行下列指令：

```sh
npm install --save-dev electron
```

有其他安裝 Electron 的方法。 請參閱[安裝](installation.md)部份以了解有關代理、鏡像及自訂快取。

## 使用 Nutshell 開發 Electron

Electron 是基於 JavaScript 開發的，使用了 Node.js 開發的相同原理及方式。 所有 Electron 的 API 及功能都可以通過 `electron` 模組來使用，就像其他 Node.js 模組需要的：

```javascript
const electron = require('electron')
```

The `electron` module exposes features in namespaces. As examples, the lifecycle of the application is managed through `electron.app`, windows can be created using the `electron.BrowserWindow` class. A simple `main.js` file might wait for the application to be ready and open a window:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // 建立瀏覽器視窗...
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // ...並載入程式包含的 index.html。
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

```javascript
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // 建立瀏覽器視窗。
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // 開啟 DevTools。
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
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## 執行你的應用程式

當你建立好基本的 `main.js`、`index.html` 和 `package.json` 後，你可以在專案資料夾執行 `npm start` 將 app 跑起來。

## 試試這個範例

你可以在 [`electron/electron-quick-start`][quick-start] 儲存庫中 Clone 並執行此頁所示範例

**Note**: Running this requires [Git](https://git-scm.com) and [npm](https://www.npmjs.com/).

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

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation][boilerplates].

[quick-start]: https://github.com/electron/electron-quick-start
[boilerplates]: ./boilerplates-and-clis.md
