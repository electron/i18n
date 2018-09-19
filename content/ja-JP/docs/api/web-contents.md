# webContents

> ウェブページを描画、制御します。

プロセス: [Main](../glossary.md#main-process)

`webContents` は [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) の一つです。 [`BrowserWindow`](browser-window.md) オブジェクトのプロパティには、ウェブページを描画し、制御する責任があります。 以下は、`webContents` オブジェクトにアクセスする例です。

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 1500})
win.loadURL('http://github.com')

let contents = win.webContents
console.log(contents)
```

## メソッド

これらのメソッドは、`webContents` モジュールからアクセスできます。

```javascript
const {webContents} = require('electron')
console.log(webContents)
```

### `webContents.getAllWebContents()`

戻り値 `WebContents[]` - すべての `WebContents` インスタンスの配列。 これには、すべてのウインドウ、開かれた開発者向けツール、開発者向けツールのバックグラウンド拡張のページが含まれます。

### `webContents.getFocusedWebContents()`

戻り値 `WebContents` - このアプリケーション内でフォーカス中の WebContents。無ければ `null`。

### `webContents.fromId(id)`

* `id` Integer

戻り値 `WebContents` - 指定した ID の WebContents インスタンス。

## クラス: WebContents

> BrowserWindow インスタンスのコンテンツを、描画し、制御します。

プロセス: [Main](../glossary.md#main-process)

### インスタンスイベント

#### イベント: 'did-finish-load'

ナビゲーションが終了した時、すなわち、タブのくるくるが止まったときや、`onload` イベントが送られた後に、発行されます。

#### イベント: 'did-fail-load'

戻り値:

* `event` Event
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

このイベントは `did-finish-load` のようですが、ロードが失敗した、キャンセルされた、`window.stop()` が呼び出されたなどで、発行されます。 エラーコードとその意味のすべてのリストは [こちら](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) です。

#### イベント: 'did-frame-finish-load'

戻り値:

* `event` Event
* `isMainFrame` Boolean

フレームのナビゲーションが終了したときに発行されます。

#### イベント: 'did-start-loading'

タブのくるくるが始まったタイミングに対応しています。

#### イベント: 'did-stop-loading'

タブのくるくるが止まったタイミングに対応しています。

#### Event: 'did-get-response-details'

戻り値:

* `event` Event
* `status` Boolean
* `newURL` String
* `originalURL` String
* `httpResponseCode` Integer
* `requestMethod` String
* `referrer` String
* `headers` Object
* `resourceType` String

Emitted when details regarding a requested resource are available. `status` indicates the socket connection to download the resource.

#### Event: 'did-get-redirect-request'

戻り値:

* `event` Event
* `oldURL` String
* `newURL` String
* `isMainFrame` Boolean
* `httpResponseCode` Integer
* `requestMethod` String
* `referrer` String
* `headers` Object

Emitted when a redirect is received while requesting a resource.

#### イベント: 'dom-ready'

戻り値:

* `event` Event

Emitted when the document in the given frame is loaded.

#### イベント: 'page-favicon-updated'

戻り値:

* `event` Event
* `favicons` String[] - URLの配列。

Emitted when page receives favicon urls.

#### イベント: 'new-window'

戻り値:

* `event` Event
* `url` String
* `frameName` String
* `disposition` String - `default`、`foreground-tab`、`background-tab`、`new-window`、`save-to-disk`、`other` にできる。
* `options` Object - The options which will be used for creating the new [`BrowserWindow`](browser-window.md).
* `additionalFeatures` String[] - The non-standard features (features not handled by Chromium or Electron) given to `window.open()`.

Emitted when the page requests to open a new window for a `url`. It could be requested by `window.open` or an external link like `<a target='_blank'>`.

By default a new `BrowserWindow` will be created for the `url`.

Calling `event.preventDefault()` will prevent Electron from automatically creating a new [`BrowserWindow`](browser-window.md). If you call `event.preventDefault()` and manually create a new [`BrowserWindow`](browser-window.md) then you must set `event.newGuest` to reference the new [`BrowserWindow`](browser-window.md) instance, failing to do so may result in unexpected behavior. 例:

```javascript
myBrowserWindow.webContents.on('new-window', (event, url) => {
  event.preventDefault()
  const win = new BrowserWindow({show: false})
  win.once('ready-to-show', () => win.show())
  win.loadURL(url)
  event.newGuest = win
})
```

#### イベント: 'will-navigate'

戻り値:

* `event` Event
* `url` String

ユーザまたはページがナビゲーションを開始したいときに発行されます。 `window.location` オブジェクトが変更されるか、ユーザがページ内のリンクをクリックしたときに発生します。

This event will not emit when the navigation is started programmatically with APIs like `webContents.loadURL` and `webContents.back`.

It is also not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` will prevent the navigation.

#### イベント: 'did-navigate'

戻り値:

* `event` Event
* `url` String

