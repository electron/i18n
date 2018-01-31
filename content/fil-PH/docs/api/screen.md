# magtabi

> Kunin ang impormasyon tungkol sa laki ng screen, display, cursor posisyon, at iba pa.

Proseso:[Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process) 

Hindi mo kailangan o gamitin ang amg modyul na ito hanggang ang event ng `ready` ng modyul ng `app` ay lumabas.

`screen` ay isang [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

**Note:** Sa tagapagtanghal / DevTools, `window.screen` ay isang ari-arian ng DOM na nakareserba, kaya nga ang pagsulat ng `let {screen} = require('elektron')` ay hindi gagana.

Isang halimbawa ng paglikha ng isang window na pupuno sa buong screen:

```javascript
const elektron = require('elektron') const {app, BrowserWindow} = elektron let win app.on('ready', () => { const {width, height} = elektron.screen.getPrimaryDisplay().workAreaSize win = new BrowserWindow({width, height}) win.loadURL('https:..github.com') })
```

Isa pang halimbawa ng paglikha ng isang window sa panlabas na display:

```javascript
const elektron = rewuire('elektron') const {app, BrowserWindow} = require('elektron') let win app.on('ready',() => { let displays = elektron.screen.getAllDisplays() let externalDisplay = displays.find((display) = > { return display.bounds.x !== 0 || display.bounds.y!== 0 }) of (externalDisplay) { win = new BrowserWindow({ x: externalDisplay.bounds.x + 50, y: externalDisplay.bounds.y + 50 }) win.loadURL('https://github.com') } })
```

## Pangyayari

Ang `screen` na modyul na naglalabas ng mga sumusunod na pangyayari:

### Pangyayari: 'display-added'

Magbabalik ng:

* `event` Event
* `newDisplay` [Display](structures/display.md)

Naglalabas kapag `newDisplay` ay idinagdag na.

### Pangyayari: 'display-removed'

Magbabalik ng:

* `event` Event
* `oldDisplay` [Display](structures/display.md)

Naglalabas kapag `oldDisplay` ay idinagdag na.

### Pangyayari: 'display-metrics-changed'

Magbabalik ng:

* `event` Event
* `display` [Display](structures/display.md)
* `changedMetrics` String[]

Naglalabas kapag ang isa o maraming panukat ay nagbago sa isang `display`. The `changedMetrics` is an array of strings that describe the changes. Possible changes are `bounds`, `workArea`, `scaleFactor` and `rotation`.

## Pamamaraan

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