## Clase: notificación de la barra táctil

> Crea una notificación en la barra táctil para aplicaciones nativas macOS

Proceso: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `nueva notificación en la barra táctil(opciones)` _Experimental_

* `options` Object
  * `Etiqueta` Cadena (opcional) - tecto del botón en la notificación.
  * `ícono` [imagen nativa](native-image.md) (opcional) - ícono del botón de la notificación.
  * `Elemento` [barra táctil](touch-bar.md) (opcional) - elementos a mostrar en la notificación.
  * `showCloseButton` Boolean (optional) - `true` to display a close button on the left of the popover, `false` to not show it. Por defecto es `true`.

### Propiedades de Instancia

Las siguiente propiedades están disponibles en instancias de `notificaciones de la barra táctil`:

#### `touchBarPopover.label`

A `String` representing the popover's current button text. Changing this value immediately updates the popover in the touch bar.

#### `touchBarPopover.icon`

A `NativeImage` representing the popover's current button icon. Changing this value immediately updates the popover in the touch bar.
