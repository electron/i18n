# Electron FAQ

## Electronはいつ最新版のChromeにアップグレードされるのですか？

Electronに含まれるChromiumのバージョンは、通常、新しいChromiumの安定バージョンがリリースされた後、1～2週間以内に上げられます。 ただし、この期間というのは保障されてはおらず、またバージョンアップでの作業量に左右されます。

また、Chromiumのstableチャンネルのみを使用し、もし、重要な修正がbetaまたはdevチャンネルにある場合、それをバックポートします。

For more information, please see the [security introduction](tutorial/security.md).

## Electronはいつ最新版のNode.jsにアップグレードされるのですか？

Node.js の新しいバージョンがリリースされたあと、Electron の Node.js を更新するのを通常約1か月待ちます。 それにより、とても頻繁に発生している、新しい Node.js バージョンによるバグによる影響を避けることができます。

通常、Node.js の新しい機能は V8 のアップグレードによってもたらされますが、Electron は Chromiumに搭載されている V8 を使用しているので、新しい Node.js に入ったばかりのピカピカに新しい JavaScript 機能は Electron ではたいてい既に導入されています。

## ウェブページ間のデータを共有する方法は?

ウェブページ（レンダラープロセス）間のデータを共有するために最も単純な方法は、ブラウザですでに提供されているHTML5 APIを使用することです。 良い候補として、[Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)があります。

もしくは、IPC(プロセス間通信) を使用することも出来ます。これはElectron特有の機能で、メインプロセスの広域変数としてオブジェクトを保存してレンダラプロセスから`electron`モジュールの`remote`プロパティを通じてアクセスすることが出来ます。

```javascript
// In the main process.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## 何分か経つとアプリの Window/tray が消えてしまいます

これは、Window/trayを格納するのに使用している変数がガベージコレクトされたときに発生します。

この問題に遭遇した時には、次のドキュメントを読むことをお勧めします。

* [メモリ管理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [変数スコープ](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

もし簡単に修正したい場合は、コードを以下のように修正して変数をグローバルにすると良いでしょう：

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

to this:

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
// In the main process.
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

## `require('electron').xxx` is undefined.

When using Electron's built-in module you might encounter an error like this:

    > require('electron').webFrame.setZoomFactor(1.0)
    Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
    

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

    "/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
    

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```bash
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.