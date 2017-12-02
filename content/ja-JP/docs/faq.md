# Electron FAQ

## Electronがインストールできません。

`npm install electron`を実行するとき、ユーザによっては時にインストール時エラーが発生する場合があります。

ほとんどの場合、これらのエラーはネットワークの問題の結果としてのものであり、`electron`のnpmパッケージには実際の問題はありません。 `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, および `ETIMEDOUT` というエラーはすべてそういったネットワークの問題を示しています。 最も良い解決法はネットワークを切り替えること、あるいは少し待ってからもう一度インストールしてみることです。

`npm`経由でのインストールが失敗する場合、Electronを[electron/electron/releases](https://github.com/electron/electron/releases) から直接ダウンロードするという方法もあります。

## Electronはいつ最新版のChromeにアップグレードされるのですか？

Electronに含まれるChromiumのバージョンは、通常、新しいChromiumの安定バージョンがリリースされた後、1～2週間以内に更新されます。 ただし、この期間内に必ずアップデートされるとは保証されていませんし、要する期間はバージョンアップでの作業量に左右されます。

また、Chromiumのstableチャンネルのみを使用します。もし重要な修正がbetaまたはdevチャンネルにある場合、それをバックポートします。

より詳しく知りたい場合は、[セキュリティについて](tutorial/security.md)をご参照ください。

## Electronはいつ最新版のNode.jsにアップグレードされるのですか？

Electronに含まれるNode.jsのバージョンは、通常、新しいNode.jsがリリースされた後、1ヶ月ほどで更新されます。 そのため、Node.js の新しいリリースでよく発生するバグによる影響を避けることが可能です。

通常、Node.js の新しい機能は V8 のアップグレードによってもたらされますが、Electron は Chromiumに搭載されている V8 を使用しています。そのため、新しく Node.js に追加された JavaScript の機能は Electron ではたいてい既に導入されています。

## ウェブページ間のデータを共有する方法は?

ウェブページ（レンダラープロセス）間のデータを共有するために最も単純な方法は、ブラウザですでに提供されているHTML5 APIを使用することです。 [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)などを活用すると便利でしょう。

もしくは、IPC(プロセス間通信) を使用することも出来ます。これはElectron特有の機能で、メインプロセスのグローバル変数としてオブジェクトを保存してレンダラプロセスから`electron`モジュールの`remote`プロパティを通じてアクセスすることが出来ます。

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

## jQuery/RequireJS/Meteor/AngularJSがElectronで使えません

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

To solve this, you can turn off node integration in Electron:

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

But if you want to keep the abilities of using Node.js and Electron APIs, you have to rename the symbols in the page before including other libraries:

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

    > require('electron').webFrame.setZoomFactor(1.0)
    Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
    

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

    "/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
    

もし `node_modules/electron/index.js`という形式になっていれば、npm`electron`モジュールを取り除くか、これをリネームする必要があります。

```bash
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. たとえば、 `electron.app`はメインプロセスでのみ利用でき、また `electron.webFrame`はレンダラプロセスでのみ利用できます。