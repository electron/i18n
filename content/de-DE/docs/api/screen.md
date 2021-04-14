# screen

> Abrufen von Informationen über Bildschirmgröße, Anzeigen, Cursorposition usw.

Prozess: [Main](../glossary.md#main-process)

Dieses Modul kann erst verwendet werden, wenn das `ready` Ereignis des `app` Moduls ausgesendet wird.

`screen` ist ein [EventEmitter][event-emitter].

**Hinweis:** Im Renderer / DevTools ist `window.screen` eine reservierte DOM- -Eigenschaft, so dass das Schreiben `let { screen } = require('electron')` nicht funktioniert.

Ein Beispiel für das Erstellen eines Fensters, das den gesamten Bildschirm ausfüllt:

```javascript fiddle='docs/fiddles/screen/fit-screen'
const { app, BrowserWindow, screen } = require('electron')


app.whenReady().then()=>
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({ width, height })
  win.loadURL('https://github.com')
))
```

Ein weiteres Beispiel für das Erstellen eines Fensters in der externen Anzeige:

```javascript
const { app, BrowserWindow, screen } = require('electron')



app.whenReady().then() => -
  const Displays = screen.getAllDisplays()
  const externalDisplay = displays.find(display)=>
    geben display.bounds.x !== 0 || display.bounds.y !== 0
  .)

  if (externalDisplay
      
    )
      y: externalDisplay.bounds.y + 50
    )
    win.loadURL('https://github.com')
  '
')
```

## Ereignisse

Das `screen` -Modul gibt die folgenden Ereignisse aus:

### Event: 'display-added'

Rückgabewert:

* `event` Event
* `newDisplay` [Anzeige](structures/display.md)

Emittiert, wenn `newDisplay` hinzugefügt wurde.

### Event: 'display-removed'

Rückgabewert:

* `event` Event
* `oldDisplay` [Display](structures/display.md)

Emittiert, wenn `oldDisplay` entfernt wurde.

### Event: 'display-metrics-changed'

Rückgabewert:

* `event` Event
* `display` [Display](structures/display.md)
* `changedMetrics` String[]

Emittiert, wenn sich eine oder mehrere Metriken in einem `display`ändern. Die `changedMetrics` ist ein Array von Zeichenfolgen, die die Änderungen beschreiben. Mögliche Änderungen sind `bounds`, `workArea`, `scaleFactor` und `rotation`.

## Methoden

Das `screen` Modul verfügt über die folgenden Methoden:

### `screen.getCursorScreenPoint()`

Returns [`Point`](structures/point.md)

Die aktuelle absolute Position des Mauszeigers.

### `screen.getPrimaryDisplay()`

Gibt [`Display`](structures/display.md) zurück - Die primäre Anzeige.

### `screen.getAllDisplays()`

Gibt [`Display[]`](structures/display.md) zurück - Ein Array von Displays, die derzeit verfügbar sind.

### `screen.getDisplayNearestPoint(point)`

* `point` [Point](structures/point.md)

Gibt [`Display`](structures/display.md) zurück - Die Anzeige, die dem angegebenen Punkt am nächsten liegt.

### `screen.getDisplayMatching(rect)`

* `rect` [Rectangle](structures/rectangle.md)

Gibt [`Display`](structures/display.md) zurück - Die Anzeige, die am engsten die bereitgestellten Grenzen schneidet.

### `screen.screenToDipPoint(point)` _Windows_

* `point` [Point](structures/point.md)

Returns [`Point`](structures/point.md)

Konvertiert einen physischen Bildschirmpunkt in einen Bildschirm-DIP-Punkt. Die DPI-Skala wird relativ zur Anzeige ausgeführt, die den physischen Punkt enthält.

### `screen.dipToScreenPoint(point)` _Windows_

* `point` [Point](structures/point.md)

Returns [`Point`](structures/point.md)

Konvertiert einen Bildschirm-DIP-Punkt in einen physischen Bildschirmpunkt. Die DPI-Skala wird relativ zur Anzeige ausgeführt, die den DIP-Punkt enthält.

### `screen.screenToDipRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

Returns [`Rectangle`](structures/rectangle.md)

Konvertiert eine physische Korrektur des Bildschirms in eine Bildschirm-DIP-Korrektur. Die DPI-Skala wird relativ zur Anzeige ausgeführt, die `window`am nächsten liegt. Wenn `window` null ist, wird die Skalierung auf die Anzeige durchgeführt, die `rect`am nächsten liegt.

### `screen.dipToScreenRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

Returns [`Rectangle`](structures/rectangle.md)

Konvertiert einen Bildschirm DIP-Korrektur in einen Bildschirm physischen Korrektur. Die DPI-Skala wird relativ zur Anzeige ausgeführt, die `window`am nächsten liegt. Wenn `window` null ist, wird die Skalierung auf die Anzeige durchgeführt, die `rect`am nächsten liegt.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
