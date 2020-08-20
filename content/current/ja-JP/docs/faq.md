# Electron FAQ

## Electronがインストールできません。

`npm install electron` を実行するとき、インストール時エラーが発生する場合があります。

ほとんどの場合、このエラーはネットワークによるもので、`electron` の npm パッケージに問題はありません。 `ELIFECYCLE`、`EAI_AGAIN`、`ECONNRESET`、`ETIMEDOUT` といったエラーは、ネットワーク上の問題を示しています。 最善の解決策は、ネットワークを切り替えるか、少し待ってからもう一度インストールしてることです。

`npm` でのインストールに失敗する場合、Electron を [electron/electron/releases](https://github.com/electron/electron/releases) から直接ダウンロードすることもできます。

## Electronはいつ最新版のChromeにアップグレードされるのですか？

Electron 内の Chrome のバージョンは、通常であれば新しい Chrome の安定バージョンがリリースされてから 1 ~ 2 週間以内に更新します。 この期間というのは保証されておらず、バージョンアップの作業量にも依存します。

Chrome の安定版のみを使用します。 重要な修正が beta や dev 版にある場合、それをバックポートします。

より詳しい情報は、[セキュリティについて](tutorial/security.md) を参照してください。

## Electronはいつ最新版のNode.jsにアップグレードされるのですか？

新しいバージョンの Node.js がリリースされた後、通常であれば Electron 内の Node.js のアップグレードまで約 1 ヶ月待ちます。 これにより、新しい Node.js のリリースでよく発生するバグの影響を避けることができます。

通常、Node.js の新しい機能は V8 のアップグレードによってもたらされますが、Electron は Chrome ブラウザーに搭載されている V8 を使用しているので、新しい Node.js に入ったばかりのピカピカに新しい JavaScript 機能は Electron ではたいてい既に導入されています。

## どうやってウェブページ間でデータを共有するのでしょうか?

ウェブページ (レンダラープロセス) 間でデータを共有する最も単純な方法は、ブラウザで既に提供されている HTML5 API を使用することです。 良い候補として、[Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage)、[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)、[`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)、[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) があります。

Alternatively, you can use the IPC primitives that are provided by Electron. To share data between the main and renderer processes, you can use the [`ipcMain`](api/ipc-main.md) and [`ipcRenderer`](api/ipc-renderer.md) modules. To communicate directly between web pages, you can send a [`MessagePort`](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort) from one to the other, possibly via the main process using [`ipcRenderer.postMessage()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). Subsequent communication over message ports is direct and does not detour through the main process.

## 数分経つとアプリの tray が消失します。

これは、tray を格納している変数がガベージコレクトされると発生します。

以下のドキュメントが参考になるはずです。

* [メモリ管理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [変数スコープ](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

もし簡単に修正したい場合は、コードを以下のように修正して変数をグローバルにすると良いでしょう。以下の部分を

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

以下のように変更します。

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## jQuery/RequireJS/Meteor/AngularJSがElectronで使えません

Electron の Node.js 組み込みの影響で、`module`、`exports`、`require` のような余分なシンボルが DOM に追加されています。 このため、いくつかのライブラリでは同名のシンボルを追加しようとして問題が発生することがあります。

これを解決するために、Electron の node integration を無効にできます。

```javascript
// メインプロセス
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

それでも Node.js と Electron API を使用した機能を維持したい場合は、他ライブラリを読み込む前に、ページ内のそのシンボル名を変更する必要があります。

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` が未定義です。

Electron の組み込みモジュールを使うと、以下のエラーに遭遇するかもしれません。

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

これは、間違ったプロセスでモジュールを使用している可能性が高いです。 たとえば、`electron.app` はメインプロセスのみ、`electron.webFrame` はレンダラープロセスのみで利用できます。

## フォントがぼやけます。これはどういうものでどうすればいいのですか?

[サブピクセルアンチエイリアス](http://alienryderflex.com/sub_pixel/) が無効だと、液晶画面上のフォントはぼやけて見えます。 サンプル:

![サブピクセルレンダリングのサンプル](images/subpixel-rendering-screenshot.gif)

サブピクセルアンチエイリアスは不透明なレイヤーの背景が必要で、そのレイヤーはフォントグリフを含みます。 (詳しくは [この issue](https://github.com/electron/electron/issues/6344#issuecomment-420371918) を参照してください)。

目的を達成するには、[BrowserWindow](api/browser-window.md) のコンストラクタで背景を設定します。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

この効果は (一部の?) 液晶画面でしか見られません。 違いが見えなくても、ユーザーの中には違って見える人がいるかもしれません。 こうしてはいけない理由がなければ、背景は基本的にこのように設定するのが良いでしょう。

CSS で背景を設定するだけでは期待する効果はないことに注意してください。
