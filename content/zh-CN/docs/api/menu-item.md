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
* `editMenu`-整个默认的 "编辑" 菜单 (撤消、复制等)
* ` windowMenu `-整个默认 "窗口" 菜单 (最小化、关闭等)

macOS 上提供了以下附加角色:

* ` about `-映射到 ` orderFrontStandardAboutPanel ` 操作
* ` hide `-映射到 ` 隐藏 ` 操作
* ` hideothers `-映射到 ` hideOtherApplications ` 的操作
* ` unhide `-映射到 ` unhideAllApplications ` 操作
* ` startspeaking `-映射到 ` startSpeaking ` 操作
* ` stopspeaking `-映射到 ` stopSpeaking ` 操作
* ` front `-映射到 ` arrangeInFront ` 操作
* ` zoom `-映射到 ` performZoom ` 操作
* ` toggletabbar `-映射到 ` toggleTabBar ` 操作
* `selectnexttab` - 映射到 `selectNextTab` 操作
* ` selectprevioustab ` - 映射到 ` selectPreviousTab ` 操作
* `mergeallwindows` - 映射到 `mergeAllWindows` 操作
* ` movetabtonewwindow ` - 映射到 ` moveTabToNewWindow ` 操作
* `window` - 子菜单是"窗口" 菜单
* ` help `-子菜单是 "帮助" 菜单
* ` services `-子菜单是 "帮助" 菜单

在 macOS 上指定 ` role ` 时, ` label ` 和 ` accelerator ` 是将影响菜单项的唯一选项。所有其他选项都将被忽略。

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