ナビゲーションが完了したときに発行されます。

このイベントは、アンカーリンクのクリックや `window.location.hash` の更新のような、ページ内ナビゲーションでは発行されません。これを意図する場合は `did-navigate-in-page` を使用して下さい。

#### イベント: 'did-navigate-in-page'

戻り値:

* `event` Event
* `url` String
* `isMainFrame` Boolean

ページ内ナビゲーションが発生したときに発行されます。

ページ内ナビゲーションが行われるとき、ページのURLは変更されますがページ外でのナビゲーションは発生しません。 これが発生する例は、アンカーリンクがクリックされたときや、DOM の `hashchange` イベントがトリガーされたときです。

#### イベント: 'will-prevent-unload'

戻り値:

* `event` Event

Emitted when a `beforeunload` event handler is attempting to cancel a page unload.

Calling `event.preventDefault()` will ignore the `beforeunload` event handler and allow the page to be unloaded.

```javascript
const {BrowserWindow, dialog} = require('electron')
const win = new BrowserWindow({width: 800, height: 600})
win.webContents.on('will-prevent-unload', (event) => {
  const choice = dialog.showMessageBox(win, {
    type: 'question',
    buttons: ['このページを離れる', 'キャンセル'],
    title: 'このサイトを離れてもよろしいですか?',
    message: '行った変更が保存されない可能性があります。',
    defaultId: 0,
    cancelId: 1
  })
  const leave = (choice === 0)
  if (leave) {
    event.preventDefault()
  }
})
```

#### イベント: 'crashed'

戻り値:

* `event` Event
* `killed` Boolean

Emitted when the renderer process crashes or is killed.

#### イベント: 'plugin-crashed'

戻り値:

* `event` Event
* `name` String
* `version` String

Emitted when a plugin process has crashed.

#### イベント: 'destroyed'

Emitted when `webContents` is destroyed.

#### Event: 'before-input-event'

戻り値:

* `event` Event
* `input` Object - プロパティ入力. 
  * `type` String - `keyUp` か `keyDown`。
  * `key` String - [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) と同等。
  * `code` String - [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) と同等。
  * `isAutoRepeat` Boolean - [KeyboardEvent.repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) と同等。
  * `shift` Boolean - [KeyboardEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) と同等。
  * `control` Boolean - [KeyboardEvent.controlKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) と同等。
  * `alt` Boolean - [KeyboardEvent.altKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) と同等。
  * `meta` Boolean - [KeyboardEvent.metaKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) と同等。

Emitted before dispatching the `keydown` and `keyup` events in the page. Calling `event.preventDefault` will prevent the page `keydown`/`keyup` events and the menu shortcuts.

To only prevent the menu shortcuts, use [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore-experimental):

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})

