## Clase: BrowserView

> Crear y controlar vistas.

Proceso: [Main](../glossary.md#main-process)

Se puede utilizar un `BrowserView` para incrustar contenido web adicional dentro de un [`BrowserWindow`](browser-window.md). Es como una ventana hija, excepto que su posición es relativa a la de su ventana propietaria. Se puede considerar como una alternativa al tag `webview`.

### Ejemplo

```javascript
// En el proceso principal.
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _Experimental_

* `options` Object (opcional)
  * `webPreferences` Object (opcional) - Vea [BrowserWindow](browser-window.md).

### Métodos Estáticos

#### `BrowserView.getAllViews()`

Devuelve `BrowserView[]` - Un array con todas las BrowserViews abiertas.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Devuelve `BrowserView | null` - La BrowserView propietaria del `webContents` indicado o `null` si la BrowserView no es la propietaria del contenido.

#### `BrowserView.fromId(id)`

* `id` Íntegro

Devuelve `BrowserView` - La vista con el proveido `id`.

### Propiedades de Instancia

Los objetos creados con `new BrowserView` tienen las siguientes propiedades:

#### `view.webContents` _Experimental_

Un objeto [`WebContents`](web-contents.md), que pertenece a esta vista.

#### `view.id` _Experimental_

Un `Integer` representa el id único de la vista.

### Métodos de Instancia

Los objetos creados con `new BrowserView` tiene los siguientes métodos de instancia:

#### `view.destroy()`

Forzar el cierre de la vista, provocará que los eventos `unload` and `beforeunload` no se emitan para la página web. Cuando haya terminado con una vista, llame tan pronto como sea posible a esta función para liberar la memoria y otros recursos.

#### `view.isDestroyed()`

Devuelve `Boolean` - Si la vista ha sido destruida.

#### `view.setAutoResize(options)` _Experimental_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` por defecto.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` por defecto.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` por defecto.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` por defecto.

#### `view.setBounds(bounds)` _Experimental_

* `bounds` [Rectangle](structures/rectangle.md)

Redimensiona y mueve la vista a los limites proporcionados en relación a la ventana.

#### `view.getBounds()` _Experimental_

Devuelve [`Rectangle`](structures/rectangle.md)

The `bounds` of this BrowserView instance as `Object`.

#### `view.setBackgroundColor(color)` _Experimental_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
