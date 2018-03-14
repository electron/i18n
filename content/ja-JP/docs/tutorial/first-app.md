# はじめての Electron アプリ

Electronは、豊富なネイティブ (オペレーティング・システム) APIを備えたランタイムを提供することで、純粋なJavaScriptでデスクトップ・アプリケーションを開発できるようにします。 Webサーバではなく、デスクトップ・アプリケーションに焦点を当てたNode.jsランタイムがElectronであると捉えても構いません。

これは、Electronはグラフィカルユーザーインターフェース (GUI) ライブラリへのJavaScriptバインディングである、という意味ではありません。 その代わりにGUIとしてWebページを使うので、ElectronはJavaScriptで操作できる、最小限のChromiumブラウザである、と捉えることもできます。

**注意**: このサンプルはリポジトリとして利用できます。 [すぐにダウンロードして実行できます](#trying-this-example)。

開発に関しては、Electron は基本的に Node.js アプリケーションです。 開始点は Node.js モジュールと同じ `package.json` です。 最も基本的な Electron アプリは以下のフォルダ階層になるでしょう。

```text
your-app/
├── package.json
├── main.js
└── index.html
```

新規のElectronアプリ用に空のフォルダを新規作成します。 コマンドラインクライアントを起動し、いま作ったフォルダで`npm init`を実行します。

```sh
npm init
```

npm が基本的な `package.json` ファイルを作るガイドをします。 `main` フィールドで指定されたスクリプトは、メインプロセスを実行するアプリのスタートアップスクリプトです。 `package.json` の例を以下に示します。

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

**注釈**: もし `main` フィールドが `package.json` 内に記載されていない場合、 Electron は (Node.js のように) `index.js` の読み込みを試みます。 もしこれがただのNodeアプリケーションならば、現在のパッケージを実行するように `node` に指示する `start` スクリプトを追加します。

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

このNodeアプリケーションをElectronアプリケーションにするのは非常に簡単で、単に `node` ランタイムを `electron` ランタイムに置き換えるだけです。

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

## Electronのインストール

この時点では、`electron` そのものをインストールする必要があります。 そうするのに推奨される方法は、アプリケーションに開発用の依存関係としてインストールすることです。異なる Electron のバージョンで複数アプリの作業ができます。 これを行うには、アプリのディレクトリから次のコマンドを実行します。

```sh
npm install --save-dev electron
```

Other means for installing Electron exist. Please consult the [installation guide](installation.md) to learn about use with proxies, mirrors, and custom caches.

## Electron Development in a Nutshell

Electron apps are developed in JavaScript using the same principals and methods found in Node.js development. All APIs and features found in Electron are accessible through the `electron` module, which can be required like any other Node.js module:

```javascript
const electron = require('electron')
```

The `electron` module exposes features in namespaces. As examples, the lifecycle of the application is managed through `electron.app`, windows can be created using the `electron.BrowserWindow` class. A simple `main.js` file might just wait for the application to be ready and open a window:

```javascript
const {app, BrowserWindow} = require('electron')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // アプリの index.html を読み込む
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

app.on('ready', createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// window オブジェクトはグローバル参照しなければなりません。
// これがない場合、JavaScriptのオブジェクトがガベージコレクトされた時に、
// ウィンドウが自動的に閉じてしまうでしょう。
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

// このイベントは、Electronが初期化処理と
// browser windowの作成を完了した時に呼び出されます。
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

最後に、表示させたいページを `index.html` に作成します：

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

## Running Your App

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you can try your app by running `npm start` from your application's directory.

## Trying this Example

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**注意**: これを実行するには[Git](https://git-scm.com)が必要です。

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

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation](./boilerplates-and-clis.md).