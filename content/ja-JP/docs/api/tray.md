## クラス: Tray

> システムの通知領域にアイコンやコンテキスト メニューを追加します。

プロセス: [Main](../glossary.md#main-process)

`Tray` は [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) です。

```javascript
const { app, Menu, Tray } = require('electron')

let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
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
const { app, Menu, Tray } = require('electron')

let appIcon = null
app.on('ready', () => {
  appIcon = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])

  // Make a change to the context menu
  contextMenu.items[1].checked = false

  // Call this again for Linux because we modified the context menu
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

戻り値:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - tray アイコンの境界。
* `position` [Point](structures/point.md) - イベントの位置。

tray アイコンがクリックされたときに発行されます。

#### イベント: 'right-click' *macOS* *Windows*

戻り値:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - tray アイコンの境界。

tray アイコンが右クリックされたときに発行されます。

#### イベント: 'double-click' *macOS* *Windows*

戻り値:

* `event` [KeyboardEvent](structures/keyboard-event.md)
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

戻り値:

* `event` Event
* `files` String[] - ドロップされたファイルのパス。

tray アイコン上にドラッグされたファイルがドロップされたときに発行されます。

#### イベント: 'drop-text' *macOS*

戻り値:

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

戻り値:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - イベントの位置。

マウスが tray アイコン内に入ったときに発行されます。

#### イベント: 'mouse-leave' *macOS*

戻り値:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - イベントの位置。

マウスが tray アイコン内から出たときに発行されます。

#### イベント: 'mouse-move' *macOS* *Windows*

戻り値:

* `event` [KeyboardEvent](structures/keyboard-event.md)
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

* `image` ([NativeImage](native-image.md) | String)

macOS において、この tray アイコンが押されたときの関連付けられた `image` を設定します。

#### `tray.setToolTip(toolTip)`

* `toolTip` String

この tray アイコンのホバーテキストを設定します。

#### `tray.setTitle(title)` *macOS*

* `title` String

ステータスバー内の tray アイコンの隣に表示されるタイトル (ANSI カラーサポート) を設定します。

#### `tray.getTitle()` *macOS*

戻り値 `String` - ステータスバーの tray アイコンの隣に表示されるタイトル

#### `tray.setIgnoreDoubleClickEvents(ignore)` *macOS*

* `ignore` Boolean

ダブルクリックイベントを無視するよう設定します。これらのイベントを無視することで tray アイコンそれぞれの独立したクリックを検知することを許可します。

この値はデフォルトで false にセットされます。

#### `tray.getIgnoreDoubleClickEvents()` *macOS*

戻り値 `Boolean` - ダブルクリックイベントが無視されているかどうか。

#### `tray.displayBalloon(options)` *Windows*

* `options` Object 
  * `icon` ([NativeImage](native-image.md) | String) (任意) - `iconType` が `custom` のときに使うアイコン。
  * `iconType` String (任意) - `none`、`info`、`warning`、`error`、`custom` のいずれかにできます。省略値は `custom` です。
  * `title` String
  * `content` String
  * `largeIcon` Boolean (任意) - 大きなバージョンのアイコン。できればこちらを使用します。 省略値は `true` です。 [`NIIF_LARGE_ICON`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_large_icon-0x00000020) に対応します。
  * `noSound` Boolean (任意) - 関連付けられたサウンドを再生しないようにします。 省略値は、`false` です。 [`NIIF_NOSOUND`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_nosound-0x00000010) に対応します。
  * `respectQuietTime` Boolean (optional) - Do not display the balloon notification if the current user is in "quiet time". 省略値は、`false` です。 Maps to [`NIIF_RESPECT_QUIET_TIME`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_respect_quiet_time-0x00000080).

tray のバルーンを表示します。

#### `tray.removeBalloon()` *Windows*

Removes a tray balloon.

#### `tray.focus()` *Windows*

Returns focus to the taskbar notification area. Notification area icons should use this message when they have completed their UI operation. For example, if the icon displays a shortcut menu, but the user presses ESC to cancel it, use `tray.focus()` to return focus to the notification area.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (任意)
* `position` [Point](structures/point.md) (任意) - ポップアップ位置。

tray アイコンのコンテキストメニューをポップアップします。`menu` が渡されると、tray アイコンのコンテキストメニューの代わりに `menu` を表示します。

`position` は Windows でのみ有効で、省略値は (0, 0) です。

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

このアイコンのコンテキストメニューを設定します。

#### `tray.getBounds()` *macOS* *Windows*

戻り値 [`Rectangle`](structures/rectangle.md)

`Object` としてのこの tray アイコンの `bounds`。

#### `tray.isDestroyed()`

戻り値 `Boolean` - tray アイコンが破棄されたかどうか。