## クラス: Tray

> システムの通知領域にアイコンやコンテキスト メニューを追加します。

プロセス: [Main](../glossary.md#main-process)

`Tray` は [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) です。

```javascript
const {app, Menu, Tray} = require('electron')

let tray = null
app.on('ready', () => {
  tray = new Tray('/自分の/アイコンへの/パス')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'アイテム1', type: 'radio'},
    {label: 'アイテム2', type: 'radio'},
    {label: 'アイテム3', type: 'radio', checked: true},
    {label: 'アイテム4', type: 'radio'}
  ])
  tray.setToolTip('これは自分のアプリケーションです。')
  tray.setContextMenu(contextMenu)
})
```

**プラットフォームによる制限:**

* Linux では、アプリインジゲータがサポートされている場合はそれが使用され、それ以外では `GtkStatusIcon` が代わりに使用されます。
* アプリインジゲータのみがある Linux ディストリビューションでは、tray アイコンを動かすために `libappindicator1` をインストールする必要があります。
* アプリインジゲータはコンテキストメニューがあるときのみ表示されます。
* Linux でアプリインジゲータが使用されるとき、`click` イベントは無視されます。
* Linux では、個々の `MenuItem` に加えられた変更を有効にするには、`setContextMenu` を再び呼ぶ必要があります。以下は例です。

```javascript
const {app, Menu, Tray} = require('electron')

let appIcon = null
app.on('ready', () => {
  appIcon = new Tray('/自分の/アイコンへの/パス')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'アイテム1', type: 'radio'},
    {label: 'アイテム2', type: 'radio'}
  ])

  // コンテキストメニューに変更を加える
  contextMenu.items[1].checked = false

  // コンテキストメニューを変更したので、Linux のためにこれを呼び直す
  appIcon.setContextMenu(contextMenu)
})
```

* Windows では、最適な視覚効果を得るために `ICO` 形式のアイコンファイルを使用することが推奨されています。

すべてのプラットフォームでまったく同じ動作を維持したい場合は、`click` イベントに頼らず、tray アイコンに常にコンテキストメニューを適用して下さい。

### `new Tray(image)`

* `image` ([NativeImage](native-image.md) | String)

`image` に関連する新しい tray アイコンを作成します。

### インスタンスイベント

`tray` モジュールには以下のイベントがあります。

#### イベント: 'click'

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - tray アイコンの境界。
* `position` [Point](structures/point.md) - イベントの位置。

tray アイコンがクリックされたときに発行されます。

#### イベント: 'right-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - tray アイコンの境界。

tray アイコンが右クリックされたときに発行されます。

#### イベント: 'double-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - tray アイコンの境界。

tray アイコンがダブルクリックされたときに発行されます。

#### イベント: 'balloon-show' *Windows*

tray バルーンを表示するときに発行されます。

#### イベント: 'balloon-click' *Windows*

tray バルーンがクリックされたときに発行されます。

#### イベント: 'balloon-closed' *Windows*

tray バルーンが、タイムアウトかユーザの手動で、閉じられたときに発行されます。

#### イベント: 'drop' *macOS*

tray アイコン上に何かのドラッグされたアイテムがドロップされたときに発行されます。

#### イベント: 'drop-files' *macOS*

* `event` Event
* `files` String[] - ドロップされたファイルのパス。

tray アイコン上にドラッグされたファイルがドロップされたときに発行されます。

#### イベント: 'drop-text' *macOS*

* `event` Event
* `text` String - ドロップされたテキスト文字列。

tray アイコン上にドラッグされたテキストがドロップされたときに発行されます。

#### イベント: 'drag-enter' *macOS*

ドラッグ操作が tray アイコン内に入ったときに発行されます。

#### イベント: 'drag-leave' *macOS*

ドラッグ操作が tray アイコン内から出たときに発行されます。

#### イベント: 'drag-end' *macOS*

ドラッグ操作が、tray 上か他の場所で終了したときに発行されます。

#### イベント: 'mouse-enter' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - イベントの位置。

マウスが tray アイコン内に入ったときに発行されます。

#### イベント: 'mouse-leave' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - イベントの位置。

マウスが tray アイコン内から出たときに発行されます。

#### イベント: 'mouse-move' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - イベントの位置。

マウスが tray アイコン内で動いたときに発行されます。

### インスタンスメソッド

`Tray` クラスは以下のメソッドを持ちます。

#### `tray.destroy()`

tray アイコンを即座に削除します。

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

この tray アイコンに関連付けられた `image` を設定します。

#### `tray.setPressedImage(image)` *macOS*

* `image` [NativeImage](native-image.md)

macOS において、この tray アイコンが押されたときの関連付けられた `image` を設定します。

#### `tray.setToolTip(toolTip)`

* `toolTip` String

この tray アイコンのホバーテキストを設定します。

#### `tray.setTitle(title)` *macOS*

* `title` String

ステータスバー内の tray アイコンの脇に表示されるタイトル (ANSI カラーサポート) を設定します。

#### `tray.setHighlightMode(mode)` *macOS*

* `mode` String - 以下の値のうちの一つの、強調表示モード。 
  * `selection` - tray アイコンがクリックされ、コンテキストメニューも開かれたとき、それを強調表示します。これはデフォルトです。
  * `always` - tray アイコンを常に強調表示します。
  * `never` - tray アイコンを強調表示することはありません。

tray のアイコンの背景を、いつ青く強調表示するかを設定します。

**注釈:** ウインドウの見た目が変更されたときは、`'never'` と `'always'` 間をトグル切り替えすることで、`highlightMode` を [`BrowserWindow`](browser-window.md) で使用できます。

```javascript
const {BrowserWindow, Tray} = require('electron')

const win = new BrowserWindow({width: 800, height: 600})
const tray = new Tray('/自分の/アイコンへの/パス')

tray.on('click', () => {
  win.isVisible() ? win.hide() : win.show()
})
win.on('show', () => {
  tray.setHighlightMode('always')
})
win.on('hide', () => {
  tray.setHighlightMode('never')
})
```

#### `tray.displayBalloon(options)` *Windows*

* `options` Object 
  * `icon` ([NativeImage](native-image.md) | String) (任意) -
  * `title` String
  * `content` String

tray のバルーンを表示します。

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (任意)
* `position` [Point](structures/point.md) (任意) - ポップアップ位置。

tray アイコンのコンテキストメニューをポップアップします。`menu` が渡されると、tray アイコンのコンテキストメニューの代わりに `menu` を表示します。

`position` は Windows でのみ有効で、省略値は (0, 0) です。

#### `tray.setContextMenu(menu)`

* `menu` Menu

このアイコンのコンテキストメニューを設定します。

#### `tray.getBounds()` *macOS* *Windows*

戻り値 [`Rectangle`](structures/rectangle.md)

`Object` としてのこの tray アイコンの `bounds`。

#### `tray.isDestroyed()`

戻り値 `Boolean` - tray アイコンが破棄されたかどうか。