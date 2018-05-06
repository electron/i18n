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
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (任意) - type が `submenu` のメニューアイテムに対してのみ指定する必要がある。 もし `submenu` を指定した場合、`type: 'submenu'` は省略できる。 値が [`Menu`](menu.md) でない場合は、`Menu.buildFromTemplate` を用いて自動的に変換される。
  * `id` String (任意) - 一つの menu 内で一意なもの。これが定義されていれば、position 属性によってこのアイテムへの参照として利用できる。
  * `position` String (任意) - このフィールドは与えられたメニュー内の特定の場所を細かく定義できる。

### 役割 (roles)

Roles を使用すると、メニューアイテムに定義済みの動作を持たせることができます。

`click` 関数で手動で動作を実装しようとするのではなく、標準の role に一致するメニューアイテムに対して `role` を指定することが最善です。 組み込み `role` の動作は最適なネイティブの操作感を得られます。

`role`を使用する場合、`label` と `accelerator` の値は任意で、各プラットフォームに最適な値がデフォルトになっています。

`role` プロパティは、以下の値を持つことができます。

* `undo`
* `redo`
* `cut`
* `copy`
* `paste`
* `pasteAndMatchStyle`
* `selectAll`
* `delete`
* `minimize` - 現在のウィンドウを最小化.
* `close` - 現在のウィンドウを閉じる.
* `quit` - アプリケーションを終了する.
* `reload` - 現在のウィンドウをリロード.
* `forceReload` - キャッシュを無視して現在のウィンドウをリロード
* `toggleDevTools` - 現在のウィンドウの開発者向けツールのトグル切り替え.
* `toggleFullScreen`- 現在のウィンドウの全画面モードのトグル切り替え.
* `resetZoom` - フォーカス中のページのズームレベルを元のサイズにリセット.
* `zoomIn` - フォーカス中のページを 10% 拡大
* `zoomOut` - フォーカス中のページを 10% 縮小
* `editMenu` - デフォルトの"編集"メニュー全体 (元に戻す、コピー、等)。
* `windowMenu` - デフォルトの"ウインドウ"メニュー全体 (最小化、閉じる、等)。

以下は *macOS* で有効な追加の role です。

* `about` - `orderFrontStandardAboutPanel` アクションにマップ.
* `hide` - `hide` アクションにマップ.
* `hideOthers` - Map to the `hideOtherApplications` action.
* `unhide` - `unhideAllApplications` アクションにマップ.
* `startSpeaking` - Map to the `startSpeaking` action.
* `stopSpeaking` - Map to the `stopSpeaking` action.
* `front` - `arrangeInFront` アクションにマップ.
* `zoom` - `performZoom` アクションにマップ.
* `toggleTabBar` - Map to the `toggleTabBar` action.
* `selectNextTab` - Map to the `selectNextTab` action.
* `selectPreviousTab` - Map to the `selectPreviousTab` action.
* `mergeAllWindows` - Map to the `mergeAllWindows` action.
* `moveTabToNewWindow` - Map to the `moveTabToNewWindow` action.
* `window` - "ウインドウ"サブメニュー.
* `help` - "ヘルプ"サブメニュー.
* `services` - "サービス"サブメニュー.
* `recentDocuments` - The submenu is an "Open Recent" menu.
* `clearRecentDocuments` - Map to the `clearRecentDocuments` action.

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

### インスタンスプロパティ

`MenuItem` のインスタンスには以下のプロパティがあります。

#### `menuItem.enabled`

アイテムが有効かどうかを示す `Boolean`。このプロパティは動的に変更できます。

#### `menuItem.visible`

アイテムが見えるかどうかを示す `Boolean`。このプロパティは動的に変更できます。

#### `menuItem.checked`

アイテムがチェックされたかどうかを示す `Boolean`。このプロパティは動的に変更できます。

`checkbox` メニューアイテムは、選択された時に `checked` プロパティをオンかオフにトグル切り替えします。

`radio` メニューアイテムは、クリックされると `checked` がオンになり、同じメニュー内の隣接するアイテムすべてのこのプロパティをオフにします。

更なる動作は、`click` 関数の追加で可能です。

#### `menuItem.label`

A `String` representing the menu items visible label.

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event.