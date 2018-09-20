# screen

> 检索有关屏幕大小、显示器、光标位置等的信息。

参见： [process](../glossary.md#main-process), [renderer](../glossary.md#renderer-process) process

在 ` app ` 模块发出 ` ready ` 事件之前, 您不能引用或者使用此模块。

`screen` 是一个 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

** 注意: **在 renderer/DevTools 中, `window.screen ` 是一个保留的 DOM 属性, 因此编写 ` let {screen} = require('electron') ` 将不起作用。

创建填充整个屏幕的窗口的示例:

```javascript
const electron = require('electron')
const {app, BrowserWindow} = electron

let win

app.on('ready', () => {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({width, height})
  win.loadURL('https://github.com')
})
```

另一个在外部显示器中创建窗口的例子

```javascript
const electron = require('electron')
const {app, BrowserWindow} = require('electron')

let win

app.on('ready', () => {
  let displays = electron.screen.getAllDisplays()
  let externalDisplay = displays.find((display) => {
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

### `screen.getPrimaryDisplay()`

Returns [`Display`](structures/display.md) - The primary display.

### `screen.getAllDisplays()`

Returns [`Display[]`](structures/display.md) - An array of displays that are currently available.

### `screen.getDisplayNearestPoint(point)`

* `point` [Point](structures/point.md)

Returns [`Display`](structures/display.md) - The display nearest the specified point.

### `screen.getDisplayMatching(rect)`

* `rect` [Rectangle](structures/rectangle.md)

Returns [`Display`](structures/display.md) - The display that most closely intersects the provided bounds.

### `screen.screenToDipPoint(point)` *Windows*

* `point` [Point](structures/point.md)

返回 [`Point`](structures/point.md)

Converts a screen physical point to a screen DIP point. The DPI scale is performed relative to the display containing the physical point.

### `screen.dipToScreenPoint(point)` *Windows*

* `point` [Point](structures/point.md)

返回 [`Point`](structures/point.md)

Converts a screen DIP point to a screen physical point. The DPI scale is performed relative to the display containing the DIP point.

### `screen.screenToDipRect(window, rect)` *Windows*

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

返回 [`Rectangle`](structures/rectangle.md)

Converts a screen physical rect to a screen DIP rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.

### `screen.dipToScreenRect(window, rect)` *Windows*

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

返回 [`Rectangle`](structures/rectangle.md)

Converts a screen DIP rect to a screen physical rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.