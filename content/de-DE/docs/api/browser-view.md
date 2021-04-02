## Klasse: BrowserView

> Erstelle und kontrolliere Ansichten.

Prozess: [Main](../glossary.md#main-process)

Ein `BrowserView` kann verwendet werden, um zusätzliche Webinhalte in eine [`BrowserWindow`](browser-window.md)einzubetten. Es ist wie ein untergeordnetes Fenster, mit der Ausnahme, dass es relativ zu seinem eigenen Fenster positioniert ist. Es soll eine Alternative zum `webview` -Tag sein.

### Beispiel

```javascript
// Im Hauptprozess.
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds(' x: 0, y: 0, width: 300, height: 300 ')
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _Experimental_

* `options` Objekt (optional)
  * `webPreferences` Object (optional) - Siehe [BrowserWindow](browser-window.md).

### Instanz Eigenschaften

Objekte, die mit `new BrowserView` erstellt wurden, haben folgende Eigenschaften:

#### `view.webContents` _Experimental_

A [`WebContents`](web-contents.md) object owned by this view.

### Instanz Methoden

Objekte, die mit `new BrowserView` erstellt wurden, haben folgende Instanzmethoden:

#### `view.setAutoResize(options)` _Experimentell_

* `options` -Objekt
  * `width` Boolean (optional) - Wenn `true`, wächst und schrumpft die Breite der Ansicht zusammen mit dem Fenster zusammen. `false` standardmäßig.
  * `height` Boolean (optional) - Wenn `true`, wird die Höhe der Ansicht zusammen mit dem Fenster wachsen und verkleinern. `false` standardmäßig.
  * `horizontal` Boolean (optional) - Wenn `true`, wird die x-Position und -Breite der Ansicht und proportional mit dem Fenster verkleinert. `false` standardmäßig.
  * `vertical` boolesch (optional) - Wenn `true`, wird die y-Position und -Höhe der Ansicht und proportional mit dem Fenster verkleinert. `false` standardmäßig.

#### `view.setBounds(bounds)` _Experimentell_

* `bounds` [Rectangle](structures/rectangle.md) Boundings des Displays

Ändert die Größe und verschiebt die Ansicht auf die angegebenen Grenzen relativ zum Fenster.

#### `view.getBounds()` _Experimental_

Returns [`Rectangle`](structures/rectangle.md)

Die `bounds` dieser BrowserView-Instanz als `Object`.

#### `view.setBackgroundColor(color)` _Experimentell_

* `color` String - Farbe in `#aarrggbb` oder `#argb` Form. Der Alphakanal ist optional.
