# `<webview>`タグ

## Warning

Electron の `webview` タグは [Chromium の `webview`](https://developer.chrome.com/apps/tags/webview) に基づきつつ、劇的に変更されています。 これはレンダリング、ナビゲーション、イベントルーティングを含む `webview` の安定性に影響しています。 私たちは、`webview` タグを使用せずに、`iframe` や Electron の `BrowserView` 、埋め込みコンテンツを完全に避けるアーキテクチャといった代替案を検討することを推奨しています。

## 概要

> 分離したフレームとプロセスに外部ウェブコンテンツを表示します。

プロセス: [Renderer](../glossary.md#renderer-process)

`webview`タグを使用して、Electron アプリに 'ゲスト' コンテンツ (ウェブページなど) を埋め込むことができます。ゲストコンテンツは `webview` コンテナに含まれています。 アプリ内の埋め込みページは、ゲストコンテンツのレイアウトとレンダリングの方法を制御します。

`iframe` とは異なり、`webview` はアプリとは別のプロセスで実行されます。 それはウェブページと同じ権限を持っておらず、アプリと組み込みコンテンツの間のすべてのやりとりは非同期になります。 これにより、埋め込みコンテンツからアプリが保護されます。 **注釈:** ホストページから webview 上で呼び出されるほとんどのメソッドは、メインプロセスへの同期呼び出しを必要とします。

## サンプル

アプリにウェブページを埋め込むには、アプリの埋め込みページ (これはゲストコンテンツを表示するアプリページ) へ `webview` タグを追加します。 最もシンプルな形式では、`webview` タグには、ウェブページの `src` と、`webview` コンテナの見た目を制御する CSS スタイルが含まれます。

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

ゲストコンテンツを制御したい場合は、`webview` のイベントを傍受し、`webview` のメソッドを使用してそれらのイベントに応答する JavaScript を記述することでできます。 ここでは、2つのイベントリスナーを持つサンプルコードを示します。1つはウェブページのロード開始を、もう1つはウェブページのロード停止を傍受し、ロード時に "ロード中..." というメッセージを表示します。

```html
<script>
  onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const loadstart = () => {
      indicator.innerText = 'ロード中...'
    }

    const loadstop = () => {
      indicator.innerText = ''
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
  }
</script>
```

## 内部実装

内部では `webview` は [Out-of-Process iframe (OOPIF) ](https://www.chromium.org/developers/design-documents/oop-iframes) で実装されています。 `webview` タグは本質的には、見えない DOM を用いてその内側に `iframe` 要素をラップしたカスタム要素です。

なので `webview` の動作はクロスドメイン `iframe` ととても似ています。例として、

* `webview`をクリックしたとき、ページフォーカスが埋め込みフレームから `webview` に移動します。
* `webview` にキーボードイベントリスナを追加することはできません。
* 埋め込みフレームと `webview` 間のすべての反応は非同期です。

## CSS スタイルの注意事項

`webview` タグのスタイルでは、`webview` コンテナでの子の `iframe` 要素の高さと幅を完全に埋めるのに内部的に `display:flex;` を使用しているので、古典的かつフレックスボックスなレイアウトを使用するときは注意して下さい。 `display:inline-flex;` をインラインレイアウトに指定しない限り、デフォルトの`display:flex;` CSS プロパティを上書きしないでください。

## タグの属性

`webview` タグには以下の属性があります。

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

見える URL を返します。 この属性に書き込むと、トップレベルのナビゲーションが開始されます。

`src` に独自の値を代入すると、現在のページがリロードされます。

`src` 属性は、`data:text/plain,Hello, world!` などのデータ URL を受け取ることもできます。

### `autosize`

```html
<webview src="https://www.github.com/" autosize minwidth="576" minheight="432"></webview>
```

この属性が存在すると、`webview` コンテナは `minwidth`、`minheight`、`maxwidth`、`maxheight` 属性によって指定された境界内で自動的にリサイズされます。 `autosize` が有効になっていない限り、これらの制約は `webview` に影響しません。 `atutosize` が有効になっている場合、`webview` コンテナのサイズは最小値よりも小さくすることも、最大値より大きくすることもできません。

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

この属性が存在する場合、`webview` のゲストページは Node Integration を持ち、低レベルのシステムリソースにアクセスするのに、`require` や `process` のような Node API が使用できます。 デフォルトでは、ゲストページ内の Node Integration は無効化されています。

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](remote.md) module. The remote module is avaiable by default.

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

When this attribute is present the guest page in `webview` will be able to use browser plugins. Plugins are disabled by default.

### `preload`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

Specifies a script that will be loaded before other scripts run in the guest page. The protocol of script's URL must be either `file:` or `asar:`, because it will be loaded by `require` in guest page under the hood.

When the guest page doesn't have node integration this script will still have access to all Node APIs, but global objects injected by Node will be deleted after this script has finished executing.

**Note:** This option will be appear as `preloadURL` (not `preload`) in the `webPreferences` specified to the `will-attach-webview` event.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

Sets the referrer URL for the guest page.

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

Sets the user agent for the guest page before the page is navigated to. Once the page is loaded, use the `setUserAgent` method to change the user agent.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

When this attribute is present the guest page will have web security disabled. Web security is enabled by default.

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

Sets the session used by the page. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. if there is no `persist:` prefix, the page will use an in-memory session. 同じ `partition` を割り当てることによって、複数のページが同じセッションを共有できます。 If the `partition` is unset then default session of the app will be used.

This value can only be modified before the first navigation, since the session of an active renderer process cannot change. Subsequent attempts to modify the value will fail with a DOM exception.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

When this attribute is present the guest page will be allowed to open new windows. Popups are disabled by default.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

A list of strings which specifies the web preferences to be set on the webview, separated by `,`. The full list of supported preference strings can be found in [BrowserWindow](browser-window.md#new-browserwindowoptions).

The string follows the same format as the features string in `window.open`. A name by itself is given a `true` boolean value. A preference can be set to another value by including an `=`, followed by the value. Special values `yes` and `1` are interpreted as `true`, while `no` and `0` are interpreted as `false`.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A list of strings which specifies the blink features to be enabled separated by `,`. サポートされている機能の文字列の完全なリストは、[RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) ファイルにあります。

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A list of strings which specifies the blink features to be disabled separated by `,`. サポートされている機能の文字列の完全なリストは、[RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) ファイルにあります。

## メソッド

The `webview` tag has the following methods:

**Note:** The webview element must be loaded before using the methods.

**例**

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```

### `<webview>.loadURL(url[, options])`

* `url` URL
* `options` Object (任意) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (任意) - HTTPリファラのURL。
  * `userAgent` String (任意) - リクエスト元のユーザーエージェント。
  * `extraHeaders` String (任意) - "\n" で区切られた追加のヘッダー
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (任意)
  * `baseURLForDataURL` String (任意) - データURLによってロードされたファイルの (最後のパス区切り文字を含む) ベースURL。 これは指定された `url` がデータURLで、他のファイルをロードする必要がある場合のみ必要です。

Loads the `url` in the webview, the `url` must contain the protocol prefix, e.g. the `http://` or `file://`.

### `<webview>.downloadURL(url)`

* `url` String

Initiates a download of the resource at `url` without navigating.

### `<webview>.getURL()`

Returns `String` - The URL of guest page.

### `<webview>.getTitle()`

Returns `String` - The title of guest page.

### `<webview>.isLoading()`

Returns `Boolean` - Whether guest page is still loading resources.

### `<webview>.isLoadingMainFrame()`

Returns `Boolean` - Whether the main frame (and not just iframes or frames within it) is still loading.

### `<webview>.isWaitingForResponse()`

Returns `Boolean` - Whether the guest page is waiting for a first-response for the main resource of the page.

### `<webview>.stop()`

保留中のナビゲーションを停止します。

### `<webview>.reload()`

Reloads the guest page.

### `<webview>.reloadIgnoringCache()`

Reloads the guest page and ignores cache.

### `<webview>.canGoBack()`

Returns `Boolean` - Whether the guest page can go back.

### `<webview>.canGoForward()`

Returns `Boolean` - Whether the guest page can go forward.

### `<webview>.canGoToOffset(offset)`

* `offset` Integer

Returns `Boolean` - Whether the guest page can go to `offset`.

### `<webview>.clearHistory()`

ナビゲーション履歴を消去します。

### `<webview>.goBack()`

Makes the guest page go back.

### `<webview>.goForward()`

Makes the guest page go forward.

### `<webview>.goToIndex(index)`

* `index` Integer

Navigates to the specified absolute index.

### `<webview>.goToOffset(offset)`

* `offset` Integer

現在のエントリから指定したオフセットへナビゲーションします。

### `<webview>.isCrashed()`

戻り値 `Boolean` - レンダラープロセスがクラッシュしたかどうか。

### `<webview>.setUserAgent(userAgent)`

* `userAgent` String

Overrides the user agent for the guest page.

### `<webview>.getUserAgent()`

Returns `String` - The user agent for guest page.

### `<webview>.insertCSS(css)`

* `css` String

Injects CSS into the guest page.

### `<webview>.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (optional) - Default `false`.
* `callback` Function (任意) - スクリプトが実行されたあとに呼ばれる。 
  * `result` Any

ページ内の `code` を評価します。 If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen`, which require user action, can take advantage of this option for automation.

### `<webview>.openDevTools()`

Opens a DevTools window for guest page.

### `<webview>.closeDevTools()`

Closes the DevTools window of guest page.

### `<webview>.isDevToolsOpened()`

Returns `Boolean` - Whether guest page has a DevTools window attached.

### `<webview>.isDevToolsFocused()`

Returns `Boolean` - Whether DevTools window of guest page is focused.

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`) of guest page.

### `<webview>.inspectServiceWorker()`

Opens the DevTools for the service worker context present in the guest page.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Set guest page muted.

### `<webview>.isAudioMuted()`

Returns `Boolean` - Whether guest page has been muted.

### `<webview>.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

### `<webview>.undo()`

Executes editing command `undo` in page.

### `<webview>.redo()`

Executes editing command `redo` in page.

### `<webview>.cut()`

Executes editing command `cut` in page.

### `<webview>.copy()`

Executes editing command `copy` in page.

### `<webview>.paste()`

Executes editing command `paste` in page.

### `<webview>.pasteAndMatchStyle()`

Executes editing command `pasteAndMatchStyle` in page.

### `<webview>.delete()`

Executes editing command `delete` in page.

### `<webview>.selectAll()`

Executes editing command `selectAll` in page.

### `<webview>.unselect()`

Executes editing command `unselect` in page.

### `<webview>.replace(text)`

* `text` String

Executes editing command `replace` in page.

### `<webview>.replaceMisspelling(text)`

* `text` String

Executes editing command `replaceMisspelling` in page.

### `<webview>.insertText(text)`

* `text` String

フォーカスされた要素に `text` を挿入します。

### `<webview>.findInPage(text[, options])`

* `text` String - 検索するコンテンツ。空にしてはいけません。
* `options` Object (任意) 
  * `forward` Boolean (任意) - 前方または後方を検索するかどうか。省略値は `true`。
  * `findNext` Boolean (任意) - 操作が最初のリクエストなのか、辿っているのかどうか。省略値は `false`。
  * `matchCase` Boolean (任意) - 大文字と小文字を区別する検索かどうか。省略値は `false`。
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. 他のいくつかの単語内一致を受け入れる。省略値は `false`。

戻り値 `Integer` - リクエストに使われたリクエスト ID。

ウェブページ内の `text` のすべてのマッチを探すリクエストを開始します。 The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.

### `<webview>.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`<webview>.findInPage`](#webviewfindinpagetext-options) request. 
  * `clearSelection` - 選択を消去する。
  * `keepSelection` - その選択を通常の選択に変換する。
  * `activateSelection` - 選択ノードをフォーカスして、クリックする。

Stops any `findInPage` request for the `webview` with the provided `action`.

### `<webview>.print([options])`

* `options` Object (任意) 
  * `silent` Boolean (任意) - プリンタの設定をユーザに尋ねないかどうか。省略値は `false`。
  * `printBackground` Boolean (任意) - ウェブページの背景色と画像も印刷するかどうか。省略値は `false`。
  * `deviceName` String (任意) - 使用するプリンタデバイスの名前。省略値は `''`。

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options, callback)`

* `options` Object 
  * `marginsType` Integer (任意) - 使用するマージンの種類を指定する。デフォルトマージンには 0 を、マージン無しには 1 を、最小マージンには 2 を使用する。
  * `pageSize` String | Size (任意) - 生成する PDF のページサイズを指定します。 `A3`、`A4`、`A5`、`Legal`、`Letter`、`Tabloid`、またはミクロン単位の `width` と `height` を含む Object にできる。
  * `printBackground` Boolean (任意) - CSS 背景を印刷するかどうか。
  * `printSelectionOnly` Boolean (任意) - 選択部分だけを印刷するかどうか。
  * `landscape` Boolean (任意) - `true` で横向き、`false` で縦向き。
* `callback` Function 
  * `error` Error
  * `data` Buffer

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options, callback)`.

### `<webview>.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (任意) - キャプチャするページ内の領域。
* `callback` Function 
  * `image` [NativeImage](native-image.md)

Captures a snapshot of the `webview`'s page. Same as `webContents.capturePage([rect, ]callback)`.

### `<webview>.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

`channel` を介してレンダラープロセスに非同期メッセージを送信します。任意の引数を送ることもできます。 The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

See [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) for examples.

### `<webview>.sendInputEvent(event)`

* `event` Object

入力 `event` をページに送ります。

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - 拡大率。

指定の倍率に拡大率を変更します。拡大率は百分率なので、300% = 3.0 です。

### `<webview>.setZoomLevel(level)`

* `level` Number - 拡大レベル。

指定レベルに拡大レベルを変更します。 原寸は 0 で、各増減分はそれぞれ 20% ずつの拡大または縮小を表し、デフォルトで元のサイズの 300% から 50% までに制限されています。 The formula for this is `scale := 1.2 ^ level`.

### `<webview>.getZoomFactor(callback)`

* `callback` Function 
  * `zoomFactor` Number

Sends a request to get current zoom factor, the `callback` will be called with `callback(zoomFactor)`.

### `<webview>.getZoomLevel(callback)`

* `callback` Function 
  * `zoomLevel` Number

Sends a request to get current zoom level, the `callback` will be called with `callback(zoomLevel)`.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

ピンチによる拡大レベルの最大値と最小値を設定します。

### `<webview>.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

レイアウトベースな (つまり Visual ではない) 拡大レベルの最大値と最小値を設定します。

### `<webview>.showDefinitionForSelection()` *macOS*

ページ上の選択された単語を検索するポップアップ辞書を表示します。

### `<webview>.getWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents associated with this `webview`.

It depends on the [`remote`](remote.md) module, it is therefore not available when this module is disabled.

## DOM イベント

The following DOM events are available to the `webview` tag:

### Event: 'load-commit'

戻り値:

* `url` String
* `isMainFrame` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### イベント: 'did-finish-load'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

### イベント: 'did-fail-load'

戻り値:

* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

### イベント: 'did-frame-finish-load'

戻り値:

* `isMainFrame` Boolean

Fired when a frame has done navigation.

### イベント: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### イベント: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### イベント: 'dom-ready'

Fired when document in the given frame is loaded.

### イベント: 'page-title-updated'

戻り値:

* `title` String
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

### イベント: 'page-favicon-updated'

戻り値:

* `favicons` String[] - URLの配列。

Fired when page receives favicon urls.

### イベント: 'enter-html-full-screen'

Fired when page enters fullscreen triggered by HTML API.

### イベント: 'leave-html-full-screen'

Fired when page leaves fullscreen triggered by HTML API.

### Event: 'console-message'

戻り値:

* `level` Integer
* `message` String
* `line` Integer
* `sourceId` String

Fired when the guest window logs a console message.

The following example code forwards all log messages to the embedder's console without regard for log level or other properties.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => {
  console.log('Guest page logged a message:', e.message)
})
```

### イベント: 'found-in-page'

戻り値:

* `result` Object 
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - アクティブなマッチの位置。
  * `matches` Integer - マッチの個数。
  * `selectionArea` Object - 最初のマッチ領域の座標。
  * `finalUpdate` Boolean

Fired when a result is available for [`webview.findInPage`](#webviewfindinpagetext-options) request.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('found-in-page', (e) => {
  webview.stopFindInPage('keepSelection')
})

const requestId = webview.findInPage('test')
console.log(requestId)
```

