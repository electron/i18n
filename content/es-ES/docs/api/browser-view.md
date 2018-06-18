## Clase: BrowserView

> Crear y controlar vistas.

**Nota:** actualmente la API BrowserView es experimental y puede cambiar o ser eliminada en las futuras versiones de Electron.

Process: [Main](../glossary.md#main-process)

Se puede utilizar un `BrowserView` para incrustar contenido web adicional dentro de un [`BrowserWindow`](browser-window.md). Es como una ventana hija, excepto que su posición es relativa a la de su ventana propietaria. Se puede considerar como una alternativa al tag `webview`.

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

* `options` Object (opcional) 
  * `webPreferences` Object (opcional) - Vea [BrowserWindow](browser-window.md).

### Métodos estáticos

#### `BrowserView.getAllViews()`

Devuelve `BrowserView[]` - Un array con todas las BrowserViews abiertas.

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

Forzar el cierre de la vista, provocará que los eventos `unload` and `beforeunload` no se emitan para la página web. Cuando haya terminado con una vista, llame tan pronto como sea posible a esta función para liberar la memoria y otros recursos.

#### `view.isDestroyed()`

Devuelve `Boolean` - Si la vista ha sido destruida.

#### `view.setAutoResize(options)` *Experimental*

* `options` Object 
  * `width` Boolean - If `true`, la anchura de la vista se expanderá y se encogerá junto a la ventana. Por defecto `false`.
  * `height` Boolean - If `true`, la altura de la vista se expanderá y se encogerá junto a la ventana. Por defecto `false`.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Redimensiona y mueve la vista a los limites proporcionados en relación a la ventana.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color en forma `#aarrggbb` o `#argb`. El canal alfa es opcional.