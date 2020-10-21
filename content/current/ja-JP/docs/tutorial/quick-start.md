# クイックスタートガイド

## クイックスタート

Electron は、JavaScript、HTML、CSS でデスクトップアプリケーションを作成できるフレームワークです。 これらのアプリケーションは、macOS、Windows、Linux上で直接実行したり、Mac App StoreまたはMicrosoft Store経由で配布したりすることができます。

通常、各オペレーティングシステム固有のネイティブアプリケーションフレームワークを使用して、オペレーティングシステム(OS)用のデスクトップアプリケーションを作成します。 Electron は、既に知っているテクノロジーを使用してアプリケーションを一度書くことを可能にします。

### 必要な環境

Electron に進む前に、 [Node.js](https://nodejs.org/en/download/) をインストールする必要があります。 最新の `LTS` または `現在の` バージョンのいずれかをインストールすることをお勧めします。

> お使いのプラットフォーム用にビルド済みのインストーラを使用して Node.js をインストールしてください。 それ以外の場合、異なる開発ツールとの互換性の問題が発生することがあります。

Node.js が正しくインストールされていることを確認するには、次のコマンドをターミナルクライアントに入力します。

```sh
node -v
npm -v
```

コマンドは、Node.js と npm のバージョンを表示する必要があります。 両方のコマンドが成功すると、Electron をインストールする準備ができます。

### 基本的なアプリケーションを作成

開発の観点からは、Electron アプリケーションは基本的に Node.js アプリケーションです。 つまり、Electron アプリケーションの出発点は、他の Node.js アプリケーションと同様に `package.json` ファイルになります。 Electron の最小限のアプリケーションには、次のような構造があります。

```plain
my-electron-app/
├── package.json
├── main.js
Documentation
```

上記の構造に基づいて基本的なアプリケーションを作成しましょう。

#### Install Electron

プロジェクト用のフォルダを作成し、そこに Electron をインストールします:

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### メインスクリプトファイルを作成

メインスクリプトは、メインプロセスを実行する Electron アプリケーションのエントリ ポイントを指定します (私たちの場合は `main.js` ファイル)。 通常、Main プロセスで実行されるスクリプトは、アプリケーションのライフサイクルを制御し、グラフィカルユーザーインターフェイスとその要素を表示します。 ネイティブのオペレーティングシステムの相互作用を実行し、Web ページ内で Renderer プロセスを作成します。 Electron アプリケーションには、メインプロセスが 1 つしかありません。

メインスクリプトは以下のようになります:

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

##### 何が上に起こっていますか?

1. Line 1: First, you import the `app` and `BrowserWindow` modules of the `electron` package to be able to manage your application's lifecycle events, as well as create and control browser windows.
2. Line 3: After that, you define a function that creates a [new browser window](../api/browser-window.md#new-browserwindowoptions) with node integration enabled, loads `index.html` file into this window (line 12, we will discuss the file later) and opens Developer Tools (line 13).
3. 16行目: Electron アプリケーション `` が初期化されると、 [createWindow](../api/app.md#appwhenready) 関数を呼び出すことで、新しいブラウザウィンドウを作成します。
4. 18行目: ウィンドウが開いていない場合にアプリケーションを終了しようとする新しいリスナーを追加します。 このリスナーは、オペレーティングシステムの [ウィンドウ管理の動作](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac) による、macOS には無制限です。
5. 24行目: アプリケーションがアクティブ化された後に表示されるウィンドウがない場合にのみ、新しいブラウザウィンドウを作成する新しいリスナーを追加します。 たとえば、アプリケーションを初めて起動した後、または実行中のアプリケーションを再起動します。

#### Web ページを作成

これは、アプリケーションが初期化されたら表示したいWebページです。 このウェブページはレンダラープロセスを表します。 複数のブラウザウィンドウを作成することができ、各ウィンドウは独自のレンダラーを使用します。 必要に応じて、 `nodeIntegration` 環境設定から Node.js API へのフルアクセス権を付与することができます。

`index.html` ページは以下のようになります。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
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

#### package.json ファイルの変更

Electron アプリケーションでは、(他のNode.js アプリケーションと同様に) メインエントリポイントとして `package.json` ファイルを使用します。 アプリケーションのメインスクリプトは `main.js`なので、 `package.json` ファイルをそれに応じて変更してください:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js"
}
```

> NOTE: If the `main` field is omitted, Electron will attempt to load an `index.js` file from the directory containing `package.json`.

デフォルトでは、 `npm start` コマンドは Node.js でメインスクリプトを実行します。 Electron でスクリプトを実行するには、以下のように変更する必要があります。

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js",
    "scripts": {
        "start": "electron."
    }
}
```

#### アプリケーションの実行

```sh
npm start
```

実行中の Electron アプリは次のようになります:

![最もシンプルな Electron アプリ](../images/simplest-electron-app.png)

### アプリケーションのパッケージと配布

新しく作成したアプリを配布する最もシンプルで最速の方法は、 [Electron Forge](https://www.electronforge.io) を使用することです。

1. Electron Forge をアプリケーションフォルダにインポート:

    ```sh
    npx @electron-forge/cli import

    ✔ Checking your system
    ✔ Initializing Git Repository
    ✔ Writing modified package.json file
    ✔ Installing dependencies
    ✔ Writing modified package.json file
    ✔ Fixing .gitignore

    We have ATTEMPTED to convert your app to be in a format that electron-forge understands.

    "electron-forge"をご利用いただきありがとうございます!!!
    ```

1. 配布可能ファイルを作成:

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

    Electron フォージは、パッケージが見つかる `out` フォルダを作成します。

    ```plain
    // MacOS の例
    out/
    ├── out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    ├── ...
    ├── out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

## 基本を学ぶ

このセクションでは、Electron がどのように動作するかの基本について説明します。 これは、Quickstart セクションで先に作成された Electron とアプリケーションに関する知識を強化することを目的としています。

### アプリケーションのアーキテクチャ

Electron は、3 つの柱で構成されています。

* **Webコンテンツを表示するためのChromium**。
* **ローカルファイルシステムとオペレーティングシステムを扱うNode.js**。
* **頻繁に必要な OS ネイティブ関数を扱うためのカスタム API**。

Electron とアプリケーションを開発することは、Web インターフェイスを使用した Node.js アプリの構築や、シームレスな Node.js 統合による Web ページの構築と同じです。

#### メインプロセスとレンダラープロセス

前述したように、Electron には、Main と Renderer という 2 種類のプロセスがあります。

* メインプロセス **は、** BrowserWindow `インスタンスを作成することで` ウェブページを作成します。 各 `BrowserWindow` インスタンスはレンダラープロセスで Web ページを実行します。 `BrowserWindow` インスタンスが破壊されると、対応する Renderer プロセスも終了します。
* メイン プロセス **は** すべての Web ページとそれに対応する Renderer プロセスを管理します。

----

* レンダラープロセス **は** 対応するウェブページのみを管理します。 1つのレンダラープロセスでクラッシュした場合、他のレンダラープロセスには影響しません。
* Renderer プロセス **は** と IPC 経由で Main プロセスと通信し、Web ページで GUI 操作を実行します。 レンダラープロセスからネイティブ GUI 関連の API を直接呼び出すことは、セキュリティ上の懸念と潜在的なリソースの漏洩が原因で制限されます。

----

プロセス間の通信は、プロセス間通信 (IPC) モジュールを介して可能です: [`ipcMain`](../api/ipc-main.md) と [`ipcRenderer`](../api/ipc-renderer.md).

#### API

##### Electron API

Electron API は、プロセスタイプに基づいて割り当てられます。 つまり、いくつかのモジュールは、MainプロセスまたはRendererプロセスのいずれかと、両方から使用することができます。 Electron の API ドキュメントには、各モジュールを使用できるプロセスが示されています。

たとえば、両方のプロセスで Electron API にアクセスするには、その含まれているモジュールが必要です:

```js
const electron = require('electron')
```

ウィンドウを作成するには、メインプロセスでのみ使用可能な `BrowserWindow` クラスを呼び出します。

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

レンダラーからメインプロセスを呼び出すには、IPCモジュールを使用します。

```js
// メインプロセス
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... レンダラーに代わってアクションを行う
})
```

```js
// レンダラープロセス
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> 注意: レンダラープロセスは信頼できないコード(特に第三者から)を実行する可能性があるためです。 メインプロセスに来るリクエストを慎重に検証することが重要です。

##### Node.js API

> 注意: Renderer プロセスから Node.js API にアクセスするには、 `nodeIntegration` を `true` に設定する必要があります。

Electron は Node.js API とそのモジュールへのフルアクセスをメインおよびレンダラープロセスの両方で公開します。 たとえば、ルートディレクトリからすべてのファイルを読み込むことができます。

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

Node.js モジュールを使用するには、まず依存関係としてインストールする必要があります。

```sh
npm install --save aws-sdk
```

次に、Electron アプリケーションでは、モジュールが必要です:

```js
const S3 = require('aws-sdk/clients/s3')
```