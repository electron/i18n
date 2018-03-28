# webFrame

> 現在のウェブページの描画をカスタマイズします。

プロセス: [Renderer](../glossary.md#renderer-process)

現在のページを 200% にズームするサンプルです。

```javascript
const {webFrame} = require('electron')

webFrame.setZoomFactor(2)
```

## メソッド

`webFrame` モジュールには以下のメソッドがあります。

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

### `webFrame.setZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

**非推奨:** 視覚拡大レベルの制限を設定するには、代わりに `setVisualZoomLevelLimits` を呼びます。このメソッドは Electron 2.0 で削除されます。

### `webFrame.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

ピンチによる拡大レベルの最大値と最小値を設定します。

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

レイアウトベースな (つまり Visual ではない) 拡大レベルの最大値と最小値を設定します。

### `webFrame.setSpellCheckProvider(language, autoCorrectWord, provider)`

* `language` String
* `autoCorrectWord` Boolean
* `provider` Object 
  * `spellCheck` Function - 戻り値 `Boolean` 
    * `text` String

入力フィールドとテキストエリアのスペルチェックのプロバイダを設定します。

`provider` は、渡された単語が正しいかどうかを返すメソッド `spellCheck` を持つオブジェクトでなければいけません。

[node-spellchecker](https://github.com/atom/node-spellchecker) をプロバイダとして使用するサンプルです。

```javascript
const {webFrame} = require('electron')
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck (text) {
    return !(require('spellchecker').isMisspelled(text))
  }
})
```

### `webFrame.registerURLSchemeAsSecure(scheme)`

* `scheme` String

セキュアなスキームとして `scheme` を登録します。

セキュアなスキームは、混在するコンテンツの警告をトリガーしません。 たとえば、`https` と `data` は、アクティブなネットワーク攻撃者によって壊されないため、セキュアなスキームです。

### `webFrame.registerURLSchemeAsBypassingCSP(scheme)`

* `scheme` String

現在のページのコンテンツセキュリティポリシーに関係なく、この `scheme` からリソースが読み込まれます。

### `webFrame.registerURLSchemeAsPrivileged(scheme[, options])`

* `scheme` String
* `options` Object (任意) 
  * `secure` Boolean - (任意) 省略値は true。
  * `bypassCSP` Boolean - (任意) 省略値は true。
  * `allowServiceWorkers` Boolean - (任意) 省略値は true。
  * `supportFetchAPI` Boolean - (任意) 省略値は true。
  * `corsEnabled` Boolean - (任意) 省略値は true。

`scheme` をセキュアとして登録し、リソースのコンテンツセキュリティポリシーをバイパスし、ServiceWorker の登録を許可し、フェッチ API をサポートします。

`false` の値を指定してオプションを指定すると、その登録が省略されます。以下は Content Security Policy をバイパスすることなく、特権スキームを登録する例です。

```javascript
const {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })
```

### `webFrame.insertText(text)`

* `text` String

フォーカスされた要素に `text` を挿入します。

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (任意) - 省略値は `false`。
* `callback` Function (optional) - Called after script has been executed. 
  * `result` Any

Returns `Promise` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page.

In the browser window some HTML APIs like `requestFullScreen` can only be invoked by a gesture from the user. Setting `userGesture` to `true` will remove this limitation.

### `webFrame.getResourceUsage()`

戻り値 `Object`:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Returns an object describing usage information of Blink's internal memory caches.

```javascript
const {webFrame} = require('electron')
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