win.webContents.on('before-input-event', (event, input) => {
  // 例えば、Ctrl / Cmd が押下されているときのみ、
  // アプリケーションのメニューキーボードショートカットを有効にします。
  win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### イベント: 'devtools-opened'

開発者向けツールが開かれたときに発行されます。

#### イベント: 'devtools-closed'

開発者向けツールが閉じられたときに発行されます。

#### イベント: 'devtools-focused'

開発者向けツールがフォーカスされた / 開かれたときに発行されます。

#### イベント: 'certificate-error'

戻り値:

* `event` Event
* `url` String
* `error` String - エラーコード.
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function 
  * `isTrusted` Boolean - 証明書が信頼できるとみなされるかどうかを示す。

Emitted when failed to verify the `certificate` for `url`.

The usage is the same with [the `certificate-error` event of `app`](app.md#event-certificate-error).

#### イベント: 'select-client-certificate'

戻り値:

* `event` Event
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function 
  * `certificate` [Certificate](structures/certificate.md) - 指定されたリストの証明書でなければならない。

クライアント証明書が要求されたときに発生します。

The usage is the same with [the `select-client-certificate` event of `app`](app.md#event-select-client-certificate).

#### イベント: 'login'

戻り値:

* `event` Event
* `request` Object 
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Object 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String
  * `password` String

`webContents` がBasic認証を要求すると発生します。

The usage is the same with [the `login` event of `app`](app.md#event-login).

#### イベント: 'found-in-page'

戻り値:

* `event` Event
* `result` Object 
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - アクティブなマッチの位置。
  * `matches` Integer - マッチの個数。
  * `selectionArea` Object - 最初のマッチ領域の座標。
  * `finalUpdate` Boolean

Emitted when a result is available for [`webContents.findInPage`] request.

#### イベント: 'media-started-playing'

メディアの再生を開始するときに発行されます。

#### イベント: 'media-paused'

メディアが一時停止、または再生が終了したときに発行されます。

#### イベント: 'did-change-theme-color'

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

戻り値:

* `event` Event
* `color` (String | null) - '#rrggbb' のフォーマットのテーマカラー。テーマカラーが設定されていないと `null`。

#### イベント: 'update-target-url'

戻り値:

* `event` Event
* `url` String

マウスをリンクにマウスオーバーしたり、キーボードでリンクにフォーカスしたときに発行されます。

#### Event: 'cursor-changed'

戻り値:

* `event` Event
* `type` String
* `image` [NativeImage](native-image.md) (任意)
* `scale` Float (任意) - カスタムカーソルの拡大率。
* `size` [Size](structures/size.md) (任意) - `image` のサイズ。
* `hotspot` [Point](structures/point.md) (任意) - カスタムカーソルのホットスポットの座標。

Emitted when the cursor's type changes. The `type` parameter can be `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` or `custom`.

If the `type` parameter is `custom`, the `image` parameter will hold the custom cursor image in a [`NativeImage`](native-image.md), and `scale`, `size` and `hotspot` will hold additional information about the custom cursor.

#### Event: 'context-menu'

戻り値:

* `event` Event
* `params` Object 
  * `x` Integer - x 座標.
  * `y` Integer - y 座標.
  * `linkURL` String - コンテキストメニューが呼び出されたノードを囲うリンク URL。
  * `linkText` String - リンクに関連付けられたテキスト。リンクのコンテンツが画像の場合、空文字列になる。
  * `pageURL` String - コンテキストメニューが呼び出された最上位のページの URL。
  * `frameURL` String - コンテキストメニューが呼び出されたサブフレームの URL。
  * `srcURL` String - コンテキストメニューが呼び出された要素のソース URL。ソース URL を持つ要素は、img、audio、video です。
  * `mediaType` String - コンテキストメニューが呼び出されたノードの種類。 `none`、`image`、`audio`、`video`、`canvas`、`file`、`plugin` になれる。
  * `hasImageContents` Boolean - 空でないコンテンツ画像の上でコンテキストメニューが呼び出されたかどうか。
  * `isEditable` Boolean - コンテキストが編集可能かどうか。
  * `selectionText` String - コンテキストメニューが呼び出されたときの選択テキスト。
  * `titleText` String - コンテキストが呼び出されたときの選択要素の、タイトルまたは alt テキスト。
  * `misspelledWord` String - カーソルの下のスペルミスした単語 (もしあるならば)。
  * `frameCharset` String - メニューが呼び出されたときのフレームのテキストエンコーディング。
  * `inputFieldType` String - 入力フィールド内でコンテキストメニューが呼び出されたときの、そのタイプ。 `none`、`plainText`、`password`、`other` になれる。
  * `menuSourceType` String - コンテキストメニューが呼び出されたときの入力ソース。`none`、`mouse`、`keyboard`、`touch` または `touchMenu` にできます。
  * `mediaFlags` Object - コンテキストメニューが呼び出されたメディア要素のフラグ。 
    * `inError` Boolean - メディア要素がクラッシュしたかどうか。
    * `isPaused` Boolean - メディア要素が一時停止されているかどうか。
    * `isMuted` Boolean - メディア要素がミュートされているかどうか。
    * `hasAudio` Boolean - メディア要素に音声があるかどうか。
    * `isLooping` Boolean - メディア要素をループしているかどうか。
    * `isControlsVisible` Boolean - メディア要素のコントロールが見えるかどうか。
    * `canToggleControls` Boolean - メディア要素のコントロールがトグル切り替えできるかどうか。
    * `canRotate` Boolean - メディア要素を回転できるかどうか。
  * `editFlags` Object - これらのフラグは、レンダラーが対応するアクションを実行できると信頼しているかどうかを示す。 
    * `canUndo` Boolean - レンダラーが、undo できると信頼しているかどうか。
    * `canUndo` Boolean - レンダラーが、redo できると信頼しているかどうか。
    * `canCut` Boolean - レンダラーが、カットできると信頼しているかどうか。
    * `canCopy` Boolean - レンダラーが、コピーできると信頼しているかどうか。
    * `canPaste` Boolean - レンダラーが、ペーストできると信頼しているかどうか。
    * `canDelete` Boolean - レンダラーが、削除できると信頼しているかどうか。
    * `canSelectAll` Boolean - レンダラーが、全選択できると信頼しているかどうか。

Emitted when there is a new context menu that needs to be handled.

#### Event: 'select-bluetooth-device'

戻り値:

* `event` Event
* `devices` [BluetoothDevice[]](structures/bluetooth-device.md)
* `callback` Function 
  * `deviceId` String

Emitted when bluetooth device needs to be selected on call to `navigator.bluetooth.requestDevice`. To use `navigator.bluetooth` api `webBluetooth` should be enabled. If `event.preventDefault` is not called, first available device will be selected. `callback` should be called with `deviceId` to be selected, passing empty string to `callback` will cancel the request.

```javascript
const {app, webContents} = require('electron')
app.commandLine.appendSwitch('enable-web-bluetooth')

app.on('ready', () => {
  webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    let result = deviceList.find((device) => {
      return device.deviceName === 'test'
    })
    if (!result) {
      callback('')
    } else {
      callback(result.deviceId)
    }
  })
})
```

#### Event: 'paint'

戻り値:

* `event` Event
* `dirtyRect` [Rectangle](structures/rectangle.md)
* `image` [NativeImage](native-image.md) - フレーム全体の画像データ。

Emitted when a new frame is generated. Only the dirty area is passed in the buffer.

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({webPreferences: {offscreen: true}})
win.webContents.on('paint', (event, dirty, image) => {
  // updateBitmap(dirty, image.getBitmap())
})
win.loadURL('http://github.com')
```

#### Event: 'devtools-reload-page'

Emitted when the devtools window instructs the webContents to reload

#### Event: 'will-attach-webview'

戻り値:

* `event` Event
* `webPreferences` Object - ゲストページで使用されるウェブ環境設定。ゲストページの設定を調節するために変更できる。
* `params` Object - `src` URL のような、その他の `<webview>` パラメータ。このオブジェクトはゲストページの設定を調節するために変更できる。

Emitted when a `<webview>`'s web contents is being attached to this web contents. Calling `event.preventDefault()` will destroy the guest page.

This event can be used to configure `webPreferences` for the `webContents` of a `<webview>` before it's loaded, and provides the ability to set settings that can't be set via `<webview>` attributes.

**Note:** The specified `preload` script option will be appear as `preloadURL` (not `preload`) in the `webPreferences` object emitted with this event.

#### Event: 'did-attach-webview'

戻り値:

* `event` Event
* `webContents` WebContents - `<webview>` で使われるゲスト WebContents。

Emitted when a `<webview>` has been attached to this web contents.

#### Event: 'console-message'

戻り値:

* `level` Integer
* `message` String
* `line` Integer
* `sourceId` String

Emitted when the associated window logs a console message. Will not be emitted for windows with *offscreen rendering* enabled.

### インスタンスメソッド

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Object (任意) 
  * `httpReferrer` String (任意) - HTTPリファラのURL。
  * `userAgent` String (任意) - リクエスト元のユーザーエージェント。
  * `extraHeaders` String (任意) - "\n" で区切られた追加のヘッダー。
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (任意)
  * `baseURLForDataURL` String (任意) - データURLによってロードされたファイルの (最後のパス区切り文字を含む) ベースURL。 これは指定された `url` がデータURLで、他のファイルをロードする必要がある場合のみ必要です。

Loads the `url` in the window. The `url` must contain the protocol prefix, e.g. the `http://` or `file://`. If the load should bypass http cache then use the `pragma` header to achieve it.

```javascript
const {webContents} = require('electron')
const options = {extraHeaders: 'pragma: no-cache\n'}
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath)`

* `filePath` String

Loads the given file in the window, `filePath` should be a path to an HTML file relative to the root of your application. For instance an app structure like this:

```sh
| root
| - package.json
| - src
|   - main.js
|   - index.html
```

Would require code like this

```js
win.loadFile('src/index.html')
```

#### `contents.downloadURL(url)`

* `url` String

Initiates a download of the resource at `url` without navigating. The `will-download` event of `session` will be triggered.

#### `contents.getURL()`

Returns `String` - The URL of the current web page.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

let currentURL = win.webContents.getURL()
console.log(currentURL)
```

#### `contents.getTitle()`

Returns `String` - The title of the current web page.

#### `contents.isDestroyed()`

Returns `Boolean` - Whether the web page is destroyed.

#### `contents.focus()`

Focuses the web page.

#### `contents.isFocused()`

Returns `Boolean` - Whether the web page is focused.

#### `contents.isLoading()`

Returns `Boolean` - Whether web page is still loading resources.

#### `contents.isLoadingMainFrame()`

Returns `Boolean` - Whether the main frame (and not just iframes or frames within it) is still loading.

#### `contents.isWaitingForResponse()`

Returns `Boolean` - Whether the web page is waiting for a first-response from the main resource of the page.

#### `contents.stop()`

保留中のナビゲーションを停止します。

#### `contents.reload()`

Reloads the current web page.

#### `contents.reloadIgnoringCache()`

Reloads current page and ignores cache.

#### `contents.canGoBack()`

Returns `Boolean` - Whether the browser can go back to previous web page.

#### `contents.canGoForward()`

Returns `Boolean` - Whether the browser can go forward to next web page.

#### `contents.canGoToOffset(offset)`

* `offset` Integer

Returns `Boolean` - Whether the web page can go to `offset`.

#### `contents.clearHistory()`

ナビゲーション履歴を消去します。

#### `contents.goBack()`

Makes the browser go back a web page.

#### `contents.goForward()`

Makes the browser go forward a web page.

#### `contents.goToIndex(index)`

* `index` Integer

Navigates browser to the specified absolute web page index.

#### `contents.goToOffset(offset)`

* `offset` Integer

現在のエントリから指定したオフセットへナビゲーションします。

#### `contents.isCrashed()`

戻り値 `Boolean` - レンダラープロセスがクラッシュしたかどうか。

#### `contents.setUserAgent(userAgent)`

* `userAgent` String

Overrides the user agent for this web page.

#### `contents.getUserAgent()`

Returns `String` - The user agent for this web page.

#### `contents.insertCSS(css)`

* `css` String

Injects CSS into the current web page.

#### `contents.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (任意) - 省略値は `false`。
* `callback` Function (任意) - スクリプトが実行されたあとに呼ばれる。 
  * `result` Any

戻り値 `Promise` - 実行されたコードの結果で解決される Promise、またはコードの結果が拒否された Promise である場合の拒否された Promise。

ページ内の `code` を評価します。

ブラウザウインドウでは、`requestFullScreen` のような、いくつかの HTML API は、ユーザからのジェスチャーでのみ呼び出されます。 `userGesture` を `true` にセットすることでこの制限がなくなります。

If the result of the executed code is a promise the callback result will be the resolved value of the promise. We recommend that you use the returned Promise to handle code that results in a Promise.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // フェッチ呼び出しの JSON オブジェクトになります
  })
```

#### `contents.setIgnoreMenuShortcuts(ignore)` *Experimental*

* `ignore` Boolean

Ignore application menu shortcuts while this web contents is focused.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Mute the audio on the current web page.

#### `contents.isAudioMuted()`

Returns `Boolean` - Whether this page has been muted.

#### `contents.setZoomFactor(factor)`

* `factor` Number - 拡大率。

指定の倍率に拡大率を変更します。拡大率は百分率なので、300% = 3.0 です。

#### `contents.getZoomFactor(callback)`

* `callback` Function 
  * `zoomFactor` Number

Sends a request to get current zoom factor, the `callback` will be called with `callback(zoomFactor)`.

#### `contents.setZoomLevel(level)`

* `level` Number - 拡大レベル。

指定レベルに拡大レベルを変更します。 原寸は 0 で、各増減分はそれぞれ 20% ずつの拡大または縮小を表し、デフォルトで元のサイズの 300% から 50% までに制限されています。 The formula for this is `scale := 1.2 ^ level`.

#### `contents.getZoomLevel(callback)`

* `callback` Function 
  * `zoomLevel` Number

Sends a request to get current zoom level, the `callback` will be called with `callback(zoomLevel)`.

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

ピンチによる拡大レベルの最大値と最小値を設定します。

#### `contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

レイアウトベースな (つまり Visual ではない) 拡大レベルの最大値と最小値を設定します。

#### `contents.undo()`

Executes the editing command `undo` in web page.

#### `contents.redo()`

Executes the editing command `redo` in web page.

#### `contents.cut()`

Executes the editing command `cut` in web page.

#### `contents.copy()`

Executes the editing command `copy` in web page.

#### `contents.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Copy the image at the given position to the clipboard.

#### `contents.paste()`

Executes the editing command `paste` in web page.

#### `contents.pasteAndMatchStyle()`

Executes the editing command `pasteAndMatchStyle` in web page.

#### `contents.delete()`

Executes the editing command `delete` in web page.

#### `contents.selectAll()`

Executes the editing command `selectAll` in web page.

#### `contents.unselect()`

Executes the editing command `unselect` in web page.

#### `contents.replace(text)`

* `text` String

Executes the editing command `replace` in web page.

#### `contents.replaceMisspelling(text)`

* `text` String

Executes the editing command `replaceMisspelling` in web page.

#### `contents.insertText(text)`

* `text` String

フォーカスされた要素に `text` を挿入します。

#### `contents.findInPage(text[, options])`

* `text` String - 検索するコンテンツ。空にしてはいけません。
* `options` Object (任意) 
  * `forward` Boolean (任意) - 前方または後方を検索するかどうか。省略値は `true`。
  * `findNext` Boolean (任意) - 操作が最初のリクエストなのか、辿っているのかどうか。省略値は `false`。
  * `matchCase` Boolean (任意) - 大文字と小文字を区別する検索かどうか。省略値は `false`。
  * `wordStart` Boolean (任意) - 単語の始めだけを見るかどうか。省略値は `false`。
  * `medialCapitalAsWordStart` Boolean (任意) - `wordStart` と組み合わせたとき、マッチの途中が大文字で始まり、小文字や記号が続く場合に、それを受け入れるかどうか。 他のいくつかの単語内一致を受け入れる。省略値は `false`。

戻り値 `Integer` - リクエストに使われたリクエスト ID。

ウェブページ内の `text` のすべてのマッチを探すリクエストを開始します。 The result of the request can be obtained by subscribing to [`found-in-page`](web-contents.md#event-found-in-page) event.

#### `contents.stopFindInPage(action)`

* `action` String - [`webContents.findInPage`] リクエストを終了するときに実行するアクションを指定する。 
  * `clearSelection` - 選択を消去する。
  * `keepSelection` - その選択を通常の選択に変換する。
  * `activateSelection` - 選択ノードをフォーカスして、クリックする。

Stops any `findInPage` request for the `webContents` with the provided `action`.

```javascript
const {webContents} = require('electron')
webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```

#### `contents.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (任意) - キャプチャするページ内の領域。
* `callback` Function 
  * `image` [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Upon completion `callback` will be called with `callback(image)`. The `image` is an instance of [NativeImage](native-image.md) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.

#### `contents.hasServiceWorker(callback)`

* `callback` Function 
  * `hasWorker` Boolean

Checks if any ServiceWorker is registered and returns a boolean as response to `callback`.

#### `contents.unregisterServiceWorker(callback)`

* `callback` Function 
  * `success` Boolean

Unregisters any ServiceWorker if present and returns a boolean as response to `callback` when the JS promise is fulfilled or false when the JS promise is rejected.

#### `contents.getPrinters()`

Get the system printer list.

Returns [`PrinterInfo[]`](structures/printer-info.md).

#### `contents.print([options], [callback])`

* `options` Object (任意) 
  * `silent` Boolean (任意) - プリンタの設定をユーザに尋ねないかどうか。省略値は `false`。
  * `printBackground` Boolean (任意) - ウェブページの背景色と画像も印刷するかどうか。省略値は `false`。
  * `deviceName` String (任意) - 使用するプリンタデバイスの名前。省略値は `''`。
* `callback` Function (任意) 
  * `success` Boolean - 印刷呼び出しの成功を示す。

Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Calling `window.print()` in web page is equivalent to calling `webContents.print({silent: false, printBackground: false, deviceName: ''})`.

Use `page-break-before: always;` CSS style to force to print to a new page.

#### `contents.printToPDF(options, callback)`

* `options` Object 
  * `marginsType` Integer (任意) - 使用するマージンの種類を指定する。デフォルトマージンには 0 を、マージン無しには 1 を、最小マージンには 2 を使用する。
  * `pageSize` String (任意) - 生成する PDF のページサイズを指定する。 `A3`、`A4`、`A5`、`Legal`、`Letter`、`Tabloid`、またはミクロン単位の `width` と `height` を含む Object にできる。
  * `printBackground` Boolean (任意) - CSS 背景を印刷するかどうか。
  * `printSelectionOnly` Boolean (任意) - 選択部分だけを印刷するかどうか。
  * `landscape` Boolean (任意) - `true` で横向き、`false` で縦向き。
* `callback` Function 
  * `error` Error
  * `data` Buffer

Prints window's web page as PDF with Chromium's preview printing custom settings.

The `callback` will be called with `callback(error, data)` on completion. The `data` is a `Buffer` that contains the generated PDF data.

The `landscape` will be ignored if `@page` CSS at-rule is used in the web page.

By default, an empty `options` will be regarded as:

```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false
}
```

Use `page-break-before: always;` CSS style to force to print to a new page.

An example of `webContents.printToPDF`:

```javascript
const {BrowserWindow} = require('electron')
const fs = require('fs')

let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // デフォルトの印刷オプションを使用する
  win.webContents.printToPDF({}, (error, data) => {
    if (error) throw error
    fs.writeFile('/tmp/print.pdf', data, (error) => {
      if (error) throw error
      console.log('正常にPDFを書き込みました。')
    })
  })
})
```

#### `contents.addWorkSpace(path)`

* `path` String

Adds the specified path to DevTools workspace. Must be used after DevTools creation:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.webContents.on('devtools-opened', () => {
  win.webContents.addWorkSpace(__dirname)
})
```

#### `contents.removeWorkSpace(path)`

* `path` String

Removes the specified path from DevTools workspace.

#### `contents.setDevToolsWebContents(devToolsWebContents)`

* `devToolsWebContents` WebContents

Uses the `devToolsWebContents` as the target `WebContents` to show devtools.

The `devToolsWebContents` must not have done any navigation, and it should not be used for other purposes after the call.

By default Electron manages the devtools by creating an internal `WebContents` with native view, which developers have very limited control of. With the `setDevToolsWebContents` method, developers can use any `WebContents` to show the devtools in it, including `BrowserWindow`, `BrowserView` and `<webview>` tag.

Note that closing the devtools does not destroy the `devToolsWebContents`, it is caller's responsibility to destroy `devToolsWebContents`.

An example of showing devtools in a `<webview>` tag:

```html
<html>
<head>
  <style type="text/css">

    * { margin: 0; }
    #browser { height: 70%; }
    #devtools { height: 30%; }
  </style>
</head>
<body>
  <webview id="browser" src="https://github.com"></webview>
  <webview id="devtools"></webview>
  <script>
    const browserView = document.getElementById('browser')
    const devtoolsView = document.getElementById('devtools')
    browserView.addEventListener('dom-ready', () => {
      const browser = browserView.getWebContents()
      browser.setDevToolsWebContents(devtoolsView.getWebContents())
      browser.openDevTools()
    })
  </script>
</body>
</html>
```

An example of showing devtools in a `BrowserWindow`:

```js
const {app, BrowserWindow} = require('electron')

let win = null
let devtools = null

app.once('ready', () => {
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({mode: 'detach'})
})
```

#### `contents.openDevTools([options])`

* `options` Object (任意) 
  * `mode` String - 指定したドック状態で開発者向けツールを開く。`right`、`bottom`、`undocked`、`detach` にできる。 省略値は最後に使用したときのドック状態。 `undocked` モードではドックを後ろにやれる。 `detach` モードではできない。

Opens the devtools.

When `contents` is a `<webview>` tag, the `mode` would be `detach` by default, explicitly passing an empty `mode` can force using last used dock state.

#### `contents.closeDevTools()`

Closes the devtools.

#### `contents.isDevToolsOpened()`

Returns `Boolean` - Whether the devtools is opened.

#### `contents.isDevToolsFocused()`

Returns `Boolean` - Whether the devtools view is focused .

#### `contents.toggleDevTools()`

Toggles the developer tools.

#### `contents.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`).

#### `contents.inspectServiceWorker()`

Opens the developer tools for the service worker context.

#### `contents.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

`channel` を介してレンダラープロセスに非同期メッセージを送信します。任意の引数を送ることもできます。 引数は内部で JSON にシリアライズされるので、関数やプロトタイプチェーンは含まれません。

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

An example of sending messages from the main process to the renderer process:

```javascript
// メインプロセス
const {app, BrowserWindow} = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', 'whoooooooh!')
  })
})
```

```html
<!-- index.html -->
<html>
<body>
  <script>
    require('electron').ipcRenderer.on('ping', (event, message) => {
      console.log(message)  // 'whoooooooh!' と出力
    })
  </script>
</body>
</html>
```

#### `contents.enableDeviceEmulation(parameters)`

* `parameters` Object 
  * `screenPosition` String - エミュレートする画面のタイプの指定 (省略値: `desktop`): 
    * `desktop` - デスクトップ画面タイプ.
    * `mobile` - モバイル画面タイプ.
  * `screenSize` [Size](structures/size.md) - エミュレートされる画面サイズの設定 (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - スクリーン上のビューの位置 (screenPosition == mobile) (省略値: `{x: 0, y: 0}`).
  * `deviceScaleFactor` Integer - デバイスの拡大率の設定 (ゼロなら元々のデバイスの拡大率) (省略値: `0`).
  * `screenSize` [Size](structures/size.md) - エミュレートされるビューのサイズの設定 (空は上書きしないことを意味する)
  * `scale` Float - 有効なスペース内のエミュレートするビューの拡大率。 (表示モードにフィットしない) (省略値: `1`).

Enable device emulation with the given parameters.

#### `contents.disableDeviceEmulation()`

Disable device emulation enabled by `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(event)`

* `event` Object 
  * `type` String (**必須**) - イベントのタイプ。`mouseDown`、`mouseUp`、`mouseEnter`、`mouseLeave`、`contextMenu`、`mouseWheel`、`mouseMove`、`keyDown`、`keyUp` または `char` にできる。
  * `modifiers` String[] - イベントの修飾子の配列。`shift`、`control`、`alt`、`meta`、`isKeypad`、`isAutoRepeat`、`leftButtonDown`、`middleButtonDown`、`rightButtonDown`、`capsLock`、`numLock`、`left`、`right` を含めることができる。

入力 `event` をページに送ります。 **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.

For keyboard events, the `event` object also have following properties:

* `keyCode` String (**必須**) - キーボードイベントとして送られる文字。[Accelerator](accelerator.md) で有効なキーコードのみを使用しなければいけません。

For mouse events, the `event` object also have following properties:

* `x` Integer (**必須**)
* `y` Integer (**必須**)
* `button` String - 押されたボタン。`left`、`middle`、`right` にできる。
* `globalX` Integer
* `globalY` Integer
* `movementX` Integer
* `movementY` Integer
* `clickCount` Integer

For the `mouseWheel` event, the `event` object also have following properties:

* `deltaX` Integer
* `deltaY` Integer
* `wheelTicksX` Integer
* `wheelTicksY` Integer
* `accelerationRatioX` Integer
* `accelerationRatioY` Integer
* `hasPreciseScrollingDeltas` Boolean
* `canScroll` Boolean

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (任意) - 省略値は `false`。
* `callback` Function 
  * `frameBuffer` Buffer
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(frameBuffer, dirtyRect)` when there is a presentation event.

The `frameBuffer` is a `Buffer` that contains raw pixel data. On most machines, the pixel data is effectively stored in 32bit BGRA format, but the actual representation depends on the endianness of the processor (most modern processors are little-endian, on machines with big-endian processors the data is in 32bit ARGB format).

The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. If `onlyDirty` is set to `true`, `frameBuffer` will only contain the repainted area. `onlyDirty` defaults to `false`.

#### `contents.endFrameSubscription()`

End subscribing for frame presentation events.

#### `contents.startDrag(item)`

* `item` Object 
  * `file` String 又は `files` Array - ドラッグが開始されたファイルへのパス。
  * `icon` [NativeImage](native-image.md) - macOS では空にできない画像。

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.

#### `contents.savePage(fullPath, saveType, callback)`

* `fullPath` String - 完全なファイルパス。
* `saveType` String - 保存タイプの指定。 
  * `HTMLOnly` - ページの HTML だけを保存する。
  * `HTMLComplete` - 完全な HTML ページを保存する。
  * `MHTML` - MHTML として完全な HTML ページを保存する。
* `callback` Function - `(error) => {}`. 
  * `error` Error

Returns `Boolean` - true if the process of saving page has been initiated successfully.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete', (error) => {
    if (!error) console.log('ページ保存成功')
  })
})
```

#### `contents.showDefinitionForSelection()` *macOS*

ページ上の選択された単語を検索するポップアップ辞書を表示します。

#### `contents.setSize(options)`

Set the size of the page. This is only supported for `<webview>` guest contents.

* `options` Object 
  * `enableAutoSize` Boolean (optional) - true to make the webview container automatically resize within the bounds specified by the attributes normal, min and max.
  * `normal` [Size](structures/size.md) (optional) - Normal size of the page. This can be used in combination with the [`disableguestresize`](webview-tag.md#disableguestresize) attribute to manually resize the webview guest contents.
  * `min` [Size](structures/size.md) (optional) - Minimum size of the page. This can be used in combination with the [`disableguestresize`](webview-tag.md#disableguestresize) attribute to manually resize the webview guest contents.
  * `max` [Size](structures/size.md) (optional) - Maximium size of the page. This can be used in combination with the [`disableguestresize`](webview-tag.md#disableguestresize) attribute to manually resize the webview guest contents.

#### `contents.isOffscreen()`

Returns `Boolean` - Indicates whether *offscreen rendering* is enabled.

#### `contents.startPainting()`

If *offscreen rendering* is enabled and not painting, start painting.

#### `contents.stopPainting()`

If *offscreen rendering* is enabled and painting, stop painting.

#### `contents.isPainting()`

Returns `Boolean` - If *offscreen rendering* is enabled returns whether it is currently painting.

#### `contents.setFrameRate(fps)`

* `fps` Integer

If *offscreen rendering* is enabled sets the frame rate to the specified number. Only values between 1 and 60 are accepted.

#### `contents.getFrameRate()`

Returns `Integer` - If *offscreen rendering* is enabled returns the current frame rate.

#### `contents.invalidate()`

Schedules a full repaint of the window this web contents is in.

If *offscreen rendering* is enabled invalidates the frame and generates a new one through the `'paint'` event.

#### `contents.getWebRTCIPHandlingPolicy()`

Returns `String` - Returns the WebRTC IP Handling Policy.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` String - Specify the WebRTC IP Handling Policy. 
  * `default` - Exposes user's public and local IPs. This is the default behavior. When this policy is used, WebRTC has the right to enumerate all interfaces and bind them to discover public interfaces.
  * `default_public_interface_only` - Exposes user's public IP, but does not expose user's local IP. When this policy is used, WebRTC should only use the default route used by http. This doesn't expose any local addresses.
  * `default_public_and_private_interfaces` - Exposes user's public and local IPs. When this policy is used, WebRTC should only use the default route used by http. This also exposes the associated default private address. Default route is the route chosen by the OS on a multi-homed endpoint.
  * `disable_non_proxied_udp` - Does not expose public or local IPs. When this policy is used, WebRTC should only use TCP to contact peers or servers unless the proxy server supports UDP.

Setting the WebRTC IP handling policy allows you to control which IPs are exposed via WebRTC. See [BrowserLeaks](https://browserleaks.com/webrtc) for more details.

#### `contents.getOSProcessId()`

Returns `Integer` - The `pid` of the associated renderer process.

### インスタンスプロパティ

#### `contents.id`

A `Integer` representing the unique ID of this WebContents.

#### `contents.session`

A [`Session`](session.md) used by this webContents.

#### `contents.hostWebContents`

A [`WebContents`](web-contents.md) instance that might own this `WebContents`.

#### `contents.devToolsWebContents`

A `WebContents` of DevTools for this `WebContents`.

**Note:** Users should never store this object because it may become `null` when the DevTools has been closed.

#### `contents.debugger`

A [Debugger](debugger.md) instance for this webContents.