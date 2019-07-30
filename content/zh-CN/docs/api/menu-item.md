## 菜单项

> 添加菜单项到应用程序菜单和上下文菜单中

进程：[主进程](../glossary.md#main-process)

有关示例, 请参见 [` Menu `](menu.md)。

### `new MenuItem(可选)`

* `参数` Object 
  * `click` Function (可选) - 当菜单项被点击后，将会调用 `click(menuItem, browserWindow, event)` 。 
    * `menuItem` 菜单项
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` [KeyboardEvent](structures/keyboard-event.md)
  * `role` String (optional) - Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteandmatchstyle`, `delete`, `selectall`, `reload`, `forcereload`, `toggledevtools`, `resetzoom`, `zoomin`, `zoomout`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideothers`, `unhide`, `quit`, `startspeaking`, `stopspeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu` or `windowMenu` - Define the action of the menu item, when specified the `click` property will be ignored. See [roles](#roles).
  * ` type `String (可选)-可以是 ` normal `、` separator `、` submenu `、` checkbox ` 或 ` radio `。
  * `label` String (可选)
  * `sublabel` String (可选)
  * `accelerator` [Accelerator](accelerator.md) (可选)
  * `icon` ([NativeImage](native-image.md) | String) (可选)
  * `enabled` Boolean (可选) - 如果为 false，该菜单项将会置灰且不可点击。
  * `acceleratorWorksWhenHidden` Boolean (optional) - default is `true`, and when `false` will prevent the accelerator from triggering the item if the item is not visible`. *macOS*
  * `visible` Boolean (optional) - If false, the menu item will be entirely hidden.
  * `checked` Boolean (optional) - Should only be specified for `checkbox` or `radio` type menu items.
  * `registerAccelerator` Boolean (optional) - If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to true.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  * `before` String[] (optional) - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
  * `after` String[] (optional) - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu.
  * `beforeGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
  * `afterGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

**Note:** `acceleratorWorksWhenHidden` is specified as being macOS-only because accelerators always work when items are hidden on Windows and Linux. The option is exposed to users to give them the option to turn it off, as this is possible in native macOS development. This property is only usable on macOS High Sierra 10.13 or newer.

### 角色

Roles allow menu items to have predefined behaviors.

It is best to specify `role` for any menu item that matches a standard role, rather than trying to manually implement the behavior in a `click` function. The built-in `role` behavior will give the best native experience.

The `label` and `accelerator` values are optional when using a `role` and will default to appropriate values for each platform.

Every menu item must have either a `role`, `label`, or in the case of a separator a `type`.

The `role` property can have following values:

* `撤消`
* `重做`
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
* `fileMenu` - Whole default "File" menu (Close / Quit)
* `editMenu`-默认的 "编辑" 菜单 (包括撤消、复制等)
* `viewMenu` - Whole default "View" menu (Reload, Toggle Developer Tools, etc.)
* `windowMenu` - Whole default "Window" menu (Minimize, Zoom, etc.).

The following additional roles are available on *macOS*:

* `appMenu` - Whole default "App" menu (About, Services, etc.)
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
* `services` - The submenu is a ["Services"](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) menu. This is only intended for use in the Application Menu and is *not* the same as the "Services" submenu used in context menus in macOS apps, which is not implemented in Electron.
* ` recentDocuments `-这个子菜单是 "Open Recent" 菜单.
* `clearRecentDocuments` -映射到 `clearRecentDocuments` 操作.

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

**Nota Bene:** The `enabled` and `visibility` properties are not available for top-level menu items in the tray on MacOS.

### 实例属性

The following properties are available on instances of `MenuItem`:

#### `menuItem.id`

A `String` indicating the item's unique id, this property can be dynamically changed.

#### `menuItem.label`

A `String` indicating the item's visible label, this property can be dynamically changed.

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event. It can be called with `menuItem.click(event, focusedWindow, focusedWebContents)`.

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `focusedWindow` [BrowserWindow](browser-window.md)
* `focusedWebContents` [WebContents](web-contents.md)

#### `menuItem.submenu`

A `Menu` (optional) containing the menu item's submenu, if present.

#### `menuItem.type`

A `String` indicating the type of the item.

#### `menuItem.role`

A `String` (optional) indicating the item's role, if set. Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteandmatchstyle`, `delete`, `selectall`, `reload`, `forcereload`, `toggledevtools`, `resetzoom`, `zoomin`, `zoomout`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideothers`, `unhide`, `quit`, `startspeaking`, `stopspeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu` or `windowMenu`

#### `menuItem.accelerator`

A `String` (optional) indicating the item's accelerator, if set.

#### `menuItem.icon`

A `NativeImage | String` (optional) indicating the item's icon, if set.

#### `menuItem.sublabel`

A `String` indicating the item's sublabel, this property can be dynamically changed.

#### `menuItem.enabled`

A `Boolean` indicating whether the item is enabled, this property can be dynamically changed.

#### `menuItem.visible`

A `Boolean` indicating whether the item is visible, this property can be dynamically changed.

#### `menuItem.checked`

A `Boolean` indicating whether the item is checked, this property can be dynamically changed.

A `checkbox` menu item will toggle the `checked` property on and off when selected.

A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

You can add a `click` function for additional behavior.

#### `menuItem.registerAccelerator`

A `Boolean` indicating if the accelerator should be registered with the system or just displayed, this property can be dynamically changed.

#### `menuItem.commandId`

A `Number` indicating an item's sequential unique id.

#### `menuItem.menu`

A `Menu` that the item is a part of.