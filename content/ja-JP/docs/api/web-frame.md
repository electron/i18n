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

* `factor` Number - 拡大率。

指定の倍率に拡大率を変更します。拡大率は百分率なので、300% = 3.0 です。

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

> **注意**: Electron ではデフォルトで視覚ズームは無効化されています。再び有効にする場合は以下を呼び出します。
> 
> ```js
webFrame.setVisualZoomLevelLimits(1, 3)
```

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)` *Deprecated*

* `minimumLevel` Number
* `maximumLevel` Number

レイアウトベースな (つまり Visual ではない) 拡大レベルの最大値と最小値を設定します。

**Deprecated:** This API is no longer supported by Chromium.

### `webFrame.setSpellCheckProvider(language, provider)`

* `language` String
* `provider` Object 
  * `spellCheck` Function 
    * `words` String[]
    * `callback` Function 
      * `misspeltWords` String[]

Sets a provider for spell checking in input fields and text areas.

If you want to use this method you must disable the builtin spellchecker when you construct the window.

```js
const mainWindow = new BrowserWindow({
  webPreferences: {
    spellcheck: false
  }
})
```

The `provider` must be an object that has a `spellCheck` method that accepts an array of individual words for spellchecking. The `spellCheck` function runs asynchronously and calls the `callback` function with an array of misspelt words when complete.

An example of using [node-spellchecker](https://github.com/atom/node-spellchecker) as provider:

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

Returns `String` - A key for the inserted CSS that can later be used to remove the CSS via `webFrame.removeInsertedCSS(key)`.

現在のウェブページに CSS を挿入し、挿入されたスタイルシートの一意なキーを返します。

### `webFrame.removeInsertedCSS(key)`

* `key` String

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `webFrame.insertCSS(css)`.

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

* `worldId` Integer - JavaScript を実行するワールドの ID。`0` はデフォルトのワールドで、`999` は Electron の `contextIsolation` 機能で使用されるワールドです。 任意の整数を指定できます。
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (任意) - 省略値は `false`。

戻り値 `Promise<any>` - 実行されたコードの結果で resolve する Promise。コードの結果が reject な Promise である場合は reject な Promise。

`executeJavaScript` のように動きますが、 `scripts` はイソレートコンテキスト内で評価します。

### `webFrame.setIsolatedWorldInfo(worldId, info)`

* `worldId` Integer - JavaScript を実行するワールドの ID。`0` はデフォルトのワールドで、`999` は Electron の `contextIsolation` 機能で使用されるワールドです。 Chrome 拡張機能の ID は `[1 << 20, 1 << 29)` の範囲で確保します。 任意の整数を指定できます。
* `info` Object 
  * `securityOrigin` String (任意) - 隔離された空間のためのセキュリティオリジン
  * `csp` String (任意) - 隔離された空間のためのコンテンツセキュリティポリシー
  * `name` String (任意) - 孤立した世界の名前。devtools で役に立ちます

Set the security origin, content security policy and name of the isolated world. Note: If the `csp` is specified, then the `securityOrigin` also has to be specified.

### `webFrame.getResourceUsage()`

戻り値 `Object`:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `scripts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Returns an object describing usage information of Blink's internal memory caches.

```javascript
const { webFrame } = require('electron')
console.log(webFrame.getResourceUsage())
```

This will generate:

```javascript
{
  images: {
    count: 22,
    size: 2549,
    liveSize: 2542
  },
  cssStyleSheets: { /* same with "images" */ },
  xslStyleSheets: { /* same with "images" */ },
  fonts: { /* same with "images" */ },
  other: { /* same with "images" */ }
}
```

### `webFrame.clearCache()`

Attempts to free memory that is no longer being used (like images from a previous navigation).

Note that blindly calling this method probably makes Electron slower since it will have to refill these emptied caches, you should only call it if an event in your app has occurred that makes you think your page is actually using less memory (i.e. you have navigated from a super heavy page to a mostly empty one, and intend to stay there).

### `webFrame.getFrameForSelector(selector)`

* `selector` String - フレーム要素の CSS セレクタ。

Returns `WebFrame` - The frame element in `webFrame's` document selected by `selector`, `null` would be returned if `selector` does not select a frame or if the frame is not in the current renderer process.

### `webFrame.findFrameByName(name)`

* `name` String

Returns `WebFrame` - A child of `webFrame` with the supplied `name`, `null` would be returned if there's no such frame or if the frame is not in the current renderer process.

### `webFrame.findFrameByRoutingId(routingId)`

* `routingId` Integer - 現在のレンダラープロセスでの一意なフレーム ID を表す `Integer`。 ルーティング ID は `WebFrame` インスタンス (`webFrame.routingId`) や、フレーム特有の `WebContents` ナビゲーションイベント (`did-frame-navigate` など) から取得できます。

Returns `WebFrame` - that has the supplied `routingId`, `null` if not found.

## プロパティ

### `webFrame.top` *読み出し専用*

A `WebFrame | null` representing top frame in frame hierarchy to which `webFrame` belongs, the property would be `null` if top frame is not in the current renderer process.

### `webFrame.opener` *読み出し専用*

A `WebFrame | null` representing the frame which opened `webFrame`, the property would be `null` if there's no opener or opener is not in the current renderer process.

### `webFrame.parent` *読み出し専用*

A `WebFrame | null` representing parent frame of `webFrame`, the property would be `null` if `webFrame` is top or parent is not in the current renderer process.

### `webFrame.firstChild` *読み出し専用*

A `WebFrame | null` representing the first child frame of `webFrame`, the property would be `null` if `webFrame` has no children or if first child is not in the current renderer process.

### `webFrame.nextSibling` *読み出し専用*

A `WebFrame | null` representing next sibling frame, the property would be `null` if `webFrame` is the last frame in its parent or if the next sibling is not in the current renderer process.

### `webFrame.routingId` *読み出し専用*

An `Integer` representing the unique frame id in the current renderer process. Distinct WebFrame instances that refer to the same underlying frame will have the same `routingId`.