# はじめての Electron アプリ

Electron は、豊富なネイティブ (オペレーティングシステム) APIを備えたランタイムを提供することで、ピュア JavaScript でデスクトップアプリケーションを開発できるようにします。 ウェブサーバではなくデスクトップアプリケーションに焦点を当てた Node.js ランタイムが、Electron であると捉えても構いません。

これは、Electron はグラフィカルユーザーインターフェース (GUI) ライブラリへの JavaScript バインディングである、という意味ではありません。 代わりにその GUI としてウェブページを使うので、Electron は JavaScript で操作できる小型 Chromium ブラウザである、とすることもできます。

**注**: このサンプルは [すぐにダウンロードして実行](#trying-this-example) できるリポジトリとしても利用できます。

開発に関しては、Electron は基本的に Node.js アプリケーションです。 開始点は Node.js モジュールと同じ `package.json` です。 最も基本的な Electron アプリは以下のフォルダ階層になるでしょう。

```plaintext
your-app/
├── package.json
├── main.js
└── index.html
```

新しい Electron アプリケーションのために空のフォルダを新規作成します。 コマンドラインクライアントを起動し、いま作ったフォルダで`npm init`を実行します。

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

__注釈__: もし `main` フィールドが `package.json` 内に記載されていない場合、 Electron は (Node.js のように) `index.js` の読み込みを試みます。 もしこれがただのNodeアプリケーションならば、現在のパッケージを実行するように `node` に指示する `start` スクリプトを追加します。

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

## Electron のインストール

この時点では、`electron` そのものをインストールする必要があります。 推奨されるインストール方法は、開発用の依存関係としてアプリにインストールすることです。これによって、異なるバージョンの Electron での複数アプリの作業ができます。 これを行うには、アプリのディレクトリから次のコマンドを実行します。

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

app.whenReady().then(createWindow)
```

`main.js` は、ウインドウを作成し、アプリケーションが遭遇する全てのシステムイベントを処理する必要があります。 上記の例より完全なバージョンでは、ユーザがドック内のアプリアイコンをクリックすると、開発者向けツールが開いたり、ウインドウが閉じられたのを処理したり、macOSにおいてウインドウを再作成したりします。

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // ブラウザウインドウを作成
  const win = new BrowserWindow({
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
}

// このメソッドは、Electron が初期化処理と
// browser window の作成準備が完了した時に呼び出されます。
// 一部のAPIはこのイベントが発生した後にのみ利用できます。
app.whenReady().then(createWindow)

// 全てのウィンドウが閉じられた時に終了します。
app.on('window-all-closed', () => {
  // macOSでは、ユーザが Cmd + Q で明示的に終了するまで、
  // アプリケーションとそのメニューバーは有効なままにするのが一般的です。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // macOSでは、ユーザがドックアイコンをクリックしたとき、
  // そのアプリのウインドウが無かったら再作成するのが一般的です。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// このファイル内には、
// 残りのアプリ固有のメインプロセスコードを含めることができます。 
// 別々のファイルに分割してここで require することもできます。
```

最後に、表示させたいページを `index.html` に作成します：

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

## アプリの実行

最初の `main.js`、`index.html`、そして `package.json` ファイルを作成したら、アプリケーションのディレクトリから `npm start` を実行して、あなたのアプリをテストできます。

## このサンプルを試す

このチュートリアルのコードを [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) リポジトリからクローンして、実行してみてください。

**注意**: この実行には [Git](https://git-scm.com) と [npm](https://www.npmjs.com/) が必要です。

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
