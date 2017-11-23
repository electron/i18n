# Electron FAQ

## Electronがインストールできません。

`npm install electron`を実行するとき、ユーザによっては時にインストール時エラーが発生する場合があります。

ほとんどの場合、これらのエラーはネットワークの問題の結果としてのものであり、`electron`のnpmパッケージには実際の問題はありません。 `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, および `ETIMEDOUT` というエラーはすべてそういったネットワークの問題を示しています。 最も良い解決法はネットワークを切り替えること、あるいは少し待ってからもう一度インストールしてみることです。

`npm`経由でのインストールが失敗する場合、Electronを[electron/electron/releases](https://github.com/electron/electron/releases) から直接ダウンロードするという方法もあります。

## When will Electron upgrade to latest Chrome?

The Chrome version of Electron is usually bumped within one or two weeks after a new stable Chrome version gets released. This estimate is not guaranteed and depends on the amount of work involved with upgrading.

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

For more information, please see the [security introduction](tutorial/security.md).

## When will Electron upgrade to latest Node.js?

When a new version of Node.js gets released, we usually wait for about a month before upgrading the one in Electron. So we can avoid getting affected by bugs introduced in new Node.js versions, which happens very often.

New features of Node.js are usually brought by V8 upgrades, since Electron is using the V8 shipped by Chrome browser, the shiny new JavaScript feature of a new Node.js version is usually already in Electron.

## How to share data between web pages?

To share data between web pages (the renderer processes) the simplest way is to use HTML5 APIs which are already available in browsers. Good candidates are [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), and [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Or you can use the IPC system, which is specific to Electron, to store objects in the main process as a global variable, and then to access them from the renderers through the `remote` property of `electron` module:

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

## My app's window/tray disappeared after a few minutes.

This happens when the variable which is used to store the window/tray gets garbage collected.

If you encounter this problem, the following articles may prove helpful:

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

## I can not use jQuery/RequireJS/Meteor/AngularJS in Electron.

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
    

もし `node_modules/electron/index.js`という形式になっていれば、npm`electron`モジュールを取り除くか、これをリネームする必要があります。

```bash
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. たとえば、 `electron.app`はメインプロセスでのみ利用でき、また `electron.webFrame`はレンダラプロセスでのみ利用できます。