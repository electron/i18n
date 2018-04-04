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

* `opciones` Object (opcional) 
  * Objeto `webPreferences` (opcional) - vea [BrowserWindow](browser-window.md).

### Métodos estáticos

#### `BrowserView.getAllViews()`

Devuelve `BrowserView[]` - Un array con tolas las BrowserViews abiertas.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Devuelve `BrowserView | null` - La BrowserView propietaria del `webContents` indicado o `null` si la BrowserView no es la propietaria del contenido.

#### `BrowserView.fromId(id)`

* `id` Integer

Devuelve `BrowserView` - La vista con el `id` especificado.

### Propiedades de la instancia

Los objetos creados con `new BrowserView` tienen las siguientes propiedades:

#### `view.webContents` *Experimental*

Un objeto [`WebContents`](web-contents.md), que pertenece a esta vista.

#### `view.id` *Experimental*

Un `Integer` representa el id único de la vista.

### Métodos de Instancia

Los objetos creados con `new BrowserView` tiene los siguientes métodos de instancia:

#### `view.destroy()`

Force closing the view, the `unload` and `beforeunload` events won't be emitted for the web page. After you're done with a view, call this function in order to free memory and other resources as soon as possible.

#### `view.isDestroyed()`

Returns `Boolean` - Whether the view is destroyed.

#### `view.setAutoResize(options)` *Experimental*

* `opciones` Object 
  * `width` Boolean - If `true`, la anchura de la vista se expanderá y se encogerá junto a la ventana. Por defecto `false`.
  * `height` Boolean - If `true`, la altura de la vista se expanderá y se encogerá junto a la ventana. Por defecto `false`.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Redimensiona y mueve la vista a los limites proporcionados en relación a la ventana.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color en forma `#aarrggbb` o `#argb`. El canal alfa es opcional.