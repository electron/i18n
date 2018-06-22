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

#### イベント: 'did-get-response-details'

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

要求されたリソースに関する詳細が利用可能なときに発行されます。`status` はリソースをダウンロードするためのソケット接続状態を示します。

#### イベント: 'did-get-redirect-request'

戻り値:

* `event` Event
* `oldURL` String
* `newURL` String
* `isMainFrame` Boolean
* `httpResponseCode` Integer
* `requestMethod` String
* `referrer` String
* `headers` Object

リソースのリクエスト中にリダイレクトを受けたときに発行されます。

#### イベント: 'dom-ready'

戻り値:

* `event` Event

指定のフレームの document が読み込まれたときに発行されます。

#### イベント: 'page-favicon-updated'

戻り値:

* `event` Event
* `favicons` String[] - URLの配列。

ページがファビコンの URL を受け取ると発行されます。

#### イベント: 'new-window'

戻り値:

* `event` Event
* `url` String
* `frameName` String
* `disposition` String - `default`、`foreground-tab`、`background-tab`、`new-window`、`save-to-disk`、`other` にできる。
* `options` Object - 新しい [`BrowserWindow`](browser-window.md) を作成するのに使われるオプション。
* `additionalFeatures` String[] - `window.open()` に与えられている、標準でない機能 (Chromium や Electron によって処理されない機能)。

ページが `url` の新しいウインドウを開くリクエストをするときに発行されます。`window.open` か `<a target='_blank'>` のようなリンクによってリクエストされる可能があります。

デフォルトでは、`url` の新しい `BrowserWindow` が作成されます。

`event.preventDefault()` を呼ぶと、Electron が自動的に新しい [`BrowserWindow`](browser-window.md) を作成するのを防ぎます。 もし `event.preventDefault()` を呼び、新しい `BrowserWindow` を手動で作る場合、新しい [`BrowserWindow`](browser-window.md) インスタンスの参照を [`event.newGuest`](browser-window.md) にセットしなければ、予期しない動作になる可能性があります。 例:

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

このイベントは、 `webContents.loadURL` や `webContents.back` のような API によって、プログラム上から開始されるナビゲーションのときには発行されません。

アンカーリンクのクリックや `window.location.hash` の更新のような、ページ内ナビゲーションでも発行されません。これを意図する場合は `did-navigate-in-page` を使用して下さい。

`event.preventDefault()` を呼ぶとナビゲーションが阻害されます。

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

`beforeunload` イベントハンドラがページのアンロードをキャンセルしようとしたときに発行されます。

`event.preventDefault()` を呼ぶと、`beforeunload` イベントハンドラが無視され、 ページをアンロードできます。

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

レンダラープロセスがクラッシュしたり、強制終了されたりしたときに発行されます。

#### イベント: 'plugin-crashed'

戻り値:

* `event` Event
* `name` String
* `version` String

プラグインプロセスがクラッシュしたときに発行されます。

#### イベント: 'destroyed'

`webContents` が破棄されたときに発生します。

#### イベント: 'before-input-event'

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

ページ内の `keydown` と `keyup` イベントが発生する直前に発行されます。 `event.preventDefault` を呼ぶと、ページの `keydown`/`keyup` イベントとメニューショートカットを阻害します。

