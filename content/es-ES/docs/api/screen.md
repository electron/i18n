# screen

> Recuperar información acerca del tamaño de la pantalla, posiciones del cursor, posiciones, etc.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

No puedes requerir o usar este módulo hasta que el evento `ready` de el módulo `app` sea emitido.

`screen` es un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

**Nota:** En el renderizador / DevTools, `window.screen` es una propiedad de DOM reservado, así que escribir `let {screen} = require('electron')` no funcionará.

Un ejemplo de crear una ventana que llene toda la pantalla:

```javascript
const electron = require('electron')
const {app, BrowserWindow} = electron

dejar ganar

app.on('ready', () => {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({width, height})
  win.loadURL('https://github.com')
})
```

Otro ejemplo de crear una ventana el display externo es:

```javascript
onst electron = require('electron')
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

## Eventos

El módulo `screen` emite los siguientes eventos:

### Evento: 'display-added'

Devuelve:

* `event` Event
* `newDisplay` [Display](structures/display.md)

Emitido cuando `newDisplay` ha sido añadido.

### Evento: 'display-removed'

Devuelve:

* `event` Event
* `oldDisplay` [Display](structures/display.md)

Emitido cuando `oldDisplay` ha sido eliminado.

### Evento: 'display-metrics-changed'

Devuelve:

* `event` Event
* `display` [Display](structures/display.md)
* `changedMetrics` Cadena[]

Emitido cuando o más métricos cambian en un `display`. El `changedMetrics` es un arreglo de cadenas que describen los cambios. Posibles cambios son `bounds`, `workArea`, `scaleFactor` y `rotation`.

## Métodos

El módulo `screen` tiene los siguientes métodos:

### `screen.getCursorScreenPoint()`

Devuelve [`Point`](structures/point.md)

La actual y absoluta posición del cursor del mouse.

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

Devuelve [`Point`](structures/point.md)

Converts a screen physical point to a screen DIP point. The DPI scale is performed relative to the display containing the physical point.

### `screen.dipToScreenPoint(point)` *Windows*

* `point` [Point](structures/point.md)

Devuelve [`Point`](structures/point.md)

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