# webContents

> ウェブページを描画、制御します。

プロセス: [Main](../glossary.md#main-process)

`webContents` は [EventEmitter][event-emitter] を継承しています。 [`BrowserWindow`](browser-window.md) オブジェクトのプロパティには、ウェブページを描画し、制御する責任があります。 以下は、`webContents` オブジェクトにアクセスする例です。

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('http://github.com')

const contents = win.webContents
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

戻り値 `WebContents` | undefined - 指定 ID の WebContents インスタンス。指定 ID に関連付けられた WebContents が存在しない場合は `undefined` です。

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

このイベントは `did-finish-load` に似ていますが、ロードが失敗したときも発行されます。 エラーコードとその意味のすべてのリストは [こちら](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h) です。

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

ナビゲーション中にページタイトルが設定されると発生します。 `explicitSet` は、タイトルがファイル URL から合成されている場合に false になります。

#### イベント: 'page-favicon-updated'

戻り値:

* `event` Event
* `favicons` String[] - URLの配列。

ページがファビコンの URL を受け取ると発行されます。

#### イベント: 'new-window' _非推奨_

戻り値:

* `event` NewWindowWebContentsEvent
* `url` String
* `frameName` String
* `disposition` String - `default`、`foreground-tab`、`background-tab`、`new-window`、`save-to-disk`、`other` にできる。
* `options` BrowserWindowConstructorOptions - 新しい [`BrowserWindow`](browser-window.md) を作成するのに使われるオプション。
* `additionalFeatures` String[] - `window.open()` に与えられている、標準でない機能 (Chromium や Electron によって処理されない機能)。
* `referrer` [Referrer](structures/referrer.md) - 新しいウィンドウへ渡される Referrer。 Referrer のポリシーに依存しているので、`Referrer` ヘッダを送信されるようにしてもしなくてもかまいません。
* `postBody` [PostBody](structures/post-body.md) (任意) - 新しいウィンドウに送信する POST データと、それにセットする適切なヘッダ。 送信する POST データが無い場合、値は `null` になります。 これは `target=_blank` を設定したフォームによってウィンドウが作成されている場合にのみセットされます。

これは [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler) に代わって非推奨となりました。

ページが `url` のための新しいウィンドウを開く要求をすると発生します。 `window.open` か `<a target='_blank'>` のような外部リンクによるリクエストである可能性があります。

デフォルトでは、`url` の新しい `BrowserWindow` が作成されます。

`event.preventDefault()` を呼ぶと、Electron が自動的に新しい [`BrowserWindow`](browser-window.md) を作成するのを防ぎます。 もし `event.preventDefault()` を呼び、新しい `BrowserWindow` を手動で作る場合、新しい [`BrowserWindow`](browser-window.md) インスタンスの参照を [`event.newGuest`](browser-window.md) にセットしなければ、予期しない動作になる可能性があります。 例:

```javascript
myBrowserWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures, referrer, postBody) => {
  event.preventDefault()
  const win = new BrowserWindow({
    webContents: options.webContents, // あれば既存の webContents を使用する
    show: false
  })
  win.once('ready-to-show', () => win.show())
  if (!options.webContents) {
    const loadOptions = {
      httpReferrer: referrer
    }
    if (postBody != null) {
      const { data, contentType, boundary } = postBody
      loadOptions.postData = postBody.data
      loadOptions.extraHeaders = `content-type: ${contentType}; boundary=${boundary}`
    }

    win.loadURL(url, loadOptions) // 自動で既存の webContents をナビゲーションする
  }
  event.newGuest = win
})
```

#### イベント: 'did-create-window'

戻り値:

* `window` BrowserWindow
* `details` Object
  * `url` String - 作成したウインドウの URL。
  * `frameName` String - `window.open()` の呼び出しで作成したウインドウに指定した名前。
  * `options` BrowserWindowConstructorOptions - その BrowserWindow の作成に使用したオプション。 これはマージされたもので、親ウインドウから継承したオプション、`window.open()` の `features` 文字列から解析したオプション、[`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler) で指定したオプションの順で優先されます。 認識できないオプションが取り除かれることはありません。
  * `additionalFeatures` String[] - 非標準の機能 (この機能は Chromium や Electron によって処理されません) _非推奨_
  * `referrer` [Referrer](structures/referrer.md) - 新しいウィンドウへ渡される Referrer。 リファラのポリシーに応じた `Referer` ヘッダーが送信されるとは限りません。
  * `postBody` [PostBody](structures/post-body.md) (任意) - 新しいウィンドウに送信される POST データと、設定される適切なヘッダです。 送信する POST データが無い場合、値は `null` になります。 これは `target=_blank` を設定したフォームによってウィンドウが作成されている場合にのみセットされます。
  * `disposition` String - `default`、`foreground-tab`、`background-tab`、`new-window`、`save-to-disk`、`other` にできます。

レンダラーで `window.open` を使用したウィンドウの作成に成功した _後_ に発生します。 [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler) からウインドウの作成がキャンセルされた場合には発生しません。

詳細や `webContents.setWindowOpenHandler` と併せた使用方法については [`window.open()`](window-open.md) をご参照ください。

#### イベント: 'will-navigate'

戻り値:

* `event` Event
* `url` String

ユーザーまたはページがナビゲーションを開始しようとしたときに発生します。 `window.location` オブジェクトが変更されるか、ユーザがページ内のリンクをクリックしたときに発生することがあります。

このイベントは、 `webContents.loadURL` や `webContents.back` のような API によって、プログラム上から開始されるナビゲーションのときには発行されません。

これは、アンカーリンクのクリックや `window.location.hash` の更新のような、ページ内ナビゲーションでも発行されません。 これを意図する場合は `did-navigate-in-page` を使用して下さい。

`event.preventDefault()` を呼ぶとナビゲーションが阻害されます。

#### イベント: 'did-start-navigation'

戻り値:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

フレーム (メインを含む) がナビゲーションを始めているときに発生します。 ページ内ナビゲーションの場合、`isInPlace` が `true` になります。

#### イベント: 'will-redirect'

戻り値:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

ナビゲーション中にサーバーサイドリダイレクトが発生すると発行されます。  302 リダイレクトなどがその例です。

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

ナビゲーション後にサーバーサイドリダイレクトが発生すると発行されます。  302 リダイレクトなどがその例です。

このイベントを阻害することはできません。リダイレクトを防ぎたい場合は、上記の `will-redirect` イベントを確認してください。

#### イベント: 'did-navigate'

戻り値:

* `event` Event
* `url` String
* `httpResponseCode` Integer - HTTP ナビゲーションが無い場合は-1
* `httpStatusText` String - HTTP ナビゲーションが無い場合は空

メインフレームのナビゲーションが完了したときに発生します。

このイベントは、アンカーリンクのクリックや `window.location.hash` の更新のような、ページ内ナビゲーションでは発行されません。 これを意図する場合は `did-navigate-in-page` を使用して下さい。

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

このイベントは、アンカーリンクのクリックや `window.location.hash` の更新のような、ページ内ナビゲーションでは発行されません。 これを意図する場合は `did-navigate-in-page` を使用して下さい。

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
  const choice = dialog.showMessageBoxSync(win, {
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

#### イベント: 'crashed' _非推奨_

戻り値:

* `event` Event
* `killed` Boolean

レンダラープロセスがクラッシュしたり、強制終了されたりしたときに発行されます。

**非推奨:** このイベントは `render-process-gone` イベント によって引き継がれます。このイベントには、子プロセスが失われた理由についての詳細情報が含まれています。 これはクラッシュした場合に限りません。  移植する場合は、Boolean 型の `killed` だと `reason === 'killed'` をチェックするように置き換えればできます。

#### イベント: 'render-process-gone'

戻り値:

* `event` Event
* `details` Object
  * `reason` String - レンダープロセスがなくなった理由。  取りうる値:
    * `clean-exit` - ゼロの終了コードでプロセスが終了した
    * `abnormal-exit` - 非ゼロの終了コードでプロセスが終了した
    * `killed` - プロセスが SIGTERM シグナルの送信などの方法でキルされた
    * `crashed` - プロセスがクラッシュした
    * `oom` - プロセスがメモリ不足になった
    * `launch-failed` - プロセスが正常に起動されなかった
    * `integrity-failure` - Windows コードの整合性チェックに失敗した
  * `exitCode` Integer - プロセスの終了コードです。`reason` が `launch-failed` でなければ、`exitCode` はプラットフォーム固有の起動失敗のエラーコードになります。

renderer processが予期せず消えたときに発生します。  プロセスがクラッシュした場合やキルされた場合は正常です。

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
* `input` Object - 入力プロパティ。
  * `type` String - `keyUp` か `keyDown`。
  * `key` String - [KeyboardEvent.key][keyboardevent] と同等。
  * `code` String - [KeyboardEvent.code][keyboardevent] と同等。
  * `isAutoRepeat` Boolean - [KeyboardEvent.repeat][keyboardevent] と同等。
  * `isComposing` Boolean - [KeyboardEvent.isComposing][keyboardevent] と等価です。
  * `shift` Boolean - [KeyboardEvent.shiftKey][keyboardevent] と同等。
  * `control` Boolean - [KeyboardEvent.controlKey][keyboardevent] と同等。
  * `alt` Boolean - [KeyboardEvent.altKey][keyboardevent] と同等。
  * `meta` Boolean - [KeyboardEvent.metaKey][keyboardevent] と同等。

ページ内の `keydown` と `keyup` イベントが発生する直前に発行されます。 `event.preventDefault` を呼ぶと、ページの `keydown`/`keyup` イベントとメニューショートカットを阻害します。

メニューショートカットだけを阻害するには、[`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore) を使用します。

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

win.webContents.on('before-input-event', (event, input) => {
  // For example, only enable application menu keyboard shortcuts when
  // Ctrl/Cmd are down.
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

`webContents` が Basic 認証を要求すると発生します。

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
* `color` (String | null) - '#rrggbb' 形式のテーマカラー。 テーマカラーが設定されていないと `null` です。

ページのテーマカラーが変わったときに発生します。 これは通常、メタタグを発見すると起こります。

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
  * `linkText` String - リンクに関連付けたテキスト。 リンクのコンテンツが画像の場合は、空文字列になります。
  * `pageURL` String - コンテキストメニューが呼び出された最上位のページの URL。
  * `frameURL` String - コンテキストメニューが呼び出されたサブフレームの URL。
  * `srcURL` String - コンテキストメニューが呼び出された要素のソース URL。 ソース URL を持つ要素は、画像、オーディオ、ビデオです。
  * `mediaType` String - コンテキストメニューが呼び出されたノードの種類。 `none`、`image`、`audio`、`video`、`canvas`、`file`、`plugin` になれる。
  * `hasImageContents` Boolean - 空でないコンテンツ画像の上でコンテキストメニューが呼び出されたかどうか。
  * `isEditable` Boolean - コンテキストが編集可能かどうか。
  * `selectionText` String - コンテキストメニューが呼び出されたときの選択テキスト。
  * `titleText` String - コンテキストメニューが呼び出された選択範囲のタイトルテキスト。
  * `altText` String - コンテキストメニューが呼び出された選択範囲の代替テキスト。
  * `suggestedFilename` String - コンテキストメニューの 'リンク先を名前を付けて保存' オプションでファイルを保存する際に使用されるファイル名の候補。
  * `selectionRect` [Rectangle](structures/rectangle.md) - 選択範囲の document 空間における座標を表す矩形。
  * `selectionStartOffset` Number - 選択テキストの開始位置。
  * `referrerPolicy` [Referrer](structures/referrer.md) - メニューが呼び出されるフレームのリファラポリシー。
  * `misspelledWord` String - カーソルの下のスペルミスした単語 (もしあるならば)。
  * `dictionarySuggestions` String[] - ユーザに `misspelledWord` の置き換えを示す推測した単語の配列。  単語のスペルミスがあり、スペルチェッカーが有効な場合にのみ利用できます。
  * `frameCharset` String - メニューが呼び出されたときのフレームのテキストエンコーディング。
  * `inputFieldType` String - 入力フィールド内でコンテキストメニューが呼び出されたときの、そのタイプ。 `none`、`plainText`、`password`、`other` になれる。
  * `spellcheckEnabled` Boolean - そのコンテキストが編集可能な場合に、スペルチェックが有効かどうか。
  * `menuSourceType` String - コンテキストメニューを呼び出した入力ソース。 `none`, `mouse`, `keyboard`, `touch`, `touchMenu`, `longPress`, `longTap`, `touchHandle`, `stylus`, `adjustSelection`, `adjustSelectionReset` のいずれかになります。
  * `mediaFlags` Object - コンテキストメニューが呼び出されたメディア要素のフラグ。
    * `inError` Boolean - メディア要素がクラッシュしたかどうか。
    * `isPaused` Boolean - メディア要素が一時停止されているかどうか。
    * `isMuted` Boolean - メディア要素がミュートされているかどうか。
    * `hasAudio` Boolean - メディア要素に音声があるかどうか。
    * `isLooping` Boolean - メディア要素をループしているかどうか。
    * `isControlsVisible` Boolean - メディア要素のコントロールが見えるかどうか。
    * `canToggleControls` Boolean - メディア要素のコントロールがトグル切り替えできるかどうか。
    * `canPrint` Boolean - そのメディア要素が印刷できるかどうか。
    * `canSave` Boolean - そのメディア要素がダウンロードできるかどうか。
    * `canShowPictureInPicture` Boolean - そのメディア要素がピクチャインピクチャ表示できるかどうか。
    * `isShowingPictureInPicture` Boolean - そのメディア要素をピクチャインピクチャ表示しているかどうか。
    * `canRotate` Boolean - メディア要素を回転できるかどうか。
    * `canLoop` Boolean - そのメディア要素をループ再生できるかどうか。
  * `editFlags` Object - これらのフラグは、レンダラーが対応するアクションを実行できると信頼しているかどうかを示します。
    * `canUndo` Boolean - レンダラーが、undo できると信頼しているかどうか。
    * `canUndo` Boolean - レンダラーが、redo できると信頼しているかどうか。
    * `canCut` Boolean - レンダラーが、カットできると信頼しているかどうか。
    * `canCopy` Boolean - レンダラーがコピーできると信頼しているかどうか。
    * `canPaste` Boolean - レンダラーが、ペーストできると信頼しているかどうか。
    * `canDelete` Boolean - レンダラーが、削除できると信頼しているかどうか。
    * `canSelectAll` Boolean - レンダラーが、全選択できると信頼しているかどうか。
    * `canEditRichly` Boolean - レンダラーがテキストをリッチ編集できると信頼しているかどうか。

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

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    const result = deviceList.find((device) => {
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

新しいフレームが生成されたときに発生します。 バッファには変更された部分だけが渡されます。

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ webPreferences: { offscreen: true } })
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
* `params` Record<string, string> - 他の `<webview>` パラメーター。`src` URL などがこれにあたります。 このオブジェクトを変更して、ゲストページのパラメーターを調整できます。

`<webview>` の webContents がこの webContents に適用されようとしているときに発行されます。 `event.preventDefault()` を呼ぶとゲストページを破棄します。

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
* `level` Integer - 0 から 3 のログレベル。 順に `verbose`、`info`、`warning`、`error` に対応します。
* `message` String - 実際のコンソールメッセージ
* `line` Integer - このコンソールメッセージのトリガーとなったソースの行番号
* `sourceId` String

関連付けられたウインドウがコンソールメッセージを出力すると発生します。

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

レンダラープロセス内で `desktopCapture.getSources()` が呼ばれたときに発生します。 `event.preventDefault()` を呼び出すと、空のソースを返します。

#### イベント: 'remote-require' _非推奨_

戻り値:

* `event` IpcMainEvent
* `モジュール名` String

レンダラープロセス内で `remote.require()` が呼ばれたときに発行されます。 `event.preventDefault()` を呼ぶとモジュールの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'remote-get-global' _非推奨_

戻り値:

* `event` IpcMainEvent
* `globalName` String

レンダラープロセス内で `remote.getGlobal()` が呼ばれたときに発行されます。 `event.preventDefault()` を呼ぶとグローバルの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'remote-get-builtin' _非推奨_

戻り値:

* `event` IpcMainEvent
* `モジュール名` String

レンダラープロセス内で `remote.getBuiltin()` が呼ばれたときに発行されます。 `event.preventDefault()` を呼ぶとモジュールの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'remote-get-current-window' _非推奨_

戻り値:

* `event` IpcMainEvent

レンダラープロセス内で `remote.getCurrentWindow()` が呼ばれたときに発行されます。 `event.preventDefault()` を呼ぶとオブジェクトの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'remote-get-current-web-contents' _非推奨_

戻り値:

* `event` IpcMainEvent

レンダラープロセス内で `remote.getCurrentWebContents()` が呼ばれたときに発行されます。 `event.preventDefault()` を呼ぶとオブジェクトの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

#### イベント: 'preferred-size-changed'

戻り値:

* `event` Event
* `preferredSize` [Size](structures/size.md) - スクロールなしでドキュメントのレイアウトを格納するのに必要な最小サイズ。

`WebContents` の優先サイズが変更された場合に発生します。

このイベントは、`webPreferences` で `enablePreferredSizeMode` が `true` に設定されている場合にのみ発生します。

### インスタンスメソッド

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Object (任意)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (任意) - HTTPリファラのURL。
  * `userAgent` String (任意) - リクエスト元のユーザーエージェント。
  * `extraHeaders` String (任意) - "\n" で区切られた追加のヘッダー。
  * `postData` ([UploadRawData](structures/upload-raw-data.md) | [UploadFile](structures/upload-file.md))[] (任意)
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

指定されたファイルをウインドウにロードします。`filePath` は、アプリケーションのルートを基準にした HTML ファイルへのパスにする必要があります。  たとえば以下のようなアプリの構造において、

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

ナビゲーションなしで `url` のリソースのダウンロードを初期化します。 `session` の `will-download` イベントが発生します。

#### `contents.getURL()`

戻り値 `String` - 現在のウェブページの URL。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com').then(() => {
  const currentURL = win.webContents.getURL()
  console.log(currentURL)
})
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

#### `contents.forcefullyCrashRenderer()`

この`webContents` を現在ホスティングしているレンダラープロセスを強制終了します。 これにより、 `reason=kill || reason=crashed` である、`render-process-gone` イベントが発生します。 レンダラープロセスを共有しているWebContents の中には、このメソッドを呼び出すと、他のウェブコンテンツのホストプロセスがクラッシュする場合がありますのでご注意ください。

メソッドを呼び出した直後にこの `reload()` を呼び出すと、新しいプロセスでリロードが発生します。 これは、このプロセスが不安定または使用不可の場合、例えば `unresponsive` イベントから回復する際に使用されるべきです。

```js
contents.on('unresponsive', async () => {
  const { response } = await dialog.showMessageBox({
    message: 'App X has become unresponsive',
    title: 'Do you want to try forcefully reloading the app?',
    buttons: ['OK', 'Cancel'],
    cancelId: 1
  })
  if (response === 0) {
    contents.forcefullyCrashRenderer()
    contents.reload()
  }
})
```

#### `contents.setUserAgent(userAgent)`

* `userAgent` String

このウェブページのユーザエージェントをオーバーライドします。

#### `contents.getUserAgent()`

戻り値 `String` - このウェブページのユーザエージェント。

#### `contents.insertCSS(css[, options])`

* `css` String
* `options` Object (任意)
  * `cssOrigin` String (任意) - 'user' または 'author' のいずれかです。'user' を指定すると、挿入した CSS がウェブサイトによって上書きされるのを防ぐことができます。 既定値は 'author' です。

戻り値 `Promise<String>` - 挿入された CSS のキーで解決される promise。後で `contents.removeInsertedCSS(key)` を使用して CSS を削除するために使用できます。

現在のウェブページに CSS を挿入し、挿入されたスタイルシートの一意なキーを返します。

```js
contents.on('did-finish-load', () => {
  contents.insertCSS('html, body { background-color: #f00; }')
})
```

#### `contents.removeInsertedCSS(key)`

* `key` String

戻り値 `Promise<void>` - 削除に成功すると解決されます。

現在のウェブページから挿入された CSS を削除します。 スタイルシートは `contents.insertCSS(css)` から返されるキーで識別されます。

```js
contents.on('did-finish-load', async () => {
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

* `worldId` Integer - JavaScript を実行するワールドの ID。`0` はデフォルトのワールドで、`999` は Electron の `contextIsolation` 機能で使用されるワールドです。  任意の整数を指定できます。
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (任意) - 省略値は `false`。

戻り値 `Promise<any>` - 実行されたコードの結果で resolve する Promise。コードの結果が reject な Promise である場合は reject な Promise。

`executeJavaScript` のように動きますが、 `scripts` はイソレートコンテキスト内で評価します。

#### `contents.setIgnoreMenuShortcuts(ignore)`

* `ignore` Boolean

この WebContents がフォーカスされている間、アプリケーションのメニューショートカットを無視します。

#### `contents.setWindowOpenHandler(handler)`

* `handler` Function<{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}>
  * `details` Object
    * `url` String - `window.open()` に渡されて _解決された_ URL。 例えば `window.open('foo')` でウインドウを開くと、これは `https://the-origin/the/current/path/foo` のようになります。
    * `frameName` String - `window.open()` で指定されたウインドウ名
    * `features` String - `window.open()` で指定されたウインドウ機能のカンマ区切りリスト。
    * `disposition` String - `default`、`foreground-tab`、`background-tab`、`new-window`、`save-to-disk`、`other` のいずれかにできます。
    * `referrer` [Referrer](structures/referrer.md) - 新しいウィンドウへ渡される Referrer。 Referrer のポリシーに依存しているので、`Referrer` ヘッダを送信されるようにしてもしなくてもかまいません。
    * `postBody` [PostBody](structures/post-body.md) (任意) - 新しいウィンドウに送信する POST データと、それにセットする適切なヘッダ。 送信する POST データが無い場合、値は `null` になります。 これは `target=_blank` を設定したフォームによってウィンドウが作成されている場合にのみセットされます。

  戻り値 `{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}` - `deny` を返すと新規ウインドウの作成をキャンセルします。 `allow` を返すと新規ウインドウが作成されます。 `overrideBrowserWindowOptions` を指定すると、作成されるウィンドウをカスタマイズできます。 null、undefined、規定の 'action' の値を持たないオブジェクトといった認識されない値を返すと、コンソールエラーになり、`{action: 'deny'}` を返すのと同じ効果となります。

レンダラーから `window.open()` が呼び出されたときに、ウィンドウの作成前に呼び出されます。 詳細や `did-create-window` と併せた使用方法については [`window.open()`](window-open.md) をご参照ください。

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

現在のウェブページのオーディオをミュートします。

#### `contents.isAudioMuted()`

戻り値 `Boolean` - このページがミュートされているかどうか。

#### `contents.isCurrentlyAudible()`

戻り値 `Boolean` - 音声が現在再生中かどうか。

#### `contents.setZoomFactor(factor)`

* `factor` Double - 拡大率。省略値は 1.0 です。

指定の拡大率に変更します。 拡大率は百分率なので、300% = 3.0 です。

拡大率は 0.0 より大きい必要があります。

#### `contents.getZoomFactor()`

戻り値 `Number` - 現在の拡大率。

#### `contents.setZoomLevel(level)`

* `level` Number - 拡大レベル。

指定レベルに拡大レベルを変更します。 原寸は 0 で、各増減分はそれぞれ 20% ずつの拡大または縮小を表し、デフォルトで元のサイズの 300% から 50% までに制限されています。 この式は `scale := 1.2 ^ level` です。

> **注意**: Chromium でのズームポリシーはドメインごとです。すなわち、特定ドメインのズームレベルは、同じドメインのウィンドウの全インスタンスに伝播します。 ウインドウの URL が別々であれば、ウインドウごとのズームになります。

#### `contents.getZoomLevel()`

戻り値 `Number` - 現在の拡大レベル。

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

戻り値 `Promise<void>`

ピンチによる拡大レベルの最大値と最小値を設定します。

> **注意**: Electron ではデフォルトで視覚ズームは無効化されています。 再び有効にする場合は以下を呼び出します。
> 
> ```js
> contents.setVisualZoomLevelLimits(1, 3)
> ```

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

戻り値 `Promise<void>`

フォーカスされた要素に `text` を挿入します。

#### `contents.findInPage(text[, options])`

* `text` String - 検索するコンテンツ。空にしてはいけません。
* `options` Object (任意)
  * `forward` Boolean (任意) - 前方または後方を検索するかどうか。省略値は `true`。
  * `findNext` Boolean (任意) - この要求で新規テキスト検索セッションを開始するかどうか。 最初の要求では `true` に、二度目以降の要求では `false` にする必要があります。 省略値は `false` 。
  * `matchCase` Boolean (任意) - 大文字と小文字を区別する検索かどうか。省略値は `false`。

戻り値 `Integer` - リクエストに使われたリクエスト ID。

ウェブページ内の `text` のすべてのマッチを探すリクエストを開始します。 リクエストの結果は [`found-in-page`](web-contents.md#event-found-in-page) イベントを読むことで取得できます。

#### `contents.stopFindInPage(action)`

* `action` String - [`webContents.findInPage`] リクエストを終了する際に行う動作を指定します。
  * `clearSelection` - 選択を消去する。
  * `keepSelection` - その選択を通常の選択に変換する。
  * `activateSelection` - 選択ノードをフォーカスして、クリックする。

指定された `action` で、`webContents` の `findInPage` リクエストを停止します。

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

`rect` 内のページのスナップショットをキャプチャします。 `rect` を省略すると、表示されているページ全体をキャプチャします。

#### `contents.isBeingCaptured()`

Returns `Boolean` - このページがキャプチャされているかどうか。 キャプチャーの数が 0 より大きい場合は true を返します。

#### `contents.incrementCapturerCount([size, stayHidden, stayAwake])`

* `size` [Size](structures/size.md) (任意) - キャプチャの優先サイズ。
* `stayHidden` Boolean (任意) -  ページを表示せずに非表示のままにします。
* `stayAwake` Boolean (任意) -  システムをスリープさせずに、起きたままにします。

キャプチャ回数は 1 ずつ増加します。 ブラウザーウインドウが非表示でもキャプチャ回数がゼロではない場合、ページは表示されていると見なされます。 ページを非表示のままにする場合は、`stayHidden` を true に設定していることを確認してください。

これは Page Visibility API にも影響を与えます。

#### `contents.decrementCapturerCount([stayHidden, stayAwake])`

* `stayHidden` Boolean (任意) -  ページを表示状態にせず非表示のままにします。
* `stayAwake` Boolean (任意) -  システムをスリープさせずに、起きたままにします。

キャプチャ回数は 1 ずつ減少します。 ブラウザウィンドウが隠されるまたはオクルージョンされるか、キャプチャーカウントが 0 になると、ページは非表示状態やオクルージョン状態にセットされます。 代わりに非表示のキャプチャ回数を減らしたい場合は、`stayHidden` を true に設定してください。

#### `contents.getPrinters()`

システムプリンタのリストを取得します。

戻り値 [`PrinterInfo[]`](structures/printer-info.md)

#### `contents.print([options], [callback])`

* `options` Object (任意)
  * `silent` Boolean (任意) - プリンタの設定をユーザに尋ねないかどうか。 省略値は、`false` です。
  * `printBackground` Boolean (任意) - ウェブページの背景色と画像を印刷するかどうか。 省略値は、`false` です。
  * `deviceName` String (任意) - 使用するプリンタデバイスの名前をセットします。 '人間向けの' 名称ではなくシステム定義名である必要があります。例えば、'Brother QL-820NWB' ではなく 'Brother_QL_820NWB' とします。
  * `color` Boolean (任意) - 印刷するウェブページをカラーにするかグレースケールにするかを設定します。 省略値は `true` です。
  * `margins` Object (任意)
    * `marginType` String (任意) - `default`、`none`、`printableArea` か `custom` にできます。 `custom` を選択した場合、`top`、`bottom`、`left`、`right` も指定する必要があります。
    * `top` Number (任意) - 印刷されたウェブページの上側のマージン。ピクセル単位です。
    * `bottom` Number (任意) - 印刷されたウェブページの下側のマージン。ピクセル単位です。
    * `left` Number (任意) - 印刷されたウェブページの左側のマージン。ピクセル単位です。
    * `right` Number (任意) - 印刷されたウェブページの右側のマージン。ピクセル単位です。
  * `landscape` Boolean (任意) - ウェブページを横向きモードで印刷するかどうか。 省略値は、`false` です。
  * `scaleFactor` Number (任意) - ウェブページのスケール係数。
  * `pagesPerSheet` Number (任意) - ページシートごとに印刷するページ数。
  * `collate` Boolean (任意) - ウェブページを校合するかどうか。
  * `copies` Number (任意) - 印刷するウェブページの版数。
  * `pageRanges` Object[]  (任意) - 印刷するページ範囲。 macOS では 1 つの範囲のみが許可されています。
    * `from` Number - 印刷する最初のページのインデックス (0 始まり)。
    * `to` Number - 印刷する最後のページのインデックス (これを含む) (0 始まり)。
  * `duplexMode` String (任意) - 印刷されるウェブページの両面モードを設定します。 `simplex`、`shortEdge`、`longEdge` のいずれかにできます。
  * `dpi` Record<string, number> (任意)
    * `horizontal` Number (任意) - 水平 DPI。
    * `vertical` Number (任意) - 垂直 DPI。
  * `header` String (任意) - ページヘッダーとして印刷される文字列。
  * `footer` String (任意) - ページフッターとして印刷される文字列。
  * `pageSize` String | Size (任意) - 印刷するドキュメントのページサイズを指定します。 `A3`、`A4`、`A5`、`Legal`、`Letter`、`Tabloid` のいずれかにするか、`height` を含む Object にできます。
* `callback` Function (任意)
  * `success` Boolean - 印刷呼び出しの成功を示す。
  * `failureReason` String - 印刷に失敗した場合に呼び戻されるエラーの説明。

カスタムの `pageSize` を渡すと、Chromium は `width_microns` と `height_microns` それぞれのプラットフォーム固有の最小値を検証しようとします。 幅、高さともに最低 353 ミクロンでなければなりませんが、オペレーティングシステムによってはそれ以上になることがあります。

ウインドウのウェブページを印刷します。 `silent` が `true` にセットされたとき、`deviceName` が空で印刷のデフォルト設定があれば、Electron はシステムのデフォルトプリンタを選択します。

`page-break-before: always;` CSS スタイルを使用して、強制的に改ページして印刷できます。

使用例:

```js
const options = {
  silent: true,
  deviceName: 'My-Printer',
  pageRanges: [{
    from: 0,
    to: 1
  }]
}
win.webContents.print(options, (success, errorType) => {
  if (!success) console.log(errorType)
})
```

#### `contents.printToPDF(options)`

* `options` Object
  * `headerFooter` Record<string, string> (任意) - PDF のヘッダーとフッター。
    * `title` String - PDF ヘッダーのタイトル。
    * `url` String - PDF フッターの URL。
  * `landscape` Boolean (任意) - `true` で横向き、`false` で縦向き。
  * `marginsType` Integer (optional) - 使用する余白の種類を指定します。 0 で既定値、1 で余白なし、2 で最小限の余白になります。
  * `scaleFactor` Number (任意) - ウェブページのスケール係数。 0 から 100 の範囲にできます。
  * `pageRanges` Record<string, number> (任意) - 印刷するページ範囲。
    * `from` Number - 印刷する最初のページのインデックス (0 始まり)。
    * `to` Number - 印刷する最後のページのインデックス (これを含む) (0 始まり)。
  * `pageSize` String | Size (任意) - 生成する PDF のページサイズを指定します。 `A3`、`A4`、`A5`、`Legal`、`Letter`、`Tabloid`、またはミクロン単位の `height` と `width` を含む Object にできます。
  * `printBackground` Boolean (任意) - CSS 背景を印刷するかどうか。
  * `printSelectionOnly` Boolean (任意) - 選択部分だけを印刷するかどうか。

戻り値 `Promise<Buffer>` - 生成された PDF データで実行されます。

Chromium の印刷のカスタム設定のプレビューで、PDF としてウインドウのウェブページを出力します。

`@page` CSS ルールがウェブページ内で使われている場合、`landscape` は無視されます。

デフォルトでは、空の `options` は以下のようにみなされます。

```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false,
  pageSize: 'A4',
  scaleFactor: 100
}
```

`page-break-before: always;` CSS スタイルを使用して、強制的に改ページして印刷できます。

これは `webContents.printToPDF` の例です。

```javascript
const { BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')
const os = require('os')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}).then(data => {
    const pdfPath = path.join(os.homedir(), 'Desktop', 'temp.pdf')
    fs.writeFile(pdfPath, data, (error) => {
      if (error) throw error
      console.log(`Wrote PDF successfully to ${pdfPath}`)
    })
  }).catch(error => {
    console.log(`Failed to write PDF to ${pdfPath}: `, error)
  })
})
```

#### `contents.addWorkSpace(path)`

* `path` String

指定したパスをデベロッパー ツールのワークスペースに追加します。 デベロッパー ツールが生成された後で使用しなければいけません。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
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
  <webview id="devtools" src="about:blank"></webview>
  <script>
    const { ipcRenderer } = require('electron')
    const emittedOnce = (element, eventName) => new Promise(resolve => {
      element.addEventListener(eventName, event => resolve(event), { once: true })
    })
    const browserView = document.getElementById('browser')
    const devtoolsView = document.getElementById('devtools')
    const browserReady = emittedOnce(browserView, 'dom-ready')
    const devtoolsReady = emittedOnce(devtoolsView, 'dom-ready')
    Promise.all([browserReady, devtoolsReady]).then(() => {
      const targetId = browserView.getWebContentsId()
      const devtoolsId = devtoolsView.getWebContentsId()
      ipcRenderer.send('open-devtools', targetId, devtoolsId)
    })
  </script>
</body>
</html>
```

```js
// Main process
const { ipcMain, webContents } = require('electron')
ipcMain.on('open-devtools', (event, targetContentsId, devtoolsContentsId) => {
  const target = webContents.fromId(targetContentsId)
  const devtools = webContents.fromId(devtoolsContentsId)
  target.setDevToolsWebContents(devtools)
  target.openDevTools()
})
```

`BrowserWindow` 内で開発者向けツールを表示する例:

```js
const { app, BrowserWindow } = require('electron')

let win = null
let devtools = null

app.whenReady().then(() => {
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({ mode: 'detach' })
})
```

#### `contents.openDevTools([options])`

* `options` Object (任意)
  * `mode` String - 指定したドック状態で開発者向けツールを開く。`right`、`bottom`、`undocked`、`detach` にできる。 省略値は最後に使用したときのドック状態。 `undocked` モードではドックを後ろにやれる。 `detach` モードではできない。
  * `activate` Boolean (任意) - 開かれたデベロッパー ツールウインドウを前面に表示するかどうか。 省略値は `true` です。

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

#### `contents.inspectSharedWorker()`

共有ワーカーコンテキストの開発者向けツールを開きます。

#### `contents.inspectSharedWorkerById(workerId)`

* `workerId` String

ID に基づいて共有ワーカーのインスペクターを起動します。

#### `contents.getAllSharedWorkers()`

戻り値 [`SharedWorkerInfo[]`](structures/shared-worker-info.md) - すべての共有ワーカーに関する情報。

#### `contents.inspectServiceWorker()`

サービスワーカコンテキストの開発者向けツールを開きます。

#### `contents.send(channel, ...args)`

* `channel` String
* `...args` any[]

引数と共に、`channel` を介してレンダラープロセスに非同期メッセージを送信します。 引数は [`postMessage`][] と同じように [構造化複製アルゴリズム][SCA] によってシリアライズされるため、プロトタイプチェーンは含まれません。 関数、Promise、Symbol、WeakMap、WeakSet の送信は、例外が送出されます。

> **注意**: DOM オブジェクトや特殊な Electron オブジェクトなど、非標準の JavaScript 型を送信すると例外が発生します。

レンダラープロセスは `ipcRenderer` モジュールで [`channel`](ipc-renderer.md) を聞いてメッセージを処理できます。

以下はメインプロセスからレンダラープロセスにメッセージを送る例です。

```javascript
// メインプロセス
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
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
      console.log(message) // Prints 'whoooooooh!'
    })
  </script>
