# screen

> Recuperar información acerca del tamaño de la pantalla, posiciones del cursor, posiciones, etc.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

No se puede solicitar o usar este módulo hasta que el evento `ready` del módulo `app` sea emitido.

In the renderer process context it depends on the [`remote`](remote.md) module, it is therefore not available when this module is disabled.

`screen` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

**Note:** In the renderer / DevTools, `window.screen` is a reserved DOM property, so writing `let { screen } = require('electron')` will not work.

An example of creating a window that fills the whole screen:

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.on('ready', () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({ width, height })
  win.loadURL('https://github.com')
})
```

Another example of creating a window in the external display:

```javascript
const electron = require('electron')
const { app, BrowserWindow } = require('electron')

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

## Eventos

The `screen` module emits the following events:

### Evento: 'display-added'

Devuelve:

* `event`
* `newDisplay` [Display](structures/display.md)

Emitted when `newDisplay` has been added.

### Evento: 'display-removed'

Devuelve:

* `event` Event
* `oldDisplay` [Display](structures/display.md)

Emitted when `oldDisplay` has been removed.

### Evento: 'display-metrics-changed'

Devuelve:

* `event` Event
* `display` [Display](structures/display.md)
* `changedMetrics` Cadena[]

Emitted when one or more metrics change in a `display`. The `changedMetrics` is an array of strings that describe the changes. Possible changes are `bounds`, `workArea`, `scaleFactor` and `rotation`.

## Métodos

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

Devuelve [`Rectangle`](structures/rectangle.md)

Converts a screen physical rect to a screen DIP rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.

### `screen.dipToScreenRect(window, rect)` *Windows*

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

Devuelve [`Rectangle`](structures/rectangle.md)

Converts a screen DIP rect to a screen physical rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.