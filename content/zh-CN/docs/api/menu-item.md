## 菜单项

> 添加菜单项到应用程序菜单和上下文菜单中

进程：[主进程](../glossary.md#main-process)

有关示例, 请参见 [` Menu `](menu.md)。

### `new MenuItem(可选)`

* `options` Object 
  * `click` Function (可选) - 当菜单项被点击后，将会调用 `click(menuItem, browserWindow, event)` 。 
    * `menuItem` MenuItem
    * `browserWindow` BrowserWindow
    * `event` Event
  * ` role ` String (可选)-内置事件, 定义菜单项的行为, 当指定 ` click ` 属性时将被忽略。请参见 [ roles ](#roles)。
  * ` type `String (可选)-可以是 ` normal `、` separator `、` submenu `、` checkbox ` 或 ` radio `。
  * `label` String - (optional)
  * `sublabel` String - (optional)
  * `accelerator` [Accelerator](accelerator.md) (可选)
  * `icon` ([NativeImage](native-image.md) | String) (可选)
  * `enabled` Boolean (可选) - 如果为 false，该菜单项将会置灰且不可点击。
  * ` visible `Boolean (可选)-如果为 false, 该菜单项将完全隐藏。
  * ` checked `Boolean (可选)-只应为 ` checkbox ` 或 ` radio ` 类型菜单项指定。
  * `submenu` (MenuItemConstructorOptions[] | Menu) (optional) - Should be specified for `submenu` type menu items. 如果设置了 ` submenu `, 则 ` type: 'submenu' `配置可以省略。 If the value is not a `Menu` then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * ` id `String (可选)-在单个菜单中是唯一的。如果定义, 则可以通过它来引用该项。
  * ` position `String (可选)-此字段允许对给定菜单中的特定位置进行 fine-grained（细粒度） 定义。

### 角色

可以通过角色来为menu添加预定义行为。

最好给任何一个菜单指定 ` role `去匹配一个标准角色, 而不是尝试在 ` click ` 函数中手动实现该行为。 内置的 ` role ` 行为将提供最佳的原生体验。

使用 ` role ` 时, ` label ` 和 ` accelerator ` 值是可选的, 并为每个平台，将默认为适当值。

`role ` 属性可以具有以下值:

* `undo`
* `redo`
* `cut`
* `copy`
* `paste`
* `pasteandmatchstyle`
* `selectall`
* `delete`
* `minimize` - Minimize current window
* `close` - Close current window
* `quit`- Quit the application
* `reload` - Reload the current window
* `forcereload` - Reload the current window ignoring the cache.
* `toggledevtools` - Toggle developer tools in the current window
* `togglefullscreen`- Toggle full screen mode on the current window
* `resetzoom` - Reset the focused page's zoom level to the original size
* `zoomin` - Zoom in the focused page by 10%
* `zoomout` - Zoom out the focused page by 10%
* `editMenu` - Whole default "Edit" menu (Undo, Copy, etc.)
* `windowMenu` - Whole default "Window" menu (Minimize, Close, etc.)

The following additional roles are available on macOS:

* `about` - Map to the `orderFrontStandardAboutPanel` action
* `hide` - Map to the `hide` action
* `hideothers` - Map to the `hideOtherApplications` action
* `unhide` - Map to the `unhideAllApplications` action
* `startspeaking` - Map to the `startSpeaking` action
* `stopspeaking` - Map to the `stopSpeaking` action
* `front` - Map to the `arrangeInFront` action
* `zoom` - Map to the `performZoom` action
* `window` - The submenu is a "Window" menu
* `help` - The submenu is a "Help" menu
* `services` - The submenu is a "Services" menu

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored.

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

A `String` representing the menu items visible label

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event