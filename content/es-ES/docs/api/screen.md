# screen

> Recuperar información acerca del tamaño de la pantalla, posiciones del cursor, posiciones, etc.

Proceso: [Principal](../glossary.md#main-process), [Renderizado](../glossary.md#renderer-process)

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

* `evento` Evento
* `newDisplay` [Display](structures/display.md)

Emitido cuando `newDisplay` ha sido añadido.

### Evento: 'display-removed'

Devuelve:

* `evento` Evento
* `oldDisplay` [Display](structures/display.md)

Emitido cuando `oldDisplay` ha sido eliminado.

### Evento: 'display-metrics-changed'

Devuelve:

* `evento` Evento
* `display` [Display](structures/display.md)
* `changedMetrics` Cadena[]

Emitido cuando o más métricos cambian en un `display`. El `changedMetrics` es un arreglo de cadenas que describen los cambios. Possible changes are `bounds`, `workArea`, `scaleFactor` and `rotation`.

## Métodos

The `screen` module has the following methods:

### `screen.getCursorScreenPoint()`

Returns [`Point`](structures/point.md)

The current absolute position of the mouse pointer.

### `screen.getMenuBarHeight()` *macOS*

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

Returns [`Display`](structures/display.md) - The display that most closely intersects the provided bounds.