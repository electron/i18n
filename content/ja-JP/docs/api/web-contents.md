# webContents

> ウェブページを描画、制御します。

プロセス: [Main](../glossary.md#main-process)

`webContents` は [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) を継承しています。 [`BrowserWindow`](browser-window.md) オブジェクトのプロパティには、ウェブページを描画し、制御する責任があります。 以下は、`webContents` オブジェクトにアクセスする例です。

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

このイベントは `did-finish-load` に似ていますが、ロードが失敗したときも発行されます。 エラーコードとその意味のすべてのリストは [こちら](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) です。

#### イベント: 'did-fail-provisional-load'

戻り値:

* `event` Event
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

このイベントは `did-fail-load` に似ていますが、ロードがキャンセルされたときに発行されます (例えば `window.stop()` が呼び出されたときなど)。

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

#### イベント: 'page-title-updated'

戻り値:

* `event` Event
* `title` String
* `explicitSet` Boolean

ナビゲーション中にページタイトルが設定されたときに発生します。 `explicitSet` は、タイトルがファイル URL から合成されている場合に false になります。

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
* `options` BrowserWindowConstructorOptions - 新しい [`BrowserWindow`](browser-window.md) を作成するのに使われるオプション。
* `additionalFeatures` String[] - `window.open()` に与えられている、標準でない機能 (Chromium や Electron によって処理されない機能)。
* `referrer` [Referrer](structures/referrer.md) - 新しいウィンドウへ渡される Referrer。 Referrer のポリシーに依存しているので、`Referrer` ヘッダを送信されるようにしてもしなくてもかまいません。

ページが `url` の新しいウインドウを開くリクエストをするときに発行されます。`window.open` か `<a target='_blank'>` のようなリンクによってリクエストされる可能があります。

デフォルトでは、`url` の新しい `BrowserWindow` が作成されます。

`event.preventDefault()` を呼ぶと、Electron が自動的に新しい [`BrowserWindow`](browser-window.md) を作成するのを防ぎます。 もし `event.preventDefault()` を呼び、新しい `BrowserWindow` を手動で作る場合、新しい [`BrowserWindow`](browser-window.md) インスタンスの参照を [`event.newGuest`](browser-window.md) にセットしなければ、予期しない動作になる可能性があります。 例:

```javascript
myBrowserWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
  event.preventDefault()
  const win = new BrowserWindow({
    webContents: options.webContents, // 提供されていれば既存の webContents を使う
    show: false
  })
  win.once('ready-to-show', () => win.show())
  if (!options.webContents) {
    win.loadURL(url) // 自動で既存の webContents はナビゲートされる
  }
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

#### イベント: 'enter-html-full-screen'

ウインドウがHTML APIによってフルスクリーン状態に入るときに発生します。

#### イベント: 'leave-html-full-screen'

ウインドウがHTML APIによってフルスクリーン状態を抜けるときに発生します。

#### イベント: 'zoom-changed'

戻り値:

* `event` Event
* `zoomDirection` String - `in` か `out` にできます。

ユーザーがマウスホイールを使用してズームレベルの変更を要求しているときに生成されます。

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
* `authenticationResponseDetails` Object 
  * `url` URL
* `authInfo` Object 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String (任意)
  * `password` String (任意)

`webContents` がBasic認証を要求すると発生します。

使い方は、[`app` の `login` イベント](app.md#event-login) と同じです。

#### イベント: 'found-in-page'

戻り値:

* `event` Event
* `result` Object 
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - アクティブなマッチの位置。
  * `matches` Integer - マッチの個数。
  * `selectionArea` Rectangle - 最初に一致した領域の座標。
  * `finalUpdate` Boolean

[`webContents.findINPage`] リクエストの結果が有効なときに発行されます。

#### イベント: 'media-started-playing'

メディアの再生を開始するときに発行されます。

#### イベント: 'media-paused'

メディアが一時停止、または再生が終了したときに発行されます。

#### イベント: 'did-change-theme-color'

戻り値:

* `event` Event
* `color` (String | null) - '#rrggbb' のフォーマットのテーマカラー。テーマカラーが設定されていないと `null`。

ページのテーマカラーが変更されたときに発行されます。これはよく、このような meta タグによって発生します。

```html
<meta name='theme-color' content='#ff0000'>
```

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
  * `dictionarySuggestions` String[] - An array of suggested words to show the user to replace the `misspelledWord`. Only available if there is a misspelled word and spellchecker is enabled.
  * `frameCharset` String - The character encoding of the frame on which the menu was invoked.
  * `inputFieldType` String - If the context menu was invoked on an input field, the type of that field. Possible values are `none`, `plainText`, `password`, `other`.
  * `menuSourceType` String - Input source that invoked the context menu. Can be `none`, `mouse`, `keyboard`, `touch` or `touchMenu`.
  * `mediaFlags` Object - The flags for the media element the context menu was invoked on. 
    * `inError` Boolean - Whether the media element has crashed.
    * `isPaused` Boolean - Whether the media element is paused.
    * `isMuted` Boolean - Whether the media element is muted.
    * `hasAudio` Boolean - Whether the media element has audio.
    * `isLooping` Boolean - Whether the media element is looping.
    * `isControlsVisible` Boolean - Whether the media element's controls are visible.
    * `canToggleControls` Boolean - Whether the media element's controls are toggleable.
    * `canRotate` Boolean - Whether the media element can be rotated.
  * `editFlags` Object - These flags indicate whether the renderer believes it is able to perform the corresponding action. 
    * `canUndo` Boolean - Whether the renderer believes it can undo.
    * `canRedo` Boolean - Whether the renderer believes it can redo.
    * `canCut` Boolean - Whether the renderer believes it can cut.
    * `canCopy` Boolean - Whether the renderer believes it can copy
    * `canPaste` Boolean - Whether the renderer believes it can paste.
    * `canDelete` Boolean - Whether the renderer believes it can delete.
    * `canSelectAll` Boolean - Whether the renderer believes it can select all.

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
* `webPreferences` WebPreferences - ゲストページで使用されるウェブ設定。 このオブジェクトを変更して、ゲストページの設定を調整できます。
* `params` Record<string, string> - 他の `<webview>` パラメーター。`src` URL などがこれにあたります。このオブジェクトを変更して、ゲストページのパラメーターを調整できます。

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

Emitted when the associated window logs a console message.

#### イベント: 'preload-error'

戻り値:

* `event` Event
* `preloadPath` String
* `error` Error

プリロードスクリプト `preloadPath` がハンドルされていない例外 `error` を投げたときに発行されます。

#### イベント: 'ipc-message'

戻り値:

* `event` Event
* `channel` String
* `...args` any[]

レンダラープロセスが ` ipcRenderer.send()` を介して非同期メッセージを送信したときに発生します。

#### イベント: 'ipc-message-sync'

戻り値:

* `event` Event
* `channel` String
* `...args` any[]

レンダラープロセスが ` ipcRenderer.sendSync()` を介して同期メッセージを送信したときに発生します。

#### イベント: 'desktop-capturer-get-sources'

戻り値:

* `event` Event

レンダラプロセスで `desktopCapturer.getSources()` が呼び出されたときに発生します。 `event.preventDefault()` を呼び出すと、空のソースが返されます。

#### イベント: 'remote-require'

戻り値:

* `event` IpcMainEvent
* `モジュール名` String

レンダラープロセス内で `remote.require()` が呼ばれたときに発行されます。 `event.preventDefault()` を呼ぶとモジュールの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'remote-get-global'

戻り値:

* `event` IpcMainEvent
* `globalName` String

レンダラープロセス内で `remote.getGlobal()` が呼ばれたときに発行されます。 `event.preventDefault()` を呼ぶとグローバルの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'remote-get-builtin'

戻り値:

* `event` IpcMainEvent
* `モジュール名` String

レンダラープロセス内で `remote.getBuiltin()` が呼ばれたときに発行されます。 `event.preventDefault()` を呼ぶとモジュールの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'remote-get-current-window'

戻り値:

* `event` IpcMainEvent

レンダラープロセス内で `remote.getCurrentWindow()` が呼ばれたときに発行されます。 `event.preventDefault()` を呼ぶとオブジェクトの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'remote-get-current-web-contents'

戻り値:

* `event` IpcMainEvent

レンダラープロセス内で `remote.getCurrentWebContents()` が呼ばれたときに発行されます。 `event.preventDefault()` を呼ぶとオブジェクトの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'remote-get-guest-web-contents'

戻り値:

* `event` IpcMainEvent
* `guestWebContents` [WebContents](web-contents.md)

レンダラープロセス内で `<webview>.getWebContents()` が呼ばれたときに発生します。 `event.preventDefault()` を呼ぶとオブジェクトの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

### インスタンスメソッド

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Object (任意) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (任意) - HTTPリファラのURL。
  * `userAgent` String (任意) - リクエスト元のユーザーエージェント。
  * `extraHeaders` String (任意) - "\n" で区切られた追加のヘッダー。
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (任意)
  * `baseURLForDataURL` String (任意) - データURLによってロードされたファイルの (最後のパス区切り文字を含む) ベースURL。 これは指定された `url` がデータURLで、他のファイルをロードする必要がある場合のみ必要です。

戻り値 `Promise<void>` - ページ読み込みが完了した時 ([`did-finish-load`](web-contents.md#event-did-finish-load) を参照) に解決され、ページの読み込みに失敗した時 ([`did-fail-load`](web-contents.md#event-did-fail-load) を参照) に拒否される Promise。 無操作拒否ハンドラーが既にアタッチされているため、未処理の拒否エラーは回避されます。

ウインドウ内に `url` を読み込みます。 `url` は、`http://` や `file://` のようなプロトコルの接頭子を含まなければなりません。 HTTP キャッシュをバイパスする必要があるロードの場合は、`pragma` ヘッダを使用してそれを実現します。

```javascript
const { webContents } = require('electron')
const options = { extraHeaders: 'pragma: no-cache\n' }
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (任意) 
  * `search` Record&lt;String, String&gt; (任意) - `url.format()` に渡されます。
  * `search` String (任意) - `url.format()` に渡されます。
  * `hash` String (任意) - `url.format()` に渡されます。

戻り値 `Promise<void>` - ページ読み込みが完了した時 ([`did-finish-load`](web-contents.md#event-did-finish-load) を参照) に解決され、ページの読み込みに失敗した時 ([`did-fail-load`](web-contents.md#event-did-fail-load) を参照) に拒否される Promise。

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
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ width: 800, height: 600 })
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

**[非推奨](modernization/property-updates.md)**

#### `contents.getUserAgent()`

戻り値 `String` - このウェブページのユーザエージェント。

**[非推奨](modernization/property-updates.md)**

#### `contents.insertCSS(css[, options])`

* `css` String
* `options` Object (任意) 
  * `cssOrigin` String (任意) - 'user' または 'author' のいずれかです。'user' を指定すると、挿入した CSS がウェブサイトによって上書きされるのを防ぐことができます。デフォルトは 'author' です。

戻り値 `Promise<String>` - 挿入された CSS のキーで解決される promise。後で `contents.removeInsertedCSS(key)` を使用して CSS を削除するために使用できます。

現在のウェブページに CSS を挿入し、挿入されたスタイルシートの一意なキーを返します。

```js
contents.on('did-finish-load', function () {
  contents.insertCSS('html, body { background-color: #f00; }')
})
```

#### `contents.removeInsertedCSS(key)`

* `key` String

戻り値 `Promise<void>` - 削除に成功すると解決されます。

現在のウェブページから挿入された CSS を削除します。 スタイルシートは `contents.insertCSS(css)` から返されるキーによって識別されます。

```js
contents.on('did-finish-load', async function () {
  const key = await contents.insertCSS('html, body { background-color: #f00; }')
  contents.removeInsertedCSS(key)
})
```

#### `contents.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (任意) - 省略値は `false`。

戻り値 `Promise<any>` - 実行されたコードの結果で resolve する Promise。コードの結果が reject な Promise である場合は reject な Promise。

ページ内の `code` を評価します。

ブラウザウインドウでは、`requestFullScreen` のような、いくつかの HTML API は、ユーザからのジェスチャーでのみ呼び出されます。 `userGesture` を `true` にセットすることでこの制限がなくなります。

コードの実行は、ウェブページの読み込みが停止するまで中断されます。

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // フェッチ呼び出しの JSON オブジェクトになります
  })