</body>
</html>
```

#### `contents.sendToFrame(frameId, channel, ...args)`

* `frameId` Integer | [number, number] - 送信先のフレームの ID、またはフレームがメインフレームと異なるプロセスにある場合に `[processId, frameId]` の組み合わせを指定します。
* `channel` String
* `...args` any[]

引数と共に、`channel` を介してレンダラープロセス内の指定のフレームに非同期メッセージを送信します。 引数は [`postMessage`][] と同じように [構造化複製アルゴリズム][SCA] によってシリアライズされるため、プロトタイプチェーンは含まれません。 関数、Promise、Symbol、WeakMap、WeakSet の送信は、例外が送出されます。

> **注意:** DOM オブジェクトや特殊な Electron オブジェクトなど、非標準の JavaScript 型を送信すると例外が発生します。

レンダラープロセスは `ipcRenderer` モジュールで [`channel`](ipc-renderer.md) を聞いてメッセージを処理できます。

与えられたレンダラーコンテキストの `frameId` を取得したい場合は、`webFrame.routingId` の値を使用します。  以下は例です。

```js
// レンダラープロセス内
console.log('My frameId is:', require('electron').webFrame.routingId)
```

メインプロセス内の受信した IPC メッセージすべてから `frameId` を読み取ることもできます。

```js
// メインプロセス内
ipcMain.on('ping', (event) => {
  console.info('Message came from frameId:', event.frameId)
})
```

#### `contents.postMessage(channel, message, [transfer])`

* `channel` String
* `message` any
* `transfer` MessagePortMain[] (任意)

レンダラープロセスにメッセージを送信し、任意で 0 個以上の [`MessagePortMain`][] オブジェクトの所有権を転送します。

転送された `MessagePortMain` オブジェクトは、レンダラープロセスで発生したイベントの `ports` プロパティにアクセスすれば利用できます。 レンダラーに着くと、それらはネイティブの DOM `MessagePort` オブジェクトになります。

例:

```js
// メインプロセス
const { port1, port2 } = new MessageChannelMain()
webContents.postMessage('port', { message: 'hello' }, [port1])

