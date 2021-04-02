## 菜单项

> 添加菜单项到应用程序菜单和上下文菜单中

进程：[主进程](../glossary.md#main-process)

有关示例, 请参见 [` Menu `](menu.md)。

### `new MenuItem(可选)`

* `选项` 对象
  * `click` 功能（可选） - 单击菜单项时，将用 `click(menuItem, browserWindow, event)` 调用。
    * `menuItem` 菜单项
    * `browserWindow` [浏览器窗口](browser-window.md) |未定义 - 如果没有打开窗口，则无法定义此定义。
    * `event` [键盘事件](structures/keyboard-event.md)
  * `role` 弦（可选） - 可 `undo`、 `redo`、 `cut`、 `copy`、 `paste`、 `pasteAndMatchStyle`、 `delete`、 `selectAll`、 `reload`、 `forceReload`、 `toggleDevTools`、 `resetZoom`、 `zoomIn`、 `zoomOut`、 `togglefullscreen`、 `window`、 `minimize`、 `close` `help`、 `about`、 `services`、 `hide`、 `hideOthers`、 `unhide`、 `quit`、 `startSpeaking`、 `stopSpeaking`、 `zoom`、 `front`、 `appMenu`、 `fileMenu`、 `editMenu`、 `viewMenu`、 `shareMenu`、 `recentDocuments`、 `toggleTabBar`、 `selectNextTab` `selectPreviousTab`， `mergeAllWindows`、 `clearRecentDocuments`、 `moveTabToNewWindow` 或 `windowMenu` - 定义菜单项的操作时， `click` 属性将被忽略。 参见 [roles](#roles)
  * ` type `String (可选)-可以是 ` normal `、` separator `、` submenu `、` checkbox ` 或 ` radio `。
  * `label` String (可选)
  * `sublabel` String (可选)
  * `toolTip` 字符串（可选） _macOS_ - 此菜单项的悬停文本。
  * `accelerator` [Accelerator](accelerator.md) (可选)
  * `icon` ([NativeImage](native-image.md) | String) (可选)
  * `enabled` Boolean (可选) - 如果为 false，该菜单项将会置灰且不可点击。
  * `acceleratorWorksWhenHidden` 布尔（可选） _macOS_ - 默认值 `true`，当 `false` 将阻止加速器触发项目，如果项目是不可见的'。
  * ` visible `Boolean (可选)-如果为 false, 该菜单项将完全隐藏。
  * ` checked `Boolean (可选)-只应为 ` checkbox ` 或 ` radio ` 类型菜单项指定。
  * `registerAccelerator` 布尔（可选） _Linux_ _视窗_ - 如果错误，油门不会 系统注册，但它仍然会显示。 默认值为 true。
  * `sharingItem` 共享网站 （可选） _macOS_ - 当 `role` `shareMenu`时要共享的项目。
  * `submenu` （菜单构造器选项]| [菜单](menu.md)）（可选） - 应指定 `submenu` 类型的菜单项 。 如果指定 `submenu` ，可以省略 `type: 'submenu'` 。 如果该值不属于[`Menu`](menu.md)，它将被函数`Menu.buildFromTemplate`自动转换。
  * `id` 字符串（可选） - 在单个菜单中独一无二。 如果定义，则可以通过位置属性 用作此项目的引用。
  * `before` 字符串 [] （可选） - 在项目之前插入此项目，并带有指定的标签。 If the referenced item doesn't exist the item will be inserted at the end of  the menu. 还意味着 ，有关菜单项应与项目处于同一"组"中。
  * `after` 字符串[]（可选） - 在项目后插入此项目，并带有指定的标签。 如果引用值不存在，那么该菜单项会插在这个菜单的尾部。
  * `beforeGroupContaining` 字符串 [] （可选） - 提供一种手段，使单个上下文菜单 在包含带有指定标签的项目组 之前声明其包含组的位置。
  * `afterGroupContaining` 字符串 [] （可选） - 提供一种手段，使单个上下文菜单 在包含带有指定标签的项目组 后声明其包含组的位置。

**注意: **`acceleratorWorksWhenHidden`只在MacOS中生效，因为在Windows和Linux中快捷键不会随着隐藏菜单项而失效。 该选项让用户可以选择关闭，因为这是本地 macOS 开发中的可能。 此属性只能在macOS High Sierra 10.13或以上中使用。

### 角色

可以通过角色来为menu添加预定义行为。

最好给任何一个菜单指定 ` role `去匹配一个标准角色, 而不是尝试在 ` click ` 函数中手动实现该行为。 内置的 ` role ` 行为将提供最佳的原生体验。

使用 ` role ` 时, ` label ` 和 ` accelerator ` 值是可选的, 并为每个平台，将默认为适当值。

每个菜单项目必须有一个 `role`， `label`，或在分离器的情况下 `type`。

`role ` 属性可以具有以下值:

* `撤消`
* `about` - 触发一个关于面板的原生信息框（窗口上的自定义消息框，它不提供自己的）。
* `重做`
* `cut`
* `copy`
* `paste`
* `pasteAndMatchStyle`
* `selectAll`
* `delete`
* ` minimize ` - 最小化当前窗口。
* `close` - 关闭当前窗口.
* `quit` - 退出程序
* `reload` - 重新加载当前窗口。
* `forcereload` - 忽略缓存，重新加载当前窗口。
* `toggledevtools` - 在当前窗口中隐藏/显示开发者工具。
* `togglefullscreen` - 将当前窗口切换至全屏模式。
* `resetzoom` - 将主页的缩放级别重置为初始大小.
* `zoomin` - 主页面放大 10%.
* `zoomout` -主页面缩小 10%.
* `toggleSpellChecker` - 启用/禁用内置拼写检查器。
* `fileMenu` - 整个默认"文件"菜单（关闭/退出）
* `editMenu`-默认的 "编辑" 菜单 (包括撤消、复制等)
* `viewMenu` - 整个默认"查看"菜单（重新加载、切换开发人员工具等）
* `windowMenu` - 整个默认的"窗口"菜单（最小化、缩放等）。

以下附加角色可在 _macOS_上提供：

* `appMenu` - 整个默认的"应用程序"菜单（关于，服务等）
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
* `services` - 子菜单是一个 [的"服务"](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) 菜单。 这仅用于应用程序菜单， *与 macOS 应用中上下文菜单中使用的"服务"子菜单* 相同，后者在 Electron 中未实现。
* ` recentDocuments `-这个子菜单是 "Open Recent" 菜单.
* `clearRecentDocuments` -映射到 `clearRecentDocuments` 操作.
* `shareMenu` - 子菜单 [共享菜单][ShareMenu]。 还必须设置 `sharingItem` 属性以指示要共享的项目。

在 macOS 上指定 ` role ` 时, ` label ` 和 ` accelerator ` 是影响菜单项的唯一选项。 所有其它选项都将被忽略。 不过，仍然支持小写的`role`，如`toggledevtools`。

**诺塔贝恩：** `enabled` 和 `visibility` 属性不适用于 macOS 托盘中的顶级菜单项。

### 实例属性

以下为 ` MenuItem ` 实例的可用属性:

#### `menuItem.id`

`String` 指定了该选项唯一的id，此属性可被动态更改。

#### `menuItem.label`

指示物品可见标签的 `String` 。

#### `menuItem.click`

当 MenuItem 接收到 click 事件时激发的`Function`. 它可以被称为 `menuItem.click(event, focusedWindow, focusedWebContents)`。

* `event` [键盘事件](structures/keyboard-event.md)
* `focusedWindow` [浏览器窗口](browser-window.md)
* `focusedWebContents` [网络](web-contents.md)

#### `菜单伊特姆. 苏布梅努`

包含菜单的 `Menu` （可选） 项目的子菜单（如果存在）。

#### `菜单类型`

`String` 表示菜单项的类型 可以是 `normal`、 `separator`、 `submenu`、 `checkbox` 或 `radio`。

#### `菜单网站。角色`

`String`（可选） 指出菜单项的角色 Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu`

#### `菜单网站. 加速器`

`Accelerator` （可选），指示物品的加速器，如果设置。

#### `菜单网站。图标`

`NativeImage | String` （可选），指示 项目的图标，如果设置。

#### `菜单网站. 子标签`

指示物品子标签的 `String` 。

#### `menuItem.toolTip` _马科斯_

指示项目悬停文本的 `String` 。

#### `menuItem.enabled`

一个 ` Boolean ` 类型的值, 指示是否启用该项, 该属性可以动态改变

#### `menuItem.visible`

一个 ` Boolean ` 类型的值, 指示该项是否可见, 该属性可以动态改变。

#### `menuItem.checked`

一个 ` Boolean ` 类型的值, 指示是否选中该项, 该属性可以动态改变。

` checkbox ` 菜单项将在选中时切换 ` checked ` 的开关属性。

`单选菜单项` 将返回单击时`checked`属性, 并将关闭同一菜单中所有相邻项的属性。

你可以为其他行为添加`click`函数。

#### `菜单网站.注册加速器`

`Boolean` 指示加速器是否应在 系统注册或刚刚显示。

此属性可以动态更改。

#### `menuItem.sharingItem` _马科斯_

`shareMenu``role` 时要共享的项目 `SharingItem` 。

此属性可以动态更改。

#### `菜单网站。`

`Number` 指示物品的顺序唯一 ID。

#### `菜单网站。`

项目是其中一部分的 `Menu` 。

[ShareMenu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