```

#### `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electron's `contextIsolation` feature. 任意の整数を指定できます。
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (任意) - 省略値は `false`。

戻り値 `Promise<any>` - 実行されたコードの結果で resolve する Promise。コードの結果が reject な Promise である場合は reject な Promise。

`executeJavaScript` のように動きますが、 `scripts` はイソレートコンテキスト内で評価します。

#### `contents.setIgnoreMenuShortcuts(ignore)` *Experimental*

* `ignore` Boolean

Ignore application menu shortcuts while this web contents is focused.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Mute the audio on the current web page.

**[非推奨](modernization/property-updates.md)**

#### `contents.isAudioMuted()`

Returns `Boolean` - Whether this page has been muted.

**[非推奨](modernization/property-updates.md)**

#### `contents.isCurrentlyAudible()`

戻り値 `Boolean` - 音声が現在再生中かどうか。

#### `contents.setZoomFactor(factor)`

* `factor` Number - 拡大率。

指定の倍率に拡大率を変更します。拡大率は百分率なので、300% = 3.0 です。

**[非推奨](modernization/property-updates.md)**

#### `contents.getZoomFactor()`

戻り値 `Number` - 現在の拡大率。

**[非推奨](modernization/property-updates.md)**

#### `contents.setZoomLevel(level)`

