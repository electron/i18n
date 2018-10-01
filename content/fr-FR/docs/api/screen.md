# screen

> Récupère les informations sur la taille, l'écran, la position du curseur, etc.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Vous ne pouvez pas inclure ou utiliser ce module avant que l'événement `ready` du module `app` soit émis.

`screen` est un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

**Remarque :** Dans le renderer / DevTools, `window.screen` est une propriété réservée au DOM, alors écrire `let {screen} = require('electron')` ne fonctionnera pas.

Un exemple de création d'une fenêtre qui prendra tout l'écran :

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

Un autre exemple de création d'une fenêtre dans l'écran externe :

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

Renvoie :

* `event` Événement
* `oldDisplay` [Display](structures/display.md)

Émis lorsque `oldDisplay` a été retiré.

### Événement 'display-metrics-changed'

Renvoie :

* `event` Événement
* `display` [Display](structures/display.md)
* `changedMetrics` String[]

Émis lorsqu’un ou plusieurs métrics changent dans un `display`. `changedMetrics` est un tableau de chaîne de caractères décrivant les modifications. Les modifications possibles sont `bounds`, `workArea`, `scaleFactor` et `rotation`.

## Méthodes

Le module `screen` dispose des méthodes suivantes :

### `screen.getCursorScreenPoint()`

Retourne [`Point`](structures/point.md)

La position absolue du pointeur de la souris.

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