メニューショートカットだけを阻害するには、[`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore-experimental) を使用します。

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

`url` の `certificate` の認証に失敗したときに発行されます。

使い方は、[`app` の `certificate-error` イベント](app.md#event-certificate-error) と同じです。

#### イベント: 'select-client-certificate'

戻り値:

* `event` Event
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function 
  * `certificate` [Certificate](structures/certificate.md) - 指定されたリストの証明書でなければならない。

クライアント証明書が要求されたときに発生します。

使い方は、[`app` の `select-client-certificate` イベント](app.md#event-select-client-certificate) と同じです。

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

使い方は、[`app` の `login` イベント](app.md#event-login) と同じです。

#### イベント: 'found-in-page'

戻り値:

* `event` Event
* `result` Object 
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - アクティブなマッチの位置。
  * `matches` Integer - マッチの個数。
  * `selectionArea` Object - 最初のマッチ領域の座標。
  * `finalUpdate` Boolean

[`webContents.findINPage`] リクエストの結果が有効なときに発行されます。

#### イベント: 'media-started-playing'

メディアの再生を開始するときに発行されます。

#### イベント: 'media-paused'

メディアが一時停止、または再生が終了したときに発行されます。

#### イベント: 'did-change-theme-color'

ページのテーマカラーが変更されたときに発行されます。これはよく、このような meta タグによって発生します。

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

#### イベント: 'cursor-changed'

戻り値:

* `event` Event
* `type` String
* `image` [NativeImage](native-image.md) (任意)
* `scale` Float (任意) - カスタムカーソルの拡大率。
* `size` [Size](structures/size.md) (任意) - `image` のサイズ。
* `hotspot` [Point](structures/point.md) (任意) - カスタムカーソルのホットスポットの座標。

カーソルの種類が変更されたときに発行されます。 `type` は `default`、`crosshair`、`pointer`、`text`、`wait`、`help`、`e-resize`、`n-resize`,`ne-resize`、`nw-resize`、`s-resize`、`se-resize`、`sw-resize`、`w-resize`,`ns-resize`、`ew-resize`、`nesw-resize`、`nwse-resize`、`col-resize`,`row-resize`、`m-panning`、`e-panning`、`n-panning`、`ne-panning`、`nw-panning`,`s-panning`、`se-panning`、`sw-panning`、`w-panning`、`move`、`vertical-text`,`cell`、`context-menu`、`alias`、`progress`、`nodrop`、`copy`、`none`,`not-allowed`、`zoom-in`、`zoom-out`、`grab`、`grabbing`、`custom` になれます。

もし `type` パラメータが `custom` の場合、`image` パラメータはカスタムカーソルの [`NativeImage`](native-image.md) を、`scale`、`size`、`hotspot` はカスタムカーソルについての追加の情報を持ちます。

#### イベント: 'context-menu'

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

処理が必要な新しいコンテキストメニューがあるときに発行されます。

#### イベント: 'select-bluetooth-device'

戻り値:

* `event` Event
* `devices` [BluetoothDevice[]](structures/bluetooth-device.md)
* `callback` Function 
  * `deviceId` String

`navigator.bluetooth.requestDevice` を呼ぶうえで、Bluetooth デバイスを選択する必要があるときに発行されます。 `navigator.bluetooth` を使用するには、`webBluetooth` API を有効にする必要があります。 もし `event.preventDefault` が呼ばれなければ、最初に有効なデバイスが選択されます。 `callback` は選択された `deviceId` で呼ばれます。リクエストがキャンセルされると、`callbback` に空文字列が渡されます。

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

#### イベント: 'paint'

戻り値:

* `event` Event
* `dirtyRect` [Rectangle](structures/rectangle.md)
* `image` [NativeImage](native-image.md) - フレーム全体の画像データ。

新しいフレームが生成されたときに発行されます。操作した領域のみがバッファに渡されます。

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({webPreferences: {offscreen: true}})
win.webContents.on('paint', (event, dirty, image) => {
  // updateBitmap(dirty, image.getBitmap())
})
win.loadURL('http://github.com')
```

#### イベント: 'devtools-reload-page'

開発者向けツールウインドウが webContents にリロードを指示したときに発行されます。

#### イベント: 'will-attach-webview'

戻り値:

* `event` Event
* `webPreferences` Object - ゲストページで使用されるウェブ環境設定。ゲストページの設定を調節するために変更できる。
* `params` Object - `src` URL のような、その他の `<webview>` パラメータ。このオブジェクトはゲストページの設定を調節するために変更できる。

`<webview>` の webContents がこの webContents に適用されようとしているときに発行されます。`event.preventDefault()` を呼ぶとゲストページを破棄します。

このイベントは、 `webContents` の `<webview>` が読み込まれる前に `webPreferences` を設定するのに使用でき、`<webview>` の属性を通して設定できない設定を、設定する機能を提供します。

**注釈:** 指定された `preload` スクリプトオプションは、このイベントが発行された `webPreferences` オブジェクト内の、`preloadURL` (`preload` ではない) として現れます。

#### イベント: 'did-attach-webview'

戻り値:

* `event` Event
* `webContents` WebContents - `<webview>` で使われるゲスト WebContents。

`<webview>` がこの webContents に適用されたときに発行されます。

#### イベント: 'console-message'

戻り値:

* `level` Integer
* `message` String
* `line` Integer
* `sourceId` String

関連付けられたウィンドウがコンソールメッセージをロギングしたときに発行されます。 *オフスクリーンレンダリング* が有効になっているウィンドウでは発行されません。

### インスタンスメソッド

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Object (任意) 
  * `httpReferrer` String (任意) - HTTPリファラのURL。
  * `userAgent` String (任意) - リクエスト元のユーザーエージェント。
  * `extraHeaders` String (任意) - "\n" で区切られた追加のヘッダー。
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (任意)
  * `baseURLForDataURL` String (任意) - データURLによってロードされたファイルの (最後のパス区切り文字を含む) ベースURL。 これは指定された `url` がデータURLで、他のファイルをロードする必要がある場合のみ必要です。

ウインドウ内に `url` を読み込みます。 `url` は、`http://` や `file://` のようなプロトコルの接頭子を含まなければなりません。 HTTP キャッシュをバイパスする必要があるロードの場合は、`pragma` ヘッダを使用してそれを実現します。

```javascript
const {webContents} = require('electron')
const options = {extraHeaders: 'pragma: no-cache\n'}
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath)`

* `filePath` String

指定されたファイルをウインドウにロードします。`filePath` は、アプリケーションのルートを基準にした HTML ファイルへのパスにする必要があります。 たとえば以下のようなアプリの構造において、

```sh
| root
| - package.json
| - src
|   - main.js
|   - index.html
```

このようなコードが必要です。

```js
win.loadFile('src/index.html')
```

#### `contents.downloadURL(url)`

* `url` String

ナビゲーションせずに、`url` のリソースのダウンロードを開始します。`session` の`will-download` イベントがトリガーされます。

#### `contents.getURL()`

戻り値 `String` - 現在のウェブページの URL。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

let currentURL = win.webContents.getURL()
console.log(currentURL)
```

#### `contents.getTitle()`

戻り値 `String` - 現在のウェブページのタイトル。

#### `contents.isDestroyed()`

戻り値 `Boolean` - ウェブページが破棄されているかどうか。

#### `contents.focus()`

ウェブページにフォーカスします。

#### `contents.isFocused()`

戻り値 `Boolean` - ウェブページがフォーカスされているかどうか。

#### `contents.isLoading()`

戻り値 `Boolean` - ウェブページがまだリソースを読み込んでいるかどうか。

#### `contents.isLoadingMainFrame()`

戻り値 `Boolean` - メインフレーム (iframe やフレーム内のフレームだけではない) がまだ読み込んでいるかどうか。

#### `contents.isWaitingForResponse()`

戻り値 `Boolean` - ウェブページが、ページのメインリソースからの最初の応答を待機しているかどうか。

#### `contents.stop()`

保留中のナビゲーションを停止します。

#### `contents.reload()`

現在のページを再読み込みします。

#### `contents.reloadIgnoringCache()`

現在のページを、キャッシュを無視して再読み込みします。

#### `contents.canGoBack()`

戻り値 `Boolean` - ブラウザが前のウェブページへ戻れるかどうか。

#### `contents.canGoForward()`

戻り値 `Boolean` - ブラウザが次のウェブページへ進めるかどうか。

#### `contents.canGoToOffset(offset)`

* `offset` Integer

戻り値 `Boolean` - `offset` 番目のウェブページへ行けるかどうか。

#### `contents.clearHistory()`

ナビゲーション履歴を消去します。

#### `contents.goBack()`

ブラウザを前のページへ戻させます。

#### `contents.goForward()`

ブラウザを次のページへ進めさせます。

#### `contents.goToIndex(index)`

* `index` Integer

ブラウザを指定した絶対ウェブページインデックスへナビゲーションします。

#### `contents.goToOffset(offset)`

* `offset` Integer

現在のエントリから指定したオフセットへナビゲーションします。

#### `contents.isCrashed()`

戻り値 `Boolean` - レンダラープロセスがクラッシュしたかどうか。

#### `contents.setUserAgent(userAgent)`

* `userAgent` String

このウェブページのユーザエージェントをオーバーライドします。

#### `contents.getUserAgent()`

戻り値 `String` - このウェブページのユーザエージェント。

#### `contents.insertCSS(css)`

* `css` String

現在のウェブページへ CSS を注入します。

#### `contents.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (任意) - 省略値は `false`。
* `callback` Function (任意) - スクリプトが実行されたあとに呼ばれる。 
  * `result` Any

戻り値 `Promise` - 実行されたコードの結果で解決される Promise、またはコードの結果が拒否された Promise である場合の拒否された Promise。

ページ内の `code` を評価します。

ブラウザウインドウでは、`requestFullScreen` のような、いくつかの HTML API は、ユーザからのジェスチャーでのみ呼び出されます。 `userGesture` を `true` にセットすることでこの制限がなくなります。

実行されたコードの結果が Promise の場合、コールバックの結果は Promise の解決された値になります。返された Promise を使用して、Promise を生成するコードを処理することを推奨します。

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // フェッチ呼び出しの JSON オブジェクトになります
  })
