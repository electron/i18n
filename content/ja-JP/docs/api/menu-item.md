## Class: MenuItem

> ネイティブアプリケーションメニューとコンテキストメニューに項目を追加します。

プロセス: [Main](../glossary.md#main-process)

サンプルについては [`Menu`](menu.md) を参照して下さい。

### `new MenuItem(options)`

* `options` Object 
  * `クリック` Function (任意) - メニューアイテムがクリックされると、 `click(menuItem, browserWindow, event)` と呼ばれる。 
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` [KeyboardEvent](structures/keyboard-event.md)
  * `role` String (任意) - `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow`, `windowMenu` のいずれかにできます。- メニューアイテムのアクションを定義します。指定すると `click` プロパティは無視されます。 [役割 (roles)](#roles) を参照してください。
  * `type` String (任意) - `normal`、`separator`、`submenu`、`checkbox`、`radio` にできる。
  * `label` String (任意)
  * `sublabel` String (任意)
  * `toolTip` String (optional) *macOS* - Hover text for this menu item.
  * `accelerator` [Accelerator](accelerator.md) (optional)
  * `icon` ([NativeImage](native-image.md) | String) (任意)
  * `enabled` Boolean (optional) - If false, the menu item will be greyed out and unclickable.
  * `acceleratorWorksWhenHidden` Boolean (optional) *macOS* - default is `true`, and when `false` will prevent the accelerator from triggering the item if the item is not visible`.
  * `visible` Boolean (optional) - If false, the menu item will be entirely hidden.
  * `checked` Boolean (optional) - Should only be specified for `checkbox` or `radio` type menu items.
  * `registerAccelerator` Boolean (optional) *Linux* *Windows* - If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to true.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  * `before` String[] (optional) - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
  * `after` String[] (optional) - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu.
  * `beforeGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
  * `afterGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

**注釈:** アクセラレータは、Windows と Linux でアイテムが非表示になっている場合は常に機能するため、`acceleratorWorksWhenHidden` は macOS 専用として指定されています。 これはネイティブの macOS 開発では可能なので、オプションを無効にするオプションをユーザーに提供するためにユーザーに公開されます。 このプロパティは macOS High Sierra 10.13 以降でのみ利用可能です。

### 役割 (roles)

Roles を使用すると、メニューアイテムに定義済みの動作を持たせることができます。

`click` 関数で手動で動作を実装しようとするのではなく、標準の role に一致するメニューアイテムに対して `role` を指定することが最善です。 組み込み `role` の動作は最適なネイティブの操作感を得られます。

`role`を使用する場合、`label` と `accelerator` の値は任意で、各プラットフォームに最適な値がデフォルトになっています。

すべてのメニューアイテムは、`role`、`label`、セパレータの場合は `type` のいずれかを保持する必要があります。

`role` プロパティは、以下の値を持つことができます。

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
* `togglefullscreen` - 現在のウインドウの全画面モードのトグル切り替え.
* `resetZoom` - フォーカス中のページのズームレベルを元のサイズにリセットする。
* `zoomIn` - フォーカス中のページを 10% 拡大する。
* `zoomOut` - フォーカス中のページを 10% 縮小する。
* `fileMenu` - デフォルト"ファイル" メニュー全体 (Close / Quit)
* `editMenu` - デフォルトの"編集"メニュー全体 (元に戻す、コピー、等)。
* `viewMenu` - デフォルトの"表示"メニュー全体 (リロード、開発ツールON/OFF等)
* `windowMenu` - デフォルトの"ウインドウ"メニュー全体 (最小化、ズーム等)。

以下は *macOS* で有効な追加の role です。

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

macOS の `role` を指定するとき、`label` と `accelerator` がメニューアイテムに影響を与える唯一のオプションです。 ほかのすべてのオプションは無視されます。 小文字の `role`、`toggledevtools` などもまだサポートしています。

**注意:** macOS 上の tray 内の最も上にあるメニューアイテムでは、`enabled` と `visibility` プロパティは利用できません。

### インスタンスプロパティ

`MenuItem` のインスタンスには以下のプロパティがあります。

#### `menuItem.id`

アイテムの一意な id を示す `String`。このプロパティは動的に変更できます。

#### `menuItem.label`

アイテムの表示ラベルを示す `String`。このプロパティは動的に変更できます。

#### `menuItem.click`

MenuItem がクリックイベントを受け取ったときに発火される `Function`。`menuItem.click(event, focusedWindow, focusedWebContents)` で呼び出せます。

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `focusedWindow` [BrowserWindow](browser-window.md)
* `focusedWebContents` [WebContents](web-contents.md)

#### `menuItem.submenu`

存在する場合、メニューアイテムのサブメニューを格納する `Menu` (任意)。

#### `menuItem.type`

A `String` indicating the type of the item. Can be `normal`, `separator`, `submenu`, `checkbox` or `radio`.

#### `menuItem.role`

セットされている場合、アイテムの役割を示す `String` (任意)。 `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow`, `windowMenu` のいずれかにできます。

#### `menuItem.accelerator`

A `Accelerator` (optional) indicating the item's accelerator, if set.

#### `menuItem.icon`

セットされている場合、アイテムのアイコンを示す `NativeImage | String` (任意)。

#### `menuItem.sublabel`

アイテムの副ラベルを示す `String`。このプロパティは動的に変更できます。

#### `menuItem.toolTip` *macOS*

A `String` indicating the item's hover text.

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