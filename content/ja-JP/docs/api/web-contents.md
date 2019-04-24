# webContents

> ウェブページを描画、制御します。

プロセス: [Main](../glossary.md#main-process)

`webContents` は [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) の一つです。 [`BrowserWindow`](browser-window.md) オブジェクトのプロパティには、ウェブページを描画し、制御する責任があります。 以下は、`webContents` オブジェクトにアクセスする例です。

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('http://github.com')

let contents = win.webContents
console.log(contents)
```

## メソッド

これらのメソッドは、`webContents` モジュールからアクセスできます。

```javascript
const { webContents } = require('electron')
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
* `frameProcessId` Integer
* `frameRoutingId` Integer

このイベントは `did-finish-load` のようですが、ロードが失敗した、キャンセルされた、`window.stop()` が呼び出されたなどで、発行されます。 エラーコードとその意味のすべてのリストは [こちら](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) です。

#### イベント: 'did-frame-finish-load'

戻り値:

* `event` Event
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

フレームのナビゲーションが終了したときに発行されます。

#### イベント: 'did-start-loading'

タブのくるくるが始まったタイミングに対応しています。

#### イベント: 'did-stop-loading'

タブのくるくるが止まったタイミングに対応しています。

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
* `referrer` [Referrer](structures/referrer.md) - 新しいウィンドウへ渡される Referrer。 Referrer のポリシーに依存しているので、`Referrer` ヘッダを送信されるようにしてもしなくてもかまいません。

ページが `url` の新しいウインドウを開くリクエストをするときに発行されます。`window.open` か `<a target='_blank'>` のようなリンクによってリクエストされる可能があります。

デフォルトでは、`url` の新しい `BrowserWindow` が作成されます。

`event.preventDefault()` を呼ぶと、Electron が自動的に新しい [`BrowserWindow`](browser-window.md) を作成するのを防ぎます。 もし `event.preventDefault()` を呼び、新しい `BrowserWindow` を手動で作る場合、新しい [`BrowserWindow`](browser-window.md) インスタンスの参照を [`event.newGuest`](browser-window.md) にセットしなければ、予期しない動作になる可能性があります。 例:

```javascript
myBrowserWindow.webContents.on('new-window', (event, url) => {
  event.preventDefault()
  const win = new BrowserWindow({ show: false })
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

#### イベント: 'did-start-navigation'

戻り値:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

フレーム (メインを含む) がナビゲーションを始めているときに発生します。ページ内ナビゲーションの場合、`isInplace` は `true` になります。

#### イベント: 'will-redirect'

戻り値:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

ナビゲーション中にサーバーサイドリダイレクトが発生すると発行されます。例として 302 リダイレクトがあります。

このイベントは常に、同一ナビゲーションで `did-start-navigation` の後かつ `did-redirect-navigation` イベントの前に発行されます。

`event.preventDefault()` を呼ぶとナビゲーション (リダイレクトではない) が阻害されます。

#### イベント: 'did-redirect-navigation'

戻り値:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

ナビゲーション中にサーバーサイドリダイレクトが発生した後に発行されます。例として 302 リダイレクトがあります。

このイベントを阻害することはできません。リダイレクトを防ぎたい場合は、上記の `will-redirect` イベントを確認してください。

#### イベント: 'did-navigate'

戻り値:

* `event` Event
* `url` String
* `httpResponseCode` Integer - HTTP ナビゲーションが無い場合は-1
* `httpStatusText` String - HTTP ナビゲーションが無い場合は空

メインフレームのナビゲーションが完了したときに発生します。

このイベントは、アンカーリンクのクリックや `window.location.hash` の更新のような、ページ内ナビゲーションでは発行されません。これを意図する場合は `did-navigate-in-page` を使用して下さい。

#### イベント: 'did-frame-navigate'

戻り値:

* `event` Event
* `url` String
* `httpResponseCode` Integer - HTTP ナビゲーションが無い場合は-1
* `httpStatusText` String - HTTP ナビゲーションが無い場合は空。
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

フレームのナビゲーションが完了したときに発生します。

このイベントは、アンカーリンクのクリックや `window.location.hash` の更新のような、ページ内ナビゲーションでは発行されません。これを意図する場合は `did-navigate-in-page` を使用して下さい。

#### イベント: 'did-navigate-in-page'

戻り値:

* `event` Event
* `url` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

フレームのページ内ナビゲーションが発生したときに発生します。

ページ内ナビゲーションが行われるとき、ページのURLは変更されますがページ外でのナビゲーションは発生しません。 これが発生する例は、アンカーリンクがクリックされたときや、DOM の `hashchange` イベントがトリガーされたときです。

#### イベント: 'will-prevent-unload'

戻り値:

* `event` Event

`beforeunload` イベントハンドラがページのアンロードをキャンセルしようとしたときに発行されます。

`event.preventDefault()` を呼ぶと、`beforeunload` イベントハンドラが無視され、 ページをアンロードできます。

```javascript
const { BrowserWindow, dialog } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
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

#### イベント: 'unresponsive'

Webページが応答しなくなるときに発生します。

#### イベント: 'responsive'

応答しないWebページが再び応答するようになるときに発生します。

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
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })

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
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
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
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ webPreferences: { offscreen: true } })
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