```

#### `contents.setIgnoreMenuShortcuts(ignore)` *実験的*

* `ignore` Boolean

この WebContents がフォーカスされている間、アプリケーションのメニューショートカットを無視します。

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

現在のウェブページのオーディオをミュートします。

#### `contents.isAudioMuted()`

戻り値 `Boolean` - このページがミュートされているかどうか。

#### `contents.setZoomFactor(factor)`

* `factor` Number - 拡大率。

指定の倍率に拡大率を変更します。拡大率は百分率なので、300% = 3.0 です。

#### `contents.getZoomFactor(callback)`

* `callback` Function 
  * `zoomFactor` Number

現在の拡大率を取得するリクエストを送ります。`callback` が `callback(zoomFactor)` で呼ばれます。

#### `contents.setZoomLevel(level)`

* `level` Number - 拡大レベル。

指定レベルに拡大レベルを変更します。 原寸は 0 で、各増減分はそれぞれ 20% ずつの拡大または縮小を表し、デフォルトで元のサイズの 300% から 50% までに制限されています。 この式は `scale := 1.2 ^ level` です。

#### `contents.getZoomLevel(callback)`

* `callback` Function 
  * `zoomLevel` Number

現在の拡大レベルを取得するリクエストを送ります。`callback` が `callback(zoomLevel)` で呼ばれます。

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

ピンチによる拡大レベルの最大値と最小値を設定します。

#### `contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

