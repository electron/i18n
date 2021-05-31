# BrowserView

Eine `Browseransicht` kann verwendet werden, um zusätzliche Webinhalte in ein [`BrowserWindow`](browser-window.md) einzubetten. Es ist wie ein untergeordnetes Fenster, mit der Ausnahme, dass es relativ zu dem übergeordneten Fenster positioniert ist. Es ist als Alternative zum `Webview` Tag gedacht.

## Klasse: BrowserView

> Erstelle und kontrolliere Ansichten.

Prozess: [Main](../glossary.md#main-process)

### Beispiel

```javascript
// Im Hauptprozess.
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _Experimental_

* `options` Object (optional)
  * `webPreferences` Object (optional) - Siehe [BrowserWindow](browser-window.md).

### Instanz Eigenschaften

Objekte, die mit `new BrowserView` erstellt wurden, haben folgende Eigenschaften:

#### `view.webContents` _Experimental_

A [`WebContents`](web-contents.md) object owned by this view.

### Instanz Methoden

Objekte, die mit `new BrowserView` erstellt wurden, haben folgende Instanzmethoden:

#### `view.setAutoResize(options)` _Experimentell_

* `options` Object
  * `width` Boolean (optional) - Wenn `true`, wächst und schrumpft die Breite der Ansicht zusammen mit dem übergeordneten Fenster. Automatisch `false`.
  * `height` Boolean (optional) - Wenn `true`, wächst und schrumpft die Höhe der Ansicht zusammen mit dem übergeordneten Fenster. Automatisch `false`.
  * `horizontal` Boolean (optional) - Wenn `true`, ändert sich sowohl die X-Position als auch die Breite der Ansicht zusammen mit dem übergeordneten Fenster. Automatisch `false`.
  * `vertical` Boolean (optional) - Wenn `true`, ändert sich sowohl die Y-Position als auch die Höhe der Ansicht zusammen mit dem übergeordneten Fenster. Automatisch `false`.

#### `view.setBounds(bounds)` _Experimentell_

* `bounds` [Rectangle](structures/rectangle.md) Die Grenzen der Ansicht als Rechteck

Passt die Ansicht an die Dimensionen und die Ausrichtung des Rechteckes relativ zum übergeordneten Fenster an.

#### `view.getBounds()` _Experimental_

Gibt [`Rectangle`](structures/rectangle.md) zurück

Die `bounds` dieser BrowserView-Instanz als `Object`.

#### `view.setBackgroundColor(color)` _Experimentell_

* `color` String - Farbe in `#aarrggbb` oder `#argb` Form. Der Alpha-Kanal ist optional.