// レンダラープロセス
ipcRenderer.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

#### `contents.enableDeviceEmulation(parameters)`

* `parameters` Object
  * `screenPosition` String - エミュレートする画面の種類を以下から指定します (省略値: `desktop`)。
    * `desktop` - デスクトップ画面タイプ.
    * `mobile` - モバイル画面タイプ.
  * `screenSize` [Size](structures/size.md) - エミュレートされる画面サイズの設定 (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - スクリーン上のビューの位置 (screenPosition == mobile) (省略値: `{ x: 0, y: 0 }`).
  * `deviceScaleFactor` Integer - デバイスの拡大率の設定 (ゼロなら元々のデバイスの拡大率) (省略値: `0`).
  * `screenSize` [Size](structures/size.md) - エミュレートされるビューのサイズの設定 (空は上書きしないことを意味する)
  * `scale` Float - 有効なスペース内のエミュレートするビューの拡大率。 (表示モードにフィットしない) (省略値: `1`).

与えられた引数でデバイスのエミュレートを有効にします

#### `contents.disableDeviceEmulation()`

`webContents.enableDeviceEmulation` で有効にしたデバイスのエミュレートを向こうにします。

#### `contents.sendInputEvent(inputEvent)`

* `inputEvent` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

入力 `event` をページに送ります。 **注釈:** `sendInputEvent()` が動くには、そのコンテツを含む [`BrowserWindow`](browser-window.md) がフォーカスされている必要があります。

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (任意) - 省略値は `false`。
* `callback` Function
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Rectangle](structures/rectangle.md)

