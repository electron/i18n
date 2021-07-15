# `<webview>`タグ

## Warning

Electron's `webview` tag is based on [Chromium's `webview`][chrome-webview], which is undergoing dramatic architectural changes. This impacts the stability of `webviews`, including rendering, navigation, and event routing. We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, [Electron's `BrowserView`](browser-view.md), or an architecture that avoids embedded content altogether.

## Enabling

By default the `webview` tag is disabled in Electron >= 5.  You need to enable the tag by setting the `webviewTag` webPreferences option when constructing your `BrowserWindow`. For more information see the [BrowserWindow constructor docs](browser-window.md).

## 概要

> Display external web content in an isolated frame and process.

プロセス: [Renderer](../glossary.md#renderer-process)

Use the `webview` tag to embed 'guest' content (such as web pages) in your Electron app. The guest content is contained within the `webview` container. An embedded page within your app controls how the guest content is laid out and rendered.

Unlike an `iframe`, the `webview` runs in a separate process than your app. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content. **Note:** Most methods called on the webview from the host page require a synchronous call to the main process.

## サンプル

To embed a web page in your app, add the `webview` tag to your app's embedder page (this is the app page that will display the guest content). In its simplest form, the `webview` tag includes the `src` of the web page and css styles that control the appearance of the `webview` container:

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

If you want to control the guest content in any way, you can write JavaScript that listens for `webview` events and responds to those events using the `webview` methods. Here's sample code with two event listeners: one that listens for the web page to start loading, the other for the web page to stop loading, and displays a "loading..." message during the load time:

```html
<script>
  onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const loadstart = () => {
      indicator.innerText = 'loading...'
    }

    const loadstop = () => {
      indicator.innerText = ''
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
  }
</script>
```

## Internal implementation

Under the hood `webview` is implemented with [Out-of-Process iframes (OOPIFs)](https://www.chromium.org/developers/design-documents/oop-iframes). The `webview` tag is essentially a custom element using shadow DOM to wrap an `iframe` element inside it.

So the behavior of `webview` is very similar to a cross-domain `iframe`, as examples:

* When clicking into a `webview`, the page focus will move from the embedder frame to `webview`.
* You can not add keyboard, mouse, and scroll event listeners to `webview`.
* All reactions between the embedder frame and `webview` are asynchronous.

## CSS Styling Notes

Please note that the `webview` tag's style uses `display:flex;` internally to ensure the child `iframe` element fills the full height and width of its `webview` container when used with traditional and flexbox layouts. Please do not overwrite the default `display:flex;` CSS property, unless specifying `display:inline-flex;` for inline layout.

## Tag Attributes

The `webview` tag has the following attributes:

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

A `String` representing the visible URL. Writing to this attribute initiates top-level navigation.

Assigning `src` its own value will reload the current page.

The `src` attribute can also accept data URLs, such as `data:text/plain,Hello, world!`.

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

`Boolean`。 When this attribute is present the guest page in `webview` will have node integration and can use node APIs like `require` and `process` to access low level system resources. Node integration is disabled by default in the guest page.

### `nodeintegrationinsubframes`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

A `Boolean` for the experimental option for enabling NodeJS support in sub-frames such as iframes inside the `webview`. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not. This option is disabled by default in the guest page.

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

`Boolean`。 When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](remote.md) module. The remote module is unavailable by default.

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

`Boolean`。 When this attribute is present the guest page in `webview` will be able to use browser plugins. Plugins are disabled by default.

### `preload`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

A `String` that specifies a script that will be loaded before other scripts run in the guest page. The protocol of script's URL must be either `file:` or `asar:`, because it will be loaded by `require` in guest page under the hood.

When the guest page doesn't have node integration this script will still have access to all Node APIs, but global objects injected by Node will be deleted after this script has finished executing.

**Note:** This option will appear as `preloadURL` (not `preload`) in the `webPreferences` specified to the `will-attach-webview` event.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

A `String` that sets the referrer URL for the guest page.

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

A `String` that sets the user agent for the guest page before the page is navigated to. Once the page is loaded, use the `setUserAgent` method to change the user agent.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

`Boolean`。 When this attribute is present the guest page will have web security disabled. Web security is enabled by default.

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

A `String` that sets the session used by the page. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. if there is no `persist:` prefix, the page will use an in-memory session. 同じ `partition` を割り当てることによって、複数のページが同じセッションを共有できます。 If the `partition` is unset then default session of the app will be used.

This value can only be modified before the first navigation, since the session of an active renderer process cannot change. Subsequent attempts to modify the value will fail with a DOM exception.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

`Boolean`。 When this attribute is present the guest page will be allowed to open new windows. Popups are disabled by default.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

A `String` which is a comma separated list of strings which specifies the web preferences to be set on the webview. The full list of supported preference strings can be found in [BrowserWindow](browser-window.md#new-browserwindowoptions).

The string follows the same format as the features string in `window.open`. A name by itself is given a `true` boolean value. A preference can be set to another value by including an `=`, followed by the value. Special values `yes` and `1` are interpreted as `true`, while `no` and `0` are interpreted as `false`.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be enabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5][runtime-enabled-features] file.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be disabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5][runtime-enabled-features] file.

## メソッド

The `webview` tag has the following methods:

**Note:** The webview element must be loaded before using the methods.

**サンプル**

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
  * `postData` ([UploadRawData](structures/upload-raw-data.md) | [UploadFile](structures/upload-file.md))[] (任意)
  * `baseURLForDataURL` String (任意) - データURLによってロードされたファイルの (最後のパス区切り文字を含む) ベースURL。 これは指定された `url` がデータURLで、他のファイルをロードする必要がある場合のみ必要です。

Returns `Promise<void>` - The promise will resolve when the page has finished loading (see [`did-finish-load`](webview-tag.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](webview-tag.md#event-did-fail-load)).

Loads the `url` in the webview, the `url` must contain the protocol prefix, e.g. the `http://` or `file://`.

### `<webview>.downloadURL(url)`

* `url` String

ナビゲーションなしで `url` のリソースのダウンロードを初期化します。

### `<webview>.getURL()`

Returns `String` - The URL of guest page.

### `<webview>.getTitle()`

Returns `String` - The title of guest page.

### `<webview>.isLoading()`

Returns `Boolean` - Whether guest page is still loading resources.

### `<webview>.isLoadingMainFrame()`

戻り値 `Boolean` - メインフレーム (iframe やフレーム内のフレームだけではない) がまだ読み込んでいるかどうか。

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

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `<webview>.removeInsertedCSS(key)`.

現在のウェブページに CSS を挿入し、挿入されたスタイルシートの一意なキーを返します。

### `<webview>.removeInsertedCSS(key)`

* `key` String

戻り値 `Promise<void>` - 削除に成功すると解決されます。

現在のウェブページから挿入された CSS を削除します。 The stylesheet is identified by its key, which is returned from `<webview>.insertCSS(css)`.

### `<webview>.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (optional) - Default `false`.

戻り値 `Promise<any>` - 実行されたコードの結果で resolve する Promise。コードの結果が reject な Promise である場合は reject な Promise。

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

### `<webview>.inspectSharedWorker()`

Opens the DevTools for the shared worker context present in the guest page.

### `<webview>.inspectServiceWorker()`

Opens the DevTools for the service worker context present in the guest page.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Set guest page muted.

### `<webview>.isAudioMuted()`

Returns `Boolean` - Whether guest page has been muted.

### `<webview>.isCurrentlyAudible()`

戻り値 `Boolean` - 音声が現在再生中かどうか。

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

戻り値 `Promise<void>`

フォーカスされた要素に `text` を挿入します。

### `<webview>.findInPage(text[, options])`

* `text` String - 検索するコンテンツ。空にしてはいけません。
* `options` Object (任意)
  * `forward` Boolean (任意) - 前方または後方を検索するかどうか。省略値は `true`。
  * `findNext` Boolean (任意) - この要求で新規テキスト検索セッションを開始するかどうか。 最初の要求では `true` に、二度目以降の要求では `false` にする必要があります。 省略値は `false` 。
  * `matchCase` Boolean (任意) - 大文字と小文字を区別する検索かどうか。省略値は `false`。

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
  * `silent` Boolean (任意) - プリンタの設定をユーザに尋ねないかどうか。 省略値は `false` です。
  * `printBackground` Boolean (任意) - ウェブページの背景色と画像を印刷するかどうか。 省略値は `false` です。
  * `deviceName` String (任意) - 使用するプリンタデバイスの名前をセットします。 '人間向けの' 名称ではなくシステム定義名である必要があります。例えば、'Brother QL-820NWB' ではなく 'Brother_QL_820NWB' とします。
  * `color` Boolean (任意) - 印刷するウェブページをカラーにするかグレースケールにするかを設定します。 省略値は `true` です。
  * `margins` Object (任意)
    * `marginType` String (任意) - `default`、`none`、`printableArea` か `custom` にできます。 `custom` を選択した場合、`top`、`bottom`、`left`、`right` も指定する必要があります。
    * `top` Number (任意) - 印刷されたウェブページの上側のマージン。ピクセル単位です。
    * `bottom` Number (任意) - 印刷されたウェブページの下側のマージン。ピクセル単位です。
    * `left` Number (任意) - 印刷されたウェブページの左側のマージン。ピクセル単位です。
    * `right` Number (任意) - 印刷されたウェブページの右側のマージン。ピクセル単位です。
  * `landscape` Boolean (任意) - ウェブページを横向きモードで印刷するかどうか。 省略値は `false` です。
  * `scaleFactor` Number (任意) - ウェブページのスケール係数。
  * `pagesPerSheet` Number (任意) - ページシートごとに印刷するページ数。
  * `collate` Boolean (任意) - ウェブページを校合するかどうか。
  * `copies` Number (任意) - 印刷するウェブページの版数。
  * `pageRanges` Object[] (optional) - The page range to print.
    * `from` Number - 印刷する最初のページのインデックス (0 始まり)。
    * `to` Number - 印刷する最後のページのインデックス (これを含む) (0 始まり)。
  * `duplexMode` String (任意) - 印刷されるウェブページの両面モードを設定します。 `simplex`、`shortEdge`、`longEdge` のいずれかにできます。
  * `dpi` Record<string, number> (任意)
    * `horizontal` Number (任意) - 水平 DPI。
    * `vertical` Number (任意) - 垂直 DPI。
  * `header` String (任意) - ページヘッダーとして印刷される文字列。
  * `footer` String (任意) - ページフッターとして印刷される文字列。
  * `pageSize` String | Size (任意) - 印刷するドキュメントのページサイズを指定します。 `A3`、`A4`、`A5`、`Legal`、`Letter`、`Tabloid` のいずれかにするか、`height` を含む Object にできます。

戻り値 `Promise<void>`

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options)`

* `options` Object
  * `headerFooter` Record<string, string> (任意) - PDF のヘッダーとフッター。
    * `title` String - PDF ヘッダーのタイトル。
    * `url` String - PDF フッターの URL。
  * `landscape` Boolean (任意) - `true` で横向き、`false` で縦向き。
  * `marginsType` Integer (optional) - 使用する余白の種類を指定します。 0 で既定値、1 で余白なし、2 で最小限の余白になります。 and `width` in microns.
  * `scaleFactor` Number (任意) - ウェブページのスケール係数。 0 から 100 の範囲にできます。
  * `pageRanges` Record<string, number> (任意) - 印刷するページ範囲。 On macOS, only the first range is honored.
    * `from` Number - 印刷する最初のページのインデックス (0 始まり)。
    * `to` Number - 印刷する最後のページのインデックス (これを含む) (0 始まり)。
  * `pageSize` String | Size (任意) - 生成する PDF のページサイズを指定します。 Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`
  * `printBackground` Boolean (任意) - CSS 背景を印刷するかどうか。
  * `printSelectionOnly` Boolean (任意) - 選択部分だけを印刷するかどうか。

Returns `Promise<Uint8Array>` - Resolves with the generated PDF data.

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options)`.

### `<webview>.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (任意) - キャプチャするページ内の領域。

戻り値 `Promise<NativeImage>` - [NativeImage](native-image.md) を解決します

`rect` 内のページのスナップショットをキャプチャします。 `rect` を省略すると、表示されているページ全体をキャプチャします。

### `<webview>.send(channel, ...args)`

* `channel` String
* `...args` any[]

戻り値 `Promise<void>`

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

See [webContents.send](web-contents.md#contentssendchannel-args) for examples.

### `<webview>.sendInputEvent(event)`

* `event`  [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

戻り値 `Promise<void>`

Sends an input `event` to the page.

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventinputevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - Zoom factor.

指定の拡大率に変更します。 拡大率は百分率なので、300% = 3.0 です。

### `<webview>.setZoomLevel(level)`

* `level` Number - 拡大レベル。

指定レベルに拡大レベルを変更します。 原寸は 0 で、各増減分はそれぞれ 20% ずつの拡大または縮小を表し、デフォルトで元のサイズの 300% から 50% までに制限されています。 この式は `scale := 1.2 ^ level` です。

> **注意**: Chromium でのズームポリシーはドメインごとです。すなわち、特定ドメインのズームレベルは、同じドメインのウィンドウの全インスタンスに伝播します。 ウインドウの URL が別々であれば、ウインドウごとのズームになります。

### `<webview>.getZoomFactor()`

戻り値 `Number` - 現在の拡大率。

### `<webview>.getZoomLevel()`

戻り値 `Number` - 現在の拡大レベル。

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

戻り値 `Promise<void>`

ピンチによる拡大レベルの最大値と最小値を設定します。

### `<webview>.showDefinitionForSelection()` _macOS_

Shows pop-up dictionary that searches the selected word on the page.

### `<webview>.getWebContentsId()`

Returns `Number` - The WebContents ID of this `webview`.

## DOM Events

The following DOM events are available to the `webview` tag:

### Event: 'load-commit'

戻り値：

* `url` String
* `isMainFrame` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### イベント: 'did-finish-load'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

### イベント: 'did-fail-load'

戻り値：

* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

### イベント: 'did-frame-finish-load'

戻り値：

* `isMainFrame` Boolean

Fired when a frame has done navigation.

### イベント: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### イベント: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### イベント: 'dom-ready'

Fired when document in the given frame is loaded.

### イベント: 'page-title-updated'

戻り値：

* `title` String
* `explicitSet` Boolean

ナビゲーション中にページタイトルが設定されると発生します。 `explicitSet` は、タイトルがファイル URL から合成されている場合に false になります。

### イベント: 'page-favicon-updated'

戻り値：

* `favicons` String[] - URLの配列。

Fired when page receives favicon urls.

### イベント: 'enter-html-full-screen'

Fired when page enters fullscreen triggered by HTML API.

### イベント: 'leave-html-full-screen'

Fired when page leaves fullscreen triggered by HTML API.

### Event: 'console-message'

戻り値：

* `level` Integer - 0 から 3 のログレベル。 順に `verbose`、`info`、`warning`、`error` に対応します。
* `message` String - 実際のコンソールメッセージ
* `line` Integer - このコンソールメッセージのトリガーとなったソースの行番号
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

戻り値：

* `result` Object
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - アクティブなマッチの位置。
  * `matches` Integer - マッチの個数。
  * `selectionArea` Rectangle - 最初に一致した領域の座標。
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

### Event: 'new-window'

戻り値：

* `url` String
* `frameName` String
* `disposition` String - `default`、`foreground-tab`、`background-tab`、`new-window`、`save-to-disk`、`other` にできる。
* `options` BrowserWindowConstructorOptions - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.

```javascript
const { shell } = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', async (e) => {
  const protocol = (new URL(e.url)).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    await shell.openExternal(e.url)
  }
})
```

### イベント: 'will-navigate'

戻り値：

* `url` String

ユーザーまたはページがナビゲーションを開始しようとしたときに発生します。 `window.location` オブジェクトが変更されるか、ユーザがページ内のリンクをクリックしたときに発生することがあります。

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. これを意図する場合は `did-navigate-in-page` を使用して下さい。

Calling `event.preventDefault()` does __NOT__ have any effect.

### イベント: 'did-navigate'

戻り値：

* `url` String

Emitted when a navigation is done.

このイベントは、アンカーリンクのクリックや `window.location.hash` の更新のような、ページ内ナビゲーションでは発行されません。 これを意図する場合は `did-navigate-in-page` を使用して下さい。

### イベント: 'did-navigate-in-page'

戻り値：

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

### イベント: 'ipc-message'

戻り値：

* `channel` String
* `args` any[]

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

### Event: 'crashed'

Fired when the renderer process is crashed.

### イベント: 'plugin-crashed'

戻り値：

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

戻り値：

* `themeColor` String

ページのテーマカラーが変わったときに発生します。 This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

### イベント: 'update-target-url'

戻り値：

* `url` String

マウスをリンクにマウスオーバーしたり、キーボードでリンクにフォーカスしたときに発行されます。

### イベント: 'devtools-opened'

開発者向けツールが開かれたときに発行されます。

### イベント: 'devtools-closed'

開発者向けツールが閉じられたときに発行されます。

### イベント: 'devtools-focused'

開発者向けツールがフォーカスされた / 開かれたときに発行されます。

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[chrome-webview]: https://developer.chrome.com/docs/extensions/reference/webviewTag/
