## Class: ShareMenu

> Create share menu on macOS.

프로세스:[Main](../glossary.md#main-process)

The `ShareMenu` class creates [Share Menu][share-menu] on macOS, which can be used to share information from the current context to apps, social media accounts, and other services.

For including the share menu as a submenu of other menus, please use the `shareMenu` role of [`MenuItem`](menu-item.md).

### `new ShareMenu(sharingItem)`

* `sharingItem` SharingItem - The item to share.

Creates a new share menu.

### Instance Methods (인스턴스 메소드)

The `shareMenu` object has the following instance methods:

#### `shareMenu.popup([options])`

* `options` PopupOptions (optional)
  * `browserWindow` [BrowserWindow](browser-window.md) (선택) - 기본 값은 포커스된 윈도우 입니다.
  * `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
  * `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
  * `positioningItem` Number (optional) _macOS_ - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
  * `callback` Function (선택) - 메뉴가 닫혔을 때 불립니다.

이 메뉴는 [`BrowserWindow`](browser-window.md)에서 컨텍스트 메뉴로 팝업됩니다.

#### `shareMenu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (선택) - 기본 값은 포커스된 윈도우 입니다.

`browserWindow`의 컨텍스트 메뉴를 닫습니다.

[share-menu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
