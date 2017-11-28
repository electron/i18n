# Electron FAQ

## Electronがインストールできません。

`npm install electron`を実行するとき、ユーザによっては時にインストール時エラーが発生する場合があります。

ほとんどの場合、これらのエラーはネットワークの問題の結果としてのものであり、`electron`のnpmパッケージには実際の問題はありません。 `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, および `ETIMEDOUT` というエラーはすべてそういったネットワークの問題を示しています。 最も良い解決法はネットワークを切り替えること、あるいは少し待ってからもう一度インストールしてみることです。

`npm`経由でのインストールが失敗する場合、Electronを[electron/electron/releases](https://github.com/electron/electron/releases) から直接ダウンロードするという方法もあります。

## Electronはいつ最新版のChromeにアップグレードされるのですか？

Electronに含まれるChromiumのバージョンは、通常、新しいChromiumの安定バージョンがリリースされた後、1～2週間以内に上げられます。 ただし、この期間というのは保障されてはおらず、またバージョンアップでの作業量に左右されます。

また、Chromiumのstableチャンネルのみを使用し、もし、重要な修正がbetaまたはdevチャンネルにある場合、それをバックポートします。

より詳しく知りたい場合は、[セキュリティについて](tutorial/security.md)をご参照ください。

## Electronはいつ最新版のNode.jsにアップグレードされるのですか？

Node.js の新しいバージョンがリリースされたあと、Electron の Node.js を更新するのを通常約1か月待ちます。 それにより、とても頻繁に発生している、新しい Node.js バージョンによるバグによる影響を避けることができます。

通常、Node.js の新しい機能は V8 のアップグレードによってもたらされますが、Electron は Chromiumに搭載されている V8 を使用しているので、新しい Node.js に入ったばかりの最新の JavaScript 機能は Electron ではたいてい既に導入されています。

## ウェブページ間のデータを共有する方法は?

ウェブページ（レンダラープロセス）間のデータを共有するために最も単純な方法は、ブラウザですでに提供されているHTML5 APIを使用することです。 良い候補として、[Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)があります。

もしくは、IPC(プロセス間通信) を使用することも出来ます。これはElectron特有の機能で、メインプロセスの広域変数としてオブジェクトを保存してレンダラプロセスから`electron`モジュールの`remote`プロパティを通じてアクセスすることが出来ます。

```javascript
// メインプロセス内
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// ページ１内
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// ページ２内
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## 何分か経つとアプリの Window/tray が消えてしまいます

これは、Window/trayを格納するのに使用している変数がガベージコレクトされたときに発生します。

この問題に遭遇した時には、次のドキュメントを読むことをお勧めします。

* [メモリ管理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [変数スコープ](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

もし簡単に修正したい場合は、コード内の

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

という部分を以下のように修正して、変数をグローバルに宣言すると良いでしょう。

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## JQuery/RequireJS/Meteor/AngularJSがElectronで使えません

Electronに組み込まれているNode.jsの影響で、`module`, `exports`, `require`のようなシンボルがDOMに追加されています。 このため、いくつかのライブラリでは同名のシンボルを追加しようとして問題が発生することがあります。

これを解決するために、Electronなnode integrationを無効にすることができます。

```javascript
// メインプロセス内
const {BrowserWindow} = require('electron')
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

Electronの組み込みモジュールを使うときに、次のようなエラーに遭遇するかもしれません。

    > require('electron').webFrame.setZoomFactor(1.0)
    Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
    

これは、ローカルまたはグローバルのどちらかで[npm `electron` module](https://www.npmjs.com/package/electron)をインストールしたことが原因で、Electronの組み込みモジュールを上書きしてしまいます。

正しい組み込みモジュールを使用しているかを確認するために、`electron`モジュールのパスを出力します。

```javascript
console.log(require.resolve('electron'))
```

そして、次のような形式になっているかどうかを確認します。

    "/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
    

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```bash
npm uninstall electron
npm uninstall -g electron
```

しかし、組み込みモジュールを使用しているのに、まだこのエラーが出る場合、不適切なプロセスでモジュールを使用しようとしている可能性が高いです。 For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.