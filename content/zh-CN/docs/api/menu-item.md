## 菜单项

> 添加菜单项到应用程序菜单和上下文菜单中

线程：[主线程](../glossary.md#main-process)

有关示例, 请参见 [` Menu `](menu.md)。

### `new MenuItem(options)`

* `options` Object 
  * `click` Function (可选) - 当菜单项被点击后，将会调用 `click(menuItem, browserWindow, event)` 。 
    * `menuItem` MenuItem
    * `browserWindow` BrowserWindow
    * `event` Event
  * ` role ` String (可选)-内置事件, 定义菜单项的行为, 当指定 ` click ` 属性时将被忽略。请参见 [ roles ](#roles)。
  * ` type `String (可选)-可以是 ` normal `、` separator `、` submenu `、` checkbox ` 或 ` radio `。
  * ` label `String (可选)-菜单名称，当设置role时默认为role
  * `sublabel` String - (可选)
  * `accelerator` [Accelerator](accelerator.md) (可选)
  * `icon` ([NativeImage](native-image.md) | String) (可选)
  * `enabled` Boolean (可选) - 如果为 false，该菜单项将会置灰且不可点击。
  * ` visible `Boolean (可选)-如果为 false, 该菜单项将完全隐藏。
  * ` checked `Boolean (可选)-只应为 ` checkbox ` 或 ` radio ` 类型菜单项指定。
  * `submenu` (MenuItemConstructorOptions[] | Menu) (可选) - 应该为 `submenu` 类型菜单项指定。 如果设置了 ` submenu `, 则 ` type: 'submenu' `配置可以省略。 如果该值不是 ` Menu `, 则它将使用 ` Menu. buildFromTemplate ` 自动转换。
  * ` id `String (可选)-在单个菜单中是唯一的。如果定义, 则可以通过它来引用该项。
  * ` position `String (可选)-此字段允许对给定菜单中的特定位置进行 fine-grained（细粒度） 定义。

### Roles

可以通过角色来为menu添加预定义行为。

最好给任何一个菜单指定 ` role `去匹配一个标准角色, 而不是尝试在 ` click ` 函数中手动实现该行为。 内置的 ` role ` 行为将提供最佳的原生体验。

使用 ` role ` 时, ` label ` 和 ` accelerator ` 值是可选的, 并为每个平台，将默认为适当值。

`role ` 属性可以具有以下值:

* `undo`
* `redo`
* `cut`
* `复制`
* `paste`
* `pasteandmatchstyle`
* `selectall`
* `delete`
* `minimize` - 最小化当前窗口。
* `close` - 关闭当前窗口
* `quit`- 退出应用。
* `reload` - 重新加载当前窗口。
* `forcereload` - 重新加载当前窗口忽略缓存。
* `toggledevtools` - 在当前窗口中隐藏/显示开发者工具。
* `togglefullscreen`- 切换全屏模式。
* `resetzoom` - 重置页面原始大小的缩放级别
* `zoomin` - 主页面放大 10%
* `zoomout` -主页面缩小 10%
* `editMenu` - Whole default "Edit" menu (Undo, Copy, etc.)
* `windowMenu` - Whole default "Window" menu (Minimize, Close, etc.)

macOS 上提供了以下附加角色:

* `about` - Map to the `orderFrontStandardAboutPanel` action
* `hide` - Map to the `hide` action
* `hideothers` - Map to the `hideOtherApplications` action
* `unhide` - Map to the `unhideAllApplications` action
* `startspeaking` - Map to the `startSpeaking` action
* `stopspeaking` - Map to the `stopSpeaking` action
* `front` - Map to the `arrangeInFront` action
* `zoom` - Map to the `performZoom` action
* `toggletabbar` - Map to the `toggleTabBar` action
* `selectnexttab` - Map to the `selectNextTab` action
* `selectprevioustab` - Map to the `selectPreviousTab` action
* `mergeallwindows` - Map to the `mergeAllWindows` action
* `movetabtonewwindow` - Map to the `moveTabToNewWindow` action
* `window` - The submenu is a "Window" menu
* `help` - The submenu is a "Help" menu
* `services` - The submenu is a "Services" menu

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored.

### 实例属性

以下为 ` MenuItem ` 实例的可用属性:

#### `menuItem.enabled`

A `Boolean` indicating whether the item is enabled, this property can be dynamically changed.

#### `menuItem.visible`

A `Boolean` indicating whether the item is visible, this property can be dynamically changed.

#### `menuItem.checked`

A `Boolean` indicating whether the item is checked, this property can be dynamically changed.

A `checkbox` menu item will toggle the `checked` property on and off when selected.

A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

You can add a `click` function for additional behavior.

#### `menuItem.label`

A `String` representing the menu items visible label

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event