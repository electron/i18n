## Clase: TouchBarPopover

> Crea una notificación en la barra táctil para aplicaciones nativas macOS

Process: [Main](../glossary.md#main-process)<br /> _This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

### `new TouchBarPopover(options)`

* `options` Object
  * `Etiqueta` Cadena (opcional) - tecto del botón en la notificación.
  * `ícono` [imagen nativa](native-image.md) (opcional) - ícono del botón de la notificación.
  * `items` [TouchBar](touch-bar.md) - Elementos a mostrar en el popover.
  * `showCloseButton` Boolean (opcional) - `true` para mostrar un botón cerrar en la izquierda de notificación, `false` para no mostrar. Por defecto es `true`.

### Propiedades de la instancia

Las siguiente propiedades están disponibles en instancias de `notificaciones de la barra táctil`:

#### `touchBarPopover.label`

Un `String` que representa el texto del botón actual de la ventana emergente. Changing this value immediately updates the popover in the touch bar.

#### `touchBarPopover.icon`

Un `NativeImage` que representa el icono del botón actual de la notificación. Changing this value immediately updates the popover in the touch bar.
