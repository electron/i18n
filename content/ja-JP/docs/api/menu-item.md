## Class: MenuItem

> ネイティブアプリケーションメニューとコンテキストメニューに項目を追加します。

プロセス: [Main](../glossary.md#main-process)

サンプルについては [`Menu`](menu.md) を参照して下さい。

### `new MenuItem(options)`

* `options` Object 
  * `click` Function (任意) - メニューアイテムがクリックされると、 `click(menuItem, browserWindow, event)` と呼ばれる。 
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` Event
  * `role` String (任意) - メニューアイテムの動作を定義する。`click` プロパティを指定した場合は無視される。[roles](#roles) を参照。
  * `type` String (任意) - `normal`、`separator`、`submenu`、`checkbox`、`radio` にできる。
  * `label` String (任意)
  * `sublabel` String (任意)
  * `accelerator` [Accelerator](accelerator.md) (任意)
  * `icon` ([NativeImage](native-image.md) | String) (任意)
  * `enabled` Boolean (任意) - もし false なら、メニューアイテムはグレーっぽくなってクリックできない。
  * `visible` Boolean (任意) - もし false なら、メニューアイテムは全く見えなくなる。
  * `checked` Boolean (任意) - `checkbox` または `radio` の type のメニューアイテムに対してのみ指定する必要がある。
  * `registerAccelerator` Boolean (optional) - If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to true.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  * `before` String[] (optional) - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
  * `after` String[] (optional) - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu.
  * `beforeGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
  * `afterGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

### 役割 (roles)

Roles を使用すると、メニューアイテムに定義済みの動作を持たせることができます。

`click` 関数で手動で動作を実装しようとするのではなく、標準の role に一致するメニューアイテムに対して `role` を指定することが最善です。 組み込み `role` の動作は最適なネイティブの操作感を得られます。

`role`を使用する場合、`label` と `accelerator` の値は任意で、各プラットフォームに最適な値がデフォルトになっています。

Every menu item must have either a `role`, `label`, or in the case of a separator a `type`.

The `role` property can have following values:

* `undo`
* `redo`
* `cut`
* `copy`
* `paste`
* `pasteAndMatchStyle`
* `selectAll`
* `delete`
* `minimize` - 現在のウィンドウを最小化する。
* `close` - 現在のウィンドウを閉じる。
* `quit` - Quit the application.
* `reload` - 現在のウィンドウをリロードする。
* `forceReload` - キャッシュを無視して現在のウィンドウをリロードする。
* `toggleDevTools` - 現在のウィンドウの開発者向けツールのトグル切り替えをする。
* `toggleFullScreen` - Toggle full screen mode on the current window.
* `resetZoom` - フォーカス中のページのズームレベルを元のサイズにリセットする。
* `zoomIn` - フォーカス中のページを 10% 拡大する。
* `zoomOut` - フォーカス中のページを 10% 縮小する。
* `editMenu` - デフォルトの"編集"メニュー全体 (元に戻す、コピー、等)。
* `windowMenu` - デフォルトの"ウインドウ"メニュー全体 (最小化、閉じる、等)。

The following additional roles are available on *macOS*:

* `about` - `orderFrontStandardAboutPanel` アクションに割り当てる。
* `hide` - `hide` アクションに割り当てる。
* `hideOthers` - `hideOtherApplications` アクションに割り当てる。
* `unhide` - `unhideAllApplications` アクションに割り当てる。
* `startSpeaking` - `startSpeaking` アクションに割り当てる。
* `stopSpeaking` - `stopSpeaking` アクションに割り当てる。
* `front` - `arrangeInFront` アクションに割り当てる。
* `zoom` - `performZoom` アクションに割り当てる。
* `toggleTabBar` - `toggleTabBar` アクションに割り当てる。
* `selectNextTab` - `selectNextTab` アクションに割り当てる。
* `selectPreviousTab` - `selectPreviousTab` アクションに割り当てる。
* `mergeAllWindows` - `mergeAllWindows` アクションに割り当てる。
* `moveTabToNewWindow` - `moveTabToNewWindow` アクションに割り当てる。
* `window` - "ウインドウ"サブメニュー。
* `help` - "ヘルプ"サブメニュー。
* `services` - "サービス"サブメニュー。
* `recentDocuments` - "最近使った項目を開く"サブメニュー。
* `clearRecentDocuments` - `clearRecentDocuments` アクションに割り当てる。

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

**Nota Bene:** The `enabled` and `visibility` properties are not available for top-level menu items in the tray on MacOS.

### インスタンスプロパティ

The following properties are available on instances of `MenuItem`:

#### `menuItem.enabled`

A `Boolean` indicating whether the item is enabled, this property can be dynamically changed.

#### `menuItem.visible`

A `Boolean` indicating whether the item is visible, this property can be dynamically changed.

#### `menuItem.checked`

A `Boolean` indicating whether the item is checked, this property can be dynamically changed.

A `checkbox` menu item will toggle the `checked` property on and off when selected.

A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

You can add a `click` function for additional behavior.

#### `menuItem.label`

A `String` representing the menu items visible label.

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event.