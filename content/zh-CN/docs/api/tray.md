## 系统托盘

> 添加图标和上下文菜单到系统通知区

进程：[主进程](../glossary.md#main-process)

`Tray` 是一个 [EventEmitter][event-emitter].

```javascript
康斯特 { app, Menu, Tray } =要求（'电子'）

让托盘=空
应用程序。当准备（然后）=> {
  托盘=新托盘（'/路径/到/我/图标' ）
  const上下文梅努=菜单。构建从Template（[
    { label: 'Item1', type: 'radio' }，
    { label: 'Item2', type: 'radio' }，
    { label: 'Item3', type: 'radio', checked: true }，
    { label: 'Item4', type: 'radio' }
  ]）
  托盘。
  托盘。集康文本梅努（上下文梅努）
}）
```

__平台限制：__

* 在Linux上，如果支持，就使用应用程序指示器，否则将使用` GtkStatusIcon `。
* 在仅支持应用程序指标的Linux发行版中，必须安装` libappindicator1 `才能使任务栏图标正常工作。
* 应用程序指标只有当它有一个上下文菜单时才会显示。
* 当在Linux上使用应用程序指标时，它的 `click`事件将被忽略
* 在 Linux 上，为了使对单个 `MenuItem`的更改生效， 您必须再次致电 `setContextMenu` 。 例如：

```javascript
康斯特 { app, Menu, Tray } =要求（'电子'）

让appIcon=空
应用程序。当准备（然后）=> =
  appIcon=新托盘（'/路径/到/我/图标'）
  const上下文梅努=菜单。 （[
    { label: 'Item1', type: 'radio' }，
    { label: 'Item2', type: 'radio' }
  ]）

  //更改上下文菜单
  上下文Menu.项目[1]。检查=假

  //再次调用此linux，因为我们修改了上下文菜单
  appIcon.set康文本菜单（上下文梅努）
}）
```

* 在 Windows 上, 建议使用 ` ICO ` 图标来获得最佳视觉效果。

如果要在所有平台上保持完全相同的行为, 则不应依赖 ` click ` 事件, 并且始终将上下文菜单附加到任务栏图标。

### `新托盘（图片， [guid]）`

* `image` ([NativeImage](native-image.md) | String)
* `guid` 字符串（可选） _视窗_ -将GUID分配给托盘图标。 如果可执行的签名和签名包含主题行中的组织，则GUID与该签名永久关联。 操作系统级别设置（如托盘图标在系统托盘中的位置）将持续存在，即使可执行更改的路径也是如此。 如果可执行的不是代码签名，则GUID与可执行的路径永久关联。 更改可执行路径将破坏托盘图标的创建，必须使用新的GUID。 但是，强烈建议仅将GUID参数与代码签名的可执行性同时使用。 如果应用定义了多个托盘图标，则每个图标必须使用单独的GUID。

创建与` image `关联的新任务栏图标。

### 实例事件

`Tray` 对象会发出以下事件:

#### 事件: 'click'

返回:

* `event` [键盘事件](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - 系统托盘图标的边界。
* `position` [Point](structures/point.md) - 事件的位置信息。

当该图标被点击时触发。

#### Event: 'right-click' _macOS_ _Windows_

返回:

* `event` [键盘事件](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - 系统托盘图标的边界。

当该图标被右击时触发。

#### Event: 'double-click' _macOS_ _Windows_

返回:

* `event` [键盘事件](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - 系统托盘图标的边界。

当该图标被双击时触发。

#### Event: 'balloon-show' _Windows_

当系统托盘图标气泡显示时，触发该事件。

#### Event: 'balloon-click' _Windows_

当系统托盘气泡被点击时，触发该事件。

#### Event: 'balloon-closed' _Windows_

当系统托盘气泡因为超时被关闭或者用户手动关闭时，触发该事件。

#### Event: 'drop' _macOS_

当有任何拖动项拖到该任务栏图标上时，触发该事件。

#### Event: 'drop-files' _macOS_

返回:

* `event` Event
* `files` String[] - 拖至任务栏图标上的文件的路径。

当有任何文件被拖到该任务栏图标上时，触发该事件。

#### Event: 'drop-text' _macOS_

返回:

* `event` Event
* `text` String - 拖至任务栏图标上的文字内容。

当有任何文字被拖到该任务栏图标上时，触发该事件。

#### Event: 'drag-enter' _macOS_

当有任何拖动操作进入（拖动未结束）该任务栏图标时，触发该事件。

#### Event: 'drag-leave' _macOS_

当有任何拖动操作离开该任务栏图标时，触发该事件。

#### Event: 'drag-end' _macOS_

当有任何拖动操作在托盘或其他地方结束时，触发该事件。

#### 事件： "鼠标向上" _macos_

返回:

* `event` [键盘事件](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - 事件的位置信息。

当鼠标从单击托盘图标中释放时发出。

注意：如果您使用 `tray.setContextMenu`为托盘设置了上下文菜单，由于 macOS 级别的限制，则不会发出此信息。

#### 事件： "鼠标向下" _macos_

返回:

* `event` [键盘事件](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - 事件的位置信息。

当鼠标单击托盘图标时发出。

#### Event: 'mouse-enter' _macOS_

返回:

* `event` [键盘事件](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - 事件的位置信息。

当鼠标进入该任务栏图标时，触发该事件。

#### Event: 'mouse-leave' _macOS_

返回:

* `event` [键盘事件](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - 事件的位置信息。

当鼠标离开该任务栏图标时，触发该事件。

#### 活动： "鼠标移动" _macos_ _窗口_

返回:

* `event` [键盘事件](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - 事件的位置信息。

当鼠标在该任务栏图标上移动时，触发该事件。

### 实例方法

`Tray` 类拥有以下方法:

#### `tray.destroy()`

立即销毁该任务栏图标

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

设置`image`作为托盘中显示的图标

#### `tray.setPressedImage(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

在 macOS 中，设置`image`作为托盘图标被按下时显示的图标

#### `tray.setToolTip(toolTip)`

* `toolTip` String

设置鼠标指针在托盘图标上悬停时显示的文本

#### `tray.setTitle(title[, options])` _马科斯_

* `title` String
* `options` Object (可选)
  * `fontType` 字符串（可选） - 要显示的字体家族变体，可以 `monospaced` 或 `monospacedDigit`。 `monospaced` 在 macOS 10.15+ 中提供， `monospacedDigit` 可在 macOS 10.11+ 中提供。  当留空时，标题使用默认系统字体。

设置状态栏中托盘图标旁边的标题（支持 ANSI 颜色）。

#### `tray.getTitle()` _macOS_

返回 `String` - 状态栏中托盘图标旁边的标题

#### `tray.setIgnoreDoubleClickEvents(ignore)` _macOS_

* `ignore` Boolean

设置忽略双击事件的选项。 忽略这些事件，您可以 检测托盘图标的每一次单击。

此值在默认情况下设置为错误。

#### `tray.getIgnoreDoubleClickEvents()` _macOS_

返回 `Boolean` - 是否会忽略双击事件。

#### `tray.displayBalloon(options)` _Windows_

* `选项` 对象
  * `icon` （[原生图像](native-image.md) |字符串）（可选） - `iconType` `custom`时使用的图标。
  * `iconType` 字符串（可选） - 可以 `none`， `info`， `warning`， `error` 或 `custom`。 默认值 `custom`。
  * `title` String
  * `content` String
  * `largeIcon` 布尔（可选） - 应该使用图标的大版本。 默认值为 `true`。 地图到 [`NIIF_LARGE_ICON`][NIIF_LARGE_ICON]。
  * `noSound` 布尔（可选） - 不要播放相关的声音。 默认值为 `false`. 地图到 [`NIIF_NOSOUND`][NIIF_NOSOUND]。
  * `respectQuietTime` Boolean （可选） - 当前用户处于"安静时间"时，不要显示气球通知。 默认值为 `false`. 地图到 [`NIIF_RESPECT_QUIET_TIME`][NIIF_RESPECT_QUIET_TIME]。

显示一个托盘气球通知.

#### `tray.removeBalloon()` _Windows_

取出托盘气球。

#### `tray.focus()` _Windows_

将焦点返回到任务栏通知区域。 通知区域图标在完成 UI 操作后应使用此消息。 例如，如果图标显示快捷方式菜单，但用户按 ESC 将其取消，则 使用 `tray.focus()` 将焦点返回通知区域。

#### `tray.popUpContextMenu([menu, position])` _macOS_ _Windows_

* `menu` Menu (可选)
* `position` [Point](structures/point.md) (可选) - 菜单弹出的位置.

弹出托盘图标的上下文菜单。 当 `menu` 通过时， `menu` 将 显示，而不是托盘图标的上下文菜单。

参数 `position` 只在 Windows 上可用， 并拥有默认值 (0, 0)。

#### `tray.closeContextMenu()` _macOS_ _Windows_

关闭由 `tray.setContextMenu()`设置的开放上下文菜单。

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

设置这个图标的内容菜单

#### `tray.getBounds()` _macOS_ _Windows_

返回 [`Rectangle`](structures/rectangle.md)

以`Object`类型返回托盘图标的`bounds`

#### `tray.isDestroyed()`

返回 `Boolean` -判断托盘图标是否被销毁

[NIIF_NOSOUND]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_nosound-0x00000010
[NIIF_LARGE_ICON]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_large_icon-0x00000020
[NIIF_RESPECT_QUIET_TIME]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_respect_quiet_time-0x00000080

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