#### Event: 'console-message'

戻り値:

* `event` Event
* `level` Integer
* `message` String
* `line` Integer
* `sourceId` String

関連付けられたウィンドウがコンソールメッセージをロギングしたときに発行されます。 *オフスクリーンレンダリング* が有効になっているウィンドウでは発行されません。

#### Event: 'preload-error'

戻り値:

* `event` Event
* `preloadPath` String
* `error` Error

Emitted when the preload script `preloadPath` throws an unhandled exception `error`.

#### イベント: 'ipc-message'

戻り値:

* `event` Event
* `channel` String
* `...args` any[]

Emitted when the renderer process sends an asynchronous message via `ipcRenderer.send()`.

#### Event: 'ipc-message-sync'

戻り値:

* `event` Event
* `channel` String
* `...args` any[]

Emitted when the renderer process sends a synchronous message via `ipcRenderer.sendSync()`.

#### Event: 'desktop-capturer-get-sources'

戻り値:

* `event` Event

Emitted when `desktopCapturer.getSources()` is called in the renderer process. Calling `event.preventDefault()` will make it return empty sources.

#### イベント: 'remote-require'

戻り値:

* `event` Event
* `モジュール名` String

Emitted when `remote.require()` is called in the renderer process. `event.preventDefault()` を呼ぶとモジュールの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'remote-get-global'

戻り値:

* `event` Event
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process. `event.preventDefault()` を呼ぶとグローバルの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'remote-get-builtin'

戻り値:

* `event` Event
* `モジュール名` String

Emitted when `remote.getBuiltin()` is called in the renderer process. `event.preventDefault()` を呼ぶとモジュールの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'remote-get-current-window'

戻り値:

* `event` Event

Emitted when `remote.getCurrentWindow()` is called in the renderer process. `event.preventDefault()` を呼ぶとオブジェクトの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'remote-get-current-web-contents'

戻り値:

* `event` Event

Emitted when `remote.getCurrentWebContents()` is called in the renderer process. `event.preventDefault()` を呼ぶとオブジェクトの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'remote-get-guest-web-contents'

戻り値:

* `event` Event
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process. `event.preventDefault()` を呼ぶとオブジェクトの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

### インスタンスメソッド

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Object (任意) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (任意) - HTTPリファラのURL。
  * `userAgent` String (任意) - リクエスト元のユーザーエージェント。
  * `extraHeaders` String (optional) - Extra headers separated by "\n".
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (任意)
  * `baseURLForDataURL` String (任意) - データURLによってロードされたファイルの (最後のパス区切り文字を含む) ベースURL。 これは指定された `url` がデータURLで、他のファイルをロードする必要がある場合のみ必要です。

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Loads the `url` in the window. The `url` must contain the protocol prefix, e.g. the `http://` or `file://`. If the load should bypass http cache then use the `pragma` header to achieve it.

