# webFrame

> 現在のウェブページの描画をカスタマイズします。

プロセス: [Renderer](../glossary.md#renderer-process)

`webFrame` は現在の `BrowserWindow` のトップフレームで表示されている `WebFrame` クラスのインスタンスをエクスポートする Electron のモジュールです。 サブフレームは特定のプロパティとメソッド (`webFrame.firstChild` など) によって取得されます。

現在のページを 200% にズームするサンプルです。

```javascript
const { webFrame } = require('electron')

webFrame.setZoomFactor(2)
```

## メソッド

`WebFrame`クラスには以下のメソッドがあります。

### `webFrame.setZoomFactor(factor)`

* `factor` Double - 拡大率。省略値は 1.0 です。

指定の拡大率に変更します。 拡大率は百分率なので、300% = 3.0 です。

拡大率は 0.0 より大きい必要があります。

### `webFrame.getZoomFactor()`

戻り値 `Number` - 現在の拡大率。

### `webFrame.setZoomLevel(level)`

* `level` Number - 拡大レベル。

指定レベルに拡大レベルを変更します。 原寸は 0 で、各増減分はそれぞれ 20% ずつの拡大または縮小を表し、デフォルトで元のサイズの 300% から 50% までに制限されています。

### `webFrame.getZoomLevel()`

戻り値 `Number` - 現在の拡大レベル。

### `webFrame.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

ピンチによる拡大レベルの最大値と最小値を設定します。

> **注意**: Electron ではデフォルトで視覚ズームは無効化されています。 再び有効にする場合は以下を呼び出します。
> 
> `js
  webFrame.setVisualZoomLevelLimits(1, 3)`

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)` _非推奨_

* `minimumLevel` Number
* `maximumLevel` Number

レイアウトベースな (つまり Visual ではない) 拡大レベルの最大値と最小値を設定します。

**非推奨:** この API は Chromium がサポートしなくなりました。

### `webFrame.setSpellCheckProvider(language, provider)`

* `language` String
* `provider` Object
  * `spellCheck` Function
    * `words` String[]
    * `callback` Function
      * `misspeltWords` String[]

入力フィールドとテキストエリアのスペルチェックのプロバイダを設定します。

このメソッドを使用する場合は、ウインドウを構築するときに組み込みスペルチェックを無効にする必要があります。

```js
const mainWindow = new BrowserWindow({
  webPreferences: {
    spellcheck: false
  }
})
```

`provider` は、スペルチェックのために個々の単語の配列を受け取る `spellCheck` メソッドを持つオブジェクトである必要があります。 `spellCheck` 関数は非同期的に実行され、完了時にスペルミスの単語を含む `callback` 関数を呼び出します。

[node-spellchecker](https://github.com/atom/node-spellchecker) をプロバイダとして使用するサンプルです。

```javascript
const { webFrame } = require('electron')
const spellChecker = require('spellchecker')
webFrame.setSpellCheckProvider('en-US', {
  spellCheck (words, callback) {
    setTimeout(() => {
      const spellchecker = require('spellchecker')
      const misspelled = words.filter(x => spellchecker.isMisspelled(x))
      callback(misspelled)
    }, 0)
  }
})
```

### `webFrame.insertCSS(css)`

* `css` String - CSS ソースコード。

戻り値 `String` - 挿入された CSS のキー。後で `webFrame.removeInsertedCSS(key)` を介して CSS を削除するために使用できます。

現在のウェブページに CSS を挿入し、挿入されたスタイルシートの一意なキーを返します。

### `webFrame.removeInsertedCSS(key)`

* `key` String

現在のウェブページから挿入された CSS を削除します。 スタイルシートは `webFrame.insertCSS(css)` から返されるキーで識別されます。

### `webFrame.insertText(text)`

* `text` String

フォーカスされた要素に `text` を挿入します。

### `webFrame.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (任意) - 省略値は `false`。

戻り値 `Promise<any>` - 実行されたコードの結果で resolve する Promise。コードの結果が reject な Promise である場合は reject な Promise。

ページ内の `code` を評価します。

ブラウザウインドウでは、`requestFullScreen` のような、いくつかの HTML API は、ユーザからのジェスチャーでのみ呼び出されます。 `userGesture` を `true` にセットすることでこの制限がなくなります。

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - JavaScript を実行するワールドの ID。`0` はデフォルトのワールドで、`999` は Electron の `contextIsolation` 機能で使用されるワールドです。  任意の整数を指定できます。
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (任意) - 省略値は `false`。

