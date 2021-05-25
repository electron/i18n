# プロセスモデル

Electron は Chromium のマルチプロセスアーキテクチャを継承しており、フレームワークのアーキテクチャは最新のウェブブラウザに酷似しています。 このガイドでは、最小限の [クイックスタートアプリ][] で適用した、Electron の概念的な知識を解説します。

## なぜシングルプロセスではないのでしょうか?

ウェブブラウザは非常に複雑なアプリケーションです。 ウェブコンテンツを表示するという主な機能のほかに、複数のウィンドウ (またはタブ) を管理したり、サードパーティの拡張機能を読み込んだりするなど、多くの副次的な役割を担っています。

以前のブラウザでは、これらの機能を単一のプロセスで実現していました。 このやり方は開いているタブごとのオーバーヘッドを減らしますが、1 つのウェブサイトがクラッシュしたりハングアップしたりすると、ブラウザ全体に影響が及びます。

## マルチプロセスモデル

この問題を解決するため、Chrome チームは各タブがそれぞれのプロセスで描画するようにすると決め、ウェブページ上のバグや悪意のあるコードがアプリ全体に与える影響を制限することにしました。 単一のブラウザプロセスはこれらのプロセスを制御し、アプリケーションのライフサイクル全体を制御します。 このモデルを視覚化したのが、[Chrome 漫画本][] の以下の図です。

![Chrome のマルチプロセスアーキテクチャ](../images/chrome-processes.png)

Electron アプリケーションも非常によく似た構造をしています。 Electron アプリ開発者の場合、メインとレンダラーの 2 種類のプロセスを制御します。 これらは、上述の Chrome 独自のブラウザプロセスとレンダラープロセスと似ています。

## メインプロセス

各 Electron アプリにつき一つのメインプロセスがあります。これはアプリケーションのエントリポイントとして機能します。 メインプロセスは Node.js 環境で動作します。つまり、モジュールを `require` したり Node.js のすべての API を利用したりできます。

### ウインドウの管理

メインプロセスの主な目的は、[`BrowserWindow`][browser-window] モジュールを使ってアプリケーションウインドウを作成し管理することです。

`BrowserWindow` クラスの各インスタンスは、アプリケーションウインドウを作成し、その分かれたレンダラープロセス内でウェブページを読み込みます。 メインプロセスからは、ウインドウの [`webContents`][web-contents] オブジェクトでこのウェブコンテンツを操作できます。

```js title='main.js'
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://github.com')

const contents = win.webContents
console.log(contents)
```

> 注意: `BrowserView` モジュールなどの [ウェブ埋め込み][web-embed] 用のレンダラープロセスが作成されることもあります。 `webContents` オブジェクトは、埋め込みウェブコンテンツにもアクセスできます。

`BrowserWindow` モジュールは [`EventEmitter`][event-emitter] を継承しているため、様々なユーザーイベント (例えば、ウインドウの最小化や最大化) ハンドラの追加もできます。

`BrowserWindow` インスタンスが破棄されると、対応するレンダラープロセスも終了します。

### アプリケーションのライフサイクル

メインプロセスは、Electron の [`app`][app] モジュールを介してアプリケーションのライフサイクルも制御します。 このモジュールには、アプリケーションの動作をカスタマイズするためのイベントやメソッドが多数用意されています (例えば、プログラム側でアプリケーションを終了したり、アプリケーションの Dock を変更したり、アプリについてのパネルを表示したりできます)。

実例として、[クイックスタートガイド][quick-start-lifecycle] で紹介されているアプリでは `app` の API でよりネイティブなアプリケーションウインドウの体験を実現しています。

