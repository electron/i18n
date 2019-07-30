## Class: MenuItem

> ネイティブアプリケーションメニューとコンテキストメニューに項目を追加します。

プロセス: [Main](../glossary.md#main-process)

サンプルについては [`Menu`](menu.md) を参照して下さい。

### `new MenuItem(options)`

* `options` Object 
  * `click` Function (任意) - メニューアイテムがクリックされると、 `click(menuItem, browserWindow, event)` と呼ばれる。 
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` [KeyboardEvent](structures/keyboard-event.md)
  * `role` String (任意) - `undo`, `redo`, `cut`, `copy`, `paste`, `pasteandmatchstyle`, `delete`, `selectall`, `reload`, `forcereload`, `toggledevtools`, `resetzoom`, `zoomin`, `zoomout`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideothers`, `unhide`, `quit`, `startspeaking`, `stopspeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `windowMenu` にできます。- メニューアイテムの挙動を指定します。`click` プロパティが指定されたときは無視されます。 [役割 (roles)](#roles) を参照してください。
  * `type` String (任意) - `normal`、`separator`、`submenu`、`checkbox`、`radio` にできる。
  * `label` String (任意)
  * `sublabel` String (任意)
  * `accelerator` [Accelerator](accelerator.md) (任意)
  * `icon` ([NativeImage](native-image.md) | String) (任意)
  * `enabled` Boolean (任意) - もし false なら、メニューアイテムはグレーっぽくなってクリックできない。
  * `acceleratorWorksWhenHidden` Boolean (optional) - default is `true`, and when `false` will prevent the accelerator from triggering the item if the item is not visible`. *macOS*
  * `visible` Boolean (optional) - If false, the menu item will be entirely hidden.
  * `checked` Boolean (optional) - Should only be specified for `checkbox` or `radio` type menu items.
  * `registerAccelerator` Boolean (optional) - If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to true.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  * `before` String[] (optional) - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
  * `after` String[] (optional) - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu.
  * `beforeGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
  * `afterGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

**Note:** `acceleratorWorksWhenHidden` is specified as being macOS-only because accelerators always work when items are hidden on Windows and Linux. The option is exposed to users to give them the option to turn it off, as this is possible in native macOS development. This property is only usable on macOS High Sierra 10.13 or newer.

### 役割 (roles)

Roles allow menu items to have predefined behaviors.

It is best to specify `role` for any menu item that matches a standard role, rather than trying to manually implement the behavior in a `click` function. The built-in `role` behavior will give the best native experience.

The `label` and `accelerator` values are optional when using a `role` and will default to appropriate values for each platform.

Every menu item must have either a `role`, `label`, or in the case of a separator a `type`.

The `role` property can have following values:

* `元に戻します`
* `やり直します`
* `cut`
* `copy`
* `paste`
* `pasteAndMatchStyle`
* `selectAll`
* `delete`
* `minimize` - 現在のウィンドウを最小化する。
* `close` - 現在のウィンドウを閉じる。
* `quit` - アプリケーションを終了する。
* `reload` - 現在のウィンドウをリロードする。
* `forceReload` - キャッシュを無視して現在のウィンドウをリロードする。
* `toggleDevTools` - 現在のウィンドウの開発者向けツールのトグル切り替えをする。
* `toggleFullScreen` - 現在のウインドウの全画面モードのトグル切り替えをする。
* `resetZoom` - フォーカス中のページのズームレベルを元のサイズにリセットする。
* `zoomIn` - フォーカス中のページを 10% 拡大する。
* `zoomOut` - フォーカス中のページを 10% 縮小する。
* `fileMenu` - デフォルト"ファイル" メニュー全体 (Close / Quit)
* `editMenu` - デフォルトの"編集"メニュー全体 (元に戻す、コピー、等)。
* `viewMenu` - デフォルトの"表示"メニュー全体 (リロード、開発ツールON/OFF等)
* `windowMenu` - デフォルトの"ウインドウ"メニュー全体 (最小化、ズーム等)。

The following additional roles are available on *macOS*:

* `appMenu` - デフォルトの"App"メニュー全体 (Electronについて、サービス等)
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
* `services` - ["サービス"](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) メニューのサブメニュー。 これはこのアプリケーションのメニューにのみ使うことを意図しており、macOSアプリのコンテキストメニューで使用される "サービス"サブメニューと同じでは*ありません*。この"サービス"サブメニューはElectronでは実装しません。
* `recentDocuments` - "最近使った項目を開く"サブメニュー。
* `clearRecentDocuments` - `clearRecentDocuments` アクションに割り当てる。

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

**Nota Bene:** The `enabled` and `visibility` properties are not available for top-level menu items in the tray on MacOS.

### インスタンスプロパティ

The following properties are available on instances of `MenuItem`:

#### `menuItem.id`

A `String` indicating the item's unique id, this property can be dynamically changed.

#### `menuItem.label`

A `String` indicating the item's visible label, this property can be dynamically changed.

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event. It can be called with `menuItem.click(event, focusedWindow, focusedWebContents)`.

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `focusedWindow` [BrowserWindow](browser-window.md)
* `focusedWebContents` [WebContents](web-contents.md)

#### `menuItem.submenu`

A `Menu` (optional) containing the menu item's submenu, if present.

#### `menuItem.type`

A `String` indicating the type of the item.

#### `menuItem.role`

A `String` (optional) indicating the item's role, if set. Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteandmatchstyle`, `delete`, `selectall`, `reload`, `forcereload`, `toggledevtools`, `resetzoom`, `zoomin`, `zoomout`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideothers`, `unhide`, `quit`, `startspeaking`, `stopspeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu` or `windowMenu`

#### `menuItem.accelerator`

A `String` (optional) indicating the item's accelerator, if set.

#### `menuItem.icon`

A `NativeImage | String` (optional) indicating the item's icon, if set.

#### `menuItem.sublabel`

A `String` indicating the item's sublabel, this property can be dynamically changed.

#### `menuItem.enabled`

A `Boolean` indicating whether the item is enabled, this property can be dynamically changed.

#### `menuItem.visible`

A `Boolean` indicating whether the item is visible, this property can be dynamically changed.

#### `menuItem.checked`

A `Boolean` indicating whether the item is checked, this property can be dynamically changed.

A `checkbox` menu item will toggle the `checked` property on and off when selected.

A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

You can add a `click` function for additional behavior.

#### `menuItem.registerAccelerator`

A `Boolean` indicating if the accelerator should be registered with the system or just displayed, this property can be dynamically changed.

#### `menuItem.commandId`

A `Number` indicating an item's sequential unique id.

#### `menuItem.menu`

A `Menu` that the item is a part of.