戻り値 `Promise<any>` - 実行されたコードの結果で resolve する Promise。コードの結果が reject な Promise である場合は reject な Promise。

`executeJavaScript` のように動きますが、 `scripts` はイソレートコンテキスト内で評価します。

### `webFrame.setIsolatedWorldInfo(worldId, info)`
* `worldId` Integer - JavaScript を実行するワールドの ID。`0` はデフォルトのワールドで、`999` は Electron の `contextIsolation` 機能で使用されるワールドです。 Chrome 拡張機能の ID は `[1 << 20, 1 << 29)` の範囲で確保します。 任意の整数を指定できます。
* `info` Object
  * `securityOrigin` String (任意) - 隔離された空間のためのセキュリティオリジン
  * `csp` String (任意) - 隔離された空間のためのコンテンツセキュリティポリシー
  * `name` String (任意) - 隔離されたワールドの名前。 デベロッパー ツールで役立ちます。

隔離されたワールドのセキュリティオリジン、コンテンツセキュリティポリシー、名前を設定します。 注: `csp` が指定されている場合は、`securityOrigin` も指定する必要があります。

### `webFrame.getResourceUsage()`

戻り値 `Object`:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `scripts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Blink の内部メモリキャッシュの使用情報を記述しているオブジェクトを返します。

```javascript
const { webFrame } = require('electron')
console.log(webFrame.getResourceUsage())
```

これが生成されます。

```javascript
{
  images: {
    count: 22,
    size: 2549,
    liveSize: 2542
  },
  cssStyleSheets: { /* "images" と同じ */ },
  xslStyleSheets: { /* "images" と同じ */ },
  fonts: { /* "images" と同じ */ },
  other: { /* "images" と同じ" */ }
}
```

### `webFrame.clearCache()`

以前使用していたメモリを解放しようとします (以前のナビゲーションの画像など)。

このメソッドを盲目的に呼び出すと、空になったキャッシュを補充する必要があるため、Electron の処理速度が遅くなる可能性があることに注意してください。アプリ内のイベントが発生してページの実際のメモリ使用量が少なくなったと思われる場合にのみ呼び出すようにしてください (即ち、とても重いページから空のページへナビゲートし、そこにとどまるとき)。

### `webFrame.getFrameForSelector(selector)`

* `selector` String - フレーム要素の CSS セレクタ。

戻り値 `WebFrame` - `selector` によって選択された `webFrame` のドキュメント。`selector` がフレームを選択していないか現在のレンダラープロセスにそのフレームがない場合、`null` が返されます。

### `webFrame.findFrameByName(name)`

* `name` String

戻り値 `WebFrame` - 与えられた `name` である `webFrame` の子。そのようなフレームが存在しないか現在のレンダラープロセスにそのフレームがない場合、`null` が返されます。

### `webFrame.findFrameByRoutingId(routingId)`

* `routingId` Integer - 現在のレンダラープロセスでの一意なフレーム ID を表す `Integer`。 ルーティング ID は `WebFrame` インスタンス (`webFrame.routingId`) や、フレーム特有の `WebContents` ナビゲーションイベント (`did-frame-navigate` など) から取得できます。

戻り値 `WebFrame` - 渡された `routingId` のもの。見つからなければ `null`。

## プロパティ

### `webFrame.top` _読み出し専用_

`webFrame` が属するフレーム階層内のトップフレームを表す `WebFrame | null`。トップフレームが現在のレンダラープロセスにない場合、プロパティは `null` になります。

### `webFrame.opener` _読み出し専用_

`webFrame` が開かれたフレームを表す `WebFrame | null`。開いたフレームが存在しないか現在のレンダラープロセスにない場合、プロパティは `null` になります。

### `webFrame.parent` _読み出し専用_

`webFrame` の親フレームを表す `WebFrame | null`。`webFrame` がトップフレームか現在のレンダラープロセスにない場合、プロパティは `null` になります。

### `webFrame.firstChild` _読み出し専用_

`webFrame` の最初の子フレームを表す `WebFrame | null`。`webFrame` に子フレームが存在しないか現在のレンダラープロセスにない場合、プロパティは `null` になります。

### `webFrame.nextSibling` _読み出し専用_

次の兄弟フレームを表す `WebFrame | null`。`webFrame` がその親の最後の子フレームか、次の兄弟フレームが現在のレンダラープロセスにない場合、プロパティは `null` になります。

### `webFrame.routingId` _読み出し専用_

現在のレンダラープロセスでの一意なフレーム ID を表す `Integer`。 同じ基底フレームを参照する WebFrame インスタンスは、同じ `routingId` を持ちます。
