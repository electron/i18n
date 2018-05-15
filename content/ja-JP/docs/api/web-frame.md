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
  * `spellCheck` Function - 戻り値 `Boolean`. 
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
  * `secure` Boolean (任意) - 省略値は true。
  * `bypassCSP` Boolean (任意) - 省略値は true。
  * `allowServiceWorkers` Boolean (任意) - 省略値は true。
  * `supportFetchAPI` Boolean (任意) - 省略値は true。
  * `corsEnabled` Boolean (任意) - 省略値は true。

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
* `callback` Function (任意) - スクリプトが実行されたあとに呼ばれる。 
  * `result` Any

戻り値 `Promise` - 実行されたコードの結果で解決される Promise、またはコードの結果が拒否された Promise である場合の拒否された Promise。

ページ内の `code` を評価します。

ブラウザウインドウでは、`requestFullScreen` のような、いくつかの HTML API は、ユーザからのジェスチャーでのみ呼び出されます。 `userGesture` を `true` にセットすることでこの制限がなくなります。

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (任意) - 省略値は `false`。
* `callback` Function (任意) - スクリプトが実行されたあとに呼ばれる。 
  * `result` Any

`executeJavaScript` のように動きますが、 `scripts` はイソレートコンテキスト内で評価します。

### `webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)`

* `worldId` Integer
* `csp` String

イソレートコンテキストのコンテンツセキュリティポリシーを設定します。

### `webFrame.setIsolatedWorldHumanReadableName(worldId, name)`

* `worldId` Integer
* `name` String

イソレートコンテキストの名前を設定します。開発者向けツール内で活用できます。

### `webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)`

* `worldId` Integer
* `securityOrigin` String

イソレートコンテキストのセキュリティオリジンを設定します。

### `webFrame.getResourceUsage()`

戻り値 `Object`:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Blink の内部メモリキャッシュの使用情報を記述しているオブジェクトを返します。

```javascript
const {webFrame} = require('electron')
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