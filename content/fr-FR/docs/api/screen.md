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

Retourne :

* `event` Event
* `display` [Display](structures/display.md)
* `changedMetrics` String[]

Émis lorsqu’un ou plusieurs métrics changent dans un `display`. `changedMetrics` est un tableau de chaîne de caractères décrivant les modifications. Les modifications possibles sont `bounds`, `workArea`, `scaleFactor` et `rotation`.

## Méthodes

Le module `screen` dispose des méthodes suivantes :

### `screen.getCursorScreenPoint()`

Retourne [`Point`](structures/point.md)

La position absolue du pointeur de la souris.

### `screen.getPrimaryDisplay()`

Retourne [`Display`](structures/display.md) - L'écran principal.

### `screen.getAllDisplays()`

Retourne [`Display[]`](structures/display.md) - Un tableau d'écrans qui sont actuellement disponibles.

### `screen.getDisplayNearestPoint(point)`

* `point` [Point](structures/point.md)

Retourne [`Display`](structures/display.md) - L'écran le plus proche du point spécifié.

### `screen.getDisplayMatching(rect)`

* `rect` [Rectangle](structures/rectangle.md)

Retourne [`Display`](structures/display.md) - L'écran qui croise le plus les limites d'intersection données.

### `screen.screenToDipPoint(point)` *Windows*

* `point` [Point](structures/point.md)

Retourne [`Point`](structures/point.md)

Converts a screen physical point to a screen DIP point. The DPI scale is performed relative to the display containing the physical point.

### `screen.dipToScreenPoint(point)` *Windows*

* `point` [Point](structures/point.md)

Retourne [`Point`](structures/point.md)

Converts a screen DIP point to a screen physical point. The DPI scale is performed relative to the display containing the DIP point.

### `screen.screenToDipRect(window, rect)` *Windows*

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

Retourne [`Rectangle`](structures/rectangle.md)

Converts a screen physical rect to a screen DIP rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.

### `screen.dipToScreenRect(window, rect)` *Windows*

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

Retourne [`Rectangle`](structures/rectangle.md)

Converts a screen DIP rect to a screen physical rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.