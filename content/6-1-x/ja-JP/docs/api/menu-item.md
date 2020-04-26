## Class: MenuItem

> ネイティブアプリケーションメニューとコンテキストメニューに項目を追加します。

プロセス: [Main](../glossary.md#main-process)

サンプルについては [`Menu`](menu.md) を参照して下さい。

### `new MenuItem(options)`

* `options` Object
  * `click` Function (任意) - メニューアイテムがクリックされたとき、 `click(menuItem, browserWindow, event)` で呼び出されます。
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` [KeyboardEvent](structures/keyboard-event.md)
  * `role` String (任意) - `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow`, `windowMenu` のいずれかにできます。- メニューアイテムのアクションを定義します。指定すると `click` プロパティは無視されます。 [役割 (roles)](#roles) を参照してください。
  * `type` String (任意) - `normal`、`separator`、`submenu`、`checkbox`、`radio` にできる。
  * `label` String (任意)
  * `sublabel` String (任意)
  * `accelerator` [Accelerator](accelerator.md) (任意)
  * `icon` ([NativeImage](native-image.md) | String) (任意)
  * `enabled` Boolean (任意) - もし false なら、メニューアイテムはグレーっぽくなってクリックできない。
  * `acceleratorWorksWhenHidden` Boolean (任意) - 省略値は `true` で、`false` のときは、アイテムが表示されていない場合にアクセラレータがアイテムをトリガーするのを防ぎます。 _macOS_
  * `visible` Boolean (任意) - もし false なら、メニューアイテムは全く見えなくなる。
  * `checked` Boolean (任意) - `checkbox` または `radio` の type のメニューアイテムに対してのみ指定する必要がある。
  * `registerAccelerator` Boolean (任意) - false の場合、アクセラレータはシステムに登録されませんが、それでも表示はされます。 省略値は true です。
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (任意) - `submenu` 型メニューアイテムを指定する必要があります。 もし `submenu` を指定した場合、`type: 'submenu'` は省略できます。 値が [`Menu`](menu.md) でない場合は、`Menu.buildFromTemplate` を用いて自動的に変換されます。
  * `id` String (任意) - 単一のメニューの中でユニーク。 宣言されている場合は、位置属性によってこのアイテムへの参照として使用できます。
  * `before` String[] (任意) - 指定したラベルの前にこのアイテムを挿入します。 参照された項目が存在しない場合、アイテムはメニューの最後に挿入されます。 また、与えられたメニューアイテムをそのアイテムと同じ「グループ」に配置する必要があることを意味します。
  * `after` String[] (任意) - 指定したラベルの後にこのアイテムを挿入します。 参照された項目が存在しない場合、アイテムはメニューの最後に挿入されます。
  * `beforeGroupContaining` String[] (任意) - 単一のコンテキストメニューで、指定されたラベルのアイテムを含むグループの前に、そのグループの配置を宣言する手段を提供します。
  * ` afterGroupContaining ` String[] (任意) - 単一のコンテキストメニューで、指定されたラベルのアイテムを含むグループの後に、そのグループの配置を宣言する手段を提供します。

**注釈:** アクセラレータは、Windows と Linux でアイテムが非表示になっている場合は常に機能するため、`acceleratorWorksWhenHidden` は macOS 専用として指定されています。 これはネイティブの macOS 開発では可能なので、オプションを無効にするオプションをユーザーに提供するためにユーザーに公開されます。 このプロパティは macOS High Sierra 10.13 以降でのみ利用可能です。

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
* `togglefullscreen` - 現在のウインドウの全画面モードのトグル切り替え.
* `resetZoom` - フォーカス中のページのズームレベルを元のサイズにリセットする。
* `zoomIn` - フォーカス中のページを 10% 拡大する。
* `zoomOut` - フォーカス中のページを 10% 縮小する。
* `fileMenu` - デフォルト"ファイル" メニュー全体 (Close / Quit)
* `editMenu` - デフォルトの"編集"メニュー全体 (元に戻す、コピー、等)。
* `viewMenu` - デフォルトの"表示"メニュー全体 (リロード、開発ツールON/OFF等)
* `windowMenu` - デフォルトの"ウインドウ"メニュー全体 (最小化、ズーム等)。

以下は _macOS_ で有効な追加の role です。

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

MenuItem がクリックイベントを受け取った時に発火される `Function`。 これは `menuItem.click(event, focusedWindow, focusedWebContents)` で呼び出されます。
* `event` [KeyboardEvent](structures/keyboard-event.md)
* `focusedWindow` [BrowserWindow](browser-window.md)
* `focusedWebContents` [WebContents](web-contents.md)

#### `menuItem.submenu`

存在する場合、メニューアイテムのサブメニューを格納する `Menu` (任意)。

#### `menuItem.type`

そのアイテムの種類を示す `String`。

#### `menuItem.role`

セットされている場合、アイテムの役割を示す `String` (任意)。 `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow`, `windowMenu` のいずれかにできます。

#### `menuItem.accelerator`

セットされている場合、アイテムの Accelerator を示す `String` (任意)。

#### `menuItem.icon`

セットされている場合、アイテムのアイコンを示す `NativeImage | String` (任意)。

#### `menuItem.sublabel`

アイテムの副ラベルを示す `String`。このプロパティは動的に変更できます。

#### `menuItem.enabled`

アイテムが有効かどうかを示す `Boolean`。このプロパティは動的に変更できます。

#### `menuItem.visible`

アイテムが見えるかどうかを示す `Boolean`。このプロパティは動的に変更できます。

#### `menuItem.checked`

アイテムがチェックされたかどうかを示す `Boolean`。このプロパティは動的に変更できます。

`checkbox` メニューアイテムは、選択された時に `checked` プロパティをオンかオフにトグル切り替えします。

`radio` メニューアイテムは、クリックされると `checked` がオンになり、同じメニュー内の隣接するアイテムすべてのこのプロパティをオフにします。

更なる動作は、`click` 関数の追加で可能です。

#### `menuItem.registerAccelerator`

アクセラレータをシステムに登録する必要があるのか、ただ表示するだけなのかを示す `Boolean`。このプロパティは動的に変更できます。

#### `menuItem.commandId`

アイテムの連続する一意な id を示す `Number`。

#### `menuItem.menu`

そのアイテムが属する `Menu`。