レイアウトベースな (つまり Visual ではない) 拡大レベルの最大値と最小値を設定します。

#### `contents.undo()`

ウェブページの `undo` 編集コマンドを実行します。

#### `contents.redo()`

ウェブページの `redo` 編集コマンドを実行します。

#### `contents.cut()`

ウェブページの `cut` 編集コマンドを実行します。

#### `contents.copy()`

ウェブページの `copy` 編集コマンドを実行します。

#### `contents.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

指定した位置の画像をクリップボードにコピーします。

#### `contents.paste()`

ウェブページの `paste` 編集コマンドを実行します。

#### `contents.pasteAndMatchStyle()`

ウェブページの `pasteAndMatchStyle` 編集コマンドを実行します。

#### `contents.delete()`

ウェブページの `delete` 編集コマンドを実行します。

#### `contents.selectAll()`

ウェブページの `selectAll` 編集コマンドを実行します。

#### `contents.unselect()`

ウェブページの `unselect` 編集コマンドを実行します。

#### `contents.replace(text)`

* `text` String

ウェブページの `replace` 編集コマンドを実行します。

#### `contents.replaceMisspelling(text)`

* `text` String

ウェブページの `replaceMisspelling` 編集コマンドを実行します。

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

ウェブページ内の `text` のすべてのマッチを探すリクエストを開始します。 リクエストの結果は [`found-in-page`](web-contents.md#event-found-in-page) イベントを読むことで取得できます。

#### `contents.stopFindInPage(action)`

* `action` String - [`webContents.findInPage`] リクエストを終了するときに実行するアクションを指定する。 
  * `clearSelection` - 選択を消去する。
  * `keepSelection` - その選択を通常の選択に変換する。
  * `activateSelection` - 選択ノードをフォーカスして、クリックする。

指定された `action` で、`webContents` の `findInPage` リクエストを停止します。

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

`rect` 内のページのスナップショットをキャプチャします。 完了時に、`callback` が `callback(image)` で呼ばれます。 `image` はスナップショットのデータを格納する [NativeImage](native-image.md) のインスタンスです。 `rect` を省略すると、表示されているページ全体をキャプチャします。

#### `contents.hasServiceWorker(callback)`

* `callback` Function 
  * `hasWorker` Boolean

何らかの ServiceWorker が登録されれいる場合、応答として Boolean を `callback` に返します。

#### `contents.unregisterServiceWorker(callback)`

* `callback` Function 
  * `success` Boolean

存在すれば、ServiceWorker の登録を解除し、JS の Promise が成功した (fulfilled) ならば応答として `callback` へ Boolean を返し、JS の Promise が失敗した (rejected) ならば false を返します。

#### `contents.getPrinters()`

システムプリンタのリストを取得します。

戻り値 [`PrinterInfo[]`](structures/printer-info.md).

#### `contents.print([options], [callback])`

* `options` Object (任意) 
  * `silent` Boolean (任意) - プリンタの設定をユーザに尋ねないかどうか。省略値は `false`。
  * `printBackground` Boolean (任意) - ウェブページの背景色と画像も印刷するかどうか。省略値は `false`。
  * `deviceName` String (任意) - 使用するプリンタデバイスの名前。省略値は `''`。
* `callback` Function (任意) 
  * `success` Boolean - 印刷呼び出しの成功を示す。

ウインドウのウェブページを印刷します。 `silent` が `true` にセットされたとき、`deviceName` が空で印刷のデフォルト設定があれば、Electron はシステムのデフォルトプリンタを選択します。

ウェブページ内の `window.print()` を呼ぶことは、`webContents.print({silent: false, printBackground: false, deviceName: ''})` と同等です。

`page-break-before: always;` CSS スタイルを使用して、強制的に改ページして印刷できます。

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

Chromium の印刷のカスタム設定のプレビューで、PDF としてウインドウのウェブページを出力します。

完了すると、`callback` が `callback(error, data)` で呼ばれます。`data` は生成された PDF データを含む `Buffer` です。

`@page` CSS ルールがウェブページ内で使われている場合、`landscape` は無視されます。

デフォルトでは、空の `options` は以下のようにみなされます。

```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false
}
```

`page-break-before: always;` CSS スタイルを使用して、強制的に改ページして印刷できます。

これは `webContents.printToPDF` の例です。

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

指定したパスを開発者向けツールのワークスペースに追加します。開発者向けツールが作成された後に使用しなければいけません。

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.webContents.on('devtools-opened', () => {
  win.webContents.addWorkSpace(__dirname)
})
```

#### `contents.removeWorkSpace(path)`

* `path` String

開発者向けツールのワークスペースから指定したパスを削除します。

#### `contents.setDevToolsWebContents(devToolsWebContents)`

* `devToolsWebContents` WebContents

`devToolsWebContents` を開発者向けツールを表示するターゲット `WebContents` として使用します。

`devToolsWebContents` はナビゲーションを行ってはいけません。また、コール後に他の目的に使用することはできません。

デフォルトでは、Electron は開発者が制御を非常に制限したネイティブビューを持つ内部 `WebContents` を作成することによって開発者向けツールを管理します。 `setDevToolsWebContents` メソッドでは、開発者は任意の `WebContents` を使用して、`BrowserWindow`、`BrowserView`、`<webview>` タグなどの開発者向けツールを表示できます。

開発者向けツールを閉じても `devToolsWebContents` は破棄されないことに注意してください。 `devToolsWebContents` を破棄するのは呼び出し元の責任です。

`<webview>` タグ内で開発者向けツールを表示する例:

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

`BrowserWindow` 内で開発者向けツールを表示する例:

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

開発者向けツールを開く。

`contents` が `<webview>` タグである場合、デフォルトでは `mode` が `detach` になり、空の `mode` を明示的に渡すと最後に使用されたドックステートを使用して強制的に実行されます。

#### `contents.closeDevTools()`

開発者向けツールを閉じる。

#### `contents.isDevToolsOpened()`

戻り値 `Boolean` - 開発者向けツールが開かれているかどうか。

#### `contents.isDevToolsFocused()`

戻り値 `Boolean` - 開発者向けツールがフォーカスされているかどうか。

#### `contents.toggleDevTools()`

開発者向けツールをトグル切り替えします。

#### `contents.inspectElement(x, y)`

* `x` Integer
* `y` Integer

(`x`, `y`) の位置の要素の検査を開始します。

#### `contents.inspectServiceWorker()`

サービスワーカコンテキストの開発者向けツールを開きます。

#### `contents.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

`channel` を介してレンダラープロセスに非同期メッセージを送信します。任意の引数を送ることもできます。 引数は内部で JSON にシリアライズされるので、関数やプロトタイプチェーンは含まれません。

レンダラープロセスは `ipcRenderer` モジュールで [`channel`](ipc-renderer.md) を聞いてメッセージを処理できます。

以下はメインプロセスからレンダラープロセスにメッセージを送る例です。

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

与えられた引数でデバイスのエミュレートを有効にします

#### `contents.disableDeviceEmulation()`

`webContents.enableDeviceEmulation` で有効にしたデバイスのエミュレートを向こうにします。

#### `contents.sendInputEvent(event)`

* `event` Object 
  * `type` String (**必須**) - イベントのタイプ。`mouseDown`、`mouseUp`、`mouseEnter`、`mouseLeave`、`contextMenu`、`mouseWheel`、`mouseMove`、`keyDown`、`keyUp` または `char` にできる。
  * `modifiers` String[] - イベントの修飾子の配列。`shift`、`control`、`alt`、`meta`、`isKeypad`、`isAutoRepeat`、`leftButtonDown`、`middleButtonDown`、`rightButtonDown`、`capsLock`、`numLock`、`left`、`right` を含めることができる。

入力 `event` をページに送ります。 **注釈:** `sendInputEvent()` が動くには、そのコンテツを含む [`BrowserWindow`](browser-window.md) がフォーカスされている必要があります。

キーボードイベントでは、`event` オブジェクトは以下のプロパティも持ちます。

* `keyCode` String (**必須**) - キーボードイベントとして送られる文字。[Accelerator](accelerator.md) で有効なキーコードのみを使用しなければいけません。

マウスイベントでは、`event` オブジェクトは以下のプロパティも持ちます。

* `x` Integer (**必須**)
* `y` Integer (**必須**)
* `button` String - 押されたボタン。`left`、`middle`、`right` にできる。
* `globalX` Integer
* `globalY` Integer
* `movementX` Integer
* `movementY` Integer
* `clickCount` Integer

`mouseWheel` イベントでは、`event` オブジェクトは以下のプロパティも持ちます。

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

プレゼンテーションイベントとキャプチャされたフレームの監視を開始し、プレゼンテーションイベントがあれば、`callbabck` が `callback(frameBuffer, dirtyRect)` で呼ばれます。

`frameBuffer` は生のピクセルデータを含む `Buffer` です。 ほとんどのマシンでは、ピクセルデータは 32bit BGRA 形式で効果的に格納されますが、実際の表示はプロセッサのエンディアンに依存します (ほとんどのプロセッサはリトルエンディアンで、ビッグエンディアンのプロセッサでのデータは 32bit ARGB 形式です)。

`dirtyRect` は 再描画されたページの部分を示す `x, y, width, height` プロパティのオブジェクトです。 もし `onlyDirty` が `true` にセットされている場合、`frameBuffer` は再描画された領域だけを含みます。 `onlyDirty` の省略値は `false` です。

#### `contents.endFrameSubscription()`

フレームプレゼンテーションイベントの監視を終了します。

#### `contents.startDrag(item)`

* `item` Object 
  * `file` String 又は `files` Array - ドラッグが開始されたファイルへのパス。
  * `icon` [NativeImage](native-image.md) - macOS では空にできない画像。

現在の D&D 操作のドラッグアイテムに `item` をセットします。`file` はドラッグされるファイルへの絶対パスで、`icon` はドラッグするときにカーソルの下に表示される画像です。

#### `contents.savePage(fullPath, saveType, callback)`

* `fullPath` String - 完全なファイルパス。
* `saveType` String - 保存タイプの指定。 
  * `HTMLOnly` - ページの HTML だけを保存する。
  * `HTMLComplete` - 完全な HTML ページを保存する。
  * `MHTML` - MHTML として完全な HTML ページを保存する。
* `callback` Function - `(error) => {}`. 
  * `error` Error

戻り値 `Boolean` - ページ保存のプロセスが正常に開始された場合に true。

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

ページのサイズを設定します。`<webview>` のゲストコンテンツでのみサポートされています。

* `options` Object 
  * `enableAutoSize` Boolean (任意) - webview コンテナを normal、min、max 属性で指定された範囲内で自動的にサイズ変更する場合は true にします。
  * `normal` [Size](structures/size.md) (任意) - ページの通常サイズ。 これを [`disableguestresize`](webview-tag.md#disableguestresize) 属性と組み合わせて使用すると、webview ゲストコンテンツのサイズを手動で変更できます。
  * `min` [Size](structures/size.md) (任意) - ページの最小サイズ。 これを [`disableguestresize`](webview-tag.md#disableguestresize) 属性と組み合わせて使用すると、webview ゲストコンテンツのサイズを手動で変更できます。
  * `max` [Size](structures/size.md) (任意) - ページの最大サイズ。 これを [`disableguestresize`](webview-tag.md#disableguestresize) 属性と組み合わせて使用すると、webview ゲストコンテンツのサイズを手動で変更できます。

#### `contents.isOffscreen()`

戻り値 `Boolean` - *オフスクリーンレンダリング* が有効にされているかどうかを示す。

#### `contents.startPainting()`

もし *オフスクリーンレンダリング* が有効かつ描画中でなければ、描画を開始します。

#### `contents.stopPainting()`

もし *オフスクリーンレンダリング* が有効かつ描画中であれば、描画を終了します。

#### `contents.isPainting()`

戻り値 `Boolean` - もし *オフスクリーンレンダリング* が有効であれば、現在描画中かどうかを返します。

#### `contents.setFrameRate(fps)`

* `fps` Integer

もし *オフスクリーンレンダリング* が有効であれば指定された数字にフレームレートをセットします。1 から 60 の値のみを受け取ります。

#### `contents.getFrameRate()`

戻り値 `Boolean` - もし *オフスクリーンレンダリング* が有効であれば、現在のフレームレートを返します。

#### `contents.invalidate()`

このウェブコンテンツが入っているウインドウの完全な再描画をスケジュールします。

もし *オフスクリーンレンダリング* が有効であれば、フレームを無効にし、`'paint'` を通して新しいフレームを生成します。

#### `contents.getWebRTCIPHandlingPolicy()`

戻り値 `String` - WebRTC IP ハンドリングポリシーを返します。

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` String - 指定するWebRTC IP ハンドリングポリシー。 
  * `default` - ユーザの公開IPとローカルIPを公開します。 これはデフォルトの動作です。 このポリシーが使用されるとき、WebRTC には、すべてのインターフェースを列挙し、それらを結合して公開インターフェースを検出する権利があります。
  * `default_public_interface_only` - ユーザの公開IPを公開しますが、ユーザのローカルIPは公開しません。 このポリシーが使用されるとき、WebRTC は HTTP が使用するデフォルトのルートのみを使用する必要があります。 これはどのローカルアドレスも公開しません。
  * `default_public_and_private_interfaces` - ユーザの公開IPとローカルIPを公開します。 このポリシーが使用されるとき、WebRTC は HTTP が使用するデフォルトのルートのみを使用する必要があります。 これは関連するデフォルトのプライベートアドレスも公開します。 デフォルトルートは、マルチホームのエンドポイント上で OS によって選択されたルートです。
  * `disable_non_proxied_udp` - 公開IPやローカルIPを公開しません。このポリシーが使用されるとき、WebRTCは、プロキシサーバーがUDPをサポートしていない限り、TCPを使用してピアまたはサーバーに接続する必要があります。

WebRTC IP ハンドリングポリシーを設定すると、WebRTC を介して公開される IP を制御できます。より詳しくは [BrowserLeaks](https://browserleaks.com/webrtc) を参照して下さい。

#### `contents.getOSProcessId()`

戻り値 `Integer` - 関連するレンダラープロセスの `pid`。

### インスタンスプロパティ

#### `contents.id`

この WebContents の一意のIDを表す `Integer`。

#### `contents.session`

この webContents で使われる [`Session`](session.md)。

#### `contents.hostWebContents`

この `WebContents` を所有するかもしれない [`WebContents`](web-contents.md) インスタンス。

#### `contents.devToolsWebContents`

この `WebContents` の開発者向けツールの `WebContents` インスタンス。

**注釈:** 開発者向けツールが閉じられたときに `null` になる可能性があるので、このオブジェクトは決して格納しないで下さい。

#### `contents.debugger`

この webContents の [Debugger](debugger.md)。