# screen

> Retrieve information about screen size, displays, cursor position, etc.

Processus : [Principal](../glossary.md#main-process), [Rendu](../glossary.md#renderer-process)

Vous ne pouvez pas inclure ou utiliser ce module avant que l'événement `ready` du module `app` soit émis.

`screen` est un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

**Note:** In the renderer / DevTools, `window.screen` is a reserved DOM property, so writing `let {screen} = require('electron')` will not work.

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

## Événements

Le module `screen` émet les événements suivants :

### Événement : 'display-added'

Retourne :

* `event` Événement
* `newDisplay` [Display](structures/display.md)

Émis lorsque `newDisplay` a été ajouté.

### Événement : 'display-removed'

Retourne :

* `event` Événement
* `oldDisplay` [Display](structures/display.md)

Émis lorsque `oldDisplay` a été retiré.

### Événement 'display-metrics-changed'

Retourne :

* `event` Événement
* `display` [Display](structures/display.md)
* `changedMetrics` Chaîne de caractères[]

Émis lorsqu’un ou plusieurs métrics changent dans un `display`. The `changedMetrics` is an array of strings that describe the changes. Possible changes are `bounds`, `workArea`, `scaleFactor` and `rotation`.

## Méthodes

Le module `screen` dispose des méthodes suivantes :

### `screen.getCursorScreenPoint()`

Retourne [`Point`](structures/point.md)

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