プレゼンテーションイベントとキャプチャされたフレームの監視を開始し、プレゼンテーションイベントがあれば、`callbabck` が `callback(image, dirtyRect)` で呼ばれます。

`image` はキャプチャされたフレームを格納する [NativeImage](native-image.md) のインスタンスです。

`dirtyRect` は 再描画されたページの部分を示す `x, y, width, height` プロパティのオブジェクトです。 もし `onlyDirty` が `true` にセットされている場合、`image` は再描画された領域だけを含みます。 `onlyDirty` の省略値は `false` です。

#### `contents.endFrameSubscription()`

フレームプレゼンテーションイベントの監視を終了します。

#### `contents.startDrag(item)`

* `item` Object
  * `file` String[] | String - ドラッグが開始されたファイルへのパス。
  * `icon` [NativeImage](native-image.md) | String - 画像です。macOS では空にできません。

現在の D&D 操作のドラッグアイテムに `item` をセットします。`file` はドラッグされるファイルへの絶対パスで、`icon` はドラッグするときにカーソルの下に表示される画像です。

#### `contents.savePage(fullPath, saveType)`

* `fullPath` String - 完全なファイルパス。
* `saveType` String - 保存のタイプを指定します。
  * `HTMLOnly` - ページの HTML だけを保存する。
  * `HTMLComplete` - 完全な HTML ページを保存する。
  * `MHTML` - MHTML として完全な HTML ページを保存する。

