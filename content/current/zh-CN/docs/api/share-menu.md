## Class: ShareMenu

> Create share menu on macOS.

进程：[主进程](../glossary.md#main-process)

The `ShareMenu` class creates [Share Menu][share-menu] on macOS, which can be used to share information from the current context to apps, social media accounts, and other services.

For including the share menu as a submenu of other menus, please use the `shareMenu` role of [`MenuItem`](menu-item.md).

### `new ShareMenu(sharingItem)`

* `sharingItem` SharingItem - The item to share.

Creates a new share menu.

### 实例方法

The `shareMenu` object has the following instance methods:

#### `shareMenu.popup([options])`

* `options` PopupOptions (optional)
  * `browserWindow` [BrowserWindow](browser-window.md) (可选) - 默认为选中窗口.
  * `x` Number (可选) - 默认为当前鼠标的位置。 如果指定了`y`，则该选项必选。
  * `y` Number (可选) - 默认为当前鼠标的位置。 如果指定了`x`，则该选项必选。
  * `positioningItem` Number (optional) _macOS_ - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. 默认值为 -1。
  * `callback` Function (optional) - 会在菜单关闭后被调用.

将此菜单作为 browserWindow <a> 中的上下文菜单弹出。</p> 



<h4 spaces-before="0">
  <code>shareMenu.closePopup([browserWindow])</code>
</h4>

<ul>
  <li>
    <code>browserWindow</code> <a href="browser-window.md">BrowserWindow</a> (可选) - 默认为选中窗口.
  </li>
</ul>

<p spaces-before="0">
  关闭 <code> browserWindow </code> 中的上下文菜单。
</p>

[share-menu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
