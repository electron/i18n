## 系统托盘

> 添加图标和上下文菜单到系统通知区

进程：[主进程](../glossary.md#main-process)

`Tray` 是一个 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

```javascript
const {app, Menu, Tray} = require('electron')

let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
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
const {app, Menu, Tray} = require('electron')

let appIcon = null
app.on('ready', () => {
  appIcon = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'}
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

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.
* `position` [Point](structures/point.md) - The position of the event.

当该图标被点击时触发。

#### Event: 'right-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.

当该图标被右击时触发。

#### Event: 'double-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon.

当该图标被双击时触发。

#### Event: 'balloon-show' *Windows*

Emitted when the tray balloon shows.

#### Event: 'balloon-click' *Windows*

Emitted when the tray balloon is clicked.

#### Event: 'balloon-closed' *Windows*

Emitted when the tray balloon is closed because of timeout or user manually closes it.

#### Event: 'drop' *macOS*

当有任何拖动项拖到该任务栏图标上时，触发该事件。

#### Event: 'drop-files' *macOS*

* `event` Event
* `files` String[] - The paths of the dropped files.

Emitted when dragged files are dropped in the tray icon.

#### Event: 'drop-text' *macOS*

* `event` Event
* `text` String - the dropped text string.

Emitted when dragged text is dropped in the tray icon.

#### Event: 'drag-enter' *macOS*

Emitted when a drag operation enters the tray icon.

#### Event: 'drag-leave' *macOS*

Emitted when a drag operation exits the tray icon.

#### Event: 'drag-end' *macOS*

Emitted when a drag operation ends on the tray or ends at another location.

#### Event: 'mouse-enter' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event.

Emitted when the mouse enters the tray icon.

#### Event: 'mouse-leave' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event.

Emitted when the mouse exits the tray icon.

#### Event: 'mouse-move' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event.

Emitted when the mouse moves in the tray icon.

### 实例方法

The `Tray` class has the following methods:

#### `tray.destroy()`

立即销毁该任务栏图标

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

设置`image`作为托盘中显示的图标

#### `tray.setPressedImage(image)` *macOS*

* `image` [NativeImage](native-image.md)

Sets the `image` associated with this tray icon when pressed on macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Sets the hover text for this tray icon.

#### `tray.setTitle(title)` *macOS*

* `title` String

Sets the title displayed aside of the tray icon in the status bar (Support ANSI colors).

#### `tray.setHighlightMode(mode)` *macOS*

* `mode` String - Highlight mode with one of the following values: 
  * `selection` - Highlight the tray icon when it is clicked and also when its context menu is open. This is the default.
  * `always` - Always highlight the tray icon.
  * `never` - Never highlight the tray icon.

Sets when the tray's icon background becomes highlighted (in blue).

**Note:** You can use `highlightMode` with a [`BrowserWindow`](browser-window.md) by toggling between `'never'` and `'always'` modes when the window visibility changes.

```javascript
const {BrowserWindow, Tray} = require('electron')

const win = new BrowserWindow({width: 800, height: 600})
const tray = new Tray('/path/to/my/icon')

tray.on('click', () => {
  win.isVisible() ? win.hide() : win.show()
})
win.on('show', () => {
  tray.setHighlightMode('always')
})
win.on('hide', () => {
  tray.setHighlightMode('never')
})
```

#### `tray.displayBalloon(options)` *Windows*

* `选项` Object 
  * `icon` ([NativeImage](native-image.md) | String) (可选) -
  * `title` String
  * `content` String

Displays a tray balloon.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (optional)
* `position` [Point](structures/point.md) (optional) - The pop up position.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

The `position` is only available on Windows, and it is (0, 0) by default.

#### `tray.setContextMenu(menu)`

* `menu` Menu

Sets the context menu for this icon.

#### `tray.getBounds()` *macOS* *Windows*

返回 [`Rectangle`](structures/rectangle.md)

The `bounds` of this tray icon as `Object`.

#### `tray.isDestroyed()`

返回 `Boolean` -判断托盘图标是否被销毁