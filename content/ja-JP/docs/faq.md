# Electron FAQ

## Electronがインストールできません。

`npm install electron` を実行するとき、インストール時エラーが発生する場合があります。

ほとんどの場合、このエラーはネットワークによるもので、`electron` の npm パッケージに問題はありません。 `ELIFECYCLE`、`EAI_AGAIN`、`ECONNRESET`、`ETIMEDOUT` といったエラーは、ネットワーク上の問題を示しています。 最善の解決策は、ネットワークを切り替えるか、少し待ってからもう一度インストールしてることです。

`npm` でのインストールに失敗する場合、Electron を [electron/electron/releases](https://github.com/electron/electron/releases) から直接ダウンロードすることもできます。

## Electronはいつ最新版のChromeにアップグレードされるのですか？

Electron 内の Chrome のバージョンは、通常であれば新しい Chrome の安定バージョンがリリースされてから 1 ~ 2 週間以内に更新します。 この期間というのは保証されておらず、バージョンアップの作業量にも依存します。

Chrome の安定版のみを使用します。重要な修正が beta 及び dev 版にある場合、それをバックポートします。

より詳しい情報は、[セキュリティについて](tutorial/security.md) を参照してください。

## Electronはいつ最新版のNode.jsにアップグレードされるのですか？

新しいバージョンの Node.js がリリースされた後、通常であれば Electron 内の Node.js のアップグレードまで約 1 ヶ月待ちます。 これにより、新しい Node.js のリリースでよく発生するバグの影響を避けることができます。

通常、Node.js の新しい機能は V8 のアップグレードによってもたらされますが、Electron は Chrome ブラウザーに搭載されている V8 を使用しているので、新しい Node.js に入ったばかりのピカピカに新しい JavaScript 機能は Electron ではたいてい既に導入されています。

## どうやってウェブページ間でデータを共有するのでしょうか?

ウェブページ (レンダラープロセス) 間でデータを共有する最も単純な方法は、ブラウザで既に提供されている HTML5 API を使用することです。 良い候補として、[Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage)、[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)、[`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)、[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) があります。

もしくは、IPC システムも使用できます。これは Electron 特有の機能で、メインプロセスはグローバル変数としてオブジェクトを保存し、レンダラープロセスからは `electron` モジュールの `remote` プロパティを通じてそれにアクセスできます。

```javascript
// メインプロセス内
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// ページ1 内
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// ページ2 内
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## 数分経つとアプリの tray が消失します。

これは、tray を格納している変数がガベージコレクトされると発生します。

この問題に遭遇した時には、次のドキュメントを読むことをお勧めします。

* [メモリ管理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [変数スコープ](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

もし簡単に修正したい場合は、コードを以下のように修正して変数をグローバルにすると良いでしょう。以下の部分を

```javascript
const { app, Tray } = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

以下のように変更します。

```javascript
const { app, Tray } = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## jQuery/RequireJS/Meteor/AngularJSがElectronで使えません

Electron の Node.js 組み込みの影響で、`module`、`exports`、`require` のような余分なシンボルが DOM に追加されています。 このため、いくつかのライブラリでは同名のシンボルを追加しようとして問題が発生することがあります。

これを解決するために、Electronなnode integrationを無効にすることができます。

```javascript
// メインプロセス内
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

しかし、Node.jsとElectron APIを使用した機能を維持したい場合は、ほかのライブラリを読み込む前に、ページのシンボルをリネームする必要があります。

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

## `require('electron').xxx`が定義されていません。

Electronの組み込みモジュールを使うとに、次のようなエラーに遭遇するかもしれません。

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

これは、ローカルまたはグローバルのどちらかで[npm `electron` module](https://www.npmjs.com/package/electron)をインストールしたことが原因で、Electronの組み込みモジュールを上書きしてしまいます。

正しい組み込みモジュールを使用しているかを確認するために、`electron`モジュールのパスを出力します。

```javascript
console.log(require.resolve('electron'))
```

そして、次のような形式になっているかどうかを確認します。

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

もし `node_modules/electron/index.js`という形式になっていれば、npmの `electron`モジュールを取り除くか、これをリネームする必要があります。

```sh
npm uninstall electron
npm uninstall -g electron
```

しかし、組み込みモジュールを使用しているのに、まだこのエラーが出る場合、不適切なプロセスでモジュールを使用しようとしている可能性が高いです。 たとえば、 `electron.app`はメインプロセスでのみ利用でき、また `electron.webFrame`はレンダラプロセスでのみ利用できます。

## フォントがぼやけます。これはどういうものでどうすればいいのですか?

[サブピクセルアンチエイリアス](http://alienryderflex.com/sub_pixel/) が無効だと、液晶画面上のフォントはぼやけて見えます。以下がその例です。

![サブピクセルレンダリングのサンプル](images/subpixel-rendering-screenshot.gif)

サブピクセルアンチエイリアスは不透明なレイヤーの背景が必要で、そのレイヤーはフォントグリフを含みます。 (詳しくは [この issue](https://github.com/electron/electron/issues/6344#issuecomment-420371918) を参照してください)。

目的を達成するには、[BrowserWindow](api/browser-window.md) のコンストラクタで背景を設定します。

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

この効果は (いくつかの?) 液晶画面上でのみ見られます。あなたに違いが分からなくても、ユーザの何人かにはわかるでしょう。この背景を設定する手段は、そうしてはいけない理由がない限り、最も優れています。

CSS で背景を設定するだけでは期待する効果はないことに注意してください。