```js title='main.js'
// macOS 以外でウインドウが開かれていない時にアプリを終了する
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

### ネイテイブ API

ウェブコンテンツ用の Chromium ラッパーだけでなく Electron の機能を拡張するため、メインプロセスではユーザーのオペレーティングシステムと対話するカスタム API も追加しています。 Electron は、メニュー、ダイアログ、tray アイコンなど、ネイティブなデスクトップ機能を制御する様々なモジュールを公開しています。

Electron のメインプロセスのモジュール一覧は、API ドキュメントをご覧ください。

## レンダラープロセス

各 Electron アプリは、開いている `BrowserWindow` (及び各ウェブ埋め込み) ごとに個別のレンダラープロセスを生成します。 その名の通り、レンダラーはウェブコンテンツの *レンダリング* を担います。 あらゆる意図と目的において、レンダラープロセスで実行するコードは (少なくとも Chromium がそうである限り) ウェブ標準に従って動作しなければなりません。

そのため、あるブラウザウインドウ内のすべてのユーザーインターフェイスとアプリの機能は、ウェブの場合と同じツールとパラダイムで記述する必要があります。

全ウェブ仕様の説明はこのガイドの範疇の外ですが、最低限理解しておくべきことは以下の通りでしょう。

* HTML ファイルがレンダラープロセスのエントリーポイントです。
* UI のスタイル付けは Cascading Style Sheets (CSS) で追加します。
* 実行する JavaScript コードは `<script>` 要素で追加できます。

さらにこれは、レンダラーが `require` やその他 Node.js の API に直接アクセスできないことも意味します。 NPM モジュールをレンダラーに直接組み込むには、ウェブの場合と同じバンドラーツールチェイン (例えば、`webpack` や `parcel` など) を使用する必要があります。

> 注意: 開発を容易にするために、レンダラープロセスを完全な Node.js 環境で生成できます。 歴史的には、これがデフォルトでしたが、セキュリティ上の理由からこの機能は無効になりました。

ここで、レンダラープロセスのユーザーインターフェイスが Node.js や Electron のネイティブデスクトップ機能にアクセスできずメインプロセスからのみできるのであれば、どのように協調して動作するのかと疑問に思うでしょう。 実際、Electron のコンテンツスクリプトを直接インポートする方法はありません。

## プリロードスクリプト


<!-- Note: This guide doesn't take sandboxing into account, which might fundamentally 
change the statements here. --> プリロードスクリプトは、ウェブコンテンツの読み込み開始前にレンダラープロセス内で実行されるコードです。 これらのスクリプトはレンダラーのコンテキスト内で実行されますが、Node.js の API にアクセスできるようにより多くの権限が与えられています。

プリロードスクリプトは、`BrowserWindow` コンストラクタの `webPreferences` オプションでメインプロセスからアタッチできます。

```js title='main.js'
const { BrowserWindow } = require('electron')
//...
const win = new BrowserWindow({
  preload: 'path/to/preload.js'
})
//...
```

プリロードスクリプトは、グローバルな [`Window` ][window-mdn] インターフェイスをレンダラーと共有し Node.js の API にアクセスすることができます。そのため、`window` グローバルに任意の API を公開してウェブコンテンツが利用できるようにすることで、レンダラーを強化する役割を果たしています。

プリロードスクリプトはアタッチされているレンダラーと `window` グローバルを共有しますが、[`contextIsolation`][context-isolation] のデフォルト値によりプリロードスクリプトの変数は `window` に直接アタッチできません。

```js title='preload.js'
window.myAPI = {
  desktop: true
}
```

```js title='renderer.js'
console.log(window.myAPI)
// => undefined
```

コンテキスト分離 (contextIsolation) とは、プリロードスクリプトをレンダラーのメインワールドから分離し、特権的 API がウェブコンテンツのコードへ漏れないようにすることです。

これを代わりに安全に実現するには、以下のように [`contextBridge`][context-bridge] モジュールを使用します。

```js title='preload.js'
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true
})
```

```js title='renderer.js'
console.log(window.myAPI)
// => { desktop: true }
```

この機能は、主に以下に挙げる 2 つの目的において非常に便利です。

* [`ipcRenderer`][ipcRenderer] ヘルパーをレンダラーに公開することで、プロセス間通信 (IPC) を利用してレンダラーからメインプロセスのタスクを作動できます (その逆も可能)。
* リモート URL でホストされている既存ウェブアプリの Electron のラッパーを開発している場合、レンダラーの `window` グローバルにカスタムプロパティを追加することで、ウェブクライアント側でデスクトップ専用のロジックを利用できます。

[クイックスタートアプリ]: ./quick-start.md

[Chrome 漫画本]: https://www.google.com/googlebooks/chrome/

[browser-window]: ../api/browser-window.md
[web-embed]: ./web-embeds.md
[web-contents]: ../api/web-contents.md
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter

[app]: ../api/app.md
[quick-start-lifecycle]: ./quick-start.md#manage-your-windows-lifecycle

[window-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/Window
[context-isolation]: ./context-isolation.md
[context-bridge]: ../api/context-bridge.md
[ipcRenderer]: ../api/ipc-renderer.md
