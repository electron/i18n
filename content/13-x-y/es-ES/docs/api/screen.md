# screen

> Recuperar información acerca del tamaño de la pantalla, posiciones del cursor, posiciones, etc.

Proceso: [Main](../glossary.md#main-process)

Este módulo no puede ser usado hasta que el evento `ready` del módulo `app` es emitido.

`screen` es un [EventEmitter][event-emitter].

**Nota:** En el renderer / DevTools, `window.screen` propiedad reservada DOM, así que escribir `let { screen } = require('electron')` no funcionará.

Un ejemplo de crear una ventana que llene toda la pantalla:

```javascript fiddle='docs/fiddles/screen/fit-screen'
const { app, BrowserWindow, screen } = require('electron')

let win
app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({ width, height })
  win.loadURL('https://github.com')
})
```

Otro ejemplo de crear una ventana el display externo es:

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

**Nota:** El valor devuelto es un punto DIP, no una punto físico de la pantalla.

### `screen.getPrimaryDisplay()`

Devuelve [`Display`](structures/display.md) - La muestra primaria.

### `screen.getAllDisplays()`

Devuelve [`Display[]`](structures/display.md) - Un arreglo de muestras que son actualmente disponibles.

### `screen.getDisplayNearestPoint(point)`

* `point` [Point](structures/point.md)

Devuelve [`Display`](structures/display.md) - La muestra más cerca del punto especificado.

### `screen.getDisplayMatching(rect)`

* `rect` [Rectangle](structures/rectangle.md)

Devuelve [`Display`](structures/display.md) - La muestra que es más cercana intersecta a las bandas dadas.

### `screen.screenToDipPoint(point)` _Windows_

* `point` [Point](structures/point.md)

Devuelve [`Point`](structures/point.md)

Convierte un punto físico en la pantalla a un punto DIP de la pantalla. La escala DPI se realiza en relación a la pantalla que contiene el punto físico.

### `screen.dipToScreenPoint(point)` _Windows_

* `point` [Point](structures/point.md)

Devuelve [`Point`](structures/point.md)

Convierte un punto DIP de pantalla a un punto físico de la pantalla. La escala DPI se realiza en relación a la pantalla que contiene el punto DIP.

### `screen.screenToDipRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

Devuelve [`Rectangle`](structures/rectangle.md)

Convierte una rect física de pantalla a una rect DIP de pantalla. La escala DPI se realiza en relación a la pantalla más cercana a `window`. Si `window` es nulo, el escalamiento se realizará a la pantalla mas cercana a `rect`.

### `screen.dipToScreenRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

Devuelve [`Rectangle`](structures/rectangle.md)

Convierte una pantalla DIP rect a una rect física de pantalla. La escala DPI se realiza en relación a la pantalla más cercana a `window`. Si `window` es nulo, el escalamiento se realizará a la pantalla mas cercana a `rect`.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
