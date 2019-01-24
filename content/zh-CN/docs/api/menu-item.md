## 菜单项

> 添加菜单项到应用程序菜单和上下文菜单中

进程：[主进程](../glossary.md#main-process)

有关示例, 请参见 [` Menu `](menu.md)。

### `new MenuItem(可选)`

* `参数` Object 
  * `click` Function (可选) - 当菜单项被点击后，将会调用 `click(menuItem, browserWindow, event)` 。 
    * `menuItem` 菜单项
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` Event
  * ` role ` String (可选)-内置事件, 定义菜单项的行为, 当指定 ` click ` 属性时将被忽略。请参见 [ roles ](#roles)。
  * ` type `String (可选)-可以是 ` normal `、` separator `、` submenu `、` checkbox ` 或 ` radio `。
  * `label` String (可选)
  * `sublabel` String (可选)
  * `accelerator` [Accelerator](accelerator.md) (可选)
  * `icon` ([NativeImage](native-image.md) | String) (可选)
  * `enabled` Boolean (可选) - 如果为 false，该菜单项将会置灰且不可点击。
  * ` visible `Boolean (可选)-如果为 false, 该菜单项将完全隐藏。
  * ` checked `Boolean (可选)-只应为 ` checkbox ` 或 ` radio ` 类型菜单项指定。
  * registerAccelerator Boolean (可选) - 如果为 false, accelerator 不会被系统注册, 但仍然会被显示. 默认住为 true。
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * ` id `String (可选)-在单个菜单中是唯一的。如果定义, 则可以通过它来引用该项。
  * `before` String[] (optional) - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
  * `after` String[] (optional) - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu.
  * `beforeGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
  * `afterGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

### 角色

可以通过角色来为menu添加预定义行为。

最好给任何一个菜单指定 ` role `去匹配一个标准角色, 而不是尝试在 ` click ` 函数中手动实现该行为。 内置的 ` role ` 行为将提供最佳的原生体验。

使用 ` role ` 时, ` label ` 和 ` accelerator ` 值是可选的, 并为每个平台，将默认为适当值。

Every menu item must have either a `role`, `label`, or in the case of a separator a `type`.

`role ` 属性可以具有以下值:

* `undo`
* `redo`
* `cut`
* `copy`
* `paste`
* `pasteAndMatchStyle`
* `selectAll`
* `delete`
* ` minimize ` - 最小化当前窗口。
* `close` - 关闭当前窗口.
* `quit` - Quit the application.
* `reload` - 重新加载当前窗口。
* `forcereload` - 忽略缓存，重新加载当前窗口。
* `toggledevtools` - 在当前窗口中隐藏/显示开发者工具。
* `toggleFullScreen` - Toggle full screen mode on the current window.
* `resetzoom` - 将主页的缩放级别重置为初始大小.
* `zoomin` - 主页面放大 10%.
* `zoomout` -主页面缩小 10%.
* `editMenu`-默认的 "编辑" 菜单 (包括撤消、复制等)
* ` windowMenu `-默认 "窗口" 菜单 (包括最小化、关闭等)

以下为macOS 中提供的角色:

* ` about `-映射到 ` orderFrontStandardAboutPanel ` 操作.
* ` hide `-映射到 ` hide ` 操作.
* ` hideOthers `-映射到 ` hideOtherApplications ` 操作.
* ` unhide `-映射到 ` unhideAllApplications ` 操作.
* ` startSpeaking `-映射到 ` startSpeaking ` 操作.
* ` stopSpeaking `-映射到 ` stopSpeaking ` 操作.
* ` front `-映射到 ` arrangeInFront ` 操作.
* ` zoom `-映射到 ` performZoom ` 操作.
* ` toggleTabBar `-映射到 ` toggleTabBar ` 操作.
* ` selectNextTab ` - 映射到 ` selectNextTab ` 操作.
* ` selectPreviousTab ` - 映射到 ` selectPreviousTab ` 操作.
* ` mergeAllWindows ` - 映射到 ` mergeAllWindows ` 操作.
* ` moveTabToNewWindow ` - 映射到 ` moveTabToNewWindow ` 操作.
* `window` - 这个子菜单是"Window" 菜单.
* ` help `-这个子菜单是 "Help" 菜单.
* ` services `-这个子菜单是 "Services" 菜单.
* ` recentDocuments `-这个子菜单是 "Open Recent" 菜单.
* `clearRecentDocuments` -映射到 `clearRecentDocuments` 操作.

在 macOS 上指定 ` role ` 时, ` label ` 和 ` accelerator ` 是影响菜单项的唯一选项。 所有其它选项都将被忽略。 不过，仍然支持小写的`role`，如`toggledevtools`。

**Nota Bene:** The `enabled` and `visibility` properties are not available for top-level menu items in the tray on MacOS.

### 实例属性

以下为 ` MenuItem ` 实例的可用属性:

#### `menuItem.enabled`

一个 ` Boolean ` 类型的值, 指示是否启用该项, 该属性可以动态改变

#### `menuItem.visible`

一个 ` Boolean ` 类型的值, 指示该项是否可见, 该属性可以动态改变。

#### `menuItem.checked`

一个 ` Boolean ` 类型的值, 指示是否选中该项, 该属性可以动态改变。

` checkbox ` 菜单项将在选中时切换 ` checked ` 的开关属性。

`单选菜单项` 将返回单击时`checked`属性, 并将关闭同一菜单中所有相邻项的属性。

你可以为其他行为添加`click`函数。

#### `menuItem.label`

一个表示菜单项标签的 `String`.

#### `menuItem.click`

当 MenuItem 接收到 click 事件时激发的`Function`.