# screen

> 取得螢幕大小、顯示器、游標位置等的資訊。

處理序: [主處理序](../glossary.md#main-process)

This module cannot be used until the `ready` event of the `app` module is emitted.

`screen` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

**Note:** In the renderer / DevTools, `window.screen` is a reserved DOM property, so writing `let { screen } = require('electron')` will not work.

An example of creating a window that fills the whole screen:

```javascript fiddle='docs/fiddles/screen/fit-screen'
const { app, BrowserWindow, screen } = require('electron')

let win
app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({ width, height })
  win.loadURL('https://github.com')
})
```

Another example of creating a window in the external display:

```javascript
const { app, BrowserWindow, screen } = require('electron')

let win

app.whenReady().then(() => {
  let displays = screen.getAllDisplays()
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

The `screen` module emits the following events:

### 事件: 'display-added'

回傳:

* `event` Event
* `newDisplay` [Display](structures/display.md)

Emitted when `newDisplay` has been added.

### 事件: 'display-removed'

回傳:

* `event` Event
* `oldDisplay` [Display](structures/display.md)

Emitted when `oldDisplay` has been removed.

### 事件: 'display-metrics-changed'

回傳:

* `event` Event
* `display` [Display](structures/display.md)
* `changedMetrics` String[]

Emitted when one or more metrics change in a `display`. The `changedMetrics` is an array of strings that describe the changes. Possible changes are `bounds`, `workArea`, `scaleFactor` and `rotation`.

## 方法

The `screen` module has the following methods:

### `screen.getCursorScreenPoint()`

回傳 [`Point`](structures/point.md)

The current absolute position of the mouse pointer.

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

### `screen.screenToDipPoint(point)` _Windows_

* `point` [Point](structures/point.md)

回傳 [`Point`](structures/point.md)

Converts a screen physical point to a screen DIP point. The DPI scale is performed relative to the display containing the physical point.

### `screen.dipToScreenPoint(point)` _Windows_

* `point` [Point](structures/point.md)

回傳 [`Point`](structures/point.md)

Converts a screen DIP point to a screen physical point. The DPI scale is performed relative to the display containing the DIP point.

### `screen.screenToDipRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

回傳 [`Rectangle`](structures/rectangle.md)

Converts a screen physical rect to a screen DIP rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.

### `screen.dipToScreenRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

回傳 [`Rectangle`](structures/rectangle.md)

Converts a screen DIP rect to a screen physical rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.
