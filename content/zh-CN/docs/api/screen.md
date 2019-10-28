# screen

> 检索有关屏幕大小、显示器、光标位置等的信息。

进程：[主进程](../glossary.md#main-process)

This module cannot be used until the `ready` event of the `app` module is emitted.

`screen` 是一个 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

** 注意: **在 renderer/DevTools 中, `window.screen ` 是一个保留的 DOM 属性, 因此编写 ` let { screen } = require('electron') ` 将不起作用。

创建填充整个屏幕的窗口的示例:

```javascript fiddle='docs/fiddles/screen/fit-screen' const { app, BrowserWindow, screen } = require('electron')

let win app.on('ready', () => { const { width, height } = screen.getPrimaryDisplay().workAreaSize win = new BrowserWindow({ width, height }) win.loadURL('https://github.com') })

    <br />Another example of creating a window in the external display:
    
    ```javascript
    const { app, BrowserWindow, screen } = require('electron')
    
    let win
    
    app.on('ready', () => {
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
    

## 事件

The `screen` module emits the following events:

### Event: 'display-added'

返回:

* `event` Event
* `newDisplay` [Display](structures/display.md)

Emitted when `newDisplay` has been added.

### Event: 'display-removed'

返回:

* `event` Event
* `oldDisplay` [Display](structures/display.md)

Emitted when `oldDisplay` has been removed.

### Event: 'display-metrics-changed'

返回:

* `event` Event
* `display` [Display](structures/display.md)
* `changedMetrics` String[]

Emitted when one or more metrics change in a `display`. The `changedMetrics` is an array of strings that describe the changes. Possible changes are `bounds`, `workArea`, `scaleFactor` and `rotation`.

## 方法

The `screen` module has the following methods:

### `screen.getCursorScreenPoint()`

Returns [`Point`](structures/point.md)

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

### `screen.screenToDipPoint(point)` *Windows*

* `point` [Point](structures/point.md)

Returns [`Point`](structures/point.md)

Converts a screen physical point to a screen DIP point. The DPI scale is performed relative to the display containing the physical point.

### `screen.dipToScreenPoint(point)` *Windows*

* `point` [Point](structures/point.md)

Returns [`Point`](structures/point.md)

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