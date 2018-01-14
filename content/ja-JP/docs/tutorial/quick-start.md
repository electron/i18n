# クイック スタート

Electronは、豊富なネイティブ (オペレーティング・システム) APIを備えたランタイムを提供することで、純粋なJavaScriptでデスクトップ・アプリケーションを開発できるようにします。 Webサーバではなく、デスクトップ・アプリケーションに焦点を当てたNode.jsランタイムがElectronであると捉えても構いません。

これは、Electronはグラフィカルユーザーインターフェース (GUI) ライブラリへのJavaScriptバインディングである、という意味ではありません。 その代わりにGUIとしてWebページを使うので、ElectronはJavaScriptで操作できる、最小限のChromiumブラウザである、と捉えることもできます。

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
let win

function createWindow () {
  // browser window を生成する
  win = new BrowserWindow({width: 800, height: 600})

  // アプリの index.html を読み込む
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // DevToolsを開く
  win.webContents.openDevTools()

  // ウィンドウが閉じられた時に発火
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 一部のAPIはこのイベントが発生した後にのみ利用できます。
app.on('ready', createWindow)

// 全てのウィンドウが閉じられた時に終了する
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
    Node.js <script>document.write(process.versions.node)</script> および
    Chrome <script>document.write(process.versions.chrome)</script>、
    Electron <script>document.write(process.versions.electron)</script>を使用しています。
  </body>
</html>
```

## アプリを実行する

`main.js`, `index.html`, `package.json` を作成したなら、はじめての Electron アプリがお手元の環境で正常に動作するか確かめましょう。

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) はコンパイル済みの Electron を含む `npm` モジュールです。

もし `npm` を用いて electron をグローバルインストールしている場合、ソースディレクトリで以下のコマンドを入力するだけでアプリを実行できます。

```sh
electron .
```

ローカルインストールしている場合はOSによって異なりますが、以下のコマンドを入力します。

#### macOS / Linux

```sh
$ ./node_modules/.bin/electron .
```

#### Windows

```sh
$ .\node_modules\.bin\electron .
```

#### Node v8.2.0 以降

```sh
$ npx electron .
```

### 手動でダウンロードした Electron バイナリ

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

`Electron.app` はElectronのリリースパッケージの一部です。 [ここ](https://github.com/electron/electron/releases) からダウンロードできます。

### 配布用パッケージとして実行

After you're done writing your app, you can create a distribution by following the [Application Distribution](./application-distribution.md) guide and then executing the packaged app.

### こちらのサンプルをお試しください

このチュートリアルのコードを [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) リポジトリからクローンして、実行してみてください。

**Note**: 以下の手順でサンプルを実行する場合、[Git](https://git-scm.com) と [Node.js](https://nodejs.org/en/download/) （[npm](https://npmjs.org) を含む）をシステムにインストールしておく必要があります。

```sh
# リポジトリをクローン
$ git clone https://github.com/electron/electron-quick-start
# リポジトリに移動
$ cd electron-quick-start
# 依存ライブラリをインストール
$ npm install
# アプリを実行
$ npm start
```

さらにサンプルコードを入手したい場合、Electron 開発者たちの素晴らしいコミュニティによって作成された[ボイラープレートのリスト](https://electronjs.org/community#boilerplates)を御覧ください。