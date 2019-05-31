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

Electron をインストールする手段は他にもあります。 プロキシ、ミラー、カスタムキャッシュの使用方法については、[インストールガイド](installation.md) を参照して下さい。

## 3分でわかるElectronアプリ開発

Electron アプリは Node.js の開発にある原理や方法と同じものを使いながら JavaScript で開発されています。 Electron 内のすべてのAPIと機能は、他の Node.js モジュールと同じように必要に応じて `electron` オブジェクトを通してアクセスできます。

```javascript
const electron = require('electron')
```

`electron` オブジェクトは名前空間内の機能を公開します。 例として、`electron.app` を通じてアプリケーションのライフサイクルを管理したり、`electron.BrowserWindow` クラスを使用してウインドウを作成することができます。 この簡単な `main.js` ファイルは、アプリケーションの準備ができるまで待機してから、ウインドウを開くだけです。

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // ブラウザウインドウを作成
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // そしてこのアプリの index.html をロード
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

`main.js` は、ウインドウを作成し、アプリケーションが遭遇する全てのシステムイベントを処理する必要があります。 上記の例より完全なバージョンでは、ユーザがドック内のアプリアイコンをクリックすると、開発者向けツールが開いたり、ウインドウが閉じられたのを処理したり、macOSにおいてウインドウを再作成したりします。

```javascript
const { app, BrowserWindow } = require('electron')

// ウインドウオブジェクトのグローバル参照を保持してください。さもないと、そのウインドウは
// JavaScript オブジェクトがガベージコレクションを行った時に自動的に閉じられます。
let win

function createWindow () {
  // browser window を生成する
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // そしてこのアプリの index.html をロード
  win.loadFile('index.html')

  // 開発者ツールを開く
  win.webContents.openDevTools()

  // ウィンドウが閉じられた時に発火
  win.on('closed', () => {
    // ウインドウオブジェクトの参照を外す。
    // 通常、マルチウインドウをサポートするときは、
    // 配列にウインドウを格納する。
    // ここは該当する要素を削除するタイミング。
    win = null
  })
}

// このイベントは、Electronが初期化処理と
// browser windowの作成を完了した時に呼び出されます。
// 一部のAPIはこのイベントが発生した後にのみ利用できます。
app.on('ready', createWindow)

// 全てのウィンドウが閉じられた時に終了する
app.on('window-all-closed', () => {
  // macOSでは、ユーザが Cmd + Q で明示的に終了するまで、
  // アプリケーションとそのメニューバーは有効なままにするのが一般的。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // macOSでは、ユーザがドックアイコンをクリックしたとき、
  // そのアプリのウインドウが無かったら再作成するのが一般的。
  if (win === null) {
    createWindow()
  }
})

// このファイル内には、
// 残りのアプリ固有のメインプロセスコードを含めることができます。 
// 別々のファイルに分割してここで require することもできます。
```

最後に、`index.html` が表示させたいウェブページです。

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

## アプリの実行

最初の `main.js`、`index.html`、そして `package.json` ファイルを作成したら、アプリケーションのディレクトリから `npm start` を実行して、あなたのアプリをテストできます。

## このサンプルを試す

このチュートリアルのコードを [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) リポジトリからクローンして、実行してみてください。

**注意**: これを実行するには、[Git](https://git-scm.com) と [npm](https://www.npmjs.com/)が必要です。

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

ボイラープレートのリストと開発プロセスに弾みをつけるツールについては、[ボイラープレートとCLIのドキュメント](./boilerplates-and-clis.md) を参照してください。