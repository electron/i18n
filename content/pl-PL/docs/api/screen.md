# screen

> Zwraca informację o wielkości ekranu, wyświetlaczach, pozycji kursora itd.

Proces: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Nie możesz użyć tego modułu, dopóki zdarzenie `ready` z modułu `app` nie zostanie wyemitowane.

`screen` jest klasą [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

**Uwaga:** W module renderowania / DevTools, `window.screen` jest zarezerwowaną właściwością DOM, więc napisanie `let{screen} = require('electron')` nie będzie działać.

Przykład tworzenia okna, które wypełnia cały ekran:

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

Inny przykład utworzenia okna na ekranie zewnętrznym:

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

## Zdarzenia

Moduł `screen` emituje następujące zdarzenia:

### Zdarzenie: 'display-added'

Zwraca:

* `event` Event
* `newDisplay` [Display](structures/display.md)

Emitowane, gdy `newDisplay` został dodany.

### Zdarzenie: 'display-removed'

Zwraca:

* `event` Event
* `oldDisplay` [Display](structures/display.md)

Emitowane, gdy `oldDisplay` został usunięty.

### Zdarzenie: 'display-metrics-changed'

Zwraca:

* `event` Event
* `display` [Display](structures/display.md)
* `changedMetrics` String[]

Emitted when one or more metrics change in a `display`. The `changedMetrics` is an array of strings that describe the changes. Possible changes are `bounds`, `workArea`, `scaleFactor` and `rotation`.

## Metody

Moduł `screen` posiada następujące metody:

### `screen.getCursorScreenPoint()`

Zwraca [`Point`](structures/point.md)

Bieżącą pozycję bezwzględną wskaźnika myszy.

### `screen.getMenuBarHeight()` *macOS*

Zwraca `Integer` - wysokość paska menu w pikselach.

### `screen.getPrimaryDisplay()`

Zwraca [`Display`](structures/display.md) - ekran główny.

### `screen.getAllDisplays()`

Zwraca [`Display[]`](structures/display.md) - tablicę obiektów Display, które są obecnie dostępne.

### `screen.getDisplayNearestPoint(point)`

* `point` [Point](structures/point.md)

Returns [`Display`](structures/display.md) - The display nearest the specified point.

### `screen.getDisplayMatching(rect)`

* `rect` [Rectangle](structures/rectangle.md)

Returns [`Display`](structures/display.md) - The display that most closely intersects the provided bounds.