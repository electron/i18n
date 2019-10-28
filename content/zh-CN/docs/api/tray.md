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

Emitted when the tray icon is clicked.

#### Event: 'right-click' *macOS* *Windows*

返回:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - 系统托盘图标的边界。

Emitted when the tray icon is right clicked.

#### Event: 'double-click' *macOS* *Windows*

返回:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - 系统托盘图标的边界。

Emitted when the tray icon is double clicked.

#### Event: 'balloon-show' *Windows*

Emitted when the tray balloon shows.

#### Event: 'balloon-click' *Windows*

Emitted when the tray balloon is clicked.

#### Event: 'balloon-closed' *Windows*

Emitted when the tray balloon is closed because of timeout or user manually closes it.

#### Event: 'drop' *macOS*

Emitted when any dragged items are dropped on the tray icon.

#### Event: 'drop-files' *macOS*

返回:

* `event` Event
* `files` String[] - 拖至任务栏图标上的文件的路径。

Emitted when dragged files are dropped in the tray icon.

#### Event: 'drop-text' *macOS*

返回:

* `event` Event
* `text` String - 拖至任务栏图标上的文字内容。

Emitted when dragged text is dropped in the tray icon.

#### Event: 'drag-enter' *macOS*

Emitted when a drag operation enters the tray icon.

#### Event: 'drag-leave' *macOS*

Emitted when a drag operation exits the tray icon.

#### Event: 'drag-end' *macOS*

Emitted when a drag operation ends on the tray or ends at another location.

#### Event: 'mouse-enter' *macOS*

返回:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - 事件的位置信息。

Emitted when the mouse enters the tray icon.

#### Event: 'mouse-leave' *macOS*

返回:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - 事件的位置信息。

Emitted when the mouse exits the tray icon.

#### Event: 'mouse-move' *macOS* *Windows*

返回:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - 事件的位置信息。

Emitted when the mouse moves in the tray icon.

### 实例方法

The `Tray` class has the following methods:

#### `tray.destroy()`

Destroys the tray icon immediately.

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this tray icon.

#### `tray.setPressedImage(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this tray icon when pressed on macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Sets the hover text for this tray icon.

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

* `参数` Object - 过滤器对象，包含过滤参数 
  * `icon` ([NativeImage](native-image.md) | String) (optional) -
  * `title` String
  * `content` String

Displays a tray balloon.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (optional)
* `position` [Point](structures/point.md) (optional) - The pop up position.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

The `position` is only available on Windows, and it is (0, 0) by default.

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

Sets the context menu for this icon.

#### `tray.getBounds()` *macOS* *Windows*

返回 [`Rectangle`](structures/rectangle.md)

The `bounds` of this tray icon as `Object`.

#### `tray.isDestroyed()`

Returns `Boolean` - Whether the tray icon is destroyed.