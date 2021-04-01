## Clase: notificación de la barra táctil

> Crea una notificación en la barra táctil para aplicaciones nativas macOS

Proceso: [Main](../glossary.md#main-process)

### `new TouchBarPopover(options)`

* `options` Object
  * `Etiqueta` Cadena (opcional) - tecto del botón en la notificación.
  * `ícono` [imagen nativa](native-image.md) (opcional) - ícono del botón de la notificación.
  * `items` [TouchBar](touch-bar.md) - Elementos a mostrar en el popover.
  * `showCloseButton` Boolean (optional) - `true` to display a close button on the left of the popover, `false` to not show it. Por defecto es `true`.

### Propiedades de Instancia

Las siguiente propiedades están disponibles en instancias de `notificaciones de la barra táctil`:

#### `touchBarPopover.label`

A `String` representing the popover's current button text. Changing this value immediately updates the popover in the touch bar.

#### `touchBarPopover.icon`

A `NativeImage` representing the popover's current button icon. Changing this value immediately updates the popover in the touch bar.
