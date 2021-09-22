## 菜单项

> 添加菜单项到应用程序菜单和上下文菜单中

进程：[主进程](../glossary.md#main-process)

有关示例, 请参见 [` Menu `](menu.md)。

### `new MenuItem(options)`

* `选项` 对象
  * `click` 函数(可选) - 单击菜单项时，将用 `click(menuItem, browserWindow, event)` 调用。
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md) |未定义 - 如果没有打开窗口，则无法定义此定义。
    * `event` [KeyboardEvent](structures/keyboard-event.md)
  * `role` String (optional) - Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `toggleSpellChecker`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `shareMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu` - Define the action of the menu item, when specified the `click` property will be ignored. 参见 [roles](#roles)
  * ` type `String (可选)-可以是 ` normal `、` separator `、` submenu `、` checkbox ` 或 ` radio `。
  * `label` String (可选)
  * `sublabel` String (可选)
  * `toolTip` String (可选) _macOS_ - 此菜单的悬停文本提示
  * `accelerator` [Accelerator](accelerator.md) (可选)
  * `icon` ([NativeImage](native-image.md) | String) (可选)
  * `enabled` Boolean (可选) - 如果为 false，该菜单项将会置灰且不可点击。
  * `acceleratorWorksWhenHidden` Boolean (可选) _macOS_ - 默认为 `true`, 当为 `false` 时将阻止隐藏按钮通过快捷键触发。
  * ` visible `Boolean (可选)-如果为 false, 该菜单项将完全隐藏。
  * ` checked `Boolean (可选)-只应为 ` checkbox ` 或 ` radio ` 类型菜单项指定。
  * `registerAccelerator` Boolean (可选) _Linux_ _Windows_ - 若为 false, 则快捷键将不会被注册到系统内，但还是会显示出来。 默认值为 true。
  * `sharingItem` SharingItem (可选) _macOS_ - 当 `role` 为 `shareMenu`时指定要分享的项
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (可选) - 应该是固定类型菜单`submenu` 如果指定 `submenu` ，可以省略 `type: 'submenu'` 如果该值不属于[`Menu`](menu.md)，它将被函数`Menu.buildFromTemplate`自动转换。
  * `id` String (可选) - 单个菜单内唯一。 若定义，则可以通过 position 位置属性找到此选项
  * `before` String[] (可选) - 在指定标签项前插入此项 如果引用值不存在，那么该菜单项会插在这个菜单的尾部。 这还意味着，菜单项应该被放置在与引用项相同的组中。
  * `after` String[] (可选) - 在指定的标签之后插入菜单项。 如果引用值不存在，那么该菜单项会插在这个菜单的尾部。
  * `beforeGroupContaining` String[] (可选) - 为单个上下文菜单提供一种方法，用于在具有指定标签的项的包含组之前声明其包含组的位置。
  * `afterGroupContaining` String[] (可选) - 为单个上下文菜单提供一种方法，用于在具有指定标签的项的包含组之后声明其包含组的位置。

**注意:** `acceleratorWorksWhenHidden` 这个选项只有 macOS 生效，因为在 Windows 和 Linux 系统下快捷键即使在隐藏情况下也会生效。 该选项让用户可以选择关闭，因为这是本地 macOS 开发中的可能。 此属性只能在macOS High Sierra 10.13或以上中使用。

### 角色

可以通过角色来为menu添加预定义行为。

最好给任何一个菜单指定 ` role `去匹配一个标准角色, 而不是尝试在 ` click ` 函数中手动实现该行为。 内置的 ` role ` 行为将提供最佳的原生体验。

使用 ` role ` 时, ` label ` 和 ` accelerator ` 值是可选的, 并为每个平台，将默认为适当值。

每个菜单项必须有一个 `role`, `label`, 或者一个分隔符一个 `type`

`role ` 属性可以具有以下值:

* `undo - 撤销。`
* `about` - 触发原生信息面板 (在 Window 中自定义消息盒子, 本身不提供).
* `redo`
* `cut -  剪切。`
* `copy - 复制。`
* `paste - 粘贴。`
* `pasteAndMatchStyle`
* `selectAll - 全选。`
* `delete -删除`
* ` minimize ` - 最小化当前窗口。
* `close` - 关闭当前窗口
* `quit` - 退出程序
* `reload` - 重新加载当前窗口。
* `forcereload` - 忽略缓存，重新加载当前窗口。
* `toggledevtools` - 在当前窗口中隐藏/显示开发者工具。
* `togglefullscreen` - 将当前窗口切换至全屏模式。
* `resetzoom` - 将主页的缩放级别重置为初始大小.
* `zoomin` - 主页面放大 10%.
* `zoomout` -主页面缩小 10%.
* `toggleSpellChecker` - 启用/禁用内置拼写检查器。
* `fileMenu` - 默认的“文件”菜单（关闭/退出）
* `editMenu`-默认的 "编辑" 菜单 (包括撤消、复制等)
* `viewMenu` - 默认的“视图”菜单（包括重新加载、开发者工具等）
* `windowMenu` - 默认的“窗口”菜单（包括最小化、缩放等）

以下其他角色可在 _macOS_ 上找到：

* `appMenu` - 整个默认"App" menu (About, Services, 等)
* ` hide `-映射到 ` hide ` 操作.
* ` hideOthers `-映射到 ` hideOtherApplications ` 操作.
* `unhide` - 映射到 `unhideAllApplications` 动作
* ` startSpeaking `-映射到 ` startSpeaking ` 操作.
* ` stopSpeaking `-映射到 ` stopSpeaking ` 操作.
* `front` - 映射到 `arrangeInFront` 动作
* `zoom` - 映射到 `performZoom` 动作
* ` toggleTabBar `-映射到 ` toggleTabBar ` 操作.
* ` selectNextTab ` - 映射到 ` selectNextTab ` 操作.
* ` selectPreviousTab ` - 映射到 ` selectPreviousTab ` 操作.
* ` mergeAllWindows ` - 映射到 ` mergeAllWindows ` 操作.
* ` moveTabToNewWindow ` - 映射到 ` moveTabToNewWindow ` 操作.
* `window` - 这个子菜单是"Window" 菜单.
* ` help `-这个子菜单是 "Help" 菜单.
* `services` - 子菜单是 ["Services"](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) 菜单。 此选项仅应用于 Application Menu 而且 *不同于*在 macOS app 中上下文菜单中的 "Services" 子菜单，因为它不是由 Electron 实现的
* ` recentDocuments `-这个子菜单是 "Open Recent" 菜单.
* `clearRecentDocuments` -映射到 `clearRecentDocuments` 操作.
* `shareMenu` - [share menu][ShareMenu]的子菜单。 `sharingItem` 属性必须被设置， 用于指向被分享的项

在 macOS 上指定 ` role ` 时, ` label ` 和 ` accelerator ` 是影响菜单项的唯一选项。 所有其它选项都将被忽略。 不过，仍然支持小写的`role`，如`toggledevtools`。

**注意:** 对于托盘上的顶级菜单项不可用的 `enabled` 和 `visibility` 属性

### 实例属性

以下为 ` MenuItem ` 实例的可用属性:

#### `menuItem.id`

`String` 指定了该选项唯一的id，此属性可被动态更改。

#### `menuItem.label`

一个表示菜单项标签的 `String`

#### `menuItem.click`

MenuItem接收到点击事件后自动触发的方法 `Function` 。 调用方法为 `menuItem.click(event, focusedWindow, focusedWebContents)`.

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `focusedWindow` [BrowserWindow](browser-window.md)
* `focusedWebContents` [WebContents](web-contents.md)

#### `menuItem.submenu`

A `Menu` (可选) 指定子菜单

#### `menuItem.type`

`String` 表示菜单项的类型 可以是 `normal`, `separator`, `submenu`, `checkbox` 或 `radio`.

#### `menuItem.role`

`String`（可选） 指出菜单项的角色 Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `toggleSpellChecker`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `shareMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu`

#### `menuItem.accelerator`

An `Accelerator` (optional) indicating the item's accelerator, if set.

#### `menuItem.userAccelerator` _Readonly_ _macOS_

An `Accelerator | null` indicating the item's [user-assigned accelerator](https://developer.apple.com/documentation/appkit/nsmenuitem/1514850-userkeyequivalent?language=objc) for the menu item.

**Note:** This property is only initialized after the `MenuItem` has been added to a `Menu`. Either via `Menu.buildFromTemplate` or via `Menu.append()/insert()`.  Accessing before initialization will just return `null`.

#### `menuItem.icon`

`NativeImage | String` (可选) 若设置， 则从对应的值中找选项图标

#### `menuItem.sublabel`

`String` 表明选项的子标签

#### `menuItem.toolTip` _macOS_

`String` 选项的悬停文本内容

#### `menuItem.enabled`

一个 ` Boolean ` 类型的值, 指示是否启用该项, 该属性可以动态改变

#### `menuItem.visible`

一个 ` Boolean ` 类型的值, 指示该项是否可见, 该属性可以动态改变。

#### `menuItem.checked`

一个 ` Boolean ` 类型的值, 指示是否选中该项, 该属性可以动态改变。

` checkbox ` 菜单项将在选中时切换 ` checked ` 的开关属性。

`单选菜单项` 将返回单击时`checked`属性, 并将关闭同一菜单中所有相邻项的属性。

你可以为其他行为添加`click`函数。

#### `menuItem.registerAccelerator`

通过 `Boolean`表明快捷键跟随系统注册还是仅仅展示出来

此属性可以动态更改。

#### `menuItem.sharingItem` _macOS_

`SharingItem` 表示了当 `role` 是 `shareMenu` 时要分享的项。

此属性可以动态更改。

#### `menuItem.commandId`

表示项目顺序唯一 Id 的 `Number`

#### `menuItem.menu`

多个选项组成一个 `Menu`

[ShareMenu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
