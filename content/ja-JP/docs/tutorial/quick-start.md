# クイック スタート

Electron enables you to create desktop applications with pure JavaScript by providing a runtime with rich native (operating system) APIs. You could see it as a variant of the Node.js runtime that is focused on desktop applications instead of web servers.

This doesn't mean Electron is a JavaScript binding to graphical user interface (GUI) libraries. Instead, Electron uses web pages as its GUI, so you could also see it as a minimal Chromium browser, controlled by JavaScript.

### メインプロセス

Electronにおいて、`package.json` の `main` で指定されたスクリプトを実行するプロセスを **メインプロセス** (main process) と呼びます。 メインプロセスで実行されるスクリプトは、web ページを生成することで GUI を表示できます。

### レンダラプロセス

Electron は Web ページを表示するために Chromium を使用しているため、 Chromium のマルチプロセス・アーキテクチャも使用されます。 Electronにおける各 Web ページはそれぞれのプロセスとして動作します。これを**レンダラプロセス** (renderer process) と呼びます。

通常のブラウザでは、ウェブページはサンドボックス化された環境で実行され、ネイティブリソースへのアクセスは許可されません。 しかし、Electronを使用している場合は、Node.js APIをウェブページ内で使用して、OSへ作用できる低レベルAPIを使用することが出来ます。

### メインプロセスとレンダラプロセスの違い

The main process creates web pages by creating `BrowserWindow` instances. Each `BrowserWindow` instance runs the web page in its own renderer process. When a `BrowserWindow` instance is destroyed, the corresponding renderer process is also terminated.

The main process manages all web pages and their corresponding renderer processes. Each renderer process is isolated and only cares about the web page running in it.

In web pages, calling native GUI related APIs is not allowed because managing native GUI resources in web pages is very dangerous and it is easy to leak resources. If you want to perform GUI operations in a web page, the renderer process of the web page must communicate with the main process to request that the main process perform those operations.

In Electron, we have several ways to communicate between the main process and renderer processes. Like [`ipcRenderer`](../api/ipc-renderer.md) and [`ipcMain`](../api/ipc-main.md) modules for sending messages, and the [remote](../api/remote.md) module for RPC style communication. There is also an FAQ entry on [how to share data between web pages](../faq.md#how-to-share-data-between-web-pages).

## はじめての Electron アプリ

一般的に、 Electron のアプリケーションは以下のような構成になっています：

```text
your-app/
├── package.json
├── main.js
└── index.html
```

`package.json` の形式はNode.jsのモジュールのものと同一であり、`main` フィールドで指定されたスクリプトが、アプリのメインプロセスを走らせるスタートアップスクリプトになります。 is exactly the same as that of Node's modules, and the script specified by the <0>main</0> field is the startup script of your app, which will run the main process. `package.json` の例を以下に示します。

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Note**: もし `main` フィールドが `package.json` 内に記載されていない場合、 Electron は `index.js` の読み込みを試みます。

The `main.js` should create windows and handle system events, a typical example being:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
function createWindow () {
  // browser window を生成
  win = new BrowserWindow({width: 800, height: 600})

  // アプリの index.html を読み込む
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // DevToolsを開く
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```

Finally the `index.html` is the web page you want to show:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Run your app

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you'll probably want to try running your app locally to test it and make sure it's working as expected.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) is an `npm` module that contains pre-compiled versions of Electron.

If you've installed it globally with `npm`, then you will only need to run the following in your app's source directory:

```bash
electron .
```

If you've installed it locally, then run:

#### macOS / Linux

```bash
$ ./node_modules/.bin/electron .
```

#### Windows

```bash
$ .\node_modules\.bin\electron .
```

### Manually Downloaded Electron Binary

If you downloaded Electron manually, you can also use the included binary to execute your app directly.

#### macOS

```bash
$ ./Electron.app/Contents/MacOS/Electron your-app/
```

#### Linux

```bash
$ ./electron/electron your-app/
```

#### Windows

```bash
$ .\electron\electron.exe your-app\
```

`Electron.app` here is part of the Electron's release package, you can download it from [here](https://github.com/electron/electron/releases).

### Run as a distribution

After you're done writing your app, you can create a distribution by following the [Application Distribution](./application-distribution.md) guide and then executing the packaged app.

### Try this Example

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which includes [npm](https://npmjs.org)) on your system.

```bash
# Clone the repository
$ git clone https://github.com/electron/electron-quick-start
# Go into the repository
$ cd electron-quick-start
# Install dependencies
$ npm install
# Run the app
$ npm start
```

For more example apps, see the [list of boilerplates](https://electron.atom.io/community/#boilerplates) created by the awesome electron community.