* `level` Number - 拡大レベル。

指定レベルに拡大レベルを変更します。 原寸は 0 で、各増減分はそれぞれ 20% ずつの拡大または縮小を表し、デフォルトで元のサイズの 300% から 50% までに制限されています。 この式は `scale := 1.2 ^ level` です。

**[非推奨](modernization/property-updates.md)**

#### `contents.getZoomLevel()`

戻り値 `Number` - 現在の拡大レベル。

**[非推奨](modernization/property-updates.md)**

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

戻り値 `Promise<void>`

ピンチによる拡大レベルの最大値と最小値を設定します。

> **注意**: Electron ではデフォルトで視覚ズームは無効化されています。再び有効にする場合は以下を呼び出します。
> 
> ```js
contents.setVisualZoomLevelLimits(1, 3)
```

#### `contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)` *Deprecated*

* `minimumLevel` Number
* `maximumLevel` Number

戻り値 `Promise<void>`

レイアウトベースな (つまり Visual ではない) 拡大レベルの最大値と最小値を設定します。

**Deprecated:** This API is no longer supported by Chromium.

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

戻り値 `Promise<void>`

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

#### `contents.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (任意) - キャプチャするページ内の領域。

戻り値 `Promise<NativeImage>` - [NativeImage](native-image.md) を解決します

