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
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
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
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.

#### `view.setBounds(bounds)` _Experimentell_

* `bounds` [Rectangle](structures/rectangle.md) Boundings des Displays

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.getBounds()` _Experimental_

Returns [`Rectangle`](structures/rectangle.md)

The `bounds` of this BrowserView instance as `Object`.

#### `view.setBackgroundColor(color)` _Experimentell_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
