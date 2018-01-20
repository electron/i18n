## Clase: BrowserView

> Crear y controlar vistas.

**Note:**: La API de BrowserView es experimental y puede ser cambiada o elindad enl futuro versiones de Electron.

Proceso: [Principal](../glossary.md#main-process)

`BrowserView` puede ser usado para embeber contenido web adicional en `BrowserWindow`. Es como una ventana hija, excepto que esta relativamente posicionada respecto su ventana propietaria. Se puede considerar una alternativa al tag `webview`.

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
view.webContents.loadURL('https://electron.atom.io')
```

### `new BrowserView([options])` *Experimental*

* `opciones` Objecto (opcional) 
  * Objeto `webPreferences` (opcional) - vea [BrowserWindow](browser-window.md).

### Métodos Estáticos

#### `BrowserView.fromId(id)`

* `id` Entero

Devuelve `BrowserView` - La vista con el proveido `id`.

### Propiedades de Instancia

Los objetos creados con `new BrowserView` tienen las siguientes propiedades:

#### `view.webContents` *Experimental*

Un objeto [`WebContents`](web-contents.md), que pertenece a esta vista.

#### `view.id` *Experimental*

A `Integer` representing the unique ID of the view.

### Métodos de Instancia

Objects created with `new BrowserView` have the following instance methods:

#### `view.setAutoResize(options)` *Experimental*

* `options` Object 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectángulo](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.