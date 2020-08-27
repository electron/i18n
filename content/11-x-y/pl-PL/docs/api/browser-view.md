## Klasa: BrowserView

> Create and control views.

Proces: [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). It is like a child window, except that it is positioned relative to its owning window. It is meant to be an alternative to the `webview` tag.

### Przykład

```javascript
// W procesie głównym.
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _Eksperymentalne_

* `options` Object (optional)
  * `webPreferences` Object (optional) - See [BrowserWindow](browser-window.md).

### Właściwości instancji

Obiekt utworzony za pomocą `new BrowserView` posiada następujące właściwości:

#### `view.webContents` _Eksperymentalny_

A [`WebContents`](web-contents.md) object owned by this view.

### Metody instancji

Objects created with `new BrowserView` have the following instance methods:

#### `view.setAutoResize(options)` _Eksperymentalne_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` domyślnie.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` domyślnie.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` domyślnie.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` domyślnie.

#### `view.setBounds(bounds)` _Eksperymentalne_

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.getBounds()` _Eksperymentalne_

Zwraca [`Rectangle`](structures/rectangle.md)

The `bounds` of this BrowserView instance as `Object`.

#### `view.setBackgroundColor(color)` _Eksperymentalne_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
