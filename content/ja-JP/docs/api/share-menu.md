# ShareMenu

`ShareMenu` クラスは、macOS 上で [共有メニュー][share-menu] を作成し、現在のコンテキストからアプリやソーシャルメディアアカウント、その他のサービスに情報を共有するために使用できます。

他のメニューのサブメニューとして共有メニューを含めるには、[`MenuItem`](menu-item.md) の `shareMenu` ロールを使用してください。

## クラス: ShareMenu

> macOS での共有メニューを作成します。

プロセス: [Main](../glossary.md#main-process)

### `new ShareMenu(sharingItem)`

* `sharingItem` SharingItem - 共有するアイテム。

新しい共有メニューを作成します。

### インスタンスメソッド

`shareMenu` オブジェクトには以下のメソッドがあります。

#### `shareMenu.popup([options])`

* `options` PopupOptions (任意)
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
