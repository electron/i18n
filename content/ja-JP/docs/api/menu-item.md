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
  * `registerAccelerator` Boolean (任意) - false の場合、アクセラレータはシステムに登録されませんが、それでも表示はされます。 省略値は true です。
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (任意) - `submenu` 型メニューアイテムを指定する必要があります。 もし `submenu` を指定した場合、`type: 'submenu'` は省略できます。 値が [`Menu`](menu.md) でない場合は、`Menu.buildFromTemplate` を用いて自動的に変換されます。
  * `id` String (任意) - 一つの menu 内で一意なもの。これが定義されていれば、position 属性によってこのアイテムへの参照として利用できる。
  * `before` String[] (任意) - 指定したラベルの前にこのアイテムを挿入します。 参照された項目が存在しない場合、アイテムはメニューの最後に挿入されます。 また、与えられたメニューアイテムをそのアイテムと同じ「グループ」に配置する必要があることを意味します。
  * `after` String[] (任意) - このアイテムをIDが指すアイテムの後に挿入する。IDが指すアイテムが存在しない場合、アイテムはメニューの最後に挿入される。
  * `beforeGroupContaining` String[] (任意) - 単一のコンテキストメニューで、指定されたラベルのアイテムを含むグループの前に、そのグループの配置を宣言する手段を提供します。
  * ` afterGroupContaining ` String[] (任意) - 単一のコンテキストメニューで、指定されたラベルのアイテムを含むグループの後に、そのグループの配置を宣言する手段を提供します。

### 役割 (roles)

Roles を使用すると、メニューアイテムに定義済みの動作を持たせることができます。

`click` 関数で手動で動作を実装しようとするのではなく、標準の role に一致するメニューアイテムに対して `role` を指定することが最善です。 組み込み `role` の動作は最適なネイティブの操作感を得られます。

`role`を使用する場合、`label` と `accelerator` の値は任意で、各プラットフォームに最適な値がデフォルトになっています。

すべてのメニューアイテムは、`role`、`label`、セパレータの場合は `type` のいずれかを保持する必要があります。

`role` プロパティは、以下の値を持つことができます。

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
* `quit` - アプリケーションを終了する。
* `reload` - 現在のウィンドウをリロードする。
* `forceReload` - キャッシュを無視して現在のウィンドウをリロードする。
* `toggleDevTools` - 現在のウィンドウの開発者向けツールのトグル切り替えをする。
* `toggleFullScreen` - 現在のウインドウの全画面モードのトグル切り替えをする。
* `resetZoom` - フォーカス中のページのズームレベルを元のサイズにリセットする。
* `zoomIn` - フォーカス中のページを 10% 拡大する。
* `zoomOut` - フォーカス中のページを 10% 縮小する。
* `editMenu` - デフォルトの"編集"メニュー全体 (元に戻す、コピー、等)。
* `windowMenu` - デフォルトの"ウインドウ"メニュー全体 (最小化、閉じる、等)。

以下は *macOS* で有効な追加の role です。

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

macOS の `role` を指定するとき、`label` と `accelerator` がメニューアイテムに影響を与える唯一のオプションです。 ほかのすべてのオプションは無視されます。 小文字の `role`、`toggledevtools` などもまだサポートしています。

**注意:** macOS 上の tray 内の最も上にあるメニューアイテムでは、`enabled` と `visibility` プロパティは利用できません。

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

メニューアイテムに表示されているラベルの `String`。

#### `menuItem.click`

MenuItem がクリックイベントを受け取った時に発火される `Function`。