# screen

> Récupère les informations sur la taille, l'écran, la position du curseur, etc.

Processus : [Main](../glossary.md#main-process)

Ce module ne peut pas être utilisé tant que l'événement `prêt` du module `app` n'est pas émis.

`screen` est un [EventEmitter][event-emitter].

**Note:** Dans le renderer / DevTools, `window.screen` est une propriété réservée DOM , de sorte que l’écriture `let { screen } = require('electron')` ne fonctionnera pas.

Un exemple de création d'une fenêtre qui prendra tout l'écran :

```javascript fiddle='docs/fiddles/screen/fit-screen'
const { app, BrowserWindow, screen } = require ('electron')

let win
app.whenReady().then()=> {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({ width, height })
  win.loadURL ('https://github.com')
})
```

Un autre exemple de création d'une fenêtre dans l'écran externe :

```javascript
const { app, BrowserWindow, screen } = require ('electron')

let win

app.whenReady().then()( => {
  const displays = screen.getAllDisplays()
  const externalDisplay = displays.find((display) => {  {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  if (externalDisplay) {
    win = new BrowserWindow({
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50
    })
    win.loadURL ('https://github.com')
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

### `screen.screenToDipPoint(point)` _Windows_

* `point` [Point](structures/point.md)

Retourne [`Point`](structures/point.md)

Convertit un point physique de l’écran en un point DIP d’écran. L’échelle DPI est effectuée par rapport à l’affichage contenant le point physique.

### `screen.dipToScreenPoint(point)` _Windows_

* `point` [Point](structures/point.md)

Retourne [`Point`](structures/point.md)

Convertit un point DIP d’écran en un point physique de l’écran. L’échelle DPI est effectuée par rapport à l’affichage contenant le point DIP.

### `screen.screenToDipRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | Null
* `rect` [Rectangle](structures/rectangle.md)

Retourne [`Rectangle`](structures/rectangle.md)

Convertit un rect physique d’écran en un rect dip d’écran. L’échelle DPI est effectuée par rapport à l’affichage le plus proche `window`. Si `window` null, la mise à l’échelle sera effectuée à l’affichage le plus proche `rect`.

### `screen.dipToScreenRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | Null
* `rect` [Rectangle](structures/rectangle.md)

Retourne [`Rectangle`](structures/rectangle.md)

Convertit un écran DIP rect en rect physique d’écran. L’échelle DPI est effectuée par rapport à l’affichage le plus proche `window`. Si `window` null, la mise à l’échelle sera effectuée à l’affichage le plus proche `rect`.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