戻り値 `Promise<void>` - ページが保存された場合に実行されます。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', async () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete').then(() => {
    console.log('Page was saved successfully.')
  }).catch(err => {
    console.log(err)
  })
})
```

#### `contents.showDefinitionForSelection()` _macOS_

ページ上の選択された単語を検索するポップアップ辞書を表示します。

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

もし *オフスクリーンレンダリング* が有効であれば指定された数字にフレームレートをセットします。 1 から 240 の値のみを受け取ります。

#### `contents.getFrameRate()`

戻り値 `Boolean` - もし *オフスクリーンレンダリング* が有効であれば、現在のフレームレートを返します。

#### `contents.invalidate()`

このウェブコンテンツが入っているウインドウの完全な再描画をスケジュールします。

もし *オフスクリーンレンダリング* が有効であれば、フレームを無効にし、`'paint'` を通して新しいフレームを生成します。

#### `contents.getWebRTCIPHandlingPolicy()`

戻り値 `String` - WebRTC IP ハンドリングポリシーを返します。

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` String - WebRTC IP ハンドリングポリシーを指定します。
  * `default` - ユーザの公開IPとローカルIPを公開します。 これはデフォルトの動作です。 このポリシーが使用されるとき、WebRTC には、すべてのインターフェースを列挙し、それらを結合して公開インターフェースを検出する権利があります。
  * `default_public_interface_only` - ユーザの公開IPを公開しますが、ユーザのローカルIPは公開しません。 このポリシーが使用されるとき、WebRTC は HTTP が使用するデフォルトのルートのみを使用する必要があります。 これはどのローカルアドレスも公開しません。
  * `default_public_and_private_interfaces` - ユーザの公開IPとローカルIPを公開します。 このポリシーが使用されるとき、WebRTC は HTTP が使用するデフォルトのルートのみを使用する必要があります。 これは関連するデフォルトのプライベートアドレスも公開します。 デフォルトルートは、マルチホームのエンドポイント上で OS によって選択されたルートです。
  * `disable_non_proxied_udp` - パブリック IP やローカル IP を非公開にします。 このポリシーが使用される WebRTC は、プロキシサーバーが UDP をサポートしていない限り、TCP を使用してピアまたはサーバーに接続する必要があります。