### イベント: 'new-window'

戻り値:

* `url` String
* `frameName` String
* `disposition` String - `default`、`foreground-tab`、`background-tab`、`new-window`、`save-to-disk`、`other` にできる。
* `options` Object - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.

```javascript
const { shell } = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', (e) => {
  const protocol = require('url').parse(e.url).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    shell.openExternal(e.url)
  }
})
```

### イベント: 'will-navigate'

戻り値:

* `url` String

ユーザまたはページがナビゲーションを開始したいときに発行されます。 `window.location` オブジェクトが変更されるか、ユーザがページ内のリンクをクリックしたときに発生します。

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does **NOT** have any effect.

### イベント: 'did-navigate'

戻り値:

* `url` String

Emitted when a navigation is done.

このイベントは、アンカーリンクのクリックや `window.location.hash` の更新のような、ページ内ナビゲーションでは発行されません。これを意図する場合は `did-navigate-in-page` を使用して下さい。

### イベント: 'did-navigate-in-page'

戻り値:

* `isMainFrame` Boolean
* `url` String

Emitted when an in-page navigation happened.

ページ内ナビゲーションが行われるとき、ページのURLは変更されますがページ外でのナビゲーションは発生しません。 これが発生する例は、アンカーリンクがクリックされたときや、DOM の `hashchange` イベントがトリガーされたときです。