```javascript
const { webContents } = require('electron')
const options = { extraHeaders: 'pragma: no-cache\n' }
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (任意) 
  * `query` Object (任意) - `url.format()` に渡されます。
  * `search` String (任意) - `url.format()` に渡されます。
  * `hash` String (任意) - `url.format()` に渡されます。

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

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
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ width: 800, height: 600 })
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

戻り値 `Boolean` - メインフレーム (iframe やフレーム内のフレームだけではない) がまだ読み込んでいるかどうか。

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

戻り値 `Promise<any>` - 実行されたコードの結果で resolve する Promise。コードの結果が reject な Promise である場合は reject な Promise。

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

#### `contents.isCurrentlyAudible()`

戻り値 `Boolean` - 音声が現在再生中かどうか。

#### `contents.setZoomFactor(factor)`

* `factor` Number - 拡大率。

指定の倍率に拡大率を変更します。拡大率は百分率なので、300% = 3.0 です。

#### `contents.getZoomFactor()`

Returns `Number` - the current zoom factor.

#### `contents.setZoomLevel(level)`

* `level` Number - 拡大レベル。

指定レベルに拡大レベルを変更します。 原寸は 0 で、各増減分はそれぞれ 20% ずつの拡大または縮小を表し、デフォルトで元のサイズの 300% から 50% までに制限されています。 この式は `scale := 1.2 ^ level` です。

#### `contents.getZoomLevel()`

Returns `Number` - the current zoom level.

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

ピンチによる拡大レベルの最大値と最小値を設定します。

> **注意**: Electron ではデフォルトで視覚ズームは無効化されています。再び有効にする場合は以下を呼び出します。
> 
> ```js
contents.setVisualZoomLevelLimits(1, 3)
```

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

* `action` String - Specifies the action to take place when ending [`webContents.findInPage`] request. 
  * `clearSelection` - 選択を消去する。
  * `keepSelection` - その選択を通常の選択に変換する。
  * `activateSelection` - 選択ノードをフォーカスして、クリックする。

Stops any `findInPage` request for the `webContents` with the provided `action`.

```javascript
const { webContents } = require('electron')
webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```

#### `contents.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (任意) - キャプチャする範囲
* `callback` Function 
  * `image` [NativeImage](native-image.md)

`rect` 内のページのスナップショットをキャプチャします。 完了時に、`callback` が `callback(image)` で呼ばれます。 The `image` is an instance of [NativeImage](native-image.md) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.

**[Deprecated Soon](promisification.md)**

#### `contents.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (任意) - キャプチャするページ内の領域。

* Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

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
  * `success` Boolean - Indicates success of the print call.

Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Calling `window.print()` in web page is equivalent to calling `webContents.print({ silent: false, printBackground: false, deviceName: '' })`.

Use `page-break-before: always;` CSS style to force to print to a new page.

#### `contents.printToPDF(options, callback)`

* `options` Object 
  * `marginsType` Integer (任意) - 使用するマージンの種類を指定する。デフォルトマージンには 0 を、マージン無しには 1 を、最小マージンには 2 を使用する。
  * `pageSize` String | Size (任意) - 生成する PDF のページサイズを指定します。 `A3`、`A4`、`A5`、`Legal`、`Letter`、`Tabloid`、またはミクロン単位の `width` と `height` を含む Object にできる。
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
const { BrowserWindow } = require('electron')
const fs = require('fs')

let win = new BrowserWindow({ width: 800, height: 600 })
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
const { BrowserWindow } = require('electron')
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
const { app, BrowserWindow } = require('electron')

let win = null
let devtools = null

