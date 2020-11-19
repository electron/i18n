# クイックスタートガイド

## クイックスタート

Electron は、JavaScript、HTML、CSS でデスクトップアプリケーションを作成できるフレームワークです。 これらのアプリケーションは、macOS、Windows、Linux 上で直接実行したり、Mac App Store や Microsoft Store 経由で配布したりできます。

一般的には、各オペレーティングシステム (OS) 固有のネイティブアプリケーションフレームワークを使用して、オペレーティングシステム向けのデスクトップアプリケーションを作成します。 Electron では、既知の技術で一度書くだけでアプリケーションを作成できます。

### 必要な環境

Electron を進める前に、 [Node.js][node-download] をインストールする必要があります。 最新の `LTS` または `Current` バージョンのどちらかをインストールすることを推奨します。

> お使いのプラットフォーム向けのビルド済みインストーラを使用して、Node.js をインストールするようにしてください。 さもなくば、他の開発ツールと互換性の問題が発生することがあります。

Node.js が正しくインストールされていることを確認するには、次のコマンドをターミナルクライアントに入力します。

```sh
node -v
npm -v
```

このコマンドで、Node.js と npm のバージョンが表示されている必要があります。 両方のコマンドが成功していれば、Electron をインストールする準備は完了です。

### 基本的なアプリケーションを作成

開発に関しては、Electron は基本的に Node.js アプリケーションです。 つまり、Electron アプリケーションの出発点は、他の Node.js アプリケーションと同様に `package.json` ファイルになります。 Electron アプリケーションの最小構成は、以下のようになります。

```plain
my-electron-app/
├── package.json
├── main.js
Documentation
```

上記の構造に基づいて基本的なアプリケーションを作成しましょう。

#### Install Electron

プロジェクト用のフォルダを作成し、そこに Electron をインストールします。

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### メインスクリプトファイルを作成

メインスクリプトに、メインプロセスで実行する Electron アプリケーションのエントリポイント (この場合は `main.js` ファイル) を指定します。 一般的に、メインプロセスで実行されるスクリプトは、アプリケーションのライフサイクル制御、グラフィカルユーザーインターフェースとその要素の表示、ネイティブオペレーティングシステムとのやり取りの実行、ウェブページ内へのレンダラープロセス作成を行います。 Electron アプリケーションは、メインプロセスを 1 つだけ保持できます。

メインスクリプトは以下のようになります。

```js
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

##### 上記は何を行っているのですか?

1. 1 行目: まず、`electron` パッケージの `app` と `BrowserWindow` モジュールをインポートして、アプリケーションのライフサイクルイベントを管理したり、ブラウザーウインドウを作成して制御したりできるようにします。
2. 3 行目: その後、Node インテグレーションを有効にした [新しいブラウザーウインドウ](../api/browser-window.md#new-browserwindowoptions) を作成し、`index.html` ファイルをこのウインドウに読み込み (12行目、このファイルについては後述)、デベロッパー ツールを開く (13行目) という関数を定義します。
3. 16 行目: Electron アプリケーション `` が初期化されたときに [createWindow](../api/app.md#appwhenready) 関数を呼び出し、新しいブラウザーウインドウを作成します。
4. 18 行目: 開いたウインドウが無い場合にアプリケーションを終了しようとするリスナーを新規追加します。 このリスナーはオペレーティングシステムの [ウインドウ管理動作](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac) であり、macOS 上では動作しません。
5. 24 行目: アプリケーションがアクティブにされた後で表示するウインドウがない場合にのみ新しいブラウザーウインドウを作成する、というリスナーを追加します。 例えば、アプリケーションを初めて起動した後や、既に起動しているアプリケーションを再びアクティブした場合などがこれにあたります。

#### ウェブページの作成

ここでは、アプリケーションの初期時に表示したいウェブページを作成します。 このウェブページはレンダラープロセスを表します。 複数のブラウザーウインドウを作成でき、各ウィンドウはそれぞれ個別のレンダラーを使用します。 必要に応じて、 `nodeIntegration` の設定から Node.js API へのフルアクセス権限を付与できます。

`index.html` ページは以下のようになります。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
</body>
</html>
```

#### package.json ファイルの変更

Electron アプリケーションでは、(他の Node.js アプリケーションと同様に) メインエントリポイントとして `package.json` ファイルを使用します。 アプリケーションのメインスクリプトは `main.js` なので、 `package.json` ファイルをそれに応じて以下のように変更します。

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js"
}
```

> 注意: `main` フィールドを省略した場合、Electron は `package.json` を含むディレクトリにある `index.js` ファイルをロードしようとします。

デフォルトでは、 `npm start` コマンドは Node.js でメインスクリプトを実行します。 Electron でスクリプトを実行するには、以下のように変更する必要があります。

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    }
}
```

#### アプリケーションの実行

```sh
npm start
```

実行中の Electron アプリは以下のようになるでしょう。

