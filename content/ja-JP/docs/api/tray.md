## クラス: tray

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
  tray.setToolTip('これは自分のアプリケーション。')
  tray.setContextMenu(contextMenu)
})
```

**プラットフォームによる制限:**

* Linux では、アプリインジゲータがサポートされている場合はそれが使用され、それ以外では `GtkStatusIcon` が代わりに使用されます。
* アプリインジゲータのみがある Linux ディストリビューションでは、tray アイコンを動かすために `libappindicator1` をインストールする必要があります。
* アプリインジゲータはコンテキストメニューがあるときのみ表示されます。
* Linux でアプリインジゲータが使用されるとき、`click` イベントは無視されます。
* On Linux in order for changes made to individual `MenuItem`s to take effect, you have to call `setContextMenu` again. For example:

```javascript
const {app, Menu, Tray} = require('electron')

let appIcon = null
app.on('ready', () => {
  appIcon = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'}
  ])

  // Make a change to the context menu
  contextMenu.items[1].checked = false

  // Call this again for Linux because we modified the context menu
  appIcon.setContextMenu(contextMenu)
})
```

* On Windows it is recommended to use `ICO` icons to get best visual effects.

If you want to keep exact same behaviors on all platforms, you should not rely on the `click` event and always attach a context menu to the tray icon.

### `new Tray(image)`

* `image` ([NativeImage](native-image.md) | String)

Creates a new tray icon associated with the `image`.

### インスタンスイベント

The `Tray` module emits the following events:

#### Event: 'click'

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon
* `position` [Point](structures/point.md) - The position of the event

Emitted when the tray icon is clicked.

#### Event: 'right-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon

Emitted when the tray icon is right clicked.

#### Event: 'double-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon

Emitted when the tray icon is double clicked.

#### Event: 'balloon-show' *Windows*

Emitted when the tray balloon shows.

#### Event: 'balloon-click' *Windows*

Emitted when the tray balloon is clicked.

#### Event: 'balloon-closed' *Windows*

Emitted when the tray balloon is closed because of timeout or user manually closes it.

#### Event: 'drop' *macOS*

Emitted when any dragged items are dropped on the tray icon.

#### Event: 'drop-files' *macOS*

* `event` Event
* `files` String[] - The paths of the dropped files.

Emitted when dragged files are dropped in the tray icon.

#### Event: 'drop-text' *macOS*

* `event` Event
* `text` String - the dropped text string

Emitted when dragged text is dropped in the tray icon.

#### Event: 'drag-enter' *macOS*

Emitted when a drag operation enters the tray icon.

#### Event: 'drag-leave' *macOS*

Emitted when a drag operation exits the tray icon.

#### Event: 'drag-end' *macOS*

Emitted when a drag operation ends on the tray or ends at another location.

#### Event: 'mouse-enter' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event

Emitted when the mouse enters the tray icon.

#### Event: 'mouse-leave' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event

Emitted when the mouse exits the tray icon.

#### Event: 'mouse-move' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event

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

Sets the title displayed aside of the tray icon in the status bar.

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
const tray = new Tray('/path/to/my/icon')

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
  * `icon` ([NativeImage](native-image.md) | String) - (optional)
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