app.once('ready', () => {
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({ mode: 'detach' })
})
```

#### `contents.openDevTools([options])`

* `options` Object (任意) 
  * `mode` String - Opens the devtools with specified dock state, can be `right`, `bottom`, `undocked`, `detach`. Defaults to last used dock state. In `undocked` mode it's possible to dock back. In `detach` mode it's not.
  * `activate` Boolean (optional) - Whether to bring the opened devtools window to the foreground. The default is `true`.

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
const { app, BrowserWindow } = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
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

#### `contents.sendToFrame(frameId, channel[, arg1][, arg2][, ...])`

* `frameId` Integer
* `channel` String
* `...args` any[]

Send an asynchronous message to a specific frame in a renderer process via `channel`. Arguments will be serialized as JSON internally and as such no functions or prototype chains will be included.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

If you want to get the `frameId` of a given renderer context you should use the `webFrame.routingId` value. E.g.

```js
// In a renderer process
console.log('My frameId is:', require('electron').webFrame.routingId)
```

You can also read `frameId` from all incoming IPC messages in the main process.

```js
// In the main process
ipcMain.on('ping', (event) => {
  console.info('Message came from frameId:', event.frameId)
})
```

#### `contents.enableDeviceEmulation(parameters)`

* `parameters` Object 
  * `screenPosition` String - Specify the screen type to emulate (default: `desktop`): 
    * `desktop` - Desktop screen type.
    * `mobile` - Mobile screen type.
  * `screenSize` [Size](structures/size.md) - Set the emulated screen size (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - Position the view on the screen (screenPosition == mobile) (default: `{ x: 0, y: 0 }`).
  * `deviceScaleFactor` Integer - Set the device scale factor (if zero defaults to original device scale factor) (default: `0`).
  * `viewSize` [Size](structures/size.md) - Set the emulated view size (empty means no override)
  * `scale` Float - Scale of emulated view inside available space (not in fit to view mode) (default: `1`).

Enable device emulation with the given parameters.

#### `contents.disableDeviceEmulation()`

Disable device emulation enabled by `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(event)`

* `event` Object 
  * `type` String (**required**) - The type of the event, can be `mouseDown`, `mouseUp`, `mouseEnter`, `mouseLeave`, `contextMenu`, `mouseWheel`, `mouseMove`, `keyDown`, `keyUp` or `char`.
  * `modifiers` String[] - An array of modifiers of the event, can include `shift`, `control`, `alt`, `meta`, `isKeypad`, `isAutoRepeat`, `leftButtonDown`, `middleButtonDown`, `rightButtonDown`, `capsLock`, `numLock`, `left`, `right`.

入力 `event` をページに送ります。 **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.

For keyboard events, the `event` object also have following properties:

* `keyCode` String (**required**) - The character that will be sent as the keyboard event. Should only use the valid key codes in [Accelerator](accelerator.md).

For mouse events, the `event` object also have following properties:

* `x` Integer (**required**)
* `y` Integer (**required**)
* `button` String - The button pressed, can be `left`, `middle`, `right`.
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

* `onlyDirty` Boolean (optional) - Defaults to `false`.
* `callback` Function 
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(image, dirtyRect)` when there is a presentation event.

The `image` is an instance of [NativeImage](native-image.md) that stores the captured frame.

The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. If `onlyDirty` is set to `true`, `image` will only contain the repainted area. `onlyDirty` defaults to `false`.

#### `contents.endFrameSubscription()`

End subscribing for frame presentation events.

#### `contents.startDrag(item)`

* `item` Object 
  * `file` String or `files` Array - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) - The image must be non-empty on macOS.

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.

#### `contents.savePage(fullPath, saveType, callback)`

* `fullPath` String - The full file path.
* `saveType` String - Specify the save type. 
  * `HTMLOnly` - Save only the HTML of the page.
  * `HTMLComplete` - Save complete-html page.
  * `MHTML` - Save complete-html page as MHTML.
* `callback` Function - `(error) => {}`. 
  * `error` Error

Returns `Boolean` - true if the process of saving page has been initiated successfully.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete', (error) => {
    if (!error) console.log('Save page successfully')
  })
})
```

#### `contents.showDefinitionForSelection()` *macOS*

ページ上の選択された単語を検索するポップアップ辞書を表示します。

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

Returns `Integer` - The operating system `pid` of the associated renderer process.

#### `contents.getProcessId()`

Returns `Integer` - The Chromium internal `pid` of the associated renderer. Can be compared to the `frameProcessId` passed by frame specific navigation events (e.g. `did-frame-navigate`)

#### `contents.takeHeapSnapshot(filePath)`

* `filePath` String - 出力ファイルのパス

Returns `Promise<void>` - Indicates whether the snapshot has been created successfully.

V8ヒープを取得して、`filePath`にそれを保存します。

#### `contents.setBackgroundThrottling(allowed)`

* `allowed` Boolean

Controls whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

#### `contents.getType()`

Returns `String` - the type of the webContent. Can be `backgroundPage`, `window`, `browserView`, `remote`, `webview` or `offscreen`.

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