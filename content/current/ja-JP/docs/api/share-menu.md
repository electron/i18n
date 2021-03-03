## Class: ShareMenu

> Create share menu on macOS.

プロセス: [Main](../glossary.md#main-process)

The `ShareMenu` class creates [Share Menu][share-menu] on macOS, which can be used to share information from the current context to apps, social media accounts, and other services.

For including the share menu as a submenu of other menus, please use the `shareMenu` role of [`MenuItem`](menu-item.md).

### `new ShareMenu(sharingItem)`

* `sharingItem` SharingItem - The item to share.

Creates a new share menu.

### インスタンスメソッド

The `shareMenu` object has the following instance methods:

#### `shareMenu.popup([options])`

* `options` PopupOptions (optional)
  * `browserWindow` [BrowserWindow](browser-window.md) (任意) - 省略値はフォーカスされたウインドウです。
  * `x` Number (任意) - 既定ではマウスカーソルの現在位置です。 `y` が宣言されている場合は宣言する必要があります。
  * `y` Number (任意) - 既定ではマウスカーソルの現在位置です。 `x` が宣言されている場合は宣言する必要があります。
  * `positioningItem` Number (任意) _macOS_ - マウスカーソルの位置に配置するメニューアイテムのインデックス。 既定値は -1 です。
  * `callback` Function (任意) - メニューが閉じたしたときに呼ばれます。

この menu を [`BrowserWindow`](browser-window.md) 内のコンテキストメニューとしてポップアップします。

#### `shareMenu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (任意) - 省略値はフォーカスされたウインドウです。

`browserWindow` 内のこのコンテキストメニューを閉じます。

[share-menu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
