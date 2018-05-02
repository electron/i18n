# remote

> レンダラープロセスからメインプロセスのモジュールを使用します。

プロセス: [Renderer](../glossary.md#renderer-process)

`remote` モジュールは、レンダラープロセス (ウェブページ) とメインプロセスの間で、簡単にプロセス間通信 (IPC) をする方法を提供します。

Electronでは、GUI 関係のモジュール (たとえば `dialog`、`menu` 等) はレンダラープロセスではなく、メインプロセスでのみ有効です。 レンダラープロセスからそれらを使用するためには、`ipc` モジュールがメインプロセスにプロセス間メッセージを送る必要があります。 With the `remote` module, you can invoke methods of the main process object without explicitly sending inter-process messages, similar to Java's [RMI](https://en.wikipedia.org/wiki/Java_remote_method_invocation). 以下はレンダラープロセスからブラウザウインドウを作成するサンプルです。

```javascript
const {BrowserWindow} = require('electron').remote
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

**注釈:** 逆 (メインプロセスからレンダラープロセスにアクセスする) の場合は、 [webContents.executeJavascript](web-contents.md#contentsexecutejavascriptcode-usergesture-callback) が使用できます。

## リモートオブジェクト

`remote` モジュールによって返される各オブジェクト (関数を含む) は、メインプロセスのオブジェクトを表しています (リモートオブジェクト、リモート関数と呼びます)。 リモートオブジェクトのメソッドを呼び出すとき、リモート関数を呼ぶとき、リモートコンストラクタ (関数) で新しいオブジェクトを作成するとき、実際にはプロセス間の同期メッセージが送信されています。

In the example above, both [`BrowserWindow`](browser-window.md) and `win` were remote objects and `new BrowserWindow` didn't create a `BrowserWindow` object in the renderer process. 代わりに、`BrowserWindow` オブジェクトはメインプロセス内で作成され、レンダラープロセス内の対応するリモートオブジェクト、すなわち `win` オブジェクトを返しました。

**注釈:** リモートオブジェクトが最初に参照された時に存在する、[列挙可能なプロパティ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)だけが、remote を経由してアクセスできます。

**注釈:** `remote` を経由してアクセスしたとき、配列とバッファは IPC でコピーされます。 それらをレンダラープロセス内で変更しても、メインプロセス内のものは変更されません。

## リモートオブジェクトの有効期間

Electron は、レンダラープロセス内のリモートオブジェクトが存続している (つまり、ガベージコレクションされていない) 限り、メインプロセス内の対応するオブジェクトは解放されません。 リモートオブジェクトがガベージコレクションされたとき、対応するメインプロセス内のオブジェクトの参照が外れます。

もしレンダラープロセス内でリモートオブジェクトがリークした場合 (map に格納したが開放されていないなど)、対応するメインプロセス内のオブジェクトもリークするので、リモートオブジェクトのリークには十分注意して下さい。

ただし、文字列や数などの主な値型は、コピーして送信されます。

## メインプロセスにコールバックを渡す

メインプロセス内のコードでは、レンダラー (例えば `remote` モジュール) からのコールバックを受け取ることができますが、この機能を使用するときは非常に注意する必要があります。

まず、デッドロックを防ぐために、メインプロセスに渡すコールバックは非同期で呼ばれます。メインプロセスが、渡されたコールバックの戻り値を取得することを期待しないで下さい。

例えば、メインプロセス内で呼ばれた `Array.map` はレンダラープロセスの関数を使用できません。

```javascript
// メインプロセス mapNumbers.js
exports.withRendererCallback = (mapper) => {
  return [1, 2, 3].map(mapper)
}

exports.withLocalCallback = () => {
  return [1, 2, 3].map(x => x + 1)
}
```

```javascript
// レンダラープロセス
const mapNumbers = require('electron').remote.require('./mapNumbers')
const withRendererCb = mapNumbers.withRendererCallback(x => x + 1)
const withLocalCb = mapNumbers.withLocalCallback()

console.log(withRendererCb, withLocalCb)
// [undefined, undefined, undefined], [2, 3, 4]
```

このように、レンダラーのコールバックの同期された戻り値は期待通りでなく、メインプロセス内の同一のコールバックの戻り値とは一致しませんでした。

次に、メインプロセスに渡されたコールバックは、メインプロセスがそれをガベージコレクションするまで存続します。

例えば、以下のコードは一見問題がないようにみえます。リモートオブジェクトに `close` イベントのコールバックをインストールします。

```javascript
require('electron').remote.getCurrentWindow().on('close', () => {
  // ウインドウが閉じられた...
})
```

しかし、明示的にアンインストールするまで、コールバックはメインプロセスに参照されるということを覚えておいて下さい。 もしアンインストールしないと、ウインドウをリロードする度にコールバックが再びインストールされ、その度に一つのコールバックがリークします。

`close` イベントが発火されたとき、前にインストールしたコールバックが解放されるので、メインプロセス内で例外が発生され、状況を悪化させます。

この問題を避けるため、メインプロセスに渡すレンダラーのコールバックへの参照を、確実にクリーンアップしてください。 This involves cleaning up event handlers, or ensuring the main process is explicitly told to dereference callbacks that came from a renderer process that is exiting.

## メインプロセスの組み込みモジュールへのアクセス

メインプロセスの組み込みモジュールは、`remote` モジュール内のゲッターとして扱われるので、`electron` モジュールのように直接使用できます。

```javascript
const app = require('electron').remote.app
console.log(app)
```

## メソッド

`remote` オブジェクトには以下のメソッドがあります

### `remote.require(module)`

* `module` String

戻り値 `any` - メインプロセス内の `require(module)` によって返されるオブジェクト。 相対パスで指定したモジュールは、メインプロセスのエントリポイントを基準に解決します。

例

```sh
project/
├── main
│   ├── foo.js
│   └── index.js
├── package.json
└── renderer
    └── index.js
```

```js
// メインプロセス: main/index.js
const {app} = require('electron')
app.on('ready', () => { /* ... */ })
```

```js
// 相対的に指定するちょっとしたモジュール: main/foo.js
module.exports = 'bar
```

```js
// レンダラープロセス: renderer/index.js
const foo = require('electron').remote.require('./foo') // bar
```

### `remote.getCurrentWindow()`

戻り値 [`BrowserWindow`](browser-window.md) - このウェブページが属するウインドウ。

### `remote.getCurrentWebContents()`

戻り値 [`WebContents`](web-contents.md) - このウェブページの webContents。

### `remote.getGlobal(name)`

* `name` String

戻り値 `any` - メインプロセス内の `name` (例: `global[name]`) のグローバル変数。

## プロパティ

### `remote.process`

メインプロセス内の `process` オブジェクト。これは `remote.getGlobal('process')` と同じですが、キャッシュされます。