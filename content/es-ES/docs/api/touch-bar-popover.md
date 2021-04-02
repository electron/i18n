## Clase: notificación de la barra táctil

> Crea una notificación en la barra táctil para aplicaciones nativas macOS

Proceso: [Main](../glossary.md#main-process)

### `nuevo TouchBarPopover (opciones)`

* `options` Object
  * `Etiqueta` Cadena (opcional) - tecto del botón en la notificación.
  * `ícono` [imagen nativa](native-image.md) (opcional) - ícono del botón de la notificación.
  * `items` [TouchBar](touch-bar.md) - Elementos a mostrar en el popover.
  * `showCloseButton` Boolean (opcional) - `true` para mostrar un botón cerrar en la izquierda de notificación, `false` para no mostrar. Por defecto es `true`.

### Propiedades de Instancia

Las siguiente propiedades están disponibles en instancias de `notificaciones de la barra táctil`:

#### `touchBarPopover.label`

Un `String` que representa el texto del botón actual de la ventana emergente. Al cambiar este valor de inmediato, se actualiza el popover en la Touch bar.

#### `touchBarPopover.icon`

Un `NativeImage` que representa el icono del botón actual de la notificación. Al cambiar este valor de inmediato, se actualiza el popover en la Touch bar.