![最もシンプルな Electron アプリ](../images/simplest-electron-app.png)

### アプリケーションのパッケージと配布

新しく作成したアプリを配布する最もシンプルで最速の方法は、 [Electron Forge](https://www.electronforge.io) を使用することです。

1. Electron Forge をアプリケーションフォルダにインポートします。

    ```sh
    npx @electron-forge/cli import

    ✔ Checking your system
    ✔ Initializing Git Repository
    ✔ Writing modified package.json file
    ✔ Installing dependencies
    ✔ Writing modified package.json file
    ✔ Fixing .gitignore

    We have ATTEMPTED to convert your app to be in a format that electron-forge understands.

    Thanks for using "electron-forge"!!!
    ```

1. 頒布形式を作成します。

    ```sh
    npm run make

    > my-gsod-electron-app@1.0.0 make /my-electron-app
    > electron-forge make

    ✔ Checking your system
    ✔ Resolving Forge Config
    We need to package your application before we can make it
    ✔ Preparing to Package Application for arch: x64
    ✔ Preparing native dependencies
    ✔ Packaging Application
    Making for the following targets: zip
    ✔ Making for target: zip - On platform: darwin - For arch: x64
    ```

    electron-forge は、パッケージが置かれる `out` フォルダを作成します。

    ```plain
    // MacOS の例
    out/
    ├── out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    ├── ...
    └── out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

## 基本を学ぶ

このセクションでは、Electron がどのように動作するかの基本について説明します。 クイックスタートの章で先に作成した Electron とアプリケーションに関する知識を強化するのが目的です。

### アプリケーションアーキテクチャ

Electron は、3 つの柱で構成されています。

* ウェブコンテンツを表示する **Chromium**。
* ローカルファイルシステムとオペレーティングシステムを扱う **Node.js**。
* しばしば必要な OS ネイティブの関数を扱う **カスタム API**。

Electron を使ってアプリケーションを開発することは、ウェブインターフェースを使って Node.js アプリを構築したり、シームレスな Node.js インテグレーションでウェブページを構築したりするようなものです。

#### メインプロセスとレンダラープロセス

前述したように、Electron にはメインとレンダラーという 2 種類のプロセスがあります。

* メインプロセスは、`BrowserWindow` インスタンスを **作成** することでウェブページを作成します。 各 `BrowserWindow` インスタンスはレンダラープロセスで Web ページを実行します。 `BrowserWindow` インスタンスが破棄されると、対応するレンダラープロセスも終了します。
* メインプロセスはすべてのウェブページとそれに対応するレンダラープロセスを **管理** します。

----

* レンダラープロセスは対応するウェブページのみを **管理** します。 レンダラープロセス 1 つがクラッシュしても、他のレンダラープロセスには影響しません。
* レンダラープロセスは IPC 経由でメインプロセスと **通信**し、ウェブページ内の GUI 操作を実行します。 レンダラープロセスから直接ネイティブ GUI 関連の API を呼び出すことは、セキュリティ上の懸念やリソース漏洩の可能性のために制限されています。

----

プロセス間通信は、[`ipcMain`](../api/ipc-main.md) と [`ipcRenderer`](../api/ipc-renderer.md) の IPC (Inter-Process Communication) モジュールを介して行うことができます。

#### API

##### Electron API

Electron API はプロセスの種類に基づいて割り当てられます。つまり、メインプロセスとレンダラープロセスのどちらかでのみ使用できるモジュールもあれば、両方からでも使用できるモジュールもあります。 Electron の API ドキュメントには、各モジュールを使用できるプロセスが示されています。

例えば、両方のプロセスにおいて Electron API にアクセスする際は、同梱のモジュールを require します。

```js
const electron = require('electron')
```

ウィンドウを作成するには、メインプロセスでのみ使用可能な `BrowserWindow` クラスを呼び出します。

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

レンダラープロセスからメインプロセスを呼び出すには、IPC モジュールを使用します。

```js
// In the Main process
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... do actions on behalf of the Renderer
})
```

```js
// レンダラープロセス
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> 注意: レンダラープロセスは信頼されていない (特にサードパーティからの) コードを実行する可能性があるため、メインプロセスに送られるリクエストは慎重に検証することが重要です。

##### Node.js API

> 注意: レンダラープロセスから Node.js API にアクセスするには、`nodeIntegration` の設定を `true` にする必要があります。

Electron は Node.js API とそのモジュールへのフルアクセスをメインおよびレンダラープロセスの両方で公開します。 たとえば、ルートディレクトリからすべてのファイルを読み込むことができます。

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

Node.js のモジュールを使用するには、まず依存関係としてそれをインストールする必要があります。

```sh
npm install --save aws-sdk
```

そして、Electron アプリケーションでそのモジュールを require します。

```js
const S3 = require('aws-sdk/clients/s3')
```

[node-download]: https://nodejs.org/en/download/