`rect` 範囲内のページのスナップショットを撮ります。`rect` を省略すると、表示されているページ全体をキャプチャします。

#### `contents.isBeingCaptured()`

Returns `Boolean` - Whether this page is being captured. It returns true when the capturer count is large then 0.

#### `contents.incrementCapturerCount([size, stayHidden])`

* `size` [Size](structures/size.md) (optional) - The perferred size for the capturer.
* `stayHidden` Boolean (optional) - Keep the page hidden instead of visible.

Increase the capturer count by one. The page is considered visible when its browser window is hidden and the capturer count is non-zero. If you would like the page to stay hidden, you should ensure that `stayHidden` is set to true.

This also affects the Page Visibility API.

#### `contents.decrementCapturerCount([stayHidden])`

* `stayHidden` Boolean (optional) - Keep the page in hidden state instead of visible.

Decrease the capturer count by one. The page will be set to hidden or occluded state when its browser window is hidden or occluded and the capturer count reaches zero. If you want to decrease the hidden capturer count instead you should set `stayHidden` to true.

#### `contents.getPrinters()`

Get the system printer list.

Returns [`PrinterInfo[]`](structures/printer-info.md)

#### `contents.print([options], [callback])`

* `options` Object (任意) 
  * `silent` Boolean (任意) - プリンタの設定をユーザに尋ねないかどうか。省略値は `false`。
  * `printBackground` Boolean (optional) - Prints the background color and image of the web page. Default is `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Must be the system-defined name and not the 'friendly' name, e.g 'Brother_QL_820NWB' and not 'Brother QL-820NWB'.
  * `color` Boolean (optional) - Set whether the printed web page will be in color or grayscale. Default is `true`.
  * `margins` Object (任意) 
    * `marginType` String (optional) - Can be `default`, `none`, `printableArea`, or `custom`. If `custom` is chosen, you will also need to specify `top`, `bottom`, `left`, and `right`.
    * `top` Number (optional) - The top margin of the printed web page, in pixels.
    * `bottom` Number (optional) - The bottom margin of the printed web page, in pixels.
    * `left` Number (optional) - The left margin of the printed web page, in pixels.
    * `right` Number (optional) - The right margin of the printed web page, in pixels.
  * `landscape` Boolean (optional) - Whether the web page should be printed in landscape mode. Default is `false`.
  * `scaleFactor` Number (optional) - The scale factor of the web page.
  * `pagesPerSheet` Number (optional) - The number of pages to print per page sheet.
  * `collate` Boolean (optional) - Whether the web page should be collated.
  * `copies` Number (optional) - The number of copies of the web page to print.
  * `pageRanges` Record<string, number> (optional) - The page range to print. Should have two keys: `from` and `to`.
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Object (任意) 
    * `horizontal` Number (optional) - The horizontal dpi.
    * `vertical` Number (optional) - The vertical dpi.
  * `header` String (optional) - String to be printed as page header.
  * `footer` String (optional) - String to be printed as page footer.
* `callback` Function (任意) 
  * `success` Boolean - Indicates success of the print call.
  * `failureReason` String - Called back if the print fails; can be `cancelled` or `failed`.

Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Use `page-break-before: always;` CSS style to force to print to a new page.

使用例:

```js
const options = { silent: true, deviceName: 'My-Printer' }
win.webContents.print(options, (success, errorType) => {
  if (!success) console.log(errorType)
})
```

#### `contents.printToPDF(options)`

* `options` Object 
  * `marginsType` Integer (任意) - 使用するマージンの種類を指定する。デフォルトマージンには 0 を、マージン無しには 1 を、最小マージンには 2 を使用する。
  * `pageSize` String | Size (任意) - 生成する PDF のページサイズを指定します。 `A3`、`A4`、`A5`、`Legal`、`Letter`、`Tabloid`、またはミクロン単位の `width` と `height` を含む Object にできる。
  * `printBackground` Boolean (任意) - CSS 背景を印刷するかどうか。
  * `printSelectionOnly` Boolean (任意) - 選択部分だけを印刷するかどうか。
  * `landscape` Boolean (任意) - `true` で横向き、`false` で縦向き。

戻り値 `Promise<Buffer>` - 生成された PDF データで実行されます。

Prints window's web page as PDF with Chromium's preview printing custom settings.

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
  // デフォルトの印刷オプションを使用します
  win.webContents.printToPDF({}).then(data => {
    fs.writeFile('/tmp/print.pdf', data, (error) => {
      if (error) throw error
      console.log('PDF 書き出しに成功しました。')
    })
  }).catch(error => {
    console.log(error)
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

#### `contents.inspectSharedWorker()`

Opens the developer tools for the shared worker context.

#### `contents.inspectSharedWorkerById(workerId)`

* `workerId` String

Inspects the shared worker based on its ID.

#### `contents.getAllSharedWorkers()`

Returns [`SharedWorkerInfo[]`](structures/shared-worker-info.md) - Information about all Shared Workers.

#### `contents.inspectServiceWorker()`

Opens the developer tools for the service worker context.

#### `contents.send(channel, ...args)`

* `channel` String
* `...args` any[]

Send an asynchronous message to the renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

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

#### `contents.sendToFrame(frameId, channel, ...args)`

* `frameId` Integer
* `channel` String
* `...args` any[]

Send an asynchronous message to a specific frame in a renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

If you want to get the `frameId` of a given renderer context you should use the `webFrame.routingId` value. E.g.

```js
// レンダラープロセス内
console.log('My frameId is:', require('electron').webFrame.routingId)
```

You can also read `frameId` from all incoming IPC messages in the main process.

```js
// メインプロセス内
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