### イベント: 'close'

Fired when the guest page attempts to close itself.

The following example code navigates the `webview` to `about:blank` when the guest attempts to close itself.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```

### Event: 'ipc-message'

戻り値:

* `channel` String
* `args` Array

Fired when the guest page has sent an asynchronous message to embedder page.

With `sendToHost` method and `ipc-message` event you can communicate between guest page and embedder page:

```javascript
// In embedder page.
const webview = document.querySelector('webview')
webview.addEventListener('ipc-message', (event) => {
  console.log(event.channel)
  // Prints "pong"
})
webview.send('ping')
```

```javascript
// In guest page.
const { ipcRenderer } = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

### イベント: 'crashed'

Fired when the renderer process is crashed.

### Event: 'gpu-crashed'

Fired when the gpu process is crashed.

### イベント: 'plugin-crashed'

戻り値:

* `name` String
* `version` String

Fired when a plugin process is crashed.

### イベント: 'destroyed'

Fired when the WebContents is destroyed.

### イベント: 'media-started-playing'

メディアの再生を開始するときに発行されます。

### イベント: 'media-paused'

メディアが一時停止、または再生が終了したときに発行されます。

### イベント: 'did-change-theme-color'

戻り値:

* `themeColor` String

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

### イベント: 'update-target-url'

戻り値:

* `url` String

マウスをリンクにマウスオーバーしたり、キーボードでリンクにフォーカスしたときに発行されます。

### イベント: 'devtools-opened'

開発者向けツールが開かれたときに発行されます。

### イベント: 'devtools-closed'

開発者向けツールが閉じられたときに発行されます。

### イベント: 'devtools-focused'

開発者向けツールがフォーカスされた / 開かれたときに発行されます。