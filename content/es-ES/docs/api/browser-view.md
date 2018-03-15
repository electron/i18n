## Clase: BrowserView

> Crear y controlar vistas.

**Nota:** actualmente la API BrowserView es experimental y puede cambiar o ser eliminada en las futuras versiones de Electron.

Process: [Main](../glossary.md#main-process)

`BrowserView` puede ser usado para incrustar contenido web adicional en `BrowserWindow`. Es como una ventana hija, excepto que esta relativamente posicionada respecto a su ventana propietaria. Se puede considerar como una alternativa al tag `webview`.

## Ejemplo

```javascript
// En el proceso principal.
const {BrowserView, BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
win.on('closed', () => {
  win = null
})

let view = new BrowserView({
  webPreferences: {
    nodeIntegration: false
  }
})
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` *Experimental*

* `opciones` Objecto (opcional) 
  * Objeto `webPreferences` (opcional) - vea [BrowserWindow](browser-window.md).

### Métodos estáticos

#### `BrowserView.getAllViews()`

Returns `BrowserView[]` - An array of all opened BrowserViews.

#### `BrowserView.fromWebContents(webContents)`

* `Contenidosweb` [Contenidosweb](web-contents.md)

Returns `BrowserView | null` - The BrowserView that owns the given `webContents` or `null` if the contents are not owned by a BrowserView.

#### `BrowserView.fromId(id)`

* `id` Íntegro

Returns `BrowserView` - The view with the given `id`.

### Propiedades de Instancia

Objects created with `new BrowserView` have the following properties:

#### `view.webContents` *Experimental*

A [`WebContents`](web-contents.md) object owned by this view.

#### `view.id` *Experimental*

A `Integer` representing the unique ID of the view.

### Métodos de Instancia

Objects created with `new BrowserView` have the following instance methods:

#### `view.setAutoResize(options)` *Experimental*

* `opciones` Objeto 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.