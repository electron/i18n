## Klasa: BrowserView

> Create and control views.

Proces: [Main](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). It is like a child window, except that it is positioned relative to its owning window. It is meant to be an alternative to the `webview` tag.

### Przykład

```javascript
//W głównym procesie.
const { BrowserView, BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

let view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _Eksperymentalne_

* `options` Object (optional)
  * `webPreferences` Object (optional) - See [BrowserWindow](browser-window.md).

### Metody statyczne

#### `BrowserView.getAllViews()`

Zwraca `BrowserView[]` - tablicę wszystkich otwartych okien BrowserViews.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserView | null` - The BrowserView that owns the given `webContents` or `null` if the contents are not owned by a BrowserView.

#### `BrowserView.fromId(id)`

* `id` Integer

Returns `BrowserView` - The view with the given `id`.

### Właściwości instancji

Obiekt utworzony za pomocą `new BrowserView` posiada następujące właściwości:

#### `view.webContents` _Eksperymentalny_

A [`WebContents`](web-contents.md) object owned by this view.

#### `view.id` _Eksperymentalny_

A `Integer` representing the unique ID of the view.

### Metody instancji

Objects created with `new BrowserView` have the following instance methods:

#### `view.destroy()`

Force closing the view, the `unload` and `beforeunload` events won't be emitted for the web page. After you're done with a view, call this function in order to free memory and other resources as soon as possible.

#### `view.isDestroyed()`

Returns `Boolean` - Whether the view is destroyed.

#### `view.setAutoResize(options)` _Eksperymentalne_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.

#### `view.setBounds(bounds)` _Eksperymentalne_

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.getBounds()` _Eksperymentalne_

Zwraca [`Rectangle`](structures/rectangle.md)

The `bounds` of this BrowserView instance as `Object`.

#### `view.setBackgroundColor(color)` _Eksperymentalne_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
