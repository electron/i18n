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
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.
* `position` [Point](structures/point.md) - The position of the event.

tray アイコンがクリックされたときに発行されます。

#### イベント: 'right-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.

tray アイコンが右クリックされたときに発行されます。

#### イベント: 'double-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.

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
* `text` String - the dropped text string.

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
* `position` [Point](structures/point.md) - The position of the event.

マウスが tray アイコン内に入ったときに発行されます。

#### イベント: 'mouse-leave' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event.

マウスが tray アイコン内から出たときに発行されます。

#### Event: 'mouse-move' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event.

Emitted when the mouse moves in the tray icon.

### インスタンスメソッド

The `Tray` class has the following methods:

#### `tray.destroy()`

Destroys the tray icon immediately.

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this tray icon.

#### `tray.setPressedImage(image)` *macOS*

* `image` [NativeImage](native-image.md)

Sets the `image` associated with this tray icon when pressed on macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Sets the hover text for this tray icon.

#### `tray.setTitle(title)` *macOS*

* `title` String

Sets the title displayed aside of the tray icon in the status bar (Support ANSI colors).

#### `tray.setHighlightMode(mode)` *macOS*

* `mode` String - Highlight mode with one of the following values: 
  * `selection` - Highlight the tray icon when it is clicked and also when its context menu is open. This is the default.
  * `always` - Always highlight the tray icon.
  * `never` - Never highlight the tray icon.

Sets when the tray's icon background becomes highlighted (in blue).

**Note:** You can use `highlightMode` with a [`BrowserWindow`](browser-window.md) by toggling between `'never'` and `'always'` modes when the window visibility changes.

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
  * `icon` ([NativeImage](native-image.md) | String) (optional) -
  * `title` String
  * `content` String

Displays a tray balloon.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (optional)
* `position` [Point](structures/point.md) (optional) - The pop up position.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

The `position` is only available on Windows, and it is (0, 0) by default.

#### `tray.setContextMenu(menu)`

* `menu` Menu

Sets the context menu for this icon.

#### `tray.getBounds()` *macOS* *Windows*

戻り値 [`Rectangle`](structures/rectangle.md)

The `bounds` of this tray icon as `Object`.

#### `tray.isDestroyed()`

Returns `Boolean` - Whether the tray icon is destroyed.