WebRTC IP ハンドリングポリシーを設定すると、WebRTC を介して公開される IP を制御できます。 より詳しくは [BrowserLeaks](https://browserleaks.com/webrtc) を参照して下さい。

#### `contents.getOSProcessId()`

戻り値 `Integer` - 関連するレンダラープロセスのオペレーティングシステムの `pid`。

#### `contents.getProcessId()`

戻り値 `Integer` - 関連するレンダラーの Chromium 内部の `pid`。 フレーム特有のナビゲーションイベント (`did-frame-navigate` など) で渡される `frameProcessId` と比較できます。

#### `contents.takeHeapSnapshot(filePath)`

* `filePath` String - 出力ファイルのパス

戻り値 `Promise<void>` - スナップショットの作成が成功したかどうかを示します。

V8 ヒープのスナップショットを撮り、それを `filePath` に保存します。

#### `contents.getBackgroundThrottling()`

戻り値 `Boolean` - ページがバックグラウンドになったときに、この WebContents がアニメーションやタイマーを抑制するかどうか。 これは Page Visibility API にも影響を与えます。

#### `contents.setBackgroundThrottling(allowed)`

* `allowed` Boolean

ページがバックグラウンドになったときにこの WebContents がアニメーションとタイマーを抑制するかどうかを制御します。 これは Page Visibility API にも影響を与えます。

#### `contents.getType()`

Returns `String` - webContents の型。 `backgroundPage`、`window`、`browserView`、`remote`、`webview` か `offscreen` になります。

### インスタンスプロパティ

#### `contents.audioMuted`

このページをミュートするかどうかを決定する `Boolean` プロパティ。

#### `contents.userAgent`

このウェブページのユーザーエージェントを決定する `String` プロパティ。

#### `contents.zoomLevel`

このウェブコンテンツのズームレベルを決定する `Number` プロパティ。

原寸は 0 で、各増減分はそれぞれ 20% ずつの拡大または縮小を表し、デフォルトで元のサイズの 300% から 50% までに制限されています。 The formula for this is `scale := 1.2 ^ level`.

#### `contents.zoomFactor`

`Number` 型のプロパティです。このウェブコンテンツのズーム率を決定します。

ズーム率は百分率のズームなので、300% = 3.0 になります。

#### `contents.frameRate`

`Integer` 型のプロパティです。ウェブコンテンツのフレームレートを指定された数値に設定します。 1 から 240 の値のみを受け取ります。

*オフスクリーンレンダリング* が有効な場合にのみ適用されます。

#### `contents.id` _読み出し専用_

この WebContents の一意のIDを表す `Integer`。 各 ID は、この Electron アプリケーション全体のすべての `WebContents` インスタンス間で一意です。

#### `contents.session` _読み出し専用_

この webContents で使われる [`Session`](session.md)。

#### `contents.hostWebContents` _読み出し専用_

この `WebContents` を所有するかもしれない [`WebContents`](web-contents.md) インスタンス。

#### `contents.devToolsWebContents` _読み出し専用_

`WebContents | null` 型のプロパティ。その `WebContents` に関連付けられたデベロッパー ツール の `WebContents` を表します。

**注釈:** 開発者向けツールが閉じられたときに `null` になる可能性があるので、このオブジェクトは決して格納しないで下さい。

#### `contents.debugger` _読み出し専用_

この webContents の [`Debugger`](debugger.md) インスタンス。

#### `contents.backgroundThrottling`

`Boolean` 型のプロパティです。ページがバックグラウンドになったときに、この WebContents がアニメーションやタイマーを抑制するかどうかを決定します。 これは Page Visibility API にも影響を与えます。

#### `contents.mainFrame` _読み出し専用_

[`WebFrameMain`](web-frame-main.md) 型のプロパティで、ページの最上位階層のフレームを表します。

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
