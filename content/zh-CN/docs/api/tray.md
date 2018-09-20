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
* `bounds` [Rectangle](structures/rectangle.md) - 系统托盘图标的边界。
* `position` [Point](structures/point.md) - 事件的位置信息。

当该图标被点击时触发。

#### Event: 'right-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - 系统托盘图标的边界。

当该图标被右击时触发。

#### Event: 'double-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
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

* `event` Event
* `files` String[] - 拖至任务栏图标上的文件的路径。

当有任何文件被拖到该任务栏图标上时，触发该事件。

#### Event: 'drop-text' *macOS*

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

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - 事件的位置信息。

当鼠标进入该任务栏图标时，触发该事件。

#### Event: 'mouse-leave' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - 事件的位置信息。

当鼠标离开该任务栏图标时，触发该事件。

#### Event: 'mouse-move' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
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

设置显示在状态栏中托盘图标旁边的标题 (支持ANSI色彩)

#### `tray.setHighlightMode(mode)` *macOS*

* `mode` String - 高亮模式选项，以下为可选值 
  * `selection` - 当托盘图标本点击或托盘的上下文菜单打开时高亮显示托盘图标，这是mode的默认值
  * `always` - 总是高亮托盘图标
  * `never` - 从不高亮托盘图标

设置托盘图标背景 (蓝色) 高亮的时机

**Note:** 当窗口可见状态变化时你可以在[`BrowserWindow`](browser-window.md)中使用 `highlightMode` 实现 `'never'` 和`'always'` 模式的切换

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

#### `tray.setIgnoreDoubleClickEvents(ignore)` *macOS*

* `ignore` Boolean

Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon.

This value is set to false by default.

#### `tray.getIgnoreDoubleClickEvents()` *macOS*

Returns `Boolean` - Whether double click events will be ignored.

#### `tray.displayBalloon(options)` *Windows*

* `选项` Object - 过滤器对象，包含过滤参数 
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