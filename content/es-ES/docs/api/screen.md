# screen

> Recuperar información acerca del tamaño de la pantalla, posiciones del cursor, posiciones, etc.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

No se puede solicitar o usar este módulo hasta que el evento `ready` del módulo `app` sea emitido.

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

* `event`
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

### `screen.getMenuBarHeight()` *macOS*

Devuelve `Integer` - La altura de la barra del menú en pixeles.

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