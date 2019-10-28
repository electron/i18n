## 系统托盘

> 添加图标和上下文菜单到系统通知区

进程：[主进程](../glossary.md#main-process)

`Tray` 是一个 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

```javascript
const { app, Menu, Tray } = require('electron')

let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})
```

**平台限制：**

* 在Linux上，如果支持，就使用应用程序指示器，否则将使用` GtkStatusIcon `。
* 在仅支持应用程序指标的Linux发行版中，必须安装` libappindicator1 `才能使任务栏图标正常工作。
* 应用程序指标只有当它有一个上下文菜单时才会显示。
* 当在Linux上使用应用程序指标时，它的 `click`事件将被忽略
* 在Linux上，为了改变单独的` MenuItem `，你必须再次调用` setContextMenu `。 例如：

```javascript
const { app, Menu, Tray } = require('electron')

let appIcon = null
app.on('ready', () => {
  appIcon = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])

  // Make a change to the context menu
  contextMenu.items[1].checked = false

  // Call this again for Linux because we modified the context menu
  appIcon.setContextMenu(contextMenu)
})
```

* 在 Windows 上, 建议使用 ` ICO ` 图标来获得最佳视觉效果。

如果要在所有平台上保持完全相同的行为, 则不应依赖 ` click ` 事件, 并且始终将上下文菜单附加到任务栏图标。

### `new Tray(image)`

* `image` ([NativeImage](native-image.md) | String)

创建与` image `关联的新任务栏图标。

### 实例事件

`Tray` 对象会发出以下事件:

#### 事件: 'click'

返回:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - 系统托盘图标的边界。
* `position` [Point](structures/point.md) - 事件的位置信息。

当该图标被点击时触发。

#### Event: 'right-click' *macOS* *Windows*

返回:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - 系统托盘图标的边界。

当该图标被右击时触发。

#### Event: 'double-click' *macOS* *Windows*

返回:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - 系统托盘图标的边界。

当该图标被双击时触发。

#### Event: 'balloon-show' *Windows*

当系统托盘图标气泡显示时，触发该事件。

#### Event: 'balloon-click' *Windows*

当系统托盘气泡被点击时，触发该事件。

#### Event: 'balloon-closed' *Windows*

当系统托盘气泡因为超时被关闭或者用户手动关闭时，触发该事件。

#### Event: 'drop' *macOS*

当有任何拖动项拖到该任务栏图标上时，触发该事件。

#### Event: 'drop-files' *macOS*

返回:

* `event` Event
* `files` String[] - 拖至任务栏图标上的文件的路径。

当有任何文件被拖到该任务栏图标上时，触发该事件。

#### Event: 'drop-text' *macOS*

返回:

* `event` Event
* `text` String - 拖至任务栏图标上的文字内容。

当有任何文字被拖到该任务栏图标上时，触发该事件。

#### Event: 'drag-enter' *macOS*

当有任何拖动操作进入（拖动未结束）该任务栏图标时，触发该事件。

#### Event: 'drag-leave' *macOS*

当有任何拖动操作离开该任务栏图标时，触发该事件。

#### Event: 'drag-end' *macOS*

当有任何拖动操作在托盘或其他地方结束时，触发该事件。

#### Event: 'mouse-enter' *macOS*

返回:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - 事件的位置信息。

当鼠标进入该任务栏图标时，触发该事件。

#### Event: 'mouse-leave' *macOS*

返回:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - 事件的位置信息。

当鼠标离开该任务栏图标时，触发该事件。

#### Event: 'mouse-move' *macOS* *Windows*

返回:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - 事件的位置信息。

当鼠标在该任务栏图标上移动时，触发该事件。

### 实例方法

`Tray` 类拥有以下方法:

#### `tray.destroy()`

立即销毁该任务栏图标

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

设置`image`作为托盘中显示的图标

#### `tray.setPressedImage(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

在 macOS 中，设置`image`作为托盘图标被按下时显示的图标

#### `tray.setToolTip(toolTip)`

* `toolTip` String

设置鼠标指针在托盘图标上悬停时显示的文本

#### `tray.setTitle(title)` *macOS*

* `title` String

Sets the title displayed next to the tray icon in the status bar (Support ANSI colors).

#### `tray.getTitle()` *macOS*

Returns `String` - the title displayed next to the tray icon in the status bar

#### `tray.setIgnoreDoubleClickEvents(ignore)` *macOS*

* `ignore` Boolean

Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon.

This value is set to false by default.

#### `tray.getIgnoreDoubleClickEvents()` *macOS*

Returns `Boolean` - Whether double click events will be ignored.

#### `tray.displayBalloon(options)` *Windows*

* `options` Object 
  * `icon` ([NativeImage](native-image.md) | String) (可选) -
  * `title` String
  * `content` String

显示一个托盘气球通知.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (可选)
* `position` [Point](structures/point.md) (可选) - 菜单弹出的位置.

弹出托盘图标的上下文菜单。如果传入了 `menu` 参数，将会弹出 `menu` 而不是托盘图标的上下文菜单

参数 `position` 只在 Windows 上可用， 并拥有默认值 (0, 0)。

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

设置这个图标的内容菜单

#### `tray.getBounds()` *macOS* *Windows*

返回 [`Rectangle`](structures/rectangle.md)

以`Object`类型返回托盘图标的`bounds`

#### `tray.isDestroyed()`

返回 `Boolean` -判断托盘图标是否被销毁