# screen

> Zwraca informację o wielkości ekranu, wyświetlaczach, pozycji kursora itd.

Proces: [Main](../glossary.md#main-process)

This module cannot be used until the `ready` event of the `app` module is emitted.

`screen` jest klasą [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

**Uwaga:** W module renderowania / DevTools, `window.screen` jest zarezerwowaną właściwością DOM, więc napisanie `let{ screen } = require('electron')` nie będzie działać.

Przykład tworzenia okna, które wypełnia cały ekran:

```javascript fiddle='docs/fiddles/screen/fit-screen'
const { app, BrowserWindow, screen } = require('electron')

let win
app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({ width, height })
  win.loadURL('https://github.com')
})
```

Inny przykład utworzenia okna na ekranie zewnętrznym:

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

### `screen.screenToDipPoint(point)` _Windows_

* `point` [Point](structures/point.md)

Zwraca [`Point`](structures/point.md)

Converts a screen physical point to a screen DIP point. The DPI scale is performed relative to the display containing the physical point.

### `screen.dipToScreenPoint(point)` _Windows_

* `point` [Point](structures/point.md)

Zwraca [`Point`](structures/point.md)

Converts a screen DIP point to a screen physical point. The DPI scale is performed relative to the display containing the DIP point.

### `screen.screenToDipRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

Zwraca [`Rectangle`](structures/rectangle.md)

Converts a screen physical rect to a screen DIP rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.

### `screen.dipToScreenRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

Zwraca [`Rectangle`](structures/rectangle.md)

Converts a screen DIP rect to a screen physical rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.