#### `contents.sendInputEvent(inputEvent)`

* `inputEvent` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

入力 `event` をページに送ります。 **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.

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
  * `file` String[] | String - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) | String - The image must be non-empty on macOS.

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.

#### `contents.savePage(fullPath, saveType)`

* `fullPath` String - The full file path.
* `saveType` String - Specify the save type. 
  * `HTMLOnly` - Save only the HTML of the page.
  * `HTMLComplete` - Save complete-html page.
  * `MHTML` - Save complete-html page as MHTML.

Returns `Promise<void>` - resolves if the page is saved.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', async () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete').then(() => {
    console.log('Page was saved successfully.')
  }).catch(err => {
    console.log(err)
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

**[非推奨](modernization/property-updates.md)**

#### `contents.getFrameRate()`

Returns `Integer` - If *offscreen rendering* is enabled returns the current frame rate.

**[非推奨](modernization/property-updates.md)**

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

V8 ヒープのスナップショットを撮り、それを `filePath` に保存します。

#### `contents.setBackgroundThrottling(allowed)`

* `allowed` Boolean

Controls whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

#### `contents.getType()`

Returns `String` - the type of the webContent. Can be `backgroundPage`, `window`, `browserView`, `remote`, `webview` or `offscreen`.

### インスタンスプロパティ

#### `contents.audioMuted`

A `Boolean` property that determines whether this page is muted.

#### `contents.userAgent`

A `String` property that determines the user agent for this web page.

#### `contents.zoomLevel`

A `Number` property that determines the zoom level for this web contents.

The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

#### `contents.zoomFactor`

A `Number` property that determines the zoom factor for this web contents.

The zoom factor is the zoom percent divided by 100, so 300% = 3.0.

#### `contents.frameRate`

An `Integer` property that sets the frame rate of the web contents to the specified number. Only values between 1 and 60 are accepted.

Only applicable if *offscreen rendering* is enabled.

#### `contents.id` *Readonly*

A `Integer` representing the unique ID of this WebContents.

#### `contents.session` *Readonly*

A [`Session`](session.md) used by this webContents.

#### `contents.hostWebContents` *Readonly*

A [`WebContents`](web-contents.md) instance that might own this `WebContents`.

#### `contents.devToolsWebContents` *Readonly*

A `WebContents` of DevTools for this `WebContents`.

**Note:** Users should never store this object because it may become `null` when the DevTools has been closed.

#### `contents.debugger` *Readonly*

A [`Debugger`](debugger.md) instance for this webContents.