# screen

> Retrieve information about screen size, displays, cursor position, etc.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

You cannot require or use this module until the `ready` event of the `app`
module is emitted.

`screen` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

**Note:** In the renderer / DevTools, `window.screen` is a reserved DOM
property, so writing `let {screen} = require('electron')` will not work.

An example of creating a window that fills the whole screen:

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

Another example of creating a window in the external display:

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

## Events

The `screen` module emits the following events:

### Event: 'display-added'

Returns:

* `event` Event
* `newDisplay` [Display](structures/display.md)

Emitted when `newDisplay` has been added.

### Event: 'display-removed'

Returns:

* `event` Event
* `oldDisplay` [Display](structures/display.md)

Emitted when `oldDisplay` has been removed.

### Event: 'display-metrics-changed'

Returns:

* `event` Event
* `display` [Display](structures/display.md)
* `changedMetrics` String[]

Emitted when one or more metrics change in a `display`. The `changedMetrics` is
an array of strings that describe the changes. Possible changes are `bounds`,
`workArea`, `scaleFactor` and `rotation`.

## Methods

The `screen` module has the following methods:

### `screen.getCursorScreenPoint()`

Returns [`Point`](structures/point.md)

The current absolute position of the mouse pointer.

### `screen.getMenuBarHeight()` _macOS_

Returns `Integer` - The height of the menu bar in pixels.

### `screen.getPrimaryDisplay()`

Returns [`Display`](structures/display.md) - The primary display.

### `screen.getAllDisplays()`

Returns [`Display[]`](structures/display.md) - An array of displays that are currently available.

### `screen.getDisplayNearestPoint(point)`

* `point` [Point](structures/point.md)

Returns [`Display`](structures/display.md) - The display nearest the specified point.

### `screen.getDisplayMatching(rect)`

* `rect` [Rectangle](structures/rectangle.md)

Returns [`Display`](structures/display.md) - The display that most closely
intersects the provided bounds.
