# 撰寫你的第一個 Electron 應用程式

Electron 讓你可以使用 JavaScript 呼叫豐富的原生 (作業系統) APIs 來建立桌面應用程式。 你可以將它視為一個著重於桌面應用程式的 Node.js ，而非網站伺服器。

這並不表示 Electron 是綁定在圖形使用者介面 (GUI) 上的 JavaScript 函式庫。 相反地，Electron 使用網頁作為他的 GUI, 因此你可以把它視為被 JavaScript 所控制的一個精簡版的 Chromium 瀏覽器。

**注意**：這個範例同時是一個 repo，你可以立即[下載並執行](#trying-this-example)。

就開發而言，Electron 應用程式本質上就是 Node.js 應用程式。 在開始的時候，會見到與 Node.js 模組相同，名為 `package.json` 的檔案。 最基本的 Electron 應用程式將具有以下資料夾結構：

```plaintext
your-app/
├── package.json
├── main.js
└── index.html
```

請為你的 Electron 應用程式建立一個新的資料夾。 然後打開命令列用戶端，從該資料夾執行 `npm init `。

```sh
npm init
```

npm 將會引導你建立基本 `package.json` 檔案。 程式中的 `main` 就是你的程式的啟動指令碼，也就是執行主處理序的地方。 你的 `package.json` 看起來可能會像這樣：

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

__Note__: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js` (as Node.js does).

By default, `npm start` would run the main script with Node.js. in order to make it run with Electron, you can add a `start` script:

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

在這個時候，你需要安裝 `electron`。 較推薦的安裝方式是將其在你的應用程式專案中以開發相依套件安裝，此舉可讓你使用多個不同的 Electron 版本來開發多個應用程式。 若要這樣做，請在你的應用程式專案資料夾中執行下列指令：

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

app.whenReady().then(createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

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

  // 開啟 DevTools。
  win.webContents.openDevTools()
}

// 當 Electron 完成初始化，並且準備好建立瀏覽器視窗時
// 會呼叫這的方法
// 有些 API 只能在這個事件發生後才能用。
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
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

當你建立好基本的 `main.js`、`index.html` 和 `package.json` 後，你可以在專案資料夾執行 `npm start` 指令以執行應用程式。

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
