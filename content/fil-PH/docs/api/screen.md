# magtabi

> Kunin ang impormasyon tungkol sa laki ng screen, display, cursor posisyon, at iba pa.

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Hindi mo kailangan o gamitin ang amg modyul na ito hanggang ang event ng `ready` ng modyul ng `app` ay lumabas.

In the renderer process context it depends on the [`remote`](remote.md) module, it is therefore not available when this module is disabled.

`screen` ay isang [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

**Note:** Sa tagapagtanghal / DevTools, `window.screen` ay isang ari-arian ng DOM na nakareserba, kaya nga ang pagsulat ng `let { screen } = require('elektron')` ay hindi gagana.

Isang halimbawa ng paglikha ng isang window na pupuno sa buong screen:

```javascript
const elektron = require('elektron') const { app, BrowserWindow } = elektron let win app.on('ready', () => { const { width, height } = elektron.screen.getPrimaryDisplay().workAreaSize win = new BrowserWindow({ width, height }) win.loadURL('https:..github.com') })
```

Isa pang halimbawa ng paglikha ng isang window sa panlabas na display:

```javascript
const elektron = rewuire('elektron') const { app, BrowserWindow } = require('elektron') let win app.on('ready',() => { let displays = elektron.screen.getAllDisplays() let externalDisplay = displays.find((display) = > { return display.bounds.x !== 0 || display.bounds.y!== 0 }) of (externalDisplay) { win = new BrowserWindow({ x: externalDisplay.bounds.x + 50, y: externalDisplay.bounds.y + 50 }) win.loadURL('https://github.com') } })
```

## Mga event

Ang `screen` na modyul na naglalabas ng mga sumusunod na pangyayari:

### Pangyayari: 'display-added'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `newDisplay` [Display](structures/display.md)

Naglalabas kapag `newDisplay` ay idinagdag na.

### Pangyayari: 'display-removed'

Pagbabalik ng:

* `event` na Kaganapan
* `oldDisplay` [Display](structures/display.md)

Naglalabas kapag `oldDisplay` ay idinagdag na.

### Pangyayari: 'display-metrics-changed'

Magbabalik ng:

* `event` na Pangyayari
* `display` [Display](structures/display.md)
* `changedMetrics` String[]

Naglalabas kapag ang isa o maraming panukat ay nagbago sa isang `display`. Ang `changedMetrics` ay isang array ng mga strings na naglalarawan ng mga pagbabago. Mga posiblen pagbabago sa `bounds`, `workArea`, `scaleFactor` at `rotation`.

## Mga Pamamaraan

Ang `screen` na modyul ay may mga sumusunod na mga paraan:

### `screen.getCursorScreenPoint()`

Pagbabalik [`Point`](structures/point.md)

Ang kasalukuyang ganap na posisyon ng mouse pointer.

### `screen.getPrimaryDisplay()`

Ibabalik [`Display`](structures/display.md) - Ang pangunahing display.

### `screen.getAllDisplays()`

Ibabalik sa [`Display[]`](structures/display.md) - Ang array sa display na kasalukuyang magagamit.

### `screen.getDisplayNearestPoint(point)`

* `point` [Point](structures/point.md)

Ibabalik sa [`Display`](structures/display.md) - Ang pinakamalapit na display sa isang tiyak na punto.

### `screen.getDisplayMatching(rect)`

* `rect` [Rectangle](structures/rectangle.md)

Ibabalik sa [`Display`](structures/display.md) - Ang display na pinakamalapit na bumabalandra sa ibinibigay na hangganan.

### `screen.screenToDipPoint(point)` *Windows*

* `point` [Point](structures/point.md)

Pagbabalik [`Point`](structures/point.md)

Converts a screen physical point to a screen DIP point. The DPI scale is performed relative to the display containing the physical point.

### `screen.dipToScreenPoint(point)` *Windows*

* `point` [Point](structures/point.md)

Pagbabalik [`Point`](structures/point.md)

Converts a screen DIP point to a screen physical point. The DPI scale is performed relative to the display containing the DIP point.

### `screen.screenToDipRect(window, rect)` *Windows*

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

Nagbabalik[`Rectangle`](structures/rectangle.md)

Converts a screen physical rect to a screen DIP rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.

### `screen.dipToScreenRect(window, rect)` *Windows*

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

Nagbabalik[`Rectangle`](structures/rectangle.md)

Converts a screen DIP rect to a screen physical rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.