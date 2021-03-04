# screen

> 检索有关屏幕大小、显示器、光标位置等的信息。

进程：[主进程](../glossary.md#main-process)

在 ` app ` 模块 `emitted ready ` 事件之前，您不能使用此模块。

`screen` 是一个 [EventEmitter][event-emitter].

**Note:** In the renderer / DevTools, `window.screen` is a reserved DOM property, so writing `let { screen } = require('electron')` will not work.

创建填充整个屏幕的窗口的示例:

```javascript fiddle='docs/fiddles/screen/fit-screen'
const { app, BrowserWindow, screen } = require('electron')

let win
app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({ width, height })
  win.loadURL('https://github.com')
})
```

另一个在外部显示器中创建窗口的例子

```javascript
const { app, BrowserWindow, screen } = require('electron')

let win

app.whenReady().then(() => {
  const displays = screen.getAllDisplays()
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  if (externalDisplay) {
    win = new BrowserWindow({
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50
    })
    win.loadURL('https://github.com')
  }
})
```

## 事件

`screen`模块触发以下事件:

### Event: 'display-added'

返回:

* `event` Event
* `newDisplay` [Display](structures/display.md)

当新的窗口`newDisplay`被添加的时候触发。

### Event: 'display-removed'

返回:

* `event` Event
* `oldDisplay` [Display](structures/display.md)

当旧的窗口`oldDisplay`被移除的时候触发。

### Event: 'display-metrics-changed'

返回:

* `event` Event
* `display` [Display](structures/display.md)
* `changedMetrics` String[]

当`display`中的一个或多个值发生改变时发出。 `changedMetrics`是描述更改信息的字符串数组。 可能改变的值有`bounds`, `workArea`, `scaleFactor` 和 `rotation`.

## 方法

`screen`模块有以下方法:

### `screen.getCursorScreenPoint()`

返回 [`Point`](structures/point.md)

当前鼠标的绝对位置。

**Note:** The return value is a DIP point, not a screen physical point.

### `screen.getPrimaryDisplay()`

返回主窗口[`Display`](structures/display.md)

### `screen.getAllDisplays()`

返回一个窗口数组[`Display[]`](structures/display.md)，表示当前可用的窗口。

### `screen.getDisplayNearestPoint(point)`

* `point` [Point](structures/point.md)

返回离指定点最近的一个窗口[`Display`](structures/display.md)

### `screen.getDisplayMatching(rect)`

* `rect` [Rectangle](structures/rectangle.md)

返回离指定的图形最密切相交一个窗口[`Display`](structures/display.md)

### `screen.screenToDipPoint(point)` _Windows_

* `point` [Point](structures/point.md)

返回 [`Point`](structures/point.md)

Converts a screen physical point to a screen DIP point. The DPI scale is performed relative to the display containing the physical point.

### `screen.dipToScreenPoint(point)` _Windows_

* `point` [Point](structures/point.md)

返回 [`Point`](structures/point.md)

Converts a screen DIP point to a screen physical point. The DPI scale is performed relative to the display containing the DIP point.

### `screen.screenToDipRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

返回 [`Rectangle`](structures/rectangle.md)

Converts a screen physical rect to a screen DIP rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.

### `screen.dipToScreenRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

返回 [`Rectangle`](structures/rectangle.md)

Converts a screen DIP rect to a screen physical rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
