## Clase: BrowserView

> Crear y controlar vistas.

Proceso: [Main](../glossary.md#main-process)

Se puede utilizar un `BrowserView` para incrustar contenido web adicional dentro de un [`BrowserWindow`](browser-window.md). Es como una ventana hija, excepto que su posición es relativa a la de su ventana propietaria. Se puede considerar como una alternativa al tag `webview`.

### Ejemplo

```javascript
// En el proceso principal.
const { BrowserView, BrowserWindow } = require (' Electron ')

const Win = New BrowserWindow ({ width: 800, height: 600 })

const View = New BrowserView ()
Win. setBrowserView (vista)
View. setBounds ({x: 0, y: 0, width: 300, height: 300})
View. webContents. loadURL (' https://electronjs.org ')
```

### `new BrowserView([options])` _Experimental_

* `options` Object (opcional)
  * `webPreferences` Object (opcional) - Vea [BrowserWindow](browser-window.md).

### Propiedades de Instancia

Los objetos creados con `new BrowserView` tienen las siguientes propiedades:

#### `view.webContents` _Experimental_

Un objeto [`WebContents`](web-contents.md), que pertenece a esta vista.

### Métodos de Instancia

Los objetos creados con `new BrowserView` tiene los siguientes métodos de instancia:

#### `view.setAutoResize(options)` _Experimental_

* `options` Object
  * `width` Boolean (opcional)-si `true`, el ancho de la vista crecerá y se encogerá con la ventana. `false` por defecto.
  * `height` Boolean (opcional)-si `true`, la altura de la vista crecerá y se encogerá junto con la ventana. `false` por defecto.
  * `horizontal` Boolean (opcional)-si `true`, la posición x y la anchura de la vista crecerán y se encogerán proporcionalmente con la ventana. `false` por defecto.
  * `vertical` Boolean (opcional): si `true`, la posición y y la altura de la vista crecerán y se encogerán proporcionalmente con la ventana. `false` por defecto.

#### `view.setBounds(bounds)` _Experimental_

* `bounds` [Rectangle](structures/rectangle.md)

Redimensiona y mueve la vista a los limites proporcionados en relación a la ventana.

#### `view.getBounds()` _Experimental_

Devuelve [`Rectangle`](structures/rectangle.md)

Los límites `bounds` de esta instancia de BrowserView como un `Object`.

#### `view.setBackgroundColor(color)` _Experimental_

* `color` String-color en `#aarrggbb` o `#argb` Form. El canal alfa es opcional.
